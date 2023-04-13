---
id: snapshot-instructions-heimdall-bor
title: Instantanés de Heimdall et de Bor
description: Instructions d'instantané de Heimdall et de Bor pour une synchronisation plus rapide.
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

Lors de la configuration d'un nouveau serveur de type sentinelle, validateur ou nœud complet, il est recommandé d'utiliser un instantané pour une synchronisation plus rapide sans avoir à effectuer une synchronisation sur le réseau. L'utilisation d'instantanés vous fera gagner plusieurs jours pour Heimdall et Bor.

:::tip

Pour les derniers instantanés, veuillez visiter les [<ins>Snapshots de chaînes Polygon </ins>](https://snapshot.polygon.technology/).

:::

## Instantané de Heimdall {#heimdall-snapshot}

Tout d'abord, vous devez configurer votre nœud avec **prerequisites** comme indiqué dans le guide de configuration des nœuds. Avant de lancer les services de synchronisation de Heimdall, suivez les étapes ci-dessous pour utiliser l'instantané:

1. Téléchargez le fichier tar snapshot de Heimdall sur votre VM en exécutant la commande suivante:

```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-08.tar.gz
```

2. Pour décompresser le fichier tar dans le répertoire de données Heimdall, exécutez la commande suivante:
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

## Instantané Bor {#bor-snapshot}

Tout d'abord, vous devez configurer votre nœud avec **prerequisites**, comme indiqué dans le guide de configuration des nœuds. Avant de lancer les services de synchronisation de Bor, suivez les étapes ci-dessous pour utiliser l'instantané:

1. Téléchargez le fichier tar snapshot de Bor sur votre VM en exécutant la commande suivante:
```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-08.tar.gz
```

2. Pour décompresser le fichier tar dans le répertoire Bor Data, exécutez la commande suivante:

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

La `aria2c`méthode est utilisée pour télécharger des instantanés plus rapidement. Il existe une autre façon où les instantanés téléchargés peuvent être directement extraits sans aucune intervention.

**Étapes pour cela:**


```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c     https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::