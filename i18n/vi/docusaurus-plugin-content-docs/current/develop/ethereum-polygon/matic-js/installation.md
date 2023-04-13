---
id: installation
title: Cài đặt
keywords:
    - pos client
    - erc20
    - withdrawExit
    - polygon
    - sdk
description: Cài đặt thư viện Matic.js và Ethereum.
---

maticjs có hai phần -

1. Thư viện chính
2. Thư viện Ethereum

### Thư viện chính {#main-library}

Thư viện chính có logic lõi và cung cấp các API khác nhau. Người dùng tương tác chủ yếu với thư viện này.

```
npm i @maticnetwork/maticjs
```

### Thư viện Ethereum {#ethereum-library}

Thư viện Ethereum cho phép chúng tôi sử dụng bất kỳ thư viện ether yêu thích nào. Nó được đưa vào maticjs bằng các plugin.

matic.js hỗ trợ hai thư viện phổ biến -

1. [Web3.js](https://web3js.readthedocs.io/)
2. [Ethers](https://docs.ethers.io/)

#### Web3.js {#web3-js}

```
npm install @maticnetwork/maticjs-web3
```

#### ethers {#ethers}

```
npm install @maticnetwork/maticjs-ethers
```
