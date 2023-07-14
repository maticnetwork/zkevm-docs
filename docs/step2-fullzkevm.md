---
id: step2-fullzkevm
title: Install Dependencies And Mainnet Files
sidebar_label: Install Dependencies
description: The second ste on launching your own zkEVM network on the Goerli testnet.
keywords:
  - polygon
  - zkEVM
  - zkNode
  - deploy full zkevm
---

Continue with the **Second Step** of this Deployment-Guide where you install dependencies and download mainnet files. 




## Install Dependencies

1. First, install the following dependencies:

    ```bash
    # APT dependencies
    sudo apt update -y
    sudo apt install -y tmux git curl unzip jq docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    # Docker
    sudo usermod -aG docker $USER
    newgrp docker && newgrp $USER

    # Node.js (NVM)
    curl -o- <https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh> | bash
    source ~/.bashrc
    nvm install 16
    node -v

    # Go
    wget <https://go.dev/dl/go1.20.4.linux-amd64.tar.gz>
    sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.20.4.linux-amd64.tar.gz
    rm -rf go1.20.4.linux-amd64.tar.gz
    ```

2. Next, add these to your `.profile`:

    ```bash
    echo '
    export ZKEVM_NET=mainnet
    export ZKEVM_DIR=~/zkevm/zkevm-node
    export ZKEVM_CONFIG_DIR=~/zkevm/zkevm-config

    [ -d "/usr/local/go/bin" ] && PATH="/usr/local/go/bin:$PATH"
    ' >> ~/.profile
    source .profile
    ```

3. Lastly, confirm the installation of Golang by running this command: ```$ go version```



## Download Mainnet Files

Next step in the process is to download the zkEVM Mainnet files. This download is over **70GB**, so it's recommended to execute the wget command in a tmux or byobu session to handle any network interruptions:

```bash
tmux
wget <https://de012a78750e59b808d922b39535e862.s3.eu-west-1.amazonaws.com/v1.1.0-rc.1-fork.4.tgz>
ctrl + d
```

Once the download is finished, you should extract the files using the following command:

```bash
tar xzvf v1.1.0-rc.1-fork.4.tgz
```



