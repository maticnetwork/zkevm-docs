---
id: full-node-binaries
title: बायनरी के साथ फ़ुल नोड को रन करें
description: द्वितारों का इस्तेमाल करके एक पूरा पॉलीगॉन नोड तैनात करें
keywords:
  - docs
  - matic
  - polygon
  - node
  - binaries
  - deploy
  - run full node
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

ट्यूटोरियल आपको बताता है कि आप कैसे बायनरी का इस्तेमाल करके एक पूरे नोड को रन कर सकते हैं. सिस्टम की ज़रूरतों के लिए, [न्यूनतम तकनीकी ज़रूरतों](technical-requirements.md) की गाइड को देखें.

:::tip

इस गाइड के स्टेप्स में हेम्डल और बोर सेवाओं के पूरी तरह से सिंक होने का इंतज़ार करना शामिल है. इस प्रक्रिया को पूरा होने में कई दिन लगते हैं.

वैकल्पिक रूप से, आप एक मेन्टेन किए गए स्नैपशॉट का इस्तेमाल कर सकते हैं, जो सिंक करने के समय को कम करके कुछ घंटों तक ले आएगा. विस्तृत निर्देशों के लिए, [<ins>हेम्डल और बोर के लिए स्नैपशॉट निर्देशों</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor) देखें.

स्नैपशॉट डाउनलोड करने के लिंक के लिए, [<ins>पॉलीगॉन चेन्स के स्नैपशॉट</ins>](https://snapshots.polygon.technology/) पेज को देखें.

:::

## ओवरव्यू {#overview}

- मशीन को तैयार करें
- हेम्डल और बोर बायनरी को फ़ुल नोड मशीन पर इंस्टॉल करें
- फ़ुल नोड मशीन पर हेम्डल और बोर सेवाओं को सेट करें
- फ़ुल नोड मशीन को कॉन्फ़िगर करें
- फ़ुल नोड मशीन को शुरू करें
- कम्युनिटी के साथ नोड की हेल्थ की जाँच करें

:::note

आपको एक्शन के सटीक रूपरेखा अनुक्रम का पालन करना होगा, अन्यथा आप मुद्दों में भाग लेंगे.

:::

### इंस्टॉल`build-essential`

यह आपके फ़ुल नोड के लिए **आवश्यक** है. इंस्टॉल करने के लिए, नीचे दिए गए कमांड को रन करें:

```bash
sudo apt-get update
sudo apt-get install build-essential
```

### GO को इंस्टॉल करें {#install-go}

पूरा नोड रन कराने के लिए यह भी **आवश्यक** है. **v1.18 या उससे ऊपर** का वर्ज़न इंस्टॉल करने का सुझाव दिया जाता है.

```bash
wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
bash go-install.sh
sudo ln -nfs ~/.go/bin/go /usr/bin/go
```

## बायनरी इंस्टॉल करें {#install-binaries}

पॉलीगॉन नोड में 2 लेयर होती हैं: हेम्डल और बोर. हेम्डल एक टेंडरमिंट फ़ोर्क है जो एथेरेयम नेटवर्क के समानांतर कॉन्ट्रैक्ट की निगरानी करता है. बुनियादी तौर पर बोर एक Geth फ़ोर्क है जो हेम्डल नोड्स द्वारा शफ़ल किए गए ब्लॉक्स को बनाता है.

फ़ंक्शन को ठीक से रन कराने के लिए दोनों बायनरी को इंस्टॉल करना और रन किया जाना आवश्यक है.

### हेम्डल {#heimdall}

हेम्डल और संबंधित सेवाओं का नवीनतम वर्जन इंस्टॉल करें. सुनिश्चित करें कि आप [रिलीज़ हुए उचित वर्ज़न](https://github.com/maticnetwork/heimdall/releases). से चेकआउट करें. ध्यान दें कि नवीनतम संस्करण, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0) में ऐसे enhancements न्स शामिल होते हैं:
1. स्टेट सिंक txs में डेटा के आकार को इतने तक प्रतिबंधित करना:
    * **30Kb**, **बाइट** में प्रस्तुत किए जाने पर
    * **60Kb** को जब एक **स्ट्रिंग** की तरह प्रस्तुत किया जाता है
2. यह सुनिश्चित करने के लिए कि चेन की प्रगति को बाधित कर सकने वाले इवेंट्स के एकदम से होने की स्थिति में मेमपूल बहुत जल्दी न भर जाए, विभिन्न वैलिडेटरों के कॉन्ट्रैक्ट के इवेंट्स के बीच **देरी का समय** बढ़ाना.

निम्नलिखित उदाहरण से पता चलता है कि डेटा के आकार को कैसे प्रतिबंधित किया जाता है:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

**हेम्डल** को इंस्टॉल करें और नीचे दी गई कमांड्स को रन करें:

```bash
cd ~/
git clone https://github.com/maticnetwork/heimdall
cd heimdall

# Checkout to a proper version, for example
git checkout v0.3.0
git checkout <TAG OR BRANCH>
make install
source ~/.profile
```

यह `heimdalld` और `heimdallcli` बायनरी को इंस्टॉल कर देगा. अपनी मशीन पर हेम्डल वर्जन को जाँचकर इंस्टॉलेशन को वेरिफ़ाई करें:

```bash
heimdalld version --long
```

### बोर {#bor}

बोर का नवीनतम वर्ज़न इंस्टॉल करें. सुनिश्चित करें कि आप सही [वर्जन](https://github.com/maticnetwork/bor/releases) से गिट चेकआउट करें.

```bash
cd ~/
git clone https://github.com/maticnetwork/bor
cd bor

# Checkout to a proper version
# For e.g: git checkout 0.3.3
git checkout <TAG OR BRANCH>
make bor
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

यह `bor` और `bootnode` बायनरी को इंस्टॉल कर देगा. अपनी मशीन पर बोर वर्जन को जाँचकर इंस्टॉलेशन को वेरिफ़ाई करें:

```bash
bor version
```

## नोड फ़ाइलों को कॉन्फ़िगर करें {#configure-node-files}

### लॉन्च रेपो को ढूँढ निकालें {#fetch-launch-repo}

```bash
cd ~/
git clone https://github.com/maticnetwork/launch
```

### लॉन्च डायरेक्टरी को कॉन्फ़िगर करें {#configure-launch-directory}

नेटवर्क डायरेक्टरी को सेट करने के लिए नेटवर्क के नाम और नोड के प्रकार की आवश्यकता होती है.

**उपलब्ध नेटवर्क**: `mainnet-v1` और `testnet-v4`

**नोड का प्रकार**: `sentry`

:::tip

मेननेट और टेस्टनेट का कॉन्फ़िगरेशन करने के लिए, उचित `<network-name>` इस्तेमाल करें. पॉलीगॉन मेननेट के लिए `mainnet-v1` का और मुंबई टेस्टनेट के लिए `testnet-v4` का इस्तेमाल करें.

:::

```bash
cd ~/
mkdir -p node
cp -rf launch/<network-name>/sentry/<node-type>/* ~/node
```

### नेटवर्क डायरेक्टरी को कॉन्फ़िगर करें {#configure-network-directories}

**हेम्डल डेटा सेटअप**

```bash
cd ~/node/heimdall
bash setup.sh
```

**बोर डेटा सेटअप**

```bash
cd ~/node/bor
bash setup.sh
```

## सर्विस फ़ाइलों को कॉन्फ़िगर करें {#configure-service-files}

उपयुक्त का इस्तेमाल करके `service.sh`फ़ाइल डाउनलोड करें`<network-name>` पॉलीगॉन मैनेट के लिए `mainnet-v1` को और मुंबई टेस्टनेट के लिए `testnet-v4` को इस्तेमाल करें.

```bash
cd ~/node
wget https://raw.githubusercontent.com/maticnetwork/launch/master/<network-name>/service.sh
```

**मेटाडेटा** फ़ाइल को जनरेट करें:

```bash
sudo mkdir -p /etc/matic
sudo chmod -R 777 /etc/matic/
touch /etc/matic/metadata
```

`.service`फ़ाइलों को जनरेट करें और उन्हें सिस्टम डायरेक्टरी में कॉपी करें.

```bash
cd ~/node
bash service.sh
sudo cp *.service /etc/systemd/system/
```


## कॉन्फ़िगरेशन फ़ाइलों को सेटअप करें {#setup-config-files}

- रिमोट मशीन में लॉग इन करें / VM
- आपको फ़ाइल में कुछ विवरण जोड़ने की need the `config.toml`होगी. फ़ाइल को खोलने और संपादित करने के `config.toml`लिए, निम्न कमांड को रन करें:`vi ~/.heimdalld/config/config.toml`

    कॉन्फ़िगरेशन फ़ाइल में आपको बदलाव करना होगा, `Moniker` और `seeds` जानकारी जोड़ना होगा:

    ```bash
    moniker=<enter unique identifier>
    # For example, moniker=my-sentry-node

    # Mainnet:
    seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656"

    # Testnet:
    seeds="4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656"
    ```

    - **Pex** की वैल्यू को `true` में बदलें
    - **Prometheus** की वैल्यू को `true` में बदलें
    - `max_open_connections` वैल्यू को `100` में सेट करें

  सुनिश्चित करें कि जब आप उपरोक्त बदलाव करें तो **सही फॉर्मेटिंग बनाए रखें**.

- `~/.heimdalld/config/heimdall-config.toml` में निम्नलिखित को कॉन्फ़िगर करें:

    ```jsx
    eth_rpc_url=<insert Infura or any full node RPC URL to Goerli>
    ```

- इस कमांड का इस्तेमाल करके बोर के लिए `start.sh`फाइल खोलें:`vi ~/node/bor/start.sh` निम्नलिखित फ्लैग्स को जोड़कर पैराम को शुरू करें:

  ```bash
  # Mainnet:
  --bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303"

  # Testnet:
  --bootnodes "enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303"
  ```

- **Archive** मोड को सक्षम करने के लिए आप निम्नलिखित फ़्लैग्स को `start.sh` फ़ाइल में जोड़ सकते हैं:

  ```jsx
  --gcmode 'archive' \
  --ws --ws.port 8546 --ws.addr 0.0.0.0 --ws.origins '*' \
  ```

## सेवाएँ शुरू करें {#start-services}

अपने सेंट्री नोड पर इन कमांड्स के साथ पूरा हेम्डल नोड रन करें:

```bash
sudo service heimdalld start
sudo service heimdalld-rest-server start
```

अब, आपको ये मालूम करने की ज़रूरत है कि पूरे तरीके से **हेम्डल को सिंक किया गया हो** उसके बाद ही बोर को शुरू करें. अगर आप हेम्डल को पूरे तरीके से सिंक किए बिना बोर को शुरू करते हैं तो आपको बार-बार समस्याओं का सामना करना होगा.

**हेम्डल को जाँचने के लिए कि वह सिंक किया गया है या नहीं**
  1. रिमोट मशीन/VM पर `curl localhost:26657/status` को रन करें
  2. आउटपुट में, `catching_up` की वैल्यू `false` होनी चाहिए

एक बार हेम्डल के सिंक होने के बाद नीचे दिए गए कमांड को रन करें:

```bash
sudo service bor start
```

## लॉग {#logs}

लॉग को `journalctl` linux टूल द्वारा मैनेज किया जा सकता है. यहाँ विस्तृत इस्तेमाल के लिए एक ट्यूटोरियल है: [Systemd लॉग को देखने और ज़रूरत के अनुसार इस्तेमाल के लिए, Journalctl का इस्तेमाल कैसे करें](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs).

**हेम्डल नोड के लॉग जाँचें**

```bash
journalctl -u heimdalld.service -f
```

**हेम्डल रेस्ट-सर्वर के लॉग जाँचें**

```bash
journalctl -u heimdalld-rest-server.service -f
```

**बोर रेस्ट-सर्वर के लॉग की जाँच करें**

```bash
journalctl -u bor.service -f
```

## पोर्ट और फ़ायरवॉल का सेटअप {#ports-and-firewall-setup}

26656 और 30303 को दुनिया के (0.0.0.0/0) सेंट्री नोड के फ़ायरवॉल पर 22 पोर्ट खोलें.

आप अपनी ज़रूरतों और सुरक्षा के दिशानिर्देशों के मुताबिक पोर्ट 22 के एक्सेस को प्रतिबंधित करने के लिए VPN का इस्तेमाल कर सकते हैं.
