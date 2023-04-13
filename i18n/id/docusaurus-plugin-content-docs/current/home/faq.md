---
id: faq
title: FAQ
description: FAQ yang terkait dengan Polygon
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Pertanyaan Yang Sering Ditanyakan {#frequently-asked-questions}

## Apa itu Polygon? {#what-is-polygon}

Polygon adalah larutan skala untuk blok publik, khususnya Ethereum. Polygon menyediakan scalability sambil memastikan pengalaman pengguna yang lebih unggul dengan cara yang aman dan terdesentralisasi. Ini memiliki implementasi yang bekerja untuk Ethereum di Kovan Testnet. Polygon bermaksud untuk mendukung blockchain lain di masa depan yang akan memungkinkan kita untuk memberikan fitur interoperability bersama dengan menawarkan scalability ke jaringan blockchain publik yang ada.

## Bagaimana Polygon berbeda dari implementasi Plasma lainnya? {#how-is-polygon-different-from-other-implementations-of-plasma}

Implementasi Polygon's Plasma dibangun di sisi berbasis negara yang dijalankan pada EVM, sementara implementasi lain dari Plasma terutama menggunakan UTXOs yang membatasi mereka untuk menjadi pembayaran spesifik. Memiliki sidechains berbasis negara memungkinkan Polygon untuk memberikan skalabilitas untuk kontrak cerdas generik.

Kedua, Polygon menggunakan lapisan pemeriksa publik yang menerbitkan pos pemeriksaan setelah interval periodik (tidak seperti titik pemeriksaan setelah setiap blok di Plasma Cash) yang memungkinkan sidechains untuk beroperasi dengan kecepatan tinggi saat mempublikasikan titik pemeriksaan dalam batch. Poin pemeriksaan bersama dengan bukti penipuan memastikan bahwa simpanan Polygon, beroperasi dengan cara yang aman.

## Proyek Anda memberikan skalabilitas untuk Ethereum menggunakan rantai plasma, apakah itu protokol atau blockchain asli dari dalamnya sendiri? {#your-project-provides-scalability-for-ethereum-using-plasma-chains-is-it-a-protocol-or-a-native-blockchain-in-itself}

Jaringan Polygon adalah solusi **"sidechain"** dimana aset rantai utama Ethereum, yaitu semua dApps / Tokens / Protokol rantai utama dapat dipindahkan/didatangkan ke Polygon "sidechain" dan jika diperlukan, seseorang dapat menarik aset ke rantai utama.

## Apa keuntungan kompetitif dari Polygon dibandingkan pesaingnya? {#what-are-the-competitive-advantages-of-polygon-over-its-competitors}

### Solusi penskalaan L2 {#l2-scaling-solutions}

Polygon berkomitmen untuk mencapai skala dengan desentralisasi. Polygon menggunakan titik periksa berkala dan bukti penipuan. Ketika pengguna ingin menarik aset mereka, mereka menggunakan pos pemeriksaan untuk membuktikan aset mereka di sidechain, sementara bukti penipuan diperlukan untuk menantang penipuan atau perilaku buruk dan staker slash

Proyek lain juga menawarkan solusi skala L2 tetapi ada dua elemen kunci yang berbeda di:

1. Pertama, Polygon berfokus pada transaksi keuangan tidak hanya tetapi juga permainan dan aplikasi utilitas lainnya. Kami juga memiliki rencana untuk layanan keuangan penuh seperti pinjaman/trading dApps (swap token, perdagangan margin dan lebih banyak lagi).

2. Kedua, sementara Polygon menggunakan titik pemeriksaan untuk waktu 1 detik (dengan lapisan PoS), banyak solusi lain mungkin memiliki waktu blok lebih dari waktu blok Ethereum karena perlu mendorong setiap blok dari rantai ke rantai utama.

### Solusi penskalaan L1 {#l1-scaling-solutions}

Selain itu, di antara proyek skala lainnya, Polygon berdiri karena kemampuannya untuk mencapai skala sambil mempertahankan tingkat desentralisasi yang besar.

Yang lebih penting lagi, proyek scalability ini memiliki masalah "reinventing roda". Mereka menciptakan blockchain baru di mana komunitas pengembang, ekosistem produk, dokumentasi teknis, dan bisnis harus dibangun dari **"scratch"**. Polygon, di sisi lain, adalah rantai yang diaktifkan EVM dan memiliki semua dApps / aset yang dibangun di rantai utama Ethereum dengan scalability yang tersedia pada klik tombol.

### Pembayaran {#payments}

Kami percaya bahwa Polygon memiliki tepi dalam hal kegunaan karena, dalam solusi lain, pengirim dan penerima harus membuat saluran pembayaran mereka. Ini sangat merepotkan bagi pengguna. Sementara dengan teknologi yang mendasari Polygon tidak ada persyaratan saluran pembayaran untuk pengguna dan mereka hanya perlu memiliki alamat Ethereum yang valid untuk menerima token. Hal ini juga sejalan dengan visi jangka panjang kami untuk meningkatkan pengalaman pengguna untuk aplikasi-aplikasi yang terdesentralisasi.

### Perdagangan dan Keuangan {#trading-and-finance}

Polygon bermaksud untuk mengaktifkan DEX (misalnya. 0x), kolam Liquidity (misalnya Kyber Network) dan jenis protokol keuangan lainnya seperti Protokol Lending (Dharma Protocol) pada platform, yang akan memungkinkan pengguna Polygon untuk mengakses aplikasi serivce finansial yang bervariasi seperti DEXs, pinjaman dApps, LP dan lain-lain.

## Bagaimana Polygon membandingkan dengan solusi lain {#how-does-polygon-compare-with-other-sidechain-solutions}

Pada Polygon, semua transaksi samping dijamin oleh beberapa mekanisme pada rantai dan rantai utama. Di sisi lain, transaksi yang dilakukan oleh lapisan produser Blok diverifikasi dan dipastikan ke rantai utama oleh lapisan penunjuk pemeriksaan yang sangat terdesentralisasi.

Jika transaksi penipuan terjadi pada sidechain, hal ini dapat dideteksi dan ditangani oleh lapisan pemeriksa. Bahkan dalam skenario yang ekstrem dan sangat tidak mungkin di mana lapisan blok serta lapisan pemeriksa keduanya bertabrakan dan bahkan rantai utama memiliki bukti penipuan yang mana siapa pun dari masyarakat dapat datang dan menantang transaksi yang mereka anggap penipuan di bagian sida.

Jika tantangan berhasil, ada perbedaan besar / hukuman finansial untuk pihak yang bertabrakan karena taruhan mereka hancur. Juga, penantang publik dihargai dengan stake yang ditampilkan, dari aktor fraudulent

Hal ini membuat Polygon jaringan sidechain yang insentif secara ekonomi yang memiliki tingkat desentralisasi dan keamanan transaksi sidang.

Juga kapasitas dan TPS dari Polygon jauh lebih tinggi dari solusi lainnya. Terutama ketika Polygon dapat memiliki ribuan transaksi sementara yang lain adalah satu sisi yang memiliki batas lebih tinggi dari beberapa ribu transaksi.

## Melalui prinsip apa yang akan ditambahkan? Apakah akan ada persyaratan khusus untuk rantai samping perusahaan swasta? {#via-what-principles-will-new-sidechains-be-added-will-there-be-any-special-requirements-for-private-companies-local-sidechains}

Sehubungan dengan saluran kondisi, Plasma mewakili alternatif yang unggul untuk kerangka penskalaan, terutama karena jaminan keamanan yang diberikan oleh kerangkanya - yang pada dasarnya mengatakan bahwa pengguna tidak akan pernah kehilangan dana dalam kemungkinan apa pun. Tentu saja, mungkin ada penundaan untuk mendapatkan kembali uangnya, tetapi operator Byzantine Plasma tidak dapat membuat uang tiba-tiba hilang, atau melakukan transaksi dengan double spending.

Polygon akan berusaha keras untuk menjadi infrastruktur blockchain yang sepenuhnya terbuka dan publik di masa depan di mana insentif/disinsentif ekonomi terutama akan mendorong keamanan dan stabilitas sistem. Jadi, siapa pun semestinya bisa bergabung dengan sistem dan berpartisipasi dalam konsensus. Namun, dalam tahap penyiapan jaringan, Polygon harus memainkan peran yang lebih besar untuk memungkinkan side.

Juga, sidechains Polygon akan terutama menjadi sidechains publik yang tersedia untuk siapa saja yang digunakan seperti blok publik lainnya. Namun, rantai Polygon Enterprise akan berniat menyediakan bagian samping (non-privasi) untuk organisasi tertentu. Keamanan dan desentralisasi rantai tersebut masih tetap utuh menggunakan lapisan pemeriksa dan bukti penipuan pada rantai utama.

## Akankah sidechain juga disinkronkan dengan rantai utama (Ethereum)? {#will-sidechains-also-be-synced-with-the-main-chain-ethereum}

Tentu saja. Lapisan pemeriksa publik akan memvalidasi semua transaksi yang terjadi di rantai dan mempublikasikan bukti ke rantai utama. Untuk memastikan keamanan transaksi sidechain, kontrak rantai utama Plasma berisi berbagai jenis Penipuan Proofs di mana transaksi trailer dapat ditantang untuk kegiatan penipuan. Jika penantang berhasil, taruhan aktor sidechain yang terlibat dalam penipuan dihancurkan dan ditransfer ke penantang. Ini setara dengan bouncing up stake tinggi Diagram yang baik untuk memahami adalah seperti di bawah:.

![Tangkapan Layar](/img/matic/Architecture.png)

## Di akhir Laporan Resmi, ada daftar "Kasus Penggunaan Potensial" - apakah semua itu akan diimplementasikan? Dalam urutan seperti apa? {#at-the-end-of-the-white-paper-there-is-a-list-of-potential-use-cases-will-all-of-that-be-implemented-in-what-order}

Logika dasar adalah - jika ada dApp / Protokol yang sedang bekerja pada Ethereum, tetapi dibatasi oleh transaksional rendah dan biaya transaksi yang tinggi - maka kita akan dapat menambahkan dukungan untuk dApps / Protocols di jaringan Polygon.

## Mengapa akan sulit untuk mereplikasi implementasi plasma Polygon? {#why-will-it-be-difficult-to-replicate-polygon-s-plasma-implementation}

Meskipun lebih tentang efek jaringan dalam hal jaringan dapat skala / menanam ekosistem lebih baik dari yang lain, solusi blockchain harus terbuka karena melibatkan aset yang sebenarnya digunakan oleh mereka.

Ini adalah kasus dengan semua proyek sumber terbuka. Hal ini juga berlaku sama bagi kami serta implementasi saingan lainnya karena kami akan memiliki lisensi GPL yang mengamanatkan siapa pun yang menggunakan implementasi kami wajib membuka sumber kode mereka. Namun lagi, titik bahwa menyalin kode berlaku bahkan ke Bitcoin, Ethereum dan proyek lainnya, itu lebih tentang efek jaringan yang dapat dicapai oleh satu proyek.

## Apa yang istimewa dari implementasi Plasma Jaringan Polygon? {#what-s-special-about-polygon-network-s-plasma-implementation}

Polygon Plasma menggunakan sistem model berbasis akun daripada sistem UTXO. Hal ini memberikan kita dengan keuntungan besar dari menggunakan EVM pada rantai Polygon yang memungkinkan kita untuk memanfaatkan seluruh ekosistem Ethereum, alat pengembang, perpustakaan integrasi, dll.

Jaringan Polygon dapat digunakan oleh dApps tanpa memerlukan perubahan ke token ERC20. Selanjutnya, lapisan pemeriksa kami memungkinkan kita untuk menjadi urutan besaran lebih cepat daripada implementasi Plasma lainnya karena kita menetaskan bukti blok dalam pos pemeriksaan, sedangkan implementasi Plasma lainnya harus mengirimkan setiap bukti ke rantai utama.

## Bagaimana Anda akan menyelesaikan masalah terkait sentralisasi? {#how-are-you-going-to-solve-the-issues-with-centralization}

Berikut ini adalah diagram yang memberikan Anda sejumlah konteks:

![Tangkapan Layar](/img/matic/Merkle.png)

Jadi pertama, node PoA akan menjadi Delegasi (dengan Proof of Solvency i.e mereka harus mendeportasi tiang yang tinggi) dan KYC pada dasarnya dipilih oleh lapisan PoS seperti node Proof Stake (DPoS) atau Delegated Fault Tolerance (DBFT).

Kedua, mari kita asumsikan semua Delegasi (atau 2/3) mengubah aktor yang buruk dan menghasilkan blok yang salah, maka Anda memiliki staker lapisan PoS yang akan memvalidasi semua blok dan jika penipuan dilakukan, maka taruhan Delegates akan hancur dan pemeriksa dihentikan untuk tindakan yang korektif.

Ketiga, katakanlah bahkan lapisan Staker PoS (yang akan menjadi sejumlah besar node) juga berubah buruk dan collude untuk menghasilkan titik pemeriksaan yang salah, yaitu semua PoA korup dan PoS rusak. Meski begitu, setelah filsafat Plasma, kami menulis salah satu hal yang didambakan dari skandal skaling, **bukti penipuan** yang sedang diawasi oleh banyak proyek besar (penonton dapat dilihat sebagai pengawas repositori kita di GitHub). Mekanisme penipuan ini memungkinkan siapa pun di depan umum untuk menantang transaksi apapun pada rantai utama, Ethereum.

## Mengapa Token Matic diwajibkan? {#why-is-matic-token-required}

Alasan berikut memperkuat kebutuhan untuk memiliki token MATIK:

### Polygon bermaksud untuk menjadi solusi skala tujuan umum untuk blok publik {#polygon-intends-to-be-a-general-purpose-scaling-solution-for-public-blockchains}

Kami mulai di Ethereum sebagai basis pertama kami, tapi Polygon masa depan dapat digunakan pada beberapa basechain. Akan ada basechain lainnya yang segera ditambahkan, Jadi tidak masuk akal untuk memiliki satu mata uang (ether) yang akan digunakan untuk membayar biaya di semua sidechain tersebut. Jika ada kekhawatiran eksistensial atas masa depan basechain, memiliki mata uang sebagai aset asli untuk Polygon akan melengkapi jaringan skaling. Oleh karena itu, penting untuk membangun ekosistem Staker pada token jaringan Polygon sendiri.

### Model keamanan Appcoin. {#appcoin-security-model}

Polygon bermaksud untuk memungkinkan Dapps membayar biaya Polygon dalam Dapp-koin dengan meringkaskan mekanisme pertukaran token menggunakan kumpulan likuiditas seperti Kyber. Pengguna hanya menggunakan koin her untuk membayar biaya, di latar belakang dApp-coin diimpor untuk token MATIC. Oleh karena itu, pengembang DApp yang ingin memberikan pengalaman pengguna yang tanpa kendala akan membantu mempertahankan kumpulan likuiditas Polygon.

### Seeding jaringan dalam tahap yang baru {#seeding-the-network-in-nascent-stages}

Praktis tidak mungkin untuk seeding sistem ketika hanya ada sedikit atau tidak ada txn di jaringan pada bagian awal, karena kami tidak dapat menyalurkan Eth ke lapisan Validator yang sangat terdesentralisasi dan produsen blok. Sedangkan token Matic, kami telah menyediakan sebagian besar token untuk disalurkan untuk produsen blok seeding, stake pengecek titik, dan setelah itu menawarkan imbalan blok. Penyediaan ini memastikan bahwa para staker menerima imbalan bahkan jika jaringan membutuhkan waktu untuk mengasumsikan efek jaringan. Ini mirip dengan mengapa imbalan Block Mining disimpan untuk Bitcoin, staker dan produsen blok dapat diberi insentif dengan cara ini untuk menjaga keamanan jaringan.

Jika kekhawatiran Anda adalah tentang Pengembang, salah satu pilar strategi kami adalah menjaga agar penghalang masuk bagi para pengembang sangat rendah. Kami telah memastikan bahwa semua alat pengembang Ethereum bekerja dengan sangat baik di Polygon. Dalam hal token yang diperlukan untuk membayar biaya di testnet , tidak ada perbedaan untuk bangunan pengembang di Ethereum. Dev mendapatkan token gratis untuk testnet dari faucet, Polygon, seperti yang ada di Ethereum. Anda perlu token MATIC hanya ketika Anda ingin menyebarkan pada Polygon Mainnet, di mana biaya gas jauh lebih rendah dari Ethereum, sekitar 1/100 dari biaya transaksi yang akan Anda bayar pada Ethereum.

## Apa yang mendorong penggunaan dan permintaan token Matic? {#what-drives-the-use-and-demand-for-matic-tokens}

Ada dua penggunaan utama token:

1. Tanda digunakan untuk membayar biaya transaksi dalam jaringan.
2. Tanda digunakan untuk staking untuk berpartisipasi dalam mekanisme konsensus Proof of Stake untuk lapisan pemeriksa dan blok lapisan produksi.

### Beberapa alasan kedua untuk permintaan token {#some-of-the-secondary-reasons-for-token-demand}

* Jaringan Polygon bermaksud untuk memungkinkan Dapps membayar biaya Polygon dalam Dapp-koin dengan meringkaskan mekanisme pertukaran token menggunakan kumpulan likuiditas seperti Kyber. Pengguna hanya menggunakan koin her untuk membayar biaya, di latar belakang dApp-coin diimpor untuk token MATIC. Oleh karena itu, pengembang DApp yang ingin memberikan pengalaman pengguna yang tanpa kendala akan membantu mempertahankan kumpulan likuiditas Polygon.

* Untuk mengaktifkan keluar yang lebih cepat kami menerapkan mekanisme pinjaman menggunakan Protokol Dharma dimana seorang penulis / lender dapat menerima exit-token dan membongkar jumlah keluar dengan biaya kecil sebagai kepentingan. Pemberi pinjaman kemudian mengklaim token setelah satu minggu dengan menggunakan token-keluar. Dengan demikian pengguna mendapatkan penarikan yang hampir tanpa penundaan, sementara pemberi pinjaman bisa mendapatkan bunga atas layanan yang mereka berikan.

### Pembakaran token Tingkat Protokol {#protocol-level-burning-of-tokens}

Kami berniat untuk membakar persentase biaya transaksi di setiap blok. Hal ini membuat deflasioner token di alam dan memberikan dukungan konstan dalam hal nilai pada tingkat protokol.

### Penghalang masuk yang rendah (dan karenanya peluang adopsi cepat lebih tinggi) {#low-entry-barrier-and-hence-higher-chances-of-quick-adoption}

Kami akan sangat mengandalkan DApps untuk membawa masuk adopsi pengguna akhir. Salah satu fitur kunci adalah bahwa kita mempertahankan arsitektur yang sepenuhnya kompatibel ke ekosistem pembangunan Ethereum semua kontrak pintar, wallet, IDE, alat DevOps etc kompatibel langsung dengan Polygon.

Setiap Dapp Ethereum dapat ditambatkan ke Polygon hampir tanpa perubahan signifikan. Jadi hambatan masuk untuk pengembang Ethereum yang ada untuk transisi ke Polygon dapat diabaikan yang dapat memulai adopsi dApp viral. Ini memiliki potensi untuk membawa banyak permintaan organik karena efek jaringan yang membangun sekitar jaringan Polygon.

## Apakah tipe token ERC20? {#is-token-type-erc20}

Ya. Dan tanda yang sama akan berlaku untuk Polygon Chain juga.

## Berapa TPS yang diharapkan akan Anda bawa ke jaringan Ethereum? Berapa kapasitas berjalan sekarang di testnet? {#what-is-the-expected-tps-you-ll-be-able-to-bring-to-the-ethereum-network-what-are-you-running-at-now-on-testnet}

Sebuah sidechain tunggal memiliki kapasitas 7.000 transaksi per detik. Polygon memiliki kemampuan untuk menambahkan beberapa sisi, tetapi saat ini, fokus kami akan menstabilkan jaringan dengan satu side.
