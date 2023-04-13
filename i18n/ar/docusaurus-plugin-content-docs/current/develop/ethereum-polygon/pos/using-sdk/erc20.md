---
id: erc20
title: ERC20 Deposit and Withdraw Guide
sidebar_label: ERC20
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Check out the latest [Matic.js Documentation on ERC20](https://maticnetwork.github.io/matic.js/docs/pos/erc20/).

This tutorial uses the Polygon Testnet ( Mumbai ) which is mapped to the Goerli Network to demonstrate the asset transfer to and fro the two blockchains. An **important thing to be noted** while following this tutorial is that you should always use a Proxy address whenever it is available. For eg. The **RootChainManagerProxy** address has to be used for interaction instead of the **RootChainManager** address. The **PoS contract addresses, ABI, Test Token Addresses** and other deployment details of the PoS bridge contracts can be found [here](/docs/develop/ethereum-polygon/pos/deployment).

**Mapping your assets** is necessary to integrate the PoS bridge on your application. You can submit a mapping request [here](/docs/develop/ethereum-polygon/submit-mapping-request). But for the purpose of this tutorial, we have already deployed the **Test tokens** and Mapped then on the PoS bridge. You may need it for trying out the tutorial on your own. You can request the desired Asset from the [faucet](https://faucet.polygon.technology/). If the test tokens are unavailable on the faucet, do reach us on [discord](https://discord.com/invite/0xPolygon)

In the upcoming tutorial, every step will be explained in detail along with a few code snippets. However, you can always refer to this [repository](https://github.com/maticnetwork/matic.js/tree/master/examples/pos) which will have all the **example source code** that can help you to integrate and understand the working of PoS bridge.

## High Level Flow

Deposit ERC20 -

1. **_Approve_** **_ERC20Predicate_** contract to spend the tokens that have to be deposited.
2. Make **_depositFor_** call on **_RootChainManager_**.

Withdraw ERC20 -

1. **_Burn_** tokens on Polygon chain.
2. Call **_exit_** function on **_RootChainManager_** to submit proof of burn transaction. This call can be made **_after checkpoint_** is submitted for the block containing burn transaction.

## Step Details

---

### Approve

This is a normal ERC20 approval so that **_ERC20Predicate_** can call **_transferFrom_** function. Polygon POS client exposes **_approve_** method to make this call.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>,true);
  const approveResult = await erc20Token.approve(100);
  const txHash = await approveResult.getTransactionHash();
  const txReceipt = await approveResult.getReceipt();
}
```

### Deposit

Note that token needs to be mapped and approved for transfer beforehand. Polygon POS client exposes **_deposit_** method to make this call.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);

  //deposit 100 to user address
  const result = await erc20Token.deposit(100, <user address>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();

}
```

> NOTE: Deposits from Ethereum to Polygon happen using a state sync mechanism and takes about ~5-7 minutes. After waiting for this time interval, it is recommended to check the balance using web3.js/matic.js library or using Metamask. The explorer will show the balance only if at least one asset transfer has happened on the child chain. This [link](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos) explains how to track the deposit events.

### WithdrawStart method to Burn

*withdrawStart* method can be used to initiate the withdraw process which will burn the specified amount on polygon chain.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = posClient.erc20(<child token address>);

  // start withdraw process for 100 amount
  const result = await erc20Token.withdrawStart(100);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```

Store the transaction hash for this call and use it while generating burn proof.

### Exit

Once the **_checkpoint_** has been **_submitted_** for the block containing burn transaction, user should call the **_exit_** function of **_RootChainManager_** contract and submit the proof of burn. Upon submitting valid proof tokens are transferred to the user. Polygon POS client exposes **_withdrawExit_** method to make this call. This function can be called only after the checkpoint is included in the main chain. The checkpoint inclusion can be tracked by following this [guide](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos#checkpoint-events).

*withdrawExit* method can be used to exit the withdraw process by using the txHash from *withdrawStart* method.

Note- withdrawStart transaction must be checkpointed in order to exit the withdraw.


```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);
  const result = await erc20Token.withdrawExit(<burn tx hash>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```
