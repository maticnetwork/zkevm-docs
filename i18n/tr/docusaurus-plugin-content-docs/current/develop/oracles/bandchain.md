---
id: bandchain
title: BandChain
sidebar_label: BandChain
description: BandChain, geleneksel web API'lerinden gelen verileri sorgulamak için Veri Oracle için Yapılmış Yüksek Performanslı Bir Blok Zinciridir
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Band Protocol geleneksel web API'lerinden veri sorgusu yapmanıza ve veriyi blok zincirinde kullanmanıza izin verir. Geliştiriciler, oracle taleplerini ve ödemeyi kolaylaştırmak için **bir kozmos tabanlı blok zinciri** olan BandChain üzerinden sorgular yapabilir ve ardından dApp üzerindeki verileri zincirler arası iletişim yoluyla kullanabilirler. Oracle verisini entegre etmek 3 basit adımda yapılabilir:

1. **Oracle betiklerini seçme**

    Oracle komut dizisi, band zincirinden talep edilecek veri türünü benzersiz şekilde tanımlayan bir hash'tir. Bu betikler [**burada**](https://guanyu-devnet.cosmoscan.io/oracle-scripts) bulunabilir. Bu betikler oracle talebini yaparken parametrelerden biri olarak kullanılır.

2. **BandChain'den Veri Talep Etme**

Bu durum iki şekilde yapılabilir:

    - **BandChain kaşifini kullanma**

    Seçtiğiniz oracle betiğine tıklayabilirsiniz ve ardından **Execute** sekmesinden parametreleri geçebilir ve BandChain'den cevabı alabilirsiniz. Yanıt, sonucu ve bir evm kanıtını içerecektir. Bu kanıt kopyalanmalıdır ve son adımda kullanılacaktır. BandChain için oracle sorgulama için docs [**(BandChain) burada**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer) kullanılabilir.

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    Yukarıdaki göz önüne alındığında, rastgele sayı değerlerini elde etmek için bir oracle isteği yapma örneğidir. 100 değeri oracle isteğinin `max_range`parametresi için iletilir. Yanıt olarak bir hash alıyoruz. Bu hash üzerine tıkladığınızda yanıtın tüm ayrıntılarını görebiliriz.

    - **BandChain-Devnet JS Kütüphanesi**

    BandChain doğrudan BandChain-Devnet kütüphanesini kullanarak sorgulayabilirsiniz. Sorgu yapıldığında, yanıtta **bir evm kanıtı** verir. Bu kanıt BandChain entegrasyonunun son adımı için kullanılabilir. BandChain'in oracle için docs ve BandChain-Devnet JS Kütüphanesi kullanılarak incelenmesi için mevcut olan dokümanlar [**burada**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library) mevcuttur. Rastgele sayı oracle'ı için yapılan isteğin payload'u buna benzeyecektir. Talep gövdesinin uygulama/json formatında geçirildiğinden emin olun.

3. **Akıllı sözleşmelerde veriyi kullanma**

  Son adım, bir doğrulama sözleşmesini devreye almak ve oracle talebinden gelen yanıtları doğrulama sözleşmesi durum değişkenleri içine saklamaktır. Bu durum değişkenleri belirlendikten sonra, dapp tarafından istendiği şekilde ve zamanda erişilebilirler. Ayrıca bu durum değişkenleri dApp üzerinden oracle betiklerini yeniden sorgulayarak yeni değerlerle güncellenebilir. Aşağıda rastgele sayı oracle betiği kullanarak elde edilen rastgele değerleri saklayan bir doğrulama sözleşmesi verilmiştir.

  ```jsx
  pragma solidity 0.5.14;
  pragma experimental ABIEncoderV2;

  import "BandChainLib.sol";
  import "IBridge.sol";

  contract SimplePriceDatabase {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    constructor(
      bytes32 _codeHash ,
      bytes memory _params,
      IBridge _bridge
    ) public {
      codeHash = _codeHash;
      params = _params;
      bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
      IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
      uint64[] memory decodedInfo = result.data.toUint64List();

      require(result.codeHash == codeHash, "INVALID_CODEHASH");
      require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
      require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

      latestPrice = uint256(decodedInfo[0]);
      lastUpdate = uint256(decodedInfo[1]);
    }
  }
  ```

Bu durumda 3 parametrenin geçmesi gerekmektedir. **İlk parametre** oracle betiği hash'i `codeHash`olan değerdir. **İkinci parametre** oracle script isteği parametreleri nesnesidir. Bu durum bayt biçiminde aktarılmalıdır. BandChain, JSON nesnesini bayt formatına dönüştürmek için bir REST API sağlar. API ayrıntıları [**burada**](https://docs.bandchain.org/references/encoding-params) bulunabilir. Bu API'den alınan yanıta bir 0x eklenmelidir. Üçüncü **parametre** ise Polygon ağında zaten konuşlandırılmış olan BandChain sözleşmesinin sözleşme adresidir. Band Protokolü Polygon TestnetV3'ü Destekler: 0x3ba819b03fb8d34995f68304946eefa6dcff7cbf.

Bu nedenle de doğrulama sözleşmesinin yardımcı kütüphaneyi ve arabirimi ve sırasıyla olarak adlandırılması gereken ve bu işlem `BandChainLib.sol`için ithalat yapılması `IBridge.sol`gerekmektedir. Bu linkler aşağıdaki linklerden bulunabilir: [**Bandchain**](https://docs.bandchain.org/references/bandchainlib-library) Kütüphanesi ve [**IBridge**](https://docs.bandchain.org/references/ibridge-interface) arayüzü.

  Doğrulama sözleşmesi devreye alındıktan sonra, durum değişkenlerine dApp üzerinden sorgu yapılarak erişilebilir. Benzer şekilde, farklı dahili oracle betikleri için birden fazla doğrulama sözleşmesi oluşturulabilir. IBRET arayüzü, doğrulama sözleşmesinde her seferinde güncellenen değerleri `relayAndVerify()`doğrulayan bir yönteme sahiptir. Doğrulama sözleşmesinde kullanılan `update()`yöntem, durum değişkenlerini güncelleme mantığına sahiptir. Oracle betiğini sorgulamaktan elde edilen EVM kanıtı the `update()`aktarılmalıdır. Bir değer güncellendiğinde, Polygon üzerinde kullanılan BandChain sözleşmesi sözleşmesi bu durumu sözleşme durumunda depolamadan önce verileri doğrular.

BandChain akıllı sözleşme mantığını artırmak için dApps tarafından kullanılabilecek merkezi olmayan bir oracle ağı sağlar. BandChain sözleşmeyi dağıtma, değerleri depolamaya ve bunları güncellemeye ilişkin dokümanlar [**burada**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library) bulunabilir.