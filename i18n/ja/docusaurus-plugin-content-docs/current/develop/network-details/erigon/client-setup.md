---
id: client-setup
title: ノードクライアントのアーカイブをセットアップする
sidebar_label: Set up an Archive Node Client
description: "システム要件とクライアントのセットアップ。"
keywords:
  - erigon
  - archive
  - node
  - docs
  - polygon
  - client
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## システム要件 {#system-requirements}

### アーカイブノード {#archive-node}

- 16コアのCPU
- 64 GBのRAM
- 少なくとも20k+のiOPとraid-0ベースのディスク構造を持つio1以上

### Erigonクライアント {#erigon-client}

- Polygonメインネットのアーカイブノードについて：5TB
- Polygon Mumbaiのアーカイブノードのために：1TB
- SSDまたはNVMe。容量に近い場合、SSDのパフォーマンスが悪化することを念頭に置いてください。
- RAM：>= 16GB、64ビットアーキテクチャ
- Golangバージョン >= 1.18、GCC 10+

:::note HDDは、推奨されていません。

HDDでは、Erigonは、常にチェーンの先端からNブロック遅れますが、遅れることはありません。

:::

## Erigonクライアントのセットアップ {#erigon-client-setup}

### インストール方法 {#how-to-install}

以下のコマンドを実行して、Erigonをインストールします。

```bash
git clone --recurse-submodules -j8 https://github.com/maticnetwork/erigon.git
cd erigon
git checkout v0.0.5
make erigon
```

これにより、バイナリが`./build/bin/erigon`で作成されるようになります。

フォークされたリポジトリ上で`v0.0.5`タグを使用して、安定したバージョンを取得します。

### スタート方法 {#how-to-start}

Erigonを起動するには、次の操作を実行します：

```bash
erigon --chain=mumbai
```

- Mumbaiテストネットに`chain=mumbai`を使用する
- Polygonメインネット`chain=bor-mainnet`の使用

### Erigonを設定する方法 {#how-to-configure-erigon}

- Eragonファイルをデフォルト以外の場所に保存する場合は、`-datadir`を使用する

    ```
    erigon --chain=mumbai --datadir=<your_data_dir>
    ```

- ローカルの**heimdall**を使用していない場合は、`-bor.heimdall=<your heimdall url>`を使用します。デフォルトでは、`localhost:1317`に接続します。

    ```makefile
    erigon --chain=mumbai --bor.heimdall=<your heimdall url> --datadir=<your_data_dir>
    ```

    - Polygon Mumbai Testnetに接続したい場合は、[https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology)

    - Polygonメインネットについて：[https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology)

### より速い同期のためのヒント {#tips-for-faster-sync}

- 初期同期を高速化するには、高速のIOPSやRAMを搭載したマシンを使用します。
- 以下のコマンドを使用して、スナップショットのダウンロード/アップロード速度を上げます：

```makefile
--torrent.upload.rate="512mb" --torrent.download.rate="512mb"
```

`512`をマシンが管理できる帯域幅に置き換えます。
