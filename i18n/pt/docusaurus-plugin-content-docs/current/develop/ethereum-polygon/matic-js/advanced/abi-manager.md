---
id: abi-manager
title: ABIManager
keywords:
- 'abi manager, api type, read, write, polygon'
description: "Gestor ABI interno de Matic.js."
---

`matic.js` usa `ABIManager` internamente para lhe tratar da gestão e configuração ABI. Tudo o que é ABI e configuração são retirados do [repositório estático](https://github.com/maticnetwork/static).

## Alterar ABI {#change-abi}

Por vezes é necessário alterar o ABI, especialmente quando está a desenvolver um contrato. Pode fazê-lo usando `ABIManager`.

**Sintaxe**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager(<network name>,<version>);
await manager.init();

// set abi

manager.setABI(<contract name>,<bridge type>, <abi value>);

// get abi

manager.getABI(<contract name>,<bridge type>);
```

O nome da rede, o nome do contrato, o nome da bridge, etc. podem ser retirados do nosso [repositório estático oficial](https://github.com/maticnetwork/static/tree/master/network).

**Exemplo**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
```




