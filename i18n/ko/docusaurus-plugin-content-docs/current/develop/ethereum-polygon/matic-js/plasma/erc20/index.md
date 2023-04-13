---
id: index
title: PlasmaClient
keywords:
- 'plasma client, erc20, contract, polygon, sdk'
description: 'ERC20 토큰과 상호작용할 수 있는 메서드를 제공합니다.'
---

`plasmaClient`는 ERC20 토큰과 상호작용할 수 있는 `erc20` 메서드를 제공합니다.

## 하위 토큰 {#child-token}

```
const childERC20Token = plasmaClient.erc20(<child token address>);
```

## 루트 토큰 {#root-token}

두 번째 매개변수 값을 `true`로 제공하여 루트 토큰을 시작할 수 있습니다.

```
const parentERC20Token = plasmaClient.erc20(<root token address>, true);
```
