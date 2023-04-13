---
id: getting-started
title: Pont PoS
sidebar_label: Introduction
description: Plus de flexibilité et des retraits plus rapides avec Polygon POS.
keywords:
  - docs
  - matic
  - pos bridge
  - deposit
  - withdraw
  - mapping
  - state sync
image: https://matic.network/banners/matic-network-16x9.png
---

Veuillez consulter la dernière [documentation Matic.js sur PoS](../matic-js/get-started.md) pour commencer.

Un pont est essentiellement un ensemble de contrats qui aident à déplacer les actifs de la chaîne root vers la chaîne enfant. Il existe principalement deux ponts pour déplacer les actifs entre Ethereum et Polygone. Le premier est le pont Plasma et le second est appelé le **pont PoS** ou **pont Preuve de Stake **. **Le pont Plasma** offre une garantie de sécurité accrue grâce au mécanisme de sortie Plasma.

Cependant, il existe certaines restrictions sur le jeton enfant et une période de retrait de 7-jours qui est associée à toutes les sorties/retraits de Polygone vers Ethereum sur le pont Plasma.

C'est assez pénible pour les DApps/utilisateurs qui ont besoin d'une certaine **flexibilité** et de **retraits plus rapides**, et qui sont satisfaits du niveau de sécurité fourni par le pont Polygone de Preuve d'enjeu, sécurisé par un ensemble robuste de validateurs externes.

Les actifs basés sur la preuve d'enjeu offrent une sécurité PoS et une sortie plus rapide avec un seul intervalle de contrôle.

## Étapes à suivre pour utiliser le Pont PoS. {#steps-to-use-the-pos-bridge}

Avant d'entrer dans cette section des docs, cela peut aider à avoir une compréhension approfondie de certains termes car vous interagirez avec eux tout en essayant d'utiliser le pont: [Mapping](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) et le [mécanisme](https://docs.polygon.technology/docs/pos/state-sync/state-sync/) de synchronisation d'état.

Ensuite, la première étape pour utiliser le pont PoS est de cartographier le **jeton racine** et le **jeton enfant**. Cela signifie que le contrat de jeton sur la chaîne racine et le contrat de jeton sur la chaîne enfant doivent maintenir une connexion (appelée mapping) pour transférer des actifs entre eux. Si vous êtes intéressé à soumettre une demande de cartographie, veuillez le faire en utilisant [ce guide](/docs/develop/ethereum-polygon/submit-mapping-request/).

À un niveau inférieur et avec plus de détails, c'est ce qui se passe :

### déposer {#deposit}

  1. Le propriétaire de l'actif **(ERC20/ERC721/ERC1155)** jeton doit approuver un contrat spécifique sur le pont PoS pour dépenser le montant des jetons à transférer. Ce contrat spécifique s'appelle le **Contrat de prédicat** (déployé sur le réseau Ethereum) qui, en fait, **verrouille la quantité de jetons à déposer**.
  2. Une fois l'approbation donnée, l'étape suivante consiste à **déposer l'actif**. Un appel de fonction doit être effectué sur le `RootChainManager`contrat qui à son tour déclenche le `ChildChainManager`contrat sur la chaîne Polygon.
  3. Cela se produit par le biais d'un mécanisme de synchronisation de l'état qui peut être compris en détail [ici](/docs/pos/state-sync/state-sync/).
  4. Les appels `ChildChainManager`internes la `deposit`fonction du contrat de jetons enfant et le montant correspondant de jetons d'actifs sont **exécutés sur le compte de l'utilisateur.** Il est important de noter que seul le `ChildChainManager`peut accéder à la `deposit`fonction sur le contrat de jeton enfant.
  5. Une fois que l'utilisateur a obtenu les jetons, ils peuvent être **transférés presque instantanément avec des frais négligeables sur la chaîne de Polygone**.

### Retraits {#withdrawals}

  1. Le retrait d'actifs vers Ethereum est un processus en 2 étapes au cours duquel le jeton d'actifs doit être **d'abord brûlé sur la chaîne Polygon** et la **preuve de cette transaction de gravure doit être soumise** sur la chaîne Ethereum.
  2. Il faut environ 20 minutes à 3 heures pour que la transaction de combustion soit intégrée dans la chaîne Ethereum. Ce sont les validateurs de la Preuve d'Enjeu qui s'en chargent.
  3. Une fois que la transaction a été ajoutée au point de contrôle, la preuve de la transaction de gravure peut être soumise sur le `RootChainManager`contrat sur Ethereum en appelant la `exit`fonction.
  4. Cet appel de fonction **vérifie l'inclusion du point de contrôle** et déclenche ensuite le contrat de Prédicat qui avait verrouillé les jetons d'actifs lors du dépôt initial des actifs.
  5. Comme étape finale, le **contrat prédatant libère les jetons verrouillés** et les restitue au compte utilisateur sur Ethereum.

:::tip

Une fois la cartographie effectuée, vous pouvez soit utiliser le **SDK matic.js** pour interagir avec les contrats, ou faire de même sans le SDK. Cependant, le SDK matic.js est conçu de manière très simple pour les utilisateurs de sorte que le mécanisme de transfert d'actifs soit très facile à intégrer pour toute application.

:::