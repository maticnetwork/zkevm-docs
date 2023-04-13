---
id: alchemy
title: Alchemy Kullanarak Akıllı Bir Sözleşme Dağıtın
sidebar_label: Using Alchemy
description: Alchemy kullanarak akıllı sözleşmeleri dağıtmanın kılavuzu
keywords:
  - docs
  - matic
  - polygon
  - alchemy
  - create smart contract
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Genel Bakış {#overview}

Bu eğitim, Ethereum blok zinciri geliştirme alanında tecrübesiz olan veya akıllı sözleşmeleri devreye almanın ve onlarla etkileşime girmenin temellerini anlamak isteyen geliştiricilere yöneliktir. Polygon Mumbai test ağında bir kripto para cüzdanı ([Metamask](https://metamask.io)), [Dayanıklılık](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) ve [Simya](https://alchemy.com/?a=polygon-docs) kullanarak akıllı bir sözleşme oluşturup dağıtma yoluyla size yol gösterecektir.

:::tip

Sorularınız veya endişeleriniz varsa, lütfen Alchemy ekibine [<ins>resmi Discord</ins>](https://discord.gg/gWuC7zB) sunucusu üzerinden ulaşın.

:::

## Neler öğreneceksiniz? {#what-you-will-learn}

Bu eğitimde akıllı sözleşme oluşturmak amacıyla, aşağıdakileri yapmak için Alchemy kullanmayı öğreneceksiniz:
- Akıllı bir sözleşme uygulaması oluşturun
- Bir cüzdan bakiyesini kontrol edin
- Bir blok zinciri kaşifi içindeki sözleşme çağrılarını doğrulayın

## Neler yapacaksınız? {#what-you-will-do}

Bu eğitimi izleyerek:
1. Alchemy üzerinde uygulama oluşturmaya başlayacaksınız
2. Metamask'ta bir cüzdan adresi oluşturacaksınız
3. Cüzdan için bakiye ekleyin (test token'larını kullanarak)
4. Projeyi derlemek ve devreye almak için Hardhat ve Ethers.js kullanacaksınız
5. Alchemy'nin platformunda sözleşme durumunu kontrol edin

## Akıllı Sözleşmenizi Oluşturun ve Dağıtın {#create-and-deploy-your-smart-contract}

### Polygon ağına bağlanın {#connect-to-the-polygon-network}

Polygon PoS zincirine talepler göndermenin birkaç yolu vardır. Kendi düğümünüzü çalıştırmak yerine, Alchemy'nin geliştirici platformunda ücretsiz bir hesap kullanacak ve Polygon PoS zinciri ile iletişim kurmak için Alchemy Polygon PoS API'si ile etkileşime gireceksiniz. Platform, geliştirici takımından oluşan bir komplo paketinden oluşur - bu, istekleri izleme yeteneği, akıllı sözleşme dağıtımı sırasında başlık altında ne olduğunu gösteren veri analizi, geliştirilmiş API'ler (Transact, NFT'ler vb.) ve ethers.js SDK içerir.

Zaten bir Alchemy hesabınız yoksa, [burada](https://www.alchemy.com/polygon/?a=polygon-docs) ücretsiz bir hesap için kaydolarak başlayın. Hesabınızı oluşturduktan sonra, panonuza erişmeden önce hemen ilk uygulamanızı oluşturma seçeneğine sahipsiniz.

![img](/img/alchemy/alchemy-dashboard.png)

### Uygulamanızı oluşturun (ve API anahtarı) {#create-your-app-and-api-key}

Bir Alchemy hesabı oluşturduktan sonra bir uygulama oluşturarak bir API anahtarı oluşturmanız gerekecektir. Bu durum Polygon Mumbai to yapılan talepleri doğrular. Test ağlarına aşina değilseniz, [bu test ağı kılavuzuna](https://docs.alchemyapi.io/guides/choosing-a-network) göz atın.

Yeni bir API anahtarı oluşturmak için Alchemy gösterge tablosu gezinti çubuğundaki **Uygulamalar** sekmesine gidin ve **Uygulama Alt** Sekmesini Oluştur seçeneğini seçin.

![img](/img/alchemy/create-app.png)

Yeni uygulamanızı adlandırın **Hello World**, kısa bir açıklama sunan, zincir için **Polygon** seçeneğini seçiniz ve ağınız için **Polygon Mumbai** seçin.

Son olarak, **Create uygulamasını** tıklayın. Yeni uygulamanız aşağıdaki tabloda görünmelidir.

### Bir Cüzdan adresi oluşturun {#create-a-wallet-address}

Polygon PoS Ethereum için bir katman 2 ölçeklendirme çözümüdür. Bu nedenle, bir Ethereum cüzdanına ihtiyacımız var ve Polygon Mumbai on işlem göndermek ve almak için özel bir Polygon URL'si ekliyoruz. Bu eğitim için cüzdan adresinizi yönetmek için kullanılan tarayıcı ile uyumlu bir kripto para birimi cüzdanı olan MetaMask, kullanacağız. İşlemlerin Ethereum üzerinde nasıl çalıştığını daha iyi anlamak isterseniz, Ethereum Vakfı'nın [bu işlem kılavuzuna](https://ethereum.org/en/developers/docs/transactions/) göz atın.

Özel Polygon RPC URL'nizi Alchemy üzerinden almak için Alchemy in **Hello World** uygulamanıza gidin ve sağ üst köşedeki **Anahtarı** to tıklayın. Devam edin ve Alchemy HTTP API anahtarınızı kopyalayın.

![img](/img/alchemy/view-key.png)

[Buradan](https://metamask.io/download.html) ücretsiz olarak Metamask indirip hesap oluşturabilirsiniz. Bir hesap oluşturduktan sonra, cüzdanınızda Polygon PoS ağını kurmak için bu adımları izleyin.

1. MetaMask cüzdanınızın sağ üst köşesindeki açılır menüden **Ayarlar** seçeneğini seçin.
2. Menüden sola doğru **ağları** seçin.
3. Aşağıdaki parametreleri kullanarak cüzdanınızı Mumbai to bağlayın:

**Ağ adı:** Polygon Mumbai Testnet

**Yeni RPC URL:** https://polygon-mumbai.g.alchemy.com/v2/your-api-key

**Zincir:** 80001

**Sembol:** MATIC

**Blok Explorer URL:** https://mumbai.polygonscan.com/


### Add Polygon Mumbai Test MATIC {#add-polygon-mumbai-test-matic}

Akıllı sözleşmenizi Mumbai to dağıtmak için birkaç testnet tokens ihtiyacınız olacaktır. Testnet **token'ları** almak için [Polygon Mumbai Musluk](https://faucet.polygon.technology/) için gidin, **Mumbai** seçin, **MATIC Token**'ı seçin ve Polygon cüzdan adresinizi girin, ardından Gönder'i tıklayın. Ağ trafiği nedeniyle, testnet tokenlarınızı almak biraz zaman alabilir.

Ayrıca Alchemy'nin [ücretsiz Mumbai musluğunu](https://mumbaifaucet.com/?a=polygon-docs) kullanabilirsiniz.

![img](/img/alchemy/faucet.png)

Test ağı token'larınızı bir süre sonra MetaMask hesabınızda göreceksiniz.

### Cüzdan Dengenizi Kontrol Edin {#check-your-wallet-balance}

Bakiyemizin orada olduğunu iki kez kontrol etmek için, [Alchemy'nin composer aracını](https://composer.alchemyapi.io/) kullanarak bir [eth\_getBalance](https://docs.alchemy.com/reference/eth-getbalance-polygon) talebi gönderelim. **Polygon** olarak zincir olarak seçin, **Polygon Mumbai** ağ olarak, yöntem `eth_getBalance`olarak ve adresinizi girin. Bu, cüzdanınızdaki MATIC miktarını döndürecektir. Composer aracının kullanımına dair talimatlar için [bu videoya](https://youtu.be/r6sjRxBZJuU) göz atın.

![img](/img/alchemy/get-balance.png)

MetaMask hesap adresinizi girdikten ve **İsteğe Gönder** 'ı tıklattıktan sonra, şu şekilde görünen bir yanıt görmelisiniz:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

:::info

Bu sonuç Wei cinsindendir, ETH değil. Wei Ether'in en küçük the Wei'nin Ether'e dönüşümü şu şekildedir: 1 Ether = 10^18 Wei. Dolayısıyla, "0xde0b6b3a7640000" ondalık sisteme dönüştürüldüğünde 1\*10^18, yani 1 ETH alırız. Bu, değer birimine göre 1 MATIC'e eşlenebilir.

:::

### Projenizi başlatın {#initialize-your-project}

İlk olarak, projemiz için bir klasör oluşturmamız gerekiyor. [Komut satırınıza](https://www.computerhope.com/jargon/c/commandi.htm) gidin ve şunu yazın:

```bash
mkdir hello-world
cd hello-world
```

Şimdi proje klasörümüzün içinde olduğumuza göre, projeyi başlatmak için `npm init` kullanacağız. Hâlihazırda kurulu npm yoksa, [bu talimatları](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) izleyin (Node.js'ye de ihtiyacımız olacağı için onu da indirin!).

```bash
npm init # (or npm init --yes)
```

Kurulum sorularına nasıl cevap verdiğiniz hiç önemli değildir; referans olarak bizim nasıl yaptığımıza bakın:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{   
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

package.json'u onaylayın ve hazırsınız!

### [Hardhat](https://hardhat.org/getting-started/#overview) indirin

Hardhat, Ethereum yazılımınızı derlemek, devreye almak, test etmek ve hatalarını ayıklamak için bir geliştirme ortamıdır. Geliştiricilerin, canlı zincirde devreye almadan önce yerel olarak akıllı sözleşme ve dApp oluşturmasına yardımcı olur.

`hello-world`Projemizin içinde şu şekilde çalışalım:

```bash
npm install --save-dev hardhat
```

[Kurulum talimatları](https://hardhat.org/getting-started/#overview) hakkında daha fazla detay için bu sayfaya göz atın.

### Hardhat projesi oluşturun {#create-hardhat-project}

`hello-world` proje klasörünüzün içinde şunu çalıştırın:

```bash
npx hardhat
```

Ne yapmak istediğinizi seçmek için bir hoşgeldin mesajı ve seçeneği görmelisiniz. **Boş bir hardhat.config.js oluşturun**

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Bu durum bizim için bir `hardhat.config.js`dosya oluşturacaktır, bu da projemiz için ayarlanan tüm bilgileri belirleyeceğimiz yerdir.

### Proje klasörleri ekleyin {#add-project-folders}

Projemizi organize etmek için iki yeni klasör oluşturacağız. Komut satırınızda `hello-world` projenizin kök dizinine gidin ve aşağıdakini yazın:

```bash
mkdir contracts
mkdir scripts
```

* `contracts/` içinde, hello world akıllı sözleşme kod dosyasını tutacağız
* `scripts/` içinde sözleşmemizi devreye almak ve onunla etkileşim kurmak için betikleri tutacağız

### Sözleşmeyi yazın {#write-the-contract}

[VSCode](https://code.visualstudio.com). gibi en sevdiğiniz editörde **merhaba dünya** projesini açın. Akıllı sözleşmeler Solunum adı verilen bir dilde yazılmıştır ve bu da `HelloWorld.sol`akıllı sözleşmemizi yazmak için kullanacağımız şeydir.

1. `contracts`Klasöre gidin ve adı verilen yeni bir dosya oluşturun`HelloWorld.sol`
2. Bu eğitim için kullanacağımız [Ethereum Vakfı](https://ethereum.org/en/)'ndan örnek bir Hello World akıllı sözleşmesi örneği aşağıda verilmiştir. Aşağıdaki içeriği kopyalayıp `HelloWorld.sol` dosyanıza yapıştırın ve bu sözleşmenin ne yaptığını anlamak için yorumları okuyun:

```solidity
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Bu, oluşturulması üzerine bir mesaj saklayan ve `update` fonksiyonu ile güncellenebilen süper basit bir akıllı sözleşmedir.

### MetaMask ve Simya ile bağlayın {#connect-with-metamask-alchemy}

Bir Metamask cüzdanı oluşturduk, Alchemy hesabı açtık ve akıllı sözleşmemizi yazdık; şimdi bu üçünü birbirine bağlama zamanı.

Sanal cüzdanınızdan gönderilen her işlem, eşsiz özel anahtarınızı kullanan bir imza gerektirir. Programımıza bu izni vermek için özel anahtarımızı (ve Alchemy API anahtarını) bir ortam dosyasında güvenli bir şekilde saklayabiliriz.

İlk olarak, proje dizininize dotenv paketini kurun:

```bash
npm install dotenv --save
```

Ardından, projemizin kök dizininde bir `.env` dosyası oluşturun ve buna Metamask özel anahtarınızı ve HTTP Alchemy API URL'nizi ekleyin.

:::warning Uyarı

Çevre dosyanız adlandırılmalıdır `.env`veya bir ortam dosyası olarak kabul edilmez. `process.env` veya `.env-custom` olarak veya başka şekilde adlandırmayın.

Ayrıca, projenizi yönetmek için git gibi bir sürüm kontrol sistemi kullanıyorsanız, lütfen dosyayı **izlemeyin.**`.env` Gizli verileri yayınlamamak için `.env``.gitignore`dosyanıza ekleyin.

:::

* Özel anahtarınızı dışa aktarmak için [bu talimatları](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) izleyin
* Alchemy HTTP API anahtarınızı (RPC URL) almak için hesabınızın kontrol panosunda **Hello World** uygulamanıza gidin ve Sağ üst köşedeki **Anahtarı** to tıklayın.

`.env` aşağıdaki gibi görünmelidir:

```
API_URL = "https://polygon-mumbai.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Bunları kodumuza bağlamak için bu değişkenleri daha sonra bu öğretici içinde `hardhat.config.js`dosyamızda referans alacağız.

### Ethers.js yükleyin {#install-ethers-js}

Ether.js, [standart JSON-RPC metotlarını](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) daha kullanıcı dostu metotlarla sararak Ethereum ile etkileşim kurmayı ve Ethereum'a talepler göndermeyi kolaylaştıran bir kütüphanedir.

Hardhat ek araçlar ve daha fazla işlevsellik için [eklentiler](https://hardhat.org/plugins/) entegre etmeyi kolaylaştırır. Sözleşme devreye almak için [Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) eklentisinden yararlanacağız. [Ether.js](https://github.com/ethers-io/ethers.js/)'de faydalı sözleşme devreye alma metotları vardır.

Proje dizininde şunları yazın:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Bir sonraki adımda `hardhat.config.js`'de ether'lere ihtiyacımız olacak.

### hardhat.config.js güncelleyin {#update-hardhat-config-js}

Şimdiye kadar birkaç bağımlılık ve eklentiyi ekledik. Şimdi projemizin bu bağımlılıkları tanıması `hardhat.config.js`için güncellememiz gerekiyor.

Şu şekilde görünmesi için `hardhat.config.js`'nizi güncelleyin:

```javascript
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

### Akıllı Sözleşmemizi Derleyin {#compile-our-smart-contract}

Buraya kadar her şeyin çalıştığından emin olmak için sözleşmemizi derleyelim. `compile` görevi, yerleşik hardhat görevlerinden biridir.

Komut satırından aşağıdakini çalıştırın:

```bash
npx hardhat compile
```

Bu konuda bir uyarı `SPDX license identifier not provided in source file`alabilirsiniz, ancak uygulama hala iyi çalışıyor olabilir. Çalışmıyorsa, istediğiniz zaman [Alchemy discord](https://discord.gg/u72VCg3)'a mesaj yazabilirsiniz.

### Dağıtımcı senaryomuzu yazın {#write-our-deploy-script}

Artık sözleşmemiz yazıldığına ve yapılandırma dosyamız hazır olduğuna göre, şimdi sözleşmeyi devreye alma betiğimizi yazma zamanı.

`scripts/` klasörüne gidin ve `deploy.js` adlı yeni bir dosya oluşturun ve içine aşağıdakileri ekleyin:

```javascript
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");   
   console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Bu kod satırlarından her birinin ne yaptığı konusunda Hardhat ekibinin bu [Sözleşme eğitimindeki](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) açıklamalarını benimsedik.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Ethers.js'deki bir `ContractFactory`, yeni akıllı sözleşmeler devreye almak için kullanılan bir soyutlamadır; bu nedenle, `HelloWorld` burada hello world sözleşmemizin olayları için bir [fabrikadır](https://en.wikipedia.org/wiki/Factory\_\(object-oriented\_programming\)). `hardhat-ethers` eklentisi `ContractFactory` ve `Contract` kullanırken, oturumlar varsayılan olarak birinci imzalayana (sahibe) bağlanır.

```javascript
const hello_world = await HelloWorld.deploy();
```

Bir `ContractFactory` üzerinde `deploy()` çağırmak, devreye alma işlemini başlatacak ve bir `Contract` nesnesine çözümlenen bir `Promise` döndürecektir. Bu, akıllı sözleşme fonksiyonlarımızdan her biri için bir metoda sahip olan nesnedir.

### Akıllı Sözleşmemizi Dağıtın {#deploy-our-smart-contract}

Komut satırına gidin ve aşağıdakini çalıştırın:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

Bunun gibi bir şeyi görmelisiniz:

```bash
Contract deployed to address: 0x3d94af870ED272Cd5370e4135F9B2Bd0e311d65D
```

[Polygon Mumbai](https://mumbai.polygonscan.com/) the gidip sözleşme adresimizi araştırırsak, bunun başarılı bir şekilde konuşlandırıldığını görmeliyiz.

Bu `From`adres, MetaMask hesap adresinizle eşleşmeli ve `To`adres **Sözleşme Oluşturma** diyecektir. Ancak işlemi tıklarsak, sözleşme adresimizi sahada `To`göreceğiz.

![img](/img/alchemy/polygon-scan.png)

### Sözleşmeyi doğrulama {#verify-the-contract}

Alchemy akıllı sözleşme ile birlikte kullanılan yöntemler hakkında bilgi bulabileceğiniz bir [kaşif](https://dashboard.alchemyapi.io/explorer) sağlar; buna yanıt süresi, HTTP durumu, hata kodları gibi. Sözleşmenizi doğrulamak ve işlemlerin onaylanıp onaylanmadığını denetlemek için iyi bir ortamdır.

![img](/img/alchemy/calls.png)

**Tebrikler! Polygon Mumbai ağına akıllı bir sözleşme uyguladınız.**

## Ek Kaynaklar {#additional-resources}

- [Bir NFT Akıllı Sözleşme Nasıl Geliştirilir](https://docs.alchemy.com/docs/how-to-develop-an-nft-smart-contract-erc721-with-alchemy) - Alchemy bu konuda bir Youtube videosu ile yazılı bir öğretici vardır. Bu hafta 10 haftalık **Road to Web3** dev serisinin 1. haftasında
- [Polygon API Quickstart](https://docs.alchemy.com/reference/polygon-api-quickstart) - Alchemy'nin geliştirici dokümanı ve Polygon ile kalkış ve çalışma kılavuzları
