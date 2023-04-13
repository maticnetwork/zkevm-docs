---
id: network-rpc-endpoints
title: Конечные точки сети
sidebar_label: Endpoints
description: Конечные точки сети для mainnet Polyon PoS и testnet
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

Это руководство содержит данные сети для testnet Polygon Mumbai и Mainnet Polygon PoS и перечень связанных с ними RPC и конечных точек нодов.

<Tabs
defaultValue="mainnet"
values={[
{ label: 'PoS Mainnet', value: 'mainnet', },
{ label: 'PoS Testnet', value: 'mumbai', },
]
}>
<TabItem value="mumbai">

## Тестовая сеть Mumbai PoS {#mumbai-pos-testnet}

Тестовая сеть Mumbai реплицирует Polygon Mainnet и используется для тестирования. Пользователи могут получить
токены тестовой сети из [faucet](https://faucet.polygon.technology/).
Токены тестовой сети не имеют ценности и отличаются от имеющих ценность активов, таких как MATIC.
Это позволяет разработчикам систем обслуживания сети тестировать конфигурации и экспериментировать с реализацией.

| Свойства | Детали сети |
| ---------------------------------- | ---------------------------------------------------------------- |
| NetworkName | **Mumbai** |
| ParentChain | **[Goërli](https://goerli.net/)** |
| chainId | `80001` |
| Токен газа | [MATIC](gas-token) |
| Газовая станция | [Газовая станция Mumbai](https://gasstation-mumbai.matic.today/v2) (подробности [здесь](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/)) |
| Конечная точка RPC | [https://rpc-mumbai.matic.today](https://rpc-mumbai.matic.today) |
| Конечная точка нода | [wss://rpc-mumbai.matic.today](wss://rpc-mumbai.matic.today) |
| Heimdall API | [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology) |
| Обозреватель блоков | [https://mumbai.polygonscan.com/](https://mumbai.polygonscan.com/) |

:::note Более подробная информация

См. следующие [**данные JSON,**](https://static.matic.network/network/testnet/mumbai/index.json) содержащие
детали сети.

:::

</TabItem>
<TabItem value="mainnet">

## Polygon PoS Mainnet {#polygon-pos-mainnet}

MATIC — нативный токен сети Polygon PoS, используемый для газа.

| Свойства | Детали сети |
| ---------------------------------- | ---------------------------------------------------------------- |
| NetworkName | **Polygon** |
| ParentChain | **Ethereum** |
| chainId | `137` |
| Токен газа | [MATIC](gas-token) |
| Газовая станция | [PolygonScan Gas Tracker (**рекомендуется**)](https://polygonscan.com/gastracker) или [Matic Network Gas Station](https://gasstation-mainnet.matic.network/v2) (подробности [здесь](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/)) |
| Конечная точка RPC | [https://polygon-rpc.com/](https://polygon-rpc.com/) |
| Конечная точка нода | [wss://rpc-mainnet.matic.network](wss://rpc-mainnet.matic.network) |
| Heimdall API | [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology) |
| Обозреватель блоков | [https://polygonscan.com/](https://polygonscan.com/) |

:::note Более подробная информация

См. следующие [**данные JSON**](https://github.com/maticnetwork/static/blob/master/network/mainnet/v1/index.json)
с подробными данными о сети.

:::

</TabItem>
</Tabs>

## Методы RPC API {#rpc-api-methods}

Разработчики могут взаимодействовать с данными в цепочке и отправлять разные типы транзакций в сеть, используя конечные токи сети. API следуют стандарту JSON-RPC;
JSON-RPC — это не имеющий состояния легкий протокол удаленного вызова процедур (RPC), который
обычно используется при взаимодействии с сетью блокчейна.

:::info Начните работать с вызовами RPC

Для начала ознакомьтесь с полным комплектом документации API для стандартных вызовов
[**Polygon JSON-RPC**](https://edge-docs.polygon.technology/docs/get-started/json-rpc-commands/).

Если вы хотите начать с запросов API, не требующих настройки, исправить неработающие запросы или
изучить новые методы в сети Polygon, попробуйте [**Composer App**](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D).

:::

Пользователь также может запустить собственный нод при взаимодействии с цепочкой Polygon PoS или использовать
одну из публичных конечных точек, предоставленных инфраструктурой и поставщиками сервисов API для подключения к сети. Dagger — это лучший способ получать обновления из цепочки в реальном времени, потому что он дает
децентрализованным приложениям и серверной системе способ получения событий блокчейна в реальном времени через socket или websocket.

### Провайдеры инфраструктуры {#infrastructure-providers}

Публичные RPC могут иметь ограничения трафика или скорости в зависимости от использования.
Вы можете подписаться на выделенный свободный URL RPC с помощью следующих средств:

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
