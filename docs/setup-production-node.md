---
id: setup-production-node
title: Setup Production zkNode
sidebar_label: Production zkNode
description: Detailed guide on setting up a live/production Polygon zkEVM Node using Docker.
keywords:
  - polygon
  - zkEVM
  - zkNode
  - setup production zknode
---

Polygon zkEVM is now available on the Mainnet Beta for developers to launch smart contracts, execute transactions, and experiment with the network. This tutorial extends the exploration by allowing developers to **launch their own node on the zkEVM Public Testnet**.

Before we begin, this document is fairly technical and requires prior exposure to **Docker** and **CLI**. Post spinning up your zkNode instance, **you will be able to run the Synchronizer and utilize the JSON-RPC interface**.

:::info

Sequencer and Prover functionalities are not covered in this document as they are still undergoing development and rigorous testing.

:::

## Prerequisites

This tutorial assumes that you have `docker-compose` already installed. If you need any help with the installation, please check the [official docker-compose installation guide](https://docs.docker.com/compose/install/).

It is highly recommended that you create a separate folder for installing and working around the zkNode. We won't be cloning any repository (unlike [<ins>local zkNode setup</ins>](setup-local-node.md)) so it's better to create a folder before starting the zkNode setup: ```mkdir -p /$HOME/zkevm-node```.

### Minimum System Requirements

:::caution

zkProver does not work on ARM-based Macs yet, and using WSL/WSL2 on Windows is not advisable. Currently, zkProver optimizations require CPUs that support the AVX2 instruction, which means some non-M1 computers, such as AMD, won't work with the software regardless of the OS.

:::

- 16GB RAM
- 4-core CPU
- 20GB Storage (This will increase over time)

:::info 
**About Batch Rate**

Batches are closed every 10s, or whenever they are full (which can happen when there are high network loads).
Also, how frequent batches are closed is subject to change as it depends on the prevailing configurations. 
The batch rate will always need to be updated accordingly.

:::

### Network Components

Here is a list of **crucial network components** that are required before you can run the zkNode:

- **Ethereum Node** - Use geth or any service providing a JSON RPC interface for accessing the L1 network
- **zkEVM-Node (or zkNode)** - L2 Network
  - **Synchronizer** - Responsible for synchronizing data between L1 and L2
  - **JSON RPC Server** - Interface to L2 network

Let's set up each of the above components!

## Ethereum Node Setup

The Ethereum Node will be the first component we will set up. It is the first because synchronizing the Ethereum network will take a long time, so we will keep it synchronized while we set up the other components to take advantage of this required time.

There are numerous ways to set up an Ethereum L1 environment; we will use Geth for this. We recommend Geth, but any Goerli node should do. Follow the instructions provided in this [guide to setup and install Geth](https://geth.ethereum.org/docs/getting-started/installing-geth).

If you plan to have more than one zkNode in your infrastructure, we advise using a machine that is specifically dedicated to this component.

## zkNode Setup

Once the L1 installation is complete, we can start the zkNode setup. This is the most straightforward way to run a zkEVM node and it's fine for most use cases. However, if you want to provide service to a large number of users, you should modify the default configuration.

Furthermore, this method is purely subjective and feel free to run this software in a different manner. For example, Docker is not required, you could simply use the Go binaries directly.

Let's start setting up our zkNode:

1. Launch your command line/terminal and set the variables using below commands:

  ```bash
  # define the network (mainnet soon!)
  ZKEVM_NET=testnet

  # define installation path
  ZKEVM_DIR=./path_to_install

  # define your config directory
  ZKEVM_CONFIG_DIR=./path_to_config
  ```

2. Download and extract the artifacts. Note that you may need to [install unzip](https://formulae.brew.sh/formula/unzip) before running this command.

  ```bash
  curl -L https://github.com/0xPolygonHermez/zkevm-node/releases/latest/download/$ZKEVM_NET.zip > $ZKEVM_NET.zip && unzip -o $ZKEVM_NET.zip -d $ZKEVM_DIR && rm $ZKEVM_NET.zip
  ```

3. Copy the `example.env` file with the environment parameters: ```cp $ZKEVM_DIR/$ZKEVM_NET/example.env $ZKEVM_CONFIG_DIR/.env```

4. The `example.env` file **must be modified according to your configurations**. Edit the .env file with your favourite editor (we'll use nano in this guide): ```nano $ZKEVM_CONFIG_DIR/.env```

  ```bash
  # URL of a JSON RPC for Goerli
  ZKEVM_NODE_ETHERMAN_URL = "http://your.L1node.url"

  # PATH WHERE THE STATEDB POSTGRES CONTAINER WILL STORE PERSISTENT DATA
  ZKEVM_NODE_STATEDB_DATA_DIR = "/path/to/persistent/data/stetedb"

  # PATH WHERE THE POOLDB POSTGRES CONTAINER WILL STORE PERSISTENT DATA
  ZKEVM_NODE_POOLDB_DATA_DIR = "/path/to/persistent/data/pooldb"
  ```

5. To run the zkNode instance, run the following command:

  ```bash
  sudo docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d
  ```

6. Run this command to check if everything went well and all the components are running properly:

  ```bash
  docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
  ```

  You will see a list of the following containers:
    - **zkevm-rpc**
    - **zkevm-sync**
    - **zkevm-state-db**
    - **zkevm-pool-db**
    - **zkevm-prover**

7. You should now be able to run queries to the JSON-RPC endpoint at `http://localhost:8545`.

## Testing

Run the following query to get the most recently synchronized L2 block; if you call it every few seconds, you should see the number grow:

```bash
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}' http://localhost:8545
```

## Stopping the zkNode

Use the below command to stop the zkNode instance:

```bash
sudo docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml down
```

## Updating the zkNode

To update the zkNode software, repeat the setup steps, being careful not to overwrite the configuration files that you have modified.

In other words, instead of running ```cp $ZKEVM_DIR/testnet/example.env $ZKEVM_CONFIG_DIR/.env```, check if the variables of ```$ZKEVM_DIR/testnet/example.env``` have been renamed or there are new ones, and update ```$ZKEVM_CONFIG_DIR/.env``` accordingly.

## Troubleshooting

- It's possible that the machine you're using already uses some of the necessary ports. In this case you can change them directly in `$ZKEVM_DIR/testnet/docker-compose.yml`.

- If one or more containers are crashing, please check the logs using the below command:

    ```bash
    docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs <cointainer_name>
    ```
