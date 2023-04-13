---
id: ipfs
title: IPFS
description: "IPFS - Ibinahagi na system para sa pag-iimbak at pag-access ng data."
keywords:
  - IPFS
  - matic
  - docs
  - polygon
  - storage
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### Context {#context}

Binabawasan ng polygon blockchain ang mga gastos sa transaksyon upang mag-imbak ng data kumpara sa Ethereum mainnet. Gayunpaman, mabilis na lumalaki kahit na ang mga mas mababang gastos na ito kapag nag-iimbak ng malalaking file. Dapat ding isaalang-alang ng mga developer ang mga hadlang sa laki ng block at mga limitasyon sa bilis ng transaksyon kapag nag-iimbak ng data sa onchain. Isang solusyon na tumutugon sa lahat ng mga alalahanin na ito ay ang IPFS, ang InterPlanetary File System.

#### Ano ang IPFS? {#what-is-ipfs}

Ang IPFS ay isang distributed system para sa pag-iimbak at pag-access ng mga file, website, application, at data. Gumagamit ang IPFS ng desentralisasyon, pagtugon sa nilalaman, at isang matatag na network ng peer-to-peer ng mga aktibong kalahok upang payagan ang mga user na mag-imbak, humiling, at maglipat ng nabe-verify na data sa isa't isa.

Ginagawang posible ng desentralisasyon na mag-download ng file mula sa maraming lokasyon na hindi pinamamahalaan ng  organisasyon, na nagbibigay ng katatagan at paglaban sa censorship sa oras ding iyon.

Gumagamit ang pagtugon sa nilalaman ng cryptography upang gumawa ng natatanging nabe-verify na hash batay sa kung ano ang nasa file sa halip na kung saan ito matatagpuan. Nagbibigay ang resultang content identifier (CID) ng katiyakan na magkapareho ang piraso ng data saan man ito nakaimbak.

Sa wakas, ginagawang posible ng patuloy na lumalagong aktibong komunidad ng mga user ang peer-to-peer na pagbabahagi ng nilalaman na ito. Nag-upload ang mga developer at nag-pin ng nilalaman sa IPFS habang tumutulong ang mga storage provider ng Filecoin o Crust para matiyak ang patuloy na pag-iimbak ng nilalaman na iyon.


Ang imbakan na nakabatay sa IPFS ay nagbibigay-daan sa iyo na iimbak lamang ang CID para sa iyong nilalaman sa halip na i-load ang buong mga file sa Polygon blockchain; nagbibigay-daan para sa mga pinababang gastos, mas malalaking sukat ng file, at mapapatunayang patuloy na imbakan. Para sa karagdagang detalye ay tumutukoy sa [mga IPFS Doc](https://docs.ipfs.io/).

### Mga Halimbawang Proyekto {#example-projects}

1. Tutorial sa scaffold-eth na nagpapakita kung paano mag-mint ang isang NFT sa Polygon gamit ang IPFS - [link](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example)

2. Pagbuo ng isang ganap na stack web3 app na may Next.js, Polygon, Solidity, Ang Graph, IPFS, at Hardhat - [link](https://dev.to/dabit3/the-complete-guide-to-full-stack-web3-development-4g74)
