---
id: plugin
title: Complemento
keywords:
- 'plugin, api type, read, write, polygon'
description: 'Usa el complemento para inyectarle el código a Matic.js.'
---

Al usar el complemento puedes inyectar tu código en `matic.js`. Se puede usar para escribir un conjunto común de códigos genéricos que se le pueden proporcionar a cualquiera que use un paquete.

:::info

El complemento hace que el `matic.js` sea ligero, ya que solo implementa la parte lógica importante.

:::

De hecho, la biblioteca web3 es admitida al usar un complemento que nos permite usar nuestra biblioteca favorita.

### Desarrollo de complementos {#plugin-development}

El complemento es una clase que implementa `IPlugin`.

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

Como puedes ver, solo necesitas implementar un método de `setup` que será llamado con la exportación por defecto de `matic.js`.

### Utilizar complemento {#use-plugin}

`matic.js` expone el método de `use`para utilizar un complemento.

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

Puedes utilizar varios complementos y se llamarán en el mismo orden en que se declaren.

**Algunos repositorios de complementos son:**

- [Matic web3.js](https://github.com/maticnetwork/maticjs-web3)
- [Matic ethers](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
