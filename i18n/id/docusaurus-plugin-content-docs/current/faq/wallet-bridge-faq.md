---
id: wallet-bridge-faq
title: FAQ <>Jembatan Wallet
description: Bangun aplikasi blockchain berikutnya di Polygon.
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - wallet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Di mana aku bisa menggunakan Walet Web Polygon? {#where-can-i-use-the-polygon-web-wallet}
Berikut adalah URL Suite Polygon Wallet URL: Wallet Suite adalah koleksi aplikasi Web3 yang disediakan oleh Polygon. Ini terdiri dari [Polygon Wallet](https://wallet.polygon.technology/polygon/assets) (dompet yang terdesentralisasi), [Jembatan Polygon](https://wallet.polygon.technology/polygon/bridge/deposit) (jembatan L1-L2), [Staking](https://staking.polygon.technology/) (sebuah lingkungan untuk membuat dan mendelegasikan token MATIC) dan [Jembatan Aman Polygon](https://safe-bridge.polygon.technology/safe) (jembatan multisig).

<div align= "center">
  <img src={useBaseUrl("img/faq/wallet/wallet-hp.png")} />
</div>

## Dompet mana yang saat ini didukung? {#which-wallets-are-currently-supported}

Metamask, Coinbase dan Bitski Wallet, Velly dan WalletConnect adalah dompet yang saat ini didukung.

<div align="center">
  <img src={useBaseUrl("img/faq/wallet/supported-wallets.png")} width="400" />
</div>

## Apa yang bisa saya lakukan dengan dompet Polygon saya? {#what-can-i-do-with-my-polygon-wallet}

- Mengirim dana ke akun mana pun di Polygon.
- Menyetor dana dari Ethereum ke Polygon (menggunakan jembatan).
- Menarik dana kembali ke Ethereum dari Polygon (juga menggunakan jembatan).

## Dompet MetaMask saya tidak terhubung dengan dompet Polygon {#my-metamask-wallet-is-not-connecting-with-polygon-wallet}

Ada banyak alasan mengapa hal ini bisa terjadi. Kami menyarankan agar Anda **mencoba lain waktu**, **gunakan peramban lain** atau, jika salah satu ini tidak membantu, **[menghubungi tim dukungan kami](https://support.polygon.technology/support/home)**.

## Bagaimana aku bisa menyimpan Dana dari Ethereum ke Polygon menggunakan Suite Polygon Wallet. {#how-can-i-deposit-funds-from-ethereum-to-polygon-using-polygon-wallet-suite}
Harap menonton video di bawah atau ikuti [tutorial ini](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#depositing-funds-from-ethereum-to-polygon).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/deposit/deposit-polygon-wallet.mp4"></source>
  <p>Browser Anda tidak mendukung elemen video ini.</p>
</video>

## Bagaimana aku bisa menarik dana dari Polygon ke Ethereum melalui Jembatan PoS menggunakan Suite Polygon Wallet? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-pos-bridge-using-polygon-wallet-suite}
Harap menonton video di bawah atau ikuti [tutorial ini](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-pos-bridge).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/pos/withdraw-polygon-wallet.mp4"></source>
  <p>Browser Anda tidak mendukung elemen video ini.</p>
</video>

## Bagaimana saya bisa menarik dana dari Polygon ke Ethereum melalui Jembatan Plasma menggunakan Suite Polygon Wallet? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-plasma-bridge-using-polygon-wallet-suite}
Harap menonton video di bawah atau ikuti [tutorial ini](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-plasma-bridge).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/plasma/withdraw-plasma-v3.mov"></source>
  <p>Browser Anda tidak mendukung elemen video ini.</p>
</video>

## Bagaimana menambahkan tanda baru atau kustom ke daftar Token Polygon Wallet ? {#how-to-add-a-new-or-custom-token-to-polygon-wallet-token-list}
Silakan ikuti [tutorial ini.](/docs/faq/adding-a-custom-token)

## Bagaimana menemukan kontrak token? {#how-do-i-find-the-token-contract}

Alamat kontrak token akan diperlukan ketika Anda mencoba menambahkan token baru atau kustom. Anda dapat mencari tanda dengan namanya di Coingecko atau CoinMarketCap di mana Anda akan dapat melihat alamat pada rantai Ethereum (untuk ERC20 tokens) dan blok lainnya yang didukung seperti Polygon. Alamat token di rantai lain mungkin belum diperbarui tetapi Anda tentunya dapat menggunakan alamat root untuk semua tujuan.

## Saya telah menyimpan dana saya, tetapi saya tidak melihatnya di Metamask. Apa yang harus saya lakukan? {#i-have-deposited-my-funds-but-i-don-t-see-it-on-metamask-what-do-i-do}

Anda perlu menambahkan secara manual alamat token ke Metamask.

Buka Metamask dan gulir ke bawah untuk mengklik **Impor token**.

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/wallet-faq-3.png")} width="400" />
</div>

Kemudian, tambahkan alamat kontrak yang relevan, simbol, dan presisi desimal. Alamat kontrak (dalam hal ini PoS-WETH) bisa ditemukan pada tautan ini: [https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/](https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/). Anda perlu menambahkan alamat token anak untuk melihat saldo di Mainnet Polygon. Desimal presisi adalah 18 untuk WETH (untuk sebagian besar token, desimal presisi adalah 18).

## Bagaimana aku bisa menambahkan Polygon Mainnet di Metamask? {#how-can-i-add-polygon-mainnet-on-metamask}

Periksa [tutorial ini](/docs/develop/metamask/config-polygon-on-metamask).

## Token saya tidak terlihat dalam daftar. Siapa yang harus saya hubungi? {#my-token-is-not-visible-in-the-list-who-should-i-contact}

Hubungi tim Polygon di Discord atau Telegram dan daftarkan token Anda. Sebelumnya, pastikan token Anda dipetakan. Jika tidak dipetakan maka harap menaikkan permintaan di [https://mapper.polygon.technology](https://mapper.polygon.technology/).

## Bisakah aku membatalkan transaksi setelah pos pemeriksaan tiba? {#can-i-cancel-my-transaction-after-the-checkpoint-arrived}
Setelah transaksi penarikan dimulai pada Polygon Mainnet, maka tidak dapat dibatalkan atau dipulihkan. Dalam transaksi penarikan , token dibakar dari Mainnet Polygon dan dicetak di Ethereum Mainnet. Oleh karena itu, token pernah dibakar dari rantai Polygon tidak dapat dikembalikan ke dompet Anda.

## Biaya gas terlalu tinggi, bisakah aku membatalkan transaksi? {#the-gas-fee-is-too-high-can-i-cancel-my-transaction}

Sayangnya, kita tidak dapat membatalkan transaksi setelah token dibakar dari Polygon Mainnet. Dengan kata lain, tidak mungkin untuk membatalkan transaksi setelah diinisiasi. Biaya gas tidak dikendalikan oleh Polygon. Hal ini benar-benar tergantung pada congestion jaringan dan jumlah transaksi dalam blok tertentu pada Ethereum Mainnet. Jika Anda pikir Anda tidak mampu membayar biaya gas saat ini, Anda dapat menunggu dan mencoba untuk melanjutkan dengan transaksi Anda nanti ketika biaya gas berada di sisi bawah. Anda juga dapat memonitor biaya gas pada Mainnet Ethereum dari sini: https://etherscan.io/gastracker


## Dapatkah saya mengirim token saya dari Polygon ke dompet/bursa lain? {#can-i-send-my-tokens-from-polygon-to-any-other-wallet-exchange}

Anda tidak dapat langsung mengirim token dari Polygon UI ke pertukaran/wallet. Anda harus terlebih dahulu menarik dari Polygon ke Ethereum dan kemudian mengirimkannya ke alamat bursa Anda (kecuali bursa/dompet Anda secara eksplisit mendukung jaringan tersebut).

## Aku membuat kesalahan mengirim dana ke pertukaran/wallet Dapatkah Anda membantu? {#i-made-the-mistake-of-sending-funds-to-an-exchange-wallet-directly-can-you-help}

Sayangnya, kami tidak dapat membantu dalam kasus seperti itu. Jangan mengirimkan dana langsung ke bursa yang hanya mendukung Ethereum, Anda harus terlebih dahulu menarik dari Polygon ke Ethereum dan kemudian mengirimkannya ke alamat bursa Anda.

## Saya melakukan transfer ke alamat yang salah. Bagaimana menarik kembali dana saya? {#i-made-a-transfer-to-the-wrong-address-how-do-i-retrieve-the-funds}

Sayangnya, tidak ada yang bisa dilakukan. Hanya pemilik kunci privat untuk alamat tertentu yang dapat memindahkan aset tersebut. Selalu disarankan untuk memastikan apakah alamat yang Anda kirim ke adalah salah satu yang benar.

## Transaksi saya telah menunggu terlalu lama, apa yang bisa saya lakukan? {#my-transaction-has-been-pending-for-too-long-what-can-i-do}
Transaksi mungkin akan dibatalkan karena alasan berikut:

1. Menentukan harga gas rendah ketika mengirimkan transaksi.
2. lonjakan mendadak dalam harga gas karena kemacetan di Mainnet. Ethereum.
3. Transaksi dibatalkan oleh Anda dari dompet atau diganti dengan transaksi baru.

Anda dapat melanjutkan dengan transaksi yang dikeluarkan dalam cara-cara berikut:

1. Jika transaksi Anda terjebak selama lebih dari satu jam, tombol **Coba Lagi** akan ditampilkan. Anda dapat klik tombol **Coba Lagi** untuk menyelesaikan transaksi yang sama. Anda dapat merujuk ke video ini untuk informasi lebih lanjut tentang cara menggunakan fitur **Try Again**.
2. Silakan periksa wallet MetaMask dan juga karena terkadang transaksi dapat diturunkan karena transaksi queued-up dalam Metamask. Dalam hal ini, bersihkan transaksi queued-up atau memasang ulang MetaMask dalam peramban yang sama.
3. Anda dapat menginstal MetaMask dalam peramban alternatif dan kemudian mencoba untuk menyelesaikan transaksi menggunakan Suite Polygon Wallet.
4. Anda juga dapat menggunakan tautan ini untuk menyelesaikan transaksi penarikan yang sedang menunggu. Tempel hash transaksi dalam opsi pencarian dan klik tombol **Konfirmasi untuk** menyelesaikan transaksi.

## Apa yang harus saya lakukan jika setoran dikonfirmasi tetapi saldo tidak diperbarui? {#what-do-i-do-if-the-deposit-is-confirmed-but-the-balance-is-not-getting-updated}

Butuh 22-30 menit untuk transaksi deposit selesai. Harap tunggu beberapa waktu dan klik **Keseimbangan**

## Apa yang harus saya lakukan jika titik periksa tidak terjadi? {#what-should-i-do-if-the-checkpoint-is-not-happening}

Titik pemeriksaan kadang-kadang memakan waktu lebih dari 45 menit hingga 1 jam berdasarkan kemacetan jaringan di Ethereum, kami menyarankan menunggu sementara sebelum menaikkan tiket.

## Transaksi saya macet. {#my-transaction-is-stuck}

Kami telah mendaftarkan beberapa kesalahan umum yang mungkin dihadapi pengguna. Anda dapat menemukan solusinya di bawah gambar error. Jika Anda diperlihatkan error yang berbeda, [ajukan tiket dukungan](https://support.polygon.technology/support/home) untuk dipecahkan oleh tim kami.

  - ### Error Umum {#common-errors}
a. Penarikan macet di fase awal.

    <img src={useBaseUrl("img/wallet-bridge/plasma-progress-stuck.png")} width="357" height="800"/>

    This normally occurs when the transaction gets replaced and the wallet web application is not able to detect the replaced transaction hash. Please follow the instructions on [https://withdraw.polygon.technology/](https://withdraw.polygon.technology/) and complete your withdrawal.

  b. Error RPC

    <img src={useBaseUrl("img/wallet-bridge/checkpoint-rpc-error.png")} width="357" height="600"/>   

    The current RPC error you're facing might be due to an RPC overload.

    Please try changing your RPC and proceed with the transaction. You may follow this link [here](https://docs.polygon.technology/docs/develop/network-details/network#matic-mainnet) for more information.

  c.

  <img src={useBaseUrl("img/wallet-bridge/checkpoint-stumbled-error.png")} width="357" height="600"/>

  Ini biasanya adalah error muncul-hilang yang akan teratasi secara otomatis. Jika Anda masih menerima error yang sama saat memulai kembali langkah tersebut, jangan ragu untuk [ajukan tiket dukungan](https://support.polygon.technology/) disertai semua informasi yang relevan untuk memecahkan masalah ini lebih lanjut.


## Saya ditunjukkan error saldo tidak mencukupi. {#i-m-shown-an-insufficient-balance-error}

Penarikan dan penyetoran di jaringan Polygon murah. Untuk dipahami adalah bahwa error saldo tidak mencukupi dapat diatasi dengan mendapatkan saldo ETH di ethereum mainnet. Yang umumnya membersihkan masalah keseimbangan yang tidak cukup. Jika ini adalah transaksi pada Polygon Mainnet, kami akan mengharuskan bahwa Anda memiliki jumlah token MATIK.

## Transaksi saya tidak terlihat di penjelajah. Apa yang harus saya lakukan? {#my-transactions-are-not-visible-on-the-explorer-what-should-i-do}

Ini mungkin masalah pengindeksan dengan Polygonscan. Tolong hubungi [Tim Dukungan](https://support.polygon.technology/support/home) untuk lebih jelas.

## Saya memulai setoran di Ethereum tetapi masih menunjukkan sebagai tertunda. Apa yang harus saya lakukan? {#i-initiated-a-deposit-on-ethereum-but-it-still-shows-as-pending-what-should-i-do}

Gas yang Anda pasok mungkin terlalu rendah. Anda harus tunggu beberapa saat dan ulangi transaksi jika tidak ditambang. Jika membutuhkan bantuan tambahan, hubungi [tim dukungan](https://support.polygon.technology/support/home) disertai alamat dompet Anda, hash transaksi (jika ada), dan tangkapan layar yang relevan.

## Saya tidak mendapatkan hash transaksi dan setoran saya tidak dilewatkan? Apa yang terjadi? {#i-m-not-getting-a-transaction-hash-and-my-deposits-aren-t-going-through-what-is-happening}

Anda mungkin memiliki transaksi tertunda sebelumnya, pertama-tama batalkan atau percepat. Transaksi di Ethereum hanya bisa terjadi satu demi satu.

## Ini menunjukkan Polygon tidak membebankan biaya apa pun untuk penarikan tetapi kami harus membayar selama transaksi. {#it-shows-polygon-does-not-charge-any-amount-for-a-withdrawal-but-we-are-to-pay-during-the-transaction}

Transaksi penarikan dengan jembatan Plasma dibagi menjadi 3 langkah, satu yang terjadi di Mainnet Polygon dan dua langkah yang harus diselesaikan di Ethereum Mainnet. Di jembatan PoS, transaksi penarikan terjadi seluruhnya dalam dua langkah: Pembakaran token di jaringan Polygon dan pengiriman bukti di jaringan Ethereum. Dalam setiap kasus, pembakaran token yang terjadi di Mainnet Polygon akan berbiaya yang sangat minimal. Langkah selanjutnya yang terjadi di Ethereum Mainnet harus dibayar dalam ETH yang tergantung pada harga gas saat ini dan dapat diverifikasi [di sini](https://ethgasstation.info/).

## Saya mencoba melakukan setoran, tetapi transaksi berhenti pada langkah Setujui. {#i-was-trying-to-make-a-deposit-but-the-transaction-stopped-at-the-approve-step}

Jika transaksi masih berada di langkah **Setujui**, berarti transaksi belum selesai. Untuk melengkapinya, Anda harus membayar biaya gas dan kemudian transaksi akan dilewatkan.

## Dompet Polygon menunjukkan pesan error 'Pengguna menolak tanda tangan transaksi'. {#polygon-wallet-shows-user-denied-transaction-signature-error-message}

Ini biasanya terjadi karena pengguna membatalkan atau menolak untuk menandatangani transaksi melalui MetaMask. Ketika diminta oleh dompet MetaMask, dilanjutkan dengan menandatangani transaksi dengan mengklik **Approve** dan tidak pada **Kansel**.

## Transaksi sukses tetapi menunjukkan penunda. {#the-transaction-is-successful-but-it-shows-pending}

Jika transaksi Anda selesai dan Anda menerima dana Anda, tetapi masih menunjukkan transaksi yang menunggu di UI, Anda dapat menaikkan tiket dukungan dengan mengirim rincian yang relevan dan pengambilan layar .

## Apa daftar Bursa yang Didukung tentang Polygon? {#what-is-the-list-of-supported-exchanges-on-polygon}

Koin MATIC dapat diperdagangkan dalam banyak pertukaran. Namun, selalu penting untuk melakukan penelitian sendiri ketika Anda memilih satu untuk ditukar. Tidak biasa bahwa beberapa pertukaran terus membuat perubahan ke token yang tersedia dan juga memiliki periode pemeliharaan.

Anda mungkin mengunjungi [Coinmarketcap]([https://coinmarketcap.com/currencies/polygon/markets/](https://coinmarketcap.com/currencies/polygon/markets/)) untuk daftar pertukaran dimana Anda mungkin menemukan MATIC.

## Apakah Polygon mendukung dompet perangkat keras? {#does-polygon-support-hardware-wallets}

Ya, kami mendukung dompet hardware berikut:
1. Trezor
2. Ledger

Pengguna dapat menghubungkan opsi walet Hardware pada MetaMask dan melanjutkan transaksi mereka. Berikut adalah tautan untuk menghubungkan dompet hardware pada Metamask: https://metamask.zendesk.com/hc/en-us/articles/4408552261275

## Mengapa tanda MATIK tidak didukung pada PoS? {#why-isn-t-the-matic-token-supported-on-pos}

MATIC adalah token asli Polygon dan memiliki alamat kontrak - 0x0000000000000000000000000000000000001010 di rantai Polygon. Hal ini juga digunakan untuk membayar gas. Pemetaan token MATIC di jembatan PoS akan menyebabkan MATIC memiliki alamat kontrak tambahan pada rantai Polygon. Ini akan bertabrakan dengan alamat kontrak yang sudah ada karena alamat token baru ini tidak dapat digunakan untuk membayar gas dan harus tetap sebagai token ERC20 normal pada rantai Polygon. Oleh karena itu, untuk menghindari kebingungan ini, kami memutuskan untuk mempertahankan MATIK hanya pada Plasma.

## Bagaimana memetakan token? {#how-do-i-map-tokens}

Silakan merujuk ke [tutorial] ini (/docs/develop/ethereum-polygon/submit-mapping-request) atau Anda dapat langsung ke [Token Mapper](https://mapper.polygon.technology/).

## Apa yang harus saya lakukan jika transaksi terlalu lama atau jika harga gas terlalu tinggi? {#what-do-i-do-if-the-transaction-is-taking-too-long-or-if-the-gas-price-is-too-high}

Waktu transaksi dan harga gas bervariasi berdasarkan kemacetan jaringan dan juga ditentukan oleh pasokan dan permintaan antara penambang jaringan.

Apa yang bisa kau lakukan?
- Bersabarlah.
- Meningkatkan biaya gas jika terlalu lambat.
- Periksa biaya sebelum mengirim transaksi. Berikut ini adalah tautan untuk pelacak gas Etherscan: https://etherscan.io/gastracker

Apa yang seharusnya tidak Anda lakukan:
- Harap jangan mengatur batas gas rendah atau transaksi Anda mungkin gagal.
- Jangan mencoba untuk membatalkan transaksi. Periksa biaya sebelumnya.


## Dapatkah saya mengubah batas gas atau harga gas? {#can-i-change-the-gas-limit-or-the-gas-price}

Batas gas diperkirakan dan diatur oleh aplikasi sesuai persyaratan tertentu fungsi yang dipanggil dalam kontrak. Ini tidak boleh diedit. Hanya harga gas yang dapat diubah untuk meningkatkan atau mengurangi biaya transaksi.

## Bagaimana mempercepat transaksinya? {#how-to-speed-up-the-transactions}
Anda dapat melakukannya dengan meningkatkan biaya gas. Berikut ini tautan yang menjelaskan bagaimana melakukannya pada Metamask: https://metamask.zendesk.com/hc/en-us/articles/360015489251-How-up-or-Cancel-a-Pending-Transaction.

## Berapa banyak tanda MATIK yang cukup untuk biaya gas? {#how-much-matic-token-is-enough-for-the-gas-fee}
Pengguna harus memiliki minimal 0,01 MATIC di mainnet Polygon.

## Di mana mengajukan tiket dukungan? {#where-do-i-raise-a-support-ticket}
Jika Anda membutuhkan bantuan dari spesialis kami, silakan kirimkan pesan ke kami di https://support.polygon.technology/support/home.

## Bagaimana menjembatani aset lintas rantai? {#how-do-i-bridge-assets-across-chains}

Polygon menawarkan jembatan untuk memindahkan aset dari Ethereum ke Polygon dan sebaliknya. Anda dapat belajar lebih lanjut tentang hal itu di [bagian Bridges]([https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started](https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started)) dari wiki ini.

Namun, jika Anda menggunakan layanan eksternal yang tidak dimiliki oleh Polygon, kami menyarankan Anda untuk menghubungi layanan pelanggan mereka untuk meminta tutorial dan instruksi. Juga penting untuk melakukan penelitian sendiri ketika Anda menggunakan layanan web3.

## Saya memiliki masalah penarikan token dengan OpenSea atau aplikasi lain yang menggunakan jembatan polygon. {#i-have-a-token-withdrawal-issue-with-opensea-or-any-other-application-which-uses-polygon-bridge}

Jika Anda memiliki masalah dengan transaksi penarikan Anda terjebak, Polygon menawarkan jembatan menarik dengan [https://withdraw.polygon.technology](https://withdraw.polygon.technology) untuk membantu mengeluarkanmu dari tanah jika Anda memiliki hash bakar. Dengan alat ini, Anda akan segera diterima dan masalahnya akan terselesaikan. Pertanyaan lain mengenai transaksi Anda dengan OpenSea dan dApps lainnya harus ditangani oleh tim aplikasi.

## Saya telah ditipu. Bagaimana menarik kembali token saya? {#i-have-been-scammed-how-will-i-retrieve-my-tokens}

Sayangnya, tidak ada proses pemulihan untuk koin yang hilang. Kami meminta agar sebelum Anda melakukan transaksi, Anda pergi untuk memeriksa dan memeriksa sebelum memulai dan melaksanakannya. Perlu dicatat bahwa jaringan Polygon dan handle resmi kami tidak terlibat dalam setiap pos-pos pemberian atau tanda ganda dan kami tidak akan pernah mendekati Anda atas nama organisasi. Abaikan semua percobaan karena kemungkinan besar itu adalah penipuan. Semua komunikasi kita melalui tangan resmi

## Ada beberapa transaksi yang tidak sah di dompet saya. Apakah dompet saya diretas? {#there-are-some-unauthorized-transactions-in-my-wallet-is-my-wallet-hacked}

Sayangnya, jaringan tidak dapat mengembalikan transaksi yang tidak diinginkan.
Selalu penting untuk berhati-hati dengan kunci pribadi Anda dan **jangan pernah memberikannya kepada siapa pun**.
Jika Anda masih memiliki sisa dana, segera transfer sisa dana ke dompet baru.

## Ethereum memiliki Goerli sebagai jaringan tes. Apakah Jaringan Polygon memiliki jaringan tes juga? {#ethereum-has-goerli-as-its-test-network-does-polygon-network-have-a-test-network-too}

Karena Jaringan Ethereum memiliki Goerli sebagai jaringan ujiannya, Polygon Mainnet telah Mumbai. Semua transaksi pada jaringan tes ini akan diindeks pada Penjelajah Mumbai.

## Bagaimana aku bisa menukar token untuk token lain? {#how-can-i-swap-my-tokens-for-other-tokens}
Harap menonton video di bawah atau ikuti [tutorial ini](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#token-swap).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-token.mp4"></source>
  <p>Browser Anda tidak mendukung elemen video ini.</p>
</video>

## Swap Token terlalu lambat. {#the-token-swap-is-too-slow}

Jika Anda mencoba menukar token dan pertukaran ini memakan waktu terlalu lama, Anda bisa mencoba transaksi yang sama pada browser yang berbeda. Jika itu tidak berhasil dan Anda mengalami error, kirimkan tangkapan layar ke tim Dukungan kami.

## Token mana yang dikenakan sebagai biaya gas untuk swap token? {#which-tokens-are-charged-as-the-gas-fees-for-token-swap}
Hanya MATIC.

## Bagaimana aku bisa menukar token untuk gas? {#how-can-i-swap-my-token-for-gas}
Harap menonton video di bawah atau ikuti [tutorial ini](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#swap-for-gas).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-gas.mp4"></source>
  <p>Browser Anda tidak mendukung elemen video ini.</p>
</video>

## token mana yang dapat digunakan untuk menukar gas? {#which-tokens-can-be-used-to-swap-for-gas}
Hanya Token yang didukung untuk 'Swap for Gas': ETH, USDC, USDT, DAI, AVE, LINK, WBTC, UNI, GHST, TEL EMON, dan COMBO.

## Bagaimana cara mendapatkan ETH token? {#how-to-get-eth-tokens}
Untuk memperoleh ETH tokens, Anda dapat menukarkan mereka untuk uang token atau serat di dalam sebuah pertukaran, membelinya pada on (atau pada Metamask) atau bahkan menukar token lainnya untuk ETH menggunakan [fitur swap yang Polygon](https://wallet.polygon.technology/polygon/token-swap).

## Bagaimana mendapatkan token MATIC untuk membayar biaya gas? {#how-can-i-get-matic-tokens-to-pay-for-gas-fees}

Kami menyediakan layanan [Tukar Gas](https://wallet.polygon.technology/gas-swap/) yang akan membantu Anda. Anda pilih jumlah MATIC yang dibutuhkan untuk menyelesaikan transaksi dan Anda dapat menukarnya dengan token lain seperti Ether atau USDT. Perlu dicatat bahwa ini adalah **transaksi tanpa gas**.

## Di mana mendapatkan token MATIC secara langsung? {#where-can-i-get-matic-tokens-directly}

Jadi token MATIC dapat dibeli dari pertukaran yang terpusat ([Binance](https://www.binance.com/en), [(Binance](https://www.coinbase.com/), et.al) atau Decentralized ([Uniswap](https://uniswap.org/), [QuickSwap](https://quickswap.exchange/#/swap)). Anda juga dapat melakukan penelitian dan mencoba beberapa on-ramp seperti [Transak](https://transak.com/), dan [Ramp](https://ramp.network/). Tujuan pembelian koin MATIC Anda juga harus menentukan dari mana Anda akan membelinya dan jaringannya. Dianjurkan untuk memiliki MATIC pada mainnet Ethereum jika niat Anda baik membuat atau delegasi. Jika maksud Anda adalah transaksi pada Polygon Mainnet, Anda harus memegang dan bertransaksi dengan MATIC di Mainnet.





