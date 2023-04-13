---
id: eth
title: ETH Deposit and Withdraw Guide
sidebar_label: ETH
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Check out the latest [Matic.js documentation on ETH](https://maticnetwork.github.io/matic.js/docs/pos/deposit-ether/).

## Quick Summary

This section of the docs deals with how to deposit and withdraw ERC20 tokens on the Polygon network. Common functions exist between the ETH, ERC20, ERC721 and ERC1155 sections of the docs with variances in the naming and implementation patterns as befitting the standards. The most important prerequisite to using this section of the docs is mapping your assets, so please submit your mapping request [here](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/).

## Introduction

This guide uses the Polygon Testnet (Mumbai) which in itself is mapped to the Goerli Network to demonstrate asset transfer between the two blockchains. It's important to note that for the purposes of this tutorial, you should use a proxy address whenever is possible. This is because while the implementation contract address is liable to change when a new update is added to the contract code, the proxy never changes and it redirects all the incoming calls to the latest implementation. In essence, if you use the proxy address, you won't need to worry about any changes happening on the implementation contract before you're ready.

For example, please use the **RootChainManagerProxy** address for interactions instead of the **RootChainManager** address. Deployment details like the PoS contract addresses, ABI, Test Token Addresses can be found [here](https://docs.polygon.technology/docs/develop/ethereum-polygon/pos/deployment/)

Mapping your assets is a necessary step for integrating the PoS bridge on your application so if you haven't done it, please submit a mapping request [here](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/). For the purposes of this tutorial, the team has deployed test tokens and mapped them to the PoS bridge. Request the asset you want to use on the [faucet](https://faucet.polygon.technology/) and if the test tokens are unavailable, reach out to the team on [Discord](https://discord.com/invite/0xPolygon). We'll make sure to reply you immediately.

In the upcoming tutorial, every step will be explained in detail along with a few code snippets. However, you can always refer to this [repository](https://github.com/maticnetwork/matic.js/tree/master/examples) which will have all the **example source code** that can help you to integrate and understand the working of PoS bridge.

## High Level Flow

Deposit ETH -

1. Make **_depositEtherFor_** call on **_RootChainManager_** and **send **the required ether.

Withdraw ETH -

1. **_Burn_** tokens on Polygon chain.
2. Call **_exit_** function on **_RootChainManager_** to submit proof of burn transaction. This call can be made **_after checkpoint_** is submitted for the block containing burn transaction.

## Steps

### Deposit

ETH can be deposited to the Polygon chain by calling **depositEtherFor** on the **RootChainManager** contract. The Polygon PoS client exposes the **depositEther** method to make this call.

```jsx
const result = await posClient.depositEther(<amount>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```

Sidenote: Deposits from Ethereum to Polygon happen using the **State Sync** Mechanism and this takes about 5-7 minutes. After waiting for this time interval, it is recommended to check the balance using web3.js/matic.js library or using Metamask. The explorer will show the balance only if at least one asset transfer has happened on the child chain. This [link](https://docs.polygon.technology/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/) explains how to track the deposit events.

### Burn

**_ETH_** is deposited as **_ERC20_** token on Polygon chain. For withdrawing it follow the same process as withdrawing ERC20 tokens.

To burn the tokens and engage the withdrawal process, please call the **Withdraw** function of the MaticWETH contract. Since Ether is an ERC20 token on the Polygon chain, you need to initiate the **erc20** token from the Polygon PoS client and then call **withdrawStart** method to start the burn process.

```jsx
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Store the transaction hash for this call and use it while generating burn proof.

### Exit


Once the **checkpoint** has been submitted for the block containing burn transaction, user should call the **exit** function of `RootChainManager` contract and submit the proof of burn. Upon submitting valid proof tokens are transferred to the user. Polygon POS client `erc20` exposes `withdrawExit` method to make this call. This function can be called only after the checkpoint is included in the main chain. The checkpoint inclusion can be tracked by following this [guide](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos#checkpoint-events).


```jsx
// token address can be null for native tokens like ethereum or matic
const erc20RootToken = posClient.erc20(<token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
