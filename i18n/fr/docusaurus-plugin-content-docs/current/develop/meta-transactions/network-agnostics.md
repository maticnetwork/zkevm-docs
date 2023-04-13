---
id: network-agnostics
title: Transactions Non Liées au Réseau
sidebar_label: Network Agnostic Transactions
description: "Intégrez des Transactions Indépendantes du Réseau dans votre dApp."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

## Objectif {#goal}

Exécuter des transactions sur la chaîne Polygone, sans changer de fournisseur sur Métamasque (ce tutoriel s'adresse au fournisseur inpage de Métamasque, il peut être modifié pour exécuter des transactions à partir de n'importe quel autre fournisseur)

Sous le capot, l'utilisateur signe une intention d'exécuter une transaction, qui est relayée par un simple relais pour l'exécuter sur un contrat déployé sur la chaîne Polygone.


## Qu'est-ce qui permet l'exécution des transactions? {#what-is-enabling-transaction-execution}

Le client avec lequel l'utilisateur interagit (navigateur web, applications mobiles, etc.) n'interagit jamais avec la blockchain, mais avec un simple serveur relais (ou un réseau de relais), de la même manière que GSN ou toute autre solution de méta-transaction ( voir: Méta-transactions [: Une Introduction](https://www.notion.so/Meta-Transactions-An-Introduction-8f54cf75321e4ec3b6d755e18e406590)).

Pour toute action qui nécessite une interaction de la blockchain,

- Le client demande une signature au format EIP712 à l'utilisateur.
- La signature est envoyée à un serveur de relais simple (qui doit avoir une protection simple contre les authentifications et les spams s'il est utilisé en production, ou le sdk mexa de biconomy peut être utilisé: [https://github.com/bcnmy/mexa-sdk](https://github.com/bcnmy/mexa-sdk))
- Le relais interagit avec la blockchain pour soumettre la signature de l'utilisateur au contrat. Une fonction du contrat appelée`executeMetaTransaction` traite la signature et exécute la transaction demandée (via un appel interne).
- Le relayeur paie le gaz, ce qui rend la transaction effectivement gratuite🤑

## Intégrer des Transactions Indépendantes du Réseau dans votre dApp {#integrate-network-agnostic-transactions-in-your-dapp}

- Choisissez entre un nœud/biconomie de relais simple personnalisé.

  - Pour la biconomie, configurez une dapp depuis le tableau de bord et enregistrez l'api-id et l'api-key, voir: [Tutoriel: Biconomy](https://www.notion.so/Tutorial-Biconomy-7f578bfb4e7d4904b8c79522085ba568) ou [https://docs.biconomy.io/](https://docs.biconomy.io/)

  **Étapes:**

    1. Enregistrons nos contrats au tableau de bord biconomy
       1. Visitez les [documents officiels de la biconomie](https://docs.biconomy.io/biconomy-dashboard).
       2. Pendant l'enregistrement de la dapp, sélectionnez`Polygon Mumbai`
    2. Copier le`API key`pour l'utiliser dans l'extrémité avant
    3. Et ajoutez la fonction `executeMetaTransaction`dans Manage-Api et assurez-vous d'activer le meta-tx. (Vérifiez l'option 'native-metatx')

  - Si vous souhaitez utiliser votre propre API personnalisée qui envoie des transactions signées sur la blockchain, vous pouvez vous référer au code serveur ici: [https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer](https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer)

- Assurez-vous que le contrat avec lequel vous souhaitez interagir hérite de la fonction `NativeMetaTransactions`👀 peep into `executeMetaTransaction` dans le contrat.
- Lien: [https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338](https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338)



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


- Une fois que le relais et les contrats sont configurés, il suffit que le client puisse récupérer une signature au format EIP712 et appeler l'API avec les paramètres requis.

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

Appelez l'API, ref: [https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef0053c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110)

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

    Si l'on utilise Biconomy, il faut appeler ce qui suit:

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

   où le `txObj`devrait ressembler à quelque chose comme:

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

- Si vous utilisez l'API personnalisée, elle exécute la `executeMetaTransaction`fonction sur le contrat:

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

     utilise la biconomie, l'appel du côté client ressemble à ceci:

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
