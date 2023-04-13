---
id: client-setup
title: একটি আর্কাইভ নোড ক্লায়েন্ট সেট আপ করা
sidebar_label: Set up an Archive Node Client
description: "সিস্টেমের প্রয়োজনীয়তা এবং ক্লায়েন্ট সেটআপ।"
keywords:
  - erigon
  - archive
  - node
  - docs
  - polygon
  - client
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## সিস্টেমের প্রয়োজনীয়তা {#system-requirements}

### আর্কাইভ নোড {#archive-node}

- 16-কোর CPU
- 64 GP RAM
- মূলত অন্তত 20k+ iops এবং raid-0 ভিত্তিক ডিস্ক স্ট্রাকচার সহ io1 বা তার উপরে

### Erigon ক্লায়েন্ট {#erigon-client}

- Polygon an একটি আর্কাইভে নোডের জন্য: 5TB
- Polygon Mumbai: 1TB
- SSD বা NVMe। ক্ষমতাটির কাছাকাছি গেলে এসএসডি কর্মক্ষমতা অবনতি মনে রাখবেন
- RAM: > = 16GB, 64-bit আর্কিটেকচার
- Golang সংস্করণ > = 1.18, GCC 10+

:::note HDD সুপারিশ করা হয় না

HDDs-এ, Erigon সবসময় চেইন টিপের N ব্লক পেছনে থাকবে কিন্তু পিছনে থাকবে না।

:::

## Erigon ক্লায়েন্ট সেটআপ {#erigon-client-setup}

### কীভাবে ইনস্টল করতে হয় {#how-to-install}

Erigon ইনস্টল করতে নিম্নলিখিত কমান্ডগুলো চালান:

```bash
git clone --recurse-submodules -j8 https://github.com/maticnetwork/erigon.git
cd erigon
git checkout v0.0.5
make erigon
```

এটি `./build/bin/erigon`-এ বাইনারি তৈরি করবে

একটি স্থিতিশীল সংস্করণ পেতে আমাদের ফর্কড রেপোতে `v0.0.5` ট্যাগ ব্যবহার করুন।

### কীভাবে শুরু করবেন {#how-to-start}

Erigon শুরু করতে, রান:

```bash
erigon --chain=mumbai
```

- মুম্বাই টেস্টনেট-এর জন্য `chain=mumbai` ব্যবহার করুন
- Polygon for `chain=bor-mainnet`জন্য ব্যবহার করুন

### কীভাবে Erigon কনফিগার করতে হয় {#how-to-configure-erigon}

- আপনি যদি কোনো নন-ডিফল্ট অবস্থানে Erigon ফাইলগুলো সংরক্ষণ করতে চান, তবে `-datadir` ব্যবহার করুন

    ```
    erigon --chain=mumbai --datadir=<your_data_dir>
    ```

- আপনি যদি স্থানীয় **heimdall**, ব্যবহার না করেন, তবে `-bor.heimdall=<your heimdall url>` ব্যবহার করুন। ডিফল্টরূপে, এটি `localhost:1317`-এর সাথে সংযোগ করার চেষ্টা করবে।

    ```makefile
    erigon --chain=mumbai --bor.heimdall=<your heimdall url> --datadir=<your_data_dir>
    ```

    - আপনি যদি Polygon Mumbai Testnet ব্যবহার করতে চান তাহলে [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology)

    - Polygon For জন্য: [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology)

### দ্রুত সিঙ্কের জন্য টিপস {#tips-for-faster-sync}

- দ্রুত প্রাথমিক সিঙ্কের জন্য উচ্চ IOPS এবং RAM সহ মেশিনটি ব্যবহার করুন
- স্ন্যাপশট ডাউনলোড/আপলোডের গতি বাড়ানোর জন্য নিচের কমান্ডগুলো ব্যবহার করুন:

```makefile
--torrent.upload.rate="512mb" --torrent.download.rate="512mb"
```

আপনার মেশিনটি যেই ব্যান্ডউইথ পরিচালনা করতে পারে তার সাথে `512` প্রতিস্থাপন করুন।
