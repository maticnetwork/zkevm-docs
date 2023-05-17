---
id: state-management
title: Polygon zkEVM State Management
sidebar_label: State Management
description: This document explains how the Polygon zkEVM Protocol manages L2 Rollup's states while providing state transition verifiability and security.
keywords:
  - polygon
  - zkEVM
  - protocol
  - State Management
  - trustless
  - L2 states
  - trusted state
  - virtual state
  - consolidated state
---

This document aims to explain how the Polygon zkEVM Protocol manages the L2 Rollup's states while providing state transition verifiability and security.

## Trustless L2 State Management

The **Trusted Sequencer** generates batches, but in order to achieve fast finality of L2 transactions and avoid the need to wait for the next L1 block, they are shared with L2 network nodes via a broadcasting channel. Each node will run the batches to compute the resulting L2 State locally.

Once the **Trusted Sequencer** has committed the sequences of batches fetched directly from L1, L2 network nodes will execute them again, and they will no longer have to trust it.

The off-chain execution of the batches will eventually be verified on-chain via a **Zero-Knowledge proof**, and the resulting L2 State root will be committed. **As the zkEVM protocol progresses, new L2 state roots will be synchronized directly from L1 by L2 network nodes**.

:::info

Both **data availability** and **verification of transaction execution** rely only on L1 security assumptions and at the final stage of the protocol, the nodes will only rely on data present in L1 to stay synchronized with each L2 State transition.

:::

![figure 1](figures/01L2-overview-l2-state-management.png)

As shown in the above figure, **L2 nodes can receive batch data in three different ways**: 

1. Directly from the Trusted Sequencer before the batches are committed to L1, or
2. Straight from L1 after the batches have been sequenced, or
3. Only after correctness of execution has been proved by the Aggregator and verified by the `PolygonZkEVM.sol` contract.

It is worth noting that **the three batch data formats are received by L2 nodes in the chronological order** listed above.

## Three L2 States

There are three stages of the L2 State, each corresponding to the three different ways in which L2 nodes can update their state. All three cases depend on the format of batch data used to update the L2 State.

In the **first instance**, the update is informed solely by the information (i.e., Batches consisting of ordered transactions) coming directly from the Trusted Sequencer, before any data availability on L1. The resulting L2 state is called the **Trusted State**.

In the **second case**, the update is based on **information retrieved from the L1 network by L2 nodes**. That is, after the batches have been sequenced and data has been made available on L1. The L2 state is referred to as the **Virtual State** at this point.

The information used to update the L2 State in **the last case** includes verified zero-knowledge proofs of computational integrity. That is, **after the Zero-Knowledge proof has been successfully verified in L1, L2 nodes synchronise their local L2 State root** with the one committed in L1 by the Trusted Aggregator. As a result, such an L2 State is known as the **Consolidated State**.

The figure below depicts the timeline of L2 State stages from a batch perspective, as well as the actions that trigger progression from one stage to the next.

![L2 State stages timeline](figures/02l2-l2-state-timeline.png)
