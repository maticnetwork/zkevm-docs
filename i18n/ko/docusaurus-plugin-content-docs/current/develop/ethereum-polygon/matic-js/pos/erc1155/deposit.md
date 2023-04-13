---
id: deposit
title: deposit
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Matic.js를 사용해 ERC1155 토큰을 입금합니다.'
---

`deposit` 메서드를 사용해 이더리움에서 Polygon 체인으로 필요한 금액의 토큰을 입금할 수 있습니다.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.deposit({
    amount: 1,
    tokenId: '123',
    userAddress: <from address>,
    data: '0x5465737445524331313535', // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

**데이터** 제공은 선택 사항입니다.