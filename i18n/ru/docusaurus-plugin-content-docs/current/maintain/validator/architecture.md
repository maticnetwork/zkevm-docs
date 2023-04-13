---
id: architecture
title: Архитектура
description: Слои Ethereum, Heimdall и Bor
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - validator
slug: architecture
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

В целом Сеть Polygon подразделяется на три уровня:

* **Уровень Ethereum** — набор контрактов в Ethereum.
* **Уровень** Heimdall — набор нодов Heimdall, находящихся параллельно с Ethereum, контролируют набор контрактов стейкинга, развернутых в сети Ethereum, и отправляют checkpoint Network в Ethereum. Heimdall основан на Tendermint.
* **Уровень Bor** — набор узлов Bor, производящих блок, которые перемещаются узлами Heimdall. Bor основан на Go Ethereum.

<img src={useBaseUrl("img/staking/architecture.png")} />

## Стейкинг и смарт-контракты Plasma в Ethereum {#staking-and-plasma-smart-contracts-on-ethereum}

Чтобы обеспечить работу механизма [Proof of Stake (PoS)](/docs/home/polygon-basics/what-is-proof-of-stake) в Polygon, система использует набор контрактов управления [стейкингом](/docs/maintain/glossary.md#staking) в Ethereum mainnet.

Контракты на стейкинг имеют следующие функции:

* Возможность добавлять токены MATIC в стейкинг по контракту в Ethereum mainnet и участвовать в системе в качестве [валидатора](/docs/maintain/glossary.md#validator) для любого пользователя.
* Предоставление наград за стейкинг в результате проверки переходов состояний в сети Polygon.
* Сохранение [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) в Ethereum mainnet.

Механизм PoS также позволяет компенсировать проблему недоступности данных для сайдчейнов Polygon.

## Heimdall (уровень валидации) {#heimdall-validation-layer}

Уровень Heimdall позволяет объединять блоки, созданные [Bor](/docs/maintain/glossary.md#bor), в дерево Меркла и периодически публиковать корень Меркла в основной цепочке. Периодическая публикация моментальных снимков сайдчейна Bor называется назначением [чекпоинтов](/docs/maintain/glossary.md#checkpoint-transaction).

Для каждых нескольких блоков на Bor валидатор выполняет следующие действия на уровне Heimdall:

1. Подтверждает все блоки с момента последнего созданного чекпоинта.
2. Создает дерево Меркла из хэшей блоков.
3. Публикует хэш корня Меркла в Ethereum mainnet.

Checkpoint важны по двум причинам:

1. Обеспечивают окончательность в корневой цепочке.
2. Предоставляют подтверждение сжигания при выводе активов.

Обзор процесса:

* Часть активных валидаторов выбирается из пула на роль [блок продюсеров](/docs/maintain/glossary.md#block-producer) для определенного [диапазона блоков](/docs/maintain/glossary.md#span). Эти блок продюсеры отвечают за создание блоков и их передачу в сеть.
* Checkpoint включает в себя хэш корня Меркла для всех блоков, созданных в течение любого заданного интервала времени. Все ноды проверяют хэш корня Меркла и подписывают его.
* [Автор предложения](/docs/maintain/glossary.md#proposer), выбранный из набора валидаторов, отвечает за сбор всех подписей для конкретного checkpoint и его фиксацию в Ethereum mainnet.
* Ответственность за создание блоков и предложение чекпоинтов зависит от доли стейка валидатора в общем пуле.

См. также статью [Архитектура Heimdall](/docs/pos/heimdall/overview).

## Bor (уровень блок-продюсеров) {#bor-block-producer-layer}

Bor — это сайдчейн блок-продюсеров Polygon, который отвечает за объединение транзакций в блоки.

Блок продюсеры Bor являются частью набора валидаторов. Периодически они перемешиваются с валидаторами [Heimdall](/docs/maintain/glossary.md#heimdall).

См. также статью [Архитектура Bor](/docs/pos/bor/overview).
