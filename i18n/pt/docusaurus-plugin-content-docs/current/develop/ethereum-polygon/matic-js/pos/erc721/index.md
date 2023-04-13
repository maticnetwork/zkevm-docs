---
id: index
title: POSClient
keywords:
- 'pos client, erc721, contract, polygon, sdk'
description: 'Método `ERC721` que o ajuda a interagir com um token ERC-721.'
---

# ERC-721 {#erc721}

`POSClient` fornece o método `erc721` que o ajuda a interagir com um token ERC-721.

O método retorna um objeto que tem vários métodos.

```
const erc721token = posClient.erc721(<token address>,<isRoot>);
```

A passagem de segundos argumentos para `isRoot` é opcional.

## Token filho {#child-token}

O token na Polygon pode ser iniciado pelo uso desta sintaxe -

```
const childERC20Token = posClient.erc721(<child token address>);
```

## Token pai {#parent-token}

Tokens na Ethereum podem ser iniciados fornecendo um segundo valor de parâmetro como `true`.

```
const parentERC20Token = posClient.erc721(<parent token address>, true);
```
