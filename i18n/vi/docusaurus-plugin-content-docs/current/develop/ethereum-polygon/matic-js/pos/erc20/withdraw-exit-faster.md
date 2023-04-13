---
id: withdraw-exit-faster
title: thoát quy trình rút tiền nhanh hơn
keywords:
- 'pos client, erc20, withdrawExitFaster, polygon, sdk'
description: 'Thoát quy trình rút tiền nhanh hơn bằng txHasg từ withdrawStart.'
---

Có thể sử dụng phương pháp `withdrawExitFaster` để thoát quy trình rút tiền nhanh hơn bằng txHash từ phương pháp `withdrawStart`.

Phương pháp này thường nhanh vì nó tạo bằng chứng trong chương trình phụ trợ. Bạn cần định cấu hình [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Lưu ý** – giao dịch withdrawStart phải qua trạm kiểm soát để thoát giao dịch rút tiền.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Khi giao dịch và trạm kiểm soát hoàn tất, số lượng sẽ được nạp vào chuỗi gốc.
