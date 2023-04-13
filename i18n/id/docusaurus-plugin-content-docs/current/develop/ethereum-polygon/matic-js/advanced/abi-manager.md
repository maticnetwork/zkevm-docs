---
id: abi-manager
title: ABIManager
keywords:
- 'abi manager, api type, read, write, polygon'
description: "Manajer ABI internal Matic.js."
---

`matic.js` secara internal menggunakan `ABIManager` untuk menangani manajemen ABI, konfigurasi untuk Anda. Semua ABI dan config diambil dari [repo statis](https://github.com/maticnetwork/static).

## Mengubah ABI {#change-abi}

Terkadang Anda perlu mengubah ABI, khususnya ketika Anda sedang mengembangkan kontrak. Anda dapat melakukannya dengan menggunakan `ABIManager`.

**Sintaks**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager(<network name>,<version>);
await manager.init();

// set abi

manager.setABI(<contract name>,<bridge type>, <abi value>);

// get abi

manager.getABI(<contract name>,<bridge type>);
```

Nama jaringan, nama kontrak, nama jembatan, dll. dapat diambil dari [repo statis resmi](https://github.com/maticnetwork/static/tree/master/network) kami.

**Contoh**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
```




