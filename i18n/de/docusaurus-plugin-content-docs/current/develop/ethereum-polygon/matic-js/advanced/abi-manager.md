---
id: abi-manager
title: ABIManager
keywords:
- 'abi manager, api type, read, write, polygon'
description: "Der interne ABI Manager von Matic.js."
---

`matic.js` nutzt intern `ABIManager` für den Umgang mit dem ABI Management, eine Konfiguration für dich. Alle der ABI and config sind aus  [static repo](https://github.com/maticnetwork/static) genommen.

## ABI ändern {#change-abi}

Manchmal ist es erforderlich, den ABI zu ändern, besonders wenn du einen Contract entwickelst. Du kannst es mithilfe von  `ABIManager`tun.

**Syntax**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager(<network name>,<version>);
await manager.init();

// set abi

manager.setABI(<contract name>,<bridge type>, <abi value>);

// get abi

manager.getABI(<contract name>,<bridge type>);
```

Der Netzwerk-, Contract- und Bridge-Name, etc. sind von unserem  [official static repo](https://github.com/maticnetwork/static/tree/master/network) erhältlich.

**Beispiel**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
```




