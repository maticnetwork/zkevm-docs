---
id: plugin
title: Plugin
keywords:
- 'plugin, api type, read, write, polygon'
description: 'Mit dem Plugin einen Code in Matic.js einspeisen.'
---

Mithilfe des Plugins kannst du deinen Code in die  `matic.js`einspeisen. Damit kannst du einen gemeinsamen Satz generischer Codes aufschreiben, der dann jedem Paketnutzer zur Verfügung gestellt werden kann.

:::info

Das Plugin erleichtert  `matic.js`, da es nur den wichtigen logischen Teil umsetzt.

:::

In Wirklichkeit wird die web3-Bibliothek durch ein Plugin unterstützt, wodurch wir unsere Favoriten-Bibliothek nutzen können.

### Plugin-Entwicklung {#plugin-development}

Plugin ist eine Klasse, die `IPlugin` umsetzt.

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

Wie du sehen kannst, muss du nur eine `setup` Methode umsetzen, die dann durch den Standard-Export von `matic.js`aufgerufen wird.

### Plugin verwenden {#use-plugin}

`matic.js` zeigt die `use` Methode zur Plugin-Nutzung.

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

Du kannst mehrere Plugins verwenden. Sie werden dann in der gleichen Reihenfolge aufgerufen, wie sie deklariert sind.

**Manche Plugin-Repos sind -**

- [Matic web3.js](https://github.com/maticnetwork/maticjs-web3)
- [Matic ethers](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
