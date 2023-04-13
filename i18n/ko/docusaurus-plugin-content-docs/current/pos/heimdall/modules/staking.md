---
id: staking
title: 스테이킹
description: 유효성 검사 관련 트랜잭션 및 상태를 관리하는 모듈
keywords:
  - docs
  - matic
  - staking
  - heimdall
  - validator
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# 스테이킹 {#staking}

스테이킹 모듈은 Heimdall의 유효성 검사자 관련 트랜잭션 및 상태를 관리합니다. 유효성 검사자는 이더리움 체인에 토큰을 스테이킹하고 유효성 검사자가 됩니다. 각 유효성 검사자는 이더리움 스테이크 변경을 승인하는 데 필요한 파라미터를 사용하여 Heimdall에서 트랜잭션을 보냅니다. 유효성 검사자의 대다수가 스테이크 변경에 동의하면 이 모듈은 Heimdall 상태에 유효성 검사자 정보를 저장합니다.

## 키 관리 {#key-management}

키 관리에 대한 내용은 [유효성 검사자 키 관리](/docs/pos/heimdall/validator-key-management)를 참조하십시오.

## 위임 {#delegation}

이 모듈은 Heimdall에서 유효성 검사자의 스테이킹만 관리합니다. 위임은 이더리움 체인의 스마트 계약에서만 가능합니다. 스마트 계약에서 위임 보상 계산을 최적화하기 위해 Polygon은 유효성 검사자 지분(유효성 검사자당 ERC20)을 사용하고 있습니다.

자세한 내용은 [위임(유효성 검사자 지분)](/docs/pos/contracts/delegation)을 참조하십시오.

## 보상 {#rewards}

모든 보상은 이더리움 체인에서 분배됩니다. 유효성 검사자와 위임자는 간단히 `StakeManager.sol`에서 트랜잭션을 보내 보상을 청구하거나 재스테이킹을 수행합니다.

자세한 내용은 [보상](/docs/maintain/validator/rewards.md#what-is-the-incentive)을 참조하십시오.

## 메시지 {#messages}

<img src={useBaseUrl('img/staking/stake-management-flow.svg')} />

### MsgValidatorJoin {#msgvalidatorjoin}

`MsgValidatorJoin`은 새로운 유효성 검사자가 시스템에 합류할 때 스테이킹을 관장합니다. 유효성 검사자가 이더리움의 `StakingManager.sol`에서 `stake` 또는 `stakeFor`를 호출하면 새로운 `Staked` 이벤트가 발생합니다.

출처: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34)

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

`activationEpoch`는 Heimdall에서 유효성 검사자가 활성화되는 체크포인트 수입니다.

슬롯을 사용할 수 없으면 스마트 계약에서 스테이크 호출을 수행할 수 없습니다. 시스템에서 유효성 검사자의 수를 제한하는 방법이 유효성 검사자 슬롯입니다.  슬롯은 이더리움 스마트 계약에서 관리됩니다.

다음은 Heimdall 트랜잭션을 위한 `ValidatorJoin` 메시지입니다.

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

`MsgStakeUpdate`는 유효성 검사자가 다시 스테이킹을 하거나 새로운 위임이 발생할 때 스테이크 업데이트를 처리합니다. 두 경우 모두 새로운 `StakeUpdate` 이벤트가 발생합니다.

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

다음은 Heimdall 트랜잭션을 위한 `MsgStakeUpdate` 메시지입니다.

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

`MsgValidatorExit`는 유효성 검사자가 이더리움에서 종료 프로세스를 시작한 후 유효성 검사자의 종료 프로세스를 처리합니다. `SignerUpdate` 이벤트가 발생합니다.

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

다음은 Heimdall 트랜잭션을 위한 `MsgValidatorExit` 메시지입니다.

```go
type MsgValidatorExit struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgSignerUpdate {#msgsignerupdate}

`MsgSignerUpdate`는 유효성 검사자가 이더리움에서 서명자 키를 업데이트할 때 서명자 업데이트를 관장합니다. `SignerUpdate` 이벤트가 발생합니다.

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

다음은 Heimdall 트랜잭션을 위한 `MsgSignerUpdate` 메시지입니다.

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

## CLI 명령 {#cli-commands}

### 유효성 검사자 세부 정보 {#validator-details}

**서명자 주소별**

```bash
heimdallcli query staking validator-info \
	--validator=<signer-address> \
	--chain-id <chain-id>
```

이 명령은 다음 출력을 표시합니다.

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

**유효성 검사자 주소별**

```bash
heimdallcli query staking validator-info \
	--id=<validator-id> \
	--chain-id=<chain-id>
```

이 명령은 다음 출력을 표시합니다.

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

### 유효성 검사자 합류 {#validator-join}

이 명령은 CLI를 통해 유효성 검사자 합류 명령을 보냅니다.

```bash
heimdallcli tx staking validator-join \
	--signer-pubkey <signer-public-key> \
	--tx-hash <tx-hash>   \
	--log-index <log-index> \
	--chain-id <chain-id>
```

`tx-hash` 값은 `Staked` 이벤트를 발생시킨 이더리움 TX 해시와 동일해야 하며 `log-index`는 이벤트가 발생하는 인덱스와 동일해야 합니다.

## 기타 API {#rest-apis}

| 이름 | 메서드 | 엔드포인트 |
|----------------------|------|------------------|
| Heimdall 유효성 검사자 세트 가져오기 | GET | /staking/validator-set |
| 유효성 검사자 세부 정보 가져오기 | GET | /staking/validator/validator-id |


모든 쿼리 API는 다음 형식으로 생성됩니다.

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
