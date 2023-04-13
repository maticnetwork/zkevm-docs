---
id: covalent
title: Covalent ব্যবহার করা
sidebar_label: Covalent
description: ডেটার জন্য কীভাবে Covalent-এর সমন্বিত API ব্যবহার করতে হয় শিখুন
keywords:
  - docs
  - matic
  - polygon
  - covalent
  - data
  - analytics
  - index
  - indexing
  - query
image: https://matic.network/banners/matic-network-16x9.png
---

## ভূমিকা {#introduction}

Polygon PoS ভিত্তিক সাইডচেইন থাকা Plasma-এর একটি অভিযোজিত সংস্করণ ব্যবহার করে
Ethereum-এ খুবই বড় মাপের স্কেল নিয়ে আসে যা মেইনচেইনে ফাইনালিটি সহ
অত্যন্ত সাশ্রয়ী এবং দ্রুততর সলিউশন প্রদান করে। Polygon নেটওয়ার্ক PoS চেকপয়েন্ট ব্যবহার করে
নেটওয়ার্কের প্রাণবন্ততা নিশ্চিত করে যা Ethereum মেইনচেইনেও পাঠানো হয়ে থাকে।
এটি একটি একক Polygon সাইডচেইনকে তাত্ত্বিকভাবে প্রতি ব্লকে `2^16` টি লেনদেন করতে সক্ষম করে তুলে
এবং ভবিষ্যতে একাধিক চেইন ব্যবহার করে কোটি কোটি লেনদেন করার সম্ভাবণা জাগিয়ে তুলছে।

### সংক্ষিপ্ত তথ্য {#quick-facts}

<TableWrap>

| সম্পত্তি | মান |
|---|---|
| Polygon মেইননেট chainId | `137` |
| Polygon মুম্বাই টেস্টনেট chainId | `80001` |
| Polygon ব্লকচেইন এক্সপ্লোরার | https://polygonscan.com/ |
| ব্লকের সময় | ~3 সেকেন্ড |
| ডেটা রিফ্রেশ ল্যাটেন্সি | ~6 সেকেন্ড বা 2 ব্লক |

</TableWrap>

:::tip দ্রুত শুরু

শুরু করতে **[<ins>এই ভূমিকা ভিডিওটি</ins>](https://www.youtube.com/watch?v=qhibXxKANWE)**
দেখুন।

:::

## সমর্থিত এন্ডপয়েন্ট {#supported-endpoints}

সকল [__ক্লাস A__](https://www.covalenthq.com/docs/api/#tag--Class-A) এন্ডপয়েন্ট Matic মেইননেট এবং মুম্বাই টেস্টনেটে সমর্থন করে। আপনি `chainId`পরিবর্তন করে সমন্বিত API-এর মাধ্যমে যেকোনও নেটওয়ার্ক অনুসন্ধান করতে পারেন

:::info এন্ডপয়েন্ট

Covalent ব্যবহার করে Polygon নেটওয়ার্কে করতে সক্ষম সমস্ত অনুরোধের একটি সম্পূর্ণ তালিকা
[<ins>Covalent API ডকুমেন্টেশনে</ins>](https://www.covalenthq.com/docs/api/) পাওয়া যাচ্ছে।

:::

---

## পরিশিষ্ট {#appendix}

### Matic গ্যাস টোকেন {#matic-gas-token}

Matic নেটওয়ার্কের সাথে ইন্টারঅ্যাক্ট করতে গ্যাস ফি হিসেবে অর্থ প্রদান করতে MATIC টোকেন প্রয়োজন হয়। Covalent-এর
প্রতিক্রিয়া স্বয়ংক্রিয়ভাবে MATIC ইউনিটে `gas_*` ক্ষেত্র ফেরত পাঠায়।

### টোকেন ম্যাপিং {#token-mapping}

Covalent Ethereum মেইননেট এবং Matic চেইনের মধ্যে টোকেন ঠিকানার একটি অন-চেইন রিয়েল-টাইম ম্যাপিং বজায় রাখে। এই ঠিকানাগুলি Matic-এ দামগুলিকে বিপরীতভাবে দেখতে এবং সঠিক টোকেন লোগো URL ফেরত দিতে ব্যবহৃত হয়৷

ম্যাপ করা টোকেনের কিছু উদাহরণ:

| টোকেন | Ethereum মেইননেট | Matic মেইননেট |
|---|---|---|
| USDT | 0xdac17f958d2ee523a2206206994597c13d831ec7 | 0xc2132d05d31c914a87c6611c10748aeb04b58e8f |
| Uniswap UNI | 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 | 0xb33eaad8d922b1083446dc23f610c2567fb5180f |

### টোকেনের মূল্য {#token-prices}

Ethereum মেইননেটে ফেরত ম্যাপ করা টোকেনগুলির ক্ষেত্রে Covalent ম্যাপ করা ফিরতি মূল্য প্রদান করতে সক্ষম রয়েছে।
