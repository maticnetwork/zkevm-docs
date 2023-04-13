---
id: archive-node-ansible
title: Ansible সহ একটি আর্কাইভ নোড সেট আপ করুন
sidebar_label: Set up an Archive Node with Ansible
description: একটি আর্কাইভ নোড সেট আপ করতে Ansible ব্যবহার করে
keywords:
  - erigon
  - archive
  - node
  - ansible
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

আর্কাইভ নোড সেট করতে, আপনাকে [<ins>আনসিবল ব্যবহার করে একটি সম্পূর্ণ নোড deployment মেন্টের</ins>](/docs/develop/network-details/full-node-deployment) জন্য একই প্রসেস অনুসরণ করতে হবে। তবে এর জন্য একটি ছোটখাট কনফিগারেশন পরিবর্তন প্রয়োজন। আপনাকে ফাইলে নিম্নলিখিত প্যারামিটার অন্তর্ভুক্ত করতে `start.sh`হবে:

```makefile
--gcmode 'archive'
```
