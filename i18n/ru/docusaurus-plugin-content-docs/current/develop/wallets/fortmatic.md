---
id: fortmatic
title: Fortmatic
description: Используйте Formatic SDK для интеграции вашего dApp с Polygon
keywords:
  - wiki
  - polygon
  - fortmatic
  - integrate
  - dapp
  - sdk
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Fortmatic SDK позволяет легко интегрировать свой dApp с блокчейном Ethereum, независимо от того, есть ли у вас уже встроенный dApp с Web3, или начинаются с нуля. Fortmatic обеспечивает плавный и восхитительный опыт как для вас, так и для ваших пользователей децентрализованного приложения.

## Установка {#installation}

Чтобы установить последнюю версию кошелька Fortmatic, используйте следующую команду:

```bash
$ npm i --save fortmatic@latest
```

## Пример {#example}
Вот пример приложения, использующего Fortmatic:

```js title="example.js"
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

const customNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.matic.today', // your own node url
    chainId: 80001 // chainId of your own node
}

// Setting network to localhost blockchain
const fm = new Fortmatic('YOUR_TEST_API_KEY', customNodeOptions);
window.web3 = new Web3(fm.getProvider());
```
