---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'Überprüft, ob eine Auszahlung beendet wurde.'
---

Die `isExited`-Methode prüft, ob eine Auszahlung beendet wurde. Das Ergebnis ist der Boolesche Wert.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
