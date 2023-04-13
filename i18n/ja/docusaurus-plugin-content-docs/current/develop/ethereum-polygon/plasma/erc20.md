---
id: erc20
title: ERC20預け入れ／引き出しガイド
sidebar_label: ERC20
description:  "Polygonネットワーク上で、ERC20トークンをデポジットと引き出しをする。"
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - erc20
image: https://matic.network/banners/matic-network-16x9.png
---

[Plasma ERC20の最新Matic.jsドキュメント](https://maticnetwork.github.io/matic.js/docs/plasma/erc20/)をチェックして開始し、最新のメソッドを表示してください。

### ハイレベルフロー {#high-level-flow}

#### **ERC20をデポジットする（2 ステッププロセス）**

1. トークンは、まず、Parent Chain（Ethereum/Goerli）上のPolygonルートチェーンコントラクトに承認される必要があります。
2. 承認後、**デポジット**機能が呼び出され、トークンがPolygonコントラクトにデポジットされ、Polygonで使用できるようになります。

#### **ERC20を転送する**

Polygonにファンドがあれば、ファンドを使用して即座に他の人に送信することができます。

#### **ERC20を引き出す（3 ステッププロセス）**

1. ファンドの引き出しは、Polygonから開始されます。チェックポイント間隔は30分（テストネットが約10分待機する場合）設定され、Polygonブロックレイヤー上のすべてのブロックが前回のチェックポイントから検証されます。
2. メインチェーンERC20コントラクトにチェックポイントが送信されると、NFT Exit（ERC721）トークンが同等の値で作成されます。
3. 引き出された資金は、プロセス終了手続きを使用してメインチェーンコントラクトからERC20アカウントに戻すことができます。

## セットアップの詳細 {#setup-details}

### Polygonエッジを設定する {#configuring-polygon-edge}

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

**承認：**これは通常のERC20承認なので、関数を呼び出す`depositManagerContract`ことができます`transferFrom()`。Polygon Plasmaクライアントは、この呼び出しを行う`erc20Token.approve()`メソッドを公開します。

**デポジット**：デポジットは、depositManagerContractコントラクト上の**_depositERC20ForUser_**を呼び出すことにより行うことができます。

ただし、トークンは、事前にマッピングされた転送承認がされている必要がありますから注意してください。

この呼び出しをするのが**_erc20Token.deposit_**メソッドです。


```js
const { getPlasmaClient, plasma, from } = require('../utils')

const amount = '1000000000000000000' // amount in wei
const token = plasma.parent.erc20

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token, true)
  const result = await erc20Token.deposit(amount, from)
  const receipt = await result.getReceipt()
  console.log(receipt)
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

:::note

EthereumからPolygonへの入金は、ステート同期メカニズムを使用して行われ、約5〜7分かかります。この時間を待ってから、web3.js/matic.jsライブラリやMetamaskを使って残高をチェックすることをお勧めします。エクスプローラは、子チェーンで少なくとも1つの資産転送が発生した場合にのみ、残高を表示します。この[リンク](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma)では、デポジットイベントを追跡する方法について説明しています。

:::

## 転送 {#transfer}

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
    const receipt = await result.getReceipt()
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

ユーザーは、`getERC20TokenContract`子トークンコントラクトの`withdraw()`機能を呼び出すことができます。この機能は、トークンをバーンします。Polygon Plasmaクライアントは、この呼び出しを行う`withdrawStart()`メソッドを公開します。

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)
  console.log(await result.getReceipt())
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)

```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

ユーザは、**_erc20Predicate_**コントラクトの**_startExitWithBurntTokens_**機能を呼び出しできます。Polygon Plasmaクライアントは、この呼び出しを行うために、**_withdrawConfirm_**メソッドを公開します。この機能は、チェックポイントがメインチェーンに含まれた後にのみに呼び出すことができます。チェックポイントインクルージョンは、ガイドに従って追[跡](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma#checkpoint-events)できます。


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

### 3.プロセスを終了する {#3-process-exit}

ユーザは、**_withdrawManager_**コントラクトの**_processExits_**機能を呼び出して、バーンのプルーフを送信する必要があります。有効な証明を提出すると、トークンがユーザーに転送されます。Polygon Plasmaクライアントは、呼び出しを、**_withdrawExit_**メソッドを公開します。

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawExit()
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

30分ごとに、PolygonネットワークでERC20チェーンに実行されるすべてのトランザクションを表すチェックポイントは、メインチェーンERC20契約に定期的に提出されます。

:::