---
id: heimdall-chain
title: Heimdall Chain
description: "Proof-of-stake verifier layer on the Polygon Network."
keywords:
  - docs
  - polygon
  - matic
  - heimdall
  - chain
  - verifier
  - layer
slug: heimdall-chain
image: https://matic.network/banners/matic-network-16x9.png
---

Heimdall is is the proof-of-stake verifier layer, which is responsible for [checkpointing](../../glossary#checkpoint-transaction) the representation of the Plasma blocks to the Ethereum mainnet. Heimdall is based on [Tendermint](https://tendermint.com/).

The staking contract on the Ethereum mainnet works in conjunction with the Heimdall node to act as the trustless stake management mechanism for the PoS engine, including selecting the [validator](../../glossary#validator) set, updating validators, etc. Since staking is done in the contract on the Ethereum mainnet, Polygon does not rely only on validator honesty and instead inherits the Ethereum mainnet security.

Heimdall layer handles the aggregation of blocks produced by [Bor](../../glossary#bor) into a Merkle tree and publishes the Merkle root periodically to the Ethereum mainnet. This periodic publishing is called *checkpointing*.

For every few blocks on Bor, a validator (on the Heimdall layer):

1. Validates all the blocks since the last checkpoint.
2. Creates a Merkle tree of the block hashes.
3. Publishes the Merkle root to the Ethereum mainnet.

Checkpoints are important for two reasons:

1. Providing finality on the root chain.
2. Providing proof of burn in withdrawal of assets.

An overview of the process:

* A subset of active validators from the pool is selected to act as [block producers](../../glossary#block-producer) for a [span](../../glossary#span). These block producers are responsible for creating blocks and broadcasting the created blocks on the the network.
* A checkpoint includes the Merkle root hash of all blocks created during any given interval. All nodes validate the Merkle root hash and attach their signature to it.
* A selected [proposer](../../glossary#proposer) from the validator set is responsible for collecting all signatures for a particular checkpoint and committing the checkpoint on the Ethereum mainnet.
* The responsibility of creating blocks and proposing checkpoints is variably dependent on a validator’s stake ratio in the overall pool.

See also [Heimdall architecture](../../../pos/heimdall/overview).
