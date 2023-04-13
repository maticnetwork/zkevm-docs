---
id: snapshot-instructions-heimdall-bor
title: Heimdall- und Bor-Snapshots
description: Anleitung für Heimdall- und Bor-Snapshots für eine schnellere Synchronisierung.
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

Wenn du einen neuen Sentry, Validator oder vollständigen Knotenserver einrichtest, solltest du einen Snapshot für eine schnellere Synchronisierung verwenden, ohne über das Netzwerk synchronisieren zu müssen. Mit Snapshots sparst du dir sowohl mit Heimdall als auch mit Bor mehrere Tage.

:::tip

Für den neuesten Snapshot besuchen Sie bitte [<ins>Polygon Chains Snapshots</ins>](https://snapshot.polygon.technology/).

:::

## Heimdall-Snapshot {#heimdall-snapshot}

Zunächst musst du deinen Knoten mit **Voraussetzungen** laut unserem Leitfaden zur Einrichtung von Knoten einrichten. Bevor du Dienste startest, die Heimdall synchronisieren soll, befolge die unten stehenden Schritte, um den Snapshot zu verwenden:

1. Lade die tar-Datei des Snapshots von Heimdall auf deine VM herunter, indem du den folgenden Befehl ausführst:

```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-08.tar.gz
```

2. Um die tar-Datei im Heimdall-Datenverzeichnis zu entpacken, führe den folgenden Befehl aus:
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

## Bor-Snapshot {#bor-snapshot}

Zunächst musst du deinen Knoten mit **Voraussetzungen** laut unserem Leitfaden zur Einrichtung von Knoten einrichten. Bevor du Dienste startest, die Bor synchronisieren soll, befolge die unten stehenden Schritte, um den Snapshot zu verwenden:

1. Lade die Snapshot-tar-Datei von Bor auf deine VM herunter, indem du den folgenden Befehl ausführt:
```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-08.tar.gz
```

2. Um die tar-Datei im Bor-Datenverzeichnis zu entpacken, führe den folgen Befehl aus:

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

Die `aria2c`Methode wird zum schnellen Herunterladen von Snapshots verwendet. Es gibt eine andere Möglichkeit, in der die heruntergeladenen Snapshots direkt extrahiert werden können, ohne dass es eingreifen kann.

**Schritte dafür sind:**


```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c     https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::