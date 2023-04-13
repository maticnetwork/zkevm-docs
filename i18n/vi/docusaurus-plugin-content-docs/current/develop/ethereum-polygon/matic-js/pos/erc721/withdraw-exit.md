---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'Thoát quy trình rút tiền bằng txHash từ "withdrawStart"'
---

Có thể sử dụng phương pháp `withdrawExit` để thoát quy trình rút tiền bằng txHash từ phương pháp `withdrawStart`.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Phương pháp này thực hiện nhiều lệnh gọi RPC để tạo bằng chứng và thoát quy trình. Do đó, nên sử dụng phương pháp withdrawExitFaster.
>
