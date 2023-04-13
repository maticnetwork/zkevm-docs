---
id: important-contracts
title: Important contracts
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

## State Syncer

This contract is used to relay state changes from Ethereum mainchain to Bor. Heimdall listens to `StateSynced` events on the `StateSender` contract and relays them to Bor using a system call.

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

## Deposit manager

For depositing assets from mainchain to Bor. This contract acts as an escrow contract where the assets are held until they are withdrawn (via the withdraw manager and predicates).

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

## ChildChain (Bor)

These deposits from above are minted to ERC20/721 token contracts on the bor. This happens via the [state receiver contract](https://www.notion.so/maticnetwork/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab#aa94e6a9373943068b93d2c0e7f3d2e6) that calls `onStateReceive` method in `ChildChain`.

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

## ChildERC20/721

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


<!-- 
## Withdraw Manager (WIP) -->