---
id: network-agnostics
title: Транзакции, не зависящие от сети
sidebar_label: Network Agnostic Transactions
description: "Интеграция транзакций, не зависящих от сети, в децентрализованное приложение."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

## Цель {#goal}

Выполнение транзакций в цепочке Polygon без смены провайдера в Metamask (это руководство ориентировано на провайдера на странице metamask, но его можно изменить для выполнения транзакций любого другого провайдера)

Пользователь скрыто подтверждает намерение выполнить транзакцию, которое передается простым транслятором для выполнения с контрактом в Polygon chain.


## Что позволяет выполнять транзакции? {#what-is-enabling-transaction-execution}

Клиент, с которым взаимодействует пользователь (браузер, мобильные приложения и т. д.) никогда не взаимодействует с блокчейном, а вместо этого взаимодействует с простым сервером ретрансляции (или сетью ретрансляторов) аналогично тому, как работает GSN или любое решение мета транзакций (см.: [Мета транзакции: введение](https://www.notion.so/Meta-Transactions-An-Introduction-8f54cf75321e4ec3b6d755e18e406590)).

Для любого действия, которое требует взаимодействия с блокчейном,

- Клиент запрашивает у пользователя подпись в формате EIP712
- Подпись отправляется на простой сервер ретранслятора (он должен иметь простую защиту аутентификации / защиту от спама, если используется для производственных целей, или допускается использование biconomy mexa sdk: [https://github.com/bcnmy/mexa-sdk](https://github.com/bcnmy/mexa-sdk))
- Ретранслятор взаимодействует с блокчейном для отправки на контракт подписи пользователя. Функция контракта под названием `executeMetaTransaction` обрабатывает подпись и выполняет требуемую транзакцию (через внутренний вызов).
- Ретранслятор оплачивает газ, благодаря чему транзакция фактически становится бесплатной 🤑

## Интеграция транзакций, не зависящих от сети, в ваше децентрализованное приложение {#integrate-network-agnostic-transactions-in-your-dapp}

- Выбирайте между простым пользовательским нодом ретранслятора и biconomy.

  - Для biconomy вам нужно будет настроить децентрализованное приложение из дашборда и сохранить api-id и api-key, см.: [Руководство: Biconomy](https://www.notion.so/Tutorial-Biconomy-7f578bfb4e7d4904b8c79522085ba568) или [https://docs.biconomy.io/](https://docs.biconomy.io/)

  **Шаги:**

    1. Давайте зарегистрируем наши контракты на дашборде biconomy
       1. Посетите [официальную документацию по biconomy](https://docs.biconomy.io/biconomy-dashboard).
       2. Когда вы регистрируете децентрализованное приложение, выберите `Polygon Mumbai`
    2. Скопируйте `API key` для использования в клиентской части
    3. Добавьте функцию `executeMetaTransaction` в Manage-Api и обязательно включите meta-tx. (Поставьте отметку на опции 'native-metatx')

  - Если вы хотите использовать собственный пользовательский API который отправляет подписанные транзакции в блокчейне, вы можете обратиться к серверному коду здесь: [https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer](https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer)

- Убедитесь, что контракт, с которым вы хотите взаимодействовать, наследует от `NativeMetaTransactions` - 👀 посмотрите функцию `executeMetaTransaction`в контракте.
- Ссылка: [https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338](https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338)



```jsx

let data = await web3.eth.abi.encodeFunctionCall({
    name: 'getNonce',
    type: 'function',
    inputs: [{
        name: "user",
        type: "address"
      }]
  }, [accounts[0]]);

  let _nonce = await web3.eth.call ({
    to: token["80001"],
    data
  });

  const dataToSign = getTypedData({
    name: token["name"],
    version: '1',
    salt: '0x0000000000000000000000000000000000000000000000000000000000013881',
    verifyingContract: token["80001"],
    nonce: parseInt(_nonce),
    from: accounts[0],
    functionSignature: functionSig
  });

  const msgParams = [accounts[0], JSON.stringify(dataToSign)];

  let sig = await eth.request ({
    method: 'eth_signTypedData_v3',
    params: msgParams
  });

  ```


- Когда вы настроите ретранслятор и контракты, клиент сможет доставить подпись в формате EIP712 и просто вызвать API с требуемыми параметрами

ref: [https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef0053c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L47](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L47)

    ```jsx

    let data = await web3.eth.abi.encodeFunctionCall({
        name: 'getNonce',
        type: 'function',
        inputs: [{
            name: "user",
            type: "address"
          }]
      }, [accounts[0]]);

      let _nonce = await web3.eth.call ({
        to: token["80001"],
        data
      });

      const dataToSign = getTypedData({
        name: token["name"],
        version: '1',
        salt: '0x0000000000000000000000000000000000000000000000000000000000013881',
        verifyingContract: token["80001"],
        nonce: parseInt(_nonce),
        from: accounts[0],
        functionSignature: functionSig
      });
      const msgParams = [accounts[0], JSON.stringify(dataToSign)];

      let sig = await eth.request ({
        method: 'eth_signTypedData_v3',
        params: msgParams
      });
    ```

Позвонить в API, ref: [https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef0053c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110)

    ```jsx
    const response = await request.post(
        'http://localhost:3000/exec', {
          json: txObj,
        },
        (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          document.getElementById(el).innerHTML =
          `response:`+ JSON.stringify(body)
        }
      )
    ```

    Если вы используете Biconomy, необходим следующий вызов:

    ```jsx
    const response = await request.post(
        'https://api.biconomy.io/api/v2/meta-tx/native', {
          json: txObj,
        },
        (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          document.getElementById(el).innerHTML =
          `response:`+ JSON.stringify(body)
        }
      )
    ```

    где `txObj` должен выглядеть так:

    ```json
    {
        "to": "0x2395d740789d8C27C139C62d1aF786c77c9a1Ef1",
        "apiId": <API ID COPIED FROM THE API PAGE>,
        "params": [
            "0x2173fdd5427c99357ba0dd5e34c964b08079a695",
            "0x2e1a7d4d000000000000000000000000000000000000000000000000000000000000000a",
            "0x42da8b5ac3f1c5c35c3eb38d639a780ec973744f11ff75b81bbf916300411602",
            "0x32bf1451a3e999b57822bc1a9b8bfdfeb0da59aa330c247e4befafa997a11de9",
            "27"
        ],
        "from": "0x2173fdd5427c99357ba0dd5e34c964b08079a695"
    }
    ```

- Если вы используете пользовательский API, он выполняет функцию `executeMetaTransaction` для контракта:

(ref: [https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef0053c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40)](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40)

    ```jsx
    try {
        let tx = await contract.methods.executeMetaTransaction(
          txDetails.from, txDetails.fnSig, r, s, v
        ).send ({
          from: user,
          gas: 800000
        })
        req.txHash = tx.transactionHash
      } catch (err) {
        console.log (err)
        next(err)
      }
    ```

    использует biconomy, клиентский вызов выглядит так:

    ```jsx
    // client/src/App.js
    import React from "react";
    import Biconomy from "@biconomy/mexa";

    const getWeb3 = new Web3(biconomy);
    biconomy
        .onEvent(biconomy.READY, () => {
          // Initialize your dapp here like getting user accounts etc
          console.log("Mexa is Ready");
        })
        .onEvent(biconomy.ERROR, (error, message) => {
          // Handle error while initializing mexa
    			console.error(error);
        });

    /**
    * use the getWeb3 object to define a contract and calling the function directly
    */

    ```
