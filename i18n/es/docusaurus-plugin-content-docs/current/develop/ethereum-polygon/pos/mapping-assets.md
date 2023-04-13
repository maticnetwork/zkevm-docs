---
id: mapping-assets
title: Mapeo de activos con PoS
description: "Mapeeo de activos de Polygon a Ethereum."
keywords:
  - docs
  - matic
  - mapping
image: https://matic.network/banners/matic-network-16x9.png
---

### Introducción {#introduction}

El mapeo es necesario para poder transferir activos entre Ethereum y Polygon.

- **La cadena primaria** :: hace referencia a Goerli o la red principal de Ethereum
- **La cadena secundaria** :: hace referencia a Mumbai o la red principal de Polygon

Si ya tienes un contrato de token desplegado en la cadena primaria y quieres moverlo a la cadena secundaria, debes seguir esta explicación. Sin embargo, si pretendes desplegar el contrato en la red principal de Polygon primero, acuña los tokens en la cadena secundaria y luego trasládalos a la cadena primaria. Para ello, sigue esta [guía](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets).

## Token secundario estándar {#standard-child-token}

Si solo necesitas un contrato de ERC-20/ERC-721/ERC-1155 estándar, puedes enviar una solicitud de mapeo por medio de https://mapper.polygon.technology/ y nosotros desplegaremos el contrato del token secundario estándar automáticamente para ti.

El contrato del token secundario estándar se verá así:
1. [ERC-20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508)
2. [ERC-721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238)
3. [ERC-1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818)

Visita este [enlace](/docs/develop/ethereum-polygon/submit-mapping-request) para saber cómo crear una nueva solicitud de mapeo.

## Token secundario personalizado {#custom-child-token}

Si necesitas un contrato de token secundario personalizado que tenga funciones adicionales a las estándar, **tendrás que desplegar los contratos de token en la cadena secundaria** y enviar una solicitud de mapeo [aquí](https://mapper.polygon.technology/) e incluir la dirección del contrato de token secundario desplegado. Describiremos un ejemplo de cómo crear un contrato de token secundario personalizado.

**El contrato secundario personalizado debe cumplir ciertos requisitos antes de que puedas desplegarlo en la cadena secundaria.**

El método `deposit` debe estar presente en el contrato secundario personalizado. El contrato `ChildChainManagerProxy` llama a esta función siempre que se inicia un depósito desde la cadena primaria. Esa función de depósito acuña el token internamente en la cadena secundaria.

El método `withdraw` debe estar presente en el contrato secundario personalizado. Este se puede llamar para quemar los tokens en la cadena secundaria. El quemado es el primer paso del proceso de retiro. La función de retiro quemará el token internamente en la cadena secundaria.

Estas reglas deben seguirse para mantener el equilibrio adecuado de los activos entre dos cadenas.

:::note

Ninguna acuñación de token en constructor del contrato de token infantil.

:::

#### Implementación {#implementation}

Ahora que explicamos _por qué_ hay que implementar los métodos `deposit` y `withdraw` en el contrato del token secundario, podemos proceder a la implementación.

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

Algo que quizás hayas notado en el ejemplo de código anterior es que cualquiera puede llamar a la función `deposit`, lo cual no está permitido. Para evitarlo, vamos a asegurarnos de que solo `ChildChainManagerProxy` pueda llamarla. (ChildChainManagerProxy: en [Mumbai](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions), en la [red principal de Polygon](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/))

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

Esa implementación actualizada se puede utilizar para el mapeo.

Pasos:

1. Despliega el token primario en la cadena primaria, es decir: {Goerli, red principal de Ethereum}
2. Asegúrate de que el token secundario tenga las funciones `deposit` y `withdraw`.
3. Despliega el token secundario en la cadena secundaria, es decir: {Polygon Mumbai, red principal de Polygon}
4. Envía una solicitud de mapeo para que el equipo la resuelva.

### Envío de solicitud {#request-submission}

Usa [este enlace](/docs/develop/ethereum-polygon/submit-mapping-request) para enviar una solicitud de mapeo.
