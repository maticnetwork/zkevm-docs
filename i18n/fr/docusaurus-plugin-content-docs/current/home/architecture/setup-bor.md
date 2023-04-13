---
id: setup-bor
title: Configuration de bor
description: Configuration du nœud Bor
keywords:
  - docs
  - matic
  - polygon
  - setup bor
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Configuration de bor {#setup-bor}

Utilisez la branche `master` ou `develop`, qui contient la dernière version stable.

```bash
    $ mkdir -p $GOPATH/src/github.com/maticnetwork
    $ cd $GOPATH/src/github.com/maticnetwork
    $ git clone https://github.com/maticnetwork/bor
    $ cd bor
    $ make bor-all
```

Maintenant, vous avez Bor installé sur votre système local et le binaire est disponible dans le chemin `./build/bin/bor`.

### Connexion à la console (facultatif) {#connecting-to-console-optional}

Cette étape est facultative. Vous n'avez pas besoin de vous connecter à une console. Vous pouvez le faire si vous êtes intéressé par d'autres détails.

Tout comme Geth, vous pouvez vous connecter à la console bor pour exécuter différents types de requêtes. À partir de votre `dataDir`, exécutez la commande suivante :

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

Une fois les modèles traités, nous devons définir les validateurs dans le fichier `tesnets/genesis-contracts/validators.js`. Ce fichier devrait ressembler à ceci :

```json
    const validators = [
      {
        address: "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
        stake: 10, // without 10^18
        balance: 1000 // without 10^18
      }
    ]
```

Générer l'ensemble des validateurs bor en utilisant le fichier `validators.js` :

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-borvalidatorset.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Cette commande génèrera `genesis-contracts/contracts/BorValidatorSet.sol`.

Générez genesis.json, une fois que `BorValidatorSet.sol` est généré :

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-genesis.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Cela générera `genesis-contracts/genesis.json`.

## Démarrez Bor {#start-bor}

Une fois que le fichier de genèse est généré au `~/matic/tesnets/genesis-contracts/genesis.json`, préparez le nœud Bor:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash setup.sh
```

Démarrez Bor en utilisant la commande suivante :

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash start.sh 1
```

Bor commencera à fonctionner au port 8545.

Si vous voulez vider bor et recommencer :

```bash
    $ bash clean.sh
    $ bash setup.sh
    $ bash start.sh 1
```

## Test Bor et Heimdall {#test-bor-and-heimdall}

Pour tester Bor et Heimdall, vous devez exécuter Bor et Heimdall, le serveur de repos Heimdall et Bridge en parallèle.

### exécutez Heimdall rest-server (facultatif) {#run-heimdall-rest-server-optional}

Suivez ces instructions [pour](https://kirillplatonov.com/2017/11/12/simple_reverse_proxy_on_mac_with_nginx/) exécuter nginx sur votre machine locale (Mac OSX).

Ajoutez du contenu ci-dessous dans `/usr/local/etc/nginx/nginx.conf`et redémarrez nginx:

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

Rechargez nginx en utilisant les nouvelles modifications de configuration :

```bash
    sudo nginx -s reload
```
