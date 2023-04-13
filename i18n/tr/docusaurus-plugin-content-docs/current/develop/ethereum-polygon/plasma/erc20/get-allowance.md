---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# getAllowance {#getallowance}

`getAllowance` metodu, kullanıcı adına onaylanan miktarı almak için kullanılabilir.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
