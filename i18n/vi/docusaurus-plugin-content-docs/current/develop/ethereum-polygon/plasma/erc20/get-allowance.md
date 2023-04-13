---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# getAllowance {#getallowance}

Có thể sử dụng phương pháp `getAllowance` để lấy số lượng được phê duyệt cho người dùng.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
