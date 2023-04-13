---
id: setup-bor
title: Setup do BOR
description: Configurar nó do Bor
keywords:
  - docs
  - matic
  - polygon
  - setup bor
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Setup do BOR {#setup-bor}

Use o ramo `master` ou `develop`, que contém o último lançamento estável.

```bash
    $ mkdir -p $GOPATH/src/github.com/maticnetwork
    $ cd $GOPATH/src/github.com/maticnetwork
    $ git clone https://github.com/maticnetwork/bor
    $ cd bor
    $ make bor-all
```

Agora, tem o Bor instalado no sistema local e o binário está disponível no `./build/bin/bor`caminho.

### Conectando-se ao console (opcional) {#connecting-to-console-optional}

Este é um passo opcional. Você não precisa conectar a um console. Você pode fazê-lo somente se estiver interessado em outros detalhes.

Assim como o Geth, pode se conectar ao console do bor para executar vários tipos de consultas. Do seu `dataDir`, execute o seguinte comando:

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

Uma vez que os templates são processados, precisamos definir validadores no ficheiro `tesnets/genesis-contracts/validators.js`. Este ficheiro deve parecer assim:

```json
    const validators = [
      {
        address: "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
        stake: 10, // without 10^18
        balance: 1000 // without 10^18
      }
    ]
```

Gere o conjunto de validadores BOR utilizando o ficheiro `validators.js`:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-borvalidatorset.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Este comando gerará `genesis-contracts/contracts/BorValidatorSet.sol`.

Gere genesis.json, uma vez que `BorValidatorSet.sol` seja gerado:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-genesis.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Isso irá gerar `genesis-contracts/genesis.json`.

## Iniciar o BOR {#start-bor}

Assim que o arquivo de gênese for gerado `~/matic/tesnets/genesis-contracts/genesis.json`, prepare o nó do Bor:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash setup.sh
```

Iniciar o Bor usando o seguinte comando:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash start.sh 1
```

O Bor começará a ser executado na porta 8545.

Caso deseje limpar o BOR e iniciar novamente:

```bash
    $ bash clean.sh
    $ bash setup.sh
    $ bash start.sh 1
```

## Teste o Bor e o Heimdall {#test-bor-and-heimdall}

Para testar o Bor e o Heimdall, é necessário executar o Bor e o Heimdall, o servidor de descanso do Heimdall e a Ponte em paralelo.

### Executar o servidor de descanso do Heimdall (opcional) {#run-heimdall-rest-server-optional}

Siga as instruções deste [guia](https://kirillplatonov.com/2017/11/12/simple_reverse_proxy_on_mac_with_nginx/) para executar o nginx na máquina local (Mac OSX).

Adicionar conteúdo abaixo `/usr/local/etc/nginx/nginx.conf`e reiniciar o nginx:

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

Recarregue nginx usando as novas alterações de configuração:

```bash
    sudo nginx -s reload
```
