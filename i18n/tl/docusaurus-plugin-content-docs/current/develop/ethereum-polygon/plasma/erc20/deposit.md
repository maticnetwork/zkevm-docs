---
id: deposit
title: ideposito
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: 'Magsimula sa maticjs'
---

# ideposito {#deposit}

Ang `deposit` method ay pwedeng gamitin para ideposito ang kinakailangang halaga mula sa root token papunta sa child token.

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
