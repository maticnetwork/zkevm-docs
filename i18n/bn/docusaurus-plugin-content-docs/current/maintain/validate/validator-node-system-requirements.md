---
id: validator-node-system-requirements
title: সিস্টেমের প্রয়োজনীয়তা
description: একটি যাচাইকারী নোড চালানোর জন্য সিস্টেমের প্রয়োজনীয়তা
keywords:
  - docs
  - matic
  - polygon
  - prerequisites
  - requirements
slug: validator-node-system-requirements
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

এই বিভাগে [sentry](/docs/maintain/glossary.md#sentry) নোড এবং [যাচাইকারী](/docs/maintain/glossary.md#validator) নোড দুটোর জন্যই সিস্টেমের প্রয়োজনীয়তা তালিকাভুক্ত করা হয়েছে।

**ন্যূনতম** সিস্টেমের প্রয়োজনীয়তা বলতে বোঝায় আপনি নোডগুলি চালাতে পারেন কিন্তু সেটআপের ভবিষ্যত-প্রমাণিত নয়।

**প্রস্তাবিত** সিস্টেমের প্রয়োজনীয়তা বলতে বোঝায় ভবিষ্যত-প্রমাণিত নোড। তবে, আপনার নোডগুলির ভবিষ্যত-প্রমাণ হওয়ার কোনো ঊর্ধ্বতন সীমা নেই।

আপনাকে অবশ্যই সবসময় Sentry নোড এবং যাচাইকারী নোড পৃথক মেশিনে চালাতে হবে।

## ন্যূনতম সিস্টেমের প্রয়োজনীয়তা {#minimum-system-requirements}

* RAM: 32 GB
* CPU: 8-core
* স্টোরেজ: 2.5 TB SSD

:::info

Amazon Web Services (AWS) এর জন্য, ন্যূনতম প্রয়োজনীয়তার উদাহরণের সমান হল নির্বাচিত আনলিমিটেড ক্রেডিট সহ **m5d.2xlarge** বা **t3.2xlarge**।

স্টোরেজের জন্য, নিশ্চিত হ, ে 2.5 TB SSD স্টোরেজ extendable.

:::

## প্রস্তাবিত সিস্টেমের প্রয়োজনীয়তা {#recommended-system-requirements}

* RAM: 64 GB
* CPU: 16-core
* স্টোরেজ: 5 TB SSD
* ব্যান্ডউইথ: 1 Gbit/s

:::info

Amazon Web Services (AWS) এর জন্য, **m5d.4xlarge** হল প্রস্তাবিত প্রয়োজনীয়তা উদাহরণ।

OVH এর জন্য, **infra-3** হল প্রস্তাবিত প্রয়োজনীয়তার উদাহরণের সমান।

নেটওয়ার্কের জন্য, প্রতি মাসে 3-5 TB ডেটা স্থানান্তর করা হবে বলে প্রত্যাশিত।

:::
