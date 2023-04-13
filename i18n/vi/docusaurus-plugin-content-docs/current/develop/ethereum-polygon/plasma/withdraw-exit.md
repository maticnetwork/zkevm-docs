---
id: withdraw-exit
title: thoát quy trình rút tiền
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# withdrawExit {#withdrawexit}

Trong plasma, bất kỳ ai cũng có thể thoát quy trình rút tiền bằng phương pháp `withdrawExit`. Quy trình thoát sẽ chỉ hoạt động sau khi hoàn tất kỳ thử thách.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Bạn cũng có thể thoát cho nhiều token bằng cách cung cấp danh sách token theo bảng.
