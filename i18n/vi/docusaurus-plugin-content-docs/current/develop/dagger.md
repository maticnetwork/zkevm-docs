---
id: dagger
title: Dagger
sidebar_label: Dagger - Single App
description: Xây dựng ứng dụng blockchain tiếp theo của bạn trên Polygon
keywords:
  - docs
  - matic
  - polygon
  - dagger
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Dagger là cách tốt nhất để nhận các bản cập nhật theo thời gian thực từ Blockchain Ethereum. Dagger cung cấp cách thức để DApps và hệ thống phụ trợ của bạn nhận được các sự kiện blockchain Ethereum, tức là giao dịch, chuyển token, biên nhận và nhật ký trong thời gian thực qua websocket hoặc socket.

Chúng tôi duy trì cơ sở hạ tầng cho các sự kiện thời gian thực đáng tin cậy và có thể mở rộng. `@maticnetwork/dagger` là thư viện người tiêu dùng cho dự án Dagger được viết bằng NodeJS. Nó sử dụng máy chủ Dagger để nhận các bản cập nhật theo thời gian thực từ Mạng lưới Ethereum.

## Cài đặt {#installation}

```sh
# Using Yarn
yarn add @maticnetwork/dagger

# Using NPM
npm install @maticnetwork/dagger --save
```

## Mạng lưới {#network}

### Mạng lưới Ethereum {#ethereum-network}

#### Mạng lưới chính {#mainnet}

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

### Mạng lưới Matic {#matic-network}

#### Mạng lưới chính {#mainnet-1}

```sh
Websocket: wss://matic-mainnet.dagger.matic.network
Socket: mqtts://matic-mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Mạng thử nghiệm Mumbai {#mumbai-testnet}

```sh
Websocket: wss://mumbai-dagger.matic.today
Socket: mqtts://mumbai-dagger.matic.today (You can also use `ssl://` protocol)
```

## Ví dụ {#example}

- Đầu tiên chúng ta hãy tạo một dự án _npm_.

```bash
npm init -y
touch index.js
```

- Bây giờ chúng ta có thể đưa đoạn mã sau vào `index.js`.

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

- Chạy `index.js` và bạn sẽ bắt đầu nhận được số khối ngay sau khi khối mới được tạo.

```bash
node index.js
```

## API {#api}

### new Dagger(url) {#new-dagger-url}

Tạo đối tượng dagger

- `url` là địa chỉ của máy chủ dagger. Kiểm tra [phần mạng lưới](#network) cho tất cả các giá trị url có sẵn.

Ví dụ:

```js
const dagger = new Dagger(<url>)
```

### dagger.on(event, fn) {#dagger-on-event-fn}

Đăng ký một chủ đề

- `event` là một chủ đề `String` để đăng ký. Các ký tự đại diện `event` được hỗ trợ (`+` - cho cấp đơn lẻ và `#` - cho đa cấp)
- `fn` - `function (data, removed)`fn sẽ được thực thi khi xảy ra sự kiện:
  - Dữ liệu `data` từ sự kiện
  - Cờ `removed` cho biết nếu dữ liệu bị xóa khỏi blockchain do tổ chức lại.

Ví dụ:

```js
dagger.on('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.once(event, fn) {#dagger-once-event-fn}

Tương tự [như trên](#daggeronevent-fn) nhưng sẽ chỉ được kích hoạt một lần.

Ví dụ:

```js
dagger.once('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.off(event, fn) {#dagger-off-event-fn}

Hủy đăng ký khỏi một chủ đề

- `event` là một chủ đề `String` để hủy đăng ký
- `fn` - `function (data, removed)`

Ví dụ:

```js
dagger.off('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.of(room) {#dagger-of-room}

Tạo chỗ trống cho dagger. `room` phải là một trong hai giá trị
  - `latest`
  - `confirmed`

Đối tượng `room` có các phương thức sau:
  - `on` giống như dagger `on`
  - `once` giống như dagger `once`
  - `off` giống như dagger `off`

```js
const latestRoom = dagger.of('latest')
const confirmedRoom = dagger.of('confirmed')
```

### dagger.end([force]) {#}

Đóng dagger, chấp nhận các tùy chọn sau:

- `force`: chuyển nó thành true sẽ đóng dagger ngay lập tức. Tham số này là tùy chọn.

```js
dagger.end({force: true}) // immediate closing
```

### dagger.contract(web3Contract) {#dagger-contract-web3contract}

Tạo trình bao bọc hợp đồng web3 để hỗ trợ Dagger.

- Đầu tiên, hãy tạo một đối tượng hợp đồng web3.

```javascript
// web3 contract
const web3Contract = new web3.eth.Contract(abi, address)
```

- Bây giờ chúng ta sẽ tạo một trình bao bọc hợp đồng dagger trên đó.

```javascript
// dagger contract
const contract = dagger.contract(web3Contract)
```

- Thời gian để lọc các sự kiện hợp đồng

```javascript
const filter = contract.events.Transfer({
  filter: { from: "0x123456..." },
  room: "latest"
})
```

- Xem các sự kiện hợp đồng

```javascript
// watch
filter.watch((data, removed) => { console.log(data, removed) })

// or watch only once
filter.watchOnce((data, removed) => { console.log(data, removed) })
```

- Đang dừng xem sự kiện

```js
// stop watching
filter.stopWatching();
```

## Sự kiện {#events}

Mọi sự kiện đều có phòng ∈ {`latest`, `confirmed`}.
  - `latest` : Sự kiện được kích hoạt ngay sau khi khối được đưa vào chuỗi.
  - `confirmed` : Sự kiện được kích hoạt sau 12 lần xác nhận.

Nếu bạn muốn hiển thị các cập nhật về giao diện người dùng trong DApp của mình, hãy sử dụng các sự kiện `latest`. Nó sẽ trợ giúp cải thiện UI/UX tốt hơn và thân thiện với người dùng.

Sử dụng các sự kiện `confirmed` cho các tác vụ không thể đảo ngược từ máy chủ hoặc trên giao diện người dùng. Như gửi email, thông báo hoặc cho phép người dùng thực hiện tác vụ tiếp theo trên giao diện người dùng sau khi một giao dịch được xác nhận.

### Sự kiện Mạng lưới {#network-events}

| Sự kiện Ethereum | Thời điểm? | Cờ `removed` |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| khối | Đối với mỗi khối mới được tạo | Đúng |
| block.number | Đối với mỗi số khối mới được tạo |                |
| block.hash | Đối với mỗi khối băm mới được tạo | Đúng |
| khối/`number` | Khi khối cụ thể trong tương lai được đưa vào chuỗi | Đúng |
| addr/`address`/tx | Trên mỗi giao dịch mới cho `address` | Đúng |
| addr/`address`/tx/out | Trên mọi giao dịch gửi đi mới cho `address` | Đúng |
| addr/`address`/tx/in | Trên mọi giao dịch mới đến cho `address` | Đúng |
| tx/`txId` | Khi `txId` đã cho được đưa vào trong khối | Đúng |
| tx/`txId`/success | Khi trạng thái tx là thành công (được đưa vào trong khối) cho `txId` | Đúng |
| tx/`txId`/fail | Khi tx không thành công (được đưa vào trong khối) cho `txId` | Đúng |
| tx/`txId`/receipt | Khi biên nhận được tạo (được đưa vào trong khối) cho `txId` | Đúng |
| addr/`contractAddress`/deployed | Khi `contractAddress` mới được đưa vào trong khối | Đúng |
| log/`contractAddress` | Khi nhật ký mới được tạo cho `contractAddress` | Đúng |
| log/`contractAddress`/filter/`topic1`/`topic2` | Khi nhật ký mới với `topic1` và `topic2` được tạo cho `contractAddress` | Đúng |

### Sự kiện Dagger {#dagger-events}

| Sự kiện Dagger | Thời điểm? | args |
| ----------------- | ------------------------------ | -------------- |
| connection.status | Khi trạng thái kết nối thay đổi | giá trị: Boolean |


Mọi sự kiện phải bắt đầu với phòng:

#### khối {#block}

Đối với mọi khối mới

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

Đối với mọi số khối mới

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

Đối với mọi băm khối mới

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

Khi khối **X** cụ thể, trong tương lai được đưa vào trong chuỗi

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

Trên mỗi giao dịch mới cho `address`

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

`dir` là hướng giao dịch ∈ {`in`, `out`}. `address` có thể bỏ qua để nhận thông báo cho bất kỳ địa chỉ nào.

<Tabs
defaultValue="in"
values={[
{ label: 'incoming', value: 'in', },
{ label: 'outgoing', value: 'out', },
{ label: 'wild card', value: 'all', },
]
}>
<TabItem value="in">

Trên mọi giao dịch mới đến cho `address`

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

Trên mọi giao dịch gửi đi mới cho `address`

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

Sử dụng ký tự đại diện thay cho `address`, để nhận thông báo cho tất cả các giao dịch đến và đi.

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

`status` là trạng thái của `txId` ∈ {`success`, `fail`, `receipt`}. Nó cũng có thể được giữ trống tức là dẫn đến `tx/{txId}`, được kích hoạt khi `txId` được đưa vào khối.

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

Khi `txId` đã cho được đưa vào trong khối

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

Khi trạng thái tx là thành công (được đưa vào trong khối) cho `txId`

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

Khi tx không thành công (được đưa vào trong khối) cho `txId`

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

Khi biên nhận được tạo (được đưa vào trong khối) cho `txId`

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

Khi nhật ký được tạo cho `contractAddress`

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

Khi nhật ký mới với `topic0`, `topic1` & `topic2` được tạo ra cho `contractAddress`

```javascript
// Triggers when 1 GNT (Golem token) get transferred to Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/filter/+/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', console.log)

// Triggers when any amount of GNT (Golem token) get sent from Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', ...)

// Listen for every Golem token transfer (notice `#` at the end)
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#', ...)
```

> Tên sự kiện có phân biệt chữ hoa chữ thường. `address`, `txId` và `topics` phải ở dạng chữ thường.

> Lưu ý: Bạn cũng có thể sử dụng ký tự đại diện cho các sự kiện. Có hai loại ký tự đại diện: `+` (cho sự kiện đơn lẻ) và `#` (cho nhiều sự kiện). Hãy thận trọng khi sử dụng vì nó sẽ lấy thêm dữ liệu khi bạn cần và có thể bắn phá dữ liệu tới DApp của bạn.



## Thử nghiệm Máy chủ Dagger {#test-dagger-server}

Thư viện này bao gồm `woodendagger` có thể thực thi là máy chủ thử nghiệm dagger trên máy cục bộ của bạn. Vì vậy, bạn có thể thử nghiệm bằng TestRPC.

Vui lòng không sử dụng `woodendagger` trong sản xuất. Nó chỉ dành cho mục đích phát triển. Nó không hỗ trợ cờ `removed`.

```bash
$ woodendagger --url=https://mainnet.infura.io # or http://localhost:8545 for local json-rpc

# If you want to start dagger server on different ports,
# sockport: socket port for backend connection over TCP
# wsport: websocket port for frontend connection over websocket
$ woodendagger --url=http://localhost:8545 --sockport=1883 --wsport=1884

# To connect from dagger:
const dagger = new Dagger('mqtt://localhost:1883')
```

## Hỗ trợ {#support}

Nếu bạn có bất kỳ thắc mắc, phản hồi hoặc yêu cầu tính năng nào, vui lòng liên hệ với chúng tôi trên[Telegram](https://t.me/maticnetwork)

## Giấy phép {#license}

MIT
