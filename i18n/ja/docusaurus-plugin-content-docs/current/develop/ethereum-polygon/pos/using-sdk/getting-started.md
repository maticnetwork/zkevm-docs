---
id: getting-started
title: Matic.jsを始めましょう
sidebar_label: Instantiating Matic.js
description: "Matic.jsを使用して、Polygon PoSチェーンとやり取りします。"
keywords:
  - docs
  - matic
  - polygon
  - sdk
  - matic.js
  - pos
image: https://matic.network/banners/matic-network-16x9.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

開始するには、最新の[Matic.jsドキュメント](/docs/develop/ethereum-polygon/matic-js/get-started)をチェックしてください。

## クイックサマリー {#quick-summary}

matic.js SDKは、Polygonのすべてのコンピューティングパワーを利用して、すぐに使用できるようにします。承認、デポジット、引き出しを可能にするカスタムメイド機能により、すべてを多くの手順を踏むことなく行えます。これを設計した理由は、お客様が当社のプラットフォームからすぐに値を得られるようにするためでした。

## インストール {#installation}
SDKを介してPolygonの素晴らしい機能を使用するための最初のステップは、NPMをインストールすることです。[ここ](https://www.npmjs.com/package/@maticnetwork/maticjs)をご覧ください。

```bash
npm install @maticnetwork/maticjs
npm install @maticnetwork/maticjs-web3
npm install @maticnetwork/maticjs-ethers
```

## 使用法 {#usage}
SDKにアクセスするには、使用してアプリケーションにそれをインポートします
```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin)
```

プロバイダは、要件に基づいてRPC URLまたはMetaMaskプロバイダー、HDWalletProviderなどのWeb3ベースのプロバイダーであることができます。

詳細情報については、[PoS用のMatic.jsドキュメント](https://maticnetwork.github.io/matic.js/docs/pos/)を参照してください。

```js
// for mumbai testnet
const getPOSClient = (network = 'testnet', version = 'mumbai') => {
  const posClient = new POSClient();

await posClient.init({
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
