---
id: network-rpc-endpoints
title: Network Endpoints
sidebar_label: Endpoints
description: Network endpoints for Polyon PoS mainnet and testnet
keywords:
  - docs
  - polygon
  - matic
  - remote procedure call
  - network endpoints
  - rpcs
  - http
  - websocket
  - wss
image: https://wiki.polygon.technology/img/polygon-logo.png
slug: endpoints
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This index guide contains network details for the Polygon Mumbai testnet and Polygon PoS Mainnet and
lists their associated RPC and node endpoints.

<Tabs
  defaultValue="mainnet"
  values={[
    { label: 'PoS Mainnet', value: 'mainnet', },
    { label: 'PoS Testnet', value: 'mumbai', },
  ]
}>
<TabItem value="mumbai">

## Mumbai PoS Testnet

Mumbai Testnet replicates the Polygon Mainnet and is used for testing. Users can obtain
testnet tokens from the [faucet](https://faucet.polygon.technology/).
Testnet tokens are valueless and are different from value-bearing assets like MATIC.
This allows developers or network maintainers to test configurations and experiment implementations.

| Properties                         | Network Details                                                  |
| ---------------------------------- | ---------------------------------------------------------------- |
| NetworkName                        | **Mumbai**                                                       |
| ParentChain                        | **[Goërli](https://goerli.net/)**                                |
| chainId                            | `80001`                                                          |
| Gas Token                          | [MATIC](gas-token)                                               |
| Gas Station                        | [Mumbai Gas Station](https://gasstation-mumbai.matic.today/v2) (learn more [here](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/))                                      |
| RPC Endpoint                       | [https://rpc-mumbai.matic.today](https://rpc-mumbai.matic.today)         |
| Node Endpoint                      | [wss://rpc-mumbai.matic.today](wss://rpc-mumbai.matic.today)             |
| Heimdall API                       | [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology)     |
| Block Explorer                     | [https://mumbai.polygonscan.com/](https://mumbai.polygonscan.com/)       |

:::note More details

See the following [**JSON data**](https://static.matic.network/network/testnet/mumbai/index.json) containing
network details.

:::

</TabItem>
<TabItem value="mainnet">

## Polygon PoS Mainnet

The native token of the Polygon PoS is MATIC and is used for gas.

| Properties                         | Network Details                                                  |
| ---------------------------------- | ---------------------------------------------------------------- |
| NetworkName                        | **Polygon**                                                      |
| ParentChain                        | **Ethereum**                                                     |
| chainId                            | `137`                                                            |
| Gas Token                          | [MATIC](gas-token)                                               |
| Gas Station                        | [PolygonScan Gas Tracker (**recommended**)](https://polygonscan.com/gastracker) or [Matic Network Gas Station](https://gasstation-mainnet.matic.network/v2) (learn more [here](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/))                                                                       |
| RPC Endpoint                       | [https://polygon-rpc.com/](https://polygon-rpc.com/)                     |
| Node Endpoint                      | [wss://rpc-mainnet.matic.network](wss://rpc-mainnet.matic.network)       |
| Heimdall API                       | [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology) |
| Block Explorer                     | [https://polygonscan.com/](https://polygonscan.com/)       |

:::note More details

See the following [**JSON data**](https://github.com/maticnetwork/static/blob/master/network/mainnet/v1/index.json)
containing network details.

:::

</TabItem>
</Tabs>

## RPC API Methods

Developers can interact with on-chain data and send different types of transactions to
the network by utilizing network endpoints. The APIs follow a JSON-RPC standard;
JSON-RPC is a stateless, lightweight, remote procedure call (RPC) protocol that is
commonly used when interacting with a blockchain network.

:::info Get started with RPC calls

Start by visiting the complete set of API documentation for standard
[**Polygon JSON-RPC calls**](https://edge-docs.polygon.technology/docs/get-started/json-rpc-commands/).

If you want to get started with API requests that require no setup, fix failing requests, or,
explore new methods on the Polygon network, try out the [**Composer App**](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D).

:::

A user can also run their own node when interacting with the Polygon PoS chain or utilize
one of the public endpoints provided by infrastructure and API service providers to connect to
the network. Dagger is the best way to get realtime updates from the chain as it provides a way
for your dApps and backend system to get blockchain events in realtime over a socket or websocket.

### Infrastructure Providers

Public RPCs may have traffic or rate-limits depending on usage.
You can sign up for a dedicated free RPC URL at the following:

* [Alchemy](https://www.alchemy.com/)
* [Ankr](https://www.ankr.com/)
* [Blast (Bware Labs)](https://blastapi.io/)
* [BlockPI](https://blockpi.io/)
* [BlockSpaces](https://www.blockspaces.com/web3-infrastructure)
* [Chainnodes](https://www.chainnodes.org/)
* [Chainstack](https://chainstack.com/build-better-with-polygon/)
* [DataHub (Figment)](https://datahub.figment.io)
* [Getblock](https://getblock.io/en/)
* [Infura](https://infura.io)
* [MaticVigil](https://rpc.maticvigil.com/)
* [Moralis](https://moralis.io)
* [Pocket Network](https://www.portal.pokt.network/)
* [QuickNode](https://www.quicknode.com/chains/matic)
* [SettleMint](https://docs.settlemint.com/docs/polygon-connect-to-a-node)
* [WatchData](https://docs.watchdata.io/blockchain-apis/polygon-api)
* [NOWNodes](https://nownodes.io/nodes/polygon-matic)
