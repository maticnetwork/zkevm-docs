---
id: delegate
title: Cara Mendelegasikan
description: Pelajari cara menjadi delegator di Jaringan Polygon.
keywords:
  - docs
  - matic
  - polygon
  - how to delegate
  - validator
  - stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: delegate
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Cara Mendelegasikan {#how-to-delegate}

Ini adalah panduan detail untuk membantu Anda menjadi [delegator](/docs/maintain/glossary.md#delegator) di Jaringan Polygon.

Satu-satunya prasyarat adalah memiliki token MATIC dan ETH di alamat Ethereum mainnet.

## Mengakses dashboard {#access-the-dashboard}

1. Di dompet Anda (misalnya MetaMask), pilih Ethereum mainnet.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/choose-eth-mainnet.png")} width="300" />
</div>
<br />

2. Log masuk ke [Polygon Staking](https://staking.polygon.technology/).
3. Setelah log masuk, Anda akan melihat beberapa statistik secara keseluruhan bersama dengan daftar validator.

![img](/img/staking/home.png)

:::note

Jika Anda adalah validator, gunakan alamat yang tidak validasi untuk log masuk sebagai delegasi.

:::

## Mendelegasikan ke validator {#delegate-to-a-validator}

1. Klik **Menjadi Delegator** atau gulir ke bawah ke validator tertentu, lalu klik **Delegasikan**.

![img](/img/staking/home.png)

2. Tentukan jumlah MATIC yang akan didelegasikan.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate.png")} width="500" />
</div>
<br />

3. Setujui transaksi delegasi dan klik **Delegasikan**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate2.png")} width="500" />
</div>
<br />

Setelah transaksi delegasi selesai, Anda akan melihat pesan **Delegasi Selesai**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate3.png")} width="500" />
</div>
<br />

## Melihat delegasi {#view-your-delegations}

Untuk melihat delegasi Anda, klik [Akun Saya](https://staking.polygon.technology/account).

![img](/img/staking/myAccount.png)

## Menarik imbalan {#withdraw-rewards}

1. Klik [Akun Saya](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Di bawah validator yang Anda delegasikan, klik **Tarik Imbalan**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/withdraw-reward.png")} width="800" />
</div>
<br />

Imbalan token MATIC kemudian akan ditarik ke alamat Ethereum Anda.

## Restake imbalan {#restake-rewards}

1. Klik [Akun Saya](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Di bawah validator yang Anda delegasikan, klik **Restake Imbalan**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/restake-rewards.png")} width="800" />
</div>
<br />

Ini akan memberi ulang imbalan tanda MATIK ke validator dan meningkatkan saham delegasi.

## Unbond dari validator {#unbond-from-a-validator}

1. Klik [Akun Saya](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Di bawah validator yang Anda delegasikan klik **Unbond**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond-from-validator.png")} width="800" />
</div>
<br />

Ini akan menarik imbalan dari validator dan seluruh stok dari validator.

Hadiahnya yang ditarik akan muncul segera di akun Ethereum.

Dana stake yang ditarik akan dikunci untuk 80 [titik periksa](/docs/maintain/glossary.md#checkpoint-transaction).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond.png")} width="500" />
</div>
<br />

:::note

Penguncian dana untuk periode unbonding guna memastikan tidak ada perilaku berbahaya di jaringan.

:::

## Memindahkan stake dari satu node ke node lainnya {#move-stake-from-one-node-to-another-node}

Memindahkan stake dari satu node ke node lainnya merupakan transaksi tunggal. Tidak ada penundaan atau periode unbonding selama peristiwa ini.

1. Masuk ke [Akun Saya](https://wallet.polygon.technology/staking/my-account) di dashboard staking.
1. Klik **Pindahkan Stake** di bawah validator yang Anda delegasikan.
1. Pilih validator eksternal dan klik **Stake di sini**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move.png")} width="1500" />
</div>
<br />

4. Tentukan jumlah stake dan klik **Pindahkan Stake**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move2.png")} width="400" />
</div>
<br />

Stake kemudian akan dipindahkan. Dashboard akan diperbarui setelah konfirmasi 12 blok.

:::info

Bergerak stake diperbolehkan di antara node manapun. Satu-satunya pengecualian adalah bergerak stake dari node Foundation ke node Foundation yang lain yang tidak diizinkan.

:::
