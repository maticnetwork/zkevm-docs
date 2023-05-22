---
id: admin-role
title: Admin Role and Governance
sidebar_label: Admin Role and Governance
description: A guide to help developers understand the Admin Role and Governance mechanism of Polygon zkEVM.
keywords:
  - polygon
  - protocol
  - zkEVM
  - admin role
  - governance
  - timelock controller
---

The Admin is an Ethereum account that controls the Consensus contract, but **it is planned to be removed in the future**. It is the only account in the contract that can call the following functions;

- `setTrustedSequencer`
- `setForceBatchAllowed`
- `setTrustedSequencerURL`
- `setTrustedAggregator`
- `setTrustedAggregatorTimeout`
- `setPendingStateTimeout`
- `setMultiplierBatchFee`
- `setVeryBatchTimeTarget`
- `setAdmin`
- `deactivateEmergencyState`

All **ProxyAdmin.sol** instances that can upgrade the contract implementations of the zkEVM Protocol belong to the Admin account.

Moreover, all proxies are owned by the Admin account, making it the only account authorized to make modifications to the contracts used to implement the zkEVM Protocol.

## Timelock Controller

:::tip What is Timelock Controller

Timelock Controller is a smart contract that enables setting up a delay to provide users some time to leave before applying potentially risky maintenance procedures.

:::

A **timelock controller** has been added to the zkEVM Protocol in order to improve user security and confidence.

An admin can schedule and commit maintenance operations transactions in L1 using a timelock controller, and the timelock can be activated to carry out the transactions when a specified `minDelay` time has passed.

**The Polygon zkEVM team has decided to use the [OpenZeppelin's TimelockController.sol contract](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/governance/TimelockController.sol) to inherit security as well to avoid the lengthy and complicated audit process**. We have changed the `getMinDelay` method in the contract and this modified implementation is named **PolygonZkEVMTimelock.sol** contract.

In the event that the zkEVM contract system is in [Emergency Mode](emergency-state.md), the new `getMinDelay` will set the time `minDelay` to 0. The zKEVM Protocol’s Admin role is set to an instance of **PolygonZkEVMTimelock.sol** contract address during the deployment.

## Governance of zKEVM Contracts

The Admin role requires significant responsibility and cannot be assigned solely to one account. For this reason, the Admin Ethereum account of a PolygonZkEVMTimelock.sol contract instance is assigned to a multisig contract that acts as a governance tool for the zkEVM Protocol, therefore decentralizing the management power among multiple trusted entities.

Below figure shows the governance tree of Polygon zkEVM L1 contracts.

![governance tree of zkEVM L1 contracts](figures/governance-tree.png)

Protocol maintenance operations can only be performed by following these steps:

:::info

Due to the governance chain among protocol contracts, any transaction on behalf of the Admin role can only be done through the below steps.

:::

1. Maintenance operations transactions are proposed and stored into governance multisig contract. Polygon team reaches a consensus on whether or not to apply these operations. Voting inherits security from L1.

2. **Once a decision has reached**, if the results are favorable to perform maintenance operations, **the governance multisig can be triggered to schedule the transactions to be executed** once a time delay has passed using **PolygonZkEVMTimelock.sol** contract instance.

3. Once a time delay has passed, **PolygonZkEVMTimelock.sol** contract instance can be triggered to execute scheduled transactions and fulfil maintenance operations.
