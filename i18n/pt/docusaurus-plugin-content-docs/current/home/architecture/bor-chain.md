---
id: bor-chain
title: O que é a BoR-Chain?
sidebar_label: Bor Chain
description: Introdução à Chain de Bor ou à VM de Sidechain para Polygon PoS
keywords:
  - docs
  - matic
  - polygon
  - bor chain
  - sidechain VM
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# BOR Chain {#bor-chain}

O nó do Bor ou a implantação do produtor de blocos, é basicamente o operador do sidechain. A sidechain VM é compatível com EVM. Atualmente, é uma implementação Geth básica com mudanças personalizadas feitas no algoritmo de consenso. No entanto, este será construído a partir do zero para se tornar leve e focado.

Os produtores de bloco são escolhidos a partir do conjunto de Validador e são baralhados usando hashes históricos do bloco Ethereum para o mesmo propósito. No entanto, estamos a explorar fontes de aleatoriedade para esta seleção.