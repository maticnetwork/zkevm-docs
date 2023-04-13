---
id: snapshot-instructions-heimdall-bor
title: Снимки Heimdall и Bor
description: Инструкции по созданию снимков Heimdall и Bor для более быстрой синхронизации.
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
  - heimdall
  - bor
  - snapshots
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

При настройке нового сторожевого сервера, валидатора или полного сервера нода рекомендуется использовать снимки для более быстрой синхронизации без необходимости выполнять синхронизацию по сети. Использование снимков позволит сэкономить несколько дней работы как для Heimdall, так и для Bor.

:::tip

Для последнего снимка посетите [<ins>Snapshots Polygon</ins>](https://snapshot.polygon.technology/).

:::

## Снимок Heimdall {#heimdall-snapshot}

Вначале необходимо настроить нод с использованием **предварительных требований** в соответствии с руководством по настройке нода. Прежде чем начать синхронизацию сервисов для Heimdall, выполните приведенные ниже шаги для использования снимка:

1. Загрузите снимок Heimdall в формате tar на виртуальную машину, запустив следующую команду:

```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-08.tar.gz
```

2. Чтобы распаковать файл tar в каталог данных Heimdall, запустите следующую команду:
```
// You must ensure you are running this command before you start the Heimdall service on your node.
// If your Heimdall service has started, please stop the service and run the following command:
// Once unpacking is complete, you can start the Heimdall service again:
tar -xzvf <snapshot file> -C <HEIMDALL_DATA_DIRECTORY>

// If your Heimdall data directory is different,
// please replace the directory name in the command for starting the Heimdall service.
// When this command completes, you may delete the tar file to reclaim space.

// For example, this will unpack the tar file in the Heimdall Data directory:
tar -xzvf heimdall-snapshot-2021-11-08.tar.gz -C /var/lib/heimdall/data/
```

## Снимок Bor {#bor-snapshot}

Вначале вам необходимо настроить нод в соответствии с **предварительными требованиями** согласно руководству по настройке нода. Прежде чем начать синхронизацию сервисов для Bor, выполните приведенные ниже шаги для использования снимка:

1. Загрузите снимок Bor в формате файла tar на виртуальную машину, запустив следующую команду:
```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-08.tar.gz
```

2. Чтобы распаковать файл tar в каталог данных Bor, запустите следующую команду:

```
// You must ensure you are running this command before you start the Bor service on your node.
// If your Bor service has started, please stop the service and run the following command:
// Once unpacking is complete, you can start the Bor service again.

tar -xzvf <snapshot file> -C <BOR_DATA_DIRECTORY>

// If your bor data directory is different
// please replace the directory name in the command for starting the Bor service.
// When this command completes, you may delete the tar file to reclaim space.

// For example, this will unpack the tar file in the Bor data directory:
tar -xzvf bor-fullnode-snapshot-2022-11-08.tar.gz -C /var/lib/bor/data/bor/chaindata
```

:::note

`aria2c`Метод используется для быстрой загрузки снимков. Существует альтернативный способ, когда загруженные снимки могут быть напрямую извлечены без какого-либо вмешательства.

**Шаги для этого:**


```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c     https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::