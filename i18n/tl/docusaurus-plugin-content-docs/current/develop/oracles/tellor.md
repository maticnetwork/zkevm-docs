---
title: Tellor
description: "Isang gabay para maisama ang oracle ng Tellor sa iyong kontrata ng Polygon."
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles", "Polygon", "Matic", "Tellor"]
skill: beginner
published: 2022-02-10
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Ang Tellor ay isang orakulo na nagbibigay ng data na lumalaban sa censorship na sinigurado ng mga simpleng crypto-economic na insentibo. Ang data ay maaaring ibigay ng sinuman at suriin ng lahat. Ang bumabagay na istraktura ng Tellor ay maaaring magbigay ng anumang data sa anumang agwat ng oras upang payagan ang madaling pag-eksperimento/pagbabago.

## (Soft) Mga Paunang Kinakailangan {#soft-prerequisites}

Ipinapalagay namin ang sumusunod tungkol sa antas ng iyong kasanayan sa pagko-code upang tumuon sa aspeto ng oracle.

Mga Palagay:

- maaari kang mag-navigate sa terminal
- na-install mo ang npm
- alam mo kung paano gamitin ang npm upang pamahalaan ang mga dependencies

Ang Tellor ay isang live at bukas na oracle na handa pagpapatupad sa ipatupad. Nandito ang gabay ng baguhang ito para ipakita ang kadalian kung saan can ang isang tao at tumatakbo sa Tellor, na nagbibigay ng iyong proyekto sa isang ganap na desentralisado at censorship-resistant oracle.

## Pangkalahatang-ideya  {#overview}

Ang Tellor ay system ng oracle kung saan ang mga partido ay maaaring gumawa ng kahilingan ng value ng off-chain data point (hal. BTC/USD) at kung saan nakikipagkumpitensya ang mga reporter upang idagdag ang value na ito sa on-chain na data-bank, na naa-access ng lahat ng smart na kontrata ng Polygon. Ang mga input sa data-bank na ito ay sinigurado ng network ng stacked reporter. Gumagamit ang Tellor ng mga mekanismo ng insentibo ng crypto-economic. Ang mga tapat na pagsusumite ng data ng mga reporter ay ginagantimpalaan sa pamamagitan ng pagpapalabas ng token ng Tellor. Ang sinumang masasamang aktor ay mabilis na pinarurusahan at tinatanggal mula sa network sa pamamagitan ng mekanismo ng pagtatalo.

Sa tutorial na ito, aalamin natin ang:

- Pagse-set up ng paunang toolkit na kakailanganin mo para magsimula at patakbuhin ito.
- Alamin sa pamamagitan ng simpleng halimbawa.
- Ilista ang mga address ng testnet ng mga network na kasalukuyang maaari mong subukan gamit ang Tellor.

## UsingTellor {#usingtellor}

Ang unang bagay na gusto mong gawin ay i-install ang mga pangunahing tool na kinakailangan para sa paggamit ng Tellor bilang iyong oracle. Gamitin [ang package](https://github.com/tellor-io/usingtellor) para i-install ang mga Kontrata ng User sa Tellor:

`npm install usingtellor`

Kapag na-install, papayagan nito ang iyong mga kontrata na mamana ang mga function mula sa kontrata na 'UsingTellor'.

Mahusay! Ngayong naihanda mo na ang mga tool, dumaan tayo sa simpleng pagsasanay kung saan aalamin natin ang presyo ng bitcoin:

### Halimbawa ng BTC/USD {#btc-usd-example}

Magmana ng UsingTellor na kontrata, na ipinapasa ang Tellor address bilang argumento ng constructor:

Narito ang isang halimbawa:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {

  uint256 public btcPrice;

  //This Contract now has access to all functions in UsingTellor

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {

    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryID = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

## Mga Address: {#addresses}

Tellor Mga Tribute: [`0xe3322702bedaaed36cddab233360b939775ae5f1`](https://polygonscan.com/token/0xe3322702bedaaed36cddab233360b939775ae5f1#code)

Oracle: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0#code)

#### Gusto mo bang gumawa muna ng ilang pagsubok?: {#looking-to-do-some-testing-first}

Polygon Mumbai Testnet: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://mumbai.polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0/contracts#code)

Subukan ang mga Tribute:[`0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE`](https://mumbai.polygonscan.com/token/0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE#code)

Kailangan mo ang ilang test tokens? I-tweet kami sa ['@trbfaucet'](https://twitter.com/trbfaucet)

Para sa kadalian ng paggamit, may bersyon ang UsingTellor repo sa [Plaro contract](https://github.com/tellor-io/TellorPlayground) ng Tellor para sa mas madaling pagsasama. Tingnan [dito](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) ang isang listahan ng mga kapaki-pakinabang na function.

#### Para sa isang mas matatag na pagpapatupad ng Tellor oracle, tingnan ang buong listahan ng mga magagamit na function [dito.](https://github.com/tellor-io/usingtellor/blob/master/README.md)

#### May mga tanong pa rin? Sumali sa komunidad [dito!](https://discord.gg/tellor)
