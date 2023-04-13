---
id: ethereum-to-matic
title: 이더리움에서 Polygon으로 데이터 전송하기
description: 계약을 통해 이더리움에서 Polygon으로 상태 또는 데이터 전송하기
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Polygon EVM 체인의 이더리움 데이터를 기본적으로 읽기 위한 메커니즘이 '상태 동기화'의 메커니즘입니다. 즉, 이 메커니즘을 통해 이더리움 체인에서 Polygon 체인으로 임의의 데이터를 전송할 수 있습니다. 이를 위한 절차는 다음과 같습니다. Heimdall 레이어의 검증자는 특정 이벤트(발신자 계약의 `StateSynced`)를 수신 대기합니다. 이벤트가 선택되면 이벤트에 전달된 `data`는 즉시 수신자 계약에 작성됩니다. 자세한 내용은 [여기](/docs/maintain/validator/core-components/state-sync-mechanism)를 참조하세요.

발신자 및 수신자 계약은 이더리움에 매핑되어야 합니다. [StateSender.sol](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol)은 각 발신자와 수신자를 알고 있어야 합니다. 매핑을 완료하려면 [여기](https://mapper.polygon.technology/)에서 매핑을 요청하세요.

---

아래 실습에서는 이더리움 테스트넷인 Goerli에 발신자 계약을 배포하고 Polygon의 테스트넷인 Mumbai에 수신자 계약을 배포합니다. 그다음 노드 스크립트의 웹3 호출을 통해 발신자의 데이터를 전송하고 수신자의 데이터를 읽을 것입니다.

### 1. 발신자 계약 배포하기 {#1-deploy-sender-contract}

발신자 계약의 유일한 목적은 Heimdall이 수신 대기하는 StateSynced 이벤트인 StateSender 계약(매틱의 상태 동기화 계약)에서 [syncState](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33) 함수를 호출할 수 있도록 만드는 것입니다.

배포 위치:

Goerli의 `0xEAa852323826C71cd7920C3b4c007184234c3945`

이더리움 메인넷의 `0x28e4F3a7f651294B9564800b2D01f35189A5bFbE`

이 함수를 호출하기 위해 먼저 계약에 인터페이스를 포함합니다.

```jsx
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...
```

다음으로, Polygon에 전달하려는 데이터를 받아 syncState를 호출하는 사용자 정의 함수를 작성합니다.

```jsx
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

위의 함수에서 `stateSenderContract`는 `Sender`를 배포할 네트워크에서 StateSender의 주소이며(예: Goerli의 경우 `0xEAa852323826C71cd7920C3b4c007184234c3945` 사용) `receiver`는 여기에서 보내는 데이터를 수신할 계약입니다.

생성자를 사용하여 변수를 전달하는 것이 좋지만, 이 데모에서는 간단히 이 두 주소를 하드코딩하겠습니다.

Sender.sol은 다음과 같이 표시됩니다.

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

발신자 계약을 통해 전송한 상태의 수를 추적하기 위해 간단한 `states` 카운터를 사용하고 있습니다.

Remix를 사용하여 계약을 배포하고 주소와 ABI를 기록하세요.

### 2. 수신자 계약 배포하기 {#2-deploy-receiver-contract}

수신자 계약은 `StateSynced` 이벤트가 발생할 때 검증자가 호출합니다. 검증자는 수신자 계약에서 `onStateReceive` 함수를 호출하여 데이터를 제출합니다. 이를 구현하기 위해 먼저 [StateReceiver](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol) 인터페이스를 가져오고 사용자 정의 논리를 작성하여 onStateReceive 내 전송된 데이터를 해석합니다.

Receiver.sol은 다음과 같이 표시됩니다.

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

이 함수는 단순히 마지막으로 수신한 상태 ID 및 데이터를 변수에 할당합니다. [StateId](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36)는 전송된 상태(단순 카운터)에 대한 단순한 고유 참조입니다.

Polygon의 테스트넷에 Receiver.sol을 배포하고 주소와 ABI를 기록하세요.

### 3. 발신자 및 수신자 매핑하기 {#3-getting-your-sender-and-receiver-mapped}

발신자와 수신자에 대해 이미 배포된 주소(위에서 언급)를 사용할 수도 있고 사용자 정의 계약을 배포한 다음 여기([https://mapper.polygon.technology/](https://mapper.polygon.technology/))에서 매핑을 요청할 수도 있습니다.

### 4. 데이터 발신 및 수신 {#4-sending-and-receiving-data}

계약을 배포하고 매핑을 완료하였으므로 이제 간단한 노드 스크립트를 작성하여 임의의 16진수 바이트를 전송한 다음 Polygon에서 수신하고 해당 데이터를 해석해 보겠습니다!

**4.1 스크립트 설정**

먼저 트랜잭션 및 계약 생성을 위해 웹3 객체인 지갑을 설정해 보겠습니다.

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

RPC를 위해 @maticnetwork/meta 패키지를 사용하고 있지만, 이 패키지가 스크립트 실행을 위한 요건은 아닙니다.

`matic` 및 `main` 객체는 각각 Polygon과 Ropsten의 RPC를 사용하여 설정한 웹3 객체를 참조합니다.

`sender` 및 `receiver` 객체는 1단계 및 2단계에서 배포한 Sender.sol 및 Receiver.sol의 계약 객체를 참조합니다.

**4.2 데이터 보내기**

다음으로, 데이터의 바이트 문자열을 생성하고 이를 발신자 계약을 통해 보내기 위해 함수를 설정해 보겠습니다.

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

`getData`를 호출하면 ASCII 문자열(예: `Hello World !`)이 바이트 문자열(예: `0x48656c6c6f20576f726c642021`)로 변환됩니다. `sendData` 함수는 `data`(ASCII 문자열)를 수신하고 `getData`를 호출하고 바이트 문자열을 발신자 계약에 전달합니다.

**4.3 데이터 수신하기**

다음으로, Receiver.sol에서 수신한 데이터를 확인해 보겠습니다.

상태 동기화의 실행에는 7~8분이 소요됩니다.

다음 함수를 추가하여 (a) 발신자로부터 전송된 상태의 수와 (b) 수신자에서 마지막으로 수신한 상태를 확인하세요.

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

`checkReceiver` 함수는 단순히 계약에서 정의한 변수를 호출합니다. 변수는 계약에서 검증자가 `onStateReceive`를 호출하는 즉시 설정됩니다. `getString` 함수는 단순히 바이트 문자열을 해석합니다(다시 ASCII로 변환).

```jsx
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

마지막으로, 함수를 실행하는 메서드를 작성해 보겠습니다.

```jsx
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

**4.4 통합하기!**

테스트 스크립트는 다음과 같이 표시됩니다.

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

**4.5 스크립트 실행하기**

위의 스크립트를 성공적으로 실행하면 다음과 같은 출력이 제공됩니다.

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World !
```
