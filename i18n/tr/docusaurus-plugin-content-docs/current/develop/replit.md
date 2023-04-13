---
id: replit
title: Replit Kullanarak Akıllı Bir Sözleşme Dağıtın
sidebar_label: Using Replit
description: Polygon üzerinde ReplitIDE kullanarak Akıllı Sözleşmeleri dağıtın
keywords:
  - docs
  - matic
  - replit
  - deploy
  - smart contract
  - polygon
  - IDE
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Genel Bakış {#overview}

[Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) kod yazmanıza ve uygulamalar barındırmanıza imkân veren bir kodlama platformudur. Replit [Solidity programlama dilini](https://replit.com/@replit/Solidity-starter-beta?v=1) destekleyerek Web3 geliştiricilerinin akıllı sözleşmeleri oluşturup devreye alırken ihtiyaç duyduğu tüm özellik ve işlevleri sağlar.

Bu makalede, Polygon üzerinde [Replit IDE](https://replit.com/signup) ve [Replit Solidity geliştirme şablonunu](https://replit.com/@replit/Solidity-starter-beta?v=1) kullanarak bir sağlamlık akıllı sözleşme oluşturmanıza ve dağıtmanıza yol açan bu makalede (Solidity marş betası) yol gösterilmektedir.

## Yapacaklarınız {#what-you-will-do}

- Bir Replit hesabı oluşturma
- Bir Repl ortamı oluşturma
- Polygon Mumbai ağında örnek bir proje dağıtın
- Sözleşmeyi doğrulama
- Projenizi kişisel bir Replit profili üzerinde yayınlama.

:::tip

Replit'le Solidity hakkında ek örnekler için Replit ile <ins>**[Başlayın](https://blog.replit.com/solidity)**</ins> veya <ins>**[Replit Solidity belgelerini ve Escrow sözleşmesi](https://docs.replit.com/tutorials/33-escrow-contract-with-solidity)**</ins> öğreticisini kontrol edin.
:::

## Ön Koşullar {#prerequisites}

Polygon'da sağlam bir akıllı sözleşmenizi Replit kullanarak dağıtmak için yerel bir ortam kurulumuna ihtiyacınız yoktur.

Polygon Mumbai Test Ağı'yla ve devreye alınan sözleşmelerle etkileşim kurmak için tarayıcı tabanlı bir web3 cüzdanına ihtiyacınız var. Zaten MetaMask kullanıyorsanız, Replit ile test etmek için yeni bir hesap oluşturmanız tavsiye edilir. Bunu MetaMask arayüzünün sağ üst köşesindeki hesap avatarına tıklayınca açılan hesap menüsünde yapabilirsiniz.

Solidity akıllı sözleşmenizi Polygon üzerinde devreye almak için aşağıdaki Ön Koşulların tümünü yapılandırmanız gerekir:

1. [Bir Replit hesabı oluşturma](https://replit.com/signup)
2. [Metamask cüzdanı indirme](/docs/develop/metamask/hello)
3. [Metamask Üzerinde Polygon'u Yapılandırın](/docs/develop/metamask/config-polygon-on-metamask)
4. [Test ağı token'ları edinme](https://faucet.polygon.technology)

## Bir Repl ile Çalışma {#working-with-a-repl}

Oluşturduğunuz her Repl, tamamen işlevsel bir geliştirme ve üretim ortamıdır. Bir solidity starter Replit oluşturmak için şu adımları takip edin:

1. [Giriş yapın](https://replit.com/login) veya [bir hesap oluşturun](https://replit.com/signup). [Replit hesabınızı](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) oluşturduktan sonra, ana ekranınız görüntüleyebileceğiniz, projeler oluşturabileceğiniz ve hesabınızı you bir gösterge tablosu içerecektir.

![img](/img/replit/dashboard.png)

2. Giriş yaptıktan sonra Solidity başlangıç a oluşturun **ve** ekranın sağ üst köşesinde **+** Oluşturun Solidity

![img](/img/replit/solidity.png)

3. [**Solidity marş (beta)**](https://replit.com/@replit/Solidity-starter-beta?v=1) şablonunu seçin ve projenize bir başlık verin.

4. Projenizi oluşturmak için **+ Oluştur (Create** Repl) üzerine tıklayın.

:::note

Solidity marş ürünü, <ins>**[Web3 Ethereum JavaScript API](https://web3js.readthedocs.io/en/v1.5.2/)**</ins>'sı kullanılarak inşa edilmiş ve sözleşmelerimizi dağıtmak ve etkileşimde bulunmak için kullanabilirsiniz. Replit’s Replit’s konuşlandıracağız, bu da Replit tarafından yönetilen ve test için optimize edilmiş Ethereum blok zincirinin özel bir versiyonu olacak.

:::

## Polygon üzerinde devreye alma {#deploy-on-polygon}

Yukarıdaki **Ön** Koşullar listesini takip ettiğinizden emin olun, böylece akıllı sözleşmenizi dağıtmaya ve etkileşime girmeye hazır olun.

1. İlgili paketleri yüklemek için **Çalıştır** (üstte) üzerine tıklayın ve sözleşme dağıtımını başlatmak için UI .

2. MetaMask cüzdanınızı web arayüzüne bağlayın ve [Mumbai](docs/develop/metamask/config-polygon-on-metamask) to geçin.

![img](/img/replit/connect.png)

3. **Cüzdan** Bağlayın üzerine tıklayın, hesabınızı seçin, ardından **Connect** seçeneğini seçin.

![img](/img/replit/deploy-list.png)

4. Bırakma listesinden dağıtmak istediğiniz sözleşmeyi seçin. **Deploy**'u tıklayın.

5. Onayınızı isteyen bir MetaMask açılır penceresi alacaksınız. Sözleşmenizi dağıtmak için cüzdanınızdan yapılan işlemi onaylayın.

## Sözleşmenizi doğrulama ve test etme {#verifying-and-testing-your-contract}

Sözleşme devreye alındığında [Polygonscan'e gidin](https://mumbai.polygonscan.com/), hesabınızı arayın, devreye alınan sözleşmenizi görüntüleyin ve hesap adresinizi kopyalayın.

Sözleşmeniz dağıtıldıktan sonra, açılır kutunun altında genişletilebilir kutular olarak görünecektir. Kutuyu genişletip kullanabileceğiniz çeşitli işlevlere bir göz atın. Artık sağlanan kullanıcı arayüzünü kullanarak veya arayüz üzerinde gösterilen paylaşılabilir URL'yi kullanarak sözleşmenizle etkileşim kurabilirsiniz.

## Replit'te Yayınlama {#publish-to-replit}

Replit projelerinizi kişisel bir profil üzerinde yayınlamanıza olanak tanır. Projeleriniz yayınlandıktan sonra başkalarının da keşfedebilmesi, etkileşim kurması, klonlaması ve işbirliği yapması için öne çıkan sayfanızda görüntülenecektir.

Projelerinizi to yayımlamak için aşağıdaki adımları izleyin:

1. Ekranın üst kısmında proje başlığını seçin.
2. Proje adınızı ve açıklamanızı tamamlayın ve **Publish**. tıklayın.
