---
id: validator-key-management
title: যাচাইকারী মূল ব্যবস্থাপনা
description: Signer এবং Owner ার কী যাচাইকারী ম্যানেজমেন্ট
keywords:
  - docs
  - matic
  - polygon
  - Validator Key Management
  - signer
  - owner
image: https://matic.network/banners/matic-network-16x9.png
---

# যাচাইকারী মূল ব্যবস্থাপনা {#validator-key-management}

প্রতিটি যাচাইকারী Polygon এ যাচাইকারী সংক্রান্ত কার্যক্রম পরিচালনা করতে দুটি কী ব্যবহার করে। সাইনার কীটি নোডে রাখা হয় এবং সাধারণত একটি  `hot`ওয়ালেট হিসাবে বিবেচিত হয়, যেখানে মালিক কীটি খুব সুরক্ষিত থাকে বলে মনে করা হয়, যা প্রায়শই ব্যবহৃত হয়, এবং সাধারণত একটি `cold`ওয়ালেট বলে মনে করা হয়। স্ট্যাক করে রাখা ফান্ড মালিকের কী দ্বারা নিয়ন্ত্রিত হয়।

নিরাপত্তা এবং ব্যবহারের স্বচ্ছতা মধ্যে একটি দক্ষ বাণিজ্য নিশ্চিত করার জন্য এই দায়িত্বের বিচ্ছেদ করা হয়েছে। উভয় কী Ethereum সামঞ্জস্যপূর্ণ ঠিকানা এবং ঠিক একই পদ্ধতিতে কাজ করে। এবং হ্যাঁ, একই মালিক এবং সাইনার কী থাকতে পারে।

## স্বাক্ষরকারীর কী {#signer-key}

signer কী হল একটি ঠিকানা যা Heimdall ব্লক, চেকপয়েন্ট এবং অন্যান্য signing সম্পর্কিত ক্রিয়াকলাপে স্বাক্ষর করার জন্য ব্যবহৃত হয়। এই কীয়ের ব্যক্তিগত কী স্বাক্ষর করার উদ্দেশ্যে যাচাইকারী নোডে থাকবে। এটি স্টেক, পুরস্কার বা প্রতিনিধিত্ব পরিচালনা করতে পারে না।

যাচাইকারী অবশ্যই এই ঠিকানায় দুটি ধরনের ব্যালেন্স রাখতে হবে:

- Heimdall-এ ম্যাটিক টোকেনগুলি (টপআপ লেনদেনের মাধ্যমে) Heimdall-এ যাচাইকারী দায়িত্ব পালন করার জন্য
- Ethereum-এ চেকপয়েন্ট পাঠানোর জন্য Ethereum চেইনে ETH

## মালিকের কী {#owner-key}

মালিক কী is ে একটি ঠিকানা যা স্ট্যাকিং, পুনরায় স্টেক, signer ার কী পরিবর্তন করতে হবে, রিওয়ার্ড প্রত্যাহার করে নিন এবং Ethereum চেইনে প্রতিনিধিদলের সংক্রান্ত প্যারামিটারগুলো পরিচালনা করুন। এই কীয়ের জন্য ব্যক্তিগত কী অবশ্যই যে কোনও মূল্যে নিরাপদ হতে হবে।

এই কী মাধ্যমে সমস্ত লেনদেন Ethereum চেইনে সঞ্চালিত হবে।

## স্বাক্ষরকারীর পরিবর্তন {#signer-change}


 `StakingInfo.sol`-এ Ethereum চেইনে সাইনার পরিবর্তনের ক্ষেত্রে নিম্নলিখিত ইভেন্ট তৈরি করা হয়[https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol)

```go
// Signer change
event SignerChange(
  uint256 indexed validatorId,
  address indexed oldSigner,
  address indexed newSigner,
  bytes signerPubkey
);
```

Heimdall ব্রিজ এই ঘটনাগুলি প্রক্রিয়া করে এবং ঘটনাগুলির উপর ভিত্তি করে স্টেট পরিবর্তন করার জন্য Heimdall-এ লেনদেন পাঠায়।