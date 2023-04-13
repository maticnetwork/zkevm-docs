---
id: how-state-sync-works
title: Đồng bộ trạng thái hoạt động như thế nào?
description: "Gửi trạng thái từ chuỗi Ethereum sang chuỗi Bor."
keywords:
  - docs
  - matic
  - state sync
  - working
image: https://matic.network/banners/matic-network-16x9.png
---

# Đồng bộ trạng thái hoạt động như thế nào? {#how-does-state-sync-work}

Quản lý trạng thái gửi trạng thái từ chuỗi Ethereum sang chuỗi Bor. Nó được gọi là **Đồng bộ bang**.

Chuyển bang từ Ethereum sang Bor xảy ra thông qua cuộc gọi hệ thống. Giả sử như là một người dùng gửi USDC cho trình quản lý ký gửi trên Ethereum. Các người xác thực nghe những sự kiện đó, hãy xác thực, và lưu trữ chúng trong trạng thái Heimdall. Bor nhận các bản ghi đồng bộ hóa trạng thái mới nhất và cập nhật trạng thái Bor (đúc số lượng USDC tương đương trên Bor) bằng lệnh gọi hệ thống.

## Người gửi trạng thái {#state-sender}

Nguồn: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Để đồng bộ hóa trạng thái, hợp đồng gọi phương pháp **hợp đồng trạng thái người gửi** sau trên chuỗi Ethereum.

```jsx
contract StateSender {
	/**
	 * Emits `stateSynced` events to start sync process on Ethereum chain
	 * @param receiver    Target contract on Bor chain
	 * @param data        Data to send
	 */
	function syncState (
		address receiver,
		bytes calldata data
	) external;
}
```

Hợp đồng `receiver`phải có trên chuỗi con, chuỗi này nhận trạng thái `data`sau khi quy trình hoàn tất. `syncState` phát ra sự kiện `StateSynced`trên Ethereum, như sau:

```jsx
/**
 * Emits `stateSynced` events to start sync process on Ethereum chain
 * @param id                  State id
 * @param contractAddress     Target contract address on Bor
 * @param data                Data to send to Bor chain for Target contract address
 */
event StateSynced (
	uint256 indexed id,
	address indexed contractAddress,
	bytes data
);
```

Khi sự kiện `StateSynced`được phát ra trên hợp đồng `stateSender` trên chuỗi Ethereum, Heimdall sẽ lắng nghe những sự kiện đó và thêm vào trạng thái Heimdall sau khi 2/3+ người xác thực đồng ý.

Sau mỗi sprint (hiện có 64 khối trên Bor), Bor tìm nạp bản ghi đồng bộ hóa trạng thái mới và cập nhật trạng thái bằng lệnh gọi`system`. Đây là mã tương đương : [https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51](https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51)

Trong `commitState`, Bor thực hiện `onStateReceive`, với `stateId`và `data`là args, theo hợp đồng mục tiêu.

## Giao diện trạng thái người nhận trên Bor {#state-receiver-interface-on-bor}

Hợp đồng `receiver` trên chuỗi Bor phải thực hiện giao diện sau.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

Chỉ `0x0000000000000000000000000000000000001001`— `StateReceiver.sol`, phải được phép để gọi chức năng `onStateReceive`trên hợp đồng mục tiêu.

## Gọi hệ thống {#system-call}

Chỉ địa chỉ hệ thống, `2^160-2`, mới cho phép thực hiện cuộc gọi hệ thống. Bor gọi nó trong nội bộ với địa chỉ hệ thống là`msg.sender`. Nó thay đổi trạng thái hợp đồng và cập nhật trạng thái gốc cho một khối cụ thể. Lấy cảm hứng từ [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) và [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

Lệnh gọi hệ thống rất hữu ích để thay đổi trạng thái thành hợp đồng mà không cần thực hiện bất kỳ giao dịch nào.

## Nhật ký đồng bộ hóa trạng thái và Biên nhận khối Bor {#state-sync-logs-and-bor-block-receipt}

Các sự kiện phát ra bởi các cuộc gọi hệ thống được xử lý theo cách khác với nhật ký thông thường. Đây là mã : [https://github.com/matic/bor/pr/90](https://github.com/maticnetwork/bor/pull/90).

Bor sản xuất một tx mới / biên lai chỉ dành cho máy khách gồm tất cả nhật ký cho đồng bộ bang. Tx hash có nguồn gốc từ khối số và khối hash (khối cuối cùng ở sprit):

```jsx
keccak256("matic-bor-receipt-" + block number + block hash)
```

Điều này không thay đổi logic đồng thuận nào cả, chỉ có sự thay đổi của máy khách `eth_getBlockByNumber``eth_getTransactionReceipt`thôi. Và bao `eth_getLogs`gồm các nhật ký đồng bộ bang được bắt nguồn bằng chứng. Lưu ý rằng bộ lọc Bloom trên khối không bao gồm bao hàm cho nhật ký đồng bộ hóa trạng thái. Nó cũng không bao gồm sự khởi động từ tx trong `transactionRoot`hoặc .`receiptRoot`