---
id: run-validator-ansible
title: वैलिडेटर नोड को Ansible के साथ रन करें
sidebar_label: Using Ansible
description: पॉलीगॉन पर अपने वैलिडेटर नोड को सेट करने के लिए Ansible का इस्तेमाल करें
keywords:
  - docs
  - matic
  - polygon
  - ansible
  - node
  - validator
  - sentry
slug: run-validator-ansible
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip

इस गाइड के स्टेप्स में **हेम्डल** और **बोर** सेवाओं के पूरी तरह से सिंक होने का इंतजार करना शामिल है.
यह प्रक्रिया पूरी होने में कई दिन लग जाते हैं. वैकल्पिक रूप से, आप एक अनुरक्षित स्नैपशॉट का इस्तेमाल कर सकते हैं, जो सिंक करने के समय को कम करके कुछ घंटों तक ले आएगा. विस्तृत निर्देशों के लिए, [<ins>हेम्डल और बोर के लिए स्नैपशॉट निर्देशों</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor) देखें.

स्नैपशॉट डाउनलोड लिंक के लिए, [<ins>पॉलीगॉन चेन स्नैपशॉट</ins>](https://snapshot.polygon.technology/) देखें.
:::

यह सेक्शन एंसिबल प्लेबुक के माध्यम से वैलिडेटर नोड को शुरू करने और रन करने के माध्यम से आपको गाइड करता है.

सिस्टम की आवश्यकताओं के लिए, [वैलिडेटर नोड सिस्टम की आवश्यकताएं](validator-node-system-requirements.md) देखें.

यदि आप बायनरी से वैलिडेटर नोड शुरू और रन करना चाहते हैं तो. [बायनरी से वैलिडेटर नोड रन करें](run-validator-binaries.md) देखें.

:::caution

नए वैलिडेटरों को स्वीकार करने के लिए जगह सीमित है. नए वैलिडेटर पहले से ही सक्रिय वैलिडेटर unbonds. में शामिल हो सकते हैं.

:::

## आवश्यक शर्तें {#prerequisites}

* तीन मशीनें — एक स्थानीय मशीन जिस पर आप एंसिबल प्लेबुक रन करेंगे; दो रिमोट मशीनें — एक [सेंट्री](/docs/maintain/glossary.md#sentry) और एक [वैलिडेटर](/docs/maintain/glossary.md#validator).
* स्थानीय मशीन पर, [एंसिबल](https://www.ansible.com/) इंस्टाल है.
* स्थानीय मशीन पर, [Python 3.x](https://www.python.org/downloads/) इंस्टाल है.
* रिमोट मशीनों पर, सुनिश्चित करें कि गो इंस्टाल *नहीं* है.
* रिमोट मशीनों पर, आपकी स्थानीय मशीन की SSH सार्वजनिक की रिमोट मशीन पर है ताकि एंसिबल उनसे कनेक्ट हो सके.
* हमारे पास रीले नेटवर्क के रूप में Bloxroute उपलब्ध है. अगर आपको एक गेटवे की need a है क्योंकि आपका Trusted पियर [पॉलीगॉन Discord](https://discord.com/invite/0xPolygon) में **@वैलिडेटर सपोर्ट टीम** से संपर्क करें > POS वैलिडेटर   पूरा नोड प्रोवाइडर   पार्टनर > bloxroute.

:::info

कृपया अपने नोड्स को bloXroute के गेटवे से जोड़ने के लिए bloXroute के [<ins>निर्देश</ins>](/maintain/validate/bloxroute.md) पर क्लिक करें

:::

## ओवरव्यू {#overview}

:::caution

आपको **एक्शन के सटीक रूपरेखा अनुक्रम** का पालन करना चाहिए, अन्यथा आप मुद्दों में भाग लेंगे. उदाहरण के लिए, **वैलिडेटर नोड से पहले हमेशा एक संतरी नोड को सेट किया जाना चाहिए**.

:::

एक रनिंग वैलिडेटर नोड रन प्राप्त करने के लिए, निम्नलिखित करें:

1. क्या तीन मशीनें तैयार हैं.
1. एंसिबल के माध्यम से एक सेंट्री नोड स्थापित करें.
1. एंसिबल के माध्यम से वैलिडेटर नोड स्थापित करें.
1. सेंट्री नोड कॉन्फ़िगर करें.
1. सेंट्री नोड शुरू करें.
1. वैलिडेटर नोड कॉन्फ़िगर करें.
1. ओनर और साइनर की सेट करें.
1. वैलिडेटर नोड शुरू करें.
1. समुदाय के साथ नोड स्वास्थ्य जाँचें.

## सेंट्री नोड स्थापित करें {#set-up-the-sentry-node}

अपनी स्थानीय मशीन पर, [node-ansible रिपोजिटरी](https://github.com/maticnetwork/node-ansible): को क्लोन करें:

```sh
git clone https://github.com/maticnetwork/node-ansible
```

क्लोन की गई रिपोसिटरी में बदलें:

```sh
cd node-ansible
```

रिमोट मशीनों के IP पते जोड़ें, जो`inventory.yml` फ़ाइल के लिए एक सेंट्री नोड और एक वैलिडेटर नोड बन जाएंगे.

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for sentry node
        xxx.xxx.xx.xx: # <----- Add IP for second sentry node (optional)
    validator:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for validator node
```

उदाहरण:

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        188.166.216.25:
    validator:
      hosts:
        134.209.100.175:
```

जाँचें कि रिमोट सेंट्री मशीन पहुंच योग्य है. स्थानीय मशीन पर, रन करें:

```sh
$ ansible sentry -m ping
```

आपको इसे आउटपुट के रूप में प्राप्त करना चाहिए:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

सेंट्री नोड सेटअप का टेस्ट रन करें:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --list-hosts
```

आउटपुट यह होगी:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

sudo विशेषाधिकार के साथ सेंट्री नोड सेटअप रन करें:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --ask-become-pass
```

सेटअप पूरा होने के बाद, आपको टर्मिनल पर पूरा होने का मैसेज मिलेगा.

:::note

यदि आप किसी समस्या का सामना करते हैं और फिर से शुरू करना चाहते हैं तो इसे रन करें:

```sh
ansible-playbook -l sentry playbooks/clean.yml
```

:::

## वैलिडेटर नोड सेट अप करें {#set-up-the-validator-node}

इस समय, आपके पास सेंट्री नोड स्थापित है.

अपनी स्थानीय मशीन पर, वैलिडेटर नोड सेटअप रन करने के लिए आपके पास एंसिबल प्लेबुक भी है.

जाँचें कि रिमोट वैलिडेटर मशीन पहुंच योग्य है. स्थानीय मशीन पर, रन `ansible validator -m ping`.

आपको इसे आउटपुट के रूप में प्राप्त करना चाहिए:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

वैलिडेटर नोड सेटअप का टेस्ट रन करें:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0 network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --list-hosts
```

आपको इसे आउटपुट के रूप में प्राप्त करना चाहिए:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

sudo विशेषाधिकार के साथ वैलिडेटर नोड सेटअप रन करें:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --ask-become-pass
```

सेटअप पूरा होने के बाद, आपको टर्मिनल पर पूरा होने का मैसेज मिलेगा.

:::note

यदि आप किसी समस्या का सामना करते हैं और फिर से शुरू करना चाहते हैं तो इसे रन करें:

```sh
ansible-playbook -l validator playbooks/clean.yml
```

:::

## सेंट्री नोड कॉन्फ़िगर करें {#configure-the-sentry-node}

रिमोट सेंट्री मशीन में लॉग इन करें.

### हेम्डल सेवा कॉन्फ़िगर करें {#configure-the-heimdall-service}

`vi ~/.heimdalld/config/config.toml` को एडिट करने के लिए`config.toml` खोलें.

निम्नलिखित बदलें:

* `moniker` — कोई भी नाम. उदाहरण:.`moniker = "my-full-node"`
* `seeds` — सीड नोड पतों में एक नोड आईदी, एक IP पता और एक पोर्ट शामिल होता है.

निम्नलिखित वैल्यू इस्तेमाल करें:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — पीर एक्सचेंज चालू करने के लिए वैल्यू को`true` पर सेट करें. उदाहरण:.`pex = true`
* `private_peer_ids` — हेम्डल की नोड आईडी वैलिडेटर मशीन पर स्थापित है.

 वैलिडेटर मशीन पर हेम्डल की नोड आईडी प्राप्त करने के लिए:

  1. वैलिडेटर मशीन में लॉग इन करें.
  1. `heimdalld tendermint show-node-id` रन करें.

 उदाहरण:.`private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`

* `prometheus` — प्रोमेथियस मेट्रिक्स चालू करने के लिए वैल्यू को `true`पर सेट करें. उदाहरण:.`prometheus = true`
* `max_open_connections` — वैल्यू को `100`पर सेट करें. उदाहरण:.`max_open_connections = 100`

`config.toml` में परिवर्तन सहेजें.

### बोर सेवा कॉन्फ़िगर करें {#configure-the-bor-service}

`vi ~/node/bor/start.sh` को एडिट करने के लिए खोलें.

`start.sh` में, अंत में निम्नलिखित लाइन जोड़कर नोड आईडी, IP पता और एक पोर्ट से मिलकर बने बूट नोड पते जोड़ें:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

`start.sh` में परिवर्तन सहेजें.

`vi ~/.bor/data/bor/static-nodes.json` को एडिट करने के लिए खोलें.

`static-nodes.json` में, निम्नलिखित बदलें:

* `"<replace with enode://validator_machine_enodeID@validator_machine_ip:30303>"` — वैलिडेटर मशीन पर बोर सेट अप की नोड आइडी और IP पता.

 वैलिडेटर मशीन पर बोर की नोड आईडी प्राप्त करने के लिए:

  1. वैलिडेटर मशीन में लॉग इन करें.
  1. `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress` रन करें.

 उदाहरण:`"enode://410e359736bcd3a58181cf55d54d4e0bbd6db2939c5f548426be7d18b8fd755a0ceb730fe5cf7510c6fa6f0870e388277c5f4c717af66d53c440feedffb29b4b@134.209.100.175:30303"`

`static-nodes.json` में परिवर्तन सहेजें.

### फायरवॉल कॉन्फ़िगर करें {#configure-firewall}

सेंट्री मशीन में निम्नलिखित पोर्ट सभी के लिए खुले होने चाहिए `0.0.0.0/0`:

* 26656- आपकी हेम्डल सेवा हेम्डल सेवा का उपयोग करते हुए नोड को अन्य नोड्स से कनेक्ट करेगी.

* 30303- आपकी बोर सेवा बोर सेवा का उपयोग करते हुए नोड को अन्य नोड्स से कनेक्ट करेगी.

* 22- वैलिडेटर के लिए वह जहां भी है, वहां से ssh करने में सक्षम होने के लिए.

:::note

हालांकि, अगर वे एक वीपीएन कनेक्शन का उपयोग करते हैं, तो वे केवल वीपीएन IP पते से आने वाले ssh कनेक्शन की अनुमति दे सकते हैं.

:::

## सेंट्री नोड शुरू करें {#start-the-sentry-node}

आप पहले हेम्डल सेवा शुरू करेंगे. हेम्डल सेवा सिंक करने के बाद, आप बोर सेवा शुरू करेंगे.

:::note

हेम्डल सेवा को शुरुआत से पूरी तरह से सिंक करने में कई दिन लग जाते हैं.

वैकल्पिक रूप से, आप एक अनुरक्षित स्नैपशॉट का इस्तेमाल कर सकते हैं, जो सिंक करने के समय को कुछ घंटों तक कर देगा. विस्तृत निर्देश के लिए, [<ins>हेम्डल और बोर के लिए स्नैपशॉट निर्देश</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233) देखें.

स्नैपशॉट डाउनलोड लिंक के लिए, [पॉलीगॉन चेन स्नैपशॉट](https://snapshot.polygon.technology/) देखें.

:::

### हेम्डल सेवा शुरू करें {#start-the-heimdall-service}

नवीनतम संस्करण, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0) में कुछ enhancements The शामिल हैं जैसे :
1. स्टेट सिंक txs में डेटा के आकार को इतने तक प्रतिबंधित करना:
    * **30 Kb** जब **बाइट** में प्रस्तुत किया जाता है
    * **60 Kb** जब **स्ट्रिंग** के रूप में प्रस्तुत किया जाता है.
2. यह सुनिश्चित करने के लिए विभिन्न वैलिडेटरों की अनुबंध घटनाओं के बीच **देरी का समय** बढ़ाने की घटनाओं के एकाएक प्रकट होने की स्थिति में मेमपूल बहुत जल्दी नहीं भरता जो चेन की प्रगति को बाधित कर सकता है.

निम्न उदाहरण से पता चलता है कि डेटा आकार कैसे प्रतिबंधित किया जाता है:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

हेम्डल सेवा शुरू करें:

```sh
sudo service heimdalld start
```

हेम्डल रेस्ट-सर्वर शुरू करें:

```sh
sudo service heimdalld-rest-server start
```

हेम्डल सेवा लॉग जाँचें:

```sh
journalctl -u heimdalld.service -f
```

:::note

लॉग में, आप निम्न गड़बड़ियाँ देख सकते हैं:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

इनका मतलब है कि नेटवर्क की किसी नोड ने आपके नोड से कनेक्ट होने से इनकार कर दिया है. आपको इन गड़बड़ियों के साथ कुछ करने की जरूरत नहीं है. नेटवर्क पर और नोड्स क्रॉल करने के लिए अपने नोड का इंतज़ार करें.

:::

हेम्डल रेस्ट-सर्वर लॉग जाँचें:

```sh
journalctl -u heimdalld-rest-server.service -f
```

हेम्डल की सिंक स्थिति जाँचें:

```sh
curl localhost:26657/status
```

आउटपुट में, `catching_up`वैल्यू यह है:

* `true` — हेम्डल सेवा सिंक कर रही है.
* `false` — हेम्डल सेवा पूरी तरह से सिंक हो गई है.

हेम्डल सेवा के पूरी तरह से सिंक होने का इंतज़ार करें.

### बोर सेवा शुरू करें {#start-the-bor-service}

हेम्डल सेवा के पूरी तरह से सिंक होने के बाद, बोर सेवा शुरू करें.

बोर सेवा शुरू करें:

```sh
sudo service bor start
```

बोर सेवा लॉग जाँचें:

```sh
journalctl -u bor.service -f
```

## वैलिडेटर नोड कॉन्फ़िगर करें {#configure-the-validator-node}

:::note

इस सेक्शन को पूरा करने के लिए, आपको अपने पूरी तरह से सिंक किए गए एथेरेयम मेंनेट नोड के लिए एक RPC एंडपॉइंट तैयार होना चाहिए.

:::

### हेम्डल सेवा कॉन्फ़िगर करें {#configure-the-heimdall-service-1}

रिमोट वैलिडेटर मशीन में लॉग इन करें.

`vi ~/.heimdalld/config/config.toml` को एडिट करने के लिए`config.toml` खोलें.

निम्नलिखित बदलें:

* `moniker` — कोई भी नाम. उदाहरण:.`moniker = "my-validator-node"`
* `pex` — पीयर एक्सचेंज अक्षम करने के लिए वैल्यू को `false`पर सेट करें. उदाहरण:.`pex = false`
* `private_peer_ids` — इसे अक्षम करने के लिए वैल्यू को कमेंट आउट करें. उदाहरण: `# private_peer_ids = ""`


सेंट्री मशीन पर हेम्डल नोड आईडी प्राप्त करने के लिए:

  1. सेंट्री मशीन में लॉग इन करें.
  1. `heimdalld tendermint show-node-id` रन करें.

उदाहरण:`persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — प्रोमेथियस मेट्रिक्स चालू करने के लिए वैल्यू को `true`पर सेट करें. उदाहरण:.`prometheus = true`

`config.toml` में परिवर्तन सहेजें.

`vi ~/.heimdalld/config/heimdall-config.toml` को एडिट करने के लिए खोलें.

`heimdall-config.toml` में, निम्नलिखित बदलें:

* `eth_rpc_url` — पूरी तरह से सिंक किए गए एथेरेयम मेंनेट नोड के लिए एक RPC एंडपॉइंट, यानी Infura. `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

उदाहरण:`eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`


`heimdall-config.toml` में परिवर्तन सहेजें.

### बोर सेवा कॉन्फ़िगर करें {#configure-the-bor-service-1}

`vi ~/.bor/data/bor/static-nodes.json` को एडिट करने के लिए खोलें.

`static-nodes.json` में, निम्नलिखित बदलें:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — सेंट्री मशीन पर बोर का नोड आईडी और आईपी पता स्थापित किया जाता है.

 सेंट्री मशीन पर बोर की नोड आईडी प्राप्त करने के लिए:

  1. सेंट्री मशीन में लॉग इन करें.
  1. `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress` रन करें.

 उदाहरण:`"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`

`static-nodes.json` में परिवर्तन सहेजें.

## ओनर और साइनर की सेट करें {#set-the-owner-and-signer-key}

पॉलीगॉन पर, आपको ओनर और साइनर की अलग रखनी चाहिए.

* साइनर — वह पता जो [चेकपॉइंट ट्रांजैक्शंस](../glossary#checkpoint-transaction) को साइन करता है. साइनर पते पर कम से कम 1 एथ रखने सिफारिश की जाती है.
* ओनर — वह पता जो स्टेकिंग ट्रांजैक्शंस करता है. मैटिक टोकन को ओनर पते पर रखने की सिफारिश की जाती है.

### हेम्डल निजी की बनाएं {#generate-a-heimdall-private-key}

आपको केवल वैलिडेटर मशीन पर हेम्डल निजी की जनरेट करनी चाहिए. **सेंट्री मशीन पर हेम्डल निजी की जनरेट न करें.**

निजी की जनरेट करने के लिए, रन करें:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY - आपकी Ethereum wallet’s की निजी की.

:::

यह `priv_validator_key.json`जनरेट करेगी. जनरेट की गई JSON फ़ाइल को हेम्डल कॉन्फ़िगरेशन डायरेक्टरी में ले जाएं:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### बोर कीस्टोर फ़ाइल जनरेट करें {#generate-a-bor-keystore-file}

आपको केवल वैलिडेटर मशीन पर बोर कीस्टोर फ़ाइल जनरेट करनी चाहिए. **सेंट्री मशीन पर बोर कीस्टोर फ़ाइल जनरेट न करें.**

निजी की जनरेट करने के लिए, रन करें:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

:::note

एथेरेयम निजी की —आपके एथेरेयम वॉलेट की निजी की.

:::

जब प्रांप्ट किए जाने पर कीस्टोर फ़ाइल के लिए पासवर्ड सेट करें.

यह `UTC-<time>-<address>`कीस्टोर फ़ाइल जनरेट करेगा.

जनरेट की गई कीस्टोर फ़ाइल को बोर कॉन्फ़िगरेशन डायरेक्टरी में ले जाएं:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### जोड़ें`password.txt`

एक `password.txt` फ़ाइल बनाना सुनिश्चित करें फिर बोर कीस्टोर फ़ाइल पासवर्ड को `~/.bor/password.txt` फ़ाइल में जोड़ें.

### अपना एथेरेयम पता जोड़ें {#add-your-ethereum-address}

`vi /etc/matic/metadata` को एडिट करने के लिए खोलें.

`metadata` में, एथेरेयम पता जोड़ें. उदाहरण:.`VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`

`metadata` में परिवर्तन सहेजें.

## वैलिडेटर नोड शुरू करें {#start-the-validator-node}

इस समय, आपके पास:

* सेंट्री मशीन पर हेम्डल सेवा पूरी तरह से सिंक हो और यह रन करनी चाहिए.
* सेंट्री मशीन पर बोर सेवा रन करनी चाहिए.
* वैलिडेटर मशीन पर हेम्डल सेवा और बोर सेवा कॉन्फ़िगर होनी चाहिए.
* आपकी ओनर और साइनर की कॉन्फ़िगर होनी चाहिए.

### हेम्डल सेवा शुरू करें {#start-the-heimdall-service-1}

अब आप वैलिडेटर मशीन पर हेम्डल सेवा शुरू करेंगे. हेम्डल सेवा सिंक होने के बाद, आप वैलिडेटर मशीन पर बोर सेवा शुरू करेंगे.

हेम्डल सेवा शुरू करें:

```sh
sudo service heimdalld start
```

हेम्डल रेस्ट-सर्वर शुरू करें:

```sh
sudo service heimdalld-rest-server start
```

हेम्डल ब्रिज शुरू करें:

```sh
sudo service heimdalld-bridge start
```

हेम्डल सेवा लॉग जाँचें:

```sh
journalctl -u heimdalld.service -f
```

हेम्डल रेस्ट-सर्वर लॉग जाँचें:

```sh
journalctl -u heimdalld-rest-server.service -f
```

हेम्डल ब्रिज लॉग जाँचें:

```sh
journalctl -u heimdalld-bridge.service -f
```

हेम्डल की सिंक स्थिति जाँचें:

```sh
curl localhost:26657/status
```

आउटपुट में, `catching_up`वैल्यू यह है:

* `true` — हेम्डल सेवा सिंक कर रही है.
* `false` — हेम्डल सेवा पूरी तरह से सिंक हो गई है.

हेम्डल सेवा के पूरी तरह से सिंक होने का इंतज़ार करें.

### बोर सेवा शुरू करें {#start-the-bor-service-1}

वैलिडेटर मशीन पर हेम्डल सेवा पूरी तरह से सिंक होने के बाद, वैलिडेटर मशीन पर बोर सेवा शुरू करें.

बोर सेवा शुरू करें:

```sh
sudo service bor start
```

बोर सेवा लॉग जाँचें:

```sh
journalctl -u bor.service -f
```

## कम्युनिटी के साथ नोड की हेल्थ की जाँच करें {#check-node-health-with-the-community}

अब जब कि आपके सेंट्री और वैलिडेटर नोड्स सिंक हो गए हैं और रन कर रहे हैं, तो [Discord](https://discord.com/invite/0xPolygon) पर जाएँ और समुदाय से अपनी नोड्स के स्वास्थ्य की जांच करने के लिए कहें.

:::note

वैलिडेटर्स के रूप में, हमेशा signer पते की जांच करना अनिवार्य होता है. अगर ET का संतुलन 0.5 ET से नीचे पहुंच जाता है, तो उसे रिफिल किया जाना चाहिए. इससे बचने से नोड्स को चेकपॉइंट Avoiding जमा करने से बाहर निकाल दिया जाएगा.

:::

## स्टेकिंग करने के लिए आगे बढ़ें {#proceed-to-staking}

अब जब कि आपके सेंट्री और वैलिडेटर नोड्स के स्वास्थ्य की जांच हो गई है, तो [स्टेकिंग](/docs/maintain/validator/core-components/staking) करने के लिए आगे बढ़ें.
