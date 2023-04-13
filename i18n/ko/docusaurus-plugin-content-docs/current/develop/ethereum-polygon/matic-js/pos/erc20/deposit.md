---
id: deposit
title: 입금
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: '루트 토큰에서 하위 토큰으로 필요한 금액을 입금합니다.'
---

`deposit` 메서드를 사용해 루트 토큰에서 하위 토큰으로 필요한 금액을 입금할 수 있습니다.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Polygon 체인에 입금된 금액이 반영되는 데 다소 시간이 걸릴 수 있습니다. 상태 확인을 위해 [isDeposited](/docs/develop/ethereum-polygon/matic-js/pos/is-deposited) 메서드를 사용할 수 있습니다.
