---
id: hardhat
title: Déployez un contrat intelligent à l'aide de Hardhat
sidebar_label: Using Hardhat
description: Utilisez Hardhat pour déployer un contrat intelligent sur Polygon
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contracts
  - hardhat
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Aperçu {#overview}

Hardhat est un environnement de développement Ethereum qui fournit un moyen facile de déployer des contrats intelligents, exécuter des tests et déboguer le code de solidarité localement.

Dans ce tutoriel, vous apprendrez à configurer Hardhat et à l'utiliser pour construire, tester et déployer un simple contrat intelligent.

### Ce que vous allez faire {#what-you-will-do}

- Configurez Hardhat
- Créez un contrat intelligent simple
- Compilez le contrat
- Contrat de test
- Déployez le contrat

## Configuration de l'environnement de développement {#setting-up-the-development-environment}

Il y a quelques exigences techniques avant de commencer. Veuillez installer les éléments suivants:

- [Node.js v10+ LTS et npm1](https://nodejs.org/en/) (vient avec Noeud)
- [Git](https://git-scm.com/)

`npm init`Une fois ces éléments installés, vous devez créer un projet npm en allant dans un dossier vide, en exécutant et en suivant ses instructions pour installer Hardhat. Une fois que votre projet est prêt, vous devez le lancer:

```bash
npm install --save-dev hardhat
```

Pour créer votre projet Hardhat, lancez `npx hardhat`dans votre dossier de projet. Créons le projet d'exemple et suivons ces étapes pour essayer une tâche d'exemple et compiler, tester et déployer le contrat d'exemple.

:::note

L'exemple de projet utilisé ici provient du [<ins>guide Hardhat Quickstart</ins>](https://hardhat.org/getting-started/#quick-start), ainsi que de ses instructions.

:::

## Créer un projet {#creating-a-project}

Pour créer un modèle de projet, lancez  `npx hardhat`dans votre dossier de projet. Vous devriez voir ceci tout de suite:

![img](/img/hardhat/quickstart.png)

Choisissez le projet JavaScript et suivez les étapes suivantes pour compiler, tester et déployer le contrat modèle.

### Vérifier du contrat {#checking-the-contract}

Le `contracts`dossier contient `Lock.sol`, qui est un exemple de contrat qui comporte un simple verrou numérique, où les utilisateurs ne peuvent retirer des fonds qu'après un certain nombre de temps.

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
```

### Configuration du contrat {#setting-up-the-contract}

- Aller sur `hardhat.config.js`
- Mettre à jour le `hardhat-config`avec matic-network-credentials
- Créez un `.env`fichier à la root pour stocker votre clé privée.
- Ajoutez la clé API de Polygonscan au `.env`fichier pour vérifier le contrat sur Polygonscan. Vous pouvez générer une clé API en [créant un compte](https://polygonscan.com/register)

```js
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

:::note

Notez que le fichier ci-dessus nécessite DOTENV, pour la gestion des variables d'environnement ainsi que ethers et etherscan. Assurez-vous d'installer tous ces paquets.

Vous trouverez plus d'instructions sur la façon d'utiliser DOTENV sur [<ins>cette page</ins>](https://www.npmjs.com/package/dotenv).

Vous pouvez déployer sur MATIC(Polygon mainnet) si vous changez polygon_mumbai par MATIC

:::

### Compilation du contrat {#compiling-the-contract}

Pour compiler le contrat, vous devez d'abord installer Hardhat Toolbox :

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Ensuite, il suffit de lancer pour compiler:

```bash
npx hardhat compile
```

### Tester le Contrat {#testing-the-contract}

Pour lancer des tests avec Hardhat, il suffit de taper ce qui suit:

```bash
npx hardhat test
```

Et c'est un résultat attendu:

![img](/img/hardhat/test.png)

### Déployer sur le réseau Polygon {#deploying-on-polygon-network}

Lancez cette commande dans la root du répertoire du projet:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

Le contrat sera déployé sur le Mumbai Testnet de Matic, et vous pouvez vérifier le statut du déploiement ici : https://mumbai.polygonscan.com/.

**Félicitations! Vous avez déployé avec succès le Contrat Intelligent Greeter. Vous pouvez maintenant interagir avec le Contrat Intelligent.**

:::tip Vérifier rapidement les contrats sur Polygonscan

Exécutez les commandes suivantes pour vérifier rapidement votre contrat sur Polygonscan. Ainsi, il est facile pour quiconque de voir le code source de votre contrat déployé. Pour les contrats qui ont un constructeur avec une liste d'arguments complexe, voir [ici](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html).

```bash
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat verify --network polygon_mumbai 0x4b75233D4FacbAa94264930aC26f9983e50C11AF
```
:::
