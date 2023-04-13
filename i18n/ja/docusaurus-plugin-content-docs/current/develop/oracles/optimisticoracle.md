---
id: optimisticoracle
title: UMAのオプティミスティックオラクル
sidebar_label: UMA
description: UMAのOptimistic Oracleは、契約をすばやくリクエストして受信することができます。
keywords:   
  - wiki
  - polygon
  - oracle
  - UMA
  - Optimistic Oracle
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

UMAのOptimistic Oracleは、契約をすばやくリクエストして受信することができます。UMAのオラクルシステムは、2つのコアコンポーネントから構成されています：

1. オプティミスティックオラクル
2. データ検証メカニズム（DVM）

## オプティミスティックオラクル {#optimistic-oracle}

UMAの**Optimistic Oracle**は、契約をすばやくリクエストして価格情報を受信することができます。Optimistic Oracleは、価格要求を開始する契約と、データ検証メカニズム（DVM）として知られているUMAの紛争解決システムとの間で一般的なエスカレーションゲームとして機能します。

オプティミスティックオラクルによって提案された価格は、異議がない限り、DVMに送信されません。これにより、コントラクトは、事前に定義された期間内に資産の価格を書くことなく、価格情報を取得することができます。

## データ検証メカニズム（DVM） {#data-verification-mechanism-dvm}

紛争が発生した場合、DVMにリクエストが送られます。UMA上に構築されたすべてのコントラクトは、紛争を解決するためのバッキングストップとしてDVMを使用しています。DVMに送られた紛争は、UMAトークンホルダーがある時刻に資産価格について投票した後、48時間後に解決されます。UMA上のコントラクトは、48時間よりも早い時点での資産価格が必要ではない限り、オプティミスティックオラクルを使用する必要はありません。

データ検証メカニズム（DVM）は、UMAプロトコルに基づいて構築されたコントラクトの紛争解決サービスです。DVMが強力なのは、不安定な（そして時には操作可能な）市場から問題が発生した場合に、コントラクトが安全かつ正しく管理されることを保証する人間の判断の要素を含んでいるためです。

## オプティミスティックオラクルインタインターフェース {#optimistic-oracle-interface}

オプティミスティックオラクルは、金融コントラクトまたは第三者によって価格を取得するために使用されています。価格がリクエストされたら、誰でも対応して価格を提案できます。提案されると、価格は、誰もが提案された価格に異議を唱え、異議のある価格を決済のためにUMA DVMに送信できる有効期間を経ます。

:::info

このセクションでは、さまざまな参加者がオプティミスティック・オラクルとどのようにやり取りできるかを説明します。オプティミスティックオラクルコントラクトの最新のメインネット、kovanまたはL2デプロイを表示するには、[プロダクションアドレス](https://docs.umaproject.org/dev-ref/addresses)を参照してください。

:::

オプティミスティックオラクルのインターフェースを構成する12のメソッドがあります。
- `requestPrice`
- `proposePrice`
- `disputePrice`
- `settle`
- `hasPrice`
- `getRequest`
- `settleAndGetPrice`
- `setBond`
- `setCustomLiveness`
- `setRefundOnDispute`
- `proposePriceFor`
- `disputePriceFor`

### requestPrice {#requestprice}

新しい価格をリクエストします。これは登録された価格識別子のものでなければなりません。これは、UMAシステムに登録されているほとんどの金融コントラクトによって自動的に呼び出されますが、登録された価格識別子については誰でもが呼び出すことができることに注意してください。たとえば、Expiring Multi-Party（EMP）コントラクトは、その`expire`メソッドが呼び出されたときに、このメソッドを呼び出します。

パラメータ：
- `identifier`: リクエストされた価格の識別子。
- `timestamp`: リクエストされた価格のタイムスタンプ。
- `ancillaryData`: 価格リクエストで渡される追加の引数を表す補助データ。
- `currency`: 報酬と料金の支払いに使用されるERC20トークン。DVMでの使用には承認が必要です。
- `reward`: 成功した提案者に提供される報酬。発信者負担となります。ノート: これは 0 である可能性があります。

### proposePrice {#proposeprice}

既存の価格リクエストに対する価格値を提案します。

パラメータ：
- `requester`：初期価格リクエストの送信者。
- `identifier`：既存のリクエストを識別するための価格識別子。
- `timestamp`：既存のリクエストを識別するためのタイムスタンプ。
- `ancillaryData`：リクエストされている価格の補助データ。
- `proposedPrice`：提案されている価格。

### disputePrice {#disputeprice}

アクティブなプロポーザルを使用して、既存の価格リクエストの価格値に異議を唱えます。

パラメータ：
- `requester`：初期価格リクエストの送信者。
- `identifier`：既存のリクエストを識別するための価格識別子。
- `timestamp`：既存のリクエストを識別するためのタイムスタンプ。
- `ancillaryData`：リクエストされている価格の補助データ。

### 解決 {#settle}

未解決の価格リクエストの解決を試みます。決済できない場合には元に戻します。

パラメータ：
- `requester`：初期価格リクエストの送信者。
- `identifier`：既存のリクエストを識別するための価格識別子。
- `timestamp`：既存のリクエストを識別するためのタイムスタンプ。
- `ancillaryData`：リクエストされている価格の補助データ。

### hasPrice {#hasprice}

指定されたリクエストが解決または解決されたかどうかを確認します (つまり、オプティミスティックオラクルには価格があります)。

パラメータ：
- `requester`：初期価格リクエストの送信者。
- `identifier`：既存のリクエストを識別するための価格識別子。
- `timestamp`：既存のリクエストを識別するためのタイムスタンプ。
- `ancillaryData`：リクエストされている価格の補助データ。

### getRequest {#getrequest}

価格リクエストに関するすべての情報を含む現在のデータ構造を取得します。

パラメータ：
- `requester`：初期価格リクエストの送信者。
- `identifier`：既存のリクエストを識別するための価格識別子。
- `timestamp`：既存のリクエストを識別するためのタイムスタンプ。
- `ancillaryData`：リクエストされている価格の補助データ。

### settleAndGetPrice {#settleandgetprice}

発信者が以前にリクエストした価格を取得します。リクエストが決済されないか、決済可能な場合に戻します。ノート：このメソッドは、表示されないため、この呼び出しは、価格リクエストが決済されていない場合には、実際に決済することができます。

パラメータ：
- `identifier`：既存のリクエストを識別するための価格識別子。
- `timestamp`：既存のリクエストを識別するためのタイムスタンプ。
- `ancillaryData`：リクエストされている価格の補助データ。

### setBond {#setbond}

価格リクエストに関連する提案結合を設定します。

パラメータ：
- `identifier`：既存のリクエストを識別するための価格識別子。
- `timestamp`：既存のリクエストを識別するためのタイムスタンプ。
- `ancillaryData`：リクエストされている価格の補助データ。
- `bond`：カスタムBond額を設定。

### setCustomLiveness {#setcustomliveness}

リクエストのカスタム有効期限を設定します。Livenessは、プロポーザルが自動解決されるまでに必要な待機時間です。

パラメータ：
- `identifier`：既存のリクエストを識別するための価格識別子。
- `timestamp`：既存のリクエストを識別するためのタイムスタンプ。
- `ancillaryData`：リクエストされている価格の補助データ。
- `customLiveness`：新しいカスタムの有効期限。

### setRefundOnDispute {#setrefundondispute}

提案に異議があった場合の報酬の返金リクエストを設定します。これは、紛争を原因とする遅延が発生した場合に、通話者を「ヘッジ」するのに役立ちます。注記：紛争が発生した場合、勝者は引き続き相手の保証金を受け取るため、報酬が返金されても利益は発生します。

パラメータ：
- `identifier`：既存のリクエストを識別するための価格識別子。
- `timestamp`：既存のリクエストを識別するためのタイムスタンプ。
- `ancillaryData`：リクエストされている価格の補助データ。

### disputePriceFor {#disputepricefor}

他のアドレスの代理でアクティブなプロポーザルで価格リクエストを紛争化します。注記：このアドレスは、この紛争から生じるすべての報酬を受け取ることになります。ただし、ボンドはすべて呼び出し側から引き出されます。

パラメータ：
- `disputer`：紛争者として設定するアドレス。
- `requester`：初期価格リクエストの送信者。
- `identifier`：既存のリクエストを識別するための価格識別子。
- `timestamp`：既存のリクエストを識別するためのタイムスタンプ。
- `ancillaryData`：リクエストされている価格の補助データ。

### proposePriceFor {#proposepricefor}

別のアドレスに代わって価格値を提案します。注記：このアドレスは、この提案から得られるすべての報酬を受け取ります。ただし、ボンドはすべて呼び出し側から引き出されます。

パラメータ：
- `proposer`: プロポーザーとして設定するアドレス。
- `requester`：初期価格リクエストの送信者。
- `identifier`：既存のリクエストを識別するための価格識別子。
- `timestamp`：既存のリクエストを識別するためのタイムスタンプ。
- `ancillaryData`：リクエストされている価格の補助データ。
- `proposedPrice`：提案されている価格。

## オプティミスティックオラクルを統合する {#integrating-the-optimistic-oracle}

このデモでは、ユーザのERC-20トークン残高を管理する`OptimisticDepositBox`コントラクトをセットアップします。

ローカルのテストネットブロックチェーンでは、ユーザはwETH（Wrapped Ether）をコントラクトに入金し、米ドル建てのwETHを引き出します。たとえば、ユーザが$10,000 USD of wETH, and the ETH/USD exchange rate is $2,000を引き出したい場合、5 wETHを引き出します。

* ユーザは、DVM上で有効になっている価格識別子の1つを持つ`OptimisticDepositBox`にリンクします。

* ユーザは、wETHを`OptimisticDepositBox`に入金し、それを`ETH/USD`価格識別子に登録します。

* ユーザは、オプティミスティックなオンチェーン価格設定を可能にするオプティミスティックオラクルを使用して、スマートコントラクトコールを介して`DepositBox`から米ドル建て額のwETHを引き出すことができるようになりました。

この例では、ユーザは、オフチェーン`ETH/USD`価格フィードを参照しなければ、米ドル建ての金額のwETHを転送できませんでした。オプティミスティックオラクルは、ユーザが参照価格を「引き出す」ことを可能にします。

DVM への価格リクエストとは異なり、オプティミスティックオラクルへの価格リクエストは、紛争がなければ、指定されたライブネスウィンドウ内で解決できます。これは、DVM の投票期間よりも大幅に短くなる可能性があります。有効期間ウィンドウは、設定可能ですが、DVMを介して決済する場合の2～3日に比べて、通常は2時間となっています。

価格の要求者は、現在、DVMに手数料を支払う必要はありません。要求者は、価格リクエストに応答したプロポーザーに報酬を提供できますが、この例`0`では報酬値は1に設定されています。

価格プロポーザーは、価格と一緒に債券を投稿します。これは、価格が異議がない場合、または、提案者の賛成で紛争が解決された場合、返金されます。それ以外の場合、このボンドは、DVMに最終手数料を支払う、また成功した異議申し立て者に報酬を支払うために使用されます。

このデモでは、要求者は、価格プロポーザーからの追加の保証金を必要としないため、提示された保証金の合計は、wETHの最終手数料は0.2wETHに等しくなります。実装の詳細については、`OptimisticOracle`[コントラクト](https://docs-dot-uma-protocol.appspot.com/uma/contracts/OptimisticOracle.html)の`proposePriceFor`機能を参照してください。

## デモを実行する {#running-the-demo}

1. 前提条件となるすべての設定ステップについては、[こちら](https://docs.umaproject.org/developers/setup)に従っていることを確認してください。
2. ローカルGanacheインスタンス（つまり、Kovan/Ropsten/Rinkeby/Mainnetではない）を実行します。`yarn ganache-cli --port 9545`
3. 別のウィンドウで、以下のコマンドを実行してコントラクトを移行します。

  ```bash
  yarn truffle migrate --reset --network test
  ```

1. `OptimisticDepositBox`[コントラクト](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol)をデプロイして、単純なユーザフローを実行するには、リポジトリのルートから以下のデモスクリプトを実行します。

```bash
yarn truffle exec ./packages/core/scripts/demo/OptimisticDepositBox.js --network test
```

以下の出力が表示されます。

```
1. Deploying new OptimisticDepositBox
  - Using wETH as collateral token
  - Pricefeed identifier for ETH/USD is whitelisted
  - Collateral address for wETH is whitelisted
  - Deployed an OptimisticOracle
  - Deployed a new OptimisticDepositBox


2. Minting ERC20 to user and giving OptimisticDepositBox allowance to transfer collateral
  - Converted 10 ETH into wETH
  - User's wETH balance: 10
  - Increased OptimisticDepositBox allowance to spend wETH
  - Contract's wETH allowance: 10


3. Depositing ERC20 into the OptimisticDepositBox
  - Deposited 10 wETH into the OptimisticDepositBox
  - User's deposit balance: 10
  - Total deposit balance: 10
  - User's wETH balance: 0


4. Withdrawing ERC20 from OptimisticDepositBox
  - Submitted a withdrawal request for 10000 USD of wETH
  - Proposed a price of 2000000000000000000000 ETH/USD
  - Fast-forwarded the Optimistic Oracle and Optimistic Deposit Box to after the liveness window so we can settle.
  - New OO time is [fast-forwarded timestamp]
  - New ODB time is [fast-forwarded timestamp]
  - Executed withdrawal. This also settles and gets the resolved price within the withdrawal function.
  - User's deposit balance: 5
  - Total deposit balance: 5
  - User's wETH balance: 5
```

## コントラクト機能を説明する {#explaining-the-contract-functions}

`OptimisticDepositBox`[コントラクト](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol)コードでは、Oracleとのやり取りを示しています。

`constructor`機能は、UMA`Finder`コントラクトの`_finderAddress`引数が含まれ、`OptimisticOracle`アドレス、承認された担保と価格識別子のホワイトリスト、その他の重要なコントラクトアドレスのレジストリを維持します。

これにより、`constructor`は、担保の種類と価格識別子が有効であることをチェックし、`OptimisticDepositBox`は、後で`OptimisticOracle`を見つけてやり取りすることができます。

`requestWithdrawal`機能には、`ETH/USD`価格をリクエストする`OptimisticOracle`への内部呼び出しが含まれます。それが返されると、ユーザは、`executeWithdrawal`を呼び出して、引き出しを完了することができます。

コードコメントには、より多くの情報と説明がありますので、より多くの学びに興味がある方はご覧ください。

## 他のリソース {#additional-resources}

UMA DVMに関するその他の資料は以下をご覧ください：

- [テクニカルアーキテクチャ](https://docs.umaproject.org/oracle/tech-architecture)
- [エコノミックアーキテクチャ](https://docs.umaproject.org/oracle/econ-architecture)
- UMAのDVMデザイン関する[ブログ投稿](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8)
- UMAのDVMデザイン[ホワイトペーパー](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf)
- 最適な手数料ポリシーの[リサーチレポート](https://github.com/UMAprotocol/research)
- ガバナンス提案のための[UMIPレポート](https://github.com/UMAprotocol/UMIPs)
