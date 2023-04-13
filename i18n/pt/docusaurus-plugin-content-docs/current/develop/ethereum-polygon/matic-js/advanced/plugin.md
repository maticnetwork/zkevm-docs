---
id: plugin
title: Plugin
keywords:
- 'plugin, api type, read, write, polygon'
description: 'Use o plugin para injetar código em Matic.js.'
---

Usando o plugin pode injetar código em `matic.js`. Pode ser usado para escrever um conjunto comum de códigos genéricos que podem ser fornecidos a qualquer pessoa que use um pacote.

:::info

O plugin torna o `matic.js` leve uma vez que implementa apenas a parte lógica importante.

:::

Na verdade, a biblioteca web3 é suportada usando o plugin que nos permite usar a nossa biblioteca favorita.

### Desenvolvimento do plugin {#plugin-development}

O plugin é uma classe que implementa `IPlugin`.

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

Como pode ver - só precisa de implementar um método `setup` que será chamado com a exportação padrão de `matic.js`.

### Usar o plugin {#use-plugin}

`matic.js` expõe o método `use` para usar um plugin.

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

Pode usar vários plugins e estes serão chamados pela mesma ordem em que foram declarados.

**Alguns repositórios de plugin são -**

- [Matic web3.js](https://github.com/maticnetwork/maticjs-web3)
- [Matic ethers](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
