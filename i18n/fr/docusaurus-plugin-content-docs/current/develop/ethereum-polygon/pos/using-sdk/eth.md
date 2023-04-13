---
id: eth
title: Guide des dépôts et des retraits d'ETH
sidebar_label: ETH
description: "Déposez et retirez des jetons ETH sur le réseau Polygon."
keywords:
  - docs
  - matic
  - ether
  - withdraw
  - deposit
image: https://matic.network/banners/matic-network-16x9.png
---

Consultez la dernière [documentation de Matic.js sur ETH](https://maticnetwork.github.io/matic.js/docs/pos/deposit-ether/).

## Résumé {#quick-summary}

Cette section des documents explique comment déposer et retirer des jetons ERC20 sur le réseau Polygon. Des fonctions communes existent entre les sections ETH, ERC20, ERC721 et ERC1155 des documents, avec des variations dans la dénomination et les modèles d'implémentation, comme il convient aux normes. La condition préalable la plus importante à l'utilisation de cette section des documents est la cartographie de vos actifs, alors veuillez envoyer votre demande de cartographie [ici](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/).

## Introduction {#introduction}

Ce guide utilise le Testnet Polygon (Mumbai) qui est lui-même cartographié au réseau Goerli pour démontrer le transfert d'actifs entre les deux blockchains. C'est important de noter que pour les besoins de ce tutoriel, vous devez utiliser une adresse proxy chaque fois que cela est possible. En effet, alors que l'adresse du contrat de mise en œuvre est susceptible de changer lorsqu'une nouvelle mise à jour est ajoutée au code du contrat, le proxy ne change jamais et redirige tous les appels entrants vers la dernière mise en œuvre. En substance, si vous utilisez l'adresse proxy, vous n'aurez pas à vous soucier des changements qui pourraient intervenir dans le contrat de mise en œuvre avant que vous ne soyez prêt.

Par exemple, veuillez utiliser `RootChainManagerProxy`l'adresse pour les interactions au lieu de `RootChainManager`l'adresse. Les détails de déploiement comme les adresses de contrat PoS, ABI et les adresses jetons de test peuvent être trouvés [ici](/docs/develop/ethereum-polygon/pos/deployment/).

La cartographie de vos actifs est une étape nécessaire pour intégrer le pont PoS sur votre application. Si vous ne l'avez pas encore fait, veuillez envoyer une demande de cartographie [ici](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/). Pour les besoins de ce tutoriel, l'équipe a déployé des jetons de test et les a cartographiés sur le pont PoS. Demandez l'actif que vous voulez utiliser sur le [robinet](https://faucet.polygon.technology/) et si les jetons de test ne sont pas disponibles, contactez l'équipe sur [Discord](https://discord.com/invite/0xPolygon). Nous ferons en sorte de vous répondre immédiatement.

Dans le prochain tutoriel, chaque étape sera expliquée en détail et accompagnée de quelques extraits de code. Cependant, vous pouvez toujours vous référer à ce [référentiel](https://github.com/maticnetwork/matic.js/tree/master/examples) qui contient tous les **exemples de code source** qui peuvent vous aider à intégrer et à comprendre le fonctionnement du pont PoS.

## Flux de haut niveau {#high-level-flow}

Déposer des ETH -

1. Faites un appel **_depositEtherFor_** sur **_RootChainManager_** et **envoyez **l'éther requis.

Retirer des ETH -

1. **_Brûler_** des jetons sur la chaîne Polygon.
2. Appelez la fonction **_exit_** sur **_RootChainManager_** pour envoyer la transaction de la preuve de brûlure. Cet appel peut être effectué **_après l'envoi du point de contrôle_**pour le bloc contenant la transaction de destruction.

## Étapes {#steps}

### Dépôt {#deposit}

L'ETH peut être déposé sur la chaîne Polygon en appelant **depositEtherFor** sur le contrat **RootChainManager**. Le client PoS de Polygon expose la méthode **depositEther** pour effectuer cet appel.

```jsx
const result = await posClient.depositEther(<amount>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```

:::note
Les dépôts d'Ethereum vers Polygon se produisent à l'aide du mécanisme **de synchronisation d'état** et cela prend environ 22-30 minutes. Après avoir attendu ce intervalle de temps, il est recommandé de vérifier le solde en utilisant la bibliothèque web3.js/matic.js ou en utilisant Metamask. L'explorateur affichera le solde seulement si au moins un transfert d'actifs a eu lieu sur la chaîne enfant. Ce [<ins>lien</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/) explique comment suivre les événements de dépôt.
:::

### Brûler {#burn}

ETH est déposé sous forme de jeton ERC20 sur la chaîne Polygon. Le retrait suit le même processus que le retrait des jetons ERC20.

Pour graver les jetons et engager le processus de retrait, appelez la fonction de retrait du contrat MaticWETH. Étant donné que Ether est un jeton ERC20 sur la chaîne Polygon, vous **devez** initier le jeton ERC20 à partir du client Polygon PoS, puis appeler la `withdrawStart()`méthode pour démarrer le processus de gravure.

```jsx
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Stocker l'identifiant de la transaction pour cet appel et utiliser le lors de la génération de la preuve de brûlure.

### Sortez {#exit}


Une fois que le **point** de contrôle a été soumis pour le bloc contenant la transaction de gravure, l'utilisateur doit appeler la fonction **de sortie** du `RootChainManager`contrat et soumettre la preuve de gravure. Après avoir soumis une preuve valide, les jetons sont transférés à l'utilisateur. Le client POS de Polygon `erc20` expose la méthode `withdrawExit` pour effectuer cet appel. Cette fonction ne peut être appelée qu'après l'inclusion du point de contrôle dans la chaîne principale. L'inclusion du point de contrôle peut être suivie en suivant ce [guide](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events).


```jsx
// token address can be null for native tokens like ethereum or matic
const erc20RootToken = posClient.erc20(<token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
