---
id: index
title: PlasmaClient
keywords:
- 'maticjs, plasma client, contract, polygon, sdk'
description: 'PlasmaClient cho phép bạn tương tác với Cầu nối POS.'
---

# Cầu nối Plasma {#plasma-bridge}

Chức năng cầu nối Plasma có sẵn trong [kho lưu trữ riêng lẻ](https://github.com/maticnetwork/maticjs-plasma). Vì vậy để sử dụng cầu nối `plasma`, bạn cần cài đặt gói riêng lẻ.

## Cài đặt {#installation}

```
npm i @maticnetwork/maticjs-plasma
```

## Thiết lập {#setup}

Có thể sử dụng `PlasmaClient` để tương tác với Cầu nối **Plasma**.

```
import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
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

Khi đã khởi tạo `plasmaClient`, bạn có thể tương tác với tất cả APIS hiện có.
