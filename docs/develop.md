---
id: develop
title: Start Building on Polygon zkEVM
sidebar_label: Build on zkEVM
description: A guide to help developers get started building on the Polygon zkEVM
keywords:
  - docs
  - polygon
  - develop
  - zkEVM mainnet
  - deploy on zkEVM
  - Polygon zkEVM
---

Polygon zkEVM is the first zero-knowledge scaling solution that is **fully equivalent to an EVM**. All existing smart contracts, developer toolings and wallets work seamlessly. Polygon zkEVM harnesses the power of zero-knowledge proofs in order to reduce transaction costs and massively increase throughput, all while inheriting the security of Ethereum.

Building dApps on zkEVM is completely similar to Ethereum. Simply switch to the zkEVM RPC and start building on a network with much higher throughput and lower fees. Polygon zkEVM provides a complete EVM-like experience for Developers and Users alike. So you do not need special toolings or new wallets for building or interacting with zkEVM.

:::info Reminder

You don't need special toolings or Wallets to build or interact with Polygon zkEVM.

:::

Developers will be able to deploy their existing contracts to the zkEVM, and Users can deposit assets from Ethereum and transact off-chain. These transactions are grouped into batches with zero-knowledge proof attesting to the validity of each transaction.

## Connecting to zkEVM

In order to add the **Polygon zkEVM** network to your wallet, you will need to enter the following details :

| Network | RPC URL | ChainID | Block Explorer URL |
| ------- | ------------------------------- | ---------------------- | --------------------- |
| Polygon zkEVM | `https://zkevm-rpc.com` | `1101` | `https://zkevm.polygonscan.com/` |
| zkEVM Testnet | `https://rpc.public.zkevm-test.net` | `1442` | `https://testnet-zkevm.polygonscan.com` |

#### Additional Details

- **Currency Symbol**: ETH

:::tip Quick Connect

You can **add zkEVM Network to your MetaMask wallet** instantly by clicking the **Add to Wallet** button in the Wallet Suite interface.

:::

The next step is to [bridge your assets](bridge-to-zkevm.md) from Ethereum &rarr; Polygon zkEVM. You can use the zKEVM Bridge natively built inside Polygon Wallet Suite to bridge your assets.

## Deploying Smart Contracts

The development experience on zkEVM is seamless and identical to Ethereum Virtual Machine. Developers on zkEVM can use their existing code and toolings to deploy on zkEVM with much higher throughput and lower fees.

Here is a video tutorial on **how to add Polygon zkEVM Testnet to MetaMask and deploy smart contracts**:

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/zkevm/tutorial.mp4"></source>
  <p>Your browser does not support the video element.</p>
</video>

## zkEVM Support

If you need help with anything related to the Polygon zkEVM, you can raise a ticket on the [Polygon Support](https://support.polygon.technology/support/tickets/new) portal, and check out the [Knowledge base](https://support.polygon.technology/support/solutions/folders/82000694871) to view the most common queries about the zkEVM. Additionally, you can reach out to the support team available on the **#zkevm-support** channel on the [Polygon Discord server](https://discord.com/invite/XvpHAxZ). Instructions for raising a zkEVM support ticket are as follows:

1. Join the **Polygon Discord** server [here](https://discord.gg/0xPolygon).
2. Accept the invite sent via DM.
3. Take the **Member** role under **#roles**.
4. Navigate to the **#zkevm-support** channel.

You can now contact the zkEVM support staff with your questions and concerns. We will actively monitor for issues and work to resolve them as soon as possible.
