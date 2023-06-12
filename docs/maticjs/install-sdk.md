---
id: install-sdk
title: Install MaticJS SDK
sidebar_label: Installation
description: MaticJS SDK is a JavaScript library that allows you to interact with the Polygon zkEVM network.
keywords:
  - maticjs
  - polygon
  - zkevm client
  - api
  - sdk
---

**MaticJS SDK** is a JavaScript library that allows you to interact with the Polygon zkEVM network. In this tutorial, we will install the MaticJS library and setup alongside **Web3JS** library.

If you want to dig deeper into the API architecture of MaticJS SDK, please refer to the guide provided [here](https://wiki.polygon.technology/docs/develop/ethereum-polygon/matic-js/api-architecture).

:::info

Web3JS and EthersJS support is available via separate package as a plugin for MaticJS library.

:::

## Installation

### MaticJS Package

```bash
npm install @maticnetwork/maticjs
```

### External Plugins

MaticJS SDK supports popular Web3 libraries via external plugins. By installing these plugins, you can utilize your favorite Ethereum development libraries. You can install them using the following commands:

#### Install Web3JS plugin
```bash
npm install @maticnetwork/maticjs-web3
```
#### Install EthersJS plugin
```bash
npm install @maticnetwork/maticjs-ethers
```

## Setup

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// make sure to install web3 plugin
use(Web3ClientPlugin)
```

In the above code we are initiating MaticJS with `web3js` but you can also similarly initiate with EthersJS as demonstrated in the below code snippet:

```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// make sure install ethers plugin
use(Web3ClientPlugin)
```
