---
id: full-node-binaries
title: বাইনারির মাধ্যমে একটি সম্পূর্ণ নোড রান করুন
description: বাইনারির ব্যবহার করে একটি সম্পূর্ণ Polygon নোড স্থাপন করুন
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

এই টিউটোরিয়ালটি বাইনারির মাধ্যমে একটি সম্পূর্ণ নোড শুরু করা থেকে চালানো পর্যন্ত আপনাকে পথনির্দেশ করবে। সিস্টেমের প্রয়োজনীয়তার জন্য [ন্যূনতম কারিগরি প্রয়োজনীয়তা](technical-requirements.md) সংক্রান্ত গাইড দেখুন।

:::tip

এই গাইডে থাকা ধাপগুলো Heimdall এবং Bor পরিষেবা সম্পূর্ণ সিঙ্ক হওয়ার অপেক্ষার সাথে জড়িত। এই প্রক্রিয়াটি সম্পূর্ণ হতে বেশ কয়েকদিন সময় লাগে।

এছাড়া আপনি আগে থেকে রাখা কোনো স্ন্যাপশট ব্যবহার করতে পারেন, যা সিঙ্কের সময় কয়েক ঘণ্টা কমিয়ে দেবে। বিস্তারিত নির্দেশাবলীর জন্য, [<ins>Heimdall এবং Bor এর জন্য স্ন্যাপশটের নির্দেশাবলী</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor) দেখুন।

স্ন্যাপশট ডাউনলোডের লিঙ্কগুলোর জন্য, [<ins>Polygon চেইনের স্ন্যাপশটের</ins>](https://snapshots.polygon.technology/) পেজটি দেখুন।

:::

## সংক্ষিপ্ত বিবরণ {#overview}

- মেশিনটি প্রস্তুত করুন
- সম্পূর্ণ নোড মেশিনে Heimdall এবং Bor বাইনারির ইনস্টল করুন
- সম্পূর্ণ নোড মেশিনে Heimdall এবং Bor পরিষেবাদি সেট আপ করুন
- সম্পূর্ণ নোড মেশিনটি কনফিগার করুন
- সম্পূর্ণ নোড মেশিনটি শুরু করুন
- কমিউনিটি দিয়ে নোড হেলথ পরীক্ষা করুন

:::note

আপনাকে কর্মের সঠিক রূপরেখা sequence অনুসরণ করতে হবে, অন্যথা,  আপনি into চালানো হবে।

:::

### ইনস্টল`build-essential`

আপনার সম্পূর্ণ নোডের জন্য এটি **প্রয়োজন**। ইনস্টল করার জন্য, নিচের কমান্ডটি রান করুন:

```bash
sudo apt-get update
sudo apt-get install build-essential
```

### GO ইনস্টল করুন {#install-go}

আপনার সম্পূর্ণ নোড চালানোর জন্য এটি **প্রয়োজন**। **v1.18 বা তার পরবর্তী** সংস্করণ ইনস্টল করার সুপারিশ করা হয়।

```bash
wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
bash go-install.sh
sudo ln -nfs ~/.go/bin/go /usr/bin/go
```

## বাইনারি ইনস্টল করুন {#install-binaries}

Polygon নোডে 2টি স্তর রয়েছে: Heimdall এবং Bor। Heimdall হলো একটি টেন্ডারমিন্ট ফর্ক, যা Ethereum নেটওয়ার্কের সমান্তরালে চুক্তিগুলো পর্যবেক্ষণ করে। Bor মূলত একটি Geth ফর্ক, যা Heimdall নোড দ্বারা মিশ্রিত ব্লকগুলো তৈরি করে।

উভয় বাইনারি ইনস্টল করা থাকতে হবে এবং সঠিকভাবে কাজ করতে সঠিক ক্রমে চালাতে হবে।

### Heimdall {#heimdall}

Heimdall এবং সংশ্লিষ্ট পরিষেবাদির সর্বশেষ সংস্করণ ইনস্টল করুন। আপনি সঠিক [রিলিজ সংস্করণ](https://github.com/maticnetwork/heimdall/releases)-এ চেকআউট করতে ভুলবেন না। মনে রাখবেন যে সর্বশেষ সংস্করণ, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), যেমন উন্নত রয়েছে:
1. স্টেট সিঙ্ক txs-এ ডেটার আকার সীমিত করে দাঁড়িয়েছে:
    * **30Kb** যখন **বাইটস** এ উপস্থাপন করা হয়
    * **60Kb** যখন **স্ট্রিং** হিসাবে উপস্থাপন করা হয়
2. বিভিন্ন যাচাইকারীদের চুক্তির ঘটনাগুলি মাঝে **বিলম্বের সময়** বাড়ানো হয়েছে এটি নিশ্চিত করার জন্য যে অতিরিক্ত ঘটনাবহুল হওয়ার অবস্থায় মিমপুল অত্যন্ত দ্রুত পূরণ হয় না যার ফলে চেইনটির অগ্রগতি হস্তক্ষেপ হতে পরে।

কীভাবে ডেটার আকার সীমিত করা হয় তা নিচের উদাহরণে দেখানো হলো:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

**Heimdall** ইনস্টল করতে, নিচের কমান্ডগুলো চালান:

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

এটি `heimdalld` এবং `heimdallcli` বাইনারি ইনস্টল করবে। আপনার মেশিনে Heimdall সংস্করণ পরীক্ষা করে ইনস্টলেশন যাচাই করুন:

```bash
heimdalld version --long
```

### Bor {#bor}

Bor-এর সর্বশেষ সংস্করণ ইনস্টল করুন। আপনি সঠিক [প্রকাশিত সংস্করণ-এ](https://github.com/maticnetwork/bor/releases) চেকআউট পেতে ভুলবেন না।

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

এটি `bor` এবং `bootnode` বাইনারি ইনস্টল করবে। আপনার মেশিনে Bor সংস্করণ পরীক্ষা করে ইনস্টলেশন যাচাই করুন:

```bash
bor version
```

## নোড ফাইল কনফিগার করুন {#configure-node-files}

### লঞ্চ রেপো পান {#fetch-launch-repo}

```bash
cd ~/
git clone https://github.com/maticnetwork/launch
```

### লঞ্চ ডিরেক্টরি কনফিগার করুন {#configure-launch-directory}

নেটওয়ার্ক ডিরেক্টরি সেটআপ করতে, নেটওয়ার্কের নাম এবং নোডের প্রকার প্রয়োজন হয়।

**উপলভ্য নেটওয়ার্কসমূহ**:  `mainnet-v1` এবং `testnet-v4`

**নোডের প্রকার**: `sentry`

:::tip

মেইননেট এবং টেস্টনেট কনফিগারেশনের জন্য, যথাযথ `<network-name>` ব্যবহার করুন। Polygon মেইননেটের জন্য `mainnet-v1` এবং মুম্বই টেস্টনেটের জন্য `testnet-v4` ব্যবহার করুন।
:::

```bash
cd ~/
mkdir -p node
cp -rf launch/<network-name>/sentry/<node-type>/* ~/node
```

### নেটওয়ার্ক ডিরেক্টরি কনফিগার করুন {#configure-network-directories}

**Heimdall ডেটা সেটআপ**

```bash
cd ~/node/heimdall
bash setup.sh
```

**Bor ডেটা সেটআপ**

```bash
cd ~/node/bor
bash setup.sh
```

## পরিষেবার ফাইলগুলো কনফিগার করুন {#configure-service-files}

উপযুক্ত ব্যবহার করে `service.sh`ফাইল ডাউনলোড করুন।`<network-name>` Polygon মেইননেটের জন্য `mainnet-v1` এবং মুম্বাই টেস্টনেটের জন্য `testnet-v4` ব্যবহার করুন।

```bash
cd ~/node
wget https://raw.githubusercontent.com/maticnetwork/launch/master/<network-name>/service.sh
```

**মেটাডেটা** ফাইল তৈরি করুন:

```bash
sudo mkdir -p /etc/matic
sudo chmod -R 777 /etc/matic/
touch /etc/matic/metadata
```

`.service`ফাইল তৈরি করুন এবং সিস্টেম ডিরেক্টরি তাদের কপি করুন:

```bash
cd ~/node
bash service.sh
sudo cp *.service /etc/systemd/system/
```


## কনফিগ ফাইল সেটআপ {#setup-config-files}

- রিমোট মেশিন / VM-এ লগইন করুন
- আপনাকে ফাইলে কয়েকটি বিস্তারিত যোগ করতে `config.toml`হবে। ফাইল খুলতে এবং সম্পাদনা `config.toml`করতে, নিম্নলিখিত কমান্ড রান করুন: ।`vi ~/.heimdalld/config/config.toml`

কনফিগ ফাইলে আপনাকে `Moniker` পরিবর্তন করতে হবে এবং `seeds` তথ্য যোগ করতে হবে:

    ```bash
    moniker=<enter unique identifier>
    # For example, moniker=my-sentry-node

    # Mainnet:
    seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656"

    # Testnet:
    seeds="4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656"
    ```

    - **Pex**-এর মান `true`-এ পরিবর্তন করুন
    - **Prometheus**-এর মান `true`-এ পরিবর্তন করুন
    - `max_open_connections` মানকে `100`-এ নির্ধারণ করুন

  উপরের পরিবর্তনগুলো করার সময় **যথাযথ ফর্ম্যাটিং রাখার বিষয়টি** নিশ্চিত করুন।

- নিম্নলিখিত বিষয়টি `~/.heimdalld/config/heimdall-config.toml`-এ কনফিগার করুন:

    ```jsx
    eth_rpc_url=<insert Infura or any full node RPC URL to Goerli>
    ```

- এই কমান্ড ব্যবহার করে Bor এর জন্য `start.sh`ফাইল খুলুন ।`vi ~/node/bor/start.sh` প্যারাম শুরু করতে নিম্নলিখিত ফ্ল্যাগগুলো যোগ করুন:

  ```bash
  # Mainnet:
  --bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303"

  # Testnet:
  --bootnodes "enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303"
  ```

- **আর্কাইভ** মোড সক্রিয় করতে, আপনি `start.sh` ফাইলে নিম্নলিখিত ফ্ল্যাগগুলো যোগ করতে পারেন:

  ```jsx
  --gcmode 'archive' \
  --ws --ws.port 8546 --ws.addr 0.0.0.0 --ws.origins '*' \
  ```

## পরিষেবা শুরু করুন {#start-services}

আপনার Sentry নোডে এই কমান্ডগুলো সহ সম্পূর্ণ Heimdall নোড চালান:

```bash
sudo service heimdalld start
sudo service heimdalld-rest-server start
```

এখন, **Heimdall সম্পূর্ণরূপে সিঙ্ক** হওয়ার বিষয়টি নিশ্চিত করতে হবে এবং তারপর শুধুমাত্র Bor শুরু করতে হবে। আপনি যদি Heimdall সম্পূর্ণরূপে সিঙ্ক না করেই Bor শুরু করেন, তবে আপনি প্রায়শই সমস্যায় পড়বেন।

**Heimdall সিঙ্ক হয়েছে কি না তা পরীক্ষা করতে**
  1. রিমোট মেশিন/VM-এ, `curl localhost:26657/status` চালান
  2. আউটপুটে, `catching_up` মান `false` হওয়া উচিত

Heimdall সিঙ্ক হওয়ার পরে, নিচের কমান্ডটি চালান:

```bash
sudo service bor start
```

## লগ {#logs}

`journalctl` লিনাক্স টুল দ্বারা লগগুলো নিয়ন্ত্রণ করা যাবে। আরো উন্নত ব্যবহারের ব্যাপারে এখানে একটি টিউটোরিয়াল দেওয়া হয়েছে: [Systemd লগ দেখতে ও পরিবর্তন করতে কীভাবে Journalctl ব্যবহার করা যায়](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs)।

**Heimdall নোড লগ পরীক্ষা করুন**

```bash
journalctl -u heimdalld.service -f
```

**Heimdall রেস্ট-সার্ভার লগ পরীক্ষা করুন**

```bash
journalctl -u heimdalld-rest-server.service -f
```

**Bor রেস্ট-সার্ভার লগ পরীক্ষা করুন**

```bash
journalctl -u bor.service -f
```

## পোর্ট এবং ফায়ারওয়াল সেটআপ {#ports-and-firewall-setup}

সেন্ট্রি নোড ফায়ারওয়ালে পোর্ট 22, 26656 এবং 30303 ওয়ার্ল্ড (0.0.0.0/0)-এ খুলুন।

আপনি আপনার প্রয়োজন এবং নিরাপত্তার নির্দেশিকা অনুযায়ী পোর্ট 22-এর জন্য অ্যাক্সেস সীমিত করতে VPN ব্যবহার করতে পারেন।
