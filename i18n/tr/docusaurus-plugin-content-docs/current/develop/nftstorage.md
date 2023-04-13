---
id: nftstorage
title: NFT'ler Mint Edin
description: NFT.storage ve Polygon ile mint edin.
keywords:
  - nft.storage
  - filecoin
  - matic
  - polygon
  - docs
  - mint nfts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Bu eğitim makalesinde NFT.Storage yoluyla Polygon blok zincirini ve IPFS/Filecoin storage'ı kullanarak bir NFT mint etmeyi öğreneceksiniz. Ethereum için bir Katman 2 ölçekleme çözümü olan Polygon, hızı ve düşük işlem maliyetleri, bunun yanı sıra Ethereum EVM ile tam uyumlu olması nedeniyle geliştiriciler tarafından sıklıkla tercih edilmektedir. Bu eğitim makalesinde size standartlaştırılmış bir akıllı sözleşmenin oluşturulması ve devreye alınması, NFT.Storage API yoluyla IPFS'de ve Filecoin'de meta verilerin ve varlıkların depolanması ve NFT'nin Polygon'daki kendi cüzdanınıza mint edilmesi adımları gösterilecektir.

## Giriş {#introduction}

Bu eğitim makalesinde mint etme işlemimizle üç özelliği gerçekleştirmeyi amaçlıyoruz:

1. Mint etme işleminin maliyet ve iş çıkarma yeteneği açısından *ölçeklenebilirliği*. Kullanım senaryosu hızlı bir şekilde NFT'ler oluşturmayı amaçlıyorsa, altta yatan teknolojinin tüm mint etme taleplerini işleyebilmesi ve mint etmenin ucuz olması gerekir.
2. NFT'nin *dayanıklılığı*, zira varlıklar uzun ömürlü olabilir ve bu nedenle ömürleri boyunca kullanılabilir olmaları gerekir.
3. NFT'nin ve temsil ettiği varlığın *değiştirilemezliği*, bu yolla istem dışı değişikliklerin ve kötü niyetli aktörlerin NFT'nin temsil ettiği dijital varlığı değiştirmelerinin önlenmesi.

[Polygon](https://polygon.technology) *ölçeklenebilirlik* özelliğini protokolü ve altyapısı yoluyla gerçekleştirir. Polygon ayrıca Ethereum'la ve onun sanal makinesiyle uyumludur ve geliştiricilerin kodlarını iki blok zinciri arasında serbestçe taşımasına imkân verir. Aynı şekilde, [NFT.Storage](https://nft.storage) altta yatan [Filecoin](https://filecoin.io) ağının desteğiyle *dayanıklılığı* ve IPFS'in [içerik adreslemesini](https://nftschool.dev/concepts/content-addressing/) kullanarak *değiştirilemezliği* garanti eder.

Bu eğitim makalesinde NFT mint etme işlemine genel bir bakış bulacak ve NFT.Storage ile bir dijital varlığın nasıl saklanacağını ve bu varlığı NFT'nizi Polygon'da mint etmek için nasıl kullanacağınızı öğreneceksiniz.

## Ön Koşullar {#prerequisites}

NFT'ler hakkındaki bu genel bilgiler size arka plan ve bağlam sağlayacaktır. [NFT Okulu NFT temel](https://nftschool.dev/concepts/non-fungible-tokens/) ve ileri düzey konuları kapsar ve daha nice eğitimler içerir.

Bu eğitim makalesinde bulunan kodu test etmek ve çalıştırmak için çalışan bir [Node.js kurulumuna](https://nodejs.org/en/download/package-manager/) ihtiyacınız olacaktır.

Ayrıca Mumbai test ağı üzerindeki Polygon cüzdanı içinde küçük bir miktar MATIC token'a ihtiyacınız olacaktır. Başlamak için aşağıdaki talimatları takip edin:

1. **[Metamask](https://metamask.io/) indirin ve kurun**. Metamask bir kripto cüzdandır ve blok zinciri uygulamalarına bir giriş kapısıdır. Kullanımı çok kolaydır ve birçok adımı (ör. Polygon cüzdanı kurma) basitleştirir.
2. **Metamask'ı Polygon'un [Mumbai test ağına](https://docs.polygon.technology/docs/develop/metamask/overview) bağlayın** ve açılır menüde seçin. NFT'mizi mint etmek için Polygon'un test ağını kullanacağız, çünkü bu ağ ücretsizdir.
3. [Faucet](https://faucet.polygon.technology/) kullanarak cüzdanınıza **MATIC token alın**. Mumbai test ağını seçin ve Metamask'tan gelen cüzdan adresinizi forma yapıştırın. Bir NFT mint etmek için küçük miktarda MATIC ödememiz gerekiyor; MATIC, madencilerin blok zincire örneğin bir NFT mint edilmesi veya yeni bir akıllı sözleşme oluşturulması gibi yeni işlemler eklemek için gerçekleştirdikleri faaliyetler için aldıkları bir ücrettir.
4. Metamask'tan gelen **özel anahtarınızı** sağ üst köşedeki üç noktayı tıklayıp "Hesap bilgileri"ni seçerek kopyalayın. Alt kısımda özel anahtarınızı dışa aktarmak için bir düğme mevcuttur. Bu düğmeye tıklayın ve istendiğinde şifrenizi girin. Özel anahtarı kopyalayıp şimdilik bir metin dosyasına yapıştırabilirsiniz. Bu özel anahtarı ileride blok zinciri ile etkileşimde bulunurken kullanacağız.

Son olarak, bir metin veya kod editörüne ihtiyacınız olacaktır. Daha fazla kolaylık için hem JavaScript hem de Solidity için dil desteği sunan bir editör seçin. [Solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) uzantısı etkinleştirilmiş [Visual Studio Code](https://code.visualstudio.com) iyi bir seçenektir.

## Hazırlık {#preparation}

### NFT.storage için bir API anahtarı edinin {#get-an-api-key-for-nft-storage}

NFT.Storage kullanmak için bir API anahtarına ihtiyacınız vardır. Önce [NFT.Storage'a giderek e-posta adresinizle giriş yapın](https://nft.storage/login/). Giriş yapmanız için sihirli bir bağlantı içeren bir e-posta alacaksınız -- şifre gerektirmez. Başarılı bir şekilde giriş yaptıktan sonra gezinti çubuğu yoluyla API Anahtarları'na gidin. **Yeni Anahtar** oluşturmak için bir düğme bulacaksınız. Bir API anahtarı adı sorulduğunda, istediğiniz şekilde birini seçebilir veya "polygon + NFT.Storage" kullanabilirsiniz. Şimdi anahtar sütununun içeriğini kopyalayabilir veya eğitimin devamında NFT.Storage'a tekrar başvurabilirsiniz.

### Çalışma alanınızı yapılandırın {#set-up-your-workspace}

Bu eğitim için çalışma alanımız olarak kullanabileceğimiz yeni bir boş klasör oluşturun. Dosya sisteminiz üzerinde herhangi bir ad ve konum seçin. Bir terminali açın ve yeni oluşturulan klasöre gidin.

Ardından, aşağıdaki Node.js bağımlılıklarını kuracağız:

- Ethereum (ve Polygon gibi Ethereum uyumlu blok zincirleri) için bir geliştirme ortamı olan **Hardhat ve Hardhat-Ethers**.
- Standartlaştırılmış NFT tabanlı sözleşmeleri içeren bir akıllı sözleşme koleksiyonu olan **OpenZeppelin**.
- NFT.Storage API'ye bağlanmak için bir kütüphane olan **NFT.Storage**.
- Ortam dosyalarını yapılandırma (ör. betiğe özel anahtarları yerleştirme) için işlemeye yönelik bir kütüphane olan **Dotenv**.

Tüm bağımlılıkları tek seferde kurmak için aşağıdaki komutu kullanın:

```bash
npm install hardhat @openzeppelin/contracts nft.storage dotenv @nomiclabs/hardhat-ethers
```

Hardhat'in mevcut klasörde başlatılması gerekir. Başlatmayı tetiklemek için şunu yürütün:

```bash
npx hardhat
```

İstenildiği zaman **boş bir hardhat.config.js oluştur'u** seçin. Konsol çıktınız şuna benzemelidir:

```bash
✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

Polygon Mumbai test ağını desteklemek için hardhat yapılandırma dosyası olan `hardhat.config.js` üzerinde bazı değişiklikler yapacağız. Son adımda oluşturulan `hardhat.config.js` dosyasını açın. Polygon cüzdan özel anahtarınızı bir ortam dosyasından yüklediğimizi ve bu ortam dosyasının güvenli tutulması gerektiğini unutmayın. Gerektiği takdirde diğer rpc [bağlantısını](https://docs.polygon.technology/docs/operate/network) da kullanabilirsiniz.

```js
/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { PRIVATE_KEY } = process.env;
module.exports = {
  defaultNetwork: "PolygonMumbai",
  networks: {
    hardhat: {
    },
    PolygonMumbai : {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

NFT.Storage ve Polygon cüzdanı özel anahtarınız için API anahtarınızı tutacak yeni bir `.env`dosya oluşturun. `.env`Dosyanın içeriği şu şekilde görünmelidir:

```bash
PRIVATE_KEY="Your Private Key"
NFT_STORAGE_API_KEY="Your Api Key"
```

Yer tutucular yerine hazırlık sırasında oluşturduğunuz API anahtarını ve Polygon cüzdanı özel anahtarınızı koyun.

Projemizi düzenli tutmak için üç yeni klasör oluşturacağız:

1. `contracts`, Solidity ile yazılmış Polygon sözleşmeleri için.
2. `assets`, NFT olarak mint edeceğimiz dijital varlığı içerecektir.
3. `scripts`, hazırlık ve mint işlemini desteklemek için yardımcı olarak kullanılacaktır.

Aşağıdaki komutu yürütün:

```bash
mkdir contracts assets scripts
```

Son olarak, `assets` klasörüne bir görüntü ekleyeceğiz. Bu görüntü NFT.Storage'a yükleyeceğimiz ve Polygon üzerinde mint edeceğimiz görselimiz olacaktır. Şimdilik `MyExampleNFT.png` adını vereceğiz. Hazırda güzel bir görseliniz yoksa, [basit bir model indirebilirsiniz](https://ipfs.io/ipfs/bafkreiawxb4aji744637trok275odl33ioiijsvvahnat2kw5va3at45mu).

## NFT'nizi Mint Etme {#minting-your-nft}

### NFT.Storage ile varlık verisini depolama {#storing-asset-data-with-nft-storage}

Dijital varlığımızı ve meta verisini saklamak için NFT.Storage kullanacağız. NFT.Storage dijital varlığınızı Filecoin ve IPFS üzerine otomatik olarak yükleyerek değiştirilemezlik ve dayanıklılık garantisi verir. IPFS ve Filecoin değiştirilemez başvuru için içerik tanımlayıcıları (CID) üzerinde çalışır. IPFS coğrafi olarak kopyalanmış önbelleği ile hızlı bilgi getirme sağlar ve Filecoin teşvikli depolama sağlayıcıları ile dayanıklılık garantisi verir.

`scripts` dizininin altında `store-asset.mjs` adında bir betik oluşturun. İçerikler aşağıda listelenmiştir:

```js
import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const { NFT_STORAGE_API_KEY } = process.env

async function storeAsset() {
   const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })
   const metadata = await client.store({
       name: 'ExampleNFT',
       description: 'My ExampleNFT is an awesome artwork!',
       image: new File(
           [await fs.promises.readFile('assets/MyExampleNFT.png')],
           'MyExampleNFT.png',
           { type: 'image/png' }
       ),
   })
   console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
}

storeAsset()
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

Bu betiğin ana kısmı `storeAsset` fonksiyonudur. Daha önce oluşturduğunuz API anahtarını kullanarak NFT.Storage ile bağlantı kuran yeni bir istemci oluşturur. Daha sonra isim, açıklama ve görüntü içeren meta veriyi ekliyoruz. NFT varlığını doğrudan dosya sisteminden `assets` dizininden okuduğumuzu aklınızda bulundurun. Fonksiyonun sonunda meta veri URL'sini yazdıracağız, çünkü bu meta veriyi daha sonra NFT'yi Polygon'da oluştururken kullanacağız.

Kurduktan sonra betiği yürütmek için şu komutu çalıştırın:

```bash
node scripts/store-asset.mjs
```

Çıktınız aşağıdaki liste gibi görünmelidir, burada `HASH`, az önce depoladığınız eserin CID'sidir.

```bash
Metadata stored on Filecoin/IPFS at URL: ipfs://HASH/metadata.json
```

### NFT'nizi Polygon'da Oluşturma {#creating-your-nft-on-polygon}

#### Mint etmek için akıllı sözleşme oluşturun {#create-the-smart-contract-for-minting}

Önce NFT'yi mint etmek için kullanılacak akıllı sözleşmeyi oluşturacağız. Polygon Ethereum ile uyumlu olduğu için akıllı sözleşmeyi [Solidity](https://soliditylang.org) dilinde yazacağız. NFT akıllı sözleşmemiz için `contracts` dizininde `ExampleNFT.sol` adında yeni bir dosya oluşturun. Aşağıdaki listenin kodunu kopyalayabilirsiniz:

```solidity
// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExampleNFT is ERC721URIStorage, Ownable {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() ERC721("NFT", "ENFT") {}

   function mintNFT(address recipient, string memory tokenURI)
       public onlyOwner
       returns (uint256)
   {
       _tokenIds.increment();

       uint256 newItemId = _tokenIds.current();
       _mint(recipient, newItemId);
       _setTokenURI(newItemId, tokenURI);

       return newItemId;
   }
}
```

Geçerli bir NFT olması için akıllı sözleşmenizin [ERC-721 standardının](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/) tüm metotlarını uygulaması gerekir. Halihazırda bir temel fonksiyonlar kümesi sağlayan ve standarda bağlı kalan [OpenZeppelin](https://openzeppelin.com) kütüphanesinin uygulamasını kullanıyoruz.

Akıllı sözleşmemizin üst kısmında üç OpenZeppelin akıllı sözleşme sınıfını içe aktarıyoruz:

1. `\@openzeppelin/contracts/token/ERC721/ERC721.sol`, NFT akıllı sözleşmemizin devralacağı ERC-721 standardının temel metotlarının uygulamasını içerir. Sadece varlıkları değil, meta veriyi de zincir dışı bir JSON dosyası olarak saklayacak bir uzantı olan `ERC721URIStorage,` kullanıyoruz. Sözleşme gibi bu JSON dosyasının da ERC-721 ile uyumlu olması gerekir.

2. `\@openzeppelin/contracts/utils/Counters.sol` sadece birer birer artırılabilen veya azaltılabilen sayaçlar sağlar. Akıllı sözleşmemiz mint edilen NFT'lerin toplam sayısını takip etmek ve benzersiz kimliği yeni NFT'mize ayarlamak için bir sayaç kullanır.

3. `\@openzeppelin/contracts/access/Ownable.sol` akıllı sözleşmemizde erişim denetimini kurar, böylece yalnızca akıllı sözleşmenin sahibi (siz) NFT'ler mint edebilir.

İçe aktarma ifadelerimizden sonra özel NFT akıllı sözleşmemizi elde ettik; bu sözleşme bir sayaç, bir oluşturucu [constructor] ve NFT'yi mint etmek için bir metot içermektedir. İşin zor kısmı, ERC-721 standardıyla uyumlu bir NFT oluşturmak için ihtiyaç duyduğumuz metotların çoğunu uygulayan OpenZeppelin'den devralınan temel sözleşme tarafından yapılır.

Sayaç, mint edilen NFT'lerin toplam sayısının kaydını tutar; bu kayıt mint etme metodunda NFT'nin benzersiz bir tanımlayıcısı olarak kullanılır.

Oluşturucuda, akıllı sözleşmenin adı ve (cüzdanlarda ifade edilen) sembolü için iki dize argümanı geçiriyoruz. Bunları dilediğiniz gibi değiştirebilirsiniz.

Son olarak elimizde NFT'yi mint etmemize imkân veren `mintNFT` metodumuz var. Bu metot yalnızca akıllı sözleşmenin sahibi tarafından yürütülebilmesi için `onlyOwner` olarak ayarlanır.

`address recipient`İlk başta NFT'yi alacak adresi belirtir.

`string memory tokenURI`, NFT'nin meta verisini tanımlayan bir JSON belgesine çözümlenecek bir URL'dir. Örneğimizde bu URL halihazırda NFT.Storage'da depolanmıştır. Döndürülen meta veri JSON dosyasına IPFS bağlantısını metodun yürütülmesi sırasında kullanabiliriz.

Metot içinde, NFT'mize yeni bir benzersiz tanımlayıcı almak için sayacı artırıyoruz. Sonra OpenZeppelin'den gelen temel sözleşmeyle sağlanan metotları çağırarak NFT'yi alıcıya yeni oluşturulan tanımlayıcıyla ve meta verinin URI'sini ayarlayarak mint ediyoruz. Metot yürütüldükten sonra benzersiz tanımlayıcıyı döndürür.

#### Akıllı sözleşmeyi Polygon'da devreye alın {#deploy-the-smart-contract-to-polygon}

Şimdi sıra akıllı sözleşmemizi Polygon'da devreye almaya geldi. `scripts` dizininde `deploy-contract.mjs` adında yeni bir dosya oluşturun. Aşağıdaki listenin içeriğini o dosyaya kopyalayıp dosyayı kaydedin.

```js
async function deployContract() {
 const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
 const exampleNFT = await ExampleNFT.deploy()
 await exampleNFT.deployed()
 // This solves the bug in Mumbai network where the contract address is not the real one
 const txHash = exampleNFT.deployTransaction.hash
 const txReceipt = await ethers.provider.waitForTransaction(txHash)
 const contractAddress = txReceipt.contractAddress
 console.log("Contract deployed to address:", contractAddress)
}

deployContract()
 .then(() => process.exit(0))
 .catch((error) => {
   console.error(error);
   process.exit(1);
 });
```

Sözleşmenin devreye alınması hardhat kütüphanesinin sağladığı yardımcı fonksiyonlar ile yapılır. İlk olarak bir önceki adımda oluşturduğumuz akıllı sözleşmeyi sağlanan fabrikayla alıyoruz. Sonra akıllı sözleşmeyi ilgili metodu çağırarak devreye alıyor ve devreye almanın tamamlanmasını bekliyoruz. Açıklanan kodun alt kısmında test ağı ortamında doğru adresi getirecek birkaç satır daha vardır. Dosyayı `mjs`kaydedin.

Aşağıdaki komutla scripti uygulayın:

```bash
npx hardhat run scripts/deploy-contract.mjs --network PolygonMumbai
```

Her şey doğruysa, aşağıdaki çıktıyı göreceksiniz:

```bash
Contract deployed to address: 0x{YOUR_CONTRACT_ADDRESS}
```

Yazdırılan sözleşme adresine mint etme adımında ihtiyacınız olacağını aklınızda bulundurun. Bu adresi kopyalayıp ayrı bir metin dosyasına yapıştırabilir ve daha sonra kullanmak üzere kaydedebilirsiniz. Bu, mint etme betiğinin o spesifik sözleşmenin mint etme metodunu çağırabilmesi için gereklidir.

#### NFT'nin Polygon'da Mint Edilmesi {#minting-the-nft-on-polygon}

NFT'yi mint etmek için şimdi tek gereken az önce Polygon'da devreye aldığımız sözleşmeyi çağırmaktır. `scripts` dizininde `mint-nft.mjs` adında yeni bir dosya oluşturun ve bu kodu aşağıdaki listeden kopyalayın:

```bash
const CONTRACT_ADDRESS = "0x00"
const META_DATA_URL = "ipfs://XX"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

İlk iki satırı düzenleyerek önceki devreye almadan gelen **sözleşme adresinizi** ve varlığı NFT.Storage'da depolarken döndürülen **meta veri URL'sini** girin. Betiğin geri kalanı akıllı sözleşmenize çağrıyı NFT'nin sahibi olarak size ve işaretçiyi IPFS'de depolanan meta veriye ayarlar.

Ardından şu betiği çalıştırın:

```bash
npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai
```

Aşağıdaki çıktıyı görmeyi bekleyebilirsiniz:

```bash
NFT minted to: 0x<YOUR_WALLET_ADDRESS>
```

Bu eğitimdeki örnek kodu mu arıyorsunuz? Bu kodu polygon-nft.storage-demo [bağlantısındaki](https://github.com/itsPiyushMaheshwari/Polygon-nft.storage-demo) Github bilgi deposunda bulabilirsiniz.

## Sonuç {#conclusion}

Bu eğitim makalesinde bir NFT'yi Polygon ve NFT.Storage'da uçtan uca nasıl mint edeceğimizi öğrendik. Bu teknoloji kombinasyonu düzgün bir merkeziyetsizlik sağlar ve *ölçeklenebilirliği*, *dayanıklılığı* ve *değiştirilemezliği* garanti eder.

Bir özel akıllı sözleşme devreye alarak ihtiyaçlarımıza özgü NFT'mizi mint ettik. Bu eğitim makalesinde ERC-721 standardına dayalı basit bir örnek kullandık. Öte yandan, NFT'nizin yaşam döngüsünü yöneten karmaşık bir mantık da tanımlayabilirsiniz. Daha karmaşık kullanım senaryoları için daha yeni [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/) standardı iyi bir başlangıç noktasıdır. Eğitim makalemizde kullandığımız OpenZeppelin kütüphanesi, NFT sözleşmeleri oluşturmaya yardımcı olan bir [sözleşme sihirbazı](https://docs.openzeppelin.com/contracts/4.x/wizard) sunar.

Başarılı mint etme, NFT'nin değerli evresinin başlangıcı olarak görülebilir. NFT daha sonra sahipliği kanıtlamak için kullanılabilir ve diğer kullanıcılara aktarılabilir. Bir NFT aktarmanın nedenleri arasında [OpenSea](https://opensea.io) gibi NFT pazarlarından birinde başarılı bir satış yapmak veya NFT tabanlı bir oyunda bir eşya edinmek gibi farklı olay türleri yer alır. NFT'lerin sunduğu zengin olasılıkları keşfetmek kesinlikle heyecanlı bir adımdır.

NFT projenizi NFT.storage ile inşa etmenize yardımcı olmak istiyorsanız, D[iscord ](https://discord.gg/Z4H6tdECb9)ve [Slack](https://filecoinproject.slack.com/archives/C021JJRH26B) üzerindeki `#nft-storage`kanala katılmanızı öneririz.
