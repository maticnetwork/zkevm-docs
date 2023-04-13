---
id: truffle
title: Truffle Kullanarak Akıllı Bir Sözleşme Dağıtın
sidebar_label: Using Truffle
description:  Polygon üzerinde Akıllı Sözleşme dağıtmak için Truffle kullanın
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contract
  - truffle
  - deploy
  - polygonscan
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Genel Bakış {#overview}

[Truffle](https://trufflesuite.com/) bir blok zinciri geliştirme ortamıdır ve Ethereum Sanal Makinesinden yararlanarak akıllı sözleşmeler oluşturmak ve test etmek için kullanabilirsiniz. Bu kılavuz, Truffle kullanarak akıllı bir sözleşme nasıl oluşturulacağını ve EVM uyumlu Polygon Ağı'nda dağıtımını öğretmeyi amaçlamaktadır.

:::note

Bu eğitim, [<ins>Truffle hızlı başlangıç ​​kılavuzu</ins>](https://www.trufflesuite.com/docs/truffle/quickstart) makalesinin uyarlanmış bir versiyonudur.

:::

## Neler yapacaksınız? {#what-you-will-do}

- Truffle Kurulumu ve Yapılandırması
- Polygon Ağı üzerinde sözleşmeyi dağıtın
- Polygonscan üzerindeki dağıtım durumunu kontrol edin

## Ön Koşullar {#prerequisites}

Başlamadan önce birkaç teknik gereksinim bulunuyor. Lütfen aşağıdakileri kurun:

- [Node.js v8+ LTS ve npm](https://nodejs.org/en/) (Node ile paketlenmiş)
- [Git](https://git-scm.com/)

Bunları kurduktan sonra, Truffle kurmak için yalnızca bir komuta ihtiyacımız bulunuyor:

```
npm install -g truffle
```

Truffle doğru şekilde kurulduğunu doğrulamak için bir terminal `truffle version`yazın. Bir hata görürseniz, npm modüllerinin yolunuza eklendiğinden emin olun.

## Bir proje oluşturma {#creating-a-project}

### MetaCoin projesi {#metacoin-project}

[Truffle Boxes](https://trufflesuite.com/boxes/) sayfasında bulabileceğiniz Truffle kalıplarından birini kullanacağız. [MetaCoin box](https://trufflesuite.com/boxes/metacoin/), hesaplar arasında aktarılabilen bir token oluşturur.

1. Bu Truffle projesi için yeni bir dizin oluşturarak başlayın:

  ```bash
  mkdir MetaCoin
  cd MetaCoin
  ```

2. MetaCoin box indirin:

  ```bash
  truffle unbox metacoin
  ```

Bu son adımla sözleşmeler, dağıtım, test ve yapılandırma dosyaları ile bir Truffle projesi işbirliği klasörleri oluşturdunuz.

Bu, `metacoin.sol` dosyasından gelen akıllı sözleşme verisidir:

```solidity title="metacoin.sol"
// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
```

:::note

ConvertLib'in `pragma` ifadesinden hemen sonra içe aktarıldığına dikkat edin. Bu projede son adımda devreye alınacak iki akıllı sözleşme vardır: Sözleşmelerden biri, tüm gönderme ve bakiye mantığını içeren Metacoin, diğeri ise değerleri dönüştürmek için kullanılan bir kütüphane olan ConvertLib'dir.

:::

### Sözleşmeyi Test Etme {#testing-the-contract}

Solidity ve Javascript testlerini çalıştırabilirsiniz.

1. Bir terminalde şu Solidity testini çalıştırın:

  ```bash
  truffle test ./test/TestMetaCoin.sol
  ```

Aşağıdaki çıktıyı görmelisiniz:

![img](/img/truffle/test1.png)

2. JavaScript testini çalıştırın:

  ```bash
  truffle test ./test/metacoin.js
  ```

Aşağıdaki çıktıyı görmelisiniz:

![img](/img/truffle/test2.png)

### Sözleşmeyi derleme {#compiling-the-contract}

Akıllı sözleşmeyi aşağıdaki komutu kullanarak derleyin:

```bash
truffle compile
```

Aşağıdaki çıktıyı göreceksiniz:

![img](/img/truffle/compile.png)

### Akıllı sözleşmeyi yapılandırma {#configuring-the-smart-contract}

Sözleşmeyi devreye almadan önce `truffle-config.js` dosyasını kurmanız, ağ ve derleyici verilerini girmeniz gerekiyor.

Polygon Mumbai ağ detayları ile dosyayı `truffle-config.js`güncelleyin.

```js title="truffle-config.js"
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
        version: "0.8.13",
    }
  }
}
```

Mnemonik olarak aktarılması gerektiğini `maticProvider`unutmayın. Bu dille konuşlandırmak istediğiniz hesap için tohum ifadesi (veya özel anahtar) şeklidir. Kök dizininde yeni bir `.secret` dosyası oluşturun ve başlamak için 12 kelimelik hatırlatıcı tohum ifadenizi girin. MetaMask cüzdanından tohum kelimesini almak için MetaMask ayarlarına gidebilirsiniz, ardından menüden **Güvenlik ve** Gizlilik'i seçin, bu sayede tohum sözcüklerini **ortaya çıkartan** bir düğme göreceksiniz.

### Polygon Ağı üzerinde dağıtımı {#deploying-on-polygon-network}

[Polygon Musluğu](https://faucet.polygon.technology/) kullanarak cüzdanınıza MATIC ekleyin. Ardından, bu komutu proje dizininin kök klasöründe çalıştırın:

```
truffle compile
truffle deploy --network matic
```

![img](/img/truffle/deployed-contract.png)

:::note

`address`Unutmayın `transaction_hash`ve sağlanan diğer detaylar farklı olacaktır. Yukarıda sadece yapıya dair bir fikir verilmiştir.

:::

**Tebrikler!  Truffle kullanarak Akıllı Sözleşme uyguladınız.** Artık sözleşmeyle etkileşime girebilir ve [Polygonscan](https://mumbai.polygonscan.com/) üzerindeki dağıtım durumunu kontrol edebilirsiniz.
