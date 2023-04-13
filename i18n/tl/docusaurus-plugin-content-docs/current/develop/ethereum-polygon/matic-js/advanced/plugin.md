---
id: plugin
title: Plugin
keywords:
- 'plugin, api type, read, write, polygon'
description: 'Gumamit ng plugin para magpasok ng code sa Matic.js.'
---

Gamit ang plugin, maaari mong ipasok ang iyong code sa `matic.js`. Maaari itong gamitin para magsulat ng karaniwang set ng mga generic code na maaaring ibigay sa sinuman gamit ang isang package.

:::info

Ginagawang light weight ng plugin ang `matic.js` dahil ipinapatupad lang nito ang mahalagang logical na bahagi.

:::

Sa katunayan, sinusuportahan ang web3 library gamit ang plugin na nagbibigay-daan sa atin na gamitin ang ating paboritong library.

### Pagpapaunlad ng plugin {#plugin-development}

Ang plugin ay isang class na nagpapatupad ng `IPlugin`.

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

Tulad ng iyong nakikita - kailangan mo lang magpatupad ng paraang `setup` na iko-call gamit ang default na pag-export ng `matic.js`.

### Gumamit ng Plugin {#use-plugin}

Nilalantad ng `matic.js` ang paraang `use` para sa paggamit ng plugin.

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

Maaari kang gumamit ng maraming plugin at iko-call ang mga ito sa parehong pagkakasunod-sunod ng pagkakadeklara sa mga ito.

**Ang ilang plugin repo ay -**

- [Matic web3.js](https://github.com/maticnetwork/maticjs-web3)
- [Matic ethers](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
