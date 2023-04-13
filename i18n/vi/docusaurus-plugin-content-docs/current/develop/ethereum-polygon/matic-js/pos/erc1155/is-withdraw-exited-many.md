---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc1155, isWithdrawExitedMany, polygon, sdk'
description: 'Kiểm tra xem đã thoát chức năng rút tiền cho nhiều token hay chưa.'
---

Phương pháp `isWithdrawExitedMany` kiểm tra xem đã thoát chức năng rút tiền cho nhiều token hay chưa. Phương pháp này trả về giá trị boolean.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExitedMany(<exit tx hash>);

```
