---
id: mapping-assets
title: Cartographie des Actifs utilisant une Preuve de Participation
description: "Cartographie des actifs de Polygon à Ethereum."
keywords:
  - docs
  - matic
  - mapping
image: https://matic.network/banners/matic-network-16x9.png
---

### Introduction {#introduction}

La cartographie est nécessaire pour transférer vos actifs vers et depuis l'Ethereum et Polygon.

- **La chaîne Root** :: fait référence à Goerli ou au Réseau Principal Ethereum
- **La chaîne Enfant** :: fait référence soit au Polygon Mumbai, soit au Réseau Principal de Polygone.

Si vous avez déjà déployé votre contrat de jetons sur la chaîne Root et que vous souhaitez le déplacer vers la chaîne Enfant, vous devez suivre cette procédure, mais si vous avez l'intention de déployer votre contrat sur le Réseau Principal de Polygon, commencez par frapper les jetons sur la chaîne Enfant avant de les ramener sur la chaîne Root. Vous devriez suivre ce [guide](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets) .

## Jeton Standard pour Enfant {#standard-child-token}

Si vous n'avez besoin que d'un contrat standard ERC20/ERC721/ERC1155, vous pouvez alors soumettre une demande de cartographie à l'adresse https://mapper.polygon.technology/ et nous déploierons automatiquement le contrat standard de jeton enfant pour vous.

Le contrat Standard du Jeton Enfant ressemblera à ceci:-
1. [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508)
2. [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238)
3. [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818)

Veuillez visiter ce [lien](/docs/develop/ethereum-polygon/submit-mapping-request) pour comprendre comment créer une nouvelle demande de cartographie.

## Jeton Enfant Personnalisé {#custom-child-token}

Si vous avez besoin d'un contrat de jeton enfant personnalisé qui a des fonctions supplémentaires aux fonctions standard, **alors vous devrez déployer vos contrats de jeton sur la chaîne Enfant** et soumettre une demande de cartographie [ici](https://mapper.polygon.technology/) et inclure l'adresse de votre contrat de jeton enfant déployé. Décrivons un exemple de création d'un contrat de jeton enfant personnalisé.

**Votre contrat enfant personnalisé doit suivre certaines directives avant que vous ne le déployiez sur la chaîne enfant.**

`deposit` méthode doit être présente dans votre contrat enfant personnalisé. Cette fonction est appelée par le `ChildChainManagerProxy` contrat chaque fois qu'un dépôt est initié depuis la chaîne root. Cette fonction de dépôt frappe en interne le jeton sur la chaîne enfant.

`withdraw` méthode doit être présente dans votre contrat enfant personnalisé. Cela peut être appelé pour brûler vos jetons sur la chaîne enfant. La combustion est la première étape de votre processus de retrait. Cette fonction de retrait brûlera en interne le jeton sur la chaîne enfant.

Ces règles doivent être suivies pour maintenir un équilibre approprié des actifs entre deux chaînes.

:::note

Pas de jetons de minting dans le constructeur du contrat de jetons enfants.

:::

#### Mise en oeuvre {#implementation}

Maintenant que nous avons couvert _pourquoi_ nous devons mettre en oeuvre les méthodes `deposit`& `withdraw`dans le contrat de jeton enfant, nous pouvons maintenant procéder à son implémentation.

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

Une chose que vous pouvez remarquer dans l'exemple de code ci-dessus est que la `deposit`fonction peut être appelée par n'importe qui, ce qui n'est pas autorisé. Afin d'éviter cela, nous allons nous assurer qu'il ne peut être appelé que par`ChildChainManagerProxy`. (ChildChainManagerProxy - sur [Mumbai](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions) , sur [Réseau Principal de Polygon](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/) )

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

Cette mise à jour de mise en oeuvre peut être utilisée pour la cartographie.

Étapes :

1. Déployez le jeton root sur la chaîne root c'est-à-dire. {Goerli, Ethereum Réseau Principal}
2. Assurez-vous que votre jeton enfant possède les fonctions `deposit` & `withdraw` .
3. Déployer le jeton enfant sur la chaîne enfant, c'est-à-dire {Polygone Mumbai, Réseau Principal de Polygon}
4. Soumettez une demande de cartographie, qui sera résolue par l'équipe.

### Demande de Soumission {#request-submission}

Veuillez utiliser [ce lien](/docs/develop/ethereum-polygon/submit-mapping-request) pour soumettre une demande de cartographie.
