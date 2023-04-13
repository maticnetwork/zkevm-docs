---
id: approve
title: pag-apruba
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'Pagsisimula sa maticjs'
---

# pag-apruba {#approve}

Maaaring gamitin ang paraang `approve` upang aprubahan ang kinakailangang halaga sa root token.

Kinakailangan ang approve upang makapagdeposito ng halaga sa polygon chain.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
