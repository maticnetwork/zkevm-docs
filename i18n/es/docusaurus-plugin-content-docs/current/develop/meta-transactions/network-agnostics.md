---
id: network-agnostics
title: Transacciones agnósticas a la red
sidebar_label: Network Agnostic Transactions
description: "Integra las transacciones agnósticas a la red en tu DApp."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

## Objetivo {#goal}

Realizar transacciones en la cadena de Polygon sin tener que cambiar de proveedor en MetaMask (este tutorial se ocupa del proveedor que está dentro de la página de MetaMask, pero se puede modificar para ejecutar transacciones desde cualquier otro proveedor).

En segundo plano, el usuario firma una intención de ejecutar una transacción, que es reenviada por un transmisor simple para ejecutarla en un contrato desplegado en la cadena de Polygon.


## ¿Qué habilita la ejecución de la transacción? {#what-is-enabling-transaction-execution}

El cliente con el que interactúa el usuario (navegador web, aplicaciones móviles, etc.) nunca interactúa con la cadena de bloques, sino con un servidor de transmisión simple (o una red de transmisores), de forma similar al modo en que funciona la red de estaciones de gas (GSN) o cualquier solución de metatransacciones (consulta [Introducción a las metatransacciones](https://www.notion.so/Meta-Transactions-An-Introduction-8f54cf75321e4ec3b6d755e18e406590)).

Para cualquier acción que requiera interacción con la cadena de bloques:

- El cliente solicita una firma con formato EIP-712 del usuario.
- La firma se envía a un servidor de transmisión simple (debe tener una protección contra spam o autenticación simple si se usa para la producción, o se puede usar el kit de desarrollo de software [SDK] Mexa de Biconomy: [https://github.com/bcnmy/mexa-sdk](https://github.com/bcnmy/mexa-sdk)).
- El transmisor interactúa con la cadena de bloques para enviar la firma del usuario al contrato. Una función del contrato llamada `executeMetaTransaction` procesa la firma y ejecuta la transacción solicitada (a través de una llamada interna).
- El transmisor paga el gas, lo que hace que la transacción sea totalmente gratuita 🤑

## Integra las transacciones agnósticas a la red en tu DApp {#integrate-network-agnostic-transactions-in-your-dapp}

- Elige entre un nodo transmisor simple personalizado o Biconomy.

  - Si usas Biconomy, configura una aplicación descentralizada (DApp) desde el panel de control y guarda la ID y la clave de la interfaz binaria de la aplicación (API). Consulta el [Tutorial de Biconomy](https://www.notion.so/Tutorial-Biconomy-7f578bfb4e7d4904b8c79522085ba568) o [https://docs.biconomy.io/](https://docs.biconomy.io/)

  **Pasos:**

    1. Registra tus contratos en el panel de control de Biconomy.
       1. Consulta los [documentos oficiales de Biconomy](https://docs.biconomy.io/biconomy-dashboard).
       2. Cuando registres la DApp, selecciona `Polygon Mumbai`.
    2. Copia la `API key` para usarla en la interfaz de usuario.
    3. Agrega la función `executeMetaTransaction` a Manage-Api y cerciórate de habilitar las metatransacciones. (selecciona la opción "native-metatx" o transacción nativa).

  - Si quieres utilizar tu propia API personalizada que envía las transacciones firmadas en [la](https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer) cadena de bloques, puedes consultar el código del servidor aquí:

- Asegúrate de que el contrato con el que deseas interactuar sea heredado de `NativeMetaTransactions`. 👀 Échale un vistazo a la función `executeMetaTransaction` en el contrato.
- Enlace: [https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338](https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338)



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


- Cuando tengas un transmisor y el contrato configurado, lo que se necesita es que el cliente pueda obtener una firma con formato EIP-712 y simplemente llame a la API con los parámetros requeridos.

ref: http[s://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L47](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L47)

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

Llamar a la API, ref: [https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110)

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

    Si usas Biconomy, tienes que llamar a lo siguiente:

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

    y el `txObj` debería verse más o menos así:

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

- Si usas la API personalizada, esta ejecuta la función `executeMetaTransaction` en el contrato:

(ref: http[s://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40)](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40)

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

    Si usas Biconomy, la llamada del lado del cliente se verá así:

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
