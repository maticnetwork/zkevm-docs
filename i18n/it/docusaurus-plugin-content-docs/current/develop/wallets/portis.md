---
id: portis
title: Portis
description: Un wallet basato sul web, costruito tenendo conto della facilità di accesso da parte dell'utente.
keywords:
  - wiki
  - polygon
  - wallet
  - portis
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Portis è un wallet basato sul web, costruito tenendo conto della facilità di accesso da parte degli utenti. Viene fornito con un SDK javascript che si integra nella dApp e crea un'esperienza locale senza wallet per l'utente. Inoltre, si occupa di impostare il wallet, le transazioni e le gas fee.

Come Metamask, è un sistema non-custodial: gli utenti controllano le loro chiavi, Portis si limita a conservarle in modo sicuro. Ma, a differenza di Metamask, è integrato nell'applicazione e non nel browser. Gli utenti hanno le loro chiavi associate ai loro id e password di accesso.

**Tipo**: Non-custodial/HD <br/>
**Storaggio delle chiavi private**: crittografato e memorizzato sui server Portis<br/> **Comunicazione a Ethereum Ledger**: Definita dallo sviluppatore<br/> **Codifica della chiave privata**: mnemonica <br/>

## Configurare Web3 {#set-up-web3}

Installare Portis nella tua dApp:

```js
npm install --save @portis/web3
```

Ora registrate la vostra dApp con Portis per ottenere un dApp ID utilizzando la [Dashboard di Portis](https://dashboard.portis.io/).

Importazione `portis`e `web3`oggetti:

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```

Portis constructor prende la prima argomentazione come dApp ID e la seconda argomentazione come la rete con cui si desidera connettersi. Può essere una stringa o un oggetto.

```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```

## Configurare l'account {#set-up-account}

Se l'installazione e l'istanziazione di web3 sono andate a buon fine, la seguente procedura dovrebbe restituire l'account collegato:

```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```

## Instantiating i contratti {#instantiating-contracts}

Ecco come dovremmo stabilire i contratti:

```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

## Funzioni di chiamata {#calling-functions}

### `call()`Funzione di chiamata {#function}

```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```

### `send()`Funzione di chiamata {#function-1}
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```
