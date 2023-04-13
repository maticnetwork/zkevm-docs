---
id: network-agnostics
title: Transazioni agnostiche di rete
sidebar_label: Network Agnostic Transactions
description: "Integra le transazioni agnostiche di rete nella tua dApp."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

## Obiettivo {#goal}

Eseguire transazioni sulla catena di Polygon, senza cambiare il provider su Metamask (questo tutorial si riferisce al provider inpage di Metamask, può essere modificato per eseguire transazioni da qualsiasi altro provider)

Dietro le quinte, l'utente firma un'intenzione di eseguire una transazione, che viene trasmessa da un semplice relayer per essere eseguita su un contratto distribuito sulla catena di Polygon.


## Cosa significa abilitare l'esecuzione delle transazioni? {#what-is-enabling-transaction-execution}

Il client con cui l'utente interagisce (browser web, app mobile, ecc.) non interagisce mai con la blockchain, ma con un semplice server di relay (o una rete di relay), in modo simile al modo in cui funziona GSN o qualsiasi altra soluzione per meta-transazioni (vedi: [Meta-transazioni: un'introduzione](https://www.notion.so/Meta-Transactions-An-Introduction-8f54cf75321e4ec3b6d755e18e406590)).

Per qualsiasi azione che richieda l'interazione con la blockchain,

- il client richiede all'utente una firma in formato EIP712.
- La firma viene inviata a un semplice server relayer (che dovrebbe avere una semplice protezione auth/spam se utilizzato per la produzione, oppure si può utilizzare il mexa sdk di biconomy: [https://github.com/bcnmy/mexa-sdk](https://github.com/bcnmy/mexa-sdk))
- Il relayer interagisce con la blockchain per inviare la firma dell'utente al contratto. Una funzione del contratto chiamata `executeMetaTransaction` elabora la firma ed esegue la transazione richiesta (tramite una chiamata interna).
- Il relayer paga per il gas, rendendo la transazione di fatto gratuita. 🤑

## Integrare le transazioni agnostiche di rete nella tua dApp {#integrate-network-agnostic-transactions-in-your-dapp}

- Scegli tra un nodo/biconomy semplice e personalizzato.

  - Per biconomy, configura una dApp dalla dashboard e salva l'api-id e l'api-key, vedi: [Tutorial: Biconomy](https://www.notion.so/Tutorial-Biconomy-7f578bfb4e7d4904b8c79522085ba568) or [https://docs.biconomy.io/](https://docs.biconomy.io/)

  **Passaggi:**

    1. Registriamo i nostri contratti nella dashboard di biconomy
       1. Consulta i [documenti ufficiali di biconomy](https://docs.biconomy.io/biconomy-dashboard).
       2. Quando registri la dApp, seleziona `Polygon Mumbai`
    2. Copia il `API key` da usare nel frontend
    3. Inoltre, aggiungi la funzione `executeMetaTransaction` in Manage-Api e accertati di abilitare la meta-tx. (Seleziona l'opzione 'native-metatx')

  - Se vuoi utilizzare le tue API personalizzate che invia le transazioni firmate sulla blockchain, puoi fare riferimento al codice del server qui: [https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer](https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer)

- Assicurati che il contratto con cui vuoi interagire erediti da `NativeMetaTransactions` - 👀 dai un'occhiata alla funzione `executeMetaTransaction` nel contratto.
- Link: [https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338](https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338)



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


- Una volta che il relayer e i contratti siano stati configurati, è necessario che il client sia in grado di recuperare una firma formattata EIP712 e che chiami semplicemente l'API con i parametri richiesti.

[n.](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L47)

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

Per la sua appunto, si intende una nuova pagina [di](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110) riferimento per la quale è stato inserito il codice di condotta che deve essere utilizzato per la sua attività.

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

    Se si utilizza Biconomy, è necessario richiamare quanto segue:

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

    dove `txObj` dovrebbe avere l'aspetto di:

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

- Se usi l'API personalizzata, questa esegue la funzione `executeMetaTransaction` sul contratto:

(rif: [https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40)](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40)

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

    utilizzando biconomy, la chiamata sul lato client si presenta come:

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
