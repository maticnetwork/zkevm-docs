---
id: polygon-architecture
title: Архитектура Polygon
description: Архитектура Polygon
keywords:
  - architecture
  - layers
  - polygon
  - matic
  - docs
  - research
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Архитектура Polygon {#the-architecture-of-polygon}

**Polygon** — это платформа блокчейн-приложения, которая обеспечивает гибридный сайдчейны с поддержкой Proof-of-Stake и Plasma.

С точки зрения архитектуры привлекательность Polygon заключается в элегантном дизайне, который включает общий уровень валидаторов, отделенный от различных сред исполнения, таких как цепочки, поддерживающие Plasma и полномасштабные сайдчейны EVM. А в будущем будут внедряться другие подходы второго уровня, такие как развертывание с использованием оптимистичных свертков.

Polygon PoS имеет трехуровневую архитектуру:

* **Уровень Ethereum** — набор контрактов в Ethereum.
* **Уровень Heimdall** — набор нодов Heimdall, находящихся параллельно сети Ethereum, контролируют набор контрактов стейкинга, развернутых в сети Ethereum, и отправляют checkpoint Network в Ethereum. Heimdall основан на Tendermint.
* **Уровень Bor** — набор узлов Bor, производящих блок, которые перемещаются узлами Heimdall. Bor основан на Go Ethereum.

<img src={useBaseUrl("img/staking/architecture.png")} />

В настоящее время разработчики могут использовать **Plasma** для определенных переходов состояний, для которых были написаны предикаты Plasma,
например ERC20, ERC721, свопы активов или другие пользовательские предикаты. Для произвольных переходов состояний
можно использовать PoS. Или и то, и другое! Это возможно благодаря гибридной структуре Polygon.

Для поддержки работы механизма PoS на нашей платформе мы используем набор контрактов по управлению **стейкингом** на
Ethereum, а также набор стимулируемых валидаторов, поддерживающих ноды **Heimdall** и **Bor**. Ethereum —
это первая базовая цепочка, которую поддерживает Polygon. Однако в дальнейшем сеть планирует интегрировать поддержку дополнительных базовых цепочек,
чтобы обеспечить интероперабильную децентрализованную блокчейн-платформу второго уровня, основываясь на предложениях сообщества и консенсусе.

<img src={useBaseUrl("img/matic/Architecture.png")} />

## Контракты на стейкинг {#staking-contracts}

Чтобы обеспечить работу механизма [Proof of Stake (PoS)](docs/home/polygon-basics/what-is-proof-of-stake) в Polygon,
система использует набор контрактов управления [стейкингом](/docs/maintain/glossary#staking) в Ethereum mainnet.

Контракты на стейкинг имеют следующие характеристики:

* Добавлять токены MATIC в стейкинг по контракту в Ethereum mainnet и участвовать в системе в качестве [валидатора](/docs/maintain/glossary#validator) может любой пользователь.
* Предоставление наград за стейкинг в результате проверки переходов состояний в сети Polygon.
* Сохранение [checkpoint](/docs/maintain/glossary#checkpoint-transaction) в Ethereum mainnet.

Механизм PoS также позволяет компенсировать проблему недоступности данных для сайдчейнов Polygon.

## Heimdall {#heimdall}

Heimdall — это уровень проверки Proof-of-Stake, который позволяет объединять блоки, созданные
на уровне [Bor](/docs/maintain/glossary#bor), в дерево Меркла и периодически публиковать корень Меркла в
корневую цепочку. Периодическая публикация моментальных снимков сайдчейна Bor называется назначением [checkpoint](/docs/maintain/glossary#checkpoint-transaction).

1. Подтверждает все блоки с момента последнего созданного checkpoint.
2. Создает дерево Меркла из хэшей блоков.
3. Публикует хэш корня Меркла в Ethereum mainnet.

Checkpoint важны по двум причинам:

1. Обеспечивают окончательность в корневой цепочке.
2. Предоставляют подтверждение сжигания при выводе активов.

Обзор процесса:

* Часть активных валидаторов выбирается из пула на роль [блок продюсеров](/docs/maintain/glossary#block-producer) для определенного [диапазона блоков](/docs/maintain/glossary#span). Эти блок продюсеры отвечают за создание блоков и их передачу в сеть.
* Checkpoint включает в себя хэш корня Меркла для всех блоков, созданных в течение любого заданного интервала времени. Все ноды проверяют хэш корня Меркла и подписывают его.
* [Автор предложения](/docs/maintain/glossary#proposer), выбранный из набора валидаторов, отвечает за сбор всех подписей для конкретного checkpoint и его фиксацию в Ethereum mainnet.
* Ответственность за создание блоков и предложение checkpoint зависит от доли стейка валидатора в общем пуле.

Более подробную информацию о Heimdall можно найти в руководстве по [архитектуре Heimdall](/docs/pos/heimdall/overview).

## Bor {#bor}

Bor — это слой продюсера блока sidechain Polygon — субъекта, отвечающего за объединение транзакций в блоки. В настоящее время это базовая реализация Geth с пользовательскими изменениями, внесенными в алгоритм консенсуса.

Производители блоков являются a валидаторов, и периодически перетасовываются через выбор комитета на [Heimdall](/docs/maintain/glossary#heimdall) в durations, названный как `span` в Polygon. Блоки производятся в ноде **Bor**, и VM сайдчейна совместима с EVM.
Блоки, произведенные в Bor, также периодически подтверждаются нодами Heimdall, и checkpoint, который представляет собой
хэш древа Меркла с набором блоков, созданных в Bor, периодически публикуется в Ethereum.

Более подробную информацию можно найти в руководстве по [архитектуре Bor](/docs/pos/bor/overview).

## Информационные ресурсы {#resources}

* [Архитектура Bor](https://wiki.polygon.technology/docs/pos/bor)
* [Архитектура Heimdall](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
* [Механизм checkpoint](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)