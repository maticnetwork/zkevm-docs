---
id: erc20
title: erc20 डिपाज़िट करने और निकालने की गाइड
sidebar_label: ERC20
description: "पॉलीगॉन नेटवर्क पर erc20 टोकन डिपाज़िट करें और निकालें."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

[erc20 पर लेटेस्ट matic.js डॉक्यूमेंटेशन](https://maticnetwork.github.io/matic.js/docs/pos/erc20/) देखें.

यह ट्यूटोरियल पॉलीगॉन टेस्टनेट ( Mumbai ) का इस्तेमाल करता है जो कि असेट ट्रांसफ़र को दो ब्लॉकचेन के बीच आते-जाते दिखाने के लिए Goerli नेटवर्क से मैप किया हुआ है. इस ट्यूटोरियल का पालन करते हुए **ध्यान देने वाली एक ज़रूरी बात** ये है कि यदि उपलब्ध हो तो आपको हमेशा प्रॉक्सी पते का इस्तेमाल करना चाहिए. उदाहरण के लिए, **RootChainManagerProxy** पते के बजाय बातचीत के लिए **रूटचेन मैनेजर** पते का इस्तेमाल करना पड़ता है. **PoS कॉन्ट्रैक्ट पते, ABI, टेस्ट टोकन पते** और PoS ब्रिज कॉन्ट्रैक्ट के अन्य डिप्लॉयमेंट विवरण [यहाँ](/docs/develop/ethereum-polygon/pos/deployment) मिल सकते हैं.

आपकी ऐप्लिकेशन पर PoS ब्रिज को इंटीग्रेट करने के लिए **आपके असेट की मैपिंग** करना ज़रूरी है. आप मैपिंग का अनुरोध [यहाँ](/docs/develop/ethereum-polygon/submit-mapping-request) सबमिट कर सकते हैं. लेकिन इस ट्यूटोरियल के उद्देश्य से, हम पहले ही **टेस्ट टोकन** को तैनात कर चुके हैं और उन्हें PoS ब्रिज पर मैप कर चुके हैं. ट्यूटोरियल को खुद आज़माने के लिए आपको इसकी ज़रूरत हो सकती है. आप [फ़ॉसेट](https://faucet.polygon.technology/) से उस असेट का अनुरोध कर सकते हैं जो आपको पसंद है. अगर टेस्ट टोकन को faucet, पर उपलब्ध नहीं है, तो [discord](https://discord.com/invite/0xPolygonn). पर हमारे पास पहुंच जाएँ.

आगे आने वाले ट्यूटोरियल में, कोड के कई स्निपेट्स के साथ हर स्टेप को विस्तार से समझाया जाएगा. हालाँकि, आप कभी भी [रिपाज़िटोरी](https://github.com/maticnetwork/matic.js/tree/master/examples/pos) से मदद ले सकते हैं जहाँ सभी **उदाहरण सोर्स कोड** होंगे, जो आपको पॉस ब्रिज को इंटीग्रेट करने और उसके काम करने के तरीके को समझने में सहायता कर सकते हैं.

## उच्च स्तरीय फ़्लो {#high-level-flow}

erc20 डिपाज़िट करें -

1. जो टोकन आपने डिपाज़िट किए हैं उन्हें खर्च करने के लिए **_erc20भविष्यवाणी_** अनुबंध को **_मंज़ूर_** करें.
2. **_रूट चेन मैनेजर_** पर **_इनके लिए डिपाज़िट करें_** का सहारा लें.

erc20 निकालें -

1. पॉलीगॉन चेन पर टोकन्स लिखें
2. बर्न ट्रांसक्शन का सबूत जमा करने के `RootChainManager`लिए `exit()`फंक्शन को कॉल करें. बर्न ट्रांसक्शन वाले ब्लॉक के लिए चेकपॉइंट जमा होने के बाद यह कॉल हो सकती है.

## स्टेप विवरण {#steps-details}

### मंज़ूर करें {#approve}

यह एक आम erc20 अनुमोदन है ताकि **_erc20भविष्यवाणी_** **_इससे ट्रांसफ़र करें_** फ़ंक्शन का सहारा ले सके. पॉलीगॉन पॉस क्लाइंट इसका सहारा लेने के लिए **_मंज़ूर करें_** का तरीका पेश करता है.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>,true);
  const approveResult = await erc20Token.approve(100);
  const txHash = await approveResult.getTransactionHash();
  const txReceipt = await approveResult.getReceipt();
}
```

### डिपाज़िट करें {#deposit}

ध्यान दें कि टोकन को पहले से ही transfer र के लिए मैप किया जाना चाहिए और मंजूरी दी जानी चाहिए. पॉलीगॉन PoS क्लाइंट इस कॉल को बनाने के लिए `deposit()`तरीके को उजागर करता है.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);

  //deposit 100 to user address
  const result = await erc20Token.deposit(100, <user address>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();

}
```

:::note
Ethereum से पॉलीगॉन में जमा हो जाता है जो **स्टेट सिंक** मैकेनिज्म का इस्तेमाल करके होता है और लगभग 22-30 मिनट लेता है. इस बार के अंतराल का इंतजार करने के बाद, यह सिफारिश की जाती है कि वेब3.js/mattic.js लाइब्रेरी का इस्तेमाल करके संतुलन की जांच करें या Metamask. का इस्तेमाल करें. एक्सप्लोरर तभी बैलेंस दिखाएगा जब चाइल्ड चेन पर कम से कम एक असेट ट्रांसफ़र हुआ हो. यह [<ins>लिंक</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos) डिपोजिट इवेंट को ट्रैक करने के लिए बताता है.
:::

### बर्न करने के लिए निकालना शुरू करें तरीका {#withdrawstart-method-to-burn}

इस `withdrawStart()`तरीके का इस्तेमाल निकासी की प्रक्रिया को शुरू करने के लिए किया जा सकता है जो पॉलीगॉन चेन पर निर्दिष्ट राशि को जला देगा.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = posClient.erc20(<child token address>);

  // start withdraw process for 100 amount
  const result = await erc20Token.withdrawStart(100);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```

इस कॉल के लिए ट्रांज़ैक्शन हैश स्टोर करें और बर्न का सबूत जनरेट करते समय इसका इस्तेमाल करें.

### बाहर निकलें {#exit}

एक बार जब की चेकपॉइंट को बर्न ट्रांसक्शन वाले ब्लॉक के लिए पेश किया गया है, तो यूजर को `RootChainManager`कॉन्ट्रैक्ट के `exit()`फंक्शन को कॉल करना चाहिए और बर्न का सबूत पेश करना चाहिए. valid valid सबूत जमा करने पर, टोकन को उपयोगकर्ता में transferred र किया जाता है. पॉलीगॉन PoS क्लाइंट इस कॉल को बनाने के लिए `withdrawExit`तरीके को उजागर करता है. इस फ़ंक्शन का सहारा तभी लिया जा सकता है जब मुख्य चेन में चेकपॉइंट शामिल किया गया हो. इस [गाइड](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events) के बाद चेकपॉइंट को ट्रैक किया जा सकता है.

*निकालने से बाहर निकलें* तरीके का इस्तेमाल *withdrawStart* तरीके से txHash का इस्तेमाल करते हुए निकालने की प्रक्रिया से बाहर निकलने के लिए किया जा सकता है.

:::note
निकासी को बाहर निकालने के लिए शुरू करने के लिए रिजॉर्ट transaction The को चेकपॉइंट करना चाहिए.
:::

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);
  const result = await erc20Token.withdrawExit(<burn tx hash>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```
