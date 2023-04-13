---
id: quicknode
title: Развернуть смарт-контракт с помощью QuickNode
sidebar_label: Using QuickNode
description:  Развернуть смарт-контракты на Polygon с помощью Brownie и Quicknode.
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - smart contract
  - brownie
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Обзор {#overview}

Python — один из самых универсальных языков программирования: от исследователей, работающих со своими тестовыми моделями, до разработчиков, использующих его в тяжелых производственных средах, он имеет кейсы в каждом из возможных технических областях.

В этом учебнике вы узнаете, как использовать фреймворк [Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) для записи и развертывания смарт-контракта путем использования нод тестовых сетов [QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) для Polygon.

:::tip

Чтобы связаться с командой Quicknode, напишите им или отметьте их в Twitter [@QuickNode](https://twitter.com/QuickNode).

:::

## Предварительные условия {#prerequisites}

- Установлен Python3
- Узел Polygon
- Редактор
- Интерфейс

## Что вы сделаете {#what-you-will-do}

1. Настроите Brownie
2. Получите доступ к тестовым нодам Quicknode
3. Скомпилируете и развернете смарт-контракт
4. Проверьте данные контракта

## Что такое Brownie? {#what-is-brownie}

Для развертывания смарт-контрактов чаще всего используются библиотеки на базе JavaScript, такие как [web3.js](https://web3js.readthedocs.io/), [ethers.js](https://docs.ethers.io/), [Truffle](https://www.trufflesuite.com/docs/truffle/) и [Hardhat](https://hardhat.org/). Python — это универсальный, высоко используемый язык, а также может использоваться для смарт-контрактов / Web3 разработки; [web3.py](https://web3py.readthedocs.io/en/stable/) — это убедительная библиотека Python, удовлетворяющая потребности Web3. Фреймворк Брауни построен поверх `web3.py`.

[Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) — это инфраструктура на базе Python, предназначенная для разработки и тестирования смарт-контрактов. Brownie поддерживает контракты Solidity и Vyper и даже предоставляет возможности тестирования контрактов через [pytest](https://github.com/pytest-dev/pytest).

Чтобы продемонстрировать процесс написания и развертывания смарт-контракта с помощью Brownie, мы используем проекты шаблонов [Brownie-mixes](https://github.com/brownie-mix). В частности, мы используем шаблон реализации ERC-20 [token mix](https://github.com/brownie-mix/token-mix).

## Установка зависимостей {#install-dependencies}

Brownie построен на вершине python3, поэтому он нам нужно, чтобы он был установлен для работы с Brownie. Давайте проверим, установлен ли в нашей системе python3. Чтобы сделать это, введите в инструменте командной строки следующее:

```bash
python3 -V
```

В результате выведется установленная версия python3. Если python3 не установлен, загрузите и установите его с официального сайта [python](https://www.python.org/downloads/).

Давайте создадим каталог проекта, прежде чем устанавливать Brownie, и сделаем этот каталог проекта нашим текущим рабочим каталогом:

```bash
mkdir brownieDemo
cd brownieDemo
```

После установки python3 мы установим brownie с помощь pip, диспетчера пакетов Python. Pip имеет функцию, аналогичную функции npm для JavaScript. Введите в командной строке следующее:

```bash
pip3 install eth-brownie
```

:::tip

Если установка не работает, вы можете использовать следующую команду:`sudo pip3 install eth-brownie`

:::

Чтобы проверить, правильно ли был установлен Brownie, введите `brownie`в командной строке, и он должен дать следующий вывод:

![img](/img/quicknode/brownie-commands.png)

Чтобы получить токен mix, просто введите в командной строке следующее:

```
brownie bake token
```

Это создаст новый каталог `token/`в нашем `brownieDemo`каталоге.

### Файловая структура {#file-structure}

Прежде всего, перейдите в `token`директор:

```bash
cd token
```

Теперь откройте `token`каталог в вашем текстовом редакторе. В `contracts/`папке вы найдете , `Token.sol`который является нашим основным контрактом. Вы можете написать собственные контракты или изменить `Token.sol`файл.

В `scripts/`папке вы найдете скрипт `token.py`Python. Этот скрипт будет использоваться для развертывания контракта, а модификации необходимы на основе контрактов.

![img](/img/quicknode/token-sol.png)

Контракт является контрактом ERC-20. Информацию о стандартах ERC-20 и контрактах можно получить в этом [руководстве на](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token) токенах ERC-20.

## Запуск вашего узла Polygon {#booting-your-polygon-node}

QuickNode имеет глобальную сеть из нодов and Polygon Mainnet и Mumbai. Они также запускают [бесплатный публичный Polygon](https://docs.polygon.technology/docs/develop/network-details/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro) RPC, но если вы получаете ограниченный тариф, вы можете зарегистрироваться на бесплатный [пробный узел из QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide).

![img](/img/quicknode/http_URL.png)

Скопируйте **URL-адрес HTTP**, который будет полезен позже в учебнике.

## Настройка сети и аккаунта {#network-and-account-setup}

Нам потребуется настроить конечную точку QuickNode с Brownie. Чтобы сделать это, введите в командной строке следующее:

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

`YOUR_QUICKNODE_URL`Заменить **URL-адрес HTTP Mumbai** Testnet, который мы только что получили при загрузке нашего узла Polygon.

В приведенной выше команде `Ethereum` — это имя среды, а `matic_mumbai` — специальное имя сети; вы можете присвоить своей пользовательской сети любое имя.

Следующая, что нам нужно сделать, это создать новый кошелек, используя Brownie, для этого введите следующее в вашей командной строке:

```
brownie accounts generate testac
```

Вам будет предложено установить пароль для вашего аккаунта! После завершения шагов это будет генерировать аккаунт вместе с mnemonic фразой, сохранить ее в автономном режиме. Название `testac`для нашего аккаунта (вы можете выбрать любое имя, которое вам нравится).

![img](/img/quicknode/new-account.png)

:::note

Фразы Mnemonic могут использоваться для восстановления аккаунта или импорта аккаунта на другие [<ins>кошельки, не связанные</ins>](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode) с хранением. Аккаунт, который вы видите на иллюстрации выше, был только что создан специально для этого руководства.

:::

Скопируйте адрес аккаунта, чтобы мы могли получить некоторые тестовые MATIC, которые должны будут развернуть наш контракт.

## Получение Testnet MATIC {#getting-testnet-matic}

Нам понадобится несколько тестовых токенов MATIC для оплаты гонораров за газ для развертывания нашего смарт-контракта.

Скопируйте адрес вашего [аккаунта](https://faucet.polygon.technology/), который мы создали в этом руководстве, вставьте его в поле адреса смесителя Polygon, и нажмите на **кнопку Отправить**. Faucet отправит вам 0,2 тестовых MATIC.

![img](/img/quicknode/faucet.png)

## Развертывание смарт-контракта {#deploying-your-smart-contract}

Прежде чем приступить к развертыванию контракта, необходимо составить его с использованием:

```
brownie compile
```

![img](/img/quicknode/brownie-compile.png)

Теперь откройте в текстовом редакторе и `scripts/token.py`внесите следующие изменения:

```python
#!/usr/bin/python3
from brownie import Token, accounts

def main():
    acct = accounts.load('testac')
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

:::info Объяснение

Используя вышеуказанный код, мы импортировали `testac`аккаунт, который мы создали ранее, и хранили его в `acct`переменной. Также, в следующей строке, мы отредактировали `'from':`часть для получения данных из `acct`переменной.

:::

Наконец, мы развернуть наш смарт-контракт:

```
brownie run token.py --network matic_mumbai
```

`matic_mumbai`это название пользовательской сети, которую мы создали ранее. В предложении вам будет предложено **пароль,** который мы установили ранее, когда создаем аккаунт.

После запуска вышеуказанной команды вам потребуется получить хэш транзакции, и Brownie подождет подтверждения транзакции. После подтверждения транзакции она вернет адрес развертывания нашего контракта в тестовой сети Polygon Mumbai.

![img](/img/quicknode/brownie-run.png)

Вы сможете проверить развернутый контракт, скопировав и вставив адрес контракта в [Polygonscan Mumbai](https://mumbai.polygonscan.com/).

![img](/img/quicknode/polygonscan.png)

## Тестирование контракта {#testing-the-contract}

Brownie также предлагает возможности тестирования функций смарт-контрактов. В нем используется инфраструктура `pytest` для удобного генерирования тестов. Дополнительную информацию о написании тестов на Brownie [можно найти в документации](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#).

**Вот так развертываются контракты в Polygon с помощью Brownie и QuickNode.**

QuickNode, как и Polygon, всегда имел подход, основанный на первом образовании, который предоставляет [guides](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [документы](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [видео-учебник](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos) и [сообщество разработчиков](https://discord.gg/DkdgEqE) Web3, которые хотят помочь друг другу.
