---
id: getting-started
title: Pont Plasmique
sidebar_label: Introduction
description: Interagir avec le pont plasmique et le Réseau de Polygone.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Veuillez consulter la dernière [documentation Matic.js sur Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/) pour commencer.

Un pont est essentiellement un ensemble de contrats qui aident à déplacer les actifs de la chaîne root vers la chaîne enfant. Il existe principalement deux ponts pour déplacer les actifs entre Ethereum et Polygone. Le premier est le pont Plasma et le second est appelé le **Pont PoS** ou **pont de Preuve d'Enjeu**
. **Le pont plasma** fournit des garanties de sécurité accrues dues au mécanisme de sortie Plasma.

Cependant, il existe certaines restrictions sur le jeton enfant et une période de retrait de 7-jours est associée à toutes les sorties/retraits de Polygone vers Ethereum sur le pont Plasmique. Le  [Pont PoS](/docs/develop/ethereum-polygon/pos/getting-started)  est plus flexible et permet des retraits plus rapides.

Ce tutoriel agira comme un guide étape par étape pour comprendre et utiliser le pont plasma à l'aide de [JS matique](https://github.com/maticnetwork/matic.js), qui est la façon la plus facile d'interagir avec le pont plasma sur le réseau Polygon.

## Flux d'actifs dans le Pont Plasmique {#assets-flow-in-plasma-bridge}

Dans ce tutoriel, nous allons présenter le flux des transferts d'actifs sur Polygone et comment vous pouvez faire de même en utilisant Matic.js:

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. Dépose des actifs cryptographiques dans le contrat Polygon sur la chaîne principale
2. Une fois que les jetons déposés seront confirmés sur la chaîne principale, les jetons correspondants seront reflétés sur la chaîne Polygon
   - L'utilisateur peut désormais transférer des jetons à qui ils veulent, instantanément et avec des frais négligeables. La chaîne de Polygone a des blocs plus rapides (environ 1 seconde). De cette façon, le transfert sera effectué presque instantanément.
3. Une fois qu'un utilisateur est prêt, il peut retirer les jetons restants de la chaîne principale. Le retrait des fonds est initié à partir de la Chaîne Latérale Plasmique. Un intervalle de point de contrôle de 5 minutes est défini, où tous les blocs de la couche de blocs de Polygone sont validés depuis le dernier point de contrôle.
4. Une fois que le point de contrôle est soumis au contrat Ethereum de la chaîne principale, un jeton NFT (ERC721) est créé de valeur équivalente.
5. Les fonds retirés peuvent être réclamés à votre compte Ethereum depuis le contrat de chaîne principal en utilisant une procédure de processus-sortie.
   - L'utilisateur peut également obtenir une sortie rapide via 0x ou Dharma (bientôt disponible!)

### Prérequis: {#prerequisites}

```
npm i @maticnetwork/maticjs-plasma

import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

### Robinet Görli {#görli-faucet}

Afin d'effectuer des transactions, vous aurez également besoin d'un peu d'Ether dans les comptes de test que vous utiliserez en suivant le tutoriel. Si vous n'avez pas d'ETH sur Görli, vous pouvez utiliser les liens du robinet donnés ici — https://goerli-faucet.slock.it/.

### Robinet de Polygon {#polygon-faucet}

Tout au long de ce tutoriel, nous utiliserons le jeton ERC20 `TEST`sur le réseau Görli comme un exemple. Il s'agit d'un jeton de TEST. Dans votre DApp, vous pouvez le remplacer par n'importe quel jeton ERC20. Pour obtenir des `TEST`jetons de Test sur le Réseau Polygone, vous pouvez accéder au [Robinet Polygone](https://faucet.polygon.technology/).

:::note

Pour utiliser vos propres jetons pour les dépôts et les retraits, vous devrez obtenir le jeton 'mapped', ce qui signifie essentiellement que les contrats sur la chaîne principale et le sidechain 'conscient' de votre jeton personnalisé.

:::

### Configuration de base du Porte-monnaie Métamasque (Facultatif) {#basic-setup-for-the-metamask-wallet-optional}

1. [Créez un portefeuille ](/docs/develop/metamask/hello): si vous êtes nouveau sur des portefeuilles, configurez un compte MetaMask.
2. [Configurez le testnet Polygon](/docs/develop/metamask/config-polygon-on-metamask): pour visualiser facilement le flux de fonds sur Polygon, il est instructif si vous configurez le testnet Polygon sur Metamask. Notez que nous utilisons Métamasque ici uniquement à des fins de visualisation. Ce n'est pas nécessaire d'utiliser Métamasque pour utiliser Polygone.
3. [Créer Plusieurs Comptes](/docs/develop/metamask/multiple-accounts): Avant de commencer avec le tutoriel, allez-y et préparez 3 comptes de test Ethereum.
4. [Configurer le jeton sur Polygone](/docs/develop/metamask/custom-tokens): Afin de visualiser facilement le flux de fonds sur le Polygone en utilisant Matic.js, vous pouvez configurer les jetons sur Métamasque. Le jeton, pris comme exemple pour ce `TEST`tutoriel, peut être configuré dans MetaMask de manière à visualiser facilement les soldes de compte. Notez encore que c'est **facultatif**. Vous pouvez très facilement interroger les soldes de jetons et d'autres variables en utilisant [web3.js](https://web3js.readthedocs.io/en/1.0/)
