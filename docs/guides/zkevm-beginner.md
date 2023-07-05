---
id: zkevm-beginner
title: All Beginners Start Here
sidebar_label: All Beginners Start Here
description: The first steps every beginner needs to take before fully participating in the Polygon zkEVM Testnet.
keywords:
  - docs
  - polygon
  - developer
  - guides
  - demo
  - Polygon zkEVM
---

If you're new to Web3 and want to explore building on the Polygon zkEVM, there are a few key things you should know before getting started.

Polygon zkEVM is a Layer 2 Rollup solution designed to enhance Ethereum's scalability. To dive into the zkEVM network, you'll need to set up some basic tools and components.

First and foremost, you'll need an Ethereum-based wallet to test and interact with the Polygon zkEVM effectively. In addition, it's crucial to have access to Testnet tokens, specifically Goerli ETH tokens, which are used on the Polygon zkEVM Testnet. These tokens are essential for trying out the zkEVM's functionalities and actively participating in the network.

In order to start interacting with the Polygon zkEVM Testnet, one should follow these steps:

1. Download and install a crypto-wallet of your choice
2. Connect your wallet to the zkEVM Testnet
3. Acquire Testnet ETH from the Polygon Faucet

## Downloading & Installing a Wallet

A cryptocurrency wallet is a software application that can be installed on your computer or mobile device. It provides a secure space for storing your public and private keys, as well as managing your cryptocurrencies.

The most popular Ethereum wallets are **MetaMask**, **CoinBase**, **Rainbow**, and **Trust**. All our [developer guides](https://zkevm.polygon.technology/docs/develop) feature the use of [**MetaMask**](https://metamask.io/).

For specific instructions on downloading and installing wallets, refer to the documentation provided on their respective websites.

It's important to note that all wallets are protected by a Secret Recovery Phrase, known only to the owner. This Recovery Phrase is generated as a set of 12 randomly chosen words, which are automatically assigned during the wallet download process. It must be kept secret.

:::warning

In case you forget your wallet password, the only way to unlock your wallet will be by using this secret Recovery Phrase. In other words, without the secret Recovery Phrase, your crypto assets will be locked forever. 

:::

## Connect Wallet to zkEVM Testnet

After successfully installing your crypto-wallet, the next step is to connect it to the zkEVM Testnet. You can find a demo on how to connect a MetaMask wallet to the zkEVM Testnet [here](/develop.md). If you're using a different wallet, similar method can be employed with slight adaptations.

Once your wallet is connected, you'll be able to send or receive Testnet ETH to and from other wallets also connected to the zkEVM Testnet.

To perform a transaction, you'll need the wallet address of the recipient or provide your own wallet address to the sender. A wallet address typically appears as a lengthy hexadecimal number like this: `0x6895d9Bf4078f7dD6A368Dc5fa90A9B3c04aB986`.

Most wallets allow for easy copying of the wallet address, so there's no need to memorize it.

## Connect to the zkEVM Bridge

To access the zkEVM Bridge UI, navigate to the [Wallet Suite](https://wallet.polygon.technology/) and click on the Bridge module.

You will be prompted to connect your wallet. Initially, you will see a selection of wallet icons to choose from. In case your wallet icon is not displayed, click on the **View All** module. You can then scroll through the list or use the search to locate your specific wallet provider. Once you find it, click on the corresponding wallet icon.

To establish a successful connection, you should scan the QR code displayed on the screen or choose the **Browse** option (or any other wallet-specific option) available to connect your wallet.

Make sure you are logged in to your wallet for the connection to be established correctly.

For a detailed visual demonstration and step-by-step instructions, refer to the provided demo and guide [here](/bridge-to-zkevm.md).

## Get Testnet ETH from Polygon Faucet

The next step is to get some testnet ETH for the zkEVM network. The zkEVM Bridge UI can be toggled between two modes of operation - Mainnet and Testnet.

For our convenience, we'll be using the Testnet mode. If the Bridge UI is not in this mode already, it can be toggled by Clicking the '![testnet](https://wallet.polygon.technology/assets/img/sidebar/testnet.svg)`Try Testnet`' button at the bottom-left corner of the Bridge interface.

Now, head over to [**faucet.polygon.technology**](https://faucet.polygon.technology/) and claim your zkETH from the Polygon Faucet. In case you need more instructions, follow this guide [here](zkevm-faucet.md)
