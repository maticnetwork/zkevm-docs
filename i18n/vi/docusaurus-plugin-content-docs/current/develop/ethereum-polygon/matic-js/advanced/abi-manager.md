---
id: abi-manager
title: ABIManager
keywords:
- 'abi manager, api type, read, write, polygon'
description: "Trình quản lý ABI nội bộ của Matic.js."
---

`matic.js` sử dụng `ABIManager` nội bộ để xử lý quản lý ABI, cấu hình cho bạn. Tất cả ABI và cấu hình đều được lấy từ [kho lưu trữ tĩnh](https://github.com/maticnetwork/static).

## Thay đổi ABI {#change-abi}

Đôi lúc bạn được yêu cầu thay đổi ABI, đặc biệt là khi bạn đang lập hợp đồng. Bạn có thể làm như vậy bằng `ABIManager`.

**Cú pháp**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager(<network name>,<version>);
await manager.init();

// set abi

manager.setABI(<contract name>,<bridge type>, <abi value>);

// get abi

manager.getABI(<contract name>,<bridge type>);
```

Tên mạng lưới, tên hợp đồng, tên cầu nối, v.v. có thể được lấy từ [kho lưu trữ tĩnh chính thức](https://github.com/maticnetwork/static/tree/master/network) của chúng tôi.

**Ví dụ**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
```




