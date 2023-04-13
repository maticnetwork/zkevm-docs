---
id: setup-bor
title: ตั้งค่า Bor
description: ตั้งค่าโหนด Bor
keywords:
  - docs
  - matic
  - polygon
  - setup bor
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# ตั้งค่า Bor {#setup-bor}

ใช้ Branch `master` หรือ `develop` ที่มีซอฟต์แวร์ที่มีเสถียรภาพพร้อมเผยแพร่

```bash
    $ mkdir -p $GOPATH/src/github.com/maticnetwork
    $ cd $GOPATH/src/github.com/maticnetwork
    $ git clone https://github.com/maticnetwork/bor
    $ cd bor
    $ make bor-all
```

ตอนนี้คุณมี Bor ติดตั้ง บนระบบท้องถิ่นของคุณ และไบนารีมีอยู่ใน`./build/bin/bor`พาธ.

### การเชื่อมต่อไปยังคอนโซล (เลือกได้) {#connecting-to-console-optional}

ขั้นตอนนี้สามารถเลือกได้ คุณไม่จำเป็นต้องเชื่อมต่อกับคอนโซล คุณจะเลือกก็ต่อเมื่อคุณสนใจในรายละเอียดส่วนอื่นๆ

เช่น Geth คุณสามารถเชื่อมต่อกับคอนโซลเพื่อดำเนินการเคอร์รีแบบต่างๆจาก`dataDir`ของคุณ เรียกใช้คำสั่งต่อไป:

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

เมื่อเทมเพลตประมวลผลแล้ว เราจะต้องตั้งค่าผู้ตรวจสอบในไฟล์ `tesnets/genesis-contracts/validators.js` ไฟล์นี้ควรมีหน้าตาแบบนี้:

```json
    const validators = [
      {
        address: "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
        stake: 10, // without 10^18
        balance: 1000 // without 10^18
      }
    ]
```

สร้างชุดผู้ตรวจสอบ Bor โดยใช้ไฟล์ `validators.js`:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-borvalidatorset.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

คำสั่งนี้จะสร้าง `genesis-contracts/contracts/BorValidatorSet.sol`

สร้าง genesis.json เมื่อสร้าง `BorValidatorSet.sol` แล้ว:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-genesis.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

สิ่งนี้จะสร้าง`genesis-contracts/genesis.json`ขึ้น

## เริ่ม Bor {#start-bor}

เมื่อเกิดแฟ้ม genesis ที่, เตรียม`~/matic/tesnets/genesis-contracts/genesis.json`ตัว Bor โหนด:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash setup.sh
```

เริ่ม Bor โดยใช้คำสั่งต่อไป:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash start.sh 1
```

Bor จะเริ่มทำงานที่พอร์ต 8545

หากคุณต้องการคลีน Bor และเริ่มอีกครั้ง:

```bash
    $ bash clean.sh
    $ bash setup.sh
    $ bash start.sh 1
```

## ทดสอบ Bor และ Heimdall {#test-bor-and-heimdall}

เพื่อทดสอบทั้ง Bor และ Heimdall คุณต้องใช้ Bor และ Heimdall เซิร์ฟเวอร์ที่เหลือของ Heimdall และสะพานแบบคู่ขนานกัน

### เรียกใช้เซิร์ฟเวอร์ Heimdall (ตัวเลือกรถ) {#run-heimdall-rest-server-optional}

ทำตามคู่มือนี้[เพื่อ](https://kirillplatonov.com/2017/11/12/simple_reverse_proxy_on_mac_with_nginx/)เรียกใช้เมนซ์บนเครื่องท้องถิ่นของคุณ (Mac OSX)

เพิ่มเนื้อหาด้านล่างเข้า`/usr/local/etc/nginx/nginx.conf`และรีสตาร์ท:

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

โหลด Nginx ใหม่โดยใช้คอนฟิกที่เปลี่ยนแปลงใหม่:

```bash
    sudo nginx -s reload
```
