---
id: state-sync-mechanism
title: Cơ chế đồng bộ trạng thái
description: Cơ chế đồng bộ bang để tương tự đọc dữ liệu Ethereum
keywords:
  - docs
  - matic
  - polygon
  - state sync
  - mechanism
slug: state-sync-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Người xác thực trên lớp [Heimdall](/docs/maintain/glossary.md#heimdall) nhận sự kiện [Đồng bộ trạng thái](https://github.com/maticnetwork/contracts/blob/a4c26d59ca6e842af2b8d2265be1da15189e29a4/contracts/root/stateSyncer/StateSender.sol#L24) và chuyển sự kiện lên lớp [Bor](/docs/maintain/glossary.md#bor). Xem thêm [Kiến trúc Polygon](/docs/pos/polygon-architecture).

Hợp đồng **người nhận** thừa kế [IStateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol) và logic tùy biến thuộc hàm [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/05556cfd91a6879a8190a6828428f50e4912ee1a/contracts/IStateReceiver.sol#L5).

Phiên bản mới nhất, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), chứa một số cải tiến như :
1. Giới hạn kích thước dữ liệu giao dịch đồng bộ trạng thái về:
    * **30Kb** tương đương **byte**
    * **60Kb** tương đương **string**.
2. Tăng **thời gian trễ** giữa các sự kiện hợp đồng của những người xác thực khác nhau để đảm bảo rằng mempool không bị nhanh đầy trong trường hợp bộc phát sự kiện làm cản trở tiến độ của chuỗi.

Ví dụ sau đây mô tả cách giới hạn kích thước dữ liệu:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

## Yêu cầu đối với người dùng {#requirements-for-the-users}

Những thứ được yêu cầu từ dapps/người dùng để xử lý đồng bộ trạng thái là:

1. Gọi hàm [đồng bộ trạng thái](https://github.com/maticnetwork/contracts/blob/19163ddecf91db17333859ae72dd73c91bee6191/contracts/root/stateSyncer/StateSender.sol#L33).
2. Hàm `syncState` tạo ra một sự kiện gọi là `StateSynced(uint256 indexed id, address indexed contractAddress, bytes data);`
3. Tất cả người xác thực trên chuỗi Heimdall nhận sự kiện `StateSynced`. Bất kỳ người xác thực nào muốn nhận phí giao dịch đối với đồng bộ trạng thái phải gửi giao dịch cho Heimdall.
4. Sau khi giao dịch `state-sync` trên Heimdall có trong một khối, nó sẽ được thêm vào danh sách đồng bộ trạng thái chờ xử lý.
5. Sau mỗi sprint trên Bor, nút Bor sẽ đưa ra các sự kiện đồng bộ trạng thái chờ xử lý từ Heimdall qua lệnh gọi API.
6. Hợp đồng người nhận thừa kế giao diện `IStateReceiver` và logic giải mã tùy biến các byte dữ liệu và thực hiện bất kỳ hoạt động nào thuộc hàm [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol).
