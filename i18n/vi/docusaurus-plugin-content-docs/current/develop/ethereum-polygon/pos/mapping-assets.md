---
id: mapping-assets
title: Hoán đổi Tài sản bằng POS
description: "Hoán đổi tài sản từ Polygon sang Ethereum."
keywords:
  - docs
  - matic
  - mapping
image: https://matic.network/banners/matic-network-16x9.png
---

### Giới thiệu {#introduction}

Hoán đổi là cần thiết để chuyển tài sản của bạn qua lại giữa Ethereum và Polygon.

- **Chuỗi Gốc** :: ám chỉ Goerli hoặc Mạng lưới chính Ethereum
- **Chuỗi Con** :: ám chỉ Polygon Mumbai hoặc Mạng lưới chính Polygon

Nếu bạn đã triển khai hợp đồng token của mình trên chuỗi Gốc và muốn chuyển nó sang chuỗi Con, thì bạn nên thực hiện theo hướng dẫn này, nhưng nếu bạn định triển khai hợp đồng của mình trên Mạng lưới chính Polygon trước thì hãy mint token trên chuỗi Con trước và rồi di chuyển chúng trở lại chuỗi Gốc. Bạn nên thực hiện theo [hướng dẫn](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets) này.

## Token Con Tiêu Chuẩn {#standard-child-token}

Nếu bạn chỉ cần một hợp đồng ERC20/ERC721/ERC1155 tiêu chuẩn, thì bạn có thể tiếp tục và nộp yêu cầu hoán đổi tại https://mapper.polygon.technology/ và chúng tôi sẽ tự động triển khai hợp đồng token con tiêu chuẩn cho bạn.

Hợp đồng Token Con Tiêu Chuẩn sẽ giống như những hợp đồng này:-
1. [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508)
2. [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238)
3. [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818)

Vui lòng truy cập [liên kết](/docs/develop/ethereum-polygon/submit-mapping-request) này để hiểu rõ cách tạo yêu cầu hoán đổi mới.

## Token Con Tùy Chỉnh {#custom-child-token}

Nếu bạn cần hợp đồng token con tùy chỉnh có các chức năng bổ sung cho các chức năng chuẩn, **thì bạn sẽ phải triển khai các hợp đồng token của mình trên chuỗi Con** và nộp yêu cầu hoán đổi [tại đây](https://mapper.polygon.technology/) và bao gồm địa chỉ của hợp đồng token con đã triển khai của bạn. Hãy cùng mô tả một ví dụ về việc tạo hợp đồng token con tùy chỉnh.

**Hợp đồng con tùy chỉnh của bạn sẽ tuân theo các nguyên tắc nhất định trước khi bạn triển khai nó trên chuỗi con.**

Nên có phương pháp `deposit` trong hợp đồng con tùy chỉnh của bạn. Chức năng này được hợp đồng `ChildChainManagerProxy` gọi bất cứ khi nào một khoản tiền nạp được khởi tạo từ chuỗi gốc. Chức năng nạp tiền này mint token nội bộ trên chuỗi con.

Nên có phương pháp `withdraw` trong hợp đồng con tùy chỉnh của bạn. Có thể gọi nó để đốt token của bạn trên chuỗi con. Đốt là bước đầu tiên trong quy trình rút tiền của bạn. Chức năng rút tiền này sẽ đốt token nội bộ trên chuỗi con.

Quy tắc này cần được tuân theo để duy trì sự cân bằng của tài sản đúng đắn giữa hai xích.

:::note

Không có dấu hiệu nào được phát triển trong hợp đồng vật dụng trẻ em.

:::

#### Quá trình triển khai {#implementation}

Giờ thì chúng ta đã biết _tại sao_ chúng ta cần triển khai các phương thức  `deposit`và `withdraw` trong hợp đồng token con, bây giờ chúng ta có thể tiến hành triển khai nó.

```js title="ChildERC20.sol"
pragma solidity 0.6.6;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract ChildERC20 is ERC20,
{
    using SafeMath for uint256;

    constructor(string memory name, string memory symbol, uint8 decimals) public ERC20(name, symbol) {

        _setupDecimals(decimals);
        // can't mint here, because minting in child chain smart contract's constructor not allowed
        // _mint(msg.sender, 10 ** 27);

    }

    function deposit(address user, bytes calldata depositData) external {
        uint256 amount = abi.decode(depositData, (uint256));

        // `amount` token getting minted here & equal amount got locked in RootChainManager
        _totalSupply = _totalSupply.add(amount);
        _balances[user] = _balances[user].add(amount);

        emit Transfer(address(0), user, amount);
    }

    function withdraw(uint256 amount) external {
        _balances[msg.sender] = _balances[msg.sender].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);

        emit Transfer(msg.sender, address(0), amount);
    }

}
```

Một điều bạn có thể nhận thấy trong mã mẫu bên trên là bất kỳ ai cũng có thể gọi chức năng `deposit`, điều mà không được phép. Để ngăn chặn điều này, chúng tôi sẽ đảm bảo rằng chỉ `ChildChainManagerProxy` mới có thể gọi chức năng đó. (ChildChainManagerProxy – trên [Mumbai](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions), trên [Mạng lưới chính Polygon](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/))

```js title="ChildERC20.sol"
pragma solidity 0.6.6;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract ChildERC20 is ERC20,
{
    using SafeMath for uint256;
    // keeping it for checking, whether deposit being called by valid address or not
    address public childChainManagerProxy;
    address deployer;

    constructor(string memory name, string memory symbol, uint8 decimals, address _childChainManagerProxy) public ERC20(name, symbol) {

        _setupDecimals(decimals);
        childChainManagerProxy = _childChainManagerProxy;
        deployer = msg.sender;

        // Can't mint here, because minting in child chain smart contract's constructor not allowed
        //
        // In case of mintable tokens it can be done, there can be external mintable function too
        // which can be called by some trusted parties
        // _mint(msg.sender, 10 ** 27);

    }

    // being proxified smart contract, most probably childChainManagerProxy contract's address
    // is not going to change ever, but still, lets keep it
    function updateChildChainManager(address newChildChainManagerProxy) external {
        require(newChildChainManagerProxy != address(0), "Bad ChildChainManagerProxy address");
        require(msg.sender == deployer, "You're not allowed");

        childChainManagerProxy = newChildChainManagerProxy;
    }

    function deposit(address user, bytes calldata depositData) external {
        require(msg.sender == childChainManagerProxy, "You're not allowed to deposit");

        uint256 amount = abi.decode(depositData, (uint256));

        // `amount` token getting minted here & equal amount got locked in RootChainManager
        _totalSupply = _totalSupply.add(amount);
        _balances[user] = _balances[user].add(amount);

        emit Transfer(address(0), user, amount);
    }

    function withdraw(uint256 amount) external {
        _balances[msg.sender] = _balances[msg.sender].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);

        emit Transfer(msg.sender, address(0), amount);
    }

}
```

Có thể sử dụng việc thực hiện cập nhật này để hoán đổi.

Các bước:

1. Triển khai token gốc trên chuỗi gốc, tức là {Goerli, Mạng lưới chính Ethereum}
2. Đảm bảo token con của bạn có các chức năng `deposit` và `withdraw`.
3. Triển khai token con trên chuỗi con, tức là {Polygon Mumbai, Mạng lưới chính Polygon}
4. Nộp yêu cầu hoán đổi, để đội ngũ xử lý.

### Nộp yêu cầu {#request-submission}

Vui lòng sử dụng [liên kết này](/docs/develop/ethereum-polygon/submit-mapping-request) để nộp yêu cầu hoán đổi.
