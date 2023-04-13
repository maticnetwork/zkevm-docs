---
id: overview
title: Panoramica di MetaMask
sidebar_label: Overview
description: Come muovere i primi passi con MetaMask su Polygon
keywords:
  - wiki
  - polygon
  - wallet
  - metamask
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[MetaMask](https://metamask.io/) è un wallet di criptovalute che può essere utilizzato in un browser web e su dispositivi mobili per interagire con la blockchain di Ethereum. Ti permette di eseguire le dApp (applicazioni decentralizzate) di Ethereum direttamente nel tuo browser senza dover eseguire un nodo Ethereum completo.

**Tipo**: Non-custodial/HD <br/>
**Conservazione della chiave privata**: memoria locale del browser dell'utente <br/>
**Comunicazione con il ledger di Ethereum**: Infura <br/>
**Codifica della chiave privata**: Mnemonica <br/>

:::warning
Si prega di eseguire il backup della **tua Phrase di recupero segreto.** Se il dispositivo si rompe, è perso, rubato o ha la corruzione dei dati, non c'è altro modo per recuperarlo. Scopri di più **[<ins>Suggerimenti di sicurezza e sicurezza di base per MetaMask</ins>](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)**.
:::

## Guida alla creazione di MetaMask per Polygon {#guide-to-set-up-metamask-for-polygon}

* [Scarica e installa MetaMask](/develop/metamask/tutorial-metamask.md)
* [Configura Polygon su MetaMask](/develop/metamask/config-polygon-on-metamask.md)
* [Configurare token personalizzati](/develop/metamask/custom-tokens.md)
* [Creare e importare gli account](/develop/metamask/multiple-accounts.md)

### 1. Configurare Web3 {#1-set-up-web3}

#### Passo 1 {#step-1}

Installa quanto segue nella dApp:

  ```javascript
  npm install --save web3
  ```

Crea un nuovo file, chiamalo `web3.js` e inserisci il seguente codice:

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

Il file di cui sopra esporta una funzione chiamata `getWeb3()`, il cui scopo è quello di richiedere l'accesso all'account di Metamask attraverso il rilevamento di un oggetto globale (`ethereum`o `web3`) iniettato da Metamask.

Secondo la [documentazione delle API di Metamask](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes):

> MetaMask inetta un'API globale nei siti web visitati dai suoi utenti su window.ethereum. Questa API consente ai siti web di richiedere account Ethereum degli utenti, di leggere i dati dalle blockchains a cui l'utente è connesso e suggerire che i messaggi e le transazioni firmano l'utente. La presenza dell'oggetto provider indica un utente Ethereum.

In termini più semplici, significa che l'estensione / add-on di Metamask, installata nel tuo browser, avresti una variabile globale definita, chiamata `ethereum`( `web3`per le versioni più vecchie) e utilizzando questa variabile we il nostro oggetto web3.

#### Passo 2 {#step-2}

Ora, nel tuo codice client, importare il file di cui sopra:

```js
  import getWeb3 from '/path/to/web3';
```

e chiama la funzione:

```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```

### 2. Configura l'account {#2-set-up-account}

Ora per inviare transazioni (in particolare quelle che alterano lo stato della blockchain) avremo bisogno di un account per firmare queste transazioni. instantiate la nostra istanza di contratto dall'oggetto web3 che abbiamo creato sopra:

```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```

La funzione `getAccounts()` restituisce un array di tutti gli account nella metamask dell'utente e `accounts[0]` è quello attualmente selezionato dall'utente.

### 3. Istanzia i contratti {#3-instantiate-your-contracts}

Una volta che avremo il nostro `web3`oggetto in posizione, instantiate i nostri contratti, supponendo che tu abbia il tuo contratto ABI e che l'indirizzo già in atto:

```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

### 4. Chiama le funzioni {#4-call-functions}

Ora per qualsiasi funzione che vorresti chiamare dal tuo contratto, interagiamo direttamente con il nostro oggetto contratto instantiated (che è `myContractInstance`dichiarato nel Passo 2).

:::tip Una rapida recensione

Le funzioni che alterano lo stato del contratto sono chiamate `send()`funzioni. Le funzioni che non alterano lo stato del contratto sono chiamate `call()`funzioni.

:::

#### Chiamata di funzioni `call()` {#functions}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```

#### Chiamata di funzioni `send()` {#functions-1}

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
