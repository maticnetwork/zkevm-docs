---
id: run-validator-binaries
title: Jalankan Validator Node dari Biner
sidebar_label: Using Binaries
description: Gunakan binari untuk mengatur node validator
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
Langkah dalam panduan ini melibatkan menunggu layanan H**eimdall **dan B**or **untuk menyelaraskan sepenuhnya. Atau, Anda dapat menggunakan snapshot terpelihara yang akan mengurangi waktu sinkronisasi menjadi beberapa jam.
Untuk instruksi mendetail, lihat [<ins>Instruksi Snapshot untuk Heimdall dan Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Untuk snapshot download link , lihat [<ins>Polygon Chains Snapshot</ins>](https://snapshot.polygon.technology/).

:::

Panduan ini akan memandu Anda menjalankan node validasi Polygon dari biner.

Untuk persyaratan sistem, ikuti [Sistem Persyaratan Pemanduan Sistem Validator Node](validator-node-system-requirements.md)

Jika Anda ingin memulai dan menjalankan node validator melalui Ansible, lihat [Run a Validator Node dengan Ansible](run-validator-ansible.md).

:::caution

Terdapat ruang terbatas untuk menerima validator baru. validator baru hanya dapat bergabung dengan set aktif ketika validator yang sudah aktif mengunci.

:::

## Prasyarat {#prerequisites}

* Dua mesin — satu [sentry](/docs/maintain/glossary.md#sentry) dan satu [validator](/docs/maintain/glossary.md#validator).
* `build-essential` diinstal di mesin sentry dan validasi.

  Untuk menginstal:

  ```sh
  sudo apt-get install build-essential
  ```

* Go 1.18 diinstal pada mesin sentry dan validator.

 Untuk instal:

  ```sh
  wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
  bash go-install.sh
  sudo ln -nfs ~/.go/bin/go /usr/bin/go
  ```

* RabbitMQ dipasang pada mesin penjaga dan validator.

Berikut ini perintah untuk menginstal RabbitMQ:

  ```sh
  sudo apt-get update
  sudo apt install build-essential
  sudo apt install erlang
  wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.8/rabbitmq-server_3.10.8-1_all.deb
  sudo dpkg -i rabbitmq-server_3.10.8-1_all.deb

  ```
:::tip

Periksa informasi lebih lanjut tentang unduhan dan memasang RabbitMQ [<ins>di sini.</ins>](https://www.rabbitmq.com/download.html)

:::


:::info
Ikuti langkah pada [<ins>instruksi bloXroute</ins>](/maintain/validate/bloxroute.md) untuk menghubungkan node Anda ke bloXroute gateways.
:::

## Ikhtisar {#overview}

Untuk membuat node validasi berjalan, lakukan hal berikut dalam **urutan langkah yang tepat**:

:::caution

Anda akan mengalami isu konfigurasi jika langkah-langkah ini dilakukan di luar urutan.
Penting untuk diingat bahwa node sentry harus selalu diatur sebelum node validator.

:::

1. Siapkan dua mesin, satu untuk node sentry dan satu untuk node validator.
2. Instal biner Heimdall dan Bor di mesin sentry dan validator.
3. Atur file layanan Heimdall dan Bor di mesin sentry dan validator.
4. Atur layanan Heimdall dan Bor di mesin sentry dan validator.
5. Konfigurasikan node sentry.
6. Mulai node sentry.
7. Konfigurasikan node validator.
8. Atur kunci pemilik dan penanda tangan.
9. Mulai node validator.
10. Periksa kesehatan node dengan komunitas.

## Menginstal Biner {#installing-the-binaries}

Instal biner untuk mesin sentry dan validator.

### Menginstal Heimdall {#installing-heimdall}

[Heimdall](/docs/pos/heimdall/overview) adalah lapisan pemverifikasi proof-of-stake
bertanggung jawab untuk melakukan pemeriksaan titik representasi blok Plasma ke Ethereum mainnet.

Versi terbaru, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), berisi beberapa perbaikan seperti:
1. Membatasi ukuran data dalam transaksi sinkronisasi kondisi menjadi sebesar:
    * **30 Kb** ketika direpresentasikan dalam **byte**
    * **60 Kb** ketika direpresentasikan sebagai **string**.
2. Meningkatkan **waktu tunda** antara peristiwa kontrak dari validator yang berbeda untuk memastikan bahwa mempool tidak terisi dengan sangat cepat jika terjadi ledakan peristiwa yang dapat menghambat kemajuan rantai.

Contoh berikut menunjukkan bagaimana ukuran data dibatasi:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

Lakukan kloning [repositori Heimdell](https://github.com/maticnetwork/heimdall/):

```sh
git clone https://github.com/maticnetwork/heimdall
```

Beralihlah ke [versi rilis](https://github.com/maticnetwork/heimdall/releases) yang benar:

```sh
git checkout RELEASE_TAG
```

di mana `RELEASE_TAG` adalah tag dari versi rilis yang Anda instal.

Misalnya:

```sh
git checkout v0.3.0
```

Setelah Anda berada di rilis yang benar, instal Heimdall:

```sh
make install
source ~/.profile
```

Periksa instalasi Heimdall:

```sh
heimdalld version --long
```

:::note

Sebelum melanjutkan, Heimdall harus diinstal di mesin sentry dan validator.

:::

### Menginstal Bor {#installing-bor}

[Bor](/docs/pos/bor) adalah operator sidechain yang bertindak sebagai lapisan produksi blok, yang sinkronisasi dengan Heimdall untuk memilih produser blok dan verifier untuk setiap [rentang](/docs/maintain/glossary.md#span) dan [sprint](/docs/maintain/glossary.md#sprint).

Lakukan kloning [repositori Bor](https://github.com/maticnetwork/bor):

```sh
git clone https://github.com/maticnetwork/bor
```

Beralihlah ke [versi rilis](https://github.com/maticnetwork/bor/releases) yang benar:

```sh
git checkout RELEASE_TAG
```

di mana `RELEASE_TAG` adalah tag dari versi rilis yang Anda instal.

Misalnya:

```sh
git checkout v0.3.3
```

Instal Bor:

```sh
make bor-all
```

Buat symlinks:

```sh
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

Periksa instalasi Bor :

```sh
bor version
```

:::note

Sebelum melanjutkan, bor harus diinstal di mesin sentry dan validator.

:::

## Mengatur File Node {#setting-up-node-files}

:::note

File node harus diatur di mesin sentry dan validator.

:::

### Mengambil repositori peluncuran {#fetching-the-launch-repository}

Lakukan kloning [repositori peluncuran](https://github.com/maticnetwork/launch):

```sh
git clone https://github.com/maticnetwork/launch
```

### Mengatur direktori peluncuran {#setting-up-the-launch-directory}

#### Pada mesin sentry {#on-the-sentry-machine}

Buat direktori `node`:

```sh
mkdir -p node
```

Salin file dan skrip dari direktori `launch` ke direktori `node`:

```sh
cp -rf launch/mainnet-v1/sentry/sentry ~/node
cp launch/mainnet-v1/service.sh ~/node
```

#### Pada mesin validator {#on-the-validator-machine}

Buat direktori `node`:

```sh
mkdir -p node
```

Salin file dan skrip dari direktori `launch` ke direktori `node`:

```sh
cp -rf launch/mainnet-v1/sentry/validator ~/node
cp launch/mainnet-v1/service.sh ~/node
```

### Mengatur direktori jaringan {#setting-up-the-network-directories}

:::note

Jalankan bagian ini di mesin sentry dan validator.

:::

#### Mengatur Heimdall {#setting-up-heimdall}

Perubahan terhadap direktori `node`:

```sh
cd ~/node/heimdall
```

Jalankan skrip pengaturan:

```sh
bash setup.sh
```

#### Mengatur Bor {#setting-up-bor}

Perubahan terhadap direktori `node`:

```sh
cd ~/node/bor
```

Jalankan skrip pengaturan:

```sh
bash setup.sh
```

## Mengatur Layanan {#setting-up-the-services}

:::note

Jalankan bagian ini di mesin sentry dan validator.

:::

Beralihlah ke direktori `node`:

```sh
cd ~/node
```

Jalankan skrip pengaturan:

```sh
bash service.sh
```

Salin file layanan ke direktori sistem:

```sh
sudo cp *.service /etc/systemd/system/
```

## Mengonfigurasi Node Sentry {#configuring-the-sentry-node}

Mulai dengan login ke mesin sentry jarak jauh.

### Mengonfigurasi layanan Heimdall {#configuring-the-heimdall-services}

Buka file konfigurasi Heimdall untuk pengeditan:

```sh
vi ~/.heimdalld/config/config.toml
```

Dalam `config.toml`, ubah parameter berikut:

* `moniker` — nama apa pun. Contoh: `moniker = "my-sentry-node"`.
* `seeds` — alamat node seed yang terdiri dari ID node, alamat IP, dan port.

  Gunakan nilai berikut:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — atur nilai ke `true` untuk mengaktifkan bursa peer. Contoh: `pex = true`.
* `private_peer_ids` — ID node Heimdall yang diatur pada mesin validator.

  Untuk mendapatkan ID node Heimdall di mesin validator:

  1. Login ke mesin validator.
  2. Jalankan:
     ```sh
     heimdalld tendermint show-node-id
     ```

  Contoh: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` — atur nilai ke `true` untuk mengaktifkan metrik Prometheus. Contoh: `prometheus = true`.
* `max_open_connections` — atur nilai ke `100`. Contoh: `max_open_connections = 100`.

Simpan perubahan di `config.toml`.

### Mengonfigurasi Layanan Bor {#configuring-the-bor-service}

Buka file konfigurasi Bor untuk penyuntingan:

```sh
`vi ~/node/bor/start.sh`
```

`start.sh`Dalam menambahkan alamat node boot yang terdiri dari ID node, alamat IP, dan port dengan menambahkan baris berikut di akhir berkas:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

Simpan perubahan di `start.sh`.

### Mengonfigurasi firewall {#configuring-a-firewall}

Komputer sentry harus memiliki port berikut yang terbuka untuk dunia: `0.0.0.0/0`:

* `26656`- Layanan Heimdall Anda akan menghubungkan node Anda ke layanan node Heimdall lainnya.

* `30303`- Layanan Bor Anda akan menghubungkan node Anda ke layanan node Bor lainnya.

* `22`- Agar validator dapat melakukan ssh dari mana pun mereka berada.

## Memulai Node Sentry {#starting-the-sentry-node}

Pertama-tama, Anda akan memulai layanan Heimdall. Setelah layanan Heimdall sinkron, Anda akan memulai layanan Bor.

:::note

Seperti yang disebutkan sebelumnya, layanan Heimdall memerlukan beberapa hari untuk melakukan sinkronisasi penuh dari nol.

Atau, Anda dapat menggunakan snapshot terpelihara yang akan mengurangi waktu sinkronisasi menjadi beberapa jam.
Untuk instruksi mendetail, lihat [<ins>Instruksi Snapshot untuk Heimdall dan Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Untuk tautan unduhan snapshot, lihat [Snapshot Rantai Polygon](https://snapshot.polygon.technology/).

:::

### Memulai layanan Heimdall {#starting-the-heimdall-service}

Mulai layanan Heimdall:

```sh
sudo service heimdalld start
```

Mulai rest-server Heimdall:

```sh
sudo service heimdalld-rest-server start
```

Periksa log layanan Heimdall:

```sh
journalctl -u heimdalld.service -f
```

:::note

Dalam log, Anda dapat melihat error berikut:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

Log ini berarti bahwa salah satu node di jaringan menolak koneksi ke node Anda.
Tunggu node Anda untuk melakukan crawl terhadap node lebih banyak di jaringan tersebut; Anda tidak perlu melakukan apa pun
untuk mengatasi error ini.

:::

Periksa log rest-server Heimdall:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Periksa status sinkronisasi Heimdall:

```sh
curl localhost:26657/status
```

Dalam keluaran, nilai `catching_up` adalah:

* `true` — layanan Heimdall sedang melakukan sinkronisasi.
* `false` — layanan Heimdall sepenuhnya sinkron.

Tunggu layanan Heimdall untuk sinkron sepenuhnya.

### Memulai layanan Bor {#starting-the-bor-service}

Setelah layanan Heimdall sinkron, mulailah layanan Bor.

Mulai layanan Bor:

```sh
sudo service bor start
```

Periksa log layanan Bor:

```sh
journalctl -u bor.service -f
```

## Mengonfigurasi Node Validator {#configuring-the-validator-node}

:::note

Untuk menyelesaikan bagian ini, Anda harus memiliki titik akhir RPC dari Ethereum mainnet Anda yang sepenuhnya sinkron
node siap.

:::

### Mengonfigurasi layanan Heimdall {#configuring-the-heimdall-service}

Login ke mesin validator jarak jauh.

Buka untuk mengedit `vi ~/.heimdalld/config/config.toml`.

Di `config.toml`, ubah informasi berikut:

* `moniker` — nama apa pun. Contoh: `moniker = "my-validator-node"`.
* `pex` — atur nilai ke `false` untuk menonaktifkan bursa peer. Contoh: `pex = false`.
* `private_peer_ids` — melakukan comment out terhadap nilai untuk menonaktifkannya. Contoh: `# private_peer_ids = ""`.

  Untuk mendapatkan ID node Heimdall di mesin sentry:

  1. Login ke mesin sentry.
  1. Jalankan `heimdalld tendermint show-node-id`.

Contoh: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — atur nilai ke `true` untuk mengaktifkan metrik Prometheus. Contoh: `prometheus = true`.

Simpan perubahan di `config.toml`.

Buka untuk mengedit `vi ~/.heimdalld/config/heimdall-config.toml`.

Di `heimdall-config.toml`, ubah informasi berikut:

* `eth_rpc_url` — titik akhir RPC untuk node Ethereum mainnet yang sepenuhnya sinkron,
yaitu Infura. `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Contoh: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`

Simpan perubahan di `heimdall-config.toml`.

### Mengonfigurasi layanan Bor {#configuring-the-bor-service-1}

Buka untuk mengedit `vi ~/.bor/data/bor/static-nodes.json`.

Di `static-nodes.json`, ubah informasi berikut:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — ID node dan
Alamat IP Bor diatur di mesin sentry.

  Untuk mendapatkan ID node Bor di mesin sentry:

  1. Login ke mesin sentry.
  2. Jalankan `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

  Contoh: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

Simpan perubahan di `static-nodes.json`.

## Mengatur Kunci Pemilik dan Penanda Tangan {#setting-the-owner-and-signer-key}

Di Polygon, Anda disarankan untuk memiliki kunci pemilik dan penanda tangan yang berbeda.

* Penanda tangan (Signer) — alamat yang menandatangani
[transaksi titik periksa](/docs/maintain/glossary.md#checkpoint-transaction). Rekomendasinya adalah
untuk memiliki setidaknya 1 ETH di alamat penanda tangan.
* Pemilik — alamat yang melakukan transaksi staking. Rekomendasinya adalah untuk menjaga token
MATIC di alamat pemilik.

### Membuat kunci pribadi Heimdall {#generating-a-heimdall-private-key}

Anda harus membuat kunci pribadi Heimdall hanya di mesin validator. Jangan membuat kunci pribadi
Heimdall di mesin sentry.

Untuk membuat kunci pribadi, jalankan:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

di mana

* ETHEREUM_PRIVATE_KEY — kunci pribadi dompet Ethereum Anda.

Ini akan menghasilkan `priv_validator_key.json`. Memindahkan file JSON yang dibuat ke konfigurasi Heimdall
direktori:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Membuat file keystore Bor {#generating-a-bor-keystore-file}

Anda harus membuat file keystore Bor hanya di mesin validator. Jangan membuat file keystore Bor
di mesin sentry.

Untuk membuat kunci pribadi, jalankan:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

di mana

* ETHEREUM_PRIVATE_KEY — kunci pribadi dompet Ethereum Anda.

Saat diminta, atur kata sandi ke file keystore.

Ini akan menghasilkan file keystore `UTC-<time>-<address>`.

Pindahkan file keystore yang dibuat ke direktori konfigurasi Bor:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### Tambahkan password.txt {#add-password-txt}

Pastikan untuk membuat file `password.txt` lalu tambah kata sandi file Bor keystore tepat di
`~/.bor/password.txt` file.

### Tambahkan alamat Ethereum Anda {#add-your-ethereum-address}

Buka untuk mengedit `vi /etc/matic/metadata`.

Di `metadata`, tambahkan alamat Ethereum Anda. Contoh: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

Simpan perubahan di `metadata`.

## Memulai Node Validator {#starting-the-validator-node}

Pada titik ini, Anda harus memiliki:

* Layanan Heimdall di mesin sentry yang sinkron dan berjalan.
* Layanan Bor di mesin sentry sedang berjalan.
* Layanan Heimdall dan layanan Bor di mesin validator yang sudah dikonfigurasi.
* Kunci pemilik dan penanda tangan Anda sudah dikonfigurasi.

### Memulai layanan Heimdall {#starting-the-heimdall-service-1}

Anda sekarang akan memulai layanan Heimdall di mesin validator. Setelah layanan Heimdall sinkron, Anda
akan memulai layanan Bor di mesin validator.

Mulai layanan Heimdall:

```sh
sudo service heimdalld start
```

Mulai rest-server Heimdall:

```sh
sudo service heimdalld-rest-server start
```

Mulai jembatan Heimdall:

```sh
sudo service heimdalld-bridge start
```

Periksa log layanan Heimdall:

```sh
journalctl -u heimdalld.service -f
```

Periksa log rest-server Heimdall:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Periksa log jembatan Heimdall:

```sh
journalctl -u heimdalld-bridge.service -f
```

Periksa status sinkronisasi Heimdall:

```sh
curl localhost:26657/status
```

Dalam keluaran, nilai `catching_up` adalah:

* `true` — layanan Heimdall sedang melakukan sinkronisasi.
* `false` — layanan Heimdall telah sinkron.

Tunggu layanan Heimdall untuk sepenuhnya sinkron.

### Memulai layanan Bor {#starting-the-bor-service-1}

Setelah layanan Heimdall di mesin validator sinkron, mulailah layanan Bor di
mesin validator.

Mulai layanan Bor:

```sh
sudo service bor start
```

Periksa log layanan Bor:

```sh
journalctl -u bor.service -f
```

## Pemeriksaan Kesehatan dengan Komunitas {#health-checks-with-the-community}

Sekarang setelah node sentry dan validator Anda sinkron dan berjalan, beralihlah ke
[Discord](https://discord.com/invite/0xPolygon) dan minta komunitas untuk memeriksa kesehatan node Anda.

:::note

Sebagai validator, wajib untuk selalu memiliki cek alamat penandatangan. Jika keseimbangan ETH mencapai di bawah 0,5 ETH maka harus diisi. Menghindari ini akan mendorong node dari transaksi titik pengiriman.

:::

## Langkah Selanjutnya: Staking {#next-steps-staking}

Sekarang setelah node sentry dan validator Anda diperiksa kesehatannya, lanjutkan ke
panduan [Staking](/docs/maintain/validator/core-components/staking.md) untuk mulai mendukung jaringan.
