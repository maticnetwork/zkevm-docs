---
id: stakingmanager
title: Manajer Staking
description: Staking Manager adalah kontrak utama untuk menangani kegiatan yang berhubungan dengan validator di jaringan Polygon.
keywords:
  - docs
  - Staking Manager
  - polygon
  - wiki
  - validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Untuk konsensus berbasis Polygon's of Security yang Polygon, semua verifikasi pembuktian 2+1 dan penanganan staking, imbalan dieksekusi pada kontrak pintar Ethereum. Desain keseluruhannya mengikuti gagasan ini untuk mengerjakan sedikit pada kontrak Mainnet. Ini melakukan verifikasi informasi dan mendorong semua operasi komputasi ke L2 (baca tentang [Heimdall](https://wiki.polygon.technology/docs/pos/heimdall/overview)).

**Staker** dibagi menjadi **validator**, **delegasi**, dan **pengawas** (untuk pelaporan).

[**StakeManager**](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/stakeManager/StakeManager.sol) adalah kontrak utama untuk menangani validator kegiatan terkait seperti verifikasi `checkPoint`tanda, distribusi upah, dan manajemen stake. Karena kontrak menggunakan **NFT ID** sebagai sumber kepemilikan, perubahan kepemilikan dan penandatangan tidak akan mempengaruhi apa pun dalam sistem.

:::tip

Dari satu alamat Ethereum, **Staker hanya dapat menjadi validator atau delegasi** (itu hanya pilihan desain, tidak ada alasan yang keras).

:::

## Validator Pengakuan / Penggantian {#validator-admissions-replacement}

### Menampilkan {#admissions}
Saat ini, tidak ada slot validator yang tersedia di Polygon PoS. Ada juga daftar tunggu untuk menjadi valid. Di masa depan, jika slot tersedia, validator dapat diterapkan untuk dipertimbangkan dan dihapus dari daftar pelayan.


### Penggantian {#replacement}
PIP4 memperkenalkan konsep menampilkan kinerja validator untuk visibilitas komunitas. Jika validator dalam keadaan yang tidak sehat untuk jangka waktu yang panjang seperti yang diuraikan dalam PIP4, mereka tidak dijaga dari jaringan. Slot validator kemudian dibuat untuk yang datang dari daftar tunggu.

:::info

Saat ini, [<ins>Tahap 2 dari BAGIAN C dalam PIP4</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956/24) sedang diimplementasikan. Ini adalah tempat komunitas memutuskan pada kriteria evaluasi validator. Pada waktu itu, latihan ini akan menghasilkan proses aplikasi dan penerimaan.

:::

## Metode dan Variabel {#methods-and-variables}

:::caution Implementasi slash

`jail``unJail`, dan `slash`fungsi tidak digunakan saat ini sebagai bagian dari implementasi slashing.

:::

### validatorThreshold {#validatorthreshold}

Ini menyimpan jumlah maksimum validator yang diterima oleh sistem, juga disebut slot.

### AccountStateRoot {#accountstateroot}

- Untuk berbagai akuntansi yang dilakukan pada Heimdall untuk validator dan delegator, root akun diajukan ketika mengajukan `checkpoint`.
- accRoot digunakan sementara `claimRewards`dan`unStakeClaim`

### / {#stake-stakefor}

```solidity title="StakeManager.sol"
function stake(
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes calldata signerPubkey
) public;

function stakeFor(
    address user,
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes memory signerPubkey
) public;
```

- Memungkinkan siapapun dengan jumlah (dalam token MATIK) lebih besar `minDeposit`dari `currentValidatorSetSize`jika lebih kecil`validatorThreshold`
- Harus `amount+heimdallFee`mentransfer , menempatkan validator ke periode lelang untuk sebuah lelang (lebih banyak dalam bagian Auction).
- `updateTimeLine`update struktur data timeline khusus, yang menyimpan trek validator aktif dan stake aktif untuk hitungan epoch / checkpoint yang diberikan.
- Satu `NFT`unik dicetak pada setiap panggilan baru `stake`atau `stakeFor`panggilan yang dapat ditransfer ke siapa saja tetapi dapat memiliki alamat 1:1 Ethereum.
- `acceptDelegation`diatur ke benar jika validator ingin menerima delegasi, `ValidatorShare`kontrak disebarkan untuk validator.

### Unstake {#unstake}

- Hapus validator dari validator yang ditetapkan dalam epoch berikutnya (hanya valid untuk titik pemeriksaan saat ini yang pernah `unstake`disebut)
- Menghapus stake validator dari struktur data lini masa, memperbarui penghitungan untuk jangka waktu keluar validator.
- Jika validator memiliki delegasi, mengumpulkan semua penghargaan dan kontrak delegasi kunci untuk delegasi baru.

### unstakeClaim {#unstakeclaim}

```solidity
function unstakeClaim(uint256 validatorId) public;
```

- `unstaking`Setelah validator dimasukkan ke dalam periode penarikan sehingga dapat dipotong, jika ada penipuan yang ditemukan `unstaking`setelah penipuan masa lalu.
- Setelah `WITHDRAWAL_DELAY`periode disajikan, validator dapat memanggil fungsi ini dan melakukan penyelesaian dengan `stakeManager`(mendapatkan imbalan jika ada, mendapatkan token yang ditusuk, membakar NFT, dll).

### Restake {#restake}

```solidity
function restake(uint256 validatorId, uint256 amount, bool stakeRewards) public;
```

- Memungkinkan validator menambah stake mereka dengan menaruh jumlah baru atau imbalan atau keduanya.
- Harus memperbarui garis waktu (jumlah) untuk tiang yang aktif.

### withdrawRewards {#withdrawrewards}

```solidity
function withdrawRewards(uint256 validatorId) public;
```

Metode ini memungkinkan validator untuk menarik akumulasi image, harus mempertimbangkan mendapatkan imbalan dari kontrak delegasi jika validator menerima delegasi.

### updateSigner {#updatesigner}

```solidity
function updateSigner(uint256 validatorId, bytes memory signerPubkey) public
```

Metode ini memungkinkan validator untuk memperbarui alamat penandatangan (yang digunakan untuk memvalidasi blok pada blockchain dan tanda tangan titik pemeriksaan pada `stakeManager`).

### topUpForFee {#topupforfee}

```solidity
function topUpForFee(uint256 validatorId, uint256 heimdallFee) public;
```

Validator dapat meningkatkan keseimbangan mereka untuk biaya Heimdall dengan invoking metode ini.

### claimFee {#claimfee}

```solidity
function claimFee(
        uint256 validatorId,
        uint256 accumSlashedAmount,
        uint256 accumFeeAmount,
        uint256 index,
        bytes memory proof
    ) public;
```

Metode ini digunakan untuk menarik biaya dari Heimdall. diperbarui pada setiap titik pemeriksa, sehingga validator dapat memberikan bukti inklusi dalam akar ini untuk memperhitungkan `accountStateRoot`Heimdall dan menarik biaya .

Perlu diperhatikan `accountStateRoot`bahwa ditulis ulang untuk mencegah keluarnya pada beberapa titik pemeriksaan (untuk akar lama dan menyimpan akuntansi di `stakeManager``accumSlashedAmount`). tidak digunakan pada saat ini dan akan digunakan untuk mengiringi Heimdall jika diperlukan.

### StakingNFT {#stakingnft}

Kontrak standar ERC721 dengan beberapa batasan seperti satu token per pengguna dan dicetak secara berurutan.

### startAuction {#startauction}

```solidity
function startAuction(
    uint256 validatorId, /**  auction for validator */
    uint256 amount /**  amount greater then old validator's stake */
    ) external;
```

Untuk memulai tawaran atau tawaran yang lebih tinggi pada lelang yang telah berjalan, fungsi ini digunakan. Periode Auction berjalan dalam siklus seperti `(auctionPeriod--dynasty)--(auctionPeriod--dynasty)--(auctionPeriod--dynasty)`sehingga **harus memeriksa untuk periode lelang yang benar.**

`perceivedStakeFactor`digunakan untuk menghitung stake factor*old (perlu dicatat saat ini adalah sebagai default 1 WIP untuk memilih fungsi). **Harus memeriksa lelang dari periode lelang terakhir jika masih terjadi** (seseorang dapat memilih untuk tidak `confirmAuction`memanggil agar modal mereka keluar dalam lelang berikutnya). Pelelangan panjang biasanya berlangsung dalam satu `auctionPeriod`.

### confirmAuctionBid {#confirmauctionbid}

```solidity
function confirmAuctionBid(
        uint256 validatorId,
        uint256 heimdallFee, /** for new validator */
        bool acceptDelegation,
        bytes calldata signerPubkey
    ) external
```

- **Harus memeriksa bahwa ini bukan Periode lelang.**
- Jika penawar terakhir adalah pemilik dari `validatorId`, perilaku harus mirip dengan restake.
- Dalam kasus kedua, lakukan unstake `validatorId` dan tambahkan pengguna baru sebagai validator dari titik periksa berikutnya, untuk perilaku pengguna baru harus sama seperti untuk melakukan stake/stakeFor.

### checkSignatures {#checksignatures}

```solidity
function checkSignatures(
        uint256 blockInterval,
        bytes32 voteHash,
        bytes32 stateRoot,
        bytes memory sigs
    ) public;
```

- Menulis hanya dimaksudkan untuk kontrak RootChain ketika mengirimkan titik periksa
- `voteHash` tempat di mana semua validator menandatangani (perjanjian BFT ⅔+1)
- Fungsi ini hanya memvalidasi tanda tangan unik dan memastikan kekuatan ⅔+1 telah menandatangani root titik periksa (pencantuman di verifikasi `voteHash` pada kontrak RootChain untuk semua data) `currentValidatorSetTotalStake` memberikan stake aktif saat ini.
- Hadiahnya didistribusikan secara proporsional ke tiang validator. Lebih lanjut ke imbalan dalam [Reward Distribution](https://www.notion.so/Rewards-Distribution-127d586c14544beb9ea326fd3bb5d3a2).

### isValidator {#isvalidator}

Memeriksa apakah validator yang diberikan adalah validator aktif untuk epos saat ini.

## Struktur data lini masa {#timeline-data-structure}

```solidity
struct State {
    int256 amount;
    int256 stakerCount;
}

mapping(uint256 => State) public validatorState;
```

<img src={useBaseUrl("img/staking_manager/staking_manager.png")} />

## StakingInfo {#stakinginfo}

Kontrak penebangan yang terpusat untuk validator dan peristiwa-peristiwa delegasi, termasuk hanya fungsi yang dibaca. Anda dapat memeriksa kode sumber kontrak [StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol) di GitHub.

## ValidatorShareFactory {#validatorsharefactory}

Kontrak pabrik untuk menyebarkan `ValidatorShare`kontrak untuk setiap validator yang memilih untuk delegasi. Anda dapat memeriksa kode sumber kontrak [ValidatorShareFactory.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/validatorShare/ValidatorShareFactory.sol) di GitHub.
