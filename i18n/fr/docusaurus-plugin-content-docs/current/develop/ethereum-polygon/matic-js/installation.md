---
id: installation
title: Installation
keywords:
    - pos client
    - erc20
    - withdrawExit
    - polygon
    - sdk
description: Installer les bibliothèques Matic.js et Ethereum.
---

maticjs dispose de deux parties -

1. La bibliothèque principale
2. La bibliothèque Ethereum

### La bibliothèque principale {#main-library}

La bibliothèque Principale possède la logique de base et fournit différentes API. L'utilisateur interagit principalement avec cette bibliothèque.

```
npm i @maticnetwork/maticjs
```

### La bibliothèque Ethereum {#ethereum-library}

La bibliothèque Ethereum nous permet d'utiliser n'importe quelle bibliothèque Ether préférée. Elle est injectée dans maticjs à l'aide de plugins.

matic.js prend en charge deux bibliothèques populaires -

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
