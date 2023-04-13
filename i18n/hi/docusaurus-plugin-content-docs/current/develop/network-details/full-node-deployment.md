---
id: full-node-deployment
title: एंसिबल के साथ पूरा नोड रन करें
description: Ansible का इस्तेमाल करके पूरा नोड डिप्लॉय करें
keywords:
  - docs
  - polygon
  - matic
  - node
  - full node setup
  - ansible
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

यह प्रशिक्षण एंसिबल को काम में लेते हुए पूरा नोड शुरू करने और रन करने के लिए मार्गदर्शन करता है.

करने के लिए [एक Ansible Ansible प्लेबुक](https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html) का इस्तेमाल किया जाता है. एक पूरी नोड को कॉन्फ़िगर और मैनेज करें. सिस्टम की आवश्यकताओं के लिए [न्यूनतम तकनीकी आवश्यकताएँ](technical-requirements.md) गाइड देखें.

:::tip

इस गाइड के स्टेप हेम्डल और बोर सेवाओं के पूरी तरह से सिंक होने का इंतज़ार करने को शामिल करते हैं. इस प्रक्रिया को पूरा होने में कई दिन लगते हैं.

वैकल्पिक रूप से, आप एक मेंटेन किए हुए स्नैपशॉट का इस्तेमाल करके, सिंक समय को कुछ ही घंटों का कर सकते हैं. विस्तृत निर्देशों के लिए, [<ins>हेम्डल और बोर के लिए स्नैपशॉट निर्देश</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor) देखें.

स्नैपशॉट डाउनलोड लिंक के लिए [<ins>Polygon Chains Snapshots</ins>](https://snapshot.polygon.technology/) पेज देखें.

:::

## आवश्यक शर्तें {#prerequisites}

- Python3.x के साथ अपनी स्थानीय मशीन पर एंसिबल इंस्टॉल करें. अगर आपके पास Python2.x है तो सेट अप काम नहीं करेगा.
    - Python 3x के साथ एंसिबल इंस्टॉल करने के लिए आप pip का इस्तेमाल कर सकते हैं. अगर आपके मशीन पर pip pip नहीं होती है, [यहाँ](https://pip.pypa.io/en/stable/) की रूपरेखा का पालन करें. इंस्टॉल करने के `pip3 install ansible`लिए रन नहीं.
- के लिए [पॉलीगॉन PoS Ansible Ansible रिपोजिटरी](https://github.com/maticnetwork/node-ansible#requirements) की जांच करें आवश्यकताओं.
- आपको यह भी सुनिश्चित करना होगा कि Go आपके वातावरण में **इंस्टॉल नहीं** किया गया हो. आप मुद्दों में रन करेंगे अगर आप को स्थापित गो के साथ Ansible Ansible के माध्यम से अपना पूरा नोड सेट करने का प्रयास करें क्योंकि Ansible को स्थापित करने के लिए गो के विशिष्ट संकुल की आवश्यकता होती है.
- आपको यह भी सुनिश्चित करने की ज़रूरत है कि आपके वीएम / मशीन में पॉलीगॉन वैलिडेटर या हेम्डल या बोर के लिए पहले से कोई सेट अप नहीं है. आपको उन्हें डिलीट करना होगा क्योंकि आपका सेटअप में समस्याएँ आ जाएंगी.

:::info हेम्डल सोर्स सुधार

नवीनतम Heimdall संस्करण, **[v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0)** में कुछ enhancements. शामिल हैं. विभिन्न वैलिडेटर्स के कॉन्ट्रैक्ट इवेंट के बीच देरी का समय **बढ़ा दिया गया** है, ताकि यह सुनिश्चित किया जा सके कि mempool भरा न हो जल्द ही उन घटनाओं के फटने की स्थिति में, जो चेन की प्रगति को बाधित कर सकते हैं.

इसके अतिरिक्त, डेटा साइज **को स्टेट सिंक ट्रांज़ैक्शनों में 30KB (बाइट के रूप में प्रदर्शित करने पर) और 60KB (स्ट्रिंग के रूप में परिभाषित करने पर) तक सीमित किया गया है**.
उदाहरण के लिए:

```bash
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```
:::

## फ़ुल नोड सेट अप {#full-node-setup}

- सुनिश्चित करें कि आपके पास रिमोट मशीन या वीएम का एक्सेस है जिस पर पूरे नोड का सेट अप किया जा रहा है.
  > और ज़्यादा विवरण के लिए [https://github.com/maticnetwork/node-ansible#setup](https://github.com/maticnetwork/node-ansible#setup) देखें.
- [https://github.com/maticnetwork/node-ansible](https://github.com/maticnetwork/node-ansible) रिपोजिटरी को क्लोन करें
- node-ansible फोल्डर में जाएँ: `cd node-ansible`
- `inventory.yml` फ़ाइल का संपादन करें और अपने आई पी `sentry->hosts` भाग में डालें.
  > और ज़्यादा विवरण के लिए [https://github.com/maticnetwork/node-ansible#inventory](https://github.com/maticnetwork/node-ansible#inventory) देखें.
- जाँचें कि क्या रिमोट मशीन को रन देकर रीसर्च किया जा सकता है:`ansible sentry -m ping`
- सही मशीन को कॉन्फ़िगर किया गया है या नहीं यह टेस्ट करने के लिए निम्नलिखित कमांड रन करें:

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry" --list-hosts

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry" --list-hosts
  ```

  <img src={useBaseUrl("img/network/full-node-mumbai.png")} />

- इसके बाद, इस कमांड से फ़ुल नोड सेट अप करें:

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry"

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry"
  ```

- अगर आप किसी भी मुद्दे में रन बनाते हैं, तो पूरे सेटअप को using: करने को डिलीट करें और साफ करें :
  ```
  ansible-playbook playbooks/clean.yml
  ```

- एंसिबल प्लेबुक शुरू करने के बाद, रिमोट मशीन में लॉग इन करें.

- Heimdall के बीज नोड्स:

  ```bash
  moniker=<enter unique identifier>

  # Mainnet:
  seeds="d3a8990f61bb3657da1664fe437d4993c4599a7e@3.211.248.31:26656,d3d7d397339c9126235dfab11bf925e269776f4f@3.212.183.151:26656,68254d33685fad151e45bfe1ed33d538ba6ec8cb@3.93.224.197:26656,d26c54ebbf274896f12977bb13d83ac1237a8226@184.73.124.158:26656,f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656"

  # Testnet:
  seeds="b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656,4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,7a6c7b5d25b13ce3448b047dbebeb1a19cc2e092@18.213.200.99:26656"
  ```
- Bootnodes:

  ```bash
  # Mainnet:
  bootnode ["enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303","enode://4be7248c3a12c5f95d4ef5fff37f7c44ad1072fdb59701b2e5987c5f3846ef448ce7eabc941c5575b13db0fb016552c1fa5cca0dda1a8008cf6d63874c0f3eb7@3.93.224.197:30303","enode://32dd20eaf75513cf84ffc9940972ab17a62e88ea753b0780ea5eca9f40f9254064dacb99508337043d944c2a41b561a17deaad45c53ea0be02663e55e6a302b2@3.212.183.151:30303"]

  # Testnet:
  bootnodes ["enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303","enode://f0f48a8781629f95ff02606081e6e43e4aebd503f3d07fc931fad7dd5ca1ba52bd849a6f6c3be0e375cf13c9ae04d859c4a9ae3546dc8ed4f10aa5dbb47d4998@34.226.134.117:30303"]
  ```

- हेम्डल को जाँचने के लिए कि वह सिंक किया गया है या नहीं
    - रिमोट मशीन/VM पर `curl localhost:26657/status` को रन करें
    - आउटपुट में, `catching_up` की वैल्यू `false` होनी चाहिए

- हेम्डल के सिंक होने के बाद, रन
    - `sudo service bor start`

आपने एंसिबल के साथ फ़ुल नोड का सेट अप सफलतापूर्वक कर लिया है.

:::note

अगर बोर डेटा की अनुमति की एक त्रुटि पेश करता है, तो इस कमांड को उस बोर के यूजर को बोर की फ़ाइलों का मालिक बनाने के लिए रन करें

```bash
sudo chown bor /var/lib/bor
```

:::
## लॉग {#logs}

लॉग को `journalctl` linux टूल द्वारा मैनेज किया जा सकता है. यहाँ विस्तृत इस्तेमाल के लिए एक ट्यूटोरियल है: [Systemd लॉग को देखने और ज़रूरत के अनुसार इस्तेमाल के लिए, Journalctl का इस्तेमाल कैसे करें](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs).

**हेम्डल नोड के लॉग जाँचें**

```bash
journalctl -u heimdalld.service -f
```

**बोर रेस्ट-सर्वर के लॉग जाँचें**

```bash
journalctl -u bor.service -f
```

## पोर्ट और फ़ायरवॉल का सेटअप {#ports-and-firewall-setup}

26656 और 30303 को दुनिया के (0.0.0.0/0) सेंट्री नोड के फ़ायरवॉल पर 22 पोर्ट खोलें.

आप अपनी ज़रूरतों और सुरक्षा के दिशानिर्देशों के मुताबिक पोर्ट 22 के एक्सेस को प्रतिबंधित करने के लिए VPN का इस्तेमाल कर सकते हैं.