---
id: full-node-docker
title: Menjalankan node penuh dengan Docker
sidebar_label: Run a full node with Docker
description:  Panduan untuk menjalankan node penuh menggunakan Doker
keywords:
  - docs
  - matic
  - docker
  - full node
  - polygon
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Tim Polygon mendistribusikan citra Docker resmi yang dapat digunakan untuk menjalankan node di mainnet Polygon. Instruksi ini untuk menjalankan node penuh, tetapi juga dapat disesuaikan untuk menjalankan node sentry serta validator.

:::tip Snapshot

Anda akan menemukan bahwa sinkronisasi dari gulungan dapat memakan waktu yang sangat lama. Jika Anda ingin mempercepat proses up, Anda dapat mengikuti instruksi yang tercantum di sini: [<ins>Instruksi Snapshot untuk Heimdall dan Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor)

Ini akan menjadi instruksi yang paling mutakhir, tetapi kurang lebih Anda dapat melakukan sesuatu seperti di bawah ini:
```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# at this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```

`aria2c`Metode ini digunakan untuk mengunduh snapshot lebih cepat. Ada cara alternatif di mana snapshot yang diunduh dapat diekstraksi secara langsung tanpa intervensi.

**Langkah untuk itu:**

```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::

## Prasyarat {#prerequisites}

Konfigurasi umum untuk menjalankan node penuh Polygon adalah memiliki **setidaknya** 4 CPU/core dan RAM 16 GB. Untuk panduan ini, kita akan menggunakan AWS dan tipe instans `t3.2xlarge`. Aplikasi ini dapat berjalan di arsitektur x86 dan Arm.

Instruksi ini berbasis Docker, jadi, seharusnya mudah diikuti dengan sistem operasi mana pun, tetapi kami menggunakan Ubuntu.

Dalam hal spasi, untuk node penuh yang mungkin perlu dari **penyimpanan 2,5 hingga 5 terabyte dari SSD (atau lebih cepat)**.

Pertukaran peer untuk node penuh Polygon umumnya tergantung pada terbukanya port 30303 dan 26656. Ketika Anda mengatur firewall atau kelompok keamanan untuk AWS, pastikan pelabuhan ini terbuka bersama dengan pelabuhan apapun yang Anda butuhkan untuk mengakses mesin.

TLDR:

- Gunakan komputer yang setidaknya memiliki 4 core dan RAM 16 GB
- Pastikan Anda memiliki dari 2,5 TB ke 5 TB penyimpanan
- Gunakan IP publik dan buka port 30303 dan 26656

## Pengaturan Awal {#initial-setup}
Pada titik ini, Anda harus memiliki akses shell dengan hak istimewa root ke mesin linux.

![img](/img/full-node-docker/term-access.png)

### Pasang Docker {#install-docker}
Kemungkinan besar sistem operasi Anda tidak menginstal Docker secara default. Silakan ikuti instruksi untuk distribusi khusus Anda yang dapat ditemukan di sini: https://docs.docker.com/engine/install/

Kami mengikuti instruksi untuk Ubuntu. Langkah-langkahnya disertakan di bawah ini, tetapi silakan lihat instruksi resmi jika sudah diperbarui.

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

Pada titik ini, Anda harus menginstal Docker. Untuk memverifikasi, Anda harus dapat menjalankan perintah seperti ini:

```bash
sudo docker run hello-world
```

![img](/img/full-node-docker/hello-world.png)

Dalam banyak kasus, menjalankan docker sebagai pengguna `root` akan menyulitkan, maka kami ikuti langkah-langkah setelah instalasi [di sini](https://docs.docker.com/engine/install/linux-postinstall/) untuk berinteraksi dengan docker tanpa perlu menjadi `root`:

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

Sekarang Anda harus dapat keluar dan masuk kembali, lalu menjalankan perintah docker tanpa `sudo`.

### Pengaturan Disk {#disk-setup}
Langkah-langkah pasti yang diperlukan di sini akan sangat berbeda tergantung pada kebutuhan Anda. Kemungkinan besar, Anda akan memiliki partisi root yang menjalankan sistem operasi pada satu perangkat. Anda mungkin akan ingin satu atau beberapa perangkat untuk benar-benar menyimpan data blockchain. Selama sisa panduan ini, kita akan menginstal perangkat tambahan di `/mnt/data`.

Dalam contoh ini, kita memiliki perangkat dengan 4 TB ruang yang tersedia yang terletak di `/dev/nvme1n1`. Kita akan melakukan mount yang menggunakan langkah di bawah ini:

```bash
sudo mkdir /mnt/data
sudo mount /dev/nvme1n1 /mnt/data
```

Kita gunakan `df -h` untuk memastikan pemasangan berjalan dengan baik.

![img](/img/full-node-docker/space.png)

Jika semua terlihat baik, kita mungkin juga membuat direktori beranda di pemasangan Bor dan Heimdall.

```bash
sudo mkdir /mnt/data/bor
sudo mkdir /mnt/data/heimdall
```

Tergantung pada kasus penggunaan dan sistem operasi, Anda mungkin ingin membuat entri di `/etc/fstab` untuk memastikan perangkat Anda dipasang ketika reboot sistem.

Dalam kasus ini, kita mengikuti beberapa langkah seperti ini:

```bash
# Use blkid to get the UUID for the device that we're mounting
blkid

# Edit the fstab file  and add a line to mount your device
# UUID={your uuid}		/mnt/data	{your filesystem}	defaults	0	1
sudo emacs /etc/fstab

# use this to verify the fstab actually works
sudo findmnt --verify --verbose
```

Pada titik ini, Anda harus dapat melakukan reboot dan mengonfirmasi bahwa sistem memuat pemasangan dengan benar.

### Pengaturan Heimdall {#heimdall-setup}

Pada titik ini, kita memiliki hos dengan docker yang beroperasi di sana dan kita telah memasang penyimpanan yang memadai untuk menjalankan perangkat lunak node Polygon. Jadi, mari kita konfigurasi dan jalankan Heimdall.

Pertama, pastikan kita dapat menjalankan Heimdall dengan docker. Jalankan perintah berikut:

```bash
docker run -it 0xpolygon/heimdall:0.3.0 heimdallcli version
```

Jika ini adalah pertama kalinya Anda menjalankan Heimdall dengan docker, maka itu seharusnya menarik citra yang diperlukan secara otomatis dan menghasilkan output tentang informasi versi.

![img](/img/full-node-docker/heimdall-version.png)

jika ingin memeriksa detail citra Heimdall atau menemukan tag yang berbeda, Anda dapat melihat repositori di Docker Hub:  https://hub.docker.com/repository/docker/0xpolygon/heimdall

Pada titik ini, mari kita jalankan perintah Heimdall `init` untuk menyiapkan direktori beranda.

```bash
docker run -v /mnt/data/heimdall:/heimdall-home:rw --entrypoint /usr/bin/heimdalld -it 0xpolygon/heimdall:0.3.0 init --home=/heimdall-home
```

Mari kita hancurkan perintah ini sedikit demi jaga-jaga jika ada yang salah.

* Kami menggunakan `docker run`untuk menjalankan perintah melalui dermaga.

* Switch `-v /mnt/data/heimdall:/heimdall-home:rw` sangat penting. Ini adalah mengaitkan folder yang kami buat sebelumnya `/mnt/data/heimdall`dari sistem host ke `/heimdall-home`dalam wadah sebagai volume dermaga.

* `rw` memungkinkan perintah untuk menulis ke volume docker. Untuk semua intensitas dan tujuan, dari dalam kontainer docker, direktori rumah untuk Heimdall akan `/heimdall-home`menjadi

* `--entrypoint /usr/bin/heimdalld`Argumen ini menimpakan titik masukan default untuk kontainer ini.

* `-it`Saklar digunakan untuk menjalankan perintah secara interaktif.

* Akhirnya kami menentukan gambar mana yang ingin kami `0xpolygon/heimdall:0.3.0`jalankan.

* Setelah itu, `init --home=/heimdall-home` adalah argumen yang akan diberikan ke Heimdall yang dapat dieksekusi. `init` adalah perintah yang ingin dijalankan dan `--home` digunakan untuk menentukan lokasi direktori beranda.

Setelah menjalankan perintah `init`, direktori `/mnt/data/heimdall` seharusnya memiliki beberapa struktur dan terlihat seperti ini:

![img](/img/full-node-docker/heimdall-tree.png)

Sekarang kita perlu membuat beberapa pembaruan sebelum memulai Heimdall. Pertama, kita akan mengedit file `config.toml`.

```bash
# Open the config.toml and and make three edits
# moniker = "YOUR NODE NAME HERE"
# laddr = "tcp://0.0.0.0:26657"
# seeds = "LATEST LIST OF SEEDS"

sudo emacs /mnt/data/heimdall/config/config.toml
```

Jika tidak memiliki daftar seed, Anda dapat menemukannya di dokumentasi untuk menyiapkan node penuh. Dalam kasus kita, file memiliki tiga baris ini:

```
# A custom human readable name for this node
moniker="examplenode01"

# TCP or UNIX socket address for the RPC server to listen on
laddr = "tcp://0.0.0.0:26657"

# Comma separated list of seed nodes to connect to
seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
```

:::caution

Ada dua `config.toml`file `laddr`dalam Pastikan bahwa Anda hanya mengubah `laddr`parameter di bawah `[rpc]`bagian.

:::

Karena file `config.toml` sudah siap, Anda harus membuat dua perubahan kecil pada file `heimdall-config.toml`. Gunakan editor favorit Anda untuk memperbarui dua pengaturan ini:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "http://localhost:9545"

# RPC endpoint for bor chain
bor_rpc_url = "http://localhost:8545"
```

`eth_rpc_url` harus diperbarui ke URL apa pun yang digunakan untuk RPC Ethereum Mainnet. `bor_rpc_url`Dalam kasus kami akan diperbarui ke`http://bor:8545` Setelah membuat edit, file kami memiliki baris ini:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "https://eth-mainnet.g.alchemy.com/v2/ydmGjsREDACTED_DONT_USE9t7FSf"

# RPC endpoint for bor chain
bor_rpc_url = "http://bor:8545"
```

Perintah `init` default menyediakan `genesis.json`, tetapi tidak akan berfungsi dengan Mainnet Polygon atau Mumbai. Jika Anda menyiapkan node mainnet, Anda dapat menjalankan perintah ini untuk mengunduh file genesis yang benar:

```bash
sudo curl -o /mnt/data/heimdall/config/genesis.json https://raw.githubusercontent.com/maticnetwork/heimdall/master/builder/files/genesis-mainnet-v1.json
```

Jika ingin memastikan Anda memiliki file yang benar, periksa dengan hash ini:

```
# sha256sum genesis.json
498669113c72864002c101f65cd30b9d6b159ea2ed4de24169f1c6de5bcccf14  genesis.json
```

## Memulai Heimdall {#starting-heimdall}
Sebelum memulai Heimdall, kita akan membuat jaringan docker, agar kontainer dapat membentuk jaringan dengan mudah satu sama lain berdasarkan nama. Untuk membuat jaringan, jalankan perintah berikut:

```bash
docker network create polygon
```

Sekarang kita akan memulai Heimdall. Jalankan perintah berikut:

```bash
docker run -p 26657:26657 -p 26656:26656 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdall --entrypoint /usr/bin/heimdalld -d --restart unless-stopped  0xpolygon/heimdall:0.3.0 start --home=/heimdall-home
```

Sebagian besar perintah ini akan terlihat familier. Jadi mari kita bicarakan tentang apa yang baru.

* Switch `-p 26657:26657` dan `-p 26656:26656` adalah pemetaan port. Ini akan menginstruksikan docker untuk memetakan port host `26657`ke port kontainer `26657`dan sama untuk .`26656`

* `--net polygon`Saklar adalah memberitahu docker untuk menjalankan kontainer ini dalam jaringan poligon.

* `--name heimdall`sedang menamai wadah yang berguna untuk debuging, tetapi semua nama yang akan digunakan untuk kontainer lain untuk terhubung ke Heimdall.

* `-d`Argumen tersebut mengatakan docker untuk menjalankan kontainer ini di latar belakang.

* Saklar `--restart unless-stopped`memberitahu docker untuk secara otomatis memulai kembali kontainer kecuali dihentikan secara manual.

* `start`Akhirnya, digunakan untuk benar-benar menjalankan aplikasi `init`alih-alih mengatur direktori rumah.

Pada titik ini, sebaiknya kita periksa dan melihat apa yang sedang terjadi. Kedua perintah ini dapat berguna:

```bash
# ps will list the running docker processes. At this point you should see one container running
docker ps

# This command will print out the logs directly from the heimdall application
docker logs -ft heimdall
```

Pada titik ini, Heimdall seharusnya sudah mulai melakukan sinkronisasi. Ketika Anda melihat log itu, Anda harus melihat log informasi yang meludahi yang terlihat seperti ini:

```
2022-12-14T19:43:23.687640820Z INFO [2022-12-14|19:43:23.687] Executed block                               module=state height=26079 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.721220869Z INFO [2022-12-14|19:43:23.721] Committed state                              module=state height=26079 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.730533414Z INFO [2022-12-14|19:43:23.730] Executed block                               module=state height=26080 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.756646938Z INFO [2022-12-14|19:43:23.756] Committed state                              module=state height=26080 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.768129711Z INFO [2022-12-14|19:43:23.767] Executed block                               module=state height=26081 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.794323918Z INFO [2022-12-14|19:43:23.794] Committed state                              module=state height=26081 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.802989809Z INFO [2022-12-14|19:43:23.802] Executed block                               module=state height=26082 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.830960386Z INFO [2022-12-14|19:43:23.830] Committed state                              module=state height=26082 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.840941976Z INFO [2022-12-14|19:43:23.840] Executed block                               module=state height=26083 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.866564767Z INFO [2022-12-14|19:43:23.866] Committed state                              module=state height=26083 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.875395744Z INFO [2022-12-14|19:43:23.875] Executed block                               module=state height=26084 validTxs=0 invalidTxs=0
```

Jika Anda tidak melihat informasi seperti ini, node mungkin tidak akan menemukan peer yang cukup. Perintah lain yang berguna saat ini adalah panggilan RPC untuk memeriksa status sinkronisasi Heimdall:

```bash
curl localhost:26657/status
```

Ini akan menampilkan respons seperti:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "node_info": {
      "protocol_version": {
        "p2p": "7",
        "block": "10",
        "app": "0"
      },
      "id": "0698e2f205de0ffbe4ca215e19b2ee7275d2c334",
      "listen_addr": "tcp://0.0.0.0:26656",
      "network": "heimdall-137",
      "version": "0.32.7",
      "channels": "4020212223303800",
      "moniker": "examplenode01",
      "other": {
        "tx_index": "on",
        "rpc_address": "tcp://0.0.0.0:26657"
      }
    },
    "sync_info": {
      "latest_block_hash": "812700055F33B175CF90C870B740D01B0C5B5DCB8D22376D2954E1859AF30458",
      "latest_app_hash": "83A1568E85A1D942D37FE5415F3FB3CBD9DFD846A42CBC247DFD6ABB9CE7E606",
      "latest_block_height": "16130",
      "latest_block_time": "2020-05-31T17:06:31.350723885Z",
      "catching_up": true
    },
    "validator_info": {
      "address": "3C6058AF387BB74D574582C2BEEF377E7A4C0238",
      "pub_key": {
        "type": "tendermint/PubKeySecp256k1",
        "value": "BOIKA6z1q3l5iSJoaAiagWpwUw3taAhiEMyZ9ffxAMznas2GU1giD5YmtnrB6jzp4kkIqv4tOmuGYILSdy9+wYI="
      },
      "voting_power": "0"
    }
  }
}
```

Pada fase pengaturan awal, Anda harus memperhatikan bidang `sync_info`. Jika `catching_up` benar, berarti Heimdall belum disinkronkan sepenuhnya. Anda dapat memeriksa properti lain di `sync_info` untuk mengetahui seberapa tertinggalnya Heimdall.

## Memulai Bor {#starting-bor}

Pada titik ini, Anda memiliki node yang telah berhasil menjalankan Heimdall. Anda seharusnya sudah siap menjalankan Bor.

Sebelum memulai Bor, kita harus menjalankan server rest Heimdall. Perintah ini akan memulai REST API yang digunakan Bor untuk mengambil informasi dari Heimdall. Perintah untuk memulai server adalah:

```bash
docker run -p 1317:1317 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdallrest --entrypoint /usr/bin/heimdalld -d --restart unless-stopped 0xpolygon/heimdall:0.3.0 rest-server --home=/heimdall-home --node "tcp://heimdall:26657"
```

Ada dua bagian perintah ini yang berbeda dan patut dicatat. Alih-alih menjalankan perintah `start`, kita menjalankan perintah `rest-server`. Juga, kita memberikan `~–node “tcp://heimdall:26657”~` yang memberi tahu server rest tentang cara berkomunikasi dengan Heimdall.

Jika perintah ini berjalan dengan sukses, ketika Anda `docker ps`menjalankan, Anda harus melihat dua perintah kontainer berjalan sekarang. Selain itu, jika Anda menjalankan perintah ini, Anda akan melihat beberapa output dasar:

```bash
curl localhost:1317/bor/span/1
```

Bor akan mengandalkan antarmuka ini. Jadi jika Anda tidak melihat keluaran JSON ada sesuatu yang salah.

Sekarang mari kita download `genesis`file untuk Bor:

```bash
sudo curl -o /mnt/data/bor/genesis.json 'https://raw.githubusercontent.com/maticnetwork/bor/master/builder/files/genesis-mainnet-v1.json'
```

Mari kita verifikasi `sha256 sum` lagi untuk file ini:

```
# sha256sum genesis.json
4bacbfbe72f0d966412bb2c19b093f34c0a1bd4bb8506629eba1c9ca8c69c778  genesis.json
```

Sekarang kita perlu membuat file konfigurasi default untuk memulai Bor.

```bash
docker run -it  0xpolygon/bor:0.3.3 dumpconfig | sudo tee /mnt/data/bor/config.toml
```

Perintah ini akan menghasilkan file .toml dengan pengaturan default. Kami akan membuat beberapa perubahan ke file, jadi membukanya dengan editor favorit dan membuat beberapa update. Catatan: Kami hanya menampilkan baris yang berubah.

Untuk referensi, Anda dapat melihat rincian gambar Bor di sini: [https://hub.docker.com/repository/docker/0xpolygon/bb](https://hub.docker.com/repository/docker/0xpolygon/bor)

```bash
# Similar to moniker, you might want to update this with a name of your own choosing
identity = "docker.example"

# Setting this to the location of a mount that we'll make
datadir = "/bor-home"

# We'll want to specify some boot nodes
[p2p]
  [pep.discovery]
    bootnodes = ["enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303", "enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303"]

# Because we're running inside docker, we'll likely need to change the way we connect to heimdall
[heimdall]
  url = "http://heimdallrest:1317"

# Assumming you want to access the RPC, you'll need to make a change here as well
[jsonrpc]
  [jsonrpc.http]
    enabled = true
    host = "0.0.0.0"
```

Pada titik ini, kita seharusnya sudah siap memulai Bor. Kita akan menggunakan perintah ini:
```bash
docker run -p 30303:30303 -p 8545:8545 -v /mnt/data/bor:/bor-home:rw --net polygon --name bor -d --restart unless-stopped  0xpolygon/bor:0.3.3 server --config /bor-home/config.toml
```

Jika semuanya berjalan lancar, Anda harus melihat banyak log yang terlihat seperti ini:

```bash
2022-12-14T19:53:51.989897291Z INFO [12-14|19:53:51.989] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:47:46Z
2022-12-14T19:53:51.989925064Z INFO [12-14|19:53:51.989] Fetching state sync events               queryParams="from-id=4&to-time=1590882466&limit=50"
2022-12-14T19:53:51.997640841Z INFO [12-14|19:53:51.997] StateSyncData                            Gas=0       Block-number=12800 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.021990622Z INFO [12-14|19:53:52.021] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:49:58Z
2022-12-14T19:53:52.022015930Z INFO [12-14|19:53:52.021] Fetching state sync events               queryParams="from-id=4&to-time=1590882598&limit=50"
2022-12-14T19:53:52.040660857Z INFO [12-14|19:53:52.040] StateSyncData                            Gas=0       Block-number=12864 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.064795784Z INFO [12-14|19:53:52.064] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:52:10Z
2022-12-14T19:53:52.064828634Z INFO [12-14|19:53:52.064] Fetching state sync events               queryParams="from-id=4&to-time=1590882730&limit=50"
2022-12-14T19:53:52.085029612Z INFO [12-14|19:53:52.084] StateSyncData                            Gas=0       Block-number=12928 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.132067703Z INFO [12-14|19:53:52.131] ✅ Committing new span                    id=3                startBlock=13056 endBlock=19455 validatorBytes=f8b6d906822710940375b2fc7140977c9c76d45421564e354ed42277d9078227109442eefcda06ead475cde3731b8eb138e88cd0bac3d9018238a2945973918275c01f50555d44e92c9d9b353cadad54d905822710947fcd58c2d53d980b247f1612fdba93e9a76193e6d90482271094b702f1c9154ac9c08da247a8e30ee6f2f3373f41d90282271094b8bb158b93c94ed35c1970d610d1e2b34e26652cd90382271094f84c74dea96df0ec22e11e7c33996c73fcc2d822 producerBytes=f8b6d906822710940375b2fc7140977c9c76d45421564e354ed42277d9078227109442eefcda06ead475cde3731b8eb138e88cd0bac3d9018238a2945973918275c01f50555d44e92c9d9b353cadad54d905822710947fcd58c2d53d980b247f1612fdba93e9a76193e6d90482271094b702f1c9154ac9c08da247a8e30ee6f2f3373f41d90282271094b8bb158b93c94ed35c1970d610d1e2b34e26652cd90382271094f84c74dea96df0ec22e11e7c33996c73fcc2d822
2022-12-14T19:53:52.133545235Z INFO [12-14|19:53:52.133] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:54:22Z
2022-12-14T19:53:52.133578948Z INFO [12-14|19:53:52.133] Fetching state sync events               queryParams="from-id=4&to-time=1590882862&limit=50"
2022-12-14T19:53:52.135049605Z INFO [12-14|19:53:52.134] StateSyncData                            Gas=0       Block-number=12992 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.152067646Z INFO [12-14|19:53:52.151] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:56:34Z
2022-12-14T19:53:52.152198357Z INFO [12-14|19:53:52.151] Fetching state sync events               queryParams="from-id=4&to-time=1590882994&limit=50"
2022-12-14T19:53:52.176617455Z INFO [12-14|19:53:52.176] StateSyncData                            Gas=0       Block-number=13056 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.191060112Z INFO [12-14|19:53:52.190] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:58:46Z
2022-12-14T19:53:52.191083740Z INFO [12-14|19:53:52.190] Fetching state sync events               queryParams="from-id=4&to-time=1590883126&limit=50"
2022-12-14T19:53:52.223836639Z INFO [12-14|19:53:52.223] StateSyncData                            Gas=0       Block-number=13120 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.236025906Z INFO [12-14|19:53:52.235] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:00:58Z
2022-12-14T19:53:52.236053406Z INFO [12-14|19:53:52.235] Fetching state sync events               queryParams="from-id=4&to-time=1590883258&limit=50"
2022-12-14T19:53:52.269611566Z INFO [12-14|19:53:52.269] StateSyncData                            Gas=0       Block-number=13184 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.283199351Z INFO [12-14|19:53:52.283] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:03:10Z
2022-12-14T19:53:52.283737573Z INFO [12-14|19:53:52.283] Fetching state sync events               queryParams="from-id=4&to-time=1590883390&limit=50"
2022-12-14T19:53:52.314141359Z INFO [12-14|19:53:52.314] StateSyncData                            Gas=0       Block-number=13248 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.325150782Z INFO [12-14|19:53:52.325] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:05:22Z
2022-12-14T19:53:52.325171075Z INFO [12-14|19:53:52.325] Fetching state sync events               queryParams="from-id=4&to-time=1590883522&limit=50"
2022-12-14T19:53:52.354470271Z INFO [12-14|19:53:52.354] StateSyncData                            Gas=0       Block-number=13312 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.372354857Z INFO [12-14|19:53:52.372] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:07:34Z
2022-12-14T19:53:52.372389214Z INFO [12-14|19:53:52.372] Fetching state sync events               queryParams="from-id=4&to-time=1590883654&limit=50"
2022-12-14T19:53:52.398246950Z INFO [12-14|19:53:52.398] StateSyncData                            Gas=0       Block-number=13376 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.413321099Z INFO [12-14|19:53:52.413] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:09:46Z
2022-12-14T19:53:52.413345355Z INFO [12-14|19:53:52.413] Fetching state sync events               queryParams="from-id=4&to-time=1590883786&limit=50"
2022-12-14T19:53:52.437176855Z INFO [12-14|19:53:52.437] StateSyncData                            Gas=0       Block-number=13440 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.450356966Z INFO [12-14|19:53:52.450] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:11:58Z
```

Ada beberapa cara untuk memeriksa status sinkronisasi Bor. Yang paling sederhana adalah dengan `curl`:

```bash
curl 'localhost:8545/' \
--header 'Content-Type: application/json' \
-d '{
	"jsonrpc":"2.0",
	"method":"eth_syncing",
	"params":[],
	"id":1
}'
```

Ketika Anda menjalankan perintah ini, itu akan memberikan hasilnya seperti:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x2eebf",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodeBytes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x1d4ee3e",
    "startingBlock": "0x0",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

Ini akan menunjukkan `currentBlock` yang telah disinkronkan dan juga `highestBlock` yang kita ketahui. Jika node sudah sinkron, kita harus `false`mendapatkan

## Snapshot {#snapshots}
Anda akan menemukan bahwa sinkronisasi dari gulungan dapat memakan waktu yang sangat lama. Jika Anda ingin mempercepat proses up, Anda dapat mengikuti instruksi yang tercantum di sini: [https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/](https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/) bor/

Ini akan menjadi instruksi yang paling mutakhir, tetapi kurang lebih Anda dapat melakukan sesuatu seperti di bawah ini:

```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# At this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```
