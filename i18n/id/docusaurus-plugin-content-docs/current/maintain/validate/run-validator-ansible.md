---
id: run-validator-ansible
title: Jalankan Validator Node dengan Ansible
sidebar_label: Using Ansible
description: Gunakan Ansible untuk mengatur node validator di Polygon
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

Langkah-langkah dalam panduan ini melibatkan menunggu layanan **Heimdall** dan **Bor** sepenuhnya sinkron.
Proses ini memerlukan beberapa hari untuk selesai. Atau, Anda dapat menggunakan snapshot terpelihara yang akan mengurangi waktu sinkronisasi menjadi beberapa jam. Untuk instruksi mendetail, lihat [<ins>Instruksi Snapshot untuk Heimdall dan Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor).

Untuk snapshot download link , lihat [<ins>Polygon Chains Snapshot</ins>](https://snapshot.polygon.technology/).
:::

Bagian ini memandu Anda untuk memulai dan menjalankan node validator melalui playbook Ansible.

Untuk persyaratan sistem, lihat [Persyaratan Sistem Node Validator](validator-node-system-requirements.md).

Jika Anda ingin memulai dan menjalankan node validator dari biner, lihat [Menjalankan Node Validator dari Biner](run-validator-binaries.md).

:::caution

Terdapat ruang terbatas untuk menerima validator baru. validator baru hanya dapat bergabung dengan set aktif ketika validator yang sudah aktif mengunci.

:::

## Prasyarat {#prerequisites}

* Tiga mesin — satu mesin lokal di mana Anda akan menjalankan playbook Ansible; dua mesin jarak jauh — satu [sentry](/docs/maintain/glossary.md#sentry) dan satu [validator](/docs/maintain/glossary.md#validator).
* Di mesin lokal, [Ansible](https://www.ansible.com/) terinstal.
* Di mesin lokal, [Python 3.x](https://www.python.org/downloads/) terinstal.
* Di mesin jarak jauh, pastikan Go *tidak* terinstal.
* Di mesin jarak jauh, kunci publik SSH mesin lokal Anda ada di mesin jarak jauh untuk memungkinkan Ansible terhubung dengannya.
* Kami memiliki Bloxroute yang tersedia sebagai jaringan relai. Jika Anda membutuhkan pintu gerbang untuk ditambahkan sebagai Peer Terpercaya Anda silakan hubungi **@validator-support-team** di [Polygon Discord](https://discord.com/invite/0xPolygon) > POS VALIDATORS | PENUH PROVIDERS > PARTNERS > bloxroute.

:::info

Ikuti langkah pada [<ins>instruksi bloXroute</ins>](/maintain/validate/bloxroute.md) untuk menghubungkan node Anda ke bloXroute gateways.

:::

## Ikhtisar {#overview}

:::caution

Anda harus mengikuti **urutan tindakan yang diuraikan secara tepat**, jika tidak, Anda akan berjalan ke dalam masalah. Misalnya, **node yang berisi harus selalu diatur sebelum node validator**.

:::

Untuk membuat node validator berjalan, lakukan hal berikut:

1. Siapkan ketiga mesin tersebut.
1. Atur node sentry melalui Ansible.
1. Atur node validator melalui Ansible.
1. Konfigurasikan node sentry.
1. Mulai node sentry.
1. Konfigurasikan node validator.
1. Atur kunci pemilik dan penanda tangan.
1. Mulai node validator.
1. Periksa kesehatan node dengan komunitas.

## Atur node sentry {#set-up-the-sentry-node}

Di mesin lokal Anda, lakukan kloning [repositori node-ansible](https://github.com/maticnetwork/node-ansible):

```sh
git clone https://github.com/maticnetwork/node-ansible
```

Ubah repositori yang dikloning:

```sh
cd node-ansible
```

Tambahkan alamat IP dari mesin jarak jauh yang akan menjadi node sentry dan node validator ke file `inventory.yml`.

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

Contoh:

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

Periksa apakah mesin sentry jarak jauh dapat dijangkau. Di mesin lokal, jalankan:

```sh
$ ansible sentry -m ping
```

Anda akan mendapatkan keluaran ini:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Lakukan uji coba pengaturan node sentry:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --list-hosts
```

Keluarannya adalah:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Jalankan pengaturan node sentry dengan privilese sudo:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --ask-become-pass
```

Setelah pengaturan selesai, Anda akan melihat pesan penyelesaian di terminal.

:::note

Jika Anda mengalami masalah dan ingin memulai dari awal, jalankan:

```sh
ansible-playbook -l sentry playbooks/clean.yml
```

:::

## Atur node validator {#set-up-the-validator-node}

Pada titik ini, Anda telah mengatur node sentry.

Di mesin lokal Anda, Anda juga memiliki playbook Ansible yang sudah diatur untuk menjalankan pengaturan node validator.

Periksa apakah mesin validator jarak jauh dapat dijangkau. Pada mesin lokal, `ansible validator -m ping`jalan.

Anda akan mendapatkan keluaran ini:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Lakukan uji coba pengaturan node validator:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0 network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --list-hosts
```

Anda akan mendapatkan keluaran ini:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Jalankan pengaturan node validator dengan privilese sudo:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --ask-become-pass
```

Setelah pengaturan selesai, Anda akan melihat pesan penyelesaian di terminal.

:::note

Jika Anda mengalami masalah dan ingin memulai dari awal, jalankan:

```sh
ansible-playbook -l validator playbooks/clean.yml
```

:::

## Konfigurasikan node sentry {#configure-the-sentry-node}

Login ke mesin sentry jarak jauh.

### Konfigurasikan Layanan Heimdall {#configure-the-heimdall-service}

Buka `config.toml` untuk mengedit `vi ~/.heimdalld/config/config.toml`.

Ubah informasi berikut:

* `moniker` — nama apa pun. Contoh: `moniker = "my-full-node"`.
* `seeds` — alamat node seed yang terdiri dari ID node, alamat IP, dan port.

  Gunakan nilai berikut:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — atur nilai ke `true` untuk mengaktifkan bursa peer. Contoh: `pex = true`.
* `private_peer_ids` — ID node Heimdall yang diatur pada mesin validator.

  Untuk mendapatkan ID node Heimdall di mesin validator:

  1. Login ke mesin validator.
  1. Jalankan `heimdalld tendermint show-node-id`.

  Contoh: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` — atur nilai ke `true` untuk mengaktifkan metrik Prometheus. Contoh: `prometheus = true`.
* `max_open_connections` — atur nilai ke `100`. Contoh: `max_open_connections = 100`.

Simpan perubahan di `config.toml`.

### Konfigurasikan Layanan Bor {#configure-the-bor-service}

Buka untuk mengedit `vi ~/node/bor/start.sh`.

Di `start.sh`, tambah alamat node boot yang terdiri dari ID node, alamat IP, dan port dengan menambahkan baris berikut di akhir file:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

Simpan perubahan di `start.sh`.

Buka untuk mengedit `vi ~/.bor/data/bor/static-nodes.json`.

Di `static-nodes.json`, ubah info berikut:

* `"<replace with enode://validator_machine_enodeID@validator_machine_ip:30303>"` — ID node dan alamat IP Bor yang diatur pada mesin validator.

  Untuk mendapatkan ID node Bor di mesin validator:

  1. Login ke mesin validator.
  1. Jalankan `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

  Contoh: `"enode://410e359736bcd3a58181cf55d54d4e0bbd6db2939c5f548426be7d18b8fd755a0ceb730fe5cf7510c6fa6f0870e388277c5f4c717af66d53c440feedffb29b4b@134.209.100.175:30303"`.

Simpan perubahan di `static-nodes.json`.

### Konfigurasikan firewall {#configure-firewall}

Mesin sentry harus memiliki port berikut yang terbuka untuk dunia `0.0.0.0/0`:

* 26656- Layanan Heimdall Anda akan menghubungkan node Anda ke node lain menggunakan layanan Heimdall.

* 30303- Layanan Bor Anda akan menghubungkan node Anda ke node lain menggunakan layanan Bor.

* 22- Agar validator dapat melakukan ssh dari mana pun dia berada.

:::note

Namun, jika mereka menggunakan koneksi VPN, mereka dapat mengizinkan koneksi ssh masuk hanya dari alamat IP VPN.

:::

## Memulai node sentry {#start-the-sentry-node}

Pertama-tama Anda akan memulai layanan Heimdall. Setelah layanan Heimdall sinkron, Anda akan memulai layanan Bor.

:::note

Layanan Heimdall membutuhkan waktu beberapa hari untuk melakukan sinkronisasi penuh dari nol.

Atau, Anda dapat menggunakan snapshot terpelihara yang akan mengurangi waktu sinkronisasi menjadi beberapa jam. Untuk instruksi mendetail, lihat [<ins>Instruksi Snapshot untuk Heimdall dan Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Untuk tautan unduhan snapshot, lihat [Snapshot Rantai Polygon](https://snapshot.polygon.technology/).

:::

### Memulai Layanan Heimdall {#start-the-heimdall-service}

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

Dalam log, Anda mungkin melihat error berikut:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

Ini berarti bahwa salah satu node di jaringan menolak koneksi ke node Anda. Anda tidak perlu melakukan apa pun terkait error ini. Tunggu node Anda melakukan crawl lebih banyak node di jaringan.

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

### Memulai Layanan Bor {#start-the-bor-service}

Setelah layanan Heimdall sepenuhnya sinkron, mulailah layanan Bor.

Mulai layanan Bor:

```sh
sudo service bor start
```

Periksa log layanan Bor:

```sh
journalctl -u bor.service -f
```

## Konfigurasikan node validator {#configure-the-validator-node}

:::note

Untuk menyelesaikan bagian ini, Anda harus memiliki titik akhir RPC dari node Ethereum mainnet yang sinkron sepenuhnya dan dalam kondisi siap.

:::

### Konfigurasikan Layanan Heimdall {#configure-the-heimdall-service-1}

Login ke mesin validator jarak jauh.

Buka `config.toml` untuk mengedit `vi ~/.heimdalld/config/config.toml`.

Ubah informasi berikut:

* `moniker` — nama apa pun. Contoh: `moniker = "my-validator-node"`.
* `pex` — atur nilai ke `false` untuk menonaktifkan bursa peer. Contoh: `pex = false`.
* `private_peer_ids` — melakukan comment out terhadap nilai untuk menonaktifkannya. Contoh: `# private_peer_ids = ""`.


  Untuk mendapatkan ID node dari Heimdall di mesin sentry:

  1. Login ke mesin sentry.
  1. Jalankan `heimdalld tendermint show-node-id`.

  Contoh: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — atur nilai ke `true` untuk mengaktifkan metrik Prometheus. Contoh: `prometheus = true`.

Simpan perubahan di `config.toml`.

Buka untuk mengedit `vi ~/.heimdalld/config/heimdall-config.toml`.

Di `heimdall-config.toml`, ubah info berikut:

* `eth_rpc_url` — titik akhir RPC untuk node Ethereum mainnet yang sinkron sepenuhnya, yaitu Infura. `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Contoh: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`


Simpan perubahan di `heimdall-config.toml`.

### Konfigurasikan Layanan Bor {#configure-the-bor-service-1}

Buka untuk mengedit `vi ~/.bor/data/bor/static-nodes.json`.

Di `static-nodes.json`, ubah info berikut:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — ID node dan alamat IP Bor diatur di mesin sentry.

  Untuk mendapatkan ID node Bor di mesin sentry:

  1. Login ke mesin sentry.
  1. Jalankan `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

  Contoh: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

Simpan perubahan di `static-nodes.json`.

## Atur kunci pemilik dan penanda tangan {#set-the-owner-and-signer-key}

Di Polygon, kunci pemilik dan penanda tangan harus berbeda.

* Penanda tangan (Signer) — alamat yang menandatangani [transaksi titik periksa](../glossary#checkpoint-transaction). Sebaiknya simpan setidaknya 1 ETH di alamat penanda tangan.
* Pemilik (Owner) — alamat yang melakukan transaksi staking. Sebaiknya simpan token MATIC di alamat pemilik.

### Membuat kunci pribadi Heimdall {#generate-a-heimdall-private-key}

Anda harus membuat kunci pribadi Heimdall hanya di mesin validator. **Jangan membuat kunci pribadi Heimdall di mesin sentry.**

Untuk membuat kunci pribadi, jalankan:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY — Kunci privat dompet Ethereum

:::

Ini akan menghasilkan `priv_validator_key.json`. Pindahkan file JSON yang dihasilkan ke direktori konfigurasi Heimdall:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Membuat file keystore Bor {#generate-a-bor-keystore-file}

Anda harus membuat file keystore Bor hanya di mesin validator. **Jangan membuat file keystore Bor di mesin sentry.**

Untuk membuat kunci pribadi, jalankan:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY — kunci pribadi dompet Ethereum Anda.

:::

Saat diminta, atur kata sandi ke file keystore.

Ini akan menghasilkan file keystore `UTC-<time>-<address>`.

Pindahkan file keystore yang dibuat ke direktori konfigurasi Bor:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### Tambah`password.txt`

Pastikan untuk membuat file `password.txt` dan menambahkan kata sandi file keystore Bor di file `~/.bor/password.txt`.

### Tambahkan alamat Ethereum Anda {#add-your-ethereum-address}

Buka untuk mengedit `vi /etc/matic/metadata`.

Di `metadata`, tambahkan alamat Ethereum Anda. Contoh: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

Simpan perubahan di `metadata`.

## Memulai node validator {#start-the-validator-node}

Pada titik ini, Anda harus memiliki:

* Layanan Heimdall pada mesin sentry telah sepenuhnya sinkron dan berjalan.
* Layanan Bor di mesin sentry berjalan.
* Layanan Heimdall dan layanan Bor di mesin validator yang sudah dikonfigurasi.
* Kunci pemilik dan penanda tangan Anda telah dikonfigurasi.

### Memulai Layanan Heimdall {#start-the-heimdall-service-1}

Anda sekarang akan memulai layanan Heimdall di mesin validator. Setelah layanan Heimdall sinkron, Anda akan memulai layanan Bor di mesin validator.

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
* `false` — layanan Heimdall sepenuhnya sinkron.

Tunggu layanan Heimdall untuk sinkron sepenuhnya.

### Memulai Layanan Bor {#start-the-bor-service-1}

Setelah layanan Heimdall di mesin validator telah sinkron sepenuhnya, mulailah layanan Bor di mesin validator.

Mulai layanan Bor:

```sh
sudo service bor start
```

Periksa log layanan Bor:

```sh
journalctl -u bor.service -f
```

## Periksa kesehatan node dengan komunitas {#check-node-health-with-the-community}

Karena sekarang node sentry dan node validator Anda telah sinkron dan berjalan, buka [Discord](https://discord.com/invite/0xPolygon) dan minta komunitas untuk memeriksa kesehatan node Anda.

:::note

Sebagai validator, wajib untuk selalu memiliki cek alamat penandatangan. Jika keseimbangan ETH mencapai di bawah 0,5 ETH maka harus diisi. Menghindari ini akan mendorong node dari transaksi titik pengiriman.

:::

## Lanjutkan ke staking {#proceed-to-staking}

Karena Anda telah memeriksa kesehatan node sentry dan node validator, lanjutkan ke [Staking](/docs/maintain/validator/core-components/staking).
