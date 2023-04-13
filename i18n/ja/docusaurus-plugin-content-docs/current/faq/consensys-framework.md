---
id: consensys-framework
title: スケーリングフレームワークFAQ
sidebar_label: Scaling Framework FAQ
description: Polygonで新しいブロックチェーンアプリを構築しましょう。
keywords:
  - docs
  - matic
  - wiki
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

このフレームワークは[、スケーリングソリューションを判断するためのコンセンサスの4つの質問](https://consensys.net/?p=19015&preview=true&_thumbnail_id=19017)から派生しています。

## 誰が操作しますか？ {#who-operates-it}
Mainnet Ethereum上のマイナーノードは、プルーフ・オブ・ワーク（PoW）を解決して新しいブロックを作成することで、ネットワークを前進させたり「操作」したりします。L2ソリューションは、ネットワーク上で同様の「オペレータ」的な役割を必要とします。これは、L2ネットワークを前進させることができるEthereumメインネットのマイナーに相当します。しかし、いくつか異なる点があります。たとえば、L2オペレータはマイナーと同様にトランザクションを処理、承認すると共に、ユーザーをL2レイヤー自体への出入りを容易にすることができます。

### - Polygonのプルーフ・オブ・ステーク（PoS）ネットワークを操作するには、誰または何が必要ですか？ {#who-or-what-is-required-to-operate-the-polygon-proof-of-stake-network}

Polygon PoSコミットチェーンは、ネットワークの安全性をバリデータセットに依存しています。バリデータの役割はフルノードを実行し、ブロックを生成、検証し、コンセンサスに参加し、Ethereumメインチェーン上のチェックポイントにコミットすることです。バリデータになるためには、Etheriumメインチェーン上にステーキング管理コントラクトで自身のMaticトークンをステークする必要があります。

詳細は[バリデータを](/maintain/validate/getting-started.md)ご覧ください。

### - Polygon PoSネットワークでは、どのようにしてオペレータになるのですか？彼らが遵守するルールは何ですか？ {#how-do-they-become-operators-in-the-polygon-pos-network-what-rules-do-they-abide-by}

バリデータになるには、ステーキングでMATICトークンをステーキングする必要があります。Ethereumメインチェーンに存在する管理コントラクト。

報酬は各チェックポイントですべてのステーク保有者にそのステークに比例して配布されますが、例外としてプロポーザになると追加のボーナスを取得します。ユーザー報酬残高は、一時的に参照されるコントラクトで更新されます。報酬を請求する。

バリデータノードがコミットした場合、ステークがスラッシュされるリスクがあります。ダブル署名、バリデータダウンタイムなどの悪意のある行為、リンクに影響を与えるそのチェックポイントにあるデリゲーター。

詳細は、こちらをご覧ください。[Polygonバリデータへのエンドツーエンドフロー](/maintain/polygon-basics/who-is-validator.md#end-to-end-flow-for-a-polygon-validator)とバリデータの[責任](/maintain/validate/validator-responsibilities.md)。


### - Polygon PoSユーザーは、オペレータに対してどのような信頼の仮定をしなければなりませんか？ {#what-trust-assumptions-must-the-polygon-pos-users-make-about-the-operator}

Polygon PoSコミットチェーンは、ネットワークの安全性をバリデータセットに依存しています。バリデータの役割はフルノードを実行し、ブロックを生成、検証し、コンセンサスに参加し、メインチェーン上のチェックポイントにコミットすることです。バリデータになるためには、メインチェーン上にステーキング管理コントラクトで自身のMaticトークンをステークする必要があります。
バリデータの加重ステークの３分の２が誠実である限り、チェーンは正確に進行します。

### - オペレータは何に対して責任がありますか？彼らはどのような権限を持っていますか？ {#what-are-the-operators-responsible-for-what-power-do-they-have}

バリデータの役割はフルノードを実行し、ブロックを生成、検証し、コンセンサスに参加し、メインチェーン上のチェックポイントにコミットすることです。

加重ステーキングバリデータの３分の２が誠実ではないと仮定すると、バリデータにはチェーンの進行を停止させたり、ブロックをリオーダーしたりするなどの権限があります。彼らには、状態やユーザーの資産残高などを変更する権限はありません。

### - Polygon PoSのオペレータになるための動機は何ですか？ {#what-are-the-motivations-to-become-an-operator-of-the-polygon-pos}

バリデータは自身のMaticトークンを担保としてステークし、ネットワークの安全を確保することに取り組み、そのサービスの見返りとして報酬を獲得します。

詳細は[インセンティブとは何です](/maintain/validator/rewards.md#what-is-the-incentive)か。

## データの状況はどうですか？ {#how-s-the-data}
定義上、レイヤー2テクノロジーはレイヤー1（Ethereumメインネット）上にインクリメンタルなデータチェックポイントを作成する必要があります。私たちの関心は、それらのレイヤー1チェックイン間の時間的な間隔です。具体的には、レイヤー1の安全なハーバーから離れてレイヤー2データが生成、保存、管理される方法はありますか。ユーザーがパブリックメインネットの信頼できないセキュリティから最も遠いのは、これに注意してください。

### - Polygon PoSのロックアップ条件は何ですか？ {#what-are-the-lock-up-conditions-for-polygon-pos}

ほとんどのトークンデザインのパターンでは、トークンはEthereum上でミントされ、Polygon PoSに送信できます。このようなトークンをEthereumからPolygon PoSに移動させるために、ユーザーはEthereum上のコントラクトでファンドをロックし、それに対応するトークンをPolygon PoS上でミントする必要があります。

このブリッジリレーメカニズムは、Polygon PoSのバリデータによって実行されます。バリデータはEthereum上のロックされたトークンイベントに関して3分の2の同意を得、対応するトークンをPolygon PoS上でミントする必要があります。

Ethereumへの資産の引き出しは、2ステップからなるプロセスです。資産トークンは最初にPolygon PoSのコミットチェーン上でバーンされ、次にこのバーントランザクションのプルーフがEthereumチェーンに送信されなければなりません。


詳細は、[PoSブリッジを使用する手順](/develop/ethereum-polygon/pos/getting-started.md#steps-to-use-the-pos-bridge)を参照してください。

### - それらのファンドはPolygon PoSでいつから利用できるようになりますか？ {#how-soon-are-those-funds-available-on-the-polygon-pos}

約22～30分です。これは、メッセージ渡しメカニズムと呼ばれるで行われます`state sync`。詳細は[こちらを](/pos/state-sync/state-sync-mechamism.md)ご覧ください。

Polygon PoSは、ユーザーがL1にロックアップされずに入れるようにサポートをしていますか？（つまり、ユーザーをPolygonに直接オンボードし、ユーザーがEthereumメインネットへの退出を希望する場合）

はい。これは特別なブリッジメカニズムを使用することで達成されます。ユーザーがEthereumに退出したい場合、トークンを特別なコントラクトからアンロックする通常のメソッドの代わりに、トークンがミントされます。

[こちら](/develop/ethereum-polygon/mintable-assets.md)でご覧いただけます。

### - ユーザーは、無効なPolygon PoSトランザクションに対してどのように異議を唱えますか？Polygon PoSトランザクションの有効性を証明しますか？ {#how-would-a-user-dispute-an-invalid-polygon-pos-transaction-prove-a-valid-polygon-pos-transaction}

現在、無効なPolygon PoSトランザクションにオンチェーンで異議を唱える方法はありません。しかし、Polygon PoSチェーンバリデータは定期的なチェックポイントをEt[here](/pos/heimdall/modules/checkpoint.md)umに送信します。詳細はこちらをご覧ください。Ethereum上のPolygon PoSチェーン上のトランザクションを検証することができます。Merkleツリー証明を構築し、Ethereumで起こる定期的なチェックポイントとMerkleツリールーツを受領する際に検証することにより、Ethereum上のPolygon PoSチェーン上のトランザクションを検証することができます。

### - Polygonユーザーが終了したいと、ロックアップレイヤー1ファンド（L2の利益または損失を加えるか、マイナス）は、いつまでにL1で利用できますか。 {#once-a-polygon-user-wishes-to-exit-how-soon-are-the-locked-up-layer-1-fund-plus-or-minus-any-l2-gains-or-losses-available-back-on-l1}

[チェックポイント](/pos/heimdall/modules/checkpoint.md)周波数によっては約1～3時間程度です。この頻度は、主にバリデータがETHのガス代としてチェックポイントを送信するコストの関数です。

### - 既存のPolygon PoSユーザーに対してすぐに受け取り可能なL1ファンドを提供できるレイヤー1の流動性プロバイダが存在すると予想していますか？ {#do-you-anticipate-there-being-liquidity-providers-on-layer-1-willing-to-provide-immediately-redeemable-l1-funds-to-existing-polygon-pos-users}

すでに、このサービスを提供する、または提供する[Connext](https://connext.network/)や[Biconomy](https://biconomy.io/)などのプレイヤーが数人います。また、まもなくライブを予定しているプレイヤーが多数存在します。

## スタックの状況はどうですか？ {#how-s-the-stack}
レイヤー2がEthereumメインネットから何を変更し、何を変更していないのかを強調するために、スタックを比較することが重要です。

### - Polygon PoSスタックはEthereumメインネットスタックとどの程度共有していますか？ {#how-much-does-the-polygon-pos-stack-share-with-the-ethereum-mainnet-stack}

あなたがEthereumの開発者なら、すでにPolygon PoSの開発者でもあります。Truffle、Remix、Web3jsなどの使い慣れたすべてのツールはPolygon PoSでもサポートされており、すぐに使うことができます。

Ethereumに関して、Polygon PoSのEVMインターフェースに大きな変更はありません。

### - Polygon PoSは、Ethereumメインネットスタックとどのように異なっており、どのようなリスク／報酬が導入されていますか？ {#where-does-the-polygon-pos-differ-from-ethereum-mainnet-stack-and-what-risks-rewards-does-that-introduce}

大きな変更はありません。

## 最悪の事態に備える {#preparing-for-the-worst}
Polygon PoSのシステムは、以下の事象に対してどのように準備していますか？

### - ユーザーの大量退出 {#a-mass-exit-of-users}

バリデータの3分の2が誠実である限り、チェーン上のファンドは安全です。この仮定が有効でない場合、このようなシナリオではチェーンが停止したり、リオーダリングが発生したりする可能性があります。これを行うために使用できるチェックポイントを介して送信されたPolygon PoSの状態のスナップショットを含め、チェーンを以前の状態から再始動させるには社会的なコンセンサスが必要です。

### - Polygonの参加者がPolygonコンセンサスを不正に利用しようとしています。たとえば、カルテルを形成するなど。 {#polygon-participants-attempting-to-game-the-polygon-consensus-for-example-by-forming-a-cartel}

これを行うために使用できるチェックポイントを介して送信されたPolygon PoSの状態のスナップショットを含め、それらのバリデータチェーンを削除し、新しいバリデータチェーンのセットで再始動することでチェーンを以前の状態から再始動させるには、社会的なコンセンサスが必要です。


### - システムの重要な部分でバグや不正利用が発見されましたか？ {#a-bug-or-exploit-discovered-in-a-critical-part-of-its-system}

システム外のビルドでバトルテストされたコンポーネントの再利用には注意が払われています。しかし、システムの重要な部分にバグや不正利用が存在する場合、社会的なコンセンサスを介してチェーンを以前の状態に復元するのがメインのソリューションパスです。
