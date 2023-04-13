---
id: upgradability
title: Protocol Upgradability
sidebar_label: Protocol Upgradability
description: A guide to help developers understand the update mechanism of Polygon zkEVM protocol.
keywords:
  - docs
  - zk rollups
  - polygon
  - zkEVM Protocol
  - Polygon zkEVM
  - upgradability
  - Transparent Upgradeable Proxy
image: https://wiki.polygon.technology/img/thumbnail/polygon-zkevm.png
---

To allow for future updates to the zkEVM Protocol implementation (either in the case of adding new features, fixing bugs, or optimizations upgrades), the following contracts are deployed using a **Transparent Upgradeable Proxy (TUP)** pattern:

* **PolygonZkEVM.sol** (Consensus Contract)
* **PolygonZkEVMGlobalExitRoot.sol**
* **PolygonZkEVMBridge.sol**

To inherit security and avoid prolonging and making the audit process more complex, the Polygon zkEVM team has chosen to use the OpenZeppelin’s [openzeppelin-upgrades](https://github.com/OpenZeppelin/openzeppelin-upgrades) library in order to implement this functionality.

:::info Why Use OpenZeppelin Libraries?

OpenZeppelin is a reputated and well-known brand in the industry because of its audits and open-source libraries of implementations of Ethereum standards, and its **openzeppelin-upgrades** library has been already audited and battle tested.

Furthermore, **openzeppelin-upgrades** is more than just a set of contracts; it also includes Hardhat and Truffle plugins to help with proxy deployment, upgrades, and administrator rights management.

:::

As shown in the diagram below, Open Zeppelin's TUP pattern separates the protocol implementation of storage variables using delegated calls and the fallback function, allowing the implementation code to be updated without changing the storage state or the contract's public address.

![tup pattern schema](figures/tup-pattern.png)

Following OpenZeppelin's recommendations, an instance of the contract **ProxyAdmin.sol**, which is also included in the openzeppelin-upgrades library, is deployed and its address is set as the proxy contract's admin. The Hardhat and Truffle plugins make these operations safe and simple.

Each **ProxyAdmin.sol** instance serves as the actual administrative interface for each proxy, and the administrative account is the owner of each **ProxyAdmin.sol** instance. During the zkEVM Protocol's deployment, ownership of **ProxyAdmin.sol** will be transferred to the Admin role.
