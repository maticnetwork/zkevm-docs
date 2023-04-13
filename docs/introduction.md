---
id: introduction
title: Introduction to Polygon zkEVM
sidebar_label: Introduction
description: Introduction to the Polygon zkEVM developer documentation.
keywords:
  - docs
  - zkEVM
  - zk rollups
  - wiki
  - polygon
  - hermez
  - introduction
image: https://wiki.polygon.technology/img/thumbnail/polygon-zkevm.png
---

:::info

This documentation is still a **Work In Progress**. Some topics have been discussed in greater depth, while others require additional clarification. Sections of this documentation might later be reorganized in order to achieve a better flow.

:::

**Welcome to the Polygon zkEVM for Developers portal.**

Polygon zkEVM is a decentralized Ethereum Layer 2 scalability solution that uses cryptographic zero-knowledge proofs to offer validity and quick finality to off-chain transaction computation, also known as a **ZK-Rollup**.

The ZK-Rollup executes smart contracts transparently, by publishing zero-knowledge validity proofs, while maintaining opcode compatibility with the Ethereum Virtual Machine. This documentation presents detailed guides on:

- Polygon zkEVM and its Architecture
- Our design approach to State Machines
- Running a local zkNode
- Participating in the zkEVM Testnet and build on the Mainnet

The documentation cascades into the finer details of zkEVM's sub-components, including the **zero-knowledge Prover (zkProver)**, the **State Machines** used in the zkProver, the **zkEVM Bridge smart contract**, and the special toolings that enable the Polygon zkEVM to achieve its objectives.

## Scaling Ethereum with zkEVM

Given that Ethereum is subject to [the DLT (distributed ledger technology) trilemma](https://medium.com/certik/the-blockchain-trilemma-decentralized-scalable-and-secure-e9d8c41a87b3), it cannot scale beyond its transaction threshold without sacrificing decentralization or security. This is where Polygon zkEVM comes into play.

**Polygon zkEVM**, henceforth zkEVM, is a **virtual machine** designed and developed to **emulate the Ethereum Virtual Machine (EVM)** by recreating all existing EVM opcodes for transparent deployment of existing Ethereum smart contracts. We have developed **Zero-knowledge Rollups (ZK-Rollups)** which run on top of the Ethereum Mainnet and exponentially improve the scalability and transactions per second (TPS) of Ethereum.

In order to prove that the off-chain computations are correct, **Polygon zkEVM employs verifiable zero-knowledge proofs as validity proofs**. Although the Layer 2 zero-knowledge proofs are based on complex polynomial computations to provide validation and finality to off-chain transactions, the validity proofs are quick and easy to verify.

As a state machine, **zkEVM carries out state changes**, which come from executions of Ethereum’s Layer 2 transactions that users send to the network, and subsequently produces validity proofs attesting to the correctness of the state change computations carried out off-chain.

Although taking on this revolutionary design approach was a hard decision to make, the objective is to minimize the user and developer friction while using the solution. It is an approach that requires recreation of all EVM opcodes for the transparent deployment of existing Ethereum smart contracts. For this purpose, a new set of technologies and tools has been created and engineered by the team which we'll discuss in later sections of this documentation.

## Benefits of Polygon zkEVM

- EVM-equivalence
- Ethereum security
- ZKP-powered scalability

**Polygon zkEVM** is a Layer 2 scaling solution for Ethereum that leverages the scaling power of zero-knowledge proofs while maintaining Ethereum compatibility. Developers and users on **Polygon zkEVM** can use the same code, tooling, apps, etc that they use on Ethereum, but with much higher throughput and lower fees.

Developers will deploy their existing contracts to the zkEVM, and users can deposit assets from Ethereum and transact off-chain. These transactions are grouped into batches with zero-knowledge proof attesting to the validity of each transaction. This ensures that the operators of the zkEVM can’t steal user funds, so we can say that it inherits the security of Ethereum.

**Polygon zkEVM** offers compatibility and scalability without compromise.

## Further Reading

- [Polygon ZK Rollups: Everything You Need to Know](https://www.alchemy.com/overviews/polygon-zk-rollups)
- [Guide to Using the Polygon zkEVM](https://polygon.technology/blog/your-three-step-guide-to-using-polygon-zkevm-yes-its-that-easy)
- [Technical Overview of Polygon zkEVM and zkEVM Rollup](https://mirror.xyz/msfew.eth/JJudP_Kf-IS6VhbF-qU0BUor1Ap6SFEb0TzYOHZ34Rc)