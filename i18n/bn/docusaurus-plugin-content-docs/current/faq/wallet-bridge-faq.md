---
id: wallet-bridge-faq
title: ওয়ালেট <>ব্রিজ FAQ
description: আপনার পরবর্তী ব্লকচেইন অ্যাপটি Polygon-এ তৈরি করুন।
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - wallet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## আমি কোথায় Polygon ওয়েব ওয়ালেট ব্যবহার করতে পারি? {#where-can-i-use-the-polygon-web-wallet}
এখানে হল Polygon Wallet Suite URL: https://wallet.polygon.technology/ The Polygon Wallet Suite হল Polygon দ্বারা প্রদত্ত Web3 অ্যাপ্লিকেশনের একটি সংগ্রহ। এটি [Polygon Wallet](https://wallet.polygon.technology/polygon/assets) (একটি বিকেন্দ্রীভূত ওয়ালেট), [Polygon Bridge](https://wallet.polygon.technology/polygon/bridge/deposit) (একটি L1-L2 bridge), [Polygon Staking](https://staking.polygon.technology/) (MATIC Tokens) এবং [Polygon Safe Bridge](https://safe-bridge.polygon.technology/safe) (একটি multisig bridge) নিয়ে গঠিত।

<div align= "center">
  <img src={useBaseUrl("img/faq/wallet/wallet-hp.png")} />
</div>

## কোন ওয়ালেট বর্তমানে সমর্থিত? {#which-wallets-are-currently-supported}

Metamask, Coinbase, Bitski Wallet, Venly এবং WalletConnect বর্তমানে সমর্থিত wallets.

<div align="center">
  <img src={useBaseUrl("img/faq/wallet/supported-wallets.png")} width="400" />
</div>

## আমি আমার Polygon ওয়ালেট দিয়ে কী করতে পারি? {#what-can-i-do-with-my-polygon-wallet}

- Polygon-এ যেকোনো অ্যাকাউন্টে ফান্ড পাঠান।
- Ethereum থেকে Polygon-এ ফান্ড জমা করুন (ব্রিজ ব্যবহার করে)।
- Polygon থেকে Ethereum-এ ফান্ড উইথড্র করুন (ব্রিজ ব্যবহার করে)।

## আমার MetaMask ওয়ালেট Polygon ওয়ালেটের সাথে কানেক্ট করছে না {#my-metamask-wallet-is-not-connecting-with-polygon-wallet}

এটি অনেক কারণে হতে পারে। আমরা পরামর্শ দিচ্ছি যে আপনি **অন্য সময় চেষ্টা করুন**, **অন্য কোন ব্রাউজার ব্যবহার করুন** বা যদি এই কোন কোন সাহায্য না করে, **[তাহলে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।](https://support.polygon.technology/support/home)**

## আমি কিভাবে Polygon Wallet using ব্যবহার করে Ethereum থেকে Polygon থেকে ফান্ড ডিপোজিট করতে পারি। {#how-can-i-deposit-funds-from-ethereum-to-polygon-using-polygon-wallet-suite}
নীচের ভিডিওটি দেখুন বা [এই টিউটোরিয়াল](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#depositing-funds-from-ethereum-to-polygon) অনুসরণ করুন।

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/deposit/deposit-polygon-wallet.mp4"></source>
  <p>আপনার ব্রাউজার ভিডিও এলিমেন্টটি সাপোর্ট করে না।</p>
</video>

## আমি Polygon Wallet using মাধ্যমে Polygon থেকে Ethereum পর্যন্ত কিভাবে তহবিল উত্তোলন করব? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-pos-bridge-using-polygon-wallet-suite}
নীচের ভিডিওটি দেখুন বা [এই টিউটোরিয়াল](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-pos-bridge) অনুসরণ করুন।

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/pos/withdraw-polygon-wallet.mp4"></source>
  <p>আপনার ব্রাউজার ভিডিও এলিমেন্টটি সাপোর্ট করে না।</p>
</video>

## আমি Polygon Wallet using মাধ্যমে পলিগন থেকে Ethereum পর্যন্ত কিভাবে তহবিল উত্তোলন করব? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-plasma-bridge-using-polygon-wallet-suite}
নীচের ভিডিওটি দেখুন বা [এই টিউটোরিয়াল](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-plasma-bridge) অনুসরণ করুন।

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/plasma/withdraw-plasma-v3.mov"></source>
  <p>আপনার ব্রাউজার ভিডিও এলিমেন্টটি সাপোর্ট করে না।</p>
</video>

## Polygon Wallet Token তালিকায় একটি নতুন বা কাস্টম টোকেন কিভাবে যোগ করবেন? {#how-to-add-a-new-or-custom-token-to-polygon-wallet-token-list}
অনুগ্রহ করে [এই টিউটোরিয়াল](/docs/faq/adding-a-custom-token) অনুসরণ করুন।

## আমি কীভাবে টোকেন চুক্তি খুঁজে পেতে পারি? {#how-do-i-find-the-token-contract}

আপনি একটি নতুন বা কাস্টম টোকেন যোগ করার চেষ্টা করছেন তখন টোকেন চুক্তি ঠিকানা প্রয়োজন হবে। আপনি Coingecko বা CoinMarketCap এ তার নাম দ্বারা টোকেন খুঁজতে পারেন যেখানে আপনি Ethereum চেইনে (ERC20 টোকেন) এবং Polygon মত অন্যান্য সমর্থিত ব্লকচেইনে তার ঠিকানা দেখতে পারবেন। অন্যান্য চেইনে থাকা টোকেনের ঠিকানা হয়তো আপডেটকৃত হবে না, তবে সব উদ্দেশ্যে আপনি নিশ্চিতভাবে রুটের ঠিকানা ব্যবহার করতে পারবেন।

## আমি আমার ফান্ড জমা দিচ্ছি কিন্তু আমি Metamask এ এটি দেখতে পাচ্ছি না। আমি কী করব? {#i-have-deposited-my-funds-but-i-don-t-see-it-on-metamask-what-do-i-do}

আপনাকে Metamask এ কাস্টম টোকেন ঠিকানা নিজে যোগ করতে হবে।

Metamask খুলুন এবং **টোকেন ইম্পোর্ট করুন** ক্লিক করতে নিচে স্ক্রোল করুন।

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/wallet-faq-3.png")} width="400" />
</div>

তারপর, প্রাসঙ্গিক চুক্তি ঠিকানা, প্রতীক, এবং দশমিক স্পষ্টতা যোগ করুন। চুক্তির ঠিকানা (এই ক্ষেত্রে PoS-WETH) এই লিঙ্কে পাওয়া যাবে: [https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/](https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/)। Polygon মেইননেটে ব্যালেন্স দেখতে আপনাকে চাইল্ড টোকেন ঠিকানা যোগ করতে হবে। স্পষ্টতা দশমিক হল WETH জন্য 18 (অধিকাংশ টোকেন, স্পষ্টতা দশমিক 18)।

## আমি Metamask এ Polygon Mainnet কিভাবে যোগ করতে পারি? {#how-can-i-add-polygon-mainnet-on-metamask}

[এই টিউটোরিয়াল](/docs/develop/metamask/config-polygon-on-metamask) দেখুন।

## আমার টোকেন তালিকায় দেখাচ্ছে না। আমি কার সাথে যোগাযোগ করতে পারি? {#my-token-is-not-visible-in-the-list-who-should-i-contact}

ডিসকর্ড বা টেলিগ্রামে Polygon টিমের সাথে যোগাযোগ করুন এবং আপনার টোকেন তালিকাভুক্ত করুন। এটি করার আগে আপনার টোকেন ম্যাপ করা আছে কিনা দেখে নিন। যদি এটি মাপে না is ে, তাহলে [দয়া করে](https://mapper.polygon.technology/) https://mapper.polygon.technology/এ একটি অনুরোধ raise ।

## চেকপয়েন্ট আসার পরে আমি কি আমার লেনদেনের বাতিল করতে পারি? {#can-i-cancel-my-transaction-after-the-checkpoint-arrived}
একবার পলিগন মেইননেট-এ প্রত্যাহারের লেনদেনটি শুরু is ে, তাহলে দুর্ভাগ্যবশত এটি বাতিল করা যাবে না বা ফেরত দেও. া যাবে। withdrawal লেনদেনে, Polygon Mainnet থেকে টোকেন বার্ন করা হয় এবং Ethereum Mainnet-এ minted করা হয়। অতএব, একবার Polygon চেইনে থেকে tokens া টোকেন আপনার to ফিরে যেতে পারবে না।

## গ্যাসের ফি খুব বেশি, আমি কি আমার লেনদেন বাতিল করতে পারি? {#the-gas-fee-is-too-high-can-i-cancel-my-transaction}

দুর্ভাগ্যক্রমে, একবার একটি টোকেন পলিগন মেইননেট থেকে বার্ন করা হ, ে আমরা withdrawal লেনদেনের বাতিল করতে পারি না। অন্য কথায়, শুরু হওয়ার পরে একটি লেনদেন বাতিল করা সম্ভব নয়। গ্যাসের ফি Polygon দ্বারা নিয়ন্ত্রিত হয় না। এটি নেটওয়ার্ক on এবং Ethereum Mainnet-এ একটি নির্দিষ্ট ব্লকের লেনদেনের সংখ্যা সম্পূর্ণভাবে নির্ভর। আপনি যদি মনে করেন আপনি বর্তমান গ্যাসের ফি afford  পারবেন না, তাহলে আপনি অপেক্ষা করতে পারেন এবং পরে গ্যাসের ফি নিচের পাশেই when া যেতে পারেন এবং পরে আপনার লেনদেনের সাথে এগিয়ে যেতে পারেন। আপনি এখানে থেকে Ethereum Mainnet এ গ্যাসের ফি পর্যবেক্ষণ করতে পারেন: https://etherscan.io/gastracker


## আমি কি আমার টোকেন Polygon থেকে অন্য কোনো ওয়ালেট/এক্সচেঞ্জে পাঠাতে পারি? {#can-i-send-my-tokens-from-polygon-to-any-other-wallet-exchange}

আপনি সরাসরি Polygon UI থেকে exchanges/wallets. এ টোকেন পাঠাতে পারবেন না। আপনাকে প্রথমে Polygon থেকে Ethereum-এ উইথড্র করতে হবে এবং তারপর আপনার এক্সচেঞ্জ ঠিকানায় পাঠাতে হবে (যদি না আপনার এক্সচেঞ্জ/ওয়ালেট স্পষ্টভাবে নেটওয়ার্ক সমর্থন করে)।

## আমি সরাসরি একটি এক্সচেঞ্জ/ওয়ালেটে তহবিল পাঠানোর ভুল করেছি। আপনি কি সাহায্য করতে পারেন? {#i-made-the-mistake-of-sending-funds-to-an-exchange-wallet-directly-can-you-help}

দুর্ভাগ্যবশত, আমরা এই ধরনের ক্ষেত্রে সহায়তা করতে পারি না। শুধুমাত্র Ethereum সমর্থন করে এমন এক্সচেঞ্জগুলিতে সরাসরি ফান্ড পাঠাবেন না, আপনাকে প্রথমে Polygon থেকে Ethereum-এ উইথড্র করতে হবে এবং তারপর আপনার এক্সচেঞ্জ ঠিকানায় পাঠাতে হবে।

## আমি ভুল ঠিকানায় একটি ট্রান্সফার করেছি। আমি কিভাবে ফান্ড পুনরুদ্ধার করব? {#i-made-a-transfer-to-the-wrong-address-how-do-i-retrieve-the-funds}

দুর্ভাগ্যবশত, কিছুই করা যাবে না। শুধুমাত্র সেই নির্দিষ্ট ঠিকানায় প্রাইভেট কী-এর মালিক সেই সম্পদটি সরাতে পারেন। আপনি যে ঠিকানাটি টোকেন পাঠিয়েছেন তা নিশ্চিত করা সবসময় ভাল হবে।

## আমার লেনদেনের জন্য খুব দীর্ঘ pending ে আছে, আমি কি করতে পারি? {#my-transaction-has-been-pending-for-too-long-what-can-i-do}
নিম্নলিখিত কারণের কারণে লেনদেনটি বাদ might া যেতে পারে:

1. লেনদেনের জমা দেয়ার সময় একটি কম গ্যাসের মূল্য সেট আপ করুন।
2. Ethereum Mainnet-এ congestion কারণে গ্যাসের মূল্যের হঠাৎ বাড়ছে।
3. লেনদেনটি আপনার ওয়ালেট থেকে আপনার দ্বারা বাতিল করা হয় বা একটি নতুন লেনদেনের সাথে প্রতিস্থাপিত হয়েছে।

আপনি নিম্নলিখিত উপায়ে ড্রপ করা লেনদেনের সাথে এগিয়ে যেতে পারেন:

1. যদি আপনার লেনদেনটি একটি ঘন্টার বেশি সময় আটকে থাক, , তাহলে একটি **চেষ্টা করুন আবার** বাটন দেখানো হবে। আপনি একই লেনদেনটি সম্পূর্ণ করতে **চেষ্টা করুন আবার আবার** বোতামে ক্লিক করতে পারেন। আপনি **কিভাবে চেষ্টা আবারো** ফিচার ব্যবহার করতে হবে তার উপর আরও তথ্যের জন্য এই ভিডিওটি উল্লেখ করতে পারেন।
2. অনুগ্রহ করে আপনার MetaMask ওয়ালেট চেক করুন কারণ Metamask এ queued-up লেনদেনের কারণে কখনও কখনও লেনদেন বাদ দেও. া যেতে পারে। সেই ক্ষেত্রে, queued-up লেনদেনের পরিষ্কার করুন বা একই ব্রাউজারে MetaMask পুনরায় ইনস্টল করুন।
3. আপনি একটি বিকল্প ব্রাউজারে MetaMask ইনস্টল করতে পারেন এবং তারপর Polygon Wallet the ব্যবহার করে লেনদেনের সম্পূর্ণ করার চেষ্টা করুন।
4. আপনি pending pending উইথড্রয়াল লেনদেন সম্পন্ন করতে এই লিঙ্কটি ব্যবহার করতে পারেন। সার্চ বিকল্পে লেনদেনের হ্যাশ পেস্ট করুন এবং লেনদেনের সম্পূর্ণ করতে **কনফার্ম এক্সিট** বোতামে ক্লিক করুন।

## জমা করা নিশ্চিত হলেও ব্যালেন্স আপডেট না হলে আমি কী করব? {#what-do-i-do-if-the-deposit-is-confirmed-but-the-balance-is-not-getting-updated}

জমা করা লেনদেনের জন্য 22-30 মিনিট সময় লাগতে পারে। দয়া করে কিছু সময়ের জন্য অপেক্ষা করুন এবং **রিফ্রেশ ব্যালেন্স** এ ক্লিক করুন।

## চেকপয়েন্টটি না ঠিক হলে আমার কী করা উচিত? {#what-should-i-do-if-the-checkpoint-is-not-happening}

চেকপয়েন্ট কখনও কখনও Ethereum-এ নেটওয়ার্ক congestion ভিত্তি করে 45 মিনিটে 1 ঘন্টা বেশি সময় নেয়, আমরা একটি টিকিট উত্থাপন করার আগে কিছুক্ষণ অপেক্ষা করার পরামর্শ দিচ্ছি।

## আমার লেনদেন আটকে গেছে। {#my-transaction-is-stuck}

আমরা কিছু সাধারণ ত্রুটি তালিকাভুক্ত করেছি যা ব্যবহারকারীদের সম্মুখীন হতে পারে। আপনি ত্রুটির ছবির নিচে সমাধানটি খুঁজে পেতে পারেন। যদি আপনাকে একটি ভিন্ন ত্রুটি দেখানো হয়, অনুগ্রহ করে আমাদের সমস্যা সমাধানের টিমের সাথে [সাপোর্ট টিকিটের অনুরোধ করুন।](https://support.polygon.technology/support/home)

  - ### সাধারণ ত্রুটি {#common-errors}
ক। প্রত্যাহার প্রাথমিক পর্যায়ে আটকে গেছে।

    <img src={useBaseUrl("img/wallet-bridge/plasma-progress-stuck.png")} width="357" height="800"/>

    This normally occurs when the transaction gets replaced and the wallet web application is not able to detect the replaced transaction hash. Please follow the instructions on [https://withdraw.polygon.technology/](https://withdraw.polygon.technology/) and complete your withdrawal.

খ। RPC ত্রুটি

    <img src={useBaseUrl("img/wallet-bridge/checkpoint-rpc-error.png")} width="357" height="600"/>   

    The current RPC error you're facing might be due to an RPC overload.

    Please try changing your RPC and proceed with the transaction. You may follow this link [here](https://docs.polygon.technology/docs/develop/network-details/network#matic-mainnet) for more information.

 গ.

  <img src={useBaseUrl("img/wallet-bridge/checkpoint-stumbled-error.png")} width="357" height="600"/>

  এটি সাধারণত একটি মাঝেমধ্যে ঘটা ত্রুটি যা স্বয়ংক্রিয়ভাবে সমাধান হয়ে যায়। যদি আপনি এখনও একই ত্রুটি পেয়ে থাকেন যখন পদক্ষেপ পুনরায় আরম্ভ করা, এটি আরও সমস্যার জন্য সমস্ত প্রাসঙ্গিক তথ্যের সাথে [সাপোর্ট করার অনুরোধ করার টিকিট ](https://support.polygon.technology/)-এর আর্জি জানান।


## আমি একটি অপর্যাপ্ত ব্যালেন্স ত্রুটি দেখি। {#i-m-shown-an-insufficient-balance-error}

Polygon নেটওয়ার্কে উইথড্র করা এবং জমা করা সস্তা। বোঝা উচিত যে Ethereum মেইননেটে কিছু ETH ব্যালেন্স পেয়ে অপর্যাপ্ত ব্যালেন্স ত্রুটি দূর করা যেতে পারে। এটি সাধারণত একটি অপর্যাপ্ত ব্যালেন্স সমস্যা পরিষ্কার করে। যদি এটি Polygon Mainnet-এ একটি লেনদেন হয়, তাহলে আমাদের প্রয়োজন হবে যে আপনার পর্যাপ্ত পরিমাণ MATIC টোকেন থাকবে।

## আমার লেনদেন এক্সপ্লোরারের উপর দৃশ্যমান হয় না। আমি কী করব? {#my-transactions-are-not-visible-on-the-explorer-what-should-i-do}

এটি সম্ভবত Polygonscan সহ একটি সূচি সমস্যা। আরও clarifications. জন্য [সাপোর্ট টিমের](https://support.polygon.technology/support/home) সাথে যোগাযোগ করুন।

## আমি Ethereum এ একটি জমা করা শুরু করেছি কিন্তু এটি এখনও মুলতুবি হিসাবে দেখায়৷ আমি কী করব? {#i-initiated-a-deposit-on-ethereum-but-it-still-shows-as-pending-what-should-i-do}

আপনার সরবরাহ করা গ্যাস সম্ভবত খুব কম। আপনার কিছুক্ষণ অপেক্ষা করা উচিত এবং লেনদেনটি পুনরায় করা উচিত যদি এটি মাইন না হয়। অতিরিক্ত সাহায্যের ক্ষেত্রে, অনুগ্রহ করে আপনার ওয়ালেট ঠিকানা, লেনদেন হ্যাশ (যদি থাকে) এবং প্রাসঙ্গিক স্ক্রিনশট সহ [সাপোর্ট টিম](https://support.polygon.technology/support/home)-এর সাথে যোগাযোগ করুন।

## আমি লেনদেন হ্যাশ পাচ্ছি না এবং আমার জমা হচ্ছে না? কী হচ্ছে? {#i-m-not-getting-a-transaction-hash-and-my-deposits-aren-t-going-through-what-is-happening}

আপনার সম্ভবত পূর্বের মুলতুবি লেনদেন রয়েছে, অনুগ্রহ করে প্রথমে বাতিল করুন বা তাদের গতি করুন। Ethereum-এ লেনদেন একের পর এক ঘটতে পারে।

## এটি দেখায় Polygon-এ উইথড্র করার জন্য কোনো চার্জ করে না, কিন্তু আমরা লেনদেনের সময় অর্থ প্রদান করতে পারি। {#it-shows-polygon-does-not-charge-any-amount-for-a-withdrawal-but-we-are-to-pay-during-the-transaction}

Plasma ব্রিজের সাথে একটি উইথড্র্র করা লেনদেন 3টি ধাপে বিভক্ত, একটি যা Polygon মেইননেটে হয় এবং দুটি ধাপ যা Ethereum মেইননেটে সম্পন্ন করা হয়। PoS ব্রিজে, উইথড্র্র করা লেনদেন দুইটি ধাপে ঘটে: Polygon নেটওয়ার্কে টোকেন বার্ন করা এবং Ethereum নেটওয়ার্কে প্রুফ জমা দেওয়া। প্রতিটি ক্ষেত্রে, Polygon মেইননেটে ঘটতে থাকা টোকেন বার্ন করার জন্য খুব কম খরচ হবে। Ethereum মেইননেটে ঘটতে থাকা অবশিষ্ট পদক্ষেপগুলি বর্তমান গ্যাসের মূল্যের উপর নির্ভর করে ETH-এ পেমেন্ট করতে হবে যা [এখান](https://ethgasstation.info/) থেকে যাচাই করা যেতে পারে।

## আমি একটি জমা করার চেষ্টা করছিলাম কিন্তু লেনদেন অনুমোদন ধাপে বন্ধ হয়ে গেছে। {#i-was-trying-to-make-a-deposit-but-the-transaction-stopped-at-the-approve-step}

যদি লেনদেন এখনও **অনুমোদন** ধাপে থাকে তাহলে এটি এখনও সম্পূর্ণ হয়নি। এটি পূরণ করার জন্য, আপনাকে গ্যাসের ফি দিতে হবে এবং তারপরে এটি হয়ে যাবে।

## Polygon ওয়ালেট 'ইউজারের অস্বীকৃত লেনদেন স্বাক্ষর' ত্রুটির মেসেজ দেখায়। {#polygon-wallet-shows-user-denied-transaction-signature-error-message}

এটি সাধারণত ঘটে কারণ ব্যবহারকারী MetaMask এর মাধ্যমে একটি লেনদেন স্বাক্ষর করতে বাতিল বা অস্বীকৃতি করে। MetaMask ওয়ালেটটি দ্বারা prompted িত, তখন **Cancel** চালু না থাকলেও **অনুমোদন** এবং clicking ক্লিক করে লেনদেনের সাইন ইন করুন।

## লেনদেনটি সফল কিন্তু এটি দুল দেখাচ্ছে। {#the-transaction-is-successful-but-it-shows-pending}

আপনার লেনদেনের সম্পূর্ণ হলে এবং আপনার তহবিল received ে থাকলেও on pending া লেনদেনের প্রদর্শনী পে. ে If , তাহলে আপনি প্রাসঙ্গিক বিবরণ এবং স্ক্রিনশট পাঠিয়ে একটি সাপোর্ট টিকিট বাড়িয়ে তুলতে পারেন।

## Polygon এ সমর্থিত এক্সচেঞ্জটির তালিকা কি? {#what-is-the-list-of-supported-exchanges-on-polygon}

ম্যাটিক কয়েন অনেক এক্সচেঞ্জে ট্রেড করা যেতে পারে। যাইহোক, আপনি ট্রেড করতে এক বেছে নিচ্ছেন তখন আপনার নিজের গবেষণা করা সবসময় গুরুত্বপূর্ণ। কিছু এক্সচেঞ্জে তাদের বর্তমান উপলব্ধ টোকেনে পরিবর্তন keep া এবং সেখানে রক্ষণাবেক্ষণ periods. থাকায় অস্বাভাবিক নয়।

আপনি যেখানে আপনি MATIC পাবেন সেখানে এক্সচেঞ্জের একটি তালিকার জন্য [Coinmarketcap]([https://coinmarketcap.com/currencies/polygon/markets/](https://coinmarketcap.com/currencies/polygon/markets/)) পরিদর্শন করতে পারেন।

## Polygon কি হার্ডওয়্যার ওয়ালেট সমর্থন করে? {#does-polygon-support-hardware-wallets}

হ্যাঁ, আমরা নিম্নলিখিত হার্ডওয়্যার ওয়ালেটটি সমর্থন করি:
1. Trezor
2. Ledger

ব্যবহারকারীরা MetaMask এ তাদের হার্ডওয়্যার ওয়ালেট বিকল্প সংযোগ করতে পারেন এবং তাদের লেনদেনের সাথে এগিয়ে যেতে পারেন। এখানে Metamask এ হার্ডওয়্যার ওয়ালেটটি সংযোগ করার লিঙ্ক: https://metamask.zendesk.com/hc/en-us/articals/4408552261275

## PoS-এ সমর্থিত ম্যাটিক টোকেন কেন না কেন? {#why-isn-t-the-matic-token-supported-on-pos}

MATIC হলো Polygon-এর নেটিভ টোকেন এবং এটির একটি চুক্তির ঠিকানা রয়েছে - Polygon চেইনে 0x000000000000000000000000000000000000000000000001010 আছে। এটি গ্যাসের জন্য অর্থ প্রদান করতে ব্যবহার করা হয়। PoS ব্রিজে MATIC টোকেন ম্যাপ করার ফলে MATIC-এর Polygon চেইনে একটি অতিরিক্ত চুক্তির ঠিকানা থাকবে। এটি আগে থেকে থাকা চুক্তির ঠিকানার থেকে আলাদা হবে কারণ এই নতুন টোকেন ঠিকানাটি গ্যাসের জন্য অর্থ প্রদানের জন্য ব্যবহার করা যাবে না এবং Polygon চেইনে একটি সাধারণ ERC20 টোকেন হিসাবে থাকতে হবে। তাই এই বিভ্রান্তি এড়াতে আমরা শুধুমাত্র প্লাজমাতে Hence, বজায় রাখতে সিদ্ধান্ত নিয়েছি।

## আমি কিভাবে টোকেন ম্যাপ করব? {#how-do-i-map-tokens}

অনুগ্রহ করে [এই টিউটোরিয়ালটি] (/docs/develop/ethereum-polygon/submit-mapping-request) পড়ুন বা আপনি সরাসরি [Token](https://mapper.polygon.technology/) to যেতে পারেন।

## লেনদেন খুব বেশি সময় নিলে বা গ্যাসের দাম খুব বেশি হলে আমি কী করব? {#what-do-i-do-if-the-transaction-is-taking-too-long-or-if-the-gas-price-is-too-high}

লেনদেনের সময় এবং গ্যাসের দাম নেটওয়ার্ক on উপর নির্ভর করে পরিবর্তিত হয় এবং এটি নেটওয়ার্কের miners. মধ্যে সরবরাহের এবং চাহিদা দ্বারা নির্ধারিত হয়।

আপনি কি করতে পারেন:
- patient. হ. ।
- যদি খুব ধীরগতিতে is ে তাহলে গ্যাসের ফি বাড়ান।
- লেনদেনের পাঠানোর আগে ফি চেক করুন। এখানে Etherscan এর গ্যাস ট্র্যাকারের একটি লিঙ্ক রয়েছে: https://etherscan.io/gastracker

আপনি কি করবেন না:
- অনুগ্রহ করে গ্যাসের সীমা কম সেট করবেন না বা আপনার লেনদেনের ব্যর্থ হতে পারে।
- লেনদেনের বাতিল করার চেষ্টা করবেন না। আগে আগে the ে চেক করুন।


## আমি কি গ্যাসের সীমা বা গ্যাসের দাম পরিবর্তন করতে পারি? {#can-i-change-the-gas-limit-or-the-gas-price}

গ্যাসের সীমা অনুমান করা হয় এবং চুক্তির মধ্যে বলা ফাংশনের নির্দিষ্ট প্রয়োজনীয়তা অনুযায়ী অ্যাপ্লিকেশন দ্বারা সেট করা হয়। এটি সম্পাদনা করা ঠিক হবে না। লেনদেনের ফি বৃদ্ধি বা হ্রাস করার জন্য শুধুমাত্র গ্যাসের মূল্য পরিবর্তন করা যেতে পারে।

## কিভাবে লেনদেনের গতি speed ে? {#how-to-speed-up-the-transactions}
আপনি গ্যাস ফি বাড়িয়ে তা করতে পারেন। এখানে Metamask-এ কিভাবে তা করবেন তা ব্যাখ্যা করা একটি লিঙ্ক: https://metamask.zendesk.com/hc/en-us/articals/360015489251-How-to-Speed-Up-or-Cancel-a-Pending-Transaction।

## গ্যাসের fee? কতটা ম্যাটিক টোকেন যথেষ্ট? {#how-much-matic-token-is-enough-for-the-gas-fee}
ব্যবহারকারীদের Polygon mainnet-এ কমপক্ষে 0.01 MATIC থাকতে হবে।

## আমি কোথা থেকে সাহায্যের জন্য অনুরোধ করব? {#where-do-i-raise-a-support-ticket}
যদি আপনার আমাদের বিশেষজ্ঞরা থেকে সাহায্যের প্রয়োজন হয়, তাহলে দয়া করে আমাদের একটি বার্তা পাঠিয়ে দিন https://support.polygon.technology/support/home।

## আমি কিভাবে চেইন জুড়ে সম্পদ ব্রিজ করব? {#how-do-i-bridge-assets-across-chains}

Polygon Ethereum থেকে Polygon এবং vice পর্যন্ত সম্পদ স্থানান্তর করার জন্য একটি সেতু প্রদান করে। আপনি এই উইকির [ব্রিজেস বিভাগে]([https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started](https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started)) এটি সম্পর্কে আরও জানতে পারেন।

যাইহোক, যদি আপনি কোন বহিরাগত পরিষেবা ব্যবহার করছেন যা Polygon মালিকানাধীন নয়, তাহলে আমরা আপনাকে টিউটোরিয়াল এবং নির্দেশাবলী অনুরোধ করতে তাদের গ্রাহক পরিষেবাতে পৌঁছাতে পরামর্শ দিই। আপনি web3 পরিষেবাটি ব্যবহার করছেন তখন আপনার নিজের গবেষণা করা গুরুত্বপূর্ণ।

## OpenSea বা Polygon ব্রিজ ব্যবহার করে এমন অন্য কোনো অ্যাপ্লিকেশনের সাথে আমার একটি টোকেন উইথড্র করার সমস্যা রয়েছে। {#i-have-a-token-withdrawal-issue-with-opensea-or-any-other-application-which-uses-polygon-bridge}

যদি আপনার যদি আপনার withdrawal লেনদেনের স্ট্যাক থাকছে তাহলে Polygon আপনাকে আপনার বার্ন হ্যাশ থাকলে আপনাকে গ্রাউন্ড থেকে পেতে সাহায্য করতে [https://withdraw.polygon.technology](https://withdraw.polygon.technology) দিয়ে withdraw ব্রিজ অফার করে। এই টুলের সাহায্যে, আপনি দ্রুত অনবোর্ড হয়ে গেছেন এবং সমস্যাটি সমাধান করা হবে। OpenSea এবং অন্যান্য dApps নিয়ে আপনার লেনদেনের বিষয়ে অন্যান্য প্রশ্নের জন্য আবেদন টিমের দ্বারা পরিচালনা করা হবে।

## আমাকে প্রতারণা করা হয়েছে। আমি কিভাবে আমার টোকেন পুনরুদ্ধার করব? {#i-have-been-scammed-how-will-i-retrieve-my-tokens}

দুর্ভাগ্যবশত, হারিয়ে যাওয়া কয়েনের কোনো পুনরুদ্ধার প্রক্রিয়া নেই। আমরা জিজ্ঞেস করি যে আপনি লেনদেন করার আগে শুরু এবং সম্পন্ন করার আগে আপনি চেক করতে যান এবং double-check করবেন। অনুগ্রহ করে মনে রাখবেন যে Polygon নেটওয়ার্ক এবং আমাদের অফিসিয়াল হ্যান্ডলগুলি যেকোনো giveaway পোস্ট বা টোকেন দ্বিগুণ করতে পারবেন না এবং আমরা আপনাকে কখনোই প্রতিষ্ঠানের পক্ষে যোগাযোগ করব না। অনুগ্রহ করে সব প্রচেষ্টা বাদ দিন কারণ তারা সম্ভবত স্ক্যাম হয়ে থাকে। আমাদের সকল যোগাযোগ আমাদের অফিসিয়াল হ্যান্ডেলের মধ্য দিয়ে।

## আমার ওয়ালেটে কিছু অনুমোদিত নয় এমন লেনদেন রয়েছে। আমার ওয়ালেট কি হ্যাক হয়েছে? {#there-are-some-unauthorized-transactions-in-my-wallet-is-my-wallet-hacked}

দুর্ভাগ্যবশত, নেটওয়ার্ক অপ্রয়োজনীয় লেনদেন ফিরিয়ে দিতে পারে না।
আপনার ব্যক্তিগত কী-এর বিষয়ে সাবধান হওয়া গুরুত্বপূর্ণ এবং **এটি কারো সাথে শেয়ার করবেন না**।
আপনার যদি এখনও কিছু অবশিষ্ট ফান্ড থাকে, তবে অবিলম্বে একটি নতুন ওয়ালেটে সেগুলো ট্রান্সফার করুন।

## Ethereum এর টেস্ট নেটওয়ার্ক হিসাবে Goerli আছে। কি Polygon Network কি একটি টেস্ট নেটওয়ার্ক আছে? {#ethereum-has-goerli-as-its-test-network-does-polygon-network-have-a-test-network-too}

যেহেতু Ethereum নেটওয়ার্ক এর টেস্ট নেটওয়ার্ক হিসাবে Goerli আছে, তাই পলিগন মেইননেট মুম্বাই রয়েছে। এই টেস্ট নেটওয়ার্কে সমস্ত লেনদেন মুম্বাই এক্সপ্লোরার এ ইনডেক্স করা হবে।

## আমি অন্যান্য টোকেনটির জন্য আমার টোকেন কীভাবে swap া যেতে পারি? {#how-can-i-swap-my-tokens-for-other-tokens}
নীচের ভিডিওটি দেখুন বা [এই টিউটোরিয়াল](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#token-swap) অনুসরণ করুন।

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-token.mp4"></source>
  <p>আপনার ব্রাউজার ভিডিও এলিমেন্টটি সাপোর্ট করে না।</p>
</video>

## টোকেন সোয়াপ খুব ধীর। {#the-token-swap-is-too-slow}

আপনি যদি টোকেন অদলবদল করার চেষ্টা করছেন এবং এটি খুব বেশি সময় নিচ্ছে, আপনি অন্য ব্রাউজারে একই লেনদেন চেষ্টা করতে পারেন। যদি এটি কাজ না করে এবং আপনি একটি ত্রুটির সম্মুখীন হন, অনুগ্রহ করে আমাদের সাহায্যকারী টিমকে একটি স্ক্রিনশট পাঠান৷

## টোকেন সোয়াপের জন্য গ্যাসের ফি হিসাবে কোন টোকেন চার্জ করা হয়? {#which-tokens-are-charged-as-the-gas-fees-for-token-swap}
শুধুমাত্র MATIC।

## আমি গ্যাসের জন্য আমার টোকেন কীভাবে swap া যেতে পারি? {#how-can-i-swap-my-token-for-gas}
নীচের ভিডিওটি দেখুন বা [এই টিউটোরিয়াল](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#swap-for-gas) অনুসরণ করুন।

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-gas.mp4"></source>
  <p>আপনার ব্রাউজার ভিডিও এলিমেন্টটি সাপোর্ট করে না।</p>
</video>

## গ্যাসের জন্য swap া করতে কোন টোকেন ব্যবহার করা যেতে পারে? {#which-tokens-can-be-used-to-swap-for-gas}
শুধুমাত্র এই টোকেন 'গ্যাসের জন্য for জন্য সমর্থিত হয়: ETH, USDC, USDT, DAI, AAVE, LINK, WBTC, UNI, GHST, TEL, EMON, এবং COMBO।

## কিভাবে ETH টোকেন পেতে পারি? {#how-to-get-eth-tokens}
ETH টোকেন অর্জন করতে, আপনি হয় একটি এক্সচেঞ্জে অন্য টোকেন বা ফিয়াট অর্থের জন্য তাদের ট্রেড করতে পারেন, তাদের on-ramp (বা Metamask) এ কিনতে পারেন বা এমনকি [Polygon’s token swap feature](https://wallet.polygon.technology/polygon/token-swap) ব্যবহার করে ETH-এর জন্য অন্যান্য টোকেন swap া করতে পারেন।

## গ্যাসের জন্য অর্থ প্রদানের জন্য আমি কিভাবে MATIC টোকেন পেতে পারি? {#how-can-i-get-matic-tokens-to-pay-for-gas-fees}

আমরা [গ্যাস সোয়াপ](https://wallet.polygon.technology/gas-swap/) পরিষেবা প্রদান করি যেটি আপনার কাজে লাগতে পারে। আপনি নিজের লেনদেন সম্পূর্ণ করার জন্য প্রয়োজনীয় পরিমাণ MATIC বেছে নিন এবং আপনি এটিকে অন্যান্য টোকেন যেমন ইথার বা USDT-এর জন্য অদলবদল করতে পারেন। এটি **গ্যাস ছাড়া লেনদেনের জন্য** ব্যবহার করা যায় না।

## আমি কোথায় সরাসরি MATIC টোকেন পেতে পারি? {#where-can-i-get-matic-tokens-directly}

তাই ম্যাটিক টোকেন যে কোন কেন্দ্রীভূত ([Binance](https://www.binance.com/en), [Coinbase](https://www.coinbase.com/), et.al) বা Decentralized ([Uniswap](https://uniswap.org/), [QuickSwap](https://quickswap.exchange/#/swap)) এক্সচেঞ্জ থেকে কেনা যেতে পারে। আপনি [Transak](https://transak.com/), এবং [like](https://ramp.network/) মতো কিছু on-ramps গবেষণা এবং চেষ্টা করতে পারেন। আপনার MATIC কয়েন কেনার উদ্দেশ্যটিও নির্ধারণ করা উচিত যে আপনি সেগুলি কোথা থেকে এবং কোন নেটওয়ার্ক কিনবেন। আপনার অভিপ্রায় হয় স্ট্যাকিং বা প্রতিনিধিদল হলে Ethereum mainnet এ MATIC থাকতে হবে তা পরামর্শ দেওয়া হচ্ছে। আপনার অভিপ্রায় যদি Polygon Mainnet-এ একটি লেনদেন is , তাহলে আপনাকে Polygon Mainnet-এ MATIC ধরে রাখতে হবে এবং লেনদেন করতে হবে।





