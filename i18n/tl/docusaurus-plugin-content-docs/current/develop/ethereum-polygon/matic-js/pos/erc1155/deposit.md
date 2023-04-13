---
id: deposit
title: deposit
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Magdeposito ng ERC1155 token gamit ang matic.js'
---

Maaaring gamitin ang paraang `deposit` upang ideposito ang kinakailangang halaga ng isang token mula sa ethereum papunta sa polygon chain.

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

Opsyonal ang pagbibigay ng **data**.