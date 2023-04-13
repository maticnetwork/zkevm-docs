---
id: contributor-guidelines
title: Cara Berkontribusi
sidebar_label: Contributor guidelines
description: Bersiaplah untuk kontribusi mendatang
keywords:
  - docs
  - matic
  - polygon
  - contribute
  - contributor
  - contributing
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: orientation
---

:::tip
Jangan ragu untuk [menaikkan masalah pada repositori Polygon Wiki](https://github.com/maticnetwork/matic-docs/issues)
:::

## Identifikasi topik untuk Berkontribusi {#identify-an-area-to-contribute-to}

Ada beberapa cara mengidentifikasi topik untuk kontribusi Anda ke Wiki:

- Cara termudah yaitu menghubungi salah satu [pemelihara Wiki](/docs/contribute/community-maintainers) 
yang bertuliskan, "Saya ingin berkontribusi ke Polygon Wiki". Mereka akan berupaya menemukan
topik untuk kontribusi Anda.
- Jika Anda ingin melakukan berkontribusi tertentu, tetapi tidak yakin tentang hal itu, konfirmasikan apakah
kontribusi yang tepat dengan menghubungi salah satu [pemelihara Wiki](/docs/contribute/community-maintainers) secara langsung.
- Jika tidak ada kontribusi tertentu, Anda juga dapat menjelajahi topik
yang berlabel `help wanted` di [repositori GitHub Polygon](https://github.com/maticnetwork).
- Topik yang juga memiliki label `good first issue` dianggap cocok bagi
pemula.

## Tambah dokumentasi Polygon {#add-to-the-polygon-documentation}

  - Jika Anda ingin menambah atau mengubah apa pun di Polygon Wiki, silakan ajukan PR
  kepada cabang `master` (lihat contoh PR).
  - Tim dokumentasi akan meninjau PR atau menghubungi Anda.
  - Repositori: https://github.com/maticnetwork/matic-docs
  - Contoh PR: https://github.com/maticnetwork/matic-docs/pull/360

:::tip
Jika Anda ingin menjalankan Wii secara lokal di mesin Anda, periksa bagian [yang menjalankan Wiki.](https://github.com/maticnetwork/matic-docs#run-the-wiki-locally) Jika Anda menambahkan dokumen baru, itu disarankan untuk memiliki ringkasan dasar/pengenalan dan tautan ke Github atau dokumentasi untuk lebih lanjut.
:::

## Aturan Git {#git-rules}

Kami menggunakan `gitchangelog`untuk semua repo kami terkait perubahan log. Maka, kita perlu
mematuhi kaidah berikut untuk pesan commit. Tidak akan ada penggabungan jika Anda
tidak mengikuti kaidah ini.

### Kaidah pesan commit {#commit-message-convention}

Berikut adalah saran yang mungkin berguna untuk penambahan di pesan
commit Anda. Anda mungkin ingin memilah commit menjadi beberapa bagian utama:

- berdasarkan maksud (misalnya: baru, perubahan ...)
- berdasarkan objek (misalnya: dokumentasi, pengemasan, kode ...)
- berdasarkan audiens (misalnya: pengembang, penguji, pengguna ...)

Selain itu, Anda mungkin ingin menandai beberapa commit:

- Sebagai commit “minor” yang tidak akan terekam dalam changelog (perubahan tampilan,
salah ketik kecil dalam komentar...).
- Sebagai “refactor” jika Anda tidak membuat perubahan fitur yang signifikan. Sehingga, hal ini
juga tidak akan terekam di changelog yang ditampilkan ke pengguna akhir, misalnya, tetapi
mungkin akan berguna jika Anda memiliki changelog pengembang.
- Anda juga dapat memberi tag "api" untuk menandai perubahan API atau jika itu API baru atau semacamnya.

Cobalah menulis pesan commit dengan menargetkan fungsionalitas pengguna sesering mungkin.

:::note Contoh

Ini adalah log git standar `--oneline` untuk menampilkan bagaimana informasi ini dapat disimpan:

```
* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor
```

:::

Untuk info lebih lanjut silakan merujuk ke
[Apakah Cara Terbaik untuk Mengelola Changelog Menggunakan Git?](https://stackoverflow.com/questions/3523534/good-ways-to-manage-a-changelog-using-git/23047890#23047890).

Untuk perincian lebih lanjut, lihat [https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/).
