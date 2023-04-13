---
id: matic-flow
title: কিভাবে Polygon কাজ করে
description: আপনার পরবর্তী ব্লকচেইন অ্যাপ Polygon-এ তৈরি করুন।
keywords:
  - docs
  - matic
  - polygon
  - how polygon works
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# কিভাবে Polygon কাজ করে {#how-polygon-works}

Polygon হচ্ছে একটি ব্লকচেইন অ্যাপ্লিকেশন প্ল্যাটফর্ম যা হাইব্রিড প্রুফ-অফ-স্ট্যাক এবং Plasma-সক্রিয় সাইডচেইন সুবিধা প্রদান করে।

Polygon-এ তিন-স্তরের আর্কিটেকচার রয়েছে:

1. Ethereum-এ স্ট্যাকিং এবং Plasma স্মার্ট চুক্তি
2. Heimdall (প্রুফ অফ স্ট্যাক লেয়ার)
3. Bor (ব্লক উৎপাদনকারীর লেয়ার)

নীচের ইমেজ আপনাকে কীভাবে এই কোর কম্পোনেন্টগুলো একে অপরের সাথে ইন্টারঅ্যাক্ট করে তা বুঝতে সাহায্য করবে:

<img src={useBaseUrl("img/Bor/bor-architecture.png")} />