---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc721, isWithdrawExitedMany, polygon, sdk'
description: 'Kiểm tra xem chức năng rút tiền cho nhiều token đã thoát hay chưa.'
---

Phương pháp `isWithdrawExitedMany` kiểm tra xem chức năng rút tiền cho nhiều token đã thoát hay chưa. Phương pháp này trả về giá trị boolean.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExitedMany(<exit tx hash>);

```
