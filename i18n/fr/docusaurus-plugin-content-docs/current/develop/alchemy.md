---
id: alchemy
title: Déployez un contrat intelligent à l'aide d'Alchemy
sidebar_label: Using Alchemy
description: Guide pour déployer des contrats intelligents à l'aide d'Alchemy
keywords:
  - docs
  - matic
  - polygon
  - alchemy
  - create smart contract
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Aperçu {#overview}

Ce tutoriel est destiné aux développeurs qui sont nouveaux dans le développement de la blockchain Ethereum ou qui souhaitent comprendre les principes fondamentaux du déploiement et de l'interaction avec les contrats intelligents. Il vous guidera à travers la création et le déploiement d'un contrat intelligent sur le réseau de test Polygon Mumbai à l'aide d'un portefeuille crypto-monnaie ([Metamask](https://metamask.io)), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) et [Alchemy](https://alchemy.com/?a=polygon-docs).

:::tip

Si vous avez des questions ou des préoccupations, veuillez contacter l'équipe Alchemy via leur serveur [<ins>Discord</ins>](https://discord.gg/gWuC7zB) officiel.

:::

## Ce que vous allez apprendre {#what-you-will-learn}

Pour créer un contrat intelligent dans ce tutoriel, vous apprendrez à utiliser la plateforme d'Alchimie pour:
- Créez une application de contrat intelligente
- Vérifiez le solde d'un portefeuille
- Vérifiez les appels de contrats dans un explorateur de blockchain

## Ce que vous allez faire {#what-you-will-do}

Suivant le tutoriel, vous allez:
1. Commencez à créer une application sur Alchemy
2. Créez une adresse de portefeuille avec Métamasque
3. Ajoutez un solde au portefeuille (à l'aide de jetons de test)
4. Utilisez Hardhat et Ethers.js pour compiler et déployer le projet
5. Vérifiez l'état du contrat sur la plateforme Alchemy

## Créez et déployez votre contrat intelligent {#create-and-deploy-your-smart-contract}

### Connectez-vous au réseau Polygon {#connect-to-the-polygon-network}

Il existe plusieurs façons d'adresser des requêtes sur la chaîne Polygon PoS. Plutôt que d'exécuter votre propre nœud, vous utiliserez un compte gratuit sur la plateforme de développement d'Alchemy et interagirez avec l'API Alchemy Polygon PoS pour communiquer avec la chaîne Polygon PoS. La plateforme se compose d'une suite complète d'outils développeurs – cela inclut la possibilité de surveiller les demandes, l'analyse de données qui démontre ce qui se passe sous la capuche pendant le déploiement de contrats intelligents, les API améliorées (Transact, NFT, etc), et un SDK ethers.js.

Si vous n'avez pas encore de compte Alchemy, commencez par vous inscrire à un compte gratuit [ici](https://www.alchemy.com/polygon/?a=polygon-docs). Après avoir créé votre compte, vous avez la possibilité de créer immédiatement votre première application avant d'accéder au tableau de bord.

![img](/img/alchemy/alchemy-dashboard.png)

### Créez votre application (et la clé API) {#create-your-app-and-api-key}

Après avoir réussi à créer un compte Alchemy, vous devrez générer une clé API en créant une application. Cela authentifie les demandes faites au testnet Polygon Mumbai. Si vous n'êtes pas familier avec les testnets, consultez [ce guide de testnet](https://docs.alchemyapi.io/guides/choosing-a-network).

Pour générer une nouvelle clé API, accédez à l'onglet **Applications** sur la barre de navigation du tableau de bord Alchemy et sélectionnez le sous-onglet **Créer une** application.

![img](/img/alchemy/create-app.png)

Nommez votre nouvelle application **Bonjour World**, offrez une courte description, sélectionnez **Polygon** pour la chaîne, et choisissez **Polygon Mumbai** pour votre réseau.

Enfin, cliquez sur **Créer une** application. Votre nouvelle application devrait apparaître dans le tableau ci-dessous.

### Créez une adresse Wallet {#create-a-wallet-address}

Polygon PoS est une solution d'échelle de couche 2 pour Ethereum. Par conséquent, nous avons besoin d'un portefeuille Ethereum et d'ajouter une URL Polygon personnalisée pour envoyer et recevoir des transactions sur le testnet Polygon Mumbai. Pour ce tutoriel, nous utiliserons MetaMask, un portefeuille cryptocurrency compatible avec le navigateur utilisé pour gérer votre adresse de portefeuille. Si vous souhaitez en savoir plus sur le fonctionnement des transactions sur Ethereum, consultez [ce guide des transactions](https://ethereum.org/en/developers/docs/transactions/) fait par la Fondation Ethereum.

Pour obtenir votre URL Polygon RPC personnalisée à partir d'Alchemy, accédez à votre application **Hello World** dans votre tableau de bord Alchemy et cliquez sur **Afficher la clé** dans le coin supérieur droit. Ensuite, continuez et copiez votre clé API HTTP Alchemy.

![img](/img/alchemy/view-key.png)

Vous pouvez télécharger et créer un compte Métamasque gratuitement [ici](https://metamask.io/download.html). Une fois que vous avez créé un compte, suivez les étapes suivantes pour configurer le réseau Polygon PoS sur votre portefeuille.

1. Sélectionnez **les paramètres** dans le menu déroulant dans le coin supérieur droit de votre portefeuille MetaMask.
2. Sélectionnez **les réseaux** dans le menu à gauche.
3. Connectez votre portefeuille au Mumbai Testnet en utilisant les paramètres suivants:

**Nom du réseau:** Polygon Mumbai Testnet

**Nouvelle URL RPC:** https://polygon-mumbai.g.alchemy.com/v2/your-api-key

**ID de chaîne:** 80001

**Symbol:** MATIC

**URL d'Explorateur de blocs:** https://mumbai.polygonscan.com/


### Ajouter Polygon Mumbai Test MATIC {#add-polygon-mumbai-test-matic}

Vous aurez besoin de quelques jetons testnet pour déployer votre contrat intelligent sur le testnet Mumbai. Pour obtenir des jetons testnet, rendez-vous sur le [robinet Polygon](https://faucet.polygon.technology/) **Mumbai**, sélectionnez Mumbai, sélectionnez **jeton MATIC** et entrez votre adresse portefeuille Polygon, puis cliquez sur **Soumettre**. En raison du trafic réseau, il peut prendre un certain temps pour recevoir vos jetons testnet.

Vous pouvez également utiliser le [robinet Mumbai gratuit](https://mumbaifaucet.com/?a=polygon-docs) d'Alchemy.

![img](/img/alchemy/faucet.png)

Vous verrez les jetons testnet dans votre compte MétaMasque peu de temps après.

### Vérifiez votre solde portefeuille {#check-your-wallet-balance}

Pour revérifier que notre solde est là, adressons une requête [eth\_getBalance](https://docs.alchemy.com/reference/eth-getbalance-polygon) à l'aide de [l'outil de composition d'Alchemy](https://composer.alchemyapi.io/). Sélectionnez **Polygon** comme chaîne, **Polygon Mumbai** comme réseau, `eth_getBalance`comme méthode et saisissez votre adresse. Cela renverra le montant de MATIC dans notre portefeuille. Regardez [cette vidéo](https://youtu.be/r6sjRxBZJuU) pour voir les instructions relatives à l'utilisation de l'outil de composition.

![img](/img/alchemy/get-balance.png)

Après avoir entré votre adresse de compte MetaMask et cliquez sur **Envoyer la demande**, vous devriez voir une réponse qui ressemble à cela:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

:::info

Ce résultat est en Wei, pas en ETH. Wei est la plus petite dénomination d'Ether. La conversion de Wei en Ether est: 1 Ether = 10^18 Wei. Donc, si nous convertissons « 0xde0b6b3a7640000 » en décimal, nous obtenons 1\*10^18, ce qui équivaut à 1 ETH. Cela peut être cartographié à 1 MATIQUE en fonction de la dénomination.

:::

### Initialisez votre projet {#initialize-your-project}

Tout d'abord, nous devrons créer un dossier pour notre projet. Accédez à votre [ligne de commande](https://www.computerhope.com/jargon/c/commandi.htm) et tapez:

```bash
mkdir hello-world
cd hello-world
```

Maintenant que nous sommes dans notre dossier de projet, nous allons utiliser `npm init`pour initialiser le projet. Si vous n'avez pas déjà installé npm, suivez [ces instructions](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (nous aurons également besoin de Node.js, alors téléchargez-le aussi!).

```bash
npm init # (or npm init --yes)
```

Peu importe la façon dont vous répondez aux questions d'installation, voici comment nous l'avons fait, pour servir de référence:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{   
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Approuver le package.json et nous serons prêts à démarrer!

### Télécharger [Hardhat](https://hardhat.org/getting-started/#overview)

Hardhat est un environnement de développement pour compiler, déployer, tester et déboguer votre logiciel Ethereum. Cela aide les développeurs à créer des contrats intelligents et des dApps localement avant de les déployer sur la chaîne en direct.

Dans notre projet, `hello-world`exécutez :

```bash
npm install --save-dev hardhat
```

Consultez cette page pour plus de détails sur les [instructions d'installation](https://hardhat.org/getting-started/#overview).

### Créer un projet Hardhat {#create-hardhat-project}

Dans notre `hello-world` dossier de projet, exécutez:

```bash
npx hardhat
```

Vous devriez voir un message de bienvenue et une option pour sélectionner ce que vous voulez faire. Sélectionnez **créer un hardhat.config.js vide**:

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Cela générera un `hardhat.config.js`fichier pour nous, c'est-à-dire que nous allons spécifier tous les paramètres nécessaires pour notre projet.

### Ajoutez des dossiers projets {#add-project-folders}

Pour garder notre projet organisé, nous allons créer deux nouveaux dossiers. Accédez au répertoire root de votre `hello-world` projet dans votre ligne de commande et tapez:

```bash
mkdir contracts
mkdir scripts
```

* `contracts/` est l'endroit où nous conserverons notre fichier de code pour les contrats intelligents hello world
* `scripts/` est l'endroit où nous conserverons les scénarios pour déployer et interagir avec notre contrat

### Écrire le contrat {#write-the-contract}

Ouvrez le projet **hello-world** dans votre éditeur préféré, tel que [VSCode](https://code.visualstudio.com). Les contrats intelligents sont écrits dans une langue appelée Solidity, ce qui est ce que nous allons utiliser pour écrire notre contrat `HelloWorld.sol`intelligent.

1. Naviguez vers le `contracts`dossier et créez un nouveau fichier appelé`HelloWorld.sol`
2. Vous trouverez ci-dessous un exemple de contrat intelligent Hello World de la part de [Fondation Ethereum](https://ethereum.org/en/) que nous utiliserons pour ce tutoriel. Copiez et collez le contenu ci-dessous dans votre fichier `HelloWorld.sol`, et assurez-vous de lire les commentaires pour comprendre ce que fait ce contrat:

```solidity
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Il s'agit d'un contrat intelligent super simple qui stocke un message lors de la création et peut être mis à jour en appelant la fonction `update`.

### Connectez-vous avec MetaMask & Alchemy {#connect-with-metamask-alchemy}

Nous avons créé un portefeuille Métamasque, un compte Alchemy et rédigé notre contrat intelligent, il est maintenant temps de connecter les trois.

Chaque transaction envoyée depuis votre portefeuille virtuel nécessite une signature utilisant votre clé privée unique. Pour fournir cette autorisation à notre programme, nous pouvons stocker en toute sécurité notre clé privée (et la clé API Alchemy) dans un fichier d'environnement.

Tout d'abord, installez le package dotenv dans votre répertoire de projet:

```bash
npm install dotenv --save
```

Ensuite, créez un fichier `.env`dans le répertoire racine de notre projet et ajoutez-y votre clé privée Métamasque et l'URL de l'API HTTP Alchemy.

:::warning Avertissement

Votre fichier d'environnement doit être nommé `.env`ou il ne sera pas reconnu comme un fichier d'environnement. Ne le nommez pas `process.env`ou  `.env-custom`ou quoi que ce soit d'autre.

Aussi, si vous utilisez un système de contrôle de version comme git pour gérer votre projet, veuillez **NE PAS** suivre le `.env`fichier. Ajoutez `.env`à votre `.gitignore`fichier pour éviter de publier des données secrètes.

:::

* Suivez [ces instructions](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) pour exporter votre clé privée
* Pour obtenir votre clé d'API HTTP Alchemy (URL RPC), accédez à votre application **Hello World** sur le tableau de bord de votre compte et cliquez sur **la clé de vue** dans le coin supérieur droit.

Votre `.env`devrait ressembler à ceci:

```
API_URL = "https://polygon-mumbai.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Pour les connecter réellement à notre code, nous ferons référence à ces variables dans notre `hardhat.config.js`fichier plus tard dans ce tutoriel.

### Installez Ethers.js {#install-ethers-js}

Ethers.js est une bibliothèque qui facilite l'interaction et l'envoi de requêtes vers Ethereum en enveloppant [les méthodes standards JSON-RPC](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) avec des méthodes plus conviviales.

Hardhat facilite l'intégration de [plugins](https://hardhat.org/plugins/) pour des outils supplémentaires et des fonctionnalités étendues. Nous profiterons du [plugin Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) pour le déploiement de contrats. [Ethers.js](https://github.com/ethers-io/ethers.js/) propose des méthodes de déploiement de contrat utiles.

Dans le répertoire de votre projet, tapez :

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Nous aurons également besoin d'ethers dans notre `hardhat.config.js`dans la prochaine étape.

### Mettre à jour hardhat.config.js {#update-hardhat-config-js}

Jusqu'à présent, nous avons ajouté plusieurs dépendances et plugins. Maintenant, nous devons mettre à jour `hardhat.config.js`pour que notre projet reconnaisse ces dépendances.

Mettez à jour votre `hardhat.config.js`pour qu'il ressemble à ceci:

```javascript
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

### Préparez notre contrat intelligent {#compile-our-smart-contract}

Pour nous assurer que tout fonctionne jusqu'à présent, compilons notre contrat. La tâche `compile`est l'une des tâches de casque intégrées.

À partir de la ligne de commande, exécutez:

```bash
npx hardhat compile
```

Vous pouvez obtenir un avertissement sur `SPDX license identifier not provided in source file`, mais l'application pourrait toujours fonctionner correctement. Sinon, vous pouvez toujours envoyer un message dans le [Alchemy discord](https://discord.gg/u72VCg3).

### Écrire notre script de déploiement {#write-our-deploy-script}

Maintenant que notre contrat est écrit et que notre fichier de configuration est prêt, il est temps d'écrire notre script de déploiement de contrat.

Accédez au `scripts/`dossier et créez un nouveau fichier appelé `deploy.js`, en y ajoutant le contenu suivant:

```javascript
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");   
   console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Nous avons adopté les explications de l'équipe Hardhat sur ce que fait chacune de ces lignes de code à partir de leur [tutoriel sur les Contrats](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) ici.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Un `ContractFactory`dans ethers.js est une abstraction utilisée pour déployer de nouveaux contrats intelligents, alors `HelloWorld` voici une [ usine ](https://en.wikipedia.org/wiki/Factory\_\(object-oriented\_programming\)) pour les instances de notre contrat Hello world. Lorsque vous utilisez le `hardhat-ethers`plugin `ContractFactory` et `Contract`, des instances sont connectées au premier signataire (propriétaire) par défaut.

```javascript
const hello_world = await HelloWorld.deploy();
```

L'appel de `deploy()`sur un `ContractFactory` enclenchera le déploiement, et renverra un`Promise` qui se résout en un `Contract` objet. C'est l'objet qui a une méthode pour chacune de nos fonctions de contrat intelligent.

### Déployez notre contrat intelligent {#deploy-our-smart-contract}

Accédez à la ligne de commande et exécutez:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

Vous devriez voir quelque chose comme cela:

```bash
Contract deployed to address: 0x3d94af870ED272Cd5370e4135F9B2Bd0e311d65D
```

Si nous allons à [l'explorateur Polygon Mumbai](https://mumbai.polygonscan.com/) et recherchons notre adresse contrat, nous devrions être en mesure de voir qu'elle a été déployée avec succès.

L'adresse doit correspondre à votre adresse de compte MetaMask et `From``To`l'adresse indiquera **la création de Contrats.** Mais si nous cliquons sur la transaction, nous verrons notre adresse de contrat dans le `To`champ.

![img](/img/alchemy/polygon-scan.png)

### Vérifiez le contrat {#verify-the-contract}

Alchemy fournit un [explorateur](https://dashboard.alchemyapi.io/explorer) où vous pouvez trouver des informations sur les méthodes déployées avec le contrat intelligent, comme le temps de réponse, l'état HTTP, les codes d'erreur entre autres. C'est un bon environnement pour vérifier votre contrat et vérifier si les transactions ont abouti.

![img](/img/alchemy/calls.png)

**Félicitations! Vous venez de déployer un contrat intelligent sur le réseau Polygon Mumbai.**

## Ressources Supplémentaires {#additional-resources}

- [Comment développer un contrat intelligent NFT](https://docs.alchemy.com/docs/how-to-develop-an-nft-smart-contract-erc721-with-alchemy) – Alchemy a un tutoriel écrit avec une vidéo Youtube sur ce sujet. Ceci est la semaine 1 de sa série dev gratuite 10 semaines **Road to Web3**
- [Quickstart API Polygon](https://docs.alchemy.com/reference/polygon-api-quickstart) – le guide des docs développeurs d'Alchemy pour se lever et fonctionner avec Polygon
