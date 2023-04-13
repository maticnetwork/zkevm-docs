---
id: snapshot-instructions-heimdall-bor
title: हेम्डल और बोर स्नैपशॉट
description: हेम्डल और बोर स्नैपशॉट को तेज़ी से सिंक करने के लिए निर्देश.
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
  - heimdall
  - bor
  - snapshots
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

एक नई सेंट्री, वैलिडेटर या पूरे नोड सर्वर को सेट करते हुए यह सुझाव दिया जाता है कि आप तेज़ी से सिंक करने के लिए बिना नेटवर्क के ऊपर सिंक किए एक स्नैपशॉट का इस्तेमाल करें. स्नैपशॉट का इस्तेमाल करना आपके हेम्डल और बोर, दोनों के लिए कई दिन बचाएगा.

:::tip

नवीनतम स्नैपशॉट के लिए, कृपया [<ins>पॉलीगॉन चेन स्नैपशॉट</ins>](https://snapshot.polygon.technology/) का दौरा करें.

:::

## हेम्डल स्नैपशॉट {#heimdall-snapshot}

आपको पहले अपने नोड को नोड सेटअप गाइड के मुताबिक **पूर्वआवश्यकताओं** के साथ सेटअप करने की ज़रूरत है. हेम्डल को सिंक करने की सेवाएँ शुरू करने से पहले, स्नैपशॉट को इस्तेमाल करने के लिए नीचे के स्टेप्स को फॉलो करें:

1. अपने वीएम पर हेम्डल की स्नैपशॉट टार फ़ाइल को डाउनलोड करने के लिए निम्नलिखित कमांड को रन करें:

```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-08.tar.gz
```

2. हेम्डल डेटा डायरेक्टरी में टार फ़ाइल को अनपैक करने के लिए, निम्नलिखित कमांड को रन करें:
```
// You must ensure you are running this command before you start the Heimdall service on your node.
// If your Heimdall service has started, please stop the service and run the following command:
// Once unpacking is complete, you can start the Heimdall service again:
tar -xzvf <snapshot file> -C <HEIMDALL_DATA_DIRECTORY>

// If your Heimdall data directory is different,
// please replace the directory name in the command for starting the Heimdall service.
// When this command completes, you may delete the tar file to reclaim space.

// For example, this will unpack the tar file in the Heimdall Data directory:
tar -xzvf heimdall-snapshot-2021-11-08.tar.gz -C /var/lib/heimdall/data/
```

## बोर स्नैपशॉट {#bor-snapshot}

आपको पहले अपने नोड को नोड सेटअप गाइड के मुताबिक **पूर्वआवश्यकताओं** के साथ सेटअप करने ज़रूरत है. बोर को सिंक करने की सेवाएँ शुरू करने से पहले, स्नैपशॉट को इस्तेमाल करने के लिए नीचे के स्टेप्स को फ़ॉलो करें:

1. अपने वीएम पर बोर की स्नैपशॉट टार फ़ाइल को डाउनलोड करने के लिए निम्नलिखित कमांड को रन करें:
```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-08.tar.gz
```

2. बोर डेटा डायरेक्टरी में टार फ़ाइल को अनपैक करने के लिए, निम्नलिखित कमांड को रन करें:

```
// You must ensure you are running this command before you start the Bor service on your node.
// If your Bor service has started, please stop the service and run the following command:
// Once unpacking is complete, you can start the Bor service again.

tar -xzvf <snapshot file> -C <BOR_DATA_DIRECTORY>

// If your bor data directory is different
// please replace the directory name in the command for starting the Bor service.
// When this command completes, you may delete the tar file to reclaim space.

// For example, this will unpack the tar file in the Bor data directory:
tar -xzvf bor-fullnode-snapshot-2022-11-08.tar.gz -C /var/lib/bor/data/bor/chaindata
```

:::note

इस `aria2c`तरीके का इस्तेमाल स्नैपशॉट को तेजी से डाउनलोड करने के लिए किया जाता है. एक वैकल्पिक रास्ता है जहां डाउनलोड किए गए स्नैपशॉट को बिना किसी हस्तक्षेप के सीधे निकाल दिया जा सकता है.

**इसके लिए स्टेप्स :**


```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c     https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::