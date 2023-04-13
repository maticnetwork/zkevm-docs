---
id: get-started
title: Bắt đầu
keywords:
  - maticjs
  - introduction
  - contract
  - polygon
  - sdk
description: Bắt đầu với Matic.js
---

`@matic.js` là một thư viện javascript giúp tương tác với các thành phần khác nhau của Mạng lưới Matic.

Trong hướng dẫn Bắt đầu này - chúng ta sẽ tìm hiểu về cách chúng ta có thể thiết lập và tương tác với cầu nối POS.

## Cài đặt {#installation}

**Cài đặt gói maticjs qua npm:**

```bash
npm install @maticnetwork/maticjs
```

**Cài đặt plugin web3js**

```bash
npm install @maticnetwork/maticjs-web3
```

## Thiết lập {#setup}

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Trong đoạn mã trên, chúng ta đang khởi tạo maticjs bằng `web3js` nhưng bạn cũng có thể khởi tạo tương tự với [ethers](/docs/develop/ethereum-polygon/matic-js/setup/ethers).

## Máy khách POS {#pos-client}

`POSClient` giúp chúng tôi tương tác với Cầu nối POS.

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

Sau khi `POSClient` được khởi tạo, chúng ta cần khởi tạo các loại token bắt buộc như - `erc20`, `erc721` v.v.

Hãy khởi tạo `erc20` -

### erc20 {#erc20}

**tạo token con erc20**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**tạo token mẹ erc20**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

Khi erc20 được khởi tạo, bạn có thể gọi các phương thức khác nhau có sẵn, như - `getBalance`, `approve`, `deposit` , `withdraw` v.v.

Hãy xem một số ví dụ về API -

#### lấy số dư {#get-balance}

```
const balance = await erc20ChildToken.getBalance(<userAddress>)
console.log('balance', balance)
```

#### phê duyệt {#approve}

```
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

// get transaction hash
const txHash = await approveResult.getTransactionHash();

// get transaction receipt
const txReceipt = await approveResult.getReceipt();
```


Như bạn có thể thấy, với các API đơn giản của nó, maticjs giúp bạn tương tác với cầu nối maticjs rất dễ dàng. **Hãy bắt đầu với việc tạo ra thứ gì đó tuyệt vời**

### Liên kết hữu dụng {#useful-links}

- [Ví dụ](https://github.com/maticnetwork/matic.js/tree/master/examples)
