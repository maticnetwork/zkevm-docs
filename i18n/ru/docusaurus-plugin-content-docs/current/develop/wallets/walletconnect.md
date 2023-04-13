---
id: walletconnect
title: WalletConnect
description: Открытый протокол, устанавливающий связь между децентрализованным приложением и кошельком.
keywords:
  - wiki
  - polygon
  - dapp
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

**WalletConnect** — это открытый протокол, а не кошелек, созданный для создания связи между dApps и кошельками. Кошелек и приложение, поддерживающее этот протокол, позволят обеспечить безопасную связь через общий ключ между любыми двумя коллегами. Децентрализованное приложение инициирует соединение, отображая QR-код со стандартным WalletConnect URI. Когда приложение кошелька подтверждает запрос подключения, соединение устанавливается. Дополнительные запросы, связанные с переводом средств подтверждаются в самом приложении кошелька.

## Настройка Web3 {#set-up-web3}

Чтобы настроить свой dApp для подключения к кошельку Polygon, вы можете использовать провайдера WalletConnect для прямого подключения к Polygon. Установите в децентрализованное приложение следующее:

```bash
npm install --save @maticnetwork/walletconnect-provider
```

Установите `matic.js`для интеграции Polygon:

```bash
$ npm install @maticnetwork/maticjs
```

И добавьте следующий код в вашем dApp;

```js
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

import Web3 from "web3"
import Matic from "maticjs"
```

Затем настройте провайдера Polygon и Ropsten через объект WalletConnect:

```javascript
const maticProvider = new WalletConnectProvider(
  {
    host: `https://rpc-mumbai.matic.today`,
    callbacks: {
      onConnect: console.log('connected'),
      onDisconnect: console.log('disconnected!')
    }
  }
)

const ropstenProvider = new WalletConnectProvider({
  host: `https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc`,
  callbacks: {
    onConnect: console.log('connected'),
    onDisconnect: console.log('disconnected')
  }
})
```

Мы создали два вышеуказанных объекта поставщика для создания экземпляра объекта Web3 с помощью кода:

```js
const maticWeb3 = new Web3(maticProvider)
const ropstenWeb3 = new Web3(ropstenProvider)
```

## Instantiating контракты {#instantiating-contracts}

После того, как у нас будет наш **объект web3**, инстанция контрактов включает те же шаги, что и для Metamask. Убедитесь, что у вас есть свой **контракт ABI** и **адрес** уже на месте.

```js
const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)
```

## Функции {#calling-functions}

:::info

Закрытый ключ останется в кошельке пользователя, и приложение **не имеет к нему никаким образом**.

:::

У нас есть два типа функций в Ethereum, в зависимости от взаимодействия с блокчейном. Мы используем `call()` при чтении данных и `send()` при записи данных.

### Вызов функций `call()` {#functions}

Данные для чтения не требуют подписи, поэтому код должен быть таким:

```js
this.myContractInstance.methods
  .myMethod(myParams)
  .call()
  .then (
  // do stuff with returned values
  )
```

### Вызов функций `send()` {#functions-1}

Поскольку для письма в блокчейн требуется подпись, мы приглашаем пользователя на свой кошелек (который поддерживает WalletConnect) подписать транзакцию.

Это включает три шага:
1. Построение транзакции
2. Получение подписи на транзакции
3. Отправка подписанной транзакции

```js
const tx = {
  from: this.account,
  to: myContractAddress,
  gas: 800000,
  data: this.myContractInstance.methods.myMethod(myParams).encodeABI(),
}
```

Вышеуказанный код создает объект транзакции, который отправляется в кошелек пользователя для получения подписи:


```js
maticWeb3.eth.signTransaction(tx)
  .then((result) =>{
    maticWeb3.eth.sendSignedTransaction(result)
    .then((receipt) =>
    console.log (receipt)
  )
})
```

`signTransaction()`Функция вызывает запрос пользователя для своей подписи и `sendSignedTransaction()`отправляет подписанную транзакцию (возвращает полученный транзакции на успех).
