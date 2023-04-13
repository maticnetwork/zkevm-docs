---
id: eth
title: ETHデポジット/引き出すガイド
sidebar_label: ETH
description: "Polygonネットワーク上で、ETHトークンのデポジットと引き出しをする"
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - eth
image: https://matic.network/banners/matic-network-16x9.png
---

### ハイレベルフロー {#high-level-flow}

#### **ETHをデポジットする（1ステップのプロセス）**

**デポジット**機能は、トークンがPolygonコントラクトにデポジットされる場所で呼び出され、Polygonネットワークで使用できるようになります。

#### **ETHを**転送する

Polygonにファンドがあれば、ファンドを使用して即座に他の人に送信することができます。

#### **ETHを引き出す（3ステップのプロセス）**

1. ファンドの引き出しは、Polygonから開始されます。チェックポイント間隔は30分（テストネットで約10分待機）と設定され、Polygonブロックレイヤー上のすべてのブロックが前回のチェックポイントから検証されます。
2. メインチェーンERC20コントラクトにチェックポイントが送信されると、NFT Exit（ERC721）トークンが同等の値で作成されます。
3. 引き出された資金は、プロセス終了手続きを使用してメインチェーンコントラクトからERC20アカウントに戻すことができます。

## セットアップの詳細 {#setup-details}

### Matic SDKの設定 {#configuring-matic-sdk}

Matic SDKをインストールする（**_3.0.0_**）

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js {#util-js}

Maticクライアントを起動する

```js
// const use = require('@maticnetwork/maticjs').use
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')
const { PlasmaClient } = require('@maticnetwork/maticjs-plasma')
const { use } = require('@maticnetwork/maticjs')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')

// install web3 plugin
use(Web3ClientPlugin)

const privateKey = config.user1.privateKey
const from = config.user1.address

async function getPlasmaClient (network = 'testnet', version = 'mumbai') {
  try {
    const plasmaClient = new PlasmaClient()
    return plasmaClient.init({
      network: network,
      version: version,
      parent: {
        provider: new HDWalletProvider(privateKey, config.parent.rpc),
        defaultConfig: {
          from
        }
      },
      child: {
        provider: new HDWalletProvider(privateKey, config.child.rpc),
        defaultConfig: {
          from
        }
      }
    })
  } catch (error) {
    console.error('error unable to initiate plasmaClient', error)
  }
}
```

### process.env {#process-env}

ルートディレクトリに新しいファイルを作成し`process.env`、次の内容を追加します：

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

## 入金 {#deposit}

**デポジット：**コントラクト`depositEther()`を呼び出すことでデポジットを行うことができます`depositManagerContract`。

トークンが事前にマッピングされ、承認される必要があります。

```js
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
  const client = await getPOSClient();
  const result = await client.depositEther(100, from);

  const txHash = await result.getTransactionHash();
  const receipt = await result.getReceipt();

};

execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})
```

:::note

EthereumからPolygonへの入金は、ステート同期メカニズムを使用して実行され、約22〜30分かかります。この時間を待ってから、web3.js/matic.jsライブラリやMetamaskを使って残高をチェックすることをお勧めします。エクスプローラは、子チェーンで少なくとも1つの資産転送が発生した場合にのみ、残高を表示します。この[リンク](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma)では、デポジットイベントを追跡する方法について説明しています。

:::

## 転送 {#transfer}

Polygonネットワーク上のETHは、WETH（ERC20トークン）です。

```js
const { getPlasmaClient, from, plasma, to } = require('../utils')

const amount = '1000000000' // amount in wei
const token = plasma.child.erc20

async function execute () {
  try {
    const plasmaClient = await getPlasmaClient()
    const erc20Token = plasmaClient.erc20(token)
    const result = await erc20Token.transfer(amount, to, { gasPrice: 1000000000 })
    const txHash = await result.getTransactionHash()
  } catch (error) {
    console.log(error)
  }
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

## 引き出す {#withdraw}

### 1. バーン {#1-burn}

ユーザーは、`getERC20TokenContract`子トークンコントラクトの`withdraw`機能を呼び出すことができます。この機能は、トークンをバーンします。Polygon Plasmaクライアントは、この呼び出しを行うための`withdrawStart`メソッドを公開します。

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)

  const txHash = await result.getTransactionHash()
  const receipt = await result.getReceipt()

}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

ユーザーはコントラクトの`startExitWithBurntTokens()`機能を呼び出すことができます`erc20Predicate`。Polygon Plasmaクライアントは、この呼び出しを行う`withdrawConfirm()`メソッドを公開します。この機能は、チェックポイントがメインチェーンに含まれた後にのみに呼び出すことができます。チェックポイントインクルージョンは、ガイドに従って追[跡](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma.md#checkpoint-events)できます。


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
}

execute().then(_ => {
  process.exit(0)
})
```

### 3.プロセスを終了する {#3-process-exit}

ユーザーは、`withdrawManager`コントラクトの`processExits()`機能を呼び出して、バーン証明を提出する必要があります。有効な証明を提出すると、トークンがユーザーに転送されます。Polygon Plasmaクライアントは、この呼び出しを行うための`withdrawExit()`メソッドを公開します。

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true);
  const result = await erc20Token.withdrawExit();

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

PolygonでEthereumチェーンに実行されるすべてのトランザクションを表すチェックポイントは、メインチェーンEthereumコントラクトに定期的に提出されます。

:::