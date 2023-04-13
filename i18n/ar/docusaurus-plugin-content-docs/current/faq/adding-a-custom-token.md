---
id: adding-a-custom-token
title: Adding a Custom Token
sidebar_label: Adding a Custom Token
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The **Add Custom Token** feature allows you to add any token explicitly and use it with the Polygon Wallet Suite. You just have to search for the token by its contract address, either root or child:

* The **root** is the token contract on Ethereum
* The **child** is the contract on Polygon

### Pro tip: How do I find the token contract?

You can search for the token by its name on either [Coingecko](http://coingecko.com) or [Coinmarketcap](https://coinmarketcap.com/) where you will be able to see its address on the Ethereum chain (for ERC 20 tokens) and other supported subsequent chains like Polygon. The token address on other chains might not be updated but you can surely use the root address for all purposes.

So when selecting a token, you will be able to search by:
* token symbol
* token name
* contract

Here is how it works:

<img src={useBaseUrl("img/wallet-bridge/001.png")} height="420px" />

1. Easily add any token to your list by adding the contract address as a custom token (we support

contract addresses on both Polygon or Ethereum):

<img src={useBaseUrl("img/wallet-bridge/002.png")} height="600px" />

2. Once the token information is fetched, you will see a confirmation screen with all the token information. You can then add it as a custom token which will be stored locally in your system, We suggest you reverify the token contracts twice as there are a lot of clone or scam tokens:

<img src={useBaseUrl("img/wallet-bridge/003.png")} height="600px" />

<img src={useBaseUrl("img/wallet-bridge/004.png")} height="600px" />

3. Your added token is now shown when selecting a token:

<img src={useBaseUrl("img/wallet-bridge/005.png")} height="600px" />

4. You can add a token directly from the tokens tab of the **Manage** screen:

<img src={useBaseUrl("img/wallet-bridge/006.png")} height="600px" />
