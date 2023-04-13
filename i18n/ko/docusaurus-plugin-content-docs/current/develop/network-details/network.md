---
id: network-rpc-endpoints
title: 네트워크 엔드포인트
sidebar_label: Endpoints
description: Polyon PoS 메인넷 및 테스트넷의 네트워크 끝점
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

이 인덱스 가이드는 Polygon Mumbai 테스트넷과 Polygon PoS 메인넷에 대한 네트워크 세부 정보를 포함하고 있습니다. 관련 RPC 및 노드 엔드포인트가 나열되어 있습니다.

<Tabs
defaultValue="mainnet"
values={[
{ label: 'PoS Mainnet', value: 'mainnet', },
{ label: 'PoS Testnet', value: 'mumbai', },
]
}>
<TabItem value="mumbai">

## 뭄바이 스테이크 증명 테스트넷 {#mumbai-pos-testnet}

뭄바이 테스트넷은 Polygon 메인넷을 복제하며 테스트용으로 사용됩니다. 사용자는
[Faucet](https://faucet.polygon.technology/)에서 테스트넷 토큰을 얻을 수 있습니다.
테스트넷 토큰은 가치가 없으며 매틱과 같이 가치를 지닌 자산과는 다릅니다.
이를 통해 개발자 또는 네트워크 관리자는 구성을 테스트하고 구현을 실험할 수 있습니다.

| 속성 | 네트워크 세부 정보 |
| ---------------------------------- | ---------------------------------------------------------------- |
| 네트워크 이름 | **뭄바이** |
| 상위 체인 | **[Goërli](https://goerli.net/)** |
| 체인 Id | `80001` |
| 가스 토큰 | [매틱](gas-token) |
| 가스 스테이션 | [뭄바이 가스 스테이션](https://gasstation-mumbai.matic.today/v2)([여기](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/)에서 자세히 알아보기) |
| RPC 엔드포인트 | [https://rpc-mumbai.matic.today](https://rpc-mumbai.matic.today) |
| 노드 엔드포인트 | [wss://rpc-mumbai.matic.today](wss://rpc-mumbai.matic.today) |
| Heimdall API | [https://heimdall-api-testnet.polygon.technology.technology를 지원합니다.](https://heimdall-api-testnet.polygon.technology) |
| 블록 탐색기 | [https://mumbai.polygonscan.com/](https://mumbai.polygonscan.com/) |

:::note 자세한 내용

네트워크 세부 정보가 포함된 다음 [**JSON 데이터**](https://static.matic.network/network/testnet/mumbai/index.json)를
참조하십시오.

:::

</TabItem>
<TabItem value="mainnet">

## Polygon 스테이크 증명 메인넷 {#polygon-pos-mainnet}

Polygon 스테이크 증명의 네이티브 토큰은 매틱이며 가스에 사용됩니다.

| 속성 | 네트워크 세부 정보 |
| ---------------------------------- | ---------------------------------------------------------------- |
| 네트워크 이름 | **Polygon** |
| 상위 체인 | **이더리움** |
| 체인 Id | `137` |
| 가스 토큰 | [매틱](gas-token) |
| 가스 스테이션 | [PolygonScan 가스 트래커(**권장**)](https://polygonscan.com/gastracker) 또는 [매틱 네트워크 가스 스테이션](https://gasstation-mainnet.matic.network/v2)([여기](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/)에서 자세히 알아보기) |
| RPC 엔드포인트 | [https://polygon-rpc.com/](https://polygon-rpc.com/) |
| 노드 엔드포인트 | [wss://rpc-mainnet.matic.network](wss://rpc-mainnet.matic.network) |
| Heimdall API | [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology) |
| 블록 탐색기 | [https://polygonscan.com/](https://polygonscan.com/) |

:::note 자세한 내용

네트워크 세부 정보가 포함된 다음 [**JSON 데이터**](https://github.com/maticnetwork/static/blob/master/network/mainnet/v1/index.json)를
참조하십시오.

:::

</TabItem>
</Tabs>

## RPC API 메서드 {#rpc-api-methods}

개발자는 온체인 데이터와 상호 작용하며 네트워크 엔드포인트를 활용하여
다양한 유형의 트랜잭션을 네트워크에 보낼 수 있습니다. API는 JSON-RPC 표준을 따릅니다.
JSON-RPC는 상태 비저장, 경량, 원격 프로씨저 호출(RPC) 프로토콜이며
블록체인 네트워크와 상호 작용할 때 일반적으로 사용됩니다.

:::info RPC 호출 시작하기

표준
[**Polygon JSON-RPC 호출**](https://edge-docs.polygon.technology/docs/get-started/json-rpc-commands/)에 대한 전체 API 문서 세트를 방문하는 것으로 시작해 보십시오.

설정이 필요하지 않은 API 요청을 시작하려면 실패한 요청을 수정하거나,
Polygon 네트워크에서 새로운 방법을 탐색하고 [**Composer 앱**](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D)을 사용해 보십시오.

:::

사용자는 또한 Polygon 스테이크 증명 체인과 상호 작용할 때 자신의 노드를 실행하거나
인프라 및 API 서비스 공급자가 제공하는 공개 엔드포인트 중 하나를 활용하여
네트워크에 연결할 수 있습니다. Dagger는 dApp 및 백엔드 시스템이 소켓 또는 웹 소켓을 통해 실시간으로 블록체인 이벤트를
가져올 수 있는 방법을 제공하기 때문에 체인에서 실시간 업데이트를 받을 수 있는 가장 좋은 방법입니다.

### 인프라 공급자 {#infrastructure-providers}

공용 RPC에는 사용량에 따라 트래픽 또는 속도 제한이 있을 수 있습니다.
다음에서 전용 무료 RPC URL에 가입할 수 있습니다.

* [Alchemy](https://www.alchemy.com/)
* [Ankr](https://www.ankr.com/)
* [Blast(Bware Labs)](https://blastapi.io/)
* [BlockPI](https://blockpi.io/)
* [블록 스페이스](https://www.blockspaces.com/web3-infrastructure)
* [Chainnode](https://www.chainnodes.org/)
* [Chainstack](https://chainstack.com/build-better-with-polygon/)
* [DataHub(Figment)](https://datahub.figment.io)
* [GetBlock](https://getblock.io/en/)
* [Infura](https://infura.io)
* [MaticVigil](https://rpc.maticvigil.com/)
* [Moralis](https://moralis.io)
* [Pocket Network](https://www.portal.pokt.network/)
* [QuickNode](https://www.quicknode.com/chains/matic)
* [SettleMint](https://docs.settlemint.com/docs/polygon-connect-to-a-node)
* [WatchData](https://docs.watchdata.io/blockchain-apis/polygon-api)
* [NOWNodes](https://nownodes.io/nodes/polygon-matic)
