---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Maraming pagdeposito ng mga ERC1155 token gamit ang matic.js'
---

Maaaring gamitin ang paraang `depositMany` upang ideposito ang mga kinakailangang halaga ng maraming token mula sa ethereum papunta sa polygon chain.

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

Opsyonal ang pagbibigay ng **data**.