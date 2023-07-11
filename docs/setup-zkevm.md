---
id: setup-zkevm
title: Deploy your own zkEVM on Goerli Testnet
sidebar_label: Deploy Full zkEVM
description: Detailed guide on launching your own zkEVM network on the Goerli testnet.
keywords:
  - polygon
  - zkEVM
  - zkNode
  - deply full zkevm
---

Welcome to the documentation for setting up a full Zero-Knowledge Ethereum Virtual Machine (zkEVM) network on the Goerli testnet. This guide will walk you through the necessary steps to configure and start your own fully functional zkEVM L2 Testnet on the Goerli network.

:::caution

The instructions in this document are subject to frequent updates as the zkEVM software is still in early development stages. Please report [<ins>here</ins>](https://support.polygon.technology/support/tickets/new) or reach out to our [<ins>support team on Discord</ins>](https://discord.com/invite/0xPolygon) if you encounter any issues.

:::

## Prerequisites

### Environment Variables

You'll need the following variables:

- INFURA_PROJECT_ID
- ETHERSCAN_API_KEY
- Public IP address
- L1 Goerli node RPC
- Goerli address with **15 GöETH**

:::tip

Follow the instructions provided [<ins>here</ins>](#goerli-full-node-setup) to set up your own Goerli full node. It will increase the network efficiency as we will be sending multiple transactions to the Goerli network (or L1, in our case).

:::

### Technical Specifications

The zkEVM network is resource-intensive, so we recommend two sets of resources depending on whether you're using a full or mock prover.

:::info

Mock Prover does not generate a zero-knowledge proof or practically prove anything. It simply adds a "Valid ✅" check for each batch of transactions sent from L2 so that it can be sent to the L1 network.

:::

- For a **Mock Prover**, the required resources are:

    - 4-core CPU
    - 8GB RAM (16GB recommended)

- For a **Full Prover**, the required resources are:

    - 96-core CPU
    - Minimum 768GB RAM

For example, a suitable virtual machine in public cloud environments like AWS would be: https://aws.amazon.com/ec2/instance-types/r6a/
- r6a.xlarge for **Mock Prover**
- r6a.24xlarge for **Full Prover**

The initial free disk space requirement is minimal (<1TB), but you should monitor available space as the network is always adding more data.

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

## Deploying Contracts

Clone the contracts from our [GitHub repository](https://github.com/0xPolygonHermez/zkevm-contracts):

```bash
git clone <https://github.com/0xPolygonHermez/zkevm-contracts.git>
cd zkevm-contracts
npm i
```

### Create Wallets

Next, create a `wallets.js` file with the following content:

```js
const ethers = require("ethers");

async function main() {
    const arrayNames = ["## Deployment Address", "\\n\\n## Trusted sequencer", "\\n\\n## Trusted aggregator"];
    for (let i = 0; i < arrayNames.length; i++) {
        const wallet = ethers.Wallet.createRandom();
        console.log(arrayNames[i]);
        console.log(`Address: ${wallet.address}`);
        console.log(`PrvKey: ${wallet._signingKey().privateKey}`);
        console.log(`mnemonic: "${wallet._mnemonic().phrase}"`);

        const keystoreJson = await wallet.encrypt("password");
        console.log(`keystore: ${keystoreJson}`);
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
```

Don't forget to generate the wallets using below command:

```bash
node wallets.js | tee wallets.txt
```

### Prepare Deploy Configuration

Edit the environment variables:

```bash
cp .env.example .env        # copies .env.example file into .env
nano .env                   # opens .env file for editing
```

Set these variables:

```bash
MNEMONIC="..."              # from wallets.txt Deployment Address mnemonic
INFURA_PROJECT_ID="..."     # your Infura project ID
ETHERSCAN_API_KEY="..."     # your Etherscan API key
```

Next, open the `deploy_parameters.json` file in nano editor:

```bash
cd deployment
cp deploy_parameters.json.example deploy_parameters.json
nano deploy_parameters.json
```

Fill in the relevant details in the `deploy_parameters.json`:

```json
{
 "realVerifier": true,
 "trustedSequencerURL": "<http://X.X.X.X:8545>", // your public IP
 "networkName": "zkevm",
 "version": "0.0.1",
 "trustedSequencer": "", // from wallets.txt Trusted sequencer
 "chainID": 42069, // put your preferred id
 "trustedAggregator": "", // from wallets.txt aggregator sequencer
 "trustedAggregatorTimeout": 604799,
 "pendingStateTimeout": 604799,
 "forkID": 4,
 "admin": "", // from wallets.txt Deployment Address
 "zkEVMOwner": "", // from wallets.txt Deployment Address
 "timelockAddress": "", // from wallets.txt Deployment Address
 "minDelayTimelock": 1,
 "salt": "0x0000000000000000000000000000000000000000000000000000000000000000",
 "initialZkEVMDeployerOwner": "", // from wallets.txt Deployment Address
 "maticTokenAddress": "", // put an existing contract address or leave it empty to auto-deploy a new contract
 "zkEVMDeployerAddress": "", // put an existing contract address or leave it empty to auto-deploy a new contract
 "deployerPvtKey": "",
 "maxFeePerGas": "",
 "maxPriorityFeePerGas": "",
 "multiplierGas": ""
}
```

:::caution Get some GöETH

You will need to send 15 GöETH to the Deployment address listed in `wallets.txt`.

:::

Adjust the `gasPrice` according to the network status. For Goerli, you can check it with the following command, where you insert your Etherscan API key:

```bash
ETHERSCAN_API_KEY="" echo "$(($(printf "%d\\n" $(curl -s "<https://api-goerli.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=$ETHERSCAN_API_KEY>" | jq -r .result))/1000000000)) Gwei"
```

Edit `~/zkevm/zkevm-contracts/deployment/helpers/deployment-helpers.js` to adjust the `gasPrice` according to network status. It is recommended to add 50 Gwei to the current `gasPrice` to ensure transactions are processed quickly.

```js
const gasPriceKeylessDeployment = "50";     // 50 Gwei
```

### Deploy Contracts

```bash
npm run deploy:deployer:ZkEVM:goerli
npm run verify:deployer:ZkEVM:goerli
npm run deploy:testnet:ZkEVM:goerli
npm run verify:ZkEVM:goerli
```

The previous scripts will auto-deploy the MATIC token contract and the `zkEVMDeployer` contract if required.

You will see in the logs the verification of each smart contract deployed, but you can check it on etherscan too.

```html
https://goerli.etherscan.io/address/0x -> Put the Deployer address from wallets.txt
```

## zkNode Deployment

Run the following commands to create the following directories:

- `~/zkevm/data/statedb`
- `~/zkevm/data/pooldb`
- `~/zkevm/zkevm-config`
- `~/zkevm/zkevm-node`

```bash
mkdir -p ~/zkevm/data/{statedb,pooldb} ~/zkevm/zkevm-config ~/zkevm/zkevm-node
```

Next, populate the directories by fetching data from latest node releases:

```bash
curl -L <https://github.com/0xPolygonHermez/zkevm-node/releases/latest/download/$ZKEVM_NET.zip> > $ZKEVM_NET.zip && unzip -o $ZKEVM_NET.zip -d $ZKEVM_DIR && rm $ZKEVM_NET.zip
```

Copy the `example.env` file into `.env` file and open in nano editor:

```bash
cp $ZKEVM_DIR/$ZKEVM_NET/example.env $ZKEVM_CONFIG_DIR/.env
nano $ZKEVM_CONFIG_DIR/.env
```

In the `.env` file, set:

```bash
ZKEVM_NODE_ETHERMAN_URL = "<http://localhost:8845>"     # set a valid goerli RPC node
ZKEVM_NODE_STATEDB_DATA_DIR = "~/zkevm/data/statedb"
ZKEVM_NODE_POOLDB_DATA_DIR = "~/zkevm/data/pooldb"
```

### Approve MATIC Token for Sequencer

Run the below command to launch a Hardhat console connected to the Goerli network.

```bash
npx hardhat console --network goerli
```

Here, you can utilize the JavaScript environment to interact with the Goerli network. In the console, run the following (you can copy all the code in one go):

```js
const provider = ethers.getDefaultProvider("")  // set goerli RPC node
const privateKey = ''   // From wallet.txt Trusted sequencer
const wallet = new ethers.Wallet(privateKey, provider);

const maticTokenFactory = await ethers.getContractFactory('ERC20PermitMock', provider);
maticTokenContract = maticTokenFactory.attach("")   // From ~/zkevm/zkevm-contract/deployments/goerly_***/deploy_output.json maticTokenAddress
maticTokenContractWallet = maticTokenContract.connect(wallet)
await maticTokenContractWallet.approve("", ethers.utils.parseEther("100.0"))    // From ~/zkevm/zkevm-contract/deployments/goerly_***/deploy_output.json polygonZkEVMAddress
```

### Configure Genesis

Run the below commands to copy `genesis.json` file into appropriate location and open for editing:

```bash
cp ~/zkevm/zkevm-contracts/deployments/goerli_***/genesis.json ~/zkevm/zkevm-node/mainnet/config/environments/public/public.genesis.config.json
nano ~/zkevm/zkevm-node/mainnet/config/environments/public/public.genesis.config.json
```

Edit the file changing the following parameters from `~/zkevm/zkevm-contracts/deployments/goerli_***/deploy_output.json`. **Keep in mind that `polygonZkEVMGlobalExitRootAddress` is called `deploymentBlockNumber` in `deploy_output.json`**.

```json
{
  "l1Config" : {
    "chainId": 5,
    "polygonZkEVMAddress": "",
    "maticTokenAddress": "",
    "polygonZkEVMGlobalExitRootAddress": ""  // deploymentBlockNumber from ~/zkevm/zkevm-contracts/deployments/goerli_***/deploy_output.json
  },
 "genesisBlockNumber": 9050589,
 "root": "",
 "genesis": {}
}
```

### Update Node Config file

Edit `~/zkevm/zkevm-node/mainnet/config/environments/public/public.node.config.toml` with the following values. The config file is large and we'll update the documentation in the future to list only the updated parameters.

<details>
<summary>Click to expand the Node <code>config.toml</code> file</summary>

```bash
IsTrustedSequencer = true
[Log]
Environment = "development"
Level = "info"
Outputs = ["stderr"]

[StateDB]
User = "state_user"
Password = "state_password"
Name = "state_db"
Host = "zkevm-state-db"
Port = "5432"
EnableLog = false
MaxConns = 200

[Pool]
FreeClaimGasLimit = 1500000
MaxTxBytesSize=30132
MaxTxDataBytesSize=30000
DefaultMinGasPriceAllowed = 1000000000
MinAllowedGasPriceInterval = "5m"
PollMinAllowedGasPriceInterval = "15s"
        [Pool.DB]
        User = "pool_user"
        Password = "pool_password"
        Name = "pool_db"
        Host = "zkevm-pool-db"
        Port = "5432"
        EnableLog = false
        MaxConns = 200

[Etherman]
URL = ""    # put a valid Goerli node
MultiGasProvider = false
L1URL = ""  # put a valid Goerli node
L2URLs = ["http://zkevm-rpc:8545"]
        [Etherman.Etherscan]
                ApiKey = ""     # Etherscan api key

[RPC]
Host = "0.0.0.0"
Port = 8545
ReadTimeoutInSec = 60
WriteTimeoutInSec = 60
MaxRequestsPerIPAndSecond = 5000
SequencerNodeURI = ""
BroadcastURI = "http://3.144.195.147:61090"
DefaultSenderAddress = "0x1111111111111111111111111111111111111111"
EnableL2SuggestedGasPricePolling = true
        [RPC.WebSockets]
                Enabled = true
                Port = 8546

[Synchronizer]
SyncInterval = "2s"
SyncChunkSize = 100
trustedSequencerURL = ""

[MTClient]
URI = "zkevm-executor:50061"

[Executor]
URI = "zkevm-executor:50071"

[Metrics]
Host = "0.0.0.0"
Port = 9091
Enabled = true
ProfilingHost = "0.0.0.0"
ProfilingPort = 6060
ProfilingEnabled = false

[Sequencer]
WaitPeriodPoolIsEmpty = "1s"
WaitPeriodSendSequence = "15s"
LastBatchVirtualizationTimeMaxWaitPeriod = "10s"
BlocksAmountForTxsToBeDeleted = 100
FrequencyToCheckTxsForDelete = "12h"
MaxTxsPerBatch = 150
MaxBatchBytesSize = 129848
MaxCumulativeGasUsed = 30000000
MaxKeccakHashes = 468
MaxPoseidonHashes = 279620
MaxPoseidonPaddings = 149796
MaxMemAligns = 262144
MaxArithmetics = 262144
MaxBinaries = 262144
MaxSteps = 8388608
WeightBatchBytesSize = 1
WeightCumulativeGasUsed = 1
WeightKeccakHashes = 1
WeightPoseidonHashes = 1
WeightPoseidonPaddings = 1
WeightMemAligns = 1
WeightArithmetics = 1
WeightBinaries = 1
WeightSteps = 1
TxLifetimeCheckTimeout = "10m"
MaxTxLifetime = "3h"
MaxTxSizeForL1 = 131072
        [Sequencer.Finalizer]
                GERDeadlineTimeoutInSec = "2s"
                ForcedBatchDeadlineTimeoutInSec = "60s"
                SendingToL1DeadlineTimeoutInSec = "20s"
                SleepDurationInMs = "100ms"
                ResourcePercentageToCloseBatch = 10
                GERFinalityNumberOfBlocks = 0
                ClosingSignalsManagerWaitForCheckingL1Timeout = "10s"
                ClosingSignalsManagerWaitForCheckingGER = "10s"
                ClosingSignalsManagerWaitForCheckingForcedBatches = "10s"
                ForcedBatchesFinalityNumberOfBlocks = 0
                TimestampResolution = "15s"
        [Sequencer.DBManager]
                PoolRetrievalInterval = "500ms"
        [Sequencer.Worker]
                ResourceCostMultiplier = 1000

[SequenceSender]
WaitPeriodSendSequence = "5s"
LastBatchVirtualizationTimeMaxWaitPeriod = "5s"
MaxTxSizeForL1 = 131072
SenderAddress = "0x225c96B7dB4223f0244DcfC833e0bB9f40a948E4"
PrivateKeys = [{Path = "/pk/sequencer.keystore", Password = "password"}]

[Aggregator]
Host = "0.0.0.0"
Port = 50081
ForkId = 4
RetryTime = "5s"
VerifyProofInterval = "30s"
TxProfitabilityCheckerType = "acceptall"
TxProfitabilityMinReward = "1.1"
ProofStatePollingInterval = "5s"
SenderAddress = ""  # trustedAggregator from deploy_output.json
CleanupLockedProofsInterval = "2m"
GeneratingProofCleanupThreshold = "10m"

[EthTxManager]
ForcedGas = 0
PrivateKeys = [
        {Path = "/pk/sequencer.keystore", Password = "password"},
        {Path = "/pk/aggregator.keystore", Password = "password"}
]

[Database]
Database = "postgres"
User = "test_user"
Password = "test_password"
Name = "test_db"
Host = "zkevm-bridge-db"
Port = "5435"
MaxConns = 20

[BridgeController]
Store = "postgres"
Height = 32

[BridgeServer]
GRPCPort = "9090"
HTTPPort = "8080"

[NetworkConfig]
GenBlockNumber = 000000     # deploymentBlockNumber from deploy_output.json
PolygonZkEVMAddress = ""    # polygonZkEVMAddress from deploy_output.json
PolygonBridgeAddress = ""   # PolygonZkEVMBridge from genesis.json
PolygonZkEVMGlobalExitRootAddress = ""   # polygonZkEVMGlobalExitRootAddress from deploy_output.json
MaticTokenAddress = ""      # maticTokenAddress from deploy_output.json
L2PolygonBridgeAddresses = [""]         # PolygonZkEVMBridge from genesis.json
L1ChainID = 5               # Goerli chainID

[L2GasPriceSuggester]
Type = "default"
DefaultGasPriceWei = 100000000

[ClaimTxManager]
FrequencyToMonitorTxs = "1s"
PrivateKey = {Path = "/pk/sequencer.keystore", Password = "password"}
Enabled = true
```
</details>

### Add Wallets

```bash
nano zkevm-config/sequencer.keystore (from wallets.txt)
nano zkevm-config/aggregator.keystore (from wallets.txt)
```

### Edit DBs

Edit `~/zkevm/zkevm-node/mainnet/db/scripts/init_prover_db.sql` to match this:

```sql
CREATE DATABASE prover_db;
\connect prover_db;

CREATE SCHEMA state;

CREATE TABLE state.nodes (hash BYTEA PRIMARY KEY, data BYTEA NOT NULL);
CREATE TABLE state.program (hash BYTEA PRIMARY KEY, data BYTEA NOT NULL);

CREATE USER prover_user with password 'prover_pass';
GRANT CONNECT ON DATABASE prover_db TO prover_user;
ALTER USER prover_user SET SEARCH_PATH=state;
GRANT ALL PRIVILEGES ON SCHEMA state TO prover_user;
GRANT ALL PRIVILEGES ON TABLE state.nodes TO prover_user;
GRANT ALL PRIVILEGES ON TABLE state.program TO prover_user;
```

Save and exit the file once the changes have been made. The above SQL script will setup your databases for the zkEVM Node.

### Configure the Prover

Create the `~/zkevm/config.json` file and replace the `aggregatorClientHost` parameter with your **PUBLIC IP**:

<details>
<summary>Click to expand the <code>config.json</code> file</summary>

```json
{
    "runExecutorServer": false,
    "runExecutorClient": false,
    "runExecutorClientMultithread": false,

    "runStateDBServer": false,
    "runStateDBTest": false,

    "runAggregatorServer": false,
    "runAggregatorClient": true,
    "proverName": "static_prover",

    "runFileGenBatchProof": false,
    "runFileGenAggregatedProof": false,
    "runFileGenFinalProof": false,
    "runFileProcessBatch": false,
    "runFileProcessBatchMultithread": false,
    "runFileExecutor": false,

    "runKeccakScriptGenerator": false,
    "runKeccakTest": false,
    "runStorageSMTest": false,
    "runBinarySMTest": false,
    "runMemAlignSMTest": false,
    "runSHA256Test": false,
    "runBlakeTest": false,
    "executeInParallel": true,
    "useMainExecGenerated": true,
    "useProcessBatchCache": true,
    "saveRequestToFile": false,
    "saveInputToFile": true,
    "saveDbReadsToFile": true,
    "saveDbReadsToFileOnChange": false,
    "saveOutputToFile": true,
    "saveFilesInSubfolders": false,
    "saveProofToFile": true,
    "saveResponseToFile": false,
    "loadDBToMemCache": true,
    "loadDBToMemCacheInParallel": false,
    "dbMTCacheSize": 16384,
    "dbProgramCacheSize": 16384,
    "dbMultiWrite": true,
    "dbFlushInParallel": true,

    "opcodeTracer": false,
    "logRemoteDbReads": false,
    "logExecutorServerResponses": false,

    "executorServerPort": 50071,
    "executorROMLineTraces": false,
    "executorClientPort": 50071,
    "executorClientHost": "127.0.0.1",

    "stateDBServerPort": 5432,
    "stateDBURL": "local",

    "aggregatorServerPort": 50081,
    "aggregatorClientPort": 50081,
    "aggregatorClientHost": "",     // YOUR PUBLIC IP ADDRESS
    "aggregatorClientMockTimeout": 10000000,

    "mapConstPolsFile": false,
    "mapConstantsTreeFile": false,

    "inputFile": "testvectors/aggregatedProof/recursive1.zkin.proof_0.json",
    "inputFile2": "testvectors/aggregatedProof/recursive1.zkin.proof_1.json",

    "outputPath": "/output/",
    "configPath": "/mnt/prover/config/",

    "zkevmCmPols_disabled": "/mnt/prover/runtime/zkevm.commit",
    "c12aCmPols": "runtime/c12a.commit",
    "recursive1CmPols_disabled": "runtime/recursive1.commit",
    "recursive2CmPols_disabled": "runtime/recursive2.commit",
    "recursivefCmPols_disabled": "runtime/recursivef.commit",
    "finalCmPols_disabled": "runtime/final.commit",

    "publicsOutput": "public.json",
    "proofFile": "proof.json",

    "databaseURL": "postgresql://prover_user:prover_pass@zkevm-state-db:5432/prover_db",
    "databaseURL_disabled": "local",
    "dbNodesTableName": "state.nodes",
    "dbProgramTableName": "state.program",
    "dbConnectionsPool": true,
    "cleanerPollingPeriod": 600,
    "requestsPersistence": 3600,
    "maxExecutorThreads": 20,
    "maxProverThreads": 8,
    "maxStateDBThreads": 8
} 
``` 
</details>

### Configure Services

Edit the `~/zkevm/zkevm-node/mainnet/docker-compose.yml` file with the following content:

```yml
version: "3.5"

networks:
  default:
    name: zkevm

services:
  zkevm-state-db:
    container_name: zkevm-state-db
    restart: unless-stopped
    image: postgres
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -d $${POSTGRES_DB} -U $${POSTGRES_USER}" ]
    ports:
      - 5432:5432
    volumes:
      - ./db/scripts/init_prover_db.sql:/docker-entrypoint-initdb.d/init.sql
      - ${ZKEVM_NODE_STATEDB_DATA
```

### Start Services

#### Start the Databases

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-pool-db zkevm-state-db
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-pool-db
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-state-db
```

#### Start the Executor

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-executor
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-executor
```

#### Start Synchronizer

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-sync
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-sync
```

#### Start L2 Gas Pricer

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-l2gaspricer
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-l2gaspricer
```

#### Start Transaciion Manager

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-eth-tx-manager
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-eth-tx-manager
```

#### Start the RPC

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-rpc
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-rpc
```

#### Start the Sequencer

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-sequencer
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-sequencer
```

#### Start the Aggregator

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-aggregator
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-aggregator
```

#### Start the Block Explorer

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-explorer-l2 zkevm-explorer-l2-db
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-explorer-l2-db
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-explorer-l2
```

#### Start the Bridge

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-bridge-service zkevm-bridge-ui zkevm-bridge-db
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-bridge-db
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-bridge-service
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-bridge-ui
```

#### Start the Prover

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-prover-server
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-prover-server
```

#### Open Ports

- zkevm-aggregator 50081->50081/tcp
- zkevm-aggregator 9093->9091/tcp
- zkevm-bridge-db 5435->5432/tcp
- zkevm-bridge-service 9090->9090/tcp, 8081->8080/tcp
- zkevm-bridge-ui 8080->80/tcp
- zkevm-eth-tx-manager 9094->9091/tcp
- zkevm-executor 50061->50061/tcp, 50071->50071/tcp
- zkevm-explorer-l2 4004->4004/tcp
- zkevm-explorer-l2-db 5436->5432/tcp
- zkevm-pool-db 5433->5432/tcp
- zkevm-prover-server 50051->50051/tcp
- zkevm-rpc 8545->8545/tcp, 9091->9091/tcp
- zkevm-sequencer 6060->6060/tcp, 9092->9091/tcp
- zkevm-state-db 5432->5432/tcp

### Activate Forced Transactions

You can check out [this](/protocol/sequencer-resistance.md) document to learn more about Forced Batches of transactions.

```bash
npx hardhat console --network goerli
```

```js
const zkevm = await ethers.getContractFactory('PolygonZkEVM')
const zkevmContract = zkevm.attach("_polygonZkEVMAddress_")

const provider = ethers.getDefaultProvider("")  // set goerli RPC node
const privateKey = ''   // Deployment Address from wallet.txt
const wallet = new ethers.Wallet(privateKey, provider);

const zkevmContractWallet = zkevm.connect(wallet)

await zkevmContract.activateForceBatches()
```

### Provide L1 ETH to the Bridge

Run the below commands in CLI to **create a bridge transaction** and send L1 Ether to the zkEVM Bridge.

```bash
mkdir -p ~/zkevm/initial-bridge
cd zkevm/initial-bridge

wget https://raw.githubusercontent.com/0xPolygonHermez/zkevm-bridge-service/develop/test/scripts/deposit/main.go

nano main.go
```

Populate the `main.go` file with following variables:

```go
l1BridgeAddr       = ""     // zkevm-contracts/deployments/goerli_*/deploy_output.json: polygonZkEVMBridgeAddress

l1AccHexAddress    = ""     // zkevm-contracts/wallets.txt: sequencer address
l1AccHexPrivateKey = ""     // zkevm-contracts/wallets.txt: sequencer prvkey
l1NetworkURL       = "http://X.X.X.X:8545"      // set your public IP
```

Initialize a new Go module with the module path `example.com/deposit`.

```bash
go mod init example.com/deposit
go mod tidy
go run main.go

# 2023-06-07T06:29:14.211Z      INFO    initial-bridge/main.go:46       Success!        {"pid": 776268, "version": "v0.1.0"}
```

### Claim Your L2 zkETH

After sending your first bridge transaction to your zkEVM network, create a **forzed claim to get the zkETH in L2**.

```bash
mkdir -p ~/zkevm/initial-claim

cd zkevm/initial-claim
wget https://raw.githubusercontent.com/0xPolygonHermez/zkevm-bridge-service/develop/test/scripts/initialClaim/main.go
```

Open `main.go` and update the following parameters:

```go
const (
    l2BridgeAddr = ""       // zkevm-contracts/deployments/goerli_*/deploy_output.json: polygonZkEVMBridgeAddress
    zkevmAddr    = ""       // zkevm-contracts/deployments/goerli_*/deploy_output.json: polygonZkEVMAddress

    accHexAddress    = ""   // zkevm-contracts/wallets.txt: sequencer address
    accHexPrivateKey = ""   // zkevm-contracts/wallets.txt: sequencer prvkey
    l1NetworkURL     = "http://X.X.X.X:8545"    // public IP
    l2NetworkURL     = "http://X.X.X.X:8123"    // public IP
    bridgeURL        = "http://X.X.X.X:8080"    // public IP

    l2GasLimit = 1000000

    mtHeight      = 32
    miningTimeout = 180
)
```

Time to execute the claim transaction:

```bash
go mod init example.com/claim
go mod tidy
go get github.com/0xPolygonHermez/zkevm-bridge-service@4e1ca558144cac00fe0762329aaf7b3e9482b57a
go run main.go

# 2023-06-07T06:41:50.731Z     INFO    initial-claim/main.go:196       Success!!!!     {"pid": 783804, "version": "v0.1.0"}
```

:::tip Congratulations !!

Congratulations on reaching this far in setting up your own zkEVM network. **Your network is live on the Testnet** and you can send transactions to verify the same. Also, we have provided a Goerli full node setup guide below in case you are looking for one.

:::

## Goerli Full Node Setup

This guide provides step-by-step instructions to set up your own full node on the Goerli Testnet as Layer 1 (L1). It is recommended to run your own full node to handle a high volume of transactions in L1 efficiently. Follow the steps below to get started.

### Requirements

Before starting the setup, you will need **at least 300 GB of free disk space** to allocate a full Goerli node.

Next, make sure you have the following commands installed:

- wget
- jq
- docker

```bash
sudo apt update -y
sudo apt install -y wget jq docker.io

sudo usermod -aG docker $USER
newgrp docker && newgrp $USER
```

### L1 Account

To proceed with the setup, you will need an L1 Goerli address that will act as the suggested fee recipient. Make sure you have this address provisioned.

### Preparation

1. Create a directory for your Goerli node:

    ```bash
    mkdir -p ~/goerli-node/docker-volumes/{geth,prysm}
    cd ~/goerli-node/
    ```

2. Create a `docker-compose.yml` file and open it for editing:

    ```bash
    nano docker-compose.yml
    ```

3. Copy and paste the following content into the `docker-compose.yml` file:

    ```yaml
    services:
    geth:
        image: ethereum/client-go:stable
        container_name: goerli-execution
        command: |
        --goerli
        --http
        --http.vhosts=*
        --http.rpcprefix=/
        --http.corsdomain=*
        --http.addr 0.0.0.0
        --http.api eth,net,engine,admin
        volumes:
        - ./docker-volumes/geth:/root/.ethereum
        ports:
        - "0.0.0.0:${L1_RPC_PORT}:8545"
        - "0.0.0.0:30303:30303/udp"

    prysm:
        image: gcr.io/prysmaticlabs/prysm/beacon-chain:stable
        container_name: goerli-consensus
        command: |
        --prater
        --datadir=/data
        --jwt-secret=/geth/goerli/geth/jwtsecret
        --rpc-host=0.0.0.0
        --grpc-gateway-host=0.0.0.0
        --monitoring-host=0.0.0.0
        --execution-endpoint=/geth/goerli/geth.ipc
        --accept-terms-of-use
        --suggested-fee-recipient=${L1_SUGGESTED_FEE_RECIPIENT_ADDR}
        --checkpoint-sync-url=${L1_CHECKPOINT_URL**}
        volumes:
        - ./docker-volumes/prysm:/data
        - ./docker-volumes/geth:/geth
        ports:
        - "0.0.0.0:3500:3500"
        - "0.0.0.0:4000:4000"
        - "0.0.0.0:12000:12000/udp"
        - "0.0.0.0:13000:13000"
        depends_on:
        - geth
    ```

4. Save and Close the `docker-compose.yml` file.

5. Create an `.env` file and open it for editing:

    ```bash
    nano .env
    ```

6. Set the following environment variables in the `.env` file:

    ```bash
    L1_RPC_PORT=8845
    L1_SUGGESTED_FEE_RECIPIENT_ADDR=0x  # Put your Goerli account address
    L1_CHECKPOINT_URL=https://goerli.checkpoint-sync.ethpandaops.io
    ```

7. Save and Close the `.env` file.

### Deploy

1. Start the compose services:

    ```bash
    docker-compose up -d
    ```

2. Check the logs of the `prysm` service to monitor the synchronization progress:

    ```bash
    docker-compose logs -f prysm
    ```

- Wait for the initial sync to complete. You will see log messages similar to the following indicating the progress:

    ```bash
    #goerli-consensus  | time="2023-06-19 09:39:44" level=info msg="Synced up to slot 5888296" prefix=initial-sync
    ```

3. Check the logs of the `geth` service to monitor the initial download and sync progress:

    ```bash
    docker-compose logs -f geth
    ```

- This process may take a couple of hours. Look for log messages similar to the following indicating the progress:

    ```bash
    #goerli-execution  | INFO [06-19|09:43:24.954] Syncing beacon headers                   downloaded=25600 left=9,177,918 eta=1h5m31.860s
    #goerli-execution  | INFO [06-19|10:09:19.488] Syncing: state download in progress      synced=0.30% state=331.34MiB accounts=81053@20.52MiB slots=1,112,986@239.47MiB codes=11681@71.34MiB >
    ```

### Validation

Once both service logs show the sync completion and new blocks are being updated, you can verify the correctness of the RPC by making a call. For example, to get the current block number, use the following command:

```bash
printf "%d\n" $(curl -s -X POST --header "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}' http://localhost:8845 | jq -r .result)
```

If everything is set up correctly, you should see the current block number returned.

Congratulations! You have successfully set up your own full node on the Goerli Testnet. You can now use this node to perform transactions and interact with the Goerli network.