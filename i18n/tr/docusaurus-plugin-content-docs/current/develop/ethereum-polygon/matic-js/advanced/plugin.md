---
id: plugin
title: Eklenti
keywords:
- 'plugin, api type, read, write, polygon'
description: 'Matic.js''ye kod eklemek için eklenti kullanın.'
---

Eklenti kullanarak kodunuzu `matic.js`'ye ekleyebilirsiniz. Bir paket kullanan herkese sağlanabilen genel bir dizi jenerik kod yazmak için kullanılabilir.

:::info

Eklenti, sadece önemli mantıksal parçaları uyguladığı için `matic.js`'yi hafifletir.

:::

Aslında, web3 kütüphanesi, favori kütüphanemizi kullanmamıza izin veren eklenti kullanılarak desteklenir.

### Eklenti geliştirme {#plugin-development}

Eklenti, `IPlugin` uygulayan bir sınıftır.

```
import { IPlugin } from "@maticnetwork/maticjs";

export class MyPlugin implements IPlugin {

    // variable matic is - default export of matic.js
    setup(matic) {

        // get web3client
        const web3Client = matic.Web3Client ;
    }
}
```

Görebileceğiniz üzere - varsayılan `matic.js` dışa aktarması ile çağrılacak olan bir `setup` metodunu uygulamanız yeterlidir.

### Eklenti Kullanma {#use-plugin}

`matic.js` bir eklenti kullanmak için `use` metodunu açığa çıkarır.

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

Birden çok eklenti kullanabilirsiniz ve bu eklentiler dâhil edildikleri sırayla çağrılır.

**Bazı eklenti havuzları -**

- [Matic web3.js](https://github.com/maticnetwork/maticjs-web3)
- [Matic ethers](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
