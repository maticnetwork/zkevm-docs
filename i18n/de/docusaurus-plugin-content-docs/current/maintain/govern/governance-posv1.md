---
id: governance-pos
title: Polygon PoS Consensus and Governance
sidebar_label: PoS Governance
description: Common governance terms and processes for the Polygon PoS blockchain.
keywords:
  - docs
  - matic
  - polygon
  - DAO
  - governance
slug: governance-pos
image: https://wiki.polygon.technology/img/polygon-logo.png
---

This page includes common governance terms and processes for the Polygon PoS blockchain.

## Heimdall

| Upgrade Type      | Softfork/Hardfork | Proposal                                      | Consensus Options      | Implementation Flow                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|-------------------|-------------------|-----------------------------------------------|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Software upgrades | Both              | PIP proposed via community forum (recommended) | Rough consensus        | Rough consensus:  <ol><li>Development and testing on local dev machines</li><li>Multi-node testing on devnet</li>  <li>Rolling out the release on a few Mumbai nodes (testnet)</li> <li>Rolling out the release on a few Mainnet nodes</li> <li>Full roll-out on Mumbai (testnet)</li> <li> Full roll-out on Mainnet</li></ol>                                                                                                                                                                                                     |
| Consensus rules   | Hardfork only     | PIP proposed via community forum (recommended) | Rough consensus        | Rough consensus:  <ol><li>Development and testing on local dev machines</li><li>Multi-node testing on devnet</li>  <li>Rolling out the release on a few Mumbai nodes (testnet)</li> <li>Rolling out the release on a few Mainnet nodes</li> <li>Full roll-out on Mumbai (testnet)</li> <li>Full roll-out on Mainnet</li></ol>                                                                                                                                                                                                       |
| [Governance module](https://forum.polygon.technology/t/overview-of-governance-on-matic/8191) | Both              | PIP proposed via community forum (recommended) | Governance module vote | Governance module:  <ol><li>Proposal submission: Validators can submit proposals with a deposit. Once the minimum deposit is reached, the proposal enters the voting period. Validators that deposited on proposals can recover their deposits once the proposal is rejected or accepted.</li> <li>Vote: Validators can vote on proposals that reached MinDeposit</li> <li>Once the voting parameters needed to pass the proposal are met, the change is simultaneously carried out across the network</li></ol> |

## Bor

| Upgrade Type      | Softfork/Hardfork | Proposal                                                                                           | Consensus Options | Implementation Flow                                                                                                                                                                                                                                                               |
|-------------------|-------------------|----------------------------------------------------------------------------------------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Software upgrades | Both              | PIP proposed via community forum (recommended)                                                      | Rough consensus   | Rough consensus:  <ol><li>Development and testing on local dev machines</li><li>Multi-node testing on devnet</li>  <li>Rolling out the release on a few Mumbai nodes (testnet)</li> <li>Rolling out the release on a few Mainnet nodes</li> <li>Full roll-out on Mumbai (testnet)</li> <li>Full roll-out on Mainnet</li></ol>
| Consensus rules   | Hardfork only     | Upgrades are made in line with the  [geth](https://github.com/ethereum/go-ethereum) implementation | Rough consensus   | Rough consensus:  <ol><li>Development and testing on local dev machines</li><li>Multi-node testing on devnet</li>  <li>Rolling out the release on a few Mumbai nodes (testnet)</li> <li>Rolling out the release on a few Mainnet nodes</li> <li>Full roll-out on Mumbai (testnet)</li> <li>Full roll-out on Mainnet</li></ol>

## Definitions

### Hardfork

A hardfork happens when the node software changes, so the new version is no longer
backward-compatible with earlier blocks. This is usually the result of a change in the consensus
calculation, meaning that blocks validated using the new calculation will produce a different hash.

In the current style of change implementation, hardfork block numbers
are broadcasted by the Polygon team after an initial staggered rollout to the larger nodes. A block
number is selected before which all nodes in the network should have upgraded to the new
version. Nodes running the old version will stop working (will be disconnected from the canonical
chain after the hardfork block).

Should there be ⅓+1 staked MATIC in disagreement with the fork, two canonical chains will temporarily
form until the end of the current span. After this, Bor will stop producing blocks, and the chain will
halt until consensus is reached.

### Softfork

This type of change is backward-compatible with the pre-fork blocks. This protocol change does
not require nodes to upgrade before a deadline. Therefore multiple versions of the node software can
be running at once and be able to validate transactions.

### Rough Consensus

Defined as the 'dominant view' of a group as determined by the current consensus framework.
Without a vote that can carry out a synchronous update across the network, the 'dominant view.'
is defined by the node software used by each validator, weighted by its total stake.

In the case of the Polygon PoS chain, this is programmatically defined by ⅔+1 of total staked MATIC.

### Governance module

The Polygon PoS consensus engine (Heimdall) has an inbuilt governance module that can synchronously
carry consensus parameter changes across the network. Users can submit proposals to the module
along with a deposit containing the proposed changes. Each validator tallies votes cast by validators.
Once the defined voting parameters are met, each validator automatically updates itself
with the proposal data.

The current voting parameters (denominated in staked MATIC):

- Quorum: 33.4%
- Threshold: 50%
- Veto: 33.4%

A list of the changeable parameters by the Heimdall governance module is available [here](https://github.com/maticnetwork/heimdall/blob/develop/auth/types/params.go).

### Polygon Improvement Proposal (PIP)

The PIP process, as defined in [PIP-1](https://forum.polygon.technology/t/pip-1-pip-purpose-and-guidelines/11356), outlined a preliminary approach for allowing the community
to put forward-protocol upgrades that improve the network.

This takes inspiration from the [PEP process](https://peps.python.org/pep-0001/), which has become a standard used for open source
projects, including [Ethereum](https://forum.polygon.technology/t/pip-1-pip-purpose-and-guidelines/11356) and [Bitcoin](https://github.com/bitcoin/bips).

As a guiding rule, it is recommended that all changes originate from the [Polygon community Forum](https://forum.polygon.technology/) and the [PIP Github repository](https://github.com/maticnetwork/Polygon-Improvement-Proposals), in the form of a proposal written in line with PIP-1.

On the Polygon PoS chain, different classifications of PIPs have different implementation flows. Thus, it is suggested to consult with the Governance processes board regarding the implementation of different types of PIPs.
