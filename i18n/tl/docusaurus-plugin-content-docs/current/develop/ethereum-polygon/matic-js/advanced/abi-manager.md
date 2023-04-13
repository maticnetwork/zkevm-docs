---
id: abi-manager
title: ABIManager
keywords:
- 'abi manager, api type, read, write, polygon'
description: "Panloob na ABI manager ng Matic.js"
---

Panloob na ginagamit ng `matic.js` ang `ABIManager` para sa pangangasiwa sa pamamahala ng ABI at configuration para sa iyo. Lahat ng ABI at config ay kinuha mula sa [static repo](https://github.com/maticnetwork/static).

## Baguhin ang ABI {#change-abi}

Minsan kinakailangan mong baguhin ang ABI, lalo na kapag gumagawa ka ng kontrata. Magagawa mo ito sa pamamagitan ng paggamit sa `ABIManager`.

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

Ang pangalan ng network, pangalan ng kontrata, pangalan ng bridge atbp. ay maaaring kunin mula sa aming [opisyal na static repo](https://github.com/maticnetwork/static/tree/master/network).

**Halimbawa**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
```




