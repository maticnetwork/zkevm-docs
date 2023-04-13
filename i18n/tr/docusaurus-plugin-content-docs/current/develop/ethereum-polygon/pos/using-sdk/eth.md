---
id: eth
title: ETH Yatırma ve Çekme Kılavuzu
sidebar_label: ETH
description: "Polygon ağı üzerinde ETH token'ları yatırın ve çekin."
keywords:
  - docs
  - matic
  - ether
  - withdraw
  - deposit
image: https://matic.network/banners/matic-network-16x9.png
---

En yeni [ETH Matic.js belgelerini](https://maticnetwork.github.io/matic.js/docs/pos/deposit-ether/) inceleyin.

## Hızlı Özet {#quick-summary}

Belgelerin bu kısmı, Polygon ağı üzerinde ERC20 token'larının nasıl yatırılacağına ve çekileceğine odaklanır. Standartlara uygun olarak adlandırma ve icra etme (implementation) örüntülerinde değişiklikler olmakla birlikte, belgelerin ETH, ERC20, ERC721 ve ERC1155 bölümleri arasında ortak fonksiyonlar vardır. Belgelerin bu bölümünü kullanmanın en önemli ön koşulu, varlıklarınızı eşlemenizdir (mapping); bu yüzden eşleme isteğinizi lütfen [buradan](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) gönderin.

## Giriş {#introduction}

Bu kılavuzda iki blok zinciri arasında varlık aktarımlarını göstermek için kendi içinde Goerli Ağı'na eşlenen Polygon Test Ağı (Mumbai) kullanılmıştır. Bu eğitimin amaçları bakımından mümkün olan durumlarda bir proxy adresi kullanmanız gerektiğini önemle aklınızda bulundurun. Bunun nedeni, uygulama sözleşmesine (implementation contract) yeni bir güncelleme eklendiğinde uygulama sözleşmesinin adresi mecburen değişirken, proxy adresinin asla değişmemesi ve gelen bütün çağrıları en son uygulamaya (implementation) yönlendirmesidir. Diğer bir deyişle, proxy adresini kullanırsanız, siz işe koyulmadan önce uygulama sözleşmesinde değişiklikler meydana gelip gelmediğinden endişe etmezsiniz.

Örneğin, lütfen adres yerine etkileşimler için `RootChainManagerProxy`adresi `RootChainManager`kullanın. PoS sözleşmesi adresleri, ABI ve Test Token Adresleri gibi dağıtım [detaylarını burada](/docs/develop/ethereum-polygon/pos/deployment/) bulabilirsiniz.

Varlıklarınızı eşlemek, PoS köprüsünü uygulamanıza entegre etmek için gerekli bir adımdır. Bu nedenle, henüz yapmadıysanız lütfen [buradan](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) bir eşleme isteği gönderin. Ekibimiz bu eğitim için test token'larını devreye aldı ve PoS köprüsüne eşledi. Kullanmak istediğiniz varlığı [faucet](https://faucet.polygon.technology/) üzerinde isteyin; test token'ları mevcut değilse ekibimizle [Discord](https://discord.com/invite/0xPolygon)'ta iletişime geçin. Size hemen vermeye çalışacağız.

Bu eğitimde her adım detaylı bir şekilde birkaç kod parçacığıyla birlikte anlatılacaktır. Bununla birlikte, PoS köprüsünün çalışma prensiplerini entegre etmenize ve anlamanıza yardım edebilecek tüm [örnek kaynak kodları](https://github.com/maticnetwork/matic.js/tree/master/examples) için her zaman bu **bilgi deposuna** başvurabilirsiniz.

## Yüksek Seviye Akış {#high-level-flow}

ETH Yatırma -

1. **_RootChainManager_** üzerinde **_depositEtherFor_** çağrısını yapın ve gerekli ether'i **gönderin**.

ETH Çekme -

1. Polygon zinciri üzerinde token'ları **_yakın_**.
2. Yakma işleminin kanıtını göndermek için **_RootChainManager_** üzerinde **_exit_** fonksiyonunu çağırın. Bu çağrı, yakma işlemini içeren blok için **_denetim noktası gönderildikten sonra_** yapılabilir.

## Adımlar {#steps}

### Fon Yatırma {#deposit}

ETH, Polygon zincirinde **RootChainManager** sözleşmesi üzerinden **depositEtherFor** çağrılarak yatırılabilir. Polygon PoS istemcisi bu çağrıyı yapmak için **depositEther** metodunu açar.

```jsx
const result = await posClient.depositEther(<amount>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```

:::note
Ethereum'dan Polygon için depozito **Devlet** the kullanarak gerçekleşir ve bu yaklaşık 22-30 dakika sürer. Bu süre için bekledikten sonra web3.js/matic.js kütüphanesini kullanarak veya Metamask'ı kullanarak bakiyeyi kontrol etmeniz önerilir. Gezgin (explorer) yalnızca alt zincirde en az bir varlık transferi gerçekleştiğinde bakiyeyi gösterir. Bu [<ins>bağlantı,</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/) mevduat olaylarının nasıl izleneceğini açıklar.
:::

### Yakma {#burn}

ETH Polygon zinciri üzerinde bir ERC20 tokeni olarak yatırılır. Bu işlemin geri çekilmesi, ERC20 token'larını geri çekme işlemiyle aynı işlemi takip eder.

Jeton yakmak ve çekme işlemini gerçekleştirmek için MaticWETH sözleşmesinin geri çekme işlevini çağırın. Ether Polygon zincirinde bir ERC20 tokeni olduğundan, Polygon PoS istemcisinden **ERC20** the başlatmanız ve daha sonra yanma işlemini başlatmak için `withdrawStart()`yöntemi to gerekir.

```jsx
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Bu çağrı için işlem hash'ini saklayın ve yakma kanıtı üretirken kullanın.

### Çıkış {#exit}


Bu işlem için **kontrol noktası** sunulduktan sonra kullanıcı `RootChainManager`sözleşmenin **çıkış** fonksiyonunu çağırmalı ve yanık kanıtını sunmalıdır. Geçerli kanıt gönderildikten sonra token'lar kullanıcıya aktarılır. Polygon POS istemcisi `erc20` bu çağrıyı yapmak için `withdrawExit` metodunu açar. Bu fonksiyon ancak denetim noktası ana zincire dâhil edildikten sonra çağrılabilir. Denetim noktasının dâhil edilmesi bu [kılavuz](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events) izlenerek takip edilebilir.


```jsx
// token address can be null for native tokens like ethereum or matic
const erc20RootToken = posClient.erc20(<token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
