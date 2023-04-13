---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

# getTokensCount {#gettokenscount}

Die `getTokensCount`-Methode retourniert die Tokenanzahl des angegebenen Benutzers.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
