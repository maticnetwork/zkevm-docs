---
id: step4-fullzkevm
title: Deployment of the zkNode
sidebar_label: Deploy zkNode
description: The fourth step on launching your own zkEVM network on the Goerli testnet.
keywords:
  - polygon
  - zkEVM
  - zkNode
  - deploy full zkevm
---

Continue with the **Fourth Step** of this Deployment-Guide where you deploy the zkNode.

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
const provider = ethers.getDefaultProvider(""); // set goerli RPC node
const privateKey = ""; // From wallet.txt Trusted sequencer
const wallet = new ethers.Wallet(privateKey, provider);

const maticTokenFactory = await ethers.getContractFactory(
  "ERC20PermitMock",
  provider
);
maticTokenContract = maticTokenFactory.attach(""); // From ~/zkevm/zkevm-contract/deployments/goerly_***/deploy_output.json maticTokenAddress
maticTokenContractWallet = maticTokenContract.connect(wallet);
await maticTokenContractWallet.approve("", ethers.utils.parseEther("100.0")); // From ~/zkevm/zkevm-contract/deployments/goerly_***/deploy_output.json polygonZkEVMAddress
```

### Configure Genesis

Run the below commands to copy `genesis.json` file into appropriate location and open for editing:

```bash
cp ~/zkevm/zkevm-contracts/deployments/goerli_***/genesis.json ~/zkevm/zkevm-node/mainnet/config/environments/public/public.genesis.config.json
nano ~/zkevm/zkevm-node/mainnet/config/environments/public/public.genesis.config.json
```

Edit the file changing the following parameters from `~/zkevm/zkevm-contracts/deployments/goerli_***/deploy_output.json`. **Keep in mind that `genesisBlockNumber` is called `deploymentBlockNumber` in `deploy_output.json`**.

```json
{
  "l1Config": {
    "chainId": 5,
    "polygonZkEVMAddress": "",
    "maticTokenAddress": "",
    "polygonZkEVMGlobalExitRootAddress": ""
  },
  "genesisBlockNumber": 9050589, // deploymentBlockNumber from ~/zkevm/zkevm-contracts/deployments/goerli_***/deploy_output.json
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
