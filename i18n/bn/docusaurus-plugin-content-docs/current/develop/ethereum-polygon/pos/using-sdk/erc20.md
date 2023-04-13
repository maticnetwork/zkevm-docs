---
id: erc20
title: ERC20 ডিপোজিট ও উইথড্র করার নির্দেশিকা
sidebar_label: ERC20
description: "Polygon নেটওয়ার্কে ERC20 টোকেন ডিপোজিট ও উইথড্র করুন।"
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

[ERC20-এ সর্বশেষ Matic.js ডকুমেন্টেশন](https://maticnetwork.github.io/matic.js/docs/pos/erc20/) পরীক্ষা করুন।

এই টিউটোরিয়ালটি Polygon টেস্টনেট (মুম্বাই) ব্যবহার করে, যা দুটি ব্লকচেইনের মধ্যে অ্যাসেট আদানপ্রদান প্রদর্শন করতে Goerli নেটওয়ার্কে ম্যাপ করা হয়। এই টিউটোরিয়ালটি অনুসরণ করার সময় একটি **গুরুত্বপূর্ণ বিষয় মনে রাখতে** হবে এবং তা হলো যখনই পাওয়া যাবে তখন আপনাকে একটি প্রক্সি ঠিকানা ব্যবহার করতে হবে। উদাহরণস্বরূপ, **RootChainManagerProxy** ঠিকানা **RootChainManager** ঠিকানার পরিবর্তে মিথস্ক্রিয়া জন্য ব্যবহার করা হবে। **PoS চুক্তির ঠিকানা, ABI, টেস্ট টোকেনের ঠিকানা** এবং PoS ব্রিজ চুক্তির অন্যান্য ডিপ্লয়মেন্টের বিস্তারিত [এখানে](/docs/develop/ethereum-polygon/pos/deployment) পাওয়া যাবে।

আপনার অ্যাপ্লিকেশনে PoS ব্রিজ ইন্টিগ্রেট করতে **আপনার অ্যাসেটগুলো ম্যাপ করা** আবশ্যক। আপনি [এখানে](/docs/develop/ethereum-polygon/submit-mapping-request) ম্যাপিং অনুরোধ জমা করতে পারেন। কিন্তু এই টিউটোরিয়ালের উদ্দেশ্যে, আমরা ইতিমধ্যেই **টেস্ট টোকেন** deployed  করেছি এবং PoS ব্রিজে তাদের ম্যাপ করেছি। আপনার নিজে টিউটোরিয়ালটি চেষ্টা করার জন্য আপনার এটির প্রয়োজন হতে পারে। আপনি [ফসেট](https://faucet.polygon.technology/) থেকে কাঙ্ক্ষিত অ্যাসেটের অনুরোধ করতে পারেন। যদি test  টোকেন কল পাতায় unavailable না থাক, তাহলে [on](https://discord.com/invite/0xPolygonn) আমাদের কাছে যান।

আসন্ন টিউটোরিয়ালে, কোডের কিছু খুঁটিনাটি সহ প্রতিটি ধাপ বিস্তারিতভাবে ব্যাখ্যা করা হবে। তবে, আপনি সর্বদা এই [রিপোজিটরিটির](https://github.com/maticnetwork/matic.js/tree/master/examples/pos) উপর নজর রাখতে পারেন, যেখানে সকল **উদাহরণ হিসেবে প্রদত্ত সোর্স কোড** থাকবে, এবং PoS ব্রিজ নিয়ে কাজটি সংহত করতে ও বুঝতে আপনাকে সাহায্য করতে পারে।

## হাই লেভেল ফ্লো {#high-level-flow}

ERC20 ডিপোজিট করুন -

1. যে টোকেনগুলো ডিপোজিট করতে হবে **_তা ব্যয়_** করতে **_ERC20Predicate_** চুক্তি অনুমোদন করুন।
2. **_RootChainManager_**-এ **_depositFor_** কল করুন।

ERC20 উইথড্র করুন -

1. Polygon চেইনে টোকেন বার্ন করুন।
2. বার্ন লেনদেনের প্রমাণ জমা করতে function ার জন্য `exit()`ফাংশনের কল `RootChainManager`করুন। বার্ন লেনদেনের ধারণকারী ব্লকের জন্য চেকপয়েন্ট জমা দেওয়ার পরে এই কল তৈরি করা যেতে পারে।

## Steps বিবরণ {#steps-details}

### অনুমোদন করুন {#approve}

এটি একটি স্বাভাবিক ERC20 অনুমোদন। এর ফলে **_ERC20Predicate_** **_transferForm_** ফাংশন কল করতে পারবে। এই কলটি করতে Polygon POS **_অনুমোদন_** পদ্ধতি ব্যবহার করে।

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>,true);
  const approveResult = await erc20Token.approve(100);
  const txHash = await approveResult.getTransactionHash();
  const txReceipt = await approveResult.getReceipt();
}
```

### জমা করুন {#deposit}

মনে রাখবেন যে টোকেন আগে ট্রান্সফার করার জন্য ম্যাপ করা এবং অনুমোদন করা দরকার। Polygon PoS ক্লায়েন্ট এই কল করার `deposit()`পদ্ধতি প্রকাশ করে।

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);

  //deposit 100 to user address
  const result = await erc20Token.deposit(100, <user address>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();

}
```

:::note
একটি **স্টেট সিঙ্ক** মেকানিজম ব্যবহার করে Ethereum থেকে Polygon পর্যন্ত ডিপোজিট happen ে এবং প্রায় 22-30 মিনিট সময় নিন। এই সময়ের ব্যবধানে অপেক্ষা করার পরে, web3.js/matic.js লাইব্রেরি ব্যবহার করে বা Metamask ব্যবহার করে ব্যালেন্স চেক করতে সুপারিশ করা হয়। চাইল্ড চেইনে অন্তত একটি অ্যাসেট ট্রান্সফার করা হলেই এক্সপ্লোরার ব্যালেন্স দেখাবে। এই [<ins>লিঙ্কটি</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos) কিভাবে ডিপোজিট ইভেন্টগুলি ট্র্যাক করতে হবে তা ব্যাখ্যা করে।
:::

### বার্ন করার WithdrawStart পদ্ধতি {#withdrawstart-method-to-burn}

এই `withdrawStart()`পদ্ধতিটি তোলার প্রক্রিয়া শুরু করতে ব্যবহার করা যেতে পারে যা Polygon চেইনে নির্দিষ্ট পরিমাণ বার্ন করবে।

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = posClient.erc20(<child token address>);

  // start withdraw process for 100 amount
  const result = await erc20Token.withdrawStart(100);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```

এই কলটির জন্য লেনদেনের হ্যাশ সংরক্ষণ করুন এবং বার্নের প্রমাণ তৈরি করার সময় এটি ব্যবহার করুন।

### এক্সিট {#exit}

বার্ন লেনদেনের ধারণকারী ব্লকের জন্য চেকপয়েন্ট জমা Once া হলে, ব্যবহারকারীকে অবশ্যই `RootChainManager`কন্ট্রাক্ট এর `exit()`ফাংশন কল করতে হবে এবং বার্নের প্রমাণ জমা দিতে হবে। বৈধ প্রমাণ জমা দেও, া হলে টোকেন ব্যবহারকারীতে স্থানান্তর করা হয়। Polygon PoS ক্লায়েন্ট এই কল করার `withdrawExit`পদ্ধতি প্রকাশ করে। মেইন চেইনে চেকপয়েন্ট অন্তর্ভুক্ত হওয়ার পরেই কেবল এই ফাংশনটি কল করা যেতে পারে। এই [গাইডটি](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events) অনুসরণ করে চেকপয়েন্ট অন্তর্ভুক্তি ট্র্যাক করা যেতে পারে।

withDrawStart পদ্ধতি থেকে *txHash* ব্যবহার করে উইথড্র করার প্রক্রিয়া থেকে এক্সিট করতে *withDrawExit* পদ্ধতি ব্যবহার করা যেতে পারে।

:::note
withdrawStart লেনদেনটি হবে চেকপয়েন্ট যাতে উত্তোলন প্রস্থান করতে হবে।
:::

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);
  const result = await erc20Token.withdrawExit(<burn tx hash>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```
