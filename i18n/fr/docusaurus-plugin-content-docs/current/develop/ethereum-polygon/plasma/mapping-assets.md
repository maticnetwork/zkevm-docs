---
id: mapping-assets
title: Mapping Assets using Plasma
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

ERC20 and ERC721 tokens on Ethereum can be deposited and withdrawn from Polygon chain using plasma protocol. To enable this, a token contract on Ethereum (_rootToken_) needs to be mapped to a token contract on Polygon chain(_childToken_).

You can submit your mapping request [here](/docs/develop/ethereum-polygon/submit-mapping-request). Please make note that this mapping submission form is for Plasma Bridge and for PoS bridge you have to directly contact the matic team on discord.

## Mapping a token

Mapping a token involves deploying a _childToken_ contract on Polygon chain and registering the token on both main and Polygon chain.

A restricted _childToken_ is deployed and registered on Polygon chain automatically by making a contract call to the ChildChain contract. But if the _rootToken_ has extra functionality apart from basic ERC20/ERC721, a custom _childToken_ contract needs to be deployed manually. (Read [adding additional functionality](/docs/develop/ethereum-polygon/plasma/mapping-assets#adding-functionality-to-child-token))

## Deploying a 'Restricted' Child Token

### Step 1: On Polygon

The [`addToken` function call](https://github.com/maticnetwork/contracts/blob/fd4ed8343a8abb2dda5fe5a6a75a747cfd7a2807/contracts/child/ChildChain.sol#L55) on ChildChain contract deploys a child Token on Polygon, with restricted functionality (see: [ChildERC20](https://github.com/maticnetwork/contracts/blob/master/contracts/child/ChildERC20.sol) and [ChildERC721](https://github.com/maticnetwork/contracts/blob/master/contracts/child/ChildERC721.sol)), these is done to ensure Plasma security for the asset, otherwise the model gets broken. So if you need Plasma security with a custom token and added functionality on top of what the generic token provides, you need to write your contracts safely with restrictions as mandated.

Certain Data structures are maintained to keep track of the asset on Polygon: such as the events, [Deposit](https://github.com/maticnetwork/contracts/blob/fd4ed8343a8abb2dda5fe5a6a75a747cfd7a2807/contracts/child/BaseERC20.sol#L6), [Withdraw](https://github.com/maticnetwork/contracts/blob/fd4ed8343a8abb2dda5fe5a6a75a747cfd7a2807/contracts/child/BaseERC20.sol#L14), [LogTransfer](https://github.com/maticnetwork/contracts/blob/fd4ed8343a8abb2dda5fe5a6a75a747cfd7a2807/contracts/child/BaseERC20.sol#L22). These are absolutely essential to the Plasma contracts that read this data to ensure data verification of the sidechain via fraud proofs and Plasma predicates.

Based on feedback from developers, we have added mechanisms that allow devs to now program any restrictions that they wish to keep for transfers for example - see [this doc](/docs/develop/advanced/custom-restrictions) for example. This allows arbitrary logic to be coded before the Plasma-safe transfer takes place, keeping the transfer and custom logic separated - so as to ensure Plasma safety.

#### Note on Restrictions

Plasma security is relatively straightforward to implement for user-controlled accounts or EOAs, since ownership of an asset is easy to derive. However, contracts are difficult to program for Plasma, since ownership of assets cannot be known in advance, and can vary depending on the complexity of the contract.

Therefore, we support some types of contracts as [Plasma predicates](https://github.com/maticnetwork/contracts/tree/master/contracts/root/predicates). We are beginning with a few pre-built predicates such as asset transfers, asset swaps, etc. - and will be increasing the number of pre-built predicates to reflect a wide variety of use cases.

### Step 2: On Ethereum

A mapping on Registry contract is updated for each asset to be mapped. This is done via the [`mapToken` function call](https://github.com/maticnetwork/contracts/blob/fd4ed8343a8abb2dda5fe5a6a75a747cfd7a2807/contracts/common/Registry.sol#L64) on Ethereum (or Ropsten). This function takes the mapped address returned from the `addToken` call to ChildChain and updates the mapping on Ethereum.

## Moving an Asset

### Deposits

1. The Deposit Manager Contract is approved to spend X on behalf of msg.sender
2. The Deposit Manager transfers the amount from msg.sender to itself

This ensures the asset is locked on Main chain and isn't transferrable while the token is being used on Polygon

### Withdrawals

1. Burn tokens on Polygon sidechain
2. Submit proof of burn (the receipt of burn tx) on Root Chain
   1. This step is executed only after the block consisting of the burn tx has been included in a checkpoint on the Root Chain.
   2. After checkpoint submission, a successful execution of this step
      1. marks the initiation of the Challenge Exit Period (which is a 7-day period on main network, and set to 5 minute on test networks)
      2. Mints an ExitNFT token to the exitor's account - which is representative of the exit initiated on the child chain by the exitor
   3. processExits burns the Exit NFT and transfers the tokens back from Deposit manager to the exitor.

## Adding functionality to Child token

In some cases you might require added functionality on top of what the restricted child token provides. To add your custom token as child on Polygon, you can inherit the standard plasma contract and add custom functions according to your use. Eg.,

```javascript

pragma solidity ^0.5.2;

import { ChildERC20 } from "./ChildERC20.sol";


contract YourCustomChildToken is ChildERC20 {

  // your custom functions

}
```

### request-submission

Please go through [this](/docs/develop/ethereum-polygon/submit-mapping-request).
