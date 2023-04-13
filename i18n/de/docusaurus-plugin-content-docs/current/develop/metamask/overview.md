---
id: overview
title: Überblick über MetaMask
sidebar_label: Overview
description: Erste Schritte mit MetaMask auf Polygon
keywords:
  - wiki
  - polygon
  - wallet
  - metamask
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[MetaMask](https://metamask.io/) ist ein Krypto-Wallet, die in einem Webbrowser und auf mobilen Geräten verwendet werden kann, um mit der Ethereum-Blockchain zu interagieren. Sie ermöglicht es dir, Ethereum dApps (dezentrale Apps) direkt in deinem Browser auszuführen, ohne einen vollständigen Ethereum-Knoten ausführen zu müssen.

**Typ**: Non-Custodial/HD <br/>
**Speicherung des Private Keys**: Lokaler Browser-Speicher des Benutzers<br/>
**Kommunikation mit Ethereum Ledger**: Infura <br/>
**Codierung des Private Keys**: Mnemonik<br/>

:::warning
Bitte Sichere deine S**ecret Recovery Phrase.** Wenn dein Gerät bricht, verloren geht, gestohlen oder Datenbeschädigung hat, gibt es keinen anderen Weg, es zu wiederherstellen. Der Secret Recovery Phrase ist der einzige Weg, um deine MetaMask wiederherzustellen. Erfahre mehr **[<ins>Basic Safety and Security Tipps für MetaMask</ins>](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)**.
:::

## Leitfaden zur Einrichtung von MetaMask für Polygon {#guide-to-set-up-metamask-for-polygon}

* [MetaMask herunterladen und installieren](/develop/metamask/tutorial-metamask.md)
* [Polygon bei MetaMask konfigurieren](/develop/metamask/config-polygon-on-metamask.md)
* [Benutzerdefinierte Token konfigurieren](/develop/metamask/custom-tokens.md)
* [Konten erstellen und importieren](/develop/metamask/multiple-accounts.md)

### 1. Web3 einrichten {#1-set-up-web3}

#### Schritt 1 {#step-1}

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

> MetaMask injiziert eine globale API in Websites, die von seinen Benutzern auf window.ethereum besucht werden. Diese API ermöglicht es Websites, die Ethereum der Benutzer anzufordern, Daten aus Blockchains zu lesen, mit denen der Benutzer verbunden ist, und deuten darauf hin, dass der Benutzer Nachrichten und Transaktionen unterzeichnet. Die Anwesenheit des of zeigt einen Ethereum an.

In einfacher Worten, bedeutet das, dass du eine globale Variable definiert hast, die genannt wird `ethereum``web3`(für ältere Versionen) und mit dieser Variable instantiate unser web3-Objekt.

#### Schritt 2 {#step-2}

Importiere nun in deinem Client-Code die obige Datei:

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

Um Transaktionen zu senden (speziell diejenigen, die den Zustand der Blockchain ändern) werden wir ein Konto benötigen, um diese Transaktionen zu unterzeichnen. Wir instantiate unsere contract aus dem web3-Objekt, das wir oben erstellt haben:

```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```

Die `getAccounts()`-Funktion gibt ein Spektrum aller Konten in der Metamaske des Benutzers zurück, und `accounts[0]`ist das derzeit vom Benutzer ausgewählte Konto.

### 3. Contract erstellen {#3-instantiate-your-contracts}

Sobald wir unseren `web3`Gegenstand vorhanden haben, werden wir unsere Verträge instantiieren, vorausgesetzt, du hast deinen Vertrag ABI und deine Adresse bereits vorhanden:

```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

### 4. Funktionsaufruf {#4-call-functions}

Für jede Funktion, die du von deinem Vertrag aufrufen möchtest, interagieren wir direkt mit unserem instanziierten Vertragsobjekt (das in Schritt 2 `myContractInstance`deklariert ist).

:::tip Eine schnelle Überprüfung

Funktionen, die den Zustand des Vertrags ändern, werden Funktionen `send()`genannt. Funktionen, die den Zustand des Vertrags nicht ändern, werden Funktionen `call()`genannt.

:::

#### Funktionsaufrufe `call()` {#functions}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```

#### Funktionsaufrufe `send()` {#functions-1}

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
