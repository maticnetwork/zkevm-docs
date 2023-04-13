---
id: client-setup
title: Set up an Archive Node Client
sidebar_label: Set up an Archive Node Client
description: "System requirements and client setup."
keywords:
  - erigon
  - archive
  - node
  - docs
  - polygon
  - client
image: https://wiki.polygon.technology/img/polygon-logo.png
---

## System Requirements

### Archive Node

- 16-core CPU
- 64 GB RAM
- Basically io1 or above with at least 20k+ iops and raid-0 based disk structure

### Erigon Client

- For an Archive node of Polygon Mainnet: 5TB
- For an Archive node of Polygon Mumbai: 1TB
- SSD or NVMe. Bear in mind that SSD performance deteriorates when close to capacity
- RAM: >= 16GB, 64-bit architecture
- Golang version >= 1.18, GCC 10+

:::note HDD not recommended

On HDDs, Erigon will always stay N blocks behind the chain tip, but will not fall behind.

:::

## Erigon Client Setup

### How to Install

Run the following commands to install Erigon:

```bash
git clone --recurse-submodules -j8 https://github.com/maticnetwork/erigon.git
cd erigon
git checkout v0.0.5
make erigon
```

This should create the binary at `./build/bin/erigon`

Use the tag `v0.0.5` on our forked repo to have a stable version.

### How to Start

To start Erigon, run:

```bash
erigon --chain=mumbai
```

- Use `chain=mumbai` for Mumbai testnet
- Use `chain=bor-mainnet` for Polygon Mainnet

### How to Configure Erigon

- If you want to store Erigon files in a non-default location, use `-datadir`

    ```
    erigon --chain=mumbai --datadir=<your_data_dir>
    ```

- If you are not using local **heimdall**, use `-bor.heimdall=<your heimdall url>`. By default, it will try to connect to `localhost:1317`.

    ```makefile
    erigon --chain=mumbai --bor.heimdall=<your heimdall url> --datadir=<your_data_dir>
    ```

    - If you want to connect to Polygon Mumbai Testnet use: [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology)

    - For Polygon Mainnet: [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology)

### Tips for Faster Sync

- Use the machine with high IOPS and RAM for the faster initial sync
- Use the below commands to increase snapshot download/upload speed:

```makefile
--torrent.upload.rate="512mb" --torrent.download.rate="512mb"
```

Replace `512` with whatever bandwidth your machine can manage.
