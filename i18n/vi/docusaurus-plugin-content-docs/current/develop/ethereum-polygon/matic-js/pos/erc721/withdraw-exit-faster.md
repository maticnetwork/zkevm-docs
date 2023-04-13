---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc721, withdrawExitFaster, polygon, sdk'
description: 'Thoát quy trình rút tiền bằng txHash từ "withdrawStart"'
---

Có thể sử dụng phương pháp `withdrawExitFaster` để thoát quy trình rút tiền bằng txHash từ phương pháp `withdrawStart`.


Quy trình này nhanh vì nó tạo ra bằng chứng trong chương trình phụ trợ. Bạn cần định cấu hình [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Lưu ý** – giao dịch withdrawStart phải qua trạm kiểm soát để thoát giao dịch rút tiền.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
