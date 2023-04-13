---
id: archive-node-ansible
title: Ansible के साथ आर्काइव नोड सेट अप करें
sidebar_label: Set up an Archive Node with Ansible
description: अभिलेख नोड को सेट करने के लिए Ansible Ansible का इस्तेमाल कर रहा है
keywords:
  - erigon
  - archive
  - node
  - ansible
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

आर्काइव नोड को सेट करने के लिए, आपको [<ins>एनीमेटेड का इस्तेमाल करके एक पूरी नोड तैनाती</ins>](/docs/develop/network-details/full-node-deployment) के लिए उसी प्रक्रिया का पालन करना होगा. हालांकि, इसके लिए एक मामूली कॉन्फ़िगरेशन परिवर्तन की जरूरत है. आपको फ़ाइल में निम्न पैरामीटर शामिल करना `start.sh`चाहिए:

```makefile
--gcmode 'archive'
```
