---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'ব্যবহারকারীর জন্য সরবরাহকৃত ইনডেক্সে টোকেন আইডি নিয়ে আসে।'
---

`getTokenIdAtIndexForUser` পদ্ধতি ব্যবহারকারীর জন্য সরবরাহকৃত ইনডেক্সে টোকেন আইডি জানিয়ে দেয়।

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
