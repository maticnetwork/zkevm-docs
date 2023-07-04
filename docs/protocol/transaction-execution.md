---
id: transaction-execution
title: Transaction Execution & Trusted State
sidebar_label: Transaction Execution
description: A guide to help developers understand the transaction life cycle in zkEVM.
keywords:
  - polygon
  - zkEVM
  - protocol
  - Transaction Execution
  - Trusted State
---

:::info

This document is a continuation in the series of articles explaining the [<ins>Transaction Life Cycle</ins>](l2-transaction-cycle-intro.md) inside Polygon zkEVM.

:::

The **Trusted Sequencer reads transactions from the pool** and decides whether to **discard** them or **order and execute** them. Transactions that have been executed are added to a transaction batch, and the Sequencer's local L2 State is updated.

Once a transaction is added to the L2 State, it is broadcast to all other zkEVM nodes via a broadcast service. It is worth noting that **by relying on the Trusted Sequencer, we can achieve fast transaction finality (faster than in L1)**. However, the resulting L2 State will be in a trusted state until the batch is committed in the Consensus Contract.

## Verification on Layer 1

Users will typically interact with trusted L2 State. However, due to certain protocol characteristics, the verification process for L2 transactions (on Layer 1 to enable withdrawals) can take a long time, typically around 30 minutes but up to a week in rare cases.

:::note What is the rare case scenario?

Verification of transactions on L1 will take 1 week only in the case when an **Emergency State is activated** or the **aggregator does not batch any proofs at all**.

If a sequenced batch is not aggregated in 7 days, the emergency mode is activated. Please refer to [<ins>this guide</ins>](emergency-state.md) to understand more about the Emergency State.

:::

As a result, users should be mindful of the potential risks associated with high-value transactions, particularly those that cannot be reversed, such as off-ramps, over-the-counter transactions, and alternative bridges.
