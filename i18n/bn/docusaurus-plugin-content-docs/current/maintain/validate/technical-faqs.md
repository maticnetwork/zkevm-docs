---
id: technical-faqs
title: প্রযুক্তির FAQ-সমূহ
description: Polygon নেটওয়ার্কে একটি Validator চালানোর জন্য প্রায়শই জিজ্ঞাসিত questions
keywords:
  - docs
  - polygon
  - polygon wiki
  - faqs
  - technical
slug: technical-faqs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### 1. Heimdall এবং Bor কীস্টোরের জন্য প্রাইভেট কীগুলি কি একই? {#1-are-the-private-keys-same-for-heimdall-and-bor-keystore}

হ্যাঁ, যাচাইকারী কী এবং Bor কীস্টোর তৈরির জন্য ব্যবহৃত প্রাইভেট কীগুলি একই।
এই উদাহরণে ব্যবহৃত প্রাইভেট কী হল আপনার ওয়ালেটের ETH ঠিকানা যেখানে আপনার Polygon
টেস্টনেটের টোকেন সংরক্ষিত আছে।

### 2. কমন কমান্ডের তালিকা {#2-list-of-common-commands}

আমাদের কাছে বর্তমানে Linux প্যাকেজগুলির জন্য আপনার জন্য একটি সহজে ডাইভ-ইন তালিকা রয়েছে। আমরা আরও সুবিধার জন্য
এই তালিকাটি নিয়মিত আপডেট করতে থাকব।

**Linux প্যাকেজের জন্য**

#### A. Heimdall জেনেসিস ফাইল কোথায় পাবেন {#a-where-to-find-heimdall-genesis-file}

`$CONFIGPATH/heimdall/config/genesis.json`

#### B. heimdall-config.toml কোথায় পাবেন {#b-where-to-find-heimdall-config-toml}

`/etc/heimdall/config/heimdall-config.toml`

#### C. config.toml কোথায় পাবেন {#c-where-to-find-config-toml}

`/etc/heimdall/config/config.toml`

#### D. heimdall-seeds.txt কোথায় পাবেন {#d-where-to-find-heimdall-seeds-txt}

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

#### E. Heimdall শুরু করুন {#e-start-heimdall}

`$ sudo service heimdalld start`

#### F. Heimdall রেস্ট সার্ভার শুরু করুন {#f-start-heimdall-rest-server}

`$ sudo service heimdalld-rest-server start`

#### G. Heimdall ব্রিজ সার্ভার শুরু করুন {#g-start-heimdall-bridge-server}

`$ sudo service heimdalld-bridge start`

#### H. Heimdall লগ {#h-heimdall-logs}

`/var/log/matic-logs/`

#### I. Bor জেনেসিস ফাইল কোথায় পাবেন {#i-where-to-find-bor-genesis-file}

`$CONFIGPATH/bor/genesis.json`

#### J. Bor শুরু করুন {#j-start-bor}

`sudo service bor start`

#### K Heimdall লগ যাচাই করুন {#k-check-heimdall-logs}

`tail -f heimdalld.log`

#### L. Heimdall রেস্ট সার্ভার যাচাই করুন {#l-check-heimdall-rest-server}

`tail -f heimdalld-rest-server.log`

#### M. Heimdall ব্রিজ লগ যাচাই করুন {#m-check-heimdall-bridge-logs}

`tail -f heimdalld-bridge.log`

#### N. Bor লগ যাচাই করুন {#n-check-bor-logs}

`tail -f bor.log`

#### O. Bor প্রসেস শেষ করুন {#o-kill-bor-process}

**Linux-এর জন্য**:

1. `ps -aux | grep bor`. Bor-এর PID পান এবং নিম্নলিখিত কমান্ডটি চালান।
2. `sudo kill -9 PID`

**বাইনারির জন্য**:

`CS-2003/bor`-এ যান এবং `bash stop.sh` চালান

### 3. ত্রুটি: অ্যাকাউন্ট আনলক করা যায়নি (0x...) প্রদত্ত ঠিকানা বা ফাইলের জন্য কোনো কী নেই {#3-error-failed-to-unlock-account-0x-no-key-for-given-address-or-file}

এই ত্রুটি দেখা দিতে পারে কারণ password.txt ফাইলের জন্য পাথটি ভুল। আপনি এই সংশোধন করার জন্য নিচের পদক্ষেপ অনুসরণ করতে পারেন:

এই ত্রুটি দেখা দিতে পারে কারণ password.txt এবং Keystore ফাইলের জন্য পাথটি ভুল। আপনি এই সংশোধন করার জন্য নিচের পদক্ষেপ অনুসরণ করতে পারেন:

1. Bor কীস্টোর ফাইল এতে কপি করুন

    /etc/bor/dataDir/keystore

2. এবং password.txt এতে

    /etc/bor/dataDir/

3. `/etc/bor/metadata`-এ যে আপনি সঠিক ঠিকানা যোগ করেছেন তা নিশ্চিত করুন

বাইনারির জন্য:

1. Bor কীস্টোর ফাইল এতে কপি করুন:

`/var/lib/bor/keystore/`

2. এবং password.txt এতে

`/var/lib/bor/password.txt`


### 4. ত্রুটি: ভুল Block.Header.Apphash. xxxx প্রত্যাশিত {#4-error-wrong-block-header-apphash-expected-xxxx}

এটি সাধারণত ভুলভাবে Heimdall ইনস্টলেশনের কারণে ঘটে। আপনি এটি সংশোধন করার জন্য নিচে দেওয়া পদক্ষেপগুলি অনুসরণ করতে পারেন:

চালান

    ```heimdalld unsafe-reset-all```

এবং Heimdall পরিষেবা আবার শুরু করুন। আপনি এই গাইডটি উল্লেখ করতে পারেন - https://docs.polygon.technology/docs/validate/validate/run-validator

### 5. আমি কোথায় API কী তৈরি করব? {#5-from-where-do-i-create-the-api-key}

আপনি এই লিঙ্ক অ্যাক্সেস করতে পারেন: [https://infura.io/register](https://infura.io/register) . নিশ্চিত করুন যে আপনি একবার আপনার অ্যাকাউন্ট এবং প্রজেক্ট সেট আপ করার পরে, আপনি রপস্টেনের জন্য API কী কপি করেছেন এবং মেইননেটের জন্য নয়।

Mainnet ডিফল্ট হিসেবে নির্বাচিত হয়।

### 6. Heimdall কাজ করছে না। আমি একটি প্যানিক ত্রুটি পাচ্ছি {#6-heimdall-isn-t-working-i-m-getting-a-panic-error}

**প্রকৃত ত্রুটি**: আমার Heimdalld কাজ করছে না। লগের প্রথম লাইন হলো:
প্যানিক: অজানা db_backend leveldb, প্রত্যাশিত হয় goleveldb বা memdb বা fsdb

`config.toml` এর মধ্যে `goleveldb` এ কনফিগারেশন পরিবর্তন করুন।


### 7. আমি কিভাবে Heimdall এবং Bor এর অবশিষ্টাংশ মুছে ফেলব? {#7-how-do-i-delete-remnants-of-heimdall-and-bor}

আপনি যদি Heimdall এবং Bor এর অবশিষ্টাংশ মুছে ফেলতে চান তবে আপনি নিম্নলিখিত কমান্ড চালাতে পারেন
Bor:

Linux প্যাকেজের জন্য:

```$ sudo dpkg -i matic-bor```

এবং Bor ডিরেক্টরি মুছুন:

```$ sudo rm -rf /etc/bor```

বাইনারির জন্য:

```$ sudo rm -rf /etc/bor```

এবং

```$ sudo rm /etc/heimdall```


### 8. কতগুলি যাচাইকারী একযোগে সক্রিয় থাকতে পারে? {#8-how-many-validators-can-be-active-concurrently}

একই সময়ে সর্বোচ্চ 100 জন সক্রিয় যাচাইকারী থাকবে। ইভেন্টের মধ্য দিয়েও সীমা মাঝপথে পৌঁছে গেলে আমরা আরও অংশগ্রহণকারীদের নিয়ে আসব। লক্ষ্য করুন যে সক্রিয় যাচাইকারীদের বেশিরভাগই আপটাইম বেশি থাকে। উচ্চ ডাউনটাইম সহ অংশগ্রহণকারীদের জোর করে বের করে দেওয়া হবে৷

### 9. আমাকে কত স্ট্যাক করতে হবে? {#9-how-much-should-i-stake}

"স্ট্যাকের-পরিমাণ" এবং "Heimdall-ফি-পরিমাণ" - এটি কত হওয়া উচিত?

স্ট্যাকের পরিমাণের জন্য ন্যূনতম 10টি MATIC টোকেন প্রয়োজন যেখানে Heimdall ফি 10-এর বেশি হতে হবে। উদাহরণস্বরূপ, আপনার স্ট্যাকের পরিমাণ 400 তারপর Heimdall ফি 20 হতে হবে। আমরা Heimdall ফি 20 হিসাবে রাখার পরামর্শ দেই।

যাইহোক, অনুগ্রহ করে মনে রাখবেন যে স্ট্যাকের পরিমাণ এবং Heimdall-ফি-পরিমাণে প্রবেশ করানো মান 18 দশমিকে হতে হবে

উদাহরণস্বরূপ,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 10. আমি একজন যাচাইকারী হওয়ার জন্য নির্বাচিত হয়েছিলাম কিন্তু আমার ETH ঠিকানা ভুল ছিল। আমি কী করব? {#10-i-was-selected-to-become-a-validator-but-my-eth-address-was-incorrect-what-do-i-do}

আপনার যদি আগে জমা দেওয়া ETH ঠিকানায় অ্যাক্সেস থাকে তবে আপনি সেই অ্যাকাউন্ট থেকে বর্তমান অ্যাকাউন্টে টেস্ট টোকেন ট্রান্সফার করতে পারেন। এবং তারপর আপনি আপনার নোড সেট আপ করার জন্য আপনার প্রক্রিয়া শুরু করতে পারেন।

যদি আপনার সেই ETH ঠিকানায় অ্যাক্সেস না থাকে, তাহলে আমরা আপনাকে আলাদাভাবে টোকেন ট্রান্সফার করব না। আপনি সঠিক ETH ঠিকানা সহ আবার ফর্মে পুনরায় রেজিস্টার করতে পারেন।

### 11. আমি ব্রিজ শুরু করার একটি ত্রুটি পেয়ে যাচ্ছি {#11-i-m-getting-an-error-starting-the-bridge}

**ত্রুটি:** অবজেক্ট "start" অজানা, "bridge help" ব্যবহার করুন। এটা কি এখনও উপেক্ষা করা ঠিক?

"which bridge" চেক করুন - যদি এটি `/usr/sbin/bridge` হয় তাহলে আপনি সঠিক "bridge" প্রোগ্রাম চালাচ্ছেন না।

`(or $GOBIN/bridge)` এর পরিবর্তে `~/go/bin/bridge` ব্যবহার করে দেখুন


### 12. আমি dpkg-তে ত্রুটি পেয়ে যাচ্ছি {#12-i-m-getting-dpkg-error}

**ত্রুটি**: "dpkg: ত্রুটি প্রক্রিয়াকরণ সংরক্ষণাগার matic-heimdall_1.0.0_amd64.deb (-install): '/heimdalld-rest-server.service' ওভাররাইট করার চেষ্টা করা হচ্ছে, যা প্যাকেজ ম্যাটিক-নোড 1.0.0"-এও রয়েছে

এটি মূলত আপনার মেশিনে Polygon-এর পূর্ববর্তী ইনস্টলেশনের কারণে ঘটে। সমাধান করার জন্য আপনি চালাতে পারেন:

`sudo dpkg -r matic-node`


### 13. আমি স্পষ্ট নই যে, আমি যখন যাচাইকারী কী তৈরি করব তখন কোন প্রাইভেট কী যোগ করব {#13-i-m-not-clear-on-which-private-key-should-i-add-when-i-generate-validator-key}

ব্যবহার করা প্রাইভেট কী হলো আপনার ওয়ালেটের ETH ঠিকানা যেখানে আপনার Polygon টেস্টনেট টোকেন সংরক্ষণ করা হয়। আপনি ফর্মে জমা দেওয়া ঠিকানায় বাঁধা একটি পাবলিক-প্রাইভেট কী জোড়া দিয়ে সেটআপ সম্পূর্ণ করতে পারেন।


### 14. Heimdall সিঙ্ক করা হয়েছে কিনা তা জানার কি কোনো উপায় আছে? {#14-is-there-a-way-to-know-if-heimdall-is-synced}

আপনি এটি চেক করার জন্য নিম্নলিখিত কমান্ড চালাতে পারেন:

```$ curl [http://localhost:26657/status](http://localhost:26657/status)```

catching_up এর মান চেক করুন। যদি এটি মিথ্যা হয় তবে নোড সব সিঙ্ক আপ হয়েছে।


### 15. কেউ যদি শীর্ষ 10 স্ট্যাকার হয়ে যায়, তাহলে সে শেষ পর্যন্ত কীভাবে তার MATIC পুরস্কার পাবে? {#15-what-if-someone-become-a-top-10-staker-how-he-will-receive-his-matic-reward-at-the-end}

স্টেজ 1 এর পুরস্কার স্ট্যাকের উপর নির্ভর করে না। অনুগ্রহ করে পুরস্কারের বিবরণের জন্য https://blog.matic.network/counter-stake-stake-stage-1-stake-on-the-beach-full-details-matic-network/ পড়ুন। উচ্চ স্ট্যাক সহ অংশগ্রহণকারীরা এই পর্যায়ে স্বয়ংক্রিয়ভাবে পুরস্কারের জন্য যোগ্যতা অর্জন করে না।


### 16. আমার Heimdall সংস্করণ কী হতে হবে? {#16-what-should-be-my-heimdall-version}

আপনার Heimdall সংস্করণ চেক করার জন্য আপনি কেবল চালাতে পারেন:

```heimdalld version```

পর্যায় 1 এর জন্য Heimdall এর সঠিক সংস্করণ হতে হবে `heimdalld version is beta-1.1-rc1-213-g2bfd1ac`


### 17. স্ট্যাকের পরিমাণ এবং ফি পরিমাণে আমার কী মান যোগ করা উচিত? {#17-what-values-should-i-add-in-the-stake-amount-and-fee-amount}

স্ট্যাকের পরিমাণের জন্য ন্যূনতম 10টি MATIC টোকেন প্রয়োজন যেখানে Heimdall ফি 10-এর বেশি হতে হবে। উদাহরণস্বরূপ, আপনার স্ট্যাকের পরিমাণ 400 তারপর Heimdall ফি 20 হতে হবে। আমরা Heimdall ফি 20 হিসাবে রাখার পরামর্শ দেই।

যাইহোক, অনুগ্রহ করে মনে রাখবেন যে স্ট্যাকের পরিমাণ এবং Heimdall-ফি-পরিমাণে প্রবেশ করানো মান 18 দশমিকে হতে হবে

উদাহরণস্বরূপ,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 18. `/var/lib/heimdall` এবং `/etc/heimdall?`এর মধ্যে পার্থক্য কী

আপনি বাইনারি ইনস্টলেশন পদ্ধতি ব্যবহার করার সময় Heimdall-এর ডিরেক্টরি হলো `/var/lib/heimdall`। লিনাক্স প্যাকেজ ইনস্টলেশন পদ্ধতির জন্য `/etc/heimdall`।


### 19. যখন আমি স্ট্যাক লেনদেন তৈরি করি, তখন আমি "গ্যাস অতিক্রম করা" ত্রুটি পেয়ে যাচ্ছি {#19-when-i-make-the-stake-transaction-i-m-getting-gas-exceeded-error}

এই ত্রুটিটি স্ট্যাক বা ফি পরিমাণ বিন্যাসের কারণে ঘটতে পারে। স্ট্যাক কমান্ডের সময় প্রবেশ করা মানগুলির 18 দশমিক থাকতে হবে।

যাইহোক, অনুগ্রহ করে মনে রাখবেন যে স্ট্যাকের পরিমাণ এবং Heimdall-ফি-পরিমাণে প্রবেশ করানো মান 18 দশমিকে হতে হবে

উদাহরণস্বরূপ,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 20. আমি কখন একজন যাচাইকারী হওয়ার সুযোগ পাব? {#20-when-will-i-get-a-chance-to-become-a-validator}

আমরা পর্যায় 1 ইভেন্টের পুরো সময় জুড়ে ক্রমান্বয়ে যাচাইকারী যোগ করছি। আমরা ধীরে ধীরে নতুন এক্সটার্নাল যাচাইকারীদের একটি তালিকা প্রকাশ করব। এই তালিকাটি Discord চ্যানেলে ঘোষণা করা হবে।


### 21. আমি Heimdall অ্যাকাউন্টের তথ্যের লোকেশন কোথায় পেতে পারি? {#21-where-can-i-find-heimdall-account-info-location}

বাইনারির জন্য:

    /var/lib/heimdall/config folder

Linux প্যাকেজের জন্য:

    /etc/heimdall/config


### 22. আমি কোন ফাইলের মধ্যে API কী যোগ করব? {#22-which-file-do-i-add-the-api-key-in}

একবার আপনার API কী তৈরি করা হয়ে গেলে, আপনাকে `heimdall-config.toml` ফাইলে API কী যোগ করতে হবে।


### 23. আমি কোন ফাইলে persistent_peers যোগ করব? {#23-which-file-do-i-add-the-persistent_peers}

আপনি নিম্নলিখিত ফাইলে persistent_peers যোগ করতে পারেন:

    /var/lib/heimdall/config/config.toml


### 24. "আপনি কি আপনার অ্যাপ্লিকেশনের ডেটা রিসেট না করে Tendermint রিসেট করেছেন?" {#24-did-you-reset-tendermint-without-resetting-your-application-s-data}

এমন একটি ক্ষেত্রে আপনি heimdall কনফিগ ডেটা রিসেট করতে পারেন এবং আবার ইনস্টলেশন চালানোর চেষ্টা করতে পারেন।

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge


### 25. ত্রুটি: কনফিগার ত্রুটি 1 ত্রুটি(গুলি) ডিকোডিং আনমার্শাল করতে অক্ষম {#25-error-unable-to-unmarshall-config-error-1-error-s-decoding}

ত্রুটি: `* '' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract`

এটি বেশিরভাগই ঘটে কারণ যখন টাইপ ভুল থাকে, বা কিছু অনুপস্থিত অংশ বা একটি পুরনো কনফিগার ফাইল যা এখনও অবশিষ্ট রয়েছে। আপনাকে সমস্ত অবশিষ্টাংশ সাফ করতে হবে এবং তারপরে এটি আবার সেট আপ করার চেষ্টা করতে হবে।

### 26. Heimdall এবং Bor পরিষেবা বন্ধ করা {#26-to-stop-heimdall-and-bor-services}

**Linux প্যাকেজের জন্য**:

Heimdall বন্ধ করুন: `sudo service heimdalld stop`

Bor বন্ধ করুন: `sudo service bor stop` বা

1. `ps -aux | grep bor`. Bor-এর PID পান এবং নিম্নলিখিত কমান্ডটি চালান।
2. `sudo kill -9 PID`

**বাইনারির জন্য**:

Heimdall বন্ধ করুন: `pkill heimdalld`

ব্রিজ বন্ধ করুন: `pkill heimdalld-bridge`

Bor বন্ধ করুন: CS-2001/bor এ যান এবং `bash stop.sh` চালান

### 27. Heimdall এবং Bor ডিরেক্টরি অপসারণ করতে {#27-to-remove-heimdall-and-bor-directories}

**Linux প্যাকেজের জন্য**:
Heimdall মুছে ফেলুন: `sudo rm -rf /etc/heimdall/*`

Bor মুছে ফেলুন: `sudo rm -rf /etc/bor/*`

**বাইনারির জন্য**:

Heimdall মুছে ফেলুন: `sudo rm -rf /var/lib/heimdall/`

Bor মুছে ফেলুন: `sudo rm -rf /var/lib/bor`

### 28. আপনি "Wrong Block.Header.AppHash." পেলে কী করবেন৷ ত্রুটি {#28-what-to-do-when-you-get-wrong-block-header-apphash-error}

এই ত্রুটি সাধারণত Infura অনুরোধ নিঃশেষ হওয়ার কারণে ঘটে। আপনি Polygon-এ একটি নোড সেট করার সময়, আপনি কনফিগ ফাইলে (Heimdall) একটি Infura কী যোগ করুন। ডিফল্ট অনুযায়ী আপনাকে প্রতিদিন 100k অনুরোধের অনুমতি দেওয়া হয়, যদি এই সীমা অতিক্রম করা হয়, তাহলে আপনি এই ধরনের সমস্যার সম্মুখীন হবেন। এটি সমাধান করতে আপনি একটি নতুন API কী তৈরি করতে পারেন এবং এটি `config.toml` ফাইলে যোগ করতে পারেন।

:::tip জানার জন্য সঙ্গে থাকুন

Polygon এর টিম এবং কমিউনিটির নিকট থেকে
সর্বশেষ নোড এবং যাচাইকারীর আপডেটে নজর রাখুন
[Polygon-এর নোটিকেশন গ্রুপ](https://polygon.technology/notifications/) এর সদস্যতা নিয়ে।

:::
