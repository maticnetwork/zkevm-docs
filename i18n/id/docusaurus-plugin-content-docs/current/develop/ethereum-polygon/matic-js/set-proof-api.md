---
id: set-proof-api
title: Set ProofApi
keywords:
    - setProofApi
    - polygon
    - sdk
description: Mengonfigurasi API bukti.
---

Beberapa fungsi dalam matic.js tercekik dengan istilah lebih cepat. Seperti yang dimaksud, hasilnya lebih cepat dibandingkan dengan rekan-rekan yang tidak lebih cepat. Mereka melakukannya dengan menggunakan API Generasi Proof sebagai backend yang dapat dibawakan oleh siapa pun.

[https://apis/matic.network](https://apis/matic.network) adalah API Proof Generation yang tersedia secara terbuka, yang dibawakan oleh Polygon.

`setProofApi`Metode ini dapat membantu dalam mengatur URL API Proof Generation ke dalam bentuk matic.js.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

Memanfaatkan layanan API Proof Generation akan menawarkan kinerja yang lebih baik dibandingkan dengan yang dipandu ke publik.

Silakan ikuti instruksi instalasi yang disediakan dalam file https://github.com/maticnetwork/proof-generation-api untuk host sendiri layanan.

Misalnya, jika telah menyebarkan api bukti dan url dasarnya adalah - `https://abc.com/`, Anda perlu mengatur url dasar di `setProofApi`

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

:::tip
Kami merekomendasikan menggunakan API yang lebih cepat, karena beberapa API, terutama di mana bukti sedang dihasilkan, membuat banyak panggilan RPC dan mungkin sangat lambat dengan RPC.
:::
