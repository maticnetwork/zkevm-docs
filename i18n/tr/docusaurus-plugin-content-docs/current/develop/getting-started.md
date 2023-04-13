---
id: getting-started
title: Polygon PoS'a Giriş
sidebar_label: Quick Start
description: Bir sonraki blok zinciri uygulamanızı Polygon üzerinde geliştirin.
keywords:
  - docs
  - matic
  - polygon
  - build on polygon
  - blockchain
  - introduction
  - how to launch dapp
  - dapps
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::caution Geliştirme Belgeleri Güncelleniyor

Belgeler güncelleniyor, geliştiriliyor ve iyileştiriliyor. Bu belgelerde değişiklikler yapılabilir.
Lütfen herhangi bir soru veya öneriniz varsa yardım çağrısı ya da çekme talebi oluşturmaktan çekinmeyin.

:::

**Polygon'a (eski adıyla Matic Ağı)** hoş geldiniz! Blok zinciri uygulamanızı geliştirmek için en yenilikçi ve heyecanlı platform. Blok zinciri teknolojisi, dijital dünyanın veriyi yönetme ve işleri yürütme şeklinde devrim yaratmak için hazırdır. Polygon'un merkezi olmayan uygulama (dApp) geliştirmesinde ön safta yer alarak bu devrime katılabilirsiniz.

Bu kılavuz sizi polygon ekosistemi ile tanıştıracaktır. Sizi sadece Polygon üzerinde değil, aynı zamanda genel anlamda blok zinciri uygulama geliştirmesi konusunda bilgilendirecek değerli kaynaklar ve web siteleri için bağlantılar bulacaksınız.

:::tip Gelişmelerden haberdar olun

Şuraya abone olarak Polygon ekibi ve topluluğundaki en son düğüm ve
 doğrulayıcı güncellemelerinden haberdar olun:
[<ins>Polygon bildirim grupları</ins>](https://polygon.technology/notifications/).

:::

## Polygon'un Öne Çıkan Özellikleri {#key-features-of-polygon}

- **Speed**: Polygon Ağı, her kontrol noktasında paydaşlar tarafından seçilen bir Blok Üreticisi grubu tarafından sağlanan konsensüs ile yüksek verim sağlayan bir blok zinciri kullanır. Blokları doğrulamak ve Blok Üreticilerinin kanıtlarını Ethereum mainnet üzerine periyodik olarak göndermek için bir Hisse Kanıtı katmanı kullanılır. Bu yöntem yüksek oranda merkezi olmayan yapıyı korurken yaklaşık 2 saniyelik blok doğrulama hızlarına izin verir, bu sayede ağ için harika veri hacimleri sağlar.
- Polygon **Network,** tek bir yan zincir üzerinde varsayımsal bir işlem hızına 2 saniyeden daha az ulaşmaktadır. Birden fazla yan zincir kullanmak, ağın saniyede milyonlarca işlem yürütmesine yardımcı olur. Bu mekanizma (ilk Matic yan zinciri üzerinde zaten kanıtlanmıştır) Polygon ağının kolayca ölçeklenmesine izin verir.
- **Güvenlik**: Polygon'un akıllı sözleşmeleri Ethereum'un güvenliğine güvenir. Ağı korumak için üç kritik güvenlik modeli kullanır. Ethereum'un **staking yönetim sözleşmelerinin** yanında **Heimdall** ve **Bor** düğümleri çalıştıran bir teşvikli doğrulayıcı grubu kullanır. Geliştiriciler ayrıca her iki modeli de (Hibrit) dApp'leri içine uygulayabilir.

## Polygon üzerinde geliştirme {#building-on-polygon}

Bir Ethereum geliştiricisi iseniz, bu zaten bir Polygon geliştiricisi olduğunuz anlamına gelir. [Polygon RPC](https://polygon-rpc.com/)'ye geçin ve kullanmaya başlayın. Ethereum blok zinciri üzerinde aşina olduğunuz Truffle, Remix ve Web3js gibi tüm araçlar, Polygon üzerinde varsayılan olarak desteklenmektedir.

Polygon Mumbai Testnet veya Mainnet üzerinde merkezi olmayan uygulamaları devreye alabilirsiniz. Polygon Mumbai Test Ağı, ParentChain olarak iş gören Ethereum Goërli Test Ağı ile bağlantı kurar. Ağ ile ilgili tüm ayrıntıları [ağ belgelerinde](https://github.com/maticnetwork/matic-docs/blob/master/docs/operate/network.md) bulabilirsiniz.

### Cüzdanlar {#wallets}

Polygon Ağı ile etkileşim kurmak için Ethereum tabanlı bir cüzdana sahip olmanız gerekir, çünkü Polygon, Ethereum Virtual Machine (EVM) üzerinde çalışır. [Metamask](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/metamask/overview.md) veya [Arkane](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/wallets/arkane/intro_arkane.md) Cüzdanı kurmayı seçebilirsiniz. Cüzdan ile ilgili bilgiler ve neden bir tanesine ihtiyacınız olduğu hakkında daha fazla bilgi [cüzdan](https://docs.polygon.technology/docs/develop/wallets/getting-started) in bulunabilir.

### Akıllı Sözleşmeler {#smart-contracts}

Polygon merkezi olmayan uygulamalar için Polygon ağı üzerinde test etme, derleme, hata ayıklama ve devreye alma için kullanabileceğiniz birçok hizmeti destekler. Bunlar arasında [Alchemy](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/alchemy.md), [Chainstack](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/chainstack.md), [QuickNode](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/quicknode.md), [Remix](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/remix.md), [Truffle](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/truffle.md), [Hardhat](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/hardhat.md) ve [Replit](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/replit.md) kullanarak devreye alma yer alır.

### Polygon'a Bağlanma {#connecting-to-polygon}

Polygon'u Metamask'a ekleyebilir veya [RPC](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/) kullanarak Polygon'a bağlanmanızı sağlayan Arkane'i doğrudan kullanabilirsiniz.

Blok zinciri bilgilerini okumak için Polygon ağı ile bağlantı kurmak için, Alchemy SDK kullanılmasını öneririz.

```js
// Javascript
// Setup: npm install alchemy-sdk
const { Alchemy, Network } = require("alchemy-sdk");

const settings = {
  apiKey: "demo", // Can replace with your API Key from https://www.alchemy.com
  network: Network.MATIC_MAINNET, // Can replace with MATIC_MUMBAI
};

const alchemy = new Alchemy(settings);

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

main();
```

### Polygon üzerinde yeni bir dApp oluşturma? {#building-a-new-dapp-on-polygon}

Merkezi olmayan uygulamalar (dApp'ler) kullanıcılar ve blok zinciri üzerindeki verilerinin gizliliği arasında bir köprü görevi görür. Artan dApp sayısı, blok zinciri ekosistemi içindeki faydalarını doğrularken; akıllı sözleşmeler üzerinden merkezi bir otoriteye ihtiyaç duymadan iki katılımcı arasında işlem yürütme gibi zorluklar için de çözüm sağlıyor.

Merkezi olmayan uygulamalar (dApp'ler) oluşturma konusunda daha önce hiç bir deneyiminiz olmadığını varsayalım. Bu durumda, aşağıda belirtilen kaynaklar size Polygon Ağı üzerinde dApp oluşturma, hata ayıklama ve devreye alma için gerekli araçlarla ilgili bir giriş yapmanıza yardımcı olacaktır.

- [Tam Yığın dApp: Eğitim Serisi](https://kauri.io/full-stack-dapp-tutorial-series/5b8e401ee727370001c942e3/c)
- [Web3.js](https://www.dappuniversity.com/articles/web3-js-intro)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Remix](https://docs.polygon.technology/docs/develop/remix/)
- [Truffle](https://docs.polygon.technology/docs/develop/truffle)
- [Metamask](https://docs.polygon.technology/docs/develop/metamask/overview)
- [Arkane](https://docs.polygon.technology/docs/develop/wallets/arkane/intro)
- [Fauna, Polygon ve React kullanarak bir dApp geliştirin](https://docs.polygon.technology/docs/develop/dapp-fauna-polygon-react)

### Zaten bir dApp'iniz var mı? {#already-have-a-dapp}

Zaten merkezi olmayan bir uygulama (dApp) kullanıyorsanız ve verimli bir şekilde ölçeklenmenize yardımcı olacak bir platform arıyorsanız, doğru yerdesiniz. Çünkü Polygon sizlere şunları sağlar:

1. **Ethereum Sanal Makine (EVM) tabanlı zincirden kolayca geçiş yapın**: Polygon, Ethereum için en üst düzey Katman-2 ölçekleme çözümü olmakla övünür. dApp'leriniz EVM ile uyumlu olduğu sürece, onları Polygon Ağında taşıma veya devreye alma sırasında temelindeki mimari hakkında endişelenmenize gerek yoktur.
2. **Polygon'u daha hızlı bir işlem katmanı olarak kullanın**: dApp'inizi Polygon Mainnet üzerinde devreye almak, Polygon'u dApp'iniz için daha hızlı bir işlem katmanı olarak kullanarak fayda sağlamanıza olanak tanır. Ayrıca token'larınızı sizin için eşleyebiliriz. Daha fazla bilgi için Telegram [üzerindeki teknik tartışma grubumuza](http://bit.ly/matic-technical-group) katılabilirsiniz.

## Yan Not {#side-note}

Tüm bunların karmaşık görünmesi çok normal! Hemen aksiyona geçebilir ve işe koyulabilirsiniz. Kaynaklara, bilgi depolarına ve belgelere dalmadan önce birkaç not:

1. **En ileri teknoloji cephesinde olmanın maliyetini unutmayın**: Tipik niş programlamada olduğu gibi, dApp'ler ve blok zinciri gelişimi çok hızlı bir şekilde ilerliyor. Araştırma yaparken karmaşık kod depolarına, 404 hatalarına ve belge sitelerine rast gelebilirsiniz, hatta hiçbir belge dahi bulamayabilirsiniz. Bunu fırsata çevirip bize herhangi bir sosyal medya kanalı üzerinden ulaşabilirsiniz.
2. **Öğrenme eğrisi korkutucu olabilir; ancak giriş bariyeri çok düşüktür**: Topluluk çok açık ve misafirperverdir! Projeler dışarıdan gelen çekme isteklerini memnuniyetle karşılar ve herhangi bir engeli çözümlemek için aktif bir şekilde çalışır. Daha iyi bir dünya oluşturmaya çalışıyoruz ve herhangi bir katkıyı şükranla karşılıyoruz. Bu harika Web3 ekosisteme katılımınız için size minnettar olacağız.

:::info Güncellemeleri Takip Edin

Merkezi olmayan uygulama geliştirme, ağ merkezyetsizliğini teşvik eder. Polygon ekosistemi hakkında daha fazla görüş ve güncelleme için sosyal medya kanallarımızı takip edin. Tüm Polygon toplulukları için bağlantıları [burada](https://polygon.technology/community/) bulabilirsiniz.

:::
