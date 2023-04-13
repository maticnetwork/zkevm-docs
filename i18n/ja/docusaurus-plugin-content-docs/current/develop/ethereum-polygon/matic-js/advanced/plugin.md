---
id: plugin
title: プラグイン
keywords:
- 'plugin, api type, read, write, polygon'
description: 'プラグインを使用して、Matic.jsにコードを入力します。'
---

プラグインを使用すると、コードを`matic.js`へ入力することができます。パッケージを使用して誰にでも提供できる汎用コードの共通セットを書き込むために使用することができます。

:::info
プラグインは、重要な論理パートのみを実装するため、`matic.js`を軽量にします。
:::

実際、web3ライブラリは、お気に入りのライブラリを使用することを可能にするプラグインを使用してサポートされています。

### プラグインの開発 {#plugin-development}

プラグインは、`IPlugin`を実装するクラスです。

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

ご覧にいただいているように、デフォルトの`matic.js`のエクスポートで呼び出される`setup`メソッドを実装するだけです。

### プラグインを使用 {#use-plugin}

プラグインを使用するためのメソッドを`matic.js`公開`use`します。

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

複数のプラグインを使用することができ、宣言と同様の順番で呼び出されます。

**いくつかのプラグインのリポ -**

- [Matic web3.js](https://github.com/maticnetwork/maticjs-web3)
- [Matic ether](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
