---
id: getting-started
title: PoS Köprüsü
sidebar_label: Introduction
description: Polygon POS ile daha fazla esneklik ve daha hızlı fon çekme.
keywords:
  - docs
  - matic
  - pos bridge
  - deposit
  - withdraw
  - mapping
  - state sync
image: https://matic.network/banners/matic-network-16x9.png
---

Kullanmaya başlamak için en yeni [PoS Matic.js belgelerini](../matic-js/get-started.md) inceleyin.

Köprü, temelinde varlıkları kök zincirden alt zincir üzerine taşımaya yardımcı olan bir sözleşmeler setidir. Varlıkları Ethereum ve Polygon arasında taşımak için başlıca iki köprü bulunmaktadır. Bunlardan ilki Plazma köprüsü, ikincisi **ise PoS Köprüsü** veya **Stake Kanıtı olarak** adlandırılır. **Plasma bridge**, Plasma çıkış mekanizması sayesinde artırılmış güvenlik güvencesi sağlar.

Bununla birlikte, alt token üzerinde belirli kısıtlamalar vardır ve Plasma bridge üzerinde Polygon'dan Ethereum'a yapılan tüm çıkışlar/fon çekmeler için 7 günlük bir fon çekme süresi vardır.

Bu durum biraz **esnekliğe** ve **daha hızlı fon çekmeye** ihtiyaç duyan ve güçlü bir harici doğrulayıcılar kümesiyle güvenceye alınan Polygon Proof-of-Stake köprüsüyle sağlanan güvenlik düzeyinden memnun olan DApp'ler/kullanıcılar için oldukça sancılı olabilir.

Hisse kanıtına dayalı varlıklar tek bir denetim noktası aralığı ile PoS güvenliği ve daha hızlı çıkış sağlar.

## PoS Köprüsünü kullanma adımları {#steps-to-use-the-pos-bridge}

Bu bölüme girmeden önce, köprüyü kullanmaya çalışırken onlarla etkileşime gireceğiniz için bazı terimleri ayrıntılı bir şekilde anlamanıza yardımcı olabilir: [Haritalama](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) ve [Devlet Senkronizasyon Mekanizması](https://docs.polygon.technology/docs/pos/state-sync/state-sync/).

Ardından, PoS köprüsünü kullanmanın ilk adımı **Kök Tokeni** ve **Çocuk** Token'ı is Bu da kök zinciri üzerindeki token sözleşmesi ve çocuk zinciri üzerindeki token sözleşmesi, mal varlıklarını kendi aralarında aktarmak için bir bağlantı (haritalama olarak adlandırılır) bulundurması gerektiği anlamına gelir. Bir haritalama isteği göndermekle ilgileniyorsanız, [lütfen bu kılavuzu](/docs/develop/ethereum-polygon/submit-mapping-request/) kullanarak yapın.

Daha düşük bir seviyede ve daha ayrıntılı olarak şu şekilde gerçekleşir:

### fon yatırın {#deposit}

  1. Varlık **(ERC20/ERC721/ERC1155)** token'ının sahibi, aktarılacak token miktarını harcamak için PoS köprüsü üzerinde spesifik bir sözleşmeyi onaylamak zorundadır. Bu spesifik sözleşmeye (Ethereum ağında devreye alınmış olan) **Predicate Contract** (koşul sözleşmesi) denir; Predicate Contract, **yatırılacak olan token miktarını kilitleyen** sözleşmedir.
  2. Onay verildikten sonra, bir sonraki adım **varlığı yatırmaktır**. Bu `RootChainManager`işlem için bir fonksiyon çağrısı yapılmalıdır ve bu da Polygon zinciri üzerindeki `ChildChainManager`sözleşmeyi tetikler.
  3. Bu işlem, [burada](/docs/pos/state-sync/state-sync/) ayrıntılı olarak anlatılan bir state sync mekanizması ile gerçekleşir.
  4. Bu işlem çocuk token sözleşmesinin `deposit`işlevini dahili `ChildChainManager`olarak çağırır ve ilgili varlık of miktarı **kullanıcının hesabına minted** Bu nedenle sadece çocuk token sözleşmesi üzerindeki `deposit`işleve `ChildChainManager`erişebilmenin mümkün olduğunu belirtmek önemlidir.
  5. Kullanıcı token'ları aldıktan sonra **Polygon zinciri üzerinde ihmal edilebilir ücretlerle neredeyse anında transfer** edilebilir.

### Fon Çekme İşlemleri {#withdrawals}

  1. Varlıkları Ethereum'a geri çekmek, varlık token'ının **önce Polygon zinciri üzerinde** yakılması gereken 2 adımlı bir işlemdir ve daha sonra **bu yanık işleminin kanıtı** Ethereum zincirine sunulmalıdır.
  2. Yakma işlemi için Ethereum zincirine denetim noktası ataması yaklaşık 20 dakika ilâ 3 saat sürer. Bu işlem Hisse Kanıtı doğrulayıcıları tarafından yapılır.
  3. İşlem kontrol noktasına eklendikten sonra, yanık işleminin kanıtı işlevi çağırılarak Ethereum üzerindeki `RootChainManager`sözleşme üzerinde `exit`gönderilebilir.
  4. Bu fonksiyon çağrısı **denetim noktası dâhil edilmesini doğrular** ve daha sonra varlık token'larını varlıklar ilk yatırıldığında kilitleyen Predicate (koşul) sözleşmesini tetikler.
  5. Son adım olarak **tahminde bulunmak sözleşmesi kilitli token'ları serbest bırakır** ve bunları Ethereum'daki kullanıcı hesabına iade eder.

:::tip

Eşleme yapıldıktan sonra, sözleşmelerle etkileşime geçmek için **matic.js SDK** kullanabilirsiniz, ya da bunu SDK kullanmadan da yapabilirsiniz. Fakat matic.js SDK çok kullanıcı dostu bir şekilde tasarlanmış olduğundan, varlık aktarma mekanizmasını bir uygulamaya entegre etmeyi çok kolaylaştırmaktadır.

:::