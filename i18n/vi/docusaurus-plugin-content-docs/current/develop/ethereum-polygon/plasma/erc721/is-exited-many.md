---
id: is-exited-many
title: isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# isExitedMany {#isexitedmany}

Phương pháp `isExitedMany` kiểm tra xem đã thoát chức năng rút tiền hay chưa. Phương pháp này trả về giá trị boolean.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
