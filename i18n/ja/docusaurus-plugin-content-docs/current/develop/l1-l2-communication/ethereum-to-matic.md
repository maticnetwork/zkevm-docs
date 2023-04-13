---
id: ethereum-to-matic
title: EthereumからデータPolygonにデータを転送する
description: コントラクトを介してEthereumからPolygonに状態またはデータを転送する
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

EthereumデータをPolygon EVMチェーンからネイティブに読み込むメカニズムを、状態同期と言います。つまり、このメカニズムにより、EthereumチェーンからPolygonチェーンへ任意のデータを転送できます。これを可能にする手順は次のとおりです。Heimdallレイヤーのバリデーターが特定のイベントをリッスンします。送信者コントラクトから`StateSynced`は、イベントが選択されるとすぐに、イベントで渡された`data`がレシーバーコントラクトに書き込まれます。詳細は[こちら](/docs/maintain/validator/core-components/state-sync-mechanism)

送信者とレシーバコントラクトは、Ethereum上にマッピングされている必要があります。[StateSender.sol](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol)は、各送信者とレシーバを認識する必要があります。マッピングを完了したい場合は、[ここに](https://mapper.polygon.technology/)マッピングをリクエストしてください。

---

次のチュートリアルでは、Goerli（Ethereumテストネット）に、 送信者コントラクトをデプロイし、Mumbai（Polygonのテストネット）にレシーバコントラクトをデプロイします。次に、送信者からデータを送信し、ノードスクリプトのweb3呼び出しを介してレシーバでデータを読み取ります。

### 1. 送信コントラクトをデプロイする {#1-deploy-sender-contract}

送信コントラクトの唯一の目的は、Maticの状態同期コントラクトであり、HeimdallがリッスンしているStateSyncedイベントである、StateSenderコントラクトで[syncState](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33)機能を呼び出しできるようにすることです。

以下でデプロイします：

`0xEAa852323826C71cd7920C3b4c007184234c3945`Goerli上

`0x28e4F3a7f651294B9564800b2D01f35189A5bFbE`Ethereum Mainnet上

この機能を呼び出しできるようにするために、まず、この機能のインターフェースをコントラクトに含めておきましょう。

```jsx
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...
```

次に、Polygonに渡したいデータを取り込みsyncStateを呼び出す、カスタム機能を書いてみましょう

```jsx
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

上記の機能で、`stateSenderContract`は、`Sender`をデプロイするネットワーク上のStateSenderのアドレスです(例：Goerliには`0xEAa852323826C71cd7920C3b4c007184234c3945`を使います)。`receiver`はここから送信するデータを受け取るコントラクトです。

コンストラクタを使用して変数を渡すことが推奨されますが、このデモの目的では、単にこれらの2つのアドレスをハードコードします。

以下に、Sender.solがどのように見えるかを示します：

```jsx
// sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

contract sender {
  address public stateSenderContract = 0xEAa852323826C71cd7920C3b4c007184234c3945;
  address public receiver = 0x83bB46B64b311c89bEF813A534291e155459579e;

  uint public states = 0;

  function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
  }

}
```

送信者コントラクトを介して送信された状態の数を記録するために、単純な`states`カウンターを使用しています

Remixを使用してコントラクトをデプロイし、アドレスとABIをノートします。

### 2. レシーバコントラクトをデプロイする {#2-deploy-receiver-contract}

レシーバコントラクトは、`StateSynced`イベントが発生したときにバリデータにより呼び出されるものです。バリデータは、レシーバコントラクト上で`onStateReceive`機能を呼び出して、データを送信します。これを実装するには、まず、[StateReceiver](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol)インターフェースをインポートし、カスタムロジックを書き込み、onStateReceive内の転送されたデータを解釈します。

Receiver.solがどのよう見えるかを以下に示します：

```jsx
// receiver.sol

pragma solidity ^0.5.11;

// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}

contract receiver {

  uint public lastStateId;
  bytes public lastChildData;

  function onStateReceive(uint256 stateId, bytes calldata data) external {
    lastStateId = stateId;
    lastChildData = data;
	}

}
```

この機能は、単に最後に受信した状態IDとデータをバリデータに割り当てるだけです。[StateId](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36)は、転送された状態への単純な一意参照です（単純なカウンタ）。

Polygon上のReceiver.solをテストネットにデプロイし、アドレスとABIをノートする

### 3. マッピングされた送信とレシーバを取得する {#3-getting-your-sender-and-receiver-mapped}

送信者とレシーバに既にデプロイされているアドレス（上記）を使用するか、カスタムコントラクトをデプロイして、ここで行われるマッピングをリクエストすることができます：[https://mapper.polygon.technology/](https://mapper.polygon.technology/)

### 4. データを送受信する {#4-sending-and-receiving-data}

さて、コントラクトを配置してマッピングを完了したので、単純なノードスクリプトを作成して、任意の16進バイトを送信し、Polygonで受信してデータを解釈します。

**4.1 スクリプトをセットアップする**

最初に、web3オブジェクトを初期化して、ウォレットでトランザクションとコントラクトを作成します

```jsx
// test.js

const Web3 = require('web3')
const Network = require("@maticnetwork/meta/network")

const network = new Network ('testnet', 'mumbai')

const main = new Web3(network.Main.RPC)
const matic = new Web3 (network.Matic.RPC)

let privateKey = `0x...` // add or import your private key

matic.eth.accounts.wallet.add(privateKey)
main.eth.accounts.wallet.add(privateKey)

let receiverAddress = `<RECEIVER_CONTRACT_ADDRESS>`
let receiverABI = `` // insert or import ABI
let senderAddress = `<SENDER_CONTRACT_ADDRESS>`
let senderABI = `` // insert of import the ABI

let sender = new main.eth.Contract(JSON.parse(senderABI), senderAddress)
let receiver = new matic.eth.Contract(JSON.parse(receiverABI), receiverAddress)

```

RPCに@maticnetwork/metaパッケージを使用していますが、このパッケージは、スクリプトを実行するための要件ではありません。

`matic`と`main`オブジェクトは、PolygonとRopstenのRPCで、それぞれ初期化されたweb3オブジェクトを参照します。

`sender`と`receiver`オブジェクトは、ステップと1と2でデプロイした、Sender.solとReceiver.sol.のコントラクトオブジェクトを参照します。

**4.2 データを送信する**

次に、機能をセットアップして、データのバイト文字列を作成し、それを送信者コントラクトを介して送信してみましょう。

```jsx
// data to sync
function getData(string) {
  let data = matic.utils.asciiToHex(string);
  return data
}

// send data via sender
async function sendData (data) {
  let r = await sender.methods
    .sendState (getData(data))
    .send({
      from: main.eth.accounts.wallet[0].address,
      gas: 8000000
    })
  console.log('sent data from root, ', r.transactionHash)
}
```

`getData`を呼び出すと、ASCII文字列（例:`Hello World !`）がバイト文字列 (例:`0x48656c6c6f20576f726c642021`）に変換されます。 `sendData`機能は`data`（ASCII文字列）を取り込み、`getData`を呼び出し、バイト文字列を送信者コントラクトに渡します

**4.3 データを受信する**

次に、 Receiver.solで受信データをチェックします。

状態同期を実行するには、7〜8分かかります。

以下の機能を追加して、(a) 送信者から送信された状態数と (b) レシーバで最後に受信した状態をチェックします。

```jsx
// check `states` variable on sender
async function checkSender () {
  let r = await sender.methods
    .states()
    .call()
  console.log('number of states sent from sender: ', r)
}

// check last received data on receiver
async function checkReceiver () {
  let r = await receiver.methods
    .lastStateId()
    .call()
  let s = await receiver.methods
    .lastChildData()
    .call()
  console.log('last state id: ', r, 'and last data: ', s)
  console.log('interpreted data: ', getString(s))
}
```

`checkReceiver`機能は、コントラクトで定義した変数を呼び出すだけです。これは、バリデータがコントラクトで`onStateReceive`を呼び出すとすぐに設定されます。この`getString`機能は、単純にバイト文字列を解釈します (ASCIIにそれを変換します)

```jsx
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

最後に、メソッドを書き込み、機能を実行します：

```jsx
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

**4.4 それを、すべてまとめます！**

テストスクリプトはこのような感じです：

```jsx
// test.js

const Web3 = require('web3')
const Network = require("@maticnetwork/meta/network")

const network = new Network ('testnet', 'mumbai')

const main = new Web3(network.Main.RPC)
const matic = new Web3 (network.Matic.RPC)

let privateKey = `0x...`
matic.eth.accounts.wallet.add(privateKey)
main.eth.accounts.wallet.add(privateKey)

let receiverAddress = `<RECEIVER_CONTRACT_ADDRESS>`
let receiverABI = ``
let senderAddress = `<SENDER_CONTRACT_ADDRESS>`
let senderABI = ``

let sender = new main.eth.Contract(JSON.parse(senderABI), senderAddress)
let receiver = new matic.eth.Contract(JSON.parse(receiverABI), receiverAddress)

// data to sync
function getData(string) {
  let data = matic.utils.asciiToHex(string);
  return data
}

function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}

// console.log(getData('Sending a state sync! :) '))

async function sendData (data) {
  let r = await sender.methods
    .sendState (getData(data))
    .send({
      from: main.eth.accounts.wallet[0].address,
      gas: 8000000
    })
  console.log('sent data from root, ', r.transactionHash)
}

async function checkSender () {
  let r = await sender.methods
    .states()
    .call()
  console.log('number of states sent from sender: ', r)
}

async function checkReceiver () {
  let r = await receiver.methods
    .lastStateId()
    .call()
  let s = await receiver.methods
    .lastChildData()
    .call()
  console.log('last state id: ', r, 'and last data: ', s)
  console.log('interpreted data: ', getString(s))
}

async function test() {
	await sendData ('Hello World !')
	await checkSender ()
	// add a timeout here to allow time gap for the state to sync
	await checkReceiver ()
}

test()
```

**4.5 スクリプトを実行しましょう**

スクリプトを実行すると、以下のように出力されます：

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World !
```
