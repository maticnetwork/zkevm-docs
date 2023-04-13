---
id: snapshot-instructions-heimdall-bor
title: Instantáneas de Heimdall y Bor
description: Instrucciones para instantáneas de Heimdall y Bor para una sincronización más rápida
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

Cuando configures un nuevo servidor de nodo completo, validador o centinela, te recomendamos que utilices una instantánea para sincronizar más rápidamente sin tener que sincronizar sobre la red. El uso de instantáneas te ahorrará varios días tanto con Heimdall como con Bor.

:::tip

Para la última instantánea, visita [<ins>las instantáneas de las cadenas de Polygon</ins>](https://snapshot.polygon.technology/).

:::

## Instantánea de Heimdall {#heimdall-snapshot}

Primero, tienes que configurar el nodo con los **prerrequisitos** indicados en la guía de configuración de nodos. Antes de iniciar los servicios de sincronización de Heimdall, sigue los siguientes pasos para usar la instantánea:

1. Descarga el archivo TAR de la instantánea de Heimdall en tu máquina virtual (VM) ejecutando el siguiente comando:

```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-08.tar.gz
```

2. Para descomprimir el archivo TAR en el directorio de datos de Heimdall, ejecuta el siguiente comando:
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

## Instantánea de Bor {#bor-snapshot}

Primero, tienes que configurar el nodo con los **prerrequisitos** indicados en la guía de configuración de nodos. Antes de iniciar los servicios de sincronización de Bor, sigue los siguientes pasos para usar la instantánea:

1. Descarga el archivo TAR de la instantánea de Bor en tu máquina virtual ejecutando el siguiente comando:
```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-08.tar.gz
```

2. Para descomprimir el archivo TAR en el directorio de datos de Bor, ejecuta el siguiente comando:

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

El `aria2c`método se utiliza para descargar las instantáneas más rápido. Existe una forma alternativa en la que las instantáneas descargadas se pueden extraer directamente sin ninguna intervención.

**Pasos para eso:**


```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c     https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::