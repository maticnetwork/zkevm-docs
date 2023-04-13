---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

# isApprovedAll {#isapprovedall}

Damit `isApprovedAll`-wird prüft, ob alle Token genehmigt sind. Das Ergebnis ist der Boolesche Wert.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
