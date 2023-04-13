---
id: heimdall-chain
title: Ano ang Heimdall Chain?
sidebar_label: Heimdall Chain
description: Buuin ang susunod mong blockchain app sa Polygon.
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - checkpoint
  - pos
  - verifier
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Heimdall Chain {#heimdall-chain}

Ang Heimdall ay layer ng Proof-of-Stake Verifier ng Polygon, na may responsibilidad para mag-checkpoint ng isang representation ng mga Plasma block sa main chain ng aming arkitektura. Ipinatupad namin ito sa pamamagitan ng pagdaragdag ng mga pagbabago sa scheme ng lagda at iba't ibang istruktura ng data sa Tendermint consensus engine.

Gumagana ang pangunahing kontrata ng Stake Manager kasabay ng pag-stake ng Heimdall node na kumilos bilang walang tiwalang stake management mechanism para sa PoS engine, kabilang ang pagpili ng validator set, pag-update ng mga validator, at iba pa. Dahil ginagawa ang pag-stake sa smart contract ng Ethereum, hindi kami umaasa lamang sa katapatan ng validator at sa halip ay nagmana ng seguridad ng Ethereum chain para sa mahalagang bahagi na ito.

Pinangangasiwaan ng Heimdall layer ang pagsasama-sama ng mga block na ginawa ng Bor sa isang Merkle tree at inilalathala ang Merkle root nang pana-panahon sa root chain. Tinatawag na **"checkpoint"**. Sa bawat ilang bloke sa Bor, isang validator (sa Heimdall layer) ang:

1. Vina-validate ang lahat ng block mula sa huling checkpoint
2. Gumagawa ng merkle tree sa mga block hash
3. Ipina-publish ang merkle root sa main chain

Mahalaga ang mga checkpoint para sa dalawang dahilan:

1. Nagbibigay ng pagiging pinal sa Root Chain
2. Nagbibigay ng proof of burn sa pag-withdraw ng mga ari-arian

Maipapaliwanag ang bird's eye view ng proseso bilang:

- Pumipili ng subset ng mga active validator mula sa pool para magsilbing mga block producer sa loob ng isang takdang panahon. Papayagan din ng 2/3 ng nasa kapangyarihan ang Pagpili ng bawat takdang panahon. responsable ang mga block producer na ito sa paglikha ng mga block at pagsasahimpapawid ng mga ito sa natitirang network.
- Kabilang sa checkpoint ang root ng lahat ng block na binuo habang nasa anumang ibinigay na interval. I-validate ng lahat ng node ang pareho at i-attach ang kanilang mga lagda dito.
- Ang isang napiling tagapanukala mula sa set ng validator ay responsable sa pagkolekta ng lahat ng lagda para sa isang partikular na checkpoint at nag-commit ng pareho sa pangunahing chain.
- Nag-iiba-iba ang pagdepende ng responsibilidad sa pagbuo ng mga block at pagmumungkahi ng mga checkpoint sa stake ratio ng validator sa pangkalahatang pool.