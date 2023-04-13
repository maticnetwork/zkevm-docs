---
id: full-node
title: Run a full node with Packages
description: Learn how to run a full node on the Polygon network using utility scripts.
keywords:
  - docs
  - polygon wiki
  - full node
  - mainnet
  - heimdall
  - bor
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';


This document guides you through the process of starting and running a full node on the Polygon network from a package.

For the system requirements, see [Minimum Technical Requirements](technical-requirements.md).

:::tip

Steps in this guide involve waiting for the Heimdall and Bor services to fully sync. This process takes several days to complete.

Alternatively, you can use a maintained snapshot, which will reduce the sync time to a few hours. For detailed instructions, see [<ins>Snapshot Instructions for Heimdall and Bor</ins>](/docs/operate/snapshot-instructions-heimdall-bor).

For snapshot download links, see the [<ins>Polygon Chains Snapshots</ins>](https://snapshot.polygon.technology/) page.

:::

## Overview

- Prepare the Full Node machine.
- Install Heimdall and Bor packages on the Full Node machine.
- Configure the Full node.
- Start the Full node.
- Check node health with the community.

:::note
You have to follow the exact outlined sequence of actions, otherwise you will run into issues.
:::

## Install packages

#### Prerequisites

- One machine is needed.
- Bash is installed on the machine.

#### Heimdall

- Install the default latest version of sentry for Mainnet:

    ```shell
    curl -L https://raw.githubusercontent.com/maticnetwork/install/main/heimdall.sh | bash
    ```

    or install a specific version, node type (`sentry` or `validator`), and network (`mainnet` or `testnet`). All release versions can be found on
    [Heimdall GitHub repository](https://github.com/maticnetwork/heimdall/releases).

    ```shell
    curl -L https://raw.githubusercontent.com/maticnetwork/install/main/heimdall.sh | bash -s -- <version> <network> <node_type>
    # Example:
    # curl -L https://raw.githubusercontent.com/maticnetwork/install/main/heimdall.sh | bash -s -- v0.3.0 mainnet sentry
    ```

#### Bor

- Install the default latest version of sentry for Mainnet:

    ```shell
    curl -L https://raw.githubusercontent.com/maticnetwork/install/main/bor.sh | bash
    ```

    or install a specific version, node type (`sentry` or `validator`), and network (`mainnet` or `testnet`). All release versions could be found on
    [Bor Github repository](https://github.com/maticnetwork/bor/releases).

    ```shell
    curl -L https://raw.githubusercontent.com/maticnetwork/install/main/bor.sh | bash -s -- <version> <network> <node_type>

    # Example:
    # curl -L https://raw.githubusercontent.com/maticnetwork/install/main/bor.sh | bash -s -- v0.3.3 mainnet sentry
    ```


## Configuration

In this section, we will go through steps to initialize and customize configurations nodes.

:::caution

Bor and Heimdall 0.3.0 use standardized paths for configuration files and chain data. If you have existing
config files and chain data on your node, please skip the [Configure Heimdall](#configure-heimdall) section below and jump directly to **[Migration](#upgrade-from-02x-to-03x) section** to learn about migrating configs and data to standardized file locations.

:::

### Configure Heimdall

- Initialize Heimdall configs

```shell
# For mainnet
sudo -u heimdall heimdalld init --chain=mainnet --home /var/lib/heimdall

# For testnet
sudo -u heimdall heimdalld init --chain=mumbai --home /var/lib/heimdall
```

- You will need to add a few details in the `config.toml` file. To open the `config.toml` file run the following command `vi /var/lib/heimdall/config/config.toml`

    - Now in the config file you will have to change `Moniker`

    ```shell
    moniker=<enter unique identifier> For example, moniker=my-sentry-node
    ```

    - Change the value of **Prometheus** to `true`
    - Set the `max_open_connections` value to `100`

    Make sure you keep the proper formatting when you make the changes above.

### Upgrade from 0.2.x to 0.3.x

Bor 0.3.0 and Heimdall 0.3.0 uses new CLIs and path standards. It is recommended to set up everything from a new machine.
However, if you still want to perform upgrade on existing node, you need to follow one-time migration steps
outlined below. If you are installing everything from a new machine, you can skip this section and continue to [Configure service files](#configure-service-files-for-bor-and-heimdall).

- Stop existing Heimdall and Bor services:

    ```shell
    sudo service bor stop
    sudo service heimdalld stop
    sudo service heimdalld-rest-server stop
    sudo service heimdalld-bridge stop
    ```

- Create a backup folder in case something went wrong:

    ```shell
    mkdir ./backup
    mkdir ./backup/bin
    mkdir -p ./backup/go/bin
    ```

- Move old binaries:

    ```shell
    sudo mv /usr/bin/bor ./backup/bin
    sudo mv /usr/bin/heimdalld ./backup/bin
    sudo mv /usr/bin/heimdallcli ./backup/bin
    sudo mv /usr/bin/bridge ./backup/bin
    sudo mv $(go env GOPATH)/bin/bor ./backup/go/bin
    sudo mv $(go env GOPATH)/bin/heimdalld ./backup/go/bin
    sudo mv $(go env GOPATH)/bin/heimdallcli ./backup/go/bin
    sudo mv $(go env GOPATH)/bin/bridge ./backup/go/bin
    ```

- Move old service files:

    ```shell
    sudo mv /etc/systemd/system/bor.service ./backup
    sudo mv /etc/systemd/system/heimdalld.service ./backup
    sudo mv /etc/systemd/system/heimdalld-rest-server.service ./backup
    sudo mv /etc/systemd/system/heimdalld-bridge.service ./backup
    ```

- Migrate heimdall and bor directory to `/var/lib` and change ownership:
    ```shell
    sudo mv ~/.heimdalld /var/lib/heimdall
    sudo mv ~/.bor /var/lib/bor
    sudo chown -R heimdall /var/lib/heimdall
    sudo chown -R bor /var/lib/bor
    ```

    In case data copying is too slow or original data folder is mounted on a different device, you can create symlinks

    ```shell
    sudo chown -R heimdall ~/.bor
    sudo chown -R bor ~/.heimdalld
    sudo rm -rf /var/lib/heimdall
    sudo ln -nfs ~/.heimdalld /var/lib/heimdall
    sudo ln -nfs ~/.bor /var/lib/bor
    sudo chown -R heimdall /var/lib/heimdall
    sudo chown -R bor /var/lib/bor
    ```

- Copy configurations in `node/bor/start.sh` to bor configuration file `/var/lib/bor/config.toml`. Note that some
  flags are renamed in the new CLI, you can find the documentation for new CLI [here](https://github.com/maticnetwork/bor/tree/master/docs/cli) and sample configuration file in [launch repository](https://github.com/maticnetwork/launch).

  You can use [this util script](https://github.com/maticnetwork/bor/blob/develop/scripts/getconfig.sh) to convert `start.sh` to a `config.toml` file on your host. Example usage:

```bash
    $ git clone https://github.com/maticnetwork/bor.git
    $ cd bor/scripts
    $ BOR_DIR=/var/lib/bor ./getconfig.sh
    * Path to start.sh: /home/ubuntu/node/bor/start.sh
    * Your validator address (e.g. 0xca67a8D767e45056DC92384b488E9Af654d78DE2), or press Enter to skip if running a sentry node: 0xca67a8D767e45056DC92384b488E9Af654d78DE2
    Thank you, your inputs are:
    Path to start.sh: /home/ubuntu/node/bor/start.sh
    Address: 0xca67a8D767e45056DC92384b488E9Af654d78DE2
    Path to the config file: /home/ubuntu/node/bor/start-config.toml
    ...

    $ sudo cp /home/ubuntu/node/bor/start-config.toml /var/lib/bor/config.toml
    $ sudo chown bor /var/lib/bor/config.toml
```

### Configure service files for bor and heimdall

After successfully installing Bor and Heimdall through [packages](#install-with-packages-recommended), their service file could be found under `/lib/systemd/system`, and Bor's config
file could be found under `/var/lib/bor/config.toml`.
You will need to check and modify these files accordingly.

- Make sure the chain is set correctly in `/lib/systemd/system/heimdalld.service` file. Open the file with following command `sudo vi /lib/systemd/system/heimdalld.service`

    - In the service file, set `--chain` to `mainnet` or `mumbai` accordingly

  Save the changes in `/lib/systemd/system/heimdalld.service`.

- Make sure the chain is set correctly in `/var/lib/bor/config.toml` file. Open the file with following command `sudo vi /var/lib/bor/config.toml`

    - In the config file, set `chain` to `mainnet` or `mumbai` accordingly.

    - To enable Archive mode you can optionally enable the following flags:

      ```
      gcmode "archive"

      [jsonrpc]
        [jsonrpc.ws]
          enabled = true
          port = 8546
          corsdomain = ["*"]
      ```

  Save the changes in `/var/lib/bor/config.toml`.


## Start services

Reloading service files to make sure all changes to service files are loaded correctly.

```shell
sudo systemctl daemon-reload
```

Start Heimdall, Heimdall rest server, and Heimdall bridge.

```shell
sudo service heimdalld start
```

You can also check Heimdall logs with command

```shell
journalctl -u heimdalld.service -f
```

Now you need to make sure that **Heimdall is synced** completely and only then Start Bor. If you start Bor without Heimdall syncing completely, you will run into issues frequently.

- To check if Heimdall is synced
    - On the remote machine/VM, run `curl localhost:26657/status`
    - In the output, `catching_up` value should be `false`

Now once Heimdall is synced, run

```shell
sudo service bor start
```

You can check Bor logs via command

```shell
journalctl -u bor.service -f
```
