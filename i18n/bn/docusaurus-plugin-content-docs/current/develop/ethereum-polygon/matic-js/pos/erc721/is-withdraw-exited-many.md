---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc721, isWithdrawExitedMany, polygon, sdk'
description: 'একাধিক টোকেনের ক্ষেত্রে উইথড্র প্রক্রিয়া থেকে বেরিয়ে আসা হয়েছে কিনা তা যাচাই করে।'
---

একাধিক টোকেনের ক্ষেত্রে উইথড্র প্রক্রিয়া থেকে বেরিয়ে আসা হয়েছে কিনা তা `isWithdrawExitedMany`পদ্ধতি যাচাই করে। এটি বুলিয়ান মান জানায়।

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExitedMany(<exit tx hash>);

```
