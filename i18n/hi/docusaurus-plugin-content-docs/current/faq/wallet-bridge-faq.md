---
id: wallet-bridge-faq
title: वॉलेट <>ब्रिज FAQ
description: पॉलीगॉन पर अपनी अगली ब्लॉकचेन ऐप बनाएँ.
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - wallet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## पॉलीगॉन वेब वॉलेट का इस्तेमाल मैं कहां कर सकता हूं. {#where-can-i-use-the-polygon-web-wallet}
यहाँ पॉलीगॉन वॉलेट सूट URL है: https://wallet.polygon.technology/ .technology/पॉलीगॉन वॉलेट सूट पॉलीगॉन द्वारा प्रदान किए गए Web3 अनुप्रयोगों का एक संग्रह है. इसमें [पॉलीगॉन वॉलेट](https://wallet.polygon.technology/polygon/assets) (एक विकेंद्रीकृत वॉलेट), पॉलीगॉन [ब्रिज](https://wallet.polygon.technology/polygon/bridge/deposit) (एक L1-L2 ब्रिज), [पॉलीगॉन स्टेकिंग](https://staking.polygon.technology/) (मैटिक टोकन को स्टेकिंग और delegating ट करने का एक वातावरण शामिल है) और [पॉलीगॉन सेफ ब्रिज](https://safe-bridge.polygon.technology/safe) (एक Staking ब्रिज) शामिल हैं.

<div align= "center">
  <img src={useBaseUrl("img/faq/wallet/wallet-hp.png")} />
</div>

## वर्तमान में कौन से वॉलेट इस्तेमाल किए जा सकते हैं? {#which-wallets-are-currently-supported}

मेटामास्क, Metamask, Bitski वॉलेट, Venly और WalletConnect वर्तमान में समर्थित वॉलेट हैं.

<div align="center">
  <img src={useBaseUrl("img/faq/wallet/supported-wallets.png")} width="400" />
</div>

## मैं अपने पॉलीगॉन वॉलेट के साथ क्या कर सकता हूँ? {#what-can-i-do-with-my-polygon-wallet}

- पॉलीगॉन पर किसी भी अकाउंट में फ़ंड भेजें.
- एथेरेयम से पॉलीगॉन में फ़ंड जमा करें (ब्रिज का उपयोग करके).
- एथेरेयम से पॉलीगॉन में फ़ंड वापिस निकालें (ब्रिज का उपयोग करके).

## पॉलीगॉन वॉलेट से मेरा मेटामास्क वॉलेट कनेक्ट नहीं हो रहा है {#my-metamask-wallet-is-not-connecting-with-polygon-wallet}

कई कारण हैं कि ऐसा क्यों हो सकता है. हमारा सुझाव है कि आप **एक और बार की कोशिश करें**, या इनमें **से** कोई भी मदद नहीं करता है, **[तो हमारे समर्थन टीम से संपर्क करें](https://support.polygon.technology/support/home)**.

## पॉलीगॉन वॉलेट सूट का इस्तेमाल करके मैं Ethereum से पॉलीगॉन में फंड कैसे जमा कर सकता हूं. {#how-can-i-deposit-funds-from-ethereum-to-polygon-using-polygon-wallet-suite}
कृपया नीचे दिए गए वीडियो को देखें या [इस ट्यूटोरियल](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#depositing-funds-from-ethereum-to-polygon) का पालन करें.

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/deposit/deposit-polygon-wallet.mp4"></source>
  <p>आपका ब्राउज़र वीडियो एलिमेंट को सपोर्ट नहीं करता है.</p>
</video>

## पॉलीगॉन वॉलेट सूट का इस्तेमाल करके पोस ब्रिज के माध्यम से पॉलीगॉन से Ethereum में फंड कैसे वापस ले सकता हूं. {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-pos-bridge-using-polygon-wallet-suite}
कृपया नीचे दिए गए वीडियो को देखें या [इस ट्यूटोरियल](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-pos-bridge) का पालन करें.

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/pos/withdraw-polygon-wallet.mp4"></source>
  <p>आपका ब्राउज़र वीडियो एलिमेंट को सपोर्ट नहीं करता है.</p>
</video>

## पॉलीगॉन वॉलेट सूट का इस्तेमाल करके प्लाजमा ब्रिज के माध्यम से पॉलीगॉन से Ethereum में फंड वापस कैसे कर सकता हूं. {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-plasma-bridge-using-polygon-wallet-suite}
कृपया नीचे दिए गए वीडियो को देखें या [इस ट्यूटोरियल](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-plasma-bridge) का पालन करें.

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/plasma/withdraw-plasma-v3.mov"></source>
  <p>आपका ब्राउज़र वीडियो एलिमेंट को सपोर्ट नहीं करता है.</p>
</video>

## पॉलीगॉन वॉलेट टोकन की सूची में एक नया या कस्टम टोकन कैसे जोड़ सकते हैं? {#how-to-add-a-new-or-custom-token-to-polygon-wallet-token-list}
कृपया [इस ट्यूटोरियल](/docs/faq/adding-a-custom-token) का पालन करें.

## मुझे टोकन अनुबंध कैसे मिलेगा? {#how-do-i-find-the-token-contract}

टोकन कॉन्ट्रैक्ट पता की जरूरत तब होगी जब आप एक नए या कस्टम टोकन जोड़ने की कोशिश कर रहे हों. आप Coingecko या Coingecko कैप पर उसके नाम से टोकन की खोज कर सकते हैं जहां आप Ethereum चेन (ERC20 टोकन के लिए) और पॉलीगॉन जैसे अन्य समर्थित ब्लॉकचेन पर इसका पता देख सकेंगे. अन्य चेन पर टोकन का पता शायद अपडेट नहीं किया किया गया हो लेकिन आप सभी उद्देश्यों के लिए रुट पते का उपयोग ज़रूर कर सकते हैं.

## मैंने अपने फंड को जमा किया है, लेकिन मुझे Metamask. में नहीं दिख रहा है. मैं क्या करूँ? {#i-have-deposited-my-funds-but-i-don-t-see-it-on-metamask-what-do-i-do}

आपको Metamask. में कस्टम टोकन पता को मैन्युअल रूप से जोड़ने की जरूरत है.

मेटामास्क खोलें और **इम्पोर्ट टोकन** पर क्लिक करने के लिए नीचे स्क्रोल करें.

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/wallet-faq-3.png")} width="400" />
</div>

फिर, संबंधित कॉन्ट्रैक्ट पता, प्रतीक और दशमलव परिशुद्धता जोड़ें अनुबंध पता (इस मामले में पॉस-वेथ) इस लिंक पर पाया जा सकता है: [https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/](https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/). आपको पॉलीगॉन मेंनेट पर बैलेंस देखने के लिए चाइल्ड टोकेन पता जोड़ना होगा. परिशुद्धता का दशमलव 18 प्रतिशत WETH के लिए है (सबसे टोकन के लिए, परिशुद्धता का दशमलव 18 है)

## मेटामास्क पर पॉलीगॉन मैननेट कैसे जोड़ सकता हूं. {#how-can-i-add-polygon-mainnet-on-metamask}

[इस ट्यूटोरियल](/docs/develop/metamask/config-polygon-on-metamask) को जाँचें.

## मेरा टोकन सूची में दिखाई नहीं दे रहा है. मैं किससे संपर्क करूँ? {#my-token-is-not-visible-in-the-list-who-should-i-contact}

Discord या Telegram पर पॉलीगॉन टीम से संपर्क करें और अपना टोकन लिस्ट करवाएँ. इससे पहले, सुनिश्चित करें कि आपका टोकन मैप हो रखा है. अगर यह mapped नहीं है, तो कृपया [https://mapper.polygon.technology/](https://mapper.polygon.technology/). पर एक अनुरोध उठाएँ.

## चेकपॉइंट आने के बाद क्या मैं अपना transaction transaction रद्द कर सकता हूं. {#can-i-cancel-my-transaction-after-the-checkpoint-arrived}
पॉलीगॉन मैननेट पर एक बार निकासी transaction the शुरू हो जाने के बाद, दुर्भाग्य से इसे रद्द या पलट नहीं किया जा सकता है. निकासी के लेनदेन में, पॉलीगॉन मैननेट से टोकन जला दिए जाते हैं और Ethereum मेननेट पर मिंट कर दी जाती है. इसलिए, पॉलीगॉन चेन से एक बार के लिए टोकन को वापस अपने वॉलेट में नहीं बदला जा सकता

## गैस की फीस बहुत अधिक है, क्या मैं अपने The को रद्द कर सकता हूं? {#the-gas-fee-is-too-high-can-i-cancel-my-transaction}

दुर्भाग्य से, पॉलीगॉन मैननेट से टोकन्स जला दिए जाने के बाद, हम निकासी transaction the को रद्द नहीं कर सकते दूसरे शब्दों में, यह शुरू होने के एक बार transaction a रद्द करना असंभव है. गैस की फीस पॉलीगॉन द्वारा नियंत्रित नहीं होती है. यह पूरी तरह से नेटवर्क की भीड़-भाड़ और Ethereum मैननेट पर एक विशेष ब्लॉक में the की संख्या पर निर्भर है. अगर आपको लगता है कि आप मौजूदा गैस फीस को वहन नहीं कर सकते हैं, तो आप अगले दिन जब गैस की फीस कम हो तो आप अपने transaction transaction के साथ आगे बढ़ने की कोशिश कर सकते हैं. आप यहां से Ethereum Mainnet पर गैस की फीस की निगरानी भी कर सकते हैं: https://etherscan.io/gastracker


## क्या मैं पॉलीगॉन से अपने टोकन किसी अन्य वॉलेट/एक्सचेंज को भेज सकता हूँ? {#can-i-send-my-tokens-from-polygon-to-any-other-wallet-exchange}

आप पॉलीगॉन UI से टोकन्स को सीधे एक्सचेंज/वॉलेट में नहीं भेज सकते आपको पहले पॉलीगॉन से एथेरेयम में निकालना होगा और फिर उन्हें एक्सचेंज पते पर भेजें (जब तक आपका एक्सचेंज /वॉलेट स्पष्ट रूप से नेटवर्क का समर्थन नहीं करता है).

## मैंने एक एक्सचेंज/वॉलेट में सीधे फंड भेजने की गलती की. क्या आप सहायता कर सकते हैं? {#i-made-the-mistake-of-sending-funds-to-an-exchange-wallet-directly-can-you-help}

दुर्भाग्य से, हम ऐसे मामलों में सहायता नहीं कर सकते हैं. कृपया उन एक्सचेंज को सीधे फ़ंड न भेजें जो केवल एथेरेयम का समर्थन करती हैं, आपको पहले पॉलीगॉन से एथेरेयम में निकालना होगा और फिर उसे अपने एक्सचेंज पते पर भेजना होगा.

## मैंने किसी गलत पते पर ट्रांसफ़र कर दिया. मैं फ़ंड वापिस कैसे लूँ? {#i-made-a-transfer-to-the-wrong-address-how-do-i-retrieve-the-funds}

दुर्भाग्य से कुछ नहीं किया जा सकता है. केवल निजी की/कुंजी का मालिक उस विशेष पते में ले जा सकता है. यह हमेशा यह पुष्टि करने के लिए सलाह दी जाती है कि अगर आप जो पता को टोकन भेज रहे हैं वह सही है

## मेरा transaction transaction बहुत लंबे समय से लंबित रहा है, मैं क्या कर सकता हूं? {#my-transaction-has-been-pending-for-too-long-what-can-i-do}
अगले कारणों के कारण The The को गिरा दिया जा सकता है:

1. the जमा करते समय एक कम गैस की कीमत की स्थापना करना.
2. Ethereum मैननेट पर भीड़-भाड़ के कारण गैस की कीमत में अचानक वृद्धि
3. The The आपके वॉलेट से रद्द हो जाता है या एक नए The के साथ बदल दिया जाता है.

आप नीचे दिए गए transactions the के साथ आगे बढ़ सकते हैं:

1. अगर आपका transaction transaction एक घंटे से अधिक समय के लिए अटक जाता है, तो **एक ट्राई फिर** बटन को दिखाया जाएगा. आप उसी the को पूरा करने के लिए the र **के** बटन पर क्लिक कर सकते हैं. आप इस वीडियो को **Try फिर** से फीचर का इस्तेमाल कैसे करने के लिए अधिक जानकारी के लिए संदर्भित कर सकते हैं.
2. कृपया अपने मेटामास्क वॉलेट को भी चेक करें क्योंकि Metamask. में queued-up transactions the के कारण कभी-कभी MetaMask को गिरा दिया जा सकता है. उस मामले में, queued-up the को साफ करें या उसी ब्राउज़र में मेटामास्क को फिर से इंस्टॉल करें
3. आप मेटामास्क को एक वैकल्पिक ब्राउज़र में इंस्टाल कर सकते हैं और फिर पॉलीगॉन वॉलेट सूट का इस्तेमाल करके transaction the को पूरा करने की कोशिश करें.
4. आप लंबित निकासी the को पूरा करने के लिए इस लिंक का इस्तेमाल भी कर सकते हैं. सर्च ऑप्शन में transaction the हैश को पेस्ट करें और ट्रांसक्शन को पूरा करने के लिए **Confirm एग्ज़िट** बटन को क्लिक करें.

## तब मैं क्या करूँ यदि जमा होने की पुष्टि हो जाती है लेकिन बैलेंस अपडेट नहीं हो रहा है? {#what-do-i-do-if-the-deposit-is-confirmed-but-the-balance-is-not-getting-updated}

जमा होने की ट्रांज़ैक्शन को पूरा होने में 22-30 मिनट का समय लगता है. कृपया कुछ समय का इंतजार करें और **रिफ्रेश बैलेंस** पर क्लिक करें.

## यदि चेकपॉइंट नहीं हो रहा है तो मुझे क्या करना चाहिए? {#what-should-i-do-if-the-checkpoint-is-not-happening}

चेकपॉइंट कभी-कभी Ethereum, पर नेटवर्क की भीड़-भाड़ के आधार पर, 45 मिनट से 1 घंटे तक का समय लेते हैं, हम टिकट जुटाने से पहले कुछ देर का इंतजार करते हैं.

## मेरी ट्रांज़ैक्शन अटकी हुई है. {#my-transaction-is-stuck}

हमने कुछ सामान्य त्रुटियों को सूचीबद्ध किया है जो उपयोगकर्ता का सामना कर सकते हैं. आप गड़बड़ी की तस्वीर के नीचे सोल्यूशन ढूँढ सकते हैं. यदि आपको कोई अलग गड़बड़ी दिखाई जाती है, तो कृपया हमारी टीम को उसे ठीक करने के लिए [सहायता टिकट भेजें](https://support.polygon.technology/support/home).

  - ### आम गड़बाडियाँ {#common-errors}
क. शुरू के चरण पर निकालना अटक गया.

    <img src={useBaseUrl("img/wallet-bridge/plasma-progress-stuck.png")} width="357" height="800"/>

    This normally occurs when the transaction gets replaced and the wallet web application is not able to detect the replaced transaction hash. Please follow the instructions on [https://withdraw.polygon.technology/](https://withdraw.polygon.technology/) and complete your withdrawal.

ख़. RPC गड़बड़ी

    <img src={useBaseUrl("img/wallet-bridge/checkpoint-rpc-error.png")} width="357" height="600"/>   

    The current RPC error you're facing might be due to an RPC overload.

    Please try changing your RPC and proceed with the transaction. You may follow this link [here](https://docs.polygon.technology/docs/develop/network-details/network#matic-mainnet) for more information.

 ग.

  <img src={useBaseUrl("img/wallet-bridge/checkpoint-stumbled-error.png")} width="357" height="600"/>

 यह गड़बड़ी आमतौर पर आती-जाती रहती है जो अपने आप सुलझ जाती है. यदि आपको स्टेप को दुबारा शुरू करने के दौरान अभी भी वही गड़बड़ी मिल रही है तो इसे दूर करने के लिए पूरी उचित जानकारी के साथ [सहायता टिकट भेजें](https://support.polygon.technology/).


## मुझे पर्याप्त बैलेंस नहीं है कि गड़बड़ी दिखाई ज़ा रही है. {#i-m-shown-an-insufficient-balance-error}

पॉलीगॉन नेटवर्क पर निकालना और जमा करना सस्ता है. इसमें यह समझना है कि बैलेंस की अपर्याप्त गड़बड़ी को एथेरेयम मेंनेट पर एथ बैलेंस डाल कर हटाया जा सकता है. जो आम तौर पर अपर्याप्त संतुलन की समस्या को साफ करता है. अगर यह पॉलीगॉन मैनेट पर transaction transaction है, तो हमें यह require the होगी कि आपके पास मैटिक टोकन की पर्याप्त मात्रा है.

## मेरे ट्रांज़ैक्शन एक्स्प्लोरर पर दिखाई नहीं दे रहे हैं. मैं क्या करूँ? {#my-transactions-are-not-visible-on-the-explorer-what-should-i-do}

यह शायद पॉलीस्कैन के साथ इंडेक्स करने की समस्या है अधिक स्पष्टीकरण के लिए कृपया [सपोर्ट टीम](https://support.polygon.technology/support/home) से संपर्क करें.

## मैंने एथेरेयम पर जमा करना शुरू किया लेकिन वह अभी भी पूरा नहीं हुआ है. मैं क्या करूँ? {#i-initiated-a-deposit-on-ethereum-but-it-still-shows-as-pending-what-should-i-do}

आपके द्वारा दी गई गैस शायद बहुत कम है. आपको थोड़ी देर इंतज़ार करना चाहिए और अगर वह माइन नहीं होता तो उसे दुबारा करें. अतिरिक्त सहायता की स्तिथि में, कृपया अपने वॉलेट पते, ट्रांज़ैक्शन हैश (यदि कोई हो) और प्रासंगिक स्क्रीनशॉट के साथ [सहायता टीम](https://support.polygon.technology/support/home) से संपर्क करें.

## मुझे ट्रांज़ैक्शन हैश नहीं मिल रहा है और मेरे डिपाज़िट नहीं हो पा रहे हैं? क्या हो रहा है? {#i-m-not-getting-a-transaction-hash-and-my-deposits-aren-t-going-through-what-is-happening}

आपके पास शायद पहले से लंबित ट्रांज़ैक्शन है, कृपया पहले उन्हें रद्द करें या उन्हें जल्दी करें. एथेरेयम में ट्रांज़ैक्शन एक एक करके ही हो सकती हैं.

## यह दिखाता है कि पॉलीगॉन निकालने के लिए कोई रकम चार्ज नहीं करता है लेकिन हमें ट्रांज़ैक्शन के दौरान भुगतान करना पड़ता है. {#it-shows-polygon-does-not-charge-any-amount-for-a-withdrawal-but-we-are-to-pay-during-the-transaction}

प्लाज्मा ब्रिज के साथ निकालने वाली ट्रांज़ैक्शन को तीन स्टेप में विभाजित किया जाता है, एक जो पॉलीगॉन मेंनेट पर होता है और दो स्टेप जो एथेरेयम मेंनेट पर पूरा होने वाले हैं. पॉस ब्रिज पर, निकालने की ट्रांज़ैक्शन दो स्टेप में होती है: पॉलीगॉन नेटवर्क पर टोकन बर्न करना और एथेरेयम नेटवर्क पर सबूत जमा करना. हर मामले में, पॉलीगॉन मेंनेट पर जो टोकन बर्न होते हैं, वे बहुत कम लागत पर होंगे. एथेरेयम मेंनेट पर जो बाकी स्टेप होते हैं, उन्हें एथ में भुगतान करना होगा, जो गैस की कीमत पर निर्भर करता है, जिसकी पुष्टी [यहाँ](https://ethgasstation.info/) की जा सकती है.

## मैं एक डिपाज़िट करने की कोशिश कर रहा था लेकिन ट्रांज़ैक्शन मंजूर करें के स्टेप पर रुक गया. {#i-was-trying-to-make-a-deposit-but-the-transaction-stopped-at-the-approve-step}

यदि ट्रांज़ैक्शन अभी भी **मंजूर करें** के स्टेप पर है, तो यह अभी पूरा नहीं हुआ है. इसे पूरा करने के लिए आपको गैस फ़ीस का भुगतान करना होगा और फिर यह पूरा हो जाना चाहिए.

## पॉलीगॉन वॉलेट 'यूज़़र का ट्रांज़ैक्शन सिग्नेचर मना किया गया' मैसेज दिखाता है. {#polygon-wallet-shows-user-denied-transaction-signature-error-message}

यह आमतौर पर इसलिए होता है क्योंकि यूज़़र ने मेटामास्क के ज़रिए कोई ट्रांज़ैक्शन रद्द किया या उसे साइन करने से इनकार कर दिया. जब मेटामास्क वॉलेट द्वारा प्रेरित होता है, तो **Approve** पर क्लिक करके transaction the पर हस्ताक्षर करने के साथ आगे बढ़ता **है, न कि कैंसल** पर .

## transaction The सफल होता है लेकिन यह पेंडिंग को दिखाता है. {#the-transaction-is-successful-but-it-shows-pending}

अगर आपका transaction transaction पूरा हो जाता है और आपको अपनी funds the प्राप्त होती है, लेकिन फिर भी UI पर जो transaction transaction होता है, वह the the डिटेल और स्क्रीनशॉट भेजकर आप एक सपोर्ट टिकट उठा सकते हैं.

## पॉलीगॉन पर समर्थित Exchanges Exchanges की सूची क्या है? {#what-is-the-list-of-supported-exchanges-on-polygon}

MATIC के सिक्के को कई एक्सचेंजों में व्यापार किया जा सकता है. हालांकि, जब आप एक को ट्रेड करने के लिए चुन रहे हों तो अपने खुद का रिसर्च करना हमेशा जरूरी होता है. यह असामान्य नहीं है कि कुछ एक्सचेंज अपने मौजूदा उपलब्ध टोकन में बदलाव करते हैं और इसमें रखरखाव की अवधि भी होती है.

आप एक्सचेंजों की एक सूची के लिए [Coinmarketcap]([https://coinmarketcap.com/currencies/polygon/markets/](https://coinmarketcap.com/currencies/polygon/markets/)) कैप का दौरा कर सकते हैं जहां आपको MATIC मिल सकता है.

## क्या पॉलीगॉन हार्डवेयर वॉलेट का समर्थन करता है? {#does-polygon-support-hardware-wallets}

हाँ, हम निम्नलिखित हार्डवेयर वॉलेट का समर्थन करते हैं:
1. ट्रेजर
2. लेजर

यूजर मेटामास्क पर अपने हार्डवेयर वॉलेट ऑप्शन को कनेक्ट कर सकते हैं और अपने transaction. से आगे बढ़ सकते हैं. यहाँ मेटामास्क पर हार्डवेयर वॉलेट को जोड़ने का लिंक है: htts:/मेटामास्क.zenesk.com/hc/en-us/articles/440852261275

## PoS पर MATIC टोकन का समर्थन क्यों नहीं किया जाता है. {#why-isn-t-the-matic-token-supported-on-pos}

मैटिक पॉलीगॉन का अपना टोकन है और इसका पॉलीगॉन चेन पर अनुबंध पता है - 0x0000000000000000000000000000000000001010. इसका इस्तेमाल गैस के लिए भी किया जाता है. पॉस ब्रिज पर टोकन मैप करने से पॉलीगॉन चेन पर मैटिक का एक अतिरिक्त अनुबंध पता होगा. यह मौजूदा अनुबंध पते से टकराएगा क्योंकि यह नया टोकन पता गैस की पेमेंट करने के लिए इस्तेमाल नहीं किया जा सकता और इसे पॉलीगॉन चेन पर सामान्य ERC20 टोकन के रूप में रहना होगा. इसलिए, इस भ्रम से बचने के लिए, हमने प्लाजा पर ही MATIC को बनाए रखने का फैसला किया

## मैं टोकन कैसे मैप करूँ? {#how-do-i-map-tokens}

कृपया [इस ट्यूटोरियल] (/docs/develop/ethereum-polygon/submit-mapping-request) को संदर्भित करें या आप [सीधे टोकन मैपर](https://mapper.polygon.technology/) जा सकते हैं.

## अगर ट्रांज़ैक्शन को बहुत लंबा समय लग रहा है या अगर गैस की कीमत बहुत अधिक है, तो मैं क्या करूँ? {#what-do-i-do-if-the-transaction-is-taking-too-long-or-if-the-gas-price-is-too-high}

Transaction Transaction टाइम और गैस की कीमत नेटवर्क की भीड़-भाड़ के आधार पर भिन्न होती है और यह नेटवर्क के miners. के बीच की आपूर्ति और मांग से भी निर्धारित होता है.

आप जो कर सकते हैं:
- रोगी बनो.
- अगर यह बहुत धीमी हो तो गैस की फीस बढ़ाएँ.
- the भेजने से पहले फीस की जांच करें. यहां Etherscan's के गैस ट्रैकर के लिए एक लिंक है: https://etherscan.io/gastracker

जो आपको करना नहीं चाहिए:
- कृपया गैस की सीमा को कम मत करें या आपका the the विफल हो सकता है.
- the को रद्द करने का प्रयास नहीं करें. पहले से फीस की जांच करें.


## क्या मैं गैस की सीमा या गैस की कीमत बदल सकता हूँ? {#can-i-change-the-gas-limit-or-the-gas-price}

गैस की सीमा का अनुमान और सेट कॉन्ट्रैक्ट में कॉल किए जा रहे फंक्शन की कुछ आवश्यकताओं के अनुसार अनुमानित किया जाता है. इसे संपादित नहीं किया जाना चाहिए. transaction the की फीस को बढ़ाने या कम करने के लिए केवल गैस की कीमत को बदला जा सकता है.

## the को गति कैसे करें? {#how-to-speed-up-the-transactions}
गैस की फीस को बढ़ाकर आप ऐसा कर सकते हैं. यहाँ एक लिंक का पता चलता है कि मेटामास्क पर यह कैसे करना चाहिए: htts:/मेटामास्क.zenesk.com/hc/en-us/articles/360015489251-How-से https://metamask.zendesk.com/hc/en-us/articles/360015489251-How-to-Speed-Up-or-Cancel-a-Pending-Transaction. रद्द करने के लिए ट्रांसक्शन

## गैस फीस के लिए MATIC टोकन कितना पर्याप्त है. {#how-much-matic-token-is-enough-for-the-gas-fee}
यूजर्स को पॉलीगॉन मेननेट में न्यूनतम 0.01 MATIC होने की need a होती है.

## मैं सहायता टिकट कहाँ बनाऊँ? {#where-do-i-raise-a-support-ticket}
अगर आपको हमारे विशेषज्ञों से मदद की जरूरत है, तो कृपया हमें https://support.polygon.technology/support/home. / support/home पर संदेश भेजें

## मैं ऐसेट को विभिन्न चेन पर कैसे ब्रिज करूँ? {#how-do-i-bridge-assets-across-chains}

पॉलीगॉन Ethereum से assets को पॉलीगॉन में ले जाने के लिए एक ब्रिज प्रदान करता है और इसके विपरीत आप इस wiki. के [ब्रिज सेक्शन]([https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started](https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started)) पर इसके बारे में और अधिक सीख सकते हैं.

हालांकि, अगर आप पॉलीगॉन के स्वामित्व वाली किसी भी बाहरी सर्विस का इस्तेमाल कर रहे हैं तो हम आपको ट्यूटोरियल और निर्देश का अनुरोध करने के लिए अपनी कस्टमर सर्विस में बाहर पहुंचने की सलाह देते हैं. यह भी जरूरी है कि जब आप वेब3 सेवाओं का इस्तेमाल कर रहे हों तो अपने खुद का रिसर्च करना भी जरूरी है.

## मुझे OpenSea या किसी ऐप्लिकेशन के साथ टोकन निकालना समस्या है जो पॉलीगॉन ब्रिज का उपयोग करती है. {#i-have-a-token-withdrawal-issue-with-opensea-or-any-other-application-which-uses-polygon-bridge}

अगर आपके पास अपने निकासी transaction an का मुद्दा है, तो पॉलीगॉन [https://withdraw.polygon.technology](https://withdraw.polygon.technology) के साथ वापस ब्रिज को पेश करता है, ताकि आपको अपने बर्न हैश से जमीन से उतरने में मदद मिल सके. इस टूल से, आप जल्दी से प्रक्रिया में शामिल हो जाते हैं और समस्या का समाधान किया जाएगा. OpenSea और अन्य DApp के साथ आपके transaction transaction से संबंधित अन्य सवालों को एप्लिकेशन टीम द्वारा संभालना होगा.

## मुझसे घोटाला किया गया है. मैं अपने टोकन कैसे वापस लूँगा? {#i-have-been-scammed-how-will-i-retrieve-my-tokens}

दुर्भाग्य से, खोए कॉइन की कोई रिकवरी प्रक्रिया नहीं है. हम पूछते हैं कि आप a करने से पहले आप इसे शुरू करने और पूरा करने से पहले की जांच और डबल चेक करने के लिए जाते हैं. कृपया ध्यान दें कि पॉलीगॉन नेटवर्क और हमारे अधिकारी किसी भी giveaway the पोस्ट में शामिल नहीं होते और हम संगठन की ओर से कभी भी आपको नहीं देखेंगे. कृपया ऐसी सभी कोशिशों को नजरअंदाज़ करें क्योंकि उनकी घोटाला होने की संभावना सबसे अधिक है. हमारे सभी संचार हमारे आधिकारिक हैंडलों के माध्यम से हैं.

## वॉलेट में कुछ अनधिकृत ट्रांज़ैक्शन हैं. क्या वॉलेट हैक हो गया है? {#there-are-some-unauthorized-transactions-in-my-wallet-is-my-wallet-hacked}

दुर्भाग्य से, नेटवर्क अवांछित ट्रांज़ैक्शन को वापस नहीं कर सकता है. निजी की के साथ सावधानी बरतनी हमेशा ज़रूरी है और **उन्हें कभी भी किसी के साथ साझा न करें**.
यदि आपके पास अभी भी कुछ फ़ंड बचे हैं, तो उन्हें तुरंत किसी नए वॉलेट में ट्रांसफ़र करें.

## Ethereum में गोएर्ली को अपने टेस्ट नेटवर्क के रूप में जाना जाता है. पॉलीगॉन नेटवर्क में भी टेस्ट नेटवर्क है? {#ethereum-has-goerli-as-its-test-network-does-polygon-network-have-a-test-network-too}

जैसा कि Ethereum नेटवर्क में गोएर्ली को अपने टेस्ट नेटवर्क के रूप में जाना जाता है, पॉलीगॉन मैननेट में मुंबई है. टेस्ट नेटवर्क पर सभी ट्रांज़ैक्शन Mumbai एक्स्प्लोरर पर इंडेक्स्ड किए जाएँगे.

## मैं दूसरे टोकन के लिए अपने टोकन को कैसे निगल सकता हूं. {#how-can-i-swap-my-tokens-for-other-tokens}
कृपया नीचे दिए गए वीडियो को देखें या [इस ट्यूटोरियल](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#token-swap) का पालन करें.

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-token.mp4"></source>
  <p>आपका ब्राउज़र वीडियो एलिमेंट को सपोर्ट नहीं करता है.</p>
</video>

## टोकन स्वैप बहुत धीमी है. {#the-token-swap-is-too-slow}

यदि आप टोकन स्वैप करने की कोशिश कर रहे हैं और उसमें बहुत लंबा समय लग रहा है, तो आप किसी अलग ब्राउज़र पर इसी ट्रांज़ैक्शन की कोशिश कर सकते हैं. यदि वह काम नहीं करता है और आप एक गड़बड़ी का सामना कर रहे हैं, तो कृपया हमारी सहायता टीम को स्क्रीनशॉट भेजें.

## टोकन को टोकन के लिए गैस की फीस के रूप में चार्ज किया जाता है. {#which-tokens-are-charged-as-the-gas-fees-for-token-swap}
केवल MATIC.

## मैं गैस के लिए अपने टोकन को कैसे निगल सकता हूं. {#how-can-i-swap-my-token-for-gas}
कृपया नीचे दिए गए वीडियो को देखें या [इस ट्यूटोरियल](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#swap-for-gas) का पालन करें.

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-gas.mp4"></source>
  <p>आपका ब्राउज़र वीडियो एलिमेंट को सपोर्ट नहीं करता है.</p>
</video>

## गैस के लिए स्विच करने के लिए कौन-सा टोकन इस्तेमाल किया जा सकता है. {#which-tokens-can-be-used-to-swap-for-gas}
केवल इन टोकन को 'गैस' के लिए समर्थन दिया जाता है: eth, USDC, USDT, DIA, DAI, LINK, WBTC, UNI, GHST, TEL, TEL,

## ET टोकन कैसे मिले? {#how-to-get-eth-tokens}
ET टोकन हासिल करने के लिए, आप या तो एक दूसरे टोकन के लिए ट्रेड कर सकते हैं या एक एक्सचेंज पर ETH पैसे को खरीद सकते हैं, उन्हें ऑन -रैम्प (या मेटामास्क पर) या यहां तक कि [पॉलीगॉन के टोकन स्वैप फीचर का](https://wallet.polygon.technology/polygon/token-swap) इस्तेमाल करके ET के लिए दूसरे टोकन को भी निगल सकते हैं.

## मैं गैस फ़ीस का भुगतान करने के लिए मैटिक टोकन कैसे इस्तेमाल कर सकता हूँ? {#how-can-i-get-matic-tokens-to-pay-for-gas-fees}

हम [गैस स्वैप](https://wallet.polygon.technology/gas-swap/) सेवा देते हैं जो उसमें आपकी सहायता करेगी. आप मैटिक रकम चुनें जिसमें आपको ट्रांज़ैक्शन पूरा करने की ज़रूरत है और आप अन्य टोकन जैसे कि ईथर या USD स्वैप कर सकते हैं. गौरतलब है इसका कोई मतलब नहीं है कि यह **एक गैस रहित ट्रांज़ैक्शन** है.

## मैं मैटिक टोकन सीधे कहाँ प्राप्त कर सकता हूँ? {#where-can-i-get-matic-tokens-directly}

तो मैटिक टोकन को किसी भी केंद्रीकृत ([Binance](https://www.binance.com/en), [(Binance](https://www.coinbase.com/), et.al) या विकेंद्रीकृत ([Uniswap](https://uniswap.org/), [क्विक](https://quickswap.exchange/#/swap)) एक्सचेंज से खरीदा जा सकता है. आप भी रिसर्च करें और [Transak](https://transak.com/), और [राम,](https://ramp.network/) जैसे on-ramps की कोशिश करें. मैटिक कॉइन की आपकी खरीद के उद्देश्य इससे भी निर्धारित होना चाहिए कि आप उन्हें कहाँ से खरीदेंगे और नेटवर्क. अगर आपका इरादा या तो स्टेकिंग हो या प्रतिनिधिमंडल हो तो Ethereum मेंनेट पर MATIC होना सलाह दी जाती है. अगर आपका इरादा पॉलीगॉन मैननेट पर transaction transaction है, तो आपको पॉलीगॉन मैननेट पर MATIC के साथ पकड़ और transact करना चाहिए.





