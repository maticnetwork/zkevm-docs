---
id: abi-manager
title: ABIManager
keywords:
- 'abi manager, api type, read, write, polygon'
description: "โปรแกรมจัดการ ABI ภายในของ Matic.js"
---

`matic.js` ใช้ `ABIManager` เป็นการภายในเพื่อรับมือกับการจัดการ ABI และการกำหนดค่าให้กับคุณนำ ABI และการกำหนดค่าทั้งหมดมาจาก [static repo](https://github.com/maticnetwork/static)

## เปลี่ยน ABI {#change-abi}

บางครั้ง คุณจำเป็นต้องเปลี่ยน ABI โดยเฉพาะอย่างยิ่ง เมื่อคุณกำลังพัฒนาสัญญาซึ่งคุณสามารถทำได้โดยใช้ `ABIManager`

**ไวยากรณ์**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager(<network name>,<version>);
await manager.init();

// set abi

manager.setABI(<contract name>,<bridge type>, <abi value>);

// get abi

manager.getABI(<contract name>,<bridge type>);
```

นำชื่อเครือข่าย ชื่อสัญญา ชื่อบริดจ์ ฯลฯ มาจาก [static repo อย่างเป็นทางการ](https://github.com/maticnetwork/static/tree/master/network)ของเราได้

**ตัวอย่าง**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
```




