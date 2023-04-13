---
id: erc20
title: ERC20 Yatırma ve Çekme Kılavuzu
sidebar_label: ERC20
description: "Polygon ağı üzerinde ERC20 token'ları yatırın ve çekin."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

En yeni [ERC20 Matic.js belgelerini](https://maticnetwork.github.io/matic.js/docs/pos/erc20/) inceleyin.

Bu eğitimde iki blok zinciri arasında varlık transferini göstermek için Goerli ağı ile eşlenmiş Polygon Test Ağı (Mumbai) kullanılmıştır. Bu eğitimi takip ederken **dikkat edilmesi gereken önemli bir konu**, kullanılabilir olduğu durumlarda bir Proxy adresi kullanmanız gerektiğidir. Örneğin, **RootChainManagerProxy** adresi **RootChainManager** adresi yerine etkileşim için kullanılmalıdır. **PoS sözleşme adreslerini, ABI'ı, Test Token Adreslerini** ve PoS köprü sözleşmelerinin diğer devreye alma bilgilerini [burada](/docs/develop/ethereum-polygon/pos/deployment) bulabilirsiniz.

PoS köprüsünü uygulamanıza entegre etmek için **varlıklarınızı eşlemeniz** gereklidir. Eşleme isteğini [buradan](/docs/develop/ethereum-polygon/submit-mapping-request) gönderebilirsiniz. Ancak bu öğretici için **Test** token'larını zaten konuşlandırdık ve bunları PoS köprüsünde haritaladık. Buna eğitimi kendi başınıza denemek için ihtiyacınız olabilir. İstenen varlığı [faucet](https://faucet.polygon.technology/) üzerinden talep edebilirsiniz. Test tokenleri musluk üzerinde kullanılamıyorsa, [uyumsuzluk](https://discord.com/invite/0xPolygonn) üzerinden bize ulaşın.

Bu eğitimin her adımı, detaylı bir şekilde ve kod parçacıkları ile birlikte anlatılacaktır. Bununla birlikte, PoS köprüsünün çalışma prensiplerini entegre etmenize ve anlamanıza yardım edebilecek tüm [örnek kaynak kodları](https://github.com/maticnetwork/matic.js/tree/master/examples/pos) için her zaman bu **bilgi deposuna** başvurabilirsiniz.

## Yüksek Seviye Akış {#high-level-flow}

ERC20 Yatırma -

1. Yatırılması gereken token'ları harcamak için **_ERC20Predicate_** sözleşmesini **_onaylayın_**.
2. **_RootChainManager_** üzerinde **_depositFor_** çağrısı yapın.

ERC20 Çekme -

1. Polygon zincirinde token'ları yak.
2. Yanık işleminin kanıtı göndermek `RootChainManager`için `exit()`fonksiyonu arayın. Bu çağrı, yanık işlemini içeren blok için kontrol noktası gönderilmesinden sonra yapılabilir.

## Adımlar Detayları {#steps-details}

### Onaylayın {#approve}

Bu, **_ERC20Predicate_** sözleşmesinin **_transferFrom_** fonksiyonunu çağırabilmesi için olağan bir ERC20 onayıdır. Polygon POS istemcisi bu çağrıyı yapmak için **_approve_** metodunu açar.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>,true);
  const approveResult = await erc20Token.approve(100);
  const txHash = await approveResult.getTransactionHash();
  const txReceipt = await approveResult.getReceipt();
}
```

### fon yatırın {#deposit}

Bu tokenin önceden eşlenmesi ve transfer için onaylanması gerektiğini unutmayın. Polygon PoS istemcisi bu çağrıyı yapma `deposit()`yöntemini ortaya çıkarır.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);

  //deposit 100 to user address
  const result = await erc20Token.deposit(100, <user address>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();

}
```

:::note
Ethereum'dan Polygon için depozito bir **Devlet Senkronizasyon** mekanizması kullanılarak gerçekleşir ve yaklaşık 22-30 dakika sürer. Bu süre için bekledikten sonra web3.js/matic.js kütüphanesini kullanarak veya Metamask'ı kullanarak bakiyeyi kontrol etmeniz önerilir. Gezgin (explorer) yalnızca alt zincirde en az bir varlık transferi gerçekleştiğinde bakiyeyi gösterir. Bu [<ins>bağlantı,</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos) mevduat olaylarının nasıl izleneceğini açıklar.
:::

### Yakma için withdrawStart yöntemi {#withdrawstart-method-to-burn}

Bu `withdrawStart()`yöntem, Polygon zinciri üzerinde belirtilen miktarı yakacak çekme işlemini başlatmak için kullanılabilir.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = posClient.erc20(<child token address>);

  // start withdraw process for 100 amount
  const result = await erc20Token.withdrawStart(100);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```

Bu çağrı için işlem hash'ini saklayın ve yakma kanıtı üretirken kullanın.

### Çıkış {#exit}

Bu işlem için kontrol noktası sunulduktan sonra kullanıcı `RootChainManager`sözleşmenin `exit()`işlevini çağırmalı ve yanık kanıtını sunmalıdır. Geçerli bir kanıt gönderdikten sonra, tokenler kullanıcıya aktarılır. Polygon PoS istemcisi bu çağrıyı yapma `withdrawExit`yöntemini ortaya çıkarır. Bu fonksiyon ancak denetim noktası ana zincirde dâhil edildiğinde çağrılabilir. Kontrol noktası dahil edilmesi [bu kılavuzu](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events) takip ederek izlenebilir.

Fon çekme işleminden çıkmak için *withdrawStart* metodundan gelen txHash'i (işlem hash'i) kullanılarak *withdrawExit* metodu kullanılabilir.

:::note
Çekme işlemi, geri çekimden çıkmak için kontrol edilmelidir.
:::

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);
  const result = await erc20Token.withdrawExit(<burn tx hash>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```
