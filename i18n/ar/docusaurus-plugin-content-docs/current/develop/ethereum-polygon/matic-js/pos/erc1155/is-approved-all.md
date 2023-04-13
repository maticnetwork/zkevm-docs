---
id: is-approved-all
title: isApprovedAll
keywords:
  - 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: 'Check if token is approved all.'
---

`isApprovedAll` method checks if all token is approved for a user. It returns boolean value.

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
