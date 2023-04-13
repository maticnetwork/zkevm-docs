---
id: connext
title: Connext kullanarak zincirler arası (cross-chain) aktarmalar yapın
description: Bir sonraki blok zinciri uygulamanızı Polygon üzerinde oluşturun.
keywords:
  - docs
  - matic
  - connext
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Connext, evm uyumlu zincirler ve Ethereum Katman 2 sistemler arasında hızlı ve tamamen gözetimsiz takasları destekleyen bir zincirler arası likidite ağıdır.

Ethereum çok zincirli yapıya geçiyor. Evm uyumlu zincirlerin ve Katman 2'lerin giderek daha fazla benimsenmesi ile ekosistem içinde likidite parçalanması bağlamında yeni bir zorluk ortaya çıkmıştır. Connext bu sorunu her bir zincirde bulunan ayrık likidite havuzlarını global bir ağa bağlayarak, kullanıcılar için yeni ve önemli güven endişeleri oluşturmadan çözer. Geliştiriciler bu likiditeyi kaldıraç olarak kullanarak Connext üzerinde yeni bir yerel olarak chain-agnostic (zincirden bağımsız) dApp'ler sınıfı kurabilirler.

Connext kullanıcıların koşullu aktarmaları kullanarak A zincirindeki A varlığını B zincirindeki B varlığı ile takas etmesine izin verir. Bu işlem birkaç basit adımla yapılır:

Bir Connext kullanıcısı olan Alice, Bob'a koşullu bir A varlığı aktarması gönderir.
Bir likidite sağlayıcısı (diğer bir deyişle "router", yani yönlendirici) olan Bob, Alice'e eşdeğer miktarda B varlığı gönderir.
Alice koşullu aktarmanın kilidini açarak B varlığını alır; bu işlem Bob'un da aynı şeyi yapmasına izin verir.
Yönlendiriciler, farklı zincirlerde likidite sağlayarak ve bunu yapmak için ücret alarak ağımızın bel kemiğini oluşturur. Bunun Protocol Primer'ımız üzerinde nasıl güven gerektirmeden çalıştığı hakkında daha fazla bilgi edinebilirsiniz.

Ethereum Goerli from Polygon Mumbai to bir tarayıcı için çapraz zincir [transferleri](https://docs.connext.network/quickstart-polygon-matic-integration) yapmak için lütfen bu kılavuzdan geçin.
