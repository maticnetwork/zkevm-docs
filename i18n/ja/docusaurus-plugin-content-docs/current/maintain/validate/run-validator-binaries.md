---
id: run-validator-binaries
title: バイナリからバリデータノードを実行する
sidebar_label: Using Binaries
description: バリデータノードを設定するには、バイナリを使用します。
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
slug: run-validator-binaries
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip
このガイドのステップには**、Heimdall**と**Bor**サービスが完全に同期するのを待つものがあります。あるいはメンテナンスされたスナップショットを使用することもできますが、これは同期時間を数時間に短縮します。詳細については[<ins>Snapshot Instructions for Heimdall and Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233)を参照してください。

スナップショットのダウンロードリンクについては、[<ins>Polygonチェーンスナップショット</ins>](https://snapshot.polygon.technology/)を参照してください。

:::

このガイドではバイナリからPolygonバリデータノードを実行する方法を説明します。

システム要件については、[バリデータノードシステム要件](validator-node-system-requirements.md)ガイドに従ってください。

Ansibleを介してバリデータノードを起動して実行したい場合は、「[バリデータノードでAnsibleを用いて実行する」](run-validator-ansible.md)を参照してください。

:::caution

新しいバリデータを受け入れるスペースは限られています。新しいバリデータは、すでにアクティブなバリデータがアンボンドされている場合にのみアクティブなセットに参加することができます。

:::

## 前提条件 {#prerequisites}

* 2つのマシン—1つの[sentry](/docs/maintain/glossary.md#sentry)と1つの [バリデータ](/docs/maintain/glossary.md#validator)。
* `build-essential` sentryマシンとバリデータマシンの両方にインストールされます。

インストールする:

  ```sh
  sudo apt-get install build-essential
  ```

* sentryマシンとバリデータマシンの両方にGo 1.18がインストールされました。

インストールする:

  ```sh
  wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
  bash go-install.sh
  sudo ln -nfs ~/.go/bin/go /usr/bin/go
  ```

* RabbitMQは、セントリーとバリデーターの両方にインストールされています。

RabbitMQをインストールするコマンドは次のとおりです：

  ```sh
  sudo apt-get update
  sudo apt install build-essential
  sudo apt install erlang
  wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.8/rabbitmq-server_3.10.8-1_all.deb
  sudo dpkg -i rabbitmq-server_3.10.8-1_all.deb

  ```
:::tip

RabbitMQのダウンロードとインストール方法について詳しくは[<ins>、こちらを</ins>](https://www.rabbitmq.com/download.html)ご覧ください。

:::

## 概要 {#overview}

バリデータノードを実行するためには、これらの**ステップの正確な順番**に従いましょう。

> これらのステップの順番を守らなければ、設定問題を迎えることになります。sentryノードは常にバリデータノードの前に設定すると、念頭に置くことが重要です。

1. 2つのマシンを準備します、1つはsentryノード、1つはバリデータノード向けです。
2. sentryマシンとバリデータマシンにHeimdallとBorのバイナリをインストールします。
3. sentryマシンとバリデータマシンにHeimdallとBorのサービスファイルを設定します。
4. sentryマシンとバリデータマシンにHeimdallとBorのサービスを設定します。
5. sentryノードを設定します。
6. sentryノードをスタートします。
7. バリデータノードを設定します。
8. 所有者と署名者の鍵を設定します。
9. バリデータノードをスタートします。
10. コミュニティとノード健全性をチェックします。

## バイナリのインストール {#installing-the-binaries}

sentryマシンとバリデータマシンの両方にバイナリをインストールします。

### Heimdallのインストール {#installing-heimdall}

[Heimdall](/docs/pos/heimdall/overview)はプルーフ・オブ・ステーク（PoS）の検証レイヤーで、EthereumメインネットにPlasmaブロックのレプリゼンテーションをチェックポイントする責任があります。

最新バージョンである[Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0)には、次のようないくつかの機能強化が含まれています：
1. 状態同期txsでデータサイズを制限するtxsは次のように：
    * **30Kb**：**バイト** として表現された場合
    * **60kb**： **文字列**として表現された場合。
2. 異なるバリデータのコントラクトイベント間の**遅延時間**を延ばすことで、イベントのバーストが発生した場合にメンプールがかなり迅速に満たされ、チェーンの進行を阻害しないことを確認します。

次の例はデータサイズが制限されている方法を示しています：

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

 [Heimdallリポジトリ](https://github.com/maticnetwork/heimdall/)をクローンします：

```sh
git clone https://github.com/maticnetwork/heimdall
```

正しい[バージョン](https://github.com/maticnetwork/heimdall/releases)へとナビゲートします：

```sh
git checkout RELEASE_TAG
```

ここ `RELEASE_TAG` はインストールしたバージョンのタグです。

例：

```sh
git checkout v0.3.0
```

バージョンが正しければ、Heimdallをインストールします：

```sh
make install
source ~/.profile
```

Heimdallインストールをチェックします：

```sh
heimdalld version --long
```

:::note

進む前に、Heimdallは、sentryマシンとバリデータマシンの両方にインストールする必要があります。

:::

### Borのインストール {#installing-bor}

[Bor](/docs/pos/bor)はブロック生産レイヤーとして機能するサイドチェーンオペレーターです。Heimdallと同期してブロックプロデューサーと検証器を[スパン](/docs/maintain/glossary.md#span)と[スプリント](/docs/maintain/glossary.md#sprint)ごとに選択します。

 [Borリポジトリ](https://github.com/maticnetwork/bor)をクローンします：

```sh
git clone https://github.com/maticnetwork/bor
```

正しい[バージョン](https://github.com/maticnetwork/bor/releases)へとナビゲートします：

```sh
git checkout RELEASE_TAG
```

ここ `RELEASE_TAG` はインストールしたバージョンのタグです。

例：

```sh
git checkout v0.3.3
```

Borのインストール：

```sh
make bor-all
```

symlinksを作成します：

```sh
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

Borインストールをチェックします：

```sh
bor version
```

:::note

進む前に、Borは、sentryマシンとバリデータマシンの両方にインストールする必要があります。

:::

## ノードファイルの設定 {#setting-up-node-files}

:::note

ノードファイルはsentryマシンとバリデータマシンの両方に設定する必要があります。

:::

### 起動リポジトリの取得 {#fetching-the-launch-repository}

 [起動リポジトリ](https://github.com/maticnetwork/launch)をクローンします：

```sh
git clone https://github.com/maticnetwork/launch
```

### 起動ディレクトリを {#setting-up-the-launch-directory}

#### sentryマシン上で設定します。 {#on-the-sentry-machine}

 `node` ディレクトリを作成します：

```sh
mkdir -p node
```

ファイルとスクリプトを `launch`ディレクトリから `node`ディレクトリにコピーします：

```sh
cp -rf launch/mainnet-v1/sentry/sentry ~/node
cp launch/mainnet-v1/service.sh ~/node
```

#### バリデータマシン上 {#on-the-validator-machine}

 `node` ディレクトリを作成します：

```sh
mkdir -p node
```

ファイルとスクリプトを `launch`ディレクトリから `node`ディレクトリにコピーします：

```sh
cp -rf launch/mainnet-v1/sentry/validator ~/node
cp launch/mainnet-v1/service.sh ~/node
```

### ネットワークディレクトリの設定 {#setting-up-the-network-directories}

:::note

sentryマシンとバリデータマシンの両方でこのセッションを実行します。

:::

#### Heimdallの設定 {#setting-up-heimdall}

 `node` ディレクトリに変更します：

```sh
cd ~/node/heimdall
```

設定スクリプトを実行します：

```sh
bash setup.sh
```

#### Borの設定 {#setting-up-bor}

 `node` ディレクトリに変更します：

```sh
cd ~/node/bor
```

設定スクリプトを実行します：

```sh
bash setup.sh
```

## サービスの設定 {#setting-up-the-services}

:::note

sentryマシンとバリデータマシンの両方でこのセッションを実行します。

:::

 `node` ディレクトリにナビゲートします：

```sh
cd ~/node
```

設定スクリプトを実行します：

```sh
bash service.sh
```

サービスファイルをシステムディレクリにコピーします：

```sh
sudo cp *.service /etc/systemd/system/
```

## Sentryノードの設定 {#configuring-the-sentry-node}

まずリモートsentryマシンにログインします。

### Heimdallサービスの設定 {#configuring-the-heimdall-services}

Heimdall設定ファイルを編集用に開きます：

```sh
vi ~/.heimdalld/config/config.toml
```

 `config.toml` の中で、次のパラメータを変更します：

* `moniker` — 任意の名前。例: `moniker = "my-sentry-node"`.
* `seeds` — ノードID、IPアドレス、ポートからなるシードノード・アドレスです。

次の値を使用：

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — set the value to `true` をクリックして、ピア交換を有効にします。例: `pex = true`.
* `private_peer_ids` — バリデータ・マシンに設定された Heimdall のノード ID。

  バリデータ・マシン上の Heimdall のノード ID を取得するため：

  1. バリデータマシンにログインします。
  2. 実行：
     ```sh
     heimdalld tendermint show-node-id
     ```

  例: . `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` — set the value to `true` rometheusのメトリクスを有効にします。例: `prometheus = true`.
* `max_open_connections` — set the value to `100`. 例: `max_open_connections = 100`.

 `config.toml`で変更を保存します。

### Borサービスの設定 {#configuring-the-bor-service}

Bor設定ファイルを編集用に開きます：

```sh
`vi ~/node/bor/start.sh`
```

 `start.sh`の中で、ノードID、IPアドレス、ポートからなるブートノードアドレスを追加するためにファイルの最後に次の行を追加します：

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

 `start.sh`で変更を保存します。

### ファイアウォールの設定 {#configuring-a-firewall}

sentryマシンは次の開くポートを持っている必要があります `0.0.0.0/0`:

* `26656` Heimdallサービスはノードを他のノードのHeimdallサービスに接続します。

* `30303` Borサービスはノードを他のノードのBorサービスに接続します。

* `22` バリデータがどこからでもsshをすることができるためです。

## Sentryノードを開始 {#starting-the-sentry-node}

Heimdall サービスを最初にスタートします。Heimdallサービスが同期すると、Borサービスをスタートします。

:::note

前述したように、Heimdallサービスはゼロから完全に同期するまでに数日かかります。

あるいはメンテナンスされたスナップショットを使用することもできますが、これは同期時間を数時間に短縮します。詳細については[<ins>Snapshot Instructions for Heimdall and Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233)を参照してください。

スナップショットダウンロードリンクについては 1·[Polygon Chains Snapshots](https://snapshot.polygon.technology/)を参照してください。

:::

### Heimdallサービスをスタート {#starting-the-heimdall-service}

Heimdallサービスをスタート：

```sh
sudo service heimdalld start
```

Heimdall rest-serverをスタート：

```sh
sudo service heimdalld-rest-server start
```

Heimdallサービスログをチェック：

```sh
journalctl -u heimdalld.service -f
```

:::note

ログで次のエラーが表示される可能性があります：

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

これらのログはネットワーク上のノードの1つがお使いのノードへの接続を拒否したことを意味します。ノードがネットワーク上のより多くのノードをクロールするのを待機し、何もする必要はありません。これらのエラーに対応するためです。

:::

Heimdall rest-serverログをチェック：

```sh
journalctl -u heimdalld-rest-server.service -f
```

Heimdallの同期ステータスをチェック：

```sh
curl localhost:26657/status
```

出力では`catching_up`価値は次のとおりです：

* `true` — Heimdallサービスは同期しています。
* `false` —Heimdallサービスは完全に同期されます。

Heimdallサービスが完全に同期するまで待機します。

### Borサービスをスタートします {#starting-the-bor-service}

Heimdallサービスが同期したら、Borサービスをスタートします。

Borサービスをスタート：

```sh
sudo service bor start
```

Borサービスログをチェック：

```sh
journalctl -u bor.service -f
```

## バリデータノードを設定します {#configuring-the-validator-node}

:::note

このセクションを完了するには、完全に同期されたEthereumメインネットのRPCエンドポイントをノード対応にしておく必要があります。

:::

### Heimdallサービスを設定します {#configuring-the-heimdall-service}

リモートバリデータマシンにログインします。

 `vi ~/.heimdalld/config/config.toml`を開いて編集します。

 `config.toml`で次を変更します：

* `moniker` — 任意の名前。例: `moniker = "my-validator-node"`.
* `pex` — set the value to `false`ピア交換を有効にします。例: `pex = false`.
* `private_peer_ids` — バリューを無効にコメントアウトします。例: . `# private_peer_ids = ""`.

sentryマシンでHeimdallのIDノードを取得するには:

  1. sentryマシンにログインします。
  1.  `heimdalld tendermint show-node-id`を実行します。

例: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — set the value to `true` rometheusのメトリクスを有効にします。例: `prometheus = true`.

 `config.toml`で変更を保存します。

 `vi ~/.heimdalld/config/heimdall-config.toml`を開いて編集します。

 `heimdall-config.toml`で次を変更します：

* `eth_rpc_url` — — 完全に同期されたEthereumメインネットノードのためのRPCエンドポイント、たとえばInfura。 `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

例: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`

 `heimdall-config.toml`で変更を保存します。

### Borサービスを設定します {#configuring-the-bor-service-1}

 `vi ~/.bor/data/bor/static-nodes.json`を開いて編集します。

 `static-nodes.json`で次を変更します：

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"`— ノードIDとIPアドレスはsentryマシンのBor設定のものです。

sentryマシンでBorのIDノードを取得するには：

  1. sentryマシンにログインします。
  2.  `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`を実行します。

  例: . `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

 `static-nodes.json`で変更を保存します。

## Owner keyと署名者鍵を設定します {#setting-the-owner-and-signer-key}

Polygonでは所有者と署名者の鍵を別に保持することを奨励しています。

* 署名者 — アドレスが署名するのは[チャックポイントトランザクション](/docs/maintain/glossary.md#checkpoint-transaction)です。推奨は署名アドレスに少なくとも1ETHを維持することです。
* 所有者 — ステーキングトランザクションを行うアドレス。推奨されるのはMaticトークンを所有者アドレスに維持することです。

### Heimdall秘密鍵の生成 {#generating-a-heimdall-private-key}

Heimdall秘密鍵はバリデータマシンにのみ生成する必要があります。生成しないのはsentryマシン上のHeimdall秘密鍵です。

秘密鍵を生成するには、次を実行します：

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

場所

* ETHEREUM_個人_鍵 —Ethereumウォレットの秘密鍵。

 `priv_validator_key.json`を生成します。生成されたJSONファイルをHeimdall設定に移動します。ディレクトリ:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Bor keistoreファイルの生成 {#generating-a-bor-keystore-file}

Bor keystoreファイルはバリデータマシンにのみ生成する必要があります。Bor keystoreファイルをsentryマシンでは生成しません。

秘密鍵を生成するには、次を実行します：

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

場所

* ETHEREUM_個人_鍵 —Ethereumウォレットの秘密鍵。

プロンプトが表示されたら、keystoreファイルにパスワードを設定します。

 `UTC-<time>-<address>` keystoreファイルを生成します。

生成されたkeystoreファイルは、Bor設定ディレクトリに移動します：

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### password.txt追加 {#add-password-txt}

 `password.txt`ファイルを作成してから、 にBor keystoneファイルのパスワードを`~/.bor/password.txt`ファイルに追加します。

### Ethereumアドレスを追加 {#add-your-ethereum-address}

 `vi /etc/matic/metadata`を開いて編集します。

 `metadata`内でEthereumアドレスを追加します。例: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

 `metadata`で変更を保存します。

## バリデータノードをスタート {#starting-the-validator-node}

この時点で必要なことは：

* sentryマシン上のHeimdallサービスは同期し、実行しています。
* sentryマシン上のBorサービスは実行しています。
* Heimdallサービスとバリデータマシン上のBorサービスは設定しました。
* 所有者と署名者のキーは設定しました。

### Heimdallサービスをスタート {#starting-the-heimdall-service-1}

スタートしたHeimdallサービスをバリデータマシンでスタートします。Heimdallサービスが同期したら、バリデータマシンでBorサービスをスタートします。

Heimdallサービスをスタート：

```sh
sudo service heimdalld start
```

Heimdall rest-serverをスタート：

```sh
sudo service heimdalld-rest-server start
```

Heimdallブリッジをスタート：

```sh
sudo service heimdalld-bridge start
```

Heimdallサービスログをチェック：

```sh
journalctl -u heimdalld.service -f
```

Heimdall rest-serverログをチェック：

```sh
journalctl -u heimdalld-rest-server.service -f
```

Heimdallブリッジログをチェック：

```sh
journalctl -u heimdalld-bridge.service -f
```

Heimdallの同期ステータスをチェック：

```sh
curl localhost:26657/status
```

出力では`catching_up`価値は次のとおりです：

* `true` — Heimdallサービスは同期しています。
* `false` ー Heimdallサービスは同期しました。

Heimdallサービスが完全に同期するまで待機します。

### Borサービスをスタートします {#starting-the-bor-service-1}

バリデータマシン上のHeimdallサービスが同期してから、バリデータマシン上のBorサービスをスタートします。

Borサービスをスタート：

```sh
sudo service bor start
```

Borサービスログをチェック：

```sh
journalctl -u bor.service -f
```

## コミュニティと健全性をチェックします {#health-checks-with-the-community}

sentryノードとバリデータノードが同期して実行されているので、[Discord](https://discord.com/invite/0xPolygon)に向かいコミュニティにノードの健康チェックを要請します。

## 次のステップ：ステーキング {#next-steps-staking}

sentryノードとバリデータノードの健全性がチェックされたので、 [ステーキング](/docs/maintain/validator/core-components/staking.md) ガイドに進み、ネットワークのバックアップをスタートします。
