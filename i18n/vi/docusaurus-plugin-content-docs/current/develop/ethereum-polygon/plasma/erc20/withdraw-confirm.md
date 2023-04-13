---
id: withdraw-confirm
title: thử thách rút tiền
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# withdrawConfirm {#withdrawconfirm}

Phương pháp `withdrawConfirm` là bước thứ hai trong quy trình rút tiền plasma. Trong bước này – bằng chứng giao dịch đốt của bạn (giao dịch đầu tiên) được gửi đi và một token erc721 có giá trị tương đương được tạo ra.

Sau khi quy trình này thành công – kỳ thử thách sẽ bắt đầu và khi hoàn thành kỳ thử thách, người dùng có thể lấy lại số tiền đã rút về tài khoản của mình trên chuỗi gốc.

Kỳ thử thách là 7 ngày đối với mạng lưới chính.

**Lưu ý** – giao dịch withdrawStart phải được kiểm tra để thử thách việc rút tiền.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Khi đã hoàn thành kỳ thử thách, có thể gọi `withdrawExit` để thoát quy trình rút tiền và lấy lại số tiền đã rút.
