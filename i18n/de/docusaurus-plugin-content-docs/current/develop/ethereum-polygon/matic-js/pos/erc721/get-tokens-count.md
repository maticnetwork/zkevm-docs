---
id: get-tokens-count
title: getTokensCount
keywords:
- 'pos client, erc721, getTokensCount, polygon, sdk'
description: 'Tokenanzahl für den angegebenen Benutzer erhalten.'
---

Die `getTokensCount`-Methode liefert die Tokenanzahl des angegebenen Benutzers.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
