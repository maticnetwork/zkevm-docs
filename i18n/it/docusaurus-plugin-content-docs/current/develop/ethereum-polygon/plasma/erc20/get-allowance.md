---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# getAllowance {#getallowance}

`getAllowance` può essere utilizzato per ottenere l'importo approvato per l'utente.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
