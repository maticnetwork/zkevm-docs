---
id: plugin
title: Plugin
keywords:
- 'plugin, api type, read, write, polygon'
description: 'Sử dụng plugin để đưa mã vào Matic.js.'
---

Sử dụng plugin, bạn có thể đưa mã của mình vào `matic.js`. Plugin có thể được sử dụng để viết bộ mã chung, bộ mã này có thể được cung cấp cho bất kỳ ai sử dụng gói.

:::info

Plugin khiến `matic.js` nhẹ hơn vì nó chỉ thực hiện một phần logic quan trọng.
:::

Trên thực tế, thư viện web3 được hỗ trợ bằng plugin cho phép chúng tôi sử dụng thư viện yêu thích của mình.

### Phát triển plugin {#plugin-development}

Plugin là một lớp triển khai `IPlugin`.

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

Bạn có thể thấy - bạn chỉ cần triển khai một phương pháp `setup` sẽ được gọi bằng kết xuất mặc định của `matic.js`.

### Sử dụng Plugin {#use-plugin}

`matic.js` hiển thị phương pháp `use` để sử dụng plugin.

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

Bạn có thể sử dụng nhiều plugin và chúng sẽ được gọi theo thứ tự như lệnh khai báo.

**Một số ủy thác plugin là -**

- [Matic web3.js](https://github.com/maticnetwork/maticjs-web3)
- [Matic ethers](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
