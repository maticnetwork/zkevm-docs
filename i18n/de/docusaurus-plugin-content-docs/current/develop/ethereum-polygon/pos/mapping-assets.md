---
id: mapping-assets
title: Mapping von Assets mit POS
description: "Mapping von Assets von Polygon zu Ethereum."
keywords:
  - docs
  - matic
  - mapping
image: https://matic.network/banners/matic-network-16x9.png
---

### Einführung {#introduction}

Mapping ist erforderlich, um deine Assets an und von Ethereum und Polygon zu übertragen.

- **Die Root-Chain** bezieht sich entweder auf Goerli oder Ethereum Mainnet
- **Die Child-Chain** bezieht sich entweder auf Polygon Mumbai oder Polygon Mainnet

Wenn du bereits deinen Token-Vertrag in der Root-Chain bereitgestellt haben und ihn in die Child-Chain verschieben möchten, solltest du diese Schritte befolgen. Falls du jedoch den Vertrag zuerst bei Polygon Mainnet bereitstellen möchtest, solltest du die Token in der Child-Chain zunächst minten und sie dann wieder in die Root-Chain verschieben. Befolge danach diese [Anleitung](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets).

## Standard-Child-Token {#standard-child-token}

Wenn du nur einen Standard-ERC20/ERC721/ERC1155 benötigst, kannst du eine Mapping-Anfrage unter https://mapper.polygon.technology/ stellen und wir werden den ERC20/ERC721/ERC1155 automatisch bereitstellen.

Der Standard-Child-Token-Vertrag wird so aussehen:-
1. [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508)
2. [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238)
3. [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818)

Zum Verständnis, wie man eine neue Mapping-Anfrage erstellt, siehe den [Link](/docs/develop/ethereum-polygon/submit-mapping-request).

## Benutzerdefiniertes Child-Token  {#custom-child-token}

Wenn du einen benutzerdefinierten Child-Token-Vertrag benötigst, der neben den Standardfunktionen weitere Funktionen bietet, **musst du deine Token-Verträge auf der Child-Chain bereitstellen** und [hier](https://mapper.polygon.technology/) eine Mapping-Anfrage mit der Adresse deines bereitgestellten Child-Token-Vertrags übermitteln. Sehen wir uns ein Beispiel für die Erstellung eines benutzerdefinierten Child-Token-Vertrags an.

**Dein benutzerdefinierter Child-Vertrag sollte bestimmten Richtlinien einhalten, bevor du ihn auf der Child-Chain bereitstellst.**

`deposit`Die Methode sollte in deinem benutzerdefinierten Child-Vertrag enthalten sein. Diese Funktion wird vom `ChildChainManagerProxy`-Vertrag aufgerufen, wenn eine Einzahlung aus der Root-Chain initiiert wird. Diese Einzahlungsfunktion mintet das Token intern auf die Child-Chain.

`withdraw`Die Methode sollte in deinem benutzerdefinierten Child-Vertrag enthalten sein. Es kann aufgerufen werden, um deine Token auf die Child-Chain zu brennen. Der Burn ist der erste Schritt deines Auszahlungsvorgangs. Diese Auszahlungsfunktion wird das Token intern auf die Child-Chain brennen.

Diese Regeln müssen eingehalten werden, um die richtige Balance der Vermögenswerte zwischen zwei Chain zu erhalten.

:::note

Kein token im Konstruktor des Child-Token-Vertrags ab.

:::

#### Implementierung {#implementation}

Da wir nun geklärt haben, _warum_ wir die `deposit`- und `withdraw`-Methoden im Child-Token-Vertrag implementieren müssen, können wir mit der Implementierung fortfahren.

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

Du siehst im oben stehenden Codebeispiel, dass die `deposit`-Funktion von jedem aufgerufen werden kann, was nicht erlaubt ist. Um das zu verhindern, legen wir fest, dass sie nur von `ChildChainManagerProxy` aufgerufen werden kann. (ChildChainManagerProxy - auf [Mumbai](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions) , am [Polygon-Mainnet](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/))

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

Diese aktualisierte Implementierung kann für das Mapping verwendet werden.

Schritte:

1. Bereitstellung von Root-Token auf der Root-Chain, z. B. {Goerli, Ethereum Mainnet}
2. Stelle sicher, dass dein Child-Token die Funktionen `deposit` und `withdraw` aufweist.
3. Stelle das Child-Token auf der Child-Chain bereit, z. B. {Polygon Mumbai, Polygon Mainnet}
4. Sende eine Mapping-Anfrage, die vom Team bearbeitet werden soll.

### Einreichung anfordern {#request-submission}

Bitte öffne [diesen Link](/docs/develop/ethereum-polygon/submit-mapping-request), um eine Mapping-Anfrage zu senden.
