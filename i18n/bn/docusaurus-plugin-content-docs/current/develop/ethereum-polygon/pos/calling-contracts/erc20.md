---
id: erc20
title: ERC20 ডিপোজিট ও উইথড্র করার নির্দেশিকা
sidebar_label: ERC20
description: "ERC20 চুক্তির জন্য উপলভ্য ফাংশনসমূহ।"
keywords:
  - docs
  - matic
  - erc20
  - deposit
  - withdraw
image: https://matic.network/banners/matic-network-16x9.png
---

## উচ্চ স্তরের ফ্লো {#high-level-flow}

ERC20 ডিপোজিট করা -

1. **_ERC20Predicate_** চুক্তি **_অনুমোদন_** করে যে টোকেনগুলো ডিপোজিট করতে হবে সেগুলো খরচ করুন।
2. **_RootChainManager_**-এ **_depositFor_** কল করুন।

ERC20 উইথড্র করা -

1. Polygon চেইনে টোকেন **_বার্ন_** করুন।
2. বার্ন লেনদেনের প্রমাণ জমা করতে **_RootChainManager_**-এ **_বের হওয়া_**র ফাংশন কল করুন। বার্ন লেনদেন ধারণকারী ব্লকের জন্য **_চেকপয়েন্ট জমা_** দেওয়ার পরে এই কলটি করা যেতে পারে।

## সেটআপের বিস্তারিত {#setup-details}

### চুক্তিগুলিকে ইন্সটেনশিয়েট করুন {#instantiate-the-contracts}

```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### অনুমোদন করুন {#approve}
**_ERC20Predicate_** অনুমোদন করে টোকেন খরচ করতে টোকেন চুক্তির **_অনুমোদন_** ফাংশনটিকে কল করুন। এই ফাংশনে খরচকারী ও পরিমাণ নামে দুটি আর্গুমেন্ট আছে। **_খরচকারী_** হচ্ছে সেই ঠিকানা যা ব্যবহারকারীর টোকেন খরচের জন্য অনুমোদন দেয়া হচ্ছে। **_পরিমাণ_** হচ্ছে টোকেনের পরিমাণ যা খরচ করা যাবে। একবারের অনুমোদনের জন্য ডিপোজিটের অর্থের সমান পরিমাণ রাখুন বা বার বার অনুমোদন করতে না চাইলে বড় একটি পরিমাণ পাস করিয়ে নিতে পারেন।
```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### ডিপোজিট করুন {#deposit}
মনে রাখবেন কল করার পূর্বে টোকেন ম্যাপ করতে হবে এবং ডিপোজিটের জন্য পরিমাণ অনুমোদন করতে হবে।  
চুক্তির `depositFor()`ফাংশন কল `RootChainManager`করুন। এই ফাংশনে ৩ টি আর্গুমেন্ট takes  হয়: `userAddress`, `rootToken`, এবং `depositData`। `userAddress`হচ্ছে ব্যবহারকারীর ঠিকানা, যা Polygon চেইনে ডিপোজিট `rootToken`পাবে। হল প্রধান চেইনে টোকেন `depositData`ঠিকানা।
```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### বার্ন করুন {#burn}
চাইল্ড টোকেন চুক্তিতে **_উইথড্র_** ফাংশন কল করে Polygon চেইনে টোকেন বার্ন করা যাবে। এই ফাংশনটির জন্য শুধুমাত্র কতটা **_পরিমাণ_** টোকেন বার্ন করা হবে সেই আর্গুমেন্টের প্রয়োজন হয়। এক্সিট ধাপে এই বার্নের প্রমাণ জমা দিতে হবে। তাই লেনদেন হ্যাশ সংরক্ষণ করুন।
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### এক্সিট {#exit}
`RootChainManager`চুক্তির প্রস্থান ফাংশনের আনলক করতে হবে এবং থেকে ফিরে টোকেন পাবেন ।`ERC20Predicate` এই ফাংশনটি একটি একক বাইট আর্গুমেন্ট গ্রহণ করে যা বার্ন লেনদেন প্রমাণ করে। এই ফাংশন কল করার আগে বার্ন লেনদেনের ধারণকারী চেকপয়েন্ট জন্য অপেক্ষা করুন। প্রোফ নিম্নলিখিত ক্ষেত্রের RLP এনকোডিং দ্বারা তৈরি করা হয়-

1. headerNumber - চেকপয়েন্ট হেডার ব্লক নম্বর বার্ন tx ধারণ করে
2. blockProof - ব্লক হেডার (চাইল্ড চেইনে) যে জমাকৃত মের্কেল রুটে একটি লিফ তা প্রমাণ করে
3. blockNumber - চাইল্ড চেইনে বার্ন tx ধারণকারী ব্লক নম্বর
4. blockTime বার্ন tx ব্লকের সময়
5. txRoot - ব্লকের লেনদেনের রুট
6. receiptRoot - ব্লকের রিসিটের রুট
7. রিসিপ্ট - বার্ন লেনদেনের রিসিট
8. receiptProof - বার্ন রিসিটের Merkle প্রমাণ
9. branchMask - মের্কেল প্যাট্রিসিয়া ট্রি-তে রিসিটের পথ নির্দেশক 32 বিট
10. receiptLogIndex - রিসিট থেকে পড়ার জন্য লগ ইনডেক্স

ম্যানুয়ালি প্রমাণ তৈরি করার জন্য কৌশলের প্রয়োজন হতে পারে, তাই Polygon Edge ব্যবহার করার পরামর্শ দেওয়া হয়। আপনি যদি ম্যানুয়ালি লেনদেনটি পাঠাতে চান, তবে র কল ডেটা পেতে বিকল্প অবজেক্টে **_encodeAbi_**-কে **_সত্য_** হিসেবে পাস করতে পারেন।

```js
const exitCalldata = await maticPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

**_RootChainManager_**-এ এই কল ডেটা পাঠান।
```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
