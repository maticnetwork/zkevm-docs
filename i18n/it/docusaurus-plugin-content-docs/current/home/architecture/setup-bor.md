---
id: setup-bor
title: Setup bor
description: Configurazione Nodo di Bor
keywords:
  - docs
  - matic
  - polygon
  - setup bor
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Setup bor {#setup-bor}

Usa il ramo `master` o `develop`, che contiene l'ultima versione stabile.

```bash
    $ mkdir -p $GOPATH/src/github.com/maticnetwork
    $ cd $GOPATH/src/github.com/maticnetwork
    $ git clone https://github.com/maticnetwork/bor
    $ cd bor
    $ make bor-all
```

Ora hai installato Bor sul tuo sistema locale e la binaria è disponibile nel percorso `./build/bin/bor`.

### Connessione alla console (facoltativo) {#connecting-to-console-optional}

Questo è un passaggio facoltativo. Non devi connetterti a una console. Lo puoi fare solo se sei interessato ad altri dettagli.

Proprio come Geth, puoi connetterti alla bor console per eseguire varie tipologie di queries. Dal tuo `dataDir`, esegui il seguente comando:

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

Una volta che i template sono processati, dobbiamo impostare i validatori nel file  `tesnets/genesis-contracts/validators.js`. Il file dovrebbe essere simile a questo:

```json
    const validators = [
      {
        address: "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
        stake: 10, // without 10^18
        balance: 1000 // without 10^18
      }
    ]
```

Genera un set di validatori Bor usando il file `validators.js`:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-borvalidatorset.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Questo comando genererà `genesis-contracts/contracts/BorValidatorSet.sol`.

Genera genesis.json, una volta che è generato `BorValidatorSet.sol`:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-genesis.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Questo genererà `genesis-contracts/genesis.json`.

## Avviare Bor {#start-bor}

Una volta che il file genesis viene generato `~/matic/tesnets/genesis-contracts/genesis.json`a, preparare il nodo Bor:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash setup.sh
```

Start Bor utilizzando il seguente comando:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash start.sh 1
```

Bor inizierà a correre alla porta 8545.

Se vuoi pulire Bor e avviare di nuovo:

```bash
    $ bash clean.sh
    $ bash setup.sh
    $ bash start.sh 1
```

## Test Bor e Heimdall {#test-bor-and-heimdall}

Per testare sia Bor che Heimdall, è necessario eseguire Bor e Heimdall, il rest-server di Heimdall, e Bridge in parallelo.

### Esegui Heimdall rest-server (facoltativo) {#run-heimdall-rest-server-optional}

Segui queste istruzioni [per](https://kirillplatonov.com/2017/11/12/simple_reverse_proxy_on_mac_with_nginx/) eseguire nginx sulla tua macchina locale (Mac OSX).

Aggiungi il contenuto seguente `/usr/local/etc/nginx/nginx.conf`e riavviare nginx:

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

Ricarica nginx utilizzando le nuove modifiche alla configurazione:

```bash
    sudo nginx -s reload
```
