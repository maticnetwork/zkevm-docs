---
id: run-validator-ansible
title: Запустить узел валидатора с Ansible
sidebar_label: Using Ansible
description: Используйте Ansible, чтобы настроить свой вердикт на Polygon
keywords:
  - docs
  - matic
  - polygon
  - ansible
  - node
  - validator
  - sentry
slug: run-validator-ansible
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip

Действия, описанные в этом руководстве, предполагают ожидание полной синхронизации служб **Heimdall** и **Bor**.
ЭТОТ ПРОЦЕСС ЗАНИМАЕТ НЕСКОЛЬКО ДНЕЙ. В КАЧЕСТВЕ АЛЬТЕРНАТИВЫ ВЫ МОЖЕТЕ ИСПОЛЬЗОВАТЬ ОБНОВЛЕННЫЙ МОМЕНТАЛЬНЫЙ СНИМОК, КОТОРЫЙ ПОЗВОЛИТ СОКРАТИТЬ ВРЕМЯ СИНХРОНИЗАЦИИ ДО НЕСКОЛЬКИХ ЧАСОВ. Подробнее: [<ins>Инструкции по использованию моментальных снимков для Heimdall и Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor).

Ссылки для загрузки снимков см. в [<ins>Polygon Chains Snapshots</ins>](https://snapshot.polygon.technology/).
:::

В этом разделе рассказывается о запуске и работе узла проверки с помощью сборника схем Ansible.

Чтобы узнать системные требования, см. статью [Системные требования для узла проверки](validator-node-system-requirements.md).

Если вы хотите запустить узел проверки с помощью двоичных файлов, см. статью [Запуск узла проверки с помощью двоичных файлов](run-validator-binaries.md).

:::caution

Количество мест для приема новых валидаторов ограничено. Новые валидаторы могут присоединиться только в том случае, когда уже активный валидатор отключает облигации.

:::

## Предварительные условия {#prerequisites}

* Три компьютера: один локальный, на котором вы запускаете сборник схем Ansible, и два удаленных, один из которых предназначен для [сентри-нода](/docs/maintain/glossary.md#sentry), а другой — для узла проверки [валидатора](/docs/maintain/glossary.md#validator).
* На локальном компьютере устанавливается [Ansible](https://www.ansible.com/).
* На локальном компьютере устанавливается [Python 3.x](https://www.python.org/downloads/).
* Убедитесь, что на удаленных компьютерах *не* установлен Go.
* Открытый ключ SSH вашего локального компьютера находится на удаленных компьютерах, чтобы Ansible могла подключиться к ним.
* В качестве ретрансляционной сети мы используем Bloxroute. Если вам нужен шлюз в качестве вашего Trusted Peer, пожалуйста, свяжитесь с командой **@validator-support-team** [Polygon Discord](https://discord.com/invite/0xPolygon) > POS VALIDATORS | FULL NODE PROVIDERS | PARTNERS > bloxroute.

:::info

Пожалуйста, следуйте [<ins>инструкциям bloXroute</ins>](/maintain/validate/bloxroute.md) для подключения ваших нодов к шлюзам bloXroute.

:::

## Обзор {#overview}

:::caution

Вы должны следовать **точной обозначенной последовательности действий**, иначе вы будете столкнуться с проблемами. Например, **перед узлом валидатора всегда должен быть настроен узел sentry**.

:::

Чтобы запустить узел проверки, сделайте следующее:

1. Подготовьте три компьютера.
1. Установите сентри-нод с помощью Ansible.
1. Установите узел проверки с помощью Ansible.
1. Настройте сентри-нод.
1. Запустите сентри-нод.
1. Настройте узел проверки.
1. Задайте ключи владельца и подписанта.
1. Запустите узел проверки.
1. Проверьте работоспособность нодов с помощью сообщества.

## Установка сентри-нода {#set-up-the-sentry-node}

На локальном компьютере клонируйте [репозиторий node-ansible](https://github.com/maticnetwork/node-ansible):

```sh
git clone https://github.com/maticnetwork/node-ansible
```

Перейдите в клонированный репозиторий:

```sh
cd node-ansible
```

Добавьте IP-адреса удаленных компьютеров, которые станут сентри-нодом и узлом проверки, в файл `inventory.yml`.

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for sentry node
        xxx.xxx.xx.xx: # <----- Add IP for second sentry node (optional)
    validator:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for validator node
```

Пример:

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        188.166.216.25:
    validator:
      hosts:
        134.209.100.175:
```

Убедитесь, что удаленный компьютер сентри-нода доступен. На локальном компьютере выполните следующую команду:

```sh
$ ansible sentry -m ping
```

В результате вы должны получить следующее:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Выполните тестовый запуск сентри-нода:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --list-hosts
```

В результате вы получите следующее:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Запустите установку сентри-нода с привилегиями sudo:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --ask-become-pass
```

После установки вы увидите сообщение о ее завершении в терминале.

:::note

Если вы столкнулись с какой-то проблемой и хотите начать заново, выполните следующую команду:

```sh
ansible-playbook -l sentry playbooks/clean.yml
```

:::

## Установка узла проверки {#set-up-the-validator-node}

На данном этапе сентри-нод уже установлен.

На локальном компьютере также установлен сборник схем Ansible для запуска установки узла проверки.

Убедитесь, что удаленный компьютер узла проверки доступен. На локальной машине `ansible validator -m ping`запустите.

В результате вы должны получить следующее:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Выполните тестовый запуск узла проверки:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0 network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --list-hosts
```

В результате вы должны получить следующее:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Запустите установку узла проверки с привилегиями sudo:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --ask-become-pass
```

После установки вы увидите сообщение о ее завершении в терминале.

:::note

Если вы столкнулись с какой-то проблемой и хотите начать заново, выполните следующую команду:

```sh
ansible-playbook -l validator playbooks/clean.yml
```

:::

## Настройка сентри-нода {#configure-the-sentry-node}

Войдите в удаленный компьютер сентри-нода.

### Настройка службы Heimdall {#configure-the-heimdall-service}

Откройте `config.toml` для изменения `vi ~/.heimdalld/config/config.toml`.

Внесите следующие изменения:

* `moniker` — любое имя. Пример: `moniker = "my-full-node"`.
* `seeds` — адреса начального нода, состоящие из идентификатора нода, IP-адреса и порта.

  Используйте следующие значения:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — задайте значение `true` для включения функции обмена между одноранговыми узлами. Пример: `pex = true`.
* `private_peer_ids` — это идентификатор нода уровня Heimdall, установленного на компьютере узла проверки.

  Чтобы получить идентификатор нода уровня Heimdall на компьютере узла проверки, сделайте следующее:

  1. Войдите в компьютер узла проверки.
  1. Выполните команду `heimdalld tendermint show-node-id`.

  Пример: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` — задайте значение `true` для включения метрик Prometheus. Пример: `prometheus = true`.
* `max_open_connections` — задайте значение `100`. Пример: `max_open_connections = 100`.

Сохраните изменения в `config.toml`.

### Настройка службы Bor {#configure-the-bor-service}

Откройте `vi ~/node/bor/start.sh` для внесения изменений.

В `start.sh` добавьте адреса нодов загрузки, которые состоят из идентификатора нода, IP-адреса и порта, вставив в конце следующую строку:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

Сохраните изменения в `start.sh`.

Откройте `vi ~/.bor/data/bor/static-nodes.json` для внесения изменений.

В `static-nodes.json` внесите следующее изменение:

* `"<replace with enode://validator_machine_enodeID@validator_machine_ip:30303>"` — это идентификатор нода и IP-адрес уровня Bor, установленного на компьютере узла проверки.

  Чтобы получить идентификатор нода уровня Bor на компьютере узла проверки, сделайте следующее:

  1. Войдите в компьютер узла проверки.
  1. Выполните команду `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

  Пример: `"enode://410e359736bcd3a58181cf55d54d4e0bbd6db2939c5f548426be7d18b8fd755a0ceb730fe5cf7510c6fa6f0870e388277c5f4c717af66d53c440feedffb29b4b@134.209.100.175:30303"`.

Сохраните изменения в `static-nodes.json`.

### Настройка брандмауэра {#configure-firewall}

На компьютере сентри-нода среде `0.0.0.0/0` должны быть открыты следующие порты:

* 26656 — устанавливает связь между вашим нодом и другими нодами при помощи службы Heimdall.

* 30303 — устанавливает связь между вашим нодом и другими нодами при помощи службы Bor.

* 22 — дает валидатору доступ к SSH из любого места.

:::note

Однако, если валидатор использует VPN-соединение, он может разрешить входящие SSH-соединения только с IP-адреса VPN-соединения.

:::

## Запуск сентри-нода {#start-the-sentry-node}

Сначала запустите службу Heimdall. После синхронизации службы Heimdall запустите службу Bor.

:::note

Службе Heimdall потребуется несколько дней для полной синхронизации с нуля.

В качестве альтернативы вы можете использовать обновленный моментальный снимок, который позволит сократить время синхронизации до нескольких часов. Подробнее: [<ins>Инструкции по использованию моментальных снимков для Heimdall и Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Ссылки на скачивание моментальных снимков доступны на странице [моментальных снимков цепочек Polygon](https://snapshot.polygon.technology/).

:::

### Запуск службы Heimdall {#start-the-heimdall-service}

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

Они означают, что один из нодов в сети отказался от подключения к вашему ноду. При наличии таких ошибок каких-либо действий от вас не требуется. Подождите пока ваш нод выполнит обход большего количества нодов в сети.

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

### Запуск службы Bor {#start-the-bor-service}

После полной синхронизации службы Heimdall запустите службу Bor.

Запустите службу Bor:

```sh
sudo service bor start
```

Проверьте журналы службы Bor:

```sh
journalctl -u bor.service -f
```

## Настройка узла проверки {#configure-the-validator-node}

:::note

Чтобы выполнить действия, описанные в этом разделе, нужна конечная точка удаленного вызова процедур для вашего нода, полностью синхронизированного с Ethereum mainnet.

:::

### Настройка службы Heimdall {#configure-the-heimdall-service-1}

Войдите в удаленный компьютер узла проверки.

Откройте `config.toml` для изменения `vi ~/.heimdalld/config/config.toml`.

Внесите следующие изменения:

* `moniker` — любое имя. Пример: `moniker = "my-validator-node"`.
* `pex` — задайте значение `false` для отключения функции обмена между одноранговыми узлами. Пример: `pex = false`.
* `private_peer_ids` — закомментируйте значение, чтобы отключить его. Пример: `# private_peer_ids = ""`.


  Чтобы получить идентификатор нода уровня Heimdall на компьютере сентри-нода, сделайте следующее:

  1. Войдите в компьютер сентри-нода.
  1. Выполните команду `heimdalld tendermint show-node-id`.

  Пример: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`.

* `prometheus` — задайте значение `true` для включения метрик Prometheus. Пример: `prometheus = true`.

Сохраните изменения в `config.toml`.

Откройте `vi ~/.heimdalld/config/heimdall-config.toml` для внесения изменений.

В `heimdall-config.toml` внесите следующее изменение:

* `eth_rpc_url` — конечная точка удаленного вызова процедур для нода, полностью синхронизированного с Ethereum mainnet, т. е. Infura. `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Пример: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`


Сохраните изменения в `heimdall-config.toml`.

### Настройка службы Bor {#configure-the-bor-service-1}

Откройте `vi ~/.bor/data/bor/static-nodes.json` для внесения изменений.

В `static-nodes.json` внесите следующее изменение:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — это идентификатор нода и IP-адрес уровня Bor, установленного на компьютере сентри-нода.

  Чтобы получить идентификатор нода уровня Bor на компьютере сентри-нода, сделайте следующее:

  1. Войдите в компьютер сентри-нода.
  1. Выполните команду `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

  Пример: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

Сохраните изменения в `static-nodes.json`.

## Установка ключей владельца и подписанта {#set-the-owner-and-signer-key}

В Polygon ключи владельца и подписанта должны быть разными.

* Подписант — это адрес, который подписывает [транзакции создания чекпоинта](../glossary#checkpoint-transaction). На адресе подписанта рекомендуется хранить не менее 1 ETH.
* Владелец — это адрес, который осуществляет транзакции стейкинга. На адресе владельца рекомендуется хранить токены MATIC.

### Генерация закрытого ключа Heimdall {#generate-a-heimdall-private-key}

Сгенерировать закрытый ключ Heimdall нужно только на компьютере узла проверки. **Не генерируйте закрытый ключ Heimdall на компьютере сентри-нода.**

Чтобы сгенерировать закрытый ключ, выполните следующую команду:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY — приватный ключ кошелька Ethereum.

:::

В результате будет сгенерирован файл `priv_validator_key.json`. Переместите сгенерированный файл JSON в каталог конфигурации Heimdall:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Генерация файла хранилища ключей Bor {#generate-a-bor-keystore-file}

Сгенерировать файл хранилища ключей Bor нужно только на компьютере узла проверки. **Не генерируйте файл хранилища ключей Bor на компьютере сентри-нода.**

Чтобы сгенерировать закрытый ключ, выполните следующую команду:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY — это закрытый ключ вашего кошелька Ethereum.

:::

По запросу установите пароль для файла хранилища ключей.

В результате будет сгенерирован файл хранилища ключей `UTC-<time>-<address>`.

Переместите сгенерированный файл хранилища ключей в каталог конфигурации Bor:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### Добавить`password.txt`

Создайте файл `password.txt`, а затем добавьте пароль файла хранилища ключей Bor непосредственно в файл `~/.bor/password.txt`.

### Добавление адреса Ethereum {#add-your-ethereum-address}

Откройте `vi /etc/matic/metadata` для внесения изменений.

В `metadata` добавьте ваш адрес Ethereum. Пример: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

Сохраните изменения в `metadata`.

## Запуск узла проверки {#start-the-validator-node}

На данный момент должно быть сделано следующее:

* На компьютере сентри-нода запущена полностью синхронизированная служба Heimdall.
* На компьютере сентри-нода запущена служба Bor.
* На компьютере узла проверки настроены службы Heimdall и Bor.
* Настроены ваши ключи владельца и подписанта.

### Запуск службы Heimdall {#start-the-heimdall-service-1}

Теперь потребуется запустить службу Heimdall на компьютере узла проверки. После синхронизации службы Heimdall нужно будет запустить службу Bor на компьютере узла проверки.

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
* `false` — служба Heimdall полностью синхронизована.

Дождитесь полной синхронизации службы Heimdall.

### Запуск службы Bor {#start-the-bor-service-1}

После полной синхронизации службы Heimdall на компьютере узла проверки запустите на нем службу Bor.

Запустите службу Bor:

```sh
sudo service bor start
```

Проверьте журналы службы Bor:

```sh
journalctl -u bor.service -f
```

## Проверка работоспособности нодов с помощью сообщества {#check-node-health-with-the-community}

Теперь, когда ваш сентри-нод и узел проверки синхронизированы и запущены, перейдите в [Discord](https://discord.com/invite/0xPolygon) и попросите участников сообщества проверить их работоспособность.

:::note

Как валидаторы, всегда необходимо иметь чек адреса подписанта. Если баланс ETH достигает ниже 0,5 ETH, он должен быть пополнен. Избежать этого будет выводить узлы из отправки транзакций checkpoint.

:::

## Переход к стейкингу {#proceed-to-staking}

После проверки работоспособности вашего сентри-нода и узла проверки можно переходить к [стейкингу](/docs/maintain/validator/core-components/staking).
