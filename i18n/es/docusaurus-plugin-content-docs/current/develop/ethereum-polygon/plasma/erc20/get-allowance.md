---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'Empieza con Matic.js'
---

# getAllowance {#getallowance}

El método `getAllowance` se puede utilizar para obtener el monto aprobado para el usuario.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
