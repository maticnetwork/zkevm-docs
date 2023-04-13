---
id: important-contracts
title: Các hợp đồng quan trọng
description: Người máy bang, Trình quản lý Deposit, Childtails và ChilderC20/721
keywords:
  - docs
  - matic
  - polygon
  - Important contracts
image: https://matic.network/banners/matic-network-16x9.png
---

# Các hợp đồng quan trọng {#important-contracts}

## Trình đồng bộ Trạng thái {#state-syncer}

Hợp đồng này được sử dụng để chuyển tiếp các thay đổi trạng thái từ chuỗi chính Ethereum sang Bor. Heimdall lắng nghe `StateSynced`các sự kiện trên hợp đồng `StateSender` và chuyển tiếp chúng sang Bor bằng cách sử dụng lệnh gọi hệ thống.

```jsx
contract StateSender {
	function syncState(address receiver, bytes calldata data)
    external
	{
	    counter = counter.add(1);
	    emit StateSynced(counter, receiver, data);
	}
}
```

## Trình quản lý Tiền nạp {#deposit-manager}

Để nạp tiền tài sản từ chuỗi chính sang Bor. Hợp đồng này hoạt động như một hợp đồng ký quỹ trong đó tài sản được giữ cho đến khi được rút (qua trình quản lý rút tiền và các thuộc tính).

```jsx
function depositERC20ForUser(address _token, address _user, uint256 _amount)
		public
{
    require(
        IERC20(_token).transferFrom(msg.sender, address(this), _amount),
        "TOKEN_TRANSFER_FAILED"
    );
    _createDepositBlock(_user, _token, _amount);
}

function _createDepositBlock(
    address _user,
    address _token,
    uint256 _amountOrToken,
    uint256 _depositId
) internal {
    ...
    stateSender.syncState(
        childChain,
        abi.encode(_user, _token, _amountOrToken, _depositId /* sequential ID */)
    );
		...
}
```

## ChildChain (Bor) {#childchain-bor}

Các khoản tiền nạp từ bên trên được tạo thành hợp đồng token ERC20/721 trên bor. Điều này xảy ra qua [hợp đồng người nhận trạng thái](https://www.notion.so/maticnetwork/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab#aa94e6a9373943068b93d2c0e7f3d2e6) gọi `onStateReceive`phương pháp trong`ChildChain`.

```jsx
contract ChildChain {
	...
	function onStateReceive(
	  uint256, /* id */
	  bytes calldata data
	) external onlyStateSyncer {
	  (address user, address rootToken, uint256 amountOrTokenId, uint256 depositId)
			= abi.decode(data, (address, address, uint256, uint256));
	  depositTokens(rootToken, user, amountOrTokenId, depositId);
	}

	function depositTokens(
	  address rootToken,
	  address user,
	  uint256 amountOrTokenId,
	  uint256 depositId)
	{
		...
		if (isERC721[rootToken]) {
        obj = ChildERC721(childToken);
    } else {
        obj = ChildERC20(childToken);
    }
    obj.deposit(user, amountOrTokenId);	
	}
}
```

## ChildERC20/721 {#childerc20-721}

```jsx
contract ChildERC20 is ERC20 {
	function deposit(address user, uint256 amount) public onlyOwner {
	  ...
    _mint(user, amount);
		...
  }

	function withdraw(uint256 amount) public payable {
    ...
    _burn(user, amount);
		...
	}
}
```
