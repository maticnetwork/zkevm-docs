---
id: index
title: POSClient
keywords:
    - pos client
    - erc20
    - contract
    - polygon
    - sdk
description: "Fornisce un metodo per interagire con un token ERC20."
---

# ERC20 {#erc20}

`POSClient` fornisce il metodo `erc20` che consente di interagire con un token **ERC20**.

Il metodo restituisce un oggetto che ha svariati altri metodi.

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

Specificare i secondi argomenti per `isRoot` è facoltativo.

## Token figlio {#child-token}

Il token su polygon può essere avviato tramite questa sintassi -

```
const childERC20Token = posClient.erc20(<child token address>);
```

## Token padre {#parent-token}

Il token su ethereum può essere avviato impostando il valore del secondo parametro su `true`.

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
