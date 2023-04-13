---
id: technical-faqs
title: सामान्य तकनीकी सवाल
description: पॉलीगॉन नेटवर्क पर एक वैलिडेटर चलाने से संबंधित सवाल अक्सर पूछे जाते हैं.
keywords:
  - docs
  - polygon
  - polygon wiki
  - faqs
  - technical
slug: technical-faqs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### 1. क्या हेम्डल और बोर कीस्टोर के लिए निजी की एक ही है? {#1-are-the-private-keys-same-for-heimdall-and-bor-keystore}

हाँ, वैलिडेटर की और बोर कीस्टोर जनरेट करने के लिए इस्तेमाल होने वाली निजी की एक ही है. इस इंस्टैंस में इस्तेमाल की जाने वाली निजी की, आपके वॉलेट का थ पता है जहां आपका पॉलीगॉन टेस्टनेट टोकन को स्टोर किया जाता है.

### 2. आम कमांड की सूची {#2-list-of-common-commands}

हमारे पास वर्तमान में Linux पैकेज के लिए आपके लिए आसानी से समझ आने वाली सूची है. हम करेंगे अधिक सुविधा के लिए इस सूची को नियमित रूप से अपडेट करते रहें.

**Linux पैकेज के लिए**

#### A. हेम्डल जेनेसिस फ़ाइल कहाँ ढूँढें {#a-where-to-find-heimdall-genesis-file}

`$CONFIGPATH/heimdall/config/genesis.json`

#### ख. heimdall-config.toml कहाँ ढूँढें {#b-where-to-find-heimdall-config-toml}

`/etc/heimdall/config/heimdall-config.toml`

#### C. config.toml कहाँ ढूँढें {#c-where-to-find-config-toml}

`/etc/heimdall/config/config.toml`

#### D. heimdall-seeds.txt कहाँ ढूँढें {#d-where-to-find-heimdall-seeds-txt}

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

#### E. हेम्डल शुरू करें {#e-start-heimdall}

`$ sudo service heimdalld start`

#### F. हेम्डल रेस्ट-सर्वर शुरू करें {#f-start-heimdall-rest-server}

`$ sudo service heimdalld-rest-server start`

#### G. हेम्डल bridge-server शुरू करें {#g-start-heimdall-bridge-server}

`$ sudo service heimdalld-bridge start`

#### H. हेम्डल के लॉग {#h-heimdall-logs}

`/var/log/matic-logs/`

#### I. बोर जेनेसिस फ़ाइल कहाँ ढूँढें {#i-where-to-find-bor-genesis-file}

`$CONFIGPATH/bor/genesis.json`

#### J. बोर शुरू करें {#j-start-bor}

`sudo service bor start`

#### K. हेम्डल लॉग जाँचें {#k-check-heimdall-logs}

`tail -f heimdalld.log`

#### L. हेम्डल rest-server जाँचें {#l-check-heimdall-rest-server}

`tail -f heimdalld-rest-server.log`

#### M. हेम्डल ब्रिज लॉग जाँचें {#m-check-heimdall-bridge-logs}

`tail -f heimdalld-bridge.log`

#### N. बोर लॉग जाँचें {#n-check-bor-logs}

`tail -f bor.log`

#### O. बोर प्रक्रिया बंद करें {#o-kill-bor-process}

**linux के लिए**:

1. `ps -aux | grep bor`. बोर के लिए PID प्राप्त करें और निम्न कमांड रन करें.
2. `sudo kill -9 PID`

**बायनरी के लिए**:

`CS-2003/bor` पर जाएँ और फिर `bash stop.sh`रन करें,

### 3. गड़बड़ी: अकाउंट (0x...) अनलॉक करने में असफल दिए गए पते या फ़ाइल के लिए कोई की नहीं है {#3-error-failed-to-unlock-account-0x-no-key-for-given-address-or-file}

यह गड़बड़ी इसलिए होती है क्योंकि password.txt फ़ाइल के लिए पाथ गलत है. इसे ठीक करने के लिए आप नीचे दिए स्टेप फ़ॉलो कर सकते हैं:

यह गड़बड़ी इसलिए होती है क्योंकि password.txt और कीस्टोर फ़ाइल के लिए पाथ गलत हैं. इसे ठीक करने के लिए आप नीचे दिए स्टेप फ़ॉलो कर सकते हैं:

1. बोर कीस्टोर फ़ाइल को यहाँ कॉपी करें

 /etc/bor/dataDir/keystore

2. और password.txt को यहाँ

 /etc/bor/dataDir/

3. सुनिश्चित करें कि आपने `/etc/bor/metadata`में सही पता जोड़ा है

बायनरी के लिए:

1. बोर कीस्टोर फ़ाइल को यहाँ कॉपी करें:

`/var/lib/bor/keystore/`

2. और password.txt को यहाँ

`/var/lib/bor/password.txt`


### 4. गड़बड़ी: गलत Block.Header.AppHash. अपेक्षित xxxx {#4-error-wrong-block-header-apphash-expected-xxxx}

यह आमतौर पर हेम्डल के गलत तरीके से इंस्टॉल होने के कारण होता है. इसे ठीक करने के लिए आप नीचे दिए स्टेप फ़ॉलो कर सकते हैं:

रन करें

    ```heimdalld unsafe-reset-all```

और हेम्डल सेवा दोबारा शुरू कर दें. आप इस गाइड को संदर्भित कर सकते हैं - https://docs.polygon.technology https://docs.polygon.technology/docs/validate/validate/run-validator

### 5. मैं API की कहाँ से बनाऊँ? {#5-from-where-do-i-create-the-api-key}

आप इस लिंक पर जा सकते हैं: [https://infura.io/register](https://infura.io/register). सुनिश्चित करें कि अपने अकाउंट और प्रोजेक्ट का सेट अप करने के बाद, आप Ropsten के लिए API की कॉपी करें और मेननेट के लिए नहीं.

मेननेट अपने आप ही चुना जाता है.

### 6. हेम्डल काम नहीं कर रहा है. मुझे एक पैनिक गड़बड़ी मिल रही है {#6-heimdall-isn-t-working-i-m-getting-a-panic-error}

**वास्तविक गड़बड़ी**: मेरा हेम्डल काम नहीं कर रहा है. लॉग में पहली लाइन यह है: पैनिक: अज्ञात db_backend leveldb, अपेक्षित या तो goleveldb या memdb या fsdb

कान्फ़िग को `goleveldb`में `config.toml`में बदलें.


### 7. मैं हेम्डल बोर और बॉर्न के अवशेष कैसे डिलीट करूँ? {#7-how-do-i-delete-remnants-of-heimdall-and-bor}

यदि आप हेम्डल और बोर के अवशेष डिलीट करना चाहते हैं तो आप निम्न कमांड रन कर सकते हैं बोर:

Linux पैकेज के लिए:

```$ sudo dpkg -i matic-bor```

और बोर डायरेक्टरी डिलीट करें:

```$ sudo rm -rf /etc/bor```

बायनरी के लिए:

```$ sudo rm -rf /etc/bor```

और

```$ sudo rm /etc/heimdall```


### 8. कितने वैलिडेटर एक साथ सक्रिय हो सकते हैं? {#8-how-many-validators-can-be-active-concurrently}

एक समय में 100 तक सक्रिय वैलिडेटर होंगे. अगर बीच में ही सीमा पार हो जाती है तब भी हम इवेंट के माध्यम से भी और प्रतिभागियों को ले आएँगे. ध्यान रखें कि सक्रिय वैलिडेटर ज्यादातर वे हैं, जिनका अपटाइम उच्च है. उच्च डाउनटाइम वाले प्रतिभागियों को बाहर कर दिया जाएगा.

### 9. मुझे कितना स्टेक करना चाहिए? {#9-how-much-should-i-stake}

"स्टेक-रकम" और "हेम्डल-फ़ीस-रकम" - कितनी होनी चाहिए?

स्टेक रकम के लिए 10 मैटिक टोकन आवश्यक हैं, जबकि हेम्डल फ़ीस 10 से अधिक होनी चाहिए. उदाहरण के लिए, अगर आपकी स्टेक की रकम 400 है तो हेम्डल फ़ीस 20 होनी चाहिए. हम हेम्डल फ़ीस को, 20 रखने का सुझाव देते हैं.

हालाँकि, कृपया ध्यान दें कि स्टेक रकम में दर्ज मूल्य और हेम्डल-फ़ीस-रकम की मात्रा 18 दशमलव में दर्ज की जानी चाहिए

उदाहरण के लिए,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 10. मुझे वैलिडेटर बनने के लिए चुना गया था लेकिन एथ पता गलत था. मैं क्या करूँ? {#10-i-was-selected-to-become-a-validator-but-my-eth-address-was-incorrect-what-do-i-do}

यदि आपके पास उस एथ पते का ऐक्सेस है जो आपने पहले दिया था तो आप उस अकाउंट से टेस्ट टोकन को मौजूदा अकाउंट में ट्रांसफ़र कर सकते हैं. और फिर आप अपने नोड को सेट अप करने की प्रक्रिया शुरू कर सकते हैं.

यदि आपके पास उस एथ पते का ऐक्सेस नहीं है, तो हम आपके टोकन अलग से ट्रांसफ़र नहीं करेंगे. आप सही एथ पते के साथ फ़ॉर्म में फिर से रजिस्टर कर सकते हैं.

### 11. मुझे ब्रिज शुरू करने में एक गड़बड़ी मिल रही है {#11-i-m-getting-an-error-starting-the-bridge}

 **गड़बड़ी**: ऑब्जेक्ट "शुरू" अज्ञात है, "ब्रिज सहायता" का प्रयास करें. क्या इसे अनदेखा करना अभी भी ठीक है?

"कौन सा ब्रिज" जाँचें - यदि यह `/usr/sbin/bridge`है तो आप सही "ब्रिज प्रोग्राम नहीं रन कर रहे हैं.

`~/go/bin/bridge`के बजाए `(or $GOBIN/bridge)`


### 12. मुझे dpkg की गड़बड़ी मिल रही है {#12-i-m-getting-dpkg-error}

**गड़बड़ी**: "dpkg: आर्काइव matic-heimdall_1.0.0_amd64.deb को प्रॉसेस करने में गड़बड़ी हुई (--इंस्टॉल करें): '/heimdalld-rest-server.service', को ओवरराइट करने की कोशिश कर रहे हैं जो matic-node 1.0.0 पैकेज में भी है"

यह मुख्य रूप से आपकी मशीन पर पॉलीगॉन के पिछले इन्स्टलेशन के कारण होता है. समाधान करने के लिए आप इसे रन कर सकते हैं:

`sudo dpkg -r matic-node`


### 13. मुझे ठीक से पता नहीं है कि वैलिडेटर उत्पन्न करते समय मैं कौन सी निजी की जोड़ूँ {#13-i-m-not-clear-on-which-private-key-should-i-add-when-i-generate-validator-key}

इस्तेमाल की जाने वाली की, आपके वालेट का एथ पता है जहाँ आपके पॉलीगॉन टेस्टनेट टोकन स्टोर किए जाते हैं. आप फ़ॉर्म पर सबमिट किए गए पते से जुड़ी एक सार्वजनिक-निजी की के जोड़े के साथ सेटअप पूरा कर सकते हैं.


### 14. क्या यह जानने का कोई तरीका है कि हेम्डल सिंक हो गया है? {#14-is-there-a-way-to-know-if-heimdall-is-synced}

आप इसे जाँचने के लिए निम्नलिखित कमांड रन कर सकते हैं:

```$ curl [http://localhost:26657/status](http://localhost:26657/status)```

catching_up की वैल्यू जाँचें. यदि यह गलत है तो नोड पूरी तरह से सिंक हो गया है.


### 15. यदि कोई टॉप 10 स्टेकर बन जाता है, तो आखिर में उसे मैटिक का रिवार्ड कैसे मिलेगा? {#15-what-if-someone-become-a-top-10-staker-how-he-will-receive-his-matic-reward-at-the-end}

स्टेज 1 के रिवॉर्ड स्टेक पर आधारित नहीं हैं. रिवार्ड के विवरण के लिए कृपया https://blog.matic.network/counter-stake-stage-1-stake-on-the-beach-full-details-matic-network/ देखें. ज़्यादा स्टेक वाले प्रतिभागियों को इस चरण में किसी रिवार्ड के लिए अपने आप ही योग्य नहीं माना जाता है.


### 16. मेरे हेम्डल का वर्जन क्या होना चाहिए? {#16-what-should-be-my-heimdall-version}

हेम्डल वर्जन जाँचने के लिए आप बस यह रन कर सकते हैं:

```heimdalld version```

स्टेज 1 के लिए हेम्डल का सही वर्जन `heimdalld version is beta-1.1-rc1-213-g2bfd1ac`होना चाहिए


### 17. स्टेक की रकम और फ़ीस में मुझे कितनी मात्रा जोड़नी चाहिए? {#17-what-values-should-i-add-in-the-stake-amount-and-fee-amount}

स्टेक रकम के लिए 10 मैटिक टोकन आवश्यक हैं, जबकि हेम्डल फ़ीस 10 से अधिक होनी चाहिए. उदाहरण के लिए, अगर आपकी स्टेक की रकम 400 है तो हेम्डल फ़ीस 20 होनी चाहिए. हम हेम्डल फ़ीस को, 20 रखने का सुझाव देते हैं.

हालाँकि, कृपया ध्यान दें कि स्टेक रकम में दर्ज मूल्य और हेम्डल-फ़ीस-रकम की मात्रा 18 दशमलव में दर्ज की जानी चाहिए

उदाहरण के लिए,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 18. `/var/lib/heimdall`और `/etc/heimdall?`के बीच में क्या अंतर है

जब आप इंस्टॉल करने के लिए बाइनरी तरीका इस्तेमाल करते हैं तो `/var/lib/heimdall`हेम्डल की डाइरेक्टरी है.  `/etc/heimdall`Linux पैकेज इंस्टॉल करने के तरीके के लिए है.


### 19. स्टेक ट्रांसफ़र करने पर, मुझे "गैस की सीमा पार हुई" गड़बड़ी मिल रही है {#19-when-i-make-the-stake-transaction-i-m-getting-gas-exceeded-error}

यह गड़बड़ी स्टेक या फ़ीस की रकम के फ़ॉर्मैट के कारण हो सकती है. स्टेक कमांड के दौरान दर्ज किए गए मूल्यों में 18 दशमलव होने चाहिए.

हालाँकि, कृपया ध्यान दें कि स्टेक रकम में दर्ज मूल्य और हेम्डल-फ़ीस-रकम की मात्रा 18 दशमलव में दर्ज की जानी चाहिए

उदाहरण के लिए,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 20. मुझे वैलिडेटर बनने का मौका कब मिलेगा? {#20-when-will-i-get-a-chance-to-become-a-validator}

हम स्टेज 1 के पूरे इवेंट के दौरान धीरे-धीरे वैलिडेटर जोड़ रहे हैं. हम धीरे-धीरे नए बाहरी वैलिडेटरों की सूची जारी करेंगे. इस सूची की घोषणा डिस्कॉर्ड चैनल पर की जाएगी.


### 21. मुझे हेम्डल अकाउंट की लोकेशन की जानकारी कहाँ मिल सकती है? {#21-where-can-i-find-heimdall-account-info-location}

बायनरी के लिए:

    /var/lib/heimdall/config folder

Linux पैकेज के लिए:

    /etc/heimdall/config


### 22. मैं API की को कौन सी फ़ाइल में जोड़ूँ? {#22-which-file-do-i-add-the-api-key-in}

एक बार API की बनाने के बाद आपको `heimdall-config.toml`फ़ाइल में API की जोड़नी होगी.


### 23. मैं persistent_peers को कौन सी फ़ाइल में जोड़ूँ? {#23-which-file-do-i-add-the-persistent_peers}

आप निम्नलिखित फ़ाइल में persistent_peers जोड़ सकते हैं:

    /var/lib/heimdall/config/config.toml


### 24. "क्या आपने अपने ऐप्लिकेशन डेटा को रीसेट किए बिना टेंडरमिंट को रीसेट किया है?" {#24-did-you-reset-tendermint-without-resetting-your-application-s-data}

ऐसे में आप हेम्डल कान्फ़िग डेटा को रीसेट कर सकते हैं और फिर इंस्टालेशन को दोबारा रन करने की कोशिश कर सकते हैं.

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge


### 25. गड़बड़ी: अनमार्शल करने में असमर्थ कॉन्फ़िगरेशन गड़बड़ी 1 गड़बड़ी(डियाँ) डिकोड की जा रही हैं {#25-error-unable-to-unmarshall-config-error-1-error-s-decoding}

गड़बड़ी: `* '' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract`

यह ज्यादातर तब होता है, जब टाइपिंग की ग़लतियाँ, या कुछ गायब हिस्से या कोई पुरानी कॉन्फ़िग फ़ाइल बची रहती है. आपको सभी अवशेष साफ करने होंगे और इसे फिर सेट अप करने की कोशिश करनी होगी.

### 26. हेम्डल और बोर सेवाएँ रोकने के लिए {#26-to-stop-heimdall-and-bor-services}

**Linux पैकेज के लिए**:

हेम्डल रोकें: `sudo service heimdalld stop`

बोर रोकें: `sudo service bor stop`या

1. `ps -aux | grep bor`. बोर के लिए PID प्राप्त करें और निम्न कमांड रन करें.
2. `sudo kill -9 PID`

**बायनरी के लिए**:

हेम्डल रोकें: `pkill heimdalld`

ब्रिज रोकें: `pkill heimdalld-bridge`

बोर रोकें: CS-2001/बोर पर जाएँ और फिर `bash stop.sh`रन करें

### 27. हेम्डल और बोर डाइरेक्टरी हटाने के लिए {#27-to-remove-heimdall-and-bor-directories}

**Linux पैकेज के लिए**: हेम्डल हटाएँ: `sudo rm -rf /etc/heimdall/*`

बोर हटाएँ: `sudo rm -rf /etc/bor/*`

**बायनरी के लिए**:

हेम्डल हटाएँ: `sudo rm -rf /var/lib/heimdall/`

बोर हटाएँ: `sudo rm -rf /var/lib/bor`

### 28. जब आपको "गलत Block.Header.AppHash." गड़बड़ी मिलती है तो क्या करना चाहिए {#28-what-to-do-when-you-get-wrong-block-header-apphash-error}

यह गड़बड़ी आमतौर पर Infura अनुरोधों के पूरी तरह से समाप्त होने के कारण होती है. पॉलीगॉन पर नोड सेट अप करने पर, आप कान्फ़िग फ़ाइल (हेम्डल) में Infura की जोड़ते हैं. आपको प्रतिदिन एक लाख अनुरोधों की, डिफ़ॉल्ट, अनुमति दी जाती है, यदि यह सीमा समाप्त हो जाती है, तो आपको ऐसी समस्याओं का सामना करना पड़ता है. इसका समाधान करने के लिए आप नई API की बनाएँ और उसे `config.toml`फ़ाइल में जोड़ दें.

:::tip नई जानकारी लेते रहें

निम्न की सदस्यता लेकर पॉलीगॉन टीम और समुदाय से नवीनतम नोड और वैलिडेटर अपडेट प्राप्त करें [पॉलीगॉन अधिसूचना समूह](https://polygon.technology/notifications/).

:::
