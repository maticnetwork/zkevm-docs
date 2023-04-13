---
id: dagger
title: Dagger
sidebar_label: Dagger - Single App
description: Создайте следующее приложение blockchain в Polygon
keywords:
  - docs
  - matic
  - polygon
  - dagger
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Dagger — это лучший способ получения обновлений в режиме реального времени из блокчейна Ethereum.
Он обеспечивает децентрализованным приложениям и серверной системе способ получения событий блокчейна Ethereum (т. е. транзакций, передач токенов, квитанций и журналов) в реальном времени поверх websocket или socket.

Мы поддерживаем инфраструктуру для надежных и масштабируемых событий в реальном времени. `@maticnetwork/dagger` — это библиотека потребителей для проекта Dagger, написанного на NodeJS. Она использует сервер Dagger для получения в реальном времени обновлений от сети Ethereum.

## Установка {#installation}

```sh
# Using Yarn
yarn add @maticnetwork/dagger

# Using NPM
npm install @maticnetwork/dagger --save
```

## Сеть {#network}

### Сеть Ethereum {#ethereum-network}

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

### Matic Network {#matic-network}

#### Mainnet {#mainnet-1}

```sh
Websocket: wss://matic-mainnet.dagger.matic.network
Socket: mqtts://matic-mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Тестовая сеть Mumbai {#mumbai-testnet}

```sh
Websocket: wss://mumbai-dagger.matic.today
Socket: mqtts://mumbai-dagger.matic.today (You can also use `ssl://` protocol)
```

## Пример {#example}

- Давайте сначала создадим проект _npm_.

```bash
npm init -y
touch index.js
```

- Теперь мы можем вставить следующий фрагмент кода в `index.js`.

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

- Запустите `index.js` и вы начнете получать номер блока сразу после создания нового блока.

```bash
node index.js
```

## API {#api}

### новый Dagger(url) {#new-dagger-url}

Создайте объект dagger

- `url` — это адрес сервера dagger. Проверьте все доступные значения url в [сегменте сети](#network).

Пример:

```js
const dagger = new Dagger(<url>)
```

### dagger.on(event, fn) {#dagger-on-event-fn}

Подписаться на тему

- `event` — это тема `String`, на которую нужно подписаться. Поддерживаются `event` знаков подстановки (`+` — для одного уровня, и `#` — для нескольких уровней)
- `fn` - `function (data, removed)`
fn будет исполняться при наступлении события:
  - данные `data` из события
  - флаг `removed`, показывающий, были ли данные удалены из блокчейна вследствие реорганизации.

Пример:

```js
dagger.on('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.once(event, fn) {#dagger-once-event-fn}

Совпадает с [on](#daggeronevent-fn), но запускается только один раз.

Пример:

```js
dagger.once('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.off(event, fn) {#dagger-off-event-fn}

Отписаться от темы

- `event` — это тема `String`, от которой нужно отписаться
- `fn` - `function (data, removed)`

Пример:

```js
dagger.off('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.of(room) {#dagger-of-room}

Создать комнату из dagger. `room` должно иметь одно из двух значений
  - `latest`
  - `confirmed`

Объект `room` имеет следующие методы:
  - `on` — то же, что и dagger `on`
  - `once` — то же, что и dagger `once`
  - `off` — то же, что и dagger `off`

```js
const latestRoom = dagger.of('latest')
const confirmedRoom = dagger.of('confirmed')
```

### dagger.end([force]) {#}

Закрыть dagger, принимает следующие варианты значений:

- `force`: при переводе в значение «истина» dagger будет сразу же закрыт. Этот параметр является
необязательным.

```js
dagger.end({force: true}) // immediate closing
```

### dagger.contract(web3Contract) {#dagger-contract-web3contract}

Создает оберточный функционал контракта web3 для поддержки Dagger.

- Сначала создайте объект контракта web3.

```javascript
// web3 contract
const web3Contract = new web3.eth.Contract(abi, address)
```

- Теперь мы создадим на нем оберточный функционал контракта dagger.

```javascript
// dagger contract
const contract = dagger.contract(web3Contract)
```

- Время на фильтрацию событий контракта

```javascript
const filter = contract.events.Transfer({
  filter: { from: "0x123456..." },
  room: "latest"
})
```

- Просмотр событий контракта

```javascript
// watch
filter.watch((data, removed) => { console.log(data, removed) })

// or watch only once
filter.watchOnce((data, removed) => { console.log(data, removed) })
```

- Остановка просмотра событий

```js
// stop watching
filter.stopWatching();
```

## События {#events}

Каждое событие имеет комнату ∈ {`latest`, `confirmed`}.
  - `latest` : События срабатывают сразу же после включения блока в цепочку.
  - `confirmed` : События срабатывают после 12 подтверждений.

Если вы хотите показать обновления в UI вашего децентрализованного приложения, используйте события `latest`. Это поможет улучшить и сделать интуитивно понятным UI/UX.

Используйте события `confirmed` для необратимых задач с сервера или в UI. Например, для отправки электронных писем, уведомлений или для предоставления пользователю возможности выполнить последующую задачу в UI после подтверждения одной транзакции.

### Сетевые события {#network-events}

| Событие Ethereum | Когда? | флаг `removed` |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| блок | Для каждого созданного нового блока | Да |
| block.number | Для каждого созданного нового номера блока |                |
| block.hash | Для каждого созданного нового хэша блока | Да |
| block/`number` | Когда конкретный блок в будущем включен в цепочку | Да |
| addr/`address`/tx | На каждой новой транзакции для `address` | Да |
| addr/`address`/tx/out | На каждой новой исходящей транзакции для `address` | Да |
| addr/`address`/tx/in | На каждой новой входящей транзакции для `address` | Да |
| tx/`txId` | Когда заданный `txId` включен в блок | Да |
| tx/`txId`/success | Когда tx имеет статус success (включен в блок) для `txId` | Да |
| tx/`txId`/fail | Когда tx дает сбой (включен в блок) для `txId` | Да |
| tx/`txId`/receipt | Когда генерируется квитанция (включена в блок) для `txId` | Да |
| addr/`contractAddress`/deployed | Когда новый `contractAddress` включен в блок | Да |
| log/`contractAddress` | Когда генерируется новый журнал для `contractAddress` | Да |
| log/`contractAddress`/filter/`topic1`/`topic2` | Когда генерируется новый журнал с `topic1` и `topic2` для `contractAddress` | Да |

### События Dagger {#dagger-events}

| Событие Dagger | Когда? | args |
| ----------------- | ------------------------------ | -------------- |
| connection.status | Когда изменяется состояние подключения | значение: логическое |


Каждое событие должно начинаться с комнаты:

#### блок {#block}

Для каждого нового блока

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

Для каждого нового номера блока

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

Для каждого нового хэша блока

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

Когда конкретный блок **X** в будущем включен в цепочку

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

На каждой новой транзакции для `address`

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

`dir` — направление транзакции ∈ {`in`, `out`}. `address` можно опустить, чтобы получать уведомление для любого адреса.

<Tabs
defaultValue="in"
values={[
{ label: 'incoming', value: 'in', },
{ label: 'outgoing', value: 'out', },
{ label: 'wild card', value: 'all', },
]
}>
<TabItem value="in">

На каждой новой входящей транзакции для `address`

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

На каждой новой исходящей транзакции для `address`

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

Использование подстановочных знаков вместо `address` для получения уведомлений о всех входящих и исходящих транзакциях.

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

`status` — это статус `txId` ∈ {`success`, `fail`, `receipt`}. Его тоже можно держать пустым, т. е. дающим в результате `tx/{txId}`, активизируемым при включении `txId` в блок.

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

Когда заданный `txId` включен в блок

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

Когда tx имеет статус success (включен в блок) для `txId`

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

Когда tx дает сбой (включен в блок) для `txId`

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

Когда генерируется квитанция (включена в блок) для `txId`

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

Когда генерируется журнал для `contractAddress`

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

Когда генерируется новый журнал с `topic0`, `topic1` и `topic2` для `contractAddress`

```javascript
// Triggers when 1 GNT (Golem token) get transferred to Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/filter/+/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', console.log)

// Triggers when any amount of GNT (Golem token) get sent from Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', ...)

// Listen for every Golem token transfer (notice `#` at the end)
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#', ...)
```

> Имена событий чувствительны к регистру. `address`, `txId` и `topics` должны быть набраны строчными буквами.

> Примечание: вы можете использовать подстановочные знаки и для событий. Существуют два типа подстановочных знаков: `+` (для единичных знаков) и `#` (для нескольких знаков). Используйте с осторожностью, поскольку при этом будет выбрано больше данных, чем необходимо, и ваше децентрализованное приложение может быть перегружено данными.



## Тестовый сервер Dagger {#test-dagger-server}

Эта библиотека состоит из исполняемого модуля `woodendagger`, который выступает в качестве тестового сервера dagger на вашей локальной машине. Так что вы можете выполнить проверку с помощь TestRPC.

Не используйте `woodendagger` в эксплуатационной среде. Он предназначен только для разработки. Он не поддерживает флаг `removed`.

```bash
$ woodendagger --url=https://mainnet.infura.io # or http://localhost:8545 for local json-rpc

# If you want to start dagger server on different ports,
# sockport: socket port for backend connection over TCP
# wsport: websocket port for frontend connection over websocket
$ woodendagger --url=http://localhost:8545 --sockport=1883 --wsport=1884

# To connect from dagger:
const dagger = new Dagger('mqtt://localhost:1883')
```

## Поддержка {#support}

Если у вас возникнут вопросы, замечания или запросы на новые функции, свяжитесь с нами в [Telegram](https://t.me/maticnetwork)

## Лицензия {#license}

Массачусетский технологический институт (MIT)
