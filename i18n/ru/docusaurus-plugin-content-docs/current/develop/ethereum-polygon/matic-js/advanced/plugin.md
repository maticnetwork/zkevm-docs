---
id: plugin
title: Плагин
keywords:
- 'plugin, api type, read, write, polygon'
description: 'Используйте плагин для внедрения кода в Matic.js.'
---

С помощью плагина можно внедрить свой код в `matic.js`. Его можно использовать для написания общего набора обобщенного кода, который может быть предоставлен любому лицу с помощью пакета.

:::info

Плагин упрощает `matic.js`, поскольку реализует только важную логическую часть.

:::

По сути дела, библиотека web3 поддерживается с помощью плагина, который позволяет нам использовать любимую библиотеку.

### Разработка плагинов {#plugin-development}

Плагин — это класс, который реализует `IPlugin`.

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

Как видите, вам необходимо просто реализовать метод `setup`, который будет вызываться с экспортом `matic.js` по умолчанию.

### Использование плагина {#use-plugin}

`matic.js` выявляет метод `use` для использования плагина.

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

Вы можете использовать несколько плагинов, при этом они будут вызываться в том же порядке, в котором они объявлены.

**Примеры репозитариев плагинов:**

- [Matic web3.js](https://github.com/maticnetwork/maticjs-web3)
- [Matic ethers](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
