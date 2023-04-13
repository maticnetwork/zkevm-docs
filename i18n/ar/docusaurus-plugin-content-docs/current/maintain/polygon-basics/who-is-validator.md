---
id: who-is-validator
title: Who is a Validator
sidebar_label: Who is a Validator
description: "A participant in the network who runs Heimdall and Bor nodes."
keywords:
  - docs
  - matic
  - polygon
  - validator
image: https://matic.network/banners/matic-network-16x9.png
---

A validator is a participant in the network who locks up MATIC tokens in the system and runs Heimdall validator and Bor block producer nodes in order to help run the network. Validators stake their MATIC tokens as collateral to work for the security of the network and in exchange for their service, earn rewards.

Rewards are distributed to all stakers proportional to their stake at every checkpoint with the exception being the proposer getting an additional bonus. User reward balance gets updated in the contract which is referred to while claiming rewards.

Stakes are at risk of getting slashed in case the validator node commits a malicious act like double signing which also affects the linked delegators at that checkpoint.

:::note Those who are interested in securing the network but are not running a full node can participate as [delegators](../glossary#delegator). :::

## Overview

Validators on the Polygon network are selected through an on-chain auction process which happens at regular intervals. These selected validators participate as block producers and verifiers. Once a [checkpoint](../glossary#checkpoint-transaction) is validated by the participants, updates are made on the parent chain (the Ethereum mainnet) which releases the rewards for validators depending on their stake in network.

Polygon relies on a set of [validators](../glossary#validator) to secure the network. The role of validators is to run a full node, [produce blocks](../glossary#block-producer), validate and participate in consensus, and commit [checkpoints](../glossary#checkpoint-transaction) on the Ethereum mainnet. To become a validator, one needs to [stake](../glossary#staking) their MATIC tokens with staking management contracts residing on the Ethereum mainnet.

## Core compenents

[Heimdall](../glossary#heimdall) reads the events emitted by the staking contracts to pick the validators for the current set with their updated stake ratio, which is used also by [Bor](../glossary#bor) while producing blocks.

[Delegation](../glossary#delegator) is also recorded in the staking contracts and any update in the validator power or node [signer address](../glossary#signer-address) or unbonding requests comes into effect when the next checkpoint gets committed.


## End-to-end flow for a Polygon validator

Validators set up their signing nodes, sync data and then stake their tokens on the Ethereum mainnet staking contracts to be accepted as a validator in the current set. If a slot is vacant, the validator is accepted immediately. Otherwise, one needs to go through the replacement mechanism to get a slot.

:::note
There is limited space for accepting new validators. New validators can only join the active set when a currently active validator unbonds. A new auction process for validator replacement will be rolled out.
:::

Block producers are chosen from the validator set where it is the responsibility of the selected validators to produce blocks for a given [span](../glossary#span).

Nodes at Heimdall validate the blocks being produced, participate in consensus and commit checkpoints on the Ethereum mainnet at defined intervals.

The probability of validators to get selected as the block producer or checkpoint [proposer](../glossary#proposer) is dependent on one’s stake ratio including delegations in the overall pool.

Validators receive rewards at every checkpoint as per their stake ratio, after deducting the proposer bonus which is disbursed to the checkpoint proposer.

One can opt out of the system at any time and can withdraw tokens once the unbonding period ends.

## Economics

See [Rewards](/docs/maintain/validator/rewards).

## Setting up a validator node

See [Validate](../validate/validator-index).

## See also

* [Validator Responsibilities](../validate/validator-responsibilities)
* [Validate](../validate/validator-index)
* [Validator FAQ](../validate/faq/validator-faq)
