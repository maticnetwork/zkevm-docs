---
id: deposit-eth-dai-on-polygon
title: How to deposit ETH/DAI on Polygon ?
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This tutorial explains the easiest way to get funds on [https://matic.opensea.io/](http://matic.opensea.io) so that you can start buying NFT's without any hassle. Funds are needed to participate in trading on [https://matic.opensea.io/](http://matic.opensea.io). Sell orders can be placed if you have NFT token balance in the NFT categories currently supported on the platform. For buying the NFTs, you need to have sufficient DAI/WETH balance on Matic network. These are the only two ERC20 tokens that are currently supported on [https://matic.opensea.io/](http://matic.opensea.io).

For those who are very new to L2, its important to understand that Polygon is a sidechain of Ethereum which is built to enhance scalability. Transaction confirmation times and fees for performing transactions on Polygon are much less than on Ethereum. Because of this, if your funds pre-exist on Ethereum you will need to bring them over to Polygon using the PoS bridge that Polygon offers.

Getting these tokens on the Polygon chain can be done in different ways.

<img src={useBaseUrl("img/nft-marketplace/get-funds.png")} />

1. **Deposit ETH/DAI from Ethereum to Polygon using the PoS bridge on wallet.polygon.technology**

  You can log in to [https://wallet.polygon.technology/](https://wallet.polygon.technology/) using the account in which you have sufficient balance of ETH/DAI. If you deposit ETH, you will receive WETH on the Polygon chain. It's call pos-WETH on the Matic chain and it has the contract address - `0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619`. Similarly for pos-DAI, the contract address is `0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063`

<img src={useBaseUrl("img/nft-marketplace/wallet-dashboard.png")} />

This is how the wallet dashboard looks when you visit [https://wallet.polygon.technology/](https://wallet.polygon.technology/)

Clicking on the deposit button besides the token you want to deposit will take you to the following page.

**Depositing ETH**

<img src={useBaseUrl("img/nft-marketplace/deposit-eth.png")} />

**Depositing DAI**

<img src={useBaseUrl("img/nft-marketplace/deposit-dai.png")} />

If you have a sufficient balance of ETH/DAI on Ethereum, then you should be able to deposit. It is recommended to follow this guide to understand more on deposits

[https://blog.matic.network/deposits-and-withdrawals-on-pos-bridge/](https://blog.matic.network/deposits-and-withdrawals-on-pos-bridge/)

   **"PLEASE ENSURE THAT YOU USE THE PoS BRIDGE WHEN YOU DEPOSIT ETH/DAI."**

Its very important to follow this because [matic.opensea.io](http://matic.opensea.io) only supports the pos version of DAI/ETH. Depositing ETH/DAI using the Plasma bridge will result in plasma-WETH and plasma-DAI getting deposited in to your account and you will not be able to use it for trading on matic.opensea.io. Once you complete the deposit process, it will take about 7-8 minutes for your deposit to be completed. You should be able to track the real time status of your deposit from the activity header component that you can see on the right hand side of the navigation bar. Once the deposit is completed, you can see the balance updated on the wallet dashboard as well as under the "My Account" section of matic.opensea.io as shown below.

<img src={useBaseUrl("img/nft-marketplace/balance.png")} />

2. **Get funds directly on Polygon from Transak.**

This is the URL that you should visit for purchasing tokens on Transak [https://global.transak.com/](https://global.transak.com/)

You can choose the network as Polygon and then choose DAI/WETH from the token list and then go ahead with the steps in the transak application.

3. **Get funds from another account on Polygon**

If you have sufficient balance of these tokens on another address on Polygon, then you can transfer these tokens from that address to the address with which you are currently logged in to matic.opensea.io
