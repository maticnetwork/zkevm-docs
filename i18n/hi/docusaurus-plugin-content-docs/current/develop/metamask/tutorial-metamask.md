---
id: hello
title: मेटामास्क वॉलेट कैसे बनाएँ?
sidebar_label: Hello Metamask
description: मेटामास्क वॉलेट बनाना सीखें.
keywords:
  - docs
  - matic
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

अगर आप एक नया क्रिप्टोकरेंसी वॉलेट कैसे बनाएँ, यह सोच रहे हैं तो, इसके लिए आपको मेटामास्क एक्सटेंशन को इंस्टॉल करना होगा.

मेटामास्क एक मुफ़्त और सुरक्षित ब्राउज़र है जो वेब एप्लीकेशनों को एथेरेयम ब्लॉकचेन के साथ पढ़ने और इंटरैक्ट करने की सुविधा देता है.

## स्टेप 1. अपने ब्राउज़र पर मेटामास्क इंस्टॉल करें {#step-1-install-metamask-on-your-browser}

मेटामास्क के साथ एक नया वॉलेट बनाने के लिए, आपको पहले एक्सटेंशन इंस्टॉल करना होगा. आप [क्रोम](https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn), [फ़ायरफॉक्स](https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/), ब्रेव और [ओपेरा](https://addons.opera.com/en/extensions/details/metamask/) ब्राउज़रों के लिए मेटामास्क इंस्टॉल कर सकते हैं.

1.  [https://metamask.io](https://metamask.io/)  खोलें या अपने पसंदीदा सर्च इंजन को इस्तेमाल करते हुए “Metamask extension” के लिए खोज करें.

:::note
इस ट्यूटोरियल में हम एक उदाहरण के रूप में गूगल क्रोम का इस्तेमाल करेंगे, लेकिन वर्कफ्लो सभी ब्राउज़रों के लिए एक ही है.
:::

<img src={useBaseUrl("img/metamask/develop/metamask-home.png")} />

2. MetaMask को गूगल क्रोम एक्सटेंशन के रूप में इंस्टाल करने के लिए **डाउनलोड** क्लिक करें.

3.  **Add to Chrome**पर क्लिक करें

<img src={useBaseUrl("img/metamask/develop/add-chrome.png")} />

4.  **Add Extension**पर क्लिक करें.

<div align="center">
<img src={useBaseUrl("img/metamask/develop/add-extension.png")} />
</div>

बस इतना ही! आपने मेटामास्क एक्सटेंशन को सफलतापूर्वक इंस्टॉल कर लिया है!

## स्टेप 2. अकाउंट बनाएँ {#step-2-create-an-account}

अगला स्टेप एक अकाउंट बनाना है.

1. जब डाउनलोड पूरा हो जाता है, तो आप एक सीक्रेट रिकवरी Phrase के साथ **एक वॉलेट को बहाल** करने में सक्षम हो जाएंगे या **एक नया अकाउंट बनाने** के लिए, एक नए वॉलेट का निर्माण कर और एक नए सीक्रेट रिकवरी Phrase. को पैदा कर सकते हैं.

<div align="center">
<img src={useBaseUrl("img/metamask/develop/new-metamask.png")} />
</div>

2. आपसे एक नया पासवर्ड बनाने के लिए कहा जाएगा. एक मजबूत पासवर्ड बनाएँ और **Create** पर क्लिक करें.

<div align="center" >
<img width="500" src={useBaseUrl("img/metamask/develop/create-password.png")} />
</div>

3. MetaMask तब सीक्रेट रिकवरी Phrase के बारे में कुछ जानकारी प्रदान करेगा और अगले पेज पर आप अपने वाक्यांश देखेंगे.

<div align="center" >
<img  src={useBaseUrl("img/metamask/develop/reveal-phrase.png")} />
</div>


4. 12-शब्द का वाक्यांश प्रस्तुत किए गए उसी क्रम में पेपर के एक टुकड़े पर नीचे लिखें

:::caution
Metamask's के निर्देश को ध्यान से पढ़ें. इस वाक्यांश को पेपर के टुकड़े पर लिखें और सुरक्षित स्थान पर स्टोर करें. अगर आप और भी सुरक्षा चाहते हैं, तो इसे कागज के कई टुकड़ों पर लिख दें और 2-3 अलग-अलग स्थानों में प्रत्येक को स्टोर करें. आप इस वाक्यांश को भी याद कर सकते हैं.
:::

5. पहले जनरेट की हुई फ्रेज़ को चुनकर अपनी गुप्त फ्रेज़ को वेरिफ़ाई करें. ऐसा कर लेने के बाद,  **Confirm** पर क्लिक करें.

<img src={useBaseUrl("img/metamask/develop/phrase.gif")} />

"इस पहेली को हल करके" आप इस बात की पुष्टि कर रहे हैं कि आप अपने गुप्त वाक्यांश को जानते हैं.

**बधाई हो!**  आपने अपना मेटमास्क अकाउंट सफलतापूर्वक बना लिया है. एक नया एथेरेयम वॉलेट पता आपके लिए स्वचालित रूप से जनरेट हो गया था!