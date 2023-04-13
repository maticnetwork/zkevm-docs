---
id: installation
title: การติดตั้ง
keywords:
    - pos client
    - erc20
    - withdrawExit
    - polygon
    - sdk
description: ติดตั้งไลบรารี Matic.js และ Ethereum
---

maticjs มีอยู่สองส่วน ได้แก่

1. ไลบรารีหลัก
2. ไลบรารี Ethereum

### ไลบรารีหลัก {#main-library}

ไลบรารีหลักมีลอจิกหลัก และให้ API ที่แตกต่างกันผู้ใช้โต้ตอบกับไลบรารีนี้เป็นส่วนใหญ่

```
npm i @maticnetwork/maticjs
```

### ไลบรารี Ethereum {#ethereum-library}

ไลบรารี Ethereum อนุญาตให้เราใช้ ไลบรารี Ether โปรดใดๆ ก็ได้โดยจะใส่ลงใน maticjs โดยใช้ปลั๊กอิน

matic.js รองรับสองไลบรารียอดนิยม ได้แก่

1. [Web3.js](https://web3js.readthedocs.io/)
2. [Ether](https://docs.ethers.io/)

#### Web3.js {#web3-js}

```
npm install @maticnetwork/maticjs-web3
```

#### Ether {#ethers}

```
npm install @maticnetwork/maticjs-ethers
```
