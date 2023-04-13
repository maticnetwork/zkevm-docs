---
id: portis
title: Portis
description: Kolay kullanıcı katılımı dikkate alınarak geliştirilmiş bir web tabanlı cüzdan.
keywords:
  - wiki
  - polygon
  - wallet
  - portis
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Portis, kolay kullanıcı katılımı dikkate alınarak geliştirilmiş bir web tabanlı cüzdandır. DApp içine entegre olan ve kullanıcı için yerel cüzdansız bir deneyim oluşturan bir javascript SDK ile birlikte gelir. Ayrıca, cüzdan, işlem ve gaz ücretlerini ayarlamayı ele alır.

Metamask gibi gözetimsizdir - kullanıcılar kendi anahtarlarını kontrol ederler, Portis sadece anahtarları güvenli bir şekilde saklar. Ama Metamask'tan farklı olarak uygulamaya değil tarayıcıya entegre olur. Kullanıcılar anahtarlarını kullanıcı adları ve şifreleri ile ilişkilendirirler.

**Tür**: Gözetimsiz/HD <br/>
**Özel Anahtar Depolama**: Portis sunucularında şifreli ve depolanan<br/> **Ethereum Ledger ile İletişim**: Geliştirici tarafından tanımlanan<br/> **Özel anahtar kodlama**: Hatırlatıcı<br/>

## Web3 ayarını {#set-up-web3}

dApp'inize Portis yükleyin:

```js
npm install --save @portis/web3
```

Şimdi, [Portis Panosu](https://dashboard.portis.io/) kullanarak dApp Kimliği elde etmek için dApp dosyasını Portis ile kaydedin.

İçe `portis`ve `web3`nesneler:

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```

Portis constructor ilk argümanı dApp kimliği olarak ve ikinci argümanı bağlamak istediğiniz ağ olarak alır. Bu bir dize veya nesne olabilir.

```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```

## Hesap ayarlayın {#set-up-account}

Web3 kurulumu ve somutlaştırılması başarılı olduysa aşağıdaki bağlanan hesabı başarıyla döndürmelidir:

```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```

## İçgüdü Sözleşmeleri {#instantiating-contracts}

Sözleşmeleri bu şekilde uygulamamız gerekir:

```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

## Fonksiyonları Çağırma {#calling-functions}

### Çağrı `call()`Fonksiyonu {#function}

```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```

### Çağrı `send()`Fonksiyonu {#function-1}
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```
