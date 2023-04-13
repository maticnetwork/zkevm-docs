---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# getTokensCount {#gettokenscount}

`getTokensCount` পদ্ধতি নির্দিষ্ট ব্যবহারকারীর জন্য টোকেনের পরিমাণ জানিয়ে দেয়।

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
