---
id: setup-bor
title: Настройка Bor
description: Настройка нода Bor
keywords:
  - docs
  - matic
  - polygon
  - setup bor
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Настройка Bor {#setup-bor}

Используйте ветку `master` или `develop`, содержащую последнюю стабильную версию.

```bash
    $ mkdir -p $GOPATH/src/github.com/maticnetwork
    $ cd $GOPATH/src/github.com/maticnetwork
    $ git clone https://github.com/maticnetwork/bor
    $ cd bor
    $ make bor-all
```

Теперь вы установили Bor в вашей локальной системе, а бинарный доступен в пути `./build/bin/bor`.

### Подключение к консоли (необязательно) {#connecting-to-console-optional}

Это необязательный шаг. Вам не нужно подключаться к консоли. Вы можете сделать это, только если вас интересуют другие детали.

Так же, как и Geth, можно подключиться к консоли, чтобы выполнять различные типы запросов. Из `dataDir`вашего , выполните следующую команду:

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

После того, как шаблоны обработаны, нам нужно установить валидаторы в `tesnets/genesis-contracts/validators.js` файле. Этот файл должен выглядеть так:

```json
    const validators = [
      {
        address: "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
        stake: 10, // without 10^18
        balance: 1000 // without 10^18
      }
    ]
```

Сгенерируйте набор валидаторов Bor, используя `validators.js` файл:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-borvalidatorset.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Эта команда сгенерирует `genesis-contracts/contracts/BorValidatorSet.sol`.

Сгенерируйте genesis.json после создания `BorValidatorSet.sol`:

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-genesis.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Это будет генерировать `genesis-contracts/genesis.json`.

## Запуск Bor {#start-bor}

После того, как файл генеза будет `~/matic/tesnets/genesis-contracts/genesis.json`сгенерирован, необходимо подготовить узел Bor:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash setup.sh
```

Запустите Bor с помощью следующей команды:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash start.sh 1
```

Bor начнет работать в порту 8545.

Если вы хотите очистить Bor и начать заново:

```bash
    $ bash clean.sh
    $ bash setup.sh
    $ bash start.sh 1
```

## Тест Bor {#test-bor-and-heimdall}

Чтобы протестировать Bor и Heimdall, вам необходимо запустить Bor и Heimdall, сервер отдыха Heimdall, и Bridge параллельно.

### Запустите rest-server Heimdall (необязательно) {#run-heimdall-rest-server-optional}

Следуйте этим инструкциям, [чтобы](https://kirillplatonov.com/2017/11/12/simple_reverse_proxy_on_mac_with_nginx/) запустить nginx на вашем местном компьютере (Mac OSX).

Добавить ниже содержимое в `/usr/local/etc/nginx/nginx.conf`и перезапустить nginx:

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

Перезагрузите nginx с обновленной конфигурацией:

```bash
    sudo nginx -s reload
```
