---
id: delegation
title: Sự méo mó qua các Share của Validator
sidebar_label: Delegation
description: Sự méo mó qua các Share của Validator
keywords:
  - polygon wiki
  - docs
  - polygon
  - delegation
  - validator shares
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon hỗ trợ ủy quyền thông qua cổ phần xác thực. Bằng cách sử dụng mô hình này, sẽ dễ dàng hơn để phân phối phần thưởng và cắt giảm với quy mô (hàng nghìn người ủy quyền) theo hợp đồng mạng lưới chính Ethereum mà không cần nhiều điện toán.

Người ủy quyền ủy quyền bằng cách mua cổ phần của một nhóm hữu hạn từ những người xác thực. Mỗi người xác thực sẽ có phiếu thưởng cổ phần người xác thực của riêng họ. Hãy gọi những phiếu thưởng có thể thay thế này là `VATIC`cho một người xác thực`A`. Ngay sau khi người dùng ủy quyền cho người xác thực`A`, chúng sẽ được phát hành `VATIC`dựa trên tỷ giá trao đổi của cặp`MATIC/VATIC`. Khi người dùng tích lũy giá trị, tỷ giá trao đổi chỉ ra rằng họ có thể rút nhiều `MATIC`hơn cho mỗi`VATIC`, khi người dùng bị cắt giảm, người dùng rút ít `MATIC` hơn cho `VATIC` của họ.

Lưu ý rằng `MATIC`là phiếu thưởng góp cổ phần. Người ủy quyền cần có `MATIC`phiếu thưởng để tham gia vào ủy quyền.

Ban đầu, người ủy quyền `D`mua phiếu thưởng từ nhóm người xác thực `A`cụ thể khi`1 MATIC per 1 VATIC`.

Khi người xác thực nhận được nhiều phiếu thưởng `MATIC`hơn, các phiếu thưởng mới sẽ được thêm vào nhóm. Hãy nói với hồ bơi hiện `100 MATIC`tại, `10 MATIC`phần thưởng sẽ được bổ sung vào hồ bơi. Nhưng vì tổng nguồn cung cấp phiếu thưởng `VATIC`không thay đổi do phần thưởng, nên tỷ giá trao đổi sẽ trở thành`1 MATIC per 0.9 VATIC`. Hiện tại, đại biểu sẽ `D`nhận được nhiều hơn `MATIC`cho cùng số cổ phần.

`VATIC`: Phiếu thưởng cổ phần người xác thực được tạo cụ thể (phiếu thưởng ERC20)

## Thông số kỹ thuật {#technical-specification}

```solidity
uint256 public validatorId; // Delegation contract for validator
uint256 public validatorRewards; // accumulated rewards for validator
uint256 public commissionRate; // validator's cut %
uint256 public validatorDelegatorRatio = 10; // to be implemented/used

uint256 public totalStake;
uint256 public rewards; // rewards for pool of delegation stake
uint256 public activeAmount; // # of tokens delegated which are part of active stake
```

Tỷ giá trao đổi được tính như sau:

```js
ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares
```

## Phương pháp và biến số {#methods-and-variables}

### buyVoucher {#buyvoucher}

```js
function buyVoucher(uint256 _amount) public;
```

- Chuyển nhượng `_amount`cho stakeManager và cập nhật cấu trúc dữ liệu dòng thời gian cho cổ phần đang hoạt động.
- `updateValidatorState` được sử dụng để cập nhật dòng thời gian DS.
- `Mint`ủy quyền cổ phần bằng cách sử dụng hiện tại `exchangeRate`cho`_amount`.
- `amountStaked` được sử dụng để theo dõi cổ phần đang hoạt động của từng người ủy quyền để tính toán phần thưởng thanh khoản.

### sellVoucher {#sellvoucher}

```js
function sellVoucher() public;
```

- Sử dụng số cổ phiếu hiện tại `exchangeRate`và số cổ phiếu hiện tại để tính tổng số lượng (phần cổ phiếu đang hoạt động + vá).
- `unBond`được sử dụng cổ phần từ xác thực và chuyển phần thưởng cho người đại biểu, nếu có.
- Phải xóa cổ phần đang hoạt động khỏi dòng thời gian bằng cách sử dụng `updateValidatorState` trong stakeManger.
- `delegators` lập bản đồ được sử dụng để theo dõi số tiền góp cổ phần trong thời gian rút tiền.

### withdrawRewards {#withdrawrewards}

```js
function withdrawRewards() public;
```

- Đối với một đại biểu, tính toán phần thưởng và chuyển nhượng, và tùy thuộc vào số lượng `exchangeRate`cổ phần.
- Ví dụ: nếu một đại biểu sở hữu 100 cổ phần và tỷ lệ trao đổi là 200 phần thưởng là 100 bộ kens, chuyển 100 vật thể cho đại biểu. Số cổ phần còn lại là 100 vì vậy sử dụng tỷ lệ trao đổi 200, hiện tại nó có giá trị 50 cổ phần. Nên đốt 50 cổ phần. Delegator hiện nay có 50 cổ phiếu trị giá 100 vật thể (mà ông ban đầu được xác định / đại biểu).

### Góp thêm cổ phần {#restake}

Restake có thể hoạt động theo hai cách: đại biểu có thể mua thêm cổ phần bằng cách sử dụng `buyVoucher`hoặc thưởng phần.

```js
function reStake() public;
```

Hàm trên được sử dụng để phục hồi Stake (phần thưởng). Số lượng cổ phiếu không bị ảnh hưởng vì  `exchangeRate`là như nhau; vì vậy chỉ phần thưởng được chuyển vào cổ phần đang hoạt động cho cả hợp đồng cổ phần của người xác thực và dòng thời gian stakeManager.

`getLiquidRewards`được sử dụng để tính toán phần thưởng tích lũy tức là một đại biểu sở hữu 100 cổ phần và tỷ lệ trao đổi là 200, vì vậy phần thưởng là 100 đều. Di chuyển 100 tượng thành cọc, vì tỷ lệ trao đổi vẫn còn là số cổ phần cũng sẽ vẫn vẫn như nhau. Sự khác biệt duy nhất là hiện nay 200 dấu hiệu được xem là vào cổ phần hoạt động và không thể rút ngắn ngay lập tức (không phải là một phần của phần chất lỏng).

Mục đích của sự tái mạo là vì trình xác thực của người đại biểu hiện có nhiều cổ phần hơn và họ sẽ nhận được nhiều phần thưởng hơn cho điều đó và người đại biểu cũng sẽ như vậy.

### unStakeClaimToken {#unstakeclaimtokens}

```js
function unStakeClaimTokens()
```

Khi kỳ rút quân đã kết thúc, các đại biểu đã bán cổ phần của họ có thể xác định được số lượng cổ phần của họ. Phải chuyển nhượng phiếu thưởng cho người dùng.

### updateCommissionRate {#updatecommissionrate}

```js
function updateCommissionRate(uint256 newCommissionRate)
        external
        onlyValidator
```

- Cập nhật % hoa hồng cho người xác thực.

### updateRewards {#updaterewards}

```js
function updateRewards(uint256 reward, uint256 checkpointStakePower, uint256 validatorStake)
        external
        onlyOwner
        returns (uint256)
```

Khi một trình xác thực được thưởng cho sự kiểm tra dưới trích, chức năng này được gọi là cho sự phân tích giữa trình xác thực và các đại biểu.
