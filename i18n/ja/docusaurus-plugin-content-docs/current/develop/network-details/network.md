---
id: network-rpc-endpoints
title: ネットワークエンドポイント
sidebar_label: Endpoints
description: Polyon PoSメインネットとテストネットのためのネットワークエンドポイント
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

このインデックスガイドには、Polygon MumbaiテストネットとPolygon PoSメインネットのネットワーク詳細が含まれています。関連するRPCとノードエンドポイント一覧が含まれています。

<Tabs
defaultValue="mainnet"
values={[
{ label: 'PoS Mainnet', value: 'mainnet', },
{ label: 'PoS Testnet', value: 'mumbai', },
]
}>
<TabItem value="mumbai">

## Mumbai PoSテストネット {#mumbai-pos-testnet}

Mumbaiテストネットは、テストに使用されるPolygon Mainnetを複製します。ユーザは、[フォーセット](https://faucet.polygon.technology/)からテストネット トークンを取得できます。テストネット トークンは価値がなく、MATICのような価値のある資産とは異なります。これにより、開発者またはネットワーク管理者は、構成をテストし、実装を実験できます。

| プロパティ | ネットワークの詳細 |
| ---------------------------------- | ---------------------------------------------------------------- |
| NetworkName | **Mumbai** |
| ParentChain | **[Goërli](https://goerli.net/)** |
| chainId | `80001` |
| ガストークン | [Matic](gas-token) |
| ガスステーション | [Mumbaiガスステーション](https://gasstation-mumbai.matic.today/v2)（詳細[はこちら](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/)） |
| RPCエンドポイント | [https://rpc-mumbai.matic.today](https://rpc-mumbai.matic.today) |
| ノードエンドポイント | [wss://rpc-mumbai.matic.today](wss://rpc-mumbai.matic.today) |
| Heimdall API | [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology) |
| ブロックエクスプローラ | [https://mumbai.polygonscan.com/](https://mumbai.polygonscan.com/) |

:::note 詳細

ネットワークの詳細を含む次の[**JSON データ**](https://static.matic.network/network/testnet/mumbai/index.json)をを参照してください。

:::

</TabItem>
<TabItem value="mainnet">

## Polygon PoS Mainnet {#polygon-pos-mainnet}

Polygon PoSのネイティブトークンは、Maticであり、ガスに使用されます。

| プロパティ | ネットワークの詳細 |
| ---------------------------------- | ---------------------------------------------------------------- |
| NetworkName | **Polygon** |
| ParentChain | **Ethereum** |
| chainId | `137` |
| ガストークン | [Matic](gas-token) |
| ガスステーション | [PolygonScanガストラッカー（**推奨**）](https://polygonscan.com/gastracker)または[Maticネットワークガスステーション](https://gasstation-mainnet.matic.network/v2)（詳細は、[こちら](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/)） |
| RPCエンドポイント | [https://polygon-rpc.com/](https://polygon-rpc.com/) |
| ノードエンドポイント | [wss://rpc-mainnet.matic.network](wss://rpc-mainnet.matic.network) |
| Heimdall API | [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology) |
| ブロックエクスプローラ | [https://polygonscan.com/](https://polygonscan.com/) |

:::note 詳細

以下の[**JSONデータ**](https://github.com/maticnetwork/static/blob/master/network/mainnet/v1/index.json)を参照してください。これには、ネットワーク詳細が含まれています。

:::

</TabItem>
</Tabs>

## RPC APIメソッド {#rpc-api-methods}

開発者は、オンチェーンデータとやり取りし、さまざまな種類のトランザクションを、ネットワークエンドポイントを利用して、ネットワークに送信できます。APIは、JSON-RPC標準に従っています：JSON-RPCは、ステートレス、軽量リモートプロシージャコール（RPC)プロトコルで、ブロックチェーンネットワークとやり取りする際に一般的に使用されています。

:::info RPC 呼び出しを開始する

まず、標準のAPIドキュメントの完全なセットにアクセスしてスタートしてください：[**「Polygon JSON-RPC呼び出し」**](https://edge-docs.polygon.technology/docs/get-started/json-rpc-commands/)。

セットアップを必要としない API リクエストを開始したり、失敗したリクエストを修正したり、Polygonネットワークで新しいメソッドを探索したりするには、[**Composerアプリ**](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D)を試してください。

:::

ユーザは、Polygon PoS チェーンとやり取りするときに、独自のノードを実行したり、インフラストラクチャやAPIサービスプロバイダが提供するパブリックエンドポイントの1つを利用してネットワークに接続したりすることもできます。Daggerは、チェーンからリアルタイムに更新を取得するための最良の方法です。というのは、dAppsとバックエンドシステムがソケットまたはWebsocketを介してリアルタイムでブロックチェーンイベントを取得する方法を提供するためです。

### インフラストラクチャプロバイダ {#infrastructure-providers}

パブリックRPCには、使用状況に応じて、トラフィックまたはレート制限が存在する可能性があります。専用の無料RPC URLは、次の場所で署名できます。

* [Alchemy](https://www.alchemy.com/)
* [Ankr](https://www.ankr.com/)
* [Blast（Bwareラボ）](https://blastapi.io/)
* [BlockPI](https://blockpi.io/)
* [チェーンノード](https://www.chainnodes.org/)
* [Chainstack](https://chainstack.com/build-better-with-polygon/)
* [DataHub（図）](https://datahub.figment.io)
* [Getblock](https://getblock.io/en/)
* [Infura](https://infura.io)
* [MaticVigil](https://rpc.maticvigil.com/)
* [Moralis](https://moralis.io)
* [ポケットネットワーク](https://www.portal.pokt.network/)
* [QuickNode](https://www.quicknode.com/chains/matic)
* [SettleMint](https://docs.settlemint.com/docs/polygon-connect-to-a-node)
* [WatchData](https://docs.watchdata.io/blockchain-apis/polygon-api)
* [NOWNodes](https://nownodes.io/nodes/polygon-matic)
