---
id: client-setup
title: एक Archive नोड क्लाइंट सेट अप करें
sidebar_label: Set up an Archive Node Client
description: "सिस्टम की आवश्यकताएं और क्लाइंट सेट अप."
keywords:
  - erigon
  - archive
  - node
  - docs
  - polygon
  - client
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## सिस्टम की आवश्यकताएं {#system-requirements}

### अभिलेख नोड {#archive-node}

- 16-core CPU
- 64 GB RAM
- मूल रूप से i1 या उससे ऊपर कम से कम 20k+ iops और छापे 0 आधारित डिस्क स्ट्रक्चर के साथ

### Erigon क्लाइंट {#erigon-client}

- पॉलीगॉन मैननेट के एक आर्काइव नोड के लिए: 5TB
- पॉलीगॉन मुंबई के एक आर्काइव नोड के लिए: 1TB
- SSD or NVMe. ध्यान रखें कि क्षमता के करीब होने पर एसएसडी का प्रदर्शन बिगड़ जाता है
- RAM: >= 16G, 64-bit आर्किटेक्चर
- Golang वर्ज़न >= 1.18, GCC 10+

:::note HDD का सुझाव नहीं दिया जाता है

HDD पर, Erigon हमेशा ही चेन टिप के पीछे N ब्लॉक पर होगा, लेकिन पीछे नहीं रहेगा.

:::

## Erigon क्लाइंट सेटअप {#erigon-client-setup}

### इंस्टॉल कैसे करें {#how-to-install}

Erigon इंस्टॉल करने के लिए नीचे दी गई कमांड रन करें:

```bash
git clone --recurse-submodules -j8 https://github.com/maticnetwork/erigon.git
cd erigon
git checkout v0.0.5
make erigon
```

इससे `./build/bin/erigon` पर बाइनरी बननी चाहिए

हमारे फ़ॉर्क्ड रेपो पर स्टेबल वर्ज़न के लिए `v0.0.5` टैग का इस्तेमाल करें.

### कैसे शुरू करें {#how-to-start}

Erigon, शुरू करने के लिए, रन :

```bash
erigon --chain=mumbai
```

- मुंबई टेस्टनेट के लिए `chain=mumbai` का इस्तेमाल करें
- पॉलीगॉन मेननेट के `chain=bor-mainnet`लिए इस्तेमाल करें

### Erigon को कैसे कॉन्फ़िगर करें {#how-to-configure-erigon}

- अगर आप Erigon फ़ाइलों को एक नॉन-डिफ़ॉल्ट लोकेशन में स्टोर करना चाहते हैं, तो `-datadir` का इस्तेमाल करें

    ```
    erigon --chain=mumbai --datadir=<your_data_dir>
    ```

- अगर आप लोकल **हेम्डल** का इस्तेमाल नहीं कर रहे हैं, तो `-bor.heimdall=<your heimdall url>` का इस्तेमाल करें. डिफ़ॉल्ट रूप से, यह `localhost:1317` से कनेक्ट करने की कोशिश करेगा.

    ```makefile
    erigon --chain=mumbai --bor.heimdall=<your heimdall url> --datadir=<your_data_dir>
    ```

    - अगर आप पॉलीगॉन मुंबई टेस्टनेट से कनेक्ट करना चाहते हैं: [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology)

    - पॉलीगॉन मैननेट के लिए: [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology)

### Faster सिंक के लिए टिप्स {#tips-for-faster-sync}

- तेज़़ी से शुरूआती सिंक करने के लिए हाई IOPS और RAM वाली मशीन का इस्तेमाल करें
- स्नैपशॉट डाउनलोड/अपलोड करने की स्पीड बढ़ाने के लिए नीचे दी गई कमांड का इस्तेमाल करें:

```makefile
--torrent.upload.rate="512mb" --torrent.download.rate="512mb"
```

आपकी मशीन जो भी बैंडविड्थ मैनेज कर सकती है उसके साथ `512` बदलें.
