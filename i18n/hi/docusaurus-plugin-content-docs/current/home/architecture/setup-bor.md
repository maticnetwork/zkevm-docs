---
id: setup-bor
title: बोर सेटअप करें
description: बर नोड सेटअप करें
keywords:
  - docs
  - matic
  - polygon
  - setup bor
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# बोर सेटअप करें {#setup-bor}

`master` या `develop`ब्रांच का इस्तेमाल करें, जिसमें लेटेस्ट स्टेबल रिलीज़ शामिल हैं.

```bash
    $ mkdir -p $GOPATH/src/github.com/maticnetwork
    $ cd $GOPATH/src/github.com/maticnetwork
    $ git clone https://github.com/maticnetwork/bor
    $ cd bor
    $ make bor-all
```

अब, आपके पास अपने स्थानीय सिस्टम पर बोर इंस्टॉल है और बाइनरी पथ में उपलब्ध `./build/bin/bor`है.

### कंसोल से कनेक्ट करना (वैकल्पिक) {#connecting-to-console-optional}

यह एक वैकल्पिक स्टेप है. आपको किसी कंसोल से कनेक्ट करने की ज़रूरत नहीं है. आपको ऐसा तभी करना है जब आपकी दिलचस्पी अन्य जानकारी में है.

Geth की तरह, आप विभिन्न प्रकार की queries. को निष्पादित करने के लिए bor कंसोल से कनेक्ट कर सकते हैं. अपने से `dataDir`, निम्न कमांड को रन करें:

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

टेम्पलेट प्रोसेस हो जाने के बाद हमें `tesnets/genesis-contracts/validators.js`फ़ाइल में वैलिडेटर सेट करने होंगे. यह फ़ाइल ऐसी दिखनी चाहिए:

```json
    const validators = [
      {
        address: "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
        stake: 10, // without 10^18
        balance: 1000 // without 10^18
      }
    ]
```

`validators.js` फ़ाइल का उपयोग करके बोर वैलिडेटर सेट जनरेट करें:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-borvalidatorset.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

इस कमांड से `genesis-contracts/contracts/BorValidatorSet.sol`जनरेट होगा.

genesis.json जनरेट करें, `BorValidatorSet.sol`के जनरेट हो जाने के बाद:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-genesis.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

इससे उत्पन्न `genesis-contracts/genesis.json`हो जाएगा

## बोर शुरू करें {#start-bor}

एक बार जेनेसिस फाइल को जब पर उत्पन्न किया जाता `~/matic/tesnets/genesis-contracts/genesis.json`है, तो बोर नोड तैयार करें :

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash setup.sh
```

नीचे दिए गए कमांड का इस्तेमाल करके बोर शुरू करें:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash start.sh 1
```

बोर बंदरगाह 8545 में रन शुरू कर देगा.

यदि आप बोर को साफ करना और फिर से शुरू करना चाहते हैं तो:

```bash
    $ bash clean.sh
    $ bash setup.sh
    $ bash start.sh 1
```

## टेस्ट बोर और Heimdall {#test-bor-and-heimdall}

बोर और Heimdall, दोनों को टेस्ट करने के लिए, आपको बोर और Heimdall, को चलाने की जरूरत है, Heimdall's के विश्राम सर्वर और ब्रिज को समानांतर में

### Heimdall रेस्ट-सर्वर रन करें (वैकल्पिक) {#run-heimdall-rest-server-optional}

अपने स्थानीय मशीन (मैक OSX) पर nginx को रन करने के इस [गाइड](https://kirillplatonov.com/2017/11/12/simple_reverse_proxy_on_mac_with_nginx/) के निर्देश का पालन करें

में सामग्री के नीचे जोड़ें `/usr/local/etc/nginx/nginx.conf`और nginx:

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

नए कॉन्फ़िगरेशन परिवर्तनों का उपयोग करके nginx को फिर से लोड करें:

```bash
    sudo nginx -s reload
```
