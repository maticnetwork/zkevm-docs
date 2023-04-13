---
id: abi-manager
title: ABIManager
keywords:
- 'abi manager, api type, read, write, polygon'
description: "Внутреннее средство управления ABI в Matic.js."
---

`matic.js` на внутреннем уровне использует `ABIManager`, чтобы помочь вам обеспечить управление и конфигурирование ABI. Все параметры ABI и конфигурации взяты из [статического репозитория](https://github.com/maticnetwork/static).

## Изменение ABI {#change-abi}

Иногда вам требуется изменить ABI, особенно при разработке контракта. Вы можете сделать это с помощью `ABIManager`.

**Синтаксис**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager(<network name>,<version>);
await manager.init();

// set abi

manager.setABI(<contract name>,<bridge type>, <abi value>);

// get abi

manager.getABI(<contract name>,<bridge type>);
```

Имя сети, имя контракта, имя моста и т. д. можно взять из нашего [официального статического репозитория](https://github.com/maticnetwork/static/tree/master/network).

**Пример**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
```




