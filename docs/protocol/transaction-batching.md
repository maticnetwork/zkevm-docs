---
id: transaction-batching
title: Transaction Batching
sidebar_label: Transaction Batching
description: A guide to help developers understand the transaction life cycle in zkEVM.
keywords:
  - polygon
  - zkEVM
  - protocol
  - Transaction Batching
  - Sequencer
  - global exit tree
---

:::info

This document is a continuation in the series of articles explaining the [<ins>Transaction Life Cycle</ins>](l2-transaction-cycle-intro.md) inside Polygon zkEVM.

:::

The **Trusted Sequencer** must batch the transactions using the following `BatchData` struct specified in the `PolygonZkEVM.sol` contract:

```
struct BatchData {
  bytes transactions;
  bytes32 globalExitRoot;
  uint64 timestamp;
  uint64 minForcedTimestamp;
}
```

### `transactions`

​These are byte arrays containing the concatenated batch transactions. 

​Each transaction is **encoded according to the Ethereum pre-EIP-155 or EIP-155 formats using RLP (Recursive-length prefix) standard**, but the signature values, `v`, `r` and `s`, are concatenated as shown below;

1. `EIP-155`: $\mathtt{\ rlp(nonce, gasprice, gasLimit, to, value, data, chainid, 0, 0,) \#v\#r\#s}$ 

2. `pre-EIP-155`: $\mathtt{\ rlp(nonce, gasprice, gasLimit, to, value, data) \#v\#r\#s }$.

### `globalExitRoot`

This is the **root of the Bridge's Global Exit Merkle Tree**, which will be synchronized in the L2 State at the start of batch execution.

The Bridge transports assets between L1 and L2, and a claiming transaction unlocks the asset in the destination network.

### `timestamp`

​In as much as Ethereum blocks have timestamps, **each batch has a timestamp**. 

​There are two constraints each timestamp must satisfy in order to ensure that batches are ordered in time and synchronized with L1 blocks;

1. The timestamp of a given batch must be greater or equal to the timestamp of the last sequenced batch.

2. The maximum batch timestamp a Trusted Sequencer can set to a batch is the timestamp of the block where the sequencing L1 transaction is executed.

### `minForcedTimestamp`

If a batch is a so-called **forced batch**, this parameter must be greater than zero. Censorship is countered by using forced batches. More on this in the following sections.
