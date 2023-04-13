---
id: did-implementation
title: Triển khai DID Polygon
sidebar_label: Identity
description: Tìm hiểu về triển khai DID trên Polygon
keywords:
  - docs
  - polygon
  - matic
  - DID
  - identity
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: did-implementation/getting-started
---

Đây là hướng dẫn khởi đầu dành cho người dùng muốn sử dụng các gói triển khai do đội ngũ Polygon đăng tải, để tạo và đăng tải DID Polygon trên sổ cái Polygon.

Phương pháp DID Polygon triển khai gồm 3 gói, đó là polygon-did-registrar, polygon-did-resolver và polygon-did-registry-contract. Người dùng muốn kết hợp chức năng để đăng ký hoặc đọc DID trên hoặc từ mạng lưới Polygon có thể sử dụng hướng dẫn sau.

DID về cơ bản là một mã định danh duy nhất, đã được tạo mà không có sự hiện diện của cơ quan trung ương. DID, trong ngữ cảnh Thông tin đăng nhập có thể xác minh, được sử dụng để ký tài liệu, do đó tạo điều kiện cho người dùng chứng minh quyền sở hữu tài liệu khi được yêu cầu.

## Phương pháp DID Polygon {#polygon-did-method}

Định nghĩa phương pháp DID Polygon tuân theo các tiêu chuẩn và thông số kỹ thuật của DID-Core. Một URI DID bao gồm ba thành phần được phân tách bằng dấu hai chấm, lược đồ, tiếp theo là tên phương pháp và cuối cùng là một định danh cụ thể của phương pháp. Đối với Polygon URI trông như:

```
did:polygon:<Ethereum address>
```

Đây là kế hoạch `did`, tên phương pháp là `polygon`và trình xác định phương pháp là một địa chỉ ethereum.

## Triển khai DID Polygon {#polygon-did-implementation}

Có thể triển khai DID Polygon với sự trợ giúp của hai gói, người dùng có thể nhập các thư viện npm tương ứng và sử dụng chúng để kết hợp các phương pháp DID Polygon trong các ứng dụng tương ứng của họ. Thông tin triển khai chi tiết được cung cấp trong phần tiếp theo.

Để bắt đầu, trước tiên người ta cần tạo một DID. Quá trình tạo, trong trường hợp của did Polygon, là một gói gồm hai bước, đầu tiên người dùng cần tạo một uri DID cho chính họ và tiếp theo đăng ký nó trên sổ cái Polygon.

### Tạo DID {#create-did}

Trong dự án của bạn để tạo một polygon DID URI đầu tiên cần cài đặt:

```
npm i @ayanworks/polygon-did-registrar --save
```

Khi cài đặt hoàn thành, người dùng có thể sử dụng nó như sau:

```
import { createDID } from "polygon-did-registrar";
```

`createdDID`Chức năng giúp người dùng tạo ra URI. Trong khi tạo DID, có thể có hai tình huống.

  1. Người dùng đã sở hữu một ví và muốn tạo một DID tương ứng với cùng một ví.

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network, privateKey);
    ```

  2. Nếu người dùng không có ví đã có và muốn tạo một ví khác, người dùng có thể sử dụng:

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network);
    ```

Tham số mạng trong cả hai trường hợp đề cập đến việc người dùng có muốn tạo sự thực trên Testnet Polygon Mumbai hoặc Polygon Mainnet.

Nhập mẫu:

```
network :"testnet | mainnet"
privateKey? : "0x....."
```

Sau khi tạo DID, bạn sẽ có một URI phát triển.

```
DID mainnet: did:polygon:0x...
DID testnet: did:polygon:testnet:0x...
```

### Đăng ký đã thực hiện {#register-did}

Để đăng ký USDURI và tài liệu tương ứng trên sổ cái, người dùng đầu tiên cần sử dụng `polygon-did-registrar`như sau:

```js
import { registerDID } from "polygon-did-registrar";
```

Như một điều kiện để đăng ký DID, người dùng cần đảm bảo rằng ví có thể có những dấu hiệu cần thiết có sẵn. Khi người dùng có sự cân bằng dấu hiệu trong ví, một cuộc gọi có thể được thực hiện cho chức năng của máy ghi âm, như dưới đây:

```js
const txHash = await registerDID(did, privateKey, url?, contractAddress?);
```

Tham số `did`và `privateKey`là bắt buộc, trong khi tùy chọn nhập `url`và nó.`contractAddress` Nếu người dùng không đưa ra hai tham số cuối cùng, thư viện sẽ chọn các cấu hình mặc định của mạng lưới từ URI DID.

Nếu tất cả các tham số khớp với các đặc điểm và mọi thứ được đưa ra theo thứ tự đúng, `registerDID`chức năng sẽ trở lại một sự chuyển đổi, một lỗi tương ứng sẽ được trả lại.

Và với điều này, bạn đã hoàn thành công việc đăng ký một thực hiện trên Mạng Polygon.

## Xử lý DID {#resolve-did}

Để khởi động, hãy cài đặt các thư viện sau:

```bash
npm i @ayanworks/polygon-did-resolver --save
npm i did-resolver --save
```

Để đọc tài liệu DID được đăng ký trên sổ cái, trước tiên bất kỳ người dùng nào có URI DID Polygon đều có thể nhập dự án của họ,

```js
import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
```

Sau khi nhập các gói, tài liệu đã có thể được lấy lại bằng cách sử dụng:

```js
const myResolver = didPolygon.getResolver()
const resolver = new DIDResolver(myResolver)

const didResolutionResult = this.resolver.resolve(did)
```

nơi `didResolutionResult`đối tượng như sau:

```js
didResolutionResult:
{
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata
}
```

Cần lưu ý rằng, người dùng sẽ không phải trả phí gas khi cố gắng xử lý một DID.

## Cập nhật Tài liệu DID {#update-did-document}

Để thực hiện dự án với khả năng cập nhật tài liệu DI, người dùng đầu tiên cần sử dụng `polygon-did-registrar`như sau:

```js
import { updateDidDoc } from "polygon-did-registrar";
```

Tiếp theo, hãy gọi chức năng:

```js
const txHash = await updateDidDoc(did, didDoc, privateKey, url?, contractAddress?);
```

Cần lưu ý rằng để cập nhật tài liệu DID, chỉ có người sở hữu của DID mới có thể gửi yêu cầu. Khóa riêng tư ở đây cũng nên giữ một số token Matic tương ứng.

Nếu người dùng không cung cấp cấu hình với `url` và `contractAddress`, thư viện sẽ chọn cấu hình mặc định của mạng lưới từ URI DID.

## Xóa Tài liệu DID {#delete-did-document}

Với Polygon DID thực hiện việc thực hiện một người dùng cũng có thể thu hồi Tài liệu DID của mình từ cuốn dập. Người dùng đầu tiên cần sử dụng `polygon-did-registrar`như sau:

```js
import { deleteDidDoc } from "polygon-did-registrar";
```

Sau đó sử dụng,

```js
const txHash = await deleteDidDoc(did, privateKey, url?, contractAddress?);
```

Trong số các tham số, đáng chú ý là `url` và `contractAddress` là các tham số tùy chọn, nếu người dùng không cung cấp, cấu hình mặc định sẽ được chức năng cơ bản dựa trên URI DID lựa chọn.

Điều quan trọng là khóa riêng tư phải giữ các token Matic cần thiết, theo cấu hình mạng lưới của DID, nếu không giao dịch sẽ không thành công.

## Đóng góp vào Kho lưu trữ {#contributing-to-the-repository}

Sử dụng luồng công việc yêu cầu fork, branch và pull tiêu chuẩn để đề xuất các thay đổi đối với kho lưu trữ. Vui lòng tạo tên chi nhánh bằng cách tính toán bằng cách tính toán số lượng hoặc số lỗi cho ví dụ.

```
https://github.com/ayanworks/polygon-did-registrar
https://github.com/ayanworks/polygon-did-resolver
```
