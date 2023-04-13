---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc721, contract, polygon, sdk'
description: 'Introdução ao maticjs'
---

# ERC-721 {#erc721}

`plasmaClient` fornece o método `erc721` que o ajuda a interagir com um token ERC-721.

O método retorna um objeto que tem vários métodos.

```
const erc721token = plasmaClient.erc721(<token address>,<isRoot>);
```

## Token filho {#child-token}

O token na Polygon pode ser iniciado pelo uso desta sintaxe -

```
const childERC20Token = plasmaClient.erc721(<child token address>);
```

## Token pai {#parent-token}

Tokens na Ethereum podem ser iniciados fornecendo um segundo valor de parâmetro como `true`.

```
const parentERC20Token = plasmaClient.erc721(<parent token address>, true);
```
