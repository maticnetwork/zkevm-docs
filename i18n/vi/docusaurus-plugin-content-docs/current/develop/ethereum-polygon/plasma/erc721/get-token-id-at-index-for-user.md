---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# getTokenIdAtIndexForUser {#gettokenidatindexforuser}

Phương pháp `getTokenIdAtIndexForUser` trả về id token theo chỉ số được cung cấp cho người dùng.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
