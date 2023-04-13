---
id: heimdall-chain
title: What is Heimdall Chain?
sidebar_label: Heimdall Chain
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Heimdall is Polygon Proof-of-Stake Verifier layer, which is responsible for checkpointing a representation of the Plasma blocks to the main chain in our architecture. We have implemented this by building on top of the Tendermint consensus engine with changes to the signature scheme and various data structures.

The main chain Stake Manager contract works in conjunction with the Heimdall node to act as the trust-less stake management mechanism for the PoS engine, including selecting the Validator set, updating validators, etc. Since staking is actually done on the Ethereum smart contract, we do not rely only on validator honesty and instead inherit Ethereum chain security for this key part.

Heimdall layer handles the aggregation of blocks produced by Bor into a merkle tree and publishing the merkle root periodically to the root chain. This periodic publishing are called ‘checkpoints’. For every few blocks on Bor, a validator (on the Heimdall layer):

1. Validates all the blocks since the last checkpoint
2. Creates a merkle tree of the block hashes
3. Publishes the merkle root to the main chain

Checkpoints are important for two reasons:

1. Providing finality on the Root Chain
2. Providing proof of burn in withdrawal of assets

A bird’s eye view of the process can be explained as:

- A subset of active validators from the pool are selected to act as block producers for a span. The Selection of each span will also be consented by at least 2/3 in power. These block producers are responsible for creating blocks and broadcasting it to the remaining of the network.
- A checkpoint includes the root of all blocks created during any given interval. All nodes validate the same and attach their signature to it.
- A selected proposer from the validator set is responsible for collecting all signatures for a particular checkpoint and committing the same on the main-chain.
- The responsibility of creating blocks and also proposing checkpoints is variably dependent on a validator’s stake ratio in the overall pool.