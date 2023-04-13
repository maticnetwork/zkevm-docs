---
id: chainlink
title: चेनलिंक
sidebar_label: Chainlink
description: चैनलिंक एक विकेंद्रीकृत ब्लॉकचेन ऑरेकल नेटवर्क है जो Ethereum. पर बनाई गई है.
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

**चैनलिंक** आपके कॉन्ट्रैक्ट को विकेंद्रीकृत दैवज्ञ नेटवर्क के माध्यम से **किसी भी बाहरी डेटा स्रोत** तक पहुंचने में सक्षम बनाता है. चाहे आपके अनुबंध के लिए खेल के परिणाम, नवीनतम मौसम, या किसी अन्य सार्वजनिक रूप से उपलब्ध डेटा की ज़रूरत हो, चेनलिंक आपके अनुबंध द्वारा उन्हें ग्रहण करने के लिए ज़रूरी टूल देता है.

## विकेंद्रित डेटा {#decentralized-data}

चैनलिंक की सबसे शक्तिशाली विशेषताओं में से एक पहले से ही विकेंद्रित, decentralized, और अधिकांश लोकप्रिय cryptocurrencies. पर चेन डेटा को पचने के लिए तैयार है. इन्हें [**चैनलिंक डेटा फीड्स**](https://docs.chain.link/docs/using-chainlink-reference-contracts) के रूप में जाना जाता है.

यहाँ अनुबंध के काम करने का एक उदाहरण है जो Mumbai टेस्टनेट पर USD में मैटिक की लेटेस्ट कीमत  को ग्रहण करता है.

सभी को करने की जरूरत है कि आप चाहें जो [डेटा फीड का पता](https://docs.chain.link/docs/matic-addresses#config) कर सकते हैं उसे स्वैप आउट कर सकते हैं और आप कीमत की जानकारी हजम करना शुरू कर सकते हैं.

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

## साईकिल का अनुरोध करें और पाएँ {#request-and-receive-cycle}

चेनलिंक का अनुरोध और पाने का चक्र किसी बाहरी API से अनुरोध करने और उसका जवाब ग्रहण करने के लिए आपके स्मार्ट कॉन्ट्रैक्ट को सक्षम करता है. इसे लागू करने के लिए, अनुबंध को दो फंक्शन्स को परिभाषित करने की ज़रूरत है:

1. **डेटा का अनुरोध** करने के लिए एक , और
2. एक और **रिस्पांस प्राप्त करने** के लिए.

डेटा का अनुरोध करने के लिए, आपका कॉन्ट्रैक्ट एक `request`ऑब्जेक्ट बनाता है जो यह एक ओरेकल को प्रदान करता है. एक बार ऑरेकल API तक पहुँच जाता है और प्रतिक्रिया को पार्स कर लेता है तो यह आपके स्मार्ट कॉन्ट्रैक्ट में परिभाषित कॉलबैक फ़ंक्शन का उपयोग कर डेटा को वापस आपके अनुबंध में भेजने की कोशिश करेगा.

## उपयोग {#uses}

1. **Chainlink डेटा फीड**

ये पहले से ही ऑन-चेन में aggregated डेटा संदर्भ प्वाइंट हैं और असली दुनिया से डेटा पाने के लिए सबसे जल्दी आसान और सबसे सस्ता तरीका हैं. वर्तमान में कुछ सबसे लोकप्रिय क्रिप्टोकरेंसी और फ़ीयट जोड़ी का समर्थन करता है.

डेटा फीड्स के साथ काम करने के लिए, [**पॉलीगॉन डेटा फीड्स**](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon) का इस्तेमाल चेन लिंक दस्तावेज से करें

2. **Chainlink र फंक्शन**

प्रोग्राम से यादृच्छिक नंबर प्राप्त करें, जहां यादृच्छिक संख्या को क्रिप्टोग्राफिक रूप से यादृच्छिक होने की गारंटी दी जाती है.

चैनलिंक VRF के साथ काम करने के लिए, [Chainlink दस्तावेज](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number) से [**पॉलीगॉन VRF पतों**](https://docs.chain.link/vrf/v2/subscription/supported-networks) का इस्तेमाल करें.

3. **API कॉल Chainlink**

अपने स्मार्ट कॉन्ट्रैक्ट को पारंपरिक API के साथ काम करने और किसी भी डेटा को पाने के लिए कस्टमाइज करने के लिए कैसे कॉन्फ़िगर करें, इंटरनेट पर किसी भी अनुरोध को और अधिक भेजना चाहिए.

## कोड का उदाहरण {#code-example}

बाहरी API के साथ इंटरैक्ट करने के लिए, आपके स्मार्ट कॉन्ट्रैक्ट को [`ChainlinkClient.sol`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol) से पाना चाहिए, जो प्रोसेसिंग के अनुरोध को आसान बनाने के लिए डिज़ाइन किया गया एक अनुबंध है. यह एक स्ट्रक्ट जिसे `Chainlink.Request` कहा जाता है उसे उजागर करता है, जिसे API अनुरोध बनाने के लिए अनुबंध का उपयोग करना चाहिए.

अनुरोध को दैवज्ञ पता, जॉब id, फीस, एडाप्टर पैरामीटर्स और कॉलबैक फंक्शन सिग्नेचर को परिभाषित करना चाहिए. इस उदाहरण में, अनुरोध `requestEthereumPrice` फ़ंक्शन में बना है.

`fulfill`को कॉलबैक फ़ंक्शन के रूप में परिभाषित किया जाता है.

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

## मेननेट पॉलीगॉन लिंक टोकन {#mainnet-polygon-link-token}

Ethereum Mainnet से mainnet पॉलीगॉन लिंक को प्राप्त करने के लिए, आपको 2 स्टेप की प्रक्रिया का पालन करना होगा.

1. प्लाज़्मा या [पॉस ब्रिज](https://wallet.polygon.technology/bridge) का इस्तेमाल कर लिंक पाएँ.
2. [चेनलिंक द्वारा डिप्लॉय किए गए पेगस्वैप](https://pegswap.chain.link/) के ज़रिए erc677 वर्जन के लिए लिंक को स्वैप करें.

पॉलीगॉन ब्रिज लिंक के erc20 वर्जन को लाता है, और लिंक एक erc677 है, इसलिए हमें इस स्वैप के साथ इसे अपडेट करना होगा.

## पते {#addresses}

Mumbai पॉलीगॉन टेस्टनेट पर फ़िलहाल कुछ ही चेनलिंक ऑरेकल चालू हैं. आप कभी भी एक खुद रन सकते हैं, और इसे चेनलिंक मार्केट प्लेस पर लिस्ट कर सकते हैं.

* ऑरेकल: [`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`](https://mumbai.polygonscan.com/address/0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9/transactions)
* लिंक: [`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`](https://mumbai.polygonscan.com/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions)

मुंबई टेस्टनेट पर लिंक प्राप्त करने के लिए, [यहां पॉलीगॉन के faucet](https://faucet.polygon.technology/) में सिर

## समर्थित API {#supported-apis}

चेनलिंक के अनुरोध और लेने का चक्र सार्वजनिक API कॉल करने में सक्षमता के लिए लचीला है, जब तक कि अनुरोध पैरामीटर्स सही हैं और प्रतिक्रिया का फ़ॉर्मैट पता है. उदाहरण के लिए, अगर किसी यूआरएल से प्राप्त ऑब्जेक्ट जो हम लाना चाहते हैं वह इस तरह फ़ॉर्मेट है: `{"USD":243.33}`,पाथ सरल है`"USD"`.

अगर एक API एक कॉम्प्लेक्स JSON ऑब्जेक्ट के साथ जवाब देता है, तो **पथ** पैरामीटर को निर्दिष्ट करने की जरूरत होगी कि नेस्टेड ऑब्जेक्ट्स के लिए डॉट delimited स्ट्रिंग का इस्तेमाल करके वांछित डेटा को पुनः प्राप्त करना कहां से चाहिए. उदाहरण के लिए, निम्नलिखित प्रतिक्रिया पर विचार करें:

```json
{
   "Prices":{
        "USD":243.33
    }
}
```

इसके लिए निम्नलिखित पाथ चाहिए होगा: `"Prices.USD"`. अगर स्ट्रिंग में जगह होती है, या स्ट्रिंग काफी लंबे हैं, तो हम ऊपर के उदाहरण में दिखाए गए सिंक का इस्तेमाल कर सकते हैं, जहां हम उन्हें स्ट्रिंग a के रूप में पार करते हैं.

```json
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

## जॉब आईडी किस लिए हैं? {#what-are-job-ids-for}

आपने देखा होगा कि अनुरोध के निर्माण के दौरान हमारा [उदाहरण](#code-example) एक `jobId`पैरामीटर का इस्तेमाल करता है. जॉब में उन निर्देशों की एक सीक्वन्स शामिल है जिन्हें रन करने के लिए ऑरेकल कॉन्फ़िगर किया जाता है. ऊपर [कोड के उदाहरण](#code-example) में, अनुबंध जॉब आईडी के साथ ऑरेकल से अनुरोध करता है: `da20aae0e4c843f6949e5cb3f7cfe8c4`. इस खास जॉब को निम्नलिखित करने के लिए कॉन्फ़िगर किया गया है:

* GET अनुरोध बनाएँ
* JSON प्रतिक्रिया को पार्स करें
* वैल्यू को *x* से गुणा करें
* वैल्यू को `uint` में बदलें
* चेन पर सबमिट करें

यही वजह है कि हमारा अनुबंध `request.add` स्टेट्मेंट का इस्तेमाल करते हुए यूआरएल में वह पाथ जोड़ता है, जहाँ JSON प्रतिक्रिया में इच्छित डेटा खोजना है और अनुरोध के लिए कितना समय लगता है. इन निर्देशों को ऑरेकल में उनके द्वारा पेश किया जाता है जो एडॉप्टर के रूप में जाने जाते हैं.

**किसी ऑरेकल को किए गए हर अनुरोध को एक खास जॉब आईडी को शामिल करना चाहिए.**

यहाँ पर पॉलीगॉन ऑरेकल द्वारा रन करने के लिए कॉन्फ़िगर किए गए जॉब की सूची है.

| नाम | रिटर्न की किस्म | आईडी | एडाप्टर |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `da20aae0e4c843f6949e5cb3f7cfe8c4` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx` |
| HTTP GET | `int256` | `e0c76e45462f4e429ba32c114bfbf5ac ` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx` |
| HTTP GET | `bool` | `999539ec63414233bdc989d8a8ff10aa ` | `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx` |
| HTTP GET | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |
| HTTP POST | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |

पूरी चेनलिंक API संदर्भ [यहाँ](https://docs.chain.link/any-api/api-reference) मिल सकता है.
