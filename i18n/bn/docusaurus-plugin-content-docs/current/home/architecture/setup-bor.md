---
id: setup-bor
title: Bor সেটআপ করুন
description: Bor নোড সেটআপ করুন
keywords:
  - docs
  - matic
  - polygon
  - setup bor
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Bor সেটআপ করুন {#setup-bor}

`master` বা `develop` ব্রাঞ্চ ব্যবহার করুন, কারণ এইগুলোতে স্ট্যাবল রিলিজ রয়েছে।

```bash
    $ mkdir -p $GOPATH/src/github.com/maticnetwork
    $ cd $GOPATH/src/github.com/maticnetwork
    $ git clone https://github.com/maticnetwork/bor
    $ cd bor
    $ make bor-all
```

এখন, আপনার স্থানীয় সিস্টেমে আপনার বোর ইনস্টল আছে এবং বাইনারি পাতায় পাওয়া `./build/bin/bor`যাবে।

### কনসোলে সংযোগ করা হচ্ছে (ঐচ্ছিক) {#connecting-to-console-optional}

এটি একটি ঐচ্ছিক পদক্ষেপ। আপনাকে কোনো কনসোলে সংযোগ করতে হবে না। তবে, আপনি যদি অন্যান্য বিষয়ে আগ্রহী থাকেন, তাহলে আপনি চাইলে তা করতে পারেন।

Geth-এর মতো, আপনি বিভিন্ন ধরনের প্রশ্ন এক্সিকিউট করতে Bor কনসোলে সংযোগ করতে পারেন। আপনার থেকে `dataDir`, নিম্নলিখিত কমান্ড রান করুন:

```bash
    $ cd ~/matic/tesnets
    $ git submodule init
    $ git submodule update

    $ cd ~/matic/tesnets/genesis-contracts
    $ npm install

    $ git submodule init
    $ git submodule update
    $ cd ~/matic/tesnets/genesis-contracts/matic-contracts
    $ npm install
    $ node scripts/process-templates.js --bor-chain-id 15001
    $ npm run truffle:compile
```

টেমপ্লেটগুলি প্রক্রিয়া করার পরে, আমাদের `tesnets/genesis-contracts/validators.js` ফাইলে ভ্যালিডেটর সেট করে দিতে হবে। ফাইলটি নিচের মত দেখতে হবে:

```json
    const validators = [
      {
        address: "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
        stake: 10, // without 10^18
        balance: 1000 // without 10^18
      }
    ]
```

`validators.js` ফাইল ব্যবহার করে Bor ভ্যালিডেটর সেট তৈরি করুন:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-borvalidatorset.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

এই কমান্ডটি `genesis-contracts/contracts/BorValidatorSet.sol` তৈরি করবে।

`BorValidatorSet.sol` তৈরি হবার পরে genesis.json তৈরি করুন:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-genesis.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

এটি `genesis-contracts/genesis.json`তৈরি হবে

## Bor শুরু করুন {#start-bor}

একবার জেনেসিস ফাইল এ তৈরি করা Once `~/matic/tesnets/genesis-contracts/genesis.json`ে Bor node প্রস্তুত করুন:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash setup.sh
```

নিম্নলিখিত কমান্ড ব্যবহার করে Bor শুরু করুন:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash start.sh 1
```

বোর পোর্ট 8545-এ চলমান শুরু হবে।

Bor মুছে ফেলে আবার নতুন করে শুরু করতে চাইলে:

```bash
    $ bash clean.sh
    $ bash setup.sh
    $ bash start.sh 1
```

## টেস্ট বোর এবং হেইমডেল {#test-bor-and-heimdall}

বোর এবং হেইমডেল উভয়ই পরীক্ষা করতে, আপনাকে সমান্তরালে বোর এবং Heimdall, Heimdall's বিশ্রাম সার্ভার এবং ব্রিজটি চালানোর প্রয়োজন ।

### Heimdall rest-server চালান (ঐচ্ছিক) {#run-heimdall-rest-server-optional}

আপনার স্থানীয় মেশিনে nginx চালানোর জন্য এই [গাইড](https://kirillplatonov.com/2017/11/12/simple_reverse_proxy_on_mac_with_nginx/) নির্দেশাবলী অনুসরণ করুন (Mac OSX)।

নিচের কনটেন্ট যোগ করুন `/usr/local/etc/nginx/nginx.conf`এবং nginx পুনরায় শুরু করুন:

```conf
    worker_processes  1;

    events {
        worker_connections 1024;
    }

    http {
        server {
            listen 80;
            server_name localhost;

            location / {
              add_header 'Access-Control-Allow-Origin' * always;
              add_header 'Access-Control-Allow-Credentials' 'true';
              add_header 'Access-Control-Allow-Headers' 'Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
              add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT,DELETE,PATCH';

              if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Allow-Origin' * always;
                add_header 'Access-Control-Allow-Credentials' 'true';
                add_header 'Access-Control-Allow-Headers' 'Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
                add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT,DELETE,PATCH';
                add_header 'Access-Control-Max-Age' 1728000;
                add_header 'Content-Type' 'text/plain charset=UTF-8';
                add_header 'Content-Length' 0;
                return 204;
              }

              proxy_redirect off;
              proxy_set_header host $host;
              proxy_set_header X-real-ip $remote_addr;
              proxy_set_header X-forward-for $proxy_add_x_forwarded_for;
              proxy_pass http://127.0.0.1:1317;
            }
        }
    }
```

নতুন পরিবর্তিত কনফিগ ব্যবহার করে nginx আবার লোড করুন:

```bash
    sudo nginx -s reload
```
