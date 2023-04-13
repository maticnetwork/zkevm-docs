---
id: move-stake
title: Memindahkan Stake
description: Memindahkan stake Anda pada jaringan poligon
keywords:
  - docs
  - polygon
  - matic
  - stake
  - move stake
  - validator
  - delegator
slug: move-stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Memindahkan stake dari node Foundation ke node Eksternal {#moving-stake-from-foundation-nodes-to-external-nodes}

<video loop autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/staking/MoveStakeDemo.mp4"></source>
  <source type="video/quicktime" src="/img/staking/MoveStakeDemo.mov"></source>
  <p>Browser Anda tidak mendukung elemen video ini.</p>
</video>

Delegator sekarang dapat memilih untuk memindahkan stake mereka dari node Foundation ke node Eksternal menggunakan fungsi Pindahkan Stake di UI Staking.

Memindahkan stake dari node Foundation ke Eksternal merupakan transaksi tunggal. Jadi, tidak ada penundaan atau periode unbonding selama acara ini.

Harap diperhatikan bahwa Memindahkan Stake hanya diperbolehkan dari node Foundation ke node Eksternal. Jika Anda ingin memindahkan stake di antara node Eksternal, Anda harus melakukan Unbound terlebih dahulu lalu melakukan Delegasi pada node eksternal baru.

Selain itu, fungsi Pindahkan Stake adalah fungsi sementara yang dikembangkan oleh tim Polygon untuk memastikan kelancaran transisti dana dari node Foundation ke Eksternal. Fungsi ini akan tetap aktif hanya sampai node Foundation dinonaktifkan.

## Cara Memindahkan Stake {#how-to-move-stake}

Untuk memindahkan, pertama Anda harus masuk ke [UI Staking](https://wallet.polygon.technology/staking) menggunakan Alamat Delegator.

Alamat **Delegator:** Alamat yang telah Anda gunakan untuk Staking di Node Foundation.

Setelah log masuk, Anda akan melihat daftar Validator.

<img src={useBaseUrl("img/staking/validator-list.png")} />

Sekarang pergi ke Profil Delegator Anda dengan mengklik tombol **Detail Rincian Pertunjukan** Delegator atau Pilihan **Detail Delegator My Delegator** di kiri.

<img src={useBaseUrl("img/staking/show-delegator-details.png")} />

Di sini Anda akan menemukan tombol baru yang disebut **Move Stake**.

<img src={useBaseUrl("img/staking/move-stake-button.png")} />

Klik tombol ini untuk membuka halaman yang berisi daftar validator yang dapat Anda delegasikan. Anda dapat mendelegasikan ke validator mana pun di daftar ini.

<img src={useBaseUrl("img/staking/move-stake-validator.png")} />

Sekarang setelah memilih validator yang ingin Anda delegasi untuk, klik pada **tombol Delegate Di** sini. Menampilkan pada tombol itu akan membuka jendela popup.

<img src={useBaseUrl("img/staking/stake-funds.png")} />

Di sini Anda akan melihat lapangan **Jumlah** yang akan secara otomatis padat dengan jumlah keseluruhan untuk Delegasi. Anda juga dapat menggunakan sebagian jumlah untuk didelegasikan ke validator.

Misalnya, Jika Anda telah mendelegasikan 100 token Matic ke node 1, dan sekarang Anda ingin memindahkan stake dari node Foundation ke node Eksternal, Anda dapat mendelegasikan sebagian jumlah ke node Eksternal yang Anda pilih, katakanlah 50 token Matic. Sisa 50 token Matic akan tetap berada di node Foundation 1. Anda kemudian dapat memilih untuk mendelegasikan 50 token lainnya ke node Eksternal lain atau node Eksternal yang sama.

Setelah Anda telah memasuki jumlah yang dapat Anda klik pada tombol **Dana** Stake. Anda kemudian akan dimintai konfirmasi di Metamask untuk menandatangani alamat.

Setelah Anda menandatangani transaksi, stake Anda akan berhasil dipindahkan dari node Foundation ke node Eksternal. Namun, Anda harus menunggu 12 konfirmasi blok untuk menampilkan stake di UI Staking. Jika dana yang Anda pindahkan tidak muncul setelah 12 konfirmasi blok, coba segarkan halaman sekali untuk melihat stake terbaru.

Jika Anda memiliki pertanyaan atau masalah apa pun, silakan kirimkan tiket [di sini](https://support.polygon.technology/support/home).
