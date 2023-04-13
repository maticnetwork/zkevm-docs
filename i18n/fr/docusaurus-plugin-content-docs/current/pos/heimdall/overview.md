---
id: overview
title: Aperçu
description: Heimdall est le cœur du réseau Polygon
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - cosmos
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Heimdall {#heimdall}

Heimdall est le cœur du réseau Polygon. Il gère les validateurs, la sélection de producteur de bloc, les durées, le mécanisme de synchronisation d'état entre Ethereum et Matic et d'autres aspects essentiels du système.

Il utilise le **Cosmos-SDK** et une version forked de Tendermint, appelée **Peppermint**. Voici la source Peppermint : [https://github.com/maticnetwork/tendermint/tree/peppermint](https://github.com/maticnetwork/tendermint/tree/peppermint)

Heimdall supprime certains des modules de Cosmos-SDK, mais utilise principalement une version personnalisée tout en suivant le même modèle.