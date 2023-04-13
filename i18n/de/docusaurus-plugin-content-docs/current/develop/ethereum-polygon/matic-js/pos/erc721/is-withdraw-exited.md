---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc721, isWithdrawExited, polygon, sdk'
description: 'Überprüfen, ob eine Auszahlung beendet wurde.'
---

Die `isWithdrawExited`-Methode prüft, ob eine Auszahlung beendet wurde. Das Ergebnis ist der Boolesche Wert.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
