---
id: open-source-repos
title: Polygon zkEVM Source Code
sidebar_label: Source Code
description: Github source code repositories related to Polygon zkEVM
keywords:
  - docs
  - polygon
  - repository
  - source code
  - github
  - zkevm
  - zkprover
image: https://wiki.polygon.technology/img/thumbnail/polygon-zkevm.png
---

This document provides the complete list of all available source code repositories related to Polygon zkEVM and its components including the zkProver. Feel free to check out the [Polygon zkEVM](https://github.com/0xPolygonHermez) organization on Github.

## Core repositories

- [zkevm-prover](https://github.com/0xPolygonHermez/zkevm-prover)
- [zkevm-proverjs](https://github.com/0xPolygonHermez/zkevm-proverjs)
- [zkevm-rom](https://github.com/0xPolygonHermez/zkevm-rom)
- [zkevm-node](https://github.com/0xPolygonHermez/zkevm-node)
- [zkevm-contracts](https://github.com/0xPolygonHermez/zkevm-contracts)
- [zkevm-bridge-service](https://github.com/0xPolygonHermez/zkevm-bridge-service)
- [zkevm-bridge-ui](https://github.com/0xPolygonHermez/zkevm-bridge-ui)

## Specific tools and libraries

- Javascript library implementing common utilities for zkevm: [zkevm-commonjs](https://github.com/0xPolygonHermez/zkevm-commonjs)
- [zkevm-testvectors](https://github.com/0xPolygonHermez/zkevm-testvectors)

## Repositories for zkASM

- A compiler that compiles the zkASM program to a JSON file which can be read by the executor can be found at this [repository](https://github.com/0xPolygonHermez/zkasmcom).
- A zkasm compiler for the storage state machine: [zkevm-storage-rom](https://github.com/0xPolygonHermez/zkevm-storage-rom)

## Repositories for PIL

- A compiler that compiles the PIL description to a JSON file that can be read by the 
zkExecutor and the zkProver can be found at this [repository](https://github.com/0xPolygonHermez/pilcom).
- Tool that generates a STARK proof from a State Machine written in PIL Language can be found [here](https://github.com/0xPolygonHermez/pil-stark).
