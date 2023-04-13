---
id: dagger
title: Dagger
sidebar_label: Dagger - Single App
description: Polygon에서 다음 블록체인 앱을 구축하십시오.
keywords:
  - docs
  - matic
  - polygon
  - dagger
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Dagger는 이더리움 블록체인에서 실시간 업데이트를 받을 수 있는 최고의 방법입니다.
Dagger는 dApp 및 백엔드 시스템이 이더리움 블록체인 이벤트(트랜잭션, 토큰, 이전, 영수증 및 로그)를 웹소켓 또는 소켓을 통해 실시간으로 받을 수 있는 방법을 제공합니다.

우리는 신뢰할 수 있고 확장 가능한 실시간 이벤트를 위한 인프라를 유지합니다. `@maticnetwork/dagger`는 NodeJS에서 작성된 Dagger 프로젝트를 위한 컨슈머 라이브러리로, Dagger 서버를 사용하여 이더리움 네트워크 실시간 업데이트를 받습니다.

## 설치 {#installation}

```sh
# Using Yarn
yarn add @maticnetwork/dagger

# Using NPM
npm install @maticnetwork/dagger --save
```

## 네트워크 {#network}

### 이더리움 네트워크 {#ethereum-network}

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

### 매틱 네트워크 {#matic-network}

#### Mainnet {#mainnet-1}

```sh
Websocket: wss://matic-mainnet.dagger.matic.network
Socket: mqtts://matic-mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Mumbai 테스트넷 {#mumbai-testnet}

```sh
Websocket: wss://mumbai-dagger.matic.today
Socket: mqtts://mumbai-dagger.matic.today (You can also use `ssl://` protocol)
```

## 예시 {#example}

- 먼저 _npm_ 프로젝트를 생성해 봅시다.

```bash
npm init -y
touch index.js
```

- 이제 다음 코드 스니펫을 `index.js`에 입력할 수 있습니다.

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

- `index.js`를 실행하면 새로운 블록이 생성되는 즉시 블록 번호를 받기 시작합니다.

```bash
node index.js
```

## API {#api}

### 새로운 Dagger(url) {#new-dagger-url}

Dagger 객체 생성

- `url`은 Dagger 서버의 주소입니다. 사용 가능한 모든 url 값을 확인하려면 [네트워크 섹션](#network)을 확인하세요.

예시:

```js
const dagger = new Dagger(<url>)
```

### dagger.on(event, fn) {#dagger-on-event-fn}

주제 구독

- `event`는 구독할 `String` 주제입니다. `event` 와일드카드 문자가 지원됩니다(단일 레벨인 경우 `+` 및 다중 레벨인 경우 `#`).
- `fn` - `function (data, removed)`
이벤트 발생 시 함수가 실행됩니다.
  - `data` 이벤트 데이터
  - `removed`재구성으로 인해 데이터가 블록체인에서 삭제되었는지 알려주는 플래그.

예시:

```js
dagger.on('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.once(event, fn) {#dagger-once-event-fn}

[on](#daggeronevent-fn)과 동일하지만 한 번만 실행됩니다.

예시:

```js
dagger.once('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.off(event, fn) {#dagger-off-event-fn}

주제 구독 취소

- `event`는 구독을 취소할 `String` 주제입니다.
- `fn` - `function (data, removed)`

예시:

```js
dagger.off('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.of(room) {#dagger-of-room}

Dagger에서 룸을 생성합니다. `room`은 두 값 중 하나가 되어야 합니다.
  - `latest`
  - `confirmed`

`room` 객체에는 다음 메서드가 있습니다.
  - `on` Dagger `on`과 동일
  - `once` Dagger `once`과 동일
  - `off` Dagger `off`과 동일

```js
const latestRoom = dagger.of('latest')
const confirmedRoom = dagger.of('confirmed')
```

### dagger.end([force]) {#}

Dagger를 닫고 다음 옵션을 선택합니다.

- `force`: true로 전달하면 바로 dagger를 종료합니다. 이 파라미터는 is 선택 사항.

```js
dagger.end({force: true}) // immediate closing
```

### dagger.contract(web3Contract) {#dagger-contract-web3contract}

Dagger를 지원하기 위해 웹3 계약 래퍼를 생성합니다.

- 먼저 웹3 계약 객체를 생성합니다.

```javascript
// web3 contract
const web3Contract = new web3.eth.Contract(abi, address)
```

- 이제 해당 객체에 Dagger 계약 래퍼를 생성합니다.

```javascript
// dagger contract
const contract = dagger.contract(web3Contract)
```

- 계약 이벤트를 필터링할 차례입니다.

```javascript
const filter = contract.events.Transfer({
  filter: { from: "0x123456..." },
  room: "latest"
})
```

- 계약 이벤트 보기

```javascript
// watch
filter.watch((data, removed) => { console.log(data, removed) })

// or watch only once
filter.watchOnce((data, removed) => { console.log(data, removed) })
```

- 이벤트 보기 종료

```js
// stop watching
filter.stopWatching();
```

## 이벤트 {#events}

모든 이벤트에는 룸 ∈ {`latest`, `confirmed`}이 있습니다.
  - `latest` : 이벤트는 블록이 체인에 포함된 직후에 실행됩니다.
  - `confirmed` : 이벤트는 12회 확인 후 실행됩니다.

dApp의 UI에 업데이트를 표시하려면, `latest` 이벤트를 사용합니다. 이는 더 양질의 사용자 친화적인 UI/UX를 만드는 데 도움이 됩니다.

서버 또는 UI에서 되돌릴 수 없는 작업에는 `confirmed` 이벤트를 사용합니다. 이메일, 알림 보내기와 마찬가지로, 하나의 트랜잭션이 확인된 후 UI에서 사용자가 후속 작업을 할 수 있도록 합니다.

### 네트워크 이벤트 {#network-events}

| 이더리움 이벤트 | 실행 시점 | `removed` 플래그 |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| 블록 | 새 블록이 생성될 때마다 | 예 |
| block.number | 새 블록 번호가 생성될 때마다 |                |
| block.hash | 새 블록 해시가 생성될 때마다 | 예 |
| 블록/`number` | 미래의 특정 블록이 체인에 포함되었을 때 | 예 |
| addr/`address`/tx | `address`에 대한 모든 새로운 트랜잭션에서 | 예 |
| addr/`address`/tx/out | `address`에 대한 모든 새로운 발신 트랜잭션에서 | 예 |
| addr/`address`/tx/in | `address`에 대한 모든 새로운 수신 트랜잭션에서 | 예 |
| tx/`txId` | 지정된 `txId`가 블록에 포함되었을 때 | 예 |
| tx/`txId`/success | `txId`에 대한 트랜잭션 상태가 성공(블록에 포함됨)일 경우 | 예 |
| tx/`txId`/fail | `txId`에 대한 트랜잭션이 실패(블록에 포함됨)인 경우 | 예 |
| tx/`txId`/receipt | `txId`에 대한 영수증이 생성(블록에 포함됨)된 경우 | 예 |
| addr/`contractAddress`/deployed | 새로운 `contractAddress`가 블록에 포함된 경우 | 예 |
| log/`contractAddress` | `contractAddress`에 대한 새로운 로그가 생성된 경우 | 예 |
| log/`contractAddress`/filter/`topic1`/`topic2` | `contractAddress`에 대해 `topic1` 및 `topic2`가 포함된 새로운 로그가 생성된 경우 | 예 |

### Dagger 이벤트 {#dagger-events}

| Dagger 이벤트 | 실행 시점 | args |
| ----------------- | ------------------------------ | -------------- |
| connection.status | 연결 상태가 변경되는 경우 | 값: 불리언 |


모든 이벤트는 룸과 함께 시작해야 합니다.

#### 블록 {#block}

모든 새 블록에 대해

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

모든 새 블록 번호에 대해

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

모든 새 블록 해시에 대해

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

특정 블록 **X**가 미래에 체인에 포함될 때

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

#### addr/{address}/tx {#addr-address-tx}

`address`에 대한 모든 새로운 트랜잭션에서

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

#### addr/{address}/tx/{dir} {#addr-address-tx-dir}

`dir`는 트랜잭션 방향 ∈ {`in`, `out`}입니다. 모든 주소에 대한 알림을 받기 위해 `address`는 생략할 수 있습니다.

<Tabs
defaultValue="in"
values={[
{ label: 'incoming', value: 'in', },
{ label: 'outgoing', value: 'out', },
{ label: 'wild card', value: 'all', },
]
}>
<TabItem value="in">

`address`에 대한 모든 새로운 수신 트랜잭션에서

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

`address`에 대한 모든 새로운 발신 트랜잭션에서

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

`address` 대신 와일드카드 표기법을 사용하여 모든 수신 및 발신 트랜잭션에 대한 알림을 받습니다.

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

`status`는 `txId`의 상태 ∈ {`success`, `fail`, `receipt`}입니다. `tx/{txId}`가 블록에 포함되면 `txId`가 트리거되는 등 빈 상태로 유지될 수도 있습니다.

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

지정된 `txId`가 블록에 포함되었을 때

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

`txId`에 대한 트랜잭션 상태가 성공(블록에 포함됨)일 경우

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

`txId`에 대한 트랜잭션이 실패(블록에 포함됨)인 경우

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

`txId`에 대한 영수증이 생성(블록에 포함됨)된 경우

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

`contractAddress`에 대한 로그가 생성되었을 때

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

`contractAddress`에 대해 `topic0`, `topic1` 및 `topic2`를 포함한 새로운 로그가 생성되었을 때

```javascript
// Triggers when 1 GNT (Golem token) get transferred to Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/filter/+/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', console.log)

// Triggers when any amount of GNT (Golem token) get sent from Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', ...)

// Listen for every Golem token transfer (notice `#` at the end)
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#', ...)
```

> 이벤트 이름은 대소문자 구분이 있습니다. `address`, `txId`및 `topics`는 소문자여야 합니다.

> 참고: 이벤트에도 와일드카드를 사용할 수 있습니다. 와일드카드에는 두 가지 유형이 있습니다: `+`(단일) 및 `#`(다중). 필요 이상으로 많은 데이터를 가져오거나 dApp에 데이터 부하가 걸릴 수 있으므로 주의를 기울여 사용하세요.



## Dagger 서버 테스트 {#test-dagger-server}

이 라이브러리는 로컬 머신의 테스트 Dagger 서버인 `woodendagger` 실행 파일로 구성됩니다. 따라서 TestRPC로 테스트할 수 있습니다.

프로덕션에는 `woodendagger`를 사용하지 마세요. 개발 목적으로만 사용해야 합니다. `removed` 플래그를 지원하지 않습니다.

```bash
$ woodendagger --url=https://mainnet.infura.io # or http://localhost:8545 for local json-rpc

# If you want to start dagger server on different ports,
# sockport: socket port for backend connection over TCP
# wsport: websocket port for frontend connection over websocket
$ woodendagger --url=http://localhost:8545 --sockport=1883 --wsport=1884

# To connect from dagger:
const dagger = new Dagger('mqtt://localhost:1883')
```

## 지원 {#support}

질문 또는 의견이 있거나 기능을 요청하려는 경우 언제든지 [Telegram](https://t.me/maticnetwork)을 통해 연락해주세요.

## 라이선스 {#license}

MIT
