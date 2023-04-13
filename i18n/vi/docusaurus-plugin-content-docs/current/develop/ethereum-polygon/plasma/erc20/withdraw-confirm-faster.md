---
id: withdraw-confirm-faster
title: thử thách rút tiền nhanh hơn
keywords:
- 'pos client, erc20, withdrawConfirmFaster, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# withdrawConfirmFaster {#withdrawconfirmfaster}

Phương pháp `withdrawConfirmFaster` là bước thứ hai trong quy trình rút tiền plasma. Trong bước này, bằng chứng giao dịch đốt của bạn (giao dịch đầu tiên) được gửi đi và một token erc721 có giá trị tương đương được tạo ra.

Sau khi quy trình này thành công, kỳ thử thách sẽ bắt đầu và khi hoàn thành kỳ thử thách, người dùng có thể lấy lại số tiền đã rút về tài khoản của mình trên chuỗi gốc.

Kỳ thử thách là 7 ngày đối với mạng lưới chính.

<div class="highlight mb-20px mt-20px">Quy trình này nhanh vì nó tạo ra bằng chứng trong chương trình phụ trợ. Bạn cần định cấu hình [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).</div>

**Lưu ý** – giao dịch withdrawStart phải được kiểm tra để thử thách việc rút tiền.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20Token = plasmaClient.erc20(<token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Khi đã hoàn thành kỳ thử thách, có thể gọi `withdrawExit` để thoát quy trình rút tiền và lấy lại số tiền đã rút.
