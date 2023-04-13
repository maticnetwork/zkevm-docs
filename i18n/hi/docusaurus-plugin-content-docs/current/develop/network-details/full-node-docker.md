---
id: full-node-docker
title: डॉकर के साथ एक पूरा नोड रन करें
sidebar_label: Run a full node with Docker
description:  डॉकर का इस्तेमाल करके पूरा नोड चलाने का गाइड
keywords:
  - docs
  - matic
  - docker
  - full node
  - polygon
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

पॉलीगॉन टीम, आधिकारिक डॉकर इमेजेस वितरित करती है जिसका इस्तेमाल पॉलीगॉन मेननेट पर नोड को रन करने के लिए किया जा सकता है. ये निर्देश एक पूरे नोड को रन करने के लिए है, लेकिन इन्हें सेंट्री नोड और वैलिडेटर्स को रन करने के लिए भी अनुकूलित किया जा सकता है.

:::tip स्नैपशॉट्स

आप पाएंगे कि खरोंच से सिंक को बहुत लंबे समय तक ले जा सकते हैं. अगर आप प्रक्रिया को गति देना चाहते हैं, तो आप यहाँ सूचीबद्ध निर्देशों का पालन कर सकते हैं: [<ins>Heimdall और बोर के लिए स्नैपशॉट निर्देश</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor)

यह अभी तक के सबसे अप टू डेट निर्देश हैं, लेकिन आप मोटे तौर पर नीचे दिए स्टेप्स जैसा भी कुछ कर सकते हैं:
```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# at this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```

इस `aria2c`तरीके का इस्तेमाल स्नैपशॉट को तेजी से डाउनलोड करने के लिए किया जाता है. एक वैकल्पिक रास्ता है जहां डाउनलोड किए गए स्नैपशॉट को बिना किसी हस्तक्षेप के सीधे निकाल दिया जा सकता है.

**इसके लिए स्टेप्स :**

```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::

## आवश्यक शर्तें {#prerequisites}

पॉलीगॉन नोड को रन करने के लिए सामान्य कॉन्फ़िगरेशन में आपके पास **कम से कम** 4 CPUs/कोर और 16 GB का RAM होना चाहिए. इस ट्यूटोरियल के लिए, हम AWS और एक `t3.2xlarge` इंस्टैंस टाइप का इस्तेमाल करेंगे. यह ऐप्लिकेशन x86 और Arm आर्किटेक्चर दोनों पर रन कर सकता है.

ये निर्देश डॉकर पर आधारित हैं, इसलिए ये लगभग सभी ऑपरेटिंग सिस्टम पर फ़ॉलो किए जा सकते हैं, लेकिन हम Ubuntu का इस्तेमाल कर रहे हैं.

अंतरिक्ष के संदर्भ में, एक पूर्ण नोड के लिए, आपको **शायद एसएसडी (या तेज) के 2.5 से 5 टेराबाइट्स की** जरूरत होगी.

पॉलीगॉन के पूरे नोड का पीयर एक्सचेंज आमतौर पर पोर्ट 30303 और 26656 के खुले होने पर निर्भर करता है. जब आप AWS के लिए अपनी फायरवॉल या सुरक्षा समूहों को कॉन्फ़िगर करते हैं, तो सुनिश्चित करें कि मशीन को एक्सेस करने के लिए जो भी पोर्ट आपको चाहिए उसके साथ ये पोर्ट खुले हैं.

TLDR:

- कम से कम 4 कोर और 16GB की RAM वाली मशीन का इस्तेमाल करें
- सुनिश्चित करें कि आपके पास 2.5 टीबी से लेकर 5 टीबी तक तेज स्टोरेज
- पब्लिक IP और खुलें 30303 और 26656 पोर्ट का इस्तेमाल करें

## प्रारंभिक सेटअप {#initial-setup}
इस बिंदु पर, आपके पास एक linux मशीन के लिए रुट विशेषाधिकारों के साथ शेल एक्सेस होना चाहिए.

![img](/img/full-node-docker/term-access.png)

### डॉकर इंस्टॉल करें {#install-docker}
सबसे अधिक संभावना है कि आपके ऑपरेटिंग सिस्टम में बाय डिफ़ॉल्ट डॉकर इंस्टॉल नहीं होगा. अपने किसी खास वितरण के लिए कृपया यहाँ पाए गए निर्देशों का पालन करें:- https://docs.docker.com/engine/install/

हम Ubuntu के निर्देशों का पालन कर रहे हैं. स्टेप्स को नीचे शामिल किया गया है, लेकिन अगर आधिकारिक निर्देश अपडेट किए गए हैं तो कृपया उन्हें देख लें.

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

इस बिंदु पर आपको डॉकर इंस्टॉल कर लेना चाहिए. वेरिफ़ाई करने के लिए, आपको इस तरह की एक कमांड को रन करने में सक्षम होना चाहिए:

```bash
sudo docker run hello-world
```

![img](/img/full-node-docker/hello-world.png)

कई मामलों में, डॉकर को `root` यूज़र के रूप में रन करना असुविधाजनक होता है इसलिए हम बिना `root` की ज़रूरत के डॉकर से इंटरैक्ट करने के लिए, इंस्टॉल करने के बाद के स्टेप्स को [यहाँ](https://docs.docker.com/engine/install/linux-postinstall/) फ़ॉलो करेंगे:

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

अब आप `sudo` के बिना लॉग आउट एवं दोबारा लॉग इन करने और डॉकर कमांड को रन करने में सक्षम होंगे.

### डिस्क सेटअप {#disk-setup}
यहाँ पर आवश्यक स्टेप्स, काफ़ी हद तक आपकी ज़रूरतों के आधार पर भिन्न हो सकते हैं. सबसे ज़्यादा संभावना है कि आपके पास रुट पार्टीशन होगा जो एक डिवाइस पर आपके ऑपरेटिंग सिस्टम को चला रहा होगा. आप शायद ब्लॉकचेन डेटा को होल्ड करने के लिए सच में एक या अधिक डिवाइस चाहते हों. बाकी के वॉक थ्रू के लिए हम वह अतिरिक्त डिवाइस भी जोड़ेंगे जो `/mnt/data` पर माउंट होगा.

इस उदाहरण में, हमारे पास उपलब्ध अंतरिक्ष की 4 टीबी के साथ डिवाइस `/dev/nvme1n1`है. हम नीचे के स्टेप्स का इस्तेमाल करके उस माउंट करने जा रहे हैं:

```bash
sudo mkdir /mnt/data
sudo mount /dev/nvme1n1 /mnt/data
```

हम `df -h` इस्तेमाल कर रहे हैं ताकि, सुनिश्चित कर सकें कि यह ठीक तरह से माउंट हो.

![img](/img/full-node-docker/space.png)

अगर ये सब ठीक रहता है, तो हम बोर और हेम्डल के लिए इस माउंट पर होम डायरेक्टरी भी बना पाएँगे.

```bash
sudo mkdir /mnt/data/bor
sudo mkdir /mnt/data/heimdall
```

आपके इस्तेमाल करने के मामले और ऑपरेटिंग सिस्टम के आधार पर, संभावना है कि आप `/etc/fstab` में एंट्री करना पसंद करें ताकि आप यह सुनिश्चित कर सकें कि जब सिस्टम रिबूट हो तो आपकी डिवाइस माउंट की जा चुकी हो.

यहाँ हम इस तरह के कुछ स्टेप्स को फ़ॉलो कर रहे हैं:

```bash
# Use blkid to get the UUID for the device that we're mounting
blkid

# Edit the fstab file  and add a line to mount your device
# UUID={your uuid}		/mnt/data	{your filesystem}	defaults	0	1
sudo emacs /etc/fstab

# use this to verify the fstab actually works
sudo findmnt --verify --verbose
```

इस बिंदु पर आपको रिबूट करने और यह पुष्टि करने में सक्षम होना चाहिए कि सिस्टम ने आपके माउंट को ठीक से लोड कर लिया है.

### हेम्डल सेटअप {#heimdall-setup}

इस बिंदु पर, हमारे पास डॉकर के साथ एक होस्ट है जो इस पर रन कर रहा है और हमारे पास अपने पॉलीगॉन नोड के सॉफ़्टवेयर को चलाने के लिए माउन्ट की गई काफ़ी स्टोरेज है. तो आइए, हेम्डल को कॉन्फ़िगर करें और रन करें.

पहले आइए, सुनिश्चित करें कि हम हेम्डल को डॉकर के साथ रन कर सकते हैं. नीचे दी गई कमांड रन करें:

```bash
docker run -it 0xpolygon/heimdall:0.3.0 heimdallcli version
```

अगर यह पहली बार है जब आपने हेम्डल को डॉकर के साथ रन किया है, तो इसे आवश्यक इमेज को अपने आप खींच लेना चाहिए और इसके वर्ज़न की जानकारी का आउटपुट देना चाहिए.

![img](/img/full-node-docker/heimdall-version.png)

अगर आप हेम्डल इमेज के विवरण की जाँच करना चाहते हैं या एक अलग टैग को खोजना चाहते हैं तो आप डॉकर हब में रिपॉज़िटरी पर एक नज़र डाल सकते हैं: https://hub.docker.com/repository/docker/0xpolygon/heimdall

इस बिंदु पर आइए, अपनी होम डायरेक्टरी को सेट करने के लिए हेम्डल `init` कमांड को रन करें.

```bash
docker run -v /mnt/data/heimdall:/heimdall-home:rw --entrypoint /usr/bin/heimdalld -it 0xpolygon/heimdall:0.3.0 init --home=/heimdall-home
```

इस कमांड को कुछ भी गलत हो जाने पर नीचे कर दिया जाता है.

* हम डॉकर के माध्यम से कमांड को चलाने के `docker run`लिए इस्तेमाल कर रहे हैं.

* `-v /mnt/data/heimdall:/heimdall-home:rw` स्विच बहुत महत्वपूर्ण है. यह फ़ोल्डर को माउन्ट कर रहा है कि हमने पहले अपने होस्ट सिस्टम `/mnt/data/heimdall`से कंटेनर के `/heimdall-home`भीतर एक डॉकर वॉल्यूम के रूप में पैदा किया था.

* `rw` कमांड इस डॉकर वॉल्यूम पर लिखने की अनुमति देता है. सभी इंटेंट और प्रयोजनों के लिए, डॉकर कंटेनर के भीतर से, Heimdall के लिए होम डायरेक्टरी `/heimdall-home`होगी.

* यह तर्क इस कंटेनर के लिए डिफॉल्ट एंट्री पॉइंट को ओवरराइड कर रहा `--entrypoint /usr/bin/heimdalld`है.

* स्विच का इस्तेमाल कमांड को इंटरएक्टिव रूप से चलाने के लिए किया जाता `-it`है.

* अंत में हम निर्दिष्ट कर रहे हैं कि हम किस इमेज को लेकर चलना चाहते `0xpolygon/heimdall:0.3.0`हैं.

* उसके बाद `init --home=/heimdall-home` वे आर्ग्युमेंट हैं जो हेम्डल आईडी एक्जीक्यूटेबल को पास की जा रही हैं. `init` वह कमांड है जिसे हम रन करना चाहते हैं और `--home`.को होम डायरेक्टरी की लोकेशन को स्पष्ट करने के लिए इस्तेमाल जाता है.

`init` कमांड को रन करने के बाद, आपकी `/mnt/data/heimdall` डायरेक्टरी में कुछ स्ट्रक्चर होना चाहिए और इस तरह का दिखना चाहिए:

![img](/img/full-node-docker/heimdall-tree.png)

अब हमें हेम्डल को शुरू करने से पहले कुछ अपडेट करने की ज़रूरत है. पहले हम `config.toml` फ़ाइल को एडिट करने जा रहे हैं.

```bash
# Open the config.toml and and make three edits
# moniker = "YOUR NODE NAME HERE"
# laddr = "tcp://0.0.0.0:26657"
# seeds = "LATEST LIST OF SEEDS"

sudo emacs /mnt/data/heimdall/config/config.toml
```

अगर आपके पास सीड्स की सूची नहीं है, तो आप पूरे नोड को सेट करने के लिए डॉक्यूमेंटेशन में से एक ढूँढ सकते हैं. हमारे मामले में, हमारी फ़ाइल में ये तीन लाइनें हैं:

```
# A custom human readable name for this node
moniker="examplenode01"

# TCP or UNIX socket address for the RPC server to listen on
laddr = "tcp://0.0.0.0:26657"

# Comma separated list of seed nodes to connect to
seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
```

:::caution

फ़ाइल के `laddr`अंदर दो `config.toml`हैं. सुनिश्चित करें कि आप सेक्शन के तहत `laddr`पैरामीटर को ही बदल `[rpc]`दें.

:::

अब क्योंकि आपकी `config.toml` फ़ाइल सेट है, आपको अपनी `heimdall-config.toml` फ़ाइल में दो छोटे बदलाव करने की ज़रूरत होगी. इन दोनों सेटिंग्स को अपडेट करने के लिए अपने पसंदीदा एडिटर का इस्तेमाल करें:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "http://localhost:9545"

# RPC endpoint for bor chain
bor_rpc_url = "http://localhost:8545"
```

एथेरेयम मेननेट RPC के लिए आप जो भी URL इस्तेमाल करते हैं उसे `eth_rpc_url` से अपडेट किया जाना चाहिए. हमारे मामले `bor_rpc_url`में को अपडेट करने जा रहा है .`http://bor:8545` edits, बनाने के बाद, हमारी फाइल में ये लाइन होती है:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "https://eth-mainnet.g.alchemy.com/v2/ydmGjsREDACTED_DONT_USE9t7FSf"

# RPC endpoint for bor chain
bor_rpc_url = "http://bor:8545"
```

डिफ़ॉल्ट `init` कमांड एक `genesis.json` प्रदान करता है लेकिन यह पॉलीगॉन मेननेट या मुंबई के साथ काम नहीं करेगा. अगर आप एक मेननेट नोड सेट कर रहे हैं, तो आप सही जेनेसिस फ़ाइल को डाउनलोड करने के लिए इस कमांड को रन कर सकते हैं:

```bash
sudo curl -o /mnt/data/heimdall/config/genesis.json https://raw.githubusercontent.com/maticnetwork/heimdall/master/builder/files/genesis-mainnet-v1.json
```

अगर आप यह वेरिफ़ाई करना चाहते हैं कि आपके पास सही फ़ाइल है, तो आप इस हैश के खिलाफ़ जाँच सकते हैं:

```
# sha256sum genesis.json
498669113c72864002c101f65cd30b9d6b159ea2ed4de24169f1c6de5bcccf14  genesis.json
```

## हेम्डल शुरू कर रहा है {#starting-heimdall}
हेम्डल शुरू करने से पहले, हम एक डॉकर नेटवर्क बनाने जा रहे हैं ताकि कंटेनर्स नाम के आधार पर एक दूसरे के साथ आसानी से जुड़ सकें. नेटवर्क बनाने के लिए, निम्नलिखित कमांड को रन करें:

```bash
docker network create polygon
```

अब हम हेम्डल शुरू करने जा रहे हैं. नीचे दी गई कमांड रन करें:

```bash
docker run -p 26657:26657 -p 26656:26656 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdall --entrypoint /usr/bin/heimdalld -d --restart unless-stopped  0xpolygon/heimdall:0.3.0 start --home=/heimdall-home
```

इस कमांड के कई हिस्से परिचित दिखेंगे. तो आइए बात करें कि क्या नया है.

* `-p 26657:26657` और `-p 26656:26656` स्विच, पोर्ट मैपिंग हैं. इससे डॉकर को कंटेनर `26657`पोर्ट `26657`को मैप करने और उसी के लिए एक ही`26656`

* `--net polygon`स्विच पॉलीगॉन नेटवर्क में इस कंटेनर को चलाने के लिए डॉकर को बता रहा है.

* `--name heimdall` कंटेनर का नामकरण जो डीबगिंग के लिए उपयोगी है, लेकिन यह सभी नाम है जिसका इस्तेमाल हेम्डल से जोड़ने के लिए अन्य कंटेनरों के लिए किया जाएगा.

* यह `-d`तर्क डॉकर को पृष्ठभूमि में इस कंटेनर को चलाने के लिए बताता है.

* स्विच डॉकर को बताता है कि जब तक कि इसे मैन्युअल रूप से रोक नहीं लिया जाता है, तब तक कंटेनर को स्वतः फिर से शुरू कर `--restart unless-stopped`दिया जाता है.

* अंत में, का इस्तेमाल वास्तव में एप्लिकेशन को रन करने के लिए किया जा रहा है, `init`जिसके बजाय सिर्फ होम डायरेक्टरी को सेट किया `start`जाता है.

इस बिंदु पर, यह जाँचना और देखना मददगार साबित होता है कि क्या चल रहा है. ये दोनों कमांड उपयोगी हो सकते हैं:

```bash
# ps will list the running docker processes. At this point you should see one container running
docker ps

# This command will print out the logs directly from the heimdall application
docker logs -ft heimdall
```

इस बिंदु पर, हेम्डल को सिंक करना शुरू कर देना चाहिए. जब आप लॉग को देखते हैं, तो आपको जानकारी का लॉग आउट हो रहा है जो इस तरह दिखता है:

```
2022-12-14T19:43:23.687640820Z INFO [2022-12-14|19:43:23.687] Executed block                               module=state height=26079 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.721220869Z INFO [2022-12-14|19:43:23.721] Committed state                              module=state height=26079 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.730533414Z INFO [2022-12-14|19:43:23.730] Executed block                               module=state height=26080 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.756646938Z INFO [2022-12-14|19:43:23.756] Committed state                              module=state height=26080 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.768129711Z INFO [2022-12-14|19:43:23.767] Executed block                               module=state height=26081 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.794323918Z INFO [2022-12-14|19:43:23.794] Committed state                              module=state height=26081 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.802989809Z INFO [2022-12-14|19:43:23.802] Executed block                               module=state height=26082 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.830960386Z INFO [2022-12-14|19:43:23.830] Committed state                              module=state height=26082 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.840941976Z INFO [2022-12-14|19:43:23.840] Executed block                               module=state height=26083 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.866564767Z INFO [2022-12-14|19:43:23.866] Committed state                              module=state height=26083 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.875395744Z INFO [2022-12-14|19:43:23.875] Executed block                               module=state height=26084 validTxs=0 invalidTxs=0
```

अगर आप इस तरह की कोई जानकारी नहीं देख रहे हैं, तो आपका नोड शायद पर्याप्त पीयर नहीं ढूँढ पा रहा है. इस बिंदु पर दूसरी उपयोगी कमांड, हेम्डल सिंकिंग की स्थिति जाँचने के लिए एक RPC कॉल करने के लिए है:

```bash
curl localhost:26657/status
```

यह इस तरह की एक प्रतिक्रिया मिलेगी:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "node_info": {
      "protocol_version": {
        "p2p": "7",
        "block": "10",
        "app": "0"
      },
      "id": "0698e2f205de0ffbe4ca215e19b2ee7275d2c334",
      "listen_addr": "tcp://0.0.0.0:26656",
      "network": "heimdall-137",
      "version": "0.32.7",
      "channels": "4020212223303800",
      "moniker": "examplenode01",
      "other": {
        "tx_index": "on",
        "rpc_address": "tcp://0.0.0.0:26657"
      }
    },
    "sync_info": {
      "latest_block_hash": "812700055F33B175CF90C870B740D01B0C5B5DCB8D22376D2954E1859AF30458",
      "latest_app_hash": "83A1568E85A1D942D37FE5415F3FB3CBD9DFD846A42CBC247DFD6ABB9CE7E606",
      "latest_block_height": "16130",
      "latest_block_time": "2020-05-31T17:06:31.350723885Z",
      "catching_up": true
    },
    "validator_info": {
      "address": "3C6058AF387BB74D574582C2BEEF377E7A4C0238",
      "pub_key": {
        "type": "tendermint/PubKeySecp256k1",
        "value": "BOIKA6z1q3l5iSJoaAiagWpwUw3taAhiEMyZ9ffxAMznas2GU1giD5YmtnrB6jzp4kkIqv4tOmuGYILSdy9+wYI="
      },
      "voting_power": "0"
    }
  }
}
```

इस शुरुआती सेटअप चरण में, `sync_info` फील्ड पर ध्यान पर ध्यान देना बहुत ज़रूरी है. अगर `catching_up` सच है, तो इसका मतलब है हेम्डल पूरी तरह से सिंक नहीं किया गया है. आप `sync_info` के भीतर अन्य चीज़ों को जाँच सकते हैं ताकि यह जाना जा सके कि हेम्डल कितना पीछे है.

## बोर शुरू कर रहा है {#starting-bor}

इस बिंदु पर, आपके पास हेम्डल को सफलतापूर्वक रन कराने के लिए एक नोड होना चाहिए. अब आपको बोर को रन करने के लिए तैयार रहना चाहिए.

बोर के साथ शुरू करने से पहले, हमें हेम्डल रेस्ट सर्वर को रन करने की ज़रुरत है. यह कमांड एक REST API शुरू करेगी जो बोर, हेम्डल से जानकारी को रिट्राइव करने के लिए इस्तेमाल करता है. सर्वर शुरू करने की कमांड है:

```bash
docker run -p 1317:1317 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdallrest --entrypoint /usr/bin/heimdalld -d --restart unless-stopped 0xpolygon/heimdall:0.3.0 rest-server --home=/heimdall-home --node "tcp://heimdall:26657"
```

इस कमांड के दो टुकड़े हैं, जो अलग हैं और जुड़ने लायक हैं. `start` कमांड को रन करने के बजाय, हम `rest-server` कमांड को रन कर रहे हैं. इसके अलावा, हम `~–node “tcp://heimdall:26657”~` को पास कर रहे हैं जो बाकी सर्वर को बताता है कि हेम्डल के साथ कैसे संचार किया जाए.

अगर यह कमांड सफलतापूर्वक रन करता है, जब आप रन `docker ps`करते हैं, तो आपको दो कमांड कंटेनरों को अब रन बना देखना चाहिए. इसके अलावा, अगर आप इस कमांड को रन करते हैं, तो आपको कुछ बुनियादी आउटपुट दिखने चाहिए:

```bash
curl localhost:1317/bor/span/1
```

बोर इस इंटरफ़ेस पर निर्भर करेगा. तो अगर आप JSON आउटपुट नहीं देखते हैं, तो कुछ गड़बड़ है!

अब आइए विशेष रूप से बोर के लिए `genesis`फाइल डाउनलोड करें :

```bash
sudo curl -o /mnt/data/bor/genesis.json 'https://raw.githubusercontent.com/maticnetwork/bor/master/builder/files/genesis-mainnet-v1.json'
```

आइए, इस फ़ाइल के लिए दोबारा `sha256 sum` वेरिफ़ाई करें:

```
# sha256sum genesis.json
4bacbfbe72f0d966412bb2c19b093f34c0a1bd4bb8506629eba1c9ca8c69c778  genesis.json
```

अब हमें a करने के लिए एक डिफॉल्ट कॉन्फिग फाइल बनाना होगा.

```bash
docker run -it  0xpolygon/bor:0.3.3 dumpconfig | sudo tee /mnt/data/bor/config.toml
```

यह कमांड डिफॉल्ट सेटिंग के साथ एक .toml फ़ाइल उत्पन्न करने जा रहा है. हम फ़ाइल में कुछ बदलाव करने जा रहे हैं, इसलिए इसे अपने पसंदीदा एडिटर के साथ खोल दें और कुछ अपडेट करें. नोट: हम केवल उन लाइनों को दिखा रहे हैं जो बदल रहे हैं.

संदर्भ के लिए, आप यहां की or इमेज के लिए विवरण देख सकते हैं: [https://hub.doker/docker/0xpolgon/bor](https://hub.docker.com/repository/docker/0xpolygon/bor)

```bash
# Similar to moniker, you might want to update this with a name of your own choosing
identity = "docker.example"

# Setting this to the location of a mount that we'll make
datadir = "/bor-home"

# We'll want to specify some boot nodes
[p2p]
  [pep.discovery]
    bootnodes = ["enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303", "enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303"]

# Because we're running inside docker, we'll likely need to change the way we connect to heimdall
[heimdall]
  url = "http://heimdallrest:1317"

# Assumming you want to access the RPC, you'll need to make a change here as well
[jsonrpc]
  [jsonrpc.http]
    enabled = true
    host = "0.0.0.0"
```

इस बिंदु पर, हमें बोर को शुरू करने के लिए तैयार रहना चाहिए. हम इस कमांड का इस्तेमाल करेंगे:
```bash
docker run -p 30303:30303 -p 8545:8545 -v /mnt/data/bor:/bor-home:rw --net polygon --name bor -d --restart unless-stopped  0xpolygon/bor:0.3.3 server --config /bor-home/config.toml
```

अगर सब कुछ ठीक से चला गया तो आपको ऐसे लॉग्स को देखने के लिए चाहिए जो इस तरह से दिखते हैं:

```bash
2022-12-14T19:53:51.989897291Z INFO [12-14|19:53:51.989] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:47:46Z
2022-12-14T19:53:51.989925064Z INFO [12-14|19:53:51.989] Fetching state sync events               queryParams="from-id=4&to-time=1590882466&limit=50"
2022-12-14T19:53:51.997640841Z INFO [12-14|19:53:51.997] StateSyncData                            Gas=0       Block-number=12800 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.021990622Z INFO [12-14|19:53:52.021] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:49:58Z
2022-12-14T19:53:52.022015930Z INFO [12-14|19:53:52.021] Fetching state sync events               queryParams="from-id=4&to-time=1590882598&limit=50"
2022-12-14T19:53:52.040660857Z INFO [12-14|19:53:52.040] StateSyncData                            Gas=0       Block-number=12864 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.064795784Z INFO [12-14|19:53:52.064] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:52:10Z
2022-12-14T19:53:52.064828634Z INFO [12-14|19:53:52.064] Fetching state sync events               queryParams="from-id=4&to-time=1590882730&limit=50"
2022-12-14T19:53:52.085029612Z INFO [12-14|19:53:52.084] StateSyncData                            Gas=0       Block-number=12928 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.132067703Z INFO [12-14|19:53:52.131] ✅ Committing new span                    id=3                startBlock=13056 endBlock=19455 validatorBytes=f8b6d906822710940375b2fc7140977c9c76d45421564e354ed42277d9078227109442eefcda06ead475cde3731b8eb138e88cd0bac3d9018238a2945973918275c01f50555d44e92c9d9b353cadad54d905822710947fcd58c2d53d980b247f1612fdba93e9a76193e6d90482271094b702f1c9154ac9c08da247a8e30ee6f2f3373f41d90282271094b8bb158b93c94ed35c1970d610d1e2b34e26652cd90382271094f84c74dea96df0ec22e11e7c33996c73fcc2d822 producerBytes=f8b6d906822710940375b2fc7140977c9c76d45421564e354ed42277d9078227109442eefcda06ead475cde3731b8eb138e88cd0bac3d9018238a2945973918275c01f50555d44e92c9d9b353cadad54d905822710947fcd58c2d53d980b247f1612fdba93e9a76193e6d90482271094b702f1c9154ac9c08da247a8e30ee6f2f3373f41d90282271094b8bb158b93c94ed35c1970d610d1e2b34e26652cd90382271094f84c74dea96df0ec22e11e7c33996c73fcc2d822
2022-12-14T19:53:52.133545235Z INFO [12-14|19:53:52.133] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:54:22Z
2022-12-14T19:53:52.133578948Z INFO [12-14|19:53:52.133] Fetching state sync events               queryParams="from-id=4&to-time=1590882862&limit=50"
2022-12-14T19:53:52.135049605Z INFO [12-14|19:53:52.134] StateSyncData                            Gas=0       Block-number=12992 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.152067646Z INFO [12-14|19:53:52.151] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:56:34Z
2022-12-14T19:53:52.152198357Z INFO [12-14|19:53:52.151] Fetching state sync events               queryParams="from-id=4&to-time=1590882994&limit=50"
2022-12-14T19:53:52.176617455Z INFO [12-14|19:53:52.176] StateSyncData                            Gas=0       Block-number=13056 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.191060112Z INFO [12-14|19:53:52.190] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:58:46Z
2022-12-14T19:53:52.191083740Z INFO [12-14|19:53:52.190] Fetching state sync events               queryParams="from-id=4&to-time=1590883126&limit=50"
2022-12-14T19:53:52.223836639Z INFO [12-14|19:53:52.223] StateSyncData                            Gas=0       Block-number=13120 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.236025906Z INFO [12-14|19:53:52.235] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:00:58Z
2022-12-14T19:53:52.236053406Z INFO [12-14|19:53:52.235] Fetching state sync events               queryParams="from-id=4&to-time=1590883258&limit=50"
2022-12-14T19:53:52.269611566Z INFO [12-14|19:53:52.269] StateSyncData                            Gas=0       Block-number=13184 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.283199351Z INFO [12-14|19:53:52.283] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:03:10Z
2022-12-14T19:53:52.283737573Z INFO [12-14|19:53:52.283] Fetching state sync events               queryParams="from-id=4&to-time=1590883390&limit=50"
2022-12-14T19:53:52.314141359Z INFO [12-14|19:53:52.314] StateSyncData                            Gas=0       Block-number=13248 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.325150782Z INFO [12-14|19:53:52.325] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:05:22Z
2022-12-14T19:53:52.325171075Z INFO [12-14|19:53:52.325] Fetching state sync events               queryParams="from-id=4&to-time=1590883522&limit=50"
2022-12-14T19:53:52.354470271Z INFO [12-14|19:53:52.354] StateSyncData                            Gas=0       Block-number=13312 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.372354857Z INFO [12-14|19:53:52.372] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:07:34Z
2022-12-14T19:53:52.372389214Z INFO [12-14|19:53:52.372] Fetching state sync events               queryParams="from-id=4&to-time=1590883654&limit=50"
2022-12-14T19:53:52.398246950Z INFO [12-14|19:53:52.398] StateSyncData                            Gas=0       Block-number=13376 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.413321099Z INFO [12-14|19:53:52.413] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:09:46Z
2022-12-14T19:53:52.413345355Z INFO [12-14|19:53:52.413] Fetching state sync events               queryParams="from-id=4&to-time=1590883786&limit=50"
2022-12-14T19:53:52.437176855Z INFO [12-14|19:53:52.437] StateSyncData                            Gas=0       Block-number=13440 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.450356966Z INFO [12-14|19:53:52.450] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:11:58Z
```

बोर की सिंक स्थिति को जाँचने के कुछ तरीके हैं. `curl` के साथ जाँच करना सबसे सरल है:

```bash
curl 'localhost:8545/' \
--header 'Content-Type: application/json' \
-d '{
	"jsonrpc":"2.0",
	"method":"eth_syncing",
	"params":[],
	"id":1
}'
```

जब आप यह कमांड चलाते हैं, तो यह आपको एक परिणाम देगा:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x2eebf",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodeBytes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x1d4ee3e",
    "startingBlock": "0x0",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

यह `currentBlock` को इंगित करेगा, जो सिंक किया गया है और `highestBlock` को भी इंगित करेगा जिसके बारे में हम जानते हैं. अगर नोड पहले से ही सिंक हो जाता है, तो हमें मिलना `false`चाहिए.

## स्नैपशॉट्स {#snapshots}
आप पाएंगे कि खरोंच से सिंक को बहुत लंबे समय तक ले जा सकते हैं. अगर आप प्रक्रिया को गति देना चाहते हैं, तो आप यहाँ सूचीबद्ध निर्देशों का पालन कर सकते हैं: [https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/](https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/)

यह अभी तक के सबसे अप टू डेट निर्देश हैं, लेकिन आप मोटे तौर पर नीचे दिए स्टेप्स जैसा भी कुछ कर सकते हैं:

```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# At this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```
