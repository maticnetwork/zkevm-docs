---
id: full-node-binaries
title: Menjalankan node penuh dengan Biner
description: Menyebarkan Node Polygon Penuh menggunakan biner
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

Tutorial ini membimbing Anda melalui awal dan menjalankan node penuh menggunakan binari. Untuk persyaratan sistem, lihat Pemutaran [Persyaratan Teknis](technical-requirements.md) Minimum.

:::tip

Langkah-langkah dalam panduan ini termasuk menunggu layanan Heimdall dan Bor sepenuhnya disinkronkan. Proses ini membutuhkan beberapa hari untuk selesai.

Atau, Anda dapat menggunakan snapshot terpelihara yang akan mengurangi waktu sinkronisasi menjadi beberapa jam. For detail petunjuk, lihat [<ins>Petunjuk snapshot untuk Heimdall dan Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor).

Untuk snapshot download link , lihat halaman [<ins>Snapshot Polygon Chains Chains.</ins>](https://snapshots.polygon.technology/)

:::

## Gambaran umum {#overview}

- Mempersiapkan mesin
- Instal binari Heimdall dan Bor pada mesin node penuh
- Atur layanan Heimdall dan Bor pada mesin node penuh
- Mengkonfigurasi mesin node
- Mulai mesin node penuh
- Periksa kesehatan node dengan komunitas

:::note

Anda harus mengikuti urutan tindakan yang diuraikan secara tepat, jika tidak, Anda akan berjalan ke dalam masalah.

:::

### Instal`build-essential`

Ini **diperlukan** untuk node penuh. Untuk memasang, jalankan perintah berikut:

```bash
sudo apt-get update
sudo apt-get install build-essential
```

### Instal GO {#install-go}

Ini juga **diperlukan** untuk menjalankan node penuh. **Memasang v1.18 atau di atas** dianjurkan

```bash
wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
bash go-install.sh
sudo ln -nfs ~/.go/bin/go /usr/bin/go
```

## Menginstal Biner {#install-binaries}

node Polygon terdiri dari 2 layer: Heimdall dan Bor. Heimdall adalah fork tendermint yang memonitor kontrak paralel dengan jaringan Ethereum. Bor pada dasarnya adalah fork Get yang menghasilkan blok yang dikecilkan oleh node Heimdall.

Kedua biner harus dipasang dan dijalankan dalam urutan yang benar untuk berfungsi dengan benar.

### Heimdall {#heimdall}

Pasang versi terbaru dari Heimdall dan layanan terkait. Pastikan Anda memeriksa ke [versi rilis](https://github.com/maticnetwork/heimdall/releases) yang benar. Perhatikan bahwa versi terbaru, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), berisi peningkatan seperti:
1. Membatasi ukuran data dalam transaksi sinkronisasi kondisi menjadi sebesar:
    * **30 Kb** ketika direpresentasikan dalam **byte**
    * **60Kb** ketika diwakilkan sebagai **string**
2. Meningkatkan **waktu tunda** antara peristiwa kontrak dari validator yang berbeda untuk memastikan mempool tidak terisi dengan sangat cepat jika terjadi ledakan peristiwa yang dapat menghambat kemajuan rantai.

Contoh berikut menunjukkan bagaimana ukuran data dibatasi:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

Untuk memasang **Heimdall**, jalankan perintah di bawah

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

Itu akan menginstal biner `heimdalld` dan `heimdallcli`. Verifikasi instalasi dengan memeriksa versi Heimdall pada mesin Anda:

```bash
heimdalld version --long
```

### Bor {#bor}

Pasang versi terbaru dari Bor. Pastikan Anda melakukan checkout ke [versi yang dirilis](https://github.com/maticnetwork/bor/releases) yang benar.

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

Itu akan menginstal biner `bor` dan `bootnode`. Verifikasi instalasi dengan memeriksa versi Bor pada mesin Anda:

```bash
bor version
```

## Mengonfigurasi File Node {#configure-node-files}

### Ambil repo peluncuran {#fetch-launch-repo}

```bash
cd ~/
git clone https://github.com/maticnetwork/launch
```

### Mengonfigurasi direktori peluncuran {#configure-launch-directory}

Untuk menyiapkan direktori jaringan, dibutuhkan nama jaringan dan jenis node.

**Jaringan yang tersedia**`mainnet-v1`:`testnet-v4`

**Jenis node**`sentry`

:::tip

Untuk konfigurasi Mainnet dan Testnet , gunakan yang `<network-name>`tepat. `mainnet-v1`Gunakan untuk mainnet Polygon dan `testnet-v4`untuk Mumbai Testnet.
:::

```bash
cd ~/
mkdir -p node
cp -rf launch/<network-name>/sentry/<node-type>/* ~/node
```

### Mengonfigurasi direktori jaringan {#configure-network-directories}

**Pengaturan data Heimdall**

```bash
cd ~/node/heimdall
bash setup.sh
```

**Pengaturan data Bor**

```bash
cd ~/node/bor
bash setup.sh
```

## Mengonfigurasi File Layanan {#configure-service-files}

Download `service.sh`file menggunakan yang tepat.`<network-name>` `mainnet-v1`Gunakan untuk mainnet Polygon dan `testnet-v4`untuk Mumbai Testnet.

```bash
cd ~/node
wget https://raw.githubusercontent.com/maticnetwork/launch/master/<network-name>/service.sh
```

Buat file **metadata**:

```bash
sudo mkdir -p /etc/matic
sudo chmod -R 777 /etc/matic/
touch /etc/matic/metadata
```

Buat `.service`file dan salinannya ke direktori sistem:

```bash
cd ~/node
bash service.sh
sudo cp *.service /etc/systemd/system/
```


## Menampilkan File Config {#setup-config-files}

- Masuk ke komputer jarak jauh/VM
- Anda harus menambahkan beberapa perincian di file `config.toml`. Untuk membuka dan menyunting `config.toml`file, jalankan perintah berikut:`vi ~/.heimdalld/config/config.toml`

Dalam file config , Anda harus mengubah dan `Moniker`menambahkan `seeds`informasi:

    ```bash
    moniker=<enter unique identifier>
    # For example, moniker=my-sentry-node

    # Mainnet:
    seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656"

    # Testnet:
    seeds="4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656"
    ```

    - Ubah nilai **Pex** menjadi `true`
    - Ubah nilai **Prometheus** menjadi `true`
    - Atur nilai `max_open_connections` menjadi `100`

Pastikan Anda **menjaga format yang tepat ketika** Anda membuat perubahan di atas.

- Konfigurasikan berikut ini di `~/.heimdalld/config/heimdall-config.toml`:

    ```jsx
    eth_rpc_url=<insert Infura or any full node RPC URL to Goerli>
    ```

- Buka `start.sh`file untuk Bor menggunakan perintah ini:`vi ~/node/bor/start.sh` Menambahkan bendera berikut untuk memulai parameter:

  ```bash
  # Mainnet:
  --bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303"

  # Testnet:
  --bootnodes "enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303"
  ```

- Untuk mengaktifkan mode **Archive**, Anda dapat menambahkan bendera berikut dalam `start.sh`file:

  ```jsx
  --gcmode 'archive' \
  --ws --ws.port 8546 --ws.addr 0.0.0.0 --ws.origins '*' \
  ```

## Mulai layanan {#start-services}

Jalankan node Heimdall penuh dengan perintah ini pada Titik entri Anda:

```bash
sudo service heimdalld start
sudo service heimdalld-rest-server start
```

Sekarang, Anda perlu memastikan bahwa **Heimdall sepenuhnya disinkronkan** dan kemudian hanya memulai Bor. Jika memulai Bor tanpa menyinkronkan Heimdall sepenuhnya, Anda akan sering mengalami masalah.

**Untuk memeriksa apakah Heimdall disinkronkan**
  1. Pada mesin jarak jauh/VM, jalankan `curl localhost:26657/status`
  2. Dalam keluarannya, nilai `catching_up` harus `false`

Setelah Heimdall menjadi sinkron, jalankan perintah di bawah

```bash
sudo service bor start
```

## Log {#logs}

Log dapat dikelola oleh alat `journalctl`linux. Berikut ini adalah tutorial untuk penggunaan lanjut: [Cara Gunakan Journalctl untuk Tampilan dan Manipulate Systemd](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs).

**Periksa log node Heimdall**

```bash
journalctl -u heimdalld.service -f
```

**Periksa log Heimdall**

```bash
journalctl -u heimdalld-rest-server.service -f
```

**Periksa log Bor Rest-server**

```bash
journalctl -u bor.service -f
```

## Pengaturan port dan firewall {#ports-and-firewall-setup}

Buka port 22, 26656 dan 30303 untuk dunia (0.0.0.0/0) di firewall node sentry.

Anda dapat menggunakan VPN untuk membatasi akses port 22 sesuai persyaratan dan pedoman keamanan Anda.
