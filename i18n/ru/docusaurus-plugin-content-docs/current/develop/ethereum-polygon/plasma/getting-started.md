---
id: getting-started
title: Мост Plasma
sidebar_label: Introduction
description: Взаимодействие с мостом Plasma и сетью Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Чтобы приступить к работе, ознакомьтесь с новейшей [документацией по Matic.js на Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/).

Мост фактически представляет собой набор контрактов, помогающих перемещать активы из корневой цепочки в дочернюю цепочку. Существует два основных моста для перемещения активов между Ethereum и Polygon. Первый из них — мост Plasma, а второй — **мост PoS** или мост **доказательства доли владения (Proof of Stake)**. **Плазменный мост** обеспечивает повышенные гарантии безопасности благодаря механизму выхода Plasma.

Однако существуют определенные ограничения дочернего токена, а период вывода занимает 7 дней в связи с операциями выхода и вывода из Polygon в Ethereum через мост Plasma. [Мост PoS](/docs/develop/ethereum-polygon/pos/getting-started) — более гибкий вариант, позволяющий производить вывод быстрее.

Этот учебник будет выступать в качестве пошагового руководства для понимания и использования Plasma bridge с использованием [Matic JS](https://github.com/maticnetwork/matic.js), который является самым простым способом взаимодействия с Plasma Bridge в сети Polygon.

## Поток активов на мосту Plasma {#assets-flow-in-plasma-bridge}

В этом руководстве мы продемонстрируем поток трансфера активов в Polygon и покажем, как сделать то же самое с помощью Matic.js:

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. Пользователь вносит crypto в контракт Polygon в основной цепочке
2. После подтверждения депозитных токенов в основной цепочке соответствующие токены будут отображаться в цепочке Polygon
   - Теперь пользователь может выполнить трансфер токенов любому получателю с незначительной комиссией. Цепочка Polygon chain имеет более быстрые блоки (приблизительно 1 секунда). Благодаря этому трансфер выполняется практически мгновенно.
3. После того, как пользователь будет готов, он может вывести оставшиеся токены из основной цепочки. Вывод средств инициируется через сайдчейн Plasma. Задается интервал checkpoint в 5 минут, когда все блоки на уровне блоков Polygon проверяются по отношению к последнему checkpoint.
4. После того, как checkpoint будет отправлен в контракт Ethereum, токен Exit NFT (ERC721) создается из эквивалентного значения.
5. Вызванные средства могут быть возвращены на ваш счет Ethereum из контракта основной цепочки с помощью процедуры вывода процесса.
   - Также пользователь может получить быстрый выход через 0x или Dharma (уже скоро!)

### Предварительные условия: {#prerequisites}

```
npm i @maticnetwork/maticjs-plasma

import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

### Görli Faucet {#görli-faucet}

Для выполнения любых транзакций вам потребуется немного эфира на тестовых аккаунтах, которые вы будете использовать, следуя указаниям руководства. Если у вас нет ETH на Görli, вы можете использовать ссылки на кран приведенные здесь — https://goerli-faucet.slock.it/.

### Polygon Faucet {#polygon-faucet}

В этом руководстве мы будем использовать в качестве примера токен ERC20 `TEST` в сети Görli. Это ТЕСТОВЫЙ ТОКЕН. В своем децентрализованном приложении вы можете заменить его любым токеном ERC20. Чтобы получить тестовые `TEST` токены в сети Polygon, вы можете использовать [Polygon Faucet](https://faucet.polygon.technology/).

:::note

Чтобы использовать собственные токены для депозитов и вывода, вам придется получить токен 'mapped', а это по сути означает, что контракты на основной цепочке и sidechain 'осведомлены' вашего пользовательского токена.

:::

### Базовая настройка для кошелька Metamask (опционально) {#basic-setup-for-the-metamask-wallet-optional}

1. [Создайте кошелек](/docs/develop/metamask/hello): Если вы новичок в кошельках, то настройте учетную запись MetaMask.
2. [Настройка тестовой сети](/docs/develop/metamask/config-polygon-on-metamask) Polygon: Чтобы легко визуализировать поток средств на Polygon, он поучителен, если настроить тестовую сеть Polygon на Metamask. Обратите внимание, что здесь мы используем Metamask исключительно для целей визуализации. Использовать Metamask для работы с Polygon необязательно.
3. [Создайте несколько аккаунтов](/docs/develop/metamask/multiple-accounts): Прежде чем начинать выполнение руководства, создайте 3 тестовых аккаунта Ethereum.
4. [Настройте токен в Polygon](/docs/develop/metamask/custom-tokens): Чтобы легко посмотреть поток средств в Polygon с помощью Matic.js, вы можете настроить токены в Metamask.
Токен, взятый в качестве примера для этого учебника, может быть настроен в `TEST`MetaMask, чтобы легко визуализировать балансы аккаунта. Вновь обратите внимание, что это **необязательно**. Вы можете очень легко запросить баланс токенов и другие переменные с помощью [web3.js](https://web3js.readthedocs.io/en/1.0/)
