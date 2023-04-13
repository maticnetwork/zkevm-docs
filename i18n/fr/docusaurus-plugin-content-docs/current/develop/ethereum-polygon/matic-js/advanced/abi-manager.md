---
id: abi-manager
title: ABIManager
keywords:
- 'abi manager, api type, read, write, polygon'
description: "Le gestionnaire interne ABI de Matic.js."
---

`matic.js` utilise en interne `ABIManager` pour traiter la gestion d'ABI, une configuration pour vous. La totalité d'ABI et sa configuration sont extraites du [répertoire statique](https://github.com/maticnetwork/static).

## Changement d'ABI {#change-abi}

Parfois, vous devez modifier l'ABI, en particulier lorsque vous développez un contrat. Vous pouvez le faire en utilisant`ABIManager`.

**Syntaxe**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager(<network name>,<version>);
await manager.init();

// set abi

manager.setABI(<contract name>,<bridge type>, <abi value>);

// get abi

manager.getABI(<contract name>,<bridge type>);
```

Le nom du réseau, le nom du contrat, le nom du pont, etc. peuvent être extraits de notre [répertoire statique officiel](https://github.com/maticnetwork/static/tree/master/network).

**Exemple**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
```




