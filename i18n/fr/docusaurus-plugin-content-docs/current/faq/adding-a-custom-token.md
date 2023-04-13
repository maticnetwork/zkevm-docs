---
id: adding-a-custom-token
title: Ajout d'un jeton personnalisé
sidebar_label: Adding a Custom Token
description: Créez votre prochaine application blockchain sur Polygon.
keywords:
  - docs
  - matic
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

La fonction **Ajouter un jeton personnalisé** vous permet d'ajouter explicitement n'importe quel jeton et de l'utiliser avec Polygon Wallet Suite. Il suffit de rechercher le jeton par son adresse de contrat, soit root ou enfant :

* Le **root** est le contrat de jetons sur Ethereum
* L'**enfant** est le contrat sur Polygon

### Comment trouver le contrat de jetons ? {#how-do-i-find-the-token-contract}

Vous pouvez rechercher le jeton par son nom sur [Coingecko](http://coingecko.com) ou [Coinmarketcap](https://coinmarketcap.com/) où vous pourrez voir son adresse sur la chaîne Ethereum (pour les jetons ERC 20) et d'autres chaînes ultérieures prises en charge comme Polygon. L'adresse du jeton sur d'autres chaînes peut ne pas être mise à jour, mais vous pouvez certainement utiliser l'adresse du root à toutes fins utiles.

Ainsi, lorsque vous sélectionnez un jeton, vous pourrez effectuer une recherche par :
* symbole du jeton
* nom du jeton
* contrat

Voici comment cela fonctionne :

1. Ajoutez facilement n'importe quel jeton à votre liste en ajoutant l'adresse du contrat en tant que jeton personnalisé (nous prenons en charge

les adresses de contrat sur Polygon ou Ethereum) :

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/001.png")} width="500" height="420px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/002.png")} width="500"  height="600px"/>
</div>

2. Une fois les informations du jeton récupérées, vous verrez un écran de confirmation avec toutes les informations du jeton. Vous pouvez ensuite l'ajouter en tant que jeton personnalisé qui sera stocké localement dans votre système. Nous vous suggérons de revérifier deux fois les contrats de jeton, car il existe de nombreux jetons clonés ou frauduleux :

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/003.png")} width="500"  height="600px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/004.png")} width="500"  height="600px"/>
</div>

3. Le jeton que vous avez ajouté est maintenant affiché lors de la sélection d'un jeton :

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/005.png")} width="500"  height="600px"/>
</div>

Vous pouvez également ajouter un jeton directement à partir de l'onglet jetons de l'écran **Gérer** :

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/006.png")} width="500"  height="600px"/>
</div>