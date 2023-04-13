---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc20, contract, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# ERC20 {#erc20}

`plasmaClient`, erc20 token'ları ile etkileşim kurmanıza yardımcı olan `erc20` metodunu sağlar.

## Alt token {#child-token}

```
const childERC20Token = plasmaClient.erc20(<child token address>);
```

## Kök token {#root-token}

Kök token, ikinci parametre değeri `true` olarak belirlenerek başlatılabilir.

```
const parentERC20Token = plasmaClient.erc20(<root token address>, true);
```
