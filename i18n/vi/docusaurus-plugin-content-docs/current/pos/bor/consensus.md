---
id: consensus
title: Đồng thuận Bor
description: Cơ chế Bor để phát triển các nhà sản xuất mới
keywords:
  - docs
  - matic
  - Bor Consensus
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Đồng thuận Bor {#bor-consensus}

Sự đồng thuận Bor được lấy cảm hứng từ sự đồng thuận Clique : [https://ethereum.org/EIPS/eip-225](https://eips.ethereum.org/EIPS/eip-225). Clique hoạt động với nhiều nhà sản xuất đã xác định trước. Tất cả các nhà sản xuất biểu quyết cho các nhà sản xuất mới bằng cách sử dụng API Clique. Chúng sẽ tạo ra khối

Bor tìm kiếm các nhà sản xuất mới thông qua cơ chế quản lý span và sprint.

## Người xác thực {#validators}

Polygon là một hệ thống Bằng chứng cổ phần Bất kỳ ai cũng có thể góp cổ phần phiếu thưởng Matic của họ trên hợp đồng thông minh Ethereum, "hợp đồng góp cổ phần" và trở thành người xác thực cho hệ thống.

```jsx
function stake(
	uint256 amount,
	uint256 heimdallFee,
	address signer,
	bool acceptDelegation
) external;
```

Khi người xác thực hoạt động trên Heimdall, họ sẽ được chọn làm nhà sản xuất thông qua mô-đun`bor`.

Kiểm tra overview để hiểu được sự quản lý span nhiều hơn trong chi tiết: [Bor Overview](https://www.notion.so/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab)

## Span {#span}

Một bộ phận xác định logic của khối để có một bộ phận xác thực được chọn từ trong số tất cả các trình xác thực có sẵn. Heimdall cung cấp thông tin chi tiết về span thông qua các API.

```go
// HeimdallSpan represents span from heimdall APIs
type HeimdallSpan struct {
	Span
	ValidatorSet      ValidatorSet `json:"validator_set" yaml:"validator_set"`
	SelectedProducers []Validator  `json:"selected_producers" yaml:"selected_producers"`
	ChainID           string       `json:"bor_chain_id" yaml:"bor_chain_id"`
}

// Span represents a current bor span
type Span struct {
	ID         uint64 `json:"span_id" yaml:"span_id"`
	StartBlock uint64 `json:"start_block" yaml:"start_block"`
	EndBlock   uint64 `json:"end_block" yaml:"end_block"`
}

// Validator represents a volatile state for each Validator
type Validator struct {
	ID               uint64         `json:"ID"`
	Address          common.Address `json:"signer"`
	VotingPower      int64          `json:"power"`
	ProposerPriority int64          `json:"accum"`
}
```

Geth (Trong trường hợp này là Bor) sử dụng khối `snapshot`để lưu trữ dữ liệu trạng thái cho mỗi khối, bao gồm cả dữ liệu liên quan đến sự đồng thuận.

Mỗi người xác thực trong span có quyền biểu quyết. Dựa trên sức mạnh của họ, họ sẽ được chọn làm nhà sản xuất khối. Công xuất cao hơn thì khả năng trở thành nhà sản xuất khối cao hơn. Bor sử dụng thuật toán của Tendermint cho điều tương tự. Nguồn: [https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go)

## Sprint {#sprint}

Một tập hợp các khối trong một span mà chỉ một nhà sản xuất khối đơn lẻ được chọn để sản xuất các khối. Kích thước srint là một yếu tố về kích thước span. Bor sử dụng `validatorSet`để lấy người đề xuất/nhà sản xuất hiện tại cho sprint hiện tại.

```go
currentProposerForSprint := snap.ValidatorSet().Proposer
```

Ngoài người đề xuất hiện tại, Bor chọn các nhà sản xuất dự phòng.

## Xác thực khối {#authorizing-a-block}

Các nhà sản xuất ở Bor cũng được gọi là người ký, vì để ủy quyền một khối cho mạng, nhà sản xuất cần ký hàm băm của khối chứa **mọi thứ ngoại trừ chính chữ ký**. Điều này có nghĩa là hàm băm chứa mọi trường của tiêu đề và cả `extraData`ngoại trừ hậu tố chữ ký 65 byte.

Hàm băm này được ký bằng cách sử dụng đường cong `secp256k1`tiêu chuẩn và chữ ký 65 byte kết quả được nhúng vào `extraData`dưới dạng hậu tố 65 byte theo sau.

Mỗi khối đã ký được gán cho một độ khó tạo sức nặng cho Khối. Việc ký lần lượt có trọng lượng (`DIFF_INTURN`) nhiều hơn so với ký lần lượt một (`DIFF_NOTURN`).

### Chiến lược xác thực {#authorization-strategies}

Miễn là các nhà sản xuất tuân thủ các thông số kỹ thuật ở trên, họ có thể ủy quyền và phân phối các khối khi họ thấy phù hợp. Tuy nhiên, chiến lược được đề xuất sau đây sẽ làm giảm lưu lượng mạng và các nhánh nhỏ, vì vậy đây là một tính năng được đề xuất:

- Nếu nhà sản xuất được phép ký khối (nằm trong danh sách được ủy quyền)
    - Tính toán thời gian ký tối ưu của khối tiếp theo (nguồn gốc + `Period`)
    - Nếu đến lượt nhà sản xuất, hãy chờ thời gian chính xác, hãy ký và phát sóng ngay lập tức
    - Nếu nhà sản xuất hết lượt, hãy trì hoãn việc ký bằng `wiggle`

Chiến lược nhỏ này sẽ đảm bảo rằng nhà sản xuất đến lượt (khối nào nặng hơn) có lợi thế hơn một chút trong việc ký kết và tuyên truyền so với những người ký hết lượt. Ngoài ra, chương trình cho phép một chút quy mô với sự gia tăng số lượng nhà sản xuất.

### Ký khi hết lượt {#out-of-turn-signing}

Bor chọn nhiều nhà sản xuất khối để dự phòng khi nhà sản xuất lần lượt không tạo ra một khối. Điều này có thể xảy ra vì nhiều lý do như:

- Nút nhà sản xuất khối không hoạt động
- Nhà sản xuất khối đang cố gắng giữ lại khối
- Nhà sản xuất khối cố ý không sản xuất khối.

Khi điều trên xảy ra, cơ chế sao lưu của Bor bắt đầu hoạt động.

Tại bất kỳ thời gian nào, bộ người xác thực được lưu trữ dưới dạng một mảng được sắp xếp dựa trên địa chỉ người ký của chúng. Giả sử rằng tập hợp xác thực được sắp xếp là A, B, C, D và đến lượt C tạo ra một khối. Nếu C không tạo ra một khối trong một khoảng thời gian cần thiết, thì đến lượt D tạo khối. Nếu D không thì A và sau đó B.

Tuy nhiên, vì sẽ có một khoảng thời gian trước khi C sản xuất và lan truyền một khối, người xác thực sao lưu sẽ chờ một khoảng thời gian nhất định trước khi bắt đầu tạo ra một khối. Thời gian trễ này được gọi là wiggle.

### Wiggle {#wiggle}

Wiggle là thời gian mà một nhà sản xuất nên chờ trước khi bắt đầu sản xuất một khối.

- Giả sử khối cuối cùng (n-1) được tạo ra vào thời điểm`t`.
- Chúng tôi thực thi thời gian trễ tối thiểu giữa khối hiện tại và khối tiếp theo bằng một tham số biến`Period`.
- Trong điều kiện lý tưởng, C sẽ chờ `Period`rồi sản xuất và lan truyền khối. Vì thời gian khối trong Polygon đang được thiết kế khá thấp (2-4 giây), độ trễ lan truyền cũng được giả định là cùng một giá trị với`Period`.
- Vì vậy, nếu D không nhìn thấy một khối mới trong thời gian`2 * Period`, D ngay lập tức bắt đầu sản xuất một khối. Cụ thể, thời gian wiggle của D được xác định là `2 * Period * (pos(d) - pos(c))`trong đó `pos(d) = 3`và `pos(c) = 2` trong bộ người xác thực. Giả sử, `Period = 1`, wiggle đối với D là 2 giây.
- Bây giờ nếu D cũng không tạo ra một khối, A sẽ bắt đầu sản xuất một khối khi thời gian wiggle của `2 * Period * (pos(a) + len(validatorSet) - pos(c)) = 4s`đã trôi qua.
- Tương tự, wiggle cho C là `6s`

### Giải quyết các phân nhánh {#resolving-forks}

Trong khi cơ chế trên bổ sung thêm vào độ mạnh của chuỗi ở một mức độ nhất định, nó giới thiệu khả năng phân nhánh. Thực ra có thể là C đã tạo ra một khối, nhưng có độ trễ lớn hơn dự kiến trong quá trình truyền và do đó D cũng tạo ra một khối, do đó dẫn đến ít nhất là 2 nhánh.

Cách giải quyết rất đơn giản - chọn chuỗi có độ khó cao hơn. Nhưng câu hỏi đặt ra là chúng ta xác định độ khó của một khối trong thiết lập của mình như thế nào?

### Độ khó {#difficulty}

- Độ khó đối của một khối được tạo bởi người ký lần lượt (ví dụ c) được xác định là cao nhất =`len(validatorSet)`.
- Vì D là nhà sản xuất xếp hàng tiếp theo; nếu và khi tình huống phát sinh rằng D đang sản xuất khối; khó khăn cho khối sẽ được xác định giống như trong wiggle là `len(validatorSet) - (pos(d) - pos(c))`nghĩa là `len(validatorSet) - 1`
- Khó khăn đối với khối được tạo ra bởi A trong khi hoạt động như một bản sao lưu trở thành`len(validatorSet) - (pos(a) + len(validatorSet) - pos(c))` là `2`

Bây giờ khi đã xác định độ khó của mỗi khối, độ khó của một nhánh chỉ đơn giản là tổng các độ khó của các khối trong nhánh đó. Trong trường hợp phải chọn một nhánh, thì cái nào có độ khó cao hơn sẽ được chọn, vì điều đó phản ánh thực tế là các khối được tạo ra bởi các nhà sản xuất khối lần lượt. Điều này chỉ đơn giản là để cung cấp một cảm giác kết thúc cho người dùng trên Bor.

## Xem thay đổi {#view-change}

Sau mỗi span, Bor thay đổi chế độ xem. Điều này có nghĩa là nó tìm nạp các nhà sản xuất mới cho span tiếp theo.

### Thực hiện span {#commit-span}

Khi span hiện tại sắp kết thúc (cụ thể là vào cuối sprint thứ hai-cuối cùng trong span), Bor kéo một span mới từ Heimdall. Đây là một lệnh gọi HTTP đơn giản đến nút Heimdall. Khi dữ liệu này được tìm nạp, một lệnh gọi `commitSpan`được thực hiện tới hợp đồng dựng sẵn BorValidatorSet thông qua lệnh gọi Hệ thống.

Bor cũng cài các byte của nhà sản xuất vào tiêu đề của khối. Điều này là cần thiết trong khi đồng bộ nhanh Bor. Trong quá trình đồng bộ nhanh, Bor đồng bộ hàng loạt tiêu đề và xác thực nếu các khối được tạo bởi các nhà sản xuất được ủy quyền.

Khi bắt đầu mỗi Sprint, Bor tìm nạp các byte tiêu đề từ tiêu đề trước cho các nhà sản xuất tiếp theo và bắt đầu tạo các khối dựa trên thuật toán`ValidatorSet`.

Đây là cách tiêu đề trông như thế nào cho một khối:

```js
header.Extra = header.Vanity + header.ProducerBytes /* optional */ + header.Seal
```

<img src={useBaseUrl("img/Bor/header-bytes.svg")} />

## Đồng bộ trạng thái từ chuỗi Ethereum {#state-sync-from-ethereum-chain}

Bor cung cấp một cơ chế trong đó một số sự kiện cụ thể trên chuỗi ethereum chính được chuyển tiếp đến Bor. Đây cũng là cách xử lý tiền nạp vào các hợp đồng plasma.

1. Bất kỳ hợp đồng nào trên Ethereum đều có thể gọi [syncState](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L33) trong`StateSender.sol`. Cuộc gọi này tạo ra sự kiện `StateSynced` https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38

  ```js
  event StateSynced(uint256 indexed id, address indexed contractAddress, bytes data)
  ```

2. Heimdall nghe những sự kiện này và gọi `function proposeState(uint256 stateId)`trong - `StateReceiver.sol`vì vậy hành động như một cửa hàng cho các cuộc thay đổi tình trạng đang chờ. Lưu ý rằng giao dịch `proposeState`sẽ được xử lý ngay cả với phí gas là 0 miễn là nó được thực hiện bởi một trong những trình xác thực trong bộ trình xác thực hiện tại: https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L24

3. Khi bắt đầu mỗi sprint, Bor lấy thông tin chi tiết về các thay đổi trạng thái đang chờ xử lý bằng cách sử dụng các trạng thái từ Heimdall và chuyển chúng sang trạng thái Bor bằng lệnh gọi hệ thống. Xem`commitState` tại đây: https://github.com/maticnetwork/genesis-contracts/blob/f85d0409d2a99dff53617ad5429101d9937e3fc3/contracts/StateReceiver.sol#L41
