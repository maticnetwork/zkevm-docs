---
id: intro-stark-recursion
title: Introduction to STARK Recursion
sidebar_label: Introduction
description: This document provides an overview of the STARK Recursion component of zkProver inside the Polygon zkEVM.
keywords:
  - docs
  - Polygon zkEVM
  - STARK Recursion
---

The Polygon zkEVM's rollup strategy is to develop a zero-knowledge Prover (zkProver) that takes a batch of many transactions, proves their validity, and publishes a minimally-sized validity proof for verification.

This document provides the details of how such a validity proof is created. It is a process that involves collating a number of proofs into one, using three methods; **recursion**, **aggregation**, and **composition**.

## Proving Approach

zkProver is the main component of Polygon zkEVM and solely responsible for proving execution correctness. Instead of using the arithmetic circuit model, the zkProver follows the state machine model.

The approach therefore is to **develop a State Machine that allows a Prover to create and submit a verifiable proof of knowledge, and anyone can take such a proof to verify its validity**.

The process that leads to achieving such a State Machine-based system takes a few steps;

- Modeling the deterministic computation involved as a State Machine, described in the form of an **Execution Trace**.
- Stating the equations that fully describe the state transitions of the State Machine, called **Arithmetic Constraints**.
- Using established and efficient mathematical methods to define the corresponding polynomials.
- Expressing the previously stated Arithmetic Constraints into their equivalent **Polynomial Identities**.

These Polynomial Identities are equations that can be easily tested in order to verify the Prover's claims.

A **Commitment Scheme** is required for facilitating the proving and verification. Henceforth, in the zkProver context, a proof/verification scheme called **PIL-STARK** is used. Check out the documentation [here](/zkProver/commitment-scheme.md) for the Polygon zkEVM's commitment scheme setting.

## Overall Process

In a nutshell, a state machine's execution trace is expressed in PIL, and this expression is called the **PIL Specification** of the computation represented by the State Machine.

In the non-recursive case, a PIL specification is transformed into a verifiable **STARK** proof by using PIL-STARK.

Subsequently, CIRCOM takes the above **STARK** proof as an input and generates its corresponding **Witness**. Such a Witness is in fact an Arithmetic circuit stated in terms of its **Rank-1 Constraint System (R1CS)**.

Finally, **Rapid SNARK** takes the above Witness together with the **STARK Verifier data** and generates a **SNARK** proof corresponding to the previous **STARK** proof.

The **SNARK** proof gets published as the validity proof of the original computation.
