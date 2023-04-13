---
id: truffle
title: I-deploy ang isang Smart Contract gamit ang Truffle
sidebar_label: Using Truffle
description:  Gamitin ang Truffle para mag-deploy ang isang Smart Contract sa Polygon
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contract
  - truffle
  - deploy
  - polygonscan
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Pangkalahatang-ideya {#overview}

Ang [Truffle](https://trufflesuite.com/) ay isang kapaligiran ng pag-unlad ng blockchain na magagamit mo para lumikha at subukan ang mga smart contract sa pamamagitan ng leveraging ng Ethereum Virtual Machine. Naglalayon ang gabay na ito sa pagtuturo kung paano gumawa ng isang smart contract gamit ang Truffle at pag-deploy ito sa EVM-compatible Polygon Network.

:::note

Ang tutorial na ito ay isang inangkop na bersyon ng artikulong gabay ng [<ins>Truffle na quickstart</ins>](https://www.trufflesuite.com/docs/truffle/quickstart)

:::

## Ano ang gagawin mo {#what-you-will-do}

- I-install at i-set up ang Truffle
- I-deploy ang kontrata sa Polygon Network
- I-check ang status ng pag-deploy sa Polygonscan

## Mga kinakailangan {#prerequisites}

May ilang teknikal na kinakailangan bago tayo magsimula. I-install ang mga sumusunod:

- [Node.js v8 + LTS at npm](https://nodejs.org/en/) (nakabalot sa Node)
- [Git](https://git-scm.com/)

Kapag na-install na namin ang mga iyon, kailangan lang namin ng isang command para i-install ang Truffle:

```
npm install -g truffle
```

Para ma-verify na naka-install nang maayos ang Truffle, mag-type `truffle version`sa isang terminal. Kung may nakakakita ka ng error, siguraduhin na idinagdag ang mga npm module sa iyong landas.

## Paggawa ng proyekto {#creating-a-project}

### MetaCoin proyekto {#metacoin-project}

Gagamitin namin ang isa sa Truffle boilerplate na makikita mo sa kanilang [Truffle Boxes](https://trufflesuite.com/boxes/) pahina. Gumagawa ang [MetaCoin box](https://trufflesuite.com/boxes/metacoin/) ng token na maaaring ilipat sa pagitan ng mga account.

1. Magsimula sa pamamagitan ng paglikha ng bagong directory para sa proyektong Truffle na ito:

  ```bash
  mkdir MetaCoin
  cd MetaCoin
  ```

2. I-download ang MetaCoin box:

  ```bash
  truffle unbox metacoin
  ```

Gamit ang huling hakbang na iyon, gumawa ka ng isang proyektong Truffle na cointaining ng mga folder na may mga kontrata, pag-deploy, pagsubok, at mga file ng configuration.

Ito ang matalinong kontrata data mula sa file `metacoin.sol`na:

```solidity title="metacoin.sol"
// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
```

:::note

Pansinin na ini-import lang ang ConvertLib pagkatapos ng `pragma` na pahayag. Sa proyektong ito, mayroon talagang dalawang matalinong kontrata na ide-deploy sa dulo: ang isa ay Metacoin, na naglalaman ng lahat ng lohika ng pagpapadala at balanse; ang isa pa ay ConvertLib, isang library na ginagamit para mag-convert ng mga value.

:::

### Pag-test sa Kontrata {#testing-the-contract}

Maaari kang magpatakbo ng mga pagsubok ng Solidity at Javascript

1. Sa isang terminal, patakbuhin ang Solidity test:

  ```bash
  truffle test ./test/TestMetaCoin.sol
  ```

Dapat mong makita ang sumusunod na output:

![img](/img/truffle/test1.png)

2. Patakbuhin ang pagsubok sa JavaScript:

  ```bash
  truffle test ./test/metacoin.js
  ```

Dapat mong makita ang sumusunod na output:

![img](/img/truffle/test2.png)

### Pagtipon ng kontrata {#compiling-the-contract}

I-compile ang smart contract gamit ang sumusunod na command:

```bash
truffle compile
```

Makikita mo ang sumusunod na output:

![img](/img/truffle/compile.png)

### Pag-configure ng smart na kontrata {#configuring-the-smart-contract}

Bago aktwal na i-depoly ang kontrata, kailangan mong i-set up ang `truffle-config.js`file, pagpasok ng data ng network at mga compiler.

Pumunta sa `truffle-config.js`at i-update ang file gamit ang mga detalye ng network ng Polygon Mumbai.

```js title="truffle-config.js"
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
        version: "0.8.13",
    }
  }
}
```

Tandaan na nangangailangan ito ng mnemonic na ipasa para sa `maticProvider`. Ito ang binhi na parirala (o pribadong key) para sa account na gusto mong i-deploy mula sa Gumawa ng bagong `.secret`file sa root directory at ilagay ang iyong 12-salitang mnemonic seed na parirala upang makapagsimula. Para makuha ang mga binhi na salita mula sa MetaMask wallet, maaari kang pumunta sa mga setting ng MetaMask, pagkatapos ay mula sa menu, piliin ang **Security at Privacy** kung saan makikita mo ang isang pindutan na nagsasabing maghahayag ng **mga binhing salita**.

### Pag-deploy sa Polygon Network {#deploying-on-polygon-network}

Idagdag ang MATIC sa iyong wallet gamit ang [Polygon Faucet](https://faucet.polygon.technology/). Susunod, patakbuhin ang command na ito sa root folder ng direktoryo ng proyekto:

```
truffle compile
truffle deploy --network matic
```

![img](/img/truffle/deployed-contract.png)

:::note

Tandaan ang iyong `address`, `transaction_hash`at iba ang iba pang detalye na ibinigay Ang nasa itaas ay para lamang magbigay ng ideya ng istraktura.

:::

**Binabati kita!  Matagumpay mong na-deploy ang isang Smart Contract gamit ang Truffle.** Ngayon ay puwede kang makipag-ugnayan sa kontrata at suriin din ang status ng deployment nito sa [Polygonscan](https://mumbai.polygonscan.com/).
