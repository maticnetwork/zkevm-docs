---
id: custom-tokens
title: কাস্টম টোকেন কনফিগার করুন
description: Metamask-এ কাস্টম টোকেন কনফিগার করা।
keywords:
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

এই পৃষ্ঠাটি Metamask এ কাস্টম টোকেন কনফিগার / যোগ করার প্রক্রিয়া প্রদর্শন করে।

আপনি Metamask যে কোনও নেটওয়ার্কে যে কোনও কাস্টম টোকেন যোগ করতে একই প্রসেস ব্যবহার করতে পারেন। আপনি তাদের নিজ নিজ চুক্তির with সাথে পরীক্ষার টোকেনগুলির কিছু উদাহরণ visualize [এই টেবিলের](#tokens-and-contract-adresses) উল্লেখ করতে পারেন।

## আপনার MetaMask অ্যাকাউন্টে একটি কাস্টম টোকেন যোগ করা হচ্ছে {#adding-a-custom-token-to-your-metamask-account}

প্রথমত, আপনার Metamask এর হোম স্ক্রিনে নতুন টোকেন জন্য উপযুক্ত নেটওয়ার্ক চয়ন করুন। তারপর "Import Tokens" এ ক্লিক করুন।

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/add-test-token.png")} />
</div>

<br></br>

তারপর এটি আপনাকে একটি নতুন স্ক্রিনে navigate যাবে। Import Tokens স্ক্রিনে Token Address ফিল্ডে একটি ঠিকানা কপি করুন।

:::info
এই প্রক্রিয়া ব্যাখ্যা করতে, আমরা **Goerli** নেটওয়ার্কে একটি E**RC20-TESTV4 **টোকেন ব্যবহার করছি। [<ins>এখানে</ins>](#tokens-and-contract-adresses) অন্যান্য নেটওয়ার্ক থেকে অন্যান্য টেস্ট টোকেন Find ।
:::

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/token-contract-address.png")} />
</div>

অন্যান্য ফিল্ডগুলো স্বয়ংক্রিয়ভাবে পূর্ণ হবে। Custom Tokens যোগ করুন এবং তারপরে Import on ক্লিক করুন। `TEST` টোকেনটি এখন Metamask-এ আপনার অ্যাকাউন্টে প্রদর্শিত হবে।

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/added-token.png")} />
</div>

**আপনার Metamask অ্যাকাউন্টে একটি টেস্ট ERC1155 টোকেন যোগ করা**

Polygon নেটওয়ার্ক যেখানে ERC1155 সমর্থন করে, [সেখানে Metamask এখনো স্ট্যান্ডার্ড সমর্থন করে না](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-)। এই আপডেটটি 2021 সালের চতুর্থ ত্রৈমাসিকে আসবে বলে প্রত্যাশা করা হয়।

### টোকেন এবং চুক্তি Adresses {#tokens-and-contract-adresses}

| টোকেন | নেটওয়ার্ক | চুক্তির ঠিকানা |
|---------------|---------|----------------------------------------------|
| ERC20-TESTV4 | Goerli | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` |
| MATIC-TST | মুম্বাই | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| ERC721-TESTV4 | Goerli | `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b` |
| ERC721-TESTV4 | মুম্বাই | `0x33FC58F12A56280503b04AC7911D1EceEBcE179c` |