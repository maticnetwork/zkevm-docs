---
id: client-setup
title: Настройка клиента архивного нода
sidebar_label: Set up an Archive Node Client
description: "Системные требования и настройка клиента."
keywords:
  - erigon
  - archive
  - node
  - docs
  - polygon
  - client
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Системные требования {#system-requirements}

### Архив нод {#archive-node}

- 16-ядерный процессор
- 64 ГБ ОЗУ
- В основном io1 или выше с по меньшей мере 20k+ iops и структурой на основе Raid-0

### Клиент {#erigon-client}

- Для архивного узла Polygon Mainnet: 5TB
- Для архивного нода Polygon Mumbai: 1TB
- SSD или NVMe. Имейте в виду, что производительность SSD ухудшается при близком к емкости
- ОЗУ: >= 16 ГБ, 64-битная архитектура
- Версия Golang >= 1.18, GCC 10+

:::note HDD не рекомендуется

При использовании HDD Erigon всегда остается на N блоков позади конца цепочки, но не упадет назад.

:::

## Настройка клиента Erigon {#erigon-client-setup}

### Как выполнить установку {#how-to-install}

Запустите следующие команды для установки Erigon:

```bash
git clone --recurse-submodules -j8 https://github.com/maticnetwork/erigon.git
cd erigon
git checkout v0.0.5
make erigon
```

При этом должен быть создан двоичный файл в `./build/bin/erigon`

Используйте тег `v0.0.5` в нашем разветвленном репозитории для получения стабильной версии.

### Как начать {#how-to-start}

Чтобы запустить Erigon, выполните:

```bash
erigon --chain=mumbai
```

- Используйте `chain=mumbai` для тестовой сети Mumbai
- Использование `chain=bor-mainnet`для Polygon Mainnet

### Как настроить Erigon {#how-to-configure-erigon}

- Если вы захотите сохранить файлы Erigon не в расположении по умолчанию, используйте `-datadir`

    ```
    erigon --chain=mumbai --datadir=<your_data_dir>
    ```

- Если вы не используете локальный **heimdall**, используйте `-bor.heimdall=<your heimdall url>`. По умолчанию он будет пытаться подключиться к `localhost:1317`.

    ```makefile
    erigon --chain=mumbai --bor.heimdall=<your heimdall url> --datadir=<your_data_dir>
    ```

    - Если вы хотите подключиться к использованию Polygon Mumbai Testnet: [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology)

    - Для Polygon Mainnet: [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology)

### Советы для более быстрой синхронизации {#tips-for-faster-sync}

- Используйте машину с высокими показателями IOPS и большим объемом ОЗУ для более быстрой начальной синхронизации
- Используйте команды ниже для увеличения скорости загрузки/выгрузки снимка:

```makefile
--torrent.upload.rate="512mb" --torrent.download.rate="512mb"
```

Замените `512` любой пропускной способностью, с которой может справиться ваша машина.
