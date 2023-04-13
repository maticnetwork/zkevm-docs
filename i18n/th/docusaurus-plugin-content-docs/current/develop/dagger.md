---
id: dagger
title: Dagger
sidebar_label: Dagger - Single App
description: สร้างแอพบล็อกเชนต่อไปของคุณบน Polygon
keywords:
  - docs
  - matic
  - polygon
  - dagger
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Dagger เป็นวิธีที่ดีที่สุดในการรับการอัปเดตแบบเรียลไทม์จากบล็อกเชน Ethereumโดยให้วิธีการสำหรับระบบ DApp และแบ็คเอนด์ของคุณในการรับอีเวนต์ต่างๆ ของบล็อกเชน Ethereum กล่าวคือ ธุรกรรม การโอนโทเค็น ใบรับ และบันทึกในแบบเรียลไทม์ผ่านเว็บซ็อคเก็ตหรือซ็อคเก็ต

เรารักษาโครงสร้างพื้นฐานสำหรับ`@maticnetwork/dagger`อีเวนต์ที่เชื่อถือได้และสามารถปรับขนาดได้ คือไลบรารีผู้บริโภคสำหรับโปรเจ็กต์ Dager ที่เขียนไว้ใน NodeJSโดยใช้เซิร์ฟเวอร์ Dagger เพื่อรับการอัปเดตแบบเรียลไทม์จากเครือข่าย Ethereum

## การติดตั้ง {#installation}

```sh
# Using Yarn
yarn add @maticnetwork/dagger

# Using NPM
npm install @maticnetwork/dagger --save
```

## เครือข่าย {#network}

### เครือข่าย Ethereum {#ethereum-network}

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

### เครือข่าย MATIC {#matic-network}

#### Mainnet {#mainnet-1}

```sh
Websocket: wss://matic-mainnet.dagger.matic.network
Socket: mqtts://matic-mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Mumbai Testnet {#mumbai-testnet}

```sh
Websocket: wss://mumbai-dagger.matic.today
Socket: mqtts://mumbai-dagger.matic.today (You can also use `ssl://` protocol)
```

## ตัวอย่าง {#example}

- สร้างโปรเจ็กต์_สำหรับการนัดหมาย_ก่อน

```bash
npm init -y
touch index.js
```

- ตอนนี้ เราสามารถใส่โค้ดย่อยต่อไปนี้ได้ใน `index.js`

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

- เรียกใช้ `index.js` และคุณจะเริ่มได้รับหมายเลขบล็อกในทันทีที่มีการสร้างบล็อกใหม่ขึ้น

```bash
node index.js
```

## API {#api}

### Dagger ใหม่ (URL) {#new-dagger-url}

สร้างอ็อบเจ็กต์ Dagger

- `url` คือที่อยู่ของเซิร์ฟเวอร์ Daggerตรวจดูค่า URL ที่มีอยู่ทั้งหมดได้ใน[ส่วนของเครือข่าย](#network)

ตัวอย่าง:

```js
const dagger = new Dagger(<url>)
```

### dagger.on(event, fn) {#dagger-on-event-fn}

สมัครติดตามหัวข้อ

- `event` คือหัวข้อ `String` ที่จะสมัครติดตาม โดยรองรับอักขระตัวแทน `event` ตัว (`+` - สำหรับระดับเดียว และ `#` - สำหรับหลายระดับ)
- `fn` - `function (data, removed)`จะดำเนินการกับ fn เมื่อ event เกิดขึ้น:
  - ข้อมูล `data` จาก event
  - ค่าสถานะ `removed` ที่ระบุว่ามีการลบข้อมูลจากบล็อกเชนเนื่องจากการปรับโครงสร้างหรือไม่

ตัวอย่าง:

```js
dagger.on('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.once(event, fn) {#dagger-once-event-fn}

เช่นเดียวกับ  [on](#daggeronevent-fn) แต่จะมีการดำเนินการครั้งเดียวเท่านั้น

ตัวอย่าง:

```js
dagger.once('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.off(event, fn) {#dagger-off-event-fn}

เลิกสมัครติดตามหัวข้อ

- `event` คือหัวข้อ `String` ที่จะเลิกสมัครติดตาม
- `fn` - `function (data, removed)`

ตัวอย่าง:

```js
dagger.off('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.of(room) {#dagger-of-room}

สร้าง room จาก Dagger `room` จะต้องเป็นค่าใดค่าหนึ่งจากสองค่า
  - `latest`
  - `confirmed`

อ็อบเจ็กต์ `room` มีเมธอดต่อไปนี้:
  - `on` เหมือนกับ Dagger `on`
  - `once` เหมือนกับ Dagger `once`
  - `off` เหมือนกับ Dagger `off`

```js
const latestRoom = dagger.of('latest')
const confirmedRoom = dagger.of('confirmed')
```

### dagger.end([force]) {#}

ปิด Dagger รับตัวเลือกต่อไปนี้:

- `force`: การส่งค่าเป็น true จะปิด Dagger โดยทันทีพารามิเตอร์นี้จะระบุหรือไม่ก็ได้

```js
dagger.end({force: true}) // immediate closing
```

### dagger.contract(web3Contract) {#dagger-contract-web3contract}

สร้าง Wrapper ของสัญญา web3 เพื่อรองรับ Dagger

- ก่อนอื่น สร้างอ็อบเจ็กต์สัญญา web3

```javascript
// web3 contract
const web3Contract = new web3.eth.Contract(abi, address)
```

- ตอนนี้ เราจะสร้าง Wrapper ของสัญญา Dagger บนนั้น

```javascript
// dagger contract
const contract = dagger.contract(web3Contract)
```

- เวลาในการคัดกรองอีเวนต์ของสัญญา

```javascript
const filter = contract.events.Transfer({
  filter: { from: "0x123456..." },
  room: "latest"
})
```

- การเฝ้าดูอีเวนต์ของสัญญา

```javascript
// watch
filter.watch((data, removed) => { console.log(data, removed) })

// or watch only once
filter.watchOnce((data, removed) => { console.log(data, removed) })
```

- การหยุดเฝ้าดูอีเวนต์

```js
// stop watching
filter.stopWatching();
```

## อีเวนต์ {#events}

ทุกเหตุการณ์มี ∈ { `latest`{, `confirmed`}
  - `latest`: เหตุการณ์จะถูกยิงทันทีหลังจากบล็อกที่รวมอยู่ในเชน
  - `confirmed`: เหตุการณ์จะถูกยิงหลังจากการยืนยัน 12

หากคุณต้องการแสดงการอัปเดตบน UI ใน Dp ของคุณ ให้ใช้อีเวนต์`latest`ต่างๆซึ่งจะช่วยทำให้ UI/UX ดีขึ้นและเป็นมิตรต่อผู้ใช้

ใช้`confirmed`อีเวนต์สำหรับงานที่ไม่สามารถย้อนกลับได้จากเซิร์ฟเวอร์หรือ UIเช่นเดียวกับการส่งอีเมล การแจ้งเตือน หรืออนุญาตให้ผู้ใช้ทำงานในลำดับต่อมาได้บน UI หลังจากที่ธุรกรรมหนึ่งรายการได้รับการยืนยัน

### อีเวนต์ของเครือข่าย {#network-events}

| อีเวนต์ของ Ethereum | เมื่อใด | ค่าสถานะ `removed` |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| บล็อก | สำหรับทุกๆ บล็อกใหม่ที่สร้างขึ้น | ใช่ |
| block.number | สำหรับทุกๆ หมายเลขบล็อกใหม่ที่สร้างขึ้น |                |
| block.hash | สำหรับทุกๆ แฮชของบล็อกใหม่ที่สร้างขึ้น | ใช่ |
| block/`number` | เมื่อบล็อกใดบล็อกหนึ่งในอนาคตถูกรวมอยู่ในเชน | ใช่ |
| addr/`address`/tx | สำหรับทุกๆ ธุรกรรมใหม่สำหรับ `address` | ใช่ |
| addr/`address`/tx/out | สำหรับทุกๆ ธุรกรรมที่ออกไปใหม่สำหรับ `address` | ใช่ |
| addr/`address`/tx/in | สำหรับธุรกรรมที่เข้ามาใหม่สำหรับ `address` | ใช่ |
| tx/`txId` | เมื่อ `txId` ที่ระบุรวมอยู่ในบล็อก | ใช่ |
| tx/`txId`/success | เมื่อ tx มีสถานะสำเร็จ (รวมอยู่ในบล็อก) สำหรับ `txId` | ใช่ |
| tx/`txId`/fail | เมื่อ tx ล้มเหลว (รวมอยู่ในบล็อก) สำหรับ `txId` | ใช่ |
| tx/`txId`/receipt | เมื่อสร้างรายการรับ (รวมอยู่ในบล็อก) สำหรับ `txId` | ใช่ |
| addr/`contractAddress`/deployed | เมื่อ `contractAddress` ใหม่รวมอยู่ในบล็อก | ใช่ |
| log/`contractAddress` | เมื่อมีการสร้างข้อมูลบันทึกใหม่สำหรับ `contractAddress` | ใช่ |
| log/`contractAddress`/filter/`topic1`/`topic2` | เมื่อมีการสร้างข้อมูลบันทึกใหม่ที่มี `topic1` และ `topic2` สำหรับ `contractAddress` | ใช่ |

### อีเวนต์ของ Dagger {#dagger-events}

| อีเวนต์ของ Dagger | เมื่อใด | args |
| ----------------- | ------------------------------ | -------------- |
| connection.status | เมื่อสถานะการเชื่อมต่อเปลี่ยนแปลง | ค่า: บูลีน |


ทุกๆ อีเวนต์จะต้องเริ่มด้วย room:

#### block {#block}

สำหรับทุกๆ บล็อกใหม่

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

สำหรับทุกๆ หมายเลขบล็อกใหม่

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

สำหรับทุกๆ แฮชของบล็อกใหม่

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

เมื่อบล็อกใดบล็อกหนึ่ง **X** ในอนาคตรวมอยู่ในเชน

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

สำหรับทุกๆ ธุรกรรมใหม่สำหรับ `address`

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

`dir` คือทิศทางของธุรกรรม ∈ {`in`, `out`} สามารถเว้น `address` ได้เพื่อรับการแจ้งเตือนสำหรับทุกที่อยู่

<Tabs
defaultValue="in"
values={[
{ label: 'incoming', value: 'in', },
{ label: 'outgoing', value: 'out', },
{ label: 'wild card', value: 'all', },
]
}>
<TabItem value="in">

สำหรับธุรกรรมที่เข้ามาใหม่สำหรับ `address`

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

สำหรับทุกๆ ธุรกรรมที่ออกไปใหม่สำหรับ `address`

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

ใช้สัญลักษณ์ตัวแทนเพื่อแทน `address` ได้ เพื่อให้ได้รับแจ้งถึงธุรกรรมทั้งหมดที่เข้ามาและออกไป

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

`status` คือสถานะของ `txId` ∈ {`success`,,`fail` }`receipt`ซึ่งสามารถเว้นว่างไว้ได้เช่นกัน กล่าวคือส่งผลให้เกิด `tx/{txId}` ซึ่งจะดำเนินการเมื่อมีการรวม `txId` อยู่ในบล็อก

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

เมื่อ `txId` ที่ระบุรวมอยู่ในบล็อก

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

เมื่อ tx มีสถานะสำเร็จ (รวมอยู่ในบล็อก) สำหรับ `txId`

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

เมื่อ tx ล้มเหลว (รวมอยู่ในบล็อก) สำหรับ `txId`

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

เมื่อสร้างรายการรับ (รวมอยู่ในบล็อก) สำหรับ `txId`

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

เมื่อมีการสร้างข้อมูลบันทึกสำหรับ `contractAddress`

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

เมื่อมีการสร้างข้อมูลบันทึกใหม่ที่มี `topic0`,  `topic1`และ  `topic2` สำหรับ `contractAddress`

```javascript
// Triggers when 1 GNT (Golem token) get transferred to Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/filter/+/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', console.log)

// Triggers when any amount of GNT (Golem token) get sent from Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', ...)

// Listen for every Golem token transfer (notice `#` at the end)
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#', ...)
```

> ชื่ออีเวนต์คือตัวอ่อน`address`ตัวเคส `txId``topics`และต้องอยู่ในกรณีที่ต่ำกว่า

> หมายเหตุ: คุณสามารถใช้อักขระตัวแทนสำหรับอีเวนต์ได้เช่นกันอักขระตัวแทนมีอยู่สองประเภท ได้แก่ `+` (สำหรับระดับเดียว) และ `#` (สำหรับหลายระดับ) ใช้ด้วยความระมัดระวัง เนื่องจากจะดึงข้อมูลมากเกินความจำเป็น และสามารถทำให้ DApp ของคุณมีข้อมูลจำนวนมาก



## เซิร์ฟเวอร์ Dagger ทดสอบ {#test-dagger-server}

ไลบรารีนี้ประกอบด้วยไฟล์ปฏิบัติการได้ `woodendagger` ซึ่งเป็นเซิร์ฟเวอร์ Dagger ทดสอบบนเครื่องภายในของคุณดังนั้นจึงสามารถทดสอบกับ TestRPC ได้

โปรดอย่าใช้ `woodendagger` ในการทำงานจริงให้ใช้เพื่อการพัฒนาเท่านั้นไม่รองรับค่าสถานะ `removed`

```bash
$ woodendagger --url=https://mainnet.infura.io # or http://localhost:8545 for local json-rpc

# If you want to start dagger server on different ports,
# sockport: socket port for backend connection over TCP
# wsport: websocket port for frontend connection over websocket
$ woodendagger --url=http://localhost:8545 --sockport=1883 --wsport=1884

# To connect from dagger:
const dagger = new Dagger('mqtt://localhost:1883')
```

## การสนับสนุน {#support}

หากคุณมีข้อสอบถาม ความคิดเห็น หรือคำขอคุณสมบัติใดๆ ติดต่อเราได้โดยไม่ต้องเกรงใจบน [Telegram](https://t.me/maticnetwork)

## ใบอนุญาต {#license}

MIT
