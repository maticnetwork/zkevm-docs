---
id: overview
title: Panoramica
description: Il nodo di Bor è fondamentalmente l'operatore sidechain
keywords:
  - docs
  - matic
  - polygon
  - bor
  - geth
image: https://matic.network/banners/matic-network-16x9.png
---

# Bor {#bor}

Il nodo Bor, o l'implementazione Block Producer, è fondamentalmente l'operatore della sidechain. La VM della sidechain è compatibile con la EVM. Al momento, è un'implementazione Geth di livello base con un algoritmo di consenso modificato in modo specifico. Tuttavia, verrà ricostruito da zero per renderlo leggero e mirato.

I produttori dei blocchi vengono scelti dall'insieme di Validatori e vengono ridistribuiti utilizzando gli hash storici del blocco di Ethereum per il medesimo scopo. Tuttavia, per tale selezione stiamo esplorando fonti di casualità.