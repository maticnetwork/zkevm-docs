---
id: getting-started
title: Bắt đầu Sử dụng Matic.js
sidebar_label: Instantiating Matic.js
description: "Sử dụng Matic.js để tương tác với chuỗi Polygon PoS."
keywords:
  - docs
  - matic
  - polygon
  - sdk
  - matic.js
  - pos
image: https://matic.network/banners/matic-network-16x9.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Để bắt đầu, hãy kiểm tra [tài liệu Matic.js](/docs/develop/ethereum-polygon/matic-js/get-started) mới nhất.

## Tóm tắt nhanh {#quick-summary}

SDK matic.js sử dụng tất cả công suất tính toán của Polygon và đặt nó ngay trên đầu ngón tay của bạn. Với những chức năng tùy chỉnh cho phép phê duyệt, nạp và rút tiền, tất cả mà không cần làm quá nhiều động tác. Lý do để chúng tôi thiết kế tính năng này là để đảm bảo bạn nhận được giá trị tức thì từ nền tảng của chúng tôi.

## Cài đặt {#installation}
Bước đầu tiên để sử dụng sức mạnh tuyệt vời của Polygon qua SDK của chúng tôi là bằng cách cài đặt NPM. Tìm [tại đây](https://www.npmjs.com/package/@maticnetwork/maticjs).

```bash
npm install @maticnetwork/maticjs
npm install @maticnetwork/maticjs-web3
npm install @maticnetwork/maticjs-ethers
```

## Sử dụng {#usage}
Để truy cập SDK, hãy nhập nó vào ứng dụng của bạn bằng cách sử dụng
```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin)
```

Các nhà cung cấp có thể là URL RPC hoặc nhà cung cấp có trụ sở trên web3 như MetaMask, HDWallettor v. dựa trên yêu cầu.

Để biết thêm thông tin, vui lòng tham khảo [tài liệu Matic.js về PoS](https://maticnetwork.github.io/matic.js/docs/pos/).

```js
// for mumbai testnet
const getPOSClient = (network = 'testnet', version = 'mumbai') => {
  const posClient = new POSClient();

await posClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});
```
