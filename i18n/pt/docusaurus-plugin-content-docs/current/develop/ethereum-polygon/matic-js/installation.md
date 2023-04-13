---
id: installation
title: Instalação
keywords:
    - pos client
    - erc20
    - withdrawExit
    - polygon
    - sdk
description: Instale as bibliotecas Matic.js e Ethereum.
---

O maticjs tem duas partes -

1. Biblioteca principal
2. Biblioteca Ethereum

### Biblioteca principal {#main-library}

A biblioteca principal tem a lógica principal e fornece APIs diferentes. O utilizador interage principalmente com esta biblioteca.

```
npm i @maticnetwork/maticjs
```

### Biblioteca Ethereum {#ethereum-library}

A biblioteca Ethereum permite-nos usar qualquer biblioteca ether favorita. Esta é injetada no maticjs usando plugins.

O matic.js suporta duas bibliotecas populares -

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
