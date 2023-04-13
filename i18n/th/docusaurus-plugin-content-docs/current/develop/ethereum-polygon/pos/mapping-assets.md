---
id: mapping-assets
title: การแมปสินทรัพย์โดยใช้ POS
description: "การแมปสินทรัพย์จาก Polygon ไปยัง Ethereum"
keywords:
  - docs
  - matic
  - mapping
image: https://matic.network/banners/matic-network-16x9.png
---

### ข้อมูลเบื้องต้น {#introduction}

จำเป็นต้องมีการแมปเพื่อโอนสินทรัพย์ของคุณเข้าและออกจาก Ethereum และ Polygon

- **เชนต้นทาง** :: หมายถึง Goerli หรือ Ethereum Mainnet
- **เชนย่อย** :: หมายถึง Polygon Mumbai หรือ Polygon Mainnet

หากคุณมีสัญญาโทเค็นที่ปรับใช้บนเชนต้นทางอยู่แล้วและต้องการย้ายไปยังเชนย่อย คุณควรปฏิบัติตามคำแนะนำนี้ แต่ถ้าคุณตั้งใจจะปรับใช้สัญญาของคุณบน Polygon Mainnet ก่อน ให้มินต์โทเค็นบนเชนย่อยก่อน แล้วจึงย้ายกลับไปที่เชนต้นทางจากนั้นคุณควรปฏิบัติตาม[คู่มือ](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets)นี้

## โทเค็นย่อยมาตรฐาน {#standard-child-token}

หากคุณเพียงแค่ต้องการสัญญา ERC20/ERC721/ERC1155 มาตรฐาน คุณสามารถยื่นคำขอการแมปที่ https://mapper.polygon.technology/ และเราจะปรับใช้สัญญาโทเค็นย่อยมาตรฐานให้คุณโดยอัตโนมัติ

สัญญาโทเค็นย่อยมาตรฐานจะมีลักษณะดังนี้:-
1. [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508)
2. [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238)
3. [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818)

โปรดไปที่[ลิงก์](/docs/develop/ethereum-polygon/submit-mapping-request)นี้เพื่อทำความเข้าใจวิธีสร้างคำขอการแมปใหม่

## โทเค็นย่อยที่กำหนดเอง {#custom-child-token}

หากคุณต้องมีสัญญาโทเค็นย่อยที่กำหนดเอง ซึ่งมีฟังก์ชันเพิ่มเติมสำหรับฟังก์ชันมาตรฐาน **คุณจะต้องปรับใช้สัญญาโทเค็นของคุณบนเชนย่อย** และส่งคำขอการแมป[ที่นี่](https://mapper.polygon.technology/)และรวมที่อยู่ของสัญญาโทเค็นย่อยที่ปรับใช้มาอธิบายตัวอย่างการสร้างสัญญาโทเค็นย่อยที่กำหนดเองกัน

**สัญญาย่อยที่กำหนดเองของคุณควรเป็นไปตามแนวทางบางประการก่อนที่คุณจะปรับใช้กับเชนย่อย**

ควรมีเมธอด `deposit` อยู่ในสัญญาย่อยที่กำหนดเองของคุณสัญญา `ChildChainManagerProxy` จะเรียกฟังก์ชันนี้ เมื่อมีการเริ่มต้นการฝากจากเชนต้นทางฟังก์ชัน deposit นี้จะมินต์โทเค็นภายในบนเชนย่อย

ควรมีเมธอด `withdraw` อยู่ในสัญญาย่อยที่กำหนดเองของคุณซึ่งเรียกมาเพื่อเบิร์นโทเค็นของคุณบนเชนย่อยได้การเบิร์นเป็นขั้นตอนแรกของกระบวนการถอนของคุณฟังก์ชันถอนนี้จะเบิร์นโทเค็นภายในบนเชนย่อย

ต้องปฏิบัติตามกฎเหล่านี้เพื่อรักษาสมดุลของสินทรัพย์ระหว่างสองโซ่

:::note

ไม่มีการสร้างเหมืองในผู้สร้างสัญญาโทเค็นของเด็ก

:::

#### การนำไปใช้ {#implementation}

เราได้อธิบาย_เหตุผล_ที่เราต้องนำเมธอด `deposit` และ `withdraw` ในสัญญาโทเค็นย่อยไปใช้แล้ว ตอนนี้เราสามารถดำเนินการนำไปใช้ต่อได้แล้ว

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

สิ่งหนึ่งที่คุณอาจสังเกตเห็นในตัวอย่างโค้ดด้านบนคือ ใครๆ ก็สามารถเรียกใช้ฟังก์ชัน `deposit` ได้ ซึ่งปล่อยให้เกิดขึ้นไม่ได้เพื่อป้องกันสิ่งนี้ เราจะทำให้แน่ใจว่าสามารถเรียกฟังก์ชันดังกล่าวได้โดย `ChildChainManagerProxy` เท่านั้น(ChildChainManagerProxy - บน [Mumbai](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions) , บน [Polygon Mainnet](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/))

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

ใช้รูปแบบการนำไปใช้ที่อัปเดตนี้กับการแมปได้

ขั้นตอน:

1. ปรับใช้โทเค็นต้นทางบนบนเชนต้นทาง กล่าวคือ {Goerli, Ethereum Mainnet}
2. ตรวจให้แน่ใจว่าโทเค็นย่อยของคุณมีฟังก์ชัน `deposit` และ `withdraw`
3. ปรับใช้โทเค็นย่อยบนเชนย่อย กล่าวคือ {Polygon Mumbai, Polygon Mainnet}
4. ส่งคำขอการแมปให้ทีมแยกวิเคราะห์

### การส่งคำขอ {#request-submission}

โปรดใช้[ลิงก์นี้](/docs/develop/ethereum-polygon/submit-mapping-request)เพื่อส่งคำขอการแมป
