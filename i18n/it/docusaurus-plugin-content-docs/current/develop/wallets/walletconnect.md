---
id: walletconnect
title: WalletConnect
description: Un protocollo aperto che crea una comunicazione tra dApp e portafoglio.
keywords:
  - wiki
  - polygon
  - dapp
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

**WalletConnect** è un protocollo aperto - non un wallet - costruito per creare un collegamento di comunicazione tra dApp e wallet. Un wallet e un'applicazione che supporta questo protocollo consentono un collegamento sicuro attraverso una chiave condivisa tra i due peer. La connessione viene avviata dalla dApp che visualizza un codice QR con un URI WalletConnect standard e viene stabilita quando l'applicazione wallet approva la richiesta di connessione. Ulteriori richieste relative al trasferimento di fondi sono confermate nell'applicazione del portafoglio stesso.

## Configurare Web3 {#set-up-web3}

Per impostare la tua dApp per connetterti con il Polygon Wallet, puoi utilizzare il provider di WalletConnect per connettersi direttamente a Polygon. Installare quanto segue nella dApp:

```bash
npm install --save @maticnetwork/walletconnect-provider
```

Installare `matic.js`per l'integrazione di Polygon:

```bash
$ npm install @maticnetwork/maticjs
```

E aggiungi il seguente codice nella tua dApp;

```js
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

import Web3 from "web3"
import Matic from "maticjs"
```

Successivamente, configurare il provider Polygon e Ropsten tramite l'oggetto di WalletConnect:

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

Abbiamo creato i due oggetti provider di cui sopra per istanziare il nostro oggetto Web3:

```js
const maticWeb3 = new Web3(maticProvider)
const ropstenWeb3 = new Web3(ropstenProvider)
```

## Instantiating i contratti {#instantiating-contracts}

Una volta che abbiamo il nostro **oggetto web3**, l'istanziazione dei contratti comporta le stesse fasi di Metamask. Assicurati di avere il **contratto ABI** e **di avere** l'indirizzo già in atto.

```js
const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)
```

## Funzioni di chiamata {#calling-functions}

:::info

La chiave privata rimarrà nel wallet dell'utente e **l'app non lo accede in alcun modo**.

:::

Abbiamo due tipi di funzioni in Ethereum, a seconda dell'interazione con la blockchain. Usiamo `call()` quando leggiamo i dati e `send()` quando li scriviamo.

### Chiamata di funzioni `call()` {#functions}

La lettura dei dati non richiede una firma, quindi il codice dovrebbe essere così:

```js
this.myContractInstance.methods
  .myMethod(myParams)
  .call()
  .then (
  // do stuff with returned values
  )
```

### Chiamata di funzioni `send()` {#functions-1}

Poiché la scrittura alla blockchain richiede una firma, invitiamo l'utente sul loro wallet (che supporta WalletConnect) a firmare la transazione.

Questo comporta tre passaggi:
1. Costruire una transazione
2. Ottenere una firma sulla transazione
3. Invio di transazioni firmate

```js
const tx = {
  from: this.account,
  to: myContractAddress,
  gas: 800000,
  data: this.myContractInstance.methods.myMethod(myParams).encodeABI(),
}
```

Il codice precedente crea un oggetto transazione che viene poi inviato al portafoglio dell'utente per la firma:


```js
maticWeb3.eth.signTransaction(tx)
  .then((result) =>{
    maticWeb3.eth.sendSignedTransaction(result)
    .then((receipt) =>
    console.log (receipt)
  )
})
```

`signTransaction()`La funzione richiede l'utente della loro firma e `sendSignedTransaction()`invia la transazione firmata (restituisce una ricevuta di transazione al successo).
