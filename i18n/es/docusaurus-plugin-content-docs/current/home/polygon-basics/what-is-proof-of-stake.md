---
id: what-is-proof-of-stake
title: What is Proof of Stake?
description: "A consensus algorithm reliant to validators."
keywords:
  - docs
  - matic
  - polygon
  - stake
  - delegate
  - validate
  - pos
image: https://matic.network/banners/matic-network-16x9.png
---

Proof of Stake (PoS) is a category of consensus algorithms for public blockchains that depend on a validator's economic [stake](/docs/maintain/glossary#staking) in the network.

In proof of work (PoW) based public blockchains, the algorithm rewards participants who solve cryptographic puzzles to validate transactions and create new blocks. PoW blockchain examples: Bitcoin, current Ethereum.

In PoS-based public blockchains, a set of validators take turns proposing and voting on the next block. The weight of each validator's vote depends on the size of its deposit — [stake](/docs/maintain/glossary#staking). Significant advantages of PoS include security, reduced risk of centralization, and energy efficiency. PoS blockchain examples: Eth2, Polygon.

In general, a PoS algorithm looks as follows. The blockchain keeps track of a set of validators, and anyone who holds the blockchain's base cryptocurrency (in Ethereum's case, ether) can become a validator by sending a special type of transaction that locks up their ether into a deposit. The process of creating and agreeing to new blocks is then done through a consensus algorithm that all current validators can participate in.

There are many kinds of consensus algorithms, and many ways to assign rewards to validators who participate in the consensus algorithm, so there are many "flavors" of proof of stake. From an algorithmic perspective, there are two major types: chain-based PoS and [BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance)-style PoS.

In **chain-based proof of stake**, the algorithm pseudo-randomly selects a validator during each time slot (e.g. every period of 10 seconds might be a time slot), and assigns that validator the right to create a single block, and this block must point to some previous block (normally the block at the end of the previously longest chain), and so over time most blocks converge into a single constantly growing chain.

In **BFT-style proof of stake**, validators are **randomly** assigned the right to *propose* blocks, but *agreeing on which block is canonical* is done through a multi-round process where every validator sends a "vote" for some specific block during each round, and at the end of the process all (honest and online) validators permanently agree on whether or not any given block is part of the chain. Note that blocks may still be *chained together*; the key difference is that consensus on a block can come within one block, and does not depend on the length or size of the chain after it.

For more details, refer [https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ).

See also:

* [Delegator](/docs/maintain/glossary#delegator)
* [Validator](/docs/maintain/glossary#validator)
