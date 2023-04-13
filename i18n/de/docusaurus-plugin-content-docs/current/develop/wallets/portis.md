---
id: portis
title: Portis
description: Eine webbasierte Wallet für einfaches Benutzer-Onboarding.
keywords:
  - wiki
  - polygon
  - wallet
  - portis
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Portis ist eine webbasierte Wallet für ein unkompliziertes Benutzer-Onboarding. Es enthält ein Javascript-SDK, das sich in die DApp integriert und dem Nutzer ein lokales, walletloses Erlebnis bietet. Außerdem kümmert es sich um die Einrichtung der Wallet, Transaktionen und Gasgebühren.

Im Gegensatz zu Metamask ist es nicht-verwahrender Natur – Benutzer kontrollieren ihre Schlüssel, während Portis sie nur sicher speichert. Im Gegensatz zu Metamask ist es in App und nicht den Browser integriert. Die Schlüssel der Benutzer sind mit ihrer Login-ID und ihren Passwörtern verbunden.

**Typ**: Nicht-Verwahrend/HD <br/>
**Private Key Storage**: Verschlüsselt und auf Portis gespeichert<br/> **Kommunikation an Ethereum Ledger**: Definiert vom Entwickler<br/> **Codierung des Private Keys**: Mnemonik<br/>

## Web3 einrichten {#set-up-web3}

Installiere Portis in deiner dApp:

```js
npm install --save @portis/web3
```

Registriere deine dApp jetzt bei Portis, um eine dApp ID mit dem [Portis Dashboard](https://dashboard.portis.io/) zu erhalten.

Import `portis`und `web3`Objekte:

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```

Portis constructor nimmt das erste Argument als dApp ID und das zweite Argument als das Netzwerk, mit dem du dich verbinden möchtest. Das kann entweder ein String oder ein Objekt sein.

```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```

## Konto einrichten {#set-up-account}

Wenn die Installation und Neuerstellung von web3 erfolgreich waren, sollte das verbundene Konto erfolgreich angezeigt werden:

```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```

## Instantiating Contracts {#instantiating-contracts}

So sollten wir Verträge instantiieren:

```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

## Calling Functions {#calling-functions}

### Calling `call()`Function {#function}

```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```

### Calling `send()`Function {#function-1}
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```
