---
id: widget
title: Cüzdan Widget'ı
sidebar_label: Wallet Widget
description: "Köprü işlemlerini yürütmek için kullanıcı arayüzü araçları."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Cüzdan widget'ı, köprü işlemlerini -Fon Çekme ve Yatırma- yapmak için bir web uygulamasına gömülebilecek bir kullanıcı arayüzü aracıdır.

Her widget, [Widget panosundan](https://wallet.polygon.technology/widget-dashboard) alabileceğiniz benzersiz bir ad ile tanımlanır.

### Widget panosu {#widget-dashboard}

Widget, cüzdan uygulaması içindeki widget panosu sayfasından oluşturulabilir. Bu sayfa kullanıcının bazı özelleştirilebilir seçeneklere sahip yeni bir widget oluşturmasına olanak tanır.

Widget oluşturulduktan sonra, kod parçacığını kopyalayıp uygulamanıza ekleyebilir veya widget adını kullanıp kendiniz yapılandırabilirsiniz.

Widget panosu linki burada -

* mainnet - https://wallet.polygon.technology/widget-dashboard
* testnet - ttps://wallet-dev.polygon.technology/widget-dashboard

## Kur {#install}

Widget, javascript kütüphanesi olarak dışa aktarılır ve npm paketi olarak kullanılabilir.

```bash
npm i @maticnetwork/wallet-widget
```

## Örnekler {#examples}

Geliştirme çalışmanızda size yardımcı olmak için farklı altyapı ve araçlar için örnekler oluşturduk. Tüm örnekler şu adreste mevcuttur - [https://github.com/maticnetwork/wallet-widget-example](https://github.com/maticnetwork/wallet-widget-example)

## Nasıl kullanılır {#how-to-use}
### Hedef ile {#with-target}

Uygulamanız içinde bir düğme olduğunu ve düğmeye bastığınızda widget'ın görünmesini istediğinizi varsayın -

```html
<button id="btnMaticWidget"></btn>
```

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'mainnet' // network to be used - testnet or mainnet
});
```

Hazır olduğunuzda widget'ı oluşturun. Oluşturma fonksiyonunu belge yüklendikten sonra çağırmak en iyi yoldur.

```javascript
await widget.create();
```
widget oluşturulmuştur, artık düğmeye tıkladığınızda widget gösterilecektir.

### Hedef olmadan {#without-target}

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    network: 'mainnet' // network to be used - testnet or mainnet
});

await widget.create();
```

widget oluşturulmuştur, ancak widget'ı göstermek için `show` API'ını çağırmanız gerekecektir.

```
widget.show();
```

Benzer şekilde, `hide` API çağrısı yaparak widget'ı gizleyebilirsiniz.

```
widget.hide();
```

### Önemli Not 👉 {#important-note}

1. "Testnet" veya "mainnet" ağına bağlı olarak, uygulamanızı karşılık gelen pano üzerinde oluşturmanız gerekir. Testnet ve mainnet üzerinde aynı ad ile uygulama oluşturmanızı öneririz. Böylece ağ değiştirirken herhangi bir sorun yaşamazsınız.

2. Cüzdan widget'ı kullanıcı arayüzü kütüphanesidir ve farklı web siteleri üzerinde farklı görünecektir. Ayrıca renk, yanıt verme gibi konularda sorunlar yaşanabilir, bu nedenle lütfen test ve kişiselleştirme için zaman harcayın. Yardım ihtiyacınız olduğunda - lütfen [destek ekibi](https://support.polygon.technology/) ile iletişim kurun.

3. Cüzdan widget'ı mobil cihazlarda tam ekran olarak çalışır; ancak `style` yapılandırması ile özelleştirebilirsiniz.

## Yapılandırma {#configuration}

Yapılandırma Widget oluşturucu (constructor) ile sağlanabilir.

## Kullanılabilir yapılandırmalar şunlardır {#available-configuration-are}

- **target** : dize - Widget'ı öğe tıklanınca göstermek için CSS seçicisi. Örneğin, "#btnMaticWidget" aşağıdaki kodun hedefi olacaktır.

```javascript
<button id="btnMaticWidget">Matic widget</button>
```

- **network** : dize - kullanılacak ağdır. İki seçenek mevcuttur - "test ağı" veya "mainnet".
- **width** : sayı - Widget'ın genişliği
- **height** : sayı - Widget'ın yüksekliği
- **autoShowTime** : sayı - Widget'ın milisaniye cinsinden belirtilen sürede otomatik gösterilmesi
- **appName** : dize - uygulamanızın adı, bu değer widget panosundan alınabilir.
- **position** : dize - Widget'ın konumunu ayarlar. Kullanılabilir seçenekler şunlardır -
    - center (orta)
    - bottom-right (alt sağ taraf)
    - bottom-left (alt sol taraf)
- **amount** : dize - Miktarı metin kutusuna önceden doldur
- **page** : dize - sayfayı seç. Kullanılabilir seçenekler şunlardır - `withdraw`, `deposit`.
- **overlay** : boolean - widget açıldığında yer paylaşımını göster. Varsayılan olarak false değerini alır.
- **style** : nesne - widget'a bazı css stillerini uygula.

```
var widget = new MaticWidget({
    appName: "<your app id>", //appName from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'testnet' // network to be used - testnet or mainnet,
    style:{
      color:'red'
    }
});
```

## Olaylar {#events}

Widget'lar uygulama içinde neler olduğunu görmek için kullanılabilecek bazı olaylar gerçekleştirir.

### Olaylara abone olma {#subscribe-to-events}

```javascript
widget.on('load',()=>{
  console.log('widget is loaded');
})
```

### Olaylara abonelikten çıkma {#unsubscribe-to-events}

```javascript
widget.off('load',<callback>)
```

> Geri arama (callback), olaya abone olmak için kullanılanla aynı olmalıdır. Bu nedenle geri aramanın bir değişken olarak saklanması daha iyi bir yoldur. `

## Olayların listesi: {#list-of-events}

- **load** - Widget yüklendi
- **close** - Widget kapandı
- **approveInit** - Onay işlemi başlatıldı
- **approveComplete** - Onay işlemi tamamlandı
- **approveError** - Onay işlemi bir hata nedeniyle başarısız oldu, ya da kullanıcı işlemi Metamask'da reddetti
- **depositInit** - Fon yatırma işlemi başlatıldı
- **depositComplete** - Fon yatırma işlemi tamamlandı
- **depositError** - Fon yatırma işlemi bir hata nedeniyle başarısız oldu, ya da kullanıcı işlemi Metamask'da reddetti
- **burnInit** - Fon çekme yakma işlemi başlatıldı
- **burnComplete** - Fon çekme yakma işlemi tamamlandı
- **confirmWithdrawInit** - Fon çekme işlemi için denetim noktası atandı ve onaylama işlemi başlatıldı
- **confirmWithdrawComplete** - Fon çekme onaylama işlemi tamamlandı
- **confirmWithdrawError** - Fon çekme onaylama işlemi bir hata nedeniyle başarısız oldu, ya da kullanıcı işlemi Metamask'da reddetti
- **exitInit** - Fon çekme çıkış işlemi başlatıldı
- **exitComplete** - Fon çekme çıkış işlemi tamamlandı
- **exitError** - Fon çekme çıkış işlemi bir hata nedeniyle başarısız oldu, ya da kullanıcı işlemi Metamask'da reddetti

## API'ler {#apis}

- **show** -
widget'ı gösterir

```javascript
widget.show()
```

- **gizle** -
widget'ı gizler

```javascript
widget.hide()
```

- **açık** -
olaylara abone olma

```javascript
widget.on('<event name>', callback)
```

- **kapalı** -
olaylara abonelikten çıkma

```javascript
widget.off('<event name>', callback)
```
