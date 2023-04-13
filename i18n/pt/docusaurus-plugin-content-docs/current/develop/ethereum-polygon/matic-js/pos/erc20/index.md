---
id: index
title: POSClient
keywords:
    - pos client
    - erc20
    - contract
    - polygon
    - sdk
description: "Fornece um método para interagir com um token ERC-20."
---

# ERC-20 {#erc20}

`POSClient` fornece o método `erc20`, que ajuda a interagir com um token **ERC-20**.

O método retorna um objeto que tem outros métodos diferentes.

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

A passagem de segundos argumentos para `isRoot` é opcional.

## Token filho {#child-token}

O token na Polygon pode ser iniciado pelo uso desta sintaxe -

```
const childERC20Token = posClient.erc20(<child token address>);
```

## Token pai {#parent-token}

O tToken na Ethereum pode ser iniciado ao fornecer o segundo valor de parâmetro como `true`.

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
