---
id: proposers-producers-selection
title: প্রস্তাবকারী এবং উৎপাদনকারীর নির্বাচন
sidebar_label: Proposers & Producers
description: Polygon এ Proposer এবং ব্লক প্রযোজক নির্বাচন
keywords:
  - docs
  - polygon
  - matic
  - proposers
  - block producers
  - selection
slug: proposers-producers-selection
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

BOR লেয়ারটির জন্য ব্লক উৎপাদনকারীরা হল যাচাইকারীদের পুল থেকে নির্বাচিত একটি কমিটি যা নিয়মিত ব্যবধানে ঘটে চলা তাদের স্ট্যাকের উপর নির্ভরশীল। এই ব্যবধানগুলি ডায়নেস্টি এবং নেটওয়ার্ক নিয়ে যাচাইকারীর প্রশানের উপর নির্ধারিত হয়।

[স্ট্যাকের](/docs/maintain/glossary.md#staking) অনুপাত [ব্লক উৎপাদনকারী](/docs/maintain/glossary.md#block-producer) কমিটির একজন সদস্য হিসাবে নির্বাচিত হতে পারে এমন সম্ভাবনার নির্দেশ করে।

## নির্বাচন প্রক্রিয়া {#selection-process}

ধরা যাক পুলের মধ্যে আমাদের কাছে 3 জন যাচাইকারী আছে — Alice, Bill, এবং Clara:

* Alice 100 MATIC টোকেন স্ট্যাক করছে।
* Bill 40 MATIC টোকেন স্ট্যাক করছে।
* Clara 40 MATIC টোকেন স্ট্যাক করছে।

স্ট্যাক অনুযায়ী যাচাইকারীদের স্লট দেওয়া হয়েছে।

যেহেতু Alice 100 MATIC টোকেন স্ট্যাক করেছে এবং যাচাইকারীর প্রশাসন দ্বারা রক্ষণাবেক্ষণ হিসাবে স্লট প্রতি খরচ 10 MATIC টোকেন হওয়ায়, Alice মোট 5টি স্লট পায়। একইভাবে, Bill এবং Clara মোট 2টি স্লট পায়।

যাচাইকারী Alice, Bill এবং Clara-কে নিম্নলিখিত স্লটগুলি দেওয়া হয়:

* [A, A, A, A, A, B, B, C, C]

Polygon তারপর Ethereum ব্লক হ্যাশগুলি সিড হিসাবে ব্যবহার করে Alice, Bill এবং Clara-র স্লটের তীর অদলবদল করে।

অদলবদলের ফলাফল স্লটগুলির নিম্নলিখিত অ্যারে:

* [A, B, A, A, C, B, A, A, C]

এখন যাচাইকারীর প্রশাসন দ্বারা রক্ষণাবেক্ষণ হিসাবে মোট ব্লক উৎপাদনকারীর হিসাবের উপর নির্ভর করে, Polygon উপর থেকে যাচাইকারীদের ব্যবহার করে - উদাহরণস্বরূপ, 5 উৎপাদনকারীর একটি সেটের স্লটগুলির অ্যারে হল [A, B, A, A, C]।

পরবর্তী স্প্যানের জন্য উৎপাদকের সেটটি [A: 3, B:1, C:1] হিসাবে সংজ্ঞায়িত।

ফলস্বরূপ প্রাপ্ত যাচাইকারীর সেট এবং Tendermint-এর [প্রস্তাবকারী নির্বাচনের অ্যালগরিদম](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html) ব্যবহার করে, Bor-এ প্রত্যেক স্প্রিন্টের জন্য Polygon এক উৎপাদনকারী নির্বাচন করে।

<img src={useBaseUrl("img/validators/producer-proposer.png")} />

**লেজেন্ড:**

* ডায়নিস্টি: পূর্ববর্তী নিলাম শেষের সময় এবং পরবর্তী নিলাম শুরুর সময়ের মধ্যবর্তী সময়।
* স্প্রিন্ট: বিরতির সময় যার জন্য ব্লক উৎপাদকদের কমিটি নির্বাচিত হয়।
* স্প্যান: একজন একক উৎপাদকের উৎপাদিত ব্লকের সংখ্যা।
