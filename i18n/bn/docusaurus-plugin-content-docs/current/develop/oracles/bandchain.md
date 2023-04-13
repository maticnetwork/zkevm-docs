---
id: bandchain
title: BandChain
sidebar_label: BandChain
description: BandChain হচ্ছে একটি হাই-পারফরম্যান্স ব্লকচেইন যা ডাটা Oracle জন্য নির্মিত হচ্ছে তা হচ্ছে ঐতিহ্যবাহী ওয়েব API-এর ডেটা প্রশ্নের জন্য
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

ব্যান্ড প্রোটোকল দিয়ে আপনি প্রথাগত ওয়েব API থেকে ডেটা কুয়েরি করতে পারবেন এবং তা ব্লকচেইনে ব্যবহার করতে পারবেন। ডেভেলপাররা ওরাকল অনুরোধ এবং পেমেন্ট সহজতর করার জন্য **একটি কসমস-ভিত্তিক ব্লকচেইনের** মাধ্যমে প্রশ্নাবলী তৈরি করতে পারেন এবং তারপর inter-chain যোগাযোগের মাধ্যমে dApp এ ডাটা ব্যবহার করতে পারেন। 3টি সহজ ধাপের মাধ্যমে ওরাকল ডেটা যুক্ত করা যেতে পারে:

1. **ওরাকল স্ক্রিপ্ট নির্বাচন করে**

    ওরাকল স্ক্রিপ্ট হচ্ছে একটি হ্যাশ যা band-chain থেকে কী প্রকারের ডেটা অনুরোধ করা হবে তা বিশেষভাবে চিহ্নিত করে। এই স্ক্রিপ্টগুলি [**এখানে**](https://guanyu-devnet.cosmoscan.io/oracle-scripts) পাওয়া যাবে। এই স্ক্রিপ্টগুলিকে ওরাকল অনুরোধ করার সময় একটি প্যারামিটারে হিসাবে ব্যবহার করা হয়ে থাকে।

2. **BandChain থেকে ডেটা অনুরোধ করা**

এটি দুটি উপায়ে সম্পন্ন করা যেতে পারে:

    - **BandChain এক্সপ্লোরার ব্যবহার করে**

    আপনি আপনার পছন্দের ওরাকল স্ক্রিপ্টে ক্লিক করতে পারেন এবং তারপরে **এক্সিকিউট** ট্যাব থেকে আপনি প্যারামিটারে পাস করতে পারেন এবং BandChain-এর প্রতিক্রিয়া পেতে পারেন। প্রতিক্রিয়াটিতে ফলাফলের পাশাশি একটি EVM প্রমাণও থাকবে। প্রমাণটিকে অবশ্যই কপি করতে হবে কারণ এটি চূড়ান্ত ধাপে ব্যবহার করা হবে। এক্সপ্লোরার ব্যবহার করে oracle প্রশ্নের জন্য BandChain ডক [**এখানে**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer) পাওয়া যায়।

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    উপরে দেওয়া হচ্ছে এলোমেলো নম্বর মান পাওয়ার জন্য একটি ওরাকল অনুরোধ তৈরি করার একটি উদাহরণ। মান 100 oracle অনুরোধের `max_range`প্যারামিটারে পাস করা হয়। আমরা জবাবে একটি হ্যাশ পাব। সেই হ্যাশে ক্লিক করলে আমরা প্রতিক্রিয়াটির সম্পূর্ণ বিবরণ দেখতে পাব।

    - **BandChain-Devnet JS লাইব্রেরি**

    আপনি BandChain-Devnet লাইব্রেরি ব্যবহার করে সরাসরি BandChain Query করতে পারেন। কুয়েরি করা হলে প্রতিক্রিয়ার এটি একটি **EVM প্রমাণ** পাঠায়। এই প্রমাণটি BandChain ইন্টিগ্রেশনের চূড়ান্ত ধাপে ব্যবহার করা যাবে। BandChain-Devnet JS লাইব্রেরি ব্যবহার করে oracle করার জন্য BandChain ডক [**এখানে**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library) পাওয়া যায়। র‍্যান্ডম নাম্বারের ওরাকলের অনুরোধ ক্রয়া পেলোড দেখতে অনেকটা এরকম হবে। নিশ্চিত করুন যে অনুরোধকৃত বডি অ্যাপ্লিকেশন/json ফরম্যাটে পাস করা হচ্ছে।

3. **স্মার্ট চুক্তিতে ডেটা ব্যবহার করে**

  সর্বশেষ ধাপ হচ্ছে একটি যাচাইকরণ চুক্তি ডিপ্লয় করা এবং যাচাইকরণ চুক্তির স্টেট ভেরিয়েবলে ওরাকল রিকোয়েস্টের প্রতিক্রিয়াটি সংরক্ষণ করা। এই স্টেট ভেরিয়েবলগুলি সেটা করা হয়ে গেলে সেগুলি যেমন আছে তেমনভাবে এবং প্রয়োজনীয় মুহূর্তে dApp দ্বারা অ্যাক্সেস করা যাবে। এছাড়াও, এই স্টেট ভেরিয়েবলগুলিকে dApp থেকে আবার ওরাকল স্ক্রিপ্ট কুয়েরি করে নতুন মান দিয়ে আপডেট করা যাবে। নিচে বর্ণিতটি হচ্ছে একটি যাচাইকরণ চুক্তি যা র‍্যান্ডম নাম্বার ওরাকল স্ক্রিপ্ট ব্যবহার করে র‍্যান্ডম নাম্বার সংরক্ষণ করে।

  ```jsx
  pragma solidity 0.5.14;
  pragma experimental ABIEncoderV2;

  import "BandChainLib.sol";
  import "IBridge.sol";

  contract SimplePriceDatabase {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    constructor(
      bytes32 _codeHash ,
      bytes memory _params,
      IBridge _bridge
    ) public {
      codeHash = _codeHash;
      params = _params;
      bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
      IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
      uint64[] memory decodedInfo = result.data.toUint64List();

      require(result.codeHash == codeHash, "INVALID_CODEHASH");
      require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
      require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

      latestPrice = uint256(decodedInfo[0]);
      lastUpdate = uint256(decodedInfo[1]);
    }
  }
  ```

deploying, সময়, 3 প্যারামিটারে পাস করতে হবে। **প্রথম** প্যারামিটারটি হল `codeHash`ওরাকল স্ক্রিপ্ট হ্যাশ। **দ্বিতীয়** প্যারামিটারটি হল oracle স্ক্রিপ্ট অনুরোধ প্যারামিটার। এটি বাইট ফরম্যাটে পাস করতে হবে। BandChain একটি REST API প্রদান করে যা প্যারামিটার JSON অবজেক্টকে বাইট ফরম্যাটে রূপান্তর করে। API বিবরণ [**এখানে**](https://docs.bandchain.org/references/encoding-params) পাওয়া যাবে। এই API থেকে প্রাপ্ত প্রতিক্রিয়ায় 0x সংযুক্ত করতে হবে। **তৃতীয়** প্যারামিটারটি হল BandChain চুক্তির চুক্তি যা ইতিমধ্যে Polygon নেটওয়ার্কে deployed ে নি. ে আছে। ব্যান্ড প্রোটোকল Polygon TestnetV3 সমর্থন করে: 0x3ba819b03fb8d34995f68304946eefa6dcff7cbf

উল্লেখিত আরেকটি বিষয় হল যে যাচাইকরণ চুক্তি হবে সাহায্যকারী লাইব্রেরি এবং `BandChainLib.sol`ইন্টারফেসটি যথাক্রমে আমদানি `IBridge.sol`করা। তারা নিম্নলিখিত লিঙ্কগুলিতে পাওয়া যেতে পারে: [**Bandchain**](https://docs.bandchain.org/references/bandchainlib-library) Library এবং [**IBridge**](https://docs.bandchain.org/references/ibridge-interface) ইন্টারফেস।

  যাচাইকরণ চুক্তি ডিপ্লয় করা হয়ে গেলে dApp থেকে কুয়েরি করে স্টেট ভেরিয়েবলগুলি অ্যাক্সেস করা যাবে। একইভাবে বিভিন্ন ইন-বিল্ট ওরাকল স্ক্রিপ্টের জন্য একাধিক যাচাইকরণ চুক্তি তৈরি করা যেতে পারে। IBridge ইন্টারফেসের একটি পদ্ধতি আছে যা `relayAndVerify()`বৈধতা চুক্তিতে প্রতিটি সময় আপডেট করা মানগুলি যাচাই করে। যাচাইকরণ চুক্তির `update()`পদ্ধতিটিতে রাষ্ট্রের ভেরিয়েবল আপডেট করার জন্য লজিক রয়েছে। ওরাকল স্ক্রিপ্ট থেকে প্রাপ্ত EVM প্রমাণ পদ্ধতিতে পাস করতে `update()`হবে। প্রত্যেক সময় একটি মান আপডেট করা is Polygon ে অবস্থিত BandChain contract contract স্টেট in সংরক্ষণ করার আগে ডাটা যাচাই করে।

BandChain একটি বিকেন্দ্রীভূত নেটওয়ার্ক সরবরাহ করে যা তাদের স্মার্ট চুক্তি লজিক বাড়াতে dApps দ্বারা ব্যবহার করা যেতে পারে। কন্ট্রাক্ট deploying BandChain ডক, মানগুলো সংরক্ষণ করা এবং তাদের আপডেট করা হবে [**এখানে।**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library)