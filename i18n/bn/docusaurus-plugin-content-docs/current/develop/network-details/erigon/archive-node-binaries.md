---
id: archive-node-binaries
title: Binaries সহ একটি আর্কাইভ নোড সেট আপ করুন
sidebar_label: Set up an Archive Node with Binaries
description: একটি আর্কাইভ নোড সেট আপ করতে binaries ব্যবহার করে
keywords:
  - erigon
  - archive
  - node
  - binary
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

আর্কাইভ নোড সেট করতে, আপনাকে বাইনারি সহ  [<ins>একটি সম্পূর্ণ নোড স্থাপন করার জন্য একই প্রসেস অনুসরণ করতে হবে</ins>](/docs/develop/network-details/full-node-binaries)। তবে এর জন্য একটি ছোটখাট কনফিগারেশন পরিবর্তন প্রয়োজন। আপনাকে  ফাইলে নিম্নলিখিত প্যারামিটার `start.sh` অন্তর্ভুক্ত করতে হবে:

```makefile
--gcmode 'archive'
```
