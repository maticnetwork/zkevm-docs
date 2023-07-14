---
id: step5-fullzkevm
title: Configuring The Prover And Services
sidebar_label: Configure Prover
description: The fifth step on launching your own zkEVM network on the Goerli testnet.
keywords:
  - polygon
  - zkEVM
  - zkNode
  - deploy full zkevm
---

Continue with the **Fifth Step** of this Deployment-Guide where you configure the Prover and Services.

## Edit DBs

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

## Configure the Prover

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
  "aggregatorClientHost": "", // YOUR PUBLIC IP ADDRESS
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
      test: ["CMD-SHELL", "pg_isready -d $${POSTGRES_DB} -U $${POSTGRES_USER}"]
    ports:
      - 5432:5432
    volumes:
      - ./db/scripts/init_prover_db.sql:/docker-entrypoint-initdb.d/init.sql
      - ${ZKEVM_NODE_STATEDB_DATA
```

## Start Services

Continue with starting all the services as indicated below.

### Start the Databases

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-pool-db zkevm-state-db
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-pool-db
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-state-db
```

### Start the Executor

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-executor
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-executor
```

### Start Synchronizer

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-sync
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-sync
```

### Start L2 Gas Pricer

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-l2gaspricer
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-l2gaspricer
```

### Start Transaciion Manager

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-eth-tx-manager
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-eth-tx-manager
```

### Start the RPC

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-rpc
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-rpc
```

### Start the Sequencer

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-sequencer
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-sequencer
```

### Start the Aggregator

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-aggregator
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-aggregator
```

### Start the Block Explorer

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-explorer-l2 zkevm-explorer-l2-db
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-explorer-l2-db
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-explorer-l2
```

### Start the Bridge

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-bridge-service zkevm-bridge-ui zkevm-bridge-db
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-bridge-db
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-bridge-service
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-bridge-ui
```

### Start the Prover

```bash
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml up -d zkevm-prover-server
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml ps
docker compose --env-file $ZKEVM_CONFIG_DIR/.env -f $ZKEVM_DIR/$ZKEVM_NET/docker-compose.yml logs -f zkevm-prover-server
```

### Open Ports

The following ports need to be available on your host.

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
