---
id: chainlink
title: Chainlink
sidebar_label: Chainlink
description: Chainlink হল Ethereum-এ নির্মিত একটি বিকেন্দ্রীভূত ব্লকচেইন ওরাকল নেটওয়ার্ক।
keywords:
  - wiki
  - polygon
  - chainlink
  - oracle
  - decentralized
  - data
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

**Chainlink** একটি বিকেন্দ্রীকৃত ওরাকল নেটওয়ার্কের মাধ্যমে আপনার কন্ট্রাক **যেকোন বহিরাগত ডেটা সোর্স অ্যাক্সেস** করতে সক্ষম করে। আপনার চুক্তির খেলার ফলাফল, সর্বশেষ আবহাওয়া বার্তা বা অন্যান্য জনসাধারণের জন্য উপলভ্য ডেটা যাই প্রয়োজন হোক না কেন, Chainlink আপনার চুক্তির জন্য প্রয়োজনীয় সব টুল সরবরাহ করবে।

## ডিসেন্ট্রালাইজড ডেটা {#decentralized-data}

Chainlink-এর সবচেয়ে শক্তিশালী বৈশিষ্ট্যগুলোর মধ্যে একটি ইতিমধ্যে বিকেন্দ্রীভূত, aggregated, এবং জনপ্রিয় cryptocurrencies. সর্বাধিক অন-চেইন ডেটা digested প্রস্তুত। এগুলি [**Chainlink Data Feeds**](https://docs.chain.link/docs/using-chainlink-reference-contracts) নামে পরিচিত।

এতি চুক্তির একটি কার্যকরী উদাহরণ যা মুম্বাই টেস্টনেটে MATIC-এর সর্বশেষ মূল্য USD-তে দিয়ে থাকে।

আপনার যা করতে হবে তা হল আপনার যে [কোনও ডেটা ফিডের কোনও ঠিকানা দিয়ে](https://docs.chain.link/docs/matic-addresses#config) ঠিকানা সোপান করুন এবং আপনি মূল্য তথ্য digesting শুরু করতে পারেন।

```
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Mumbai Testnet
     * Aggregator: MATIC/USD
     * Address: 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

## অনুরোধ এবং গ্রহণ চক্র {#request-and-receive-cycle}

Chainlink এর অনুরোধ এবং গ্রহণ চক্র দিয়ে আপনার স্মার্ট চুক্তিগুলি যেকোনো এক্সটার্নাল API-তে রিকোয়েস্ট করতে এবং প্রতিক্রিয়া পেতে সক্ষম করে তুলে। এটি বাস্তবায়নের জন্য, আপনার চুক্তিকে দুটি ফাংশন সংজ্ঞায়িত করতে হবে:

1. **তথ্য অনুরোধ** করার জন্য এক, এবং
2. **আরেকটি প্রতিক্রিয়া পাওয়ার** জন্য।

তথ্য অনুরোধ করতে, আপনার চুক্তি একটি `request`অবজেক্ট তৈরি করে যা এটি একটি oracle প্রদান করে। ওরাকল API এর কাছে পৌঁছালে এবং প্রতিক্রিয়া পার্স করলে, এটি আপনার স্মার্ট চুক্তিতে সংজ্ঞায়িত কলব্যাক ফাংশন ব্যবহার করে আপনার চুক্তিতে ডেটা ফেরত পাঠানোর চেষ্টা করবে।

## ব্যবহার {#uses}

1. **Chainlink ডেটা ফিড**

এই হচ্ছে বাস্তব বিশ্বের থেকে তথ্য পাওয়ার জন্য ইতিমধ্যে অনলাইনে সম্পাদিত ডাটা রেফারেন্স পয়েন্ট এবং দ্রুত, সহজতম এবং সবচেয়ে সস্তা উপায়। বর্তমানে কিছু জনপ্রিয় ক্রিপ্টোকারেন্সি এবং ফিয়াট জুটি সমর্থন করে।

ডেটা ফিডসের সাথে কাজ করার জন্য, Chainlink ডকুমেন্টেশন [**থেকে Polygon ডেটা**](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon) ফিডটি ব্যবহার করুন।

2. **Chainlink যাচাইযোগ্য Randomness ফাংশন**

প্রাপক র্যান্ডম নম্বর পান, যেখানে র্যান্ডম নম্বর ক্রিপ্টোগ্রাফিক হওয়ার জন্য নিশ্চিত করা হয়।

Chainlink VRF এর সাথে কাজ করার জন্য, [Chainlink ডকুমেন্টেশন](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number) থেকে [**Polygon VRF**](https://docs.chain.link/vrf/v2/subscription/supported-networks) ঠিকানাটি ব্যবহার করুন।

3. **Chainlink API Calls**

ঐতিহ্যবাহী API-এর সাথে কাজ করতে আপনার স্মার্ট চুক্তি কীভাবে কনফিগার করবেন এবং কোনও ডেটা পেতে কাস্টমাইজ করবেন, ইন্টারনেটে যে কোনও অনুরোধ পাঠাবেন, এবং আরও অনেক কিছু।

## কোডের উদাহরণ {#code-example}

এক্সটার্নাল API-এর সাথে ইন্টারঅ্যাক্ট করতে, আপনার স্মার্ট চুক্তি অবশ্যই [`ChainlinkClient.sol`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol) থেকে ইনহেরিট হতে হবে। এই চুক্তিটিকে প্রসেসিং অনুরোধকে আরো সহজ করে তুলতে ডিজাইন করা হয়েছে। এটি `Chainlink.Request` নামের একটি স্ট্রাক্ট উন্মুক্ত করে, যা API অনুরোধ তৈরি করতে আপনার চুক্তির অবশ্যই ব্যবহার করা উচিত।

অনুরোধটি অবশ্যই oracle ঠিকানা, job id, fee, adapter প্যারামিটার, এবং callback function signature সংজ্ঞায়িত করতে হবে। এই উদাহরণে, অনুরোধটি ফাংশনে `requestEthereumPrice` বিল্ট করা হয়েছে।

`fulfill`-কে কলব্যাক ফাংশন হিসাবে সংজ্ঞায়িত করা হয়েছে।

```
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {

    uint256 public price;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    /**
     * Network: Polygon Mumbai Testnet
     * Oracle: 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9
     * Job ID: da20aae0e4c843f6949e5cb3f7cfe8c4
     * LINK address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Fee: 0.01 LINK
     */
    constructor() public {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        oracle = 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9;
        jobId = "da20aae0e4c843f6949e5cb3f7cfe8c4";
        fee = 10 ** 16; // 0.01 LINK
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target price
     * data, then multiply by 100 (to remove decimal places from price).
     */
    function requestBTCCNYPrice() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        // NOTE: If this oracle gets more than 5 requests from this job at a time, it will not return.
        request.add("get", "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=CNY&apikey=demo");

       // Set the path to find the desired data in the API response, where the response format is:
       // {
       //     "Realtime Currency Exchange Rate": {
       //       "1. From_Currency Code": "BTC",
       //       "2. From_Currency Name": "Bitcoin",
       //       "3. To_Currency Code": "CNY",
       //       "4. To_Currency Name": "Chinese Yuan",
       //       "5. Exchange Rate": "207838.88814500",
       //       "6. Last Refreshed": "2021-01-26 11:11:07",
       //       "7. Time Zone": "UTC",
       //      "8. Bid Price": "207838.82343000",
       //       "9. Ask Price": "207838.88814500"
       //     }
       //     }
        string[] memory path = new string[](2);
        path[0] = "Realtime Currency Exchange Rate";
        path[1] = "5. Exchange Rate";
        request.addStringArray("path", path);

        // Multiply the result by 10000000000 to remove decimals
        request.addInt("times", 10000000000);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId)
    {
        price = _price;
    }
}
```

## মেইননেট Polygon LINK টোকেন {#mainnet-polygon-link-token}

Ethereum Mainnet-এ মেইননেট Polygon LINK টোকেন পেতে আপনাকে 2-ধাপ প্রসেস অনুসরণ করতে হবে।

1. Plasma বা [PoS ব্রিজ](https://wallet.polygon.technology/bridge) ব্যবহার করে আপনার LINK ব্রিজ করুন।
2. [Chainlink দ্বারা ডিপ্লয় করা Pegswap](https://pegswap.chain.link/) দিয়ে ERC677 সংস্করণের জন্য LINK সোয়াপ করুন।

Polygon ব্রিজ LINK এর ERC20 সংস্করণ নিয়ে এসেছে এবং LINK হচ্ছে ERC677। তাই আমাদের এই সোয়াপ দিয়ে শুধু আপডেট করলেই হবে।

## ঠিকানাসমূহ {#addresses}

বর্তমানে Polygon মুম্বাই টেস্টনেটে শুধু কিছু কর্মক্ষম Chainlink ওরাকল রয়েছে। আপনি সর্বদাই নিজের একটি চালাতে পারেন এবং Chainlink Marketplace-এ তা তালিকাভুক্ত করতে পারেন।

* ওরাকল: [`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`](https://mumbai.polygonscan.com/address/0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9/transactions)
* LINK: [`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`](https://mumbai.polygonscan.com/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions)

মুম্বাই Testnet-এ LINK পাওয়ার জন্য, [এখানে Polygon faucet](https://faucet.polygon.technology/) এর জন্য হেড করুন।

## সমর্থিত API {#supported-apis}

Chainlink এর অনুরোধ এবং গ্রহণ চক্র যেকোনো পাবলিক API কল করার মত যথেষ্ট ফ্লেক্সিবল, যদি অনুরোধের প্যারামিটারটি সঠিক থাকে এবং প্রতিক্রিয়ার ফরম্যাটটি পরিচিত হয়। উদাহরণস্বরূপ, যদি আমরা কোনো URL থেকে একটি প্রতিক্রিয়ার অবজেক্ট নিয়ে আসতে চাই এবং তা ফরম্যাট করা থাকে এইভাবে: `{"USD":243.33}`, তাহলে পথটি খুবই সহজ: `"USD"`।

যদি একটি API একটি জটিল JSON অবজেক্টের সাথে সাড়া responds ে, তাহলে **পাথ** প্যারামিটারটি নেস্টেড অবজেক্টের জন্য একটি ডট ডিলিমিটেড স্ট্রিং ব্যবহার করে কোথায় desired া ডেটা পুনরুদ্ধার করতে হবে তা নির্দিষ্ট করতে হবে। উদাহরণস্বরূপ, নিম্নলিখিত প্রতিক্রিয়া বিবেচনা করুন:

```json
{
   "Prices":{
        "USD":243.33
    }
}
```

এর জন্য নিম্নলিখিত পথের প্রয়োজন হবে: `"Prices.USD"`। যদি there স্পেস থাকে বা স্ট্রিংটি বেশ দীর্ঘ, তাহলে আমরা উপরে উদাহরণে দেখানো সিন্ট্যাক্স ব্যবহার করতে পারি, যেখানে আমরা তাদের সব একটি স্ট্রিং অ্যারে হিসাবে পাস করি।

```json
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

## জব আইডি দিয়ে কী করা হয়? {#what-are-job-ids-for}

আপনি লক্ষ্য করেছেন যে আমাদের [উদাহরণ](#code-example) অনুরোধ তৈরি করার সময় একটি `jobId`প্যারামিটার ব্যবহার করে। জবগুলি নির্দেশাবলীর একটি ক্রম দ্বার গঠিত হয় যা একটি ওরাকল চালানোর জন্য কনফিগার করা হয়। উপরের [কোডের উদাহরণে](#code-example), চুক্তিটি জব আইডি দিয়ে ওরাকলের জন্য একটি অনুরোধ করে: `da20aae0e4c843f6949e5cb3f7cfe8c4`। এই নির্দিষ্ট জবটি নিম্নলিখিত কাজগুলি করার জন্য কনফিগার করা হয়েছে:

* একটি GET অনুরোধ করুন
* JSON প্রতিক্রিয়া পার্স করুন
* মানটিকে *x* দিয়ে গুণ করুন
* মানটিকে `uint`-এ রূপান্তর করুন
* চেইনে জমা দিন

এই জন্যেই আমাদের চুক্তি URL, JSON প্রতিক্রিয়ার পছন্দসই ডেটা এবং অনুরোধের সময় পরিমাণ খুঁজে বের করার পথে, যোগ করা হয়; `request.add` স্টেটমেন্ট ব্যবহার করে। এই নির্দেশাবলী ওরাকলে অ্যাডাপ্টার দিয়ে ফ্যাসিলিটেট করা হয়।

**কোনো ওরাকলের প্রতিটি অনুরোধে একটি নির্দিষ্ট জব আইডি অবশ্যই থাকতে হবে।**

Polygon ওরাকল চালানোর জন্য কনফিগার করা হয়েছে এমন একটি জবের তালিকা এখানে রয়েছে।

| নাম | ফেরতের ধরণ | আইডি | অ্যাডাপ্টার |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `da20aae0e4c843f6949e5cb3f7cfe8c4` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx` |
| HTTP GET | `int256` | `e0c76e45462f4e429ba32c114bfbf5ac ` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx` |
| HTTP GET | `bool` | `999539ec63414233bdc989d8a8ff10aa ` | `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx` |
| HTTP GET | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |
| HTTP POST | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |

সম্পূর্ণ Chainlink API রেফারেন্স [এখানে](https://docs.chain.link/any-api/api-reference) পাওয়া যেতে পারে।
