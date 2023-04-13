---
id: heimdall-chain
title: Heimdall Chain
description: Proof-of-stake verifier layer sa Polygon Network
keywords:
  - docs
  - polygon
  - matic
  - heimdall
  - chain
  - verifier
  - layer
  - proof of stake
slug: heimdall-chain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Ang Heimdall ay ang proof-of-stake verifier layer, na responsable sa [pag-checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) ng representasyon ng mga block ng Plasma sa Ethereum mainnet. Ang Heimdall ay nakabatay sa [Tendermint](https://tendermint.com/).

Ang kontrata sa pag-stake sa Ethereum mainnet ay gumagana kasabay ng Heimdall node para gumanap bilang trustless na mekanismo sa pamamahala ng stake para sa PoS engine, kabilang ang pagpili ng set ng [validator](/docs/maintain/glossary.md#validator), pag-update ng mga validator, atbp. Dahil ginagawa ang pag-stake sa kontrata sa Ethereum mainnet, hindi lang umaasa ang Polygon sa katapatan ng validator kundi pati na rin sa tinataglay na seguridad ng Ethereum mainnet.

Pinangangasiwaan ng Heimdall layer ang pagsasama-sama ng mga block na ginawa ng [Bor](/docs/maintain/glossary.md#bor) sa isang Merkle tree at regular na pina-publish ang Merkle root sa Ethereum mainnet. Tinatawag na *pag-checkpoint* ang regular na pagpa-publish na ito.

Kada ilang bloke sa Bor, ginagawa ng validator (sa Heimdall layer) ang sumusunod:

1. Vina-validate ang lahat ng block simula noong huling checkpoint.
2. Gumagawa ng Merkle tree ng mga block hash.
3. Pina-publish ang Merkle root sa Ethereum mainnet.

Mahalaga ang mga checkpoint para sa dalawang dahilan:

1. Pagbibigay ng finality sa root chain.
2. Pagbibigay ng proof of burn sa pag-withdraw ng mga asset.

Pangkalahatang-ideya ng proseso:

* Isang subset ng mga active na validator mula sa pool ang pinipili para kumilos bilang [mga block producer](/docs/maintain/glossary.md#block-producer) sa loob ng isang [span](/docs/maintain/glossary.md#span). Responsibilidad ang mga block producer ang paggawa ng mga block at pag-broadcast ng mga ginawang block sa network.
* Kabilang sa checkpoint ang Merkle root hash ng lahat ng block na nagawa habang nasa alinmang ibinigay na interval. Vina-validate ng lahat ng node ang Merkle root hash at inilalakip ang lagda nila rito.
* Responsibilidad ng napiling [tagapanakula](/docs/maintain/glossary.md#proposer) mula sa set ng validator ang pagkolekta ng lahat ng lagda para sa isang partikular na checkpoint at pag-commit ng checkpoint sa Ethereum mainnet.
* Nagbabago ang responsibilidad ng paggawa ng mga block at pag-propose ng mga checkpoint depende sa stake ratio ng validator sa kabuuang pool.

Tingnan din ang [Arkitektura ng Heimdall](/docs/pos/heimdall/overview).
