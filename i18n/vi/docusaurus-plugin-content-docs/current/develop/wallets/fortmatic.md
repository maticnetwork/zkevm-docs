---
id: fortmatic
title: Fortmatic
description: Sử dụng Formatic SDK để tích hợp dApp của bạn bằng Polygon
keywords:
  - wiki
  - polygon
  - fortmatic
  - integrate
  - dapp
  - sdk
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Fortmatic SDK cho phép bạn dễ dàng tích hợp dApp của bạn với blockchain Ethereum, dù bạn đã có một dApp được tích hợp với Web3 hoặc đang bắt đầu từ gước. Fortmatic cung cấp một trải nghiệm trơn truvà thú vị cho cả bạn và người dùng ứng dụng bị phát triển.

## Cài đặt {#installation}

Sử dụng lệnh sau để cài đặt ví của Fortmatic:

```bash
$ npm i --save fortmatic@latest
```

## Ví dụ {#example}
Dưới đây là một ví dụ về ứng dụng bằng Fortmatic:

```js title="example.js"
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

const customNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.matic.today', // your own node url
    chainId: 80001 // chainId of your own node
}

// Setting network to localhost blockchain
const fm = new Fortmatic('YOUR_TEST_API_KEY', customNodeOptions);
window.web3 = new Web3(fm.getProvider());
```
