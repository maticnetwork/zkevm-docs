---
id: widget
title: Widget Dompet
sidebar_label: Wallet Widget
description: "Alat UI untuk menjalankan transaksi jembatan."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Widget Dompet adalah alat UI yang dapat ditanam di aplikasi web apa pun untuk mengeksekusi transaksi jembatan - Setor & Tarik.

Setiap widget diidentifikasi dengan nama unik yang dapat Anda dapatkan dari [dashboard Widget](https://wallet.polygon.technology/widget-dashboard).

### Dashboard Widget {#widget-dashboard}

Widget dapat dibuat dari halaman dashboard widget di aplikasi dompet. Ini memungkinkan pengguna membuat widget baru dengan beberapa opsi yang dapat disesuaikan.

Setelah widget dibuat, Anda dapat menyalin cuplikan kode dan menambahkannya di aplikasi atau menggunakan nama widget dan mengonfigurasinya sendiri.

Berikut ini adalah tautan ke dashboard widget -

* mainnet - https://wallet.polygon.technology/widget-dashboard
* testnet - https://wallet-dev.polygon.technology/widget-dashboard

## Instalasi {#install}

Widget diekspor sebagai pustaka javascript dan tersedia sebagai paket npm.

```bash
npm i @maticnetwork/wallet-widget
```

## Contoh {#examples}

Kami telah membuat contoh kerangka kerja dan alat yang berbeda untuk membantu Anda melakukan pengembangan. Semua contoh tersedia di - [https://github.com/maticnetwork/wallet-widget-example](https://github.com/maticnetwork/wallet-widget-example)

## Cara menggunakan {#how-to-use}
### Dengan target {#with-target}

Anggap Anda memiliki tombol di aplikasi dan Anda ingin menampilkan widget ketika mengeklik tombol itu -

```html
<button id="btnMaticWidget"></btn>
```

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'mainnet' // network to be used - testnet or mainnet
});
```

Buat widget kapan pun Anda siap. Ini adalah cara terbaik untuk memanggil fungsi buat setelah dokumen dimuat.

```javascript
await widget.create();
```
widget selesai dibuat, sekarang klik tombol widget dan widget Anda akan ditampilkan.

### Tanpa target {#without-target}

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    network: 'mainnet' // network to be used - testnet or mainnet
});

await widget.create();
```

widget telah selesai dibuat, tetapi untuk menampilkan widget tersebut, Anda harus memanggil API `show`.

```
widget.show();
```

Demikian juga, Anda dapat menyembunyikan widget dengan memanggil API `hide`.

```
widget.hide();
```

### Catatan Penting 👉 {#important-note}

1. Berdasarkan jaringan "testnet" atau "mainnet", Anda harus membuat aplikasi di dashboard masing-masing. Sebaiknya Anda membuat aplikasi di testnet & mainnet dengan nama yang sama, sehingga Anda tidak akan mengalami masalah saat mengubah jaringan.

2. Widget dompet adalah Pustaka UI dan di situs web yang berbeda, widget ini akan terlihat berbeda & mungkin memiliki beberapa masalah seperti warna, daya respons, dll. Jadi, silakan melakukan pengujian dan penyesuaian. Jika Anda membutuhkan bantuan, hubungi [tim dukungan](https://support.polygon.technology/).

3. Widget dompet ditampilkan secara utuh di perangkat seluler, tetapi Anda dapat melakukan penyesuaian dengan melakukan konfigurasi pada `style`.

## Konfigurasi {#configuration}

Konfigurasi dapat dilakukan di konstruktor Widget.

## Konfigurasi yang tersedia adalah {#available-configuration-are}

- **target** : string - selektor CSS untuk menampilkan widget saat elemen diklik. Misalnya, "#btnMaticWidget" akan menjadi target dalam kode di bawah ini.

```javascript
<button id="btnMaticWidget">Matic widget</button>
```

- **network** : string - jaringan yang akan digunakan. Dua opsi yang tersedia - 'testnet' atau 'mainnet'.
- **width** : angka - Lebar widget
- **height** : angka - Tinggi widget
- **autoShowTime** : angka - Menampilkan widget secara otomatis setelah waktu yang ditentukan dalam milidetik
- **appName** : string - nama aplikasi, ini bisa didapatkan di dashboard widget.
- **position** : string - Mengatur posisi widget. Pilihan yang tersedia adalah -
    - tengah
    - bawah-kanan
    - bawah-kiri
- **amount** : string - Mengisi jumlah dalam kotak teks terlebih dahulu
- **page** : string - memilih halaman. Pilihan yang tersedia adalah - `withdraw`, `deposit`.
- **overlay**: boolean - menampilkan lapisan saat widget dibuka. Secara default bernilai salah.
- **style**: objek - menerapkan beberapa gaya css pada widget.

```
var widget = new MaticWidget({
    appName: "<your app id>", //appName from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'testnet' // network to be used - testnet or mainnet,
    style:{
      color:'red'
    }
});
```

## Peristiwa {#events}

Widget mengeluarkan beberapa peristiwa yang dapat digunakan untuk mengetahui apa yang terjadi di dalam aplikasi.

### Berlangganan peristiwa {#subscribe-to-events}

```javascript
widget.on('load',()=>{
  console.log('widget is loaded');
})
```

### Batal berlangganan peristiwa {#unsubscribe-to-events}

```javascript
widget.off('load',<callback>)
```

> Callback harus sama dengan yang digunakan untuk berlangganan peristiwa. Jadi, sebaiknya simpan callback dalam sebuah variabel. `

## Daftar peristiwa: {#list-of-events}

- **load** - Widget dimuat
- **close** - Widget ditutup
- **approveInit** - Transaksi persetujuan diinisialisasi
- **approveComplete** - Transaksi persetujuan selesai
- **approveError** - Transaksi persetujuan gagal karena kesalahan tertentu atau pengguna menolak transaksi di Metamask
- **depositInit** - Transaksi setor diinisialisasi
- **depositComplete** - Transaksi setor selesai
- **depositError** - Transaksi setor gagal karena kesalahan tertentu atau pengguna menolak transaksi penyelesaian setor di Metamask
- **burnInit** - Transaksi bakar untuk penarikan diinisialisasi
- **burnComplete** - Transaksi bakar untuk penarikan selesai
- **confirmWithdrawInit** - Penarikan diperiksa dan konfirmasi transaksi diinisialisasi
- **confirmWithdrawComplete** - Transaksi konfirmasi penarikan selesai
- **confirmWithdrawError** - Transaksi konfirmasi penarikan gagal karena kesalahan tertentu atau pengguna menolak transaksi konfirmasi penarikan di Metamask
- **ExitInit** - Transaksi keluar dari proses penarikan diinisialisasi
- **ExitComplete** - Transaksi keluar dari proses penarikan selesai
- **ExitError** - Transaksi keluar dari proses penarikan gagal karena kesalahan tertentu atau pengguna menolak transaksi keluar dari proses penarikan di Metamask

## API {#apis}

- **show** -
menampilkan widget

```javascript
widget.show()
```

- **hide** -
menyembunyikan widget

```javascript
widget.hide()
```

- **on** - berlangganan peristiwa

```javascript
widget.on('<event name>', callback)
```

- **off** -
batal berlangganan peristiwa

```javascript
widget.off('<event name>', callback)
```
