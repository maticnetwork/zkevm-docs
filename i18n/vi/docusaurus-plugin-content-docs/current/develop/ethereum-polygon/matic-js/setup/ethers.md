---
id: ethers
title: 'Thiết lập Ethers'
keywords:
  - pos client
  - erc20
  - withdrawExit
  - polygon
  - sdk
description: 'Cài đặt và thiết lập ethers.js'
---

# Ether.js {#ether-js}

Thư viện [ethers.js](https://docs.ethers.io/) được thiết kế để trở thành thư viện hoàn chỉnh và nhỏ gọn cho phép tương tác với Ethereum Blockchain và hệ sinh thái.

## Thiết lập ether.js {#setup-ether-js}

ether.js được hỗ trợ thông qua gói riêng lẻ dưới dạng trình bổ trợ cho matic.js.

### Cài đặt {#installation}

```
npm install @maticnetwork/maticjs-ethers

```

### thiết lập {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

Hãy cùng xem một ví dụ về tạo `POSClient` bằng cách sử dụng ethers -

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'
import { providers, Wallet } from "ethers";


// install web3 plugin
use(Web3ClientPlugin);

const parentProvider = new providers.JsonRpcProvider(rpc.parent);
const childProvider = new providers.JsonRpcProvider(rpc.child);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new Wallet(privateKey, parentProvider),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new Wallet(privateKey, childProvider),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

## Ví dụ {#examples}

Ví dụ về các trường hợp khác nhau có trong [kho lưu trữ trình bổ trợ ethers](https://github.com/maticnetwork/maticjs-ethers).
