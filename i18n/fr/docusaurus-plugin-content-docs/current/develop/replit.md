---
id: replit
title: Déployez un contrat intelligent à l'aide de Replit
sidebar_label: Using Replit
description: Déployez des contrats intelligents à l'aide de ReplitIDE sur Polygon
keywords:
  - docs
  - matic
  - replit
  - deploy
  - smart contract
  - polygon
  - IDE
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Aperçu {#overview}

[Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) est une plate-forme de codage qui vous permet d'écrire des codes et des applications hôtes. Replit prend en charge [le langage de programmation Solidity](https://replit.com/@replit/Solidity-starter-beta?v=1) et offre donc toutes les caractéristiques et fonctionnalités nécessaires aux développeurs Web3 pour créer et déployer des contrats intelligents.

Cet article vous guide pour construire et déployer un contrat intelligent de solidarité sur Polygon à l'aide [du modèle de développement Replit IDE et Replit Solidity (beta de démarrage de solidité)](https://replit.com/@replit/Solidity-starter-beta?v=1)[](https://replit.com/signup).

## Ce que vous allez faire {#what-you-will-do}

- Créez un compte Replit
- Créez un environnement Repl
- Déployez un exemple de projet sur le réseau Polygon Mumbai
- Vérifiez le contrat
- Publiez votre projet sur un profil Replit personnel.

:::tip

Pour obtenir des exemples supplémentaires sur Solidity with Replit, vous pouvez lire l'article <ins>**[Démarrez avec](https://blog.replit.com/solidity)**</ins> Replit ou vérifiez <ins>**[la documentation Replit Solidity et le didacticiel Escrow contrat](https://docs.replit.com/tutorials/33-escrow-contract-with-solidity)**</ins>.
:::

## Prérequis {#prerequisites}

Vous n'avez pas besoin d'aucune configuration d'environnement local pour déployer votre contrat intelligent solidité sur Polygon à l'aide de Replit.

Vous avez besoin d'un portefeuille web3 basé sur un navigateur pour interagir avec le Testnet de Polygon Mumbai et les contrats déployés. Si vous utilisez déjà MétaMasque, il est recommandé de créer un nouveau compte pour tester avec Replit. Vous pouvez le faire à partir du menu du compte, qui apparaît lorsque vous cliquez sur l'avatar du compte dans le coin supérieur droit de l'interface MétaMasque.

Vous devez configurer toutes les conditions préalables suivantes pour pouvoir déployer votre contrat intelligent de Solidity sur Polygon:

1. [Créez un compte Replit](https://replit.com/signup)
2. [Téléchargez le Portefeuille Métamasque](/docs/develop/metamask/hello)
3. [Configurez Polygone sur MétaMasque](/docs/develop/metamask/config-polygon-on-metamask)
4. [Obtenez les jetons de testnet](https://faucet.polygon.technology)

## Travailler avec une Repl {#working-with-a-repl}

Chaque Repl que vous créez est un environnement de développement et de production entièrement fonctionnel. Suivez les étapes pour créer un démarreur de solidité Replit:

1. [Connectez-vous](https://replit.com/login) ou [créez un compte](https://replit.com/signup). Après avoir créé votre [compte Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide), votre écran d'accueil inclura un tableau de bord où vous pouvez consulter, créer des projets et gérer votre compte.

![img](/img/replit/dashboard.png)

2. Une fois connecté, créez un repli de démarrage solidité, sélectionnez **+ Créer** un Repl dans le panneau gauche ou **+** dans le coin supérieur droit de l'écran.

![img](/img/replit/solidity.png)

3. Sélectionnez le modèle [**Solidity démarreur (beta)**](https://replit.com/@replit/Solidity-starter-beta?v=1) et donnez un titre à votre projet.

4. Cliquez sur **+ Créer un Repl** pour créer votre projet.

:::note

Le repl Démarreur Solidity est livré avec une interface conviviale pour le navigateur, construite à l'aide de <ins>**[l'API JavaScript Web3](https://web3js.readthedocs.io/en/v1.5.2/)**</ins> Ethereum, que vous pouvez utiliser pour déployer et interagir avec nos contrats. Nous déployerons sur le testnet de Replit, une version personnalisée de la blockchain Ethereum gérée par Replit et optimisée pour les tests.

:::

## Déployez sur Polygon {#deploy-on-polygon}

Assurez-vous d'avoir suivi la liste des **préalables** ci-dessus pour être prêt à déployer et à interagir avec votre contrat intelligent.

1. Cliquez sur **Exécuter** (au haut) pour installer tous les paquets pertinents et démarrer l'interface utilisateur de déploiement du contrat.

2. Connectez votre portefeuille MetaMask à l'interface Web et passez au [Mumbai Testnet](docs/develop/metamask/config-polygon-on-metamask).

![img](/img/replit/connect.png)

3. Cliquez sur **Connect**, sélectionnez votre compte, puis choisissez **Connect**.

![img](/img/replit/deploy-list.png)

4. Dans la liste déroulante, sélectionnez le contrat que vous souhaitez déployer. Cliquez sur **Déployer**.

5. Vous recevrez une fenêtre contextuelle MetaMask vous demandant de confirmer Approuvez la transaction depuis votre portefeuille pour déployer votre contrat.

## Votre contrat est en état de vérification et de test {#verifying-and-testing-your-contract}

Lorsque le contrat est déployé, [Naviguez vers Polyganscan](https://mumbai.polygonscan.com/) pour rechercher votre compte, visualiser votre contrat déployé et copier l'adresse de votre compte.

Une fois que votre contrat aura été déployé, il apparaîtra sous forme de cases extensibles sous la boîte déroulante. Développez-le et jetez un coup d'œil aux différentes fonctions disponibles. Vous pouvez maintenant interagir avec votre contrat en utilisant l'interface utilisateur fournie ou à partir d'une URL partageable affichée sur l'interface.

## Publiez sur Replit​ {#publish-to-replit}

Replit vous permet de publier vos projets sur un profil personnel. Une fois publiés, les projets apparaîtront sur votre page d'accueil pour que les autres puissent les explorer, interagir avec, les cloner et collaborer.

Suivez les étapes ci-dessous pour publier vos projets vers Replit:

1. Sélectionnez le titre du projet en haut de l'écran.
2. Remplissez le nom et la description de votre projet et cliquez sur **Publier**.
