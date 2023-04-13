---
id: setup-bor
title: Pag-setup ng Bor
description: I-setup ang Bor node
keywords:
  - docs
  - matic
  - polygon
  - setup bor
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Pag-setup ng Bor {#setup-bor}

Gamitin ang `master`o `develop` branch, na naglalaman ng pinakabagong stable release.

```bash
    $ mkdir -p $GOPATH/src/github.com/maticnetwork
    $ cd $GOPATH/src/github.com/maticnetwork
    $ git clone https://github.com/maticnetwork/bor
    $ cd bor
    $ make bor-all
```

Ngayon, naka-install ka ng Bor sa iyong lokal na system at magagamit ang binary sa landas `./build/bin/bor`.

### Pagkonekta sa console (opsyonal) {#connecting-to-console-optional}

Opsyonal ang hakbang na ito. Hindi mo kailangang kumonekta sa isang console. Magagawa mo lang ito kung interesado ka sa iba pang detalye.

Tulad ng Geth, puwede kang kumonekta sa bor console para mag-execute ng iba't ibang uri ng query. Mula sa iyong `dataDir`, patakbuhin ang sumusunod na command:

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

Kapag naproseso na ang mga template, kailangan nating itakda ang mga validator sa `tesnets/genesis-contracts/validators.js` file. Dapat magmukhang ganito ang file:

```json
    const validators = [
      {
        address: "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
        stake: 10, // without 10^18
        balance: 1000 // without 10^18
      }
    ]
```

Lumikha ng set ng validator ng Bor gamit ang `validators.js` file:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-borvalidatorset.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Lilikha ang command na ito ng `genesis-contracts/contracts/BorValidatorSet.sol`.

Lumikha ng genesis.json, kapag nalikha na ang `BorValidatorSet.sol`:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-genesis.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Bibubuo `genesis-contracts/genesis.json`ito.

## Simulan ang Bor {#start-bor}

Kapag nabuo ang genesis file sa `~/matic/tesnets/genesis-contracts/genesis.json`, ihanda ang Bor node:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash setup.sh
```

Simulan ang Bor gamit ang sumusunod na command:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash start.sh 1
```

Magsisimula ang Bor na tumatakbo sa port 8545.

Kung gusto mong linisin ang Bor at magsimula ulit:

```bash
    $ bash clean.sh
    $ bash setup.sh
    $ bash start.sh 1
```

## Subukan ang Bor at Heimdall {#test-bor-and-heimdall}

Para subukin ang parehong Bor at Heimdall, kailangan mong patakbuhin ang Bor at Heimdall, ang rest-server at Bridge ng Heimdall.

### Patakbuhin ang rest-server ng Heimdall (opsyonal) {#run-heimdall-rest-server-optional}

Sundin ang mga tagubilin ng [gabay](https://kirillplatonov.com/2017/11/12/simple_reverse_proxy_on_mac_with_nginx/) na ito na magpatakbo ng nginx sa iyong local machine (Mac OSX).

Idagdag ang nilalaman sa ibaba at i-restart `/usr/local/etc/nginx/nginx.conf`ang nginx:

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

I-reload ang nginx gamit ang mga binagong config:

```bash
    sudo nginx -s reload
```
