---
id: set-proof-api
title: ProofApi সেট করুন
keywords:
    - setProofApi
    - polygon
    - sdk
description: Proof API কনফিগার করুন।
---

matic.js এর কিছু ফাংশন দ্রুততর মেয়াদের সাথে যথেষ্ট হয়ে আছে। নাম হিসাবে পরামর্শ দেওয়া As , তারা তাদের non-faster counterparts. তুলনায় দ্রুত ফলাফল তৈরি করে। তারা এমন ভাবে প্রোফ জেনারেশন API ব্যবহার করে ব্যাকএন্ড হিসাবে কাজ করে যা যে কেউ হোস্ট করা যেতে পারে।

[https://apis/matic.network](https://apis/matic.network) হল একটি পাবলিক উপলব্ধ প্রুফ জেনারেশন API, যা Polygon কর্তৃক হোস্ট করা হয়েছে।

`setProofApi`পদ্ধতিটি matic.js ইনস্ট্যান্সে প্রুফ জেনারেশন API এর URL সেট করতে সাহায্য করতে পারে।

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

একটি self-hosted প্রোফ জেনারেশন API পরিষেবা ব্যবহার করে একটি সর্বজনীনতার হো. Proof তুলনায় আরও ভাল পারফরম্যান্স পাবেন।

অনুগ্রহ করে পরিষেবাটি to প্রদত্ত ইনস্টলেশন নির্দেশাবলী অনুসরণ করুন।

উদাহরণস্বরূপ, আপনি যদি প্রমাণ API deployed করেছেন এবং বেস url - ,`https://abc.com/` আপনাকে বেস URL -এ সেট করতে হবে `setProofApi`

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

:::tip
আমরা দ্রুত API-এর ব্যবহার করার পরামর্শ দিচ্ছি, কারণ কিছু API-এর বিশেষ করে যেখানে প্রমাণ তৈরি হচ্ছে, সেখানে অনেক RPC কল তৈরি করে এবং এটি পাবলিক RPC-এর সাথে খুব ধীর হতে পারে।
:::
