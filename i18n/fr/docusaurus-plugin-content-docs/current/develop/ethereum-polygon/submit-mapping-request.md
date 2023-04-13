---
id: submit-mapping-request
title: Jetons de cartographie
description:  Un guide sur la façon de cartographier des jetons entre les chaînes Ethereum et Polygon à l'aide du pont PoS
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

La cartographie est nécessaire pour transférer vos actifs vers et depuis Ethereum et Polygon PoS. Nous proposons deux ponts pour faire de même. Plus de détails sur le pont peuvent être compris [ici](/develop/ethereum-polygon/getting-started.md).

:::tip

Le pont Polygon PoS est disponible pour Polygon Mainnet ainsi que pour Mumbai Testnet.

:::

## Étapes à suivre pour soumettre une demande de cartographie {#steps-to-submit-a-mapping-request}

Afin de cartographier des jetons entre Ethereum et Polygon PoS, vous pouvez utiliser le [Mapper jeton Polygon](https://mapper.polygon.technology/). Ouvrez le lien et cliquez sur le bouton **Nouveau jeton de carte** dans le coin supérieur droit pour lancer une nouvelle requête de mappage.

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**Étape 1 →** Choisissez le réseau sur lequel vous souhaitez cartographier votre jeton. Vous pouvez choisir **Goerli-Mumbai** pour Testnet et **Ethereum-Polygon PoS** pour le Mainnet.

**Étape 2 →** Sélectionnez le type de jeton que vous mappez - **ERC20**, **ERC721** ou **ERC1155**.

**Étape 3 →** Entrez votre adresse jeton **Ethereum/Goerli** dans le champ **d'adresse** jeton Ethereum. Assurez-vous que votre code de contrat jeton a été vérifié sur les explorateurs de blockchain **Ethereum/Goerli**.

**Étape 4 →** Après avoir ajouté **l'adresse jeton Ethereum**, les champs correspondants viz. **Nom du jeton, symbole jeton et décimal de jeton** seront automatiquement remplis avec les détails du contrat.

**Étape 5 →** Maintenant, cliquez sur le bouton Démarrer la **cartographie** pour initier le processus de cartographie. Comme cela implique une transaction Ethereum, vous devrez connecter votre portefeuille pour continuer.

**Étape 6 →** Vous recevrez un modal d'examen avec les informations sur le jeton et les frais de gaz estimés pour compléter la cartographie. Vérifiez les détails et initiez la transaction de mappage en sélectionnant le bouton **Frais de gaz payants à** cartographier.

Après avoir confirmé la transaction depuis votre portefeuille, vous devez attendre que la transaction soit terminée sur Ethereum. Une fois la transaction terminée, vous recevrez le modal de réussite avec votre adresse jeton enfant sur le réseau Polygon PoS. Vous pouvez continuer à vérifier le mapping en vérifiant l'adresse jeton enfant générée sur [Polygonscan](https://polygonscan.com/).

Pour un mappage Mainnet réussi, vous pouvez fournir vos détails de jeton [ici](https://github.com/maticnetwork/polygon-token-list/issues/new/choose) pour être ajoutés sur la [**Liste des jetons Polygon**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json).

:::tip

Dans le cas d'une [<ins>cartographie de jetons personnalisés</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-), vous pouvez visiter notre documentation [**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md) et utiliser les informations fournies pour construire votre implémentation FX personnalisée pour cartographier des jetons.

:::

## Guide vidéo {#video-guide}

Voici un didacticiel vidéo rapide sur la façon de cartographier des jetons entre **Ethereum Goerli ↔ Polygon Mumbai Testnet**:

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>Votre navigateur n'est pas compatible avec l'élément vidéo.</p>
</video>
