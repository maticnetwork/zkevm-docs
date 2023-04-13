---
id: metamask
title: Metamask
description: Erstelle die nächste Blockchain-App auf Polygon.
keywords:
  - docs
  - matic
  - polygon
  - wallet
  - metamask
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Metamask ist Browser-Add-on, das die Ethereum Wallet eines Benutzers verwaltet, indem es seinen Private Key im Datenspeicher des Browsers ablegt und die Seed-Phrase mit seinem Passwort verschlüsselt. Es ist eine nicht-verwahrende Wallet, was bedeutet, dass der Benutzer voll auf den Private Key zugreifen kann und für diesen verantwortlich ist. Falls ihn der Benutzer verliert, kann er nicht mehr auf seine Einlagen zugreifen und den Zugriff auf die Wallet nicht wiederherstellen.

**Typ**: Nicht-Verwahrend/HD <br/>
**Speicherung des Private Keys**: Lokaler Browser-Speicher des Benutzers<br/>
**Kommunikation mit Ethereum Ledger**: Infura <br/>
**Codierung des Private Keys**: Mnemonik<br/>

### 1. Web3 einrichten {#1-set-up-web3}

**Schritt 1**

Installiere Folgendes in deiner dApp:
  ```javascript
  npm install --save web3
  ```
Eine neue Datei mit dem Namen `web3.js`erstellen und den folgenden Code benutzen:

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

Die oben stehende Datei exportiert eine Funktion namens.`getWeb3()` die den Zugriff auf das Metamask-Konto über die Erkennung eines globalen Objekts (o`ethereum`der) d`web3`as von Metamask eingebunden wurde, anfordern soll.

Laut der [API-Dokumentation von Metamask](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes):

> MetaMask integriert eine globale API in Websites, die von seinen Nutzern unter window.ethereum besucht werden (auch unter window.web3.currentProvider abrufbar aus historischen Gründen). Diese API ermöglicht es Websites, die Logindaten von Blockchains anzufordern, mit denen der Benutzer verbunden ist, und empfiehlt Benutzern Nachrichten und Transaktionen zu signieren. Mithilfe dieser API kannst du den Benutzer eines Web3-Browsers ermitteln.

Einfacher ausgedrückt bedeutet dies, dass du, wenn du die Metamask-Erweiterung in deinem Browser installiert hast, eine globale Variable mit dem Namen `ethereum`(f`web3`ür ältere Versionen) festlegen musst, mit dieser Variable erstellen wir unser web3-Objekt.

**Schritt 2**

Importiere jetzt die oben stehende Datei in deinem Client-Code
```js
  import getWeb3 from '/path/to/web3';
```
Und rufen die Funktion auf:
```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```
### 2. Konto einrichten {#2-set-up-account}

Um Transaktionen zu senden (insbesondere diejenigen, die den Status der Blockchain ändern) muss ein Konto diese Transaktionen über die Instanz „Wir erstellen unseren contract“ aus dem oben erstellten web3-Objekt signieren:
```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```
Die `getAccounts()`-Funktion gibt ein Spektrum aller Konten in der Metamaske des Benutzers zurück, und `accounts[0]`ist das derzeit vom Benutzer ausgewählte Konto.

### 3. Contract erstellen {#3-instantiate-your-contracts}

Sobald unser `web3`-Objekt bereit ist, erstellen wir unsere contracts > Vorausgesetzt, dass die ABI Ihres contracts und Ihre Adresse vorhanden sind :)
```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```
### 4. Funktionsaufruf {#4-call-functions}

Für jede Funktion, die du von deinem Contract aufrufen möchtest, greifen wir nun direkt auf unser installiertes Contract-Objekt zu (`myContractInstance`das in Schritt 2 festgelegt wurde)

Kurzzusammenfassung: – Funktionen, die den Status des contracts ändern, werden `send()`-Funktionen genannt – Funktionen, die den Status des contracts nicht ändern, werden als `call()`-Funktionen bezeichnet

**Funktionsaufrufe `call()`**
```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```
**Funktionsaufrufe `send()`**
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
