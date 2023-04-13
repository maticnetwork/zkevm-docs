---
id: getting-started
title: Plasma Köprüsü
sidebar_label: Introduction
description: Plasma köprüsü ve Polygon Ağı ile etkileşime geçin.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Kullanmaya başlamak için en yeni [Plasma Matic.js belgelerini](https://maticnetwork.github.io/matic.js/docs/plasma/) inceleyin.

Köprü, temelinde varlıkları kök zincirden alt zincir üzerine taşımaya yardımcı olan bir sözleşmeler setidir. Varlıkları Ethereum ve Polygon arasında taşımak için başlıca iki köprü bulunmaktadır. Birincisi Plasma bridge ve ikincisi **PoS köprüsü** ya da **Proof of Stake (Hisse Kanıtı) köprüsü** olarak adlandırılır. **Plazma** köprüsü, Plazma çıkış mekanizması nedeniyle daha fazla güvenlik garantisi sağlar.

Bununla birlikte, alt token üzerinde belirli kısıtlamalar vardır ve Polygon'dan Ethereum'a Plasma köprüsü üzerinden yapılan çıkışlar/çekimler için 7 günlük bir fon çekme dönemi söz konusudur. [PoS köprüsü](/docs/develop/ethereum-polygon/pos/getting-started) daha esnektir ve daha hızlı fon çekme özelliğine sahiptir.

Bu eğitim, Plasma köprüsünü anlamak ve kullanmak için adım adım bir kılavuz olarak hareket [edecektir;](https://github.com/maticnetwork/matic.js) bu da Polygon Ağındaki Plazma Köprüsü ile etkileşimin en kolay yoludur.

## Plasma Köprüsü içinde varlık akışı {#assets-flow-in-plasma-bridge}

Bu eğitimde Polygon üzerinde varlık transferleri için akışı ve aynı işlemi Matic.js kullanarak nasıl yapabileceğinizi göstereceğiz:

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. Kullanıcı Polygon sözleşmesinde kripto varlıklarını ana zincir üzerinde yatırır
2. Depozito tokenleri ana zincir üzerinde onaylandıktan sonra, ilgili tokenler Polygon zincirine yansıtılacak.
   - Kullanıcı artık token'ları ihmal edilebilir ücretlerle anında istedikleri herkese aktarabilir. Polygon zinciri üzerinde daha hızlı bloklar bulunur (yaklaşık 1 saniye). Bu sayede aktarım neredeyse anında gerçekleştirilir.
3. Bir kullanıcı hazır olduğunda, kalan token'ları ana zincirden çekebilirler. Fonların çekimi Plasma Yan Zinciri üzerinden başlatılır. 5 dakikalık bir denetim noktası aralığı ayarlanır, bu aralıkta Polygon blok katmanı üzerindeki tüm bloklar son denetim noktasından itibaren doğrulanır.
4. Bu kontrol noktası Ethereum sözleşmesi için ana zincir için sunulduğunda, bir Çıkış NFT (ERC721) tokeni eşdeğer değerden oluşturulur.
5. Çekilen fonlar, bir işlem-çıkış prosedürü kullanılarak ana zincir sözleşmesinden Ethereum acccount hesabınıza geri talep edilebilir.
   - Kullanıcı ayrıca 0x veya Dharma (yakında geliyor!) yoluyla da hızlı çıkış yapabilir

### Ön Koşullar: {#prerequisites}

```
npm i @maticnetwork/maticjs-plasma

import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

### Görli Faucet {#görli-faucet}

İşlemler yapmak için, bu eğitimi takip ederken kullanacağınız test hesaplarında bir miktar Ether bulundurmanız da gerekecektir. Görli üzerinde ETH bulunmazsa burada verilen musluk bağlantılarını kullanabilirsiniz — https://goerli-faucet.slock.it/.

### Polygon Faucet {#polygon-faucet}

Bu eğitim boyunca örnek olarak Görli ağı üzerinde ERC20 token'ı `TEST`'i kullanacağız. Bu bir TEST token'ıdır. DApp'ınızda, bu token'ı bir ERC20 token ile değiştirebilirsiniz. Polygon Ağı üzerinde test amaçlı `TEST` token'ları almak için [Polygon Faucet](https://faucet.polygon.technology/)'e erişebilirsiniz.

:::note

Mevduat ve para çekme için kendi token'larınızı kullanmak için, 'eşleştirilmiş token'ı almanız gerekir, bu da esas olarak ana zincir üzerinde sözleşmeleri yapmak ve özel your farkında olması anlamına gelir.

:::

### Metamask Wallet için temel kurulum (İsteğe Bağlı) {#basic-setup-for-the-metamask-wallet-optional}

1. [Bir cüzdan oluşturun](/docs/develop/metamask/hello): Cüzdan için yeniyseniz, MetaMask Hesabı oluşturun.
2. [Polygon the yapılandırın](/docs/develop/metamask/config-polygon-on-metamask): Polygon'daki fon akışını kolayca görselleştirmek için, Polygon the Metamask'ta yapılandırırsanız eğiticidir. Metamask'ı burada yalnızca görselleştirme amacıyla kullandığımızı unutmayın. Polygon için Metamask kullanımı ile ilgili bir gereklilik bulunmamaktadır.
3. [Birden Fazla Hesap Oluşturun](/docs/develop/metamask/multiple-accounts): Eğitime başlamadan önce 3 Ethereum test hesabını hazır bulundurun.
4. [Token'ı Polygon](/docs/develop/metamask/custom-tokens) üzerinde yapılandırın: Fonların akışını Polygon üzerinde Matic.js kullanarak kolayca görüntülemek için token'ları Metamask'ta yapılandırabilirsiniz.
Bu öğretici için bir örnek olarak alınan `TEST`token, hesap bakiyelerini kolayca görselleştirmek için MetaMask cinsinden yapılandırılabilir. Bunun **isteğe bağlı** olduğunu bir kez daha unutmayın. [Web3.js](https://web3js.readthedocs.io/en/1.0/) kullanarak token bakiyelerini ve diğer değişkenleri kolayca sorgulayabilirsiniz
