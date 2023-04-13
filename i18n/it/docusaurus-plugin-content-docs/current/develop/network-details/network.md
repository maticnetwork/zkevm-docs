---
id: network-rpc-endpoints
title: Endpoint di rete
sidebar_label: Endpoints
description: endpoint di rete per Polyon PoS mainnet e testnet
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
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: endpoints
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Questa guida dell'indice contiene i dettagli di rete per la testnet di Polygon Mumbai e Polygon PoS Mainnet e elenca i loro endpoint RPC e di nodo associati.

<Tabs
defaultValue="mainnet"
values={[
{ label: 'PoS Mainnet', value: 'mainnet', },
{ label: 'PoS Testnet', value: 'mumbai', },
]
}>
<TabItem value="mumbai">

## Mumbai PoS Testnet {#mumbai-pos-testnet}

Mumbai Testnet replica la Mainnet di Polygon e viene utilizzata per i test. Gli utenti possono ottenere
token testnet dal [faucet](https://faucet.polygon.technology/).
I token di Testnet sono privi di valore e sono diversi dagli asset che detengono un valore intrinseco come MATIC. Questo permette agli sviluppatori o a coloro che mantengono la sicurezza della rete di testare le configurazioni e sperimentare le implementazioni.

| Proprietà | Dettagli di rete |
| ---------------------------------- | ---------------------------------------------------------------- |
| NetworkName | **Mumbai** |
| ParentChain | **[Goërli](https://goerli.net/)** |
| chainId | `80001` |
| Gas Token | [MATIC](gas-token) |
| Gas Station | [Mumbai Gas Station](https://gasstation-mumbai.matic.today/v2) (scopri di più [qui](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/)) |
| RPC Endpoint | [https://rpc-mumbai.matic.today](https://rpc-mumbai.matic.today) |
| Node Endpoint | [wss://rpc-mumbai.matic.today](wss://rpc-mumbai.matic.today) |
| Heimdall API | [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology) |
| Block Explorer | [https://mumbai.polygonscan.com/](https://mumbai.polygonscan.com/) |

:::note Altri dettagli

Consulta i seguenti [**dati JSON**](https://static.matic.network/network/testnet/mumbai/index.json) contenenti
i dettagli di rete.

:::

</TabItem>
<TabItem value="mainnet">

## Polygon PoS Mainnet {#polygon-pos-mainnet}

Il token nativo di Polygon PoS è MATIC e viene utilizzato per il gas.

| Proprietà | Dettagli di rete |
| ---------------------------------- | ---------------------------------------------------------------- |
| NetworkName | **Polygon** |
| ParentChain | **Ethereum** |
| chainId | `137` |
| Gas Token | [MATIC](gas-token) |
| Gas Station | [PolygonScan Gas Tracker (**consigliato**)](https://polygonscan.com/gastracker) o [Matic Network Gas Station](https://gasstation-mainnet.matic.network/v2) (scopri di più [qui](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/)) |
| RPC Endpoint | [https://polygon-rpc.com/](https://polygon-rpc.com/) |
| Node Endpoint | [wss://rpc-mainnet.matic.network](wss://rpc-mainnet.matic.network) |
| Heimdall API | [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology) |
| Block Explorer | [https://polygonscan.com/](https://polygonscan.com/) |

:::note Altri dettagli

Consulta i seguenti [**dati JSON**](https://github.com/maticnetwork/static/blob/master/network/mainnet/v1/index.json)
contenenti i dettagli di rete.

:::

</TabItem>
</Tabs>

## Metodi RPC API {#rpc-api-methods}

Gli sviluppatori possono interagire con i dati della catena e inviare diversi tipi di transazioni alla rete utilizzando gli endpoint di rete. Le API seguono uno standard JSON-RPC;
JSON-RPC è un protocollo di chiamata di procedura remota (RPC) stateless e leggero che è comunemente utilizzato quando si interagisce con una rete blockchain.

:::info Iniziare con le chiamate RPC

Inizia visitando il set completo della documentazione API per lo standard
[**Chiamate Polygon JSON-RPC**](https://edge-docs.polygon.technology/docs/get-started/json-rpc-commands/).

Se vuoi iniziare con le richieste API che non richiedano alcuna configurazione, correggere le richieste che non vanno a buon fine o
esplorare nuovi metodi sulla rete di Polygon, prova il programma [**Composer App**](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D).

:::

Un utente può anche gestire il proprio nodo quando interagisce con la catena Polygon PoS oppure utilizzare uno degli endpoint pubblici messi a disposizione dai fornitori di servizi di infrastruttura e API per connettersi alla rete. Dagger è il modo migliore per ottenere aggiornamenti in tempo reale dalla catena in quanto fornisce un modo
per le tue dApp e il tuo sistema di backend per ottenere eventi blockchain in tempo reale attraverso un socket o un websocket.

### Fornitori di infrastruttura {#infrastructure-providers}

Le RPC pubbliche possono avere limiti di traffico o di velocità a seconda dell'utilizzo.
Puoi registrarti qui per ottenere un URL RPC dedicato e gratuito:

* [Alchemy](https://www.alchemy.com/)
* [Ankr](https://www.ankr.com/)
* [Blast (Bware Labs)](https://blastapi.io/)
* [BlockPI](https://blockpi.io/)
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
