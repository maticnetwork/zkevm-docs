---
id: overview
title: Visão geral
description: O nó do Bor é basicamente o operador do sidechain
keywords:
  - docs
  - matic
  - polygon
  - bor
  - geth
image: https://matic.network/banners/matic-network-16x9.png
---

# BOR {#bor}

O nó Bor ou a implementação do Produtor de Blocos é basicamente o operador de sidechain. A sidechain VM é compatível com EVM. Atualmente, é uma implementação Geth básica com mudanças personalizadas feitas no algoritmo de consenso. No entanto, este será construído a partir do zero para se tornar leve e focado.

Os produtores de bloco são escolhidos a partir do conjunto de Validador e são baralhados usando hashes históricos do bloco Ethereum para o mesmo propósito. No entanto, estamos a explorar fontes de aleatoriedade para esta seleção.