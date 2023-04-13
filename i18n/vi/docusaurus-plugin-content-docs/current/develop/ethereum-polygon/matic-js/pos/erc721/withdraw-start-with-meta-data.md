---
id: withdraw-start-with-meta-data
title: withdrawStartWithMetaData
keywords:
- 'pos client, erc721, withdrawStartWithMetaData, polygon, sdk'
description: 'Bắt đầu quy trình rút tiền với metadata.'
---

Có thể sử dụng phương pháp `withdrawStartWithMetaData` để bắt đầu quy trình rút tiền. Quy trình này sẽ đốt token đã định trên chuỗi polygon. Về mặt kỹ thuật, nó gọi phương pháp `withdrawWithMetadata` trên hợp đồng token.


```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.withdrawStartWithMetaData(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
