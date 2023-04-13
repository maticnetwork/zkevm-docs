---
id: installation
title: ইনস্টলেশন
keywords:
    - pos client
    - erc20
    - withdrawExit
    - polygon
    - sdk
description: MATIC.js এবং Ethereum লাইব্রেরি ইনস্টল করুন।
---

maticjs-এর দুটি অংশ রয়েছে -

1. প্রধান লাইব্রেরি
2. Ethereum লাইব্রেরি

### প্রধান লাইব্রেরি {#main-library}

প্রধান লাইব্রেরি মূল লজিক সম্বলিত এবং বিভিন্ন API প্রদান করে। ব্যবহারকারী মূলত এই লাইব্রেরির সাথে ইন্টারঅ্যাক্ট করে।

```
npm i @maticnetwork/maticjs
```

### Ethereum লাইব্রেরি {#ethereum-library}

Ethereum লাইব্রেরি আমাদেরকে পছন্দের যেকোনো ether লাইব্রেরি ব্যবহার করার সুযোগ দেয়। প্লাগইন ব্যবহার করে এটি maticjs-এ প্রবেশ করানো হয়।

matic.js দুটি জনপ্রিয় লাইব্রেরিকে সাপোর্ট করে -

1. [Web3.js](https://web3js.readthedocs.io/)
2. [Ethers](https://docs.ethers.io/)

#### Web3.js {#web3-js}

```
npm install @maticnetwork/maticjs-web3
```

#### ethers {#ethers}

```
npm install @maticnetwork/maticjs-ethers
```
