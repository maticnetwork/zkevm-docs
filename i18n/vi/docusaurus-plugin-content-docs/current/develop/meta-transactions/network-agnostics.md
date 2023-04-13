---
id: network-agnostics
title: Giao dịch Bất khả tri Mạng lưới
sidebar_label: Network Agnostic Transactions
description: "Tích hợp Giao dịch Bất khả tri Mạng lưới trong dApp của bạn."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

## Mục tiêu {#goal}

Thực thi các giao dịch trên chuỗi Polygon, mà không cần thay đổi nhà cung cấp trên Metamask (hướng dẫn này phục vụ cho nhà cung cấp trong trang của metamask, có thể được sửa đổi để thực thi các giao dịch từ bất kỳ nhà cung cấp nào khác)

Về căn bản, người dùng ký vào một ý định thực thi giao dịch, được chuyển tiếp bởi một trình chuyển tiếp đơn giản để thực thi nó trên một hợp đồng được triển khai trên chuỗi Polygon.


## Cho phép thực thi giao dịch là gì? {#what-is-enabling-transaction-execution}

Máy khách mà người dùng tương tác (trình duyệt web, ứng dụng di động, v.v.) không bao giờ tương tác với blockchain, thay vào đó nó tương tác với một máy chủ chứa trình chuyển tiếp đơn giản (hoặc mạng lưới trình chuyển tiếp), tương tự như cách GSN hoặc bất kỳ giải pháp siêu giao dịch nào hoạt động (xem: [Giao dịch Meta: Giới thiệu](https://www.notion.so/Meta-Transactions-An-Introduction-8f54cf75321e4ec3b6d755e18e406590)).

Đối với bất kỳ thao tác nào yêu cầu tương tác blockchain,

- Máy khách yêu cầu chữ ký có định dạng EIP712 từ người dùng
- Chữ ký được gửi đến một máy chủ chứa trình chuyển tiếp đơn giản (phải có bảo vệ xác thực/bảo vệ chống thư rác đơn giản nếu được sử dụng cho sản xuất, hoặc có thể sử dụng sdk mexa của biconomy: [https://github.com/bcnmy/mexa-sdk](https://github.com/bcnmy/mexa-sdk))
- Trình chuyển tiếp tương tác với blockchain để nộp chữ ký của người dùng cho hợp đồng. Một chức năng trên hợp đồng gọi là `executeMetaTransaction` xử lý chữ ký và thực thi giao dịch được yêu cầu (qua một lệnh gọi nội bộ).
- Trình chuyển tiếp thanh toán gas, giúp cho giao dịch miễn phí một cách hiệu quả 🤑

## Tích hợp Giao dịch Bất khả tri Mạng lưới trong dApp của bạn {#integrate-network-agnostic-transactions-in-your-dapp}

- Chọn giữa nút trình chuyển tiếp đơn giản tùy chỉnh/biconomy.

  - Đối với biconomy, hãy thiết lập dapp từ bảng điều khiển và lưu api-id và api-key, hãy xem: [Hướng dẫn: Biconomy](https://www.notion.so/Tutorial-Biconomy-7f578bfb4e7d4904b8c79522085ba568) hoặc [https://docs.biconomy.io/](https://docs.biconomy.io/)

  **Các bước:**

    1. Hãy cùng Đăng ký hợp đồng của chúng ta với bảng điều khiển biconomy
       1. Truy cập [các tài liệu chính thức của biconomy](https://docs.biconomy.io/biconomy-dashboard).
       2. Trong khi đăng ký dapp, hãy chọn `Polygon Mumbai`
    2. Sao chép `API key` để sử dụng trong giao diện người dùng
    3. Và Thêm chức năng `executeMetaTransaction` trong Manage-Api và đảm bảo kích hoạt meta-tx. (Kiểm tra tùy chọn "native-metatx")

  - Nếu bạn muốn sử dụng API tự chọn của mình đã gửi giao dịch vào blockchain, bạn có thể tham khảo mã máy chủ ở đây: [https://github.com/angelagihotra/ETHOnline-shop/thist-workhop/thister/cauth-internet/cauthnostic-translate](https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer)

- Đảm bảo rằng hợp đồng mà bạn muốn tương tác cùng kế thừa từ `NativeMetaTransactions` – 👀 nhìn vào chức năng `executeMetaTransaction` trong hợp đồng.
- Liên kết: [https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338](https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338)



```jsx

let data = await web3.eth.abi.encodeFunctionCall({
    name: 'getNonce',
    type: 'function',
    inputs: [{
        name: "user",
        type: "address"
      }]
  }, [accounts[0]]);

  let _nonce = await web3.eth.call ({
    to: token["80001"],
    data
  });

  const dataToSign = getTypedData({
    name: token["name"],
    version: '1',
    salt: '0x0000000000000000000000000000000000000000000000000000000000013881',
    verifyingContract: token["80001"],
    nonce: parseInt(_nonce),
    from: accounts[0],
    functionSignature: functionSig
  });

  const msgParams = [accounts[0], JSON.stringify(dataToSign)];

  let sig = await eth.request ({
    method: 'eth_signTypedData_v3',
    params: msgParams
  });

  ```


- Khi bạn đã có thiết lập hợp đồng và trình chuyển tiếp, điều bắt buộc là máy khách có thể tìm nạp chữ ký có định dạng EIP712 và chỉ cần gọi API bằng các tham số bắt buộc

ref: [https://github.com/angelagihotra/ETHOnline-Workshop/blob/6b615b8a4e00553c17729c7215729303c8e1b/mạng - nosign.jS#47](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L47)

    ```jsx

    let data = await web3.eth.abi.encodeFunctionCall({
        name: 'getNonce',
        type: 'function',
        inputs: [{
            name: "user",
            type: "address"
          }]
      }, [accounts[0]]);

      let _nonce = await web3.eth.call ({
        to: token["80001"],
        data
      });

      const dataToSign = getTypedData({
        name: token["name"],
        version: '1',
        salt: '0x0000000000000000000000000000000000000000000000000000000000013881',
        verifyingContract: token["80001"],
        nonce: parseInt(_nonce),
        from: accounts[0],
        functionSignature: functionSig
      });
      const msgParams = [accounts[0], JSON.stringify(dataToSign)];

      let sig = await eth.request ({
        method: 'eth_signTypedData_v3',
        params: msgParams
      });
    ```

Gọi API, ref: [https://github.com/angelagihotra/ETHOnline-Workshop/bsop/6b615b8a4e00553c1729c7215729303c8e1b/mạng - jsign.00010001000/](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110)

    ```jsx
    const response = await request.post(
        'http://localhost:3000/exec', {
          json: txObj,
        },
        (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          document.getElementById(el).innerHTML =
          `response:`+ JSON.stringify(body)
        }
      )
    ```

    Nếu sử dụng Biconomy, nên gọi:

    ```jsx
    const response = await request.post(
        'https://api.biconomy.io/api/v2/meta-tx/native', {
          json: txObj,
        },
        (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          document.getElementById(el).innerHTML =
          `response:`+ JSON.stringify(body)
        }
      )
    ```

    trong đó `txObj` sẽ trông như thế này:

    ```json
    {
        "to": "0x2395d740789d8C27C139C62d1aF786c77c9a1Ef1",
        "apiId": <API ID COPIED FROM THE API PAGE>,
        "params": [
            "0x2173fdd5427c99357ba0dd5e34c964b08079a695",
            "0x2e1a7d4d000000000000000000000000000000000000000000000000000000000000000a",
            "0x42da8b5ac3f1c5c35c3eb38d639a780ec973744f11ff75b81bbf916300411602",
            "0x32bf1451a3e999b57822bc1a9b8bfdfeb0da59aa330c247e4befafa997a11de9",
            "27"
        ],
        "from": "0x2173fdd5427c99357ba0dd5e34c964b08079a695"
    }
    ```

- Nếu bạn sử dụng API tùy chỉnh, nó sẽ thực thi chức năng `executeMetaTransaction` trên hợp đồng:

(ref: [https://github.com/angelagihotra/ETHOnline-Workshop/blob615b8a4e00553c17729c7215729303c8e1b/2-nostagho-index/index.js#000553291729303)](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40)

    ```jsx
    try {
        let tx = await contract.methods.executeMetaTransaction(
          txDetails.from, txDetails.fnSig, r, s, v
        ).send ({
          from: user,
          gas: 800000
        })
        req.txHash = tx.transactionHash
      } catch (err) {
        console.log (err)
        next(err)
      }
    ```

    Nếu sử dụng biconomy, lệnh gọi bên máy khách trông như thế này:

    ```jsx
    // client/src/App.js
    import React from "react";
    import Biconomy from "@biconomy/mexa";

    const getWeb3 = new Web3(biconomy);
    biconomy
        .onEvent(biconomy.READY, () => {
          // Initialize your dapp here like getting user accounts etc
          console.log("Mexa is Ready");
        })
        .onEvent(biconomy.ERROR, (error, message) => {
          // Handle error while initializing mexa
    			console.error(error);
        });

    /**
    * use the getWeb3 object to define a contract and calling the function directly
    */

    ```
