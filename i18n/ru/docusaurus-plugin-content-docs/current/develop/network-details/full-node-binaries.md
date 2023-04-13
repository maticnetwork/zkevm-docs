---
id: full-node-binaries
title: Запуск полного нода с двоичными файлами
description: Развернуть полный узел с помощью бинарных файлов
keywords:
  - docs
  - matic
  - polygon
  - node
  - binaries
  - deploy
  - run full node
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Этот учебник позволяет вам запустить и запустить полный узел с использованием binaries. Требования к системе см. в руководстве [по минимальным техническим](technical-requirements.md) требованиям.

:::tip

Действия, описанные в этом руководстве, предполагают ожидание полной синхронизации служб Heimdall и Bor. Этот процесс занимает несколько дней.

В качестве альтернативы вы можете использовать поддерживаемый моментальный снимок, который позволит сократить время синхронизации до нескольких часов. Подробнее: [<ins>Инструкции по использованию моментальных снимков для Heimdall и Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor).

Ссылки для загрузки снимков см. на странице [<ins>Snapshots Polygon</ins>](https://snapshots.polygon.technology/) Chains.

:::

## Обзор {#overview}

- Подготовить машину
- Установите бинарные файлы Heimdall и Bor на полный сервер
- Настройка сервисов Heimdall и Bor на полном компьютере узла
- Настройка полной машины
- Запустите полный станок
- Проверка работоспособности нодов с помощью сообщества

:::note

Вам необходимо следовать точной обозначенной последовательности действий, иначе вы будете столкнуться с проблемами.

:::

### Установить`build-essential`

Это **требуется** для вашего полного узла. Чтобы установить выполненную ниже команду:

```bash
sudo apt-get update
sudo apt-get install build-essential
```

### Установите GO {#install-go}

Это также **требуется** для запуска вашего полного узла. Рекомендуется установить **v1.18 или** выше.

```bash
wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
bash go-install.sh
sudo ln -nfs ~/.go/bin/go /usr/bin/go
```

## Установите двоичные файлы {#install-binaries}

Узел Polygon состоит из 2 слоев: Heimdall и Bor. Heimdall — это вилка тендерной монеты, который отслеживает контракты параллельно с сетью Ethereum. Bor — это в основном вилка Geth, который генерирует блоки, перемещенные нодами Heimdall.

Оба файла должны быть установлены и запускать в правильном порядке, чтобы правильно функционировать.

### Heimdall {#heimdall}

Установите последнюю версию Heimdall и связанных с ним сервисов. Убедитесь, что вы checkout to the [correct version](https://github.com/maticnetwork/heimdall/releases). Обратите внимание, что последняя версия [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0) содержит следующие улучшения:
1. Ограничение размера данных в транзакциях синхронизации состояний:
    * **30 КБ** при представлении в **байтах**.
    * **60Kb******
2. Увеличение **времени задержки** между событиями контрактов разных валидаторов с той целью, чтобы в случае резкого увеличения количества событий, которые могут помешать дальнейшей реализации цепочки, пул памяти не заполнялся очень быстро.

На следующем примере показано, как ограничивается размер данных:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

Чтобы установить **Heimdall**, выполните следующие команды:

```bash
cd ~/
git clone https://github.com/maticnetwork/heimdall
cd heimdall

# Checkout to a proper version, for example
git checkout v0.3.0
git checkout <TAG OR BRANCH>
make install
source ~/.profile
```

Эта команда установит двоичные файлы `heimdalld` и `heimdallcli`. Убедитесь в установке путем проверки версии Heimdall на вашем компьютере:

```bash
heimdalld version --long
```

### Bor {#bor}

Установите последнюю версию Bor. Убедитесь, что вы git checkout в исправленной [выпущенной версии](https://github.com/maticnetwork/bor/releases).

```bash
cd ~/
git clone https://github.com/maticnetwork/bor
cd bor

# Checkout to a proper version
# For e.g: git checkout 0.3.3
git checkout <TAG OR BRANCH>
make bor
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

Эта команда установит двоичные файлы `bor` и `bootnode`. Убедитесь в установке путем проверки версии Bor на вашем компьютере:

```bash
bor version
```

## Настройка файлов нода {#configure-node-files}

### Доставьте репозиторий запуска {#fetch-launch-repo}

```bash
cd ~/
git clone https://github.com/maticnetwork/launch
```

### Настройка каталога запуска {#configure-launch-directory}

Для настройки сетевого каталога требуется указать имя сети и тип нода.

**Доступные сети**: `mainnet-v1`и`testnet-v4`

**Тип нода**:`sentry`

:::tip

Для конфигурации Mainnet и Testnet используйте соответствующие `<network-name>`. Используйте `mainnet-v1`для mainnet Polygon и `testnet-v4`для Mumbai Testnet.
:::

```bash
cd ~/
mkdir -p node
cp -rf launch/<network-name>/sentry/<node-type>/* ~/node
```

### Настройка сетевых каталогов {#configure-network-directories}

**Настройка данных Heimdall**

```bash
cd ~/node/heimdall
bash setup.sh
```

**Настройка данных Bor**

```bash
cd ~/node/bor
bash setup.sh
```

## Настройка файлов сервиса {#configure-service-files}

Загрузите `service.sh`файл с помощью соответствующего .`<network-name>` Используйте `mainnet-v1`для mainnet Polygon и `testnet-v4`для Mumbai Testnet.

```bash
cd ~/node
wget https://raw.githubusercontent.com/maticnetwork/launch/master/<network-name>/service.sh
```

Сгенерировать файл **метаданных:**

```bash
sudo mkdir -p /etc/matic
sudo chmod -R 777 /etc/matic/
touch /etc/matic/metadata
```

Сгенерируйте `.service`файлы и скопируйте их в системную директорию:

```bash
cd ~/node
bash service.sh
sudo cp *.service /etc/systemd/system/
```


## Настройка файлов конфигурации. {#setup-config-files}

- Войдите в удаленную машину / ВМ
- Вам потребуется добавить несколько деталей в файл `config.toml`. Чтобы открыть и редактировать `config.toml`файл, выполните следующую команду: .`vi ~/.heimdalld/config/config.toml`

В файле config необходимо будет изменить и `Moniker`добавить `seeds`информацию:

    ```bash
    moniker=<enter unique identifier>
    # For example, moniker=my-sentry-node

    # Mainnet:
    seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656"

    # Testnet:
    seeds="4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656"
    ```

    - Измените значение **Pex** на `true`
    - Измените значение **Prometheus** на `true`
    - Установите для `max_open_connections` значение `100`

Убедитесь, что при внесении вышеуказанных изменений **сохраните надлежащий** форматирование.

- Настройте следующее в `~/.heimdalld/config/heimdall-config.toml`:

    ```jsx
    eth_rpc_url=<insert Infura or any full node RPC URL to Goerli>
    ```

- Откройте `start.sh`файл для Bor с помощью этой команды: .`vi ~/node/bor/start.sh` Чтобы запустить параметры флага:

  ```bash
  # Mainnet:
  --bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303"

  # Testnet:
  --bootnodes "enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303"
  ```

- Чтобы включить режим **Archive**, в файл можно добавить следующие `start.sh`флаги:

  ```jsx
  --gcmode 'archive' \
  --ws --ws.port 8546 --ws.addr 0.0.0.0 --ws.origins '*' \
  ```

## Запустите сервисы {#start-services}

Запустите полный узел Heimdall с этими командами на вашем Node Sentry:

```bash
sudo service heimdalld start
sudo service heimdalld-rest-server start
```

Теперь вам нужно убедиться, что **Heimdall синхронизирован** полностью, а затем только запустить Bor. Если вы запустите Bor без полной синхронизации с Heimdall, вы будете часто сталкиваться с проблемами.

**Чтобы проверить, синхронизируется ли Heimdall**
  1. Запустите на удаленной машине/ВМ команду `curl localhost:26657/status`
  2. В выводе значение `catching_up` должно равняться `false`

После синхронизации Heimdall выполните следующую команду:

```bash
sudo service bor start
```

## Logs {#logs}

Журналы могут быть управляются инструментом `journalctl`linux. Вот учебник для расширенного использования: [Как использовать Journalctl для просмотра и записи Systemd](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs).

**Проверьте журналы нода Heimdall**

```bash
journalctl -u heimdalld.service -f
```

**Проверить журналы Rest-server Heimdall**

```bash
journalctl -u heimdalld-rest-server.service -f
```

**Проверить журналы Rest-server Bor**

```bash
journalctl -u bor.service -f
```

## Настройка портов и брандмауэра {#ports-and-firewall-setup}

Откройте порты 22, 26656 и 30303 для world (0.0.0.0/0) на брандмауэре сторожевого нода.

Вы можете использовать VPN для ограничения доступа к порту 22 в соответствии с требованиями и правилами безопасности.
