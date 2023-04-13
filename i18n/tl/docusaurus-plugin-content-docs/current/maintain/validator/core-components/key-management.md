---
id: key-management
title: Pamamahala ng Key
description: pamamahala ng mga key ng Signer at may-ari
keywords:
  - docs
  - polygon
  - matic
  - key
  - key management
  - signer
  - owner
slug: key-management
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Gumagamit ang bawat validator ng dalawang key upang pamahalaan ang mga aktibidad na may kaugnayan sa validator sa Polygon:

* Key ng signer
* Key ng may-ari

## Key ng signer {#signer-key}

Ang key ng signer ay ang address na ginagamit upang lagdaan ang mga Heimdall block, checkpoint, at iba pang aktibidad na may kaugnayan sa paglagda.

Kailangang makita ang pribadong key ng signer address sa machine na ngpapatakbo ng validator node para sa mga layunin ng pagpirma.

Hindi mapapamahalaan ng key ng signer ang pag-stake, mga gantimpala, o mga pag-delegate.

Ang validator ay dapat magpanatili ng ETH sa address ng signer sa Ethereum mainnet upang magpadala ng [mga checkpoint](/docs/maintain/glossary.md#checkpoint-transaction).

## Key ng may-ari {#owner-key}

Ang key ng may-ari ay ang address na ginagamit upang mag-stake, mag-restake, baguhin ang key ng signer, mag-withdraw ng mga gantimpla at pamahalaan ang mga parameter na may kaugnayan sa pag-delegate sa Ethereum mainnet. Kailangang i-secure ang pribadong key para sa key ng may-ari anuman ang mangyari.

Isinasagawa sa Ethereum mainnet ang lahat ng transaksyon gamit ang key ng may-ari.

Nananatili ang key ng signer sa node at karaniwang itinuturing na isang **hot** wallet. Samantala, madalang namang ginagamir ang key ng may-ari na karaniwang hindi secure, at itinuturing na isang **cold** wallet. Kinokontrol ng key ng may-ari ang mga naka-stake na pondo.

Isinasagawa ang ganitong paghihiwalay ng mga responsibilidad sa signer at sa mga key ng may-ari para tiyakin ang mabisang tradeoff sa pagitan ng seguridad at dali ng paggamit.

Ang parehong key ay mga address na compatible sa Ethereum at gumagana sa eksaktong parehong paraan.

## Pagbabago ng signer {#signer-change}

Tingnan ang [Baguhin ang Iyong Address ng Signer](/docs/maintain/validate/change-signer-address).
