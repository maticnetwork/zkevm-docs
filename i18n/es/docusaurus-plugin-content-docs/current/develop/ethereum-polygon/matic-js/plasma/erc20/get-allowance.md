---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'Obtén la cantidad aprobada para el usuario.'
---

El método `getAllowance` puede utilizarse para obtener la cantidad aprobada para el usuario.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
