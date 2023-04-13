---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'pos client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Truy xuất ID token trên chỉ số được cấp cho người dùng.'
---

Phương pháp `getTokenIdAtIndexForUser` trả về ID token trên chỉ số được cấp cho người dùng.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
