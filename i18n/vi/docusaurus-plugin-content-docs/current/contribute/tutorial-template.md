---
id: tutorial-template
title: Mẫu Hướng dẫn Chung
sidebar_label: Tutorial template
description: Tuân thủ mẫu hướng dẫn khi viết hướng dẫn kỹ thuật.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - tutorial
  - contribute
  - template
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: tutorial-template
---

Mẫu này nên được sử dụng khi đóng góp một hướng dẫn cho Polygon Wiki. Bạn có thể chọn đóng góp một hướng dẫn về chủ đề tự chọn.

## Hướng dẫn chung {#general-guidelines}

* Phạm vi của hướng dẫn phải rõ ràng từ tiêu đề.
*
Hướng dẫn sẽ có thể mô tả chính xác các tính năng và chức năng của (các) sản phẩm hoặc (các) dịch vụ.
* Cố gắng giữ cho hướng dẫn được nhanh gọn, nhưng mở rộng các khái niệm chính phù hợp.
Cung cấp thông tin cơ bản và bối cảnh rộng hơn khi có thể.
* Đối với các bước cấu hình và thực hiện, hãy viết thật cụ thể.
*
Hãy nỗ lực thêm hình ảnh hỗ trợ, biểu tượng hoặc ảnh chụp màn hình
bổ sung cho nội dung đã viết.
  > Nhóm tài liệu cũng rất vui được làm việc với bạn trong việc tạo sơ đồ.
* Hãy luôn ghi nhớ đối tượng độc giả mà bạn đang viết cho.
Nếu tài liệu có độ khó nhất định thì nó nên được đề cập trong phần hướng dẫn.
  >
  > Nếu có các bước mà người dùng nên thực hiện trước khi xem qua hướng dẫn, vui lòng đề cập đến chúng.
* Đội ngũ tài liệu sẽ rất vui khi cùng làm việc để tạo ra một phần hướng dẫn.
* Hãy nhớ xem kỹ **[Hướng dẫn Phong cách](writing-style.md)**.

:::caution Cập nhật các hướng dẫn hiện tại


Nếu bạn nhận thấy rằng các hướng dẫn hiện tại về Polygon
Wiki không theo mẫu này, đó là do nhóm tài liệu quyết định triển khai một tiêu chuẩn, vì vậy quy trình hướng dẫn phải nhất quán cho toàn bộ các hướng dẫn. Nhóm vẫn đang làm việc để cập nhật các hướng dẫn này nhằm tương thích với mẫu này. Nếu quan tâm, bạn cũng có thể cập nhật một hướng dẫn hiện có để cơ cấu lại nó.

:::

## Các phần hướng dẫn {#tutorial-sections}

### Tổng quan {#overview}

Giải thích (các) sản phẩm hoặc (các) dịch vụ đang được thảo luận trong hướng dẫn. Cung cấp thông tin cơ bản cho mục đích của hướng dẫn và những gì mục tiêu của hướng dẫn cho đến hiện tại. Hướng dẫn phải luôn dựa trên việc sử dụng sản phẩm Polygon.

### Những gì bạn sẽ học {#what-you-ll-learn}

Tóm tắt những gì người dùng sẽ học trong suốt hướng dẫn.

:::note Ví dụ

Bạn sẽ khám phá cách sử dụng Truffle Suite để tạo dApps Polygon.

:::

#### Kết quả học tập {#learning-outcomes}


Nêu kết quả học tập.

:::note Ví dụ

1. Bạn sẽ tìm hiểu về Fauna.
2.
Bạn sẽ tìm hiểu cách sử dụng ReactJS cho giao diện người dùng của dApp của bạn.
3.
Bạn sẽ học cách bảo vệ dữ liệu dApp.

:::

Đề cập đến các điều kiện tiên quyết và những gì người dùng nên
làm quen với. Liên kết các tài liệu cần thiết cho các lĩnh vực mà người dùng nên hiểu biết.

:::note Ví dụ

Trước khi bắt đầu hướng dẫn này, bạn nên hiểu những điều cơ bản về phát triển dApp dựa trên EVM.
Xem "những tài liệu này" để biết thêm thông tin.

:::

### Bạn sẽ làm gì {#what-you-ll-do}

Nêu ra các bước trong hướng dẫn và các công cụ sẽ được sử dụng.

:::note Ví dụ

Bạn sẽ sử dụng Solidity để tạo hợp đồng thông minh trong môi trường ChainIDE.

1. Thiết lập ví
2. Viết hợp đồng thông minh ERC-721
3. Biên soạn Hợp đồng thông minh ERC-721
4.
Triển khai Hợp đồng thông minh ERC-721
5.
Tạo một tệp tin phẳng bằng cách sử dụng Flattener Library
6.
Xác minh hợp đồng thông minh
7. Đúc NFT (NFT Minting)

:::

### Tự thân bản hướng dẫn {#the-tutorial-itself}

Nhìn chung, hướng dẫn có thể được trình bày theo cách phân loại tốt nhất mà người viết thấy phù hợp; điều này sẽ được phản ánh trong mục [Những gì bạn sẽ chia](#what-youll-do) phần. Tuy nhiên, các phần hướng dẫn nên liên quan đến ba danh mục chính sau:

>
> Đảm bảo rằng bạn cân nhắc các từ khóa và lưu ý SEO khi chia phần.

#### Xây dựng ứng dụng của bạn {#build-your-application}

Nội dung hướng dẫn chính.
Điều này có thể bao gồm các phần như "thiết lập", "cấu hình", và "thực hiện" để đặt tên cho một vài phần.

#### Chạy hoặc Triển khai ứng dụng của bạn {#run-or-deploy-your-application}

Giải thích cách người dùng nên chạy hoặc triển khai ứng dụng của họ.

#### Thử nghiệm ứng dụng của bạn {#test-your-application}

Đây có thể là các bài kiểm tra viết cho một hợp đồng thông minh, xác minh
hợp đồng thông minh, v.v.

### Các bước tiếp theo {#next-steps}

Kết thúc phần hướng dẫn và phản ánh về kết quả học tập. Nêu ra các bước tiếp theo mà người dùng có thể thực hiện.

:::note Ví dụ

Chúc mừng bạn đã triển khai hợp đồng thông minh của mình.
Bây giờ bạn đã biết cách sử dụng ChainIDE để tạo và triển khai các hợp đồng thông minh. Hãy xem thử "hướng dẫn này".

:::
