---
id: full-node-deployment
title: Jalankan Node Penuh dengan Ansible
description: Menyebarkan Node Penuh menggunakan Anabel
keywords:
  - docs
  - polygon
  - matic
  - node
  - full node setup
  - ansible
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Panduan tutorial ini yang Anda lakukan melalui awal dan menjalankan node penuh menggunakan Ansible.

[Sebuah Buku playbook Ansible](https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html) digunakan konfigurasi dan mengelola node penuh. Lihat [Minimum Technical Requirement](technical-requirements.md) panduan untuk persyaratan sistem.

:::tip

Langkah dalam panduan ini melibatkan menunggu layanan Heimdall dan Bor untuk sync Proses ini membutuhkan beberapa hari untuk selesai.

Atau, Anda dapat menggunakan snapshot yang dipertahankan, mengurangi waktu sinkronisasi hingga beberapa jam. For detail petunjuk, lihat [<ins>Petunjuk snapshot untuk Heimdall dan Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor).

Untuk snapshot download link , lihat halaman [<ins>Snapshot Polygon Chains Chains.</ins>](https://snapshot.polygon.technology/)

:::

## Prasyarat {#prerequisites}

- Pasang Ansible di mesin lokal Anda dengan Python3.x. Penyiapannya akan gagal jika Anda menggunakan Python2.x.
    - Untuk memasang Ansible dengan Python 3.x, Anda dapat menggunakan pip. Jika Anda tidak memiliki pip pada mesin Anda, ikuti langkah yang diuraikan [di sini](https://pip.pypa.io/en/stable/). Jalankan `pip3 install ansible`untuk memasang Dimengerti.
- Periksa [repositori PoS PoS](https://github.com/maticnetwork/node-ansible#requirements) persyaratan.
- Anda juga perlu memastikan bahwa Go **tidak dipasang** di lingkungan Anda. Jika Anda telah menginstal Go sebelum menyiapkan node penuh melalui Ansible, Anda akan mengalami masalah, karena Ansible mengharuskan instalasi paket Go spesifik.
- Anda juga harus memastikan bahwa VM/Mesin Virtual tidak memiliki pengaturan awal untuk Polygon Validator, Heimdall, atau Bor. Anda harus menghapusnya terlebih dahulu, jika tidak, pengaturan akan mengalami masalah.

:::info Peningkatan sumber Heimdall

Versi Heimdall terbaru, **[v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0)**, berisi beberapa enhancements. Waktu penundaan antara peristiwa kontrak dari validator yang berbeda **telah meningkat** untuk memastikan bahwa mempool tidak mendapatkan cepat dalam kasus ledakan peristiwa yang dapat menghambat kemajuan rantai tersebut.

Selain itu, ukuran data **telah dibatasi dalam txs sync keadaan menjadi 30Kb (ketika diwakilkan dalam byte) dan 60Kb (ketika didefinisikan sebagai string)**. Misalnya:

```bash
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```
:::

## Setup node penuh {#full-node-setup}

- Pastikan Anda memiliki akses ke mesin jarak jauh atau VM di mana node penuh sedang diatur.
  > Menampilkan [https://github.com/maticnetwork/node-ansible#setup](https://github.com/maticnetwork/node-ansible#setup) untuk rincian lanjut.
- Klone repositori [https://github.com/maticnetwork/node-ansible](https://github.com/maticnetwork/node-ansible)
- Navigasi ke dalam node-ansible node-ansible`cd node-ansible`
- Sunting `inventory.yml`file dan masukkan IP(s) Anda dalam `sentry->hosts`bagian.
  > Menampilkan [https://github.com/maticnetwork/node-ansible#inventory](https://github.com/maticnetwork/node-ansible#inventory) untuk rincian lanjut.
- Periksa apakah mesin remote dapat dicapai dengan berjalan:`ansible sentry -m ping`
- Untuk menguji jika mesin yang benar dikonfigurasi, jalankan perintah berikut:

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry" --list-hosts

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry" --list-hosts
  ```

  <img src={useBaseUrl("img/network/full-node-mumbai.png")} />

- Selanjutnya, atur node penuh dengan perintah ini:

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry"

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry"
  ```

- Dalam kasus jika Anda mengalami masalah, hapus dan membersihkan semua yang dimaksud:
  ```
  ansible-playbook playbooks/clean.yml
  ```

- Setelah Anda memulai buku putar Ansible, log masuk ke mesin remot.

- node benih Heimdall:

  ```bash
  moniker=<enter unique identifier>

  # Mainnet:
  seeds="d3a8990f61bb3657da1664fe437d4993c4599a7e@3.211.248.31:26656,d3d7d397339c9126235dfab11bf925e269776f4f@3.212.183.151:26656,68254d33685fad151e45bfe1ed33d538ba6ec8cb@3.93.224.197:26656,d26c54ebbf274896f12977bb13d83ac1237a8226@184.73.124.158:26656,f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656"

  # Testnet:
  seeds="b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656,4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,7a6c7b5d25b13ce3448b047dbebeb1a19cc2e092@18.213.200.99:26656"
  ```
- Bootnode:

  ```bash
  # Mainnet:
  bootnode ["enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303","enode://4be7248c3a12c5f95d4ef5fff37f7c44ad1072fdb59701b2e5987c5f3846ef448ce7eabc941c5575b13db0fb016552c1fa5cca0dda1a8008cf6d63874c0f3eb7@3.93.224.197:30303","enode://32dd20eaf75513cf84ffc9940972ab17a62e88ea753b0780ea5eca9f40f9254064dacb99508337043d944c2a41b561a17deaad45c53ea0be02663e55e6a302b2@3.212.183.151:30303"]

  # Testnet:
  bootnodes ["enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303","enode://f0f48a8781629f95ff02606081e6e43e4aebd503f3d07fc931fad7dd5ca1ba52bd849a6f6c3be0e375cf13c9ae04d859c4a9ae3546dc8ed4f10aa5dbb47d4998@34.226.134.117:30303"]
  ```

- Untuk memeriksa apakah Heimdall sudah disinkronkan
    - Pada mesin jarak jauh/VM, jalankan `curl localhost:26657/status`
    - Dalam keluarannya, nilai `catching_up` harus `false`

- Setelah Heimdall adalah sinkron, jalankan
    - `sudo service bor start`

Anda telah berhasil mengatur node penuh dengan Ansible.

:::note

Jika Bor menyajikan kesalahan izin ke data, jalankan perintah ini untuk membuat pengguna Bor pemilik file Bor:

```bash
sudo chown bor /var/lib/bor
```

:::
## Log {#logs}

Log dapat dikelola oleh alat `journalctl`linux. Berikut ini adalah tutorial untuk penggunaan lanjut: [Cara Gunakan Journalctl untuk Tampilan dan Manipulate Systemd](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs).

**Periksa log node Heimdall**

```bash
journalctl -u heimdalld.service -f
```

**Periksa log Bor Rest-server**

```bash
journalctl -u bor.service -f
```

## Pengaturan port dan firewall {#ports-and-firewall-setup}

Buka port 22, 26656 dan 30303 untuk dunia (0.0.0.0/0) di firewall node sentry.

Anda dapat menggunakan VPN untuk membatasi akses port 22 sesuai persyaratan dan pedoman keamanan Anda.