---
id: web3
title: 'Thiết lập Web3js'
keywords:
 - pos client
 - erc20
 - withdrawExit
 - polygon
 - sdk
description: 'Cài đặt và thiết lập web3.js.'
---

# Web3.js {#web3-js}

[web3.js](https://web3js.readthedocs.io/) là bộ sưu tập các thư viện cho phép bạn tương tác với một nút ethereum cục bộ hoặc từ xa bằng HTTP, IPC hoặc WebSocket.

## Thiết lập web3.js {#setup-web3-js}

Có sẵn hỗ trợ web3.js thông qua gói riêng lẻ dưới dạng trình bổ trợ cho matic.js.

### Cài đặt {#installation}

```
npm install @maticnetwork/maticjs-web3

```

### thiết lập {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Hãy cùng xem một ví dụ về tạo `POSClient` bằng web3 -

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider(privateKey, mainRPC),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, childRPC),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

## Ví dụ {#examples}

Ví dụ về các trường hợp khác nhau có sẵn trong [kho lưu trữ trình bổ trợ web3](https://github.com/maticnetwork/maticjs-web3)
