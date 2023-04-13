---
id: fx-portal
title: FxPortal
description: FxPortal ব্যবহার করে ম্যাপিং ছাড়া Ethereum থেকে Polygon থেকে রাষ্ট্রটি বা ডেটা স্থানান্তর করুন।
keywords:
  - docs
  - polygon wiki
  - polygon
  - FxPortal
  - ethereum to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

পলিগনের থেকে নেটিভ হওয়া Ethereum ডেটা পড়তে স্বাভাবিক **প্রক্রিয়াটি হচ্ছে স্টেট সিঙ্ক** ব্যবহার করা হচ্ছে। এটি Ethereum থেকে Polygon-এ অবাধে ডেটা ট্রান্সফার করতে সক্ষম করে। তবে, এই পদ্ধতিটি রুট এবং চাইল্ড চুক্তির ম্যাপিং করার জন্যও প্রয়োজন, যদি ডিফল্ট ইন্টারফেস ব্যবহার করা না যায়। FxPortal এমন একটি বিকল্প প্রদান করে, যেখানে কোনো ম্যাপিং ছাড়াই ERC স্ট্যান্ডার্ড অনুযায়ী টোকেন ডিপ্লয় করা যেতে পারে, শুধুমাত্র ভিত্তি FxPortal চুক্তি ব্যবহার করে।

## FxPortal কি? {#what-is-fxportal}

এটি Polygon [স্টেট সিঙ্ক](../../pos/state-sync/state-sync-mechanism.md) মেকানিজমের একটি শক্তিশালী কিন্তু সহজ বাস্তবায়ন। Polygon PoS ব্রিজ একই আর্কিটেকচারে নির্মিত। [উদাহরণের](https://github.com/fx-portal/contracts/tree/main/contracts/examples) ফোল্ডারের কোডটি ব্যবহারের কিছু উদাহরণ। আপনি সহজেই আপনার নিজের বাস্তবায়ন বা নিজের কাস্টম ব্রিজ তৈরি করতে এই উদাহরণ ব্যবহার করতে পারেন যা ম্যাপিং ছাড়া যে কোন স্টেট-সিঙ্ক করতে পারে।

আপনি চুক্তি এবং উদাহরণের জন্য [GitHub](https://github.com/fx-portal/contracts) রিপোজিটরি চেক করতে পারেন।

## এটি কীভাবে কাজ করে? {#how-does-it-work}

[FxChild](https://github.com/fx-portal/contracts/blob/main/contracts/FxChild.sol) এবং [FxRoot](https://github.com/fx-portal/contracts/blob/main/contracts/FxRoot.sol) হল মূল কন্ট্রাক যার উপর FxPortal কাজ করে। এটি রাষ্ট্রের সিঙ্ক মেকানিজমের ব্যবহার করে যে কোন ম্যাপিং ছাড়া অন্য চেইনে ব্যবহারকারী-সংজ্ঞায়িত পদ্ধতিতে ডেটা কল এবং পাস করে। ডিপ্লয় করা প্রধান চুক্তিগুলো ব্যবহার করার জন্য, আপনি আপনার ডিপ্লয় করা স্মার্ট চুক্তিতে FxPortal-এর বেস চুক্তি বাস্তবায়ন করতে পারেন [- FxBaseRootTunn](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseRootTunnel.sol)el এব[ং FxBaseChildTunn](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseChildTunnel.sol)el। এই চুক্তিগুলোর উপর তৈরি করার মাধ্যমে, ডেটা টানেন প্রক্রিয়া ব্যবহার করে আপনার ডিপ্লয় চুক্তিগুলো একে অপরের সাথে যোগাযোগ করতে সক্ষম হবে।

অন্যথায়, আপনি ইতিমধ্যে মোতায়েন করা টানেলের কন্ট্র্যাক্ট নিয়ে আপনার টোকেন ম্যাপ করতে চয়ন করতে পারেন। Polygon Mainnet এবং Mumbai for জন্য ডিফল্ট FxTunnel deployment মেন্ট বিস্তারিত নিম্নরূপ রয়েছে:

- [Polygon মেইননেট](https://static.matic.network/network/mainnet/v1/index.json)
- [মুম্বাই Testnet](https://static.matic.network/network/testnet/mumbai/index.json)

সমস্ত ডিফল্ট টানেল চুক্তি এবং অন্যান্য গুরুত্বপূর্ণ FxPortal চুক্তি deployments. খুঁজে পেতে উপরের `FxPortalContracts`লিঙ্কটিতে কীওয়ার্ড খুঁজ. ।

## আমার কি একটি কাস্টম FxTunnel বাস্তবায়ন দরকার? {#do-i-need-a-custom-fxtunnel-implementation}

আপনাকে অবশ্যই একটি **কাস্টম FxTunnel** বাস্তবায়নের জন্য যেতে হবে যদি ডিফল্ট টানেলের বাস্তবায়নের জন্য আপনার ব্যবহারের ক্ষেত্রে কোন সারিতে নেই। আপনি যখন ডিফল্ট FxPortal টানেল ব্যবহার করেন, তখন আপনি চাইল্ড কন্ট্রাক্ট কোড পরিবর্তন করতে পারবেন না। শিশু টোকেন চুক্তির জন্য bytecode সবসময় স্থির থাকে এবং সর্বদা [ডিফল্ট FxTunnel deployments](https://github.com/fx-portal/contracts/tree/main/contracts/examples). জন্য একই থাকবে। যদি আপনার একটি কাস্টম চাইল্ড টোকেন প্রয়োজন হয়, তাহলে আপনাকে অবশ্যই আপনার নিজের কাস্টম for জন্য যেতে হবে এবং পরবর্তী অংশটি পড়া হবে তাহলে আপনার নিজের কাস্টম the জন্য আপনাকে আরও গাইড করবে।

আসন্ন অধ্যায় পড়ার আগে [FxPortal State Transfer](state-transfer.md) পড়তে এবং বুঝতে অত্যন্ত সুপারিশ করা হয়। এই আসন্ন বিভাগের প্রতিটি এর সাথে সংযুক্ত উদাহরণস্বরূপ টানেল চুক্তি লিঙ্ক থাকবে। এই উদাহরণগুলো আপনার নিজস্ব কাস্টম fx-tunnels. তৈরি করার সময় একটি রেফারেন্স হিসাবে গ্রহণ করা যেতে পারে।

## ERC20 ট্রান্সফার {#erc20-transfer}

[শিশু এবং রুট টানেলের চুক্তি](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc20-transfer) মূল চেইনে টোকেন ডিপোজিট এবং চাইল্ড চেইনে প্রত্যাহারের জন্য সক্ষম হয়।

#### `FxERC20RootTunnel`

- `mapToken(address rootToken)`: আপনি আপনার ERC20 টোকেন ম্যাপ করতে এবং চাইল্ড চেইনে একটি সংশ্লিষ্ট চাইল্ড টোকেন তৈরি করতে মোতায়েন ঠিকানায় ফাংশন কল করতে পারেন।
- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: mapped া টোকেনের ঠিকানা সহ কল `deposit()`পদ্ধতি, একটি সংশ্লিষ্ট পরিমাণ (প্রয়োজন হলে ডাটা সহ প্রত্যাহার করতে পারে এমন ঠিকানা। আপনার টোকেনগুলো প্রথমে ব্যয় করার জন্য স্ট্যান্ডার্ড ERC20 `approve` ফাংশনটি ব্যবহার করে আপনাকে অবশ্যই চুক্তিটি অনুমোদন করতে হবে।

#### `FxERC20ChildTunnel`

- `withdraw(address childToken, uint256 amount)`: এই ফাংশনের মাধ্যমে নির্ধারিত ঠিকানা চাইল্ড টোকেন সব পরিমাণ প্রত্যাহার করতে `deposit()`পারে। প্রথমে ম্যাপ করার সময় তৈরি করা চাইল্ড টোকেন তারা গ্রহণ করবে।
- `rootToChildToken`এই পাবলিক variable শিশু টোকেন to রুট টোকেন রয়েছে। আপনি ডিপ্লয় করা চাইল্ড টোকেনের ঠিকানা জানতে রুট টোকেনের ঠিকানা দিয়ে ম্যাপিং কুয়েরি করতে পারেন।

### Ethereum → Polygon {#polygon}

1. রুট চেইনে আপনার নিজস্ব ERC20 টোকেন ডিপ্লয় করুন। পরে আপনার এই ঠিকানাটির প্রয়োজন হবে।
2. রুট টানেলের ঠিকানা এবং আর্গুমেন্ট হিসেবে পরিমাণ সহ `approve()` ফাংশন কল করে ট্রান্সফার করার জন্য টোকেন অনুমোদন করুন।
3. চাইল্ড চেইনে সমতুল্য পরিমাণ চাইল্ড টোকেন পেতে রুট চেইনে থাকা গ্রহীতার ঠিকানা সহ `deposit()`-কে কল করতে এগিয়ে যান। এটি স্বয়ংক্রিয়ভাবে টোকেনকেও ম্যাপ করবে। বিকল্পভাবে, জমা করার পূর্বে আপনি প্রথমে `mapToken()` কল করতে পারেন।
4. ম্যাপিং করার পরে, আপনি এখন টানেলের এবং `withdraw`ফাংশন ব্যবহার `deposit`করে ক্রস-চেইন ট্রান্সফার এক্সিকিউট করতে পারবেন।

:::note

আপনি রুট চেইনে `deposit()`সঞ্চালিত হওয়ার পরে, রাষ্ট্রের সিঙ্ক ঘটতে 22-30 মিনিট সময় লাগবে। একবার রাষ্ট্র সিঙ্ক ঘটলে, আপনি প্রদত্ত ঠিকানায় জমা থাকা টোকেন পাবেন।

:::

### Polygon → Ethereum {#ethereum}

1. চাইল্ড টোকেনটিকে রুট চেইনের মনোনীত গ্রহীতায় ফিরিয়ে নিতে, চাইল্ড চুক্তিতে আর্গুমেন্ট হিসেবে সংশ্লিষ্ট টোকেনের ঠিকানা এবং পরিমাণ স`withdraw()`হ -কে কল করতে এগিয়ে যান। **tx হ্যাশ নোট করুন**, কারণ বার্নের প্রমাণ তৈরি করতে এটি ব্যবহার করা হবে।

2. আপনি [এখানে](#withdraw-tokens-on-the-root-chain) প্রত্যাহারের সম্পূর্ণ করার জন্য পদক্ষেপগুলি খুঁজে পেতে পারেন।

## ERC721 ট্রান্সফার {#erc721-transfer}

যদি আপনার একটি উদাহরণ প্রয়োজন হয়, তাহলে দয়া করে এই [ERC721 Root এবং Child Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc721-transfer) গাইড দেখুন।

### Ethereum → Polygon {#polygon-1}

1. রুট চেইনে আপনার নিজস্ব ERC721 টোকেন ডিপ্লয় করুন। পরে আপনার এই ঠিকানাটির প্রয়োজন হবে।
2. রুট টানেলের ঠিকানা এবং আর্গুমেন্ট হিসেবে টোকেন আইডি সহ `approve()` ফাংশন কল করে ট্রান্সফার করার জন্য টোকেন অনুমোদন করুন।
3. চাইল্ড চেইনে সমতুল্য পরিমাণ চাইল্ড টোকেন পেতে রুট চেইনে গ্রহীতা ও টোকেন আইডির ঠিকানা সহ `deposit()`-কে কল করতে এগিয়ে যান। এটি স্বয়ংক্রিয়ভাবে টোকেনকেও ম্যাপ করবে। বিকল্পভাবে, জমা করার পূর্বে আপনি প্রথমে `mapToken()` কল করতে পারেন।

:::note

আপনি রুট চেইনে `deposit()`সঞ্চালিত হওয়ার পরে, রাষ্ট্রের সিঙ্ক ঘটতে 22-30 মিনিট সময় লাগবে। একবার রাষ্ট্র সিঙ্ক ঘটলে, আপনি প্রদত্ত ঠিকানায় জমা থাকা টোকেন পাবেন।

:::

### Polygon → Ethereum {#ethereum-1}

1. চাইল্ড টোকেনটিকে রুট চেইনের মনোনীত গ্রহীতায় ফিরিয়ে নিতে, চাইল্ড চুক্তিতে আর্গুমেন্ট হিসেবে সংশ্লিষ্ট টোকেনের ঠিকানা এবং টোকেন আইডি স`withdraw()`হ -কে কল করতে এগিয়ে যান। **নোট করুন যে tx হ্যাশ** বার্ন প্রমাণ তৈরি করতে ব্যবহার করা হবে।

2. আপনি [এখানে](#withdraw-tokens-on-the-root-chain) প্রত্যাহারের সম্পূর্ণ করার জন্য পদক্ষেপগুলি খুঁজে পেতে পারেন।

## ERC1155 ট্রান্সফার {#erc1155-transfer}

যদি আপনার একটি উদাহরণ প্রয়োজন হয়, তাহলে দয়া করে এই [ERC1155 রুট এবং চাইল্ড টানেল](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc1155-transfer) গাইডটি দেখুন।

#### `FxERC1155RootTunnel`

- `mapToken(rootToken)`: চাইল্ড চেইনে আপনার রুট ERC1155 টোকেন ম্যাপ করতে ব্যবহৃত হয়
- `deposit(rootToken, user, id, amount, data)`: চাইল্ড চেইনে রুট টোকেন জমা করার জন্য ব্যবহৃত ফাংশন
- `depositBatch(rootToken, user,  ids, amounts, bytes memory data)`: একাধিক টোকেন আইডি এবং সংশ্লিষ্ট পরিমাণের জন্য ব্যবহৃত হয়
- `receiveMessage(inputData)`: `inputData`হিসেবে payload দিয়ে বার্নের প্রমাণ করার পরে কল করা হবে

#### `FxERC1155ChildTunnel`

- `withdraw(childToken, id, amount, data)`: Polygon থেকে Ethereum-এ টোকেন উইথড্র করতে ব্যবহৃত হয়
- `withdrawBatch(childToken, ids, amounts, data)`: উইথড্র করার মতোই, তবে একাধিক টোকেন আইডি উইথড্র করার জন্য

### Ethereum → Polygon {#polygon-2}

1. রুট চেইনে আপনার ERC1155 টোকেন ডিপ্লয় করুন। পরে আপনার এই ঠিকানাটির প্রয়োজন হবে।
2. আপনার টোকেন পলিগনে `FxERC1155RootTunnel`স্থানান্তর করতে `operator`হবে এমন `FxERC1155RootTunnel`ঠিকানা সহ deployed টোকেন কল `setApprovalForAll(operator, approved)``FxERC1155ChildTunnel`করুন।
3. আপনার মোতায়েন টোকেনের ঠিকানা হিসাবে কল `mapToken()``FxERC1155RootTunnel`অন করুন।`rootToken` এটি Polygon-এ ERC1155 টোকেন deploy ে এবং মানচিত্রে এটি `FxERC1155ChildTunnel`নির্দেশ করার জন্য একটি বার্তা পাঠাবে। আপনার সন্তানের টোকেন ঠিকানা প্রশ্নের জন্য `rootToChildToken`ফোন করুন।`FxERC1155ChildTunnel`
4. Ethereum এ টোকেন এর ঠিকানাটি `FxERC1155RootTunnel`দিয়ে ফোন `deposit()`করুন, যেমন `rootToken`রিসিভার , `user`টোকেন আইডি `id`এবং যেমন পরিমাণ ।`amount` বিকল্পভাবে, একাধিক টোকেন আইডির জন্য আপনি `depositBatch()`-কে কল করতে পারেন।

:::note

আপনি রুট চেইনে `deposit()`সঞ্চালিত হওয়ার পরে, রাষ্ট্রের সিঙ্ক ঘটতে 22-30 মিনিট সময় লাগবে। একবার রাষ্ট্র সিঙ্ক ঘটলে, আপনি প্রদত্ত ঠিকানায় জমা থাকা টোকেন পাবেন।

:::

### Polygon → Ethereum {#ethereum-2}

1. Polygon এ এবং টোকেন আইডি `id`হিসাবে (চাইল্ড টোকেন ঠিকানা ম্যাপিং থেকে queried হতে পারে এমন `childToken`হিসাবে পলিগনে মোতায়েন করা শিশু টোকেন ঠিকানাটির ঠিকানাটি `FxERC1155ChildTunnel`দিয়ে কল `withdraw()``rootToChildToken`করুন)। বিকল্পভাবে, একাধিক টোকেন আইডি এবং সংশ্লিষ্ট পরিমাণের জন্য আপনি `withdrawBatch()`-কেও কল করতে পারেন। **নোট করুন যে tx হ্যাশ** বার্ন প্রমাণ তৈরি করতে ব্যবহার করা হবে।

2. আপনি [এখানে](#withdraw-tokens-on-the-root-chain) প্রত্যাহারের সম্পূর্ণ করার জন্য পদক্ষেপগুলি খুঁজে পেতে পারেন।

## রুট চেইনে টোকেন উত্তোলন করুন {#withdraw-tokens-on-the-root-chain}

:::info

আপনি চাইল্ড চেইনে `withdraw()`সঞ্চালিত হওয়ার পরে, একটি চেকপয়েন্ট ঘটতে 30-90 মিনিট সময় লাগবে। পরবর্তী চেকপয়েন্টে বার্ন লেনদেন অন্তর্ভুক্ত থাকলে, আপনি রুট চেইনে টোকেন প্রত্যাহার করতে পারেন।

:::

1. **tx হ্যাশ** এবং **MESSAGE_SENT_EVENT_SIG** ব্যবহার করে বার্ন প্রমাণ তৈরি করুন। প্রমাণ তৈরি করতে, আপনি Polygon দ্বারা হোস্ট করা প্রুফ জেনারেশন API ব্যবহার করতে পারেন বা আপনি [এখানে](https://github.com/maticnetwork/proof-generation-api) নির্দেশাবলী অনুসরণ করে আপনার নিজের প্রুফ জেনারেশন API স্পিন করতে পারেন।

Polygon দ্বারা হোস্ট করা প্রুফ জেনারেশন endpoint [এখানে](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature}) পাওয়া গি. াই।

  - `burnTxHash`আপনি Polygon-এ শুরু করা `withdraw()`লেনদেনের হ্যাশ।
  - `eventSignature`ফাংশনের দ্বারা নির্গত ইভেন্টের ইভেন্ট `withdraw()`স্বাক্ষর। MESSAGE_SENT_EVENT_SIG এর জন্য ইভেন্ট স্বাক্ষর `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`।

মেইননেট এবং Testnet জন্য প্রমাণ প্রজন্মের API ব্যবহারের উদাহরণ নিম্নরূপ:

→ [Polygon মেইননেট প্রুফ জেনারেশন](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [মুম্বাই Testnet প্রুফ জেনারেশন](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

2. Goerli বা Ethereum-এ সংশ্লিষ্ট রুট টানেলের চুক্তির `receiveMessage()`আর্গুমেন্ট হিসাবে জেনারেট পেলোডটি ফিড করুন।

## মিন্টেবল ERC-20 ট্রান্সফার {#mintable-erc-20-transfer}

যদি আপনার একটি উদাহরণ প্রয়োজন হয়, তাহলে দয়া করে এই [Mintable ERC20 Root এবং Child Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc20-transfer) গাইড দেখুন।

:::info

Mintable Token FxTunnels এর ক্ষেত্রে, চাইল্ড টোকেন প্রথম মোতায়েন করা gets ে এবং প্রথম মোতায়েন করা হ. ে শুধুমাত্র প্রথম মোতায়েন করা হ. । মূল টোকেন চুক্তি ঠিকানা চাইল্ড contract root  হওয়ার পরে pre-determined হতে পারে, কিন্তু ম্যাপিং টেকনিক্যালি হবে যখন প্রথম withdrawal/exit সম্পন্ন is ে।

:::

#### `FxMintableERC20RootTunnel`

- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: Ethereum থেকে Polygon-এ টোকেন জমা করতে
- `receiveMessage(bytes memory inputData)`: যেহেতু রুট চেইনে টোকেন `inputData` পাওয়ার কারণে, বার্নের প্রমাণ প্রবেশ করাতে হবে

#### `FxMintableERC20ChildTunnel`

- `deployChildToken(uint256 uniqueId, string memory name, string memory symbol, uint8 decimals)`: Polygon নেটওয়ার্কে একটি ERC20 টোকেন deploy  করতে
- `mintToken(address childToken, uint256 amount)`: Polygon-এ একটি নির্দিষ্ট পরিমাণ টোকেন মিন্ট করুন
- `withdraw(address childToken, uint256 amount)`: রুট চেইনে উইথড্র করতে চাইল্ড চেইনে টোকেন বার্ন করতে

### Polygon এ টোকেন মিন্টন করা হচ্ছে {#minting-tokens-on-polygon}

1. `FxMintableERC20ChildTunnel`-এ `deployChildToken()`-কে কল করুন এবং প্যারামিটার হিসেবে টোকেনের প্রয়োজনীয় তথ্য পাস করুন। এটি একটি `TokenMapped` ইভেন্ট প্রেরণ করে, যা `rootToken` এবং `childToken` ঠিকানা ধারণ করে। এই ঠিকানাগুলো নোট করুন।
2. চাইল্ড চেইনে টোকেন মিন্ট করতে `FxMintableERC20ChildTunnel`-এ `mintToken()`-কে কল করুন।
3. Polygon থেকে টোকেন উইথড্র করতে `FxMintableERC20ChildTunnel`-এ `withdraw()`-কে কল করুন। এই বার্ন প্রমাণ তৈরি করার জন্য সুবিধাজনক হবে হিসাবে লেনদেনের হ্যাশ নোট করুন।
4. আপনি [এখানে](#withdraw-tokens-on-the-root-chain) প্রত্যাহারের সম্পূর্ণ করার জন্য পদক্ষেপগুলি খুঁজে পেতে পারেন।

### Ethereum এ টোকেন উত্তোলন করুন {#withdrawing-tokens-on-ethereum}

`FxMintableERC20RootTunnel`-এ `receiveMessage()`-এ আর্গুমেন্ট হিসেবে তৈরি বার্নের প্রমাণ ফিড করুন। এর পরে, টোকেনের ব্যালেন্স রুট চেইনে প্রতিফলিত হবে।

### পলিগনে ফিরে ডিপোজিট টোকেন {#deposit-tokens-back-to-polygon}

1. আপনার টোকেন ট্রান্সফার করতে আপনি `FxMintableERC20RootTunnel`-কে অনুমোদন করতে ভুলবেন না।
2. `rootToken`-কে রুট টোকেন ঠিকানা এবং `user`-কে গ্রহীতা হিসেবে `FxMintableERC20RootTunnel`-এ `deposit()`-কে কল করুন।
3. স্টেট সিঙ্ক ইভেন্টের জন্য অপেক্ষা করুন (22-30 মিনিট)। এর পরে, আপনি চাইল্ড চেইনে অভিস্ট গ্রহীতার ব্যালেন্স কুয়েরি করতে পারেন।

**ERC721** এবং **ERC1155** Mintable FxTunnel উদাহরণগুলো নিম্নরূপ :

- [FxMintableERC721Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc721-transfer)
- [FxMintableERC1155Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc1155-transfer)

## ডিপ্লয়মেন্টের উদাহরণ {#example-deployments}

### Goerli {#goerli}

- চেকপয়েন্ট ম্যানেজার: [0x2890bA17EfE978480615e330ecB65333b880928e](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e)
- Dummy ERC20 token: [0xe9c7873f81c815d64c71c2233462cb175e4765b3](https://goerli.etherscan.io/address/0xe9c7873f81c815d64c71c2233462cb175e4765b3)
- FxERC20RootTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxMintableERC20RootTunnel: [0xA200766a7D64E54611E2D232AA6c1f870aCb63c1](https://goerli.etherscan.io/address/0xA200766a7D64E54611E2D232AA6c1f870aCb63c1)
- Dummy ERC721 token: [0x73594a053cb5ddDE5558268d28a774375C4E23dA](https://goerli.etherscan.io/address/0x73594a053cb5ddDE5558268d28a774375C4E23dA)
- FxERC721RootTunnel: [0xF9bc4a80464E48369303196645e876c8C7D972de](https://goerli.etherscan.io/address/0xF9bc4a80464E48369303196645e876c8C7D972de)
- Dummy ERC1155 Token: [0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E](https://goerli.etherscan.io/address/0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E)
- FxERC1155RootTunnel : [0x48DE785970ca6eD289315036B6d187888cF9Df48](https://goerli.etherscan.io/address/0x48DE785970ca6eD289315036B6d187888cF9Df48)

### মুম্বই {#mumbai}

- FxERC20: [0xDDE69724AeFBdb084413719fE745aB66e3b055C7](https://mumbai.polygonscan.com/address/0xDDE69724AeFBdb084413719fE745aB66e3b055C7)
- FxERC20ChildTunnel: [0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767](https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767)
- FxMintableERC20ChildTunnel: [0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9](https://mumbai.polygonscan.com/address/0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9)
- চাইল্ড টোকেন ডামি ERC20: 0x346d21bc2bD3dEE2d1168E1A632b10D1d7B9c0A
- FxERC721: [0xf2720927E048726267C0221ffA41A88528048726](https://mumbai.polygonscan.com/address/0xf2720927E048726267C0221ffA41A88528048726)
- FxERC721ChildTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://mumbai.polygonscan.com/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxERC1155: [0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C](https://mumbai.polygonscan.com/address/0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C)
- FxERC1155ChildTunnel: [0x3A0f90D3905601501652fe925e96d8B294243Efc](https://mumbai.polygonscan.com/address/0x3A0f90D3905601501652fe925e96d8B294243Efc)

সংশ্লিষ্ট মেইননেট deployments [এখানে](https://static.matic.network/network/mainnet/v1/index.json) পাওয়া যাবে। সমস্ত ডিফল্ট টানেল চুক্তি এবং অন্যান্য গুরুত্বপূর্ণ FxPortal চুক্তি deployments. খুঁজে পেতে `FxPortalContracts`কীওয়ার্ড খুঁজ. । আপনি চুক্তি ঠিকানা এবং ABIs অ্যাক্সেস করতে [`maticnetwork/meta`](https://www.npmjs.com/package/@maticnetwork/meta)প্যাকেজের ব্যবহার করতে পারেন।

## চুক্তির ঠিকানা {#contract-addresses}

### মুম্বাই টেস্টনেট {#mumbai-testnet}

| চুক্তি | ডিপ্লয় করা ঠিকানা  | | :----- | :- | | [FxRoot (Goerli)](https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA#code) | `0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA` | | [FxChild (মুম্বই)](https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11/contracts) | `0xCf73231F28B7331BBe3124B907840A94851f9f11`|

### Polygon মেইননেট {#polygon-mainnet}


| চুক্তি | ডিপ্লয় করা ঠিকানা  | | :----- | :- | | [FxRoot (Ethereum মেইননেট)](https://etherscan.io/address/0xfe5e5d361b2ad62c541bab87c45a0b9b018389a2#code) | `0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2` | | [FxChild (Polygon মেইননেট)](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a/contracts) | `0x8397259c983751DAf40400790063935a11afa28a`|
