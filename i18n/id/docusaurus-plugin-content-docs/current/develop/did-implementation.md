---
id: did-implementation
title: Implementasi DID Polygon
sidebar_label: Identity
description: Mempelajari tentang implementasi DID di Polygon
keywords:
  - docs
  - polygon
  - matic
  - DID
  - identity
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: did-implementation/getting-started
---

Ini adalah panduan pemula bagi pengguna yang ingin menggunakan paket implementasi yang diterbitkan tim Polygon untuk menghasilkan dan menerbitkan DID Polygon di buku besar Polygon.

Implementasi metode DID Polygon terdiri dari 3 paket, yaitu polygon-did-registrar, polygon-did-resolver, dan polygon-did-registry-contract. Pengguna yang ingin menggabungkan fungsionalitas baik untuk mendaftar maupun membaca DID pada atau dari jaringan Polygon dapat menggunakan panduan berikut.

Pada dasarnya, DID adalah pengidentifikasi unik yang dibuat tanpa kehadiran otoritas pusat.  DID dalam konteks Kredensial yang Dapat Diverifikasi digunakan untuk menandatangani dokumen, sehingga memfasilitasi pengguna untuk membuktikan kepemilikan dokumen ketika diperlukan.

## Metode DID Polygon {#polygon-did-method}

Definisi metode DID Polygon sesuai dengan spesifikasi dan standar DID-Core. URI DID terdiri dari tiga komponen yang dipisahkan oleh tanda titik dua, skema, diikuti dengan nama metode dan terakhir, pengidentifikasi spesifik metode. Untuk Polygon URI tampak seperti:

```
did:polygon:<Ethereum address>
```

Di sini skema `did`adalah, nama metode adalah `polygon`dan identifikasi spesifik metode adalah alamat ethereum

## Implementasi DID Polygon {#polygon-did-implementation}

DID Polygon dapat diimplementasikan dengan bantuan dua paket, pengguna dapat mengimpor pustaka npm dan menggunakannya untuk menggabungkan metodologi DID Polygon dalam aplikasi mereka. Perincian implementasi diberikan di bagian berikutnya.

Untuk memulai, Anda perlu membuat DID terlebih dahulu. Pembuatan dalam kasus yang dilakukan Polygon adalah enkapsulasi dari dua langkah. Pertama, pengguna perlu menghasilkan uri DID sendiri, kemudian mendaftarkannya di buku besar Polygon.

### Membuat DID {#create-did}

Dalam proyek untuk membuat URI poligon DID satu yang perlu diinstal

```
npm i @ayanworks/polygon-did-registrar --save
```

Setelah instalasi selesai, pengguna dapat menggunakannya sebagai berikut:

```
import { createDID } from "polygon-did-registrar";
```

`createdDID`Fungsi membantu pengguna menghasilkan URI YANG DILAKUKAN. Ketika membuat DID, ada dua skenario.

  1. Pengguna sudah memiliki dompet dan ingin menghasilkan DID yang terkait dompet yang sama.

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network, privateKey);
    ```

  2. Jika pengguna tidak memiliki dompet yang ada dan ingin menghasilkan satu, pengguna dapat menggunakannya:

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network);
    ```

Parameter jaringan dalam kedua kasus mengacu pada apakah pengguna ingin membuat DID di Polygon Mumbai Testnet atau Polygon Mainnet.

Masukan contoh:

```
network :"testnet | mainnet"
privateKey? : "0x....."
```

Setelah membuat DI, Anda akan memiliki URI yang dihasilkan.

```
DID mainnet: did:polygon:0x...
DID testnet: did:polygon:testnet:0x...
```

### Register {#register-did}

Untuk mendaftarkan URI DID dan dokumen yang sesuai pada buku edger, pengguna pertama perlu digunakan `polygon-did-registrar`sebagai berikut:

```js
import { registerDID } from "polygon-did-registrar";
```

Sebagai prasyarat untuk mendaftarkan DID, pengguna perlu memastikan bahwa corrsponding dompet ke DAD memiliki keseimbangan token yang diperlukan. Setelah pengguna memiliki keseimbangan tanda dalam dompet, panggilan dapat dilakukan ke fungsi registerDId seperti yang ditunjukkan di bawah ini:

```js
const txHash = await registerDID(did, privateKey, url?, contractAddress?);
```

`did``privateKey`Parameter, sementara itu opsional untuk memasuki `url`dan .`contractAddress` Jika pengguna tidak memberikan dua parameter terakhir, pustaka mengambil konfigurasi default jaringan dari URI DID.

Jika semua parameter cocok dengan spesifikasi dan segala sesuatu yang diberikan dalam urutan yang benar, `registerDID`fungsi mengembalikan hash transaksi, kesalahan yang sesuai akan dikembalikan sebaliknya.

Dan dengan ini, Anda telah berhasil menyelesaikan tugas Anda mendaftarkan sebuah melakukan kegiatan di Jaringan Polygon.

## Memecahkan DID {#resolve-did}

Untuk memulai, pasang perpustakaan berikut:

```bash
npm i @ayanworks/polygon-did-resolver --save
npm i did-resolver --save
```

Untuk membaca dokumen DID yang terdaftar di buku besar, pengguna apa pun dengan URI polygon DID dapat melakukannya terlebih dahulu dalam impor proyek.

```js
import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
```

Setelah mengimpor paket, dokumen DID dapat diakses dengan menggunakan:

```js
const myResolver = didPolygon.getResolver()
const resolver = new DIDResolver(myResolver)

const didResolutionResult = this.resolver.resolve(did)
```

dimana `didResolutionResult`objek adalah sebagai berikut:

```js
didResolutionResult:
{
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata
}
```

Harus diperhatikan, tidak ada biaya gas yang akan dihitung oleh pengguna ketika mencoba memecahkan DID.

## Memperbarui Dokumen DID {#update-did-document}

Untuk encapsulate proyek dengan kemampuan untuk memperbarui dokumen DID pengguna pertama perlu digunakan `polygon-did-registrar`sebagai berikut:

```js
import { updateDidDoc } from "polygon-did-registrar";
```

Selanjutnya, panggil fungsi:

```js
const txHash = await updateDidDoc(did, didDoc, privateKey, url?, contractAddress?);
```

Harus dicatat bahwa untuk memperbarui dokumen DID tersebut, hanya pemilik DID yang dapat mengirim permintaan. Kunci privat di sini juga harus memiliki beberapa token Matic yang sesuai.

Jika pengguna tidak menyediakan konfigurasi `url` dan `contractAddress`, pustaka mengambil konfigurasi default jaringan dari URI DID.

## Menghapus Dokumen DID {#delete-did-document}

Dengan implementasi Polygon DID, pengguna juga dapat mencabut Dokumen DID dari buku tersebut. Pengguna pertama perlu digunakan `polygon-did-registrar`sebagai berikut:

```js
import { deleteDidDoc } from "polygon-did-registrar";
```

Lalu gunakan

```js
const txHash = await deleteDidDoc(did, privateKey, url?, contractAddress?);
```

Di antara parameter, perlu diperhatikan bahwa `url` dan `contractAddress` adalah parameter opsional. Jika tidak disediakan oleh pengguna, maka konfigurasi default akan diambil berdasarkan URI DID oleh fungsi.

Kunci privat harus menyimpan token Matic yang diperlukan sesuai konfigurasi jaringan DID, atau transaksi akan gagal.

## Berkontribusi ke Repositori {#contributing-to-the-repository}

Gunakan alur kerja fork, branch, dan pull request untuk mengusulkan perubahan ke repositori. Harap membuat nama cabang yang informatif dengan termasuk masalah atau nomor kutu misalnya.

```
https://github.com/ayanworks/polygon-did-registrar
https://github.com/ayanworks/polygon-did-resolver
```
