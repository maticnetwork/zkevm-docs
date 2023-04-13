---
id: the-graph
title: Настройка проекта с помощью Graph и Polygon PoS
sidebar_label: The Graph
description: Узнайте, как настроить размещенный проект с помощью Graph и Polygon.
keywords:
  - polygon
  - matic
  - graph
  - the graph
  - index
  - query
  - subgraph
image: https://matic.network/banners/matic-network-16x9.png
slug: graph
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Graph — это децентрализованный протокол для индексации и запрашивания цепочек данных, который поддерживает цепочку Matic. Данные, определенные посредством подграфов, легко запрашивать и анализировать. Подграфы можно создавать локально, либо можно использовать размещенный в Интернете бесплатный обозреватель для индексации и отображения данных.

> Примечание: дополнительную информацию, инструкции по локальной установке и тому подобное см. на сайте https://thegraph.com/docs/quick-start. Документация включает пример для изучения принципов работы подграфов, а это видео дает общее представление.

## Шаги {#steps}

1. Перейдите в обозреватель Graph (https://thegraph.com/explorer/) и создайте аккаунт. Вам потребуется аккаунт GitHub для аутентификации.

2. Перейдите на дашборд и нажмите «Add Subgraph» (Добавить подграф). Задайте для подграфа значения полей «Name» (Имя), «Account» (Аккаунт) и «Subtitle» (Подзаголовок), а также в случае надобности обновите изображение и другую информацию (вы можете обновить их позже).

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%"/>


3. Установите Graph CLI на свою машину (используя либо npm, либо yarn)

```bash
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. Следующая команда создает подграф, который индексирует все события существующего контракта. Он пытается вызвать ABI контракта из BlockScout и возвращается в случае сбоя к запрашиванию пути к локальному файлу. В случае отсутствия любого из необязательных аргументов вам предлагается заполнить интерактивную форму.

```bash
graph init \
  --from-contract <CONTRACT_ADDRESS> \
  [--network Matic ] \
  [--abi <FILE>] \
  <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]

--network: choose “Matic” for Matic mainnet and “Mumbai” for Matic Testnet.
--from-contract <CONTRACT_ADDRESS> is the address of your existing contract which you have deployed on the Matic network: Testnet or Mainnet.
--abi <FILE> is a local path to a contract ABI file (optional, If verified in BlockScout, the graph will grab the ABI, otherwise you will need to manually add the ABI. You can save the abi from BlockScout or by running truffle compile or solc on a public project.)
The <GITHUB_USER> is your github user or organization name, <SUBGRAPH_NAME> is the name for your subgraph, and <DIRECTORY> is the optional name of the directory where graph init will put the example subgraph manifest.
```

> Примечание: более подробная информация приводится здесь: https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. Аутентификация с помощью сервиса, размещенного на сервере

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
Вы можете найти токен доступа, перейдя на дашборд на сайте The Graph.

6. Перейдите в созданный каталог (с помощью команды cd) и начните определять подграф. Информация о создании подграфа содержится в Graph Docs здесь. https://thegraph.com/docs/define-a-subgraph

7. Когда будете готовы, разверните свой подграф. Вы всегда можете тестировать его и повторно развернуть в случае необходимости.

> Если развернутый вами ранее подграф все еще находится в состоянии «Syncing» (Синхронизация), он будет немедленно заменен вновь развернутой версией. Если развернутый вами ранее подграф уже полностью синхронизирован, нод Graph отметит вновь развернутую версию как готовящуюся версию, синхронизирует ее в фоновом режиме и заменит текущую развернутую версию новой версией только после завершения синхронизации последней. Это обеспечивает наличие подграфа, с которым вы можете работать, пока идет процесс синхронизации новой версии.

```bash
yarn deploy
```

Ваш подграф будет развернут и доступен из дашборда.

Вы можете узнать о запрашивании информации из подграфа здесь: https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

Если вы хотите сделать свой подграф общедоступным, вы можете сделать это, открыв подграф из дашборда и нажав кнопку редактирования. Вы увидите ползунок в нижней части страницы редактирования.
