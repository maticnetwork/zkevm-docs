---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: '`withdrawStart থেকে txHash ব্যবহার করে উইথড্র প্রক্রিয়া থেকে বেরিয়ে আসা'
---

`withdrawStart` পদ্ধতি থেকে txHash ব্যবহার করে উইথড্র প্রক্রিয়া থেকে বেরিয়ে আসতে `withdrawExit`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


প্রমাণ তৈরি করতে এবং বেরিয়ে আসার প্রক্রিয়া চালাতে এই পদ্ধতিটি একাধিক RPC কল করে। তাই withdrawExitFaster পদ্ধতি ব্যবহার করার পরামর্শ দেওয়া হয়।
>
