---
id: index
title: POSClient
keywords:
- 'pos client, erc721, contract, polygon, sdk'
description: 'Metodo `ERC721`, che consente di interagire con un token ERC721.'
---

# ERC721 {#erc721}

`POSClient` fornisce un metodo `erc721` che permette di interagire con un token ERC721.

Il metodo restituisce un oggetto che ha vari metodi.

```
const erc721token = posClient.erc721(<token address>,<isRoot>);
```

Specificare i secondi argomenti per `isRoot` è facoltativo.

## Token figlio {#child-token}

Il token su polygon può essere avviato tramite questa sintassi -

```
const childERC20Token = posClient.erc721(<child token address>);
```

## Token genitore {#parent-token}

Il token su ethereum può essere avviato fornendo un secondo valore di parametro come `true`.

```
const parentERC20Token = posClient.erc721(<parent token address>, true);
```
