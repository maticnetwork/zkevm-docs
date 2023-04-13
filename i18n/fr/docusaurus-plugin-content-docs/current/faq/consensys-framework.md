---
id: consensys-framework
title: FAQ sur le cadre de mise à l'échelle
sidebar_label: Scaling Framework FAQ
description: Créez votre prochaine application de blockchain sur Polygon.
keywords:
  - docs
  - matic
  - wiki
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Ce cadre est dérivé des Quatre questions de Consensys [pour juger n'importe quelle solution de mise à](https://consensys.net/?p=19015&preview=true&_thumbnail_id=19017) l'échelle.

## Qui exploite ce cadre ? {#who-operates-it}
Les nœuds des mineurs du réseau principal Ethereum font avancer le réseau en résolvant des preuves de travail et en créant de nouveaux blocs. La solution L2 requiert un rôle similaire d'« opérateur » sur son réseau, qui est l'équivalent du réseau principal Ethereum en ce qui concerne les mineurs et qui peut faire progresser le réseau L2. Il existe toutefois quelques différences. Par exemple, en plus de traiter et d'autoriser les transactions comme un mineur, un opérateur de la L2 peut également faciliter l'entrée et la sortie des utilisateurs de la couche L2 elle-même.

### - Que faut-il pour exploiter le réseau de preuve de participation de Polygon ? {#who-or-what-is-required-to-operate-the-polygon-proof-of-stake-network}

La chaîne d'engagement de la PoS de Polygon s'appuie sur un ensemble de validateurs pour sécuriser le réseau. Le rôle des validateurs est de faire fonctionner un nœud complet, de produire des blocs, de valider et de participer au consensus, ainsi que d'engager des points de contrôle sur le réseau principal d'Ethereum. Pour devenir validateur, il faut staker ses jetons MATIC avec des contrats de gestion de staking se trouvant sur la chaîne principale d'Ethereum.

Pour plus de détails, veuillez vous référer à la [section Validateur](/maintain/validate/getting-started.md).

### - Comment deviennent-ils opérateurs sur le réseau de la PoS de Polygon ? Quelles sont les règles à respecter ? {#how-do-they-become-operators-in-the-polygon-pos-network-what-rules-do-they-abide-by}

Pour devenir validateur, il faut staker ses jetons MATIC avec des contrats de gestion
 de staking résidant sur la chaîne principale d'Ethereum.

Les récompenses sont distribuées à tous les participants proportionnellement à leur stake à chaque point de contrôle, à l'exception du proposant qui reçoit une prime supplémentaire. Le solde des récompenses de l'utilisateur est mis à jour dans le contrat auquel il est fait référence
lorsqu'il réclame ses récompenses.

Les stakes risquent d'être réduits à néant si le nœud validateur commet un
acte malveillant comme une double signature, un temps d'arrêt du validateur qui affecte également les
délégants liés à ce point de contrôle.

Pour plus de détails, veuillez vous référer à [Flux de bout en bout vers un validateur Polygon](/maintain/polygon-basics/who-is-validator.md#end-to-end-flow-for-a-polygon-validator) et [les responsabilités d'un validateur](/maintain/validate/validator-responsibilities.md).


### - Quelles hypothèses de confiance les utilisateurs de la PoS de Polygon doivent-ils faire à propos de l'opérateur ? {#what-trust-assumptions-must-the-polygon-pos-users-make-about-the-operator}

La chaîne d'engagement de la PoS de Polygon s'appuie sur un ensemble de validateurs pour sécuriser le réseau. Le rôle des validateurs est de faire fonctionner un nœud complet, de produire des blocs, de valider et de participer au consensus, ainsi que d'engager des points de contrôle sur le réseau principal. Pour devenir validateur, il faut staker ses jetons MATIC avec des contrats de gestion de staking se trouvant sur la chaîne principale.
Tant que ⅔ des stakes pondérée des validateurs sont honnêtes, la chaîne progressera avec précision.

### - Quelle est la responsabilité des opérateurs ? Quel pouvoir ont-ils ? {#what-are-the-operators-responsible-for-what-power-do-they-have}

Le rôle des validateurs est de faire fonctionner un nœud complet, de produire des blocs, de valider et de participer au consensus, ainsi que d'engager des points de contrôle sur la chaîne principale.

Les validateurs ont le pouvoir d'arrêter la progression de la chaîne, de réordonner les blocs, et plus encore, en supposant que ⅔ des validateurs des stakes pondérés ne sont pas honnêtes. Ils n'ont pas le pouvoir de changer l'état, les soldes des actifs des utilisateurs, etc.

### - Quelles sont les motivations pour devenir opérateur de la PoS de Polygon ? {#what-are-the-motivations-to-become-an-operator-of-the-polygon-pos}

Les validateurs stakent leurs jetons MATIC comme garantie pour travailler à la sécurité du réseau et, en échange de leur service, gagnent des récompenses.

Veuillez vous référer à [Quelle est l'incitation](/maintain/validator/rewards.md#what-is-the-incentive) pour plus de détails.

## Qu'en est-il des données ? {#how-s-the-data}
Par définition, une technologie de couche 2 doit créer des points de contrôle de données incrémentiels sur une couche 1 (réseau principal d'Ethereum). Notre préoccupation concerne donc le temps interstitiel entre ces contrôles périodiques de la couche 1. Plus précisément, comment les données de la couche 2 sont-elles générées, stockées et gérées lorsqu'elles sont éloignées de la protection de la couche 1 ? C'est ce qui nous préoccupe le plus, car c'est le moment où l'utilisateur est le plus éloigné de la sécurité sans faille d'un réseau principal public.

### - Quelles sont les conditions de verrouillage de la PoS de Polygon ? {#what-are-the-lock-up-conditions-for-polygon-pos}

Dans la plupart des modèles de conception de jetons, le jeton est frappé sur Ethereum et peut être envoyé sur la PoS de Polygon. Pour transférer un tel jeton d'Ethereum vers la PoS de Polygon, l'utilisateur doit bloquer les fonds dans un contrat sur Ethereum, et les jetons correspondants sont ensuite frappés sur la PoS de Polygon.

Ce mécanisme de relais de pont est exécuté par les validateurs de la PoS de Polygon, dont ⅔ devront se mettre d'accord sur l'événement de jeton verrouillé sur Ethereum pour frapper le montant de jeton correspondant sur la PoS de Polygon.

Le retrait des actifs vers Ethereum est un processus en 2 étapes dans lequel les jetons d'actifs doivent être en premier lieu brûlés sur la chaîne d'engagement de la PoS de Polygon et ensuite la preuve de cette transaction brûlée doit être envoyée sur la chaîne Ethereum.


Pour plus de détails, consultez [les Étapes pour utiliser le pont PoS](/develop/ethereum-polygon/pos/getting-started.md#steps-to-use-the-pos-bridge).

### - Dans combien de temps ces fonds seront-ils disponibles sur la PoS de Polygon ? {#how-soon-are-those-funds-available-on-the-polygon-pos}

Autour de ~22-30 minutes. Cela se fait via un mécanisme de passage de messages appelé `state sync`. Plus de détails peuvent être trouvés [ici](/pos/state-sync/state-sync-mechamism.md).

La PoS de Polygon prend-elle en charge les utilisateurs qui entrent dans le système sans verrouillage L1 (par exemple, dans le cas de l'intégration d'un utilisateur directement sur Polygon qui souhaite ensuite sortir sur le réseau principal Ethereum) ?

Oui, un mécanisme spécial de pont est utilisé pour y parvenir. Lorsque l'utilisateur souhaite sortir vers Ethereum, les jetons sont frappés plutôt que de suivre la méthode habituelle de déblocage à partir d'un contrat spécial.

Vous pouvez lire à leur sujet [ici](/develop/ethereum-polygon/mintable-assets.md).

### - Comment un utilisateur peut-il contester une transaction non valide de la PoS de Polygon ? Prouver la validité d'une transaction de la PoS de Polygon ? {#how-would-a-user-dispute-an-invalid-polygon-pos-transaction-prove-a-valid-polygon-pos-transaction}

Il n'y a actuellement aucun moyen sur la chaîne de contester une transaction non valide de la PoS. Cependant, les validateurs de la chaîne Polygon PoS soumettent des points de contrôle périodiques à Ethereum - vous pouvez voir plus de détails [ici](/pos/heimdall/modules/checkpoint.md). Il est possible de vérifier une transaction sur la chaîne Polygon PoS sur Ethereum en construisant une preuve d'arbre Merkle et de la vérifier contre les points de contrôle périodiques qui se produisent sur Ethereum de la transaction Polygon PoS et reçus des racines d'arbre Merkle.

### - Une fois qu'un utilisateur Polygon souhaite quitter le dossier, combien de temps le fonds de couche 1 verrouillé (plus ou moins des gains ou pertes L2) sont-ils disponibles sur L1? {#once-a-polygon-user-wishes-to-exit-how-soon-are-the-locked-up-layer-1-fund-plus-or-minus-any-l2-gains-or-losses-available-back-on-l1}

Environ ~1-3 heures selon la fréquence des [points](/pos/heimdall/modules/checkpoint.md) de contrôle. La fréquence est principalement fonction du coût que les validateurs sont prêts à dépenser en frais de gaz ETH pour soumettre des points de contrôle.

### - Pensez-vous qu'il y ait des fournisseurs de liquidités sur la couche 1 prêts à fournir des fonds L1 immédiatement échangeables aux utilisateurs de la PoS de Polygon ? {#do-you-anticipate-there-being-liquidity-providers-on-layer-1-willing-to-provide-immediately-redeemable-l1-funds-to-existing-polygon-pos-users}

Il existe déjà quelques joueurs tels que [Connext](https://connext.network/) et [Biconomy](https://biconomy.io/) qui sont ou seront en train de fournir ce service. Un certain nombre d'autres acteurs vont également se lancer dans l'aventure très prochainement.

## Comment est la pile ? {#how-s-the-stack}
La comparaison des piles est importante pour mettre en évidence ce qu'une couche 2 a ou n'a pas changé par rapport au réseau principal Ethereum.

### - À quelle point la pile PoS de Polygon est-elle similaire à la pile du réseau principal Ethereum ? {#how-much-does-the-polygon-pos-stack-share-with-the-ethereum-mainnet-stack}

Si vous êtes développeur sur Ethereum, vous êtes déjà développeur de la PoS de Polygon. Tous les outils que vous connaissez sont pris en charge par la PoS de Polygon par défaut : Truffle, Remix, Web3js et bien d'autres encore.

Il n'y a pas de changement majeur dans l'interface de l'EVM pour la PoS de Polygon par rapport à Ethereum.

### - En quoi la PoS de Polygon diffère-t-elle de la pile du réseau principal d'Ethereum et quels risques et récompenses cela implique-t-il ? {#where-does-the-polygon-pos-differ-from-ethereum-mainnet-stack-and-what-risks-rewards-does-that-introduce}

Il n'y a aucune différence majeure.

## Se préparer au pire {#preparing-for-the-worst}
Comment le système de la POS de Polygon se prépare-t-il à :

### - Une sortie massive des utilisateurs ? {#a-mass-exit-of-users}

Tant que ⅔ des validateurs sont honnêtes, les fonds sur la chaîne sont sécurisés. Si cette hypothèse n'est pas valable, dans un tel scénario, la chaîne peut s'arrêter ou une réorganisation peut se produire. Un consensus social sera nécessaire pour redémarrer la chaîne à partir d'un état antérieur, ce qui inclut des instantanés de l'état de la PoS de Polygon qui sont envoyé via des points de contrôle qui peuvent être utilisés à cette fin.

### - Les participants sur Polygon tentent de jouer le consensus de Polygon. Par exemple, en formant un cartel ? {#polygon-participants-attempting-to-game-the-polygon-consensus-for-example-by-forming-a-cartel}

Un consensus social sera nécessaire pour redémarrer la chaîne à partir d'un état antérieur en supprimant ces validateurs et en la redémarrant avec un nouvel ensemble de validateurs, ce qui inclut des instantanés de l'état de la PoS de Polygon qui sont envoyé via des points de contrôle qui peuvent être utilisés pour ce faire.


### - Un bug ou une faille découverte dans une partie critique de son système ? {#a-bug-or-exploit-discovered-in-a-critical-part-of-its-system}

Nous avons pris soin de réutiliser des composants éprouvés dans la conception du système. Toutefois, en cas de bogue ou de faille d'une partie critique du système, le rétablissement de la chaîne à un état antérieur par le biais d'un consensus social constitue la principale piste de solution.
