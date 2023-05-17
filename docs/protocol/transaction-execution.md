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

:::tip Verification on Layer 1

Users will typically interact with trusted L2 State. However, due to certain protocol characteristics, the verification process for L2 transactions (on Layer 1 to enable withdrawals) can take a long time, typically around 30 minutes but up to 2 weeks in rare cases. As a result, users should be mindful of the potential risks associated with high-value transactions, particularly those that cannot be reversed, such as off-ramps, over-the-counter transactions, and alternative bridges.

:::
