---
id: submit-mapping-request
title: Haritalama Tokenları
description:  PoS Köprüsü kullanılarak Ethereum ve Polygon Zincirleri arasındaki tokenların nasıl to dair bir kılavuz
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Varlıklarınızı Ethereum ve Polygon PoS'a ve Ethereum üzerinden aktarmak için haritalama gereklidir. Aynı şeyi yapmak için iki köprü sunuyoruz. Köprü hakkında daha fazla ayrıntı [burada](/develop/ethereum-polygon/getting-started.md) anlaşılabilir.

:::tip

Polygon PoS köprüsü hem Polygon Mainnet hem de Mumbai Testnet için mevcuttur.

:::

## Bir eşleme isteği göndermek için adımlar {#steps-to-submit-a-mapping-request}

Ethereum ve Polygon PoS arasındaki tokenleri eşleştirmek için [Polygon Jetonu Mapper](https://mapper.polygon.technology/) kullanabilirsiniz. Bağlantıyı açın ve yeni bir haritalama isteği başlatmak için sağ üst köşedeki **Harita Yeni Jeton** düğmesini tıklayın.

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**Adım 1 →** your haritalamak istediğiniz ağı seçin. Testnet için **Goerli-Mumbai** ve Mainnet için **Ethereum-Polygon PoS** seçeneğini seçebilirsiniz.

**Adım 2 →** are belirteç türünü seçin - **ERC20**, **ERC721** veya **ERC1155**.

**Adım 3 →** **Ethereum/Goerli** token adresinizi **Ethereum Token Adresi** alanına girin. Token sözleşmesi kodunuzun **Ethereum/Goerli** blok zinciri kaşifleri üzerinde doğrulandığından emin olun.

**Adım 4 →** **Ethereum Token** Adresini ekledikten sonra ilgili alan viz edilir. **Jeton Adı, Jeton Sembolü ve Jeton Decimal** otomatik olarak sözleşme detayları ile doldurulacaktır.

**Adım 5 →** Şimdi, haritalama işlemini başlatmak için **Başlat Haritalama** düğmesine tıklayın. Bu işlem bir Ethereum işlemi gerektirdiğinden, devam etmek için cüzdanınızı bağlamanız gerekecektir.

**Adım 6 →** Bu metni tamamlamak için token bilgileri ve tahmini gaz ücretleri ile bir inceleme modalı gösterilecektir. Bu işlemin detaylarını doğrulayın ve **Haritada Göster** düğmesini seçerek haritalama işlemini başlatın.

Cüzdanınızdan yapılan işlemi onayladıktan sonra, işlemin Ethereum üzerinde tamamlanmasını beklemeniz gerekir. İşlem tamamlandıktan sonra Polygon PoS ağı üzerindeki çocuk belirteci adresiyle başarı modalı gösterilecektir. [Polygonscan](https://polygonscan.com/) üzerinde oluşturulan çocuk token adresini kontrol ederek haritayı doğrulamaya devam edebilirsiniz.

Başarılı bir Mainnet [haritalama](https://github.com/maticnetwork/polygon-token-list/issues/new/choose) için token bilgilerinizi [**Polygon Jetonu**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json) Listesine eklenecek şekilde sağlayabilirsiniz.

:::tip

Özel bir [<ins>token eşlemesi</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-) durumunda, [**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md) belgelerimizi ziyaret edebilir ve özel FX uygulamanızı oluşturmak için verilen bilgileri kullanarak belirteçleri eşleştirme için kullanabilirsiniz.

:::

## Video Kılavuzu {#video-guide}

İşte **Ethereum Goerli  Polygon Mumbai Testnet** arasındaki tokenları nasıl on dair hızlı bir video öğreticisi:

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>Tarayıcınız bu video ögesini desteklemiyor.</p>
</video>
