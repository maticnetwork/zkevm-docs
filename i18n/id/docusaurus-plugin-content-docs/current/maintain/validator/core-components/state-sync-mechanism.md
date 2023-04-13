---
id: state-sync-mechanism
title: Mekanisme Sinkronisasi Kondisi
description: Mekanisme sinkronisasi keadaan untuk membaca data Ethereum
keywords:
  - docs
  - matic
  - polygon
  - state sync
  - mechanism
slug: state-sync-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Validator di lapisan [Heimdall](/docs/maintain/glossary.md#heimdall) mengambil peristiwa [StateSynced](https://github.com/maticnetwork/contracts/blob/a4c26d59ca6e842af2b8d2265be1da15189e29a4/contracts/root/stateSyncer/StateSender.sol#L24) dan meneruskan peristiwa tersebut ke lapisan [Bor](/docs/maintain/glossary.md#bor). Lihat juga [Arsitektur Polygon](/docs/pos/polygon-architecture).

**Kontrak penerima** mewarisi [IStateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol), dan logika kustom berada di dalam fungsi [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/05556cfd91a6879a8190a6828428f50e4912ee1a/contracts/IStateReceiver.sol#L5).

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

## Persyaratan bagi pengguna {#requirements-for-the-users}

Hal-hal yang diperlukan dari dapp/pengguna untuk bekerja dengan sinkronisasi kondisi adalah:

1. Panggil fungsi [syncState](https://github.com/maticnetwork/contracts/blob/19163ddecf91db17333859ae72dd73c91bee6191/contracts/root/stateSyncer/StateSender.sol#L33).
2. Fungsi tersebut `syncState` mengeluarkan peristiwa yang dipanggil `StateSynced(uint256 indexed id, address indexed contractAddress, bytes data);`
3. Semua validator di rantai Heimdall menerima peristiwa `StateSynced`. Setiap validator yang ingin mendapatkan biaya transaksi untuk sinkronisasi kondisi mengirimkan transaksi ke Heimdall.
4. Setelah transaksi `state-sync` di Heimdall dimasukkan dalam blok, transaksi tersebut ditambahkan ke daftar sinkronisasi kondisi yang tertunda.
5. Setelah setiap sprint di Bor, node Bor mengambil peristiwa sinkronisasi status yang tertunda dari Heimdall melalui panggilan API.
6. Kontrak penerima mewarisi antarmuka `IStateReceiver`, dan logika kustom untuk mendekode byte data dan melakukan tindakan yang ada di dalam fungsi [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol).
