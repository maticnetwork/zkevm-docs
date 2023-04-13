---
id: client-setup
title: Menyiapkan Klien Node Arsip
sidebar_label: Set up an Archive Node Client
description: "Persyaratan sistem dan pengaturan klien."
keywords:
  - erigon
  - archive
  - node
  - docs
  - polygon
  - client
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Persyaratan Sistem {#system-requirements}

### Node Archive {#archive-node}

- CPU 16-core
- RAM 64 GB
- Basically io1 atau di atas dengan setidaknya 20k+ iop dan pembagian disk yang berbasis raid-0

### Klien Erigon {#erigon-client}

- Untuk node Arsip dari Polygon Mainnet: 5TB
- Untuk node Arsip Polygon Mumbai: 1TB
- SSD atau NVMe. Berpikiran bahwa kinerja SSD memburuk ketika dekat ke kapasitas
- RAM: >= 16 GB, arsitektur 64-bit
- Versi Golang >= 1.18, GCC 10+

:::note HDD tidak direkomendasikan

Pada HDD, Erigon akan selalu menjadi blok N di belakang ujung rantai tersebut, tetapi tidak akan tertinggal.

:::

## Pengaturan Klien Erigon {#erigon-client-setup}

### Cara Instalasi {#how-to-install}

Jalankan perintah berikut untuk menginstal Erigon:

```bash
git clone --recurse-submodules -j8 https://github.com/maticnetwork/erigon.git
cd erigon
git checkout v0.0.5
make erigon
```

Ini akan membuat biner di `./build/bin/erigon`

Gunakan tag `v0.0.5` pada forked repo kami untuk mendapatkan versi stabil.

### Cara Memulai {#how-to-start}

Untuk memulai Erigon, menjalankan:

```bash
erigon --chain=mumbai
```

- Gunakan `chain=mumbai` untuk testnet Mumbai
- Gunakan `chain=bor-mainnet`untuk Mainnet

### Cara Mengonfigurasi Erigon {#how-to-configure-erigon}

- Jika Anda ingin menyimpan file Erigon di lokasi non-default, gunakan `-datadir`

    ```
    erigon --chain=mumbai --datadir=<your_data_dir>
    ```

- Jika Anda tidak menggunakan **heimdall** lokal, gunakan `-bor.heimdall=<your heimdall url>`. Secara default, ini akan mencoba terhubung ke `localhost:1317`.

    ```makefile
    erigon --chain=mumbai --bor.heimdall=<your heimdall url> --datadir=<your_data_dir>
    ```

    - Jika Anda ingin terhubung ke penggunaan Testnet Mumbai Polygon Mumbai: [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology)

    - Untuk Polygon Mainnet: [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology)

### Tips untuk Sync {#tips-for-faster-sync}

- Gunakan komputer dengan IOPS dan RAM tinggi untuk sinkronisasi awal yang lebih cepat
- Gunakan perintah di bawah untuk meningkatkan kecepatan unduh/unggah snapshot:

```makefile
--torrent.upload.rate="512mb" --torrent.download.rate="512mb"
```

Ganti `512` dengan lebar pita berapa pun yang dapat dikelola komputer Anda.
