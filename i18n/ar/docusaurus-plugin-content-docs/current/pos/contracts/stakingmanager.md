---
id: stakingmanager
title: Staking Manager
description: For the Polygon's Proof of Security based consensus, all the 2/3+1 proof verification and handling of staking, rewards are executed on the Ethereum smart contract. The whole design follows this philosophy of doing less on the Mainnet contract.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

For the Polygon's Proof of Security based consensus, all the ⅔+1 proof verification and handling of staking, rewards are executed on the Ethereum smart contract.

The whole design follows this philosophy of doing less on the Mainnet contract. It does information verification and pushes all the computation-heavy operations to L2 (Read Heimdall for this doc).

Staking actors (Stakers) are divided into validators, delegators and watchers(for fraud reporting).

StakeManager is the main contract for handling validator related activities like `checkPoint` signature verification, reward distribution, slashing and stake management.

Note that from one Ethereum address, a Staker can only be a validator or delegator (It's just a design choice, no hard reasons).

Since the contract is using NFT ID as a source of ownership, change of ownership and signer won't affect anything in the system.

`validatorThreshold`: Shows the maximum number of validators accepted by the system, also called slots.

### AccountStateRoot

- For various accounting done on heimdall for validators and delegator account root is submitted while submitting the `checkpoint` .
- accRoot is used while `claimRewards` and `unStakeClaim` .

## Stake/stakeFor

```cpp
function stake(
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes calldata signerPubkey
) public;

function stakeFor(
    address user,
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes memory signerPubkey
) public;
```

- Allows anyone with amount(Matic tokens) greater `minDeposit` then if `currentValidatorSetSize` is less then `validatorThreshold` .
- MUST transfer `amount+heimdallFee` , puts validator into auction period for an auctionInterval.(more on auction in auction section)
- `updateTimeLine` updates special timeline data structure, which keeps track of active validators and active stake for given epoch/checkpoint count.
- One unique `NFT` is minted on each new stake/stakeFor call, which can be transferred to anyone but can be owned 1:1 ethereum address.
- `acceptDelegation` set true if validators want to accept delegation, `ValidatorShare` contract is deployed for the validator.

## unstake

- Remove validator from validator set in next epoch(only valid for current checkpoint once called `unstake`
- Remove validator's stake from timeline data structure, update count for validator's exit epoch.
- If validator had delegation on collect all rewards and lock delegation contract for new delegations.

## unstakeClaim

```cpp
function unstakeClaim(uint256 validatorId) public;
```

- After `unstaking` validators are put into withdrawal period so that they can be slashed if any fraud found after `unstaking` for pas frauds.
- Once `WITHDRAWAL_DELAY` period is served validator's can call this function and do settlement with stakeManager(get rewards if any, get staked tokens back, burn NFT etc)

## Restake

```cpp
function restake(uint256 validatorId, uint256 amount, bool stakeRewards)
        public;
```

- Allows validators to increase their stake by putting new amount or rewards or both.
- MUST update timeline(amount) for active stake.

## withdrawRewards

```cpp
function withdrawRewards(uint256 validatorId)
        public;
```

- Allows validators to withdraw accumulated rewards, must consider getting rewards from delegation contract if validator accepts delegation.

## updateSigner

```cpp
function updateSigner(uint256 validatorId, bytes memory signerPubkey)
        public
```

- Allows validators to update signer address(which is used to validate blocks on Polygon chain and checkpoint sigs on stakeManager)
- Once slashing is implemented there will be cap on how many times a validator can change signer key.

### topUpForFee

```cpp
function topUpForFee(uint256 validatorId, uint256 heimdallFee) public
```

- Validators can top-up their balance for heimdall fee.

## claimFee

```cpp
function claimFee(
        uint256 validatorId,
        uint256 accumSlashedAmount,
        uint256 accumFeeAmount,
        uint256 index,
        bytes memory proof
    ) public
```

- Used to withdraw fee from heimdall.
- `accountStateRoot` is updated on each checkpoint, so that validators can provide proof of inclusion in this root for account on heimdall and withdraw fee.
- Note that `accountStateRoot` is re-written to prevent exits on multiple checkpoints(for old root and save accounting on stakeManager)
- `accumSlashedAmount` is unused atm, will be used for slashing on heimdall if needed.

### StakingNFT

- Standard erc721 with few restrictions like one token per user and minted in sequential manner.

## Validator Replacement

- In order to replace poor performing validator there is periodic auction for each validator slot.
- For individual validators there is auction window where wanna be validators can bid their amount and start an auction using `startAuction` function.
- Once the `auctionInterval` is over last bidder needs to close the auction in order to confirm and become validator. For which she needs to call `confirmAuctionBid` which accepts and behave similar to new `stake` function for upcoming validator and `unStake` for old validator.
- Current validator can bid for herself and try to keep that place.
- Whole mech dynamically balances the stake value and overall security according to market conditions and use of Polygon chain.

    ### startAuction

    ```jsx
    function startAuction(
        uint256 validatorId, /**  auction for validator */
      uint256 amount /**  amount greater then old validator's stake */
        ) external;
    ```

    - In order to start a bid or bid higher on already running auction this function is used.
    - Auction period runs in cycles like `(auctionPeriod--dynasty)--(auctionPeriod--dynasty)--(auctionPeriod--dynasty)`  so it MUST check for correct auction period.
    - `perceivedStakeFactor` is used to calculate exact factor*old stake (note currently it is by default 1 WIP for picking the function).
    - MUST check for auction from last auction period if any still going on (one can choose to not call `confirmAuction` in order to get her capital out in next auction).
    - Normally continuous english auction is going on in a `auctionPeriod` .


    ### confirmAuctionBid

    ```jsx
    function confirmAuctionBid(
            uint256 validatorId,
            uint256 heimdallFee, /** for new validator */
            bool acceptDelegation,
            bytes calldata signerPubkey
        ) external
    ```

    - MUST check that this is not an auctionPeriod.
    - If last bidder is owner of `validatorId` behaviour should be similar to restake.
    - In second case unStake `validatorId` and add new user as validator from next checkpoint, for the new user behaviour should be similar to stake/stakeFor.

## checkSignatures

```cpp
function checkSignatures(
        uint256 blockInterval,
        bytes32 voteHash,
        bytes32 stateRoot,
        bytes memory sigs
    ) public
```

- Writes are meant only for RootChain contract when submitting checkpoints
- `voteHash` on which all validators sign (BFT ⅔+1 agreement)
- This function validates only unique sigs and checks for ⅔+1 power has signed on checkpoint root (inclusion in `voteHash` verification in RootChain contract for all data) `currentValidatorSetTotalStake` provides current active stake.
- Rewards are distributed proportional to validator's stake, more on rewards in below doc.

[Rewards Distribution](https://www.notion.so/Rewards-Distribution-127d586c14544beb9ea326fd3bb5d3a2)

### isValidator

- Checks if given validator is active validator for current epoch.

### Timeline data structure

```cpp
struct State {
        int256 amount;
        int256 stakerCount;
    }
mapping(uint256 => State) public validatorState;
```

<img src={useBaseUrl("img/staking_manager/staking_manager.png")} />

Diagram trying to explain timeline data structure

---

# StakingInfo

Source: [StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol)

Centralised logging contract for both validator and delegation events, Includes few read only functions.

# ValidatorShareFactory

Factory contract to deploy `ValidatorShare` contract for each validator who opt-in for delegation.

---

NOTE: `jail`, `unJail` and `slash` function aren't used currently (part of slashing implementation).