---
id: snapshot-instructions-heimdall-bor
title: HeimdallBorスナップショット
description: 高速同期のためのHeimdallおよびBorスナップショット。
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
  - heimdall
  - bor
  - snapshots
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

新しいセントリ、バリデータ、またはフルノードサーバーをセットアップするときに、ネットワーク経由で同期せずに同期を高速化するには、スナップショットを使用することをお勧めします。スナップショットを使用すると、HeimdallとBorの両方で数日節約できます。

:::tip

最新のスナップショットについては、[<ins>Polygonチェーンスナップショット</ins>](https://snapshot.polygon.technology/)を参照してください。

:::

## Heimdallスナップショット {#heimdall-snapshot}

まず、ノードセットアップガイドに従って、**前提条件**でノードをセットアップする必要があります。Heimdallが同期するサービスをスタートする前に、以下の手順に従ってスナップショットを使用します。

1. 以下のコマンドを実行して、HeimdallのスナップショットtarファイルをVMにダウンロードします。

```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-08.tar.gz
```

2. 次のコマンドを実行して、HeimdallのスナップショットtarファイルをVMにダウンロードします：
```
// You must ensure you are running this command before you start the Heimdall service on your node.
// If your Heimdall service has started, please stop the service and run the following command:
// Once unpacking is complete, you can start the Heimdall service again:
tar -xzvf <snapshot file> -C <HEIMDALL_DATA_DIRECTORY>

// If your Heimdall data directory is different,
// please replace the directory name in the command for starting the Heimdall service.
// When this command completes, you may delete the tar file to reclaim space.

// For example, this will unpack the tar file in the Heimdall Data directory:
tar -xzvf heimdall-snapshot-2021-11-08.tar.gz -C /var/lib/heimdall/data/
```

## Borスナップショット {#bor-snapshot}

まず、ノードセットアップガイドに従って、**前提条件**でノードをセットアップする必要があります。Borのサービスをスタートして同期する前に、以下の手順に従ってスナップショットを使用します。

1. 以下のコマンドを実行して、BorのスナップショットtarファイルをVMにダウンロードします。
```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-08.tar.gz
```

2. Borデータディレクトリで、tarファイルを解凍するには、次のコマンドを実行します：

```
// You must ensure you are running this command before you start the Bor service on your node.
// If your Bor service has started, please stop the service and run the following command:
// Once unpacking is complete, you can start the Bor service again.

tar -xzvf <snapshot file> -C <BOR_DATA_DIRECTORY>

// If your bor data directory is different
// please replace the directory name in the command for starting the Bor service.
// When this command completes, you may delete the tar file to reclaim space.

// For example, this will unpack the tar file in the Bor data directory:
tar -xzvf bor-fullnode-snapshot-2022-11-08.tar.gz -C /var/lib/bor/data/bor/chaindata
```

:::note

スナップショットをより速くダウンロードするために`aria2c`使用されます。ダウンロードしたスナップショットを直接抽出できる方法が代替可能です。

**そのための手順：**


```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c     https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::