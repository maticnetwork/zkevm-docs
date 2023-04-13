---
id: mapping-assets
title: Mappatura degli asset mediante POS
description: "Mappatura di asset da Polygon a Ethereum."
keywords:
  - docs
  - matic
  - mapping
image: https://matic.network/banners/matic-network-16x9.png
---

### Introduzione {#introduction}

La mappatura è necessaria per trasferire gli asset tra Ethereum e Polygon e viceversa.

- **Root chain** :: si riferisce a Goerli o a Ethereum Mainnet
- **Catena figlio** :: si riferisce a Polygon Mumbai o Polygon Mainnet

Se il tuo contratto di token è già stato distribuito sulla Root chain e vuoi spostarlo sulla catena figlio, allora devi seguire questa procedura; se invece intendi distribuire il tuo contratto sulla Polygon Mainnet, devi prima creare i token sulla catena figlio e poi spostali di nuovo sulla Root chain. Dovresti quindi seguire questa [guida](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets).

## Token figlio standard {#standard-child-token}

Se hai bisogno solo di un contratto ERC20/ERC721/ERC1155 standard, puoi inviare una richiesta di mappatura a https://mapper.polygon.technology/ e noi distribuiremo automaticamente il contratto di token figlio standard per te.

Il contratto del token figlio standard avrà il seguente aspetto:-
1. [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508)
2. [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238)
3. [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818)

Visita questo [link](/docs/develop/ethereum-polygon/submit-mapping-request) per capire come creare una nuova richiesta di mappatura.

## Token figlio personalizzato {#custom-child-token}

Se hai bisogno di un contratto token figlio personalizzato che abbia funzioni aggiuntive rispetto a quelle standard, **allora dovrai distribuire i tuoi contratti token sulla catena figlio** e inviare una richiesta di mappatura [qui](https://mapper.polygon.technology/) e includere l'indirizzo del tuo contratto token figlio distribuito. Descriviamo un esempio di creazione di un contratto token figlio personalizzato.

**Il tuo contratto figlio personalizzato deve seguire alcune linee guida prima di essere distribuito nella catena figlio.**

Il metodo `deposit` dovrebbe essere presente nel tuo contratto figlio personalizzato. Questa funzione viene chiamata dal contratto `ChildChainManagerProxy` ogni volta che viene avviato un deposito dalla root chain. Questa funzione di deposito crea internamente il token sulla catena figlio.

Il metodo `withdraw` dovrebbe essere presente nel tuo contratto figlio personalizzato. Si può chiamare per effettuare il burn dei token nella catena figlio. Il burn è la prima fase del processo di prelievo. Questa funzione di prelievo esegue il burn internamente del token nella catena figlio.

Queste regole devono essere seguite per mantenere il corretto equilibrio delle attività tra due catene.

:::note

Nessun token minting in costruttore del contratto di child token.

:::

#### Implementazione {#implementation}

Ora che abbiamo capito _perché_ dobbiamo implementare i metodi `deposit` e `withdraw` nel contratto del token figlio, possiamo procedere con l'implementazione.

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

Un aspetto che potresti notare nell'esempio di codice sopra riportato riguarda la funzione `deposit` che può essere chiamata da chiunque, una possibilità non consentita. Per evitare che ciò accada, faremo in modo che possa essere richiamato solo da `ChildChainManagerProxy`. (ChildChainManagerProxy - su [Mumbai](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions) , sulla [Polygon Mainnet](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/) )

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

Questa implementazione aggiornata può essere utilizzata per la mappatura.

Passaggi :

1. Distribuisci il root token sulla root chain, cioè {Goerli, Ethereum Mainnet}.
2. Assicurati che il token figlio abbia le funzioni `deposit` e `withdraw`.
3. Distribuisci il token figlio sulla catena figlio, cioè {Polygon Mumbai, Polygon Mainnet}.
4. Invia una richiesta di mappatura, che verrà risolta dal team.

### Invio della richiesta {#request-submission}

Utilizza [questo link](/docs/develop/ethereum-polygon/submit-mapping-request) per inviare una richiesta di mappatura.
