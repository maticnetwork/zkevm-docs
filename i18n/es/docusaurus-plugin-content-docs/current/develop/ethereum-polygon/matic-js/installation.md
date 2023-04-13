---
id: installation
title: Instalación
keywords:
    - pos client
    - erc20
    - withdrawExit
    - polygon
    - sdk
description: Instala las bibliotecas de Matic.js y Ethereum.
---

maticjs tiene dos partes:

1. Biblioteca principal
2. Biblioteca de Ethereum

### Biblioteca principal {#main-library}

La biblioteca principal tiene la lógica de núcleo y ofrece diferentes API. El usuario interactúa principalmente con esta biblioteca.

```
npm i @maticnetwork/maticjs
```

### Biblioteca de Ethereum {#ethereum-library}

La biblioteca de Ethereum nos permite utilizar cualquier biblioteca de Etherfavorita. Se inyecta en maticjs mediante complementos.

matic.js es compatible con dos bibliotecas populares:

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
