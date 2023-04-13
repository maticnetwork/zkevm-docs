---
id: bor
title: Borアーキテクチャ
description: PolygonアーキテクチャにおけるBorの役割
keywords:
  - docs
  - matic
  - Bor Architecture
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Borアーキテクチャ {#bor-architecture}

Polygonは、**Plasma+Proof-of-Stake（PoS）**のハイブリッドプラットフォームです。Polygonネットワーク上のデュアルコンセンサスアーキテクチャを使用して、速度と分散化を最適化します。EVMが有効なサイドチェーン上で任意の状態遷移をサポートするシステムを意識的に設計しました。

## アーキテクチャ {#architecture}

<img src={useBaseUrl("img/Bor/matic_structure.png")}/>

ブロックチェーンは、相互作用し、機能するネットワーククライアントのセットです。クライアントは他のクライアントとのp2p通信チャネルを確立し、トランザクションの署名とブロードキャスト、デプロイおよびスマートコントラクトとの相互作用などが可能なソフトウェアの一部です。クライアントはノードとも呼ばれています。

Polygonの場合、ノードはHeimdall（バリデータレイヤー）とBor（ブロックプロデューサーレイヤー）の2つのレイヤー実装で設計されています。

1. Heimdall
    - プルーフオブステーク検証
    - Ethereumのメインチェーン上のチェックポイントのブロック
    - バリデータおよび報酬管理
    - Ethereumのメインチェーンとの同期を確保する
    - 分散型ブリッジ
2. Bor
    - Polygonチェーン
    - EVM互換性VM
    - プロポーザーとプロデューサー設定の選択
    - SystemCall
    - 手数料モデル

## Heimdall（バリデータレイヤー） {#heimdall-validator-layer}

Heimdall（オールプロテクター）は、Polygonプルーフ・オブ・ステークシステムで起こるすべてのパーベアーです。良いか悪いかの方法で。

Heimdallは、当社のプルーフ・オブ・ステーク（PoS）検証レイヤーです。アーキテクチャのメインチェーンに対するPlasmaブロックの表現をチェックポインティングします。私たちは、これをTendermintコンセンサスエンジンで実装しており、署名スキームやさまざまなデータ構造の変更が伴います。

詳細につきましては、[https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/](https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/) をご覧ください。

## Bor（ブロックプロデューサレイヤー） {#bor-block-producer-layer}

Borノード実装は基本的にサイドチェーン演算子です。サイドチェーンVMはEVMとの互換性があります。現在、コンセンサスアルゴリズムへの仕様変更を伴ったGethを使用しています。しかし、今後は軽量化と集約化のためにゼロから構築されます。

Borはブロックプロデューサレイヤーで、Heimdallと同期してスパンとスプリントごとにプロデューサとベリファイアを選択します。Polygonユーザーのインタラクションはサイドチェーンで実施され、Ethereumの開発者ツールとアプリケーションの機能性とEVM互換性のあるものです。

### Polygonチェーン {#polygon-chain}

このチェーンは個別のブロックチェーンであり、双方向のペグを使用してEthereumに接続されています。双方向のペグにより、EthereumとPolygon間のアセットの相互交換性を可能にします。

### EVM互換性VM {#evm-compatible-vm}

Ethereum仮想マシン（EVM）は、フルPolygonノードごとに埋め込まれた強力でサンドボックス化された仮想スタックであり、コントラクトバイトコードの実行に責任があります。コントラクトは、Solidityのような高レベル言語で書かれており、EVMバイトコードにコンパイルされます。

### プロポーザーとプロデューサ選択 {#proposers-and-producers-selection}

Borレイヤーのブロックプロデューサはステークに基づいてバリデータプールから選ばれた委員会であり、定期的に実施され、メンバーをシャッフルされます。この間隔は、王朝やネットワークに関するバリデータのガバナンスによって決定されます。

ステーク/ステークパワーの比率はブロックプロデューサ委員会のメンバーとして選ばれた確率を指定します。

<img src={useBaseUrl("img/Bor/bor-span.png")} />

#### 選択処理 {#selection-process}

- プールに3人のバリデータ、Alice、Bill、Claraがいるとします。
- Aliceは100Maticトークンをステークし、BillとClaraは40Maticトークンをステークしました。
- バリデータはステークに応じてスロットが提供されますが、Aliceは100Maticトークンをステークしているので、彼女はスロットを比例して取得することができます。Aliceは合計で5スロットを取得します。同様に、BillとClaraは合計で2スロットを取得します。
- すべてのバリデータはこれらのスロット[A, A, A, A, A, B, B, C, C]を取得します。
- 過去のEthereumブロックデータをシードとして使用し、この配列をシャッフルします。
- シードを使用してスロットをシャッフルした後、この配列[A、B、A、A、C、B、A、A、C]を取得します。
- 現在、プロデューサーカウント*(バリデータのガバナンスによって維持)*に応じて、バリデータをトップからポップします。たとえば、5人のプロデューサを選びたい場合、プロデューサーを[A、B、A、A、C]で取得します。
- 次のスパンのプロデューサセットは[A: 3, B:1, C:1]として定義されます。
- このバリデータセットと tendermint のプロポーザー選択アルゴリズムを使用してBor上のすべてのスプリントのプロデューサを選択します。

### SystemCallインターフェース {#systemcall-interface}

システムコールは、EVMの下にある内部演算子アドレスです。これはすべてのスプリントのブロックプロデューサの状態を維持するのに役立ちます。システムコールはスプリントの終了によってトリガーされ、ブロックプロデューサの新しいリストのためにリクエストが行われます。状態が更新されたら、変更はBor上のすべてのバリデータへのブロック生成後に受信されます。

### 関数 {#functions}

#### prosostate {#proposestate}

- 呼び出しはバリデータのみに許可されます。
- すでに提案またはコミットされているかどうか`stateId`を確認します。
- `stateId`を提案し、`true`にフラグを更新します。

#### commitState {#commitstate}

- 呼び出しはシステムのみに許可されます。
- すでに提案またはコミットされているかどうか`stateId`を確認します。
- 新しい`StateReceiver`とのコントラクトを`stateId`で通知します。
- `true`に `state`フラグを更新し、`proposedState`を`remove`します。

#### prosoSpan {#proposespan}

- 呼び出しはバリデータのみに許可されます。
- スパンの提案が `pending`であるか確認します。
- スパンの提案を`true`に更新します。

#### prosoCommit {#proposecommit}

- 呼び出しはシステムのみに許可されます。
- 現在のスパンがゼロである場合`initial validators`を設定します。
- スプリントとスパンの `spanId`と`time_period` の条件を確認します。
- 新しい`span`と`time_period`を更新します。
- `sprint`の`validators`と`blockProducers`を設定します。
- `spanProposal`のフラグを`true`に更新します。

### Bor手数料モデル {#bor-fee-model}

通常のトランザクションの場合、Ethereumトランザクションと同様に、Maticトークンの手数料は収集され、プロデューサブロックに配布されます。

他のブロックチェーンのように、PolygonはMatic(MATIC)と呼ばれるネイティブトークンを持っています。Maticは、Polygonとステーキングにガス（トランザクション手数料）を支払うために主に使用されるERC20トークンです。

:::info

留意すべき重要なことは、Polygonチェーン上で、MaticトークンはERC20トークンとして機能し、同時にネイティブトークンとしても機能するということです。つまり、ユーザーはMaticでガスを支払うだけでなく、他のアカウントにMaticを送信できます。

:::

ジェネシスコントラクトについては、Ethereumと同じ機能を`gasPrice``gasLimit`果たしますが、実行中は送信者のアカウントから手数料を差し引かれません。

現在のバリデータからのジェネシストランザクションは、`gasPrice = 0`で実行されます。

また、バリデータは、預金とスパンに関するBorの提案のようなステート提案のようなトランザクションを送信する必要があります。

## テクニカルインサイト {#technical-insight}

### Genesisコントラクト {#genesis-contracts}

[BorValidatorSet(0x1000)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.template) ⇒このコントラクトは、スパンおよびスプリントごとにバリデータセットを管理します。

[BorStateReceiver(0x1001)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol) ⇒このコントラクトはEthereumコントラクトからPolygonコントラクトに任意のコントラクトデータの転送を管理します。

MaticChildERC20(0x1010) ⇒メインチェーントークンのコントラクトはEthereumからPolygonにアセットを移動することができます。

### [Bor.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/bor.go)

Borプロトコル

## 用語集 {#glossary}

- StartEpoch - バリデータが有効化され、コンセンサスに参加するチェックポイント番号ポストです。
- EndEpoch - バリデータが無効化されたと見なされ、コンセンサスに参加することがなくチェックポイント番号ポストです。
- Sprint - Sprintはシングルバリデータによって作成されたブロックの連続セットです。
- スパン - スパンは固定バリデータセットがあるブロックの大きなセットであるが、さまざまなスプリントから構成されます。たとえば、長さ6400ブロックのスパンのために、64ブロックの100スプリントから構成されます。
- Dynasty：最後のオークションの終了と次のオークションの開始時間の間です。

## リソース {#resources}

- [Bor](https://github.com/maticnetwork/bor)
- [EVM](https://www.bitrates.com/guides/ethereum/what-is-the-unstoppable-world-computer)
- [EVMの仕組みは？](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)
- [テンダーミントのプロポーザーの選択](https://docs.tendermint.com/master/spec/reactors/consensus/proposer-selection.html)
