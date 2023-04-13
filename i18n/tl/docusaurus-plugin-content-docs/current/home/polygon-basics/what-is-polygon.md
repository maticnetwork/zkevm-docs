---
id: what-is-polygon
title: Ano Ang Polygon?
description: Alamin ang tungkol sa solusyon sa pag-scale ng Polygon
keywords:
  - docs
  - matic
  - polygon
  - blockchain
  - ethereum scaling
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Ang [Polygon](https://polygon.technology/) ay isang Layer 2 na solusyon sa pag-scale na nakakakuha ng scale sa paggamit ng mga sidechain para sa off-chain computation at ng desentralisadong network ng mga Proof-of-Stake (PoS) validator.

Sinisikap ng Polygon na lutasin ang mga problema sa kakayahang mai-scale at kakayahang magamit nang hindi ikinokompromiso ang desentralisasyon at pagpapataas ng umiiral na komunidad at ecosystem ng developer. Naglalayon ito sa pagpapabuti ng mga umiiral na platform sa pamamagitan ng pagbibigay ng scalability at superior na karanasan ng gumagamit sa mga dApps at pag-andar ng user.

Isa itong solusyon sa pag-scale para sa mga pampublikong blockchain. Sinusuportahan ng Polygon PoS ang lahat ng umiiral na Ethereum tooling kasama ang mga mas mabilis at mas murang transaksyon.

## Mga pangunahing feature at highlight {#key-features-highlights}

- **Kakayahang Mai-scale**: Mabibilis, mga mura, at mga ligtas na transaksyon sa mga Polygon sidechain na may finality na nakamit sa mainchain at Ethereum bilang unang compatible na Layer 1 basechain.
- **Mataas na throughput**: Nakakamit hanggang 10,000 TPS sa isang sidechain sa internal testnet; Maramihang chain ang idadagdag sa horizontal na pag-scale.
- **User experience**: Maayos na UX at developer abstraction mula sa mainchain hanggang sa Polygon chain; mga native mobile app at SDK na may suporta sa WalletConnect.
- **Seguridad**: Ang mga operator ng Polygon chain ay mga staker din mismo sa PoS system.
- **Mga pampublikong sidechain**: Ang mga Polygon sidechain ay natural na pampubliko (vs. mga indibidwal na DApp chain), hindi kailangan ng pahintulot, at may kakayahang sumuporta sa maramihang protocol.

Maingat na dinisenyo ang Polygon system para suportahan ang arbitraryong pagbabago ng state sa mga Polygon sidechain, na EVM-enabled.

## Mga Tungkulin ng Delegator at Validator {#delegator-and-validator-roles}

Puwede kang lumahok sa Polygon network bilang delegator o validator. Tingnan ang:

* [Sino ang Validator](/docs/maintain/polygon-basics/who-is-validator)
* [Sino ang Delegator](/docs/maintain/polygon-basics/who-is-delegator)

## Arkitektura {#architecture}

Kung layunin mong maging validator, mahalagang nauunawaan mo ang arkitektura ng Polygon.

Tingnan ang [Arkitektura ng Polygon](/docs/maintain/validator/architecture) para sa karagdagang impormasyon.

### Mga Bumubuo {#components}

Para bahagyang maunawaan ang arkitektura ng Polygon, tingnan ang mga pangunahing bumubuo rito:

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [Mga Kontrata](/docs/pos/contracts/stakingmanager)

#### Mga Codebase {#codebases}

Para bahagyang maunawaan ang mga pangunahing bumubuo rito, tingnan ang mga codebase:

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Mga Kontrata](https://github.com/maticnetwork/contracts)

## Mga How-to {#how-tos}

### Pag-set up ng node {#node-setup}

Kung gusto mong magpatakbo ng isang buong node sa Polygon Mainnet o Mumbai Testnet, maaari mong sundin ang [Magpatakbo ng gabay ng Validator Node](/maintain/validate/run-validator.md)

### Mga operasyon sa pag-stake {#staking-operations}

Tingnan kung paano isinasagawa ang proseso ng pag-stake para sa mga profile ng validator at delegator:

* [Mga Operasyon sa Pag-Stake ng Validator](docs/maintain/validate/validator-staking-operations)
* [I-delegate](/docs/maintain/delegate/delegate)
