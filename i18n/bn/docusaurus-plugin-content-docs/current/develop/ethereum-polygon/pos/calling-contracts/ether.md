---
id: ether
title: Ether ডিপোজিট এবং উইথড্র করার নির্দেশিকা
sidebar_label: Ether
description:  "Ether চুক্তির জন্য উপলভ্য ফাংশনসমূহ।"
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - ether
image: https://matic.network/banners/matic-network-16x9.png
---

## হাই লেভেল ফ্লো {#high-level-flow}

Ether ডিপোজিট করা -

- **RootChainManager**-এ depositEtherFor কল করুন এবং Ether এসেট পাঠান।

Ether উইথড্র করা -

1. Polygon চেইনে টোকেন **_বার্ন_** করুন।
2. বার্ন লেনদেনের প্রমাণ জমা করতে **_RootChainManager_**-এ **_বের হওয়া_**র ফাংশন কল করুন। বার্ন লেনদেন ধারণকারী ব্লকের জন্য **_চেকপয়েন্ট জম_**া দেওয়ার পরে এই কলটি করা যেতে পারে।

## ধাপের বিস্তারিত {#step-details}

### চুক্তিগুলিকে ইন্সটেনশিয়েট করুন {#instantiate-the-contracts}
```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### জমা করুন {#deposit}
চুক্তির `depositEtherFor`ফাংশন কল `RootChainManager`করুন। এই ফাংশনে 1 আর্গুমেন্ট গ্রহণ করা হয় - যা হচ্ছে ব্যবহারকারীর `userAddress`ঠিকানা, যা Polygon চেইনে ডিপোজিট পাবে। জমা করা ইথারের পরিমাণ লেনদেনের মান হিসাবে পাঠানো উচিত।

```js
await rootChainManagerContract.methods
  .depositEtherFor(userAddress)
  .send({ from: userAddress, value: amount })
```

### বার্ন করুন {#burn}
যেহেতু ইথার হল Polygon চেইনে একটি ERC20 টোকেন , তাই এর প্রত্যাহারের প্রক্রিয়া হল ERC20 withdrawal. টোকেন শিশু টোকেন চুক্তিতে `withdraw`ফাংশন কল করে burned া যেতে পারে। এই ফাংশনে একটি একক আর্গুমেন্ট takes , যা of া হবে টোকেন সংখ্যা `amount`নির্দেশ করে। এক্সিট ধাপে এই বার্নের প্রমাণ জমা দিতে হবে। তাই লেনদেন হ্যাশ সংরক্ষণ করুন।
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### এক্সিট {#exit}
`RootChainManager`চুক্তির প্রস্থান ফাংশনের আনলক করতে হবে এবং থেকে ফিরে টোকেন পাবেন ।`EtherPredicate` এই ফাংশনটি একটি একক বাইট আর্গুমেন্ট গ্রহণ করে যা বার্ন লেনদেন প্রমাণ করে। এই ফাংশন কল করার আগে বার্ন লেনদেনের ধারণকারী চেকপয়েন্ট জন্য অপেক্ষা করুন। প্রোফ নিম্নলিখিত ক্ষেত্রগুলো RLP-encoding দ্বারা তৈরি করা হয়:

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
