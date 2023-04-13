---
id: adding-a-custom-token
title: কাস্টম টোকেন যোগ করা
sidebar_label: Adding a Custom Token
description: আপনার পরবর্তী ব্লকচেইন অ্যাপটি Polygon-এ তৈরি করুন।
keywords:
  - docs
  - matic
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

**কাস্টম টোকেন যোগ করুন** ফিচারের মাধ্যমে আপনি স্পষ্টভাবে যেকোনো টোকেন যোগ করতে পারেন এবং Polygon ওয়ালেট স্যুটের সাথে এটি ব্যবহার করতে পারেন। আপনাকে শুধুমাত্র টোকেনের চুক্তির ঠিকানা, রুট অথবা চাইল্ড, দিয়ে সার্চ করতে হবে:

* **রুট** হলো Ethereum-এ টোকেনের চুক্তি
* **চাইল্ড** হলো Polygon-এ চুক্তি

### আমি কীভাবে টোকেন চুক্তি খুঁজে পেতে পারি? {#how-do-i-find-the-token-contract}

আপনি [Coingecko](http://coingecko.com) অথবা [Coinmarketcap](https://coinmarketcap.com/)-এ টোকেনের নাম দিয়ে এটি সার্চ করতে পারেন, যেখানে আপনি Ethereum চেইনে (ERC 20 টোকেনের জন্য) এটির ঠিকানা এবং Polygon-এর মতো পরবর্তী সহায়ক চেইন দেখতে পাবেন। অন্যান্য চেইনে থাকা টোকেনের ঠিকানা হয়তো আপডেটকৃত হবে না, তবে সব উদ্দেশ্যে আপনি নিশ্চিতভাবে রুটের ঠিকানা ব্যবহার করতে পারবেন।

তাই টোকেন বেছে নেওয়ার সময়, আপনি এগুলো দিয়ে সার্চ করতে পারবেন:
* টোকেনের প্রতীক
* টোকেনের নাম
* চুক্তি

এটি যেভাবে কাজ করে:

1. কাস্টম টোকেন হিসাবে চুক্তির ঠিকানা যোগ করার মাধ্যমে আপনার তালিকায় সহজে যেকোনো টোকেন যোগ করুন (আমরা

Polygon বা Ethereum উভয়েই চুক্তির ঠিকানা সাপোর্ট করি):

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/001.png")} width="500" height="420px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/002.png")} width="500"  height="600px"/>
</div>

2. টোকেনের তথ্য আনা হয়ে গেলে, আপনি একটি নিশ্চিতকরণ স্ক্রিন দেখতে পাবেন যেখানে টোকেন সংক্রান্ত সব তথ্য থাকবে। তারপর আপনি এটি একটি কাস্টম টোকেন হিসাবে যোগ করতে পারেন, যা আপনার সিস্টেমে লোকালি স্টোর করা হবে। আমাদের পরামর্শ হলো টোকেনের চুক্তির ঠিকানা দুইবার যাচাই করে দেখুন, কারণ অনেক ক্লোন অথবা জালিয়াতিপূর্ণ টোকেন থাকে:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/003.png")} width="500"  height="600px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/004.png")} width="500"  height="600px"/>
</div>

3. টোকেন বেছে নেওয়ার সময় আপনার যোগ করা টোকেন এবার দেখানো হবে:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/005.png")} width="500"  height="600px"/>
</div>

আপনি **এছাড়াও পরিচালনা** পর্দার টোকেন ট্যাব থেকে সরাসরি একটি টোকেন যোগ করতে পারেন:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/006.png")} width="500"  height="600px"/>
</div>