---
id: truffle
title: Déployez un contrat intelligent à l'aide de Truffle
sidebar_label: Using Truffle
description:  Utilisez Truffle pour déployer un contrat intelligent sur Polygon
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

## Aperçu {#overview}

[Truffle](https://trufflesuite.com/) est un environnement de développement de blockchain, que vous pouvez utiliser pour créer et tester des contrats intelligents en exploitant la machine virtuelle Ethereum. Ce guide a pour but d'apprendre à créer un contrat intelligent à l'aide de Truffle et de le déployer sur le réseau Polygon compatible EVM.

:::note

Ce tutoriel est une version adaptée de l'article [<ins>guide de démarrage rapide</ins>](https://www.trufflesuite.com/docs/truffle/quickstart) Truffle.

:::

## Ce que vous allez faire {#what-you-will-do}

- Installer et configurer Truffle
- Déployez un contrat sur Polygon Network
- Vérifiez l'état du déploiement sur Polygonscan

## Prérequis {#prerequisites}

Il y a quelques exigences techniques avant de commencer. Veuillez installer les éléments suivants:

- [Node.js v8+ LTS et npm](https://nodejs.org/en/) (emballés avec nœud)
- [Git](https://git-scm.com/)

Une fois que nous les avons installés, nous n'avons besoin que d'une seule commande pour installer Truffle :

```
npm install -g truffle
```

Pour vérifier que la Truffle est installée correctement, tapez `truffle version`sur un terminal. Si vous voyez une erreur, assurez-vous que les modules npm sont ajoutés à votre chemin.

## Créer un projet {#creating-a-project}

### Projet MetaCoin {#metacoin-project}

Nous utiliserons l'un des modèles de chaudière de Truffle que vous pouvez trouver sur leur page [Cases Truffle](https://trufflesuite.com/boxes/). [MetaCoin box](https://trufflesuite.com/boxes/metacoin/) crée un jeton qui peut être transféré entre comptes.

1. Commencez par créer un nouveau répertoire pour ce projet Truffle :

  ```bash
  mkdir MetaCoin
  cd MetaCoin
  ```

2. Téléchargez MetaCoin box :

  ```bash
  truffle unbox metacoin
  ```

Avec cette dernière étape, vous avez créé un projet Truffle cointaining des dossiers avec des contrats, des déploiements, des tests et des fichiers de configuration.

Ce sont les données du contrat intelligent du fichier `metacoin.sol` :

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

Remarquez que ConvertLib est importé juste après la déclaration `pragma`. Dans ce projet, il y a en fait deux contrats intelligents qui seront déployés à la fin : l'un est Metacoin, qui contient toute la logique d'envoi et de solde ; l'autre est ConvertLib, une bibliothèque utilisée pour convertir les valeurs.

:::

### Tester le Contrat {#testing-the-contract}

Vous pouvez exécuter des tests Solidity et Javascript.

1. Dans un terminal, exécutez le test Solidity :

  ```bash
  truffle test ./test/TestMetaCoin.sol
  ```

Vous devriez voir la sortie suivante:

![img](/img/truffle/test1.png)

2. Exécutez le test JavaScript :

  ```bash
  truffle test ./test/metacoin.js
  ```

Vous devriez voir la sortie suivante:

![img](/img/truffle/test2.png)

### Compilation du contrat {#compiling-the-contract}

Comprenez le contrat intelligent à l'aide de la commande suivante:

```bash
truffle compile
```

Vous verrez le résultat suivant :

![img](/img/truffle/compile.png)

### Configuration du contrat intelligent {#configuring-the-smart-contract}

Avant de déployer réellement le contrat, vous devez configurer le fichier `truffle-config.js`, en insérant les données du réseau et des compilateurs.

Allez `truffle-config.js`et mettez à jour le fichier avec les détails du réseau Polygon Mumbai.

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

Notez qu'il nécessite que mnemonic soit transmis pour `maticProvider`. Il s'agit de la phrase de seed (ou la clé privée) pour le compte à partir duquel vous souhaitez déployer. Créez un nouveau fichier `.secret` dans le répertoire root et entrez votre phrase de démarrage mnémonique de 12 mots pour commencer. Pour obtenir les mots de graines à partir du portefeuille MetaMask, vous pouvez aller aux paramètres MetaMask, puis dans le menu, choisissez **Sécurité et confidentialité** où vous verrez un bouton qui indique révéler des **mots de graines**.

### Déployer sur le réseau Polygon {#deploying-on-polygon-network}

Ajoutez MATIC à votre portefeuille à l'aide du [robinet Polygon](https://faucet.polygon.technology/). Ensuite, exécutez cette commande dans le dossier racine du répertoire projet:

```
truffle compile
truffle deploy --network matic
```

![img](/img/truffle/deployed-contract.png)

:::note

N'oubliez pas votre `address`, `transaction_hash`et d'autres détails fournis différent. Ce qui précède est pour donner une idée de la structure.

:::

**Félicitations !  Vous avez déployé avec succès un contrat intelligent à l'aide de Truffle.** Maintenant, vous pouvez interagir avec le contrat et vérifier son statut de déploiement sur [Polygonscan](https://mumbai.polygonscan.com/).
