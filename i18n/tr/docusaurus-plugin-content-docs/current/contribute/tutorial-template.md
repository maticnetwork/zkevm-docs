---
id: tutorial-template
title: Genel Eğitim Taslağı
sidebar_label: Tutorial template
description: Teknik bir eğitim yazarken eğitim taslağına bağlı kalın.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - tutorial
  - contribute
  - template
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: tutorial-template
---

Bu taslak, Polygon Wiki için bir eğitimle katkıda bulunurken
kullanılmalıdır. Seçtiğiniz bir konu hakkında bir eğitim ile katkıda bulunmayı tercih edebilirsiniz.

## Genel ilkeler {#general-guidelines}

* Eğitimin kapsamı, başlığından itibaren açık ve net olmalıdır.
* Bu eğitim ürünlerin ve hizmetlerin özelliklerini ve işlevselliklerini
doğru bir şekilde anlatabilmelidir.
* Eğitimi kısa ve öz tutmaya çalışın ama anahtar kavramları uygun olduğu durumda
daha ayrıntılı yazın. Mümkün olduğunda arka plan bilgisi ve daha fazla bağlam sunun.
* Yapılandırma ve uygulama adımları için spesifik olun.
* Lütfen yazılı içeriği tamamlayacak destekleyici görüntüleri, simgeleri veya ekran görüntülerini
mümkün olduğunca eklemeye gayret edin.
  > Belgelerden sorumlu ekip şemalar oluşturma konusunda size memnuniyetle yardımcı olur.
* Yazarken hedef kitlenizi aklınızda bulundurun. Materyal belli bir zorluk içeriyorsa
bunu eğitimde belirtin.
  > Kullanıcının eğitime başlamadan önce tamamlaması gereken adımlar varsa, lütfen bunları belirtin.
* Belgelerden sorumlu ekip bir eğitimin oluşturulmasında birlikte çalışmaktan mutluluk duyacaktır.
* **[Stil kılavuzunu](writing-style.md)** göz önünde bulundurmayı unutmayın.

:::caution Mevcut eğitimlerin güncellenmesi

Polygon Wiki'deki eğitimlerin bu taslağa uymadığını
fark ederseniz, bunun nedeni belgelerden sorumlu ekibin
bir standardı uygulamaya alarak eğitim akışının tüm eğitimler genelinde tutarlı olmasını
amaçlamasıdır. Ekip bu eğitimlerin güncellenerek
taslağa yakınsaması için çalışmaya devam etmektedir. İlginizi çekiyorsa, mevcut bir eğitimi
yeniden yapılandırmak için de güncelleyebilirsiniz.

:::

## Eğitim bölümleri {#tutorial-sections}

### Genel Bakış {#overview}

Eğitimde ele alınan ürünler veya hizmetler için açıklama sunun.
Eğitimin amacı ve eğitimin sunmak istediği konu ile ilgili
arka plan bilgisi sunun. Eğitim her zaman bir Polygon ürünü kullanımını
temel almalıdır.

### Öğrenecekleriniz {#what-you-ll-learn}

Kullanıcının eğitim boyunca öğreneceklerini özetleyin.

:::note Örnek

Polygon'da dApp geliştirmek için Truffle Suite'i nasıl kullanacağınızı
keşfedeceksiniz.

:::

#### Eğitimden elde edilecek sonuçlar {#learning-outcomes}

Eğitim sonuçlarını özetleyin.

:::note Örnek

1. Fauna hakkında bilgi edineceksiniz.
2. dApp'inizin kullanıcı arayüzü için ReactJS'yi nasıl kullanabileceğinizi öğreneceksiniz.
3. dApp verisini nasıl koruyacağınızı öğreneceksiniz.

:::

Ön koşulları ve kullanıcının aşina olması gereken
konuları belirtin. Kullanıcının bilgi sahibi olması gereken konularla ilgili
belgelere bağlantılar ekleyin.

:::note Örnek

Bu eğitime başlamadan önce EVM tabanlı dApp geliştirmenin
temellerini anlamanız gerekir. Daha fazla bilgi için "bu belgelere" göz atın.

:::

### Yapacaklarınız {#what-you-ll-do}

Eğitim adımlarını ve kullanılacak araçları özetleyin.

:::note Örnek

Bir ChainIDE ortamında akıllı sözleşme oluşturmak için Solidity kullanacaksınız.

1. Bir cüzdan yapılandırma
2. Bir ERC-721 akıllı sözleşme yazın
3. Bir ERC-721 akıllı sözleşme derleyin
4. Bir ERC-721 Akıllı Sözleşme devreye alın
5. Düzleştirici Kütüphanesini kullanarak bir Düzleştirilmiş Dosya oluşturun
6. Bir Akıllı Sözleşmeyi doğrulayın
7. NFT Mint Etme

:::

### Eğitimin kendisi {#the-tutorial-itself}

Genel olarak, eğitim yazarının uygun gördüğü en iyi kategori içinde
sunulabilir; bu da [Yapacaklarınız](#what-youll-do) kısmında
belirtilmelidir. Bununla birlikte, eğitim bölümleri bu üç ana kategoriye değinmelidir:

> Bölümleri belirlerken anahtar kelimeleri ve arama motorunun çalışma prensiplerini
> göz önünde bulundurun.

#### Uygulamanızı geliştirin {#build-your-application}

Ana eğitim içeriği. Bu bölüm örneğin "kurulum", "yapılandırma"
ve "uygulama" gibi kısımlar içerebilir.

#### Uygulamanızı Çalıştırın veya Devreye Alın {#run-or-deploy-your-application}

Kullanıcının uygulamasını nasıl çalıştıracağını veya devreye alacağını açıklayın.

#### Uygulamanızı test edin {#test-your-application}

Bu eğitim, akıllı sözleşme için test yazma, akıllı sözleşme
doğrulaması gibi konuları içerebilir.

### Sonraki adımlar {#next-steps}

Eğitimi sonuçlandırın ve eğitimden elde edilecekleri vurgulayın.
Kullanıcının sonraki aşamalarda uygulayabileceği adımları özetleyin.

:::note Örnek

Tebrikler, akıllı sözleşmenizi devreye aldınız. Artık ChainIDE'yi nasıl kullanacağınızı,
akıllı sözleşmeleri nasıl oluşturacağınızı ve devreye alacağınızı biliyorsunuz. "Bu eğitimi" denemek isteyebilirsiniz.

:::
