---
id: snapshot-instructions-heimdall-bor
title: Heimdall এবং Bor স্ন্যাপশট
description: আরো দ্রুত সিঙ্ক করার জন্য Heimdall এবং Bor স্ন্যাপশটের নির্দেশাবলী।
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
  - heimdall
  - bor
  - snapshots
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

কোনো নতুন সেন্ট্রি, যাচাইকারী বা সম্পূর্ণ নোড সার্ভার সেট করার সময়, নেটওয়ার্কে সিঙ্ক না করেই আরো দ্রুত সিঙ্ক করার জন্য একটি স্ন্যাপশট ব্যবহার করার পরামর্শ দেওয়া হয়। স্ন্যাপশট ব্যবহার করা হলে তা Heimdall এবং Bor উভয়ের জন্যই আপনার বেশ কয়েকটি দিন সাশ্রয় করবে।

:::tip

সর্বশেষ স্ন্যাপশটের জন্য, দয়া করে [<ins>Polygon Chains Snapshots</ins>](https://snapshot.polygon.technology/) দেখুন।

:::

## Heimdall স্ন্যাপশট {#heimdall-snapshot}

প্রথমত, নোড সেটআপ করার নির্দেশিকা অনুযায়ী আপনাকে **পূর্বশর্ত** সহ আপনার নোড সেট আপ করতে হবে। আপনি Heimdall সিঙ্ক করতে শুরু করার আগে, স্ন্যাপশট ব্যবহার করতে নিচের ধাপগুলো অনুসরণ করুন:

1. নিম্নলিখিত কমান্ডটি চালানোর মাধ্যমে আপনার VM-এ Heimdall-এর স্ন্যাপশট tar ফাইল ডাউনলোড করুন:

```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-08.tar.gz
```

2. Heimdall ডেটার ডিরেক্টরিতে tar ফাইল আনপ্যাক করতে, নিম্নলিখিত কমান্ডটি রান করুন:
```
// You must ensure you are running this command before you start the Heimdall service on your node.
// If your Heimdall service has started, please stop the service and run the following command:
// Once unpacking is complete, you can start the Heimdall service again:
tar -xzvf <snapshot file> -C <HEIMDALL_DATA_DIRECTORY>

// If your Heimdall data directory is different,
// please replace the directory name in the command for starting the Heimdall service.
// When this command completes, you may delete the tar file to reclaim space.

// For example, this will unpack the tar file in the Heimdall Data directory:
tar -xzvf heimdall-snapshot-2021-11-08.tar.gz -C /var/lib/heimdall/data/
```

## Bor স্ন্যাপশট {#bor-snapshot}

প্রথমত, নোড সেটআপ করার নির্দেশিকা অনুযায়ী আপনাকে **পূর্বশর্ত** সহ আপনার নোড সেট আপ করতে হবে। আপনি Bor সিঙ্ক করতে শুরু করার আগে, স্ন্যাপশট ব্যবহার করতে নিচের ধাপগুলো অনুসরণ করুন:

1. নিম্নলিখিত কমান্ডটি চালানোর মাধ্যমে আপনার VM-এ Bor-এর স্ন্যাপশট tar ফাইল ডাউনলোড করুন:
```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-08.tar.gz
```

2. Bor ডেটার ডিরেক্টরিতে tar ফাইল আনপ্যাক করতে, নিম্নলিখিত কমান্ডটি রান করুন:

```
// You must ensure you are running this command before you start the Bor service on your node.
// If your Bor service has started, please stop the service and run the following command:
// Once unpacking is complete, you can start the Bor service again.

tar -xzvf <snapshot file> -C <BOR_DATA_DIRECTORY>

// If your bor data directory is different
// please replace the directory name in the command for starting the Bor service.
// When this command completes, you may delete the tar file to reclaim space.

// For example, this will unpack the tar file in the Bor data directory:
tar -xzvf bor-fullnode-snapshot-2022-11-08.tar.gz -C /var/lib/bor/data/bor/chaindata
```

:::note

দ্রুততর স্ন্যাপশট ডাউনলোড করার জন্য `aria2c`পদ্ধতিটি ব্যবহার করা হয়। একটি বিকল্প উপায় আছে যেখানে কোনও হস্তক্ষেপ ছাড়াই ডাউনলোড করা স্ন্যাপশট সরাসরি বের করা যেতে পারে।

**তার জন্য পদক্ষেপ:**


```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c     https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::