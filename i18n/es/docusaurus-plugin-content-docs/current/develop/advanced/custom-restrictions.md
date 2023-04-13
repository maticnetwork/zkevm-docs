---
id: custom-restrictions
title: Adding Custom Restrictions (ERC20/ERC721)
#sidebar_label: Adding
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

**How to add custom restrictions to your ERC20 token on Polygon**

ERC20 tokens on the Polygon chain are standard contracts, auto-deployed by the Plasma root chain contracts, while registering a new ERC20 token on the Polygon. These cannot be modified, in order to ensure all state transitions are mapped to fraud proofs in the root chain contracts, which basically allow these contracts to maintain the same security as the Ethereum network.

However, in a real-world scenario, the ERC20 token owner may need to add custom restrictions on the contract, especially on the `transfer` function.

**TL;DR**

- Implement the `beforeTransfer` function in the implementation of the IParentToken interface (https://github.com/maticnetwork/contracts/blob/master/contracts/child/misc/IParentToken.sol) and deploy to the Polygon chain.

**This page details the process to add custom transfer restrictions to your ERC20 token:**

- When the ERC20 token is added/mapped to Polygon, the function in the root contract(link) expects
    - the rootchain token contract address,
    - metadata about the token and
    - the owner address

    This also auto-deploys a corresponding standard ERC20 token contract to the Polygon chain, with a mapping to the root token contract. Also, the owner address has to be provided, which later allows for authorizing a deployment of an additional contract, by which the ERC20 token owner can add transfer restrictions on the contract in the Polygon chain.

- To define any custom logic in the standard `transfer` function in the ERC20 token, you need to implement the `IParentToken` interface; see link here - https://github.com/maticnetwork/contracts/blob/master/contracts/child/misc/IParentToken.sol

- The `beforeTransfer` hook function is the place where custom logic can be executed before each transfer.
- The implemented contract must
    - follow this interface,
    - return a `bool` value and
    - in case of ERC20 contracts, it should not have `require` statements and instead return `false`
- Here is a sample `IParentToken` contract implementation:

<script src="https://gist.github.com/anurag-arjun/c7382e2abaf0822e6ec7e988eb46c92e.js"></script>

- Only the owner address given at the time of token registration will be able to add/update parent contract address (`IParentToken` implementation with the `beforeTransfer` hook) in the standard ChildToken contract on Polygon
- For your information, you can get the address of the standard ChildToken contract (auto-deployed by the Polygon root contracts) by querying the `rootToChildToken` mapping in the registry contract (https://github.com/maticnetwork/contracts/blob/master/contracts/common/Registry.sol)

    ```solidity
    contract Registry is Governable {
    mapping(bytes32 => address) contractMap;
    mapping(address => address) public rootToChildToken;
    mapping(address => address) public childToRootToken;
    ...
    }
    ```

- Ownership of the parent contract implemented in this manner (`IParentToken` implementation with the `beforeTransfer` hook) can be transferred by invoking the `setParent` function in the ChildERC20 contract on the Polygon chain - see https://github.com/maticnetwork/contracts/blob/master/contracts/child/ChildERC20.sol

    ```js
    function setParent(address _parent) public isParentOwner {
        require(_parent != address(0x0));
        parent = _parent;
    }
    ```