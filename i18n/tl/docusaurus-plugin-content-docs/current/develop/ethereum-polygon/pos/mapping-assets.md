---
id: mapping-assets
title: Pagmamapa ng mga Asset gamit ang POS
description: "Pagmamapa ng mga asset mula sa Polygon Patungong Ethereum."
keywords:
  - docs
  - matic
  - mapping
image: https://matic.network/banners/matic-network-16x9.png
---

### Panimula {#introduction}

Kinakailangan ang pagmamapa para mailipat ang mga asset mo sa at mula sa Ethereum at Polygon.

- **Ang Root Chain** :: tumutukoy sa alinman sa Goerli o Ethereum Mainnet
- **Ang Child chain** :: ay tumutukoy sa alinman sa Polygon Mumbai o Polygon Mainnet

Kung na-deploy mo na ang iyong kontrata ng token sa Root chain at gusto mong ilipat ito sa Child chain, dapat mong sundin ang pagpapaliwanag na ito. Ngunit kung balak mong i-deploy muna ang iyong kontrata sa Polygon Mainnet, i-mint muna ang mga token sa Child chain at saka ilipat ang mga ito pabalik sa Root chain. Dapat mong sundin ang [gabay](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets) na ito.

## Standard na Child Token {#standard-child-token}

Kung kailangan mo lang ng standard na kontrata ng ERC20/ERC721/ERC1155, sige lang at magsumite ng kahilingan sa pagmamapa sa https://mapper.polygon.technology/ at mag-auto-deploy kami ng kontrata ng standard child token para sa iyo.

Magmumukhang ganito ang kontrata ng Standard Child Token:-
1. [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508)
2. [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238)
3. [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818)

Mangyaring bisitahin ang [link](/docs/develop/ethereum-polygon/submit-mapping-request) na ito upang maunawaan kung paano gumawa ng bagong kahilingan sa pagmamapa.

## Custom na Child Token {#custom-child-token}

Kung kailangan mo ng custom na kontrata ng child token na may karagdagang function sa pangkaraniwang mga function, **kakailanganin mong i-deploy ang iyong mga kontrata ng token sa Child chain** at magsumite ng kahilingan sa pagmamapa [rito](https://mapper.polygon.technology/), at isama ang address ng iyong na-deploy na kontrata ng child token. Ilarawan natin ang isang halimbawa ng paggawa ng custom na kontrata ng child token.

**Dapat sundin ng iyong custom na kontrata ng child token ang ilang partikular na alituntunin bago mo ito i-deploy sa child chain.**

`deposit` na paraan na dapat nasa sa custom na kontrata ng child token. Nagagawang ma-call ang function na ito ng `ChildChainManagerProxy` kontrata sa tuwing may sinisimulang pagdeposito mula sa root chain. Panloob na nagmi-mint ng token sa child chain ang function na ito sa pagdeposito.

`withdraw` na paraan na dapat nasa sa custom na kontrata ng child token. Maaari itong i-call para ma-burn ang iyong mga token sa child chain. Unang hakbang ang pag-burn sa proseso ng iyong pag-withdraw. Ang withdraw function na ito ay internal na magsusunog ng token sa child chain.

Kailangang sundin ang mga alituntuning ito para mapanatili ang tamang balanse ng mga asset sa pagitan ng dalawang chain.

:::note

Walang token na minting sa constructor ng child token contract.

:::

#### Pagpapatupad  {#implementation}

Ngayong natalakay na natin _kung bakit_ kailangan nating magpatupad ng `deposit` mga `withdraw` pamamaraan sa kontrata ng child token, maaari na tayong magpatuloy sa pagpapatupad nito.

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

Isang bagay na maaari mong mapansin sa sample ng code sa itaas ay na maaring ma-call ng sinuman ang `deposit` function, na hindi pinapahintulutan. Upang maiwasan ito, sisiguraduhin naming mako-call lang ito ng `ChildChainManagerProxy`. (ChildChainManagerProxy - sa [Mumbai](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions), sa [Polygon Mainnet](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/))

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

Maaaring magamit ang pagpapatupad na ito sa pagmamapa.

Mga Hakbang :

1. I-deploy ang token root chain, i.e., {Goerli, Ethereum Mainnet}
2. Tiyaking may mga function na `deposit` at `withdraw` ang child token.
3. I-deploy ang child token sa child chain i.e. {Polygon Mumbai, Polygon Mainnet}
4. Magsumite ng kahilingan sa pagmamapa, para malutas ng team.

### Pagsusumite ng Kahilingan {#request-submission}

Mangyaring gamitin [ang link na ito](/docs/develop/ethereum-polygon/submit-mapping-request) para makapagsumite ng pagmamapa ng kahilingan.
