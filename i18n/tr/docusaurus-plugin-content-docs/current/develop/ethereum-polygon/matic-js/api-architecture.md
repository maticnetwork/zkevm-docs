---
id: api-architecture
title: API Mimarisi
keywords:
    - api architecture
    - api type
    - read
    - write
    - polygon
description: Okuma ve Yazma API'leri artı işlem ayarları.
---

Kütüphane baştan sona genel api mimarisini izler ve API'ler iki tipe ayrılır -

1. Okuma API'si
2. Yazma API'si

## Okuma API'si {#read-api}

Okuma API'leri blok zinciri üzerinde hiçbir şey yayımlamaz; bu yüzden gaz harcamaz. Okuma API'lerine örnek olarak - `getBalance`, `isWithdrawExited`, vb verilebilir.

Bir okuma API'si örneği görelim -

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

okuma API'leri çok basittir ve sonucu doğrudan döndürür.

## Yazma API'si {#write-api}

Yazma API'leri blok zinciri üzerinde bazı veriler yayımlar; bu yüzden gaz harcar. Yazma API'lerine örnek olarak - `approve`, `deposit`, vb. verilebilir.

Bir yazma API'si çağırdığınız zaman - sonuçtan iki veriye ihtiyacınız olur.

1. TransactionHash
2. TransactionReceipt

Bir yazma API örneği görelim ve transactionhash ve receipt alalım -

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

## İşlem seçeneği {#transaction-option}

Tüm API'ler için mevcut olan bazı yapılandırılabilir seçenekler bulunur. Bu yapılandırmalar parametrelerde geçirilebilir.

Mevcut yapılandırmalar şöyledir -

- from?: dize | sayı - İşlemlerin yapılıp gelmesi gereken adres.
- to?: dize - İşlemin yapılıp gitmesi gereken adres.
- değer?: sayı | dize | BN - İşlem için wei cinsinden aktarılan değer.
- gasLimit?: sayı | dize - Bir işlem için sağlanan maksimum gaz (gaz limiti).
- gasPrice?: sayı | dize | BN - İşlemlerde kullanım için wei cinsinden gaz fiyatı.
- data?: dize - Sözleşmenin bayt kodu.
- nonce?: sayı;
- chainId?: sayı;
- chain?: dize;
- hardfork?: dize;
- returnTransaction?: boolean - bunu true yapmak, işlemi manuel olarak yollamak için kullanılabilen işlem nesnesini döndürecektir.

Örnek olarak gasPrice yapılandırması yapalım

```js
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
