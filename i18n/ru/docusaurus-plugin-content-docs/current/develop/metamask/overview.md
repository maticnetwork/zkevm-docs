---
id: overview
title: Обзор MetaMask
sidebar_label: Overview
description: Как начать работать с MetaMask в Polygon
keywords:
  - wiki
  - polygon
  - wallet
  - metamask
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[MetaMask](https://metamask.io/) — это криптокошелек, который можно использовать в браузере и на мобильных устройствах для взаимодействия с блокчейном Ethereum. Это позволяет запускать децентрализованные приложения Ethereum прямо в браузере без запуска полного нода Ethereum.

**Тип**: некастодиальный/HD <br/>
**Хранение приватного ключа**: хранилище локального браузера пользователя <br/>
**Взаимодействие с журналом Ethereum**: Infura <br/>
**Кодирование приватных ключей**: мнемоническое <br/>

:::warning
Пожалуйста, резервная копия **фразы, которая содержит секретный восстановитель.** Если устройство сломается, утрачено, украдено или имеет повреждение данных, другого способа его восстановить. Фраза Secret Recovery — единственный способ восстановить ваши аккаунты MetaMask. Проверьте больше **[<ins>базовых советов по безопасности для MetaMask</ins>](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)**.
:::

## Руководство по настройке MetaMask для Polygon {#guide-to-set-up-metamask-for-polygon}

* [Загрузка и установка MetaMask](/develop/metamask/tutorial-metamask.md)
* [Настройка Polygon в MetaMask](/develop/metamask/config-polygon-on-metamask.md)
* [Настройка пользовательских токенов](/develop/metamask/custom-tokens.md)
* [Создание и импорт счетов](/develop/metamask/multiple-accounts.md)

### 1. Настройте Web3 {#1-set-up-web3}

#### Шаг 1 {#step-1}

Установите в децентрализованное приложение следующее:

  ```javascript
  npm install --save web3
  ```

Создайте новый файл, назовите его `web3.js` и вставьте в него следующий код:

  ```javascript
  import Web3 from 'web3';

  const getWeb3 = () => new Promise((resolve) => {
    window.addEventListener('load', () => {
      let currentWeb3;

      if (window.ethereum) {
        currentWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          window.ethereum.enable();
          // Acccounts now exposed
          resolve(currentWeb3);
        } catch (error) {
          // User denied account access...
          alert('Please allow access for the app to work');
        }
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        resolve(currentWeb3);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });
  });


  export default getWeb3;
  ```

Вышеуказанный файл экспортирует функцию с названием `getWeb3()`, цель которой заключается в запросе доступа к счету Metamask с помощью определения глобального объекта (`ethereum` или `web3`), вставляемого Metamask.

Согласно [документации Metamask API](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes):

> MetaMask вводит глобальный API в сайты, посещаемые его пользователями на window.ethereum. Этот API позволяет веб-сайтам запрашивать аккаунты Ethereum, читать данные из блокчейнов, к которым подключен пользователь, и предлагать пользователям подписывать сообщения и транзакции. Наличие объекта провайдера указывает на пользователя Ethereum.

Если говорить более простым образом, это означает, что в вашем браузере установлен расширение/дополнение Metamask, у вас будет определенная глобальная переменная, называемая `ethereum``web3`(для старых версий), и с помощью этой переменной мы instantiate наш объект web3.

#### Шаг 2 {#step-2}

Теперь в вашем клиентском коде импортируйте вышеуказанный файл:

```js
  import getWeb3 from '/path/to/web3';
```

и вызовите функцию:

```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```

### 2. Настройте счет {#2-set-up-account}

Теперь для отправки транзакций (в частности, тем, которые изменяют состояние блокчейна) нам понадобится аккаунт для подписания этих транзакций. Мы instantiate наш экземпляр контракта из объекта web3, который мы создали выше:

```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```

Функция `getAccounts()` возвращает массив из всех счетов из metamask пользователя, где `accounts[0]` — текущий выбранный пользователем счет.

### 3. Создайте экземпляры ваших контрактов {#3-instantiate-your-contracts}

После того, как мы будем иметь наш `web3`объект, мы будем далее мгновенно вводить наши контракты, предполагая, что у вас будет ваш контракт ABI и адрес уже есть:

```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

### 4. Вызов функций {#4-call-functions}

Теперь для любой функции, которую вы хотите вызвать из вашего контракта, мы напрямую взаимодействуем с нашим объектом контракта (который `myContractInstance`объявлен на шаге 2).

:::tip Быстрый обзор

Функции, изменяющие состояние контракта, называются `send()`функциями. Функции, не изменяющие состояние контракта, называются `call()`функциями.

:::

#### Вызов функций `call()` {#functions}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```

#### Вызов функций `send()` {#functions-1}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .send({
    from: this.account,gasPrice: 0
  })
  .then (
    (receipt) => {
      // returns a transaction receipt}
    )
```
