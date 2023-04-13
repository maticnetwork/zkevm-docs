---
id: getting-started
title: Plasma Bridge
sidebar_label: Introduction
description: Makipag-interaksyon sa Plasma Bridge at Polygon Network.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Pakitingnan ang pinakabagong [dokumentasyon ng Matic.js sa Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/) upang makapagsimula.

Ang bridge ay karaniwang isang hanay ng mga contract na tumutulong sa paglilipat ng mga asset mula sa root chain patungo sa child chain. Mayroong pangunahing dalawang bridge  upang ilipat ang mga asset sa pagitan ng Ethereum at Polygon. Ang una ay ang Plasma bridge at ang pangalawa ay tinatawag na **PoS Bridge** **Proof of Stake bridge**. Nagbibigay ang **tulay** ng Plasma ng mas mataas na garantiya ng seguridad dahil sa mekanismo ng exit ng Plasma.

Gayunpaman, may ilang partikular na limitasyon ang child token at mayroong 7-araw na panahon ng withdrawal na nauugnay sa lahat ng exit/pag-withdraw mula sa Polygon hanggang Ethereum sa Plasma bridge. Ang [PoS bridge](/docs/develop/ethereum-polygon/pos/getting-started) ay mas flexible at nagtatampok ng mas mabilis na pag-withdraw.

Makikilos ang tutorial na ito bilang isang hakbang na gabay para maunawaan at gamitin ang tulay ng Plasma gamit ang [Matic JS](https://github.com/maticnetwork/matic.js), na siyang pinakamadaling paraan sa pakikipag-ugnayan sa Plasma Bridge sa Polygon Network.

## Ang mga asset ay dumadaloy sa Plasma Bridge {#assets-flow-in-plasma-bridge}

Ipapakita namin ang daloy para sa paglilipat ng asset sa Polygon sa tutorial na ito at kung paano mo ito magagawa gamit ang Matic.js:

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. Nag-deposit ang user ng mga crypto asset sa kontrata ng Polygon sa main chain
2. Kapag nakumpirma ang mga deposited token sa main chain, makukuha ang mga kaukulang token na makikita sa polygon chain
   - Pwede na ngayong mag-transfer ang user ng mga token sa sinumang gusto nang hindi nagbabayad nang malaki. Mas mabibilis nag blocks ng polygon chain (humigit-kumulang 1 segundo). Sa ganoong paraan, halos kaagad na maipoproseso ang transfer.
3. Kapag handa na ang isang user, maaari nilang i-withdraw ang mga natitirang token mula sa pangunahing chain. Ang pag-withdraw ng pondo ay magagawa mula sa Plasma Sidechain. May nakatakdang pagitan ng checkpoint na 5 min, kung saan ang lahat ng block sa Polygon block layer ay bina-validate mula noong huling checkpoint.
4. Kapag isinumite ang checkpoint sa main chain Ethereum contract, ang isang Exit NFT (ERC721) token ay nilikha ng katumbas na halaga.
5. Maaaring i-claim ang mga withdraw na pondo pabalik sa iyong Ethereum acccount mula sa pangunahing chain contract gamit ang isang proseso ng exit procedure.
   - Ang user ay maaari ring makakuha ng fast exit sa pamamagitan ng 0x o Dharma (paparating na!)

### Mga Kinakailangan: {#prerequisites}

```
npm i @maticnetwork/maticjs-plasma

import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

### Görli Faucet {#görli-faucet}

Upang makagawa ng anumang mga transaksyon, kakailanganin mo rin ng ilang Ether sa mga test account na iyong gagamitin habang sinusunod ang tutorial. Kung sakaling wala kang ETH sa Görli, puwede mong gamitin ang mga faucet link na ibinigay dito — https://goerli-faucet.slock.it/.

### Polygon Faucet {#polygon-faucet}

Sa buong tutorial na ito, gagamitin namin ang ERC20 token `TEST`sa Görli network bilang isang halimbawa. Ito ay isang TEST token. Sa iyong DApp, maaari mo itong palitan ng anumang ERC20 token. Para makakuha ng ilang Test `TEST`token sa Polygon Network, maa-access mo ang [Polygon Faucet](https://faucet.polygon.technology/).

:::note

Para gamitin ang sarili mong token para sa mga deposits at withdrawals, kakailanganin mong makuha ang 'mapped', na mahalagang nangangahulugan ng paggawa ng mga kontrata sa main chain at 'aware' ng sidechain mo sa custom mong token.

:::

### Basic setup para sa Metamask Wallet (Opsyonal) {#basic-setup-for-the-metamask-wallet-optional}

1. [Gumawa ng wallet](/docs/develop/metamask/hello): Kung bago ka sa mga wallet, mag-set up ng MetaMask Account.
2. [I-configure](/docs/develop/metamask/config-polygon-on-metamask) ang Polygon testnet: Para madaling visualise ang daloy ng mga pondo sa Polygon, inutusan ito kung i-configure ang Polygon testnet sa Metamask Tandaan na ginagamit namin ang Metamask dito para lamang sa layunin ng visualization. Hindi kailangang gamitin ang Metamask para magamit ang Polygon.
3. [Gumawa ng Maraming Account](/docs/develop/metamask/multiple-accounts): Bago magsimula sa tutorial, maghanda ng 3 Ethereum test account.
4. [I-configure ang token sa Polygon](/docs/develop/metamask/custom-tokens): Upang madaling makita ang daloy ng pondo sa Polygon gamit ang Matic.js, maaari mong i-configure ang mga token sa Metamask. Ang `TEST`token, na kinuha bilang halimbawa para sa tutorial na ito, ay maaaring i-configure sa MetaMask para madaling i-visualize ang mga balanse ng account. Muli na tandaan na **opsyonal**. Madali mong i-query ang mga balanse ng token at iba pang variable gamit ang [web3.js](https://web3js.readthedocs.io/en/1.0/)
