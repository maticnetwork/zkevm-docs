---
id: full-node-binaries
title: バイナリでフルノード実行をする
description: バイナリを使用してフルPolygonノードを展開する
keywords:
  - docs
  - matic
  - polygon
  - node
  - binaries
  - deploy
  - run full node
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

このチュートリアルでは、バイナリを使用してフルノードを実行して実行する方法を説明します。システム要件については、[最小技術要件](technical-requirements.md)ガイドを参照してください。

:::tip

このガイドの手順には、HeimdallとBorサービスが完全に同期するのを待機することが含まれます。
このプロセスは、完了までに数日かかります。

あるいはメンテナンスされたスナップショットを使用することもできます。これは時間を数時間に短縮します。詳細については[<ins>Snapshot Instructions for Heimdall and Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor)を参照してください。

スナップショットのダウンロードリンクについては、[<ins>Polygonチェーンスナップショット</ins>](https://snapshots.polygon.technology/)のページを参照してください。

:::

## 概要 {#overview}

- マシンを準備する
- フルノードマシンにHeimdallとBorバイナリをインストールする
- フルノードマシンにHeimdallとBorサービスを設定する
- フルノードマシンを設定する
- フルノードマシンを開始する
- コミュニティとノード健全をチェック

:::note

まとめられたアクションを順番に追従する必要があります。そうでなければ問題が発生します。

:::

### インストールする`build-essential`

フルノードに**は**必要です。インストールするには、下記のコマンドを実行します：

```bash
sudo apt-get update
sudo apt-get install build-essential
```

### GOをインストールする {#install-go}

フルノードを実行するには、これも**必要**です。**v1.18以上**のインストールをおすすめします。

```bash
wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
bash go-install.sh
sudo ln -nfs ~/.go/bin/go /usr/bin/go
```

## バイナリをインストールする {#install-binaries}

PolygonノードはHeimdallとBorの2つのレイヤーで構成されています。Heimdallは、Ethereumネットワークと並行してコントラクトを監視するテンダーミントフォークです。Borは基本的にHeimdallノードによってシャッフルされたブロックを生成するGethフォークです。

どちらのバイナリもインストールして正しく機能するためには、実行する必要があります。

### Heimdall {#heimdall}

Heimdallおよび関連するサービスの最新バージョンをインストールします。正しいリリースバージョンにチェックアウトしてください[。](https://github.com/maticnetwork/heimdall/releases)最新バージョンである[Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0)には、次のような拡張機能が含まれています：
1. 状態同期txsでデータサイズを制限するtxsは次のように：
    * **30Kb**：**バイト** として表現された場合
    * **文字列**として表現された場合**60Kb**
2. 異なるバリデータのコントラクトイベント間の**遅延時間**を延ばすことで、イベントのバーストが発生した場合にメンプールがかなり迅速に満たされ、チェーンの進行を阻害しないことを確認します。

次の例はデータサーズが制限される方法を示しています：

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

**Heimdall**をインストールするには、次のコマンドを実行します：

```bash
cd ~/
git clone https://github.com/maticnetwork/heimdall
cd heimdall

# Checkout to a proper version, for example
git checkout v0.3.0
git checkout <TAG OR BRANCH>
make install
source ~/.profile
```

これにより、`heimdalld`とバイナリ`heimdallcli`がインストールされます。Heimdallバージョンを確認してインストールするかどうかを確認してください：

```bash
heimdalld version --long
```

### Bor {#bor}

Borの最新バージョンをインストールします。正しい[リリース済み](https://github.com/maticnetwork/bor/releases)バージョンにチェックアウトすることを確認してください。

```bash
cd ~/
git clone https://github.com/maticnetwork/bor
cd bor

# Checkout to a proper version
# For e.g: git checkout 0.3.3
git checkout <TAG OR BRANCH>
make bor
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

これにより、`bor`とバイナリ`bootnode`がインストールされます。お使いのマシンでBorバージョンを確認してインストールを確認してください：

```bash
bor version
```

## ノードファイルを設定する {#configure-node-files}

### フェッチの起動をレポートする {#fetch-launch-repo}

```bash
cd ~/
git clone https://github.com/maticnetwork/launch
```

### 起動ディレクトリを設定する {#configure-launch-directory}

ネットワークディレクトリを設定するには、ネットワーク名とノードのタイプが必要です。

**利用可能なネットワーク：**`mainnet-v1`および`testnet-v4`

**ノードタイプ：**`sentry`

:::tip

メインネットとテストネットの設定については、適切に使用してください`<network-name>`。Polygonメインネットとムンバイテストネット`testnet-v4`のために使用`mainnet-v1`します。
:::

```bash
cd ~/
mkdir -p node
cp -rf launch/<network-name>/sentry/<node-type>/* ~/node
```

### ネットワークディレクトリを設定する {#configure-network-directories}

**Heimdallデータのセットアップ**

```bash
cd ~/node/heimdall
bash setup.sh
```

**Borデータのセットアップ**

```bash
cd ~/node/bor
bash setup.sh
```

## サービスファイルを設定する {#configure-service-files}

適切な`service.sh`ファイルをダウンロードしてください。`<network-name>`Polygonメインネットとムンバイテストネット`testnet-v4`のために使用`mainnet-v1`します。

```bash
cd ~/node
wget https://raw.githubusercontent.com/maticnetwork/launch/master/<network-name>/service.sh
```

**メタデータファイル**を生成する：

```bash
sudo mkdir -p /etc/matic
sudo chmod -R 777 /etc/matic/
touch /etc/matic/metadata
```

`.service`ファイルを生成し、システムディレクトリにコピーします：

```bash
cd ~/node
bash service.sh
sudo cp *.service /etc/systemd/system/
```


## 設定ファイルの設定 {#setup-config-files}

- リモートマシン/VMにログインする
- `config.toml`ファイルにいくつかの詳細を追加する必要があります。ファイルを開いて編集するには`config.toml`、次のコマンドを実行します：。`vi ~/.heimdalld/config/config.toml`

設定ファイルで、変更および情報を`Moniker`追加する必要があります`seeds`：

    ```bash
    moniker=<enter unique identifier>
    # For example, moniker=my-sentry-node

    # Mainnet:
    seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656"

    # Testnet:
    seeds="4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656"
    ```

    - **Pex**のバリューを`true`に変更する
    - **Prometheus**のバリューを`true`に変更する
    - `max_open_connections`バリューを`100`にセットする

上記の変更**を行う際に適切なフォーマットを維持**してください。

- `~/.heimdalld/config/heimdall-config.toml`に以下を設定します：

    ```jsx
    eth_rpc_url=<insert Infura or any full node RPC URL to Goerli>
    ```

- このコマンドを使用してBor用の`start.sh`ファイルを開きます：。`vi ~/node/bor/start.sh`パラメータを開始するために次のフラグを追加します：

  ```bash
  # Mainnet:
  --bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303"

  # Testnet:
  --bootnodes "enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303"
  ```

- **アーカイブ**モードを有効にするには、ファイルに次のフラグを追加することができます`start.sh`：

  ```jsx
  --gcmode 'archive' \
  --ws --ws.port 8546 --ws.addr 0.0.0.0 --ws.origins '*' \
  ```

## サービスをスタートする {#start-services}

セントリーノードで次のコマンドを使用してHeimdallノードを実行します：

```bash
sudo service heimdalld start
sudo service heimdalld-rest-server start
```

**Heimdallが**完全に同期されていることを確認し、Borを開始するだけです。Heimdallを完全に同期せずに、Borをスタートすると、頻繁に問題が発生します。

**Heimdallが同期されているかどうかを確認する**
  1. リモートマシン/VM上で、`curl localhost:26657/status`を実行します
  2. 出力では、`catching_up`バリューは、`false`となる必要があります

Heimdallが同期されると、下記のコマンドを実行します：

```bash
sudo service bor start
```

## ログ {#logs}

ログは、`journalctl`linuxツールで管理できます。詳細な使用方法を説明します：[Journalctlを使用してSystemdログを表示および操作する方法](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs)。

**Heimdallノードログをチェックする**

```bash
journalctl -u heimdalld.service -f
```

**Heimdallのリストサーバーログを確認する**

```bash
journalctl -u heimdalld-rest-server.service -f
```

**Borのリストサーバーログを確認する**

```bash
journalctl -u bor.service -f
```

## ポートとファイアウォールのセットアップ {#ports-and-firewall-setup}

セントリーノードファイアウォール上のワールド (0.0.0.0/0) に対して、ポート22、26656、および30303を開きます。

要件とセキュリティガイドラインに従って、VPNを使用してポート22へのアクセスを制限できます。
