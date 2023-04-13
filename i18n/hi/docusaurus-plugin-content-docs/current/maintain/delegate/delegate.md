---
id: delegate
title: डेलिगेट कैसे करें
description: पॉलीगॉन नेटवर्क पर डेलिगेटर बनने का तरीका जानें.
keywords:
  - docs
  - matic
  - polygon
  - how to delegate
  - validator
  - stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: delegate
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# डेलिगेट कैसे करें {#how-to-delegate}

यह चरण-दर-चरण गाइड पॉलीगॉन नेटवर्क पर [डेलिगेटर](/docs/maintain/glossary.md#delegator) बनने में आपकी सहायता करेगी.

एथेरेयम मेननेट पते पर आपके पास मैटिक टोकन और एथ का होना एकमात्र शर्त है.

## डैशबोर्ड एक्सेस करें {#access-the-dashboard}

1. अपने वॉलेट (उदाहरण, मेटामास्क) में एथेरेयम मेंनेट चुनें.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/choose-eth-mainnet.png")} width="300" />
</div>
<br />

2. [पॉलीगॉन स्टेकिंग](https://staking.polygon.technology/) में लॉग इन करें.
3. एक बार लॉग इन करने के बाद, आपको वैलिडेटर्स की सूची के साथ ही कुछ समग्र आंकड़े देखेंगे.

![img](/img/staking/home.png)

:::note

अगर आप एक वैलिडेटर हैं, तो एक अलग validator, पता का इस्तेमाल डेलिगेटर के रूप में लॉग इन करने के लिए करता है.

:::

## वैलिडेटर को डेलिगेट करें {#delegate-to-a-validator}

1. **एक डेलिगेटर बनें** पर क्लिक करें या किसी विशिष्ट वैलिडेटर तक स्क्रोल करें और **डेलिगेट करें** पर क्लिक करें.

![img](/img/staking/home.png)

2. डेलिगेट करने के लिए मैटिक की मात्रा प्रदान करें.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate.png")} width="500" />
</div>
<br />

3. डेलिगेशन ट्रांज़ैक्शन स्वीकृत करें और **डेलिगेट करें** पर क्लिक करें.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate2.png")} width="500" />
</div>
<br />

डेलिगेशन ट्रांज़ैक्शन पूरा होने के बाद, आपको **डेलिगेशन पूर्ण हुआ** मैसेज दिखाई देगा.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate3.png")} width="500" />
</div>
<br />

## अपने डेलिगेशन देखें {#view-your-delegations}

अपने डेलिगेशन देखने के लिए, [मेरा अकाउंट](https://staking.polygon.technology/account) पर क्लिक करें.

![img](/img/staking/myAccount.png)

## रिवॉर्ड निकालें {#withdraw-rewards}

1. [मेरा अकाउंट](https://staking.polygon.technology/account) पर क्लिक करें.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. आपके डेलिगेट किए गए वैलिडेटर के तहत, **रिवॉर्ड निकालें** पर क्लिक करें.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/withdraw-reward.png")} width="800" />
</div>
<br />

यह आपके एथेरेयम पते पर मैटिक टोकन रिवॉर्ड को निकाल लेगा.

## रिवॉर्ड्स को फिर से दांव पर लगाएं {#restake-rewards}

1. [मेरा अकाउंट](https://staking.polygon.technology/account) पर क्लिक करें.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. आपके डेलिगेट किए गए वैलिडेटर के तहत, **रिवॉर्ड्स को फिर से दांव पर लगाएं** पर क्लिक करें.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/restake-rewards.png")} width="800" />
</div>
<br />

इससे वैलिडेटर को MATIC टोकन को फिर से रिस्टोर कर लेगा और आपके प्रतिनिधिमंडल की हिस्सेदारी को बढ़ा देगा.

## एक वैलिडेटर से अलग होना {#unbond-from-a-validator}

1. [मेरा अकाउंट](https://staking.polygon.technology/account) पर क्लिक करें.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. आपके डेलिगेट किए गए वैलिडेटर के तहत, **अलग होएं** पर क्लिक करें.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond-from-validator.png")} width="800" />
</div>
<br />

यह वैलिडेटर से आपके रिवार्ड को और आपके पूरे स्टेक को वैलिडेटर से वापस ले लेगा.

आपके वापस लिया गया रिवार्ड आपके Ethereum अकाउंट पर तुरंत दिखाई देगा.

आपके निकाले गए स्टेक फ़ंड को 80 [चेकपॉइंट](/docs/maintain/glossary.md#checkpoint-transaction). के लिए लॉक किया जाएगा.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond.png")} width="500" />
</div>
<br />

:::note

यह सुनिश्चित करने के लिए कि नेटवर्क पर कोई दुर्भावनापूर्ण व्यवहार न हो अलग किए जाने की अवधि के दौरान फ़ंड लॉक किया जाता है.

:::

## स्टेक को एक नोड से नोड पर मूव करें {#move-stake-from-one-node-to-another-node}

स्टेक को एक नोड से दूसरी नोड पर मूव करना एक सिंगल ट्रांज़ैक्शन है. इस इवेंट के दौरान कोई देरी या अलग करने की अवधि नहीं होती है.

1. स्टेकिंग डैशबोर्ड पर अकाउंट पर [मेरा अकाउंट](https://wallet.polygon.technology/staking/my-account) में लॉग इन करें.
1. अपने डेलिगेट किए गए वैलिडेटर के तहत **स्टेक मूव करें** पर क्लिक करें.
1. एक बाहरी वैलिडेटर चुनें और **यहां दांव लगाएं** पर क्लिक करें.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move.png")} width="1500" />
</div>
<br />

4. स्टेक की रकम प्रदान और **स्टेक मूव करें** पर क्लिक करें.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move2.png")} width="400" />
</div>
<br />

यह स्टेक को मूव कर देगा. डैशबोर्ड 12 ब्लॉक की पुष्टि के बाद अपडेट होगा.

:::info

किसी भी नोड्स के बीच की हिलना की अनुमति है. एकमात्र अपवाद एक फाउंडेशन नोड से दूसरे फाउंडेशन नोड में जा रहा है, जिसे अनुमति नहीं है.

:::
