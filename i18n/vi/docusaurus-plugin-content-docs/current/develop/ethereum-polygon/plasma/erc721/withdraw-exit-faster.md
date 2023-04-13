---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'plasma client, erc721, withdrawExitFaster, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# withdrawExitFaster {#withdrawexitfaster}

Có thể sử dụng phương pháp `withdrawExitFaster` để phê duyệt tất cả token.

Quy trình này nhanh vì nó tạo ra bằng chứng trong chương trình phụ trợ. Có thể định cấu hình chương trình phụ trợ bằng rpc riêng tư chuyên dụng.

**Lưu ý** – giao dịch withdrawStart phải qua trạm kiểm soát để thoát giao dịch rút tiền.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
