---
id: step5-fullzkevm
title: Configuring The Prover And Services
sidebar_label: Configure Prover
description: The fifth step in launching your zkEVM network on the Goerli testnet.
keywords:
  - polygon
  - zkEVM
  - zkNode
  - deploy full zkevm
---

Continue with this deployment guide's **Fifth Step** where you configure the Prover and Services.

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

Save and exit the file once the changes have been made. The above SQL script will set up your databases for the zkEVM Node.

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

<details>
<summary>Click to expand the <code>~/zkevm/zkevm-node/mainnet/docker-compose.yml</code> file</summary>

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
      - ${ZKEVM_NODE_STATEDB_DATA_DIR}:/var/lib/postgresql/data
      - ${ZKEVM_ADVANCED_CONFIG_DIR:-./config/environments/public}/postgresql.conf:/etc/postgresql.conf
    environment:
      - POSTGRES_USER=state_user
      - POSTGRES_PASSWORD=state_password
      - POSTGRES_DB=state_db
    command:
      - "postgres"
      - "-N"
      - "500"
      - "-c"
      - "config_file=/etc/postgresql.conf"

  zkevm-pool-db:
    container_name: zkevm-pool-db
    restart: unless-stopped
    image: postgres
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -d $${POSTGRES_DB} -U $${POSTGRES_USER}" ]
    deploy:
      resources:
        limits:
          memory: 2G
        reservations:
          memory: 1G
    ports:
      - 5433:5432
    volumes:
      - ${ZKEVM_NODE_POOLDB_DATA_DIR}:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=pool_user
      - POSTGRES_PASSWORD=pool_password
      - POSTGRES_DB=pool_db
    command:
      - "postgres"
      - "-N"
      - "500"

  zkevm-executor:
    container_name: zkevm-executor
    restart: unless-stopped
    image: hermeznetwork/zkevm-prover:v1.1.4-RC2-fork.4
    depends_on:
      zkevm-state-db:
        condition: service_healthy
    ports:
      - 50061:50061 # MT
      - 50071:50071 # Executor
    volumes:
      - ${ZKEVM_ADVANCED_CONFIG_DIR:-./config/environments/public}/public.prover.config.json:/usr/src/app/config.json
    command: >
      zkProver -c /usr/src/app/config.json

  zkevm-sync:
    container_name: zkevm-sync
    restart: unless-stopped
    depends_on:
      zkevm-state-db:
        condition: service_healthy
      zkevm-executor:
        condition: service_started
    image: hermeznetwork/zkevm-node:v0.1.2-RC1
    environment:
      - ZKEVM_NODE_ETHERMAN_URL=${ZKEVM_NODE_ETHERMAN_URL}
    volumes:
      - ${ZKEVM_ADVANCED_CONFIG_DIR:-./config/environments/public}/public.node.config.toml:/app/config.toml
      - ${ZKEVM_ADVANCED_CONFIG_DIR:-./config/environments/public}/public.genesis.config.json:/app/genesis.json
    command:
      - "/bin/sh"
      - "-c"
      - "/app/zkevm-node run --network custom --custom-network-file /app/genesis.json --cfg /app/config.toml --components synchronizer"

  zkevm-l2gaspricer:
    container_name: zkevm-l2gaspricer
    image: hermeznetwork/zkevm-node:v0.1.2-RC1
    depends_on:
      zkevm-pool-db:
          condition: service_healthy
    environment:
      - ZKEVM_NODE_POOL_DB_HOST=zkevm-pool-db
    volumes:
      - ${ZKEVM_CONFIG_DIR}/sequencer.keystore:/pk/keystore
      - ${ZKEVM_ADVANCED_CONFIG_DIR:-./config/environments/public}/public.node.config.toml:/app/config.toml
      - ${ZKEVM_ADVANCED_CONFIG_DIR:-./config/environments/public}/public.genesis.config.json:/app/genesis.json
    command:
      - "/bin/sh"
      - "-c"
      - "/app/zkevm-node run --network custom --custom-network-file /app/genesis.json --cfg /app/config.toml --components l2gaspricer"

  zkevm-eth-tx-manager:
    container_name: zkevm-eth-tx-manager
    image: hermeznetwork/zkevm-node:v0.1.2-RC1
    depends_on:
      zkevm-state-db:
          condition: service_healthy
    ports:
      - 9094:9091 # needed if metrics enabled
    environment:
      - ZKEVM_NODE_STATEDB_HOST=zkevm-state-db
    volumes:
      - ${ZKEVM_CONFIG_DIR}/sequencer.keystore:/pk/sequencer.keystore
      - ${ZKEVM_CONFIG_DIR}/aggregator.keystore:/pk/aggregator.keystore
      - ${ZKEVM_ADVANCED_CONFIG_DIR:-./config/environments/public}/public.node.config.toml:/app/config.toml
      - ${ZKEVM_ADVANCED_CONFIG_DIR:-./config/environments/public}/public.genesis.config.json:/app/genesis.json
    command:
      - "/bin/sh"
      - "-c"
      - "/app/zkevm-node run --network custom --custom-network-file /app/genesis.json --cfg /app/config.toml --components eth-tx-manager"

  zkevm-rpc:
    container_name: zkevm-rpc
    restart: unless-stopped
    depends_on:
      zkevm-pool-db:
        condition: service_healthy
      zkevm-state-db:
        condition: service_healthy
      zkevm-sync:
        condition: service_started
    image: hermeznetwork/zkevm-node:v0.1.2-RC1
    ports:
      - 8545:8545
      - 9091:9091 # needed if metrics enabled
    environment:
      - ZKEVM_NODE_ETHERMAN_URL=${ZKEVM_NODE_ETHERMAN_URL}
    volumes:
      - ${ZKEVM_ADVANCED_CONFIG_DIR:-./config/environments/public}/public.node.config.toml:/app/config.toml
      - ${ZKEVM_ADVANCED_CONFIG_DIR:-./config/environments/public}/public.genesis.config.json:/app/genesis.json
    command:
      - "/bin/sh"
      - "-c"
      - "/app/zkevm-node run --network custom --custom-network-file /app/genesis.json --cfg /app/config.toml --components rpc --http.api eth,net,debug,zkevm,txpool,web3"

  zkevm-sequencer:
    container_name: zkevm-sequencer
    image: hermeznetwork/zkevm-node:v0.1.2-RC1
    depends_on:
      zkevm-pool-db:
        condition: service_healthy
      zkevm-state-db:
        condition: service_healthy
      zkevm-executor:
        condition: service_started
    ports:
      - 9092:9091 # needed if metrics enabled
      - 6060:6060
    environment:
      - ZKEVM_NODE_STATEDB_HOST=zkevm-state-db
      - ZKEVM_NODE_POOL_DB_HOST=zkevm-pool-db
      - ZKEVM_NODE_SEQUENCER_SENDER_ADDRESS=0x593A083125Dc0f6E50c0DAe8689ece7E22987450
    volumes:
      - ${ZKEVM_CONFIG_DIR}/sequencer.keystore:/pk/sequencer.keystore
      - ${ZKEVM_ADVANCED_CONFIG_DIR:-./config/environments/public}/public.node.config.toml:/app/config.toml
      - ${ZKEVM_ADVANCED_CONFIG_DIR:-./config/environments/public}/public.genesis.config.json:/app/genesis.json
    command:
      - "/bin/sh"
      - "-c"
      - "/app/zkevm-node run --network custom --custom-network-file /app/genesis.json --cfg /app/config.toml --components sequencer,sequence-sender"

  zkevm-aggregator:
    container_name: zkevm-aggregator
    image: hermeznetwork/zkevm-node:v0.1.2-RC1
    depends_on:
      zkevm-pool-db:
        condition: service_healthy
      zkevm-state-db:
        condition: service_healthy
    ports:
      - 50081:50081
      - 9093:9091 # needed if metrics enabled
    environment:
      - ZKEVM_NODE_STATEDB_HOST=zkevm-state-db
      - ZKEVM_NODE_AGGREGATOR_SENDER_ADDRESS=0x37dB10dab4C2aEE6D161ad873D0696C4494613D0
    volumes:
      - ${ZKEVM_ADVANCED_CONFIG_DIR:-./config/environments/public}/public.node.config.toml:/app/config.toml
      - ${ZKEVM_ADVANCED_CONFIG_DIR:-./config/environments/public}/public.genesis.config.json:/app/genesis.json
    command:
      - "/bin/sh"
      - "-c"
      - "/app/zkevm-node run --network custom --custom-network-file /app/genesis.json --cfg /app/config.toml --components aggregator"

  zkevm-explorer-l2:
    container_name: zkevm-explorer-l2
    image: hermeznetwork/zkevm-explorer:latest
    ports:
      - 4004:4004
    environment:
      - PORT=4004
      - NETWORK=POE
      - SUBNETWORK=Polygon zkEVM
      - CHAIN_ID=42069
      - COIN=ETH
      - ETHEREUM_JSONRPC_VARIANT=geth
      - ETHEREUM_JSONRPC_HTTP_URL=http://zkevm-rpc:8545
      - DATABASE_URL=postgres://l2_explorer_user:l2_explorer_password@zkevm-explorer-l2-db:5432/explorer
      - ECTO_USE_SSL=false
      - MIX_ENV=prod
      - LOGO=/images/blockscout_logo.svg
      - LOGO_FOOTER=/images/blockscout_logo.svg
      - SUPPORTED_CHAINS=[]
      - SHOW_OUTDATED_NETWORK_MODAL=false
    command: ["/bin/sh", "-c", "mix do ecto.create, ecto.migrate; mix phx.server"]
  zkevm-explorer-l2-db:
    container_name: zkevm-explorer-l2-db
    image: postgres
    ports:
      - 5436:5432
    environment:
      - POSTGRES_USER=l2_explorer_user
      - POSTGRES_PASSWORD=l2_explorer_password
      - POSTGRES_DB=l2_explorer_db
    command: [ "postgres", "-N", "500" ]

  zkevm-bridge-db:
    container_name: zkevm-bridge-db
    image: postgres
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -d $${POSTGRES_DB} -U $${POSTGRES_USER}" ]
    expose:
      - 5435
    ports:
      - 5435:5432
    environment:
      - POSTGRES_USER=test_user
      - POSTGRES_PASSWORD=test_password
      - POSTGRES_DB=test_db
    command: ["postgres", "-N", "500"]

  zkevm-bridge-service:
    container_name: zkevm-bridge-service
    image: hermeznetwork/zkevm-bridge-service:v0.1.0
    depends_on:
      zkevm-bridge-db:
        condition: service_healthy
    ports:
      - 9090:9090
      - 8081:8080
    environment:
      - ZKEVM_BRIDGE_DATABASE_USER=test_user
      - ZKEVM_BRIDGE_DATABASE_PASSWORD=test_password
      - ZKEVM_BRIDGE_DATABASE_NAME=test_db
      - ZKEVM_BRIDGE_DATABASE_HOST=zkevm-bridge-db
      - ZKEVM_BRIDGE_DATABASE_PORT=5432
    volumes:
      - ${ZKEVM_CONFIG_DIR}/sequencer.keystore:/pk/sequencer.keystore
      - ${ZKEVM_ADVANCED_CONFIG_DIR:-./config/environments/public}/public.node.config.toml:/app/config.toml
    command:
      - "/bin/sh"
      - "-c"
      - "/app/zkevm-bridge run --cfg /app/config.toml"
  zkevm-bridge-ui:
    container_name: zkevm-bridge-ui
    image: hermeznetwork/zkevm-bridge-ui:latest
    ports:
      - 8080:80
    environment:
      - ETHEREUM_RPC_URL=$ZKEVM_NODE_ETHERMAN_URL
      - ETHEREUM_EXPLORER_URL=https://goerli.etherscan.io
      - ETHEREUM_BRIDGE_CONTRACT_ADDRESS=0x5567fAbF3B17F320BA3906d2f6CD43021d27A8AB
      - ETHEREUM_FORCE_UPDATE_GLOBAL_EXIT_ROOT=true
      - ETHEREUM_PROOF_OF_EFFICIENCY_CONTRACT_ADDRESS=0x12c3e0CC1d4619deaC19014a72C98c129448Cfd7
      - POLYGON_ZK_EVM_RPC_URL=http://147.83.40.37:8545
      - POLYGON_ZK_EVM_EXPLORER_URL=http://147.83.40.37:4004
      - POLYGON_ZK_EVM_BRIDGE_CONTRACT_ADDRESS=0x5567fAbF3B17F320BA3906d2f6CD43021d27A8AB
      - POLYGON_ZK_EVM_NETWORK_ID=1
      - BRIDGE_API_URL=http://147.83.40.37:8081
      - ENABLE_FIAT_EXCHANGE_RATES=false
      - ENABLE_OUTDATED_NETWORK_MODAL=false
      - ENABLE_DEPOSIT_WARNING=true
      - ENABLE_REPORT_FORM=false

  zkevm-prover-server:
    container_name: zkevm-prover-server
    image: hermeznetwork/zkevm-prover:v1.1.4-RC2-fork.4
    ports:
      - 50051:50051
    volumes:
     - ~/zkevm/v1.1.0-rc.1-fork.4/config:/mnt/prover/config:ro
     - ~/zkevm/config.json:/app/config.json
    command: "zkProver -c /app/config.json"
```

</details>

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
