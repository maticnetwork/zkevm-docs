---
id: metamask
title: Metamask
description: Costruisci la tua prossima app blockchain su Polygon.
keywords:
  - docs
  - matic
  - polygon
  - wallet
  - metamask
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Metamask è un componente aggiuntivo del browser che gestisce il wallet Ethereum di un utente memorizzando la sua chiave privata nell'archivio dati del browser e la frase di partenza criptata con la sua password. Si tratta di un wallet non custodial, ovvero l'utente ha pieno accesso e responsabilità alla propria chiave privata. Una volta persa, l'utente non può più controllare i risparmi o ripristinare l'accesso al portafoglio.

**Tipo**: Non-custodial/HD <br/>
**Conservazione della chiave privata**: memoria locale del browser dell'utente <br/>
**Comunicazione con il ledger di Ethereum**: Infura <br/>
**Codifica della chiave privata**: Mnemonica <br/>

### 1. Configurare Web3 {#1-set-up-web3}

**Passo 1**

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

> MetaMask inietta un'API globale nei siti web visitati dai suoi utenti all'indirizzo window.ethereum (disponibile anche all'indirizzo window.web3.currentProvider per motivi di legacy). Questa API consente ai siti web di richiedere il login dell'utente, caricare i dati dalle blockchain a cui l'utente è connesso e suggerire all'utente di firmare messaggi e transazioni. Puoi utilizzare questa API per rilevare l'utente di un browser web3.

In termini più semplici, significa che, avendo installato l'estensione/add-on di Metamask nel tuo browser, avrai definito una variabile globale chiamata `ethereum` (`web3` per le versioni precedenti) - utilizzando questa variabile istanziamo il nostro oggetto web3.

**Passo 2**

Ora, nel codice del tuo client, importa il file di cui sopra,
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

Ora per inviare le transazioni (in particolare quelle che modificano lo stato della blockchain) abbiamo bisogno di un account da cui firmare le transazioni:
```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```
La funzione `getAccounts()` restituisce un array di tutti gli account nella metamask dell'utente e `accounts[0]` è quello attualmente selezionato dall'utente.

### 3. Istanzia i contratti {#3-instantiate-your-contracts}

Una volta che abbiamo il nostro oggetto `web3` al suo posto, istanziamo i nostri contratti > Supponendo che tu abbia già l'ABI e l'indirizzo del tuo contratto :)
```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```
### 4. Chiama le funzioni {#4-call-functions}

Ora, per qualsiasi funzione che si voglia chiamare dal contratto, interagiamo direttamente con il nostro oggetto contratto istanziato (che è il `myContractInstance` dichiarato nel passo 2)

Un rapido ripasso: - Le funzioni che modificano lo stato del contratto sono chiamate funzioni `send()` - Le funzioni che non alterano lo stato del contratto si chiamano funzioni `call()`

**Chiamata di funzioni `call()`**
```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```
**Chiamata di funzioni `send()`**
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
