---
id: installation
title: Установка
keywords:
    - pos client
    - erc20
    - withdrawExit
    - polygon
    - sdk
description: Установите библиотеки Matic.js и Ethereum.
---

maticjs состоит из двух частей:

1. Основная библиотека
2. Библиотека Ethereum

### Основная библиотека {#main-library}

Основная библиотека имеет логику ядра и предоставляет различные API. Пользователь взаимодействует преимущественно с этой библиотекой.

```
npm i @maticnetwork/maticjs
```

### Библиотека Ethereum {#ethereum-library}

Библиотека Ethereum позволяет использовать любую любимую библиотеку ether. Она внедряется в maticjs с помощью плагинов.

matic.js поддерживает две популярные библиотеки:

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
