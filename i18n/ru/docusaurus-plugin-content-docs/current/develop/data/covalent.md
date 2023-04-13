---
id: covalent
title: Использование Covalent
sidebar_label: Covalent
description: Узнайте, как использовать единый API Covalent для работы с данными
keywords:
  - docs
  - matic
  - polygon
  - covalent
  - data
  - analytics
  - index
  - indexing
  - query
image: https://matic.network/banners/matic-network-16x9.png
---

## Введение {#introduction}

Polygon обеспечивает огромный масштаб для Ethereum с помощью адаптированной версии Plasma
с сайдчейнами на основе PoS, что обеспечивает решение для более быстрых и чрезвычайно
малозатратных транзакций с окончательностью в основной цепочке. Сеть Polygon обеспечивает
динамичность с помощью PoS checkpoints, которые продвигаются в Ethereum mainchain.
Это позволяет одному сайдчейну Polygon теоретически достичь `2^16` транзакций
на блок и, возможно, миллионов транзакций на множественных цепочках в будущем.

### Краткая справка {#quick-facts}

<TableWrap>

| Свойство | Значение |
|---|---|
| Идентификатор цепочки Polygon Mainnet | `137` |
| Идентификатор цепочки тестовой сети Polygon Mumbai | `80001` |
| Обозреватель блокчейна Polygon | https://polygonscan.com/ |
| Время блока | ~3 секунды |
| Задержка обновления данных | ~6 секунд или 2 блока |

</TableWrap>

:::tip Краткое руководство

Посмотрите **[<ins>это ознакомительное видео</ins>](https://www.youtube.com/watch?v=qhibXxKANWE)**,
чтобы начать работу.

:::

## Поддерживаемые конечные точки {#supported-endpoints}

В Matic mainnet и тестовой сети Mumbai поддерживаются все конечные точки [__класса A__](https://www.covalenthq.com/docs/api/#tag--Class-A). Вы можете запрашивать любую из этих сетей через единый API, изменяя `chainId`.

:::info Конечные точки

Полный список всех заявок, которые вы можете направлять в сети Polygon с помощью Covalent,
приводится в [<ins>документации по Covalent API</ins>](https://www.covalenthq.com/docs/api/).

:::

---

## Приложение {#appendix}

### Токен Matic Gas {#matic-gas-token}

Для взаимодействия с сетью Matic требуются токены Matic для оплаты комиссии за газ. Отклики Covalent
автоматически возвращают значения полей `gas_*` в единицах MATIC.

### Сопоставление токенов {#token-mapping}

Covalent поддерживает ончейн-сопоставление в реальном времени адресов токенов между Ethereum mainnet и цепочкой Matic. Эти адреса используются для обратного просмотра цен на Matic, а также для возврата надлежащих URL логотипов токенов.

Примеры сопоставленных токенов:

| Токен | Ethereum mainnet | Matic mainnet |
|---|---|---|
| USDT | 0xdac17f958d2ee523a2206206994597c13d831ec7 | 0xc2132d05d31c914a87c6611c10748aeb04b58e8f |
| Uniswap UNI | 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 | 0xb33eaad8d922b1083446dc23f610c2567fb5180f |

### Цены токенов {#token-prices}

Covalent может возвращать сопоставленные цены на те токены, которые сопоставлены с Ethereum mainnet.
