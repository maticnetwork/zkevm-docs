---
id: quicknode
title: Triển khai Công ty Thông minh sử dụng QuickNode
sidebar_label: Using QuickNode
description:  Triển khai Công cụ Smart Contracts trên Polygon bằng Brownie và Quicgettel.
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - smart contract
  - brownie
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Tổng quan {#overview}

Python là một trong những ngôn ngữ lập trình đa dạng nhất; từ các nhà nghiên cứu chạy mô hình thử nghiệm của họ cho nhà phát triển sử dụng nó trong môi trường sản xuất nặng, nó có thể sử dụng các trường hợp trong mọi lĩnh vực kỹ thuật có thể.

Trong bài hướng dẫn này, bạn sẽ học cách sử dụng khung [Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) để viết và triển khai một hợp đồng thông minh bằng cách sử dụng các nút testnet [Quicknode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) cho Polygon.

:::tip

Để liên hệ với đội ngũ Quicknode, hãy gửi cho họ một tin nhắn hoặc gắn thẻ họ trên Twitter [@QuickNode](https://twitter.com/QuickNode).

:::

## Điều kiện tiên quyết {#prerequisites}

- Python 3đã cài đặt
- Một nút Polygon
- Biên soạn mã
- Giao diện đường dây chỉ huy.

## Những điều bạn sẽ làm {#what-you-will-do}

1. Thiết lập Brownie
2. Truy cập vào các nút thử nghiệm Quicknode
3. Biên soạn và Triển khai hợp đồng thông minh
4. Kiểm tra dữ liệu hợp đồng triển khai

## Brownie là gì? {#what-is-brownie}

Việc phát triển hợp đồng thông minh chủ yếu bị chi phối bởi các thư viện trên nền JavaScript như [web3.js](https://web3js.readthedocs.io/), [ethers.js](https://docs.ethers.io/), [Truffle](https://www.trufflesuite.com/docs/truffle/), và [Hardhat](https://hardhat.org/). Python là một ngôn ngữ đảo ngược, được sử dụng rất cao và cũng có thể được sử dụng cho sự phát triển hợp đồng thông minh / [Web3](https://web3py.readthedocs.io/en/stable/). py là một thư viện Python thuyết phục mà đã thực hiện nhu cầu. Khung Brownie được xây dựng trên `web3.py`đầu.

[Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) là một khung dựa trên Python để phát triển và thử nghiệm các hợp đồng thông minh. Brownie có hỗ trợ cho cả hợp đồng Solidity và Vyper, và thậm chí còn cung cấp việc thử nghiệm hợp đồng qua [pytest](https://github.com/pytest-dev/pytest).

Để minh họa quy trình viết và triển khai hợp đồng thông minh với Brownie, chúng ta sẽ sử dụng [tổ hợp Brownie](https://github.com/brownie-mix), đây là các dự án mẫu. Cụ thể, chúng ta sẽ sử dụng [tổ hợp token](https://github.com/brownie-mix/token-mix), là một mẫu của việc thực hiện ERC-20.

## Cài đặt các quan hệ phụ thuộc {#install-dependencies}

Brownie được xây dựng trên python3, vì vậy chúng ta cần nó được cài đặt để làm việc với Brownie. Hãy để chúng tôi kiểm tra xem chúng tôi có cài đặt python3 trên hệ thống của chúng tôi. Để thực hiện, hãy gõ sau trong công cụ dòng lệnh của bạn:

```bash
python3 -V
```

Thao tác này sẽ trả về phiên bản python3 đã được cài đặt. Nếu chưa được cài đặt, hãy tải về và cài đặt từ [trang web python](https://www.python.org/downloads/) chính thức.

Hãy cùng tạo một thư mục dự án trước khi cài đặt Brownie, và biến thư mục dự án đó thành thư mục làm việc hiện tại của chúng ta:

```bash
mkdir brownieDemo
cd brownieDemo
```

Giờ thì bạn đã cài đặt python3 trên hệ thống của mình, hãy cùng cài đặt brownie bằng cách sử dụng pip, trình quản lý gói của Python. Pip tương tự như npm cho JavaScript. Hãy gõ số lượng sau trong dòng lệnh:

```bash
pip3 install eth-brownie
```

:::tip

Nếu cài đặt bị lỗi, bạn có thể sử dụng lệnh sau:`sudo pip3 install eth-brownie`

:::

Để kiểm tra xem Brownie đã được cài đặt đúng đắn, hãy gõ `brownie`trong dòng lệnh của bạn, và nó sẽ cho xuất bản sau:

![img](/img/quicknode/brownie-commands.png)

Để lấy sự trộn của dấu hiệu, đơn giản hãy gõ theo dòng lệnh của bạn:

```
brownie bake token
```

Điều này sẽ tạo một thư mục mới `token/`trong thư mục của chúng ta`brownieDemo`.

### Cấu trúc tệp tin {#file-structure}

Trước hết, điều hướng vào thư `token`mục:

```bash
cd token
```

Bây giờ, hãy mở `token`thư mục trong bộ biên tập văn bản của bạn. Dưới thư `contracts/`mục bạn sẽ tìm thấy, `Token.sol`đây là hợp đồng chính của chúng tôi. Bạn có thể viết hợp đồng của mình hoặc sửa đổi tệp `Token.sol`tin.

Dưới thư `scripts/`mục, bạn sẽ tìm thấy văn lệnh `token.py`Python Kịch bản này sẽ được sử dụng để triển khai hợp đồng, và các sửa đổi cần thiết dựa trên các hợp đồng.

![img](/img/quicknode/token-sol.png)

Hợp đồng là một hợp đồng ERC-20. Bạn có thể tìm hiểu thêm về tiêu chuẩn ERC-20 và hợp đồng trong [hướng dẫn](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token) này trên ERC-20

## Khởi động nút Polygon của bạn {#booting-your-polygon-node}

QuickNode có mạng lưới lưới điện thoại trên toàn cầu Polygon Mainnet và nút kiểm tra Mumbai. Họ cũng chạy [Polygon RPC miễn phí](https://docs.polygon.technology/docs/operate/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro) nhưng nếu bạn bị hạn chế tỷ lệ, bạn có thể đăng ký một [nút thử nghiệm miễn phí từ QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide).

![img](/img/quicknode/http_URL.png)

Sao chép **URL HTTP**, sẽ hữu ích sau đây trong hướng dẫn.

## Thiết lập Mạng và Tài khoản {#network-and-account-setup}

Chúng ta cần thiết lập điểm cuối QuickNode của mình với Brownie. Để làm như vậy, hãy gõ sau trong dòng lệnh của bạn:

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

Thay thế `YOUR_QUICKNODE_URL`bằng **URL Testnet HTTP Mumbai**, mà chúng ta vừa nhận được trong khi khởi động nút Polygon của mình.

Trong lệnh trên, `Ethereum` là tên của môi trường, và `matic_mumbai` là tên tùy chỉnh của mạng lưới; bạn có thể đặt bất kỳ tên nào cho mạng lưới tùy chỉnh của mình.

Điều tiếp theo chúng ta cần làm ở đây là tạo một ví mới bằng Brownie, để thực hiện như vậy hãy gõ theo dòng lệnh của bạn:

```
brownie accounts generate testac
```

Bạn sẽ được yêu cầu thiết lập mật khẩu cho tài khoản của bạn! Sau khi hoàn thành các bước, điều này sẽ tạo một tài khoản cùng với một cụm từ memonic, hãy lưu nó không dây. Tên `testac`là tên của tài khoản chúng ta (Bạn có thể chọn bất kỳ tên nào bạn thích).

![img](/img/quicknode/new-account.png)

:::note

cụm từ Mnemonic có thể được sử dụng để khôi phục tài khoản hoặc nhập tài khoản cho [<ins>ví không phải bảo quản</ins>](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode) khác. Tài khoản bạn thấy trong hình ảnh trên chỉ vừa được tạo cho hướng dẫn này.

:::

Sao chép địa chỉ tài khoản để chúng ta có thể lấy được một số thông tin thử nghiệm, sẽ được yêu cầu triển khai hợp đồng của chúng ta.

## Nhận MATIC Testnet {#getting-testnet-matic}

Chúng ta sẽ cần một số dấu hiệu thử nghiệm MATIC để trả phí xăng để triển khai hợp đồng thông minh.

Sao chép địa chỉ tài khoản của bạn mà chúng tôi đã tạo ra trong hướng dẫn này, dán nó vào địa chỉ của [Polygon faucet](https://faucet.polygon.technology/), và nhấn vào **Submit**. Vòi sẽ gửi cho bạn 0,2 MATIC thử nghiệm.

![img](/img/quicknode/faucet.png)

## Triển khai Hợp đồng Thông minh của bạn {#deploying-your-smart-contract}

Trước khi triển khai hợp đồng, bạn cần phải tuân thủ nó bằng cách sử dụng:

```
brownie compile
```

![img](/img/quicknode/brownie-compile.png)

Bây giờ hãy mở tài liệu `scripts/token.py`trong biên tập văn bản của bạn, và thực hiện những thay đổi sau:

```python
#!/usr/bin/python3
from brownie import Token, accounts

def main():
    acct = accounts.load('testac')
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

:::info Giải pháp

Sử dụng mã trên , chúng ta có `testac`tài khoản nhập khẩu mà chúng ta tạo ra trước đó, và lưu trữ nó theo sự biến dạng`acct`. Ngoài ra, trong dòng tiếp theo, chúng ta đã biên tập một `'from':`phần để nhận dữ liệu từ sự `acct`biến

:::

Cuối cùng, chúng ta sẽ triển khai hợp đồng thông minh của mình:

```
brownie run token.py --network matic_mumbai
```

`matic_mumbai`là tên của mạng tự chọn mà chúng ta tạo ra trước đó. prompt sẽ yêu cầu bạn về **mật khẩu** mà chúng ta đã thiết lập sớm hơn trong khi tạo tài khoản.

Sau khi chạy lệnh trên, bạn phải nhận được hàm băm giao dịch, và Brownie sẽ chờ giao dịch được xác nhận. Khi giao dịch đã được xác nhận, nó sẽ trả về địa chỉ triển khai hợp đồng của chúng ta trên mạng thử nghiệm Polygon Mumbai.

![img](/img/quicknode/brownie-run.png)

Bạn có thể xem hợp đồng đã triển khai bằng cách sao chép/dán địa chỉ hợp đồng tại [Polygonscan Mumbai](https://mumbai.polygonscan.com/).

![img](/img/quicknode/polygonscan.png)

## Thử nghiệm Hợp đồng {#testing-the-contract}

Brownie cũng cung cấp tùy chọn thử nghiệm các chức năng của hợp đồng thông minh. Nó sử dụng khung `pytest` để dễ dàng tạo các thử nghiệm đơn vị. Bạn có thể tìm thấy thông tin chi tiết về việc viết thử nghiệm trên Brownie [trên tài liệu của họ](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#).

**Đây là cách các hợp đồng được triển khai trên Polygon bằng Brownie và QuickNode.**

QuickNode, giống như Polygon, luôn có phương pháp tiếp cận đầu tiên để cung cấp [các](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) hướng dẫn phát triển, [các tiến sĩ](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [video hướng dẫn](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos) và [cộng đồng của các nhà phát triển Web3](https://discord.gg/DkdgEqE) đang háo hức giúp đỡ nhau.
