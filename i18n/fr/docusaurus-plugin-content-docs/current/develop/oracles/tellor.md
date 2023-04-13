---
title: Tellor
description: "Un guide pour intégrer l'oracle Tellor dans votre contrat Polygon."
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles", "Polygon", "Matic", "Tellor"]
skill: beginner
published: 2022-02-10
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Tellor est un oracle qui fournit des données résistant à la censure et sécurisées par de simples incitations crypto-économiques. Les données peuvent être fournies par quiconque et vérifiées par tout le monde. La structure flexible de Tellor peut fournir n'importe quelle donnée à n'importe quel intervalle de temps pour permettre une expérimentation/innovation facile.

## (Soft) Prérequis {#soft-prerequisites}

Nous supposons ce qui suit à propos de votre niveau de compétence en codage à vous concentrer sur l'aspect oracle.

Hypothèses :

- vous pouvez piloter un terminal
- vous avez installé npm
- vous savez comment utiliser npm pour gérer les dépendances

Tellor est un oracle actif et open source, prêt à être mis en œuvre. Ce guide débutant est là pour présenter la facilité avec laquelle on peut se lever et fonctionner avec Tellor, fournissant à votre projet un oracle entièrement décentralisé et résistant à la censure.

## Aperçu {#overview}

Tellor est un système d'oracle où les parties peuvent demander la valeur d'un point de données hors chaîne (par exemple BTC/USD) et où les déclarants sont en compétition pour ajouter cette valeur à une banque de données sur chaîne, accessible par tous les contrats intelligents de Polygon. Les entrées à cette banque de données sont sécurisées par un réseau de déclarants stakés. Tellor utilise des mécanismes d'incitation crypto-économiques. Les envois de données honnêtes par les déclarants sont récompensés par l'émission de jeton de Tellor. Tout mauvais acteur est rapidement puni et retiré du réseau par un mécanisme de contestation.

Dans ce tutoriel, nous allons :

- Mettre en place la boîte à outils initiale dont vous aurez besoin pour être opérationnel.
- Parcourir un exemple simple.
- Dresser la liste des adresses de testnet des réseaux sur lesquels vous pouvez actuellement tester Tellor.

## Utiliser Tellor {#usingtellor}

La première chose à faire est d'installer les outils de base nécessaires pour utiliser Tellor comme votre oracle. Utilisez [ce paquet](https://github.com/tellor-io/usingtellor) pour installer les contrats d'utilisation de Tellor :

`npm install usingtellor`

Une fois installé, il permettra à vos contrats d'hériter des fonctions du contrat 'UsingTellor'.

Très bien ! Maintenant que vous avez les outils prêts, faisons un exercice simple où nous récupérons le prix du bitcoin :

### Exemple du BTC/USD {#btc-usd-example}

Hériter du contrat UsingTellor, en passant l'adresse du Tellor comme argument de constructeur :

Voici un exemple :

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {

  uint256 public btcPrice;

  //This Contract now has access to all functions in UsingTellor

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {

    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryID = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

## Adresses : {#addresses}

Les hommages de Tellor : [`0xe3322702bedaaed36cddab233360b939775ae5f1`](https://polygonscan.com/token/0xe3322702bedaaed36cddab233360b939775ae5f1#code)

Oracle : [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0#code)

#### Voulez-vous d'abord faire des essais ? : {#looking-to-do-some-testing-first}

Polygon Mumbai Testnet : [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://mumbai.polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0/contracts#code)

Tributes de test:[`0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE`](https://mumbai.polygonscan.com/token/0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE#code)

Besoin de jetons de test ? Tweet nous à ['@trbfaucet'](https://twitter.com/trbfaucet)

Pour une facilité d'utilisation, le repo UsingTellor est livré avec une version du [contrat Tellor Playground](https://github.com/tellor-io/TellorPlayground) pour une intégration plus facile. Voyez [ici](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) pour une liste de fonctions utiles.

#### Pour une mise en œuvre plus robuste de l'oracle de Tellor, consultez la liste complète des fonctions disponibles [ici.](https://github.com/tellor-io/usingtellor/blob/master/README.md)

#### Vous avez toujours des questions? Rejoignez la communauté [ici!](https://discord.gg/tellor)
