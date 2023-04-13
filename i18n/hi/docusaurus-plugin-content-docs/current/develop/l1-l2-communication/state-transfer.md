---
id: state-transfer
title: स्टेट ट्रांसफ़र
description: Ethereum से स्टेट या डेटा आसानी से पॉलीगॉन में Transfer र करें.
keywords:
  - docs
  - polygon
  - polygon wiki
  - state transfer
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

पॉलीगॉन वैलिडेटर नामक Ethereum चेन पर कॉन्ट्रैक्ट की लगातार निगरानी करता है `StateSender`. हर बार एथेरेयम चेन पर जब एक पंजीकृत अनुबंध इस अनुबंध को कॉल करता है तो यह एक इवेंट उत्सर्जित करता है. इस इवेंट का इस्तेमाल करके पॉलीगॉन वैलिडेटर डेटा को एक अन्य पॉलीगॉन चेन पर रिले करते हैं. इस **स्टेट सिंक** मैकेनिज्म का इस्तेमाल Ethereum से पॉलीगॉन में डेटा भेजने के लिए किया जाता है.

इसके अतिरिक्त, पॉलीगॉन वैलिडेटर हर transaction transaction के एक Ethereum हैश को नियमित आधार पर पॉलीगॉन चेन पर भेजते हैं. आप पॉलीगॉन पर होने वाले किसी भी transaction transaction को वैलिडेट करने के लिए इस **चेकपॉइंट** का इस्तेमाल कर सकते हैं. एक बार पॉलीगॉन चेन पर होने के लिए transaction a को सत्यापित किया जा सकता है, तब Ethereum का इस्तेमाल उचित कार्रवाई को अंजाम देने के लिए किया जा सकता है.

इन 2 तंत्रों का इस्तेमाल Ethereum और पॉलीगॉन के बीच दो तरीके के डेटा (स्टेट ) transfer transfer को सक्षम करने के लिए एक साथ किया जा सकता है. इन सभी संपर्कों को अमूर्त करने के लिए, आप सीधे हमारे (on `FxBaseRootTunnel`पर) और (पॉलीगॉन `FxBaseChildTunnel`पर) कॉन्ट्रैक्ट को प्राप्त कर सकते हैं.

## रुट टनल अनुबंध {#root-tunnel-contract}

`FxBaseRootTunnel`अनुबंध का इस्तेमाल [यहाँ](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) से करें. यह कॉन्ट्रैक्ट निम्नलिखित कार्यों में एक्सेस देता है:

- `function _processMessageFromChild(bytes memory data)`: यह एक वर्चुअल फंक्शन है जिसे कॉन्ट्रैक्ट में लागू किया जाना है जो इसे से भेजे जा रहे डेटा को संभालने के लिए स्वाभाविक रूप से शामिल करता `ChildTunnel`है.
- `_sendMessageToChild(bytes memory message)`यह फ़ंक्शन आंतरिक रूप से संदेश के रूप में किसी भी बाइट डेटा के साथ कॉल किया जा सकता है. यह डेटा बिना किसी बदलाव के चाइल्ड टनल को भेज दिया जाएगा.
- `receiveMessage(bytes memory inputData)`: इस फंक्शन को द्वारा उत्सर्जित संदेश प्राप्त करने के लिए बुलाया जाना होता है `ChildTunnel`. ट्रांज़ैक्शन के सबूत को कॉल डेटा के रूप में प्रदान किए जाने की ज़रूरत होती है. **मैटिक.js** का इस्तेमाल करके प्रूफ उत्पन्न करने के लिए एक उदाहरण स्क्रिप्ट नीचे शामिल है.

## चाइल्ड टनल अनुबंध {#child-tunnel-contract}

`FxBaseChildTunnel`अनुबंध का इस्तेमाल [यहाँ](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseChildTunnel.sol) से करें. यह अनुबंध निम्नलिखित फंक्शनों तक पहुंच प्रदान करता है:

- `function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`: यह एक वर्चुअल फंक्शन है जो की  से भेजे गए संदेशों को संभालने के लिए लॉजिक को लागू करने की जरूरत होती `RootTunnel`है.
- `function _sendMessageToRoot(bytes memory message)`रूट टनल को कोई बाइट मैसेज भेजने के लिए, यह फ़ंक्शन आंतरिक रूप से कॉल किया जा सकता है.

## आवश्यक शर्तें {#prerequisites}

- आपको Ethereum. पर अपने रूट कॉन्ट्रैक्ट में कॉन्ट्रैक्ट को विरासत में `FxBaseRootTunnel`लेने की जरूरत है. उदाहरण के रूप में, आप इस [अनुबंध](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateRootTunnel.sol) का पालन कर सकते हैं . इसी तरह, पॉलीगॉन पर अपने बच्चे में `FxBaseChildTunnel`कॉन्ट्रैक्ट को inherit करें. इस [अनुबंध](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateChildTunnel.sol) का एक उदाहरण के रूप में पालन करें.
- पर अपने रूट कॉन्ट्रैक्ट को डिप्लॉय करते समय
  - **गोएर्ली टेस्टनेट**, 0**x2890bA17E9780615e30ecB6533b80928 के** रूप में और **0x3d13E34f7f6B6245E640E10eF15bA** के रूप `_fxRoot`में पास `_checkpointManager`करें.

  - **Ethereum Mainnet**`_checkpointManager`, 0**x86e4dc95c7fbdb52e3d563bdb00823894c287** है और **0xfe5e5e361b262c541b87C450B9B018389a2** `_fxRoot`है.
- **मुंबई testnet**, नेट पर बाल कॉन्ट्रैक्ट को तैनात करने के लिए, कंस्ट्रक्टर के रूप `_fxChild`में **0xCF73231F28B7331BB3124B907840A94851f9f11** पास करें **पॉलीगॉन मेननेट** के `_fxChild`लिए, 0**x8397259c983751DF4000790063935a28 होगा.**
- चाइल्ड सुरंग के पते के साथ रूट सुरंग को तैनात करने `setFxChildTunnel`पर कॉल करें. उदाहरण: [0x79cd30एसि561a226258918b56c098a08c0c707a80bbb91197f127a48b5c2](https://goerli.etherscan.io/tx/0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2)
- रूट सुरंग के पता के साथ चाइल्ड सुरंग `setFxRootTunnel`को कॉल करना. उदाहरण: [0xfd0cd35a8c3f6d8c1c04cd79a27b7e5e0ccc2fc2fc4b864d2b458b7e98b8](https://mumbai.polygonscan.com/tx/0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8/internal-transactions)

## स्टेट ट्रांसफ़र ब्रिज के अनुबंध के उदाहरण {#example-contracts-of-state-transfer-bridge}

- **कॉन्ट्रैक्ट**: [FxPortal Github रिपोसिटरी](https://github.com/jdkanani/fx-portal/tree/main/contracts/tunnel)
- **गोएर्ली :** [0xc4432e7dab6c1b43f4dc38ad2a594c48aec9af](https://goerli.etherscan.io/address/0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af)
- **मुंबई:** [0xa0060C969d760c3FA8584676fb654Bbba693C22](https://mumbai.polygonscan.com/address/0xa0060Cc969d760c3FA85844676fB654Bba693C22/transactions)

## Ethereum → पॉलीगॉन स्टेट Transfer र {#polygon}

- आपको अपने रूट कॉन्ट्रैक्ट में आंतरिक रूप `_sendMessageToChild()`से कॉल करना है और पॉलीगॉन में भेजे जाने वाले तर्क के रूप में डेटा को पास करना होगा. उदाहरण: [0x28705fca757a0c8694bd167cb94a2696a0bc9a645eb420cc960537644c1](https://goerli.etherscan.io/tx/0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1)
- डेटा को एथेरेयम से वापस पाने के लिए, अपने चाइल्ड अनुबंध में `_processMessageFromRoot()`वर्चुअल फ़ंक्शन को `FxBaseChildTunnel` में लागू करें. स्टेट के सिंक होने पर डेटा स्टेट रिसीवर से स्वतः प्राप्त हो जाएगा.

## पॉलीगॉन → Ethereum {#ethereum}

1. एथेरेयम को भेजे जाने के लिए पैरामीटर के रूप में डेटा के साथ अपने चाइल्ड अनुबंध में `_sendMessageToRoot()`को आंतरिक रूप से कॉल करें. उदाहरण: [0x3cc9f7e65b46f6af87e99947bf24c38cbf0b933d8c981644a2f2b50e66](https://mumbai.polygonscan.com/tx/0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a/logs)

Note the हैश को नोट करें क्योंकि इसे चेकपॉइंट के रूप में शामिल करने के बाद इसका इस्तेमाल प्रूफ उत्पन्न करने के लिए किया जाएगा.

2. **रूट चेन पर निकलने को पूरा करने का Proof **: **tx हैश** और मैसेज **MESSAGE_SENT_EVENT_SIG**. का इस्तेमाल करके सबूत जनरेट करें सबूत उत्पन्न करने के लिए, आप या तो पॉलीगॉन द्वारा होस्ट किए गए प्रूफ पीढ़ी एपीआई का इस्तेमाल कर सकते हैं या आप [यहां](https://github.com/maticnetwork/proof-generation-api) के निर्देश का पालन करके अपने स्वयं के प्रूफ पीढ़ी API को भी स्पिन कर सकते हैं.

पॉलीगॉन द्वारा होस्ट की जाने वाली proof र का एंडपॉइंट [यहाँ](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature}) उपलब्ध है.

    - `burnTxHash` is the transaction hash of the `_sendMessageToRoot()` transaction you initiated on Polygon.
    - `eventSignature` is the event signature of the event emitted by the `_sendMessageToRoot()` function. The event signature for the MESSAGE_SENT_EVENT_SIG is `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

मैननेट और टेस्टनेट के लिए प्रूफ पीढ़ी API का इस्तेमाल उदाहरण इस प्रकार है: -

→ [मुंबई टेस्टनेट प्रूफ पीढ़ी](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [पॉलीगॉन मेननेट Polygon जेनरेशन](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

3. अपने रूट अनुबंध में `_processMessageFromChild()` को लागू करें.

4. चाइल्ड टनल से आपके अनुबंध में भेजे गए डेटा को वापस पाने के लिए `receiveMessage()`में एक इनपुट के तौर पर जनरेट किए हुए सबूत का इस्तेमाल करें उदाहरण: [0x436dcd500659bea715a09d9257295dc21290769dea7f0b66166e75e3515](https://goerli.etherscan.io/tx/0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515) )
