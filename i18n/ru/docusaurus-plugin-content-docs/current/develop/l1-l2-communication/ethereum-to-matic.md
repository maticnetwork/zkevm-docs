---
id: ethereum-to-matic
title: Передача данных из Ethereum в Polygon
description: Передача состояния или данных из Ethereum в Polygon через контракты
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Механизм нативного чтения данных Ethereum из цепочки Polygon EVM имеет тип ‘State Sync’. Другими словами, этот механизм дает возможность передавать произвольные данные из цепочки Ethereum в цепочку Polygon. Процедура, делающая это возможным: валидаторы на уровне Heimdall прослушивают определенное событие — `StateSynced` от контракта Sender, сразу же после получения события переданная во время события `data` записывается в контракт Receiver. Читайте подробности [здесь](/docs/maintain/validator/core-components/state-sync-mechanism).

Контракты Sender и Receiver должны быть сопоставлены в Ethereum — [StateSender.sol](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol) необходимо знать каждого отправителя и каждого получателя. Если вы захотите выполнить сопоставление, запросите сопоставление [здесь](https://mapper.polygon.technology/).

---

В этом руководстве мы развернем контракт Sender в Goerli (тестовая сеть Ethereum) и контракт Receiver в Mumbai (тестовая сеть Polygon), а затем будем отправлять данные из Sender и считывать данные на Receiver через вызовы web3 в скрипте нода.

### 1. Разверните контракт Sender {#1-deploy-sender-contract}

Единственная цель контракта Sender — обеспечить возможность вызова функции [syncState](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33) в контракте StateSender (контракт синхронизации состояния в Matic) в виде события StateSynced, которое прослушивает Heimdall.

Развертывается:

`0xEAa852323826C71cd7920C3b4c007184234c3945` в Goerli

`0x28e4F3a7f651294B9564800b2D01f35189A5bFbE` в Ethereum Mainnet

Чтобы получить возможность вызова этой функции, давайте включим ее интерфейс в наш контракт:

```jsx
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...
```

Затем напишем свою пользовательскую функцию, принимающую данные для отправки в Polygon и вызывающую syncState

```jsx
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

В вышеуказанной функции `stateSenderContract` — это адрес StateSender в сети, где вы выполняете развертывание `Sender`. (например, мы будем использовать `0xEAa852323826C71cd7920C3b4c007184234c3945` для Goerli), а `receiver` — контракт, который будет принимать отправляемые отсюда данные.

Для передачи переменных рекомендуется использовать конструкторы, однако для целей настоящей демонстрации мы просто закодируем эти два адреса:

Вот как выглядит Sender.sol:

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

Мы используем простой счетчик `states` для отслеживания количества состояний, отправленных через контракт Sender.

Используйте Remix, чтобы развернуть контракт и записать адрес и ABI.

### 2. Разверните контракт Receiver {#2-deploy-receiver-contract}

Контракт Receiver — это контракт, вызываемый валидатором при эмиссии события `StateSynced`. Валидатор вызывает функцию `onStateReceive` в контракте получателя для отправки данных. Для ее реализации мы сначала импортируем интерфейс [StateReceiver](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol) и записываем собственную пользовательскую логику для интерпретации переданных данных внутри onStateReceive.

Вот как выглядит наш файл Receiver.sol:

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

Функция просто назначает для переменных последние полученные идентификаторы состояния и данные. [StateId](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36) — это простая уникальная ссылка на передаваемое состояние (простой счетчик).

Разверните Receiver.sol в тестовой сети Polygon и запишите адрес и ABI

### 3. Сопоставление контрактов Sender и Receiver {#3-getting-your-sender-and-receiver-mapped}

Вы можете использовать уже развернутые адреса (как указано выше) для отправителя и получателя, или развернуть собственные пользовательские контракты и запросить выполненное сопоставление здесь: [https://mapper.polygon.technology/](https://mapper.polygon.technology/)

### 4. Отправка и прием данных {#4-sending-and-receiving-data}

У нас имеются наши контракты, мы выполнили сопоставление, и теперь мы запишем простой скрипт нода для отправки произвольных шестнадцатеричных байтов, их получения в Polygon и интерпретации этих данных.

**4.1 Настройте ваш скрипт**

Вначале мы инициализируем наши объекты web3, кошелек для проведения транзакций и контрактов

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

Мы используем пакет @maticnetwork/meta для RPC. Этот пакет не является обязательным для запуска скрипта.

Объекты `matic` и `main` ссылаются на объект web3, инициализируемый Polygon и Ropsten RPC соответственно.

Объекты `sender` и `receiver` ссылаются на объекты контракта Sender.sol и Receiver.sol, которые мы развернули на шаге 1 и на шаге 2.

**4.2 Отправка данных**

Теперь давайте настроим наши функции для создания байтовой строки данных и ее отправки через контракт Sender:

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

Вызов `getData` конвертирует строку ascii (например, `Hello World !`) в байтовую строку (например, `0x48656c6c6f20576f726c642021`); в то время как функция `sendData` принимает `data` (строку ascii), вызывает `getData` и передает байтовую строку в контракт отправителя

**4.3 Прием данных**

Далее мы проверим наличие полученных данных в Receiver.sol.

Для выполнения синхронизации состояния потребуется приблизительно 7-8 минут.

Добавьте следующие функции для проверки (а) количества отправленных Sender состояний и (б) последнего полученного Receiver состояния.

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

Функция `checkReceiver` просто вызывает переменные, которые мы определили в контракте. Эти переменные устанавливаются, как только валидатор вызывает `onStateReceive` для контракта. Функция `getString` просто интерпретирует байтовую строку (конвертирует ее обратно в ascii)

```jsx
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

Наконец, мы запишем метод для выполнения наших функций:

```jsx
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

**4.4 Объединяем все**

Вот как выглядит наш тестовый скрипт:

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

**4.5 Давайте запустим скрипт**

Успешное исполнение приведенного выше скрипта дает следующий вывод:

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World !
```
