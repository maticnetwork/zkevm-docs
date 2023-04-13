---
id: abi-manager
title: ABIManager
keywords:
- 'abi manager, api type, read, write, polygon'
description: "Il gestore interno dell'ABI di Matic.js."
---

`matic.js` utilizza internamente `ABIManager` per curare per tuo conto la configurazione e la gestione dell'ABI. L'ABI e la configurazione vengono recuperati da un [repository statico](https://github.com/maticnetwork/static).

## Cambiare ABI {#change-abi}

A volte ti viene richiesto di cambiare l'ABI, in particolare quando stai sviluppando un contratto. Puoi farlo utilizzando `ABIManager`.

**Sintassi**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager(<network name>,<version>);
await manager.init();

// set abi

manager.setABI(<contract name>,<bridge type>, <abi value>);

// get abi

manager.getABI(<contract name>,<bridge type>);
```

Il nome della rete, il nome del contratto, il nome del bridge ecc. possono essere recuperati dal nostro [repository statico ufficiale](https://github.com/maticnetwork/static/tree/master/network).

**Esempio**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
```




