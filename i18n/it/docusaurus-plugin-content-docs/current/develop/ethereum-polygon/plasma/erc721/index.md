---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc721, contract, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# ERC721 {#erc721}

`plasmaClient` fornisce un metodo `erc721` che permette di interagire con un token ERC721.

Il metodo restituisce un oggetto che possiede vari metodi.

```
const erc721token = plasmaClient.erc721(<token address>,<isRoot>);
```

## Token figlio {#child-token}

Il token su polygon può essere avviato tramite questa sintassi -

```
const childERC20Token = plasmaClient.erc721(<child token address>);
```

## Token genitore {#parent-token}

Il token su ethereum può essere avviato fornendo un secondo valore di parametro come `true`.

```
const parentERC20Token = plasmaClient.erc721(<parent token address>, true);
```
