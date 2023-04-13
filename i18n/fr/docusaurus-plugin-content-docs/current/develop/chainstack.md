---
id: chainstack
title: Déployez un contrat intelligent à l'aide de Chainstack et de Foundry
sidebar_label: Using Chainstack
description:  Utilisez Chainstack et Foundry pour développer un contrat intelligent sur Polygon
keywords:
  - docs
  - matic
  - polygon
  - build
  - deploy smart contract
  - chainstack
  - foundry
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Aperçu {#overview}

Cette section vous guide en déployant un contrat Hello World à l'aide de [Chainstack](https://chainstack.com/build-better-with-polygon/) et de [Foundry](https://github.com/gakonst/foundry/) sur le testnet Polygon Mumbai.

Chainstack fournit une infrastructure pour les applications basées sur Ethereum et d'autres blockchains. Ils maintiennent des nœuds et garantissent leur connexion au réseau et offrent également une interface pour interagir avec les réseaux principaux et les testnets.

Foundry est une boîte à outils rapide pour le développement d'applications Ethereum écrite en Rust. Il fournit des tests, des interactions avec des contrats intelligents EVM, des transactions et des données de blockchain.

:::tip

Si vous avez des questions, contactez le serveur [<ins>Discord</ins>](https://discord.com/invite/Cymtg2f7pX) Chainstack.

:::

## Ce que vous allez apprendre {#what-you-will-learn}

Créez un contrat Hello World, en utilisant Chainstack pour déployer un nœud de Polygone et Foundry afin de déployer le contrat.

## Ce que vous allez faire {#what-you-will-do}

1. Déployez un nœud de Polygone à l'aide de Chainstack
2. Configurez Foundry
3. Créez le contrat intelligent
4. Déployez le contrat intelligent.

## Déployez un nœud de Polygone Mumbai {#deploy-a-polygon-mumbai-node}

Vous avez besoin d'un nœud pour déployer un contrat intelligent sur le réseau blockchain. Suivez les étapes ci-dessous pour mettre votre nœud en marche :

**Étape 1 →** Inscrivez-vous avec [Chainstack](https://console.chainstack.com/user/account/create)

![img](/img/chainstack/sign-up.png)

**Étape 2 →** Suivez les instructions sur la façon de [déployer un nœud Mumbai](https://docs.chainstack.com/platform/join-a-public-network#join-a-polygon-pos-network)

![img](/img/chainstack/join-network.png)

**Étape 3 →** Obtenez le [point de terminaison HTTPS du nœud déployé](https://docs.chainstack.com/platform/view-node-access-and-credentials)

## Installez Foundry {#install-foundry}

Foundry est une boîte à outils de développement pour travailler avec des contrats intelligents. Pour commencer à travailler avec, vous devez d'abord installer le langage de codage Rust.

1. [Installez Rust](https://www.rust-lang.org/tools/install).
1. [Installez Foundry](https://github.com/gakonst/foundry/).

## Initialisez avec Foundry {#initialize-with-foundry}

Pour créer un projet standard, accédez à votre répertoire de travail et exécutez:

```
forge init PROJECT_NAME
// PROJECT_NAME - name of project
```

## Financez Votre Compte {#fund-your-account}

Vous aurez besoin d'un compte portefeuille pour déployer le contrat intelligent. Vous pouvez utiliser [Metamask](https://metamask.io/) pour cela. Vous devez également payer du gaz sur le réseau pour déployer le contrat. Copiez simplement votre adresse portefeuille et obtenez le jeton Mumbai MATIC [via le robinet](https://faucet.polygon.technology/).

## Créez le contrat Hello World {#create-the-hello-world-contract}

Dans le projet Foundry initialisé dans `src/`, créez `HelloWorld.sol`:

```
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

## Déployez le Contrat {#deploy-the-contract}

À ce stade, vous êtes prêt à déployer votre contrat:

* Vous disposez de votre propre nœud sur le réseau Polygon Mumbai à travers lequel vous déploierez le contrat.
* Vous avez Foundry que vous utiliserez pour déployer le contrat.
* Vous disposez d'un compte capitalisé qui déploiera le contrat.

Pour déployer le contrat, exécutez:

```bash
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

Ici,

* CONTRACT_PATH — chemin d'accès à votre `HelloWorld.sol`fichier.
* PRIVATE_KEY — la clé privée de votre compte.
* HTTPS_ENDPOINT — [le point de terminaison de votre nœud](https://docs.chainstack.com/platform/view-node-access-and-credentials).

Exemple:

```sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

:::tip

Vous pouvez toujours vérifier le déploiement du contrat sur [<ins>Mumbai Polygonscan</ins>](https://mumbai.polygonscan.com/) en utilisant l'identifiant nouvellement généré à partir de la dernière étape.

:::

## Testez le Contrat {#test-the-contract}

Il existe une commande `forge test`au cas où vous auriez besoin de vérifier si le contrat fonctionne correctement. Foundry fournit de nombreuses [options](https://book.getfoundry.sh/reference/forge/forge-test) (drapeaux) pour des tests plus spécifiques. En savoir plus sur l'écriture de tests, les tests avancés et d'autres fonctionnalités dans [la documentation de Foundry](https://book.getfoundry.sh/forge/tests).

**Félicitations! Vous avez déployé votre contrat intelligent Hello World sur Polygon.**

Voir également les documents Chainstack pour plus de [<ins>tutoriels</ins>](https://docs.chainstack.com/tutorials/polygon/) et [<ins>outils</ins>](https://docs.chainstack.com/operations/polygon/tools)concernant polygone.
