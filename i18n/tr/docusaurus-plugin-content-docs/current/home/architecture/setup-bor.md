---
id: setup-bor
title: Bor Kurulumu
description: Bor düğümünü ayarlayın
keywords:
  - docs
  - matic
  - polygon
  - setup bor
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Bor Kurulumu {#setup-bor}

En son kararlı sürümü içeren `master` veya `develop` dalını kullanın.

```bash
    $ mkdir -p $GOPATH/src/github.com/maticnetwork
    $ cd $GOPATH/src/github.com/maticnetwork
    $ git clone https://github.com/maticnetwork/bor
    $ cd bor
    $ make bor-all
```

Şimdi, yerel sisteminize Bor yüklü ve ikili yoldaki mevcut `./build/bin/bor`durumda.

### Konsola bağlanma (isteğe bağlı) {#connecting-to-console-optional}

Bu adım isteğe bağlı bir adımdır. Bir konsola bağlanmanız şart değildir. Şayet başka ayrıntılarla ilgileniyorsanız bir konsola bağlanabilirsiniz elbette.

Tıpkı Geth gibi, çeşitli sorguları çalıştırmak için bor konsoluna bağlanabilirsiniz. `dataDir`Bu komuttan aşağıdaki komutu çalıştırın:

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

Şablonlar işlendikten sonra, `tesnets/genesis-contracts/validators.js` dosyası içinde doğrulayıcıları belirlememiz gerekir. Bu dosya şu şekilde görünmelidir:

```json
    const validators = [
      {
        address: "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
        stake: 10, // without 10^18
        balance: 1000 // without 10^18
      }
    ]
```

`validators.js` dosyasını kullanarak Bor doğrulayıcısı kümesi oluşturun:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-borvalidatorset.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Bu komut `genesis-contracts/contracts/BorValidatorSet.sol` dosyasını üretecektir.

`BorValidatorSet.sol` üretildikten sonra genesis.json üretilir:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-genesis.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Bu `genesis-contracts/genesis.json`üretecektir.

## Bor'u başlat {#start-bor}

Genesis dosyası `~/matic/tesnets/genesis-contracts/genesis.json`oluşturulduktan sonra Bor düğümünü hazırlayın:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash setup.sh
```

Bor için aşağıdaki komutu kullanarak başlayın:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash start.sh 1
```

Bor 8545 numaralı limanında çalışmaya başlayacaktır.

Bor'u temizleyip yeniden başlamak isterseniz:

```bash
    $ bash clean.sh
    $ bash setup.sh
    $ bash start.sh 1
```

## Test Bor ve Heimdall {#test-bor-and-heimdall}

Hem Bor hem de Heimdall'ı test etmek için Bor ve Heimdall'ı çalıştırmanız ve Heimdall'ın dinlenme sunucusu ve Köprü ile paralel olarak çalıştırmanız gerekir.

### Heimdall dinlenme sunucusunu çalıştırın (isteğe bağlı) {#run-heimdall-rest-server-optional}

Yerel makinenizde nginx çalıştırmak için bu [kılavuz](https://kirillplatonov.com/2017/11/12/simple_reverse_proxy_on_mac_with_nginx/) talimatlarını (Mac OSX) takip edin.

Aşağıdaki içeriği ekleyin `/usr/local/etc/nginx/nginx.conf`ve nginx'i yeniden başlatın:

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

Yeni yapılandırma değişikliklerini kullanarak nginx'i yeniden yükleyin:

```bash
    sudo nginx -s reload
```
