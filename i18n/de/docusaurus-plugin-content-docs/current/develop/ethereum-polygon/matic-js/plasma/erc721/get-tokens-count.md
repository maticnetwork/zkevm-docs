---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'Liefert die Tokenanzahl für einen bestimmten Benutzer'
---

Die `getTokensCount`-Methode liefert die Tokenanzahl für einen bestimmten Benutzer.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
