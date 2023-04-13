---
id: mapping-assets
title: Сопоставление активов с использованием POS
description: "Сопоставление активов из Polygon в Ethereum."
keywords:
  - docs
  - matic
  - mapping
image: https://matic.network/banners/matic-network-16x9.png
---

### Введение {#introduction}

Сопоставление необходимо для перевода ваших активов между Ethereum и Polygon.

- **Корневая цепочка** :: Goerli или Ethereum Mainnet
- **Дочерняя цепочка** :: Polygon Mumbai или Polygon Mainnet

Если вы уже развернули свой контракт токена в корневой цепочке и хотите переместить его в дочернюю цепочку, вам необходимо следовать указаниям этого документа, однако если вы хотите вначале развернуть свой контракт в Polygon Mainnet, вначале следует выполнить минтинг токенов, а затем переместить их обратно в корневую цепочку. После этого необходимо следовать указаниям этого [руководства](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets).

## Стандартный дочерний токен {#standard-child-token}

Если вам просто необходим стандартный контракт ERC20/ERC721/ERC1155, вы можете продолжить и отправить заявку на сопоставление через https://mapper.polygon.technology/, и мы автоматически развернем для вас стандартный контракт дочернго токена.

Стандартный контракт дочернего токена выглядит следующим образом:-
1. [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508)
2. [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238)
3. [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818)

Перейдите по этой [ссылке](/docs/develop/ethereum-polygon/submit-mapping-request), чтобы узнать, как создать новую заявку на сопоставление.

## Пользовательский дочерний токен {#custom-child-token}

Если вам требуется пользовательский контракт дочернего токена с дополнительными функциями помимо стандартных функций, **вам следует развернуть контракты токенов в дочерней цепочке** и отправить запрос на сопоставление [здесь](https://mapper.polygon.technology/) и указать адрес развернутого контракта дочернего токена. Опишем пример создания пользовательского контракта дочернего токена.

**Ваш пользовательский контракт дочернего токена должен соответствовать определенным правилам, прежде чем вы сможете развернуть его в дочерней цепочке.**

Метод `deposit` должен присутствовать в пользовательском дочернем контракте. Эта функция вызывается контрактом `ChildChainManagerProxy` всегда, когда депозит инициируется из корневой цепочки. Функция депозита выполняет внутренний минтинг токена в дочерней цепочке.

Метод `withdraw` должен присутствовать в пользовательском дочернем контракте. Ее можно вызвать для сжигания ваших токенов в дочерней цепочке. Сжигание — это первый шаг процесса вывода. Функция вывода выполняет внутреннее сжигание токена в дочерней цепочке.

Эти правила необходимо соблюдать для поддержания надлежащего баланса активов между двумя цепочками.

:::note

Не отображается токен в конструкторе контракта на токен дочернего токена.

:::

#### Реализация {#implementation}

Мы рассказали, _почему_ нам требуется реализовать методы `deposit` и `withdraw` в контракте дочернего токена, и теперь мы можем перейти к его реализации.

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

В приведенном выше образце кода можно заметить, что функция `deposit` может быть вызвана кем угодно, что не разрешено. Для предотвращения этого мы сделаем так, чтобы ее мог вызывать только `ChildChainManagerProxy`. (ChildChainManagerProxy - в [Mumbai](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions) , в [Polygon Mainnet](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/) )

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

Эту обновленную реализацию можно использовать для сопоставления.

Шаги :

1. Разверните корневой токен в корневой цепочке {Goerli, Ethereum Mainnet}
2. Убедитесь, что дочерний токен имеет функции `deposit` и `withdraw`.
3. Выполните развертывание дочернего токена в дочерней цепочке {Polygon Mumbai, Polygon Mainnet}
4. Отправьте запрос на сопоставление, который должен быть разрешен командой.

### Отправка заявки {#request-submission}

Используйте [эту ссылку](/docs/develop/ethereum-polygon/submit-mapping-request) для отправки заявки на сопоставление.
