---
id: ethereum-to-matic
title: Chuyển dữ liệu từ Ethereum sang Polygon
description: Chuyển trạng thái hoặc dữ liệu từ Ethereum sang Polygon qua Hợp đồng
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Cơ chế để đọc nguyên bản dữ liệu Ethereum từ chuỗi Polygon EVM là cơ chế của "Đồng bộ Trạng thái". Nói cách khác, cơ chế này cho phép chuyển dữ liệu tùy ý từ chuỗi Ethereum sang chuỗi Polygon. Quy trình để có thể thực hiện được việc đó chính là: Trình xác thực trên lớp Heimdall lắng nghe một sự kiện cụ thể – `StateSynced` từ hợp đồng Người gửi, ngay khi sự kiện được chọn, `data` đã được thông qua trong sự kiện sẽ được ghi trên hợp đồng Người nhận. Đọc thêm [tại đây](/docs/maintain/validator/core-components/state-sync-mechanism).

Hợp đồng Người gửi và Người nhận phải được hoán đổi trên Ethereum – [StateSender.sol](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol) cần nhận biết từng người gửi và người nhận. Nếu bạn muốn hoàn tất việc hoán đổi, vui lòng yêu cầu hoán đổi [tại đây](https://mapper.polygon.technology/).

---

Trong hướng dẫn sau, chúng ta sẽ triển khai hợp đồng Người gửi trên Goerli (mạng thử nghiệm Ethereum) và hợp đồng Người nhận trên Mumbai (mạng thử nghiệm của Polygon) và sau đó chúng ta sẽ gửi dữ liệu từ Người gửi và đọc dữ liệu trên Người nhận qua các lệnh gọi web3 trong một tập lệnh nút.

### 1. Triển khai hợp đồng Người gửi {#1-deploy-sender-contract}

Mục đích duy nhất của hợp đồng Người gửi là để có thể gọi chức năng [syncState](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33) trên hợp đồng StateSender – đây là hợp đồng trình đồng bộ trạng thái của Matic – sự kiện StateSynced mà Heimdall đang lắng nghe.

Được triển khai tại:

`0xEAa852323826C71cd7920C3b4c007184234c3945` trên Goerli

`0x28e4F3a7f651294B9564800b2D01f35189A5bFbE` trên Mạng lưới chính Ethereum

Để có thể gọi chức năng này, trước hết hãy cùng đưa giao diện của nó vào hợp đồng của chúng ta:

```jsx
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...
```

Tiếp theo, hãy cùng viết chức năng tùy chỉnh của chúng ta; chức năng này đem vào dữ liệu mà chúng ta muốn chuyển cho Polygon và gọi syncState

```jsx
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

Trong chức năng nêu trên, `stateSenderContract` là địa chỉ của StateSender trên mạng lưới bạn sẽ triển khai `Sender` (ví dụ: chúng ta sẽ sử dụng  `0xEAa852323826C71cd7920C3b4c007184234c3945`cho Goerli), và `receiver` là hợp đồng sẽ nhận dữ liệu chúng ta gửi từ đây.

Bạn nên sử dụng các trình khởi tạo để chuyển vào các biến, nhưng vì mục đích của bản demo này, chúng ta chỉ cần mã hóa cứng hai địa chỉ sau:

Sender.sol của chúng ta trông như thế này:

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

Chúng ta đang sử dụng bộ đếm `states` đơn giản để theo dõi số trạng thái được gửi qua hợp đồng Người gửi.

Sử dụng Remix để triển khai hợp đồng và lưu ghi chú về địa chỉ và ABI.

### 2. Triển khai hợp đồng Người nhận {#2-deploy-receiver-contract}

Hợp đồng Người nhận là hợp đồng được một Trình xác thực gọi ra khi sự kiện `StateSynced` được phát hành. Trình xác thực gọi chức năng `onStateReceive` ra trên hợp đồng người nhận để nộp dữ liệu. Để triển khai, trước tiên chúng ta nhập giao diện [StateReceiver](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol) và viết ra logic tùy chỉnh – để diễn giải dữ liệu được chuyển bên trong onStateReceive.

Receiver.sol của chúng ta trông như thế này:

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

Chức năng này đơn giản là gán Id Trạng thái nhận được lần gần nhất và dữ liệu cho các biến. [StateId](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36) là một tham chiếu duy nhất đơn giản đến trạng thái đã chuyển (một bộ đếm đơn giản).

Triển khai Receiver.sol của bạn trên mạng thử nghiệm của Polygon và lưu ghi chú về địa chỉ và ABI

### 3. Hoán đổi Người gửi và Người nhận {#3-getting-your-sender-and-receiver-mapped}

Bạn có thể sử dụng các địa chỉ đã được triển khai (đã đề cập ở trên) cho người gửi và người nhận, hoặc triển khai các hợp đồng tùy chỉnh của bạn và yêu cầu thực hiện hoán đổi tại đây: [https://mapper.polygon.technology/](https://mapper.polygon.technology/)

### 4. Gửi và Nhận Dữ liệu {#4-sending-and-receiving-data}

Giờ thì chúng ta đã có hợp đồng và lập hoán đổi xong, chúng ta sẽ viết một tập lệnh nút đơn giản để gửi các byte hex tùy ý, nhận chúng trên Polygon và diễn giải dữ liệu!

**4.1 Thiết lập tập lệnh của bạn**

Trước tiên chúng ta sẽ khởi tạo các đối tượng web3, ví để tạo giao dịch và hợp đồng

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

Chúng ta sẽ sử dụng gói @maticnetwork/meta cho RPC, gói không phải là yêu cầu để chạy tập lệnh.

Các đối tượng `matic` và `main` chỉ đối tượng web3 được khởi tạo với RPC của Polygon và Ropsten tương ứng.

Các đối tượng `sender` và `receiver` chỉ đối tượng hợp đồng của Sender.sol và Receiver.sol mà chúng ta đã triển khai trong Bước 1 và 2.

**4.2 Gửi dữ liệu**

Tiếp theo, hãy cùng thiết lập các chức năng của chúng ta để tạo bytestring dữ liệu và gửi qua hợp đồng Người gửi:

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

Lệnh gọi `getData` sẽ chuyển đổi một chuỗi ký tự ascii (ví dụ: `Hello World !`) thành một chuỗi ký tự byte (ví dụ: `0x48656c6c6f20576f726c642021`); trong khi chức năng `sendData` đưa `data` (một chuỗi ký tự ascii) vào, gọi `getData` và chuyển bytestring đến hợp đồng người gửi

**4.3 Nhận dữ liệu**

Tiếp theo, chúng ta sẽ kiểm tra dữ liệu nhận được trên Receiver.sol.

Sẽ mất ~7-8 phút để thực thi đồng bộ trạng thái.

Thêm các chức năng sau để kiểm tra (a) số trạng thái được gửi từ Người gửi và (b) Trạng thái nhận được lần gần nhất trên Người nhận.

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

Chức năng `checkReceiver` đơn giản là gọi các biến mà chúng ta đã định nghĩa trong hợp đồng – sẽ được thiết lập ngay khi Trình xác thực gọi `onStateReceive` trên hợp đồng. Chức năng `getString` đơn giản là diễn giải bytestring (chuyển về lại ascii)

```jsx
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

Cuối cùng, chúng ta sẽ viết một phương pháp để thực thi các chức năng của mình:

```jsx
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

**4.4 Ghép tất cả lại với nhau!**

Tập lệnh thử nghiệm của chúng ta trông như thế này:

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

**4.5 Hãy cùng chạy tập lệnh**

Quá trình thực thi thành công tập lệnh trên cung cấp kết quả là:

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World !
```
