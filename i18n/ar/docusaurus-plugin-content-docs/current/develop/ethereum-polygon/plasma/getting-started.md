---
id: getting-started
title: Plasma Bridge
sidebar_label: Introduction
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Please check the latest [Matic.js documentation on Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/) to get started.

A bridge is basically a set of contracts that help in moving assets from the root chain to the child chain. There are primarily two bridges to move assets between Ethereum and Polygon. First one is the Plasma bridge and the second one is called the **PoS Bridge** or **Proof of Stake bridge**. **Plasma bridge** provides an increased security guarantees due to the Plasma exit mechanism.

However, there are certain restrictions on the child token and there is a 7-day withdrawal period associated with all exits/withdraws from Polygon to Ethereum on the Plasma bridge. The [PoS Bridge](/docs/develop/ethereum-polygon/pos/getting-started) is more flexible and features faster withdrawals.

This tutorial will act as a guide for step-by-step process to understand and use Plasma bridge using [Matic JS](https://github.com/maticnetwork/matic.js), which is the easiest way to interact with the Plasma Bridge on Polygon Network.

## Assets flow in Plasma Bridge

We will be showcasing the flow for asset transfers on Polygon in this tutorial and how you can do the same using Matic.js:

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. User deposits crypto assets in Polygon contract on mainchain
2. Once deposited tokens get confirmed on the mainchain, the corresponding tokens will get reflected on the Polygon chain
   - The user can now transfer tokens to anyone they want instantly with negligible fees. Polygon chain has faster blocks (approximately 1 second). That way, the transfer will be done almost instantly.
3. Once a user is ready, they can withdraw remaining tokens from the mainchain. Withdrawal of funds is initiated from the Plasma Sidechain. A checkpoint interval of 5 mins is set, where all the blocks on the Polygon block layer are validated since the last checkpoint.
4. Once the checkpoint is submitted to the mainchain Ethereum contract, an Exit NFT (ERC721) token is created of equivalent value.
5. The withdrawn funds can be claimed back to your Ethereum acccount from the mainchain contract using a process-exit procedure.
   - User can also get a fast exit via 0x or Dharma (coming soon!)

### Prerequisites:

```
npm i @maticnetwork/maticjs-plasma

import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

### Görli Faucet

In order to make any transactions, you will also need some Ether in the test accounts that you will use while following the tutorial. In case you don’t have some ETH on Görli, you can use the faucet links given here — https://goerli-faucet.slock.it/.

### Polygon Faucet

Throughout this tutorial, we will be using the ERC20 token `TEST` on the Görli network as an example. This is a TEST token. In your DApp, you can replace it with any ERC20 token. To get some Test `TEST` tokens on Polygon Network, you can access the [Polygon Faucet](https://faucet.polygon.technology/).

> Note: To use your own tokens for deposits and withdrawals, you'll have to get the token 'mapped'. Which essentially means making the contracts on main chain and side chain 'aware' of your custom token. Read more about the Mapping process [here](/docs/develop/ethereum-polygon/plasma/mapping-assets), or you can submit a mapping request [here](/docs/develop/ethereum-polygon/submit-mapping-request).

### Basic setup for the MetaMask Wallet (Optional)

1. [Create a wallet](/docs/develop/metamask/hello): If you are new to wallets, then Setup a MetaMask Account.
2. [Configure the Polygon testnet](/docs/develop/metamask/config-polygon-on-metamask): To easily visualise the flow of funds on Polygon, it is instructive if you configure the Polygon testnet on Metamask.

   > Note that we are using MetaMask here solely for visualization purposes. There is no requirement to use MetaMask at all for using Polygon.
3. [Create Multiple Accounts](/docs/develop/metamask/multiple-accounts): Before starting with the tutorial, go ahead and have 3 Ethereum test accounts ready.
4. [Configure token on Polygon](/docs/develop/metamask/custom-tokens): In order to view the flow of funds easily on Polygon using Matic.js, you can configure tokens on Metamask. The `TEST` token, taken as an example for this tutorial, can be configured in MetaMask so as to easily visualise account balances. > Again note this is **optional**. You can very easily query the token balances and other variables using [web3](https://web3js.readthedocs.io/en/1.0/)
