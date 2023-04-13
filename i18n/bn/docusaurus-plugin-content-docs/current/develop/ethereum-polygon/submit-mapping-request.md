---
id: submit-mapping-request
title: Mapping Tokens
description:  PoS ব্রিজ ব্যবহার করে Ethereum এবং Polygon চেইনের মধ্যে টোকেন কিভাবে মানচিত্র করবেন তার একটি গাইড
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

আপনার সম্পদ Ethereum এবং Polygon PoS থেকে এবং স্থানান্তর করতে ম্যাপিং প্রয়োজন। একই কাজ করতে আমরা দুটি ব্রিজ অফার করি। সেতুর উপর আরও বিস্তারিত [এখানে](/develop/ethereum-polygon/getting-started.md) বোঝা যেতে পারে।

:::tip

Polygon PoS ব্রিজ বহুভুজ মেইননেট এবং মুম্বাই both জন্য উপলব্ধ।

:::

## ম্যাপিংয়ের অনুরোধ জমা করার ধাপসমূহ {#steps-to-submit-a-mapping-request}

Ethereum এবং Polygon PoS-এর মধ্যে টোকেন ম্যাপ করার জন্য, আপনি [Polygon Token Mapper](https://mapper.polygon.technology/) ব্যবহার করতে পারেন। লিঙ্কটি খুলুন এবং একটি নতুন ম্যাপিং অনুরোধ শুরু করতে শীর্ষ ডান কোণে **ম্যাপ নিউ টোকেন** বোতামে ক্লিক করুন।

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**ধাপ 1 →** আপনার টোকেন ম্যাপ করতে চান এমন নেটওয়ার্কটি চয়ন করুন। আপনি Goerli-Mumbai জন্য **Goerli-Mumbai** এবং **Ethereum-Polygon PoS** বেছে নিতে পারেন।

**ধাপ 2 →** আপনি ম্যাপিং করছেন এমন টোকেন টাইপ নির্বাচন করুন - **ERC20**, **ERC721**, বা **ERC1155**।

**ধাপ 3 →** **Ethereum Token Address** ফিল্ডে আপনার **Ethereum/Goerli** token ঠিকানা লিখুন। নিশ্চিত করুন যে আপনার টোকেন চুক্তি কোড **Ethereum/Goerli** blockchain on যাচাই করা হয়েছে।

**ধাপ 4 →** **Ethereum Token ঠিকানা**, সংশ্লিষ্ট ক্ষেত্রগুলি যেমন যোগ করার পরে। **Token Name, Token Symbol, এবং Token Decimal** স্বয়ংক্রিয়ভাবে চুক্তি বিস্তারিত সঙ্গে populated  হবে।

**ধাপ 5 →** এখন, ম্যাপিং প্রক্রিয়া শুরু করতে **Begin Mapping** বাটনে ক্লিক করুন। এই কারনে একটি Ethereum লেনদেন জড়িত, তাই আপনাকে আপনার ওয়ালেটটি এগিয়ে যেতে সংযুক্ত করতে হবে।

**ধাপ 6 →** আপনাকে টোকেন তথ্য এবং মানচিত্রটি সম্পূর্ণ করতে আনুমানিক গ্যাসের ফিসের সাথে একটি রিভিউ মোডাল দেখানো হবে। বিস্তারিত যাচাই করুন এবং **Pay Gas Fee To Map** বোতামটি নির্বাচন করে ম্যাপিং লেনদেন শুরু করুন।

আপনার মানিব্যাগ থেকে লেনদেনের নিশ্চিত করার পরে, আপনাকে Ethereum-এ সম্পন্ন হওয়ার লেনদেনের জন্য অপেক্ষা করতে হবে। একবার লেনদেনটি সম্পন্ন Once ে, তাহলে আপনাকে Polygon PoS নেটওয়ার্কে আপনার চাইল্ড টোকেন ঠিকানায় সাফল্যের মডেল দেখানো হবে। আপনি [Polygonscan](https://polygonscan.com/)-এ তৈরি শিশু টোকেন ঠিকানা চেক করে the যাচাই করতে চালিয়ে যেতে পারেন।

একটি সফল মেইননেট ম্যাপিং-এর জন্য, আপনি এখানে আপনার টোকেন বিস্তারিত প্রদান করতে পারেন [যা](https://github.com/maticnetwork/polygon-token-list/issues/new/choose)[** Polygon Token**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json) লিস্টে যোগ করা হবে।

:::tip

একটি [<ins>কাস্টম টোকেন</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-) ম্যাপিং-এর ক্ষেত্রে, আপনি আমাদের [**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md) ডকুমেন্টেশন দেখতে পারেন এবং টোকেন ম্যাপ করতে আপনার কাস্টম FX বাস্তবায়ন তৈরি করতে দেওয়া তথ্য ব্যবহার করতে পারেন।

:::

## ভিডিও গাইড {#video-guide}

এখানে **কিভাবে Ethereum Goerli ↑  Polygon Mumbai** between মধ্যে টোকেন ম্যাপ করতে হবে তার উপর একটি দ্রুত ভিডিও টিউটোরিয়াল রয়েছে:

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>আপনার ব্রাউজার এই ভিডিও এলিমেন্ট সাপোর্ট করে না।</p>
</video>
