---
id: getting-started
title: Introduction à PoS de Polygon
sidebar_label: Quick Start
description: Créez votre prochaine application de blockchain sur Polygon.
keywords:
  - docs
  - matic
  - polygon
  - build on polygon
  - blockchain
  - introduction
  - how to launch dapp
  - dapps
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::caution Mise à Jour des documents de développement

Les documents sont mis à jour, enrichis et améliorés. Ils sont susceptibles d'être modifiés.
Si vous avez des questions ou des suggestions, n'hésitez pas à soulever un problème ou une demande de tirage.

:::

Bienvenue à **Polygon (anciennement réseau Matic)** ! La plate-forme la plus innovante et la plus passionnante pour développer votre application blockchain. La technologie blockchain est sur le point de révolutionner la façon dont le monde numérique gère les données et mène ses affaires. Vous pouvez rejoindre cette révolution en prenant une longueur d'avance sur le développement d'applications décentralisées (dApp) de Polygon.

Ce guide vous présentera l'écosystème de Polygon. Vous y trouverez des liens vers des ressources et des sites web utiles qui vous permettront de vous mettre à niveau en matière de construction, non seulement sur Polygon mais aussi sur le développement général d'applications blockchain.

:::tip Tenez-vous au courant

Suivez les dernières mises à jour sur les constructeurs de l'équipe de Polygon
et de la communauté en vous inscrivant sur les
[<ins>Groupes de notification Polygon</ins>](https://polygon.technology/notifications/).

:::

Polygon's Test Network which is called **Mumbai** connects with **Ethereum's Goërli Testnet.** All the network related details can be found in [network docs](/docs/operate/network).

## Principales caractéristiques de Polygon {#key-features-of-polygon}

- **Vitesse**: le réseau Polygon utilise une blockchain à haut débit avec consensus fourni par un groupe de producteurs de blocs sélectionnés par les parties prenantes à chaque point de contrôle. Une couche de preuve d'enjeu est utilisée pour valider les blocs et publier périodiquement les preuves des producteurs de blocs sur le réseau principal Ethereum. Cela permet d'obtenir des taux de confirmation de blocs rapides, de l'ordre de 2 secondes, tout en préservant un haut degré de décentralisation, ce qui se traduit par un excellent débit pour le réseau.
- **Scalabilité**: Polygon Network réalise une vitesse de transaction hypothétique de moins de 2 secondes sur un seul sidechain. L'utilisation de plusieurs chaînes latérales permet au réseau de traiter des millions de transactions par seconde. Ce mécanisme (déjà démontré dans la première chaîne latérale Matic) permet au réseau Polygon de se mettre à l'échelle facilement.
- **Sécurité **: les contrats intelligents de Polygon, reposent sur la sécurité d'Ethereum. Pour protéger le réseau, elle utilise trois modèles de sécurité essentiels. Elle utilise les **contrats de gestion de staking** d'Ethereum et un groupe de validateurs incités qui exploitent les nœuds **Heimdall** et **Bor**. Les développeurs peuvent également mettre en œuvre les deux modèles (hybrides) dans leur dApp.

## Construire sur Polygon {#building-on-polygon}

Si vous êtes un développeur Ethereum, vous êtes déjà un développeur Polygon. Il suffit de passer au [RPC de Polygon](https://polygon-rpc.com/) et de commencer. Tous les outils que vous connaissez sur la blockchain Ethereum sont pris en charge par défaut sur Polygon, comme Truffle, Remix et Web3js.

Vous pouvez déployer des applications décentralisées soit sur le Testnet Mumbai de Polygon soit sur le réseau principal. Le Testnet Mumbai de Polygon se connecte au Testnet Goërli d'Ethereum, qui opère comme son ParentChain. Vous pouvez trouver tous les détails relatifs au réseau dans la [documentation du réseau](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/network-details/network.md).

### Portefeuilles {#wallets}

Pour interagir avec le réseau Polygon, vous devez disposer d'un portefeuille basé sur Ethereum puisque Polygon fonctionne sur la machine virtuelle Ethereum (EVM). Vous pouvez choisir de mettre en place un porte-monnaie [Metamask](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/metamask/overview.md) ou [Arkane](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/wallets/arkane/intro_arkane.md). Plus d'informations relatives au portefeuille et pourquoi vous en avez besoin peuvent être trouvés dans notre [documentation de portefeuille](https://docs.polygon.technology/docs/develop/wallets/getting-started).

### Contrats intelligents {#smart-contracts}

Polygon prend en charge de nombreux services que vous pouvez utiliser pour tester, compiler, déboguer et déployer des applications décentralisées sur le réseau Polygon. Il s'agit notamment du déploiement en utilisant [Alchemy](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/alchemy.md), [Chainstack](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/chainstack.md), [QuickNode](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/quicknode.md), [Remix](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/remix.md), [Truffle](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/truffle.md), [Hardhat](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/hardhat.md) et [Replit](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/replit.md).

### Se connecter à Polygon {#connecting-to-polygon}

Vous pouvez ajouter Polygon à Metamask ou utiliser directement Arkane, qui vous permet de vous connecter à Polygon en utilisant [RPC](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/).

Afin de se connecter au réseau Polygon pour lire les informations de blockchain, nous vous recommandons d'utiliser le SDK Alchemy.

```js
// Javascript
// Setup: npm install alchemy-sdk
const { Alchemy, Network } = require("alchemy-sdk");

const settings = {
  apiKey: "demo", // Can replace with your API Key from https://www.alchemy.com
  network: Network.MATIC_MAINNET, // Can replace with MATIC_MUMBAI
};

const alchemy = new Alchemy(settings);

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

main();
```

### Construire une nouvelle dApp sur Polygon ? {#building-a-new-dapp-on-polygon}

Les applications décentralisées (dApps) servent de pont entre les utilisateurs et la confidentialité de leurs données sur la blockchain. Le nombre croissant de dApps valide leur utilité au sein de l'écosystème blockchain, en résolvant des défis tels que l'exécution de transactions entre deux participants sans avoir recours à une autorité centrale via des contrats intelligents.

Supposons que vous n'ayez aucune expérience préalable dans la création d'applications décentralisées (dApps). Dans ce cas, les ressources mentionnées ci-dessous vous donneront une longueur d'avance sur les outils nécessaires pour construire, déboguer et déployer des dApps sur le réseau Polygon.

- [dApp complète : Série de tutoriels](https://kauri.io/full-stack-dapp-tutorial-series/5b8e401ee727370001c942e3/c)
- [Web3.js](https://www.dappuniversity.com/articles/web3-js-intro)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Remix](https://docs.polygon.technology/docs/develop/remix/)
- [Truffe](https://docs.polygon.technology/docs/develop/truffle)
- [Metamask](https://docs.polygon.technology/docs/develop/metamask/overview)
- [Arkane](https://docs.polygon.technology/docs/develop/wallets/arkane/intro)
- [Développer une dApp en utilisant Fauna, Polygon et React](https://docs.polygon.technology/docs/develop/dapp-fauna-polygon-react)

### Vous avez déjà une dApp ? {#already-have-a-dapp}

Si vous avez déjà une application décentralisée (dApp) et que vous recherchez une plate-forme pour vous aider à mettre à l'échelle efficacement, vous êtes au bon endroit, car Polygon vous permet de :

1. **Migrer facilement de la chaîne basée sur la machine virtuelle Ethereum (EVM)** : Polygon est fière d'être la solution ultime de mise à l'échelle de la couche-2 pour Ethereum. Vous n'avez pas à vous soucier de l'architecture sous-jacente lorsque vous déplacez ou déployez vos dApps sur le réseau Polygon, tant qu'elle est compatible avec les EVM.
2. **Utilisez Polygon comme une couche de transaction plus rapide** : le déploiement de votre dApp sur le réseau principal Polygon vous permet d'utiliser Polygon comme une couche de transaction plus rapide pour votre dApp. En outre, vous pouvez obtenir vos jetons cartographiés par nos soins. Vous pouvez rejoindre notre [groupe de discussion technique](http://bit.ly/matic-technical-group) sur Telegram pour en savoir plus.

## Note complémentaire {#side-note}

Si cela vous dépasse, ce n'est pas grave ! Vous pouvez passer directement à l'action et commencer à pirater. Voici quelques remarques avant de commencer à explorer les ressources, les référentiels et les documents :

1. **Faites attention au prix à payer pour être à l'avant-garde** : comme la programmation de niche typique, le développement des dApps et de la blockchain évolue très rapidement. Au cours de vos recherches, vous pouvez trouver des dépôts de code complexes, des pages 404 sur un site de documentation ou même aucune documentation. Profitez de cette occasion pour nous contacter via un canal de médias sociaux.
2. **La courbe d'apprentissage peut être décourageante, mais la barrière à l'entrée est faible** : la communauté est très ouverte et accueillante ! Les projets accueillent volontiers les demandes de tirage provenant de l'extérieur et résolvent activement les éventuels blocages. Nous travaillons à la création d'un monde meilleur et toute forme de contribution est appréciée. Nous serons heureux de vous accueillir dans ce formidable écosystème Web3.

:::info Restez à jour

Le développement d'applications décentralisées encourage la décentralisation du réseau. Suivez nos comptes de réseaux sociaux pour obtenir plus d'informations et de mises à jour sur l'écosystème Polygon. Vous pouvez trouver les liens vers toutes les communautés Polygon [ici](https://polygon.technology/community/).

:::
