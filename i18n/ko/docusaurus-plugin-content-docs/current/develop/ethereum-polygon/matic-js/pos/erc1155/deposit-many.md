---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Matic.js를 사용해 복수의 ERC1155 토큰을 입금합니다.'
---

`depositMany` 메서드를 사용해 이더리움에서 Polygon 체인으로 필요한 만큼의 여러 토큰을 입금할 수 있습니다.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.depositMany({
    amount: [1,2],
    tokenId: ['123','456'],
    userAddress: <from address>,
    data: '0x5465737445524331313535', // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

**데이터** 제공은 선택 사항입니다.