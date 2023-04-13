---
id: abi-manager
title: ABIManager
keywords:
- 'abi manager, api type, read, write, polygon'
description: "Matic.js'nin dâhili ABI yöneticisi."
---

`matic.js`, ABI yönetimini ve yapılandırmasını sizin adınıza yapmak için dâhili olarak `ABIManager` kullanır. ABI ve yapılandırmanın tümü [statik bilgi deposundan](https://github.com/maticnetwork/static) alınır.

## ABI'yi değiştirme {#change-abi}

Bazen, özellikle de sözleşme geliştirirken ABI'yi değiştirmeniz gerekir. Bunu yapmak için `ABIManager` kullanabilirsiniz.

**Söz dizimi**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager(<network name>,<version>);
await manager.init();

// set abi

manager.setABI(<contract name>,<bridge type>, <abi value>);

// get abi

manager.getABI(<contract name>,<bridge type>);
```

Ağ adı, sözleşme adı, köprü adı, vb. resmi [statik bilgi depomuzdan](https://github.com/maticnetwork/static/tree/master/network) alınabilir.

**Örnek**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
```




