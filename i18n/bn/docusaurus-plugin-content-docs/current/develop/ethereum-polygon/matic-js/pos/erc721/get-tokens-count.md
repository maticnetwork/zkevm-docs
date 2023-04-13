---
id: get-tokens-count
title: getTokensCount
keywords:
- 'pos client, erc721, getTokensCount, polygon, sdk'
description: 'নির্দিষ্ট ব্যবহারকারীর জন্য টোকেনের পরিমাণ জেনে নিন।'
---

`getTokensCount` পদ্ধতি নির্দিষ্ট ব্যবহারকারীর জন্য টোকেনের পরিমাণ জানিয়ে দেয়।

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
