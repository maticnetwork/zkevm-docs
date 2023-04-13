---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'Recupera l''importo approvato per l''utente.'
---

Il metodo `getAllowance` può essere utilizzato per recuperare l'importo approvato per l'utente.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
