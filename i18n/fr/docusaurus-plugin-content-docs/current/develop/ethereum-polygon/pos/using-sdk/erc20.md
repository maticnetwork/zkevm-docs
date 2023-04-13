---
id: erc20
title: Guide des dépôts et des retraits d’ERC20
sidebar_label: ERC20
description: "Déposez et retirez des jetons ERC721 sur le réseau de Polygone."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Consultez la dernière [documentation Matic.js sur ERC20](https://maticnetwork.github.io/matic.js/docs/pos/erc20/).

Ce tutoriel utilise le Polygone Testnet (Mumbai) qui est cartographié au réseau Goerli pour démontrer le transfert d'actifs vers et depuis les deux blockchains. Une **chose importante à noter** en suivant ce tutoriel est que vous devez toujours utiliser une adresse proxy lorsqu'elle est disponible. Par exemple, l'adresse **RootChainManagerProxy** doit être utilisée pour l'interaction au lieu de l'adresse **RootChainManager.** Les **adresses des contrats de preuve de participation, ABI, adresses des Jetons de Test** et autres détails de déploiement des contrats de pont PoS peuvent être trouvés [ici](/docs/develop/ethereum-polygon/pos/deployment).

**La cartographie de vos actifs** est nécessaire pour intégrer le pont PoS sur votre application. Vous pouvez soumettre une demande de cartographie [ici](/docs/develop/ethereum-polygon/submit-mapping-request). Mais aux fins de ce tutoriel, nous avons déjà déployé les **jetons Test** et les mapper sur le pont PoS. Vous pouvez en avoir besoin pour essayer le tutoriel par vous-même. Vous pouvez demander l'Actif souhaité au [robinet](https://faucet.polygon.technology/). Si les jetons de test ne sont pas disponibles sur le robinet, n'hésitez pas à nous contacter en [cas](https://discord.com/invite/0xPolygonn) de discordance.

Dans le prochain tutoriel, chaque étape sera expliquée en détail et accompagnée de quelques extraits de code. Cependant, vous pouvez toujours vous référer à ce [référentiel](https://github.com/maticnetwork/matic.js/tree/master/examples/pos) qui contient tous les **exemples de code source** qui peuvent vous aider à intégrer et à comprendre le fonctionnement du pont PoS.

## Flux de Haut Niveau {#high-level-flow}

Déposez ERC20 -

1. **_Approuver_** **_le contrat_** ERC20Predicate pour dépenser les jetons qui doivent être déposés.
2. Faites **_dépôtPour_** appel sur **_RootChainManager_** .

Retirer ERC20 -

1. Gravez des jetons sur la chaîne Polygon.
2. Appelez la `exit()`fonction sur `RootChainManager`pour soumettre une preuve de transaction de gravure. Cet appel peut être effectué après que le point de contrôle est soumis pour le bloc contenant la transaction de gravure.

## Détails des étapes {#steps-details}

### Approuvez {#approve}

Il s'agit d'une approbation ERC20 normale afin que **_ERC20Predicate_** puisse appeler **_ la fonction_** transferFrom. Le client Polygone POS expose la méthode **_approve_** pour effectuer cet appel.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>,true);
  const approveResult = await erc20Token.approve(100);
  const txHash = await approveResult.getTransactionHash();
  const txReceipt = await approveResult.getReceipt();
}
```

### déposer {#deposit}

Notez que le jeton doit être mappé et approuvé pour le transfert préalablement. Le client Polygon PoS expose la `deposit()`méthode pour passer cet appel.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);

  //deposit 100 to user address
  const result = await erc20Token.deposit(100, <user address>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();

}
```

:::note
Les dépôts d'Ethereum vers Polygon se produisent à l'aide d'un mécanisme **de synchronisation d'état** et prennent environ 22-30 minutes. Après avoir attendu ce intervalle de temps, il est recommandé de vérifier le solde en utilisant la bibliothèque web3.js/matic.js ou en utilisant Metamask. L'explorateur affichera le solde seulement si au moins un transfert d'actifs a eu lieu sur la chaîne enfant. Ce [<ins>lien</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos) explique comment suivre les événements de dépôt.
:::

### méthode WithdrawStart à Brûler {#withdrawstart-method-to-burn}

La `withdrawStart()`méthode peut être utilisée pour initier le processus de retrait qui gravera le montant spécifié sur la chaîne Polygon.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = posClient.erc20(<child token address>);

  // start withdraw process for 100 amount
  const result = await erc20Token.withdrawStart(100);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```

Stocker l'identifiant de la transaction pour cet appel et utiliser le lors de la génération de la preuve de brûlure.

### Sortez {#exit}

Une fois que le point de contrôle a été soumis pour le bloc contenant la transaction de gravure, l'utilisateur doit appeler la `exit()`fonction du `RootChainManager`contrat et soumettre la preuve de gravure. Lors de la présentation de preuves valides, les jetons sont transférés à l'utilisateur. Le client Polygon PoS expose la `withdrawExit`méthode pour passer cet appel. Cette fonction ne peut être appelée qu'après l'inclusion du point de contrôle dans la mainchain. L'inclusion du point de contrôle peut être suivie en suivant [ce guide](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events).

La méthode *withdrawExit* peut être utilisée pour quitter le processus de retrait en utilisant le txHash de la *méthode* withdrawStart.

:::note
La transaction de retrait Start doit être cochée pour quitter le retrait.
:::

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);
  const result = await erc20Token.withdrawExit(<burn tx hash>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```
