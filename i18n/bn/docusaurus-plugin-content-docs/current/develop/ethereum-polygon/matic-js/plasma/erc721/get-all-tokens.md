---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'নির্দিষ্ট ব্যবহারকারীর মালিকানাধীন সকল টোকেনের ব্যাপারে জানায়।'
---

`getAllTokens` পদ্ধতি নির্দিষ্ট ব্যবহারকারীর মালিকানাধীন সকল টোকেনের ব্যাপারে জানায়।

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

দ্বিতীয় প্যারামিটারে সীমার মান নির্দিষ্ট করে আপনি টোকেনগুলোও সীমিত করে দিতে পারেন।
