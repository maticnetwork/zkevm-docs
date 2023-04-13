---
id: matic-to-ethereum
title: Polygon'dan Ethereum'a veri aktarımı
description: Polygon'dan Ethereum'a Sözleşmeler üzerinden durum veya veri aktarma
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon'dan Ethereum'a veri aktarma mekanizması, Ethereum'dan Polygon'a aktarma mekanizmasından biraz farklıdır. Doğrulayıcılar tarafından Ethereum zincirinde oluşturulan **denetim noktası** işlemleri bunu gerçekleştirmek için kullanılır. Temel olarak, ilk önce Polygon'da bir işlem oluşturulur. Bu işlemi oluştururken **olayın yayınlandığından** ve **olay günlüklerinin Polygon'dan Ethereum'a aktarmak istediğimiz veriyi içerdiğinden** emin olmak gerekir.

Bu işlem için Ethereum zinciri üzerinde doğrulayıcılar tarafından kontrol edilen bir süre içinde (yaklaşık 10-30 dakika). Denetim noktası atandıktan sonra, Polygon zinciri üzerinde oluşturulan işlemin hash'i, Ethereum zinciri üzerindeki **RootChainManager** sözleşmesine bir kanıt olarak gönderilebilir. Bu sözleşme işlemi geçerler (validate), işlemin denetim noktasına dâhil edildiğini onaylar ve son olarak bu işlemden gelen olay günlüklerinin kodunu çözer.

Bu aşama sona erdikten sonra, Ethereum zinciri üzerinde devreye alınan kök sözleşme üzerinde **herhangi bir değişiklik yapmak için bu kodu çözülen olay günlüğü verisini** kullanabiliriz. Bunun için ayrıca Ethereum üzerindeki durum değişikliğinin mutlaka güvenli bir şekilde yapıldığından emin olmamız gerekir. Bundan dolayı, bir tek **RootChainManager** sözleşmesiyle tetiklenebilecek özel bir sözleşme türü olan bir **Predicate** (koşul) sözleşmesi kullanıyoruz. Bu mimari, Ethereum üzerindeki durum değişikliklerinin yalnızca Polygon üzerinde yapılan işlem için denetim noktası atanıp Ethereum zinciri üzerinde **RootChainManager** sözleşmesi tarafından doğrulandığında gerçekleşmesini sağlar.

# Genel Bakış {#overview}

- Polygon zinciri üzerinde devreye alınan alt sözleşme üzerinde bir işlem gerçekleştirilir.
- Bu işlemde ayrıca bir olay yayınlanır. Bu olayın parametreleri, Polygon'dan Ethereum'a **aktarılması gereken veriyi içerir**.
- Polygon ağı üzerindeki doğrulayıcılar bu işlemi belirli bir zaman aralığında (muhtemelen 10-30 dakika) alır, doğrular ve Ethereum üzerindeki **denetim noktasına ekler**.
- **RootChain** sözleşmesi üzerinde bir denetim noktası işlemi oluşturulur ve denetim noktasının dâhil edilmesi bu [betik](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js) kullanılarak kontrol edilebilir
- Denetim noktası eklemesi tamamlandıktan sonra, **matic.js** kütüphanesi kullanılarak **RootChainManager** sözleşmesinin **exit** fonksiyonu çağrılabilir. **exit** fonksiyonu, bu [örnekte](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/exit.js) gösterilen matic.js kütüphanesi kullanılarak çağrılabilir.

- Betiğin çalıştırılması, Polygon işlem hash'inin Ethereum zincirine dâhil edildiğini doğrular ve bunun üzerine [predicate](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/contracts/CustomPredicate.sol) (koşul) sözleşmenin **exitToken** fonksiyonunu çağırır.
- Bu, **kök zincir sözleşmesi üzerindeki durum değişikliğinin** her zaman **güvenli** bir şekilde ve **bir tek koşul sözleşmesi vasıtasıyla** yapılmasını sağlar.
- Akılda tutulması gereken önemli bir nokta şudur ki, Polygon'dan gelen **işlem hash'inin doğrulanması** ve **koşul sözleşmesinin tetiklenmesi** **tek bir işlem içinde** gerçekleşir ve bu yolla kök sözleşme üzerindeki bir durum değişikliğinin güvenliği garantilenmiş olur.

# Uygulama (implementation) {#implementation}

Verilerin Polygon'dan Ethereum'a nasıl aktarılabileceği aşağıda basitçe gösterilmiştir. Bu eğitimde bir uint256 değerinin zincir çapında aktarılmasına bir örnek gösterilmektedir. Ama siz veri türünü aktarabilirsiniz. Fakat veriyi bayt cinsinden kodlamak ve sonra alt sözleşmeden göndermek gerekir. Verinin kodu son aşamada kök sözleşmede çözülebilir.

1. Önce kök zincir ve alt zincir sözleşmesini oluşturun. Durum değişikliğini yapan fonksiyonun aynı zamanda bir olay gönderdiğinde de emin olun. Bu olay, aktarılacak veriyi olayın parametrelerinden biri olarak içermelidir. Alt ve Kök sözleşmenin nasıl görünmesi gerektiğinin örnek bir formatı aşağıda gösterilmiştir. Bu sözleşme, bir setData fonksiyonu kullanılarak değeri belirlenen bir veri değişkenine sahip çok basit bir sözleşmedir. setData fonksiyonunu çağırmak Veri olayını yayınlar. Sözleşmedeki unsurların geri kalanı bu eğitimin ileriki bölümlerinde açıklanacaktır.

A. Alt (Child) Sözleşme

```javascript
contract Child {

    event Data(address indexed from, bytes bytes_data);

    uint256 public data;

    function setData(bytes memory bytes_data) public {
     data = abi.decode(bytes_data,(uint256));
     emit Data(msg.sender,bytes_data);
    }

}
```

B. Kök (Root) Sözleşme

Kök sözleşme oluşturucusunda (constructor) bu `0x1470E07a6dD1D11eAE439Acaa6971C941C9EF48f` dizisini `_predicate`'in değeri olarak geçirin.

```javascript
contract Root {

    address public predicate;
    constructor(address _predicate) public{
        predicate=_predicate;
    }

   modifier onlyPredicate() {
        require(msg.sender == predicate);
        _;
    }

    uint256 public data;

    function setData(bytes memory bytes_data) public onlyPredicate{
        data = abi.decode(bytes_data,(uint256));
    }

}
```

2. Alt ve kök sözleşmeler ayrı ayrı Polygon ve Ethereum zincirleri üzerinde devreye alındıktan sonra, bu sözleşmeler PoS köprüsü kullanılarak eşlenmelidir. Bu eşleme, iki sözleşme arasında zincirler arası bir bağlantının bulunmasını sağlar. Bu eşlemeyi yapmak için Polygon ekibine [discord](https://discord.com/invite/0xPolygon) üzerinden ulaşabilirsiniz.

3. Akılda tutulması gereken önemli bir nokta, kök sözleşme içinde bir onlyPredicate niteleyicisinin (modifier) bulunduğudur. Bu niteleyicinin mutlaka kullanılması tavsiye edilir, çünkü bu niteleyici bir tek koşul sözleşmesinin kök sözleşmede durum değişikliği yapmasını garanti eder. Koşul sözleşmesi, Polygon zinciri üzerinde gerçekleşen işlemin Ethereum zinciri üzerindeki RootChainManager tarafından doğrulanması şartıyla kök sözleşmeyi tetikleyen özel bir sözleşmedir. Bu, kök sözleşme üzerindeki durum değişikliğinin güvenli olmasını sağlar.

Yukarıdaki uygulamayı test etmek için Polygon zinciri üzerinde alt sözleşmenin **setData** fonksiyonunu çağırarak bir işlem oluşturabiliriz. Bu noktada denetim noktasının tamamlanmasını beklememiz gerekiyor. Denetim noktasının dâhil edilme durumu bu [betik](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js) kullanılarak kontrol edilebilir. Denetim noktası tamamlandıktan sonra, matic.js SDK kullanarak RootChainManager'ın exit fonksiyonunu çağırın.

```jsx
const txHash =
  "0xc094de3b7abd29f23a23549d9484e9c6bddb2542e2cc0aa605221cb55548951c";

const logEventSignature =
  "0x93f3e547dcb3ce9c356bb293f12e44f70fc24105d675b782bd639333aab70df7";

const execute = async () => {
  try {
    const tx = await maticPOSClient.posRootChainManager.exit(
      txHash,
      logEventSignature
    );
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};
```

Yukarıdaki ekran görüntüsünde gösterildiği gibi, **txHash** Polygon zinciri üzerinde devreye alınan alt sözleşmede gerçekleşen işlemin işlem hash'idir.

**logEventSignature**, Veri olayının keccack-256 hash'idir. Bu, Koşul (Predicate) sözleşmesinin içine dâhil ettiğimiz hash ile aynıdır. Bu eğitimde kullanılan tüm sözleşme kodları ve çıkış betiği [burada](https://github.com/rahuldamodar94/matic-learn-pos/tree/transfer-matic-ethereum) bulunabilir

Çıkış betiği tamamlandıktan sonra, Ethereum zinciri üzerindeki kök sözleşme sorgulanarak alt sözleşmede belirlenen değişken **verinin** değerinin aynı zamanda kök sözleşmenin **veri** değişkeninde de yansıtılıp yansıtılmadığı doğrulanabilir.
