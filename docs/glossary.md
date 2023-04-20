---
id: glossary
title: Polygon zkEVM Glossary
sidebar_label: Glossary
description: Definition of key terms related to the Polygon zkEVM
keywords:
  - docs
  - zk rollups
  - polygon
  - zkEVM
  - glossary
  - Polygon zkEVM
---

### Layer 1

Layer 1 or the base blockchain is where the rollup smart contracts are installed. It's Ethereum or a testnet of Ethereum, but it could be any EVM-compatible blockchain.

### Layer 2

Layer 2 refers to the rollup network; in our case,  the Polygon zkEVM network.

### Consensus Contract (PolygonZkEVM.sol)

Consensus mechanism utilized by the Polygon zkEVM network. It is enforced by the smart contracts deployed on Layer 1 (in this case, Ethereum).

### Batch

A group of transactions that are executed / proved, using the zkProver and sent to / synchronized from L1.

### Sequencer

zkEVM participant who is responsible for selecting transactions, putting them in a specific order, and sending them to L1 in batches.

### Trusted Sequencer

A sequencer with special privileges. There can be **only one** trusted sequencer. The privileges granted to the trusted sequencer allow it to forecast batches that will be applied to L1. In this way, it can commit to a specific sequence before interacting with L1. This is done in order to achieve **fast finality** and **reduce costs** associated with using the network (lower gas fees).

### Permissionless Sequencers

A sequencer role that can be performed by anyone on the network. Although it has competitive disadvantages compared to the trusted sequencer (like slow finality, or MEV attacks), its main purpose is to enforce **decentralization** and **censorship resistance** to the network.

### Sequence

Group of **batches and other metadata** that the trusted sequencer sends to L1 in order to update the state.

### Forced Batch

A batch that is sent by permissionless sequencers to L1 in order to update the state.

### L2 Block

Same as an L1 block, but for L2. It is mostly used by the JSON-RPC interface.

Currently, all L2 Blocks are set to only include one transaction. This is done to achieve instant finality. Therefore, it's not necessary to close a batch to allow the JSON-RPC to expose results of already processed transactions.

### Trusted State

L2 state committed by the trusted sequencer.

### Virtual State

State reached after processing transactions that have already been submitted to L1. These transactions are sent in batches by either trusted or permissionless sequencers. Those batches are also called **virtual batches**. This state is trustless as it relies on L1 (here Ethereum) for security.

### Consolidated State

State which is proven on-chain by submitting a **ZKP (Zero Knowledge Proof)** that proves the execution of a sequence of the last virtual batch.

### Invalid Transaction

A transaction that can't be processed and doesn't affect the network state. Such a transaction could be included in a virtual batch. The reason for a transaction to be invalid could be related to:
- Ethereum protocol: invalid nonce, not enough balance, etc
- limitations introduced by zkEVM: each batch can utilize a limited amount of resources such as the total amount of keccak hashes that can be computed.

### Reverted Transaction

A transaction that is executed, but is reverted (because of smart contract logic). The main difference between invalid and reverted transaction is that **reverted transaction modifies the state**, at least to increment the nonce of the sender.
