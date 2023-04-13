---
id: installation
title: Installation
keywords:
    - pos client
    - erc20
    - withdrawExit
    - polygon
    - sdk
description: Matic.js und Ethereum-Bibliotheken installieren.
---

Maticjs hat zwei Teile -

1. Hauptbibliothek
2. Ethereum-Bibliothek

### Hauptbibliothek {#main-library}

Die Hauptbibliothek hat die Kernlogik und bietet verschiedene APIs. Mit dieser Bibliothek kommuniziert der Benutzer am meisten.

```
npm i @maticnetwork/maticjs
```

### Ethereum-Bibliothek {#ethereum-library}

Die Ethereum-Bibliothek ermöglicht es, jede beliebige ether-Bibliothek zu verwenden. Sie wird mithilfe von Plugins in die Maticjs eingespeist.

matic.js unterstützt zwei gängige Bibliotheken -

1. [Web3.js](https://web3js.readthedocs.io/)
2. [Ethers](https://docs.ethers.io/)

#### Web3.js {#web3-js}

```
npm install @maticnetwork/maticjs-web3
```

#### Ethers {#ethers}

```
npm install @maticnetwork/maticjs-ethers
```
