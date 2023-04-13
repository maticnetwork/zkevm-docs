---
id: architecture
title: আর্কিটেকচার
description: Ethereum, Heimdall এবং Bor স্তর
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - validator
slug: architecture
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon নেটওয়ার্কটি মোটামুটি তিনটি লেয়ারে বিভক্ত:

* **Ethereum লেয়ার** - Ethereum mainnet-এ কন্ট্রাক্ট একটি সেট।
* **Heimdall লেয়ার** - Ethereum mainnet, সমান্তরালে চলমান প্রুফ-অফ-স্টেক Heimdall নোডের একটি সেট, Ethereum mainnet-এ নিযুক্ত স্ট্যাকিং কন্ট্রাক সেট পর্যবেক্ষণ করে এবং Ethereum mainnet-এ Polygon নেটওয়ার্ক চেকপয়েন্ট তৈরি করে। Heimdall মূলত Tendermint এর উপর নির্ভরশীল।
* **বোর লেয়ার** - Heimdall nodes দ্বারা shuffled block-producing বোর নোডের একটি সেট। Bor মূলত Go Ethereum এর উপর নির্ভরশীল।

<img src={useBaseUrl("img/staking/architecture.png")} />

## Ethereum-এ স্ট্যাক করা এবং Plasma স্মার্ট চুক্তি {#staking-and-plasma-smart-contracts-on-ethereum}

Polygon-এ [প্রুফ অফ স্ট্যাক (PoS)](/docs/home/polygon-basics/what-is-proof-of-stake) প্রক্রিয়াটি সক্রিয় করার জন্য, সিস্টেমটি Ethereum মেইননেটে [স্ট্যাক করা](/docs/maintain/glossary.md#staking) ব্যবস্থাপনা চুক্তিগুলির একটি সেট নিযুক্ত করে।

স্ট্যাক করার চুক্তিগুলি নিম্নলিখিত ফিচারগুলি বাস্তবায়িত করে:

* Ethereum মেইননেটে স্ট্যাক করার চুক্তির উপর MATIC টোকেনগুলিতে যেকোনো ব্যক্তির স্ট্যাক করার এবং একজন [যাচাইকারী](/docs/maintain/glossary.md#validator) হিসাবে সিস্টেমটিতে যোগদানের ক্ষমতা।
* Polygon নেটওয়ার্কে স্টেট রূপান্তর যাচাই করার জন্য স্ট্যাক করার পুরস্কার উপার্জন করা।
* Ethereum মেইননেটে [চেকপয়েন্টগুলো](/docs/maintain/glossary.md#checkpoint-transaction) সেভ করুন।

PoS প্রক্রিয়াটিও Polygon সাইডচেইনগুলির জন্য ডেটা অনুপলভ্যতার সমস্যায় একটি নিরসন প্রক্রিয়া হিসাবে কাজ করে।

## Heimdall (যাচাইকারী লেয়ার) {#heimdall-validation-layer}

Heimdall লেয়ার [Bor](/docs/maintain/glossary.md#bor) কর্তৃক সৃষ্ট ব্লকগুলোর সমষ্টিকে একটি মার্কেল ট্রি-তে তদারকি করে এবং রুট চেইনে নির্দিষ্ট সময় পর পর মার্কেল রুটে সেগুলো প্রকাশ করে। Bor সাইডচেইনের স্ন্যাপশটগুলির পর্যায়ক্রমিক প্রকাশকে [চেকপয়েন্ট](/docs/maintain/glossary.md#checkpoint-transaction) বলা হয়।

Bor-এ কয়েকটি ব্লক অন্তর, Heimdall-এ একজন যাচাইকারী:

1. সর্বশেষ চেকপয়েন্টের পর থেকে সকল ব্লক যাচাই করে।
2. ব্লক হ্যাশের একটি Merkle ট্রি তৈরি করে।
3. Ethereum মেইননেটে Merkle রুট হ্যাশ প্রকাশ করে।

দুটি কারণে চেক পয়েন্টগুলো গুরুত্বপূর্ণ:

1. রুট চেইনে সম্পূর্ণতা প্রদান করা।
2. সম্পদ প্রত্যাহার করার সময় প্রুফ অফ বার্ন প্রদান করা।

প্রক্রিয়াটির একটি সংক্ষিপ্ত বিবরণ:

* পুল থেকে সক্রিয় যাচাইকারীদের একটি সাবসেট একটি [স্প্যানের](/docs/maintain/glossary.md#span) জন্য [ব্লক উৎপাদনকারী](/docs/maintain/glossary.md#block-producer) হিসাবে কাজ করার জন্য নির্বাচিত হয়। এই ব্লক উৎপাদনকারীরা ব্লক সৃষ্টি এবং তৈরি হওয়া ব্লকগুলি নেটওয়ার্কটিতে সম্প্রচারের জন্য দায়বদ্ধ থাকে।
* একটি চেকপয়েন্টে যে কোনও নির্দিষ্ট বিরতির সময় তৈরি করা সমস্ত ব্লকের Merkle রুট হ্যাশ অন্তর্ভুক্ত রয়েছে। সকল নোড Merkle রুট হ্যাশ যাচাই করে এবং এতে তাদের স্বাক্ষর সংযুক্ত করে।
* যাচাইকারীর সেট থেকে একটি নির্বাচিত [প্রস্তাবকারী](/docs/maintain/glossary.md#proposer) কোনো বিশেষ চেকপয়েন্টের জন্য সকল স্বাক্ষর সংগ্রহ করার জন্য এবং Ethereum মেইননেটে সেই চেকপয়েন্টটি নিশ্চিত করার জন্য দায়বদ্ধ থাকে।
* ব্লক তৈরি করার দায়িত্ব এবং চেকপয়েন্ট প্রস্তাব করার বিষয়গুলোও সামগ্রিক পুলে যাচাইকারীর স্টেকের অনুপাতের উপর পরিবর্তনীয়ভাবে নির্ভরশীল।

এছাড়াও [Heimdall আর্কিটেকচার](/docs/pos/heimdall/overview) দেখুন।

## Bor (ব্লক উৎপাদনকারীর লেয়ার) {#bor-block-producer-layer}

Bor হল Polygon-এর সাইডচেইন ব্লক উৎপাদনকারী — ব্লকগুলিতে হওয়া সামগ্রিক লেনদেনের জন্য সম্পূর্ণভাবে দায়বদ্ধ।

Bor ব্লক উৎপাদনকারীরা হল যাচাইকারীদের একটি সাবসেট এবং মাঝে-মাঝে [Heimdall](/docs/maintain/glossary.md#heimdall) যাচাইকারীদের দ্বারা অদলবদল হয়।

এছাড়াও [Bor আর্কিটেকচার](/docs/pos/bor/overview) দেখুন।
