---
id: hardhat
title: Hardhat Kullanarak Akıllı Bir Sözleşme Dağıtın
sidebar_label: Using Hardhat
description: Polygon üzerinde Akıllı Sözleşme dağıtmak için Hardhat kullanın
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contracts
  - hardhat
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Genel Bakış {#overview}

Hardhat akıllı sözleşmeleri dağıtmak, testleri çalıştırmak ve çözülmesi için yerel olarak Solidity kodunu kolay bir yol sağlayan bir Ethereum geliştirme ortamıdır.

Bu eğitimde Hardhat'in nasıl kurulacağını ve basit bir akıllı sözleşme oluşturmak, test etmek ve devreye almak için kullanmayı öğreneceksiniz.

### Yapacaklarınız {#what-you-will-do}

- Hardhat Kurma
- Basit bir akıllı sözleşme oluşturma
- Sözleşmeyi derleme
- Sözleşmeyi test etme
- Sözleşmeyi devreye alma

## Geliştirme ortamını kurma {#setting-up-the-development-environment}

Başlamadan önce birkaç teknik gereksinim bulunuyor. Lütfen aşağıdakileri kurun:

- [Node.js v10+ LTS ve npm](https://nodejs.org/en/) (Node ile birlikte gelir)
- [Git](https://git-scm.com/)

Bunları kurduktan sonra, boş bir klasöre gidin, `npm init` çalıştırarak bir npm projesi oluşturun ve Hardhat kurulumunu yapmak için talimatlarını takip edin. Projeniz hazır olduğunda, şunu çalıştırmanız gerekir:

```bash
npm install --save-dev hardhat
```

Hardhat projenizi oluşturmak için proje klasörünüzde `npx hardhat` çalıştırın.
Şimdi örnek projeyi oluşturalım ve örnek bir görev denemek, örnek sözleşmeyi derlemek, test etmek ve devreye almak için bu adımları tamamlayalım.

:::note

Burada kullanılan örnek proje ve talimatlar [<ins>Hardhat Hızlı Başlangıç Kılavuzundan</ins>](https://hardhat.org/getting-started/#quick-start) alınmıştır.

:::

## Bir proje oluşturma {#creating-a-project}

Bir örnek proje oluşturmak için proje klasörünüzde `npx hardhat` çalıştırın. Aşağıdaki istemi görmelisiniz:

![img](/img/hardhat/quickstart.png)

JavaScript projesini seçin ve örnek sözleşmeyi derlemek, test etmek ve devreye almak için bu adımları uygulayın.

### Sözleşmeyi kontrol etme {#checking-the-contract}

`Lock.sol` klasöründe, kullanıcıların ancak belli bir süre sonra fon çekebileceği basit bir dijital kilitten ibaret bir örnek sözleşme olan `contracts` yer alır.

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
```

### Sözleşmeyi yapılandırma {#setting-up-the-contract}

- `hardhat.config.js` dosyasına gidin
- `hardhat-config` dosyasını matic-network-credentials ile güncelleyin
- Kök dizinde özel anahtarınızı saklamak için `.env` dosyasını oluşturun
- Sözleşmeyi Polygonscan üzerinde doğrulamak için `.env` dosyasına Polygonscan API anahtarını ekleyin. [Bir hesap oluşturarak](https://polygonscan.com/register) API anahtarı yaratabilirsiniz

```js
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

:::note

Yukarıdaki dosyanın çevre değişkenlerini ve ether'ler ile etherscan'i yönetmek için DOTENV gerektirdiğini unutmayın. Tüm bu paketleri kurduğunuzdan emin olun.

DOTENV kullanım talimatlarını bu [<ins>sayfada</ins>](https://www.npmjs.com/package/dotenv) bulabilirsiniz.

MATIC ile polygon_mumbai değiştirmeniz durumunda MATIC (Polygon mainnet) üzerinde can

:::

### Sözleşmeyi derleme {#compiling-the-contract}

Sözleşmeyi derlemek için öncelikle Hardhat Toolbox yüklemeniz gerekir:

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Ardından, derlemek için çalıştırın:

```bash
npx hardhat compile
```

### Sözleşmeyi Test Etme {#testing-the-contract}

Hardhat ile test gerçekleştirmek için, aşağıdakileri yazmanız gerekir:

```bash
npx hardhat test
```

Beklenen çıktı şu şekildedir:

![img](/img/hardhat/test.png)

### Polygon Ağı üzerinde dağıtımı {#deploying-on-polygon-network}

Proje dizininin kökünde şu komutu çalıştırın:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

Sözleşme, Matic'in Mumbai Test Ağı üzerinde devreye alınacaktır. Devreye alma durumunu buradan denetleyebilirsiniz: https://mumbai.polygonscan.com/

**Tebrikler! Greeter Akıllı Sözleşmesini başarıyla devreye aldınız. Artık Akıllı Sözleşme ile etkileşim kurabilirsiniz.**

:::tip Sözleşmeleri Polygonscan üzerinde hızlı bir şekilde doğrulayın

Sözleşmenizi Polygonscan üzerinde hızlı bir şekilde doğrulamak için aşağıdaki komutları çalıştırın. Bu işlem devreye alınan sözleşmenizin kaynak kodunu herkesin görmesini kolaylaştırır. Karmaşık argüman listesine sahip bir oluşturucusu (constructor) olan sözleşmeler için [buraya](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html) bakın.

```bash
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat verify --network polygon_mumbai 0x4b75233D4FacbAa94264930aC26f9983e50C11AF
```
:::
