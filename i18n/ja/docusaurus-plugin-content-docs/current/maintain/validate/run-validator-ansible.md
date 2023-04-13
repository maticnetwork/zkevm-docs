---
id: run-validator-ansible
title: Ansibleでバリデータノードを実行する
sidebar_label: Using Ansible
description: Ansibleを使用してバリデータノードをPolygonに設定することができます。
keywords:
  - docs
  - matic
  - polygon
  - ansible
  - node
  - validator
  - sentry
slug: run-validator-ansible
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip

ガイドのステップでは **Heimdall** と **Bor** サービスの同期を待つことが含まれます。
プロセス完了までに数日かかります。あるいはメンテナンスされたスナップショットを使用することもできますが、これは同期時間を数時間に短縮します。詳細については[<ins>Snapshot Instructions for Heimdall and Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor)を参照してください。

スナップショットのダウンロードリンクについては、[<ins>Polygonチェーンスナップショット</ins>](https://snapshot.polygon.technology/)を参照してください。
:::

セクションではAnsible Playbookを介してバリデータノードをスタートと実行をガイドします。

システム要件については [Validator Node System Requirements](validator-node-system-requirements.md)を参照してください。

バイナリーからバリデータノードを開スタート実行したい場合は [Run a Validator Node from Binaries](run-validator-binaries.md)を参照してください。

:::caution

新しいバリデータを受け入れるスペースは限られています。新しいバリデータは、すでにアクティブなバリデータがアンボンドされている場合にのみアクティブなセットに参加することができます。

:::

## 前提条件 {#prerequisites}

* 3台のマシン - Ansible playbookを実行するローカルマシン1台、2台のリモートマシン - 1台[sentry](/docs/maintain/glossary.md#sentry)、1台[validator](/docs/maintain/glossary.md#validator)です。
* ローカルマシン上で [Ansible](https://www.ansible.com/) がインストールされました。
* ローカルマシン上で[Python 3.x](https://www.python.org/downloads/)がインストールされました。
* リモートマシンで、Goがインストールされて*いない*ことを確認してください。
* リモートマシンでは、ローカルマシンのSSパブリック鍵はリモートマシンにオンにします。
* Bloxrouteはリレーネットワークとして利用できます。信頼できるピアとしてゲートウェイを追加する必要がある場合は、[Polygon Discord](https://discord.com/invite/0xPolygon) > POSバリデータ|フルノードプロバイダー|パートナー > bloxrouteで**@validator-support-team**にご連絡ください。

## 概要 {#overview}

バリデータノードに取得するには次の操作を行います：

1. 3台の機械を準備してください。
1. Ansibleを介してsentryノード設定します。
1. Ansibleを介してババリデータノードを設定します。
1. sentryノード設定します。
1. sentryノードをスタートします。
1. バリデータノードを設定します。
1. 所有者と署名者の鍵を設定します。
1. バリデータノードをスタートします。
1. コミュニティとノード健在性をチェックします。

:::note

アクションをま従う必要があります。**exact outlined sequence of actions**, そうでなければ問題に実行されます。

たとえば、sentryノードはバリデータノード前に常に設定する必要があります。

:::

## sentryノード設定 {#set-up-the-sentry-node}

ローカルマシンで [node-ansible repository](https://github.com/maticnetwork/node-ansible)をクローンします：

```sh
git clone https://github.com/maticnetwork/node-ansible
```

クローンされたリポジトリに変更：

```sh
cd node-ansible
```

sentryノードとバリデータノードになるリモートマシンのIPアドレスを `inventory.yml` ファイルに追加します。

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for sentry node
        xxx.xxx.xx.xx: # <----- Add IP for second sentry node (optional)
    validator:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for validator node
```

例：

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        188.166.216.25:
    validator:
      hosts:
        134.209.100.175:
```

リモートsentryマシンが到達可能であることをチェックしてください。ローカルマシンで実行：

```sh
$ ansible sentry -m ping
```

出力としてこれを取得する必要があります：

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

sentryノードのセットアップのテストランを行います。

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --list-hosts
```

これは出力になります：

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

sentyノード設定をsudo特権で実行します：

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --ask-become-pass
```

セットアップが完了すると、端末に完了のメッセージが表示されます。

:::note

問題が発生してスタートオーバーしたい場合は実行してください：

```sh
ansible-playbook -l sentry playbooks/clean.yml
```

:::

## バリデータノード設定 {#set-up-the-validator-node}

この時点でsentryノード設定をしています。

ローカルマシンでバリデータノード設定を実行するために、Ansible Playbookを設定しています。

リモートバリデータマシンが到達可能であることをチェックしてください。ローカルマシンで実行してください`ansible validator -m ping`。

出力としてこれを取得する必要があります：

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

バリデータノード設定のテスト実行を行います：

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0 network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --list-hosts
```

出力としてこれを取得する必要があります：

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

sudo特権でバリデータノード設定を実行します：

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --ask-become-pass
```

セットアップが完了すると、端末に完了のメッセージが表示されます。

:::note

問題が発生してスタートオーバーしたい場合は実行してください：

```sh
ansible-playbook -l validator playbooks/clean.yml
```

:::

## sentryノードを設定 {#configure-the-sentry-node}

リモートsentryマシンにログインします。

### Heimdallサービスを設定 {#configure-the-heimdall-service}

`config.toml` を開いて `vi ~/.heimdalld/config/config.toml`を編集します。

次の変更：

* `moniker` — 任意の名前。例: `moniker = "my-full-node"`.
* `seeds` — ノードID、IPアドレス、ポートからなるシードノード・アドレスです。

次の値を使用：

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — set the value to `true` をクリックして、ピア交換を有効にします。例: `pex = true`.
* `private_peer_ids` — バリデータ・マシンに設定された Heimdall のノード ID。

  バリデータ・マシン上の Heimdall のノード ID を取得するため：

  1. バリデータ・マシンにログインします。
  1. `heimdalld tendermint show-node-id`を実行。

  例: . `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` — set the value to `true` rometheusのメトリクスを有効にします。例: `prometheus = true`.
* `max_open_connections` — set the value to `100`. 例: `max_open_connections = 100`.

 `config.toml`で変更を保存します。

### Borサービスを設定 {#configure-the-bor-service}

`vi ~/node/bor/start.sh`を開いて編集します。

`start.sh`,で追加ノノードID、アドレス、ポートから成るノードアドレスを追加します：

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

`start.sh`で変更を保存 .

 `vi ~/.bor/data/bor/static-nodes.json`を開いて編集します。

`static-nodes.json`,で次を変更：

* `"<replace with enode://validator_machine_enodeID@validator_machine_ip:30303>"` — —バリデータマシンに設定BorのIDとアドレスノード。

バリデーターノードマシンでBorのIDを取得するには：

  1. バリデータ・マシンにログインします。
  1. `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`を実行。

  例: . `"enode://410e359736bcd3a58181cf55d54d4e0bbd6db2939c5f548426be7d18b8fd755a0ceb730fe5cf7510c6fa6f0870e388277c5f4c717af66d53c440feedffb29b4b@134.209.100.175:30303"`.

`static-nodes.json`で変更を保存 .

### ファイアウォールを設定 {#configure-firewall}

sentryマシンは次の開くポートを持つ必要があります `0.0.0.0/0`:

* 26656-Heimdallサービスを使用してHeimdallサービスを他のノードにノード接続します。

* 30303-お使いのBorサービスはBorサービスを使用してノードを他のノードに接続します。

* 22- バリデータがどこからでもsshができるようにします。

:::note

ただし、VPN接続を使用している場合、VPNアドレスからのssh接続を許可するのはVPN IPアドレスだけです。

:::

## sentryノードをスタート {#start-the-sentry-node}

Heimdall サービスを最初にスタートします。Heimdallサービスが同期すると、Borサービスをスタートします。

:::note

Heimdallサービスはゼロから完全に同期するまでに数日かかります。

あるいはメンテナンスされたスナップショットを使用することもできます。これは時間を数時間に短縮します。詳細については、[<ins>HeimdallとBorのスナップショット説明書</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233)を参照してください。

スナップショットダウンロードリンクについては 1·[Polygon Chains Snapshots](https://snapshot.polygon.technology/)を参照してください。

:::

### Heimdallサービスをスタート {#start-the-heimdall-service}

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

ネットワーク上のノードの一つはノードへの接続を拒否しました。これらのエラーで何もする必要はありません。ノネットワーク上でノードをクロールするのを待機します。

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

Heimdallサービスが完全に同期するのを待機します。

### Borサービスをスタート {#start-the-bor-service}

Heimdallサービスが完全に同期したら、Borサービスをスタートします。

Borサービスをスタート：

```sh
sudo service bor start
```

Borサービスログをチェック：

```sh
journalctl -u bor.service -f
```

## バリデータノードを設定 {#configure-the-validator-node}

:::note

セクションを完了するには、完全に同期EthereumメインネットノードがRPCエンドポイントを持っている必要があります。

:::

### Heimdallサービスを設定 {#configure-the-heimdall-service-1}

リモートバリデータマシンにログインします。

`config.toml` を開いて `vi ~/.heimdalld/config/config.toml`を編集します。

次の変更：

* `moniker` — 任意の名前。例: `moniker = "my-validator-node"`.
* `pex` — set the value to `false`ピア交換を有効にします。例: `pex = false`.
* `private_peer_ids` — バリューを無効にコメントアウトします。例: . `# private_peer_ids = ""`.


sentryマシンでHeimdallのIDノードを取得するには:

  1. sentryマシンにログインします。
  1. `heimdalld tendermint show-node-id`を実行。

  例: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — set the value to `true` rometheusのメトリクスを有効にします。例: `prometheus = true`.

 `config.toml`で変更を保存します。

 `vi ~/.heimdalld/config/heimdall-config.toml`を開いて編集します。

`heimdall-config.toml`,で次を変更：

* `eth_rpc_url` — — 完全に同期されたEthereumメインネットノード、すなわちInfura。`eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

例: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`


`heimdall-config.toml`で変更を保存 .

### Borサービスを設定 {#configure-the-bor-service-1}

`vi ~/.bor/data/bor/static-nodes.json`を開いて編集します。

`static-nodes.json`,で次を変更：

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` —sentryマシンに設定されたBorのIDとアドレスノード。

sentryマシンでBorのIDノードを取得するには：

  1. sentryマシンにログインします。
  1. `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`を実行。

  例: . `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

`static-nodes.json`で変更を保存 .

## 所有者と署名鍵を設定 {#set-the-owner-and-signer-key}

Polygonでは所有者と署名者の鍵は異なるままにしてください。

* 署名[checkpoint transactions](../glossary#checkpoint-transaction)に署名するアドレス。推奨は署名アドレスに少なくともETHを保持することです。
* 所有者 — ステーキングトランザクションを行うアドレス。Maticトークンをアドレスに保持することをお奨めます。

### Heimdall秘密鍵を生成 {#generate-a-heimdall-private-key}

Heimdall秘密鍵はバリデータマシンにのみ生成する必要があります。**Do not generate a Heimdall private key on the sentry machine.**

秘密鍵を生成するには、次を実行します：

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

:::note

Ethereum_PRIVATE_KEY — あなたのEthereumウォレットの秘密鍵

:::

 `priv_validator_key.json`を生成します。生成されたファイルはHeimdall設定ディレクトリに移動します：

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Bor keystoreファイルを生成 {#generate-a-bor-keystore-file}

Bor keystoreファイルはバリデータマシンにのみ生成する必要があります。**Do not generate a Bor keystore file on the sentry machine.**

秘密鍵を生成するには、次を実行します：

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_個人_鍵 —Ethereumウォレットの秘密鍵。

:::

プロンプトが表示されたら、keystoreファイルにパスワードを設定します。

 `UTC-<time>-<address>` keystoreファイルを生成します。

生成されたkeystoreファイルは、Bor設定ディレクトリに移動します：

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### 追加`password.txt`

`password.txt`を作成してから、`~/.bor/password.txt`ファイルでBor keystore ファイルのパスワードを追加します。

### Ethereumアドレスを追加 {#add-your-ethereum-address}

 `vi /etc/matic/metadata`を開いて編集します。

 `metadata`内でEthereumアドレスを追加します。例: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

 `metadata`で変更を保存します。

## バリデータノードをスタート {#start-the-validator-node}

この時点で必要なことは：

* sentryマシン上のHeimdallサービスは完全に同期して実行します。
* sentryマシン上のBorサーサービスは実行しています。
* Heimdallサービスとバリデータマシン上のBorサービスは設定しました。
* 所有者と署名者のキーは設定しました。

### Heimdallサービスをスタート {#start-the-heimdall-service-1}

スタートしたHeimdallサービスをバリデータマシンでスタートします。Heimdallサービスが同期すると、バリデータマシンでBorサービスをスタートします。

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
* `false` —Heimdallサービスは完全に同期されます。

Heimdallサービスが完全に同期するのを待機します。

### Borサービスをスタート {#start-the-bor-service-1}

Heimdallサービスが完全に同期されたら、スタートバリデータマシンでBorサービスをスタートします。

Borサービスをスタート：

```sh
sudo service bor start
```

Borサービスログをチェック：

```sh
journalctl -u bor.service -f
```

## コミュニティとノード健全をチェック {#check-node-health-with-the-community}

sentryとバリデータノードが同期して実行される今、 [Discord](https://discord.com/invite/0xPolygon)に向かってコミュニティにノードを健全チェックするよう依頼してください。

## ステーキングに進む {#proceed-to-staking}

sentryとバリデータノードが健全チェックされたら、[Staking](/docs/maintain/validator/core-components/staking)に進みましょう。
