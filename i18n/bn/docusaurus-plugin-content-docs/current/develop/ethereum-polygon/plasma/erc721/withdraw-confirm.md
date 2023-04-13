---
id: withdraw-confirm
title: withdrawChallenge
keywords:
- 'plasma client, erc721, withdrawChallenge, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# withdrawConfirm {#withdrawconfirm}

`withdrawConfirm` পদ্ধতিটি হলো Plasma উইথড্র প্রক্রিয়ার দ্বিতীয় ধাপ। এই ধাপে আপনার বার্ন লেনদেন (প্রথম লেনদেন)-এর প্রমাণ জমা দেওয়া হয় এবং একটি erc721 টোকেনের সমান ভ্যালু তৈরি হয়।

এই প্রক্রিয়াটি সফল হওয়ার পরে, চ্যালেঞ্জের সময়কাল শুরু হয় এবং চ্যালেঞ্জের সময়কাল শেষ হওয়ার পরে, ব্যবহারকারী রুট চেইনে থাকা তাদের অ্যাকাউন্টে উইথড্র করা পরিমাণ ফেরত পেতে পারেন।

মেইননেটের জন্য চ্যালেঞ্জের সময়সীমা 7 দিন।

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
