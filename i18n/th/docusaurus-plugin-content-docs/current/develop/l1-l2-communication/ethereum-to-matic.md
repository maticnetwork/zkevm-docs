---
id: ethereum-to-matic
title: ถ่ายโอนข้อมูลจาก Ethereum ไปยัง Polygon
description: โอนสถานะหรือข้อมูลจาก Ethereum ไปยัง Polygon ผ่านสัญญา
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

กลไกในการอ่านข้อมูล Ethereum จากเชน Polygon EVM คือ "การซิงค์สถานะ"กล่าวอีกนัยหนึ่ง กลไกนี้ช่วยให้สามารถถ่ายโอนข้อมูลที่ต้องการจากเชน Ethereum ไปยังเชน Polygonขั้นตอนที่ทำให้เป็นไปได้คือ: ผู้ตรวจสอบบนเลเยอร์ Heimdall กำลังรอรับ `StateSynced` ซึ่งเป็นอีเวนต์เฉพาะจากสัญญา Sender และในทันทีที่มีการเลือกอีเวนต์ จะมีการเขียน `data` ที่มีการส่งผ่านในอีเวนต์ขึ้นบนสัญญา Receiverอ่านเพิ่มเติม[ที่นี่](/docs/maintain/validator/core-components/state-sync-mechanism)

ต้องมีการแมปสัญญา Sender และ Receiver บน Ethereum โดย [StateSender.sol](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol) ต้องรู้จัก sender และ receiver แต่ละรายการหากคุณต้องการทำการแมปให้เสร็จ โปรดขอการแมป[ที่นี่](https://mapper.polygon.technology/)

---

ในคำแนะนำต่อไปนี้ เราจะปรับใช้สัญญา Sender บน Goerli (Ethereum Testnet) และสัญญา Receiver ใน Mumbai (Testnet ของ Polygon) จากนั้นเราจะส่งข้อมูลจาก Sender และอ่านข้อมูลบน Receiver ผ่านการเรียก web3 ในสคริปต์ของโหนด

### 1. ปรับใช้สัญญา Sender {#1-deploy-sender-contract}

วัตถุประสงค์เพียงอย่างเดียวของสัญญา Sender คือความสามารถในการเรียกฟังก์ชัน [syncState](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33) บนสัญญา StateSender ซึ่งเป็นสัญญาตัวซิงค์สถานะของ Matic - อีเวนต์ StateSynced ที่ Heimdall กำลังรอรับข้อมูลอยู่

ปรับใช้ที่:

`0xEAa852323826C71cd7920C3b4c007184234c3945` บน Goerli

`0x28e4F3a7f651294B9564800b2D01f35189A5bFbE` บน Ethereum Mainnet

เพื่อให้สามารถเรียกฟังก์ชันนี้ ก่อนอื่นให้รวมอินเทอร์เฟซไว้ในสัญญาของเรา:

```jsx
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...
```

ถัดไป มาเขียนฟังก์ชันแบบกำหนดเองของเราที่รับข้อมูลที่เราต้องการส่งต่อไปยัง Polygon และเรียก syncState

```jsx
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

ในฟังก์ชันข้างต้น `stateSenderContract` คือที่อยู่ของ StateSender บนเครือข่ายที่คุณจะใช้งาน `Sender` (เช่น เราจะใช้ `0xEAa852323826C71cd7920C3b4c007184234c3945` สำหรับ Goerli) และ `receiver`คือสัญญาที่จะรับข้อมูลที่เราส่งจากที่นี่

ขอแนะนำให้ใช้ตัวสร้างเพื่อส่งผ่านตัวแปร แต่เพื่อให้เป็นไปตามจุดประสงค์ของการสาธิตนี้ เราจะเพียงแค่ฮาร์ดโค้ดกับสองที่อยู่เหล่านี้:

Sender.sol ของเรามีลักษณะดังต่อไปนี้:

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

เราใช้ตัวนับ `states` อย่างง่ายเพื่อติดตามจำนวนสถานะที่ส่งผ่านสัญญา Sender

ใช้ Remix เพื่อปรับใช้สัญญาและจดบันทึกที่อยู่และ ABI

### 2. ปรับใช้สัญญา Receiver {#2-deploy-receiver-contract}

สัญญาผู้รับ คือตัวหนึ่งที่ใบแจ้งหนี้โดยตัวตรวจสอบความถูกต้องเมื่อส่ง`StateSynced`งานตัวตรวจสอบความถูกต้องจะเรียกฟังก์ชั่น`onStateReceive`บนสัญญาผู้รับเพื่อส่งข้อมูล เพื่อดำเนินการต่อไป เราจึงใช้อินเทอร์เฟส ผู้นำเข้า [StateReever](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol) และเขียนตรรกที่กำหนดเองของเรา เพื่อแปลข้อมูลที่หมดอายุภายในOnStateRecever Recever Recever

Receiver.sol ของเรามีลักษณะดังนี้:

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

ฟังก์ชันนี้เพียงแค่กำหนด State Id ที่ได้รับล่าสุดและข้อมูลให้กับตัวแปร[StateId](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36) เป็นการอ้างอิงเฉพาะที่เรียบง่ายถึงสถานะที่โอน (ตัวนับอย่างง่าย)

ปรับใช้ Receiver.sol ของคุณบน Testnet ของ Polygon และจดบันทึกที่อยู่และ ABI

### 3. การแมป Sender และ Receiver ของคุณ {#3-getting-your-sender-and-receiver-mapped}

คุณสามารถใช้ที่อยู่ที่ปรับใช้แล้ว (ที่กล่าวถึงข้างต้น) กับ sender และ receiver หรือปรับใช้สัญญาที่กำหนดเองของคุณและขอการแมปที่เสร็จสิ้นแล้วได้ที่นี่: [https://mapper.polygon.technology/](https://mapper.polygon.technology/)

### 4. การส่งและรับข้อมูล {#4-sending-and-receiving-data}

เรามีสัญญาที่ปรับใช้แล้วพร้อมกับการแมปที่เสร็จสิ้นแล้ว ตอนนี้เราจะเขียนสคริปต์ของโหนดอย่างง่ายเพื่อส่งไบต์ฐานสิบหกที่ต้องการ รับไบต์บน Polygon และแปลคำสั่งของข้อมูล

**4.1 ตั้งค่าสคริปต์**

ก่อนอื่น เราจะเริ่มต้นอ็อบเจ็กต์ web3 ของเรา ซึ่งก็คือวอลเล็ตเพื่อทำธุรกรรมและสัญญา

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

เรากำลังใช้แพ็คเกจ @maticnetwork/meta สำหรับ RPC ซึ่งไม่จำเป็นต้องมีแพ็คเกจนั้นเพื่อเรียกใช้สคริปต์

อ็อบเจ็กต์ `matic` และ `main`หมายถึงอ็อบเจ็กต์ web3 ที่เริ่มต้นด้วย RPC ของ Polygon และ Ropsten ตามลำดับ

อ็อบเจ็กต์ `sender` และ `receiver`หมายถึงอ็อบเจ็กต์สัญญาของ Sender.sol และ Receiver.sol ที่เราปรับใช้ในขั้นตอนที่ 1 และ 2

**4.2 การส่งข้อมูล**

ถัดไป เรามาตั้งค่าฟังก์ชันของเราเพื่อสร้าง Bytestring ของข้อมูลและส่งข้อมูลผ่านสัญญา Sender:

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

การเรียก `getData` จะแปลงสตริง ascii (เช่น `Hello World !`) เป็นสตริงของไบต์ (เช่น `0x48656c6c6f20576f726c642021`) ในขณะที่ฟังก์ชัน `sendData` ใช้ค่าใน `data` (สตริง ascii), เรียก `getData` และส่งต่อ Bytestring ไปยังสัญญา sender

**4.3 การรับข้อมูล**

ถัดไป เราจะตรวจสอบข้อมูลที่ได้รับบน Receiver.sol

ควรใช้เวลาประมาณ 7-8 นาทีในการซิงค์สถานะ

เพิ่มฟังก์ชันต่อไปนี้เพื่อตรวจสอบ (a) จำนวนสถานะที่ส่งแล้วจาก Sender และ (b) สถานะที่ได้รับล่าสุดใน Receiver

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

ฟังก์ชัน `checkReceiver`เพียงเรียกตัวแปรที่เรากำหนดไว้ในสัญญา ซึ่งจะกำหนดไว้ทันทีที่ผู้ตรวจสอบความถูกต้องเรียกเข้า`onStateReceive`บนสัญญาฟังก์ชัน `getString` เพียงแค่แปลคำสั่ง Bytestring (แปลงกลับเป็น ascii)

```jsx
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

สุดท้าย เราจะเขียนเมธอดเพื่อดำเนินการกับฟังก์ชันของเรา:

```jsx
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

**4.4 สรุปทุกอย่างรวมกัน**

สคริปต์ทดสอบของเรามีลักษณะดังต่อไปนี้:

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

**4.5 มาเรียกใช้สคริปต์กัน**

การดำเนินการกับสคริปต์ข้างต้นที่ประสบความสำเร็จจะให้ผลลัพธ์เป็น:

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World !
```
