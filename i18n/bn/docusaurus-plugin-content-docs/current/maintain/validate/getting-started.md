---
id: validator-index
title: যাচাইকারীর ইনডেক্স
description: Polygon নেটওয়ার্কে যাচাইকারী নোড কীভাবে চালানো এবং পরিচালনা করবেন তার উপর নির্দেশাবলীর একটি সংগ্রহ।
keywords:
  - docs
  - polygon
  - validate
  - validator
  - maintain
  - architecture
  - Validator Index
slug: validator-index
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip জানতে থাকুন

Polygon টিমের সর্বশেষ নোড এবং যাচাইকারী আপডেটের সাথে [Polygon নোটিফিকেশনে](https://polygon.technology/notifications/) সাবস্ক্রাইব করে রাখুন।

:::

যাচাইকারীরা হল Polygon নেটওয়ার্ক বজায় রাখার মুখ্য কর্মকর্তা। যাচাইকারীরা একটি সম্পূর্ণ নোড চালায় এবং
ব্লকগুলি উৎপাদনের জন্য MATIC স্ট্যাক করে নেটওয়ার্ক সুরক্ষিত করে, যাচাই করে এবং POS কনসেনসাসে অংশগ্রহণ করে।

:::info

নতুন যাচাইকারী গ্রহণের জন্য সীমিত স্থান রয়েছে। নতুন যাচাইকারীরা শুধমাত্র সক্রিয় সেটে যোগদান করতে পারে যখন একটি বর্তমানে সক্রিয় যাচাইকারী আনবন্ড করে দেয়।

যাচাইকারী প্রতিস্থাপনের জন্য একটি নতুন নিলাম প্রক্রিয়া চালু করা হবে।

:::

## সংক্ষিপ্ত বিবরণ {#overview}

Polygon নিম্নলিখিত তিনটি লেয়ার নিয়ে গঠিত:

* Ethereum স্তর - Ethereum মেইননেটে চুক্তিগুলির একটি সেট।
* Heimdall লেয়ার - Ethereum মেইননেটের সমান্তরালে চলমান প্রুফ-অফ-স্ট্যাক Heimdall নোডের একটি সেট, Ethereum মেইননেটে নিযুক্ত স্ট্যাক করা চুক্তিগুলির সেটটি পর্যবেক্ষণ করছে এবং Ethereum মেইননেটে Polygon নেটওয়ার্ক চেকপয়েন্টগুলি নিশ্চিত করছে। Heimdall মূলত Tendermint এর উপর নির্ভরশীল।
* Bor লেয়ার - Heimdall নোড দ্বারা অদলবদল করা ব্লক-উৎপাদন করা Bor নোডের একটি সেট। Bor মূলত Go Ethereum এর উপর নির্ভরশীল।

Polygon নেটওয়ার্কে একজন যাচাইকারী হওয়ার জন্য আপনাকে অবশ্যই চালাতে হবে:

* Sentry নোড - একটি পৃথক মেশিন যা Heimdall নোড এবং একটি Bor নোড চালায়। একটি sentry নোড Polygon নেটওয়ার্কে সকল নোডের জন্য উন্মুক্ত।
* যাচাইকারী নোড - একটি পৃথক মেশিন যা Heimdall নোড এবং একটি Bor নোড চালায়। একটি যাচাইকারী নোড শুধু তার সেন্ট্রি নোডের জন্য খোলা এবং বাকি নেটওয়ার্কে বন্ধ থাকে।
* Ethereum মেইননেটে নিযুক্ত স্ট্যাক করা চুক্তিতে MATIC টোকেন স্ট্যাক করুন।

## উপাদান {#components}

### Heimdall {#heimdall}

Heimdall নিম্নলিখিত কাজগুলি করে:

* Ethereum মেইননেটে স্ট্যাক করা চুক্তি পর্যবেক্ষণ করে।
* Bor চেইনে সমস্ত স্টেটের ট্রানজিশন যাচাই করে।
* Ethereum মেইননেটে Bor চেইন স্টেটের চেকপয়েন্ট নিশ্চিত করে।

Heimdall মূলত Tendermint এর উপর নির্ভরশীল।

:::info এছাড়াও দেখুন

* GitHub এর সংগ্রহস্থল: [Heimdall](https://github.com/maticnetwork/heimdall)
* GitHub এর সংগ্রহস্থল: [স্ট্যাক করার চুক্তি](https://github.com/maticnetwork/contracts/tree/master/contracts/staking)
* ব্লগ পোস্ট: [Heimdall এবং Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

### Bor {#bor}

Bor নিম্নলিখিত কাজগুলি করে:

* Polygon নেটওয়ার্কে ব্লক উৎপাদন করে।

Bor হল Polygon নেটওয়ার্কের ব্লক উৎপাদনকারী নোড এবং লেয়ার। এটি Go Ethereum-এর উপর ভিত্তি করে। Bor-এ উৎপাদিত ব্লকগুলি Heimdall নোড দ্বারা যাচাই করা হয়।

:::info এছাড়াও দেখুন

* GitHub সংগ্রহস্থল: [Bor](https://github.com/maticnetwork/bor)
* ব্লগ পোস্ট: [Heimdall এবং Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

এই বিভাগটি আপনাকে নিম্নলিখিত বিষয়গুলিতে নির্দেশনা দেয়:

* [যাচাইকারীর দায়িত্ব](validator-responsibilities.md)
* একজন যাচাইকারী হিসাবে নেটওয়ার্কে যোগদান:
  * [শুরু করুন এবং Ansible দিয়ে নোডগুলি চালান](run-validator-ansible.md)
  * [শুরু করুন এবং binaries দিয়ে নোডগুলি চালান](run-validator-binaries.md)
  * [একজন যাচাইকারী হিসাবে স্ট্যাক](validator-staking-operations.md)
* আপনার যাচাইকারী নোডগুলি বজায় রাখা:
  * [স্বাক্ষরকারীর ঠিকানা পরিবর্তন করুন](change-signer-address.md)
  * [কমিশন পরিবর্তন করুন](validator-commission-operations.md)

কমিউনিটি সহায়তা:

* [ডিসকর্ড](https://discord.com/invite/0xPolygon)
* [ফোরাম](https://forum.polygon.technology/)
