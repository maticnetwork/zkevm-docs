---
id: writing-style
title: Panduan Penulisan Umum
sidebar_label: General writing guidelines
description: Ikuti pedoman berikut ketika menulis.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - writing
  - contribute
  - style
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: writing-style
---

Pedoman ini berfokus pada praktik terbaik untuk menulis dokumentasi teknis dan
kaidah gaya yang digunakan ketika membuat dokumentasi untuk Polygon Wiki.
Tujuan panduan ini adalah membantu para kontributor menulis konten yang jelas, ringkas,
dan konsisten. Tim Polygon menganggap Polygon Wiki sebagai produk Dokumen resmi.

## Pedoman utama {#primary-guidelines}

Kami percaya salah satu hal yang membuat Polygon spesial adalah desain yang koheren dan kami
berusaha mempertahankan karakteristik yang menonjol ini. Tim Polygon menganggap Polygon Wiki
sebagai produk Dokumen resmi. Sejak awal, kami menentukan beberapa pedoman untuk memastikan
bahwa kontribusi akan menyempurnakan keseluruhan proyek:

- **Kualitas**: Kode dalam proyek Polygon harus memenuhi pedoman gaya, disertai
contoh kasus yang sesuai, pesan commit deskriptif, bukti bahwa kontribusi
tidak melanggar komitmen kompatibilitas apa pun atau menyebabkan interaksi fitur yang merugikan,
dan bukti penelaah sejawat yang berkualitas tinggi.
- **Ukuran**: Budaya proyek Polygon yakni terdapat pull-request kecil yang diajukan
secara berkala. Makin besar pull-request, kemungkinan besar Anda akan diminta
mengajukan ulang permintaan menjadi beberapa PR tunggal yang lebih kecil dan dapat ditinjau secara terpisah.
- **Pemeliharaan**: Jika fitur memerlukan pemeliharaan berkelanjutan (misalnya, dukungan
untuk sebuah merek pangkalan data tertentu), kami mungkin meminta Anda untuk bertanggung jawab mempertahankan fitur ini.

Panduan Gaya mengikuti motivasi dari panduan gaya berikut:

> Jika Anda tidak dapat menemukan jawaban mengenai suatu gaya, suara, atau pertanyaan terminologi
> dalam panduan ini, silakan melihat sumber daya berikut.

- [Panduan Gaya Google](https://github.com/google/styleguide/blob/gh-pages/docguide/style.md)
- [Panduan Gaya Oxford](https://global.oup.com/academic/product/new-oxford-style-manual-9780198767251?cc=nl&lang=en&)
- [Panduan Gaya Microsoft](https://docs.microsoft.com/en-us/style-guide/welcome/)

### Generator situs statis {#static-site-generator}

Wiki dibuat menggunakan [Docusaurus](https://docusaurus.io/), generator situs statis untuk
membuat situs dokumentasi dengan markdown. Wiki mengikuti templat metadata
berikut untuk berkas markdown dan harus disesuaikan untuk setiap dokumen baru:

```
---
id: wiki-maintainers
title: Wiki Maintainers
sidebar_label: Maintainers
description: A list of Polygon Wiki maintainers
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - docs
  - maintainers
  - contributors
image: https://matic.network/banners/matic-network-16x9.png
slug: community-maintainers
---
```

Ada beberapa aspek penting yang harus dipertimbangkan ketika menulis metadata untuk file markdown:
- Kami meminta kontributor untuk menggunakan **id unik**; menghindari **hanya** menggunakan kata atau kalimat umum seperti "Pengantar" or "Ikhtisar".
- **Judul** adalah kalimat yang digunakan di awal artikel, "Pedoman Umum Penulisan" untuk artikel ini. Jadi, tidak perlu menambahkan header H1/H2 untuk memperkenalkan setiap artikel. Namun, gunakan **judul** ini dari metadata.
- **Deskripsi** tidak boleh terlalu panjang, karena digunakan pada ubin indeks yang memiliki batasan jumlah karakter. Misalnya, deskripsi "Blockchain adalah buku besar yang tidak dapat diubah untuk mencatat transaksi", pada *basics-blockchain.md* terlihat di ubin indeks seperti:
![img](/img/contribute/index-tile.png)

  Kemudian, **deskripsi** harus terdiri **hingga 60 karakter**, termasuk spasi di antara karakter.
- Kata kunci penting untuk meningkatkan SEO dan mendeskripsikan artikel. Usahakan membuat target setidaknya lima kata kunci.

:::note

Silakan melihat
[dokumentasi metadata resmi](https://docusaurus.io/docs/next/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter) untuk detail selengkapnya.

:::

### Berbagi pengalaman dengan pembaca {#share-the-experience-with-the-reader}

- Orang Pertama: Jangan gunakan "Saya" atau "saya". Gunakan sudut pandang orang pertama secara ringkas dan
dengan maksud. Ketika digunakan berlebihan, narasi orang pertama dapat mengalahkan rasa
pengalaman bersama dan mengaburkan perjalanan para pembaca.
- Orang Kedua: Dalam kebanyakan kasus, menyapa pembaca secara langsung. Untuk tutorial, gunakan
orang jamak — kami, kita — atau sudut pandang orang kedua. Karena tutorial menghadirkan
pendekatan yang lebih terarah terhadap suatu topik, menggunakan orang pertama jamak adalah cara yang lebih alami dan
praktik yang umum diterima daripada jenis dokumentasi lainnya.
- Orang Ketiga: Jangan gunakan “kami” untuk merujuk Polygon atau Teknologi Polygon.
- Kalimat Aktif: Gunakan bentuk waktu saat ini setiap kali memungkinkan. Ada kalanya, kalimat pasif
sudah tepat digunakan; gunakan kalimat pasif ketika perlu berfokus pada keterangan.
- Selalu pikirkan keberadaan manusia: mengguinakan gaya dinamis ketika menjelaskan konsep teknis
akan membantu menghubungkan pembaca dengan materi alih-alih mendeskripsikan perangkat lunak (atau kode)
hanya untuk menjelaskan kegunaannya.
- Kata ganti: gunakan kata ganti yang netral gender, seperti “mereka” setiap kali memungkinkan. Umumnya, Anda dapat
mengubah kata benda apa pun dari tunggal ke jamak untuk memiliki kesepakatan subjek-kata kerja-kata ganti dan menghindari
penggunaan kata ganti spesifik gender seperti “lelaki itu” atau "wanita itu.
  - Waspadalah terhadap kata ganti yang impersonal dan berpotensi ambigu. Jika Anda menggunakan salah satu kata ganti impersonal
  berikut, pastikan Anda menjawab “dari apa?”, “yang mana?”, atau “sebagai apa?” dalam kalimat.
    - semua, lain, segala
    - setiap, baik
    - beberapa, banyak, maupun, tidak ada,
    - satu, lainnya
    - sama, segelintir, beberapa, semacam
    - itu, ini

### Singkat dan jelas {#being-swift-and-concise}

- Dokumentasi menjadi jelas dan bermakna jika menggunakan kata-kata dan frasa yang penting dan tepat.
  - Gunakan kata yang umum dan lumrah setiap kali memungkinkan.
  - Hindari bahasa yang muluk-muluk dan frasa sastra yang berlebihan.
  - Hindari jargon, bahasa sehari-hari, dan frasa idiomatis.
  - Hindari kata keterangan dan pernyataan subjektif. Misalnya, jangan menggunakan kata dan frasa yang menyertakan
  mudah, pesat, sederhana, cepat. Jika perlu, sebaiknya sederhanakan daripada
  melebih-lebihkan.
  - Jangan menggunakan frasa yang menimbulkan ambiguitas. Misalnya, alih-alih “Ketika rilis ini ditayangkan...",
  gunakan “Setelah rilis ini ditayangkan...”.
  - Berikan perhatikan ekstra pada pilihan kata. Gunakan “since” (menyiratkan periode waktu) alih-alih
  “because” (menyiratkan penyebab dan hasilnya) atau gunakan “ketika” (kejadian tunggal) daripada “setelah”
  (setiap waktu).
  - Hindari tanda seru.
- Hindari menambahkan kata atau frasa yang tidak perlu. Contohnya antara lain:
  - Alih-alih mengatakan "dan kemudian", hanya gunakan "kemudian" atau "lalu".
  - Alih-alih mengatakan “Dalam rangka untuk”, cukup gunakan “untuk”.
  - Alih-alih mengatakan “serta”, cukup menggunakan “dan".
  - Alih-alih mengatakan "via", gunakan pengganti bahasa Inggris yang tepat seperti "using", "through", atau "by".
- Gunakan nada percakapan yang tidak terlalu formal, tetapi harus tetap profesional.
- Kejelasan: berikan semangat pada kata atau frasa bila memungkinkan. Misalnya:
  - Alih-alih mengatakan “mis.”, gunakan “misalnya” atau "contohnya".
  - Alih-alih mengatakan “i.e.”, gunakan “yaitu” atau menulis ulang kalimat untuk membuat makna jelas tanpa
  membutuhkan pernyataan tambahan.
  - Alih-alih mengatakan “dsb.”, gunakan “dan sebagainya” atau revisi konten untuk menghilangkan istilah itu. Alih-alih
  "dll." untuk mengakhiri daftar contoh, fokus pada satu atau dua contoh dan gunakan "seperti".
  - Alih-alih “caveat”, gunakan pengganti bahasa Inggris yang tepat seperti “notice”, "caution", atau "warning".
  - Pemadatan membuat nada percakapan yang lebih alami pada dokumentasi, setidaknya bagi penutur bahasa Inggris.
  Ketahulilah kapan dan mengapa Anda menggunakan pemadatan.

## Struktur {#structure}

Dokumen harus diatur dalam beberapa bagian. Setiap bagian harus dapat
menyajikan tema atau topik. Dalam setiap bagian, terdapat satu atau beberapa paragraf.
Setiap paragraf harus menyampaikan hanya satu pemikiran. Usahakan tidak mengulangi pemikiran yang sama
dalam bagian yang berbeda dan bagilah paragraf yang memiliki beberapa poin pembahasan.
Pembaca harus memahami perihal dalam suatu paragraf dari kalimat pertamanya.

## Dokumentasi produk {#product-documentation}

Jika Anda menulis tentang produk tertentu, pastikan dokumen menyerupai
produk itu. Sebelumnya, dokumentasi Polygon digeneralisasi, membahas seputar PoS Polygon.
Karena kini ada beberapa produk yang berbasis Polygon, kontributor harus berhati-hati dengan
penambahannya.

Misalnya, "Menyebarkan kontrak cerdas pada Polygon menggunakan ###" adalah kalimat ambigu. Jika tutorial ini
mengacu ke PoS Polygon, acuan itu harus jelas, seperti pada,
"Menyebarkan kontrak cerdas PoS Polygon menggunakan ###". Menggunakan contoh yang sama dengan
Polygon Rollup, seperti Polygon Hermez, "Menyebarkan kontrak cerdas di Polygon Hermez menggunakan ###".

Pastikan dokumentasi produk, baik panduan maupun tutorial umum, telah ditambahkan
ke Hub dokumentasi produk yang tepat. Pada kebanyakan dokumen, referensinya harus terdapat dalam
salah satu Hub umum (misalnya, "Pengembangan" atau "Validasi"),, tetapi dokumen sebenarnya
akan ditayangkan di dokumentasi produknya. Anda akan membutuhkan referensi dokumen di Hub dengan
menambahkannya ke `sidebars.js`
Namun, dokumen sebenarnya akan ada di dalam Hub dokumentasi produk masing-masing
dan ini akan mengarahkan pengguna setelah mereka mengkliknya. Pedoman yang sama berlaku untuk sebagian besar
dokumen. Referensinya akan terdapat di salah satu dari Hub umum, tetapi dokumen yang sebenarnya
akan ditayangkan di dokumentasi produknya.

Sebagian besar dokumentasi berbasis API di Polygon Wiki berupa
dokumentasi rujukan, dengan pengecualian API yang disebutkan dalam tutorial.
Misalnya, dokumentasi API di Matic.js menyajikan informasi tentang
struktur, parameter, dan nilai hasil untuk setiap fungsi atau metode di API.

## Dokumentasi API {#api-documentation}

Pertimbangkan hal berikut ketika mendokumentasikan API:

* Pengantar yang lugas sebagai titik awal.
* Deskripsi panggilan atau permintaan yang jelas. Uraian apa yang akan dilakukan titik akhir.
* Daftar parameter lengkap:
  * Jenis parameter
  * Ekspresi sintaks dengan placeholder yang menampilkan parameter yang tersedia
  * Pemformatan khusus
* Contoh kode untuk beberapa bahasa.
* Contoh panggilan dengan output yang diharapkan.
* Kode Error. Kasus edge.
* Instruksi tentang cara mendapatkan kunci API, bila perlu.
* Menambahkan FAQ atau skenario umum akan selalu berguna.
* Tautan ke sumber daya tambahan seperti posting media sosial, blog, atau konten video.
