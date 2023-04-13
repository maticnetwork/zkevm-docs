---
id: staking
title: ステーキング
description: バリデータ関連のトランザクションとステートを管理するモジュール
keywords:
  - docs
  - matic
  - staking
  - heimdall
  - validator
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# ステーキング {#staking}

ステーキングモジュールは、Heimdallのバリデータ関連のトランザクション及び状態を管理します。バリデータは、Ethereumチェーンにトークンをステークし、バリデータになることに留意してください。それぞれのバリデータは、必要なパラメータを使用してHeimdallのトランザクションを送信して、Ethereumステークの変更を認識します。バリデータの大多数がステークで変更に同意すると、このモジュールはHeimdall状態のバリデータ情報を保存します。

## 鍵管理 {#key-management}

鍵管理については、[バリデータ鍵管理](/docs/pos/heimdall/validator-key-management)を参照してください

## デリゲーション {#delegation}

このモジュールはHeimdallにステーキングするバリデータだけを管理します。デリゲーションはEthereumチェーン上のスマートコントラクトでのみ利用できます。スマートコントラクトのデリゲーション報酬計算を最適化するために、私たちはバリデータ共有（バリデータあたりのERC20）を使用しています。

詳細はこちら：[デリゲーション（バリデータ共有）](/docs/pos/contracts/delegation)

## 報酬 {#rewards}

報酬はすべてEthereumチェーンに配布されます。`StakeManager.sol`バリデータとデリゲータは、上でトランザクションを送信するだけで報酬または再度ステークを取得します

詳細はこちら：[報酬](/docs/maintain/validator/rewards.md#what-is-the-incentive)

## メッセージ {#messages}

<img src={useBaseUrl('img/staking/stake-management-flow.svg')} />

### MsgValidatorJoin {#msgvalidatorjoin}

`MsgValidatorJoin`は、新しいバリデータシステムに参加する際のステーキングを処理します。バリデータがEthereum`StakingManager.sol`で`stake`または`stakeFor`を呼び出すと、新しい`Staked`イベントが出されます。

出典：[https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34)

```jsx
/**
 * Staked event - emitted whenever new validator
 *
 * @param signer           Signer address for the validator
 * @param validatorId      Validator id
 * @param activationEpoch  Activation epoch for validator
 * @param amount           Staked amount
 * @param total            Total stake
 * @param signerPubKey     Signer public key (required by Heimdall/Tendermint)
 */
event Staked(
    address indexed signer,
    uint256 indexed validatorId,
    uint256 indexed activationEpoch,
    uint256 amount,
    uint256 total,
    bytes signerPubkey
);
```

`activationEpoch`はHeimdallでバリデータがアクティブになる場所からのチェックポイントカウントです。

スロットが利用できない場合、スマートコントラクト上でステークの呼び出しが失敗します。バリデータスロットはシステム内のバリデータ数を制限する方法です。スロットはEthereumスマートコントラクトで管理されます。

ここではHeimdallトランザクションの`ValidatorJoin`メッセージを示します：

```go
type MsgValidatorJoin struct {
	From         hmTypes.HeimdallAddress `json:"from"`
	ID           hmTypes.ValidatorID     `json:"id"`
	SignerPubKey hmTypes.PubKey          `json:"pub_key"`
	TxHash       hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex     uint64                  `json:"log_index"`
}
```

### MsgStakeUpdate {#msgstakeupdate}

`MsgStakeUpdate`は、バリデータが再ステークまたは新しいデリゲーションが入るときにステーク更新を処理します。いずれの場合も、新しい`StakeUpdate`イベントが出されます。

```jsx
/**
 * Stake update event - emitted whenever stake gets updated
 *
 * @param validatorId      Validator id
 * @param newAmount        New staked amount
 */
event StakeUpdate(
	uint256 indexed validatorId,
	uint256 indexed newAmount
);
```

ここではHeimdallトランザクションの`MsgStakeUpdate`メッセージを示します：

```go
// MsgStakeUpdate represents stake update
type MsgStakeUpdate struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgValidatorExit {#msgvalidatorexit}

`MsgValidatorExit`は、バリデータがEthereumでエグジットプロセスを開始した後にバリデータのイグジットプロセスを処理します。イベント`SignerUpdate`を出します。

```jsx
/**
 * Unstake init event - emitted whenever validator initiates the exit
 *
 * @param user                Signer
 * @param validatorId         Validator id
 * @param deactivationEpoch   Deactivation epoch for validator
 * @param amount              Unstaked amount
 */
event UnstakeInit(
    address indexed user,
    uint256 indexed validatorId,
    uint256 deactivationEpoch,
    uint256 indexed amount
);
```

ここではHeimdallトランザクションの`MsgValidatorExit`メッセージを示します：

```go
type MsgValidatorExit struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgSignerUpdate {#msgsignerupdate}

`MsgSignerUpdate`は、バリデータがEthereumで署名鍵を更新する際に署名者の更新を処理します。イベント`SignerUpdate`を出します。

```jsx
/**
 * Signer change event - emitted whenever signer key changes
 *
 * @param validatorId      Validator id
 * @param oldSigner        Current old signer
 * @param newSigner        New signer
 * @param signerPubkey     New signer public key
 */
event SignerChange(
    uint256 indexed validatorId,
    address indexed oldSigner,
    address indexed newSigner,
    bytes signerPubkey
);
```

ここではHeimdallトランザクションの`MsgSignerUpdate`メッセージを示します：

```go
// MsgSignerUpdate signer update struct
type MsgSignerUpdate struct {
	From            hmTypes.HeimdallAddress `json:"from"`
	ID              hmTypes.ValidatorID     `json:"id"`
	NewSignerPubKey hmTypes.PubKey          `json:"pubKey"`
	TxHash          hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex        uint64                  `json:"log_index"`
}
```

## CLIコマンド {#cli-commands}

### バリデータの詳細 {#validator-details}

**署名者アドレスにより**

```bash
heimdallcli query staking validator-info \
	--validator=<signer-address> \
	--chain-id <chain-id>
```

このコマンドは、次の出力を表示する必要があります：

```json
{
    "ID":1,
    "startEpoch":0,
    "endEpoch":0,
    "power":10,
    "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
    "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
    "last_updated":0,
    "accum":0
}
```

**バリデータアドレスにより**

```bash
heimdallcli query staking validator-info \
	--id=<validator-id> \
	--chain-id=<chain-id>
```

このコマンドは、次の出力を表示する必要があります：

```json
{
    "ID":1,
    "startEpoch":0,
    "endEpoch":0,
    "power":10,
    "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
    "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
    "last_updated":0,
    "accum":0
}
```

### バリデータの参加 {#validator-join}

このコマンドは、CLIを通じてバリデータの参加コマンドを送信します：

```bash
heimdallcli tx staking validator-join \
	--signer-pubkey <signer-public-key> \
	--tx-hash <tx-hash>   \
	--log-index <log-index> \
	--chain-id <chain-id>
```

`tx-hash`値は`Staked`イベントを出したEthereum TXハッシュと同じでなければなりませんが、`log-index`はイベントが出されるインデックスと同じでなければなりません。

## REST API {#rest-apis}

| 名前 | メソッド | エンドポイント |
|----------------------|------|------------------|
| Heimdallバリデータのセットを取得する | GET（取得） | /staking/validator-set |
| バリデータの詳細を取得する | GET（取得） | /staking/validator/validator-id |


すべてのクエリAPIは、次のフォーマットになります：

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
