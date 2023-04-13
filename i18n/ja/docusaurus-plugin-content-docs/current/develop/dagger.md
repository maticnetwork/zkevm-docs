---
id: dagger
title: Dagger
sidebar_label: Dagger - Single App
description: Polygonで次のブロックチェーンアプリを構築する
keywords:
  - docs
  - matic
  - polygon
  - dagger
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

DaggerはEthereumブロックチェーンからリアルタイムで更新を取得する最良の方法です。Ethereumブロックチェーンイベント、つまりトランザクション、トークン転送、レシート、websocketまたはsocketを介したリアルタイムのログを取得するDAppsとBackendシステムについて提供します。

信頼性とスケーラブルなリアルタイムイベントのインフラを維持します。`@maticnetwork/dagger`は、NodeJSで書き込まれたDaggerプロジェクト用のコンシューマライブラリです。Daggerサーバーを使用して、Ethereumネットワークからリアルタイムで更新を取得します。

## インストール {#installation}

```sh
# Using Yarn
yarn add @maticnetwork/dagger

# Using NPM
npm install @maticnetwork/dagger --save
```

## ネットワーク {#network}

### Ethereumネットワーク {#ethereum-network}

#### Mainnet {#mainnet}

```sh
Websocket: wss://mainnet.dagger.matic.network
Socket: mqtts://mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Kovan {#kovan}

```sh
Websocket: wss://kovan.dagger.matic.network
Socket: mqtts://kovan.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Ropsten {#ropsten}

```sh
Websocket: wss://ropsten.dagger.matic.network
Socket: mqtts://ropsten.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Goerli {#goerli}

```sh
Websocket: wss://goerli.dagger.matic.network
Socket: mqtts://goerli.dagger.matic.network (You can also use `ssl://` protocol)
```

### Maticネットワーク {#matic-network}

#### Mainnet {#mainnet-1}

```sh
Websocket: wss://matic-mainnet.dagger.matic.network
Socket: mqtts://matic-mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Mumbaiテストネット {#mumbai-testnet}

```sh
Websocket: wss://mumbai-dagger.matic.today
Socket: mqtts://mumbai-dagger.matic.today (You can also use `ssl://` protocol)
```

## 例 {#example}

- まず最初に_npm_プロジェクトを作成します。

```bash
npm init -y
touch index.js
```

- ここで、`index.js`で次のコードスニペットを置くことができます。

```javascript
const Dagger = require('@maticnetwork/dagger')

// connect to correct dagger server, for receiving network specific events
//
// you can also use socket based connection
const dagger = new Dagger("wss://mainnet.dagger.matic.network")

// get new block as soon as it gets created
dagger.on('latest:block.number', result => {
  console.log(`New block created: ${result}`)
})
```

- `index.js`を実行し、新しいブロックが作成され次第すぐに、ブロック番号を受け取ることを開始します。

```bash
node index.js
```

## API {#api}

### 新しいDagger(url) {#new-dagger-url}

daggerオブジェクトの作成

- `url`は、daggerサーバーのアドレスです。使用可能なすべてのurl値のために[ネットワークセクション](#network)を確認します。

例：

```js
const dagger = new Dagger(<url>)
```

### dagger.on(event, fn) {#dagger-on-event-fn}

トピックをサブスクライブする

- `event`は、サブスクライブする`String`トピックです。`event`ワイルドカードの文字はサポートされています（ `+`はシングルレベル、`#`はマルチレベル）
- `fn`-`function (data, removed)`イベントが発生したときにfnが実行されます。
  - `data`イベントからのデータ
  - 再編成のためにブロックチェーンからデータが削除されたかどうか`removed`フラグを付けます。

例：

```js
dagger.on('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.once(event, fn) {#dagger-once-event-fn}

[on](#daggeronevent-fn)と同じですが、1回だけ実行できます。

例：

```js
dagger.once('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.off(event, fn) {#dagger-off-event-fn}

トピックからサブスクライブを解除する

- `event`はサブスクライブを解除する`String`トピックです。
- `fn`-`function (data, removed)`

例：

```js
dagger.off('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.of(room) {#dagger-of-room}

Daggerからルームを作成します。`room`は、2つの値のうちの1つである必要があります。
  - `latest`
  - `confirmed`

`room`オブジェクトには次のメソッドがあります。
  - `on`Daggerと同じ`on`
  - `once`Daggerと同じ`once`
  - `off`Daggerと同じ`off`

```js
const latestRoom = dagger.of('latest')
const confirmedRoom = dagger.of('confirmed')
```

### dagger.end([force]) {#}

Daggerを閉じ、次のオプションを受け入れます。

- `force`: それをtrueにして、Daggerをすぐに閉じます。このパラメータはオプションです。

```js
dagger.end({force: true}) // immediate closing
```

### dagger.contract(web3Contract) {#dagger-contract-web3contract}

Daggerをサポートするweb3コントラクトラッパーを作成します。

- ます最初にweb3コントラクトオブジェクトを作成します。

```javascript
// web3 contract
const web3Contract = new web3.eth.Contract(abi, address)
```

- これでそこにDaggerコントラクトラッパーを作成します。

```javascript
// dagger contract
const contract = dagger.contract(web3Contract)
```

- 次にコントラクトイベントをフィルターアウトします

```javascript
const filter = contract.events.Transfer({
  filter: { from: "0x123456..." },
  room: "latest"
})
```

- コントラクトイベントを監視します

```javascript
// watch
filter.watch((data, removed) => { console.log(data, removed) })

// or watch only once
filter.watchOnce((data, removed) => { console.log(data, removed) })
```

- イベント監視を停止します

```js
// stop watching
filter.stopWatching();
```

## イベント {#events}

各イベントにはルーム∈ {`latest`, `confirmed`}があります。
  - `latest`:チェーンにブロックが含まれた直後にイベントが発生します。
  - `confirmed`: 12 件の承認後にイベントが発生します。

DAppでUIに更新を表示したい場合は、`latest`イベントを使用します。UI/UXをより良くユーザーフレンドリーにするのに役立ちます。

サーバーまたはUI上で不可逆的なタスクのために`confirmed`イベントを使用します。電子メールや通知を送信するように、1つのトランザクションが確認された後にユーザーがUI上でその後のタスクを実行できます。

### ネットワークイベント {#network-events}

| Ethereumイベント | いつですか？ | `removed`フラグ |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| ブロック | 作成されたすべての新しいブロック | はい |
| block.number | 作成されたすべての新しいブロック番号 |                |
| block.hash | 作成されたすべての新しいブロックハッシュ | はい |
| block/`number` | チェーンに含まれた将来の一般的なブロック | はい |
| addr/`address`/tx | `address`における、すべての新しいトランザクション | はい |
| addr/`address`/tx/out | `address`における、すべての新しい発信トランザクション | はい |
| addr/`address`/tx/in | `address`における、すべての新しい着信トランザクション | はい |
| tx/`txId` | ブロックに含まれる`txId`を取得した場合 | はい |
| tx/`txId`/success | `txId`において、txステータスが正常に完了した場合（ブロックに含まれる） | はい |
| tx/`txId`/fail | `txId`のために、txが失敗した場合（ブロックに含まれる） | はい |
| tx/`txId`/recept | `txId`のためにレシートが生成された場合（ブロックに含まれる） | はい |
| addr/`contractAddress`/deploy | ブロックに新しい`contractAddress`が含まれる場合 | はい |
| log/`contractAddress` | `contractAddress`のために新しいログが生成された場合 | はい |
| log/`contractAddress`/filter/`topic1`/`topic2` | `topic1`と新しいログおよび`contractAddress`のために`topic2`を生成した場合 | はい |

### Daggerイベント {#dagger-events}

| Daggerイベント | いつですか？ | args |
| ----------------- | ------------------------------ | -------------- |
| connection.status | 接続状況が変更された場合 | 値：ブーリアン型 |


すべてのイベントはルームで開始する必要があります：

#### ブロック {#block}

すべての新しいブロック

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:block", result => {
  console.log("Current block : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:block", result => {
  console.log("Confirmed block : ", result)
})
```

</TabItem>
</Tabs>


#### block.number {#block-number}

すべての新しいブロック番号

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:block.number", result => {
  console.log("Current block number : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:block.number", result => {
  console.log("Confirmed block number : ", result)
})
```

</TabItem>
</Tabs>

#### block.hash {#block-hash}

すべての新しいブロックハッシュ

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:block.hash", result => {
  console.log("Current block hash : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:block.hash", result => {
  console.log("Confirmed block hash : ", result)
})
```

</TabItem>
</Tabs>

#### block/{number} {#block-number-1}

チェーンに含まれた将来の**X**一般的なブロック

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:block/X", result => {
  console.log("Included in chain : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:block/X", result => {
  console.log("Included in chain : ", result)
})
```

</TabItem>
</Tabs>

#### addr/{addr}/tx {#addr-address-tx}

`address`における、すべての新しいトランザクション

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:addr/{address}/tx", result => {
  console.log("New Transaction : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:addr/{address}/tx", result => {
  console.log("New Transaction : ", result)
})
```

</TabItem>
</Tabs>

#### addr/{addr}/tx/{dir} {#addr-address-tx-dir}

`dir`は、トランザクションの方向 ∈ {`in`, `out`}です。   `address`は、アドレスに対する通知を受け取るために省略することができます。

<Tabs
defaultValue="in"
values={[
{ label: 'incoming', value: 'in', },
{ label: 'outgoing', value: 'out', },
{ label: 'wild card', value: 'all', },
]
}>
<TabItem value="in">

`address`における、すべての新しい着信トランザクション

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:addr/{address}/tx/in", result => {
  console.log("New Incoming Transaction : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:addr/{address}/tx/in", result => {
  console.log("New Incoming Transaction : ", result)
})
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="out">

`address`における、すべての新しい発信トランザクション

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:addr/{address}/tx/out", result => {
  console.log("New Outgoing Transaction : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:addr/{address}/tx/out", result => {
  console.log("New Outgoing Transaction : ", result)
})
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="all">

ワイルドカード表記を`address`の代わりに使用して、すべての着信と発信するトランザクションの通知を取得します。

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:addr/+/tx/in", result => {
  console.log("New Incoming Transaction : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:addr/+/tx/in", result => {
  console.log("New Incoming Transaction : ", result)
})
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

#### tx/{txId}/{status} {#tx-txid-status}

`status`は`txId`のstatus ∈ {`success`,`fail`,`receipt`}です。それは空のまま保持することができ、つまり`txId`がブロックに含まれる際にトリガーされ、その結果が`tx/{txId}`へ発生します。

<Tabs
defaultValue="any"
values={[
{ label: 'any', value: 'any', },
{ label: 'success', value: 'success', },
{ label: 'fail', value: 'fail', },
{ label: 'receipt', value: 'receipt', },
]
}>
<TabItem value="any">

ブロックに含まれる`txId`を取得した場合

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:tx/{txId}", result => { console.log(result) })
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:tx/{txId}", result => { console.log(result) })
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="success">

`txId`において、txステータスが正常に完了した場合（ブロックに含まれる）

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:tx/{txId}/success", result => { console.log(result) })
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:tx/{txId}/success", result => { console.log(result) })
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="fail">

`txId`のために、txが失敗した場合（ブロックに含まれる）

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:tx/{txId}/fail", result => { console.log(result) })
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:tx/{txId}/fail", result => { console.log(result) })
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="receipt">

`txId`のためにレシートが生成された場合（ブロックに含まれる）

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:tx/{txId}/receipt", result => { console.log(result) })
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:tx/{txId}/receipt", result => { console.log(result) })
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

#### log/{contractAddress} {#log-contractaddress}

`contractAddress`のためにログが生成された場合

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:log/{contractAddress}", result => {
  console.log("New Log : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:log/{contractAddress}", result => {
  console.log("New Log : ", result)
})
```

</TabItem>
</Tabs>

#### log/{contractAddress}/filter/{topic0}/{topic1}/{topic2} {#log-contractaddress-filter-topic0-topic1-topic2}

`topic0`、`topic1`と新しいログおよび`contractAddress`のために`topic2`を生成した場合

```javascript
// Triggers when 1 GNT (Golem token) get transferred to Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/filter/+/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', console.log)

// Triggers when any amount of GNT (Golem token) get sent from Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', ...)

// Listen for every Golem token transfer (notice `#` at the end)
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#', ...)
```

> イベント名は大文字と小文字を区別します。 `address`、`txId`、`topics`は小文字である必要があります。

> 注意事項： イベントのためにワイルドカードを使用することもできます。ワイルドカードには2種類あります：`+`（シングル）と`#`（複数）。必要以上のデータを取得すると、DAppにデータが溢れる可能性があるため、注意して使用する必要があります。



## Daggerサーバーテスト {#test-dagger-server}

このライブラリは`woodendagger`実行可能で構成されており、ローカルマシン上でテストdaggerサーバーです。そのため、TestRPCでテストできます。

本番環境では`woodendagger`を使用しないでください。これは開発目的のみです。これは`removed`フラグをサポートしていません。

```bash
$ woodendagger --url=https://mainnet.infura.io # or http://localhost:8545 for local json-rpc

# If you want to start dagger server on different ports,
# sockport: socket port for backend connection over TCP
# wsport: websocket port for frontend connection over websocket
$ woodendagger --url=http://localhost:8545 --sockport=1883 --wsport=1884

# To connect from dagger:
const dagger = new Dagger('mqtt://localhost:1883')
```

## サポート {#support}

クエリ、フィードバック、機能のリクエストがある場合は、[Telegram](https://t.me/maticnetwork)にお問い合わせください。

## ライセンス {#license}

MIT
