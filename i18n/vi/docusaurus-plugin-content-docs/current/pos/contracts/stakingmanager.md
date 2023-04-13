---
id: stakingmanager
title: Bộ quản lý góp cổ phần
description: Trình quản lý Stake là hợp đồng chính cho việc xử lý các hoạt động liên quan đến xác thực trên mạng Polygon.
keywords:
  - docs
  - Staking Manager
  - polygon
  - wiki
  - validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Đối với Bằng chứng về Sự đồng thuận của Polygon dựa trên sự đồng thuận dựa trên sự đồng thuận của Polygon, tất cả xác thực và xử lý việc xác thực, phần thưởng sẽ được thực thi trên hợp đồng thông minh Ethereum. Toàn bộ thiết kế tuân theo triết lý này là làm ít hơn hợp đồng Mạng chính. Nó thực hiện xác thực thông tin và đẩy tất cả các hoạt động nặng tính toán cho L2 (đọc về [Heimdall](https://wiki.polygon.technology/docs/pos/heimdall/overview)).

**Các cầu thủ** được chia thành **các trình xác thực**, **đại biểu**, và **người canh gác** (để báo cáo gian lận).

[**StakeManager**](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/stakeManager/StakeManager.sol) là hợp đồng chính cho việc xử lý các hoạt động xác thực như xác thực `checkPoint`đặc biệt, phân phối phần thưởng, và quản lý cọc. Vì hợp đồng sử dụng **ID NFT** như là nguồn gốc của sở hữu, sự thay đổi quyền sở hữu và người ký sẽ không ảnh hưởng gì đến bất kỳ điều gì trong hệ thống.

:::tip

Từ một địa chỉ Ethereum, một **Staker chỉ có thể là một người xác thực hoặc đại biểu** (nó chỉ là một lựa chọn thiết kế, không có lý do cứng).

:::

## Adissions trình xác thực/ Sự thay thế {#validator-admissions-replacement}

### Nhận nuôi: {#admissions}
Hiện tại, không có số lượng xác thực mở trên Polygon PoS. Cũng có một danh sách wait để trở thành một trình xác thực. Trong tương lai, nếu slot trở nên sẵn sàng, các trình xác thực có thể áp dụng để được xem xét và gỡ bỏ khỏi danh sách chờ.


### Thay thế {#replacement}
PIP4 giới thiệu khái niệm về hiệu suất trình diễn cho sự giám sát cộng đồng. Nếu một trình xác thực nằm trong trạng thái không lành mạnh trong thời gian dài như được vạch trong PIP4, chúng sẽ bị cấm từ mạng lưới. Slot xác thực sau đó sẽ được thực hiện cho những người đang phát hiện từ danh sách chờ.

:::info

Hiện tại, [<ins>Giai đoạn 2 của PART C trong PIP4</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956/24) đang được thực hiện. Đây là nơi cộng đồng quyết định về tiêu chuẩn đánh giá viễn cảnh xác thực. Trong thời gian, bài tập này sẽ tạo ra một quá trình thực hiện và thực hiện.

:::

## Phương pháp và biến số {#methods-and-variables}

:::caution Việc thực hiện sắc thái

`jail``unJail`, và các `slash`chức năng không được sử dụng hiện tại như một phần của việc triển khai.

:::

### xác thực atatorThreshold {#validatorthreshold}

Nó lưu trữ số lượng xác thực tối đa được chấp nhận bởi hệ thống, cũng được gọi là sốc.

### AccountStateRoot {#accountstateroot}

- Đối với nhiều kế toán khác nhau được thực hiện trên Heimdall cho người xác thực và người đại biểu, chủ yếu tài khoản đã được gửi trong khi gửi tài khoản `checkpoint`.
- accot được sử dụng trong khi `claimRewards`và .`unStakeClaim`

### cọc/ cọcFor {#stake-stakefor}

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

- Cho phép bất kỳ ai có số lượng (theo MATIC tokens) lớn hơn `minDeposit`, `currentValidatorSetSize`nếu như ít hơn .`validatorThreshold`
- Phải chuyển `amount+heimdallFee`, đưa trình xác thực vào thời gian đấu giá cho một cuộc đấu giá (nhiều hơn trong phần Aucution).
- `updateTimeLine`cập nhật cấu trúc dữ liệu thời gian đặc biệt, điều này lưu trữ theo dõi của các trình xác thực đang hoạt động và cổ phần cho epoch / checkpoint đếm.
- Một độc nhất `NFT`được ghi trên mỗi cuộc gọi `stake`mới`stakeFor`, có thể chuyển đến bất kỳ ai nhưng có thể sở hữu địa chỉ 1:1 Ethereum.
- `acceptDelegation`thiết lập để thực sự nếu người xác thực muốn chấp nhận đại biểu, `ValidatorShare`hợp đồng được triển khai cho người xác thực.

### Hủy bỏ cổ phần {#unstake}

- Gỡ bỏ trình xác thực từ bộ xác thực trong epoch tiếp theo (chỉ có giá trị cho điểm kiểm tra hiện tại một lần được gọi `unstake`là
- Xóa cổ phần của người xác thực khỏi cấu trúc dữ liệu dòng thời gian, cập nhật số lượng epoch thoát của người xác thực.
- Nếu trình xác thực đã được cử hành, hãy thu thập tất cả các phần thưởng và hợp đồng đại biểu khóa cho các đại biểu mới.

### unstakeClaim {#unstakeclaim}

```solidity
function unstakeClaim(uint256 validatorId) public;
```

- Sau `unstaking`đó, trình xác thực được đưa vào thời gian rút để chúng có thể bị cắt bỏ, nếu có bất kỳ gian lận nào được tìm thấy sau `unstaking`đó, vì gian lận trước đây.
- Một khi `WITHDRAWAL_DELAY`kinh kỳ được thực hiện, người xác thực có thể gọi chức năng này và thực hiện phần thưởng `stakeManager`(nhận được phần thưởng nếu có, được ghi nhớ trở lại, burn NFT, v.v.).

### Góp thêm cổ phần {#restake}

```solidity
function restake(uint256 validatorId, uint256 amount, bool stakeRewards) public;
```

- Cho phép người xác thực tăng cổ phần của họ bằng cách đặt số tiền hoặc phần thưởng mới hoặc cả hai.
- Phải cập nhật dòng thời gian (số lượng) cho các cọc.

### withdrawRewards {#withdrawrewards}

```solidity
function withdrawRewards(uint256 validatorId) public;
```

Phương pháp này cho phép trình xác thực rút lại phần thưởng tích hợp, phải cân nhắc xem xét nhận phần thưởng từ hợp đồng đại biểu nếu trình xác thực chấp nhận.

### updateSigner {#updatesigner}

```solidity
function updateSigner(uint256 validatorId, bytes memory signerPubkey) public
```

Phương pháp này cho phép trình xác thực cập nhật địa chỉ của người ký (được sử dụng để xác thực các khối trên Polygon blockchain và chữ ký kiểm tra point trên )`stakeManager`.

### topUpForFee {#topupforfee}

```solidity
function topUpForFee(uint256 validatorId, uint256 heimdallFee) public;
```

Các người xác thực có thể nâng cao số dư của họ cho phí Heimdall bằng cách gọi phương pháp này.

### claimFee {#claimfee}

```solidity
function claimFee(
        uint256 validatorId,
        uint256 accumSlashedAmount,
        uint256 accumFeeAmount,
        uint256 index,
        bytes memory proof
    ) public;
```

Phương pháp này được sử dụng để rút phí từ Heimdall. Được cập nhật trên mỗi điểm kiểm soát, để người xác thực có thể cung cấp bằng chứng về số tiền ẩn trong căn bản này để sử dụng tài khoản và phí rút của `accountStateRoot`Heimdall

Lưu ý là `accountStateRoot`được viết lại để ngăn chặn các lối thoát trên nhiều điểm kiểm tra (cho người gốc cũ và lưu kế toán trên `stakeManager`). `accumSlashedAmount`Sẽ không được sử dụng vào thời điểm và sẽ được sử dụng để sắp.-

### StakingNFT {#stakingnft}

Hợp đồng Standard ERC721 với vài hạn chế như một dấu hiệu trên người dùng và được đúc trong giai đoạn tiếp theo.

### startAuction {#startauction}

```solidity
function startAuction(
    uint256 validatorId, /**  auction for validator */
    uint256 amount /**  amount greater then old validator's stake */
    ) external;
```

Để bắt đầu cuộc đấu giá hoặc giá cao hơn trên đã chạy cuộc đấu giá đã được sử dụng, chức năng này được sử dụng. Thời gian vận hành trong chu kỳ như `(auctionPeriod--dynasty)--(auctionPeriod--dynasty)--(auctionPeriod--dynasty)`vậy nó **phải kiểm tra xem xét thời gian đấu giá đúng.**

`perceivedStakeFactor`được sử dụng để tính toán chính xác*cổ phần (ghi chú hiện tại, nó được sử dụng bởi mặc định 1 WIP để chọn chức năng). **Phải kiểm tra phiên đấu giá từ kỳ đấu giá cuối cùng nếu bất kỳ ai vẫn tiếp tục (người** ta có thể chọn không `confirmAuction`gọi để lấy vốn của họ trong phiên đấu giá tiếp theo). Thông thường phiên đấu giá tiếng Anh liên tục sẽ diễn ra trong một cuộc đấu giá `auctionPeriod`.

### confirmAuctionBid {#confirmauctionbid}

```solidity
function confirmAuctionBid(
        uint256 validatorId,
        uint256 heimdallFee, /** for new validator */
        bool acceptDelegation,
        bytes calldata signerPubkey
    ) external
```

- **Phải kiểm tra xem đây không phải là một kỳ đấu giá.**
- Nếu người trả giá cuối cùng là chủ sở hữu của `validatorId`, hành vi sẽ tương tự như sự khởi động.
- Trong trường hợp hủy góp cổ phần `validatorId`và thêm người dùng mới làm người xác thực từ điểm kiểm duyệt tiếp theo, vì hành vi của người dùng mới phải tương tự như stake/stakeFor.

### checkSignatures {#checksignatures}

```solidity
function checkSignatures(
        uint256 blockInterval,
        bytes32 voteHash,
        bytes32 stateRoot,
        bytes memory sigs
    ) public;
```

- Việc ghi chỉ dành cho hợp đồng RootChain khi gửi các điểm kiểm duyệt
- `voteHash` trên đó tất cả các người xác thực ký tên (thỏa thuận BFT ⅔+1)
- Chức năng này chỉ xác thực các dấu hiệu duy nhất và kiểm tra ⅔+1 quyền đã được ký trên gốc điểm kiểm duyệt (bao gồm xác minh trong `voteHash`hợp đồng RootChain cho tất cả dữ liệu) `currentValidatorSetTotalStake` cung cấp cổ phần đang hoạt động hiện tại.
- Phần thưởng được phân phối tương ứng với cọng của người xác thực. Nhiều phần thưởng hơn trong [sự phân phối phần thưởng](https://www.notion.so/Rewards-Distribution-127d586c14544beb9ea326fd3bb5d3a2).

### isValidator {#isvalidator}

Kiểm tra nếu một trình xác thực được trao cho là trình xác thực đang hoạt động cho epoch hiện tại.

## Cấu trúc dòng thời gian dữ liệu {#timeline-data-structure}

```solidity
struct State {
    int256 amount;
    int256 stakerCount;
}

mapping(uint256 => State) public validatorState;
```

<img src={useBaseUrl("img/staking_manager/staking_manager.png")} />

## StakingInfo {#stakinginfo}

Hợp đồng lưu trữ Centralized cho cả sự kiện xác thực và đại biểu, bao gồm một số chức năng chỉ đọc. Bạn có thể kiểm tra mã nguồn của hợp đồng [StakingInfo. sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol) trên GitHub.

## ValidatorShareFactory {#validatorsharefactory}

Hợp đồng nhà máy để triển khai `ValidatorShare`hợp đồng cho mỗi người xác thực người opt-in cho đại biểu. Bạn có thể kiểm tra mã nguồn của hợp đồng [ValidatorShareFactor. sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/validatorShare/ValidatorShareFactory.sol) trên GitHub.
