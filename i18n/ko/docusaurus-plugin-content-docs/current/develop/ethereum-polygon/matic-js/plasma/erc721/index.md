---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc721, contract, polygon, sdk'
description: 'ERC721 토큰과 상호작용하는 ''ERC721'' 메서드를 제공합니다.'
---

# ERC721 {#erc721}

`plasmaClient`는 ERC721 토큰과 상호작용할 수 있는 `erc721` 메서드를 제공합니다.

이 메서드는 다양한 메서드를 가지는 객체를 반환합니다.

```
const erc721token = plasmaClient.erc721(<token address>,<isRoot>);
```

## 하위 토큰 {#child-token}

Polygon의 토큰은 이 구문을 사용해 시작할 수 있습니다.

```
const childERC20Token = plasmaClient.erc721(<child token address>);
```

## 상위 토큰 {#parent-token}

두 번째 매개변수 값을 `true`로 제공하여 이더리움상의 토큰을 시작할 수 있습니다.

```
const parentERC20Token = plasmaClient.erc721(<parent token address>, true);
```
