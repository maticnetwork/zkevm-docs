---
id: move-stake
title: Déplacement de mise
description: Déplacer votre participation sur le réseau polygon
keywords:
  - docs
  - polygon
  - matic
  - stake
  - move stake
  - validator
  - delegator
slug: move-stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Déplacement de la mise des nœuds de la Fondation aux nœuds externes {#moving-stake-from-foundation-nodes-to-external-nodes}

<video loop autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/staking/MoveStakeDemo.mp4"></source>
  <source type="video/quicktime" src="/img/staking/MoveStakeDemo.mov"></source>
  <p>Votre navigateur n'est pas compatible avec la vidéo.</p>
</video>

Les délégants ont maintenant la possibilité de déplacer leur mise des nœuds de la Fondation vers les nœuds externes de leur choix en utilisant la fonctionnalité Déplacer la mise sur l'interface de staking

Le déplacement de la mise du nœud de la Fondation à un nœud externe est une transaction unique. Il n'y a donc pas de délai ou de période d'unbonding pour cet événement.

Veuillez noter que le déplacement de la mise est uniquement autorisé du nœud de la Fondation aux nœuds externes. Si vous souhaitez déplacer votre mise d'un nœud externe à un autre nœud externe, vous devrez d'abord effectuer un unbonding, puis déléguer sur le nouveau nœud externe.

De plus, la fonction Déplacer la mise est une fonction temporaire développée par l'équipe Polygon pour assurer un transfert en douceur des fonds des nœuds de la Fondation vers des nœuds externes. Elle ne restera active que jusqu'à ce que les nœuds de la Fondation soient désactivés.

## Déplacer une mise {#how-to-move-stake}

Pour déplacer le jeu, vous devrez d'abord vous connecter à [l'interface utilisateur Staking](https://wallet.polygon.technology/staking) à l'aide de votre adresse Delegator

**Adresse du délégué** : L'adresse que vous avez déjà utilisée pour participer aux nœuds de fondation.

Une fois connecté, vous verrez une liste de validateurs.

<img src={useBaseUrl("img/staking/validator-list.png")} />

Allez maintenant sur votre profil de Délégation en cliquant sur le bouton **Afficher les détails** du délégué ou sur l'option **Mes détails** du délégateur sur la gauche.

<img src={useBaseUrl("img/staking/show-delegator-details.png")} />

Ici, vous trouverez un nouveau bouton appelé **Déplacer le Stake**.

<img src={useBaseUrl("img/staking/move-stake-button.png")} />

En cliquant sur ce bouton, vous accéderez à une page avec une liste de validateurs auxquels vous pouvez déléguer. Vous pouvez déléguer à n'importe quel validateur de cette liste.

<img src={useBaseUrl("img/staking/move-stake-validator.png")} />

Maintenant, après avoir choisi votre validateur auquel vous souhaitez déléguer, cliquez sur le bouton **Déléguer** Ici. En cliquant sur ce bouton, vous ouvrirez une fenêtre contextuelle.

<img src={useBaseUrl("img/staking/stake-funds.png")} />

Ici, vous verriez un champ **Montant** qui remplirait automatiquement avec le montant entier pour la délégation. Vous pouvez également utiliser un montant partiel pour déléguer à un validateur.

Par exemple, si vous avez délégué 100 jetons Matic au nœud 1 de la Fondation et que vous souhaitez maintenant déplacer votre mise du nœud de la Fondation vers un nœud externe, vous pouvez déléguer un montant partiel au nœud externe de votre choix, par exemple 50 jetons Matic. Le reste des 50 jetons Matic restera sur le nœud 1 de la Fondation. Vous pouvez alors choisir de déléguer le reste des 50 jetons à un autre nœud externe ou au même nœud externe.

Une fois que vous avez entré le montant, vous pouvez cliquer sur le bouton **Stake Funds**. Cela demandera ensuite une confirmation sur votre Metamask pour signer l'adresse.

Une fois que vous aurez signé la transaction, votre mise réussira à passer du nœud de la Fondation au nœud externe. Cependant, vous devrez attendre 12 confirmations de bloc pour que cela soit visible sur l'interface utilisateur de staking. Si vos fonds déplacés ne s'affichent pas après 12 confirmations de bloc, essayez de rafraîchir la page une fois pour voir les mises actualisées.

Si vous avez des questions ou si vous rencontrez un problème, veuillez créer un ticket [ici](https://support.polygon.technology/support/home).
