---
id: plugin
title: 플러그인
keywords:
- 'plugin, api type, read, write, polygon'
description: 'Matic.js에 코드를 삽입하기 위해 플러그인을 사용합니다.'
---

플러그인을 사용해 코드를 `matic.js`에 삽입할 수 있습니다. 플러그인은 누구나에게 패키지로 제공할 수 있는 일반적인 코드 집합을 작성하는 데 사용될 수 있습니다.

:::info

플러그인은 중요한 논리 부분만 구현하기 때문에 `matic.js`는 가벼울 수밖에 없습니다.

:::

실제로 웹3 라이브러리는 플러그인을 통해 지원되므로 사용자는 선호하는 라이브러리를 사용할 수 있습니다.

### 플러그인 개발 {#plugin-development}

플러그인은 `IPlugin`을 구현하는 클래스입니다.

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

보시다시피, `matic.js` 기본 내보내기를 사용하여 호출되는 `setup` 메서드만 구현하면 됩니다.

### 플러그인 사용 {#use-plugin}

`matic.js`는 플러그인 사용을 위한 `use` 메서드를 제공합니다.

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

여러 플러그인을 사용할 수 있으며, 플러그인은 선언된 순서대로 호출됩니다.

**다음은 몇몇 플러그인 저장소의 예입니다.**

- [Matic web3.js](https://github.com/maticnetwork/maticjs-web3)
- [Matic ethers](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
