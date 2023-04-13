---
id: is-approved
title: isApproved
keywords:
- 'pos client, erc721, isApproved, polygon, sdk'
description: 'Tingnan kung naaprubahan ang token para sa isang tinukoy na tokenId.'
---

Tinitingnan ng paraang `isApproved` kung naaprubahan ang token para sa tinukoy na tokenId. Ibinabalik nito ang boolean value.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
