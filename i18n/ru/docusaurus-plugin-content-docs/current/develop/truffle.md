---
id: truffle
title: Развернуть смарт-контракт с помощью Truffle
sidebar_label: Using Truffle
description:  Используйте Truffle для развертывания смарт-контракта в Polygon
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

## Обзор {#overview}

[Truffle](https://trufflesuite.com/) — это среда разработки блокчейна, которую можно использовать для создания и тестирования смарт-контрактов путем использования виртуальной машины Ethereum. Этот руководство призван научить создавать смарт-контракт с помощью Truffle и развертывать его в совместимой с EVM Polygon Network.

:::note

Этот учебник представляет собой адаптированную версию [<ins>руководства Truffle</ins>](https://www.trufflesuite.com/docs/truffle/quickstart) quickstart.

:::

## Что вы сделаете {#what-you-will-do}

- Установите и настроите Truffle
- Контракт в Polygon Network
- Проверьте статус развертывания на Polygonscan

## Предварительные условия {#prerequisites}

Прежде чем мы начнем, нужно проверить несколько технических требований. Пожалуйста, установите следующее:

- [Node.js v8+ LTS и npm](https://nodejs.org/en/) (упакованы с Node)
- [Git](https://git-scm.com/)

После их установки нам потребуется только одна команда для установки Truffle:

```
npm install -g truffle
```

Чтобы убедиться в том, что Truffle установлен правильно, введите `truffle version`на терминале. Если вы видите ошибку, убедитесь, что модули npm добавлены в ваш путь.

## Создание проекта {#creating-a-project}

### Проект MetaCoin {#metacoin-project}

Мы используем один из шаблонов Truffle, которые можно найти на их странице [Truffle Boxes](https://trufflesuite.com/boxes/). [Бокс MetaCoin](https://trufflesuite.com/boxes/metacoin/) создает токен, который можно перемещать между аккаунтами.

1. Для начала создадим новый каталог для этого проекта Truffle:

  ```bash
  mkdir MetaCoin
  cd MetaCoin
  ```

2. Загрузите бокс MetaCoin:

  ```bash
  truffle unbox metacoin
  ```

С этого последнего шага вы создали папки проекта Truffle, объединяющие с файлами контрактов, развертывания, тестирования и конфигурации.

Это данные смарт-контракта из файла `metacoin.sol`:

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

Обратите внимание, что ConvertLib импортируется сразу после выражения `pragma`. В этом проекте имеется два смарт-контракта, которые будут развернуты в конце: один из них — это Metacoin, содержащий всю логику отправки и баланса; другой — ConvertLib, библиотека, используемая для конвертации значений.

:::

### Тестирование контракта {#testing-the-contract}

Вы можете запустить тесты Solidity и Javascript.

1. Запустите тест Solidity в терминале:

  ```bash
  truffle test ./test/TestMetaCoin.sol
  ```

Вы должны увидеть следующий вывод:

![img](/img/truffle/test1.png)

2. Запустите тест JavaScript:

  ```bash
  truffle test ./test/metacoin.js
  ```

Вы должны увидеть следующий вывод:

![img](/img/truffle/test2.png)

### Компиляция контракта {#compiling-the-contract}

Сформировать смарт-контракт с помощью следующей команды:

```bash
truffle compile
```

Вы увидите следующий вывод:

![img](/img/truffle/compile.png)

### Настройка смарт-контракта {#configuring-the-smart-contract}

Прежде чем фактически развертывать контракт, вам необходимо будет настроить файл `truffle-config.js`, вставив данные сети и компиляторов.

Перейдите в файл `truffle-config.js`и обновите данные сети Polygon Mumbai.

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

Обратите внимание, что он требует передать mnemonic для `maticProvider`. Это выражение seed приватный ключ) для аккаунта, с которого вы хотели бы развернуть Создайте новый файл `.secret` в каталоге root и введите мнемоническую фразу из 12 слов для начала работы. Чтобы получить слова из кошелька MetaMask, можно перейти в настройки MetaMask, затем в меню выберите **Security и** Privacy, где вы увидите кнопку, которая говорит **о** выводе слова семян.

### Развертывание в Polygon {#deploying-on-polygon-network}

Добавьте MATIC в свой кошелек, используя [Polygon Faucet](https://faucet.polygon.technology/). Затем запустите эту команду в корневой папке каталога проекта:

```
truffle compile
truffle deploy --network matic
```

![img](/img/truffle/deployed-contract.png)

:::note

`address`Помните, что ваши , `transaction_hash`и другие предоставленные данные будут отличаться. Вышеуказанные данные призваны просто дать представление о структуре.

:::

**Поздравляем!  Вы успешно развернули смарт-контракт с помощью Truffle.** Теперь вы можете взаимодействовать с контрактом, а также проверить его статус развертывания в [Polygonscan](https://mumbai.polygonscan.com/).
