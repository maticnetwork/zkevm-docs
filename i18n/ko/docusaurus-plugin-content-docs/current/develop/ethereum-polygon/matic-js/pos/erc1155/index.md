---
id: index
title: POSClient
keywords:
- 'pos client, erc1155, contract, polygon, sdk'
description: 'Matic.js를 사용해 ERC1155 토큰과 상호작용합니다.'
---

# ERC1155 {#erc1155}

`POSClient`는 ERC1155 토큰과 상호작용하도록 도와주는 `erc1155` 메서드를 제공합니다.

이 메서드는 여러 메서드를 포함하는 **ERC1155** 클래스의 인스턴스를 반환합니다.

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

`isRoot`의 두 번째 인수를 전달하는 것은 선택 사항입니다.

## 하위 토큰 {#child-token}

Polygon의 토큰은 이 구문을 사용해 시작할 수 있습니다.

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## 상위 토큰 {#parent-token}

두 번째 매개변수 값을 `true`로 제공하여 이더리움상의 토큰을 시작할 수 있습니다.

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
