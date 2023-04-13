---
id: is-exited-many
title: isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'Überprüft, ob eine Auszahlung beendet wurde.'
---

Die `isExitedMany`-Methode prüft, ob eine Auszahlung beendet wurde. Das Ergebnis ist der Boolesche Wert.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
