---
id: setup-bor
title: Einrichthung von Bor
description: Bor Knoten einrichten
keywords:
  - docs
  - matic
  - polygon
  - setup bor
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Einrichthung von Bor {#setup-bor}

Verwenden Sie die `master`- oder `develop`-Verzweigung mit der neuesten stabilen Version.

```bash
    $ mkdir -p $GOPATH/src/github.com/maticnetwork
    $ cd $GOPATH/src/github.com/maticnetwork
    $ git clone https://github.com/maticnetwork/bor
    $ cd bor
    $ make bor-all
```

Nun hast du Bor auf deinem lokalen System installiert und die Binärdatei ist im Pfad `./build/bin/bor`verfügbar.

### Verbindung mit der Konsole (optional) {#connecting-to-console-optional}

Dies ist ein optionaler Schritt. Sie müssen keine Verbindung zu einer Konsole herstellen. Sie können dies nur tun, wenn Sie an anderen Details interessiert sind.

Genau wie Geth, kannst du dich mit der bor-Konsole verbinden, um verschiedene Arten von Abfragen auszuführen. `dataDir`Führe von deinem aus den folgenden Befehl aus:

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

Sobald die Vorlagen verarbeitet werden, müssen wir die Prüfer in der `tesnets/genesis-contracts/validators.js`-Datei festlegen. Diese Datei sollte wie folgt aussehen:

```json
    const validators = [
      {
        address: "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
        stake: 10, // without 10^18
        balance: 1000 // without 10^18
      }
    ]
```

Bor-Prüfset mit `validators.js`-Datei generieren:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-borvalidatorset.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Dieser Befehl wird `genesis-contracts/contracts/BorValidatorSet.sol` generieren.

genesis.json generieren, sobald `BorValidatorSet.sol` generiert wird:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-genesis.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Dies wird `genesis-contracts/genesis.json`generieren.

## Bor starten {#start-bor}

Sobald die Genesis-Datei generiert `~/matic/tesnets/genesis-contracts/genesis.json`wird, bereiten Sie den Bor-Knoten zu:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash setup.sh
```

Starte Bor mit dem folgenden Befehl:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash start.sh 1
```

Bor startet mit dem Laufen auf Port 8545.

Wenn Sie Bor löschen und erneut starten wollen:

```bash
    $ bash clean.sh
    $ bash setup.sh
    $ bash start.sh 1
```

## Test Bor und Heimdall {#test-bor-and-heimdall}

Um sowohl Bor als auch Heimdall zu testen, musst du Bor und Heimdall, den Rest-Server von Heimdall und Bridge parallel ausführen.

### Führe Heimdall rest-Server aus (optional) {#run-heimdall-rest-server-optional}

Befolge dieser [Anleitung](https://kirillplatonov.com/2017/11/12/simple_reverse_proxy_on_mac_with_nginx/) und führe nginx auf deinem lokalen Rechner (Mac OSX) aus.

Füge unten Inhalte in `/usr/local/etc/nginx/nginx.conf`und starte nginx neu:

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

nginx unter Verwendung neuer Konfigurationsänderungen erneut laden:

```bash
    sudo nginx -s reload
```
