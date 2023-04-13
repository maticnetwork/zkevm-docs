---
id: torus
title: Torus
description: Torus — это система управления ключами, не зависящими от хранения для dApps
keywords:
  - wiki
  - polygon
  - torus
  - wallet
  - guide
  - dApp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Torus — это удобная, безопасная и не связанная с хранением система управления ключами для децентрализованных приложений. Наша цель — дать массовым пользователям шлюз для работы с децентрализованной экосистемой.

**Тип**: Non-custodial/HD<br/> **Хранение приватных ключей**: локальное хранилище браузера/шифрование и сохранение на серверах Torus<br/> **Взаимодействие с журналом Ethereum**: Infura <br/>
**encoding: приватного ключа**: Mnemonic / Social-Auth-login<br/>

В зависимости от ваших потребностей приложения Torus может быть интегрирован через кошелек Torus или напрямую взаимодействовать с сетью Torus через CustomAuth. Для получения дополнительной информации посетите [документацию Torus](https://docs.tor.us/).

## Интеграция кошелька Torus {#torus-wallet-integration}

Если ваше приложение уже совместимо с MetaMask или любыми другими провайдерами Web3, интеграция кошелька Torus даст вам обернуть тот же интерфейс Web3. Можно установить через пакет npm. Чтобы получить дополнительные способы и подробную информацию, пожалуйста, посетите официальную документацию Torus по [интеграции кошелька](https://docs.tor.us/wallet/get-started).

### Установка {#installation}

```bash
npm i --save @toruslabs/torus-embed
```

### Пример {#example}

```js title="torus-example.js"
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

const torus = new Torus({
  buttonPosition: "top-left" // default: bottom-left
});

await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mumbai", // default: mainnet
    chainId: 80001, // default: 1
    networkName: "Mumbai Test Network" // default: Main Ethereum Network
  },
  showTorusButton: false // default: true
});

await torus.login(); // await torus.ethereum.enable()
const web3 = new Web3(torus.provider);
```

## Интеграция CustomAuth {#customauth-integration}

Если вы хотите контролировать свой собственный UX, от входа до каждого взаимодействия, вы можете использовать CustomAuth. Вы можете интегрировать через один из их SDK в зависимости от platform(s) на которой вы создаете. Для получения дополнительной информации посетите [интеграцию Torus CustomAuth](https://docs.tor.us/customauth/get-started).
