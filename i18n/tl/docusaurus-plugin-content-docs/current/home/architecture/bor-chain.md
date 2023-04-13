---
id: bor-chain
title: Ano ang BoR-Chain?
sidebar_label: Bor Chain
description: Panimula sa Bor Chain o sa Sidechain VM para sa Polygon PoS
keywords:
  - docs
  - matic
  - polygon
  - bor chain
  - sidechain VM
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Bor Chain {#bor-chain}

Ang Bor node, o ang implementasyon ng block producer, ay talaga namang sidechain operator. Ang sidechain VM ay compatible sa EVM. Sa kasalukuyan, isa itong basikong pagpapatupad ng Geth na may mga kustomisadong na pagbabago na ginawa sa algoritmo ng consensus. Gayunpaman, itataguyod ito mula sa ibaba pataas para gawing magaan at nakatuon.

Pinipili ang mga block producer mula sa set ng Validator at binabalasa gamit ang mga dating block hash ng Ethereum para sa parehong layunin. Gayunpaman, tinutuklas namin ang mga pinagmumulan ng pagiging random para sa pagpili na ito.