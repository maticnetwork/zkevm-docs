---
id: abi-manager
title: ABIManager
keywords:
- 'abi manager, api type, read, write, polygon'
description: "Administrador de la interfaz binaria de aplicación (ABI) interna de matic.js"
---

`matic.js`internamente usa `ABIManager` para manejar la configuración del ABIManager (administrador de la ABI). Toda la ABI y la configuración se toman del [repositorio estático](https://github.com/maticnetwork/static).

## Cambio de la ABI {#change-abi}

A veces se necesita cambiar la ABI, especialmente cuando se está desarrollando un contrato. Para ello, puedes utilizar `ABIManager`

**Sintaxis**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager(<network name>,<version>);
await manager.init();

// set abi

manager.setABI(<contract name>,<bridge type>, <abi value>);

// get abi

manager.getABI(<contract name>,<bridge type>);
```

El nombre de la red, el nombre del contrato, el nombre del puente, etc., se pueden tomar de nuestro [repositorio estático oficial](https://github.com/maticnetwork/static/tree/master/network).

**Ejemplo**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
```




