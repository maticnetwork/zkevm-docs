---
id: snapshot-instructions-heimdall-bor
title: Snapshot Heimdall e Bor
description: Snapshot Heimdall e Bor - Istruzioni per una sincronizzazione più rapida.
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

Quando si configura un nuovo server sentry, validatore o full node, si consiglia di utilizzare uno snapshot per velocizzare la sincronizzazione senza doverla effettuare in rete. L'utilizzo degli snapshot ti farà risparmiare diversi giorni sia per Heimdall che per Bor.

:::tip

Per le ultime snapshot, visita [<ins>le istantanee delle Polygon Chains</ins>](https://snapshot.polygon.technology/).

:::

## Snapshot Heimdall {#heimdall-snapshot}

Per prima cosa, devi configurare il tuo nodo con i **prerequisiti** come indicato nella guida alla configurazione del nodo. Prima di avviare i servizi per la sincronizzazione di Heimdall, segui i passaggi seguenti per utilizzare lo snapshot:

1. Scarica il file snapshot tar di Heimdall sulla tua macchina virtuale eseguendo il seguente comando:

```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-08.tar.gz
```

2. Per decomprimere il file tar nella directory dei dati di Heimdall, esegui il seguente comando:
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

## Snapshot Bor {#bor-snapshot}

Per prima cosa, devi configurare il tuo nodo con i **prerequisiti**, come indicato nella guida alla configurazione del nodo. Prima di avviare i servizi per la sincronizzazione di Bor, segui i passi seguenti per utilizzare lo snapshot:

1. Scarica il file snapshot tar di Bor sulla tua macchina virtuale eseguendo il seguente comando:
```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-08.tar.gz
```

2. Per decomprimere il file tar nella directory Bor Data, esegui il seguente comando:

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

Il `aria2c`metodo viene utilizzato per scaricare le snapshot più velocemente. C'è un modo alternativo in cui le snapshot scaricate possono essere direttamente estratte senza alcun intervento.

**Passaggi per questo:**


```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c     https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::