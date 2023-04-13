---
id: setup-bor
title: Borの設定
description: Borノードの設定
keywords:
  - docs
  - matic
  - polygon
  - setup bor
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Borの設定 {#setup-bor}

最新の安定したリリースを含む `master`または `develop`ブランチを使用します。

```bash
    $ mkdir -p $GOPATH/src/github.com/maticnetwork
    $ cd $GOPATH/src/github.com/maticnetwork
    $ git clone https://github.com/maticnetwork/bor
    $ cd bor
    $ make bor-all
```

現在、ローカルシステムにBorをインストールしており、バイナリが`./build/bin/bor`パスで利用できます。

### コンソールへの接続（オプション） {#connecting-to-console-optional}

これはオプションのステップです。コンソールに接続する必要はありません。他の詳細に興味がある場合に実行してください。

Gethと同様に、borコンソールに接続して様々なクエリを実行することができます。`dataDir`下記のコマンドを実行します：

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

テンプレートが処理されると、`tesnets/genesis-contracts/validators.js`ファイルにバリデータを設定する必要があります。ファイルは次のような形式です：

```json
    const validators = [
      {
        address: "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
        stake: 10, // without 10^18
        balance: 1000 // without 10^18
      }
    ]
```

`validators.js`ファイルを使用してBorバリデータセットを生成します：

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-borvalidatorset.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

このコマンドは`genesis-contracts/contracts/BorValidatorSet.sol`を生成します。

`BorValidatorSet.sol`が生成されるとgenesis.jsonが生成されます：

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-genesis.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

これにより生成されます`genesis-contracts/genesis.json`。

## Borを開始 {#start-bor}

ジェネシスファイルが生成されると`~/matic/tesnets/genesis-contracts/genesis.json`、Borノードを準備します：

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash setup.sh
```

次のコマンドを使用してBorを開始します：

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash start.sh 1
```

Borはポート8545で実行を開始します。

Borを初期化して再度スタートする場合：

```bash
    $ bash clean.sh
    $ bash setup.sh
    $ bash start.sh 1
```

## BorとHeimdallをテストする {#test-bor-and-heimdall}

BorとHeimdallの両方をテストするには、BorとHeimdall、Heimdallのレストサーバー、Bridgeを並列に実行する必要があります。

### Heimdallのrest-serverを実行する（オプション） {#run-heimdall-rest-server-optional}

ローカルマシン（Mac OSX）でnginxを実行するには、この[ガイド](https://kirillplatonov.com/2017/11/12/simple_reverse_proxy_on_mac_with_nginx/)の手順に従ってください。

下記のコンテンツを追加`/usr/local/etc/nginx/nginx.conf`してnginxを再起動してください：

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

新しい変更した設定を使用してnginxを再ロード：

```bash
    sudo nginx -s reload
```
