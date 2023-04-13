---
id: overview
title: Panoramica
description: Heimdall è il cuore della rete Polygon
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

Heimdall è il cuore della rete Polygon. Gestisce i validatori, la selezione dei produttori di blocchi, gli span, il meccanismo di sincronizzazione dello stato tra Ethereum e Matic e altri aspetti essenziali del sistema.

Utilizza il **Cosmos-SDK** e una versione forked di Tendermint, chiamata **Peppermint**. Ecco la fonte di Peppermint: [https://github.com/maticnetwork/tendermint/tree/peppermint](https://github.com/maticnetwork/tendermint/tree/peppermint)

Heimdall rimuove alcuni dei moduli da Cosmos-SDK, ma utilizza per lo più una versione personalizzata di esso mentre segue lo stesso modello.