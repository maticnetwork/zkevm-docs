---
id: fx-portal
title: FxPortal
description: FxPortal का इस्तेमाल करके Ethereum से स्टेट या डेटा को पॉलीगॉन में Transfer र करें.
keywords:
  - docs
  - polygon wiki
  - polygon
  - FxPortal
  - ethereum to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

पॉलीगॉन से Ethereum डेटा को नेटिव रूप से पढ़ने की सामान्य मैकेनिज्म **स्टेट सिंक** का इस्तेमाल कर रही है. यह एथेरेयम से पॉलीगॉन को मनमाना डेटा ट्रांसफ़र करने देता है. हालाँकि, अगर डिफ़ॉल्ट इंटरफ़ेस का इस्तेमाल नहीं किया जा सकता तो इस तरीके को रुट और चाइल्ड अनुबंध की मैपिंग की भी ज़रूरत होती है. FxPortal एक विकल्प देता है जहाँ ERC मानकीकृत टोकन को बिना किसी भी मैपिंग के डिप्लॉय किया जा सकता है, बस डिप्लॉय किए गए बेस FxPortal अनुबंध का इस्तेमाल करें.

## FxPortal क्या है. {#what-is-fxportal}

यह पॉलीगॉन [स्टेट सिंक](../../pos/state-sync/state-sync-mechanism.md) मैकेनिज्म का एक शक्तिशाली अभी भी सरल कार्यान्वयन है. पॉलीगॉन पॉस ब्रिज को इसी आर्किटेक्चर पर बनाया गया है. [उदाहरण](https://github.com/fx-portal/contracts/tree/main/contracts/examples) फ़ोल्डर में कोड उपयोग के कुछ उदाहरण हैं. आप इन उदाहरणों का इस्तेमाल आसानी से अपने खुद के इम्प्लीमेंटेशन या खुद के कस्टम ब्रिज बनाने के लिए कर सकते हैं जो बिना मैपिंग के किसी भी स्टेट सिंक की अनुमति देता है.

आप कॉन्ट्रैक्ट और उदाहरणों के लिए [GitHub रिपोजिटरी](https://github.com/fx-portal/contracts) की जांच कर सकते हैं.

## यह कैसे काम करता है? {#how-does-it-work}

[FxChild](https://github.com/fx-portal/contracts/blob/main/contracts/FxChild.sol) और [Fxroot](https://github.com/fx-portal/contracts/blob/main/contracts/FxRoot.sol) उन मुख्य कॉन्ट्रैक्ट हैं जिन पर FxPortal काम करता है. यह स्टेट सिंक मैकेनिज्म का इस्तेमाल करके बिना किसी मैपिंग के दूसरी चेन पर उपयोगकर्ता से परिभाषित तरीकों को कॉल और पास करता है. डिप्लॉय किए गए मुख्य अनुबंध का इस्तेमाल करने के लिए, आप अपने डिप्लॉय किए स्मार्ट कॉन्ट्रैक्ट में FxPortal के बेस अनुबंध लागू कर सकते हैं - [FxBaseRootTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) और [FxBaseChildTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). इन अनुबंध पर बना कर, आपके डिप्लॉय किए गए अनुबंध डेटा टनल मैकेनिज़्म का इस्तेमाल कर एक दूसरे के साथ संचार कर सकेंगे.

अन्यथा, आप पहले से ही तैनात सुरंग कॉन्ट्रैक्ट के साथ अपने टोकन को मैप करने के लिए चुन सकते हैं. पॉलीगॉन मैननेट और मुंबई टेस्टनेट के लिए डिफ़ॉल्ट FxTunnel deployment र विवरण इस प्रकार हैं:

- [पॉलीगॉन मैनेट](https://static.matic.network/network/mainnet/v1/index.json)
- [मुंबई टेस्टनेट](https://static.matic.network/network/testnet/mumbai/index.json)

सभी डिफॉल्ट सुरंग कॉन्ट्रैक्ट और अन्य महत्वपूर्ण FxPortal कॉन्ट्रैक्ट डिप्लॉयमेंट खोजने के लिए उपरोक्त कड़ियों `FxPortalContracts`में कीवर्ड को देखें.

## क्या मुझे एक कस्टम FxTunnel इम्प्लीमेंटेशन की जरूरत है. {#do-i-need-a-custom-fxtunnel-implementation}

आपको **एक कस्टम FxTunnel के कार्यान्वयन** के लिए तभी जाना चाहिए जब डिफ़ॉल्ट सुरंग के इम्प्लीमेंटेशन अपने इस्तेमाल मामले से संरेखित न हों. जब आप डिफ़ॉल्ट FxPortal सुरंगों का इस्तेमाल करते हैं, तो आप बच्चे कॉन्ट्रैक्ट कोड को संशोधित नहीं कर सकते बच्चे टोकन कॉन्ट्रैक्ट के लिए bytecode हमेशा तय हो जाती है और [हमेशा डिफॉल्ट FxTunnel डिप्लॉयमेंट](https://github.com/fx-portal/contracts/tree/main/contracts/examples) के लिए एक ही रहता है. अगर आपको एक कस्टम चाइल्ड की जरूरत है, तो आपको अपने खुद के कस्टम FxTunnel के लिए जाना चाहिए और अगले हिस्से को पढ़ने से आपको और अधिक गाइड होगा अपने खुद के कस्टम FxTunnels को deploying करने में .

आगामी सेक्शन को पढ़ने से पहले [FxPortal स्टेट Transfer](state-transfer.md) र को पढ़ने और समझने की बहुत सिफारिश की जाती है. इन आगामी सेक्शनों में से प्रत्येक में इसके साथ जुड़ी एक मिसाल टनल कॉन्ट्रैक्ट लिंक होंगे. इन उदाहरणों को अपने खुद के कस्टम fx-tunnels. का निर्माण करते समय एक संदर्भ के रूप में लिया जा सकता है.

## erc20 ट्रांसफ़र {#erc20-transfer}

[बच्चे और रूट टनल कॉन्ट्रैक्ट](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc20-transfer) रूट चेन पर टोकन्स जमा करने और चाइल्ड चेन पर वापसी करने में सक्षम हो जाते हैं.

#### `FxERC20RootTunnel`

- `mapToken(address rootToken)`: आप अपने ERC20 टोकन को मैप करने और चाइल्ड चेन पर एक संबंधित चाइल्ड टोकन बनाने के लिए फंक्शन को कॉल कर सकते हैं.
- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: मैप किए गए टोकन के पते के साथ कॉल करने की `deposit()`विधि जो पता एक संबंधित राशि के साथ (if the होने पर डेटा के साथ) वापस ले सकता है. आपको अपने टोकन खर्च करने के लिए पहले मानक erc20 `approve` फ़ंक्शन का इस्तेमाल कर अनुबंध को मंजूरी दी होनी चाहिए.

#### `FxERC20ChildTunnel`

- `withdraw(address childToken, uint256 amount)`: इन में निर्दिष्ट पता इस फंक्शन का इस्तेमाल करके बच्चे टोकन की सभी रकम वापस ले सकता `deposit()`है. जब पहली बार मैप किया जाएगा तो उन्हें तब बनाए गए चाइल्ड टोकन प्राप्त होंगे.
- `rootToChildToken`: इस पब्लिक वेरिएबल में चाइल्ड टोकन के लिए रूट टोकन शामिल है. आप डिप्लॉय किए चाइल्ड टोकन का पता जानने के लिए रूट टोकन के पते के साथ मैपिंग क्वेरी कर सकते हैं.

### Ethereum → पॉलीगॉन {#polygon}

1. रुट चेन पर अपना खुद का erc20 टोकन डिप्लॉय करें. आपको इस पते की ज़रूरत बाद में पड़ेगी.
2. रुट टनल के पते और रकम को आर्गुमेंट के रूप में रखते हुए, रूट टोकेन के `approve()` फ़ंक्शन का सहारा लेकर टोकन को ट्रांसफ़र के लिए मंज़ूर करें.
3. पाने वाले के पते और चाइल्ड चेन पर उसके बराबर चाइल्ड टोकन पाने के लिए रुट चेन पर रकम के साथ `deposit()` का सहारा लेने की ओर बढ़ें. यह टोकन को ऑटोमैटिक रूप से मैप भी करेगा. वैकल्पिक रूप से, आप डिपॉज़िट करने से पहले `mapToken()` का सहारा ले सकते हैं.
4. मैपिंग के बाद, अब आपको सुरंग के कार्यों `deposit`और `withdraw`कार्यों का इस्तेमाल करके क्रॉस-चेन transfers transfers को एक्जीक्यूट करने में सक्षम होना चाहिए.

:::note

रूट चेन `deposit()`पर प्रदर्शन करने के बाद, स्टेट सिंक के लिए यह 22-30 मिनट का समय लगेगा. एक बार स्टेट सिंक होने पर, आपको दिए गए पते पर जमा किए गए टोकन्स को प्राप्त होगा.

:::

### पॉलीगॉन → Ethereum {#ethereum}

1. रूट चेन पर नामित पाने वाले को चाइल्ड टोकन वापस भेजने के लिए संबंधित टोकन पते और चाइल्ड अनुबंध पर रकम के साथ `withdraw()` का सहारा लेने की ओर बढ़ें. **ट्रांज़ैक्शन हैश को नोट करें** क्योंकि इसका इस्तेमाल बर्न सबूत बनाने के लिए किया जाएगा.

2. आप [यहाँ](#withdraw-tokens-on-the-root-chain) की वापसी को पूरा करने के लिए स्टेप्स ढूंढ सकते हैं.

## ERC721 Transfer र {#erc721-transfer}

अगर आपको एक उदाहरण की जरूरत है, तो कृपया इस [ERC721 रूट और चाइल्ड Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc721-transfer) को गाइड बाहर निकालें

### Ethereum → पॉलीगॉन {#polygon-1}

1. रूट चेन पर अपना खुद का erc721 टोकन डिप्लॉय करें. आपको इस पते की ज़रूरत बाद में पड़ेगी.
2. रुट टनल के पते और टोकन आईडी को आर्गुमेंट के रूप में रखते हुए रूट टोकन के `approve()` फ़ंक्शन का सहारा लेकर टोकन को ट्रांसफ़र के लिए मंज़ूर करें.
3. चाइल्ड चेन पर उसके बराबर चाइल्ड टोकन पाने के लिए  पाने वाले के पते और रुट चेन पर टोकन आईडी के साथ `deposit()` का सहारा लेने की ओर बढ़ें. यह टोकन को ऑटोमैटिक रूप से मैप भी करेगा. वैकल्पिक रूप से, आप डिपॉज़िट करने से पहले `mapToken()` का सहारा ले सकते हैं.

:::note

रूट चेन `deposit()`पर प्रदर्शन करने के बाद, स्टेट सिंक के लिए यह 22-30 मिनट का समय लगेगा. एक बार स्टेट सिंक होने पर, आपको दिए गए पते पर जमा किए गए टोकन्स को प्राप्त होगा.

:::

### पॉलीगॉन → Ethereum {#ethereum-1}

1. रूट चेन पर नामित पाने वाले को चाइल्ड टोकन वापस भेजने के लिए संबंधित टोकन पते और चाइल्ड अनुबंध पर टोकन आईडी के साथ `withdraw()`का सहारा लेने की ओर बढ़ें. **नोट करें कि   हैश** का इस्तेमाल बर्न प्रूफ उत्पन्न करने के लिए किया जाएगा.

2. आप [यहाँ](#withdraw-tokens-on-the-root-chain) की वापसी को पूरा करने के लिए स्टेप्स ढूंढ सकते हैं.

## erc1155 ट्रांसफ़र {#erc1155-transfer}

अगर आपको एक उदाहरण की जरूरत है, तो कृपया इस [ERC155 रूट और चाइल्ड Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc1155-transfer) को गाइड को बाहर निकालें

#### `FxERC1155RootTunnel`

- `mapToken(rootToken)`: चाइल्ड चेन को आपके रुट erc1155 टोकन को मैप करने में इस्तेमाल किया जाता है
- `deposit(rootToken, user, id, amount, data)`: फ़ंक्शन का इस्तेमाल रूट टोकन को चाइल्ड चेन पर डिपाज़िट करने के लिए किया जाता है
- `depositBatch(rootToken, user,  ids, amounts, bytes memory data)`: का इस्तेमाल कई टोकन आईडी और संबंधित रक़मों के लिए किया जाता है
- `receiveMessage(inputData)`: पेलोड को `inputData` रखते हुए सबूत बर्न करने के बाद इसका सहारा लिया जाना है

#### `FxERC1155ChildTunnel`

- `withdraw(childToken, id, amount, data)`: एथेरेयम से पॉलीगॉन में टोकन निकालने के लिए इस्तेमाल किया जाता है
- `withdrawBatch(childToken, ids, amounts, data)`: निकालने के जैसा ही है लेकिन कई टोकन आईडी को निकालने के लिए

### Ethereum → पॉलीगॉन {#polygon-2}

1. रूट चेन पर अपना ERC1155 टोकन डिप्लॉय करें. आपको इस पते की ज़रूरत बाद में पड़ेगी.
2. पता के `FxERC1155RootTunnel`साथ तैनात टोकन `setApprovalForAll(operator, approved)`को कॉल करें ताकि पॉलीगॉन पर अपने टोकन्स को `FxERC1155RootTunnel`transfer र कर `operator``FxERC1155ChildTunnel`सकें.
3. अपने तैनात टोकन के पते के `FxERC1155RootTunnel`साथ कॉल `mapToken()`करें जैसा कि .`rootToken` यह पॉलीगॉन पर ERC155 टोकन को तैनात करने और मैप करने के `FxERC1155ChildTunnel`लिए एक संदेश भेजेगा. अपने बच्चे को टोकन पता से पूछताछ करने के लिए, फोन `rootToChildToken`पर कॉल करें.`FxERC1155ChildTunnel`
4. Ethereum पर टोकन के पते के `FxERC1155RootTunnel`साथ `deposit()`कॉल करें जैसे , `rootToken`रिसीवर , `user`टोकन आईडी `id`और जितनी रकम .`amount` वैकल्पिक रूप से, कई टोकन आईडी के लिए आप `depositBatch()` का भी सहारा ले सकते हैं.

:::note

रूट चेन `deposit()`पर प्रदर्शन करने के बाद, स्टेट सिंक के लिए यह 22-30 मिनट का समय लगेगा. एक बार स्टेट सिंक होने पर, आपको दिए गए पते पर जमा किए गए टोकन्स को प्राप्त होगा.

:::

### पॉलीगॉन → Ethereum {#ethereum-2}

1. पॉलीगॉन पर तैनात बच्चे टोकन के पते के `FxERC1155ChildTunnel`साथ कॉल `withdraw()`करें `childToken`क्योंकि टोकन आईडी `id`(चाइल्ड टोकन का पता मैपिंग से पूछताछ की जा सकती `rootToChildToken`है). वैकल्पिक रूप से, कई टोकन आईडी और संबंधित रकम के लिए आप `withdrawBatch()` का भी सहारा ले सकते हैं. **नोट करें कि   हैश** का इस्तेमाल बर्न प्रूफ उत्पन्न करने के लिए किया जाएगा.

2. आप [यहाँ](#withdraw-tokens-on-the-root-chain) की वापसी को पूरा करने के लिए स्टेप्स ढूंढ सकते हैं.

## रूट चेन पर टोकन वापस लें {#withdraw-tokens-on-the-root-chain}

:::info

चाइल्ड चेन `withdraw()`पर प्रदर्शन करने के बाद, यह चेकपॉइंट के लिए 30-90 मिनट का समय लगेगा. एक बार अगले चेकपॉइंट में बर्न the शामिल हो जाने पर, आप रूट चेन पर टोकन वापस ले सकते हैं.

:::

1. **tx हैश** और मैसेज **MESSAGE_SENT_EVENT_SIG**. का इस्तेमाल करके बर्न प्रूफ जनरेट करें सबूत उत्पन्न करने के लिए, आप या तो पॉलीगॉन द्वारा होस्ट किए गए प्रूफ पीढ़ी एपीआई का इस्तेमाल कर सकते हैं या आप [यहां](https://github.com/maticnetwork/proof-generation-api) के निर्देश का पालन करके अपने स्वयं के प्रूफ पीढ़ी API को भी स्पिन कर सकते हैं.

पॉलीगॉन द्वारा होस्ट की जाने वाली proof र का एंडपॉइंट [यहाँ](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature}) उपलब्ध है.

  - `burnTxHash`पॉलीगॉन पर शुरू किए गए `withdraw()`transaction transaction हैश है.
  - `eventSignature`समारोह द्वारा उत्सर्जित घटना का इवेंट सिग्नेचर `withdraw()`है. MESSAGE_SENT_EVENT_SIG के लिए इवेंट सिग्नेचर `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`है.

मैननेट और टेस्टनेट के लिए प्रूफ पीढ़ी API का इस्तेमाल उदाहरण इस प्रकार है: -

→ [पॉलीगॉन मेननेट Polygon जेनरेशन](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [मुंबई टेस्टनेट प्रूफ पीढ़ी](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

2. generated payload को गोएर्ली या Ethereum. पर संबंधित रूट टनल कॉन्ट्रैक्ट में होने वाले तर्क के रूप `receiveMessage()`में खिलाएँ.

## मिंट करने योग्य erc-20 ट्रांसफ़र {#mintable-erc-20-transfer}

अगर आपको एक उदाहरण की जरूरत है, तो कृपया इस [Mintable ERC20 रूट और चाइल्ड Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc20-transfer) को गाइड को बाहर निकालें

:::info

मिंटटेबल टोकन FxTunnels, के मामले में, बच्चे का टोकन पहले तैनात हो जाता है और पहले निकाली/निकास प्रक्रिया पूरा होने पर ही रूट टोकन को तैनात किया जाता है. चाइल्ड कॉन्ट्रैक्ट के तैनाती के बाद रूट टोकन कॉन्ट्रैक्ट का पता पहले से निर्धारित किया जा सकता है, लेकिन मैपिंग तकनीकी रूप से तभी मौजूद होगी जब पहले withdrawal/exit पूरा हो जाए.

:::

#### `FxMintableERC20RootTunnel`

- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: एथेरेयम से पॉलीगॉन में टोकन डिपाज़िट करने के लिए
- `receiveMessage(bytes memory inputData)`: रुट चेन पर टोकन पाने के लिए बर्न सबूत को `inputData` के रूप में डाला जाना चाहिए

#### `FxMintableERC20ChildTunnel`

- `deployChildToken(uint256 uniqueId, string memory name, string memory symbol, uint8 decimals)`: पॉलीगॉन नेटवर्क पर ERC20 टोकन को तैनात करने के
- `mintToken(address childToken, uint256 amount)`: पॉलीगॉन पर टोकन की एक निश्चित मात्रा मिंट करें
- `withdraw(address childToken, uint256 amount)`: रूट चेन पर निकालने के लिए चाइल्ड चेन पर टोकन बर्न करने के लिए

### पॉलीगॉन पर टोकन को मिंट करना {#minting-tokens-on-polygon}

1. `FxMintableERC20ChildTunnel` पर `deployChildToken()`का सहारा लें और टोकन जानकारी को पैरामीटर्स के रूप में भेजें. यह एक `TokenMapped` इवेंट बाहर देता है जिसमें `rootToken` और `childToken` पते होते हैं. इन पतों को नोट करें.
2. चाइल्ड चेन पर टोकन मिंट करने के लिए `FxMintableERC20ChildTunnel` पर `mintToken()` का सहारा लें.
3. पॉलीगॉन से टोकन निकालने के लिए `FxMintableERC20ChildTunnel` पर `withdraw()` का सहारा लें. Note the हैश को नोट करें क्योंकि यह बर्न प्रूफ उत्पन्न करने के लिए handy में आ जाएगा.
4. आप [यहाँ](#withdraw-tokens-on-the-root-chain) की वापसी को पूरा करने के लिए स्टेप्स ढूंढ सकते हैं.

### Ethereum पर टोकन वापस लेना {#withdrawing-tokens-on-ethereum}

बनाए गए बर्न सबूत को `FxMintableERC20RootTunnel` में `receiveMessage()` को आर्गुमेंट के रूप में फ़ीड करें. इसके बाद, टोकन बैलेंस रुट चेन पर दिखाई देगा.

### पॉलीगॉन में टोकन को जमा करें {#deposit-tokens-back-to-polygon}

1. अपने टोकन ट्रांसफ़र करने के लिए आप `FxMintableERC20RootTunnel` को मंजूरी देना सुनिश्चित करें.
2. रूट टोकन के पता के रूप में `rootToken` और `user` के रूप में पाने वाले के रूप में रखकर `FxMintableERC20RootTunnel` में `deposit()`का सहारा लें.
3. स्टेट सिंक इवेंट (22-30 मि.मी. में) का इंतजार करें. इसके बाद, आप चाइल्ड चेन पर लक्षित पाने वाले के बैलेंस की क्वेरी कर सकते हैं.

**ERC721** और **ERC1155** Mintable FxTunnel के उदाहरण इस प्रकार हैं:

- [FxMintableERC721Tunnels ERC721Tunnel](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc721-transfer)
- [FxMintableERC1155Tunnels ERC155Tunnel](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc1155-transfer)

## उदाहरण डिप्लॉयमेंट {#example-deployments}

### गोएर्ली {#goerli}

- चेकपॉइंट मैनेजर [: 0x2890bA17E978480615e30ecb6533b80928e](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e)
- डम्मी ERC20 टोकन: [0xe9c783f81c815d64c71c223462cb175e765b3](https://goerli.etherscan.io/address/0xe9c7873f81c815d64c71c2233462cb175e4765b3)
- FxERC20रूटटनल : [0x3658ccFDE5e9629b0805EB06ACF CFc42416850961](https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxMintableERC20RootTunnel: [ERC20RooTnel,](https://goerli.etherscan.io/address/0xA200766a7D64E54611E2D232AA6c1f870aCb63c1) 0xA20076a7D64E54611E22A6c1f870aC63c1
- डमी ERC721 टोकन: [0x73594a053cb5dDD558268d28a74375C4E23DA](https://goerli.etherscan.io/address/0x73594a053cb5ddDE5558268d28a774375C4E23dA)
- FxERC721रूटटनल : [0xF9bc4a80464E4836930319645e876c8C7D972डी](https://goerli.etherscan.io/address/0xF9bc4a80464E48369303196645e876c8C7D972de)
- डमी ERC155 टोकन [0x1906d395752F0c930f8d061DFeb785e6F0B4E](https://goerli.etherscan.io/address/0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E)
- FxERC155Rooटनल : [0x48D785970c6eD289315036B6d18788cF9DF48](https://goerli.etherscan.io/address/0x48DE785970ca6eD289315036B6d187888cF9Df48)

### मुंबई {#mumbai}

- FxERC20 : [0xDDE69724AeFBd084413719FE745a6e3b05C7](https://mumbai.polygonscan.com/address/0xDDE69724AeFBdb084413719fE745aB66e3b055C7)
- FxERC20चाइल्डटनल : [0x9C37aebd7D337E0215BC40152d689DaF9c767](https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767)
- FxMintableERC20ChildTunnel: [ERC20CHildसुरंग, 0xA2C7eBEF68B44056b4A39C2C2C2384275C56e9](https://mumbai.polygonscan.com/address/0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9)
- चाइल्ड टोकन डमी erc20: 0x346d21bc2bD3dEE2d1168E1A632b10D1d7B9c0A
- FxERC721: [0xf2720927E0487267C0221ffFA41A88528048726](https://mumbai.polygonscan.com/address/0xf2720927E048726267C0221ffA41A88528048726)
- [FxerC721चाइल्डसुरंग: 0x3658ccFDE5e9629b0805EB06ACF CFc42416850961](https://mumbai.polygonscan.com/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxERC155: [0x80be8CF927047A40d3f5791BF7436D8c95b3A5C](https://mumbai.polygonscan.com/address/0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C)
- FxERC155चाइल्डसुरंग: [0x3A00D3905601501652फी925e96d8B294243ईEf](https://mumbai.polygonscan.com/address/0x3A0f90D3905601501652fe925e96d8B294243Efc)

इस प्रकार की मैनेट की तैनाती [यहाँ](https://static.matic.network/network/mainnet/v1/index.json) देखी जा सकती है. सभी डिफॉल्ट सुरंग कॉन्ट्रैक्ट और अन्य महत्वपूर्ण FxPortal कॉन्ट्रैक्ट डिप्लॉयमेंट खोजने `FxPortalContracts`के लिए कीवर्ड को देखें. आप कॉन्ट्रैक्ट पते और ABI तक पहुंचने के लिए [`maticnetwork/meta`](https://www.npmjs.com/package/@maticnetwork/meta)पैकेज का इस्तेमाल कर सकते हैं.

## कॉन्ट्रैक्ट अड्रेस {#contract-addresses}

### मुंबई टेस्टनेट {#mumbai-testnet}

| अनुबंध | डिप्लॉयमेंट पता  |
| :----- | :- |
| [FxRoot (Goerli)](https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA#code) | `0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA` |
| [FxChild (Mumbai)](https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11/contracts) | `0xCf73231F28B7331BBe3124B907840A94851f9f11`|

### पॉलीगॉन मैनेट {#polygon-mainnet}


| अनुबंध | डिप्लॉयमेंट पता  |
| :----- | :- |
| [FxRoot (एथेरेयम मेंनेट )](https://etherscan.io/address/0xfe5e5d361b2ad62c541bab87c45a0b9b018389a2#code) | `0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2` |
| [FxChild (पॉलीगॉन मेननेट)](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a/contracts) | `0x8397259c983751DAf40400790063935a11afa28a`|
