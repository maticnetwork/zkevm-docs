---
id: architecture
title: Arkitektura
description: Ethereum, ang Heimdall at layer ng Bor
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - validator
slug: architecture
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Ang Polygon Network ay malawak na nahahati sa tatlong layer:

* **Ethereum** ang Ethereum — isang set ng mga kontrata sa Ethereum mainnet.
* **layer** ang Heimdall — isang set ng proof-of-stake na si Heimdall node na tumatakbo nang kapantay sa Ethereum mainnet, na monitoring sa set ng mga contract ng pag-stake na naka-deploy sa Ethereum mainnet, at nag-commit ng mga checkpoint ng Polygon Network sa Ethereum mainnet. Ang Heimdall ay nakabatay sa Tendermint.
* **Bor** ang Bor — isang set ng mga block-producing na block-producing ng mga node ng Bor node. Ang Bor ay nakabatay sa Go Ethereum.

<img src={useBaseUrl("img/staking/architecture.png")} />

## Pag-stake at mga Plasma smart contract sa Ethereum {#staking-and-plasma-smart-contracts-on-ethereum}

Para i-enable ang [Proof of Stake (PoS)](/docs/home/polygon-basics/what-is-proof-of-stake) mechanism sa Polygon, gumagamit ang system ng isang set ng mga kontrata sa pamamahala ng [pag-stake](/docs/maintain/glossary.md#staking) sa Ethereum mainnet.

Ipinapatupad ng mga kontrata sa pag-stake ang mga sumusunod na feature:

* Ang kakayahan para sa sinuman na mag-stake ng mga MATIC token sa mga kontrata sa pag-stake sa Ethereum mainnet at sumali sa system bilang [validator](/docs/maintain/glossary.md#validator).
* Kumita ng mga gantimpala sa pag-stake para sa pag-validate ng mga transisyon ng kalagayan sa Polygon Network.
* Mag-save ng [mga checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) sa Ethereum mainnet.

Ang PoS mechanism ay nagsisilbi ring pang-mitigate sa isyu ng hindi pagiging available ng data para sa mga Polygon sidechain.

## Heimdall (validation layer) {#heimdall-validation-layer}

Pinangangasiwaan ng Heimdall layer ang pagsasama-sama ng mga block na ginawa ng [Bor](/docs/maintain/glossary.md#bor) sa isang Merkle tree at regular na pina-publish ang Merkle root sa root chain. Tinatawag na [mga checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) ang regular na pag-publish ng mga snapshot ng Bor sidechain.

Kada ilang block sa Bor, ginagawa ng validator sa Heimdall layer ang sumusunod:

1. Vina-validate ang lahat ng block simula noong huling checkpoint.
2. Gumagawa ng Merkle tree ng mga block hash.
3. Pina-publish ang Merkle root hash sa Ethereum mainnet.

Mahalaga ang mga checkpoint para sa dalawang dahilan:

1. Pagbibigay ng finality sa root chain.
2. Pagbibigay ng proof of burn sa pag-withdraw ng mga asset.

Pangkalahatang-ideya ng proseso:

* Isang subset ng mga active na validator mula sa pool ang pinipili para kumilos bilang [mga block producer](/docs/maintain/glossary.md#block-producer) sa loob ng isang [span](/docs/maintain/glossary.md#span). Responsibilidad ang mga block producer ang paggawa ng mga block at pag-broadcast ng mga ginawang block sa network.
* Kabilang sa checkpoint ang Merkle root hash ng lahat ng block na nagawa habang nasa alinmang ibinigay na interval. Vina-validate ng lahat ng node ang Merkle root hash at inilalakip ang lagda nila rito.
* Responsibilidad ng napiling [tagapanakula](/docs/maintain/glossary.md#proposer) mula sa set ng validator ang pagkolekta ng lahat ng lagda para sa isang partikular na checkpoint at pag-commit ng checkpoint sa Ethereum mainnet.
* Nagbabago ang responsibilidad ng paggawa ng mga block at pag-propose ng mga checkpoint depende sa stake ratio ng validator sa kabuuang pool.

Tingnan din ang [Arkitektura ng Heimdall](/docs/pos/heimdall/overview).

## Bor (block producer layer) {#bor-block-producer-layer}

Ang Bor ay ang sidechain block producer ng Polygon—ang entity na responsable sa pagsasama-sama ng mga transaksyon sa mga block.

Ang mga block producer ng Bor ay isang subset ng mga validator at regular na sina-shuffle ng mga validator ng [Heimdall](/docs/maintain/glossary.md#heimdall).

Tingnan din ang [Arkitektura ng Bor](/docs/pos/bor/overview).
