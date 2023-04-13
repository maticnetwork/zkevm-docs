---
id: transfer
title: transfer
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'একজন ব্যবহারকারী থেকে অন্য কোনো ব্যবহারকারীর কাছে টোকেন ট্রান্সফার করে।'
---

`transfer` পদ্ধতি কোনো ব্যবহারকারী থেকে অন্য কোনো ব্যবহারকারীর কাছে টোকেন ট্রান্সফার করে।

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
