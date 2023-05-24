---
id: bridge-to-zkevm
title: Bridge Assets to zkEVM
sidebar_label: Bridge to zkEVM
description: Learn how to bridge assets from Ethereum to Polygon zkEVM using the Wallet Suite.
keywords:
  - polygon
  - zkEVM
  - wallet
  - Bridge to zkEVM
  - guide
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::caution Risks

To see the potential list of risks associated with the use of Polygon zkEVM, check out the [<ins>Risks FAQ</ins>](/risk-disclosure.md) section.

:::

Users can deposit assets from Ethereum and transact off-chain on Polygon zkEVM. For moving assets across chains (L1 &harr; zkEVM), you will need to use the zkEVM Bridge. The bridge interface is available for both **Mainnet Beta** and **Testnet** in the [Polygon Wallet Suite](https://wallet.polygon.technology/zkEVM/bridge). Also, bridging can be done with the help of [MaticJS](https://wiki.polygon.technology/docs/develop/ethereum-polygon/matic-js/zkevm/initialize-zkevm/) SDK.

Check out this video guide on **how to bridge tokens from L1 to the zkEVM Testnet**. The same video will apply to the zkEVM Mainnet Beta.

<video loop autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/zkevm/zkevmwallettestnet.mp4"></source>
  <p>Your browser does not support the video element.</p>
</video>

## Step-by-Step Guide

:::tip Quick Connect

You can **add zkEVM Network to your wallet** instantly by clicking the **Add zkEVM Network** button on the [<ins>Polygon zkEVM Documentation</ins>](/) website.

:::

You can follow this **step-by-step guide** to learn how to bridge assets from Ethereum Mainnet &rarr; Polygon zkEVM Mainnet Beta and vice-versa.

- On the [Polygon Wallet Suite website](https://wallet.polygon.technology/), you can find a tab to access zkEVM, right next to the existing Proof-of-Stake tab:

  <div align="center">
  <img src={useBaseUrl("img/zkevm/zkwallet-1.jpg")} width="1000" height="1000"/>
  </div>

- Click on the **Bridge** module to access the zkEVM environment where you will be able to transfer assets from zkEVM Testnet and Mainnet Beta:

  <div align="center">
  <img src={useBaseUrl("img/zkevm/bridge2.jpg")} width="1000" height="1000"/>
  </div>

- On the right hand side of the page, you can view the recent transactions, including transactions that are pending. After you proceed with transaction on the bridge, Metamask will ask you to confirm it.

  <div align="center">
  <img src={useBaseUrl("img/zkevm/metamask1.jpg")} width="400" height="400"/>
  </div>

- Please allow a few moments for your transaction to be processed. Once completed, you can view all of your past and pending transactions by clicking on the "Transactions" button located in the left menu.

  <div align="center">
  <img src={useBaseUrl("img/zkevm/transaction-history.jpg")} width="1000" height="1000"/>
  </div>
