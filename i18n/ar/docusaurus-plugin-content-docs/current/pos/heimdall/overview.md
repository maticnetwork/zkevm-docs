---
id: overview
title: Overview
description: Heimdall is the heart of the Matic network. It manages validators, block producer span, the state-sync mechanism and other essentials aspects of the system.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Heimdall is the heart of the Matic system. It manages validators, block producer selection, spans, the state-sync mechanism between Ethereum and Matic and other essentials aspects of the system.

It uses the Cosmos-SDK and a forked version of Tendermint, called Peppermint. Peppermint source: [https://github.com/maticnetwork/tendermint/tree/peppermint](https://github.com/maticnetwork/tendermint/tree/peppermint)

Heimdall removes some of the modules from Cosmos-SDK, but mostly it uses a customised version of it - but follows the same pattern.