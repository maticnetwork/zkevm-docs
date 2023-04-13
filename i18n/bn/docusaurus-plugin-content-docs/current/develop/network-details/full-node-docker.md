---
id: full-node-docker
title: Docker দিয়ে একটি সম্পূর্ণ নোড চালান
sidebar_label: Run a full node with Docker
description:  ডকার ব্যবহার করে একটি সম্পূর্ণ নোড চালানোর গাইড
keywords:
  - docs
  - matic
  - docker
  - full node
  - polygon
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon টিম অফিসিয়াল Docker ছবি বণ্টন করে, যা Polygon মেইননেটে নোড চালানোর জন্য ব্যবহার করা যেতে পারে। এই নির্দেশাবলী হলো একটি সম্পূর্ণ নোড চালানোর জন্য, তবে সেন্ট্রি নোড এবং যাচাইকারী চালানোর জন্য সেগুলো অভিযোজন করা যায়।

:::tip স্ন্যাপশট

আপনি পাবেন যে স্ক্র্যাচ থেকে সিঙ্ক করা খুব দীর্ঘ সময় নিতে পারে। আপনি যদি প্রক্রিয়াটি গতি দিতে চান তবে আপনি এখানে তালিকাভুক্ত instructions অনুসরণ করতে পারেন: [<ins>Heimdall এবং Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor)

এটি সবচেয়ে হালনাগাদ নির্দেশনা হবে, তবে আপনি মোটামুটিভাবে নিচের কাজগুলো করতে পারেন:
```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# at this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```

দ্রুততর স্ন্যাপশট ডাউনলোড করার জন্য `aria2c`পদ্ধতিটি ব্যবহার করা হয়। একটি বিকল্প উপায় আছে যেখানে কোনও হস্তক্ষেপ ছাড়াই ডাউনলোড করা স্ন্যাপশট সরাসরি বের করা যেতে পারে।

**তার জন্য পদক্ষেপ:**

```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::

## পূর্বশর্ত {#prerequisites}

একটি Polygon সম্পূর্ণ নোড চালানোর জন্য সাধারণ কনফিগারেশন **হলো কমপক্ষে** 4 CPUs/cores এবং 16 GB RAM থাকতে হবে। এভাবে এগিয়ে যাওয়ার জন্য, আমরা AWS এবং একটি `t3.2xlarge` উদাহরণের প্রকার ব্যবহার করতে যাচ্ছি। অ্যাপ্লিকেশনটি x86 এবং আর্ম আর্কিটেকচার উভয়েই চলতে পারে।

এই নির্দেশাবলী Docker উপর ভিত্তি করে তৈরি, তাই প্রায় যেকোনো অপারেটিং সিস্টেম দিয়েই এটি অনুসরণ করা সহজ হবে, তবে আমরা Ubuntu ব্যবহার করছি।

স্পেসের পরিপ্রেক্ষিতে, একটি সম্পূর্ণ নোডের জন্য আপনাকে সম্ভবত **2.5 থেকে 5 টেরাবাইট SSD (বা দ্রুত) স্টোরেজের জন্য** হবে।

একটি Polygon সম্পূর্ণ নোডের জন্য পিয়ার এক্সচেঞ্জ সাধারণত পোর্ট 30303 এবং 26656 খোলা থাকার উপর নির্ভর করে। আপনি যখন AWS-এর জন্য আপনার ফায়ারওয়াল বা নিরাপত্তা গ্রুপ কনফিগার করবেন, তখন নিশ্চিত you ে নিন যে এই পোর্টগুলো আপনার যে কোন পোর্ট পাবেন তা দিয়ে খুলুন।

TLDR:

- কমপক্ষে 4 কোর এবং 16GB র‍্যাম সহ একটি মেশিন ব্যবহার করুন
- নিশ্চিত Make ে নিন যে আপনার 2.5 TB থেকে 5 TB পর্যন্ত ফাস্ট স্টোরেজের আছে
- একটি পাবলিক আইপি এবং ওপেন পোর্ট 30303 এবং 26656 ব্যবহার করুন

## প্রাথমিক সেটআপ {#initial-setup}
এই সময়ে, একটি লিনাক্স মেশিনে রুট প্রিভিলেজ সহ আপনার শেল অ্যাক্সেস থাকতে হবে।

![img](/img/full-node-docker/term-access.png)

### ডকার ইনস্টল করুন {#install-docker}
খুব সম্ভবত আপনার অপারেটিং সিস্টেমে ডিফল্টরূপে Docker ইনস্টল করা থাকবে না। আপনার বিশেষ বণ্টনের জন্য এখানে থাকা নির্দেশাবলী অনুসরণ করুন: https://docs.docker.com/engine/install/

আমরা Ubuntu-র নির্দেশাবলী অনুসরণ করছি। ধাপগুলোতে নিচের বিষয়গুলো অন্তর্ভুক্ত রয়েছে, তবে যদি সেগুলো আপডেট করা হয়ে থাকে, তবে অফিসিয়াল নির্দেশাবলী দেখুন।

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

এই সময়ে আপনার Docker ইনস্টল হয়ে যাবে। যাচাই করতে, আপনার এই ধরণের একটি কমান্ড চালাতে পারা উচিত:

```bash
sudo docker run hello-world
```

![img](/img/full-node-docker/hello-world.png)

অনেক ক্ষেত্রে, `root` ব্যবহারকারী হিসেবে docker চালানো অসুবিধাজনক, তাই `root` না হয়েই docker-এর সাথে ইন্টারঅ্যাক্ট করার জন্য আমরা ইনস্টলেশন পরবর্তী ধাপগুলো [এখানে](https://docs.docker.com/engine/install/linux-postinstall/) অনুসরণ করব:

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

এখন আপনার লগআউট ও আবার লগইন করতে পারা এবং `sudo` ছাড়াই docker কমান্ডগুলো চালাতে পারা উচিত।

### ডিস্ক সেটআপ {#disk-setup}
আপনার চাহিদার উপর ভিত্তি করে এখানে প্রয়োজনীয় ধাপগুলো অনেক ভিন্ন হতে পারে। খুব সম্ভবত কোনো একটি ডিভাইসে আপনার অপারেটিং সিস্টেম চালানোর জন্য একটি রুট পার্টিশন থাকবে। ব্লকচেইন ডেটা সত্যিকারভাবে ধরে রাখতে আপনি সম্ভবত এক বা একাধিক ডিভাইস চাইবেন। বাকি প্রক্রিয়াতে, `/mnt/data`-এ স্থাপিত অতিরিক্ত ডিভাইসটি আমরা পেতে যাচ্ছি।

এই উদাহরণে আমাদের কাছে অবস্থিত ৪ TB উপলব্ধ স্পেসের একটি ডিভাইস `/dev/nvme1n1`রয়েছে। আমরা নীচের পদক্ষেপগুলি ব্যবহার করে যে মাউন্ট করতে যাচ্ছি:

```bash
sudo mkdir /mnt/data
sudo mount /dev/nvme1n1 /mnt/data
```

মাউন্টটি যেন ভালো দেখায় তার জন্য আমরা `df -h` ব্যবহার করি।

![img](/img/full-node-docker/space.png)

যদি সবকিছু ভালো মনে হয়, তবে আমরা Bor এবং Heimdall-এর জন্য এই মাউন্টেও হোম ডিরেক্টরি তৈরি করতে পারি।

```bash
sudo mkdir /mnt/data/bor
sudo mkdir /mnt/data/heimdall
```

আপনার ব্যবহারের বিষয় এবং অপারেটিং সিস্টেমের উপর নির্ভর করে, সিস্টেম রিবুট করার সময় আপনার ডিভাইসটি যেন মাউন্ট করা থাকে তা নিশ্চিত করতে আপনি `/etc/fstab`-এ একটি এন্ট্রি তৈরি করতে চাইবেন।

আমাদের ক্ষেত্রে, আমরা এই রকম কিছু ধাপ অনুসরণ করছি:

```bash
# Use blkid to get the UUID for the device that we're mounting
blkid

# Edit the fstab file  and add a line to mount your device
# UUID={your uuid}		/mnt/data	{your filesystem}	defaults	0	1
sudo emacs /etc/fstab

# use this to verify the fstab actually works
sudo findmnt --verify --verbose
```

এই সময়ে আপনি রিবুট করতে এবং নিশ্চিত করতে সক্ষম হবেন যে সিস্টেম আপনার মাউন্ট সঠিকভাবে লোড করে।

### Heimdall সেটআপ {#heimdall-setup}

এই সময়ে, docker চলমান অবস্থায় আমাদের কাছে একটি হোস্ট রয়েছে এবং আমাদের Polygon নোড সফটওয়্যার চালানোর জন্য আমাদের পর্যাপ্ত মাউন্ট করা স্টোরেজ রয়েছে। তাই আসুন Heimdall কনফিগার করি এবং চালাই।

প্রথমে, docker দিয়ে Heimdall চালানোর বিষয়টি নিশ্চিত করতে হবে। নিম্নলিখিত কমান্ড চালান:

```bash
docker run -it 0xpolygon/heimdall:0.3.0 heimdallcli version
```

যদি আপনি প্রথমবারের মতো docker দিয়ে Heimdall চালান, তবে এটি স্বয়ংক্রিয়ভাবে প্রয়োজনীয় ছবি টেনে নিয়ে আসবে এবং আউটপুট হিসেবে সংস্করণের তথ্য দেবে।

![img](/img/full-node-docker/heimdall-version.png)

আপনি যদি Heimdall ছবির তথ্য পরীক্ষা করতে চান বা ভিন্ন কোনো ট্যাগ খুঁজে পান, তবে আপনি Docker Hub-এ রিপোজিটরির দিকে নজর দিতে পারেন: https://hub.docker.com/repository/docker/0xpolygon/heimdall

এই সময়ে, আমাদের হোম ডিরেক্টরি সেট আপ করতে Heimdall `init` কমান্ড চালান।

```bash
docker run -v /mnt/data/heimdall:/heimdall-home:rw --entrypoint /usr/bin/heimdalld -it 0xpolygon/heimdall:0.3.0 init --home=/heimdall-home
```

কিছু ভুল Let’s এই কমান্ডটি একটু নিচে বিরতি দেও।

* আমরা ডকার মাধ্যমে একটি কমান্ড চালানোর `docker run`জন্য ব্যবহার করছি।

* `-v /mnt/data/heimdall:/heimdall-home:rw` সুইচটি খুবই গুরুত্বপূর্ণ। এটি একটি ডকার ভলিউম হিসাবে আমাদের হোস্ট সিস্টেম `/mnt/data/heimdall`থেকে কন্টেইনার এর `/heimdall-home`মধ্যে যে ফোল্ডারটি তৈরি করেছি তা মাউন্ট করছে।

* `rw` কমান্ডটিকে এই docker ভলিউম লিখতে দেয়। ডকার কন্টেইনার এর মধ্যে থেকে সমস্ত উদ্দেশ্য এবং উদ্দেশ্যে Heimdall এর জন্য হো, ে হোম ডিরেক্টরি `/heimdall-home`হবে।

* আর্গুমেন্ট এই কন্টেইনারের জন্য ডিফল্ট এন্ট্রি পয়েন্ট ওভাররাইড `--entrypoint /usr/bin/heimdalld`করছে।

* switch কমান্ড চালানোর জন্য সুইচ ব্যবহার করা `-it`হয়।

* অবশেষে আমরা আমরা কোন ছবি যা দিয়ে রান করতে চাই নির্দিষ্ট করছি `0xpolygon/heimdall:0.3.0`।

* এরপরে, `init --home=/heimdall-home` হলো সেসকল আর্গুমেন্ট যেগুলো heimdalld এক্সিকিউটেবলে পাস করা করা হয়েছে। `init` হলো সেই কমান্ড যা আমরা চালাতে চাই এবং হোম ডিরেক্টরির অবস্থান নির্দিষ্ট করতে `--home` ব্যবহার করা হয়।

`init` কমান্ডটি চালানোর পরে, আপনার `/mnt/data/heimdall` ডিরেক্টরির কিছু কাঠামো থাকতে হবে এবং দেখতে এরকম হবে:

![img](/img/full-node-docker/heimdall-tree.png)

এখন Heimdall শুরু করার আগে আমাদেরকে কিছু আপডেট করতে হবে। প্রথমে, আমরা `config.toml` ফাইল সম্পাদনা করতে চলেছি।

```bash
# Open the config.toml and and make three edits
# moniker = "YOUR NODE NAME HERE"
# laddr = "tcp://0.0.0.0:26657"
# seeds = "LATEST LIST OF SEEDS"

sudo emacs /mnt/data/heimdall/config/config.toml
```

আপনার কাছে যদি কোনো সিড না থাকে, তবে একটি সম্পূর্ণ নোড সেট আপ করার জন্য আপনি ডকুমেন্টেশনে একটি সিড পাবেন। আমাদের ক্ষেত্রে, আমাদের ফাইলের এই তিনটি লাইন রয়েছে:

```
# A custom human readable name for this node
moniker="examplenode01"

# TCP or UNIX socket address for the RPC server to listen on
laddr = "tcp://0.0.0.0:26657"

# Comma separated list of seed nodes to connect to
seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
```

:::caution

ফাইলের `laddr`ভিতরে দুটি `config.toml`আছে। নিশ্চিত Make ে নিন যে আপনি শুধুমাত্র বিভাগে `laddr`প্যারামিটারটি পরিবর্তন `[rpc]`করেন।

:::

এখন আপনার `config.toml` ফাইলে সবকিছু সেট করা আছে, আপনাকে আপনার `heimdall-config.toml` ফাইলে দুটি ছোট পরিবর্তন করতে হবে। এই দুটি সেটিংস আপডেট করতে আপনার প্রিয় এডিটর ব্যবহার করুন:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "http://localhost:9545"

# RPC endpoint for bor chain
bor_rpc_url = "http://localhost:8545"
```

Ethereum মেইননেট RPC-এর জন্য আপনি যে URL-ই ব্যবহার করেন না কেনো, `eth_rpc_url` আপডেট করা উচিত। `bor_rpc_url`আমাদের ক্ষেত্রে আমাদের ক্ষেত্রে আপডেট করা হবে ।`http://bor:8545` সম্পাদনা তৈরি করার পরে, আমাদের ফাইলের এই লাইন রয়েছে:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "https://eth-mainnet.g.alchemy.com/v2/ydmGjsREDACTED_DONT_USE9t7FSf"

# RPC endpoint for bor chain
bor_rpc_url = "http://bor:8545"
```

ডিফল্ট `init` কমান্ডটি একটি `genesis.json` প্রদান করে, তবে এটি Polygon মেইননেট বা মুম্বাই-এর সাথে কাজ করবে না। আপনি যদি একটি মেইননেট নোড সেট আপ করেন, তবে সঠিক জেনেসিস ফাইল ডাউনলোড করতে আপনি এই কমান্ডটি চালাতে পারেন:

```bash
sudo curl -o /mnt/data/heimdall/config/genesis.json https://raw.githubusercontent.com/maticnetwork/heimdall/master/builder/files/genesis-mainnet-v1.json
```

আপনার ছে সঠিক ফাইল আছে কি না তা যদি আপনি যাচাই করতে চান, তবে আপনি এই হ্যাশের বিপরীতে চেক করতে পারেন:

```
# sha256sum genesis.json
498669113c72864002c101f65cd30b9d6b159ea2ed4de24169f1c6de5bcccf14  genesis.json
```

## Heimdall শুরু করা {#starting-heimdall}
Heimdall শুরু করার আগে, আমরা একটি docker নেটওয়ার্ক তৈরি করতে যাচ্ছি, যাতে নামের উপর ভিত্তি করে কন্টেইনারগুলো সহজেই একে অপরের সাথে নেটওয়ার্ক করতে পারে। নেটওয়ার্ক তৈরি করতে, নিম্নলিখিত কমান্ডটি চালান:

```bash
docker network create polygon
```

এখন আমরা Heimdall শুরু করতে চলেছি। নিম্নলিখিত কমান্ড চালান:

```bash
docker run -p 26657:26657 -p 26656:26656 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdall --entrypoint /usr/bin/heimdalld -d --restart unless-stopped  0xpolygon/heimdall:0.3.0 start --home=/heimdall-home
```

এই কমান্ডটির অনেক ছোট ছোট অংশ পরিচিত মনে হবে। তাই এর নতুন কি হচ্ছে তা সম্পর্কে কথা বলি।

* `-p 26657:26657` এবং `-p 26656:26656` সুইচগুলো হলো পোর্ট ম্যাপিং। এটি ডকার কন্টেইনার `26657``26657`পোর্টে হোস্ট পোর্ট ম্যাপ করতে এবং এর জন্য একই জন্য নির্দেশ করবে।`26656`

* `--net polygon`সুইচ ডকার বলছে যে  

* `--name heimdall`debugging, জন্য উপকারী যা কন্টেইনার নাম হচ্ছে কিন্তু এটি সব নাম যা Heimdall সাথে সংযোগ করতে অন্যান্য কন্টেইনার জন্য ব্যবহার করা হবে।

* `-d`আর্গুমেন্ট ডকার বলছে যে ব্যাকগ্রাউন্ডে এই কন্টেইনার চালানোর জন্য হবে।

* সুইচ ডকার স্বয়ংক্রিয়ভাবে কন্টেইনার পুনরায় চালু করতে `--restart unless-stopped`বলে, যদি না তা নিজে বন্ধ করা হ. ।

* অবশেষে, আসলে পরিবর্তে অ্যাপ্লিকেশন চালানোর জন্য ব্যবহার করা হচ্ছে, `init`যার পরিবর্তে শুধু হোম ডিরেক্টরি সেট আপ `start`করুন।

এই সময়ে, কী হচ্ছে তা পরীক্ষা করা ও দেখা কার্যকর। এই দুটি কমান্ড থেকে ফায়দা হতে পারে:

```bash
# ps will list the running docker processes. At this point you should see one container running
docker ps

# This command will print out the logs directly from the heimdall application
docker logs -ft heimdall
```

এই সময়ে, Heimdall সিঙ্ক শুরু করবে। আপনি লগ দেখলে, আপনি এই মত দেখতে যে একটি তথ্য of হচ্ছে একটি লগ দেখতে হবে:

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

আপনি যদি এই রকম কোনো তথ্য দেখতে না পান, তবে আপনার নোড পর্যাপ্ত সহযোগী খুঁজে নাও পেতে পারে। এই সময়, অন্য দরকারী কমান্ডটি হলো একটি RPC কল, যা Heimdall-এর সিঙ্ক হওয়ার অবস্থা পরীক্ষা করতে পারে:

```bash
curl localhost:26657/status
```

এটি এরূপ একটি প্রতিক্রিয়া ফেরত দেবে:

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

প্রাথমিক সেটআপের এই পর্যায়ে, `sync_info` ফিল্ডে মনোযোগ দেওয়া গুরুত্বপূর্ণ। যদি `catching_up` সত্য হয়, তবে এর মানে হলো Heimdall পুরোপুরি সিঙ্ক হয়নি। Heimdall কত পেছনে রয়েছে সে সম্পর্কে ধারণা পেতে আপনি `sync_info` থেকে অন্যান্য বৈশিষ্ট্যগুলো দেখতে পারেন।

## Bor শুরু হওয়া {#starting-bor}

এই সময়ে, আপনার এমন একটি নোড থাকতে হবে যা সফলভাবে Heimdall চালায়। Bor চালানোর জন্য আপনার এখন প্রস্তুত থাকতে হবে।

Bor দিয়ে শুরু করার আগে, আমাদেরকে Heimdall রেস্ট সার্ভার চালাতে হবে। এই কমান্ডটি একটি REST API চালু করবে, যা Heimdall থেকে তথ্য উদ্ধার করতে Bor ব্যবহার করে থাকে। সার্ভার শুরু করার জন্য কমান্ড হল:

```bash
docker run -p 1317:1317 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdallrest --entrypoint /usr/bin/heimdalld -d --restart unless-stopped 0xpolygon/heimdall:0.3.0 rest-server --home=/heimdall-home --node "tcp://heimdall:26657"
```

এই কমান্ডটির দুটি অংশ রয়েছে, যেগুলো ভিন্ন ভিন্ন এবং উল্লেখ করা জরুরি। `rest-server` কমান্ডটি চালানোর পরিবর্তে, আমরা `start` কমান্ডটি চালাচ্ছি। এছাড়াও, আমরা `~–node “tcp://heimdall:26657”~` পাস করছি, এটি আমরা Heimdall-এর সাথে কীভাবে যোগাযোগ করতে পারি তা রেস্ট সার্ভারকে বলে।

যদি আপনি রান `docker ps`করলে এই কমান্ড সফলভাবে রান করে, তাহলে আপনাকে এখন দুটি কমান্ড কন্টেইনার দেখতে হবে। উপরন্তু, আপনি যদি এই কমান্ডটি চালান, তবে আপনি কিছু মৌলিক আউটপুট দেখতে পাবেন:

```bash
curl localhost:1317/bor/span/1
```

Bor এই ইন্টারফেসের উপর নির্ভর করবে। তাই যদি আপনি JSON আউটপুট না দেখতে পান, তাহলে সেখানে কিছু ভুল!

এখন আসুন বিশেষ করে বোর জন্য `genesis`ফাইল ডাউনলোড করুন:

```bash
sudo curl -o /mnt/data/bor/genesis.json 'https://raw.githubusercontent.com/maticnetwork/bor/master/builder/files/genesis-mainnet-v1.json'
```

এই ফাইলের জন্য আবার `sha256 sum` যাচাই করা যাক:

```
# sha256sum genesis.json
4bacbfbe72f0d966412bb2c19b093f34c0a1bd4bb8506629eba1c9ca8c69c778  genesis.json
```

এখন আমাদের Bor-এ শুরু করার জন্য একটি ডিফল্ট কনফিগ ফাইল তৈরি করতে হবে।

```bash
docker run -it  0xpolygon/bor:0.3.3 dumpconfig | sudo tee /mnt/data/bor/config.toml
```

এই কমান্ড ডিফল্ট সেটিংসের সাথে একটি .toml ফাইল তৈরি করতে যাচ্ছে। আমরা ফাইলে কয়েক পরিবর্তন করতে যাচ্ছি, তাই আপনার প্রিয় এডিটরটি খুলুন, এবং কিছু আপডেট করুন। দ্রষ্টব্য: আমরা শুধুমাত্র যে লাইন পরিবর্তন করা হচ্ছে তা প্রদর্শন করছি।

রেফারেন্সের জন্য, আপনি এখানে Bor ইমেজ এর বিস্তারিত দেখতে পারেন: [https://hub.docker.com/respository/docker/0xpolygon/bor](https://hub.docker.com/repository/docker/0xpolygon/bor)

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

এই সময়ে, Bor চালু করার জন্য আমাদেরকে প্রস্তুত হতে হবে। আমরা এই কমান্ডটি ব্যবহার করতে যাচ্ছি:
```bash
docker run -p 30303:30303 -p 8545:8545 -v /mnt/data/bor:/bor-home:rw --net polygon --name bor -d --restart unless-stopped  0xpolygon/bor:0.3.3 server --config /bor-home/config.toml
```

সবকিছু ভাল গেলে, তাহলে আপনাকে অনেক লগ দেখতে হবে যা এই মত দেখতে হবে:

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

Bor-এর সিঙ্কের অবস্থা দেখার কিছু উপায় রয়েছে। সবচেয়ে সহজটি হচ্ছে `curl`-এর মাধ্যমে:

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

আপনি যখন এই কমান্ড রান করেন, তখন এটি আপনাকে একটি ফলাফল দেবে:

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

এটি `currentBlock`-কে নির্দেশ করবে যে এটি সিঙ্ক হয়েছে এবং `highestBlock`-কেও করবে, যার সম্পর্কে আমরা জানি। যদি নোড ইতিমধ্যে সিঙ্ক করা হ, , তাহলে আমাদের অবশ্যই পাবেন `false`।

## স্ন্যাপশট {#snapshots}
আপনি পাবেন যে স্ক্র্যাচ থেকে সিঙ্ক করা খুব দীর্ঘ সময় নিতে পারে। আপনি যদি প্রসেস আপ গতি দিতে চান তবে আপনি এখানে তালিকাভুক্ত instructions অনুসরণ করতে পারেন: [https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/](https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/)

এটি সবচেয়ে সাম্প্রতিক নির্দেশনা হবে, তবে আপনি মোটামুটিভাবে নিচের কাজগুলো করতে পারেন:

```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# At this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```
