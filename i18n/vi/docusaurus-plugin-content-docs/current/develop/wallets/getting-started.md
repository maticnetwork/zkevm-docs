---
id: getting-started
title: Ví
sidebar_label: Getting Started
description: Lấy danh sách ví được hỗ trợ và quản lý chiến lược khóa.
keywords:
  - wiki
  - polygon
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Luôn nắm bắt những điều mới mẻ

Tiếp tục cập nhật Ví dụ mới nhất từ đội Polygon và cộng đồng bằng cách đăng ký vào [<ins>Thông báo</ins>](https://polygon.technology/notifications/) của chúng ta.

:::

Những ví hỗ trợ Polygon cho phép quản lý khóa, truy cập vào những tài khoản chịu sự kiểm soát của khóa riêng tư, và những giao diện cho phép người dùng thực hiện các thao tác chuỗi và ký giao dịch. Trang sau đóng vai trò là chỉ mục ví cho những ví tương thích với Polygon. Xin lưu ý rằng đây không phải là chỉ mục đầy đủ.

:::caution Ví bên thứ ba

Các ví bên thứ ba này đã tích hợp Polygon và hỗ trợ nhiều tính năng. **Bạn nên làm việc riêng cho mình trước khi sử dụng chúng**. Đội ngũ Hỗ trợ Polygon chính thức Hỗ trợ không thể cung cấp sự hỗ trợ cho các vấn đề với những ví dụ này hoặc những ví dụ không bản địa khác.

:::

:::info Sở giao dịch Tập trung (CEX)

Để biết danh sách những CEX hỗ trợ Polygon, hãy truy cập một trang web theo dõi bên thứ ba như [<ins>**CoinMarkep**</ins>](https://coinmarketcap.com/currencies/polygon/markets).

:::

## Ví Gốc {#native-wallets}

[Hỗ trợ Polygon](https://support.polygon.technology/support/home) có thể cung cấp sự hỗ trợ cho người dùng và các vấn đề địa chỉ liên quan đến ví dụ sau:

| Ví | Lưu ký | Loại tài khoản | Đa chữ ký | Trình duyệt dApp | Nền tảng |
|----------------------------------------------------------------------|---------------|--------------|-----------|--------------|----------|
| [Ví PoS](https://wallet.polygon.technology/login/) | không lưu ký | EOA | không | không | trình duyệt |
| [Ví Hermez](https://wallet.hermez.io/login) | không lưu ký | EOA | không | không | trình duyệt |

## Ví đối tác {#partner-wallets}

Các ví sau là giải pháp mà Polygon Technology đã hợp tác cùng:

| Ví | Lưu ký | Loại tài khoản | Đa chữ ký | NFT | Trình duyệt dApp | Hỗ trợ Cầu nối | Chuyển tiền pháp định thành tiền mã hóa | Nền tảng |
|---	|---	|---	|---	|---	|---	|---	|---	|---	|
| [1inch](https://1inch.io/wallet/) | không lưu ký | EOA | không | giao diện | có | có | có | di động |
| [Ví Alpha](https://alphawallet.com/) | không lưu ký | EOA | không | giao diện | có | có | có | di động, api/sdk |
| [Ví Atomic](https://atomicwallet.io/)* | không lưu ký | EOA | không | không | không | không | có | di động, để bàn, api/sdk |
| [Ambire](https://www.ambire.com/) | không lưu ký | hợp đồng thông minh | không | giao diện | không | có | có | trình duyệt |
| [BitKeep](https://bitkeep.com/) | không lưu ký | EOA | không | giao diện | có | có | Đúng | mobile, phần mở rộng trình duyệt |
| [Bitski](https://www.bitski.com/) | lưu ký | EOA | không | giao diện | không | có | không | trình duyệt, api/sdk |
| [Coin98](https://coin98.com/wallet) | không lưu ký | EOA | không | giao diện | có | có | có | di động, trình duyệt, api/sdk |
| [Coinbase](https://www.coinbase.com/wallet) | kết hợp | EOA | không | giao diện | có | có | có | di động, trình duyệt, api/sdk |
| [CypherD](https://cypherd.io/) | không lưu ký | EOA | không | có | có | có | có | di động |
| [D'Cent](https://dcentwallet.com/) | Kết hợp | EOA | không | giao diện | có | có | không | di động |
| [Exodus](https://www.exodus.com/) | không lưu ký | EOA | không | có | không | không | có | di động, để bàn |
| [An toàn Gnlosis](https://gnosis-safe.io/) | không lưu ký | hợp đồng thông minh | có | giao diện | không | không | không | mobile, trình duyệt , desktop, api/sdk |
| [Guarda](https://guarda.com/) | không lưu ký | EOA | không | không | không | có | có | di động, trình duyệt, để bàn |
| [Huobi](https://www.itoken.com/en) | không lưu ký | EOA | không | có | có | có | không | di động |
| [Thư mụcName](https://www.ledger.com/) | không lưu ký | EOA | không | giao diện | không | không | Đúng | phần cứng, di động, để bàn |
| [Loopring](https://loopring.io/#/) | không lưu ký | hợp đồng thông minh | không | không | không | không | không | di động, api/sdk |
| [Magic](https://fortmatic.com/)* | lưu ký | EOA | không | không | không |   |   | di động, trình duyệt, api/sdk |
| [MathWallet](https://mathwallet.org/en-us/) | lưu ký | EOA | không | không | không | có | có | di động, trình duyệt, api/sdk |
| [MetaMask](https://metamask.io/)* | không lưu ký | EOA | không | giao diện | có | không | không | di động, trình duyệt, api/sdk |
| [Multis](https://multis.co/)* | không lưu ký | EOA | không | không | không |   | có | di động, để bàn |
| [MyEtherWallet](https://www.myetherwallet.com/)* | không lưu ký | EOA | không | giao diện | không |   | có | di động |
| [Omni](https://omni.app/) | không lưu ký | EOA | không | giao diện | không | có |   | di động, api/sdk |
| [Trình duyệt Mã hóa Opera](https://www.opera.com/crypto/next)* | không lưu ký | EOA | không | hỗ trợ | có |   |   | di động, trình duyệt |
| [Pillar](https://www.pillar.fi/) | không lưu ký | EOA | không | giao diện | không |   | có | di động |
| [Rainbow](https://rainbow.me/) | không lưu ký | EOA | không | giao diện | có |   | không | di động, api/sdk |
| [An toàn](https://safepal.io/) | không lưu ký | EOA | không | không | có | Đúng |   | phần cứng, di động, api/sdk |
| [Sequence](https://sequence.app/auth) | không lưu ký | hợp đồng thông minh | không | giao diện | không |   |   | trình duyệt, api/sdk |
| [SimpleHold](https://simplehold.io/) | không lưu ký | EOA | có | không | không |   | có | di động, api/sdk |
| [TokenPocket](https://www.tokenpocket.pro/en) | không lưu ký | EOA | không | hỗ trợ | có | có | có | di động, trình duyệt, api/sdk |
| [Torus](https://toruswallet.io/) | không lưu ký | EOA | Đúng | hỗ trợ | không | không | không | trình duyệt, api/sdk |
| Trzor | không lưu ký | EOA | không | hỗ trợ | không |   |   | phần cứng, di động |
| [Ví Tin cậy](https://trustwallet.com/) | không lưu ký | EOA | không | hỗ trợ | có |   | có | di động |
| [Không thể chặn lại](https://unstoppable.money/) | không lưu ký | EOA | không | có | có |   | không | di động, api/sdk |
| [Venly](https://www.venly.io/) | kết hợp | hợp đồng thông minh | không | giao diện | không |   |   | trình duyệt, api/sdk |
| [Wirex](https://wirexapp.com/en/wirex-wallet)* | không lưu ký | EOA | có | không | không |   |   | di động |
| [XDeFi](https://www.xdefi.io/) | không lưu ký | EOA | không | giao diện | không | không | không | trình duyệt |
| [Zerion](https://zerion.io/) | không lưu ký | EOA | không | có | có | Đúng |   | di động, trình duyệt |

:::caution Hỗ trợ ví không bản địa

Những ví được ký hiệu bằng * trong bảng trên vốn không được phần mềm ví hỗ trợ và yêu cầu các bước thủ công để thêm mạng lưới Polygon.

:::

## Chiến lược Quản lý Khóa {#key-management-strategy}

Các bước cơ bản sau đây cho phép sự tích hợp của một ứng dụng trực tiếp với Polygon:

1. **Thiết lập Web3**: [web3.js](https://web3js.readthedocs.io/) là thư viện javascript cho phép ứng dụng bên máy khách trò chuyện với blockchain. Chúng ta cấu hình web3.js để giao tiếp qua ví dựa trên nền nhà phát triển như MetaMask. Hãy sử dụng [tài liệu web3.js](https://web3js.readthedocs.io/en/v1.2.2/getting-started.html#adding-web3-js) để tìm hiểu về việc thêm `web3.js` vào dự án của bạn.
2. **Thiết lập Tài khoản**: Bạn sẽ có thể gửi các giao dịch (đặc biệt là những người thay đổi trạng thái của blockchain).
3. **Hợp đồng tương đồng**: Một khi một vật thể web3 đã được thực hiện, chúng ta sẽ chống lại hợp đồng triển khai, mà chúng ta tương tác.
4. **Các chức năng gọi**: Fetch dữ liệu thông qua các chức năng trong hợp đồng thông qua vật thể hợp đồng.
