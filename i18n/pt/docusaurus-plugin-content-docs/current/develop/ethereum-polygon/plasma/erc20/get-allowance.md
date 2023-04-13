---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'Introdução ao maticjs'
---

# getAllowance {#getallowance}

O método `getAllowance` pode ser usado para obter o valor aprovado para o utilizador.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
