---
id: delegator-faq
title: FAQ Delegator
sidebar_label: Delegator FAQ
description: FAQ yang terkait dengan Delegasi pada jaringan Polygon
keywords:
  - docs
  - polygon
  - how to delegate
  - validator
  - stake
  - faq
  - delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

### Apa itu URL Dashboard Staking? {#what-is-the-staking-dashboard-url}

URL dashboard yang sedang menyeluruh adalah https://staking.polygon.technology/.

### Berapa jumlah stake minimum? {#what-is-the-minimum-stake-amount}

Tidak ada jumlah stake minimum untuk didelegasikan. Namun, Anda dapat selalu memulai dengan token 1 MATIK.

### Berapa jumlah imbalan yang akan saya dapatkan jika saya mendelegasikan? {#how-many-rewards-will-i-get-if-i-delegate}

Silakan gunakan [Staking Reward Calculator](https://staking.polygon.technology/rewards-calculator) untuk menentukan perkiraan Anda.

### Mengapa transaksi saya membutuhkan waktu sangat lama? {#why-does-my-transaction-take-so-long}

Untuk alasan keamanan, semua transaksi staking Polygon dilakukan di Ethereum.

Waktu yang dibutuhkan untuk menyelesaikan transaksi tergantung pada biaya gas yang telah Anda izinkan serta kongesti jaringan Ethereum mainnet saat itu. Anda selalu dapat menggunakan opsi “Speed Up” untuk meningkatkan biaya gas sehingga transaksi Anda dapat segera selesai.

### Dompet mana yang saat ini didukung? {#which-wallets-are-currently-supported}

Saat ini, hanya ekstensi Metamask di browser desktop dan Dompet Coinbase yang didukung. Selain itu Anda dapat menggunakan WalletConnect dan Walletlink dari dompet bergerak yang didukung untuk berinteraksi dengan dashboard UI Staking di desktop / laptop. Kami akan segera mendambahkan dukungan untuk dompet lain secara bertahap.

### Apakah dompet perangkat keras didukung? {#are-hardware-wallets-supported}

Ya, dompet perangkat keras didukung. Anda dapat menggunakan opsi “Hubungkan Dompet Perangkat Keras” di Metamask dan menghubungkan dompet perangkat keras Anda lalu menanjutkan proses delegasi.

### Mengapa saya tidak dapat melakukan stake langsung dari Binance? {#why-can-t-i-stake-directly-from-binance}

Staking melalui Binance belum didukung. Akan ada pengumuman jika dan ketika Binance mulai mendukungnya.

### Saya telah menyelesaikan delegasi. Di mana saya dapat memeriksa detailnya? {#i-have-completed-my-delegation-where-can-i-check-details}

Setelah Anda telah menyelesaikan delegasi Anda, tunggu konfirmasi 12 blok di Ethereum (sekitar 3-5 menit), kemudian pada Dasboard, Anda dapat klik pada **Akun Saya**.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### Di mana saya dapat memeriksa imbalan saya? {#where-can-i-check-my-rewards}

Pada Dashboard, Anda dapat klik pada opsi **Akun saya** di sisi kiri.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### Apakah saya perlu ETH untuk membayar biaya gas? {#do-i-need-eth-to-pay-for-gas-fees}

Ya. Anda harus menyiapkan ~0,05-0,1 ETH agar aman.

### Apakah saya perlu menyetor token Matic ke jaringan Mainnet Polygon untuk staking? {#do-i-need-to-deposit-matic-tokens-to-the-polygon-mainnet-network-for-staking}

Tidak. Semua dana Anda harus berada di Jaringan Ethereum Utama.

### Ketika saya mencoba melakukan transaksi, tombol Konfirmasi dinonaktifkan. Mengapa demikian? {#when-i-try-to-do-the-transaction-my-confirm-button-is-disabled-why-so}

Harap periksa apakah Anda memiliki ETH yang cukup untuk biaya gas.

### Kapan imbalan akan didistribusikan? {#when-does-reward-get-distributed}

Imbalan didistribusikan setelah titik periksa dikirim.

Saat ini, token MATIC 20188 didistribusikan secara proporsional pada setiap penyerahan pos pemeriksaan yang sukses ke setiap delegasi berdasarkan saham mereka relatif terhadap kolam menyeluruh keseluruhan semua validator dan delegator. Selain itu, persentase imbalan yang didistribusikan kepada setiap delegator akan berbeda-beda di setiap titik periksa tergantung pada stake relatif dari delegator, validator, dan keseluruhan stake.

(Perhatikan bahwa ada bonus pengusul 10% yang diperoleh validator yang mengirimkan titik periksa, tetapi seiring waktu, efek bonus tambahan dibatalkan pada beberapa titik periksa oleh validator yang berbeda.)

Pengiriman titik periksa dilakukan oleh salah satu validator kurang lebih setiap 34 menit. Durasi ini hanyalah perkiraan dan mungkin berbeda-beda tergantung pada konsensus validator di lapisan Polygon Heimdal. Durasinya mungkin juga bervariasi tergantung pada Jaringan Ethereum. Kemacetan yang lebih buruk di jaringan dapat mengakibatkan penundaan titik periksa.

Anda dapat melacak [titik](https://etherscan.io/address/0x86e4dc95c7fbdbf52e33d563bbdb00823894c287) pemeriksaan di kontrak staking di sini

### Mengapa imbalan terus menurun di setiap titip periksa? {#why-does-reward-keep-getting-decreased-every-checkpoint}

Imbalan sebenarnya yang diperoleh tergantung pada total pasokan terkunci aktual di jaringan pada setiap titik periksa. Ini diperkirakan akan bervariasi secara signifikan karena semakin banyak token MATIC yang terkunci di kontrak staking.

Hadiah akan lebih tinggi di awal dan terus berkurang seiring dengan naiknya % pasokan yang terkunci. Perubahan pasokan yang terkunci ini ditangkap di setiap titik periksa, dan imbalan dihitung berdasarkan perubahan ini.

### Bagaimana cara mengeklaim imbalan? {#how-can-i-claim-my-rewards}

Anda dapat mengklaim imbalan langsung dengan mengklik tombol **Penawar.** Imbalan yang terkumpul kemudian akan ditransfer ke akun delegasi Anda di Metamask.

<div>
  <img src={useBaseUrl("/img/delegator-faq/withdraw-reward.png")} />
</div>

### Apa itu periode unbonding? {#what-is-the-unbonding-period}

Sekarang, periode unbonding di Polygon adalah sekitar 9 hari. Sebelumnya, periode unbonding adalah 19 hari. Periode ini berlaku untuk jumlah yang awalnya didelegasikan dan jumlah yang didelegasikan - tidak berlaku untuk penghargaan apapun yang tidak didelegasikan kembali.

### Apakah saya akan terus menerima imbalan setelah saya memutuskan ikatan? {#will-i-keep-receiving-rewards-after-i-unbond}

Tidak. Setelah Anda tidak terikat, Anda akan berhenti menerima penghargaan.

### Berapa jumlah transaksi yang dibutuhkan untuk delegasi? {#how-many-transactions-does-the-delegation-require}

Delegasi membutuhkan 2 transaksi, satu demi yang lain. Satu untuk **membuktikan** permintaan dan yang lain untuk **Deposit**.

<div>
  <img src={useBaseUrl("/img/delegator-faq/delegate.png")} />
</div>

### Apa maksud dari Delegasikan Ulang Imbalan? {#what-does-redelegate-rewards-mean}

Meningkatkan imbalan Anda hanya berarti bahwa Anda ingin meningkatkan Redelegating dengan memperpanjang imbalan yang telah Anda akumulasi.

### Dapatkah saya melakukan stake ke validator? {#can-i-stake-to-any-validator}

Ya. Saat ini, semua validator adalah node Foundation Polygon.

Kami sedang melakukan peluncuran bertahap dari mainnet Polygon. Kemudian, validator eksternal akan disiapkan secara bertahap. Untuk informasi lebih lanjut, silakan lihat https://blog.matic.network/mainnet-is-going-live-announcing-the-launch-sequence/.

### Browser mana yang kompatibel dengan Dashboard Staking? {#which-browser-is-compatible-with-staking-dashboard}

Chrome, Firefox, dan Brave

### Metamask saya macet saat mengonfirmasi setelah masuk, apa yang harus saya lakukan? Atau, tidak terjadi apa pun ketika saya mencoba untuk masuk? {#my-metamask-is-stuck-at-confirming-after-login-what-do-i-do-or-nothing-happens-when-i-try-to-login}

Periksa hal berikut:

- Jika Anda menggunakan Brave, silakan matikan opsi untuk **Use Crypto Wallets** di panel pengaturan.
- Periksa apakah Anda telah masuk ke Metamask
- Periksa apakah Anda telah masuk ke Metamask dengan Trezor/Ledger. Anda juga perlu mengaktifkan izin untuk memanggil kontrak di perangkat Ledger, jika belum aktif.
- Periksa timestamp sistem Anda. Jika waktu sistem tidak tepat, Anda harus memperbaikinya.

### Bagaimana cara mengirim dana dari Binance atau bursa lainnya ke dompet Polygon? {#how-do-i-send-funds-from-binance-or-other-exchanges-to-polygon-wallet}

Secara teknis, antarmuka Polygon Wallet Suite/Staking merupakan aplikasi web. Saat ini mendukung dompet berikut - Metamask, WalletConnect, dan WalletLink.

Pertama, Anda harus menarik dana dari Binance atau pertukaran lain ke alamat Ethereum Anda di Metamask. Jika Anda tidak tahu cara menggunakan Metamask, cari tahu di Google. Ada banyak video dan blog tentang cara memulai menggunakan Metamask.

### Kapan aku bisa menjadi validator dan berapa banyak token yang aku lakukan untuk itu? {#when-can-i-become-a-validator-and-how-many-tokens-do-i-for-that}

Pengguna dapat menjadi validator hanya jika kondisi berikut terjadi:
1. Ketika validator memutuskan untuk melepaskan stake dari jaringan,
2. Tunggu mekanisme lelang dan ganti validator yang tidak aktif.

Stake minimum tergantung pada proses lelang di mana seorang pengguna mengalahkan pengguna lain.

### Apa yang akan terjadi jika saya mendapatkan imbalan saat mendelegasikan dan jika saya menambahkan dana tambahan ke node validator yang sama? {#if-i-have-earned-rewards-while-delegating-and-if-i-add-additional-funds-to-the-same-validator-node-what-happens}

Jika Anda tidak mendelegasikan ulang imbalan sebelum mendelegasikan dana tambahan ke node validator yang sama, imbalan Anda akan ditarik secara otomatis.

Jika Anda tidak ingin hal ini terjadi, delegasikan ulang imbalan Anda sebelum mendelegasikan dana tambahan.

### Saya telah mendelegasikan token melalui Metamask di dashboard Staking. Apakah sistem atau perangkat saya harus selalu aktif? {#i-have-delegated-my-tokens-via-metamask-on-the-staking-dashboard-do-i-need-to-keep-my-system-or-device-on}

Tidak. Setelah transaksi Delegasi dikonfirmasi, dan Anda dapat melihat token yang tercermin dalam bagian **Total Stake** dan **New Reward**, maka Anda selesai. Tidak perlu mengaktifkan sistem atau perangkat.

### Aku belum terikat, berapa lama yang dibutuhkan untuk Unbond? {#i-have-unbonded-how-long-will-it-take-to-unbond}

Periode unbonding saat ini ditetapkan menjadi 82 titik periksa. Ini sekitar 9 hari. Setiap titik periksa membutuhkan waktu sekitar 34 menit. Namun, beberapa titik periksa dapat ditunda hingga ~1 jam karena ada kongesti di Ethereum.

### Saya telah tidak terikat, dan sekarang saya lihat tombol Stake Claim, tetapi itu tidak aktif, mengapa begitu? {#i-have-unbonded-and-i-now-see-the-claim-stake-button-but-it-is-disabled-why-is-that}

Tombol Klaim Stake hanya akan diaktifkan setelah periode unbonding Anda selesai. Periode unbonding saat ini ditetapkan ke 82 titik periksa.

### Apakah saya dapat mengetahui kapan tombol Klaim Stake akan diaktifkan? {#do-i-know-when-will-the-claim-stake-button-be-enabled}

Ya, di bawah tombol Klaim Stake, Anda akan melihat catatan tentang berapa jumlah titik periksa yang tertunda sebelum tombol Klaim Stake diaktifkan. Setiap titik periksa membutuhkan waktu sekitar 30 menit. Namun, beberapa titik periksa dapat ditunda hingga ~1 jam karena ada kongesti di Ethereum.

<div>
  <img src={useBaseUrl("/img/delegator-faq/unbond.png")} />
</div>

### Bagaimana cara mengubah delegasi dari Node Foundation ke node Eksternal? {#how-do-i-switch-my-delegation-from-foundation-nodes-to-external-nodes}

Anda dapat mengubah Delegasi menggunakan opsi **Pindahkan Stake** di UI Staking. Ini akan mengubah Delegasi dari node Foundation ke node eksternal lain yang Anda pilih.

<div align="center">
  <img src={useBaseUrl("/img/delegator-faq/move-stake.png")} width="500" />
</div>

Anda akan melihat daftar validator lain:

<div>
  <img src={useBaseUrl("/img/delegator-faq/validators.png")} />
</div>

### Apakah akan ada periode unbonding ketika saya mengubah Delegasi dari node Foundation ke eksternal? {#will-there-be-any-ubonding-period-when-i-switch-delegation-from-foundation-nodes-to-external-nodes}

Tidak akan ada periode unbonding ketika Anda mengubah Delegasi dari node foundation ke eksternal. Perubahan ini akan langsung diterapkan tanpa penundaan. Namun, jika Anda melakukan unbonding dari node Foundation atau Eksternal, akan ada periode unbonding untuk itu.

### Apakah ada persyaratan khusus untuk memilih node eksternal saat beralih delegasi? {#are-they-any-specifics-to-choose-an-external-node-during-switch-delegation}

Tidak. Anda dapat memilih node apa pun yang Anda inginkan.

### Apa yang akan terjadi pada imbalan saya yang terkumpul jika saya beralih delegasi dari node Foundation ke Eksternal? {#what-happens-to-my-rewards-that-are-accumalated-if-i-switch-delegation-from-foundation-to-external-node}

Jika Anda belum mengeklaim imbalan sebelum beralih delegasi, maka setelah berhasil mengubah delegasi dari Foundation ke Eksternal, imbalan yang terkumpul sampai saat itu akan ditransfer kembali ke akun Anda.

### Apakah cara kerja delegasi pada node Eksternal sama dengan cara kerja pada node Foundation? {#will-delegation-on-the-external-nodes-work-the-same-as-foundation-nodes}

Ya, itu akan bekerja sama dengan node Foundation.

### Apakah saya masih mendapatkan imbalan setelah mendelegasikan ke node Eksternal? {#will-i-still-get-rewards-after-delegating-to-an-external-node}

Ya, imbalan akan tetap dibagikan sama seperti sebelumnya dengan node Foundation. Setiap kali berhasil mengirimkan titik periksa, Anda akan mendapatkan imbalan. Imbalan akan didistribusikan dan dihitung di setiap titik periksa tergantung pada rasio stake, seperti yang diterapkan saat ini.

### Apakah akan ada periode unbonding jika saya unbond dari node Eksternal? {#will-there-be-any-unbonding-period-if-i-unbond-from-an-external-node}

Ya, periode unbonding akan tetap sama seperti yang berlaku saat ini. 82 Titik Periksa.

### Apakah akan ada periode penguncian setelah saya mengubah delegasi saya dari node Foundation ke Eksternal? {#will-there-be-any-locking-period-after-i-switch-my-delegation-from-foundation-to-external-node}

Tidak. Tidak akan ada periode penguncian setelah Anda mengubah delegasi.

### Dapatkah saya mengubah sebagian delegasi dari node Foundation ke Eksternal? {#can-i-partially-switch-my-delegation-from-foundation-to-external-nodes}

Ya. Anda akan memiliki opsi untuk memindahkan sebagian stake dari node Foundation ke Eksternal. Sebagian stake yang tersisa akan tetap berada di node Foundation. Anda kemudian dapat memindahkan stake tersebut ke node lain yang Anda pilih atau ke node yang sama.

### Dapatkah saya mengubah delegasi dari node eksternal ke node eksternal lain? {#can-i-switch-delegation-from-an-external-node-to-another-external-node}

Tidak, opsi **Pindahkan Stake** hanya tersedia di Node Foundation. Jika Anda ingin mengubah delegasi dari satu node eksternal ke node eksternal lain, Anda harus melakukan unbond terlebih dahulu kemudian mendelegasikan ke node eksternal lain.

### Kapan node Foundation akan dinonaktifkan? {#when-will-the-foundations-node-be-turned-off}

Node fondasi akan dimatikan pada akhir Januari 2021.

### Apakah akan ada node Foundation di masa depan? {#will-there-be-any-foundation-nodes-in-the-future}

Tidak, tidak akan ada node foundation apa pun di masa mendatang.

### Berapa banyak transaksi yang saya butuhkan untuk membayar Gas ketika saya memindahkan stake? {#how-many-transactions-do-i-need-to-pay-for-gas-when-i-do-a-move-stake}

Pindahkan Stake adalah transaksi tunggal saja. Semua transaksi akan berada di Blockchain Ethereum sehingga Anda harus menggunakan sebagian ETH saat melakukan transaksi Pindahkan Stake.
