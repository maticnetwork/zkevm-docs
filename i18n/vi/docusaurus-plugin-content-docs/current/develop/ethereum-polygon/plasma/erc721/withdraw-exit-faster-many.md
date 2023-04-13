---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'plasma client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# withdrawExitFasterMany {#withdrawexitfastermany}

Có thể sử dụng phương pháp `withdrawExitFasterMany` để phê duyệt tất cả token.

Quy trình này nhanh vì nó tạo ra bằng chứng trong chương trình phụ trợ. Có thể định cấu hình chương trình phụ trợ bằng rpc riêng tư chuyên dụng.

**Lưu ý** – giao dịch withdrawStart phải qua trạm kiểm soát để thoát giao dịch rút tiền.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
