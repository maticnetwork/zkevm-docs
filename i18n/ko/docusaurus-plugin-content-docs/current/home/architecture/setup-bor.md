---
id: setup-bor
title: Bor 설정
description: Bor 노드 설정
keywords:
  - docs
  - matic
  - polygon
  - setup bor
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Bor 설정 {#setup-bor}

안정적인 최신판이 포함된 `master` 또는 `develop` 브랜치를 사용하세요.

```bash
    $ mkdir -p $GOPATH/src/github.com/maticnetwork
    $ cd $GOPATH/src/github.com/maticnetwork
    $ git clone https://github.com/maticnetwork/bor
    $ cd bor
    $ make bor-all
```

이제 로컬 시스템에 Bor를 설치하고 바이너리 경로의 사용자가 `./build/bin/bor`있습니다.

### 콘솔 연결(선택 사항) {#connecting-to-console-optional}

이번 단계는 선택적인 스텝입니다. 콘솔에 연결할 필요는 없습니다. 다른 세부 사항에 관심이 있는 경우에만 연결하셔도 됩니다.

Geth처럼, 다양한 유형의 질의를 실행할 수 있습니다. `dataDir`다음 명령을 실행합니다.

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

템플릿이 처리되면, `tesnets/genesis-contracts/validators.js` 파일 내에 유효성 검사자를 설정해야 합니다. 해당 파일은 다음과 같이 생겼습니다.

```json
    const validators = [
      {
        address: "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
        stake: 10, // without 10^18
        balance: 1000 // without 10^18
      }
    ]
```

`validators.js` 파일을 사용하여 Bor 유효성 검사자 세트를 생성합니다.

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-borvalidatorset.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

이 명령어는 `genesis-contracts/contracts/BorValidatorSet.sol`을(를) 생성합니다.

`BorValidatorSet.sol`이(가) 생성되면 genesis.json을 생성합니다.

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-genesis.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

이것은 생성 될 `genesis-contracts/genesis.json`것입니다.

## Bor 시작 {#start-bor}

이제 제네시스 파일이 `~/matic/tesnets/genesis-contracts/genesis.json`발생하면 Bor 노드를 준비합니다.

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash setup.sh
```

다음 명령을 사용하여 Bor를 시작하십시오.

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash start.sh 1
```

Bor는 포트 8545에서 실행됩니다.

Bor을 제거하고 다시 시작을 원할 경우:

```bash
    $ bash clean.sh
    $ bash setup.sh
    $ bash start.sh 1
```

## 테스트 Bor 및 Heimdall {#test-bor-and-heimdall}

Bor와 Heimdall을 테스트하려면 Bor와 Heimdall, Heimdall의 rest-서버, Bridge를 병렬로 실행할 필요가 있습니다.

### Heimdall rest-서버 실행 (선택 사항) {#run-heimdall-rest-server-optional}

로컬 머신(Mac OSX)에서 nginx를 실행하여 해당 [안내](https://kirillplatonov.com/2017/11/12/simple_reverse_proxy_on_mac_with_nginx/) 지침을 따르십시오.

아래 콘텐츠를 추가하고 `/usr/local/etc/nginx/nginx.conf`nginx를 다시 시작하십시오.

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

새로운 구성 변경을 사용하여 nginx를 다시 불러옵니다

```bash
    sudo nginx -s reload
```
