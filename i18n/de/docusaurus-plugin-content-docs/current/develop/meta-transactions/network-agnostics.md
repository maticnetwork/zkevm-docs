---
id: network-agnostics
title: Netzwerkunabhängige Transaktionen
sidebar_label: Network Agnostic Transactions
description: "Netzwerkunabhängige Transaktionen in deine dApp integrieren."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

## Ziel {#goal}

Transaktionen in der Polygon-Chain auszuführen, ohne den Anbieter auf Metamask zu ändern (dieser Leitfaden handelt vom Inpage-Anbieter von Metamask und kann geändert werden, um Transaktionen von jedem anderen Anbieter auszuführen)

Im Hintergrund signiert der Benutzer die Absichtserklärung, eine Transaktion auszuführen, die von einem einfachen Relayer weitergeleitet wird, um sie auf einem Vertrag in der Polygon-Chain auszuführen.


## Was ermöglicht die Ausführung von Transaktionen? {#what-is-enabling-transaction-execution}

Der Client, mit dem der Benutzer interagiert (Webbrowsesr, mobile Apps etc.), interagiert niemals mit der Blockchain, sondern mit einem einfachen Relayer-Server (oder einem Relayer-Netzwerk). Das funktioniert ähnlich wie ein GSN oder eine Meta-Transaktionslösung (siehe: [Meta-Transaktionen: Eine Einführung](https://www.notion.so/Meta-Transactions-An-Introduction-8f54cf75321e4ec3b6d755e18e406590)).

Für jede Aktion, die eine Blockchain-Interaktion erfordert,

- fordert der Client eine EIP712-formatierte Signatur vom Benutzer an.
- Die Signatur wird an einen einfachen Relayer gesendet (Sie sollte einen einfachen Auth/Spam-Schutz haben, falls sie für die Produktion verwendet wird. Alternativ kann der Mexa-SDK von Biconomy verwendet werden: [https://github.com/bcnmy/mexa-sdk](https://github.com/bcnmy/mexa-sdk))
- Der Relayer interagiert mit der Blockchain, um die Unterschrift des Benutzers an den Vertrag zu übermitteln. Eine Funktion im Vertrag namens `executeMetaTransaction` verarbeitet die Signatur und führt die angeforderte Transaktion (über einen internen Aufruf) aus.
- Der Relayer bezahlt für das Gas, wodurch die Transaktion effektiv kostenlos ist 🤑

## Netzwerkunabhängige Transaktionen in deine dApp integrieren {#integrate-network-agnostic-transactions-in-your-dapp}

- Wähle aus einem benutzerdefinierten, einfachen Relayer-Knoten/Biconomy.

  - Richte für Biconomy eine dApp über das Dashboard ein und speichere die API-ID und den API-Schlüssel, siehe: [Leitfaden](https://www.notion.so/Tutorial-Biconomy-7f578bfb4e7d4904b8c79522085ba568): Biconomy oder [https://docs.biconomy.io/](https://docs.biconomy.io/)

  **Schritte:**

    1. Registrieren wir unsere Verträge für das Biconomy-Dashboard
       1. Lies die [offiziellen Dokumente von Biconomy](https://docs.biconomy.io/biconomy-dashboard).
       2. Wähle während der Registrierung der dApp `Polygon Mumbai`
    2. Kopiere die im Frontend zu verwendende `API key`
    3. Füge die Funktion `executeMetaTransaction` in Manage-Api hinzu und stelle sicher, dass du Meta-tx aktivierst. (Sieh dir die „native-metatx“-Option an)

  - Wenn du deine eigene benutzerdefinierte API verwenden möchtest, die signierte Transaktionen auf der Blockchain sendet, kannst du den Servercode hier verweisen: [https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer](https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer)

- Stelle sicher, dass der Vertrag, mit dem du interagieren möchtest, von `NativeMetaTransactions` geerbt wird - 👀 sieh dir die `executeMetaTransaction`-Funktion im Vertrag an.
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


- Sobald du einen Relayer und die Verträge eingerichtet hast, muss der Client eine EIP712-formatierte Signatur abrufen und die API mit den erforderlichen Parametern aufrufen können

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

Aufruf der API, ref: [https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110)

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

    Wenn du Biconomy verwendest, sollte Folgendes aufgerufen werden:

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

    wo die `txObj` ungefähr so aussehen soll:

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

- Wenn du die benutzerdefinierte API verwendest, führt sie die `executeMetaTransaction`-Funktion im Vertrag aus:

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

    verwendet Biconomy, der Aufruf der Client-Seite sieht wie folgt aus:

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
