---
id: staking
title: Góp cổ phần
description: Mô-đun điều hành này có thể xác thực các giao dịch và trạng thái
keywords:
  - docs
  - matic
  - staking
  - heimdall
  - validator
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Góp cổ phần {#staking}

Mô-đun góp cổ phần quản lý các giao dịch và trạng thái liên quan đến người xác thực cho Heimdall. Lưu ý rằng người xác thực góp cổ phần các phiếu thưởng của họ trên chuỗi Ethereum và trở thành người xác thực. Người xác thực tương ứng gửi các giao dịch trên Heimdall bằng cách sử dụng các tham số cần thiết để công nhận sự thay đổi cổ phần Ethereum. Một khi phần lớn người xác thực đồng ý về sự thay đổi cổ phần, mô-đun này lưu thông tin người xác thực trên trạng thái Heimdall.

## Quản lý khóa {#key-management}

Để quản lý khóa, vui lòng tham khảo [Quản lý khóa người xác thực](/docs/pos/heimdall/validator-key-management)

## Ủy quyền {#delegation}

Mô-đun này chỉ quản lý việc góp cổ phần của người xác thực trên Heimdall. Ủy quyền chỉ có sẵn trên các hợp đồng thông minh trên chuỗi Ethereum. Để tối ưu hóa việc tính toán phần thưởng ủy quyền trên các hợp đồng thông minh, chúng tôi đang sử dụng cổ phần người xác thực (ERC20 cho mỗi người xác thực).

Thêm chi tiết ở đây: [Ủy quyền (Cổ phần người xác thực)](/docs/pos/contracts/delegation)

## Phần thưởng {#rewards}

Tất cả phần thưởng được phân phối trên chuỗi Ethereum. Người xác thực và người ủy quyền nhận phần thưởng của họ hoặc tái góp cổ phần bằng cách đơn giản là gửi giao dịch trên `StakeManager.sol`

Thêm chi tiết ở đây: [Phần thưởng](/docs/maintain/validator/rewards.md#what-is-the-incentive)

## Thông báo {#messages}

<img src={useBaseUrl('img/staking/stake-management-flow.svg')} />

### MsgValidatorJoin {#msgvalidatorjoin}

`MsgValidatorJoin` xử lý việc góp cổ phần khi một người xác thực mới tham gia vào hệ thống. Một khi người xác thực gọi `stake`hoặc `stakeFor`trong`StakingManager.sol` trên Ethereum, và sự kiện `Staked`mới được phát hành.

Nguồn: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34)

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

`activationEpoch` là số điểm kiểm duyệt mà từ đó người xác thực sẽ hoạt động trên Heimdall.

Lệnh gọi cổ phần trên hợp đồng thông minh thất bại nếu không có slot. Slot người xác thực là cách hạn chế một số người xác thực trong hệ thống. Slot được quản lý trên các hợp đồng thông minh Ethereum.

Dưới đây là thông báo `ValidatorJoin`cho giao dịch Heimdall:

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

`MsgStakeUpdate` xử lý cập nhật cổ phần khi người xác thực tái góp cổ phần hoặc xuất hiện ủy quyền mới. Trong cả hai trường hợp, sự kiện `StakeUpdate`mới được phát hành.

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

Dưới đây là thông báo `MsgStakeUpdate` cho giao dịch Heimdall:

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

`MsgValidatorExit` xử lý quy trình thoát người xác thực sau khi người xác thực khởi động quy trình thoát trên Ethereum. Nó phát hành sự kiện`SignerUpdate`.

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

Dưới đây là thông báo `MsgValidatorExit`cho giao dịch Heimdall:

```go
type MsgValidatorExit struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgSignerUpdate {#msgsignerupdate}

`MsgSignerUpdate` xử lý cập nhật người ký khi người xác thực cập nhật khóa người ký trên Ethereum. Nó phát hành sự kiện`SignerUpdate`.

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

Dưới đây là thông báo `MsgSignerUpdate`cho giao dịch Heimdall:

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

## Lệnh CLI {#cli-commands}

### Chi tiết người xác thực {#validator-details}

**Theo địa chỉ người ký**

```bash
heimdallcli query staking validator-info \
	--validator=<signer-address> \
	--chain-id <chain-id>
```

Lệnh này sẽ hiển thị đầu ra sau:

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

**Theo địa chỉ người xác thực**

```bash
heimdallcli query staking validator-info \
	--id=<validator-id> \
	--chain-id=<chain-id>
```

Lệnh này sẽ hiển thị đầu ra sau:

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

### Người xác thực tham gia {#validator-join}

Lệnh này gửi lệnh người xác thực tham gia thông qua CLI:

```bash
heimdallcli tx staking validator-join \
	--signer-pubkey <signer-public-key> \
	--tx-hash <tx-hash>   \
	--log-index <log-index> \
	--chain-id <chain-id>
```

Giá trị `tx-hash`phải giống như hàm băm giao dịch Ethereum phát hành sự kiện `Staked`và`log-index` phải giống nhau tại chỉ số mà sự kiện được phát hành.

## API REST {#rest-apis}

| Tên | Phương pháp | Điểm cuối |
|----------------------|------|------------------|
| Nhận tập hợp người xác thực Heimdall | GET | /staking/validator-set |
| Nhận chi tiết người xác thực | GET | /staking/validator/validator-id |


Tất cả các API truy vấn sẽ dẫn đến định dạng sau:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
