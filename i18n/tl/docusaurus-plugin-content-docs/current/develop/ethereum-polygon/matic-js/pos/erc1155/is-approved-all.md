---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: 'Tingnan kung naaprubahan ang lahat ng token.'
---

Tinitingnan ng paraang `isApprovedAll` kung naaprubahan ang lahat ng token para sa isang user. Nagbabalik ito ng boolean value.

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
