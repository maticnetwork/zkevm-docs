---
id: network-agnostics
title: Ağ Agnostik İşlemler
sidebar_label: Network Agnostic Transactions
description: "dApp'inize Ağ Agnostik İşlemler (network agnostic transactions) entegre edin."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

## Hedef {#goal}

Polygon zincirinde, Metamask'ta sağlayıcı (provider) değişikliği yapmaksızın, işlemler icra edin (bu eğitim, metamask'ın diğer bir sağlayıcıdan işlemler icra etmek için değiştirilebilen inpage provider'ıyla ilgilidir)

Kullanıcı bir işlem icra etme isteğini imzalar, bu istek basit bir röle (relayer) tarafından rölelenir ve işlem Polygon zincirinde devreye alınmış bir sözleşme üzerinde icra edilir.


## İşlemin icra edilmesini mümkün kılan nedir? {#what-is-enabling-transaction-execution}

Kullanıcının etkileşimde bulunduğu istemci (web tarayıcı, mobil uygulamalar vs.) blok zinciri ile asla etkileşimde bulunmaz, bunun yerine GSN'nin veya bir meta işlem çözümünün çalışmasına benzer şekilde basit bir röle (relayer) sunucusuyla (veya rölelerden oluşan bir ağla) etkileşimde bulunur (bkz. [Meta İşlemler](https://www.notion.so/Meta-Transactions-An-Introduction-8f54cf75321e4ec3b6d755e18e406590): Giriş).

Blok zincir etkileşimi gerektiren bir eylem için,

- İstemci kullanıcıdan EIP712 formatlı bir imza ister
- Bu imza basit bir röle sunucusuna gönderilir (üretim için kullanılıyorsa bu sunucuda basit bir auth/spam koruması bulunmalıdır, ya da biconomy'nin mexa sdk'sı kullanılabilir: [https://github.com/bcnmy/mexa-sdk](https://github.com/bcnmy/mexa-sdk))
- Röle, kullanıcının imzasını sözleşmeye göndermek için blok zincir ile etkileşime girer. Sözleşme üzerindeki `executeMetaTransaction` fonksiyonu imzayı işler ve istenen işlemi icra eder (dâhili bir çağrı vasıtasıyla).
- Röle, gaz ücretini ödeyerek işlemi bedavaya getirir 🤑

## dApp'inize Ağ Agnostik İşlemler entegre edin {#integrate-network-agnostic-transactions-in-your-dapp}

- Basit bir özel röle düğümü ya da biconomy arasında seçim yapın.

  - Biconomy için, panodan bir dapp kurun ve api-id ile api-key değerlerini bir yere not edin, bkz. [Eğitim: Biconomy](https://www.notion.so/Tutorial-Biconomy-7f578bfb4e7d4904b8c79522085ba568) veya [https://docs.biconomy.io/](https://docs.biconomy.io/)

  **Adımlar:**

    1. Sözleşmelerimizi biconomy panosuna kaydedelim
       1. [Biconomy resmi belgelerine](https://docs.biconomy.io/biconomy-dashboard) göz atın.
       2. Dapp'i kaydederken `Polygon Mumbai` seçin
    2. Ön uçta kullanmak için `API key`'i kopyalayın
    3. Manage-Api içinde `executeMetaTransaction` fonksiyonunu ekleyin ve meta işlemi etkinleştirdiğinizden emin olun. ("Native-metatx" seçeneğini işaretleyin)

  - Blok zinciri üzerinde imzalanmış işlemleri gönderen kendi özel API'nizi kullanmak isterseniz, sunucu kodunu buradan inceleyebilirsiniz: [https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer](https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer)

- Etkileşim kurmak istediğiniz sözleşmenin `NativeMetaTransactions` üzerinden devraldığına emin olun - 👀 Sözleşme içindeki `executeMetaTransaction` fonksiyonuna göz atın.
- Bağlantı: [https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338](https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338)



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


- Bir röleyi ve sözleşmeleri kurduktan sonra, ihtiyacınız olan şey istemcinin EIP712 formatlı bir imzayı getirebilmesi ve API'yi gerekli parametrelerle çağırabilmesidir

ref: [https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostik-transfer/sign.js#L47](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L47)

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

API'yi çağıran ref: [https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110)

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

    Biconomy kullanıyorsanız, şunlar çağrılmalıdır:

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

    burada `txObj` şu şekilde görünmelidir:

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

- Özel API'yi kullanıyorsanız, bu API sözleşme üzerinde `executeMetaTransaction` fonksiyonunu yürütür:

(ref: [https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostik-transfer/server/index.js#L40)](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40)

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

    biconomy kullanıyorsa, istemci tarafı şu şekilde görünür:

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
