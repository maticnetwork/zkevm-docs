---
id: connext
title: Transfer lintas rantai menggunakan Connext
description: Buat aplikasi blockchain selanjutnya di Polygon.
keywords:
  - docs
  - matic
  - connext
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Connext adalah jaringan likuiditas lintas rantai yang mendukung pertukaran nonkustodial lengkap dan cepat antara rantai yang kompatibel dengan evm dan sistem L2 Ethereum.

Ethereum akan menjadi multirantai. Dengan meningkatnya adopsi rantai yang kompatibel dengan evm dan L2, tantangan baru telah muncul dalam fragmentasi likuiditas di dalam ekosistem tersebut. Connext menyelesaikan masalah ini dengan menghubungkan kumpulan likuiditas terpisah pada masing-masing rantai ke dalam jaringan global, tanpa menimbulkan pertimbangan kepercayaan signifikan yang baru bagi pengguna. Pengembang dapat memanfaatkan likuiditas ini untuk membangun kelas baru dApp rantai-agnostik secara asli di Connext.

Pada tingkat tinggi, Connext memungkinkan pengguna menukar assetA di chainA untuk assetB pada chainB menggunakan transfer bersyarat. Ini bisa dilakukan dalam beberapa langkah sederhana:

Alice, pengguna Connext, mengirim transfer bersyarat assetA kepada Bob.
Bob, penyedia likuiditas (alias router), mengirimkan jumlah assetB yang setara kepada Alice.
Alice membuka kunci transfer bersyaratnya untuk menerima assetB, yang kemudian memungkinkan Bob melakukan hal yang sama.
Router membentuk tulang punggung jaringan kami yang menyediakan likuiditas pada rantai berbeda dan biaya penghasilan untuk melakukannya. Anda dapat mempelajari lebih lanjut tentang cara kerjanya di Protokol Utama kami.

Untuk mengatur transfer silsilah dari Testnet Ethereum Goerli ke Testnet Mumbai Polygon dalam dApp peramban yang mohon melalui [panduan](https://docs.connext.network/quickstart-polygon-matic-integration) ini.
