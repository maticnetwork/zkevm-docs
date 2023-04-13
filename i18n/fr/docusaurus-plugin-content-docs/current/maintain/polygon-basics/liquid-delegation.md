---
id: liquid-delegation
title: Fluidité de délégation
sidebar_label: Liquid Delegation
description: Comment Polygon exploite la fluidité de délégation pour assurer la gestion du réseau.
keywords:
  - docs
  - polygon
  - matic
  - delegation
  - liquid delegation
slug: liquid-delegation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Dans un mécanisme traditionnel de preuve de prise, la blockchain garde la trace d'un ensemble de validateurs. Tout le monde peut rejoindre ce rang ou le droit de valider des transactions en envoyant un type spécial de transaction qui met ses pièces (dans le cas d'Ethereum, ETH) et se verrouille dans un dépôt. Ensuite, le processus de création et d'accord sur de nouveaux blocs se fait par un algorithme consensus par tous les validateurs actifs.

Ils bloquent une partie de leur participation pendant un certain temps (comme un dépôt de sécurité), et en retour ils obtiennent une chance proportionnelle à ce jeu pour sélectionner le bloc suivant.

Les récompenses de participation sont distribuées comme incitation aux participants.

## Délégation {#delegation}

Les prises peuvent être coûteuses, augmentant la barrière à l'entrée, ce qui favorise les riches de devenir plus riches. Chacun devrait participer à la sécurité du réseau et recevoir des jetons d'appréciation. La seule autre option est de rejoindre un pool staking similaire à un pool minier, où les validateurs doivent être confiants. Nous croyons que le collage au protocole est la meilleure voie d'action pour les nouveaux délégateurs. Puisque le capital et les récompenses sont ouverts et protégés par des mécanismes dans le protocole.

Les délégués peuvent participer à la validation même s'ils n'hébergent pas de nœuds entiers. Cependant, en mettant en place des validateurs, ils peuvent augmenter la force du réseau et gagner des récompenses en payant une petite charge de commission (qui varie selon le validateur) au validateur de leur choix.

## Limitation du Délégateur traditionnel et du validateur {#limitation-of-traditional-delegator-and-validator}

Le coût de verrouillage du capital pour les validateurs et les délégants est élevé en raison de la conception du protocole de preuve d'enjeu.

Toujours nous pouvons apporter plus de mécanisme de vue de liquidité comme le validateur NFT, où n'importe quel nouveau parti qui veut devenir validateur peut acheter le validateur NFT d'un validateur qui veut quitter le système pour une raison quelconque.

Dans le cas des délégateurs, le montant verrouillé est supposé être dans des morceaux plus petits donc nous voulons être liquides pour que la participation soit plus active (c'est-à-dire si certains participants pensent que les opportunités actuellement sont grandes dans DeFi, mais leur capital est verrouillé dans la piscine staking même pour le retrait, ils doivent toujours attendre 21 jours).

De plus, le verrouillage X ETH dans un dépôt n'est pas gratuit; il implique un sacrifice d'option pour le titulaire ETH. Actuellement, si vous avez 1000 ETH, vous pouvez faire ce que vous voulez avec elle. Si vous le verrouillez dans un dépôt, il est bloqué pendant des mois afin de prévenir des attaques comme [**rien en jeu**](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed) et punir les validateurs pour leur mauvaise participation.

## Couche In-Protocol vs couche d'application {#in-protocol-vs-application-layer}

La liquidation de staking au niveau des applications a un problème de confiance. La liquidation de staking au niveau du protocole est beaucoup plus appréciée parce que tout nouvel acteur peut y faire confiance (ce qui attire plus de capital, même des petits acteurs / délégateurs).

## Solution de délégation de Polygon {#polygon-s-solution-for-delegation}

Lors de l'exploration de la délégation, nous avons réalisé que la délégation devait être en protocole pour avoir plus de confiance de la part des délégateurs.

Nous étions confrontés à un problème similaire aux liquidités en capital validateurs et avons pensé à en faire un NFT qui peut être des transferts et des recherches sur des pensées similaires comme comment il peut être rendu plus liquide et sikka-chorus.one 's [incroyablement design a](https://blog.chorus.one/delegation-vouchers/) attiré l'attention.

Penser en termes de partage du pool de validateurs est une excellente idée et, puisque le staking de Polygon est implémenté sur un contrat intelligent Ethereum, cela nous ouvre beaucoup plus d'options, notamment la compatibilité ERC20 afin qu'il puisse être utilisé dans les protocoles DeFi.

Désormais, chaque validateur a sa propre VMatic (c'est-à-dire pour le validateur Ashish, il y aura un jeton AMatic) parce que chaque validateur a des performances différentes (récompenses et taux de commission). Les délégations peuvent acheter plusieurs parts de validateur et couvrir leurs risques vers des performances médiocres de validateur particulier.

## Avantages {#advantages}

- Étant donné que notre conception suit l'ERC20 comme l'interface dans l'implémentation de délégations, les applications DeFi peuvent être facilement construites au-dessus.
- Les jetons délégués peuvent être utilisés dans les protocoles de prêt.
- Les délégants peuvent couvrir leur risque à travers des marchés de prédiction comme Auger.

Champ d'application futur :

- Actuellement, ERC20 ne sont pas fongibles avec d'autres validateurs ERC20 / Jetons partagés, mais à l'avenir, nous pensons que de nombreuses nouvelles applications DeFi peuvent s'y construire et créer certains marchés pour elle ou même certains meilleurs produits.
- Avec [chorus.one](http://chorus.one) effectuez des recherches initiées, nous explorons également des problèmes comme les validateurs raccourcissant leurs propres jetons et d'autres problèmes (les problèmes courts peuvent être évités via des choses comme le validateur verrouillant leur propre participation pendant X mois et d'autres choses comme l'assurance validateur (sur chaîne) qui apporteront plus de confiance aux délégateurs.
- Droits de vote des délégués pour participer aux décisions de gouvernance.
- Tout en rendant la délégation liquide, nous voulons également assurer la sécurité du réseau. C'est pourquoi, sous quelque forme, le capital slash est verrouillé en cas d'activité fraude.

Compte tenu de la conception ci-dessus disponible dans le protocole, les validateurs peuvent toujours mettre en œuvre leurs propres mécanismes similaires et effectuer un staking via un contrat qui ne sera pas disponible dans l'interface utilisateur de staking de Polygon.

## Objectifs futurs {#future-goals}

Des choses comme interchain / cross-chain via le hub Cosmos et la conception Everett B-harvest.

## Ressources {#resources}

- [Conception position de Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Introduction aux dérivés de staking](https://medium.com/lemniscap/an-intro-to-staking-derivatives-i-a43054efd51c)
- [Pools de staking](https://slideslive.com/38920085/ethereum-20-trustless-staking-pools)
- [Inflation dans la preuve d'enjeu](https://medium.com/figment-networks/mis-understanding-yield-and-inflation-in-proof-of-stake-networks-6fea7e7c0e41)
