---
id: validator-index
title: Страница-указатель для валидаторов
description: Коллекция инструкций по тому, как запустить и управлять узлами валидатора в Polygon Network
keywords:
  - docs
  - polygon
  - validate
  - validator
  - maintain
  - architecture
  - Validator Index
slug: validator-index
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Оставайтесь в курсе

Следите за последними обновлениями нода и валидатора от команды Polygon и сообщества, подписавшись на [уведомления Polygon](https://polygon.technology/notifications/).

:::

Валидаторы являются ключевыми участниками в поддержании функционирования сети Polygon. Они запускают полный нод и обеспечивают безопасность
сети, размещая токены MATIC в стейкинге для создания блоков, осуществляют валидацию и участвуют в консенсусе PoS.

:::info

Количество мест для приема новых валидаторов ограничено. Новые валидаторы могут присоединиться к набору активных валидаторов только после отвязки действующего активного валидатора.

В этом случае запускается новый аукционный процесс для замены такого валидатора.

:::

## Обзор {#overview}

Polygon состоит из трех следующих уровней:

* Уровень Ethereum — набор контрактов в Ethereum mainnet.
* Уровень Heimdall — это набор нодов Heimdall на базе Proof of Stake (доказательство доли владения), которые работают параллельно с Ethereum mainnet, отслеживают набор контрактов на стейкинг в Ethereum mainnet и фиксируют чекпоинты сети Polygon в Ethereum mainnet. Heimdall основан на Tendermint.
* Уровень Bor — это набор нодов Bor, производящих блоки, которые перемешиваются с нодами Heimdall. Bor основан на Go Ethereum.

Чтобы стать валидатором в сети Polygon необходимо сделать следующее:

* Запустить сентри-нод, отдельный компьютер, на котором запущены ноды Heimdall и Bor. Сентри-нод открыт для всех нодов в сети Polygon.
* Запустить узел проверки, отдельный компьютер, на котором запущены ноды Heimdall и Bor. Узел проверки открыт только для своего сентри-нода и закрыт для остальной сети.
* Разместить токены MATIC в контрактах на стейкинг, развернутых в Ethereum mainnet.

## Компоненты {#components}

### Heimdall {#heimdall}

Heimdall осуществляет следующее:

* Следит за контрактами на стейкинг в Ethereum mainnet.
* Проверяет все переходы состояний в цепочке Bor.
* Фиксирует чекпоинты состояния цепочки Bor в Ethereum mainnet.

Heimdall основан на Tendermint.

:::info См. также

* Репозиторий GitHub: [Heimdall](https://github.com/maticnetwork/heimdall)
* Репозиторий GitHub: [контракты на стейкинг](https://github.com/maticnetwork/contracts/tree/master/contracts/staking)
* Публикация в блоге: [Heimdall и Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

### Bor {#bor}

Bor осуществляет следующее:

* Производит блоки в сети Polygon.

Bor — это нод блок-продюсера и уровень для сети Polygon. Он основан на Go Ethereum. Блоки, которые производятся на уровне Bor, проверяются нодами Heimdall.

:::info См. также

* Репозиторий GitHub: [Bor](https://github.com/maticnetwork/bor)
* Публикация в блоге: [Heimdall и Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

Этот раздел поможет вам изучить следующие темы:

* [Обязанности валидатора](validator-responsibilities.md)
* Присоединение к сети в качестве валидатора:
  * [Запуск и работа с нодами при помощи Ansible](run-validator-ansible.md)
  * [Запуск и работа с нодами при помощи двоичных файлов](run-validator-binaries.md)
  * [Участие в стейкинге в качестве валидатора](validator-staking-operations.md)
* Операции с узлами проверки:
  * [Изменение адреса подписанта](change-signer-address.md)
  * [Изменение комиссии](validator-commission-operations.md)

Помощь сообщества:

* [Discord](https://discord.com/invite/0xPolygon)
* [Форум](https://forum.polygon.technology/)
