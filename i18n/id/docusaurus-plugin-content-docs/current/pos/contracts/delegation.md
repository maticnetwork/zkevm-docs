---
id: delegation
title: Delegasi melalui Validator Shares
sidebar_label: Delegation
description: Delegasi melalui Validator Shares
keywords:
  - polygon wiki
  - docs
  - polygon
  - delegation
  - validator shares
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon mendukung delegasi melalui bagian validator. Dengan menggunakan desain ini, lebih mudah untuk mendistribusikan imbalan dan memotong dengan skala (ribuan delegator) pada kontrak Ethereum tanpa banyak perhitungan.

Delegator mendelegasikan dengan membeli bagian kelompok terbatas dari validator. Setiap validator akan memiliki token bagian validator mereka sendiri. Kita sebut saja ini token sepadan `VATIC` untuk validator `A`. Segera setelah pengguna mendelegasikan ke validator `A`, mereka akan diberikan `VATIC` berdasarkan nilai tukar dari pasangan `MATIC/VATIC`. Seiring pengguna menambah nilai, nilai tukar menunjukkan bahwa mereka kini dapat menarik lebih banyak `MATIC` untuk setiap `VATIC` dan ketika pengguna mengalami pemotongan, pengguna menarik lebih sedikit `MATIC` untuk `VATIC` mereka.

Ingatlah `MATIC` adalah token staking. Delegator harus memiliki token `MATIC` untuk berpartisipasi di delegasi.

Awalnya, delegator `D` membeli token dari kelompok spesifik validator `A` ketika `1 MATIC per 1 VATIC`.

Ketika validator diberi imbalan token `MATIC` yang lebih banyak, token baru ditambahkan ke kelompok. Mari kita katakan dengan kolam token saat `100 MATIC`ini, `10 MATIC`penghargaan ditambahkan ke dalam kolam. Namun, karena total pasokan token `VATIC` tidak berubah disebabkan oleh imbalan, nilai tukarnya menjadi `1 MATIC per 0.9 VATIC`. Sekarang, delegasi `D`mendapatkan lebih `MATIC`untuk berbagi yang sama.

`VATIC`: Token bagian validator tercetak validator khusus (token ERC20)

## Spesifikasi teknis {#technical-specification}

```solidity
uint256 public validatorId; // Delegation contract for validator
uint256 public validatorRewards; // accumulated rewards for validator
uint256 public commissionRate; // validator's cut %
uint256 public validatorDelegatorRatio = 10; // to be implemented/used

uint256 public totalStake;
uint256 public rewards; // rewards for pool of delegation stake
uint256 public activeAmount; // # of tokens delegated which are part of active stake
```

Nilai tukar dihitung sebagai berikut:

```js
ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares
```

## Metode dan Variabel {#methods-and-variables}

### buyVoucher {#buyvoucher}

```js
function buyVoucher(uint256 _amount) public;
```

- Mentransfer `_amount` ke stakeManager dan memperbarui struktur data lini masa untuk stake yang aktif.
- `updateValidatorState` digunakan untuk memperbarui DS lini masa.
- `Mint` bagian delegasi menggunakan `exchangeRate` saat ini untuk `_amount`.
- `amountStaked` digunakan untuk terus melacak stake aktif setiap delegator untuk menghitung imbalan cair.

### sellVoucher {#sellvoucher}

```js
function sellVoucher() public;
```

- Menggunakan saat ini `exchangeRate`dan jumlah saham untuk menghitung jumlah (aktif stake + reward).
- `unBond`aktif stake dari validator dan transfer imbalan ke delegator, jika ada.
- Harus menghapus stake aktif dari lini masa menggunakan `updateValidatorState` dalam stakeManger.
- Pemetaan `delegators` digunakan untuk terus melacak stake dalam periode penarikan.

### withdrawRewards {#withdrawrewards}

```js
function withdrawRewards() public;
```

- Untuk delegator, menghitung imbalan dan transfer, dan tergantung pada jumlah saham `exchangeRate`.
- Contoh: jika seorang delegasi memiliki 100 saham dan nilai tukar adalah 200 sehingga imbalan adalah 100 token, transfer 100 token ke delegator. Sisa saham adalah 100 sehingga menggunakan nilai tukar 200, sekarang bernilai 50 share. Jadi bakar 50 saham. Delegator sekarang memiliki 50 saham senilai 100 token (yang awalnya staked

### Restake {#restake}

Restake dapat bekerja dalam dua cara: delegasi dapat membeli lebih banyak saham menggunakan `buyVoucher`atau imbalan Stake.

```js
function reStake() public;
```

Di atas fungsi digunakan untuk menunjang rebound. Jumlah bagiannya tidak terpengaruh karena `exchangeRate` tetap sama, jadi hanya imbalannya yang dipindahkan ke stake aktif baik untuk kontrak bagian validator maupun lini masa stakeManager.

`getLiquidRewards`digunakan untuk menghitung akumulasi imbalan yaitu delegator memiliki 100 saham dan nilai tukar adalah 200, sehingga imbalan adalah 100 token. Pindah 100 token menjadi stake aktif, karena nilai tukar masih sama jumlah saham juga akan tetap sama. Hanya perbedaan yang dilakukan adalah 200 token dianggap sebagai saham aktif dan tidak dapat ditarik segera (bukan bagian dari imbalan cair).

Tujuan dari Staking adalah bahwa karena validator telah lebih aktif dan mereka akan mendapatkan imbalan lebih untuk itu begitu juga delegasi.

### unStakeClaimTokens {#unstakeclaimtokens}

```js
function unStakeClaimTokens()
```

Setelah periode penarikan selesai, delegasi yang telah menjual saham mereka dapat mengklaim token MATIC mereka. Harus mentransfer token ke pengguna.

### updateCommissionRate {#updatecommissionrate}

```js
function updateCommissionRate(uint256 newCommissionRate)
        external
        onlyValidator
```

- Memperbarui % komisi untuk validator.

### updateRewards {#updaterewards}

```js
function updateRewards(uint256 reward, uint256 checkpointStakePower, uint256 validatorStake)
        external
        onlyOwner
        returns (uint256)
```

Ketika validator mendapatkan imbalan untuk menundukkan pos pemeriksa, fungsi ini disebut untuk disbursements imbalan antara validator dan delegator.
