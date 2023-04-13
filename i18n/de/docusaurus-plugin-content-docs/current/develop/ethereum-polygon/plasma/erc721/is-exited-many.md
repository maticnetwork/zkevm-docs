---
id: is-exited-many
title: isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

# isExitedMany {#isexitedmany}

Damit `isExitedMany`wird geprüft, ob eine Auszahlung beendet wurde. Das Ergebnis ist der Boolesche Wert.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
