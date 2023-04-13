---
id: withdraw-exit
title: i-withdraw ang pag-exit
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Magsimula sa maticjs '
---

# withdrawExit  {#withdrawexit}

Maaaring gamitin ang paraang `withdrawExit`upang lumabas sa proseso ng pag-withdraw kapag nakumpleto na ang panahon ng hamon.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
