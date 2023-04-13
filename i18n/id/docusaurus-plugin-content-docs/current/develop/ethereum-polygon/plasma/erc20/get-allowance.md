---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# getAllowance  {#getallowance}

 Metode `getAllowance` dapat digunakan untuk mendapatkan jumlah yang disetujui bagi pengguna.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
