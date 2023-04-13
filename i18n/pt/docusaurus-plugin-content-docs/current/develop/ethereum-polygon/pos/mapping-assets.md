---
id: mapping-assets
title: Mapeamento de ativos usando PoS
description: "Mapeamento de ativos da Polygon para a Ethereum."
keywords:
  - docs
  - matic
  - mapping
image: https://matic.network/banners/matic-network-16x9.png
---

### Introdução {#introduction}

O mapeamento é necessário para transferir os seus ativos de e para a Ethereum e a Polygon.

- **A chain ROOT chain** :: refere-se a Goerli ou Mainnet Ethereum
- **A chain Filho** :: refere-se à Polygon Mumbai ou Mainnet da Polygon

Se já tiver o seu contrato de token implantado na chain ROOT e quiser transferi-lo para a chain Filho deve seguir estes passos, mas se pretender implantar primeiro o seu contrato na Mainnet da Polygon, faça primeiro mint dos tokens na chain Filho e depois mova-os de volta para a chain Root. Deve então seguir este [guia](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets).

## Token Filho Padrão {#standard-child-token}

Se precisa apenas de um contrato ERC20/ERC721/ERC1155 padrão, então prossiga e envie um pedido de mapeamento para https://mapper.polygon.technology/ e iremos implantar automaticamente o contrato filho token padrão para si.

O contrato Token Filho padrão será semelhante a estes:
1. [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508)
2. [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238)
3. [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818)

Visite este [link](/docs/develop/ethereum-polygon/submit-mapping-request) para saber como criar um novo pedido de mapeamento.

## Token Filho Personalizado {#custom-child-token}

Se precisar de um contrato token filho personalizado, com funções adicionais para além das funções padrão, **terá de implantar os seus contratos token na chain filho** e enviar uma solicitação de mapeamento [aqui](https://mapper.polygon.technology/) e incluir o endereço do seu contrato de token filho implantado. Vamos descrever um exemplo de criação de um contrato de token filho personalizado.

**O seu contrato filho personalizado deve seguir determinadas diretrizes antes de ser implantado na chain filho.**

O método `deposit` deve estar presente no seu contrato filho personalizado. Esta função é chamada pelo `ChildChainManagerProxy`contrato sempre que um depósito é iniciado a partir da chain ROOT. A função de depósito faz  internamente mint do token na chain filho.

O método `withdraw` deve estar presente no seu contrato filho personalizado. Pode ser chamado para fazer burn dos seus tokens na chain filho. Burning é a primeira etapa do processo de retirada. Esta função de retirada irá fazer burn internamente do token na chain filho.

Estas regras precisam ser seguidas para manter o equilíbrio adequado dos ativos entre duas chains.

:::note

Não há mineração de token no construtor de contrato de token filho.

:::

#### Implementação {#implementation}

Agora que abordámos _o porquê_ de termos de implementar os métodos `deposit` e `withdraw` no contrato do token filho, temos agora de prosseguir para a sua implementação.

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

Uma coisa que poderá notar na amostra do código acima é que a função `deposit` pode ser chamada por qualquer pessoa, o que não é permitido. Para evitar isso, vamos assegurar que só possa ser chamada por `ChildChainManagerProxy`. (ChildChainManagerProxy - em [Mumbai](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions) , [mainnet da Polygon](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/) )

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

Esta implementação atualizada pode ser usada para mapeamento.

Etapas :

1. Implantar token ROOT na chain ROOT, ou seja, {Goerli, Mainnet Ethereum}
2. Certifique-se de que o seu token filho tem as funções `deposit`e `withdraw`.
3. Implantar o token filho no chain filho, ou seja, {Polygon Mumbai, Mainnet da Polygon}
4. Enviar um solicitação de mapeamento, a ser resolvido pela equipa.

### Submissão da solicitação {#request-submission}

Siga [este link](/docs/develop/ethereum-polygon/submit-mapping-request) para enviar uma solicitação de mapeamento.
