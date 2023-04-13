---
id: plugin
title: ปลั๊กอิน
keywords:
- 'plugin, api type, read, write, polygon'
description: 'ใช้ปลั๊กอินเพื่อใส่โค้ดลงใน Matic.js'
---

คุณสามารถใช้ปลั๊กอินใส่โค้ดลงใน `matic.js` ได้โดยสามารถใช้เพื่อเขียนชุดโค้ดทั่วไป ซึ่งสามารถจัดให้แก่ใครก็ได้ที่ใช้แพ็คเกจ

:::info
ปลั๊กอินทำให้ `matic.js` เบาขึ้น เนื่องจากนำมาใช้งานเฉพาะส่วนลอจิกที่สำคัญ
:::

จริงๆ แล้ว ไลบรารี web3 ใช้ปลั๊กอินสนับสนุน ซึ่งทำให้เราสามารถใช้ไลบรารีโปรดได้

### การพัฒนาปลั๊กอิน {#plugin-development}

ปลั๊กอินเป็นคลาสที่นำ `IPlugin` มาใช้

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

อย่างที่คุณมองเห็นได้ คุณเพียงแค่จำเป็นต้องนำ `setup` มาใช้ ซึ่งจะถูกเรียกด้วยการส่งออก `matic.js` ตามค่าเริ่มต้น

### ใช้ปลั๊กอิน {#use-plugin}

`matic.js` แสดงเมธอด `use` สำหรับการใช้ปลั๊กอิน

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

คุณสามารถใช้ปลั๊กอินหลายตัวได้ ซึ่งจะถูกเรียกในลำดับเดียวกันกับที่ประกาศ

**พื้นที่เก็บปลั๊กอินบางตัว ได้แก่**

- [Matic web3.js](https://github.com/maticnetwork/maticjs-web3)
- [Matic Ether](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
