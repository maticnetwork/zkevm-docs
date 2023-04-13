---
id: run-validator-binaries
title: Запустить узел валидатора из Binaries
sidebar_label: Using Binaries
description: Используйте бинарные файлы для настройки вердикта
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
slug: run-validator-binaries
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip
Шаги, которые в этом руководстве, предполагают ожидание полной синхронизации сервисов H**eimdall **и **Bor.** В качестве альтернативы вы можете использовать поддерживаемый моментальный снимок, который позволит сократить время синхронизации до нескольких часов.
Подробнее: [<ins>Инструкции по использованию моментальных снимков для Heimdall и Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Ссылки для загрузки снимков см. в [<ins>Polygon Chains Snapshots</ins>](https://snapshot.polygon.technology/).

:::

Это руководство содержит пошаговое описание процесса запуска узла проверки Polygon с помощью двоичных файлов.

Чтобы удовлетворить системные требования, следуйте руководству [системных требований в узле Validator](validator-node-system-requirements.md) Node.

Если вы хотите запустить и запустить узел валидатора через Ansible, см. в разделе [Запустить узел валидатора с](run-validator-ansible.md) Ansible.

:::caution

Количество мест для приема новых валидаторов ограничено. Новые валидаторы могут присоединиться только в том случае, когда уже активный валидатор отключает облигации.

:::

## Предварительные условия {#prerequisites}

* Два компьютера: один — [сентри-нод](/docs/maintain/glossary.md#sentry), другой — [узел проверки](/docs/maintain/glossary.md#validator).
* `build-essential` устанавливается как на компьютере сентри-нода, так и на компьютере узла проверки.

  Установка:

  ```sh
  sudo apt-get install build-essential
  ```

* Go 1.18 устанавливается как на компьютере сентри-нода, так и на компьютере узла проверки.

  Установка:

  ```sh
  wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
  bash go-install.sh
  sudo ln -nfs ~/.go/bin/go /usr/bin/go
  ```

* RabbitMQ устанавливается как на серверных, так и на validator машинах.

Вот команды для установки RabbitMQ:

  ```sh
  sudo apt-get update
  sudo apt install build-essential
  sudo apt install erlang
  wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.8/rabbitmq-server_3.10.8-1_all.deb
  sudo dpkg -i rabbitmq-server_3.10.8-1_all.deb

  ```
:::tip

Проверьте дополнительную информацию о загрузке и установке RabbitMQ [<ins>здесь.</ins>](https://www.rabbitmq.com/download.html)

:::


:::info
Пожалуйста, следуйте [<ins>инструкциям bloXroute</ins>](/maintain/validate/bloxroute.md) для подключения ваших нодов к шлюзам bloXroute.
:::

## Обзор {#overview}

Чтобы запустить узел проверки, выполните следующие действия **в точной последовательности**:

:::caution

Если их выполнять не по порядку, возникнут проблемы с конфигурацией.
Во всех случаях важно устанавливать сентри-нод перед узлом проверки.

:::

1. Подготовьте два компьютера: один — для сентри-нода, другой — для узла проверки.
2. Установите двоичные файлы Heimdall и Bor на компьютер сентри-нода и узла проверки.
3. Установите файлы служб Heimdall и Bor на компьютер сентри-нода и узла проверки.
4. Установите службы Heimdall и Bor на компьютер сентри-нода и узла проверки.
5. Настройте сентри-нод.
6. Запустите сентри-нод.
7. Настройте узел проверки.
8. Задайте ключи владельца и подписанта.
9. Запустите узел проверки.
10. Проверьте работоспособность нодов с помощью сообщества.

## Установка двоичных файлов {#installing-the-binaries}

Установите двоичные файлы на компьютер сентри-нода и узла проверки.

### Установка Heimdall {#installing-heimdall}

[Heimdall](/docs/pos/heimdall/overview) — это уровень верификатора Proof-of-Stake,
который отвечает за назначение чекпоинтов для представления блоков Plasma в Ethereum mainnet.

Последняя версия [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0) содержит несколько улучшений, таких как:
1. Ограничение размера данных в транзакциях синхронизации состояний:
    * **30 КБ** при представлении в **байтах**.
    * **60 КБ** при представлении в виде **строки**.
2. Увеличение **времени задержки** между событиями контрактов разных валидаторов с той целью, чтобы в случае резкого увеличения количества событий, которые могут помешать дальнейшей реализации цепочки, пул памяти не заполнялся очень быстро.

На следующем примере показано, как ограничивается размер данных:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

Клонируйте [репозиторий Heimdall](https://github.com/maticnetwork/heimdall/):

```sh
git clone https://github.com/maticnetwork/heimdall
```

Перейдите к нужной [версии выпуска](https://github.com/maticnetwork/heimdall/releases):

```sh
git checkout RELEASE_TAG
```

где `RELEASE_TAG` — тег версии выпуска, которую вы устанавливаете.

Например:

```sh
git checkout v0.3.0
```

Перейдя к нужной версии выпуска, установите Heimdall:

```sh
make install
source ~/.profile
```

Проверьте установку Heimdall:

```sh
heimdalld version --long
```

:::note

Прежде чем продолжить, Heimdall необходимо установить на компьютер сентри-нода и узла проверки.

:::

### Установка Bor {#installing-bor}

[Bor](/docs/pos/bor) — оператор sidechain, который действует в качестве слоя производства блока, который синхронизируется с Heimdall для выбора продюсеров блоков и верификаторов для каждого [диапазона](/docs/maintain/glossary.md#span) и [спринта](/docs/maintain/glossary.md#sprint).

Клонируйте [репозиторий Bor](https://github.com/maticnetwork/bor):

```sh
git clone https://github.com/maticnetwork/bor
```

Перейдите к нужной [версии выпуска](https://github.com/maticnetwork/bor/releases):

```sh
git checkout RELEASE_TAG
```

где `RELEASE_TAG` — тег версии выпуска, которую вы устанавливаете.

Например:

```sh
git checkout v0.3.3
```

Установите Bor:

```sh
make bor-all
```

Создайте символические ссылки:

```sh
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

Проверьте установку Bor:

```sh
bor version
```

:::note

Прежде чем продолжить, Bor необходимо установить на компьютер сентри-нода и узла проверки.

:::

## Установка файлов нодов {#setting-up-node-files}

:::note

Файлы нодов нужно установить на компьютер сентри-нода и узла проверки.

:::

### Получение репозитория запуска {#fetching-the-launch-repository}

Клонируйте [репозиторий запуска](https://github.com/maticnetwork/launch):

```sh
git clone https://github.com/maticnetwork/launch
```

### Создание каталога запуска {#setting-up-the-launch-directory}

#### На компьютере сентри-нода {#on-the-sentry-machine}

Создайте каталог `node`:

```sh
mkdir -p node
```

Скопируйте файлы и сценарии из каталога `launch` в каталог `node`:

```sh
cp -rf launch/mainnet-v1/sentry/sentry ~/node
cp launch/mainnet-v1/service.sh ~/node
```

#### На компьютере узла проверки {#on-the-validator-machine}

Создайте каталог `node`:

```sh
mkdir -p node
```

Скопируйте файлы и сценарии из каталога `launch` в каталог `node`:

```sh
cp -rf launch/mainnet-v1/sentry/validator ~/node
cp launch/mainnet-v1/service.sh ~/node
```

### Создание сетевых каталогов {#setting-up-the-network-directories}

:::note

Выполните действия, описанные в этом разделе, на компьютере сентри-нода и узла проверки.

:::

#### Установка Heimdall {#setting-up-heimdall}

Измените каталог `node` на следующий:

```sh
cd ~/node/heimdall
```

Запустите сценарий установки:

```sh
bash setup.sh
```

#### Установка Bor {#setting-up-bor}

Измените каталог `node` на следующий:

```sh
cd ~/node/bor
```

Запустите сценарий установки:

```sh
bash setup.sh
```

## Установка служб {#setting-up-the-services}

:::note

Выполните действия, описанные в этом разделе, на компьютере сентри-нода и узла проверки.

:::

Перейдите в каталог `node`:

```sh
cd ~/node
```

Запустите сценарий установки:

```sh
bash service.sh
```

Скопируйте файл служб в системный каталог:

```sh
sudo cp *.service /etc/systemd/system/
```

## Настройка сентри-нода {#configuring-the-sentry-node}

Войдите в удаленный компьютер сентри-нода.

### Настройка служб Heimdall {#configuring-the-heimdall-services}

Откройте файл конфигурации Heimdall для внесения изменений:

```sh
vi ~/.heimdalld/config/config.toml
```

В `config.toml` измените следующие параметры:

* `moniker` — любое имя. Пример: `moniker = "my-sentry-node"`.
* `seeds` — адреса начального нода, состоящие из идентификатора нода, IP-адреса и порта.

  Используйте следующие значения:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — задайте значение `true` для включения функции обмена между одноранговыми узлами. Пример: `pex = true`.
* `private_peer_ids` — это идентификатор нода уровня Heimdall, установленного на компьютере узла проверки.

  Чтобы получить идентификатор нода Heimdall на компьютере узла проверки, сделайте следующее:

  1. Войдите в компьютер узла проверки.
  2. Выполните следующую команду:
     ```sh
     heimdalld tendermint show-node-id
     ```

  Пример: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` — задайте значение `true` для включения метрик Prometheus. Пример: `prometheus = true`.
* `max_open_connections` — задайте значение `100`. Пример: `max_open_connections = 100`.

Сохраните изменения в `config.toml`.

### Настройка службы Bor {#configuring-the-bor-service}

Откройте файл конфигурации Bor для внесения изменений:

```sh
`vi ~/node/bor/start.sh`
```

В `start.sh` укажите адреса загрузочных нодов, состоящие из идентификатора нода, IP-адреса и порта,
добавив следующую строку в конце файла:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

Сохраните изменения в `start.sh`.

### Настройка брандмауэра {#configuring-a-firewall}

На компьютере сентри-нода среде `0.0.0.0/0` должны быть открыты следующие порты:

* `26656` — устанавливает связь между вашим нодом и другими нодами при помощи службы Heimdall.

* `30303` — устанавливает связь между вашим нодом и другими нодами при помощи службы Bor.

* `22` — дает валидатору доступ к SSH из любого места.

## Запуск сентри-нода {#starting-the-sentry-node}

Сначала запустите службу Heimdall. После синхронизации службы Heimdall запустите службу Bor.

:::note

Как отмечалось ранее, для полной синхронизации службы Heimdall с нуля требуется несколько дней.

В качестве альтернативы вы можете использовать поддерживаемый моментальный снимок, который позволит сократить время синхронизации до нескольких часов.
Подробнее: [<ins>Инструкции по использованию моментальных снимков для Heimdall и Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Ссылки на скачивание моментальных снимков доступны на странице [моментальных снимков цепочек Polygon](https://snapshot.polygon.technology/).

:::

### Запуск службы Heimdall {#starting-the-heimdall-service}

Запустите службу Heimdall:

```sh
sudo service heimdalld start
```

Запустите сервер Rest Heimdall:

```sh
sudo service heimdalld-rest-server start
```

Проверьте журналы службы Heimdall:

```sh
journalctl -u heimdalld.service -f
```

:::note

В журналах вы можете увидеть следующие ошибки:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

Они означают, что один из нодов в сети отказался от подключения к вашему ноду. Подождите пока ваш нод выполнит обход большего количества нодов в сети. Вам не нужно предпринимать никаких действий
для устранения этих ошибок.

:::

Проверьте журналы сервера Rest Heimdall:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Проверьте состояние синхронизации Heimdall:

```sh
curl localhost:26657/status
```

В результате значение `catching_up` может быть следующим:

* `true` — служба Heimdall синхронизируется.
* `false` — служба Heimdall полностью синхронизована.

Дождитесь полной синхронизации службы Heimdall.

### Запуск службы Bor {#starting-the-bor-service}

После синхронизации службы Heimdall запустите службу Bor.

Запустите службу Bor:

```sh
sudo service bor start
```

Проверьте журналы службы Bor:

```sh
journalctl -u bor.service -f
```

## Настройка узла проверки {#configuring-the-validator-node}

:::note

Чтобы выполнить действия, описанные в этом разделе, вам нужна конечная точка удаленного вызова процедур для вашего
нода, полностью синхронизированного с Ethereum mainnet.

:::

### Настройка службы Heimdall {#configuring-the-heimdall-service}

Войдите в удаленный компьютер узла проверки.

Откройте `vi ~/.heimdalld/config/config.toml` для внесения изменений.

В `config.toml` внесите следующее изменение:

* `moniker` — любое имя. Пример: `moniker = "my-validator-node"`.
* `pex` — задайте значение `false` для отключения функции обмена между одноранговыми узлами. Пример: `pex = false`.
* `private_peer_ids` — закомментируйте значение, чтобы отключить его. Пример: `# private_peer_ids = ""`.

  Чтобы получить идентификатор нода Heimdall на компьютере сентри-нода, сделайте следующее:

  1. Войдите в компьютер сентри-нода.
  1. Выполните команду `heimdalld tendermint show-node-id`.

Пример: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`.

* `prometheus` — задайте значение `true` для включения метрик Prometheus. Пример: `prometheus = true`.

Сохраните изменения в `config.toml`.

Откройте `vi ~/.heimdalld/config/heimdall-config.toml` для внесения изменений.

В `heimdall-config.toml` внесите следующее изменение:

* `eth_rpc_url` — конечная точка удаленного вызова процедур для нода, полностью синхронизированного с Ethereum mainnet,
т. е. Infura. `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Пример: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`.

Сохраните изменения в `heimdall-config.toml`.

### Настройка службы Bor {#configuring-the-bor-service-1}

Откройте `vi ~/.bor/data/bor/static-nodes.json` для внесения изменений.

В `static-nodes.json` внесите следующее изменение:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — идентификатор нода и
IP-адрес Bor, установленного на компьютер сентри-нода.

  Чтобы получить идентификатор нода Bor на компьютере сентри-нода, сделайте следующее:

  1. Войдите в компьютер сентри-нода.
  2. Выполните команду `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

  Пример: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

Сохраните изменения в `static-nodes.json`.

## Установка ключей владельца и подписанта {#setting-the-owner-and-signer-key}

На Polygon рекомендуется использовать разные ключи для владельца и подписанта.

* Подписант — это адрес, который подписывает
[транзакции создания чекпоинта](/docs/maintain/glossary.md#checkpoint-transaction). На адресе подписанта
рекомендуется хранить как минимум 1 ETH.
* Владелец — это адрес, который выполняет транзакции стейкинга. На адресе владельца
рекомендуется хранить токены MATIC.

### Генерация закрытого ключа Heimdall {#generating-a-heimdall-private-key}

Сгенерировать закрытый ключ Heimdall нужно только на компьютере узла проверки. Не генерируйте закрытый ключ Heimdall
на компьютере сентри-нода.

Чтобы сгенерировать закрытый ключ, выполните следующую команду:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

где

* ETHEREUM_PRIVATE_KEY — это закрытый ключ вашего кошелька Ethereum.

В результате будет сгенерирован файл `priv_validator_key.json`. Переместите сгенерированный JSON-файл
в каталог конфигурации Heimdall:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Генерация файла хранилища ключей Bor {#generating-a-bor-keystore-file}

Сгенерировать файл хранилища ключей Bor нужно только на компьютере узла проверки. Не генерируйте файл хранилища ключей Bor
на компьютере сентри-нода.

Чтобы сгенерировать закрытый ключ, выполните следующую команду:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

где

* ETHEREUM_PRIVATE_KEY — это закрытый ключ вашего кошелька Ethereum.

По запросу установите пароль для файла хранилища ключей.

В результате будет сгенерирован файл хранилища ключей `UTC-<time>-<address>`.

Переместите сгенерированный файл хранилища ключей в каталог конфигурации Bor:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### Добавление password.txt {#add-password-txt}

Создайте файл `password.txt`, а затем добавьте непосредственно в файл
`~/.bor/password.txt`пароль файла хранилища ключей Bor.

### Добавление адреса Ethereum {#add-your-ethereum-address}

Откройте `vi /etc/matic/metadata` для внесения изменений.

В `metadata` добавьте ваш адрес Ethereum. Пример: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

Сохраните изменения в `metadata`.

## Запуск узла проверки {#starting-the-validator-node}

На данный момент должно быть сделано следующее:

* На компьютере сентри-нода запущена синхронизирующаяся служба Heimdall.
* На компьютере сентри-нода запущена служба Bor.
* На компьютере узла проверки настроены службы Heimdall и Bor.
* Настроены ваши ключи владельца и подписанта.

### Запуск службы Heimdall {#starting-the-heimdall-service-1}

Теперь потребуется запустить службу Heimdall на компьютере узла проверки. После синхронизации службы Heimdall
нужно будет запустить службу Bor на компьютере узла проверки.

Запустите службу Heimdall:

```sh
sudo service heimdalld start
```

Запустите сервер Rest Heimdall:

```sh
sudo service heimdalld-rest-server start
```

Запустите мост Heimdall:

```sh
sudo service heimdalld-bridge start
```

Проверьте журналы службы Heimdall:

```sh
journalctl -u heimdalld.service -f
```

Проверьте журналы сервера Rest Heimdall:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Проверьте журналы моста Heimdall:

```sh
journalctl -u heimdalld-bridge.service -f
```

Проверьте состояние синхронизации Heimdall:

```sh
curl localhost:26657/status
```

В результате значение `catching_up` может быть следующим:

* `true` — служба Heimdall синхронизируется.
* `false` — служба Heimdall синхронизирована.

Дождитесь полной синхронизации службы Heimdall.

### Запуск службы Bor {#starting-the-bor-service-1}

После синхронизации службы Heimdall компьютере узла проверки нужно будет запустить службу Bor на
компьютере узла проверки.

Запустите службу Bor:

```sh
sudo service bor start
```

Проверьте журналы службы Bor:

```sh
journalctl -u bor.service -f
```

## Проверка работоспособности нодов с помощью сообщества {#health-checks-with-the-community}

Теперь, когда ваш сентри-нод и узел проверки синхронизированы и запущены, перейдите в
[Discord](https://discord.com/invite/0xPolygon) и попросите участников сообщества проверить их работоспособность.

:::note

Как валидаторы, всегда необходимо иметь чек адреса подписанта. Если баланс ETH достигает ниже 0,5 ETH, он должен быть пополнен. Избежать этого будет выводить узлы из отправки транзакций checkpoint.

:::

## Следующие действия: стейкинг {#next-steps-staking}

После проверки работоспособности вашего сентри-нода и узла проверки можно переходить к
руководству по [стейкингу](/docs/maintain/validator/core-components/staking.md), чтобы начать поддержку работы сети.
