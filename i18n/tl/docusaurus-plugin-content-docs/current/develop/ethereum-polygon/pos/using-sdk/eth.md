---
id: eth
title: Gabay sa Pagdeposito at Pag-withdraw ng ETH
sidebar_label: ETH
description: "Magdeposito at mag-withdraw ng mga token ng ETH sa Polygon network."
keywords:
  - docs
  - matic
  - ether
  - withdraw
  - deposit
image: https://matic.network/banners/matic-network-16x9.png
---

Tingnan ang pinakabagong [Dokumentasyon ng Matic.js sa ETH](https://maticnetwork.github.io/matic.js/docs/pos/deposit-ether/).

## Maikling Buod {#quick-summary}

Tumatalakay ang seksyong ito ng mga dokumento tungkol sa kung paano magdeposito at mag-withdraw ng mga token ng ERC20 sa Polygon network. May parehong function sa pagitan ng mga seksyong ETH, ERC20, ERC721 at ERC1155 ng mga dokumento na may mga pagkakaiba-iba sa mga pattern ng pagbibigay ng pangalan at pagpapatupad, alinsunod sa mga pamantayan. Ang pagmamapa ng iyong mga asset ang pinakamahalagang kinakailangan sa paggamit ng seksyong ito ng mga dokumento. Kaya naman, mangyaring isumite ang iyong kahilingan sa pagmamapa [rito](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/).

## Panimula {#introduction}

Gumagamit ang gabay na ito ng Polygon Testnet (Mumbai) na mismong naimapa sa Goerli Network upang ipakita ang paglipat ng asset sa pagitan ng dalawang blockchain. Mahalagang tandaan na para sa mga layunin ng tutorial na ito, dapat kang gumamit ng proxy address hangga't maaari. Ito ay dahil habang maaaring magbago ang address ng kontrata sa pagpapatupad kapag may idinagdag na bagong update sa code ng kontrata, hindi kailanman nagbabago ang proxy at nire-redirect nito ang lahat ng papasok na tawag sa pinakabagong pagpapatupad. Sa madaling salita, kung gagamitin mo ang proxy address, hindi mo kailangang mag-alala tungkol sa anumang mga pagbabagong mangyayari sa kontrata ng pagpapatupad maliban kung handa ka na.

Halimbawa, mangyaring gamitin ang `RootChainManagerProxy`address para sa mga pakikipag-ugnayan sa halip na ang `RootChainManager`address. Makikita ang mga detalye ng pag-deploy tulad ng mga contract address ng PoS, ABI, at Test Token Addresses [dito](/docs/develop/ethereum-polygon/pos/deployment/).

Ang pagmamapa sa iyong mga asset ay isang kinakailangang hakbang para sa pagsasama ng PoS bridge sa iyong aplikasyon kaya kung hindi mo pa ito nagawa, mangyaring magsumite ng kahilingan sa pagmamapa [dito](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/). Para sa mga layunin ng tutorial na ito, nag-deploy ang team ng mga token ng pagsubok at naimapa ang mga ito sa PoS bridge. Hilingin ang asset na gusto mong gamitin sa [faucet](https://faucet.polygon.technology/) at kung hindi available ang mga token ng pagsubok, ipaabot ito sa team ng [Discord](https://discord.com/invite/0xPolygon). Sisiguraduhin naming makatutugon kaagad sa iyo.

Sa paparating na tutorial, ipapaliwanag nang detalyado ang bawat hakbang kasama ng ilang code snippet. Gayunpaman, puwede ka palaging sumangguni sa [repository](https://github.com/maticnetwork/matic.js/tree/master/examples) na ito na magkaroon ng lahat ng **halimbawang source code** na makakatulong sa iyo na ma-integrate at maunawaan kung paano gumagana ang PoS bridge.

## Mataas na Antas ng Pagdaloy {#high-level-flow}

Ideposito ang ETH -

1. Gumawa ng **_depositEtherFor_** na call sa **_RootChainManager_** at **ipadala **ang kinakailangang ether.

I-withdraw ang ETH -

1. **_Mag-burn_** ng mga token sa Polygon chain.
2. Mag-call ng **_exit_** na function sa **_RootChainManager_** para makapagsumite ng proof ng transaksyon sa pag-burn. Puwedeng gawin ang call na ito **_pagkatapos maisumite ang checkpoint_** para sa block na naglalaman ng transaksyon sa pag-burn.

## Mga Hakbang {#steps}

### Pagdeposito {#deposit}

Maaaring ideposito ang ETH sa Polygon chain sa pamamagitan ng pag-call sa **depositEtherFor** sa kontrata ng **RootChainManager**. Inilalantad ng client ng polygon POS i-expose paraan **depositEther** gawin call na ito.

```jsx
const result = await posClient.depositEther(<amount>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```

:::note
Ethereum ang mga deposito mula sa Ethereum hanggang sa Polygon gamit ang S**tate Sync **Mekanismo at tumatagal ito ng mga 22-30 minuto. Matapos na maghintay sa oras na ito na pagitan, inirerekomenda na suriin ang balanse gamit ang web3.js /matic.js library o gamit ang Metamas. Ipapakita lang ng explorer ang balanse kung nagkaroon na ng kahit isang transfer ng asset sa child chain.  Ipinaliwanag ng [<ins>link</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/) na ito kung paano subaybayan ang mga kaganapan ng deposito.
:::

### Burn {#burn}

Idineposito ang ETH bilang isang ERC20 token sa Polygon chain. Sumunod ang pag-withdraw ng parehong proseso tulad ng pag-withdraw ng mga token ng ERC20.

Para sunugin ang mga token at isali ang proseso ng pag-withdraw, tawagan ang pag-andar ng kontrata ng MaticWETH Dahil si Esther ay isang **ERC20** token sa Polygon chain, kailangan mong simulan ang ERC20 token mula sa client ng Polygon PoS at pagkatapos ay tumawag sa `withdrawStart()`paraan para simulan ang proseso ng burn.

```jsx
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

I-imbak ang hash ng transaksyon para sa tawag na ito at gamitin ito habang bumubuo ng patunay ng paso.

### Mag-Exit {#exit}


Kapag nagsumite ang **checkpoint** para sa block na naglalaman ng transaksyon ng burn, dapat na tawagan ng user ang **exit** function ng `RootChainManager`kontrata at magsumite ng proof of burn. Kapag naisumite na ang valid proof, itatransfer na ang tokens sa user. Ang Polygon POS client ay `erc20` inilalantad ang na `withdrawExit` paraan para magawa ang call na ito. Maaaring ma-call lang ang function na ito pagkatapos maisama ang checkpoint sa main chain. Maaaring ma-track ang pagsasama ng checkpoint sa pamamagitan ng pagsunod sa [gabay](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events) na ito.


```jsx
// token address can be null for native tokens like ethereum or matic
const erc20RootToken = posClient.erc20(<token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
