---
id: meta-transactions
title: Transaksi Meta
sidebar_label: Overview
description: Pelajari tentang transaksi meta dan cara penggunaannya.
keywords:
  - docs
  - polygon
  - matic
  - transactions
  - meta transactions
  - gasless
image: https://matic.network/banners/matic-network-16x9.png
slug: meta-transactions
---

Panggilan kontrak cerdas harian saat ini berada di posisi tertinggi, mencapai sekitar 2,5 hingga 3 juta per hari.
DApp mulai menyadari kegunaannya, tetapi menjadi korban kesuksesannya sendiri atau
yang lain karena biaya gas. Belum lagi, kesulitan-kesulitan untuk memasukkan pengguna dan tantangan yang muncul dari UX
saat ini tidak mudah diperbaiki.

## Memperbaiki Kontrak Cerdas {#servicing-smart-contracts}

Berdasarkan rancangannya, kontrak cerdas adalah mesin kondisi deterministik yang dieksekusi ketika biaya transaksi
dibayarkan untuk memberikan layanan terhadap logika kontrak dengan menggunakan sumber daya komputasi jaringan.
Hal ini dilakukan oleh sebuah model dengan ukuran gas di Ethereum (dan Polygon).

## Kondisi Pelaksanaan Transaksi Saat Ini {#the-current-state-of-transacting}

Ada keterbatasan yang dimiliki oleh model transaksi tradisional ini di Ethereum (dan yang serupa blockchain).
Satu keterbatasan yang umum adalah pengguna tidak memiliki sarana untuk membayar gas. Secara default, pengirim
transaksi bertindak sebagai pembayar, karena perilaku digabungkan, jadi, jika seorang pengguna berusaha membuat dan mengirim
transaksi, maka pengguna tersebut bertanggung jawab untuk biaya gas yang terkait. Demikian juga, jika ada pengguna yang membangun, berinteraksi
dengan, atau menjalankan dApp, maka pengguna tersebut harus membayar gas.

Sungguh tidak realistis jika kita berharap pengguna rata-rata akan membeli kripto sekaligus membayar gas untuk berinteraksi dengan sebuah
aplikasi. Yang dapat dilakukan untuk mengatasi hal ini adalah memisahkan pengirim transaksi dari perannya
sebagai pembayar, yang akan memungkinkan adanya kesempatan untuk menskalakan eksekusi transaksi dan memulai pengalaman melakukan transaksi tanpa
hambatan.

Alih-alih eksekusi transaksi secara langsung, seharusnya ada perangkat penengah (melalui pihak ketiga) untuk menangani gas tersebut.
Di sinilah peran transaksi meta.

## Apa itu Transaksi Meta? {#what-are-meta-transactions}

Transaksi meta memungkinkan siapa pun melakukan interaksi dengan blockchain. Transaksi ini tidak mengharuskan pengguna memiliki
token untuk membayar layanan jaringan melalui biaya transaksi. Hal ini dilakukan dengan memisahkan
pengirim transaksi dan pembayar gas.

Solusi yang dapat menggabungkan pengguna baru dan membantu pengguna saat ini.

Eksekutor transaksi bertindak sebagai pengirim. Alih-alih membelanjakan gas, mereka hanya membuat
permintaan transaksi dengan menandatangani tindakan yang dimaksudkan (parameter transaksi) dengan kunci privat
mereka. Transaksi meta ini adalah transaksi Ethereum reguler yang mencakup beberapa parameter tambahan untuk membuat
transaksi meta.

Parameter transaksi yang ditandatangani ini diberikan ke jaringan sekunder, yang bertindak sebagai relayer.
Meskipun ada beberapa skema yang berbeda untuk ini, relayer biasanya akan memilih transaksi mana yang layak
kirim dengan memvalidasi transaksi (misalnya, transaksi yang relevan dengan dApp). Setelah validasi, relayer
akan membungkus permintaan (pesan yang ditandatangani) ke dalam transaksi aktual (yang berarti membayar biaya gas)
dan menyiarkannya ke jaringan, yaitu ketika kontrak tersebut membuka transaksi dengan memvalidasi keaslian
tanda tangan dan mengeksekusinya atas nama pengguna.

:::note Kata meta dan batch mungkin bersifat analog bagi beberapa orang

Agar jelas: transaksi meta berbeda dari transaksi batch, yaitu transaksi batch merupakan
transaksi yang dapat mengirim beberapa transaksi sekaligus, kemudian dieksekusi dari satu pengirim
(nonce tunggal ditentukan) secara berurutan.

:::

Singkatnya, transaksi meta adalah pola desain di mana:

* Pengguna (pengirim) menandatangani permintaan dengan kunci privat dan mengirimkannya ke relayer
* Kemudian, relayer membungkus permintaan tersebut ke sebuah tx dan mengirimkannya ke kontrak
* Kemudian, kontrak melakukan melepas pembungkus tx dan mengeksekusinya

Transaksi asli menyiratkan bahwa "pengirim" juga merupakan "pembayar". Ketika memisahkan "pembayar" dari
"pengirim", maka "pengirim" menjadi lebih seperti "intender" - pengirim menunjukkan niatnya atas transaksi
yang hendak dieksekusi di blockchain dengan menandatangani pesan yang berisi parameter-paramater tertentu yang terkait dengan
pesan mereka, dan tidak sepenuhnya menyusun transaksi.

## Kasus Penggunaan {#use-cases}

Seseorang dapat membayangkan kemampuan transaksi meta untuk melakukan penskalaan terhadap dApp dan melakukan interaksi dengan kontrak cerdas.
Pengguna tidak hanya dapat membuat transaksi nirgas, tetapi juga dapat melakukannya berkali-kali, dan dengan alat
automasi, transaksi meta dapat memengaruhi gelombang aplikasi berikutnya untuk kasus penggunaan praktis. Transaksi meta
memungkinkan manfaat nyata dalam logika kontrak cerdas yang sering kali terbatas karena biaya gas dan interaksi
yang diharuskan secara on-chain.

### Contoh dengan pemungutan suara {#example-with-voting}

Pengguna ingin turut serta dalam tata kelola on-chain dan mereka berniat memilih hasil tertentu melalui
kontrak pemungutan suara. Pengguna akan menandatangani pesan yang menyatakan keputusan pengguna dalam pemungutan suara di kontrak
khusus ini. Biasanya, mereka harus membayar biaya gas untuk berinteraksi dengan kontrak (dan tahu cara
melakukan interaksi dengan kontrak tersebut), tetapi sebaliknya, mereka menandatangani sebuah transaksi meta (off-chain) dengan informasi yang
diperlukan untuk pilihan mereka dan memberikannya ke relayer yang akan mengeksekusi transaksi mewakili mereka.

Pesan yang sudah ditandatangani tersebut dikirim ke relayer (parameter tx yang sudah ditandatangani tentang informasi pemungutan suara). Relayer
memvalidasi bahwa transaksi ini adalah suara prioritas, membungkus permintaan pemungutan suara tersebut ke dalam transaksi aktual,
membayar biaya gas, dan menyiarkannya ke kontrak pemungutan suara. Segala yang dicentang pada kontrak pemungutan suara
berakhir, dan pemungutan suara tersebut melakukan eksekusi mewakili pengguna.

## Mari Kita Coba {#try-them-out}

Dengan asumsi bahwa Anda telah terbiasa dengan berbagai pendekatan, Anda dapat memasukkan transaksi meta ke dalam
dApp dan tergantung pada apakah Anda sedang bermigrasi ke transaksi meta atau sedang membangun dApp yang baru menggunakannya.

Untuk mengintegrasikan dApp dengan Transaksi Meta di Polygon, Anda dapat memilih untuk menggunakan salah satu relayer
berikut atau meluncurkan solusi kustom:

* [Biconomy](https://docs.biconomy.io/products/enable-gasless-transactions)
* [Gas Station Network (GSN)](https://docs.opengsn.org/#ethereum-gas-station-network-gsn)
* [Infura](https://infura.io/product/ethereum/transactions-itx)
* [Gelato](https://docs.gelato.network/developer-products/gelato-relay-sdk)
