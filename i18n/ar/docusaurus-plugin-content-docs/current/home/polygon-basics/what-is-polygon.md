---
id: what-is-polygon
title: What is Polygon?
description: "Learn what the Polygon scaling solution is."
keywords:
  - docs
  - matic
  - polygon
  - blockchain
image: https://matic.network/banners/matic-network-16x9.png
---

[Polygon](https://polygon.technology/) is a Layer 2 scaling solution that achieves scale by utilizing sidechains for off-chain computation and a decentralized network of Proof-of-Stake (PoS) validators.

Polygon strives to solve the scalability and usability issues while not compromising on decentralization and leveraging the existing developer community and ecosystem. Polygon is an ​off-/sidechain scaling solution for existing platforms to provide scalability and superior user experience to DApps and user functionalities.

It is a scaling solution for public blockchains. Polygon PoS supports all the existing Ethereum tooling along with faster and cheaper transactions.

## Key features & highlights

- **Scalability**: Fast, low-cost and secure transactions on Polygon sidechains with finality achieved on mainchain and Ethereum as the first compatible Layer 1 basechain.
- **High throughput**: Achieved up to 10,000 TPS on a single sidechain on internal testnet; Multiple chains to be added for horizontal scaling.
- **User experience**: Smooth UX and developer abstraction from mainchain to Polygon chain; native mobile apps and SDK with WalletConnect support.
- **Security**: Polygon chain operators are themselves stakers in the PoS system.
- **Public sidechains**: Polygon sidechains are public in nature (vs. individual DApp chains), permissionless and capable of supporting multiple protocols.

The Polygon system was consciously architected to support arbitrary state transitions on Polygon sidechains, which are EVM-enabled.

## Delegator and Validator Roles

You can participate on the Polygon network as a delegator or validator. See:

* [Who is a Validator](/docs/maintain/polygon-basics/who-is-validator)
* [Who is a Delegator](/docs/maintain/polygon-basics/who-is-delegator)

## Architecture

If your goal is to become a validator, it is essential that you understand the Polygon architecture.

See [Polygon Architecture](/docs/maintain/validator/architecture) for more information.

### Components

To have a granular understanding of Polygon's architecture, check out the core components:

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [Contracts](/docs/pos/contracts/stakingmanager)

#### Codebases

To have a granular understanding of the core components, see the following codebases:

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Contracts](https://github.com/maticnetwork/contracts)

## How-tos

### Node setup

There are basically two ways of running a Validator Node on Polygon, using Ansible or directly from the binaries. You can check how to do this with the links below:

* [Run a Validator Node with Ansible](/docs/maintain/validate/run-validator-ansible)
* [Run a Validator Node from Binaries](/docs/maintain/validate/run-validator-binaries)

### Staking operations

Check how the staking process is carried out for the validator and delegator profiles:

* [Validator Staking Operations](docs/maintain/validate/validator-staking-operations)
* [Delegate](/docs/maintain/delegate/delegate)
