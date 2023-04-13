---
id: getting-started
title: Panimula sa Polygon PoS
sidebar_label: Quick Start
description: Buuin ang susunod mong blockchain app sa Polygon.
keywords:
  - docs
  - matic
  - polygon
  - build on polygon
  - blockchain
  - introduction
  - how to launch dapp
  - dapps
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::caution Nag-a-update ang Develop Docs

Na-update, pinapabuti, at pinapahusay ang mga dokumento. Napapailalim sila sa pagbabago. Mangyaring huwag mag-atubiling magpahayag ng isyu o humiling ng pag-urong kung mayroon kang anumang tanong o mungkahi.

:::

Maligayang pagdating sa **Polygon (dating tinatawag na Matic Network)**! Ang pinaka-makabago at kapana-panabik na platform upang bumuo ng iyong blockchain application. Nakahanda ang teknolohiya ng Blockchain upang baguhin ang paraan kung paano pinamamahalaan ng digital na mundo ang data at kung paano nagsasagawa ng negosyo. Maaari kang sumali sa rebolusyong ito sa pamamagitan ng pagsisimula ng desentralisadong application (dApp) ng Polygon.

Ipakikilala sa iyo ng gabay na ito ang Polygon ecosystem. Makakahanap ka ng mga link sa mahahalagang mapagkukunan at website na magdadala sa iyo ng bilis sa pagbuo, hindi lamang sa Polygon kundi pati na rin sa pangkalahatang pagbuo ng blockchain application.

:::tip Manatiling napapanahon ang kaalaman

Manatiling nakasubaybay sa pinakabagong mga update para sa builder mula sa team ng Polygon
at sa komunidad sa pamamagitan ng pag-subscribe sa
[<ins>Mga notification group ng Polygon</ins>](https://polygon.technology/notifications/).

:::

## key Tampok polygon {#key-features-of-polygon}

- **Bilis**: Gumagamit ang Polygon Network ng isang high-throughput na blockchain na may pinagkasunduan na ibinigay ng isang grupo ng mga Block Producer na pinili ng mga stakeholder sa bawat checkpoint. Ang isang layer ng Proof of Stake ay ginagamit upang patunayan ang mga block at pana-panahong mag-post ng mga patunay ng Block Producers sa Ethereum mainnet. Nagbibigay-daan ito sa mabilis na mga rate ng pagkumpirma ng block na humigit-kumulang 2 segundo habang pinapanatili ang mataas na halaga ng desentralisasyon, na nagreresulta sa mahusay na throughput para sa network.
- **Pagkakasakal**: Nakamit ng Polygon Network ang isang hypothetical na bilis ng transaksyon ng mas kaunting 2 segundo sa iisang sidechain. Ang paggamit ng maraming sidechain ay nakakatulong sa network na pangasiwaan ang milyun-milyong transaksyon sa bawat segundo. Ang mekanismong ito (naipakita na sa unang Matic sidechain) ay nagbibigay-daan sa Polygon network na madaling mag-scale.
- **Seguridad**: Umaasa ang mga smart contract ng Polygon sa seguridad ng Ethereum. Upang pangalagaan ang network, gumagamit ito ng tatlong kritikal na modelo ng seguridad. Ginagamit nito ang **mga kontrata sa pamamahala ng pag-stake ng** Ethereum at ng  pangkat ng mga binigyang-gantimpalang validator na nagpapatakbo ng mga **Heimdall** at **Bor** node. Maaari ding ipatupad ng mga developer ang parehong modelo (Hybrid) sa kanilang dApp.

## Pagbuo sa Polygon {#building-on-polygon}

Kung isa kang Ethereum developer, isa ka na ring Polygon developer. Lumipat lang sa [Polygon RPC](https://polygon-rpc.com/) at magsimula. Sinusuportahan ang lahat ng tool na pamilyar sa iyo sa Ethereum blockchain sa Polygon bilang default, tulad ng Truffle, Remix, at Web3js.

Maaari kang mag-deploy ng mga desentralisadong application sa alinman sa Polygon Mumbai Testnet o sa Mainnet. Kumokonekta ang Polygon Mumbai Testnet sa Ethereum Goërli Testnet, na nagsisilbing ParentChain nito. Makikita mo ang lahat ng detalyeng nauugnay sa network sa [dokumentasyon](https://github.com/maticnetwork/matic-docs/blob/master/docs/operate/network.md) ng network.

### Mga pitaka (Wallets)  {#wallets}

Upang makipag-interaksyon sa Polygon Network, kailangan mong magkaroon ng wallet na nakabatay sa Ethereum dahil tumatakbo ang Polygon sa Ethereum Virtual Machine (EVM). Maaari mong pumili upang i-set up ng isang [Metamask](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/metamask/overview.md) o [Arkane](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/wallets/arkane/intro_arkane.md) Wallet. Higit pa sa impormasyon na may kinalaman sa wallet at kung bakit kailangan mo ng isa ay matatagpuan sa aming [wallet documentation](https://docs.polygon.technology/docs/develop/wallets/getting-started).

### Mga Smart Contract {#smart-contracts}

Sinusuportahan ng Polygon ang maraming serbisyo na magagamit mo upang subukan, i-compile, i-debug, at i-deploy ang mga desentralisadong application sa Polygon Network. Kabilang dito ang pag-deploy gamit ang [Alchemy](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/alchemy.md), [Chainstack](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/chainstack.md), [QuickNode](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/quicknode.md), [Remix](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/remix.md), [Truffle](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/truffle.md), [Hardhat](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/hardhat.md), at [Replit](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/replit.md).

### Pagkonekta sa Polygon {#connecting-to-polygon}

MMaaari kang magdagdag ng Polygon sa Metamask o direktang gumamit ng Arkane, na nagbibigay-daan sa iyong kumonekta sa Polygon gamit [RPC](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/)

Para kumonekta sa Polygon network para magbasa ng impormasyon ng blockchain para magbasa kami ng alchemy SDK.

```js
// Javascript
// Setup: npm install alchemy-sdk
const { Alchemy, Network } = require("alchemy-sdk");

const settings = {
  apiKey: "demo", // Can replace with your API Key from https://www.alchemy.com
  network: Network.MATIC_MAINNET, // Can replace with MATIC_MUMBAI
};

const alchemy = new Alchemy(settings);

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

main();
```

### Bumuo ng bagong dApp sa Polygon? {#building-a-new-dapp-on-polygon}

Nagsisilbing bridge ang mga desentralisadong application (dApp) sa pagitan ng mga user at ng pagkapribado ng kanilang data sa blockchain. Nava-validate ng dumaraming bilang ng mga dApp ang kanilang pagiging kapaki-pakinabang sa loob ng blockchain ecosystem. Nilulutas nila ang mga hamon tulad ng pagsasagawa ng mga transaksyon sa pagitan ng dalawang kalahok. Walang pangangailangan para sa nakasentrong awtoridad sa pamamagitan ng mga smart na kontrata.

Ipagpalagay na wala kang dating karanasan sa pagbuo ng mga desentralisadong application (dApp). Sa ganoong sitwasyon, makapagbibigay sa iyo ang mga nabanggit na mapagkukunan ng maagang pagsisimula sa mga tool na kinakailangan upang bumuo, mag-debug, at mag-deploy ng mga dApp sa Polygon Network.

- [Puno ang Stack dApp: Serye ng Tutorial](https://kauri.io/full-stack-dapp-tutorial-series/5b8e401ee727370001c942e3/c)
- [Web3.js](https://www.dappuniversity.com/articles/web3-js-intro)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Remix](https://docs.polygon.technology/docs/develop/remix/)
- [Truffle](https://docs.polygon.technology/docs/develop/truffle)
- [Metamask](https://docs.polygon.technology/docs/develop/metamask/overview)
- [Arkane](https://docs.polygon.technology/docs/develop/wallets/arkane/intro)
- [Bumuo ng dApp gamit ang Fauna, Polygon at React](https://docs.polygon.technology/docs/develop/dapp-fauna-polygon-react)

### Mayroon na bang dApp? {#already-have-a-dapp}

Kung mayroon ka nang desentralisadong application (dApp) at naghahanap ng platform upang matulungan kang mag-scale nang mahusay, nasa tamang lugar ka dahil pinapayagan ka ng Polygon na:

1. **Madaling lumipat mula sa Ethereum Virtual Machine (EVM) na nakabatay sa chain**: Ipinagmamalaki ng Polygon ang pagiging pinakamahusay na solusyon sa pag-scale nito ng Layer-2 para sa Ethereum. Hindi mo kailangang mag-alala tungkol sa pinagbabatayang arkitektura habang inililipat o dine-deploy ang iyong mga dApp sa Polygon Network basta't compatible ito sa EVM.
2. **Gamitin ang Polygon bilang mas mabilis na layer ng transaksyon**: Nagbibigay-daan sa iyo ang pag-deploy ng iyong dApp sa Polygon Mainnet na magamit ang Polygon bilang mas mabilis na layer ng transaksyon para sa iyong mga dApp. Bilang karagdagan, maaari mong makuha ang iyong mga token na naimapa namin. Makakasali ka sa [aming teknikal na grupo para sa mga talakayan](http://bit.ly/matic-technical-group) sa Telegram para matuto nang higit pa.

## Side Note {#side-note}

Kung tila napakalaki nito, ayos lang! Maaari kang mag-jump sa aksyon simulan ang pag-hack. Narito ang ilang mga tala bago ka magsimulang mag-dive sa mga mapagkukunan, mga repositoryo, at mga dokumento:

1. **Mag-ingat sa puwedeng mawala sa pagiging nangunguna**: Tulad ng karaniwang niche programming, napakabilis ng pagbabago sa pagbuo ng dApps at blockchain. Habang nagsasaliksik, maaari kang makakita ng mga kumplikadong mga repositoryo ng code, 404s sa site ng dokumentasyon, o kahit na walang dokumentasyon. Gamitin ang pagkakataong iyon para ipaabot ito sa amin sa pamamagitan ng anumang channel sa social media.
2. **Maaaring hindi madaling matutunan ito, ngunit kakaunti ang hadlang para magawa ito**: Bukas at napakagiliw ng komunidad! Tinatanggap ng mga proyekto ang mga kahilingan sa pag-urong mula sa mga tagalabas at aktibong nilulutas ang anumang hadlang. Nagsusumikap kami sa paggawa ng mas mahusay na mundo at pinapahalagahan ang kontribusyon sa anumang anyo. Magpapasalamat kami na i-onboard ka sa kamangha-manghang Web3 ecosystem na ito.

:::info Manatiling Napapanahon ang Kaalaman

Hinihikayat ng desentralisadong pagbuo ng application ang desentralisasyon ng network. Sundin ang aming mga handle sa social media para sa higit pang insight at update tungkol sa Polygon ecosystem. Makikita mo ang mga link sa lahat ng komunidad ng Polygon [dito](https://polygon.technology/community/).

:::
