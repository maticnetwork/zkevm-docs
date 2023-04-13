---
id: withdraw-exit
title: thoát quy trình rút tiền
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Thoát quy trình rút tiền bằng txHash từ withdrawStart.'
---

Có thể sử dụng phương pháp `withdrawExit` để thoát quy trình rút tiền bằng txHash từ phương pháp `withdrawStart`.

**Lưu ý** – giao dịch withdrawStart phải qua trạm kiểm soát để thoát giao dịch rút tiền.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Phương pháp này thực hiện nhiều lệnh gọi RPC để tạo bằng chứng và thoát quy trình. Do đó, nên sử dụng phương pháp withdrawExitFaster.
>

