---
id: is-approved
title: isApproved
keywords:
- 'pos client, erc721, isApproved, polygon, sdk'
description: 'Überprüfen, ob ein Token für eine angegebene TokenID genehmigt ist.'
---

Die `isApproved`-Methode prüft, ob der Token für die angegebene TokenID genehmigt ist. Das Ergebnis ist der Boolesche Wert.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
