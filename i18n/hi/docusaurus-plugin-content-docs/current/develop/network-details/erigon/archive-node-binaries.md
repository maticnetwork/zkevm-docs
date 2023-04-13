---
id: archive-node-binaries
title: बाइनरी के साथ एक आर्काइव नोड सेट अप करें
sidebar_label: Set up an Archive Node with Binaries
description: अभिलेख नोड को सेट करने के लिए बाइनरी का इस्तेमाल करना
keywords:
  - erigon
  - archive
  - node
  - binary
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

आर्काइव नोड सेट अप करने के लिए, आपको [<ins>बाइनरी के साथ फुल नोड डिप्लॉय करना</ins>](/docs/develop/network-details/full-node-binaries) के समान प्रक्रिया का पालन करना होगा. हालांकि, इसके लिए एक मामूली कॉन्फ़िगरेशन परिवर्तन की जरूरत है. आपको `start.sh` फ़ाइल में निम्न पैरामीटर शामिल करना चाहिए:

```makefile
--gcmode 'archive'
```
