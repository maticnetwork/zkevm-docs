---
id: july-release
title: July Release Notes
sidebar_label: July Release Notes
description: This document lists out the key changes in the July release for Node, Bridge and Prover services of Polygon zkEVM.
keywords:
  - polygon
  - develop
  - zkEVM
  - deploy smart contracts
  - connecting to zkEVM
---

This document lists out the key changes in the July release for Node, Bridge and Prover services of Polygon zkEVM.

## Node v0.2.1

Version v0.2.0 is our major release that supports the next upcoming zkEVM upgrade **ForkID5** (also known as **Dragon_Fruit**). Additionally, it includes new features, performance improvements and fixes.

The latest version bump to v0.2.1 adds a minor fix to the pool that has no impact for providers or users. The details are in the RCP section.

Compatible Versions for:

- **Prover &rarr;** v2.0.1
- **Bridge &rarr;** v0.2.0

You can check out the complete changelog [here](https://github.com/0xPolygonHermez/zkevm-node/releases/tag/v0.2.0).

### Main Features

#### Sequencer Performance

A flush ID mechanism has been added to improve performance of the sequencer. This will allow processing of the new transactions while previous ones are still being added to the persistence layer.

#### `EffectiveGasPrice` Implementation (ForkID5)

The node is able to better adjust the gas price needed for the execution of a transaction, so it may try to optimize it. The effective gas price will be depicted in the receipt of the transaction. This functionality will be available when **ForkID5** is enabled.

#### Synchronizer Archive Snapshots

Adds the ability to generate and restore snapshots of the network so that synchronization for new instances can be achieved quickly.

You may follow the instructions provided [here](https://github.com/0xPolygonHermez/zkevm-node/blob/release/v0.2.0/docs/snap_restore.md).

#### Synchronizer Performance Improvements

Optimizations have been completed to make the synchronization of the network perform faster.

#### Retry on Exhausted Executor GRPC Resources

In some situations where the executor is under heavy load, it may return a resources exhausted error. If this situation happens with this version, the node will retry the execution instead of only returning an error.

#### MaxGasPrice L2

The gas prices can now be limited to a maximum value to minimize fluctuations and peaks from L1; and in cases where the `follower_gas_pricer` is used.

#### Stop Sequencer on Batch

This feature makes network upgrades easier and faster by freezing changes on the Virtual State while allowing changes to happen on the Trusted State. This new feature minimizes the outage duration in cases where network has to be fully stopped (like Mainnet upgrades).

### Components

All hotfixes done on v0.1.4 are included into v0.2.0 ([#2255](https://github.com/0xPolygonHermez/zkevm-node/pull/2255)).

### RPC

- Only return a tx from the pool if tx is in pending status. This will avoid Etherscan to read invalid or failed transactions as pending ([#2273](https://github.com/0xPolygonHermez/zkevm-node/pull/2273))
- Return effective gas price in the receipt of an L2 tx ([#2258](https://github.com/0xPolygonHermez/zkevm-node/pull/2258))
- Fix `EffectiveGasprice` unsigned transactions with ForkID lower than 5 ([#2278](https://github.com/0xPolygonHermez/zkevm-node/pull/2278))

#### Added in v0.2.1 via commits

- [44356c8](https://github.com/0xPolygonHermez/zkevm-node/commit/44356c8e27b8f9575913281034d57139a121f5bd): Do not add transaction into the pool if a fatal error in the Executor happens during pre-execution.
- [822858c](https://github.com/0xPolygonHermez/zkevm-node/commit/822858ce0dc75e8df236466077590b1f913694f6): Change log text.

### Synchronizer

- `FlushID` is now added to the Synchronizer ([#2287](https://github.com/0xPolygonHermez/zkevm-node/pull/2287))
- Fixed `CheckIfSynced`. It was impacting the permissionless synchronization as the synchronizer couldn’t close the batch ([#2289](https://github.com/0xPolygonHermez/zkevm-node/pull/2289))

### Sequencer

- Fixed division by 0 when `gasPrice` is 0 and `fea2scalar` error handling ([#2264](https://github.com/0xPolygonHermez/zkevm-node/pull/2264))
- Logs order checked. `BlockHash` and `BlockNumber` in the log conversion are fixed ([#2280](https://github.com/0xPolygonHermez/zkevm-node/pull/2280))
- L2Block timestamp for the first batch is fixed ([#2260](https://github.com/0xPolygonHermez/zkevm-node/pull/2260)) 
- Added missing metric count in the sequencer for expired transactions ([#2155](https://github.com/0xPolygonHermez/zkevm-node/pull/2155))
- Retry on resource exhausted ([#2176](https://github.com/0xPolygonHermez/zkevm-node/pull/2176)). This requires new config parameters:

  ```json
  [Executor]
  MaxResourceExhaustedAttempts = 3
  WaitOnResourceExhaustion = "1s"
  ```

- Added pool block reason ([#2177](https://github.com/0xPolygonHermez/zkevm-node/pull/2177))
- Renamed Public to Testnet ([#2193](https://github.com/0xPolygonHermez/zkevm-node/pull/2193))
- Enabled **ForkID** to choose correct encoding/decoding txs ([#2219](https://github.com/0xPolygonHermez/zkevm-node/pull/2219))
- Added `effective_gas_price` to receipt ([#2222](https://github.com/0xPolygonHermez/zkevm-node/pull/2222))
- Effective Gas Price Comparison ([#2234](https://github.com/0xPolygonHermez/zkevm-node/pull/2234))
- New gas price estimation using `effectivePercentage`, integration of **HashDB** and **ForkID5** Smart Contracts ([#2196](https://github.com/0xPolygonHermez/zkevm-node/pull/2196)). This requires new config parameters:

  ```json
  [Pool]
  IntervalToRefreshGasPrices = "5s"
  [Sequencer]
  [Sequencer.EffectiveGasPrice]
  MaxBreakEvenGasPriceDeviationPercentage = 10
  L1GasPriceFactor = 0.25
  ByteGasCost = 16
  MarginFactor = 1
  Enabled = false
  ```

- Fixed the storage of **Closing Reason** when receiving a **Forced Batch** deadline signal ([#2256](https://github.com/0xPolygonHermez/zkevm-node/pull/2256))
- Fixed L2 blocks timestamp for the first (genesis) batch ([#2260](https://github.com/0xPolygonHermez/zkevm-node/pull/2260))
- `EffectiveGasPrice` refactor and other fixes ([#2247](https://github.com/0xPolygonHermez/zkevm-node/pull/2247))
- Added a check to skip appending `effectivePercentage` if current ForkID is lower than 5 ([#2275](https://github.com/0xPolygonHermez/zkevm-node/pull/2275))
- Added `maxL2GasPrice` ([#2294](https://github.com/0xPolygonHermez/zkevm-node/pull/2294)). This requires new config parameter:

  ```json
  [L2GasPriceSuggester]
  MaxGasPriceWei = 0
  ```

  Setting it to 0 disables it.

### Aggregator

No changes to the Aggregator in this release.

## Bridge Service v0.2.0

You can check out the complete changelog for Bridge Service [here](https://github.com/0xPolygonHermez/zkevm-bridge-service/releases/tag/v0.2.0).

- Removed unused config param `L1ChainID` ([#470](https://github.com/0xPolygonHermez/zkevm-bridge-service/pull/470))
- Fixed L1 sync when `claimTxManager` is disabled ([#468](https://github.com/0xPolygonHermez/zkevm-bridge-service/pull/468)) 
- Increased suggested `gasPrice` by the zkEVM node ten times ([#466](https://github.com/0xPolygonHermez/zkevm-bridge-service/pull/466))
- Removed unused config param `MaticTokenAddress` ([#464](https://github.com/0xPolygonHermez/zkevm-bridge-service/pull/464))
- Reverted ‘Retry’, if error is different at execution, to avoid problems during gas estimation ([#446](https://github.com/0xPolygonHermez/zkevm-bridge-service/pull/446)) 
- Removed config param `PolygonZkEVMAddress` ([#437](https://github.com/0xPolygonHermez/zkevm-bridge-service/pull/437))
- Fixed revert check and max retry mechanism ([#472](https://github.com/0xPolygonHermez/zkevm-bridge-service/pull/472)). Requires new config parameters:

  ```json
  [ClaimTxManager]: 
  RetryInterval = "1s"
  RetryNumber = 10
  ```

## Prover v2.0.1

This is an important version as it supports the next coming version upgrade **ForkID5** (also known as **Dragon_Fruit**). This version offers important improvements in the DB management as a result of an architectural review. Additionally, optimizations in the executor’s ECRecovery have gained in efficiency as all its values are pre-calculated, which makes it perform faster.

You can check out the complete changelog [here](https://github.com/0xPolygonHermez/zkevm-prover/releases/tag/v2.0.1).

<details>
<summary>Click here to explore the changes implemented in the Prover release</summary>

- Protect GRPC input from invalid values
- Added several generalizations to the Prover code:
  - When calling `getCommittedPols`, the number of committed pols is sent by getting that info from `starkInfo`.
  - `CompressorCommitPolsStarks` is now agnostic to the number of committed polynomials, which is specified by parameter.
  - `ConstantPolsStarks` is now agnostic to the number of constant polynomials.
  - `ExecFile` is now agnostic to the number of committed polynomials.
  - `Proof2zkinStark`, which is used to generate the zkin of the recursive2, is now generalized so the number of steps isn't fixed but sent by parameter
- Supporting Goldilocks avx512
- Created **LICENSE file**
- Fixed **README file**
- Added new `rapidSnark` and `ffiasm` files for FFlonk optimizations
- Renamed **StateDB to HashDB**
- Only last state is now written to database, deleting unrequired hashes/nodes before	inserting them to DB
- Created `SMT::hashSaveZero()` and `SMT::hashSaveOne()`
- Created `Database::saveStateRoot()` and call it from SMT
- Removed update from Database and HashDB
- Add `multiWrite.Lock` method to `Database:dbSenderThread()`
- Fixed program insertion in `Database::sendData()` query
- Call `ctx.pHashDB->semiFlush` method from `FullTracer::onFinishTx()`, in all forks
- Cache last EC points addition result
- New `executor.proto: external request ID`, effective gas price
- Fixed STOP missing opcode
- When `exitProces()` notify the rest of threads, not to start new activities
- Report evaluation counter in Main SM executor `logError` method
- Upgrading number of threads for `calcwitness`
- Removed batches when calculating linear hashes since there is no intention of moving to GPU in a short period of time.
- Integrate E2E test into Github Actions for continuous integration
- Created `ForkID5` with new ROM
- Fixed Aggregator service test code to get final proof
- Read all `rom.json` constants
- Encoded `FullTracer` trace to save space (from release)
- Fixed OOC errors when `no_counters=1` has been requested (from release)
- Deleted `ctx.outLogs`, which were unused
- Fixed `DatabaseCache` memory leak
- Implemented Unit Testing
- Replaced Tonelli-Shanks square root implementation by a power, given the prime mod 4 characteristics.
- Fixed depth in FullTracer ForkID5 (from release)
- Fixed FullTracer `DELEGATECALL` format not to include leading zeros
- Completed optimizations on `ECRecover`: New implementation using Jacobian coordinates has been integrated in the different versions of Executors available. For the ROM-based executor, as intermediate results are needed, those are stored into an intermediate buffer and once the calculation is finished are converted from projective to affine coordinates in parallel.
- Added `LOG_SMT_KEY_DETAILS` to Main Executor
- Fixed `FullTracer` logs index to be sequential
- Updated testvectors/performance with new files including effective gas price byte
- Checked that `pEntry→ifa_addr` is not null in `getIPAddress` method
- Changed default value of `config.dbReadRetryCounter` to 10
- Logging executor input in a trace
- Fixed database connection management in exception catch
- Call `multiWrite.acceptIntray` method from `Database::senderThread()` to rescue the hashes from nodesIntray/programIntray
- Disabled `Input.bUpdateMerkleTree` by default, so that `Prover.genBatchProof()` does not write data in database
- Integrated `HashDBTest` into `UnitTest`
- Fixed Database to search not only in cache, but also in `multiWrite` data
- Fixed `DatabaseCache` to clear `dataSize` when reset
- Updated state root instead of inserting; create it during initialization if database is empty
- New invalid RLP ROM error support
- Fixed `ECRecover` for case `posUsed=-1` in native main executor code

</details>

### Config changes

#### Renamed Elements

- `runStateDBServer` has been renamed to `runHashDBServer`
- `runStateDBTest` has been renamed to `runHashDBTest`
- `uint16_t stateDBServerPort` has been renamed to `hashDBServerPort`
- `stateDBURL` has been renamed to `hashDBURL`
- `maxStateDBThreads` has been renamed to `maxHashDBThreads`

#### New Elements

These are the new elements added in latest Prover release:

- `dbMultiWriteSinglePosition` &rarr; it should be set to `true`
- `ECRecoverPrecalc` &rarr; it should be set to `true`
- `ECRecoverPrecalcNThreads` &rarr; it should be set to 16

These are some of the miscellaneous new elements which won't be normally utilized:

- `runECRecoverTest`
- `runDatabaseCacheTest`
- `runUnitTest`
- `useMainExecC`
- `dbCacheSynchURL`
- `aggregatorClientMaxStreams`

#### Deleted Elements

- `dbFlushInParallel`

## Migration Instructions

Updating to the latest versions is MANDATORY.

The new version of the Node does not require new config parameters.

The new version of Prover will require you to add the config changes as mentioned [above](#config-changes).