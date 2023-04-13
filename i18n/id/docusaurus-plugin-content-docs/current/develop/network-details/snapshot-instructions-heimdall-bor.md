---
id: snapshot-instructions-heimdall-bor
title: Snapshot Heimdall dan Bor
description: Instruksi snapshot Heimdall dan Bor untuk sinkronisasi yang lebih cepat.
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

Ketika menyiapkan server sentry baru, validator, atau node penuh, sebaiknya gunakan snapshot untuk sinkronisasi yang lebih cepat tanpa harus melakukan sinkronisasi di jaringan. Menggunakan snapshot akan menghemat beberapa hari untuk Heimdall dan Bor.

:::tip

Untuk snapshot terbaru, silakan kunjungi [<ins>Snapshot</ins>](https://snapshot.polygon.technology/).

:::

## Snapshot Heimdall {#heimdall-snapshot}

Pertama, Anda harus menyiapkan node dengan **prasyarat** yang sesuai panduan pengaturan node. Sebelum memulai layanan untuk menyinkronkan Heimdall, ikuti langkah-langkah di bawah ini untuk menggunakan snapshot:

1. Unduh file tar snapshot dari Heimdall di VM dengan menjalankan perintah berikut:

```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-08.tar.gz
```

2. Untuk membuka file tar di direktori data Heimdall, jalankan perintah berikut:
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

## Snapshot Bor {#bor-snapshot}

Pertama, Anda harus menyiapkan node dengan **prasyarat** yang sesuai panduan pengaturan node. Sebelum memulai layanan untuk menyinkronkan Bor, ikuti langkah-langkah di bawah ini untuk menggunakan snapshot:

1. Unduh file tar snapshot dari Bor di VM dengan menjalankan perintah berikut:
```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-08.tar.gz
```

2. Untuk membuka file tar di direktori Data Bor, jalankan perintah berikut:

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

`aria2c`Metode ini digunakan untuk mengunduh snapshot lebih cepat. Ada cara alternatif di mana snapshot yang diunduh dapat diekstraksi secara langsung tanpa intervensi.

**Langkah untuk itu:**


```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c     https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::