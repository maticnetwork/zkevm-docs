---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc1155, isWithdrawExitedMany, polygon, sdk'
description: 'Überprüft, ob die Auszahlung für mehrere Token beendet wurde.'
---

`isWithdrawExitedMany` Methode überprüft, ob die Auszahlung für mehrere Token beendet wurde. Sie liefert einen booleschen Wert.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExitedMany(<exit tx hash>);

```
