---
id: zkevm-eth-faq
title: zkEVM and EVM Equivalence FAQs
sidebar_label: EVM Equivalence
description: This document compiles some of the frequently asked questions related to the Polygon zkEVM and its EVM equivalence.
keywords:
  - Polygon zkEVM
  - compatibility faq
  - evm equivalence
  - EVM
  - opcodes
---

This document compiles some of the frequently asked questions related to the Polygon zkEVM's equivalence with EVM. For more details, check out [this documentation](/protocol/evm-differences.md).

---

### What is the difference between EVM Compatibility and EVM Equivalence?

The ultimate goal is not **compatibility**. The ultimate goal is **equivalence**. **Solutions that are compatible enable most existing apps to work, but sometimes with code changes**. Additionally, compatibility may lead to the breaking of developer toolings.

**Polygon zkEVM strives for EVM Equivalence because it means that most applications, tools, and infrastructure built on Ethereum can immediately port over to Polygon zkEVM with limited to no changes needed**. Things are designed to work 100% on day one. This is critical because:

1. **Development teams don't have to make changes to their code**, which could introduce a security vulnerability.
2. **No code changes are needed**. You don't need additional audits, which saves time and money. 
3. **zkEVM ultimately benefits from the security and decentralization of Ethereum**, since transactions are still finalizing on Ethereum.
4. Allows Polygon zkEVM to **benefit from the already vibrant and active Ethereum community**.
5. Allows for **significant and quick dApp adoption**, since apps built on Ethereum today are designed to be compatible.

### Why is EVM Equivalence needed?

Ethereum isn’t just a blockchain. It’s a rich ecosystem of smart contracts, developer tools, infrastructure, and wallets. It’s a vibrant community of developers, auditors, and users.

The best way to scale Ethereum is to strive to maintain equivalence with this ecosystem. Polygon zkEVM will give users and developers an almost identical experience to Ethereum L1 with a significant scalability improvement.

### What EVM opcodes are different on Polygon zkEVM?

The following EVM opcodes are different in Polygon zkEVM: **SELFDESTRUCT**, **EXTCODEHASH**, **DIFFICULTY**, **BLOCKHASH**, and **NUMBER**. For a detailed article on differences between EVM and zkEVM, check out [this document](/protocol/evm-differences.md).

### What precompiled smart contract functions does Polygon zkEVM support?

The following precompiled contracts are supported in the zkEVM: **ecRecover** and **identity**.

Other precompiled contracts have no effect on the zkEVM state tree and are treated as a `revert`, returning all gas to the previous context and setting the `success` flag to "0".

### Which precompiled contracts are missing in the current zkEVM version?

Polygon zkEVM supports all precompiled contracts except **SHA256**, **BLAKE**, and **PAIRINGS**.

### When will we get Type 2 EVM Equivalence?

Currently, Polygon zkEVM has Type 3 equivalence with EVM. It will reach Type 2 and full equivalence when all pre-compiled contracts are supported.

### Can you explain the process of rollbacks and reverts in Polygon zkEVM? Are they similar to EVM?

The process of rollbacks and reverts is similar to regular EVMs. Whenever there is an error or a condition that triggers a revert, it uses the `REVERT` instruction to stop the execution and then returns an error message.

Rollbacks can also happen sometimes because of an invalid zk-proof (this triggers something new to Polygon zkEVM) which would cause the transaction to be aborted and all the state changes to be undone.

### How does the Polygon zkEVM handle events and logging?

Polygon zkEVM handles events and logging in a similar way to other EVMs, by emitting events and logging them on the blockchain for future reference.

### How similar are Polygon zkEVM error messages with Ethereum?

Polygon zkEVM has a high level of compatibility with Ethereum errors. You need to bear in mind that Polygon zkEVM has more constraints than Ethereum and also uses different concepts (for example, batches instead of blocks). Therefore, it will give more types of errors with more precision (for example, the concept of gas in Polygon zkEVM is more broken down).

### Can Chainlink use their token (ERC677) in Polygon zkEVM?

You can deploy any smart contract on Polygon zkEVM, just like you would on Ethereum, so you can deploy any token. If you want to send the token to Ethereum, the bridge will convert it to an ERC20 token (bi-directional bridge).

The bridge also has **low-level message passing functionality** that can be used to bridge any type of value, including NFTs and other token standards.
