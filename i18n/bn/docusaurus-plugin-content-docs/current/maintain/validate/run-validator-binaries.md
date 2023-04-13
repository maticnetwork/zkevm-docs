---
id: run-validator-binaries
title: বাইনারির থেকে Validator নোড চালান
sidebar_label: Using Binaries
description: আপনার যাচাইকারী নোড সেট আপ করতে বাইনারির ব্যবহার করুন
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
slug: run-validator-binaries
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip
এই গাইডটিতে স্টেপগুলো in ে সম্পূর্ণভাবে সিঙ্ক করার জন্য H**eimdall **এবং **বোর** সার্ভিসের জন্য অপেক্ষা করছে। বিকল্পভাবে, আপনি একটি রক্ষণাবেক্ষণ করা স্ন্যাপশট ব্যবহার করতে পারেন, যা কয়েক ঘন্টা সিঙ্কের সময় কমিয়ে দেবে। বিস্তারিত নির্দেশাবলীর জন্য, [<ins>Heimdall এবং Bor এর জন্য স্ন্যাপশটের নির্দেশাবলী</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233) দেখুন।

স্ন্যাপশট ডাউনলোডের লিঙ্কগুলির জন্য, [<ins>Polygon চেইন স্ন্যাপশট</ins>](https://snapshot.polygon.technology/) দেখুন।

:::

এই নির্দেশনাটি আপনাকে বাইনারি থেকে একটি পলিগন যাচাইকারী নোড চালানোর মাধ্যমে নিয়ে যাবে।

সিস্টেমের প্রয়োজনীয়তা জন্য, [Validator Node সিস্টেমের প্রয়োজনীয়তা](validator-node-system-requirements.md) গাইড অনুসরণ করুন।

আপনি যদি Ansible, মাধ্যমে যাচাইকারী নোড শুরু করতে চান এবং রান করতে চান, তাহলে [Ansible. সাথে একটি Validator Node চালান](run-validator-ansible.md) করুন।

:::caution

নতুন যাচাইকারী গ্রহণের জন্য সীমিত স্থান রয়েছে। নতুন যাচাইকারী শুধুমাত্র সক্রিয় সেটটিতে যোগ দিতে পারেন যখন একটি ইতিমধ্যে সক্রিয় যাচাইকারী unbonds

:::

## পূর্বশর্ত {#prerequisites}

* দুটি মেশিন — একটি [সেন্ট্রি](/docs/maintain/glossary.md#sentry) এবং একটি [যাচাইকারী](/docs/maintain/glossary.md#validator)।
* সেন্ট্রি এবং যাচাইকারী উভয় মেশিনেই `build-essential` ইনস্টল করা আছে।

  ইনস্টল করার জন্য:

  ```sh
  sudo apt-get install build-essential
  ```

* সেন্ট্রি এবং যাচাইকারী উভয় মেশিনে Go 1.18 ইনস্টল করা।

  ইনস্টল করার জন্য:

  ```sh
  wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
  bash go-install.sh
  sudo ln -nfs ~/.go/bin/go /usr/bin/go
  ```

* RabbitMQ সেন্ট্রি এবং যাচাইকারী উভয় মেশিনে ইনস্টল করা হয়েছে।

RabbitMQ ইনস্টল করার জন্য কমান্ড এখানে রয়েছে:

  ```sh
  sudo apt-get update
  sudo apt install build-essential
  sudo apt install erlang
  wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.8/rabbitmq-server_3.10.8-1_all.deb
  sudo dpkg -i rabbitmq-server_3.10.8-1_all.deb

  ```
:::tip

RabbitMQ ডাউনলোড এবং ইনস্টল করার বিষয়ে আরও তথ্য দেখুন [<ins>এখানে</ins>](https://www.rabbitmq.com/download.html)।

:::


:::info
অনুগ্রহ করে [<ins>bloXroute</ins>](/maintain/validate/bloxroute.md) গি. ে আপনার নোডটি সংযোগ করতে bloXroute নির্দেশাবলীতে পদক্ষেপটি অনুসরণ করুন।
:::

## সংক্ষিপ্ত বিবরণ {#overview}

চলমান যাচাইকারী নোডে যেতে, এই **ধাপগুলোর ঠিক ক্রম অনুসারে** নিম্নলিখিতগুলি পরিচালনা করুন:

:::caution

এই ধাপগুলি ক্রমানুসারে সম্পাদিত হলে আপনি কনফিগারেশন সমস্যায় পড়বেন।
এটা মনে রাখা গুরুত্বপূর্ণ যে একটি সেন্ট্রি নোড সবসময় যাচাইকারী নোডের আগে সেট আপ করতে হবে।

:::

1. দুটি মেশিন প্রস্তুত করুন, একটি সেন্ট্রি নোডের জন্য এবং একটি যাচাইকারী নোডের জন্য।
2. সেন্ট্রি এবং যাচাইকারী মেশিনে Heimdall এবং Bor বাইনারিগুলি ইনস্টল করুন।
3. সেন্ট্রি এবং যাচাইকারী মেশিনে Heimdall এবং Bor পরিষেবা ফাইল সেট আপ করুন।
4. সেন্ট্রি এবং যাচাইকারী মেশিনে Heimdall এবং Bor পরিষেবাগুলি সেট আপ করুন।
5. Sentry নোড কনফিগার করুন।
6. Sentry নোড শুরু করুন।
7. যাচাইকারী নোড কনফিগার করুন।
8. মালিক এবং স্বাক্ষরকারীর কী সেট করুন।
9. যাচাইকারী নোডটি শুরু করুন।
10. কমিউনিটি দিয়ে নোডের হেলথ পরীক্ষা করুন।

## Binaries ইনস্টল করা হচ্ছে {#installing-the-binaries}

সেন্ট্রি এবং যাচাইকারী উভয় মেশিনে বাইনারি ইনস্টল করুন।

### Heimdall ইনস্টল করা হচ্ছে {#installing-heimdall}

[Heimdall](/docs/pos/heimdall/overview) হল প্রুফ-অফ-স্টেক যাচাইকারী লেয়ার
Ethereum মেইননেটে প্লাজমা ব্লকের উপস্থাপনা চেকপয়েন্ট করার জন্য দায়ী।

সর্বশেষ সংস্করণ, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), যেমন কয়েকটি উন্নতি রয়েছে:
1. স্টেট সিঙ্ক txs-এ ডেটার আকার সীমিত করে দাঁড়িয়েছে:
    * **30Kb** যখন **বাইটস** এ উপস্থাপন করা হয়
    * **60Kb** যখন **স্ট্রিং** হিসাবে উপস্থাপন করা হয়।
2. বিভিন্ন যাচাইকারীদের চুক্তির ইভেন্টগুলি মাঝে **বিলম্বের সময়** বাড়ানো হয়েছে এটি নিশ্চিত করার জন্য যে অতিরিক্ত ঘটনাবহুল হওয়ার অবস্থায় মিমপুল অত্যন্ত দ্রুত পূরণ হয় না যার ফলে চেইনটির অগ্রগতি হস্তক্ষেপ হতে পরে।

নিম্নলিখিত উদাহরণটি দেখায় কীভাবে ডেটার আকার সীমিত:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

[Heimdall রিপোজিটরি](https://github.com/maticnetwork/heimdall/) ক্লোন করুন:

```sh
git clone https://github.com/maticnetwork/heimdall
```

ঠিক [রিলিজ সংস্করণে](https://github.com/maticnetwork/heimdall/releases) নেভিগেট করুন:

```sh
git checkout RELEASE_TAG
```

যেখানে `RELEASE_TAG` হল রিলিজ সংস্করণের ট্যাগ যা আপনি ইনস্টল করেন।

উদাহরণস্বরূপ:

```sh
git checkout v0.3.0
```

একবার আপনি ঠিক রিলিজে থাকলে, Heimdall ইনস্টল করুন:

```sh
make install
source ~/.profile
```

Heimdall ইনস্টলেশন পরীক্ষা করুন:

```sh
heimdalld version --long
```

:::note

এগিয়ে যাওয়ার আগে, Heimdall সেন্ট্রি এবং যাচাইকারী উভয় মেশিনে ইনস্টল করা উচিত।

:::

### Bor ইনস্টল করা হচ্ছে {#installing-bor}

[বোর](/docs/pos/bor) হচ্ছে সাইডচেন অপারেটর যা ব্লক প্রোডাকশন layer, হিসাবে কাজ করে, যা প্রতিটি [স্প্যান](/docs/maintain/glossary.md#span) এবং [স্প্রিন্টের](/docs/maintain/glossary.md#sprint) জন্য ব্লক প্রযোজক এবং যাচাইকারী নির্বাচন করতে Heimdall সিঙ্ক করে।

[Bor রিপোজিটরি](https://github.com/maticnetwork/bor) ক্লোন করুন:

```sh
git clone https://github.com/maticnetwork/bor
```

ঠিক [রিলিজ সংস্করণে](https://github.com/maticnetwork/bor/releases) নেভিগেট করুন:

```sh
git checkout RELEASE_TAG
```

যেখানে `RELEASE_TAG` হল রিলিজ সংস্করণের ট্যাগ যা আপনি ইনস্টল করেন।

উদাহরণস্বরূপ:

```sh
git checkout v0.3.3
```

Bor ইনস্টল করুন:

```sh
make bor-all
```

Symlinks তৈরি করুন:

```sh
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

Bor ইনস্টলেশন পরীক্ষা করুন:

```sh
bor version
```

:::note

এগিয়ে যাওয়ার আগে, Bor সেন্ট্রি এবং যাচাইকারী উভয় মেশিনে ইনস্টল করা উচিত।

:::

## নোড ফাইল সেট আপ করা {#setting-up-node-files}

:::note

সেন্ট্রি এবং যাচাইকারী উভয় মেশিনেই নোড ফাইল সেট আপ করতে হবে।

:::

### লঞ্চ রিপোজিটরি আনা হচ্ছে {#fetching-the-launch-repository}

[লঞ্চ রিপোজিটরি](https://github.com/maticnetwork/launch) ক্লোন করুন:

```sh
git clone https://github.com/maticnetwork/launch
```

### লঞ্চ ডিরেক্টরি সেট আপ করা হচ্ছে {#setting-up-the-launch-directory}

#### সেন্ট্রি মেশিনে {#on-the-sentry-machine}

একটি `node` ডিরেক্টরি তৈরি করুন:

```sh
mkdir -p node
```

`launch` ডিরেক্টরি থেকে `node` ডিরেক্টরিতে ফাইল এবং স্ক্রিপ্ট কপি করুন:

```sh
cp -rf launch/mainnet-v1/sentry/sentry ~/node
cp launch/mainnet-v1/service.sh ~/node
```

#### যাচাইকারী মেশিনে {#on-the-validator-machine}

একটি `node` ডিরেক্টরি তৈরি করুন:

```sh
mkdir -p node
```

`launch` ডিরেক্টরি থেকে `node` ডিরেক্টরিতে ফাইল এবং স্ক্রিপ্ট কপি করুন:

```sh
cp -rf launch/mainnet-v1/sentry/validator ~/node
cp launch/mainnet-v1/service.sh ~/node
```

### নেটওয়ার্ক ডিরেক্টরি সেট আপ করা হচ্ছে {#setting-up-the-network-directories}

:::note

সেন্ট্রি এবং যাচাইকারী মেশিনে এই বিভাগটি চালান।

:::

#### Heimdall সেট আপ করা হচ্ছে {#setting-up-heimdall}

`node` ডিরেক্টরিতে পরিবর্তন করুন:

```sh
cd ~/node/heimdall
```

সেটআপ স্ক্রিপ্ট চালান:

```sh
bash setup.sh
```

#### Bor সেট আপ করা হচ্ছে {#setting-up-bor}

`node` ডিরেক্টরিতে পরিবর্তন করুন:

```sh
cd ~/node/bor
```

সেটআপ স্ক্রিপ্ট চালান:

```sh
bash setup.sh
```

## পরিষেবাগুলি সেট আপ করা হচ্ছে {#setting-up-the-services}

:::note

সেন্ট্রি এবং যাচাইকারী মেশিনে এই বিভাগটি চালান।

:::

`node` ডিরেক্টরিতে নেভিগেট করুন:

```sh
cd ~/node
```

সেটআপ স্ক্রিপ্ট চালান:

```sh
bash service.sh
```

সিস্টেমের ডিরেক্টরিতে পরিষেবা ফাইল কপি করুন:

```sh
sudo cp *.service /etc/systemd/system/
```

## সেন্ট্রি নোড কনফিগার করা হচ্ছে {#configuring-the-sentry-node}

রিমোট সেন্ট্রি মেশিনে লগ ইন করে শুরু করুন।

### Heimdall পরিষেবা কনফিগার করা হচ্ছে {#configuring-the-heimdall-services}

সম্পাদনার জন্য Heimdall কনফিগারেশন ফাইল খুলুন:

```sh
vi ~/.heimdalld/config/config.toml
```

`config.toml`, নিম্নলিখিত প্যারামিটারগুলো পরিবর্তন করুন:

* `moniker` — যেকোনো নাম। উদাহরণ: `moniker = "my-sentry-node"`।
* `seeds` — সিড নোডের ঠিকানাগুলিতে একটি নোড ID, একটি IP ঠিকানা এবং একটি পোর্ট থাকে।

নিম্নলিখিত মানগুলি ব্যবহার করুন:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — পিয়ার এক্সচেঞ্জ সক্রিয় করতে `true`-এ মান সেট করুন। উদাহরণ: `pex = true`।
* `private_peer_ids` — যাচাইকারী মেশিনটিতে Heimdall এর নোড ID-র সেটআপ।

যাচাইকারী মেশিনটিতে Heimdall নোড ID পেতে:

  1. যাচাইকারী মেশিনে লগ ইন করুন।
  2. চালান:
     ```sh
     heimdalld tendermint show-node-id
     ```

  উদাহরণ: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`।

* `prometheus` — Prometheus মেট্রিক্স সক্রিয় করার জন্য `true`-তে মান সেট করুন। উদাহরণ: `prometheus = true`।
* `max_open_connections` — `100`-তে মান সেট করুন। উদাহরণ: `max_open_connections = 100`।

পরিবর্তনগুলি `config.toml`-এ সেভ করুন।

### Bor পরিষেবাটি কনফিগার করা হচ্ছে {#configuring-the-bor-service}

সম্পাদনার জন্য Bor কনফিগারেশন ফাইল খুলুন:

```sh
`vi ~/node/bor/start.sh`
```

`start.sh`-এ, বুট নোড ঠিকানাগুলি যুক্ত করে নোড ID, একটি IP ঠিকানা এবং একটি পোর্ট যুক্ত করুন। ফাইলের শেষে নিম্নলিখিত লাইন যোগ করে:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

পরিবর্তনগুলি `start.sh`-এ সেভ করুন।

### একটি ফায়ারওয়াল কনফিগার করা হচ্ছে {#configuring-a-firewall}

`0.0.0.0/0`-এর দুনিয়া খুলতে Sentry মেশিনটিতে অবশ্যই নিম্নলিখিত পোর্টগুলি থাকতে হবে:

* `26656`- আপনার Heimdall পরিষেবাটি অন্যান্য নোড Heimdall পরিষেবাতে আপনার নোড সংযুক্ত করবে।

* `30303`- আপনার Bor পরিষেবাটি অন্যান্য নোড Bor পরিষেবাতে আপনার নোড সংযুক্ত করবে।

* `22`- যাচাইকারী যেখানেই থাকুন না কেন, সেখান থেকে ssh সক্ষম হতে।

## সেন্ট্রি নোড শুরু করা হচ্ছে {#starting-the-sentry-node}

আপনি প্রথমে Heimdall পরিষেবা শুরু করবেন। একবার Heimdall পরিষেবা সিঙ্ক হয়ে গেলে, আপনি Bor পরিষেবা শুরু করবেন।

:::note

আগেই উল্লিখিত হিসাবে, Heimdall পরিষেবাটি স্ক্র্যাচ থেকে সম্পূর্ণরূপে সিঙ্ক হতে বেশ কয়েক দিন সময় নেয়।

বিকল্পভাবে, আপনি একটি রক্ষণাবেক্ষণ করা স্ন্যাপশট ব্যবহার করতে পারেন, যা কয়েক ঘন্টা সিঙ্কের সময় কমিয়ে দেবে। বিস্তারিত নির্দেশাবলীর জন্য, [<ins>Heimdall এবং Bor এর জন্য স্ন্যাপশটের নির্দেশাবলী</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233) দেখুন।

স্ন্যাপশট ডাউনলোডের লিঙ্কগুলির জন্য, [Polygon চেইনের স্ন্যাপশট](https://snapshot.polygon.technology/) দেখুন।

:::

### Heimdall পরিষেবা শুরু করা হচ্ছে {#starting-the-heimdall-service}

Heimdall পরিষেবা শুরু করুন:

```sh
sudo service heimdalld start
```

Heimdall রেস্ট-সার্ভার শুরু করুন:

```sh
sudo service heimdalld-rest-server start
```

Heimdall পরিষেবার লগগুলি পরীক্ষা করুন:

```sh
journalctl -u heimdalld.service -f
```

:::note

লগগুলিতে, আপনি নিম্নলিখিত ত্রুটিগুলি দেখতে পারেন:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

এই লগগুলোর অর্থ হল নেটওয়ার্কটিতে থাকা নোডগুলির একটিকে আপনার নোডের সাথে সংযোগ করা যায়নি। নেটওয়ার্কে আরও নোড ক্রল করতে আপনার নোডের জন্য অপেক্ষা করুন; আপনাকে কিছু করতে হবে না। এই ত্রুটিগুলি মোকাবেলা করতে।

:::

Heimdall রেস্ট-সার্ভারের লগগুলি পরীক্ষা করুন:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Heimdall-এর সিঙ্ক স্টেটাস দেখুন:

```sh
curl localhost:26657/status
```

আউটপুটে, `catching_up` এর মান হল:

* `true` — Heimdall পরিষেবাটি সিঙ্ক হচ্ছে।
* `false` — Heimdall পরিষেবাটি সম্পূর্ণ সিঙ্ক করা হয়েছে।

Heimdall পরিষেবাটি সম্পূর্ণরূপে সিঙ্ক করা পর্যন্ত অপেক্ষা করুন।

### Bor পরিষেবাটি শুরু করা হচ্ছে {#starting-the-bor-service}

একবার Heimdall পরিষেবা সিঙ্ক হয়ে গেলে, Bor পরিষেবা শুরু করুন৷

Bor পরিষেবাটি শুরু করুন:

```sh
sudo service bor start
```

Bor পরিষেবাটির লগগুলি পরীক্ষা করুন:

```sh
journalctl -u bor.service -f
```

## যাচাইকারী নোড কনফিগার করা হচ্ছে {#configuring-the-validator-node}

:::note

এই বিভাগে সম্পূর্ণ করতে, আপনার সম্পূর্ণ সিঙ্ক করা Ethereum of একটি RPC endpoint থাকতে হবে নোড প্রস্তুত।

:::

### Heimdall পরিষেবাটি কনফিগার করা হচ্ছে {#configuring-the-heimdall-service}

রিমোট যাচাইকারী মেশিনে লগ ইন করুন।

`vi ~/.heimdalld/config/config.toml` সম্পাদনার জন্য খুলুন।

`config.toml`-এ, নিম্নলিখিতটি পরিবর্তন করুন:

* `moniker` — যেকোনো নাম। উদাহরণ: `moniker = "my-validator-node"`।
* `pex` — পিয়ার এক্সচেঞ্জ নিষ্ক্রিয় করতে `false`-এ মান সেট করুন। উদাহরণ: `pex = false`।
* `private_peer_ids` — এটি নিষ্ক্রিয় করতে মানটির বিষয়ে মন্তব্য করুন। উদাহরণ:.`# private_peer_ids = ""`।

Sentry মেশিনে Heimdall-এর নোড ID পেতে:

  1. সেন্ট্রি মেশিনে লগ ইন করুন।
  1. `heimdalld tendermint show-node-id` চালান।

উদাহরণ: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — Prometheus মেট্রিক্স সক্রিয় করার জন্য `true`-তে মান সেট করুন। উদাহরণ: `prometheus = true`।

পরিবর্তনগুলি `config.toml`-এ সেভ করুন।

`vi ~/.heimdalld/config/heimdall-config.toml` সম্পাদনার জন্য খুলুন।

`heimdall-config.toml`-এ, নিম্নলিখিতটি পরিবর্তন করুন:

* `eth_rpc_url`- একটি সম্পূর্ণরূপে সিঙ্ক করা Ethereum mainnet node এর জন্য একটি RPC endpoint, i.e Infura।`eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

উদাহরণ: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`

পরিবর্তনগুলি `heimdall-config.toml`-এ সেভ করুন।

### Bor পরিষেবাটি কনফিগার করা হচ্ছে {#configuring-the-bor-service-1}

`vi ~/.bor/data/bor/static-nodes.json` সম্পাদনার জন্য খুলুন।

`static-nodes.json`-এ, নিম্নলিখিতটি পরিবর্তন করুন:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — নোড ID এবং
সেন্ট্রি মেশিনে সেট আপ Bor এর আইপি ঠিকানা।

Sentry মেশিনে Bor এর নোড ID পেতে:

  1. সেন্ট্রি মেশিনে লগ ইন করুন।
  2. `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress` চালান।

  উদাহরণ: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`।

পরিবর্তনগুলি `static-nodes.json`-এ সেভ করুন।

## মালিক এবং সাইনার কী সেট করা হচ্ছে {#setting-the-owner-and-signer-key}

Polygon-এ, এটি সুপারিশ করা হয় যে আপনি মালিক এবং স্বাক্ষরকারীর কী আলাদা রাখবেন৷

* Signer - সেই ঠিকানা যা সাইন ইন করে [চেকপয়েন্ট লেনদেন।](/docs/maintain/glossary.md#checkpoint-transaction) সুপারিশ হচ্ছে signer ঠিকানায় অন্তত 1 ETH রাখতে হবে।
* মালিক — সেই ঠিকানা যা স্ট্যাক করার লেনদেন করে। সুপারিশ হচ্ছে MATIC রাখা মালিকের ঠিকানায় টোকেন

### একটি Heimdall ব্যক্তিগত কী তৈরি করা হচ্ছে {#generating-a-heimdall-private-key}

কেবলমাত্র যাচাইকারী মেশিনেই আপনাকে একটি Heimdall প্রাইভেট কী তৈরি করতে হবে। Heimdall তৈরি করবেন না sentry মেশিনে প্রাইভেট কী।

প্রাইভেট কী তৈরি করার জন্য, রান করুন:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

কোথায়

* ETHEREUM_PRIVATE_KEY — আপনার Ethereum ওয়ালেটের প্রাইভেট কী।

এটি `priv_validator_key.json` তৈরি করবে। Heimdall কনফিগারেশনে তৈরি JSON ফাইল স্থানান্তর করুন ডিরেক্টরি:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### একটি Bor কীস্টোর ফাইল তৈরি করা হচ্ছে {#generating-a-bor-keystore-file}

কেবলমাত্র যাচাইকারী মেশিনেই আপনাকে একটি Bor কীস্টোর ফাইল তৈরি করতে হবে। একটি Bor keystore ফাইল তৈরি করবেন না sentry মেশিনে

প্রাইভেট কী তৈরি করার জন্য, রান করুন:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

কোথায়

* ETHEREUM_PRIVATE_KEY — আপনার Ethereum ওয়ালেটের প্রাইভেট কী।

প্রম্পট করা হলে, কীস্টোর ফাইলে একটি পাসওয়ার্ড সেটআপ করুন।

এটি একটি `UTC-<time>-<address>` কীস্টোর ফাইল তৈরি করবে।

তৈরি করা কীস্টোর ফাইলটি Bor কনফিগারেশন ডিরেক্টরিতে স্থানান্তর করুন:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### password.txt যোগ করুন {#add-password-txt}

তাহলে একটি `password.txt`ফাইল তৈরি করতে ভুলবেন না তাহলে Bor keystore ফাইল পাসওয়ার্ড ঠিক যোগ করুন।`~/.bor/password.txt` ফাইল।

### আপনার Ethereum ঠিকানা যোগ করুন {#add-your-ethereum-address}

`vi /etc/matic/metadata` সম্পাদনার জন্য খুলুন।

`metadata`-এ, আপনার Ethereum ঠিকানা যোগ করুন। উদাহরণ: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`।

পরিবর্তনগুলি `metadata`-এ সেভ করুন।

## যাচাইকারী নোডটি শুরু করা হচ্ছে {#starting-the-validator-node}

এই সময়ে, আপনার কাছে থাকা আবশ্যক:

* সেন্ট্রি মেশিনে Heimdall পরিষেবা সিঙ্ক হয় এবং চলছে৷
* Sentry মেশিনে চলমান Bor পরিষেবা।
* কনফিগার করা যাচাইকারী মেশিনে Heimdall পরিষেবা এবং Bor পরিষেবা।
* আপনার কনফিগার করা মালিক এবং স্বাক্ষরকারীর কী।

### Heimdall পরিষেবা শুরু করা হচ্ছে {#starting-the-heimdall-service-1}

আপনি এখন যাচাইকারী মেশিনে Heimdall পরিষেবাটি শুরু করবেন। Heimdall সার্ভিস সিঙ্ক করার পর আপনি যাচাইকারী মেশিনে বোর সার্ভিস শুরু করবে।

Heimdall পরিষেবা শুরু করুন:

```sh
sudo service heimdalld start
```

Heimdall রেস্ট-সার্ভার শুরু করুন:

```sh
sudo service heimdalld-rest-server start
```

Heimdall ব্রিজ শুরু করুন:

```sh
sudo service heimdalld-bridge start
```

Heimdall পরিষেবার লগগুলি পরীক্ষা করুন:

```sh
journalctl -u heimdalld.service -f
```

Heimdall রেস্ট-সার্ভারের লগগুলি পরীক্ষা করুন:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Heimdall ব্রিজের লগগুলি পরীক্ষা করুন:

```sh
journalctl -u heimdalld-bridge.service -f
```

Heimdall-এর সিঙ্ক স্টেটাস দেখুন:

```sh
curl localhost:26657/status
```

আউটপুটে, `catching_up` এর মান হল:

* `true` — Heimdall পরিষেবাটি সিঙ্ক হচ্ছে।
* `false`— Heimdall পরিষেবাটি সিঙ্ক করা হয়েছে।

Heimdall পরিষেবাটি পুরোপুরি সিঙ্ক হওয়ার জন্য অপেক্ষা করুন।

### Bor পরিষেবাটি শুরু করা হচ্ছে {#starting-the-bor-service-1}

একবার যাচাইকারী মেশিনে Heimdall পরিষেবা সিঙ্ক করার পরে, Bor সার্ভিস শুরু করুন যাচাইকারী মেশিন।

Bor পরিষেবাটি শুরু করুন:

```sh
sudo service bor start
```

Bor পরিষেবাটির লগগুলি পরীক্ষা করুন:

```sh
journalctl -u bor.service -f
```

## কমিউনিটি এর সাথে স্বাস্থ্য পরীক্ষা {#health-checks-with-the-community}

এখন যে আপনার sentry এবং যাচাইকারী নোডগুলো সিঙ্ক এবং চলমান আছে, তার উপর মাথা [Discord](https://discord.com/invite/0xPolygon) এবং আপনার নোডস স্বাস্থ্যের জন্য সম্প্রদায়কে জিজ্ঞাসা করুন।

:::note

যাচাইকারী হিসাবে যাচাইকারী হিসেবে সবসময়ই signer ঠিকানাটির একটি চেক থাকতে বাধ্য। যদি ETH ব্যালেন্স 0.5 ETH নিচে পৌঁছাতে থাকে তাহলে এটি refilled. করা উচিত। এই এড়িয়ে চলুন সেটিকে চেকপয়েন্ট লেনদেন জমা থেকে নোডটি ধাক্কা দেবে।

:::

## পরবর্তী পদক্ষেপ: স্টেকিং {#next-steps-staking}

এখন যে আপনার আপনার sentry এবং যাচাইকারী নোড আছে তা হল health-checked, এগিয়ে যান নেটওয়ার্ক ব্যাক শুরু করতে [স্ট্যাকিং](/docs/maintain/validator/core-components/staking.md) গাইড।
