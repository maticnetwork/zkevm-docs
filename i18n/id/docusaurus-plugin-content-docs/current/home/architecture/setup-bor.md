---
id: setup-bor
title: Mengatur Bor
description: Menata node Bor
keywords:
  - docs
  - matic
  - polygon
  - setup bor
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Mengatur Bor {#setup-bor}

Gunakan cabang `master` atau `develop`, yang memuat rilis stabil terbaru.

```bash
    $ mkdir -p $GOPATH/src/github.com/maticnetwork
    $ cd $GOPATH/src/github.com/maticnetwork
    $ git clone https://github.com/maticnetwork/bor
    $ cd bor
    $ make bor-all
```

Sekarang, Anda telah memasang Bor pada sistem lokal dan biner tersedia dalam `./build/bin/bor`jalur.

### Menghubungkanke konsol (opsional) {#connecting-to-console-optional}

Ini adalah langkah opsional. Anda tidak perlu terhubung ke konsol. Anda bisa melakukannya hanya jika Anda tertarik pada perincian lainnya.

Sama seperti Geth, Anda dapat terhubung ke konsol untuk menjalankan berbagai jenis pertanyaan. Dari `dataDir`Anda, jalankan perintah berikut:

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

Setelah template diproses, kita perlu mengatur validator di file `tesnets/genesis-contracts/validators.js`. File ini harus terlihat seperti ini:

```json
    const validators = [
      {
        address: "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
        stake: 10, // without 10^18
        balance: 1000 // without 10^18
      }
    ]
```

Buat kumpulan validator Bor menggunakan file `validators.js`:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-borvalidatorset.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Perintah ini akan membuat `genesis-contracts/contracts/BorValidatorSet.sol`.

Buat genesis.json, setelah `BorValidatorSet.sol` dibuat:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-genesis.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Ini akan `genesis-contracts/genesis.json`menghasilkan

## Memulai Bor {#start-bor}

Setelah file genesis dihasilkan di `~/matic/tesnets/genesis-contracts/genesis.json`, persiapkan node Bor:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash setup.sh
```

Mulai Bor menggunakan perintah berikut:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash start.sh 1
```

Bor akan mulai berjalan di port 8545.

Jika Anda ingin menghapus Bor dan memulai ulang:

```bash
    $ bash clean.sh
    $ bash setup.sh
    $ bash start.sh 1
```

## Tes Bor dan Heimdall {#test-bor-and-heimdall}

Untuk menguji baik Bor dan Heimdall, Anda perlu menjalankan Bor dan Heimdall, server rest-server Heimdall, dan Bridge secara paralel.

### Jalankan Heimdall rest-server (opsional) {#run-heimdall-rest-server-optional}

Ikuti instruksi [panduan](https://kirillplatonov.com/2017/11/12/simple_reverse_proxy_on_mac_with_nginx/) ini untuk menjalankan nginx pada mesin lokal (Mac OSX).

Menambahkan isi ke ke dalam `/usr/local/etc/nginx/nginx.conf`dan memulai kembali nginx:

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

Muat ulang nginx menggunakan perubahan konfig baru:

```bash
    sudo nginx -s reload
```
