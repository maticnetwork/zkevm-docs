---
id: portis
title: Portis
description: Веб-кошелек, созданный с учетом удобства организации начала работы пользователей.
keywords:
  - wiki
  - polygon
  - wallet
  - portis
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Portis — это веб-кошелек, созданный с целью упростить процесс начала работы для пользователей. Он поставляется в комплекте с javascript SDK, который интегрируется в децентрализованное приложение и создает для пользователя локальную среду без кошелька. Кроме того, он отвечает за настройку кошелька, транзакций и гонораров за газ.

Как и Metamask, он является некастодиальным — пользователи контролируют свои ключи, а Portis просто хранит их в безопасном режиме. Однако, в отличие от Metamask, он интегрируется в приложение, а не в браузер. Ключи пользователей связываются с их идентификаторами пользователей и паролями.

**Тип**: некастодиальный/HD <br/>
**Хранение приватных ключей**: шифрование и сохранение на серверах Portis<br/> **Коммуникация в Ethereum Ledger**: Определяется разработчиком<br/> **Кодирование приватных ключей**: мнемоническое<br/>

## Настройка Web3 {#set-up-web3}

Установите Portis в своем dApp:

```js
npm install --save @portis/web3
```

Теперь зарегистрируйте свое dApp в Portis, чтобы получить идентификатор dApp с помощью [панели](https://dashboard.portis.io/) Portis.

Импорт `portis`и `web3`объекты:

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```

Конструктор Portis берет первый аргумент в качестве идентификатора dApp, а второй аргумент в качестве сети, с которой вы хотели бы подключиться. Это может быть строка или объект.

```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```

## Настройка аккаунта {#set-up-account}

Если установка и создание экземпляра web3 были выполнены успешно, следующие действия должны успешно возвратить подключенный аккаунт:

```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```

## Instantiating контракты {#instantiating-contracts}

Вот как мы должны установить контракты:

```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

## Функции {#calling-functions}

### `call()`Функция {#function}

```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```

### `send()`Функция {#function-1}
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```
