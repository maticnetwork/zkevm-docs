---
id: polygon-architecture
title: Ang arkitektura ng Polygon
description: Ang arkitektura ng Polygon
keywords:
  - architecture
  - layers
  - polygon
  - matic
  - docs
  - research
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Ang arkitektura ng Polygon {#the-architecture-of-polygon}

Ang **Polygon** ay isang platform ng application ng blockchain na nagbibigay ng hybrid Proof-of-Stake at Proof-of-Stake na sidechains.

Sa arkitektura, ang kagandahan ng Polygon ay ang eleganteng disenyo nito, na nagtatampok ng generic na layer ng validation na hiwalay sa iba't ibang environemnt ng pagsasagawa tulad ng mga chain na pinagana ang plasma, full-blown na EVM sidechain, at sa hinaharap, iba pang mga paraan sa Layer 2 gaya ng Optimistic Rollups.

Ang Polygon PoS Network ay may tatlong layer na arkitektura:

* **Ethereum** ang Ethereum — isang set ng mga kontrata sa Ethereum mainnet.
* **layer** ang Heimdall — isang set ng proof-of-stake na ang mga node na tumatakbo nang parallel sa Ethereum mainnet, na sinusubaybayan ang set ng mga contract ng pag-stake na naka-deploy sa Ethereum mainnet at nag-commit ng mga checkpoint ng Polygon Network sa Ethereum mainnet. Ang Heimdall ay nakabatay sa Tendermint.
* **Bor** ang Bor — isang set ng mga block-producing na block-producing ng mga node ng Bor node. Ang Bor ay nakabatay sa Go Ethereum.

<img src={useBaseUrl("img/staking/architecture.png")} />

Sa kasalukuyan, maaaring gamitin ng mga developer ang **Plasma** para sa mga partikular na transition ng state kung saan mayroon ang mga predicate ng Plasma
na naisulat, gaya ng ERC20, ERC721, mga asset swap, o iba pang mga custom na predicate. Para sa mga arbitrary na state transition,
maaari nilang gamitin ang PoS. O pareho! Ito ay naging posible sa pamamagitan ng hybrid construction ng Polygon.

Upang paganahin ang mekanismo ng PoS sa platform natin, ang isang set ng **pag-stake** na pamamahala ng kontrata ay na-deploy sa
Ethereum at isang set ng mga incentivized validator na nagpapatakbo ng **Heimdall** at **Bor** na mga node. Ang Ethereum ay
ang unang basechain na sinusuportahan ng Polygon, ngunit nilalayon ng Polygon na mag-alok ng suporta para sa karagdagang mga basechain upang
paganahin ang isang interoperable na desentralisadong Layer 2 blockchain platform batay sa mga mungkahi at pinagkasunduan ng komunidad.

<img src={useBaseUrl("img/matic/Architecture.png")} />

## Pag-stake ng mga Kontrata {#staking-contracts}

Upang paganahin ang mekanismo ng [Proof of Stake (PoS)](docs/home/polygon-basics/what-is-proof-of-stake) sa Polygon,
gumagamit ang system ng set ng [pag-stake](/docs/maintain/glossary#staking) na pamamahala ng mga kontrata sa Ethereum mainnet.

Ipinapatupad ng mga kontrata sa pag-stake ang mga sumusunod na feature:

* Kahit sino ay maaaring maglagay ng mga MATIC token sa mga kontrata ng pag-stake sa Ethereum mainnet at sumali sa system bilang [validator](/docs/maintain/glossary#validator).
* Kumita ng mga gantimpala sa pag-stake para sa pag-validate ng mga transisyon ng kalagayan sa Polygon Network.
* Mag-save ng [mga checkpoint](/docs/maintain/glossary#checkpoint-transaction) sa Ethereum mainnet.

Gumaganap din ang PoS na mekanismo bilang mitigasyon sa problema sa hindi pagiging available ng data para sa mga Polygon sidechain.

## Heimdall {#heimdall}

Ang Heimdall ang proof of stake na layer ng validation na nangangasiwa sa aggregation ng mga block na ginawa
ng [Bor](/docs/maintain/glossary#bor) sa isang Merkle tree at pana-panahong pag-publish ang Merkle root sa
root chain. Ang pana-panahong pag-publish ng mga snapshot ng Bor sidechain ay tinatawag na [mga checkpoint](/docs/maintain/glossary#checkpoint-transaction).

1. Bina-validate ang lahat ng block mula sa huling checkpoint.
2. Gumagawa ng Merkle tree ng mga block hash.
3. Pina-publish ang Merkle root hash sa Ethereum mainnet.

Mahalaga ang mga checkpoint para sa dalawang dahilan:

1. Pagbibigay ng finality sa root chain.
2. Pagbibigay ng proof of burn sa pag-withdraw ng mga asset.

Pangkalahatang-ideya ng proseso:

* Isang subset ng mga active na validator mula sa pool ang pinipili para kumilos bilang [mga block producer](/docs/maintain/glossary#block-producer) sa loob ng isang [span](/docs/maintain/glossary#span). Responsibilidad ang mga block producer ang paggawa ng mga block at pag-broadcast ng mga ginawang block sa network.
* Kabilang sa checkpoint ang Merkle root hash ng lahat ng block na nagawa habang nasa alinmang ibinigay na interval. Vina-validate ng lahat ng node ang Merkle root hash at inilalakip ang lagda nila rito.
* Responsibilidad ng napiling [tagapanakula](/docs/maintain/glossary#proposer) mula sa set ng validator ang pagkolekta ng lahat ng lagda para sa isang partikular na checkpoint at pag-commit ng checkpoint sa Ethereum mainnet.
* Ang responsibilidad ng paggawa ng mga block at pagpapanukala ng mga checkpoint ay pabagu-bagong nakadepende sa stake ratio ng validator sa pangkabuuang pool.

Available ang higit pang detalye tungkol sa Heimdall sa gabay sa [arkitektura ng Heimdall](/docs/pos/heimdall/overview).

## Bor {#bor}

Ang Bor ay layer ng block producer ng sidechain ng Polygon - ang entity na responsable sa pagsasama-sama ng mga transaksyon sa mga block. Sa kasalukuyan, isa itong pangunahing pagpapatupad ng Geth na may mga custom na pagbabagong ginawa sa algorithm ng pinagkasunduan.

Ang mga producer ng block ay isang subnet ng mga validator at pana-panahong shuffled sa pamamagitan ng pagpili ng komite sa [Heimdall](/docs/maintain/glossary#heimdall) sa mga duration na itinatawag `span`bilang isang Polygon. Ang mga block ay ginagawa sa **Bor** na node, at ang sidechain VM ay EVM-compatible.
Ang mga block na ginawa sa Bor ay pana-panahon ding bina-validate ng mga Heimdall node, at isang checkpoint na binubuo
ng Merkle tree hash ng isang set ng mga block sa Bor ay pana-panahong naka-commit sa Ethereum.

Makakakuha ng higit pang detalye sa gabay sa [Arkitektura ng Bor](/docs/pos/bor/overview).

## Mga Resource {#resources}

* [Arkitektura ng Bor](https://wiki.polygon.technology/docs/pos/bor)
* [Arkitektura ng Heimdall](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
* [Mekanismo ng Checkpoint](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
