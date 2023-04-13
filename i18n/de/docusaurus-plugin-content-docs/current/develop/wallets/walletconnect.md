---
id: walletconnect
title: WalletConnect
description: Ein offenes Protokoll, das eine DApp-Wallet-Kommunikation erstellt.
keywords:
  - wiki
  - polygon
  - dapp
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

**WalletConnect** ist ein offenes Protokoll - nicht eine Wallet, die erstellt wurde, um einen Kommunikationslink zwischen dApps und Wallets zu erstellen. Eine Wallet-App und eine Anwendung, die dieses Protokoll unterstützt, werden einen sicheren Link über einen gemeinsamen Key zwischen zwei Peers ermöglichen. Eine Verbindung wird von DApp initiiert, die einen QR-Code mit einer Standard-WalletConnect-URI anzeigt. Die Verbindung wird hergestellt, wenn die Wallet-App die Verbindungsanfrage genehmigt. Weitere Anfragen betreffend die Übertragung von Geldmitteln werden in der Wallet-App selbst bestätigt.

## Web3 einrichten {#set-up-web3}

Um deine dApp für eine Verbindung mit der Polygon Wallet eines Benutzers einzurichten, kannst du den Anbieter von WalletConnect verwenden, um dich direkt mit Polygon zu verbinden. Installiere Folgendes in deiner DApp:

```bash
npm install --save @maticnetwork/walletconnect-provider
```

Installiere `matic.js`für Polygon Integration:

```bash
$ npm install @maticnetwork/maticjs
```

Und füge den folgenden Code in deiner dApp hinzu;

```js
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

import Web3 from "web3"
import Matic from "maticjs"
```

Als nächstes richte Polygon und Ropsten Anbieter über WalletConnect’s Objekt ein:

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

Wir haben die oben genannten Provider-Objekte erstellt, mit denen wir unser Web3-Objekt erstellen können:

```js
const maticWeb3 = new Web3(maticProvider)
const ropstenWeb3 = new Web3(ropstenProvider)
```

## Instantiating Contracts {#instantiating-contracts}

Sobald wir unser **web3-Objekt** haben, beinhaltet die Instantiation von Verträgen die gleichen Schritte wie für Metamask. Vergewissere dich, dass du deinen **Vertrag ABI** und **deine Adresse** bereits vorhanden hast.

```js
const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)
```

## Calling Functions {#calling-functions}

:::info

Der Private Key bleibt in der Wallet des Benutzers und die **App greift in keiner Weise darauf zu**.

:::

Wir haben zwei Arten von Funktionen in Ethereum, abhängig von der Interaktion mit der Blockchain. Wir,`call()` wenn wir Daten lesen und `send()`wenn wir Daten schreiben.

### Funktionsaufrufe `call()` {#functions}

Das Lesen von Daten erfordert keine Signatur, daher sollte der Code wie folgt sein:

```js
this.myContractInstance.methods
  .myMethod(myParams)
  .call()
  .then (
  // do stuff with returned values
  )
```

### Funktionsaufrufe `send()` {#functions-1}

Da das Schreiben auf die Blockchain eine Signatur erfordert, werden wir den Benutzer auf ihrer wallet auffordern, die Transaktion zu signieren.

Dies beinhaltet drei Schritte:
1. Erstellung einer Transaktion
2. Abrufen einer Unterschrift für die Transaktion
3. Versand der unterschriebenen Transaktion

```js
const tx = {
  from: this.account,
  to: myContractAddress,
  gas: 800000,
  data: this.myContractInstance.methods.myMethod(myParams).encodeABI(),
}
```

Der oben stehende Code erstellt ein Transaktionsobjekt, das dann zur Unterschrift an die Wallet des Benutzers gesendet wird:


```js
maticWeb3.eth.signTransaction(tx)
  .then((result) =>{
    maticWeb3.eth.sendSignedTransaction(result)
    .then((receipt) =>
    console.log (receipt)
  )
})
```

`signTransaction()`function fragt den Benutzer nach seiner Signatur an und `sendSignedTransaction()`sendet die unterzeichnete Transaktion (gibt einen Transaktionsbeleg für den Erfolg zurück).
