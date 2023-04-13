---
id: network-rpc-endpoints
title: नेटवर्क एंडपॉइंट
sidebar_label: Endpoints
description: पॉलीऑन PoS मेननेट और टेस्टनेट के लिए नेटवर्क एंडपॉइंट
keywords:
  - docs
  - polygon
  - matic
  - remote procedure call
  - network endpoints
  - rpcs
  - http
  - websocket
  - wss
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: endpoints
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

इस इंडेक्स गाइड में पॉलीगॉन मुंबई टेस्टनेट और पॉलीगॉन PoS मैननेट के लिए नेटवर्क का विवरण शामिल है और और संबंधित RPC और नोड एंडपॉइंट को सूची में रखता है.

<Tabs
defaultValue="mainnet"
values={[
{ label: 'PoS Mainnet', value: 'mainnet', },
{ label: 'PoS Testnet', value: 'mumbai', },
]
}>
<TabItem value="mumbai">

## मुंबई PoS टेस्टनेट {#mumbai-pos-testnet}

मुंबई टेस्टनेट पॉलीगॉन मेननेट को दोहराता है और इसे टेस्ट करने के लिए किया जाता है. यूज़र टोकन प्राप्त कर सकते हैं
[फ़ॉसेट](https://faucet.polygon.technology/) की मदद से वो ऐसा कर सकते हैं.
टेस्टनेट टोकन किसी मूल्य के नहीं हैं और मैटिक जैसी मूल्य वाली असेट से अलग हैं.
यह डेवलपर्स या नेटवर्क का रखरखाव करने वालों को कॉन्फ़िगरेशन और लागू किए गए प्रयोग का टेस्ट करने में मदद करता है.

| विशेषताएँ | नेटवर्क का विवरण |
| ---------------------------------- | ---------------------------------------------------------------- |
| नेटवर्क का नाम | **मुंबई** |
| पैरेंट चेन | **[गोएर्ली](https://goerli.net/)** |
| चेन Id | `80001` |
| गैस टोकन | [मैटिक](gas-token) |
| गैस स्टेशन | [मुंबई गैस स्टेशन](https://gasstation-mumbai.matic.today/v2) ([यहाँ](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/) और अधिक जानें) |
| RPC एंडपॉइंट | [https://rpc-mumbai.matic.today](https://rpc-mumbai.matic.today) |
| नोड एंडपॉइंट | [wss://rpc-mumbai.matic.today](wss://rpc-mumbai.matic.today) |
| हेम्डल API | [https://heimdall-api-testnet.polygon.technology .](https://heimdall-api-testnet.polygon.technology) |
| ब्लॉक एक्सप्लोरर | [https://mumbai.polygonscan.com/](https://mumbai.polygonscan.com/) |

:::note अधिक जानकारी

नीचे दिया गया [**JSON डेटा**](https://static.matic.network/network/testnet/mumbai/index.json) देखें
जिसमें नेटवर्क का विवरण है.

:::

</TabItem>
<TabItem value="mainnet">

## पॉलीगॉन PoS मेननेट {#polygon-pos-mainnet}

पॉलीगॉन PoS का स्थानीय टोकन मैटिक है और गैस के लिए इस्तेमाल किया जाता है.

| विशेषताएँ | नेटवर्क का विवरण |
| ---------------------------------- | ---------------------------------------------------------------- |
| नेटवर्क का नाम | **पॉलीगॉन** |
| पैरेंट चेन | **एथेरेयम** |
| चेन Id | `137` |
| गैस टोकन | [मैटिक](gas-token) |
| गैस स्टेशन | [PolygonScan Gas Tracker (**सुझाया गया**)](https://polygonscan.com/gastracker) या [मैटिक नेटवर्क गैस स्टेशन](https://gasstation-mainnet.matic.network/v2) ([यहाँ](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/) अधिक जानें) |
| RPC एंडपॉइंट | [https://polygon-rpc.com/](https://polygon-rpc.com/) |
| नोड एंडपॉइंट | [wss://rpc-mainnet.matic.network](wss://rpc-mainnet.matic.network) |
| हेम्डल API | [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology) |
| ब्लॉक एक्सप्लोरर | [https://polygonscan.com/](https://polygonscan.com/) |

:::note अधिक जानकारी

निम्न को देखें [**JSON डेटा**](https://github.com/maticnetwork/static/blob/master/network/mainnet/v1/index.json)
नेटवर्क का विवरण शामिल है.

:::

</TabItem>
</Tabs>

## RPC API तरीके {#rpc-api-methods}

डेवलपर्स ऑन चेन डेटा के साथ इंटरैक्ट कर सकते हैं और विभिन्न प्रकार के ट्रांज़ैक्शन भेज सकते हैं नेटवर्क को, एंडपॉइंट नेटवर्क का इस्तेमाल करके. APIs, एक JSON-RPC मानक को फॉलो करते हैं;
JSON-RPC एक बिना स्टेट की, हलकी, प्रक्रिया की रिमोट कॉल (RPC) का ऐसा प्रोटोकॉल है
जो ब्लॉकचेन नेटवर्क से बातचीत करते समय आम तौर पर इस्तेमाल किया जाता है.

:::info RPC कॉल के साथ शुरू करें

मानक के लिए, API डॉक्यूमेंटेशन के पूरे सेट को विज़िट करके शुरू करें [**पॉलीगॉन JSON-RPC कॉल**](https://edge-docs.polygon.technology/docs/get-started/json-rpc-commands/).

अगर आप ऐसे API अनुरोध के साथ शुरू करना चाहते हैं जिन्हें सेटअप करने की ज़रूरत नहीं होती, जो ठीक नहीं हो रहे या, पॉलीगॉन नेटवर्क पर नए तरीके खोजें, [**कंपोजर ऐप**](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D) को आजमाएँ.

:::

पॉलीगॉन PoS चेन से इंटरैक्ट करते समय एक यूज़र अपने नोड को भी रन कर सकता है या API सेवा प्रदाताओं और इन्फ्रास्ट्रक्चर द्वारा प्रदान किए गए सार्वजनिक एंडपॉइंट में से एक को नेटवर्क से कनेक्ट करने के लिए उपयोग कर सकते हैं. चेन से रियल टाइम अपडेट पाने के लिए डैगर सबसे अच्छा तरीका है क्योंकि यह एक तरीका प्रदान करता अपने dApp और बैकएंड सिस्टम के लिए सॉकेट या वेबसॉकेट पर रियलटाइम में ब्लॉकचेन इवेंट पाएँ.

### इंफ्रास्ट्रक्चर प्रोवाइडर {#infrastructure-providers}

सार्वजनिक RPC पर ट्रैफिक या रेट की सीमा हो सकती है जो इसके इस्तेमाल पर निर्भर करती है. आप एक समर्पित फ्री RPC URL के लिए निम्न पर साइन अप कर सकते हैं:

* [Alchemy](https://www.alchemy.com/)
* [Ankr](https://www.ankr.com/)
* [Blast (Bware Labs)](https://blastapi.io/)
* [BlockPI](https://blockpi.io/)
* [BlockSpaces](https://www.blockspaces.com/web3-infrastructure)
* [चैनल्स](https://www.chainnodes.org/)
* [Chainstack](https://chainstack.com/build-better-with-polygon/)
* [DataHub (फिगमेंट)](https://datahub.figment.io)
* [Getblock](https://getblock.io/en/)
* [Infura](https://infura.io)
* [MaticVigil](https://rpc.maticvigil.com/)
* [Moralis](https://moralis.io)
* [पॉकेट नेटवर्क](https://www.portal.pokt.network/)
* [QuickNode](https://www.quicknode.com/chains/matic)
* [SettleMint](https://docs.settlemint.com/docs/polygon-connect-to-a-node)
* [WatchData](https://docs.watchdata.io/blockchain-apis/polygon-api)
* [NOWNodes](https://nownodes.io/nodes/polygon-matic)
