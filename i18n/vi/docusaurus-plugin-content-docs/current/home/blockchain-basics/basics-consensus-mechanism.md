---
id: consensus-mechanism
title: Cơ chế Đồng thuận
description: "PoW, PoS, DPoS, PoSpace và PoET."
keywords:
  - docs
  - matic
  - polygon
  - consensus mechanisms
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Cơ chế Đồng thuận {#consensus-mechanism}

Cơ chế Đồng thuận là một cơ chế chịu lỗi được sử dụng trong các hệ thống máy tính và blockchain để đạt được thỏa thuận cần thiết về một giá trị dữ liệu đơn lẻ hoặc một trạng thái duy nhất của mạng giữa các quy trình phân tán hoặc hệ thống đa tác nhân, chẳng hạn như với tiền mã hóa.

## Các loại Cơ chế Đồng thuận {#types-of-consensus-mechanism}

### Bằng chứng của Công việc {#proof-of-work}
Bằng chứng công việc mô tả một hệ thống yêu cầu một lượng nỗ lực không đáng kể nhưng khả thi để ngăn chặn các cuộc tấn công dos (từ chối dịch vụ) và các cuộc tấn công độc hại khác. Nó đòi hỏi phải giải quyết một câu đố tính toán thử thách để tạo ra các khối mới trong Blockchain.

### Bằng chứng Cổ phần {#proof-of-stake}
Cơ chế chứng khoán đạt được sự đồng thuận bằng cách yêu cầu người dùng phải đóng cọc một số số phiếu của họ để có cơ hội được lựa chọn để xác thực số phiếu chuyển đổi và được thưởng để thực hiện. Ưu tiên cho các thợ đào đã mua nhiều cổ phần nhất trong hệ thống blockchain.

### Bằng chứng về Stake bị mất tích: {#delegated-proof-of-stake}
Hình thức đồng thuận này phản ánh việc bầu chọn các thành viên trong các cơ quan quản lý. Thay vì tự xác định tài sản của họ, các cổ đông có thể đại biểu hoạt động này cho các bên thứ ba, nhân chứng hoặc đại biểu, người sẽ tham gia vào quá trình đồng thuận. Nhân chứng, những người xác thực giao dịch, thường xuất hiện một đề nghị, yêu cầu bỏ phiếu và được bầu cử bởi các người theo dõi. Phần thưởng đã đạt được bởi những thực thể đó thường được chia sẻ với người tham gia mạng

### Bằng chứng về Space {#proof-of-space}
Cơ chế đồng thuận này là hữu ích trong các ứng dụng lưu trữ tệp tin như trong Storj.io, Filecoin, và Crust, nơi các nút chứng minh chúng có khả năng hợp pháp trong phần cứng của chúng. Tuy nhiên, thay vì sử dụng máy tính nặng như trong cơ chế PoW, nó sẽ giúp sử dụng công suất lưu trữ của mỗi nút. Đôi khi cơ chế này còn được gọi là PoStorage hoặc PoCapacity.

### Bằng chứng về Thời gian của Elapsed {#proof-of-elapsed-time}
Một giải pháp thay thế tốt hơn cho cơ chế PoW, tiêu tốn ít tài nguyên tính toán hơn. Mỗi nút tham gia cần chờ đợi một thời gian ngẫu nhiên và nút đầu tiên để thức dậy từ giấc ngủ sẽ có cơ hội tạo một khối mới, sau đó được tuyên truyền thông qua mạng lưới. Nó yêu cầu Môi trường Tử hình Trusted (TEE ) giống như Intel SGX, là một phần cô lập của bộ nhớ và chỉ có thể truy cập bằng cách sử dụng một bộ nhớ nhất định.

## **Tài nguyên**

- [Byzantine Fault Telerge](https://medium.com/loom-network/understanding-blockchain-fundamentals-part-1-byzantine-fault-tolerance-245f46fe8419)<br></br>
- [Kiểu Cơ chế Consensus](https://www.codementor.io/blog/consensus-algorithms-5lr8exfi0s#types-of-consensus-algorithms)<br></br>
- [Quan sát và Lịch sử phát triển Hệ thống Consensus](https://softwareengineeringdaily.com/2018/03/26/consensus-systems-with-ethan-buchman/)<br></br>
- [Công cụ Phân phát Thông tin Công cụ](https://medium.com/s/story/lets-take-a-crack-at-understanding-distributed-consensus-dad23d0dc95)<br></br>
- [Vấn đề về Generations Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault#Byzantine_Generals'_Problem)