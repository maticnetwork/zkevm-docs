---
id: getting-started
title: Начало работы
sidebar_label: Getting Started
description: Доступные решения для получения данных вне цепочки в Polygon dApps
keywords:
  - wiki
  - polygon
  - data oracles
  - chainlink
  - bandchain
  - api3
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Часто возникает необходимость получить доступ к информации из внешнего мира, которая имеет отношение к контрактному соглашению. Но смарт-контракты не могут получить доступ к данным вне их блокчейн-сети. oracle — это способ взаимодействия **блокчейна или смарт-контракта с внешними данными**.

Блокчейны — это детерминистские улицы с односторонним движением, а оракулы открывают путь между событиями внутри цепочки и вне цепочки. Оракулы представляют собой сервисы, которые могут отправлять и проверять события в реальном мире и пересылать эту информацию в смарт-контракты, активируя изменения состояния в блокчейне.

Входящие оракулы переносят в блокчейн информацию вне цепочки или данные из реального мира, а исходящие оракулы выполняют противоположную задачу: они информируют сущности за пределами блокчейна о событиях, которые происходят внутри блокчейна.

## Blockchain Oracles {#blockchain-oracles}

Чтобы интегрировать ваше децентрализованное приложение с оракулами в Polygon, вы можете использовать одно из следующих решений:

 1. [API3](api3.md)
 2. [Chainlink](chainlink.md)
 3. [BandChain](bandchain.md)
 4. [Razor](razor.md)
 5. [Tellor](tellor.md)
 6. [UMA](optimisticoracle.md)

## Информационные ресурсы {#resources}

1. [В чем заключается проблема с оракулами блокчейна?](https://blog.chain.link/what-is-the-blockchain-oracle-problem/)
1. [Что такое оракул блокчейна](https://cryptobriefing.com/what-is-blockchain-oracle/)
2. [Типы оракулов блокчейна](https://blockchainhub.net/blockchain-oracles/)
3. [Руководство: получение децентрализованных данных о цене](https://docs.chain.link/docs/get-the-latest-price)
4. [Руководство: как интегрировать Razor в Polygon](https://docs.razor.network/tutorial/matic/)
