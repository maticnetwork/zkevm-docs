---
id: index
title: POSClient
keywords:
- 'pos client, erc1155, contract, polygon, sdk'
description: 'Interagisce con il token ERC1155 usando matic.js.'
---

# ERC1155 {#erc1155}

`POSClient` fornisce il metodo `erc1155` che consente di interagire con un token erc1155.

Il metodo restituisce istanze della classe **ERC1155** che contiene diversi metodi.

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

Specificare i secondi argomenti per `isRoot` è facoltativo.

## Token figlio {#child-token}

Il token su polygon può essere avviato tramite questa sintassi -

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## Token genitore {#parent-token}

Il token su ethereum può essere avviato fornendo un secondo valore di parametro come `true`.

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
