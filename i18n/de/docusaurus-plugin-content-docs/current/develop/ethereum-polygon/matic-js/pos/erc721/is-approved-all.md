---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc721, isApprovedAll, polygon, sdk'
description: 'Überprüft, ob alle Token genehmigt sind.'
---

Die `isApprovedAll`-Methode prüft, ob alle Token genehmigt sind. Das Ergebnis ist der Boolesche Wert.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
