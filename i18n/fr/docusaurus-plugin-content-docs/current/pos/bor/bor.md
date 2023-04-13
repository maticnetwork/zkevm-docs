---
id: bor
title: Architecture de Bor
description: Le rôle Bor dans l'architecture Polygon
keywords:
  - docs
  - matic
  - Bor Architecture
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Architecture de Bor {#bor-architecture}

Polygon est une plateforme plasma hybride **+ preuve de prise** (PoS). Nous utilisons une architecture à double consensus sur le Réseau de Polygon pour optimiser la vitesse et la décentralisation. Nous avons consciemment conçu le système pour supporter les transitions d'état arbitraires sur nos chaînes latérales, qui sont autorisées par EVM.

## Architecture {#architecture}

<img src={useBaseUrl("img/Bor/matic_structure.png")}/>

Blockchain est un ensemble de réseau de clients interagissant et travaillant ensemble. Le client est un logiciel capable d'établir un canal de communication p2p avec d'autres clients, de signer et de diffuser des transactions, de déployer et d'interagir avec des contrats intelligents, etc. Le client est souvent désigné comme un nœud.

Pour Polygon, le nœud est conçu avec une implémentation Heimdall (couche de validation) à deux couches et (Validator de producteurs Bloc).

1. Heimdall
    - Vérification de la Preuve d'Enjeu
    - Faire le point de contrôle des blocs sur la chaîne principale Ethereum.
    - Gestion du Validateur et des Récompenses
    - Assurer la Synchronisation avec la chaîne principale d'Ethereum
    - Pont Décentralisé
2. Bor
    - Chaîne de Polygon
    - VM Compatible avec EVM
    - Sélection Définie des Proposants et du Producteur
    - SystemCall
    - Frais du Modèle

## Heimdall (couche de validateur) {#heimdall-validator-layer}

Heimdall (le All-Protector) est le fournisseur de tout ce qui se passe dans le système Polygon Proof-of-Stake – bon ou mauvais.

Heimdall est notre couche de Vérification de la Preuve d'Enjeu de Polygon, qui est responsable du point de contrôle d'une représentation des blocs de Plasma vers la chaîne principale dans notre architecture. Nous l'avons mis en œuvre en nous appuyant sur le moteur du consensus de Tendermint, en modifiant le schéma de signature et de diverses structures de données.

Pour plus d'informations, veuillez lire [https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/](https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/) .

## Bor (couche de Producteur de Blocs) {#bor-block-producer-layer}

La mise en oeuvre du noeud de Bor est fondamentalement l'opérateur de la chaîne latérale. La chaîne latérale VM est compatible avec l'EVM. Actuellement, il s'agit d'une mise en œuvre de base de Geth avec des modifications personnalisées faites à l'algorithme de consensus. Cependant, pour être léger et ciblé, ce sera construit à partir de zéro.

Bor est notre couche producteur de Blocs, qui en synchronisation avec Heimdall sélectionne les producteurs et les vérificateurs pour chaque durée et sprint. L'interaction pour les utilisateurs de Polygon prend place sur cette chaîne latérale, qui est compatible avec EVM pour se servir de la fonctionnalité et de la compatibilité de l'outillage du développeur et des applications d'Ethereum.

### Chaîne de Polygon {#polygon-chain}

Cette chaîne est une blockchain séparée qui est attachée à l'Ethereum à l'aide d'une pince bidirectionnel. La pince bidirectionnelle permet l'interchangeabilité des actifs entre Ethereum et Polygon.

### VM Compatible avec EVM {#evm-compatible-vm}

La Machine Virtuelle d'Ethereum (EVM) est une pile virtuelle puissante, et de Sandbox intégrée dans chaque noeud de Polygon complet, responsable pour exécuter un contrat de bytecode. Les contrats sont généralement écrits dans des langues de niveau supérieur, comme Solidity, puis compilés sur le code bytecode d'EVM.

### Sélection des Proposants et des Producteurs {#proposers-and-producers-selection}

Les Producteurs de Bloc pour la couche de Bor sont un comité sélectionné parmi le Validateur du pool sur la base de leur stake, ce qui se produit à des intervalles réguliers et qui est mélangé périodiquement. Ces intervalles sont décidés par la gouvernance du Validateur par rapport à la dynastie et au réseau.

Le ratio de la puissance de Stake/Staking spécifie la probabilité d'être sélectionné en tant que membre du comité de producteur de bloc.

<img src={useBaseUrl("img/Bor/bor-span.png")} />

#### Processus de Sélection {#selection-process}

- Supposons que nous avons 3 validateurs dans le pool, et ils sont Alice, Bill et Clara.
- Alice a fait un stake de 100 jetons Matic alors que Bill et Clara ont fait un stake de 40 jetons Matic.
- Les Validateurs ont des périodes de temps selon le stake, puisque Alice a fait un stake de 100 jetons Matic, elle aura des périodes de temps de façon proportionnelle. Alice recevra 5 périodes de temps au total. De même, Bill et Clara obtiennent 2 périodes de temps au total.
- Tous les validateurs reçoivent ces périodes de temps [A, A, A, A, A, B, B, C, C]
- En utilisant les données de bloc Ethereum historiques comme une semence, nous mélangeons ce tableau.
- Après avoir mélangé les périodes de temps à l'aide de la semence, mettons que nous obtenons ce tableau [A, B, A, A, C, B, A, A, C]
- Maintenant, selon le nombre* de Producteur (maintenu par la gouvernance du validateur)*, nous faisons le point d'achats des validateurs du haut de la page. Pour par exemple si nous voulons sélectionner 5 producteurs, nous obtenons le producteur sous la forme de [A, B, A, A, C]
- Ainsi, le producteur désigné pour la prochaine durée est définie comme: [A: 3, B:1, C:1].
- En utilisant cette définition du validateur et cet algorithme de sélection du proposant tendermint, nous choisissons un producteur pour chaque sprint sur BOR.

### Interface de SystemCall {#systemcall-interface}

L'appel de système est une adresse d'opérateur interne qui est sous EVM. Cela aide à maintenir l'état pour un Bloc de Producteurs pour chaque sprint. Un Appel de Système est déclenché vers la fin d'un sprint et une demande est faite pour la nouvelle liste de Producteurs de Bloc. Une fois que l'état est mis à jour, les modifications sont reçues après la génération de bloc sur Bor pour tous les Validateurs.

### fonctions {#functions}

#### proposeState {#proposestate}

- L'Appel est autorisé uniquement aux validateurs.
- Inspectez `stateId`si c'est déjà proposée ou éffectuée.
- Proposez le `stateId` et mettez à jour le drapeau sur `true`.

#### commitState {#commitstate}

- Un appel est uniquement autorisé au Système.
- Inspectez `stateId`si c'est déjà proposée ou éffectuée.
- Notifiez le `StateReceiver` Contrat avec le nouveau `stateId`.
- Mettre à jour le `state`drapeau pour `true`, Et `remove` le `proposedState`.

#### proposeSpan {#proposespan}

- L'Appel est autorisé uniquement aux validateurs.
- Vérifiez si la proposition de Durée est `pending`.
- Mettre à jour la Proposition de Durée en `true`

#### proposeCommit {#proposecommit}

- Un appel est uniquement autorisé au Système.
- Définissez `initial validators` si durée actuelle est zéro.
- Vérifiez des Conditions pour `spanId` et `time_period` de Sprint et de Durée.
- Mettre à jour le nouveau `span` et `time_period`.
- Définir `validators` et `blockProducers` pour le `sprint`.
- Mettre à jour le drapeau pour `spanProposal` sur `true`.

### Modèle des Frais de Bor {#bor-fee-model}

Pour une transaction normale, les frais dans le jeton Matic sont collectés et distribués vers les producteurs de bloc, de même pour les transactions Ethereum.

Comme les autres blockchains, Polygon a un jeton originaire appelé Matic (MATIC). Matic est un jeton ERC20 qui est utilisé principalement pour payer du gaz (frais de transaction) sur Polygon et le staking.

:::info

Une chose importante à remarquer est que sur la chaîne de Polygon, les jetons Matic fonctionnent comme un jeton ERC20, mais aussi comme un jeton originaire - tous les deux à la fois. Par conséquent, cela signifie qu'un utilisateur peut payer du gaz avec MATIC, et aussi envoyer MATIC à d'autres comptes.

:::

Pour les genesis-contracts, `gasPrice`et `gasLimit`fonctionne comme Ethereum, mais pendant l'exécution, il ne déduira pas les frais du compte d'expéditeur.

Les transactions de Genèse des validateurs actuels sont exécutées avec `gasPrice = 0`.

Aussi, les validateurs doivent envoyer des types de transaction suivants comme les propositions d'État comme les dépôts et les propositions Span sur Bor.

## Connaissance Technique  {#technical-insight}

### Contrats de Genèse {#genesis-contracts}

[BorValidatorSet (0x1000)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.template) ⇒ Ce contrat validateur défini pour chaque durée et sprint.

[BorStateReceiver (0x1001)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol) ⇒ Ce contrat gère le transfert des données de contrats arbitraires à partire des contrats d'Ethereum vers les contrats de Polygon

MaticChildERC20 (0x1010) ⇒ Des Contrats Enfant pour les jetons de Chaîne Principale qui permet de déplacer des actifs d'Ethereum vers Polygon.

### [Bor.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/bor.go)

Protocole de Bor

## Lexique {#glossary}

- StartEpoch - Faites le point de contrôle du numéro de post avec un validateur qui est activé et qui participera au consensus.
- EndEpoch - Faites le point de contrôle du numéro de post qu'un validateur est considéré comme désactivé et ne participera pas au consensus.
- Sprint - Sprint est un ensemble continu de blocs créés par un validateur unique.
- Durée - La durée est un grand ensemble de bloc avec un validateur fixé mais qui est composée de plusieurs sprints. Par exemple pour une durée de 6400 blocs de longueur, ce sera composé de 100 sprints de 64 blocs.
- Dynastie: Temps entre la fin d'une dernière enchère et du début de la prochaine enchère.

## Ressources {#resources}

- [Bor](https://github.com/maticnetwork/bor)
- [EVM](https://www.bitrates.com/guides/ethereum/what-is-the-unstoppable-world-computer)
- [Comment fonctionne EVM?](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)
- [Sélection des Proposants Tendermint](https://docs.tendermint.com/master/spec/reactors/consensus/proposer-selection.html)
