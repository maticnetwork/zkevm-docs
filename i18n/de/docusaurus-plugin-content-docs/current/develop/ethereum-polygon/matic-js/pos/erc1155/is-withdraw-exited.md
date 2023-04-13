---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc1155, isWithdrawExited, polygon, sdk'
description: 'Überprüft, ob eine Auszahlung beendet wurde.'
---

Die `isWithdrawExited`-Methode prüft, ob eine Auszahlung beendet wurde. Das Ergebnis ist der Boolesche Wert.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExited(<exit tx hash>);

```
