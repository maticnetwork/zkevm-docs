---
title: Tellor
description: "Bu konuda Tellor oracle ile Polygon sözleşmenize entegre edilecek bir kılavuz."
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles", "Polygon", "Matic", "Tellor"]
skill: beginner
published: 2022-02-10
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Tellor, basit kripto ekonomik teşvikler ile güvenli kılınan sansüre dirençli veriler sağlayan bir oracle'dır. Veriler herhangi biri tarafından sağlanabilir ve herkes tarafından kontrol edilebilir. Tellor’un esnek yapısı herhangi bir veriyi herhangi bir zaman aralığında sağlayabilir, böylece kolay deneyimlemeye veya inovasyona imkân verir.

## (Yumuşak) Ön Koşullar {#soft-prerequisites}

Oracle yönüne odaklanmak için kodlama yeteneğiniz hakkında aşağıdakileri varsayıyoruz.

Varsayımlar:

- bir terminalde gezinebilirsiniz
- sisteminizde npm yüklü
- bağımlılıkları yönetmek için npm'nin nasıl kullanılacağını biliyorsunuz

Tellor, uygulama için canlı ve açık kaynaklı bir oracle'dır. Bu acemi kılavuzu, Tellor ile kalkış ve koşu kolaylığını sergilemek için buradadır; bu sayede projenize tamamen merkezi olmayan ve sansüre dayanıklı bir oracle kazandırılmaktadır.

## Genel Bakış {#overview}

Tellor, tarafların zincir dışı bir veri noktasının (örneğin BTC/USD) değerini talep edebilecekleri ve raportörlerin bu değeri tüm Polygon akıllı sözleşmelerinin erişilebileceği bir zincir içi veri bankasına eklemek için rekabet ettiği bir oracle sistemidir. Bu veri bankasına girdiler, bir stake yapmış raportörler ağı vasıtasıyla güvenli kılınır. Tellor, kripto ekonomik teşvik mekanizmaları kullanır. Raportörler tarafından dürüst veri gönderimleri Tellor token'ı çıkarılmasıyla ödüllendirilir. Kötü oyuncular bir ihtilaf mekanizması vasıtasıyla hızlı bir şekilde cezalandırılır ve ağdan çıkarılır.

Bu eğitim makalesinde şunları yapacağız:

- İşe koyulmak için ihtiyacınız olan başlangıç araç kitini kurma.
- Basit bir örnek üzerinde çalışma.
- Tellor'u şu anda test edebileceğiniz ağların test ağı adreslerini listeleme.

## UsingTellor {#usingtellor}

Yapmanız gereken ilk şey, Tellor'u oracle'ınız olarak kullanmak için gerekli temel araçları yüklemektir. Tellor Kullanıcı Sözleşmelerini kurmak için [bu paketi](https://github.com/tellor-io/usingtellor) kullanın:

`npm install usingtellor`

Kurulum tamamlandığında, sözleşmeleriniz "UsingTellor" sözleşmesinden işlevleri devralabilir.

Harika! Artık araçlarınız hazır olduğuna göre, bitcoin fiyatını alacağımız basit bir egzersizin üzerinden geçelim:

### BTC/USD Örneği {#btc-usd-example}

UsingTellor sözleşmesini Tellor adresini bir oluşturucu [constructor] argümanı olarak geçirerek devralın:

İşte bir örnek:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {

  uint256 public btcPrice;

  //This Contract now has access to all functions in UsingTellor

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {

    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryID = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

## Adresler: {#addresses}

Tellor Övgüleri: [`0xe3322702bedaaed36cddab233360b939775ae5f1`](https://polygonscan.com/token/0xe3322702bedaaed36cddab233360b939775ae5f1#code)

Oracle: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0#code)

#### Önce bazı testler mi yapmak istiyorsunuz?: {#looking-to-do-some-testing-first}

Polygon Mumbai Test Ağı: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://mumbai.polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0/contracts#code)

Test Haraç :[`0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE`](https://mumbai.polygonscan.com/token/0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE#code)

Test token'larına mı ihtiyacınız var? ['@trbfaucet'](https://twitter.com/trbfaucet) adresinden bizi tweet

Kullanım kolaylığı için, UsingTellor repo, daha kolay entegrasyon için [Tellor Oyun Alanı](https://github.com/tellor-io/TellorPlayground) sözleşmesinin bir versiyonunu ile birlikte gelir. Yararlı işlevlerin bir listesi için [buraya](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) bakın.

#### Tellor oracle'ın daha sağlam bir uygulaması için kullanılabilir tüm işlevlerin bir listesine [buradan](https://github.com/tellor-io/usingtellor/blob/master/README.md) göz atın.

#### Hala sorularınız mı var? Topluluğa [burada](https://discord.gg/tellor) katılın!
