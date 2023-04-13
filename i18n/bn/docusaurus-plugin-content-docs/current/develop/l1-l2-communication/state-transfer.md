---
id: state-transfer
title: স্টেট ট্রান্সফার
description: Ethereum থেকে Polygon এ সহজেই স্টেট বা ডেটা স্থানান্তর করুন।
keywords:
  - docs
  - polygon
  - polygon wiki
  - state transfer
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon যাচাইকারী ক্রমাগত নামে পরিচিত Ethereum চেইনে একটি চুক্তি পর্যবেক্ষণ করে `StateSender`। Ethereum চেইনে প্রতিবারে কোনো নিবন্ধিত চুক্তি এই চুক্তিটি কল করলে এটি একটি ইভেন্ট ইমিট করে। এই ইভেন্টটি ব্যবহার করে Polygon যাচাইকারীরা Polygon চেইনে অন্যান্য চুক্তিতে ডেটা রিলে করে। এই **স্টেট সিঙ্ক** মেকানিজমটি Ethereum থেকে Polygon পর্যন্ত ডেটা পাঠাতে ব্যবহৃত হয়।

উপরন্তু, Polygon যাচাইকারী নিয়মিত ভিত্তিতে Polygon চেইনে প্রতিটি লেনদেনের একটি Ethereum হ্যাশ পাঠা. । আপনি Polygon-এ যে কোন লেনদেনের বৈধতা করতে এই **চেকপয়েন্ট** ব্যবহার করতে পারেন। একবার একটি transaction যাচাই করা to ে Polygon চেইনে ঘটেছে, তাহলে Ethereum অবশ্যই উপযুক্ত পদক্ষেপ নিতে ব্যবহার করা যেতে পারে।

এই 2 মেকানিজমটি Ethereum এবং Polygon মধ্যে দুই উপায় ডেটা (রাষ্ট্র) স্থানান্তর সক্ষম করতে একসাথে ব্যবহার করা যেতে পারে। এই সমস্ত মিথস্ক্রিয়া বিবৃত করতে, আপনি সরাসরি আমাদের `FxBaseRootTunnel`(Ethereum) এবং `FxBaseChildTunnel`(Polygon-এ পাবেন) চুক্তি পাও. ে পারেন।

## রুট টানেল চুক্তি {#root-tunnel-contract}

[এখান](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) থেকে `FxBaseRootTunnel`চুক্তি ব্যবহার করুন। এই চুক্তি নিম্নলিখিত ফাংশন অ্যাক্সেস দেয়:

- `function _processMessageFromChild(bytes memory data)`এই হচ্ছে একটি ভার্চুয়াল ফাংশন যা চুক্তির মধ্যে প্রয়োগ করা দরকার যা থেকে পাঠানো ডেটা পরিচালনা করতে এটি অন্তর্ভূক্ত করে `ChildTunnel`।
- `_sendMessageToChild(bytes memory message)`: এই ফাংশনটিকে যেকোনো বাইট ডেটা মেসেজ হিসেবে অভ্যন্তরীণভাবে কল করা যেতে পারে। এই ডেটা চাইল্ড টানেলে যেমন আছে ঠিক তেমনভাবে পাঠানো হবে।
- `receiveMessage(bytes memory inputData)`: এই ফাংশনের দ্বারা নির্গত বার্তা পাওয়ার জন্য কল করতে হবে `ChildTunnel`। লেনদেনের প্রমাণ কলডেটা হিসেবে প্রদান করতে হবে। **matic.js** ব্যবহার করে প্রমাণ তৈরি করার জন্য একটি উদাহরণ স্ক্রিপ্ট নীচে অন্তর্ভুক্ত করা হয়।

## চাইল্ড টানেল চুক্তি {#child-tunnel-contract}

[এখান](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseChildTunnel.sol) থেকে `FxBaseChildTunnel`চুক্তি ব্যবহার করুন। এই চুক্তিটি নিম্নলিখিত ফাংশনগুলিতে অ্যাক্সেস দেয়:

- `function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`: এটি একটি ভার্চুয়াল ফাংশন যা থেকে প্রেরিত বার্তাগুলি পরিচালনা করতে লজিকাল বাস্তবায়ন করতে হবে `RootTunnel`।
- `function _sendMessageToRoot(bytes memory message)`: এই ফাংশনটিকে রুট টানেলে যেকোনো বাইট মেসেজ পাঠাতে অভ্যন্তরীণভাবে কল করা যেতে পারে।

## পূর্বশর্ত {#prerequisites}

- আপনাকে Ethereum-এ আপনার রুট কন্ট্রাক্টে `FxBaseRootTunnel`কন্ট্রাক্ট উত্তরাধিকার করতে হবে। উদাহরণস্বরূপ, আপনি এই [চুক্তিটিকে](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateRootTunnel.sol) অনুসরণ করতে পারেন। একইভাবে, Polygon উপর আপনার সন্তানের মধ্যে `FxBaseChildTunnel`চুক্তি উত্তরাধিকার। উদাহরণস্বরূপ, এই [চুক্তিটিকে](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateChildTunnel.sol) অনুসরণ করুন।
- আপনার রুট চুক্তি deploying সময়
  - **Goerli Testnet**, 0**x2890bA17EfE978480615e330ecB65333b880928e **`_fxRoot`এবং **0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA-এর** `_checkpointManager`ঠিকানা পাস করুন।

  - **Ethereum Mainnet**, `_checkpointManager`is 0**x86e4dc95c7fbdbf52e33d563bbdb00823894c287 **এবং `_fxRoot`is **0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2।**
- **মুম্বাই testnet**, শিশু চুক্তি স্থাপনের জন্য, in **0xCf73231F28B7331BBe3124B907840A94851f9f11**`_fxChild`-এ পাস করুন। **Polygon** For `_fxChild`জন্য, 0**x8397259c983751DAF40400790063935a11afa28a** হবে।
- শিশু টানেলের ঠিকানা দিয়ে মোতায়েন রুট টানেলে কল `setFxChildTunnel`করুন। উদাহরণ: [0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2](https://goerli.etherscan.io/tx/0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2)
- রুট টানেলের ঠিকানা সহ মোতায়েন করা শিশু টানেলে কল `setFxRootTunnel`করুন। উদাহরণ: [0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8](https://mumbai.polygonscan.com/tx/0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8/internal-transactions)

## স্টেট ট্রান্সফার ব্রিজের চুক্তির উদাহরণ {#example-contracts-of-state-transfer-bridge}

- **চুক্তি**: [Fx-Portal Github Repository](https://github.com/jdkanani/fx-portal/tree/main/contracts/tunnel)
- **Goerli:** [0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af](https://goerli.etherscan.io/address/0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af)
- **মুম্বাই:** [0xa0060Cc969d760c3FA85844676fB654Bba693C22](https://mumbai.polygonscan.com/address/0xa0060Cc969d760c3FA85844676fB654Bba693C22/transactions)

## Ethereum থেকে স্টেট ট্রান্সফার → Polygon {#polygon}

- আপনাকে আপনার রুট কন্ট্রাক্টে `_sendMessageToChild()`অভ্যন্তরীণভাবে কল করতে হবে এবং Polygon এ পাঠানো হবে এমন একটি আর্গুমেন্ট হিসাবে ডেটা পাস করতে হবে। উদাহরণ: [0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1](https://goerli.etherscan.io/tx/0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1)
- আপনার চাইল্ড চুক্তির `FxBaseChildTunnel`এ `_processMessageFromRoot()` ভার্চুয়াল ফাংশন বাস্তবায়ন করে Ethereum থেকে ডেটা পুনরুদ্ধার করুন। স্টেট সিঙ্ক করা হলে স্টেট রিসিভার থেকে স্বয়ংক্রিয়ভাবে ডেটা গ্রহণ করা হবে।

## Polygon → Ethereum {#ethereum}

1. Ethereum-এ পাঠানো ডেটাকে একটি প্যারামিটার হিসাবে আপনার চাইল্ড চুক্তিতে অভ্যন্তরীণভাবে `_sendMessageToRoot()` কল করুন। উদাহরণ: [0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a](https://mumbai.polygonscan.com/tx/0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a/logs)

লেনদেনের হ্যাশ নোট করুন কারণ এটি একটি চেকপয়েন্ট হিসাবে অন্তর্ভুক্ত হওয়ার পরে প্রমাণ তৈরি করতে ব্যবহার করা হবে।

2. **রুট চেইনে প্রস্থান সম্পন্ন করার জন্য প্রুফ জেনারেশন**: **tx hash** এবং **the** ব্যবহার করে প্রমাণ তৈরি করুন। প্রমাণ তৈরি করতে, আপনি Polygon দ্বারা হোস্ট করা প্রুফ জেনারেশন API ব্যবহার করতে পারেন বা আপনি [এখানে](https://github.com/maticnetwork/proof-generation-api) নির্দেশাবলী অনুসরণ করে আপনার নিজের প্রুফ জেনারেশন API স্পিন করতে পারেন।

Polygon দ্বারা হোস্ট করা প্রুফ জেনারেশন endpoint [এখানে](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature}) পাওয়া গি. াই।

    - `burnTxHash` is the transaction hash of the `_sendMessageToRoot()` transaction you initiated on Polygon.
    - `eventSignature` is the event signature of the event emitted by the `_sendMessageToRoot()` function. The event signature for the MESSAGE_SENT_EVENT_SIG is `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

মেইননেট এবং Testnet জন্য প্রমাণ প্রজন্মের API ব্যবহারের উদাহরণ নিম্নরূপ:

→ [মুম্বাই Testnet প্রুফ জেনারেশন](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Polygon মেইননেট প্রুফ জেনারেশন](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

3. আপনার রুট চুক্তিতে `_processMessageFromChild()` বাস্তবায়ন করুন।

4. চাইল্ড টানেল থেকে আপনার চুক্তিতে পাঠানো ডেটা পুনরুদ্ধার করতে `receiveMessage()`-এর ইনপুট হিসাবে জেনারেট করা প্রমাণ ব্যবহার করুন। উদাহরণ: [0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515](https://goerli.etherscan.io/tx/0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515))
