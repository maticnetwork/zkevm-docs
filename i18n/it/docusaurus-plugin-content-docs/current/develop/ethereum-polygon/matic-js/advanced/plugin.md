---
id: plugin
title: Plug-in
keywords:
- 'plugin, api type, read, write, polygon'
description: 'Usa il plugin per inserire codice in Matic.js.'
---

Usando il plug-in puoi inserire il tuo codice in `matic.js`. Può essere utilizzato per scrivere un insieme comune di codici generici che possono essere forniti a chiunque utilizzi un pacchetto.

:::info

Il plug-in alleggerisce `matic.js` in quanto implementa solo la parte logica importante.

:::

Infatti la libreria web3 è supportata tramite un plug-in che ti consente di utilizzare la tua libreria preferita.

### Sviluppo del plug-in {#plugin-development}

Il plug-in è una classe che implementa `IPlugin`.

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

Come puoi vedere, è sufficiente implementare un metodo `setup` che verrà richiamato con l'esportazione predefinita di `matic.js`.

### Usare il plug-in {#use-plugin}

`matic.js` espone il metodo `use` per usare un plug-in.

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

Puoi utilizzare più plug-in che verranno richiamati nello stesso ordine in cui sono stati dichiarati.

**Di seguito sono elencati alcuni repository di plug-in:**

- [Matic web3.js](https://github.com/maticnetwork/maticjs-web3)
- [Matic ethers](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
