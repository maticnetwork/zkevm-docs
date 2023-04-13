---
id: plugin
title: Plugin
keywords:
- 'plugin, api type, read, write, polygon'
description: 'Utilisez le plugin pour injecter des codes dans Matic.js.'
---

En utilisant le plugin, vous pouvez injecter votre code dans`matic.js`. Il peut être utilisé pour écrire un ensemble commun de codes génériques pouvant être fournis à toute personne utilisant un package.

:::info
Le plugin rend le `matic.js`poids léger, car il n'implémente que des parties logiques importantes.
:::

En fait, la bibliothèque web3 est prise en charge à l'aide d'un plugin qui nous permet d'utiliser notre bibliothèque préférée.

### Développement de plugin {#plugin-development}

Le plugin est une classe qui implémente `IPlugin`.

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

Comme vous pouvez le constater, il vous suffit d'implémenter une `setup` méthode qui sera appelée avec l'exportation par défaut de `matic.js`.

### Utilisez le Plugin {#use-plugin}

`matic.js` exposez `use` la méthode pour utiliser un plugin.

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

Vous pouvez utiliser plusieurs plugins et ils seront appelés dans le même ordre dans lequel ils sont déclarés.

**Certains répertoires de plugins sont -**

- [Matic web3.js](https://github.com/maticnetwork/maticjs-web3)
- [Matic ethers](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
