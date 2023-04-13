---
id: set-proof-api
title: Set ProofApi
keywords:
    - setProofApi
    - polygon
    - sdk
description: I-configure ang proof API.
---

Some ang ilan sa mga function sa matic.js nang mas mabilis ang termino. Tulad ng iminumungkahi ng pangalan, mas mabilis silang bumubuo ng mga resulta kumpara sa kanilang mga non-faster mabilis na katapat. Ginagawa nila ito sa pamamagitan ng paggamit ng Proof Generation API bilang backend na maaaring i-host ng sinuman.

[https://apis/matic.network](https://apis/matic.network) ay isang pampublikong magagamit na Proof Generation API, na iniho-host ng Polygon.

Makakatulong ang `setProofApi`paraan sa pagtatakda ng URL ng Proof Generation API sa matic.js instance.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

Mag-aalok ang paggamit ng self-host na Proof Generation API service ng Proof Generation API para sa isang naka-host na isapubliko.

Please ang mga tagubilin sa pag-install na ibinigay sa README.md file ng https://github.com/maticnetwork/proof-generation-api para https://github.com/maticnetwork/proof-generation-api ang serbisyo.

hal. - kung nai-deploy mo ang proof api at ang base url ay - `https://abc.com/`, kung gayon kailangan mong itakda ang base url sa `setProofApi`

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

:::tip
Inirerekomenda namin ang paggamit ng mas mabilis na API, dahil nabuo ang ilang API, lalo na kung saan nabuo ang patunay, gumawa ng maraming tawag sa RPC at baka napakabagal ito sa mga public RPC.
:::
