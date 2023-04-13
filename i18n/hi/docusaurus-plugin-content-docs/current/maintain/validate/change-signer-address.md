---
id: change-signer-address
title: अपना साइनर पता बदलें
description: अपने वैलिडेटर का signer पता बदलें
keywords:
  - docs
  - matic
  - polygon
  - signer address
  - change
  - validator
slug: change-signer-address
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

[साइनर पता](/docs/maintain/glossary.md#signer-address) क्या है इस बारे में जानकारी के लिए, देखें [की मैनेजमेंट](/docs/maintain/validator/core-components/key-management).

## आवश्यक शर्तें {#prerequisites}

सुनिश्चित करें कि आपका वैलिडेटर नोड पूरी तरह से सिंक है और नए साइनर पते के साथ रन कर रहा है.

## साइनर पता बदलें {#change-the-signer-address}

यह गाइड आपके वर्तमान वैलिडेटर नोड को नोड 1 और आपके नए वैलिडेटर नोड को नोड 2 के रूप में संदर्भित करती है.

1. नोड 1 पते के साथ [स्टेकिंग डैशबोर्ड](https://staking.polygon.technology/) पर लॉग करें.
2. अपनी प्रोफ़ाइल पर, **प्रोफ़ाइल में बदलाव करें** पर क्लिक करें.
3. साइनर **पता क्षेत्र** में, नोड 2 पता प्रदान करें.
4. साइनर **सार्वजनिक की क्षेत्र** में, नोड 2 सार्वजनिक की प्रदान करें.

सार्वजनिक की पाने के लिए, वैलिडेटर नोड पर निम्न कमांड रन करें:

   ```sh
   heimdalld show-account
   ```

**सहेजें** पर क्लिक करने से आपके नोड के लिए आपका नया विवरण सहेज दिया जाएगा. इसका मतलब वह नोड 1 आपका पता होगा जो स्टेक, रिवॉर्ड को कहाँ भेजा जाएगा आदि को नियंत्रित करता है. और नोड 2 अब ब्लॉक्स, चेकपॉइंट्स को साइन करने आदि जैसी गतिविधियां कर रहा है.
