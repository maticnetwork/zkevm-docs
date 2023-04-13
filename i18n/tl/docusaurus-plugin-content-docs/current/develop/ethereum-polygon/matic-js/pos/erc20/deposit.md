---
id: deposit
title: ideposito
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Ideposito ang kinakailangang halaga mula sa root token papunta sa child token.'
---

Maaaring gamitin ang paraang `deposit` upang ideposito ang kinakailangang halaga mula sa root token papunta sa child token.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Maaaring tumagal nang ilang oras upang ipakita ang nadepositong halaga sa polygon chain. Maaari mong gamitin ang paraang [isDeposited](/docs/develop/ethereum-polygon/matic-js/pos/is-deposited) para sa pag-check ng status.
