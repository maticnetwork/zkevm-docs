---
id: overview
title: Metamask'a Genel Bakış
sidebar_label: Overview
description: Polygon üzerinde Metamask kullanmaya başlamak
keywords:
  - wiki
  - polygon
  - wallet
  - metamask
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[MetaMask](https://metamask.io/), Ethereum blok zinciri ile etkileşim kurmak için web tarayıcı ve mobil cihazlarda kullanılabilen bir kripto cüzdandır. Ethereum Dapp'lerini (Merkezi Olmayan Uygulamalar) tarayıcınızda, tam bir Ethereum düğümü kullanmadan çalıştırmanıza olanak tanır.

**Tür**: Gözetimsiz/HD <br/>
**Özel Anahtar Depolama**: Kullanıcının yerel tarayıcı depolaması <br/>
**Ethereum Ledger ile İletişim**: Infura <br/>
**Özel anahtar kodlama**: Hatırlatıcı <br/>

:::warning
Lütfen **Gizli Kurtarma** Cümlenizi Yedekleyin. Cihazınız kırılır, kaybedilir, çalınır veya veri yolsuzluğu varsa, onu kurtarmanın başka bir yolu yoktur. Gizli Kurtarma Cümlesi, MetaMask hesaplarınızı kurtarmanın tek yoludur. **[<ins>MetaMask'in Temel Güvenlik ve Güvenlik İpuçları</ins>](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)**
:::

## Polygon için MetaMask kurma kılavuzu {#guide-to-set-up-metamask-for-polygon}

* [Metamask İndirin ve Kurun](/develop/metamask/tutorial-metamask.md)
* [Metamask Üzerinde Polygon'u Yapılandırın](/develop/metamask/config-polygon-on-metamask.md)
* [Özel Token Yapılandırma](/develop/metamask/custom-tokens.md)
* [Hesap Oluşturma ve İçe Aktarma](/develop/metamask/multiple-accounts.md)

### 1. Web3 Kurun {#1-set-up-web3}

#### Adım 1 {#step-1}

DApp'inize aşağıdakini kurun:

  ```javascript
  npm install --save web3
  ```

Yeni bir dosya oluşturun, `web3.js` olarak adlandırın ve aşağıdaki kodu içerisine ekleyin:

  ```javascript
  import Web3 from 'web3';

  const getWeb3 = () => new Promise((resolve) => {
    window.addEventListener('load', () => {
      let currentWeb3;

      if (window.ethereum) {
        currentWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          window.ethereum.enable();
          // Acccounts now exposed
          resolve(currentWeb3);
        } catch (error) {
          // User denied account access...
          alert('Please allow access for the app to work');
        }
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        resolve(currentWeb3);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });
  });


  export default getWeb3;
  ```

Yukarıdaki dosya `getWeb3()` adlı bir fonksiyonu içe aktarır - Amacı, Metamask tarafından enjekte edilen global bir nesneyi (`ethereum` veya `web3`) tespit ederek metamask hesabının erişimini talep etmektir.

 [Metamask API belgelerine](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes) göre:

> MetaMask kullanıcılarının ziyaret ettiği web sitelerine küresel bir API enjekte eder. Bu API, web sitelerinin kullanıcıların Ethereum hesaplarını talep etmesine, kullanıcının bağlı olduğu blok zincirlerinden gelen verileri okumasına ve kullanıcının mesaj ve işlemleri imzalamasını önermesine izin verir. Sağlayıcı nesnesinin varlığı bir Ethereum kullanıcısını gösterir.

Daha basit bir ifadeyle, Metamask'ın uzantılı ve eklenti cihazını tarayıcınıza monte ettiğinizde, (eski sürümler `web3`için) olarak `ethereum`adlandırılan ve bu değişkeni kullanarak web3 nesnemizi temel alıyoruz.

#### Adım 2 {#step-2}

Şimdi, istemci kodunuzda, yukarıdaki dosyayı alın:

```js
  import getWeb3 from '/path/to/web3';
```

ve şu fonksiyonu çağırın:

```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```

### 2. Hesabı kurun {#2-set-up-account}

Şimdi işlem göndermek için (özellikle blok zincirinin durumunu değiştirenler) bu işlemleri imzalamak için bir hesaba ihtiyacımız olacaktır. Sözleşme örneğimizi yukarıda oluşturduğumuz web3 nesnesinden taksite ediyoruz:

```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```

`getAccounts()` fonksiyonu kullanıcının metamask'ındaki tüm hesapların bir dizisini döndürür ve `accounts[0]` kullanıcı tarafından o anda seçili olandır.

### 3. Sözleşmelerinizi somutlaştırın {#3-instantiate-your-contracts}

`web3`Nesne yerine getirdiğimizde, sözleşmelerimizi bir sonraki aşamada yerine getireceğiz, sözleşmenizi ABI ve adresiniz zaten mevcut durumda olduğu varsayılarak:

```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

### 4. Fonksiyonları çağırın {#4-call-functions}

Şimdi sözleşmenizden aramak istediğiniz herhangi bir işlev için, bizim instantiated sözleşme nesnesi ile doğrudan etkileşime giriyoruz (Adım 2'de `myContractInstance`ilan edilmiştir).

:::tip Hızlı bir inceleme

Sözleşmenin durumunu değiştiren fonksiyonlar fonksiyon olarak `send()`adlandırılır. Sözleşmenin durumunu değiştirmeyen işlevlere fonksiyon `call()`denir.

:::

#### `call()` İşlevlerini Çağırma {#functions}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```

#### `send()` İşlevlerini Çağırma {#functions-1}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .send({
    from: this.account,gasPrice: 0
  })
  .then (
    (receipt) => {
      // returns a transaction receipt}
    )
```
