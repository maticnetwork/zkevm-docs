---
id: stakingmanager
title: ステーキングマネージャ
description: ステーキングマネージャは、Polygonネットワーク上でバリデータ関連の活動を処理するための主要な契約です。
keywords:
  - docs
  - Staking Manager
  - polygon
  - wiki
  - validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygonのプルーフ・オブ・セキュリティベースのコンセンサスでは、2/2 + 1のプルーフ検証とステーキングの処理がすべてEthereumスマートコントラクトでリワードが実行されます。全体の設計は、Mainnetコントラクトで行うことを少なくするという哲学に従っています。情報検証を行い、計算の大幅な操作をL2にプッシュします（[Heimdall](https://wiki.polygon.technology/docs/pos/heimdall/overview)について参照）。

**ステーカー**は**バリデータ、****デリゲータ**、**ウォッチャー**に分けられます（詐欺報告のために）。

[**StakeManager**](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/stakeManager/StakeManager.sol)は、`checkPoint`署名検証、報酬配布、ステーク管理などのバリデータ関連の活動を処理するための主要な契約です。契約は**NFT ID**を所有の源として使用しているため、所有権と署名者の変更はシステム内の何にも影響しません。

:::tip

1つのEthereumアドレスから、ステーカーは**バリデータまたはデリゲーターのみであること**ができます（ただのデザインの選択であり、厳しい理由はありません）。

:::

## バリデーターの入学/交換 {#validator-admissions-replacement}

### 入会する {#admissions}
現在、Polygon PoSで公開されたバリデータスロットはありません。バリデータになるためのウェイトリストもあります。将来的には、スロットが利用可能になると、バリデータが検討され、ウェイトリストから削除される可能性があります。


### 交換 {#replacement}
PIP4は、コミュニティの可視化のためにバリデータパフォーマンスを展示するというコンセプトを導入しました。バリデータがPIP4で概要したように、長期間にわたって不健康な状態にある場合、ネットワークからオフに搭乗されます。バリデータスロットは、ウェイトリストから公開されるものに利用可能になります。

:::info

現在、[<ins>PIP4でPART Cのフェーズ2</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956/24)を実装しています。バリデータ見込み客の評価基準をコミュニティが決定する場所です。この行為は、申請と入学プロセスを生成します。

:::

## メソッドと変数 {#methods-and-variables}

:::caution スラッシングの実装

`jail``unJail``slash`スラッシングの実装の一部として、現在機能は使用されていません。

:::

### バリデータ閾値 {#validatorthreshold}

システムが受け入れるバリデータ数をスロットと呼ぶことができます。

### AccountStateRoot {#accountstateroot}

- バリデータおよび委任者のためにHeimdallで実行されるさまざまな会計については、アカウントルートが提出されます`checkpoint`。
- accRootを使用し`claimRewards`、。`unStakeClaim`

### ステーク／ステークFor {#stake-stakefor}

```solidity title="StakeManager.sol"
function stake(
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes calldata signerPubkey
) public;

function stakeFor(
    address user,
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes memory signerPubkey
) public;
```

- （MATICトークンで）より大きい金額を持つ人を許可します`minDeposit``currentValidatorSetSize`。`validatorThreshold`
- オークションインターバル（詳細はオークションセクション）のオークション期間にバリデータを`amount+heimdallFee`移行する必要があります。
- `updateTimeLine`特定のエポック／チェックポイントカウントでアクティブなバリデータとアクティブなステークを追跡する特別なタイムラインデータ構造を更新します。
- 1つの`NFT`ユニークなが、新しい`stake`またはコールごとにマイトされ、誰にも転送できますが`stakeFor`、1：1Ethereumアドレスを所有することができます。
- `acceptDelegation`バリデータが委任を受け入れる場合は、trueに設定し、バリデータに`ValidatorShare`コントラクトが展開されます。

### アンステーク {#unstake}

- 次のエポックで設定されたバリデータからバリデータを削除する（現在のチェックポイントにのみ有効`unstake`）
- タイムラインデータ構造からバリデータのステークを削除し、バリデータの終了エポックのためにカウントを更新します。
- バリデータが委任を受ける場合、すべての報酬を集めて、新しい委任のための委任契約をロックしてください。

### unstakeClaim（ステーク解除の申請） {#unstakeclaim}

```solidity
function unstakeClaim(uint256 validatorId) public;
```

- `unstaking`バリデータは、過去の詐欺のために、`unstaking`後に発見された詐欺のためにスラッシュすることができます。
- `WITHDRAWAL_DELAY`期間が完了すると、バリデータはこの機能を呼び出して決済を行うことができます（報酬を`stakeManager`取得し、ステークルドされたトークンを取り戻す、NFTを書き込むなど）。

### リステーク {#restake}

```solidity
function restake(uint256 validatorId, uint256 amount, bool stakeRewards) public;
```

- バリデータは、新しい額や報酬、あるいは両方をかけて、ステークを増やすことが可能です。
- アクティブなステークのためにタイムライン（金額）を更新する必要があります。

### withdrawRewards（報酬の引き出し） {#withdrawrewards}

```solidity
function withdrawRewards(uint256 validatorId) public;
```

この方法により、バリデータは累積した報酬を引き出すことができます。バリデータが委任を受け入れる場合、委任契約から報酬を取得することを検討する必要があります。

### updateSigner（署名者の更新） {#updatesigner}

```solidity
function updateSigner(uint256 validatorId, bytes memory signerPubkey) public
```

この方法により、バリデータは署名アドレスを更新することができます（Polygonブロックチェーンおよびチェックポイント署名のブロックを検証するために使用されます）`stakeManager`。

### topUpForFee（代金用のトップアップ） {#topupforfee}

```solidity
function topUpForFee(uint256 validatorId, uint256 heimdallFee) public;
```

バリデータは、この方法を実行することでHeimdall手数料の残高を増やすことができます。

### claimFee（請求手数料） {#claimfee}

```solidity
function claimFee(
        uint256 validatorId,
        uint256 accumSlashedAmount,
        uint256 accumFeeAmount,
        uint256 index,
        bytes memory proof
    ) public;
```

この方法はHeimdallから手数料を引き出すために使用されます。チェックポイントごとに更新されるため、バリデータは`accountStateRoot`Heimdallのアカウントと手数料を引き出すためにこのルートに含まれる証拠を提供することができます。

複数のチェックポイント（旧ルートと会計を保存する）での終了を防ぐために書き換え`accountStateRoot`られていることに注意してください。現時点では使用されてい`accumSlashedAmount`ません。必要に応じてHeimdallでのスラッシュに使用されます`stakeManager`。

### StakingNFT {#stakingnft}

ユーザー1人につき1つのトークンなどの制限が少なく、順番にマイトされたERC721コントラクトです。

### startAuction（オークションのスタート） {#startauction}

```solidity
function startAuction(
    uint256 validatorId, /**  auction for validator */
    uint256 amount /**  amount greater then old validator's stake */
    ) external;
```

すでに実行中のオークションでより高い入札または入札を開始するには、この機能を使用します。オークション期間はサイクルで実行される`(auctionPeriod--dynasty)--(auctionPeriod--dynasty)--(auctionPeriod--dynasty)`ため、**正しいオークション期間を確認する必要があります。**

`perceivedStakeFactor`正確なファクター*oldステークを計算するために使用されます（現在はデフォルトで1WIPです）。**なお、いずれかが進行している場合は、前回のオークション期間からオークションを確認**する必要があります（次回のオークションで資本を出すために`confirmAuction`電話をかけないことを選択できます）。通常、継続的な英語`auctionPeriod`オークションは、で開催されます。

### confirmAuctionBid（オークション入札の確認） {#confirmauctionbid}

```solidity
function confirmAuctionBid(
        uint256 validatorId,
        uint256 heimdallFee, /** for new validator */
        bool acceptDelegation,
        bytes calldata signerPubkey
    ) external
```

- **オークション期間ではないか確認する必要があります。**
- 最後の入札者が所有者である場合`validatorId`、振る舞いはリステークと似ています。
- 2つ目のケースでは、`validatorId`をunStake（ステークを解除）し、新しいユーザーの行動はstake/stakeForと同様になるはずであるため、新しいユーザーをバリデータとして次のチェックポイントから追加します。

### checkSignatures（署名の確認） {#checksignatures}

```solidity
function checkSignatures(
        uint256 blockInterval,
        bytes32 voteHash,
        bytes32 stateRoot,
        bytes memory sigs
    ) public;
```

- Writesは、チェックポイントを提出するとき、RootChainコントラクトにのみ意味を持ちます。
- すべてのバリデータが署名する`voteHash`（BFT ⅔+1合意）
- この機能は、一意の署名のみを検証し、3分の2プラス1のパワーがチェックポイントルートに署名したかを確認します。（すべてのデータ用のRootChainコントラクトの`voteHash`検証に含める）`currentValidatorSetTotalStake`は現在の有効なステークを提供します。
- 報酬はバリデーターの利害関係に比例して分配されます。報酬[の分配](https://www.notion.so/Rewards-Distribution-127d586c14544beb9ea326fd3bb5d3a2)で詳細を確認してください。

### isValidator（バリデータになる） {#isvalidator}

指定したバリデータが現在のエポックのためにアクティブなバリデータであるかどうかを確認します。

## タイムラインデータ構造 {#timeline-data-structure}

```solidity
struct State {
    int256 amount;
    int256 stakerCount;
}

mapping(uint256 => State) public validatorState;
```

<img src={useBaseUrl("img/staking_manager/staking_manager.png")} />

## StakingInfo {#stakinginfo}

バリデータと委任イベントの両方のための集中的なロギングコントラクトは、読み取り専用の機能がほとんど含まれていません。[StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol)コントラクトのソースコードをGitHubで確認できます。

## ValidatorShareFactory {#validatorsharefactory}

委任をオプトインするバリデータごとにコントラクトを展開する`ValidatorShare`ファクトリーコントラクトです。[バリデータShareFactory.](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/validatorShare/ValidatorShareFactory.sol)solコントラクトのソースコードをGitHubで確認できます。
