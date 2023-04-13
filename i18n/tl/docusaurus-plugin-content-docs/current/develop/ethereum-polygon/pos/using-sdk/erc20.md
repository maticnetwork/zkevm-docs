---
id: erc20
title: Gabay sa Pagdeposito at Pag-withdraw ng ERC20
sidebar_label: ERC20
description: "Magdeposito at mag-withdraw ng mga token ng ERC20 sa Polygon network."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Tingnan ang pinakabagong [Dokumentasyon ng Matic.js sa ERC20](https://maticnetwork.github.io/matic.js/docs/pos/erc20/).

Ginagamit ng tutorial na ito ang Polygon Testnet (Mumbai) na naimapa sa Goerli Network upang ipakita ang paglipat ng asset papunta at pabalik sa dalawang blockchain. Ang isang **mahalagang bagay na dapat tandaan** habang sinusunod ang tutorial na ito ay dapat mong palaging gumamit ng isang Proxy address sa tuwing ito ay magagamit. Halimbawa, kailangang gamitin ang **RootChainManagerProxy****** address para sa pakikipag-ugnayan sa halip na ang RootChainManager address. Ang **mga address ng kontrata ng PoS, ABI, Mga Address ng Test Token,** at iba pang detalye ng deployment ng mga kontrata ng PoS bridge ay matatagpuan [dito](/docs/develop/ethereum-polygon/pos/deployment).

**Ang pagmamapa ng iyong mga asset** ay kinakailangan upang maisama ang PoS bridge sa iyong application. Maaari kang magsumite ng kahilingan [sa](/docs/develop/ethereum-polygon/submit-mapping-request) pagmamapa dito. Ngunit para sa layunin ng tutorial na ito, nilapitan na namin ang mga **Test token** at nilapitan ang mga ito sa tulay ng PoS. Maaaring kailanganin mo ito para subukan ang tutorial nang mag-isa. Maaari kang humiling ng gustong Asset mula sa [gripo](https://faucet.polygon.technology/). Kung hindi magagamit ang mga test token sa gripo, iabot sa amin ang [discord](https://discord.com/invite/0xPolygonn).

Sa paparating na tutorial, ang bawat hakbang ay ipapaliwanag nang detalyado kasama ng ilang code snippet. Gayunpaman, puwede ka palaging sumangguni sa [repository](https://github.com/maticnetwork/matic.js/tree/master/examples/pos) na ito na magkaroon ng lahat ng **halimbawang source code** na makakatulong sa iyo na ma-integrate at maunawaan kung paano gumagana ang PoS bridge.

## Mataas na Antas ng Pagdaloy {#high-level-flow}

Ideposito ang ERC20 -

1. **_Aprubahan_** ang kontratang **_ERC20Predicate_** upang gastusin ang mga token na kailangang ideposito.
2. Gawin ang **_depositFor_** na call sa **_RootChainManager_**.

i-Withdraw ERC20 -

1. I-Burn ang mga token sa Polygon chain.
2. Tawagan ang `exit()`function `RootChainManager`na magsumite ng proof of of burn transaction. Maaaring gawin ang tawag na ito pagkatapos isumite ang checkpoint para sa block na naglalaman ng transaksyon ng burn.

## Mga Detalye ng Hakbang {#steps-details}

### Aprubahan {#approve}

Normal na pag-apruba ito ng ERC20 para maka-call ang **_ERC20Predicate_** ng **_transferFrom_** function. Inilalantad ng client ng Polygon POS ang paraan ng **_pag-apruba_** upang gawin ang call na ito.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>,true);
  const approveResult = await erc20Token.approve(100);
  const txHash = await approveResult.getTransactionHash();
  const txReceipt = await approveResult.getReceipt();
}
```

### ideposito {#deposit}

Tandaan na kailangang mag-map ang token at aprubahan para maglipat nang dati. Inilantad ng kliyente ng Polygon POS ang `deposit()`paraan para gawin ang tawag na ito.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);

  //deposit 100 to user address
  const result = await erc20Token.deposit(100, <user address>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();

}
```

:::note
Deposits mula sa Ethereum hanggang sa Polygon na nangyayari gamit ang isang mekanismo ng S**tate Sync **at tumagal ng mga 22-30 minuto. Matapos na maghintay sa oras na ito na pagitan, inirerekomenda na suriin ang balanse gamit ang web3.js /matic.js library o gamit ang Metamas. Ipapakita lang ng explorer ang balanse kung nagkaroon na ng kahit isang transfer ng asset sa child chain.  Ipinaliwanag ng [<ins>link</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos) na ito kung paano subaybayan ang mga kaganapan ng deposito.
:::

### Paraan WithdrawStart upang Burn {#withdrawstart-method-to-burn}

Maaaring gamitin ang `withdrawStart()`paraan para simulan ang proseso ng pag-withdraw na susunugin ang tinukoy na halaga sa Polygon chain.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = posClient.erc20(<child token address>);

  // start withdraw process for 100 amount
  const result = await erc20Token.withdrawStart(100);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```

I-imbak ang hash ng transaksyon para sa tawag na ito at gamitin ito habang bumubuo ng patunay ng paso.

### Mag-Exit {#exit}

Kapag nagsumite ang checkpoint para sa block na naglalaman ng transaksyon ng burn, dapat na tawagan ng user ang `exit()`function ng `RootChainManager`kontrata at isumite ang patunay ng burn. Sa pagsusumite ng wastong patunay, inililipat ang mga token sa user. Inilantad ng kliyente ng Polygon POS ang `withdrawExit`paraan para gawin ang tawag na ito. Maaari lang gamitin ang function na ito matapos isama sa main chain ang checkpoint. Maaaring subaybayan ang pagsasama ng checkpoint sa pamamagitan ng pagsunod sa [gabay na ito](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events).

Maaaring gamitin paraan ng *withdrawExit* lumabas sa proseso ng i-withdraw sa pamamagitan ng paggamit ng txHash mula sa paraan ng *withdrawStart*.

:::note
Kailangang i-checkpoint ang transaksyon ng withdrawStart para lumabas ang withdraw.
:::

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);
  const result = await erc20Token.withdrawExit(<burn tx hash>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```
