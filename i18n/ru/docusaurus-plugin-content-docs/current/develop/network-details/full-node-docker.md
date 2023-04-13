---
id: full-node-docker
title: Запуск полного нода с помощью Docker
sidebar_label: Run a full node with Docker
description:  Руководство по запуску полного нода с помощью Docker
keywords:
  - docs
  - matic
  - docker
  - full node
  - polygon
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Команда Polygon распространяет официальные образы Docker, которые можно использовать для запуска нодов в Polygon mainnet. Эти инструкции предназначены для запуска полного нода, но их также можно адаптировать для запуска дозорных нодов и валидаторов.

:::tip Снимки

Вы обнаружите, что синхронизация с нуля может занять очень много времени. Если вы хотите ускорить процесс, вы можете следовать инструкциям, приведенным здесь: [<ins>Инструкция по снятию для Heimdall и Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor)

Это будут самые актуальные инструкции, но приблизительная процедура приведена в шагах, описанных ниже:
```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# at this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```

`aria2c`Метод используется для быстрой загрузки снимков. Существует альтернативный способ, когда загруженные снимки могут быть напрямую извлечены без какого-либо вмешательства.

**Шаги для этого:**

```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::

## Предварительные условия {#prerequisites}

Общая конфигурация для работы полного нода Polygon требует **не менее** 4 процессоров/ядер и 16 ГБ ОЗУ. Для этого руководства мы будем использовать AWS и тип экземпляра `t3.2xlarge`. Приложение может работать на архитектурах x86 и Arm.

Эти инструкции основаны на Docker, поэтому им легко следовать в любой операционной системе, однако в данном случае мы используем в качестве примера Ubuntu.

Что касается пространства, для полноценного нода вам, вероятно, потребуется от **2,5 до 5 терабайтов хранилища SSD (или быстрее)**.

Для взаимодействия с одноранговыми системами на полном ноде Polygon обычно должны быть открыты порты 30303 и 26656. Когда вы настроите свой брандмауэр или группы безопасности для AWS, убедитесь, что эти порты открыты вместе с любыми портами, которые вам нужно получить доступ к машине.

TLDR:

- Используйте машину, имеющую не менее 4 ядер и 16 ГБ ОЗУ
- Убедитесь, что у вас есть от 2,5 ТБ до 5 ТБ быстрого хранения
- Используйте публичный IP-адрес и откройте порты 30303 и 26656

## Начальная настройка {#initial-setup}
На этом этапе у вас должен быть доступ к оболочке на машине linux с привилегиями root.

![img](/img/full-node-docker/term-access.png)

### Установить Docker {#install-docker}
Скорее всего, Docker не будет установлен в вашей операционной системе по умолчанию. Следуйте инструкциям для вашего конкретного дистрибутива, которые можно найти здесь: https://docs.docker.com/engine/install/

Мы следуем инструкциям для Ubuntu. Эти шаги описаны ниже, однако ознакомьтесь с официальными инструкциями на случай, если они были обновлены.

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

Сейчас вы должны уже установить Docker. Для проверки вы можете запустить следующую команду:

```bash
sudo docker run hello-world
```

![img](/img/full-node-docker/hello-world.png)

Во многих случаях запускать Docker от имени пользователя `root` неудобно, и поэтому после установки мы выполним приведенные [здесь](https://docs.docker.com/engine/install/linux-postinstall/) шаги, чтобы взаимодействовать с Docker без необходимости работать как пользователь `root`:

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

Теперь вы можете выйти из системы, снова войти и запускать команды Docker без `sudo`.

### Настройка дисков {#disk-setup}
Точные шаги на данном этапе могут существенно различаться в зависимости от ваших потребностей. Скорее всего, ваша система представляет собой корневой раздел на одном устройстве, где работает операционная система. Вероятно вы захотите иметь одно или несколько устройств для фактического хранения данных блокчейна. Для целей остальной части этого руководства мы смонтируем это дополнительное устройство здесь: `/mnt/data`.

В этом примере у нас есть устройство с 4 ТБ доступного пространства находится по `/dev/nvme1n1`адресу. Мы собираемся монтировать это, используя следующие шаги:

```bash
sudo mkdir /mnt/data
sudo mount /dev/nvme1n1 /mnt/data
```

Мы используем `df -h`, чтобы убедиться, что устройство смонтировано правильно.

![img](/img/full-node-docker/space.png)

Если все выглядит нормально, мы можем создать на смонтированном томе домашние каталоги для Bor и Heimdall.

```bash
sudo mkdir /mnt/data/bor
sudo mkdir /mnt/data/heimdall
```

В зависимости от сценария и операционной системы вы можете захотеть создать запись в `/etc/fstab`, чтобы ваше устройство было смонтировано при перезагрузке системы.

В нашем случае мы выполняем следующие шаги:

```bash
# Use blkid to get the UUID for the device that we're mounting
blkid

# Edit the fstab file  and add a line to mount your device
# UUID={your uuid}		/mnt/data	{your filesystem}	defaults	0	1
sudo emacs /etc/fstab

# use this to verify the fstab actually works
sudo findmnt --verify --verbose
```

Теперь вы должны иметь возможность выполнить перезагрузку и убедиться, что система загружает смонтированное устройство правильно.

### Настройка Heimdall {#heimdall-setup}

Теперь у нас имеется хост с Docker и мы смонтировали емкое устройство хранения для обеспечения работы программного обеспечения нода Polygon. Теперь мы настроим и запустим Heimdall.

Вначале убедимся, что мы можем запустить Heimdall с Docker. Выполните следующую команду:

```bash
docker run -it 0xpolygon/heimdall:0.3.0 heimdallcli version
```

Если вы запускаете Heimdall с Docker впервые, требуемый образ будет получен автоматически, и так же будет выведена информация о версии.

![img](/img/full-node-docker/heimdall-version.png)

Если вы захотите проверить детали образа Heimdall или найти другой тег, вы можете посмотреть репозиторий в Docker Hub: https://hub.docker.com/repository/docker/0xpolygon/heimdall

Сейчас давайте запустим команду Heimdall `init` для настройки нашего домашнего каталога.

```bash
docker run -v /mnt/data/heimdall:/heimdall-home:rw --entrypoint /usr/bin/heimdalld -it 0xpolygon/heimdall:0.3.0 init --home=/heimdall-home
```

Давайте немного сломить эту команду на случай, если что-то пойдет не так.

* Мы используем `docker run`для запуска команды через docker.

* Опция `-v /mnt/data/heimdall:/heimdall-home:rw` очень важна. Он устанавливает папку, которую мы создали ранее `/mnt/data/heimdall`из нашей системы хоста `/heimdall-home`в контейнер в качестве тома доктора.

* `rw` разрешает команде выполнять запись в этот том Docker. Для всех целей и задач из контейнера docker, домашний каталог для Heimdall будет `/heimdall-home`.

* `--entrypoint /usr/bin/heimdalld`Аргумент переопределяет точку входа по умолчанию для этого контейнера.

* Этот `-it`переключатель используется для запуска команды интерактивно.

* `0xpolygon/heimdall:0.3.0`Наконец, мы определяем, на каком изображении мы хотим запустить .

* После этого аргументы `init --home=/heimdall-home` передаются в исполняемый модуль heimdalld. Нам нужно запустить команду `init`, и опция `--home` используется для указания расположения домашнего каталога.

После запуска команды `init` ваш каталог `/mnt/data/heimdall` должен иметь определенную структуру и выглядеть так:

![img](/img/full-node-docker/heimdall-tree.png)

Теперь нам необходимо внести немного обновлений, прежде чем запускать Heimdall. Вначале мы отредактируем файл `config.toml`.

```bash
# Open the config.toml and and make three edits
# moniker = "YOUR NODE NAME HERE"
# laddr = "tcp://0.0.0.0:26657"
# seeds = "LATEST LIST OF SEEDS"

sudo emacs /mnt/data/heimdall/config/config.toml
```

Если у вас нет списка сидов, вы можете найти его в документации по настройке полного нода. В нашем случае наш файл содержит следующие три строки:

```
# A custom human readable name for this node
moniker="examplenode01"

# TCP or UNIX socket address for the RPC server to listen on
laddr = "tcp://0.0.0.0:26657"

# Comma separated list of seed nodes to connect to
seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
```

:::caution

Внутри файла `laddr``config.toml`два. Убедитесь, что `laddr`параметр изменяется только в `[rpc]`разделе.

:::

Теперь ваш файл `config.toml` готов, и вам потребуется внести два небольших изменения в файл `heimdall-config.toml`. Используйте свой любимый редактор для обновления этих двух настроек:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "http://localhost:9545"

# RPC endpoint for bor chain
bor_rpc_url = "http://localhost:8545"
```

`eth_rpc_url` следует заменить на URL-адрес, который вы используете для Ethereum Mainnet RPC. `bor_rpc_url`В нашем случае будет обновлен до .`http://bor:8545` После внесения изменений наш файл имеет следующие строки:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "https://eth-mainnet.g.alchemy.com/v2/ydmGjsREDACTED_DONT_USE9t7FSf"

# RPC endpoint for bor chain
bor_rpc_url = "http://bor:8545"
```

Команда по умолчанию `init` предоставляет `genesis.json`, но это не будет работать с Polygon Mainnet или Mumbai. Если вы настраиваете узел mainnet, вы сможете запустить эту команду для загрузки правильного файла генезиса:

```bash
sudo curl -o /mnt/data/heimdall/config/genesis.json https://raw.githubusercontent.com/maticnetwork/heimdall/master/builder/files/genesis-mainnet-v1.json
```

Если вы хотите убедиться, что у вас правильный файл, вы можете проверить это с помощью данного хэша:

```
# sha256sum genesis.json
498669113c72864002c101f65cd30b9d6b159ea2ed4de24169f1c6de5bcccf14  genesis.json
```

## Запуск Heimdall {#starting-heimdall}
Прежде чем запускать Heimdall, мы создадим сеть Docker, чтобы контейнеры могли легко взаимодействовать друг с другом через сеть, используя имена. Чтобы создать сеть, необходимо запустить следующую команду:

```bash
docker network create polygon
```

Теперь мы выполним запуск Heimdall. Выполните следующую команду:

```bash
docker run -p 26657:26657 -p 26656:26656 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdall --entrypoint /usr/bin/heimdalld -d --restart unless-stopped  0xpolygon/heimdall:0.3.0 start --home=/heimdall-home
```

Многие элементы этой команды будут выглядеть знакомо. Поэтому давайте поговорим о том, что нового.

* Опции `-p 26657:26657` и `-p 26656:26656` отвечают за сопоставление портов. Это будет поручить докеру сопоставить порт хоста `26657`в порт контейнера `26657`и то же для .`26656`

* `--net polygon`Переключатель говорит доктору для запуска этого контейнера в сети полигона.

* `--name heimdall`Это имя будет именоваться контейнером, который пригоден для отладки, но это все имя, которое будет использоваться для других контейнеров для подключения к Heimdall.

* `-d`Аргумент говорит доктору запустить этот контейнер в фоновом режиме.

* Переключатель `--restart unless-stopped`говорит доктору автоматически перезапустить контейнер, если он не был остановлен вручную.

* Наконец, используется для реального запуска `start`приложения, а `init`не просто для настройки home.

Сейчас будет полезно проверить и посмотреть, что происходит. Следующие две команды могут быть полезными:

```bash
# ps will list the running docker processes. At this point you should see one container running
docker ps

# This command will print out the logs directly from the heimdall application
docker logs -ft heimdall
```

Теперь Heimdall нужно начать синхронизацию. Когда вы смотрите журналы, вам следует увидеть журнал информации, logs, который выглядит следующим образом:

```
2022-12-14T19:43:23.687640820Z INFO [2022-12-14|19:43:23.687] Executed block                               module=state height=26079 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.721220869Z INFO [2022-12-14|19:43:23.721] Committed state                              module=state height=26079 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.730533414Z INFO [2022-12-14|19:43:23.730] Executed block                               module=state height=26080 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.756646938Z INFO [2022-12-14|19:43:23.756] Committed state                              module=state height=26080 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.768129711Z INFO [2022-12-14|19:43:23.767] Executed block                               module=state height=26081 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.794323918Z INFO [2022-12-14|19:43:23.794] Committed state                              module=state height=26081 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.802989809Z INFO [2022-12-14|19:43:23.802] Executed block                               module=state height=26082 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.830960386Z INFO [2022-12-14|19:43:23.830] Committed state                              module=state height=26082 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.840941976Z INFO [2022-12-14|19:43:23.840] Executed block                               module=state height=26083 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.866564767Z INFO [2022-12-14|19:43:23.866] Committed state                              module=state height=26083 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.875395744Z INFO [2022-12-14|19:43:23.875] Executed block                               module=state height=26084 validTxs=0 invalidTxs=0
```

Если вы не увидите такую информацию, возможно ваш нод не может найти достаточно пиров. Еще одна полезная команда на данном этапе — вызов RPC для проверки статуса синхронизации Heimdall:

```bash
curl localhost:26657/status
```

При этом будет возвращен ответ следующего вида:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "node_info": {
      "protocol_version": {
        "p2p": "7",
        "block": "10",
        "app": "0"
      },
      "id": "0698e2f205de0ffbe4ca215e19b2ee7275d2c334",
      "listen_addr": "tcp://0.0.0.0:26656",
      "network": "heimdall-137",
      "version": "0.32.7",
      "channels": "4020212223303800",
      "moniker": "examplenode01",
      "other": {
        "tx_index": "on",
        "rpc_address": "tcp://0.0.0.0:26657"
      }
    },
    "sync_info": {
      "latest_block_hash": "812700055F33B175CF90C870B740D01B0C5B5DCB8D22376D2954E1859AF30458",
      "latest_app_hash": "83A1568E85A1D942D37FE5415F3FB3CBD9DFD846A42CBC247DFD6ABB9CE7E606",
      "latest_block_height": "16130",
      "latest_block_time": "2020-05-31T17:06:31.350723885Z",
      "catching_up": true
    },
    "validator_info": {
      "address": "3C6058AF387BB74D574582C2BEEF377E7A4C0238",
      "pub_key": {
        "type": "tendermint/PubKeySecp256k1",
        "value": "BOIKA6z1q3l5iSJoaAiagWpwUw3taAhiEMyZ9ffxAMznas2GU1giD5YmtnrB6jzp4kkIqv4tOmuGYILSdy9+wYI="
      },
      "voting_power": "0"
    }
  }
}
```

На этапе начальной настройки важно обратить особое внимание на поле `sync_info`. Если `catching_up` не соответствует действительности, это означает, что полная синхронизация Heimdall не выполнена. Вы можете посмотреть другие свойства в `sync_info`, чтобы понять, насколько отстает Heimdall.

## Запуск Bor {#starting-bor}

Сейчас у вас должен быть нод, на котором успешно запущен Heimdall. Вам следует подготовиться к запуску Bor.

Прежде чем мы начнем использовать Bor, нам нужно будет запустить сервер Heimdall rest. Эта команда запускает REST API, который используется Bor для извлечения информации из Heimdall. Команда для запуска сервера является:

```bash
docker run -p 1317:1317 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdallrest --entrypoint /usr/bin/heimdalld -d --restart unless-stopped 0xpolygon/heimdall:0.3.0 rest-server --home=/heimdall-home --node "tcp://heimdall:26657"
```

Существует два разных компонента этой команды, на которые следует обратить внимание. Вместо команды `start` мы запускаем команду `rest-server`. Также мы передаем `~–node “tcp://heimdall:26657”~`, указывая серверу REST, как следует взаимодействовать с Heimdall.

Если эта команда успешно запускается, то при `docker ps`запуске следует видеть два контейнера команды. Кроме того, если вы запустите эту команду, вы увидите базовый вывод:

```bash
curl localhost:1317/bor/span/1
```

Bor будет использовать этот интерфейс. Поэтому, если вы не видите вывод JSON, есть что-то неправильно!

Теперь давайте download `genesis`файл для Bor специально:

```bash
sudo curl -o /mnt/data/bor/genesis.json 'https://raw.githubusercontent.com/maticnetwork/bor/master/builder/files/genesis-mainnet-v1.json'
```

Давайте еще раз проверим `sha256 sum` для этого файла:

```
# sha256sum genesis.json
4bacbfbe72f0d966412bb2c19b093f34c0a1bd4bb8506629eba1c9ca8c69c778  genesis.json
```

Теперь нам необходимо создать файл конфигурации по умолчанию для запуска Bor.

```bash
docker run -it  0xpolygon/bor:0.3.3 dumpconfig | sudo tee /mnt/data/bor/config.toml
```

Эта команда собирается создать файл .toml с настройками по умолчанию. Мы сделаем несколько изменений в файле, поэтому откроем его с помощью любимого редактора и сделаем несколько обновлений. Примечание: мы отображаем только строки, которые изменены.

Для справки можно посмотреть данные для изображения Bor здесь: [https://hub.docker.com/repository/docker/0xpolygon/bor](https://hub.docker.com/repository/docker/0xpolygon/bor)

```bash
# Similar to moniker, you might want to update this with a name of your own choosing
identity = "docker.example"

# Setting this to the location of a mount that we'll make
datadir = "/bor-home"

# We'll want to specify some boot nodes
[p2p]
  [pep.discovery]
    bootnodes = ["enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303", "enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303"]

# Because we're running inside docker, we'll likely need to change the way we connect to heimdall
[heimdall]
  url = "http://heimdallrest:1317"

# Assumming you want to access the RPC, you'll need to make a change here as well
[jsonrpc]
  [jsonrpc.http]
    enabled = true
    host = "0.0.0.0"
```

На этом этапе мы должны быть готовы запустить Bor. Мы используем эту команду:
```bash
docker run -p 30303:30303 -p 8545:8545 -v /mnt/data/bor:/bor-home:rw --net polygon --name bor -d --restart unless-stopped  0xpolygon/bor:0.3.3 server --config /bor-home/config.toml
```

Если все прошло хорошо, вы должны увидеть множество журналов, которые выглядят следующим образом:

```bash
2022-12-14T19:53:51.989897291Z INFO [12-14|19:53:51.989] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:47:46Z
2022-12-14T19:53:51.989925064Z INFO [12-14|19:53:51.989] Fetching state sync events               queryParams="from-id=4&to-time=1590882466&limit=50"
2022-12-14T19:53:51.997640841Z INFO [12-14|19:53:51.997] StateSyncData                            Gas=0       Block-number=12800 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.021990622Z INFO [12-14|19:53:52.021] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:49:58Z
2022-12-14T19:53:52.022015930Z INFO [12-14|19:53:52.021] Fetching state sync events               queryParams="from-id=4&to-time=1590882598&limit=50"
2022-12-14T19:53:52.040660857Z INFO [12-14|19:53:52.040] StateSyncData                            Gas=0       Block-number=12864 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.064795784Z INFO [12-14|19:53:52.064] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:52:10Z
2022-12-14T19:53:52.064828634Z INFO [12-14|19:53:52.064] Fetching state sync events               queryParams="from-id=4&to-time=1590882730&limit=50"
2022-12-14T19:53:52.085029612Z INFO [12-14|19:53:52.084] StateSyncData                            Gas=0       Block-number=12928 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.132067703Z INFO [12-14|19:53:52.131] ✅ Committing new span                    id=3                startBlock=13056 endBlock=19455 validatorBytes=f8b6d906822710940375b2fc7140977c9c76d45421564e354ed42277d9078227109442eefcda06ead475cde3731b8eb138e88cd0bac3d9018238a2945973918275c01f50555d44e92c9d9b353cadad54d905822710947fcd58c2d53d980b247f1612fdba93e9a76193e6d90482271094b702f1c9154ac9c08da247a8e30ee6f2f3373f41d90282271094b8bb158b93c94ed35c1970d610d1e2b34e26652cd90382271094f84c74dea96df0ec22e11e7c33996c73fcc2d822 producerBytes=f8b6d906822710940375b2fc7140977c9c76d45421564e354ed42277d9078227109442eefcda06ead475cde3731b8eb138e88cd0bac3d9018238a2945973918275c01f50555d44e92c9d9b353cadad54d905822710947fcd58c2d53d980b247f1612fdba93e9a76193e6d90482271094b702f1c9154ac9c08da247a8e30ee6f2f3373f41d90282271094b8bb158b93c94ed35c1970d610d1e2b34e26652cd90382271094f84c74dea96df0ec22e11e7c33996c73fcc2d822
2022-12-14T19:53:52.133545235Z INFO [12-14|19:53:52.133] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:54:22Z
2022-12-14T19:53:52.133578948Z INFO [12-14|19:53:52.133] Fetching state sync events               queryParams="from-id=4&to-time=1590882862&limit=50"
2022-12-14T19:53:52.135049605Z INFO [12-14|19:53:52.134] StateSyncData                            Gas=0       Block-number=12992 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.152067646Z INFO [12-14|19:53:52.151] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:56:34Z
2022-12-14T19:53:52.152198357Z INFO [12-14|19:53:52.151] Fetching state sync events               queryParams="from-id=4&to-time=1590882994&limit=50"
2022-12-14T19:53:52.176617455Z INFO [12-14|19:53:52.176] StateSyncData                            Gas=0       Block-number=13056 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.191060112Z INFO [12-14|19:53:52.190] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:58:46Z
2022-12-14T19:53:52.191083740Z INFO [12-14|19:53:52.190] Fetching state sync events               queryParams="from-id=4&to-time=1590883126&limit=50"
2022-12-14T19:53:52.223836639Z INFO [12-14|19:53:52.223] StateSyncData                            Gas=0       Block-number=13120 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.236025906Z INFO [12-14|19:53:52.235] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:00:58Z
2022-12-14T19:53:52.236053406Z INFO [12-14|19:53:52.235] Fetching state sync events               queryParams="from-id=4&to-time=1590883258&limit=50"
2022-12-14T19:53:52.269611566Z INFO [12-14|19:53:52.269] StateSyncData                            Gas=0       Block-number=13184 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.283199351Z INFO [12-14|19:53:52.283] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:03:10Z
2022-12-14T19:53:52.283737573Z INFO [12-14|19:53:52.283] Fetching state sync events               queryParams="from-id=4&to-time=1590883390&limit=50"
2022-12-14T19:53:52.314141359Z INFO [12-14|19:53:52.314] StateSyncData                            Gas=0       Block-number=13248 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.325150782Z INFO [12-14|19:53:52.325] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:05:22Z
2022-12-14T19:53:52.325171075Z INFO [12-14|19:53:52.325] Fetching state sync events               queryParams="from-id=4&to-time=1590883522&limit=50"
2022-12-14T19:53:52.354470271Z INFO [12-14|19:53:52.354] StateSyncData                            Gas=0       Block-number=13312 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.372354857Z INFO [12-14|19:53:52.372] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:07:34Z
2022-12-14T19:53:52.372389214Z INFO [12-14|19:53:52.372] Fetching state sync events               queryParams="from-id=4&to-time=1590883654&limit=50"
2022-12-14T19:53:52.398246950Z INFO [12-14|19:53:52.398] StateSyncData                            Gas=0       Block-number=13376 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.413321099Z INFO [12-14|19:53:52.413] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:09:46Z
2022-12-14T19:53:52.413345355Z INFO [12-14|19:53:52.413] Fetching state sync events               queryParams="from-id=4&to-time=1590883786&limit=50"
2022-12-14T19:53:52.437176855Z INFO [12-14|19:53:52.437] StateSyncData                            Gas=0       Block-number=13440 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.450356966Z INFO [12-14|19:53:52.450] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:11:58Z
```

Существует несколько способов проверить состояние синхронизации Bor. Самый простой — использовать `curl`:

```bash
curl 'localhost:8545/' \
--header 'Content-Type: application/json' \
-d '{
	"jsonrpc":"2.0",
	"method":"eth_syncing",
	"params":[],
	"id":1
}'
```

Когда вы запустите эту команду, это даст вам результат, такой:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x2eebf",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodeBytes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x1d4ee3e",
    "startingBlock": "0x0",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

Это укажет `currentBlock`, который был синхронизирован, а также `highestBlock`, о котором нам известно. Если узел уже синхронизирован, мы должны получить `false`.

## Снимки {#snapshots}
Вы обнаружите, что синхронизация с нуля может занять очень много времени. Если вы хотите ускорить процесс, вы можете следовать инструкциям, приведенным здесь: [https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/](https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/)

Это будут самые актуальные инструкции, но приблизительная процедура приведена в шагах, описанных ниже:

```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# At this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```
