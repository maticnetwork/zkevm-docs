---
id: intro
title: Introduction
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

> Arkane, for developers looking to dive into blockchain technology.


**Arkane** allows you to easily integrate your app with the Polygon blockchain, whether you already have an app integrated with web3 or are building a new application from scratch. Arkane provides a smooth and delightful experience for you, your users on both web and mobile.

Arkane will help you interact with the Polygon blockchain, create blockchain wallets, create different asset types such as fungible (ERC20), and non-fungible tokens (ERC721, and ERC1155) and interact with smart contracts. Next to a superior developer experience, you can give your users a user-friendly interface.

Each application is unique and has different needs, therefore they provide different ways of interacting with Arkane. Applications that have support for Web3 are recommendated to integrate the [Arkane Web3 provider](https://arkane.gitbook.io/widget/web3-provider/getting-started), others are suggested to use the [Arkane Widget](https://arkane.gitbook.io/widget/widget/introduction).


## Key features
- Support Web and mobile
- Offers social logins
- Offers a fiat-on-ramp
- *Only wallet that supports NFTs (ERC721 and ERC1155) on Polygon*
- Supports both Polygon and Ethereum
- Easy to integrate using web3
- Build for a mainstream audience
- Offers in-app customer support


## Getting Started 🎉
If you already support Web3-technology, you can improve the UX within your application by integrating the Arkane Web3 provider, a smart wrapper around the existing Web3 Ethereum JavaScript API.

By making use of our Web3 provider you are able to leverage the full potential of Arkane with minimal effort and you will be able to onboard users that are less tech savvy without making them leave your application or download third party plugins. Integrating just takes 2 steps and 5 minutes




**Don't support Web3 yet?**
> Don't worry we've got you covered with our 📦 [Widget - Arkane Connect](https://arkane.gitbook.io/widget/).




### Step 1: Add the library to your project
Install the library by downloading it to your project via NPM

```
npm i @arkane-network/web3-arkane-provider
```

followed by adding the script to the head of your page.

```
<script src="/node_modules/@arkane-network/web3-arkane-provider/dist/web3-arkane-provider.js"></script>
```

After adding the javascript file to your page, a global Arkane object is added to your window. This object is the gateway for creating the web3 wrapper and fully integrates the widget - Arkane Connect.

### Step 2: Initialize the web3 provider
Add the following lines of code to your project, it will load the Arkane web3 provider.

```
Arkane.createArkaneProviderEngine({clientId: ‘Arketype’}).then(provider => {
    web3 = new Web3(provider);
});
```
The web3 instance now works as if it was injected by parity or MetaMask. You can fetch wallets, sign transactions, and messages.
### Congratulations, your dapp now supports Arkane 🎉
> 🧙 To connect to Arkanes production environment and mainnet, you will need to [register your app](https://arkane-network.typeform.com/to/hzbcGJ) and request your [Client ID](https://arkane.gitbook.io/widget/deep-dive/authentication#client-id).

Want to know more about the wonderful world Arkane has to offer, [check out their documentation](https://arkane.gitbook.io/widget/)

## Showcase videos
#### Send Matic tokens to an email address on Polygon
[![Send Matic tokens to an email address on Polygon Network](https://i.snipboard.io/OzXmrN.jpg)](https://www.youtube.com/watch?v=3gehPvX4DOo&list=PLh3bJA02WlKErlpDexw_cFOlPfMQiU67U&index=1)

#### Transfer of a Matic NFT
[![Transfer of a Matic NFT](https://i.snipboard.io/dLkM3t.jpg)](https://www.youtube.com/watch?v=SLxAIXRv7ec&list=PLh3bJA02WlKErlpDexw_cFOlPfMQiU67U)


