---
id: connext
title: Transferts crosschain à l'aide de Connext
description: Créez votre prochaine application de blockchain sur Polygon.
keywords:
  - docs
  - matic
  - connext
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Connext est un réseau de liquidité crosschain qui permet d'effectuer des échanges rapides et sans contrepartie entre des chaînes compatibles avec evm et les systèmes Ethereum L2.

L'Ethereum va devenir multi-chaîne. Avec l'adoption croissante de chaînes et de L2 compatibles avec l'evm, un nouveau défi est apparu autour de la fragmentation des liquidités au sein de l'écosystème. Connext résout ce problème en connectant des pools de liquidité distincts sur chaque chaîne en un réseau mondial, sans introduire de nouvelles considérations de confiance importantes pour les utilisateurs. Les développeurs peuvent tirer parti de ces liquidités pour créer une nouvelle catégorie d'applications natives de la chaîne sur Connext.

 À un niveau élevé, Connext permet aux utilisateurs d'échanger un actifA sur la chaîneA contre un actifB sur la chaîneB en utilisant des transferts conditionnels. Cela se fait en quelques étapes simples:

Alice, un utilisateur de Connext, envoie un transfert conditionnel de l'actifA à Bob. Bob, un fournisseur de liquidités (alias un routeur), envoie un montant équivalent d'actifB à Alice. Alice débloque son transfert conditionnel pour recevoir l'actifB, ce qui permet à Bob de faire de même. Les routeurs constituent l'épine dorsale de notre réseau, fournissant des liquidités sur différentes chaînes et percevant des commissions pour ce faire. Vous pouvez en savoir plus sur la façon dont cela fonctionne en toute confiance dans notre Principal Protocole.

Pour configurer les transferts crosschain de l'Ethereum Goerli Testnet vers le Polygon Mumbai Testnet dans un navigateur dApp, veuillez consulter ce g[uide.](https://docs.connext.network/quickstart-polygon-matic-integration)
