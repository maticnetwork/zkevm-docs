---
id: set-proof-api
title: ProofApi Ayarı
keywords:
    - setProofApi
    - polygon
    - sdk
description: Kanıt API'si yapılandırma.
---

Matic.js içindeki işlevlerden bazıları daha hızlı terim ile eklenir. Adından da anlaşılacağı gibi, daha hızlı olmayan meslektaşlarına göre sonuçları daha hızlı üretirler. Bunu Proof Generation API'sini herkes tarafından barındırılabilecek arka uç olarak kullanarak yaparlar.

[https://apis/matic.network](https://apis/matic.network) Polygon tarafından barındırılan bir Proof Generation is

Bu `setProofApi`yöntem, Proof Generation API'nin URL'sini matic.js örneğine ayarlamada yardımcı olabilir.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

Kendi kendine barındırılan Proof Generation API hizmetini kullanmak, kamuya açık bir şekilde barındırılan bir API hizmetine kıyasla daha iyi bir performans sunacaktır.

Lütfen hizmeti kendi kendine barındırmak için README.md dosyasında verilen kurulum talimatlarını takip edin.

ör. - kanıt api'sini devreye aldıysanız ve taban url - `https://abc.com/` ise `setProofApi` içinde taban url'yi ayarlamanız gerekir

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

:::tip
Daha hızlı API'leri kullanmanızı öneririz, çünkü bazı API'ler, özellikle de kanıt üretildiği yerde çok fazla RPC çağrısı yapar ve bu durum genel RPC'ler ile çok yavaş olabilir.
:::
