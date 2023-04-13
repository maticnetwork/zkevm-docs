---
id: mapping-assets
title: POS Kullanarak Varlıkları Eşleme
description: "Varlıkları Polygon'dan Ethereum'a eşleme."
keywords:
  - docs
  - matic
  - mapping
image: https://matic.network/banners/matic-network-16x9.png
---

### Giriş {#introduction}

Varlıklarınızı Ethereum ve Polygon arasında aktarmak için eşleme gereklidir.

- **Kök zincir** (root chain) :: Goerli veya Ethereum Mainnet'i ifade eder
- **Alt zincir** (child chain) :: Polygon Mumbai'yi veya Polygon Mainnet'i ifade eder

Token sözleşmenizi halihazırda Kök zincir üzerinde devreye aldıysanız ve sözleşmenizi Alt zincire taşımak isterseniz, bu kılavuzu takip etmeniz gerekir; fakat sözleşmenizi önce Polygon Mainnet üzerinde devreye almayı düşünüyorsanız, önce token'ları Alt zincir üzerinde mint edin, sonra bu token'ları Kök zincire geri taşıyın. Sonra bu [kılavuzu](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets) takip edin.

## Standart Alt Token {#standard-child-token}

Eğer standart bir ERC20/ERC721/ERC1155 sözleşmesine ihtiyacınız varsa, o zaman ilerleyerek https://mapper.polygon.technology/ sayfasında bir eşleme isteği gönderebilirsiniz. Bunu yaptığınızda standart alt token sözleşmesini sizin için otomatik olarak devreye alacağız.

Standart Alt Token sözleşmesi aşağıdaki gibi görünecektir:-
1. [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508)
2. [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238)
3. [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818)

Yeni bir eşleme isteğini nasıl oluşturacağınızı öğrenmek için lütfen bu [bağlantıyı](/docs/develop/ethereum-polygon/submit-mapping-request) ziyaret edin.

## Özel Alt Token {#custom-child-token}

Eğer standart fonksiyonlara ek fonksiyonlara sahip özel bir alt token sözleşmesine ihtiyacınız varsa, o zaman **token sözleşmelerinizi Alt zincir üzerinde devreye almanız** ve eşleme isteğinizi [buradan](https://mapper.polygon.technology/) gönderip, devreye aldığınız alt token sözleşmenizin adresini dâhil etmeniz gerekecektir. Şimdi bir özel alt token sözleşmesi oluşturma örneğini inceleyelim.

**Özel alt sözleşmeniz, siz onu alt zincir üzerinde devreye almadan önce belli yönergelerle uyumlu olmalıdır.**

`deposit` metodu özel alt sözleşmeniz içinde mevcut olmalıdır. Bu fonksiyon, bir fon yatırma işlemi kök zincirden başlatıldığında `ChildChainManagerProxy` sözleşmesi vasıtasıyla çağrılır. Bu fon yatırma fonksiyonu token'ı alt zincir üzerinde dahili olarak mint eder.

`withdraw` metodu özel alt sözleşmeniz içinde mevcut olmalıdır. Bu metot token'larınızı alt zincir üzerinde yakmak için çağrılabilir. Yakma işlemi, fon çekme işleminizin ilk adımıdır. Bu çekme fonksiyonu token'ı alt zincir üzerinde dahili olarak yakacaktır.

Bu kurallar, iki zincir arasındaki varlıkların doğru dengesini sağlamak için takip edilmelidir.

:::note

Çocuk token sözleşmesinin yapıcısında belirteç yok.

:::

#### Uygulama (implementation) {#implementation}

Alt token sözleşmesinde `deposit` ve `withdraw` metotlarını _neden_ yürütmemiz gerektiğini açıkladığımıza göre, şimdi bunu icra etmeye geçebiliriz.

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

Yukarıdaki kod örneğinde fark edebileceğiniz şeylerden biri, `deposit` fonksiyonunun herkes tarafından çağrılabileceğidir ki buna izin verilmemektedir. Bunun önüne geçmek için fonksiyonun yalnızca `ChildChainManagerProxy` vasıtasıyla çağrılabileceğinden emin olacağız. (ChildChainManagerProxy - [Mumbai](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions) üzerinde, [Polygon Mainnet](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/) üzerinde)

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

Bu güncellenmiş uygulama (implementation) eşleme için kullanılabilir.

Adımlar:

1. Kök token'ı kök zincir, yani {Goerli, Ethereum Mainnet} üzerinde devreye alın
2. Alt token'ınızın `deposit` ve `withdraw` fonksiyonlarına sahip olduğundan emin olun.
3. Alt token'ı alt zincir, yani {Polygon Mumbai, Polygon Mainnet} üzerinde devreye alın
4. Ekip tarafından çözümlenmek üzere bir eşleme isteği gönderin.

### İstek Gönderimi {#request-submission}

Eşleme isteği göndermek için lütfen [bu bağlantıyı](/docs/develop/ethereum-polygon/submit-mapping-request) kullanın.
