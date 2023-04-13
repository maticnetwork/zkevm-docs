---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc721, isApprovedAll, polygon, sdk'
description: 'Tinitingnan kung naaprubahan ang lahat ng token.'
---

Tinitingnan ng paraang `isApprovedAll` kung naaprubahan ang lahat ng token. Ibinabalik nito ang boolean value.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
