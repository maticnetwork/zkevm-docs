---
id: network-agnostics
title: Transaksi Agnostik jaringan
sidebar_label: Network Agnostic Transactions
description: "Mengintegrasi Transaksi Agnostik Jaringan di dApp."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

## Tujuan {#goal}

Mengeksekusi transaksi di rantai Polygon tanpa mengubah penyedia di Metamask (tutorial ini mencakup penyedia dalam halaman metamask, dapat dimodifikasi untuk mengeksekusi transaksi dari penyedia lain)

Di balik layar, pengguna menandatangani niatnya untuk mengeksekusi transaksi yang disampaikan oleh relayer sederhana guna mengeksekusinya pada kontrak yang disebarkan di rantai Polygon.


## Apa yang memungkinkan eksekusi transaksi? {#what-is-enabling-transaction-execution}

Klien yang berinteraksi dengan pengguna (browser web, aplikasi seluler, dll.) tidak pernah berinteraksi dengan blockchain, melainkan berinteraksi dengan server relayer sederhana (atau jaringan relayer), mirip dengan cara kerja GSN atau solusi transaksi meta (lihat: Transaksi [Meta: Pengantar](https://www.notion.so/Meta-Transactions-An-Introduction-8f54cf75321e4ec3b6d755e18e406590)).

Untuk setiap tindakan yang memerlukan adanya interaksi blockchain,

- Klien meminta tanda tangan yang diformat EIP712 dari pengguna
- Tanda tangan ini dikirim ke server relayer sederhana (seharusnya memiliki perlindungan autentikasi/spam sederhana jika digunakan untuk produksi, atau bisa menggunakan sdk mexa dari biconomy: [https://github.com/bcnmy/mexa-sdk](https://github.com/bcnmy/mexa-sdk))
- Relayer berinteraksi dengan blockchain untuk mengirimkan tanda tangan pengguna ke kontrak. Fungsi pada kontrak yang disebut `executeMetaTransaction` memproses tanda tangan dan mengeksekusi transaksi yang diminta (melalui panggilan internal).
- Relayer membayar biaya untuk gas sehingga transaksi secara efektif gratis 🤑

## Mengintegrasi Transaksi Agnostik Jaringan di dApp {#integrate-network-agnostic-transactions-in-your-dapp}

- Pilih antara node relayer sederhana kustom/biconomy.

  - Untuk biconomy, siapkan dapp dari dashboard dan simpan api-id dan api-key, lihat: [Tutorial: Biconomy](https://www.notion.so/Tutorial-Biconomy-7f578bfb4e7d4904b8c79522085ba568) atau [https://docs.biconomy.io/](https://docs.biconomy.io/)

  **Langkah-langkahnya:**

    1. Mari kita daftarkan kontrak ke dashboard biconomy
       1. Kunjungi [dokumen resmi biconomy](https://docs.biconomy.io/biconomy-dashboard).
       2. Ketika mendaftarkan dapp, pilih `Polygon Mumbai`
    2. Salin `API key` yang akan digunakan di frontend
    3. Lalu tambahkan fungsi `executeMetaTransaction` di Manage-Api dan pastikan untuk mengaktifkan meta-tx. (Centang opsi 'native-metatx')

  - Jika Anda ingin menggunakan API kustom Anda yang mengirimkan transaksi yang ditandatangani pada blockchain, Anda dapat merujuk kepada kode server di sini: [https://github.com/angelagilhotra/ETHOnline-Workshop/master/2-network-agnostic-transferiffer.](https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer)

- Pastikan kontrak yang akan digunakan berinteraksi sudah mewarisi dari `NativeMetaTransactions`- 👀 lihat fungsi `executeMetaTransaction` dalam kontrak.
- Tautan: [https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338](https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338)



```jsx

let data = await web3.eth.abi.encodeFunctionCall({
    name: 'getNonce',
    type: 'function',
    inputs: [{
        name: "user",
        type: "address"
      }]
  }, [accounts[0]]);

  let _nonce = await web3.eth.call ({
    to: token["80001"],
    data
  });

  const dataToSign = getTypedData({
    name: token["name"],
    version: '1',
    salt: '0x0000000000000000000000000000000000000000000000000000000000013881',
    verifyingContract: token["80001"],
    nonce: parseInt(_nonce),
    from: accounts[0],
    functionSignature: functionSig
  });

  const msgParams = [accounts[0], JSON.stringify(dataToSign)];

  let sig = await eth.request ({
    method: 'eth_signTypedData_v3',
    params: msgParams
  });

  ```


- Setelah Anda menyiapkan relayer dan kontrak, yang diperlukan sekarang adalah klien Anda dapat mengambil tanda tangan yang berformat EIP712 dan hanya memanggil API dengan parameter yang diperlukan

ref: [https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a40053c17729c7252529303c8e1b/2-networkingen-agnostic-transfer/sign.js#L44](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L47)

    ```jsx

    let data = await web3.eth.abi.encodeFunctionCall({
        name: 'getNonce',
        type: 'function',
        inputs: [{
            name: "user",
            type: "address"
          }]
      }, [accounts[0]]);

      let _nonce = await web3.eth.call ({
        to: token["80001"],
        data
      });

      const dataToSign = getTypedData({
        name: token["name"],
        version: '1',
        salt: '0x0000000000000000000000000000000000000000000000000000000000013881',
        verifyingContract: token["80001"],
        nonce: parseInt(_nonce),
        from: accounts[0],
        functionSignature: functionSig
      });
      const msgParams = [accounts[0], JSON.stringify(dataToSign)];

      let sig = await eth.request ({
        method: 'eth_signTypedData_v3',
        params: msgParams
      });
    ```

Memanggil API, ref: [https://github.com/angelagilhotra/ETHOnline-Workshop/b615b8a40053c1729c72529303c8e1b/2-network](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110)

    ```jsx
    const response = await request.post(
        'http://localhost:3000/exec', {
          json: txObj,
        },
        (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          document.getElementById(el).innerHTML =
          `response:`+ JSON.stringify(body)
        }
      )
    ```

    Jika menggunakan Biconomy, Anda harus memanggil yang berikut ini:

    ```jsx
    const response = await request.post(
        'https://api.biconomy.io/api/v2/meta-tx/native', {
          json: txObj,
        },
        (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          document.getElementById(el).innerHTML =
          `response:`+ JSON.stringify(body)
        }
      )
    ```

    yang tampilan `txObj` akan seperti ini:

    ```json
    {
        "to": "0x2395d740789d8C27C139C62d1aF786c77c9a1Ef1",
        "apiId": <API ID COPIED FROM THE API PAGE>,
        "params": [
            "0x2173fdd5427c99357ba0dd5e34c964b08079a695",
            "0x2e1a7d4d000000000000000000000000000000000000000000000000000000000000000a",
            "0x42da8b5ac3f1c5c35c3eb38d639a780ec973744f11ff75b81bbf916300411602",
            "0x32bf1451a3e999b57822bc1a9b8bfdfeb0da59aa330c247e4befafa997a11de9",
            "27"
        ],
        "from": "0x2173fdd5427c99357ba0dd5e34c964b08079a695"
    }
    ```

- Jika Anda menggunakan API kustom, maka API itu akan mengeksekusi fungsi `executeMetaTransaction` pada kontrak:

(refl: [https://github.com/angelagilhotra/ETHOnline-Workshop/b615b8a40053c177215252529303c8e1b/2-networking-agnosic-transfer/server/index.js#L40)](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40)

    ```jsx
    try {
        let tx = await contract.methods.executeMetaTransaction(
          txDetails.from, txDetails.fnSig, r, s, v
        ).send ({
          from: user,
          gas: 800000
        })
        req.txHash = tx.transactionHash
      } catch (err) {
        console.log (err)
        next(err)
      }
    ```

    bila menggunakan biconomy, panggilan sisi klien akan tampak seperti ini:

    ```jsx
    // client/src/App.js
    import React from "react";
    import Biconomy from "@biconomy/mexa";

    const getWeb3 = new Web3(biconomy);
    biconomy
        .onEvent(biconomy.READY, () => {
          // Initialize your dapp here like getting user accounts etc
          console.log("Mexa is Ready");
        })
        .onEvent(biconomy.ERROR, (error, message) => {
          // Handle error while initializing mexa
    			console.error(error);
        });

    /**
    * use the getWeb3 object to define a contract and calling the function directly
    */

    ```
