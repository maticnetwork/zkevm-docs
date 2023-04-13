---
id: index
title: POSClient
keywords:
- 'pos client, erc1155, contract, polygon, sdk'
description: 'Interagir com o token ERC-1155 usando matic.js.'
---

# ERC1155 {#erc1155}

`POSClient` fornece o método `erc1155`, que ajuda a interagir com um token ERC-1155.

O método retorna a instância da classe **ERC-1155** que contém métodos diferentes.

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

A passagem de segundos argumentos para `isRoot` é opcional.

## Token filho {#child-token}

O token na Polygon pode ser iniciado pelo uso desta sintaxe -

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## Token pai {#parent-token}

Tokens na Ethereum podem ser iniciados fornecendo um segundo valor de parâmetro como `true`.

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
