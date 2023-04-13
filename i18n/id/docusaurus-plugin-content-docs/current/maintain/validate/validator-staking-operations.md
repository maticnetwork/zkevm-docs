---
id: validator-staking-operations
title: Stake di Polygon
description: Belajar bagaimana untuk memangsa sebagai validator di Jaringan Polygon
keywords:
  - docs
  - matic
  - polygon
  - stake
  - claim
  - unstake
slug: validator-staking-operations
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Prasyarat {#prerequisites}

### Konfigurasi node penuh {#full-node-set-up}

node validator Anda telah diatur penuh dan synced. Lihat juga:

* [Jalankan Node Validator](run-validator.md)
* [Jalankan Node Validator dengan Ansible](run-validator-ansible.md)
* [Menjalankan Node Validasi dari Biner](run-validator-binaries.md)

### Pengaturan akun {#account-setup}

Pada node validator Anda, periksa bahwa akun telah diatur. Untuk memeriksa, jalankan perintah berikut **di node validasi**:

```sh
    heimdalld show-account
```

Output Anda akan muncul dalam format berikut:

```json
{
    "address": "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
    "pub_key": "0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19"
}
```

Ini akan menampilkan alamat dan kunci publik Anda untuk node validasi Anda. Perhatikan bahwa **alamat ini harus cocok dengan alamat penandatangan Anda di Ethereum**.

### Menampilkan kunci pribadi {#show-private-key}

Langkah ini bersifat opsional.

Pada node validator Anda, periksa bahwa kunci privat benar. Untuk memeriksa, jalankan perintah berikut **di node validasi**:

```sh
heimdalld show-privatekey
```

Output berikut akan muncul:

```json
{
    "priv_key": "0x********************************************************"
}
```

## Stake di Polygon {#stake-on-polygon}

Anda dapat men-stake di Polygon menggunakan [dashboard validator](https://staking.polygon.technology/validators/).

### Stake menggunakan dashboard staking {#stake-using-the-staking-dashboard}

1. Akses [dashboard validator](https://staking.polygon.technology/validators/).
2. Masuk dengan dompet Anda. MetaMask adalah dompet yang direkomendasikan. Anda harus memastikan bahwa Anda login menggunakan alamat yang sama dimana token MATIK yang hadir.
3. Klik **Menjadi Validator**. Anda akan diminta untuk mengatur node Anda. Jika Anda belum mengatur node sekarang, Anda harus melakukannya, jika melanjutkan ke depan, Anda akan menerima error ketika mencoba stake.
4. Di layar berikutnya, tambahkan rincian validator Anda, tarif komisi, dan jumlah staking.
5. Klik **Stake Sekarang**.

Setelah transaksi selesai, Anda akan berhasil men-stake untuk menjadi validator. Anda akan diminta tiga kali untuk mengonfirmasi transaksi tersebut.

* Setujui Transaksi — ini akan menyetujui transaksi stake Anda.
* Stake — Ini akan mengonfirmasi transaksi stake Anda.
* Simpan — ß Ini akan menyimpan rincian validator Anda.

:::note

Agar perubahan berlaku pada [dashboard staking](https://staking.polygon.technology/account), itu membutuhkan minimal 12 konfirmasi blok.

:::

### Memeriksa saldo {#check-the-balance}

Untuk memeriksa saldo alamat Anda:

```sh
heimdallcli query auth account SIGNER_ADDRESS --chain-id CHAIN_ID
```

di mana

* SIGNER_ADDRESS — [alamat penandatangan](/docs/maintain/glossary.md#validator) Anda.
* CHAIN_ID — ID rantai mainnet Polygon dengan awalan klien: `heimdall-137`.

Output berikut akan muncul:

```json
address: 0x6c468cf8c9879006e22ec4029696e005c2319c9d
coins:
- denom: matic
amount:
    i: "1000000000000000000000"
accountnumber: 0
sequence: 0
```

### Mengeklaim imbalan sebagai validator {#claim-rewards-as-a-validator}

Setelah Anda diatur dan di-stake sebagai validator, Anda akan mendapatkan imbalan untuk melakukan tugas validator. Ketika Anda melakukan tugas validator dengan patuh, Anda mendapatkan imbalan.

Untuk mengeklaim imbalan, Anda dapat membuka [dashboard validator](https://staking.polygon.technology/account) Anda.

Anda akan melihat dua tombol di profil Anda:

* Tarik Imbalan
* Restake Imbalan

#### Tarik Imbalan {#withdraw-reward}

Sebagai validator, Anda mendapatkan imbalan selama Anda melakukan tugas validator.

Mengeklik **Tarik Imbalan** akan mendapatkan imbalan Anda kembali ke dompet Anda.

Dashboard akan diperbarui setelah konfirmasi 12 blok.

#### Restake Imbalan {#restake-reward}

Melakukan restake imbalan Anda adalah cara yang mudah untuk meningkatkan stake Anda sebagai validator.

Mengeklik **Restake Imbalan** akan me-restake imbalan Anda dan meningkatkan stake Anda.

Dashboard akan diperbarui setelah konfirmasi 12 blok.
