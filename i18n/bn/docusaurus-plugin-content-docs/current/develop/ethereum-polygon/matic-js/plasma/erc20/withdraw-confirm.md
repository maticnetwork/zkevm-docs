---
id: withdraw-confirm
title: চ্যালেঞ্জ উইথড্র করুন
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: 'উইথড্র নিশ্চিত করুন।'
---

`withdrawConfirm` পদ্ধতিটি Plasma উইথড্র প্রক্রিয়ার দ্বিতীয় ধাপ। এই ধাপে - আপনার বার্ন লেনদেনের (প্রথম লেনদেন) প্রমাণ জমা দেওয়া হয় এবং একটি erc20 টোকেনের সমান ভ্যালু তৈরি হয়।

এই প্রক্রিয়াটি সফল হওয়ার পর - চ্যালেঞ্জের সময়কাল শুরু হয় এবং চ্যালেঞ্জের সময়কাল শেষ হওয়ার পর ব্যবহারকারী উইথড্র করা পরিমাণ তাদের রুট চেইনের অ্যাকাউন্টে ফিরে পেতে পারেন।

মেইননেটের চ্যালেঞ্জের সময়সীমা 7 দিন।

**দ্রষ্টব্য**- উইথড্র চ্যালেঞ্জ করার জন্য withdrawStart লেনদেন অবশ্যই চেকপয়েন্টেড হতে হবে।

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

একবার চ্যালেঞ্জের সময়সীমা শেষ হলে  `withdrawExit` কল করে উইথড্র প্রক্রিয়া থেকে বের হওয়া যাবে এবং উইথড্রকৃত পরিমাণ ফিরে পাওয়া যাবে।
