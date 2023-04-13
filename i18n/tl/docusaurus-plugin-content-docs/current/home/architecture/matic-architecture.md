---
id: polygon-architecture
title: Polygon PoS Architecture
description: Arkitektura ng Polygon PoS kabilang ang mga tanikala ng Heimdall at Bor
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - pos
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Polygon PoS Architecture {#polygon-pos-architecture}

Ang Polygon Network ay isang blockchain application platform na nagbibigay ng hybrid na Proof-of-Stake at Plasma-enabled sidechain.

Arkitekto, ang kagandahan ng Polygon ay ang eleganteng disenyo nito, na nagtatampok ng generic validation layer na hiwalay sa iba't ibang execution environment tulad ng full-blown EVM sidechains at iba pang layer 2 na lumalapit tulad ng mga zero-knowledge rollup.

Para i-enable ang PoS mechanism sa aming platform, isang set ng mga kontrata sa pangangasiwa ng **pag-stake** ang ipinapadala sa Ethereum, pati na rin ang set ng mga validator na nabigyan ng incentive na nagpapatakbo ng mga **Heimdall** at **Bor** node. Ethereum ang unang basechain na sinusuportahan ng Polygon, pero inilaan Polygon para magbigay ng suporta sa iba pang basechain, batay sa mga mungkahi at consensus ng komunidad, para i-enable ang interoperable na desentralisadong Layer 2 blockchain platform.

May tatlong tatlong layer na arkitektura ang Polygon PoS:

1. Pag-stake ng mga smart contract sa Ethereum
2. Heimdall (Proof of Stake layer)
3. Bor (Block producer layer)

<img src={useBaseUrl("img/matic/Architecture.png")} />

### Mga smart contract ng Polygon (sa Ethereum) {#polygon-smart-contracts-on-ethereum}

Pinapanatili ng Polygon ang isang set ng mga smart contract sa Ethereum, na nangangasiwa sa mga sumusunod:

- Pamamahala ng pag-stake para sa Proof-of-Stake layer
- Pamamahala sa pagtatalaga kabilang na ang mga validator share
- Mga checkpoint/snapshot ng sidechain state

### Heimdall (Proof-of-Stake validator layer) {#heimdall-proof-of-stake-validator-layer}

**Heimdall** ang PoS validator node na gumagana nang naaayon sa mga contract sa pag-Stake sa Ethereum para ma-enable ang PoS mechanism sa Polygon. Ipinatupad namin ito sa pamamagitan ng pagdaragdag ng mga pagbabago sa scheme ng lagda at iba't ibang istruktura ng data sa Tendermint consensus engine. Ito ang may responsibilidad sa pag-validate ng block, lupon para sa pagpili ng block producer, pag-checkpoint sa representation ng mga sidechain block sa Ethereum sa aming arkitektura at iba't iba pang responsibilidad.

Pinangangasiwaan ng Heimdall layer ang pagsasama-sama ng mga block na ginawa ng Bor sa isang Merkle tree at inilalathala ang Merkle root nang pana-panahon sa root chain. Tinatawag na peryodikong publishing na `checkpoints`ito. Sa bawat ilang bloke sa Bor, isang validator (sa Heimdall layer) ang:

1. Vina-validate ang lahat ng block mula sa huling checkpoint
2. Gumagawa ng merkle tree sa mga block hash
3. Ipina-publish ang merkle root sa main chain

Mahalaga ang mga checkpoint para sa dalawang dahilan:

1. Nagbibigay ng pagiging pinal sa Root Chain
2. Nagbibigay ng proof of burn sa pag-withdraw ng mga ari-arian

Maipapaliwanag ang bird's eye view ng proseso bilang:

- Pumipili ng subset ng mga active validator mula sa pool para magsilbing mga block producer sa loob ng isang takdang panahon. Papayagan din ng 2/3 ng nasa kapangyarihan ang Pagpili ng bawat takdang panahon. responsable ang mga block producer na ito sa paglikha ng mga block at pagsasahimpapawid nito sa natitirang network.
- Kabilang sa checkpoint ang root ng lahat ng block na binuo habang nasa anumang ibinigay na interval. Pare-pareho ang vina-validate ng lahat ng node at inilalakip ang kanilang lagda rito.
- Ang isang napiling tagapanukala mula sa set ng validator ay responsable sa pagkolekta ng lahat ng lagda para sa isang partikular na checkpoint at nag-commit ng pareho sa pangunahing chain.
- Nag-iiba-iba ang pagdepende ng responsibilidad sa pagbuo ng mga block at pagmumungkahi ng mga checkpoint sa stake ratio ng validator sa pangkalahatang pool.

### Bor (Block Producer Layer) {#bor-block-producer-layer}

Ang Bor ay block producer layer ng Polygon - ang entity na may respondibilidad sa pagsasama-sama ng mga transaksyon sa mga block.

Regular na sina-shuffle ang mga block producer sa pamamagitan ng lupon para sa pagpili sa Heimdall sa mga panahong tinatawag na `span` sa Polygon. Ginagawa ang mga block sa **Bor** node at compatible ang sidechain VM sa EVM. Regular ding vina-validate ng mga Heimdall node ang mga block na ginawa sa Bor, at regular na naka-commit sa Ethereum ang checkpoint na binubuo ng Merkle tree hash ng set ng mga block sa Bor.

### Dagdag na Pagbabasa {#further-reading}

- [Pagbuo sa Polygon Node Provider](https://www.alchemy.com/overviews/polygon-node)
- [Deep Dive sa Polygon Architecture](https://101blockchains.com/polygon-architecture/)

### Mga Resource {#resources}

- [Arkitektura ng Bor](https://forum.polygon.technology/t/matic-system-overview-bor/9123)
- [Arkitektura ng Heimdall](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
- [Mekanismo ng Checkpoint](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
