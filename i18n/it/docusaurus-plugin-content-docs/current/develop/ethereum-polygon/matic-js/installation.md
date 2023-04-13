---
id: installation
title: Installazione
keywords:
    - pos client
    - erc20
    - withdrawExit
    - polygon
    - sdk
description: Installa le librerie Matic.js ed Ethereum.
---

maticjs ha due componenti:

1. Libreria principale
2. Libreria Ethereum

### Libreria principale {#main-library}

La libreria principale ha la logica di base e fornisce diverse API. L'utente interagisce principalmente con questa libreria.

```
npm i @maticnetwork/maticjs
```

### Libreria Ethereum {#ethereum-library}

La libreria Ethereum ci consente di utilizzare qualsiasi libreria ether da noi preferita. Viene iniettata in maticjs utilizzando i plug-in.

matic.js supporta due librerie popolari:

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
