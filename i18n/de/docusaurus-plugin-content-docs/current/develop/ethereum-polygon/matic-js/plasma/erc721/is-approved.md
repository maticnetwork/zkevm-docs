---
id: is-aproved
title: isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'Überprüft, ob ein Token für eine angegebene TokenID genehmigt ist.'
---

`isApproved`-Methode prüft, ob der Token für die angegebene TokenID genehmigt ist. Das Ergebnis ist der Boolesche Wert.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
