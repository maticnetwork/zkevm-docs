---
id: deposit
title: deposit
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Kök token''dan alt token''a gerekli miktarda fon yatırır.'
---

`deposit` metodu, kök token'dan alt token'a gerekli miktarda fon yatırmak için kullanılabilir.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Yatırılan miktarın polygon zincirine yansıması biraz zaman alabilir. Durumu kontrol etmek için [isDeposited](/docs/develop/ethereum-polygon/matic-js/pos/is-deposited) metodunu kullanabilirsiniz.
