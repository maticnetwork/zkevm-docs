---
id: snapshot-instructions-heimdall-bor
title: Heimdall and Bor Snapshots
description: Snapshot Instructions for Heimdall and Bor
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When setting up a new sentry, validator, or full node server, it is recommended that you use a snapshot for faster syncing without having to sync over the network. Using snapshots will save you several days for both Heimdall and Bor.

:::note For the latest snapshot, please visit [here](https://snapshots.matic.today). :::

## Heimdall Snapshot

First, you need to set up your node with **pre-requisites** as per the node setup guide. Before you start services for Heimdall to sync, follow the steps below to use the snapshot:

1. Download the snapshot tar file of Heimdall on your VM by running the following command:

```
wget -c <snapshot url>

// For example, this will download the snapshot of Heimdall:
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2021-09-12.tar.gz
```

2. To unpack the tar file in the Heimdall data directory, run the following command:
```
// You must ensure you are running this command
// before you start the Heimdall service on your node.
// If your Heimdall service has started, please stop the service and run the following command:
// Once unpacking is complete, you can start the Heimdall service again:
tar -xzvf <snapshot file> -C <HEIMDALL_DATA_DIRECTORY>

// If your Heimdall data directory is different,
// please replace the directory name in the command for starting the Heimdall service.
// When this command completes, you may delete the tar file to reclaim space.

// For example, this will unpack the tar file in the Heimdall Data directory:
tar -xzvf heimdall-snapshot-2021-09-12.tar.gz -C ~/.heimdalld/data/
```

## Bor Snapshot

First, you need to set up your node with **pre-requisites**, as per the node setup guide. Before you start services for Bor to sync, follow the steps below to use the snapshot:

1. Download the snapshot tar file of Bor on your VM by running the following command:
```
wget -c <snapshot url>

// For example:
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-pruned-snapshot-2021-09-08.tar.gz
```
2. To unpack the tar file in the Bor Data directory, run the following command:

```
// You must ensure you are running this command
// before you start the Bor service on your node.
// If your Bor service has started, please stop the service and run the following command:
// Once unpacking is complete, you can start the Bor service again.

tar -xzvf <snapshot file> -C <BOR_DATA_DIRECTORY>

// If your bor data directory is different
// please replace the directory name in the command for starting the Bor service.
// When this command completes, you may delete the tar file to reclaim space.

// For example, this will unpack the tar file in the Bor data directory:
tar -xzvf bor-pruned-snapshot-2021-09-08.tar.gz -C ~/.bor/data/bor/chaindata
```
