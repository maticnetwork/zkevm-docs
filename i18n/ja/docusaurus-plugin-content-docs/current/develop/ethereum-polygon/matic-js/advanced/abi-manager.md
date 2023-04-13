---
id: abi-manager
title: ABIManager
keywords:
- 'abi manager, api type, read, write, polygon'
description: "Matic.jsの内部ABIマネージャー"
---

`matic.js`は内部では、ABI管理、構成を処理するために`ABIManager`を使用します。ABIおよび設定はすべて[静的レポ](https://github.com/maticnetwork/static)から受け取ります。

## ABIの変更 {#change-abi}

特にコントラクトを開発している場合、ABIを変更する必要がある場合があります。`ABIManager`を使用することで、これを実行することができます。

**構文**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager(<network name>,<version>);
await manager.init();

// set abi

manager.setABI(<contract name>,<bridge type>, <abi value>);

// get abi

manager.getABI(<contract name>,<bridge type>);
```

ネットワーク名、コントラクト名、ブリッジ名などは、[公式の静的レポ](https://github.com/maticnetwork/static/tree/master/network)から取得することができます。

**例**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
```




