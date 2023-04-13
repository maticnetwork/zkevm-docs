---
id: network-rpc-endpoints
title: Terminales de red
sidebar_label: Endpoints
description: Terminales de red para  y red de  de Polyon
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

Esta guía del índice contiene detalles de la red para la red de pruebas de Polygon Mumbai y enumera los terminales de las llamadas a procedimientos remotos (RPC) y los nodos asociados.

<Tabs
defaultValue="mainnet"
values={[
{ label: 'PoS Mainnet', value: 'mainnet', },
{ label: 'PoS Testnet', value: 'mumbai', },
]
}>
<TabItem value="mumbai">

## Red de pruebas de PoS Mumbai {#mumbai-pos-testnet}

La red de pruebas Mumbai replica la red principal de Polygon y se usa para hacer pruebas. Los usuarios pueden obtener
tokens de la red de pruebas desde el [grifo](https://faucet.polygon.technology/).
Los tokens de la red de pruebas no tienen valor y son diferentes de los activos con valor, como MATIC.
Eso les permite a los desarrolladores o los mantenedores de redes poner a prueba configuraciones y experimentar implementaciones.

| Propiedades | Información de la red |
| ---------------------------------- | ---------------------------------------------------------------- |
| Nombre de la red | **Mumbai** |
| Cadena principal | **[Goërli](https://goerli.net/)** |
| ID de la cadena | `80001` |
| Token de gas | [MATIC](gas-token) |
| Gasolinera | [Gasolinera de Mumbai](https://gasstation-mumbai.matic.today/v2) (más información [aquí](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/)) |
| Terminal de RPC | [https://rpc-mumbai.matic.today](https://rpc-mumbai.matic.today) |
| Terminal de nodo | [wss://rpc-mumbai.matic.today](wss://rpc-mumbai.matic.today) |
| API de Heimdall | [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology) |
| Explorador de bloques | [https://mumbai.polygonscan.com/](https://mumbai.polygonscan.com/) |

:::note Más información

Consulta los siguientes [**datos de JSON**](https://static.matic.network/network/testnet/mumbai/index.json) que contienen
información de la red.

:::

</TabItem>
<TabItem value="mainnet">

## Red principal de PoS de Polygon {#polygon-pos-mainnet}

El token nativo de las PoS de Polygon es MATIC y se usa para el gas.

| Propiedades | Información de la red |
| ---------------------------------- | ---------------------------------------------------------------- |
| Nombre de la red | **Polygon** |
| Cadena principal | **Ethereum** |
| ID de la cadena | `137` |
| Token de gas | [MATIC](gas-token) |
| Gasolinera | [Rastreador de gas de PolygonScan (**recomendado**)](https://polygonscan.com/gastracker) o [Gasolinera de la red de MATIC](https://gasstation-mainnet.matic.network/v2) (más información [aquí](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/)) |
| Terminal de RPC | [https://polygon-rpc.com/](https://polygon-rpc.com/) |
| Terminal del nodo | [wss://rpc-mainnet.matic.network](wss://rpc-mainnet.matic.network) |
| API de Heimdall | [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology) |
| Explorador de bloques | [https://polygonscan.com/](https://polygonscan.com/) |

:::note Más información

Consulta los siguientes [**datos de JSON**](https://github.com/maticnetwork/static/blob/master/network/mainnet/v1/index.json)
que contienen la información de la red.

:::

</TabItem>
</Tabs>

## Métodos de RPC de la API {#rpc-api-methods}

Los desarrolladores pueden interactuar con datos en la cadena y enviar distintos tipos de transacciones a
la red mediante los terminales de red. Las API siguen un estándar de JSON-RPC;
JSON-RPC es un protocolo de RPC liviano y sin estado,
que se usa comúnmente al interactuar con una red de cadena de bloques.

:::info Cómo comenzar con las llamadas RPC

Empieza por consultar todo el conjunto de documentación sobre API para
[**llamadas estándar de JSON-RPC de Polygon**](https://edge-docs.polygon.technology/docs/get-started/json-rpc-commands/).

Si quieres comenzar con las solicitudes de API que no requieren configuración ni corrección de solicitudes fallidas o
explorar nuevos métodos en la red de Polygon, prueba la aplicación [**Composer**](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D).

:::

Los usuarios también pueden ejecutar sus propios nodos cuando interactúen con la cadena de PoS de Polygon o usar
uno de los terminales públicos ofrecidos por proveedores de infraestructura y servicios de API para conectarse con
la red. Dagger es la mejor forma de obtener actualizaciones en tiempo real de la cadena, ya que permite
que tus aplicaciones descentralizadas (DApp) y el modo administrador (backend) del sistema reciban los eventos de la cadena de bloques en tiempo real mediante un socket o websocket.

### Proveedores de infraestructura {#infrastructure-providers}

Las RPC públicas pueden tener límites de tráfico o velocidad dependiendo del uso.
Puedes registrarte para obtener un URL de RPC gratuita dedicada en los siguientes proveedores:

* [Alchemy](https://www.alchemy.com/)
* [Ankr](https://www.ankr.com/)
* [Blast (Bware Labs)](https://blastapi.io/)
* [BlockPI](https://blockpi.io/)
* [Nodos de cadena](https://www.chainnodes.org/)
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
