---
id: technical-faqs
title: FAQ teknis
description: Bangun aplikasi blockchain berikutnya di Polygon.
keywords:
  - docs
  - matic
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Terus ikuti kabar terbaru

Terus dengan update node dan validator terbaru dari tim Polygon dan komunitas dengan berlangganan ke [<ins>pemberitahuan Polygon</ins>](https://polygon.technology/notifications/).

:::

### 1. Apakah kunci pribadi untuk keystore Heimdall dan Bor sama? {#1-are-the-private-keys-same-for-heimdall-and-bor-keystore}
Ya, kunci pribadi yang digunakan untuk membuat kunci Validator dan Keystore Bor sama. Kunci pribadi yang digunakan pada contoh ini adalah alamat ETH Dompet Anda, tempat token testnet Polygon Anda disimpan.

### 2. Daftar Perintah Umum {#2-list-of-common-commands}

Saat ini kami memiliki daftar yang mudah digunakan untuk paket Linux. Kami akan terus rutin memperbarui daftar ini untuk lebih memudahkan.

**Untuk paket Linux**

#### A. Di mana menemukan file genesis heimdall {#a-where-to-find-heimdall-genesis-file}

`$CONFIGPATH/heimdall/config/genesis.json`

#### B. Di mana menemukan heimdall-config.toml {#b-where-to-find-heimdall-config-toml}

`/etc/heimdall/config/heimdall-config.toml`

#### C. Di mana menemukan config.toml {#c-where-to-find-config-toml}

`/etc/heimdall/config/config.toml`

#### D. Di mana menemukan heimdall-seeds.txt {#d-where-to-find-heimdall-seeds-txt}

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

#### E. Memulai Heimdall {#e-start-heimdall}

`$ sudo service heimdalld start`

#### F. Memulai rest-server Heimdall {#f-start-heimdall-rest-server}

`$ sudo service heimdalld-rest-server start`

#### G. Memulai bridge-server Heimdall {#g-start-heimdall-bridge-server}

`$ sudo service heimdalld-bridge start`

#### H. Log Heimdall {#h-heimdall-logs}

`/var/log/matic-logs/`

#### I. Di mana menemukan file genesis Bor {#i-where-to-find-bor-genesis-file}

`$CONFIGPATH/bor/genesis.json`

#### J. Memulai Bor {#j-start-bor}

`sudo service bor start`

#### K Memeriksa log Heimdall {#k-check-heimdall-logs}

`tail -f heimdalld.log`

#### L. Memeriksa rest-server Heimdall {#l-check-heimdall-rest-server}

`tail -f heimdalld-rest-server.log`

#### M. Memeriksa log bridge Heimdall {#m-check-heimdall-bridge-logs}

`tail -f heimdalld-bridge.log`

#### N. Memeriksa log Bor {#n-check-bor-logs}

`tail -f bor.log`

#### O. Menghentikan proses Bor {#o-kill-bor-process}

**Untuk Linux**:

1. `ps -aux | grep bor`. Dapatkan PID untuk Bor dan kemudian jalankan perintah berikut.
2. `sudo kill -9 PID`

**Untuk Biner**:

Pergi ke `CS-2003/bor` dan kemudian jalankan, `bash stop.sh`

### 3. Error: Gagal membuka kunci akun (0x...) Tidak ada kunci untuk alamat atau file yang diberikan {#3-error-failed-to-unlock-account-0x-no-key-for-given-address-or-file}

Error ini terjadi karena jalur untuk file password.txt salah. Ikuti langkah-langkah berikut untuk memperbaiki masalah ini:

Error ini terjadi karena jalur untuk file password.txt dan Keystore salah. Ikuti langkah-langkah berikut untuk memperbaiki masalah ini:

1. Salin file keystore Bor ke

    /etc/bor/dataDir/keystore

2. Dan password.txt ke

    /etc/bor/dataDir/

3. Pastikan Anda telah menambahkan alamat yang benar di `/etc/bor/metadata`

Untuk Biner:

1. Salin file keystore Bor ke:

`/var/lib/bor/keystore/`

2. Dan password.txt ke

`/var/lib/bor/password.txt`


### 4. Error: Block.Header.AppHash salah. Diharapkan xxxx {#4-error-wrong-block-header-apphash-expected-xxxx}

Kesalahan ini biasanya terjadi saat layanan Heimdall macet di suatu blok; tidak ada metode pembalikan yang tersedia di Heimdall.

Untuk menyelesaikan masalah ini, Anda harus mengatur ulang Heimdall sampai selesai:

```bash
    sudo service heimdalld stop

    heimdalld unsafe-reset-all
```

Setelah itu, Anda harus menyinkronkan dari snapshot lagi:

```bash
    wget -c <Snapshot URL>

    tar -xzvf <snapshot file> -C <HEIMDALL_DATA_DIRECTORY>

```

Kemudian, mulai lagi layanan Heimdall.


### 5. Dari mana saya membuat kunci API? {#5-from-where-do-i-create-the-api-key}

Anda dapat mengakses tautan ini: [https://infura.io/register](https://infura.io/register) . Pastikan untuk menyalin kunci API untuk Ropsten, bukan Mainnet, setelah Anda mengatur akun dan proyek Anda.

Mainnet dipilih secara default.

### 6. Heimdall tidak berfungsi Saya mengalami error Panic {#6-heimdall-isn-t-working-i-m-getting-a-panic-error}

**Error Aktual (Actual Error)**: Heimdalld saya tidak berfungsi. Baris pertama dalam log adalah:
panic: db_backend leveldb tidak dikenal, diperlukan goleveldb atau memdb atau fsdb

Ubah konfigurasi menjadi `goleveldb` di config.toml


### 7. Bagaimana cara menghapus sisa-sisa Heimdall dan Bor? {#7-how-do-i-delete-remnants-of-heimdall-and-bor}

Jika Anda ingin menghapus sisa-sisa Heimdall dan Bor, jalankan perintah berikut:
Bor:

Untuk paket Linux:

```$ sudo dpkg -i matic-bor```

Lalu, hapus Direktori Bor:

```$ sudo rm -rf /etc/bor```

Untuk Biner:

```$ sudo rm -rf /etc/bor```

Dan

```$ sudo rm /etc/heimdall```


### 8. Berapa banyak validator yang dapat aktif secara bersamaan? {#8-how-many-validators-can-be-active-concurrently}

Maksimum 100 validator yang aktif sekaligus. Kami juga akan menghadirkan lebih banyak peserta jika batas tercapai di pertengahan proses. Perhatikan bahwa sebagian besar validator aktif memiliki waktu aktif (uptime) tinggi. Peserta dengan waktu padam (downtime) tinggi akan dipaksa keluar.

### 9. Seberapa besar saya harus melakukan stake? {#9-how-much-should-i-stake}

"stake-amount" dan "heimdall-fee-amount" - seberapa besar seharusnya?

Diperlukan minimum 10 token Matic untuk jumlah stake sedangkan biaya Heimdall harus lebih besar daripada 10. Misalnya, jumlah stake Anda adalah 400, maka biaya Heimdall harusnya 20. Kami menyarankan untuk mempertahankan biaya Heimdall sebesar 20.

Namun, harap dicatat bahwa nilai yang dimasukkan dalam jumlah stake dan heimdal-fee-amount harus dimasukkan dalam 18 desimal

Misalnya,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 10. Saya terpilih menjadi validator tetapi alamat ETH saya salah. Apa yang harus saya lakukan? {#10-i-was-selected-to-become-a-validator-but-my-eth-address-was-incorrect-what-do-i-do}

Jika Anda memiliki akses ke alamat ETH yang Anda kirimkan sebelumnya, maka Anda dapat mentransfer token Tes dari akun tersebut ke akun saat ini. Kemudian, Anda dapat memulai proses pengaturan node Anda.

Jika Anda tidak memiliki akses ke alamat ETH tersebut, kami tidak akan mentransfer token secara terpisah. Anda dapat  mendaftar ulang di formulir dengan alamat ETH yang benar.

### 11. Saya mengalami error saat memulai bridge {#11-i-m-getting-an-error-starting-the-bridge}

**Error**: Objek "start" tidak diketahui, coba "bridge help". Apakah tidak masalah mengabaikan ini?

Periksa "which bridge" - jika `/usr/sbin/bridge` Anda tidak menjalankan program "bridge" yang benar.

Coba `~/go/bin/bridge` alih-alih `(or $GOBIN/bridge)`


### 12. Saya mendapatkan error dpkg {#12-i-m-getting-dpkg-error}

**Error**: "dpkg: error memproses arsip matic-heimdall_1.0.0_amd64.deb (--install): mencoba menimpa '/heimdalld-rest-server.service', yang juga ada dalam paket matic-node 1.0.0"

Ini terjadi terutama karena instalasi Matic sebelumnya di perangkat Anda. Untuk mengatasinya, Anda dapat menjalankan:

`sudo dpkg -r matic-node`


### 13. Saya tidak tahu Kunci Pribadi mana yang harus saya tambahkan saat membuat kunci validator {#13-i-m-not-clear-on-which-private-key-should-i-add-when-i-generate-validator-key}

Kunci Pribadi yang akan digunakan adalah alamat ETH Dompet yang digunakan untuk menyimpan token testnet Polygon Anda. Anda dapat menyelesaikan pengaturan dengan sepasang kunci publik-privat yang terkait dengan alamat yang dikirimkan pada formulir.


### 14. Adakah cara untuk mengetahui apakah Heimdall sudah sinkron? {#14-is-there-a-way-to-know-if-heimdall-is-synced}

Anda dapat jalankan perintah berikut untuk memeriksanya:

```$ curl [http://localhost:26657/status](http://localhost:26657/status)```

Periksa nilai catching_up. Jika ditampilkan sebagai "false", maka semua node telah sinkron.


### 15. Bagaimana jika seseorang menjadi Top 10 staker, bagaimana dia akan menerima imbalan MATIC di akhir? {#15-what-if-someone-become-a-top-10-staker-how-he-will-receive-his-matic-reward-at-the-end}

Imbalan tahap 1 tidak didasarkan pada stake. Silakan baca https://blog.matic.network/counter-stake-stage-1-stake-on-the-beach-full-details-matic-network/ untuk detail imbalan. Peserta dengan stake tinggi tidak secara otomatis memenuhi syarat untuk mendapatkan imbalan di tahap ini.


### 16. Apa versi Heimdall yang seharusnya saya gunakan? {#16-what-should-be-my-heimdall-version}

Untuk memeriksa versi Heimdall, cukup jalankan:

```heimdalld version```

Versi Heimdall yang benar untuk tahap 1 adalah `heimdalld version is beta-1.1-rc1-213-g2bfd1ac`


### 17. Berapa nilai yang harus saya tambahkan dalam jumlah stake dan besar biaya? {#17-what-values-should-i-add-in-the-stake-amount-and-fee-amount}

Diperlukan minimum 10 token Matic untuk jumlah stake sedangkan biaya Heimdall harus lebih besar daripada 10. Misalnya, jumlah stake Anda adalah 400, maka biaya Heimdall harusnya 20. Kami menyarankan untuk mempertahankan biaya Heimdall sebesar 20.

Namun, harap dicatat bahwa nilai yang dimasukkan dalam jumlah stake dan heimdal-fee-amount harus dimasukkan dalam 18 desimal

Misalnya,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 18. Apa perbedaan antara `/var/lib/heimdall` dan `/etc/heimdall?`

`/var/lib/heimdall` adalah dir Heimdall ketika Anda menggunakan metode instalasi biner. `/etc/heimdall` digunakan untuk metode instalasi paket Linux.


### 19. Saat saya melakukan transaksi stake, saya mendapatkan error "Gas Exceeded" {#19-when-i-make-the-stake-transaction-i-m-getting-gas-exceeded-error}

Error ini dapat terjadi karena format jumlah stake atau biaya. Nilai yang dimasukkan selama perintah stake harus terdiri dari 18 desimal.

Namun, harap dicatat bahwa nilai yang dimasukkan dalam jumlah stake dan heimdal-fee-amount harus dimasukkan dalam 18 desimal

Misalnya,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 20. Kapan saya mendapatkan kesempatan untuk menjadi Validator? {#20-when-will-i-get-a-chance-to-become-a-validator}

Kami secara bertahap menambahkan validator selama peristiwa Tahap 1. Kami akan merilis daftar validator eksternal baru secara bertahap. Daftar ini akan diumumkan di saluran Discord.


### 21. Di mana saya dapat menemukan lokasi info akun Heimdall? {#21-where-can-i-find-heimdall-account-info-location}

Untuk Biner:

    /var/lib/heimdalld/config folder

Untuk paket Linux:

    /etc/heimdall/config


### 22. Di file mana saya harus menambahkan kunci API? {#22-which-file-do-i-add-the-api-key-in}

Setelah membuat kunci API, Anda perlu menambahkan kunci API di file `heimdall-config.toml`.


### 23. File mana yang perlu saya tambahkan persisten_peers? {#23-which-file-do-i-add-the-persistent_peers}

Anda dapat menambahkan persistent_peers di file berikut:

    /var/lib/heimdalld/config/config.toml


### 24. “Apakah Anda menyetel ulang Tendermint tanpa menyetel ulang data aplikasi?” {#24-did-you-reset-tendermint-without-resetting-your-application-s-data}

Dalam kasus seperti itu, Anda dapat menyetel ullang data konfigurasi Heimdall dan mencoba menjalankan instalasi lagi.

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge


### 25. Error: Tidak dapat melakukan unmarshall config Error 1 error(s) decoding {#25-error-unable-to-unmarshall-config-error-1-error-s-decoding}

Error: `* '' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract`

Hal ini terjadi sebagian besar karena ada kesalahan ketik, beberapa bagian yang hilang, atau file konfigurasi lama yang masih tersisa. Anda harus membersihkan semua sisa dan kemudian coba mengaturnya lagi.

### 26. Untuk menghentikan layanan Heimdall and Bor {#26-to-stop-heimdall-and-bor-services}

**Untuk paket Linux**:

Menghentikan Heimdall: `sudo service heimdalld stop`

Menghentikan Bor: `sudo service bor stop` atau

1. `ps -aux | grep bor`. Dapatkan PID untuk Bor dan kemudian jalankan perintah berikut.
2. `sudo kill -9 PID`

**Untuk Biner**:

Menghentikan Heimdall: `pkill heimdalld`

Menghentikan Bridge: `pkill heimdalld-bridge`

Menghentikan Bor: Pergi ke CS-2001/bor dan kemudian jalankan, `bash stop.sh`

### 27. Untuk menghapus direktori Heimdall dan Bor {#27-to-remove-heimdall-and-bor-directories}

**Untuk paket Linux**:
Hapus Heimdall: `sudo rm -rf /etc/heimdall/*`

Hapus Bor: `sudo rm -rf /etc/bor/*`

**Untuk Biner**:

Hapus Heimdall: `sudo rm -rf /var/lib/heimdalld/`

Hapus Bor: `sudo rm -rf /var/lib/bor`

### 28. Apa yang harus Anda lakukan saat menemui error "Wrong Block.Header.AppHash." {#28-what-to-do-when-you-get-wrong-block-header-apphash-error}

Error ini biasanya terjadi karena permintaan Infura yang terlalu banyak. Saat mengatur node di Polygon, Anda menambahkan Kunci Infura ke file Konfigurasi (Heimdall). Secara default, Anda diperbolehkan untuk mengajukan 100 ribu Permintaan per hari, jika batas ini terlewati, maka Anda akan menghadapi masalah seperti itu. Untuk mengatasi masalah ini, Anda dapat membuat kunci API baru dan menambahkannya ke file `config.toml`.