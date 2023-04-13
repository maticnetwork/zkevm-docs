---
id: eth
title: ETH জমা এবং উইথড্রের নির্দেশিকা
sidebar_label: ETH
description: "Polygon নেটওয়ার্কে ETH টোকেন জমা এবং উইথড্র করুন।"
keywords:
  - docs
  - matic
  - ether
  - withdraw
  - deposit
image: https://matic.network/banners/matic-network-16x9.png
---

[ETH-এ সর্বশেষ Matic.js ডকুমেন্টেশন পরীক্ষা](https://maticnetwork.github.io/matic.js/docs/pos/deposit-ether/) করুন।

## সারাংশ {#quick-summary}

Polygon নেটওয়ার্কে কীভাবে ERC20 টোকেন জমা এবং উইথড্র করতে হয় Docs-এর এই অংশে আলোচনা করা হয়। স্ট্যান্ডার্ডের সাথে উপযুক্ত হিসেবে নামকরণ এবং বাস্তবায়নের প্যাটার্নে বৈচিত্র সহ Docs-এর ETH, ERC20, ERC721 এবং ERC1155 বিভাগের মধ্যে সাধারণ সুবিধাগুলো রয়েছে। Docs-এর এই অংশটি ব্যবহার করার জন্য সবচেয়ে গুরুত্বপূর্ণ পূর্বশর্ত হলো আপনার অ্যাসেটগুলো ম্যাপিং করা, তাই অনুগ্রহ করে এখানে আপনার ম্যাপিং-এর অনুরোধ [এখানে](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) জমা করুন।

## ভূমিকা {#introduction}

এই নির্দেশিকাটি Polygon টেস্টনেট (মুম্বই) ব্যবহার করে, যা দুটি ব্লকচেইনের মধ্যে অ্যাসেট ট্রান্সফার প্রদর্শন করতে Goerli নেটওয়ার্কে নিজে ম্যাপ করা আছে। মনে রাখা গুরুত্বপূর্ণ যে, এই টিউটোরিয়ালের উদ্দেশ্য পূরণে, সম্ভব হলে আপনার একটি প্রক্সি ঠিকানা ব্যবহার করা উচিত। এর কারণ হলো, চুক্তির কোডে নতুন আপডেট যোগ করা হলে বাস্তবায়ন চুক্তির ঠিকানা পরিবর্তন করার বিষয়টি দায়বদ্ধ থাকলে, প্রক্সি কখনই পরিবর্তন হয় না এবং এটি সর্বশেষ বাস্তবায়নে সকল ইনকামিং কলকে রিডিরেক্ট করে। সংক্ষেপে, আপনি যদি প্রক্সি ঠিকানা ব্যবহার করেন, তবে প্রস্তুত হওয়ার আগে বাস্তবায়ন চুক্তিতে হওয়া কোনো ধরণের পরিবর্তন সম্পর্কে আপনাকে চিন্তা করতে হবে না।

উদাহরণস্বরূপ, ঠিকানাটির পরিবর্তে for জন্য `RootChainManagerProxy`ঠিকানা ব্যবহার `RootChainManager`করুন। PoS চুক্তি ঠিকানা, ABI, এবং Test মতো Deployment বিবরণ [এখানে](/docs/develop/ethereum-polygon/pos/deployment/) পাওয়া যাবে।

আপনার অ্যাপ্লিকেশনে PoS ব্রিজ সংহত করার জন্য আপনার অ্যাসেটগুলো ম্যাপ করা একটি প্রয়োজনীয় ধাপ, তাই আপনি যদি এটি না করে থাকেন, তবে [এখানে](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) ম্যাপিং-এর একটি অনুরোধ জমা করুন। এই টিউটোরিয়ালের উদ্দেশ্যে, দলটি টেস্ট টোকেন ডিপ্লয় করেছে এবং PoS ব্রিজে সেগুলো ম্যাপ করেছে। আপনি [ফসেটে](https://faucet.polygon.technology/)  যে অ্যাসেট ব্যবহার করতে চান তার অনুরোধ করুন এবং যদি টেস্ট টোকেন পাওয়া না যায়, তবে [Discord](https://discord.com/invite/0xPolygon)-এ থাকা দলের সাথে যোগাযোগ করুন। আপনাকে আমরা তাড়াতাড়ি জবাব দেওয়ার চেষ্টা করব।

আসন্ন টিউটোরিয়ালে, কোডের কিছু খুঁটিনাটি সহ প্রতিটি ধাপ বিস্তারিতভাবে ব্যাখ্যা করা হবে। তবে, আপনি সর্বদা এই [রিপোজিটরিটির](https://github.com/maticnetwork/matic.js/tree/master/examples) উপর নজর রাখতে পারেন, যেখানে সকল **উদাহরণ হিসেবে প্রদত্ত সোর্স কোড** থাকবে, এবং PoS ব্রিজ নিয়ে কাজটি সংহত করতে ও বুঝতে আপনাকে সাহায্য করতে পারে।

## উচ্চ স্তরের ফ্লো {#high-level-flow}

ETH জমা করুন -

1. **_RootChainManager_**-এ **_depositEtherFor_** কল করুন এবং **প্রয়োজনীয় ether **পাঠান।

ETH উইথড্র করুন -

1. Polygon চেইনে টোকেন **_বার্ন_** করুন।
2. বার্ন লেনদেনের প্রমাণ জমা করতে **_RootChainManager_**-এ **_বের হওয়া_**র ফাংশন কল করুন। বার্ন লেনদেন ধারণকারী ব্লকের জন্য **_চেকপয়েন্ট জম_**া দেওয়ার পরে এই কলটি করা যেতে পারে।

## ধাপসমূহ {#steps}

### জমা করুন {#deposit}

**RootChainManager** চুক্তিতে **depositEtherFor** কল করে Polygon চেইনে ETH জমা করা যেতে পারে। এই কলটি করতে Polygon PoS ক্লায়েন্ট **depositEther** পদ্ধতি প্রকাশ করে।

```jsx
const result = await posClient.depositEther(<amount>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```

:::note
**স্টেট সিঙ্ক** মেকানিজম ব্যবহার করে Ethereum থেকে Polygon পর্যন্ত ডিপোজিট to ে এবং এটি প্রায় 22-30 মিনিট সময় নেয়। এই সময়ের ব্যবধানে অপেক্ষা করার পরে, web3.js/matic.js লাইব্রেরি ব্যবহার করে বা Metamask ব্যবহার করে ব্যালেন্স চেক করতে সুপারিশ করা হয়। চাইল্ড চেইনে অন্তত একটি অ্যাসেট ট্রান্সফার করা হলেই এক্সপ্লোরার ব্যালেন্স দেখাবে। এই [<ins>লিঙ্কটি</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/) কিভাবে ডিপোজিট ইভেন্টগুলি ট্র্যাক করতে হবে তা ব্যাখ্যা করে।
:::

### বার্ন করুন {#burn}

ETH একটি Polygon চেইনে ERC20 টোকেন হিসাবে জমা আছে। প্রত্যাহার করে নিন ERC20 টোকেন প্রত্যাহারের মতো একই প্রক্রিয়া অনুসরণ করে।

টোকেন বার্ন করতে এবং প্রত্যাহারের প্রক্রিয়া engage ে, MaticWETH চুক্তির প্রত্যাহারের ফাংশন কল করুন। যেহেতু ইথার হল Polygon চেইনে একটি ERC20 টোকেন , তাই আপনাকে Polygon PoS Ether **ERC20** টোকেন শুরু করতে হবে এবং তারপর বার্ন প্রক্রিয়া শুরু করতে `withdrawStart()`পদ্ধতি কল করুন।

```jsx
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

এই কলটির জন্য লেনদেনের হ্যাশ সংরক্ষণ করুন এবং বার্নের প্রমাণ তৈরি করার সময় এটি ব্যবহার করুন।

### এক্সিট {#exit}


বার্ন লেনদেনের ধারণকারী ব্লকের জন্য **চেকপয়েন্ট** জমা Once া হলে, ব্যবহারকারীকে `RootChainManager`কন্ট্রাক্ট **এক্সিট** ফাংশন কল করতে হবে এবং বার্নের প্রমাণ জমা দিতে হবে। কার্যকর টোকেনের প্রমাণ জমা দেওয়ার পর তা ব্যবহারকারীর কাছে স্থানান্তর করা হয়। এই কলটি করতে Polygon POS ক্লায়েন্ট`erc20` `withdrawExit`  পদ্ধতি প্রকাশ করে। প্রধান চেইনে চেকপয়েন্ট অন্তর্ভুক্ত হওয়ার পরেই এই ফাংশনটিকে কল করা যেতে পারে। এই [নির্দেশনাটি](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events) অনুসরণ করে চেকপয়েন্ট অন্তর্ভুক্তির বিষয়টি ট্র্যাক করা যেতে পারে।


```jsx
// token address can be null for native tokens like ethereum or matic
const erc20RootToken = posClient.erc20(<token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
