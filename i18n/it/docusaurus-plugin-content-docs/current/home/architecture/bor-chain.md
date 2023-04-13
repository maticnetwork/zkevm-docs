---
id: bor-chain
title: Che cos'è Bor-Chain?
sidebar_label: Bor Chain
description: Introduzione alla Bor Chain o alla Sidechain VM per Polygon PoS
keywords:
  - docs
  - matic
  - polygon
  - bor chain
  - sidechain VM
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Bor chain {#bor-chain}

Il nodo Bor o l'implementazione del produttore di blocco, è fondamentalmente l'operatore sidechain. La VM della sidechain è compatibile con la EVM. Al momento, è un'implementazione Geth di livello base con un algoritmo di consenso modificato in modo specifico. Tuttavia, verrà ricostruito da zero per renderlo leggero e mirato.

I produttori dei blocchi vengono scelti dall'insieme di Validatori e vengono ridistribuiti utilizzando gli hash storici del blocco di Ethereum per il medesimo scopo. Tuttavia, per tale selezione stiamo esplorando fonti di casualità.