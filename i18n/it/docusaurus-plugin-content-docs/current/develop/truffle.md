---
id: truffle
title: Distribuzione di uno Smart Contract utilizzando il tartufo
sidebar_label: Using Truffle
description:  Usa il Truffle per distribuire uno Smart Contract
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contract
  - truffle
  - deploy
  - polygonscan
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Panoramica {#overview}

[Truffle](https://trufflesuite.com/) è un ambiente di sviluppo della blockchain, che puoi utilizzare per creare e testare gli smart contract sfruttando la macchina virtuale di Ethereum. Questa guida mira a insegnare come creare uno smart contract utilizzando il Truffle e a distribuirlo sulla rete Polygon compatibile con EVM.

:::note

Questo tutorial è una versione adattata dell'articolo [<ins>della guida del Tartufo quickstart</ins>](https://www.trufflesuite.com/docs/truffle/quickstart)

:::

## Cosa farai {#what-you-will-do}

- Installerai e configurerai Truffle
- Distribuire il contratto su Polygon Network
- Verifica lo stato di implementazione su Polygonscan

## Prerequisiti {#prerequisites}

Ci sono alcuni requisiti tecnici da considerare prima di iniziare. Installa quanto segue:

- [Node.js v8+ LTS e npm](https://nodejs.org/en/) (confezionato con Node)
- [Git](https://git-scm.com/)

Una volta installati, avremo bisogno di un solo comando per installare Truffle:

```
npm install -g truffle
```

Per verificare che Truffle sia installato correttamente, `truffle version`digita un terminale. Se vedi un errore, assicurati che i moduli npm vengano aggiunti al tuo percorso.

## Creazione di un progetto {#creating-a-project}

### Progetto MetaCoin {#metacoin-project}

Utilizzeremo uno dei boilerplate di Truffle che puoi trovare sulla pagina [Truffle Boxes](https://trufflesuite.com/boxes/). [MetaCoin box](https://trufflesuite.com/boxes/metacoin/) crea un token che può essere trasferito tra gli account.

1. Inizia creando una nuova directory per questo progetto Truffle:

  ```bash
  mkdir MetaCoin
  cd MetaCoin
  ```

2. Scarica il box MetaCoin:

  ```bash
  truffle unbox metacoin
  ```

Con l'ultima fase, hai creato un progetto Truffle coinvolta le cartelle con contratti, distribuzione, test e file di configurazione.

Questi sono i dati dello smart contract dal file `metacoin.sol`:

```solidity title="metacoin.sol"
// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
```

:::note

ConvertLib viene importato subito dopo l'istruzione `pragma`. In questo progetto, ci sono in realtà due smart contract che verranno distribuiti alla fine: uno è Metacoin, che contiene tutta la logica di invio e bilanciamento; l'altro è ConvertLib, una libreria utilizzata per convertire i valori.

:::

### Testare il contratto {#testing-the-contract}

Puoi eseguire test Solidity e Javascript.

1. In un terminale, esegui il test Solidity:

  ```bash
  truffle test ./test/TestMetaCoin.sol
  ```

Dovresti vedere il seguente risultato:

![img](/img/truffle/test1.png)

2. Esegui il test JavaScript:

  ```bash
  truffle test ./test/metacoin.js
  ```

Dovresti vedere il seguente risultato:

![img](/img/truffle/test2.png)

### Compilare il contratto {#compiling-the-contract}

Compila lo smart contract utilizzando il seguente comando:

```bash
truffle compile
```

Vedrai il seguente risultato:

![img](/img/truffle/compile.png)

### Configurazione dello smart contract {#configuring-the-smart-contract}

Prima di procedere all'estinzione del contratto, è necessario impostare il file `truffle-config.js`, inserendo i dati della rete e dei compilatori.

Vai a `truffle-config.js`e aggiornare il file con i dettagli di rete Polygon Mumbai.

```js title="truffle-config.js"
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
        version: "0.8.13",
    }
  }
}
```

Si noti che richiede che mnemonic sia passato per `maticProvider`. Questa è la frase delle seme (o la chiave privata) per l'account da cui si desidera distribuire. Crea un nuovo file `.secret` nella directory principale e inserisci la tua frase mnemonica di 12 parole per iniziare. Per ottenere le parole delle seme dal wallet MetaMask, puoi andare alle impostazioni di MetaMask, quindi dal menu, scegliere **Sicurezza e Privacy** dove vedrai un pulsante che dice **di rivelare le parole di seme**.

### Distribuzione sulla Polygon Network {#deploying-on-polygon-network}

Aggiungi MATIC al tuo wallet utilizzando [Polygon Faucet](https://faucet.polygon.technology/). Successivamente, esegui questo comando nella cartella root della directory del progetto:

```
truffle compile
truffle deploy --network matic
```

![img](/img/truffle/deployed-contract.png)

:::note

Ricorda i tuoi `address`, `transaction_hash`e altri dettagli forniti differiscono. Quanto sopra è solo per dare un'idea della struttura.

:::

**Complimenti!  Hai implementato con successo uno Smart Contract utilizzando Truffle.** Ora puoi interagire con il contratto e anche verificarne lo stato di distribuzione su [Polygonscan](https://mumbai.polygonscan.com/).
