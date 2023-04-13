---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

# isExited {#isexited}

Es wird geprüft, ob eine Auszahlung beendet wurde. `isExited`Das Ergebnis ist der Boolesche Wert.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
