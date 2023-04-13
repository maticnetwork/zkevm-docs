---
id: network-rpc-endpoints
title: Netzwerk-Endpunkte
sidebar_label: Endpoints
description: Network für Polyon PoS Mainnet und testnet
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

Dieser Indexleitfaden enthält Netzwerkdetails für den Polygon Mumbai testnet und Polygon PoS Mainnet und listet die zugehörigen RPC und Knoten-Endpunkte.

<Tabs
defaultValue="mainnet"
values={[
{ label: 'PoS Mainnet', value: 'mainnet', },
{ label: 'PoS Testnet', value: 'mumbai', },
]
}>
<TabItem value="mumbai">

## Mumbai PoS-Testnet {#mumbai-pos-testnet}

Das Mumbai Testnet repliziert das Polygon-Mainnet und wird für zu Testzwecken verwendet. Benutzer können
Testnet-Token über den [Faucet](https://faucet.polygon.technology/) erhalten.
Tesnet-Token sind wertlos und unterscheiden sich von Wertassets wie MATIC.
So können Entwickler oder Netzwerk-Instandhalter Konfigurationen testen und Implementierungen ausprobieren.

| Eigenschaften | Netzwerk-Details |
| ---------------------------------- | ---------------------------------------------------------------- |
| Netzwerkname | **Mumbai** |
| Übergeordnete Chain | **[Goërli](https://goerli.net/)** |
| chainId | `80001` |
| Gas-Token | [MATIC](gas-token) |
| Gas Station | [Mumbai Gas Station](https://gasstation-mumbai.matic.today/v2) ([hier](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/) erfährst du mehr) |
| RPC-Endpunkt | [https://rpc-mumbai.matic.today](https://rpc-mumbai.matic.today) |
| Knoten-Endpunkt | [wss://rpc-mumbai.matic.today](wss://rpc-mumbai.matic.today) |
| Heimdall API | [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology) |
| Block-Explorer | [https://mumbai.polygonscan.com/](https://mumbai.polygonscan.com/) |

:::note Weitere Informationen

Lies die folgenden [**JSON-Daten**](https://static.matic.network/network/testnet/mumbai/index.json), die
Netzwerkdaten enthalten.

:::

</TabItem>
<TabItem value="mainnet">

## Polygon PoS Mainnet {#polygon-pos-mainnet}

Das native Token von Polygon Pos ist MATIC und wird für Gas verwendet.

| Eigenschaften | Netzwerk-Details |
| ---------------------------------- | ---------------------------------------------------------------- |
| Netzwerkname | **Polygon** |
| Übergeordnete Chain | **Ethereum** |
| chainId | `137` |
| Gas-Token | [MATIC](gas-token) |
| Gas Station | [PolygonScan Gas Tracker (**empfohlen**)](https://polygonscan.com/gastracker) oder [Matic Netzwerk Gas Station](https://gasstation-mainnet.matic.network/v2) ([hier](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/) erfährst du mehr) |
| RPC-Endpunkt | [https://polygon-rpc.com/](https://polygon-rpc.com/) |
| Knoten-Endpunkt | [wss://rpc-mainnet.matic.network](wss://rpc-mainnet.matic.network) |
| Heimdall API | [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology) |
| Block-Explorer | [https://polygonscan.com/](https://polygonscan.com/) |

:::note Weitere Informationen

Lies die folgenden [**JSON-Daten**](https://github.com/maticnetwork/static/blob/master/network/mainnet/v1/index.json)
mit Netzwerkdetails.

:::

</TabItem>
</Tabs>

## RPC API-Methoden {#rpc-api-methods}

Entwickler können mit Daten auf der Chain interagieren und verschiedene Transaktionen
über Netzwerk-Endpunkte an das Netzwerk senden. Die APIs folgen einem JSON-RPC-Standard;
JSON-RPC ist ein zustandsloses, leichtes Remote Procedure Call (RPC)-Protokoll, das
häufig für die Interaktion mit einem Blockchain-Netzwerk genutzt wird.

:::info Erste Schritte mit RPC-Aufrufen

Lies zuerst die gesamte API-Dokumentation für Standard-
[**Polygon JSON-RPC-Aufrufe**](https://edge-docs.polygon.technology/docs/get-started/json-rpc-commands/).

Wenn du mit API-Anfragen ohne Einrichtung beginnen, fehlerhafte Anfragen korrigieren oder
neue Methoden im Polygon-Netzwerk erkunden möchtest, teste die [**Composer App**](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D).

:::

Benutzer können auch ihren eigenen Knoten ausführen, wenn sie mit der Polygon PoS-Chain interagieren oder
einen der öffentlich Endpunkte von Infrastruktur- und API Serviceanbietern nutzen, um sich mit
dem Netzwerk zu verbinden. Dagger ist die beste Möglichkeit, um Updates in Echtzeit von der Chain zu erhalten, da es
deinen dApps und deinem Backend-System ermöglicht, Blockchain-Ereignisse in Echtzeit über eine Socket oder Websocket zu erhalten.

### Infrastrukturanbieter {#infrastructure-providers}

Öffentliche RPCs können abhängig von der Nutzung Traffic- oder Rate-Limits aufweisen.
Du kannst dich hier für eine eigene kostenlose RPC-URL anmelden:

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
