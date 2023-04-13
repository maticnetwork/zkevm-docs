---
id: stakingmanager
title: Gestionnaire de Staking
description: Staking Manager est le principal contrat pour gérer les activités liées aux validateurs sur le réseau Polygon.
keywords:
  - docs
  - Staking Manager
  - polygon
  - wiki
  - validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Pour le consensus basé sur la preuve de sécurité du Polygon, toutes les vérifications et la manipulation de la preuve de //1 de la preuve de stockage sont exécutées sur le contrat intelligent Ethereum. L'ensemble de la conception suit la philosophie consistant à faire moins sur le contrat du Réseau Principal. Il effectue la vérification des informations et pousse toutes les opérations lourdes de calcul vers L2 (lire sur [Heimdall](https://wiki.polygon.technology/docs/pos/heimdall/overview)).

**Les participants** sont divisés en **validateurs**, **délégués** et **watchers** (pour les rapports de fraude).

[**StakeManager**](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/stakeManager/StakeManager.sol) est le principal contrat pour gérer les activités liées aux validateurs comme la vérification des `checkPoint`signatures, la distribution de récompenses et la gestion des enjeux. Étant donné que le contrat utilise **NFT ID** comme source de propriété, le changement de propriété et le signataire n'auront aucune incidence sur rien dans le système.

:::tip

À partir d'une adresse Ethereum, un **Staker ne peut être qu'un validateur ou un délégateur** (il s'agit simplement d'un choix de conception, pas de raisons difficiles).

:::

## Admissions de validateur / Remplacement {#validator-admissions-replacement}

### Admissions {#admissions}
Actuellement, il n'y a pas de emplacements validateurs ouverts disponibles sur Polygon PoS. Il existe également une liste d'attente pour devenir un validateur. Dans l'avenir, si les créneaux horaires deviennent disponibles, les validateurs peuvent demander à être considérés et supprimés de la liste d'attente.


### Remplacement {#replacement}
PIP4 a introduit le concept de présenter les performances du validateur pour la visibilité communautaire. Si un validateur est dans un état malsain pendant une période prolongée comme indiqué dans PIP4, il est off-boarded du réseau. Le slot validateur est alors mis à disposition pour ceux qui sortent de la liste d'attente.

:::info

Actuellement, [<ins>la phase 2 de LA PARTIE C dans PIP4</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956/24) est en cours de réalisation. C'est là que la communauté décide de critères d'évaluation prospects validateurs. Dans le temps, cet exercice produira un processus d'application et d'admission.

:::

## Méthodes et variables {#methods-and-variables}

:::caution Mise en œuvre Slashing

`jail`, `unJail`, et les `slash`fonctions ne sont pas utilisées actuellement dans le cadre de l'implémentation de slashing.

:::

### validatorThreshold {#validatorthreshold}

Il stocke le nombre maximum de validateurs acceptés par le système, également appelés créneaux horaires.

### AccountStateRoot {#accountstateroot}

- Pour les différents comptes effectués sur Heimdall pour les validateurs et les délégateurs, la racine de compte est soumise lors de la présentation de `checkpoint`.
- accRoot est utilisé pendant que `claimRewards`et .`unStakeClaim`

### mise en jeu / stakeFor {#stake-stakefor}

```solidity title="StakeManager.sol"
function stake(
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes calldata signerPubkey
) public;

function stakeFor(
    address user,
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes memory signerPubkey
) public;
```

- Permet à toute personne ayant un montant (en jetons MATIC) supérieur à `minDeposit`, si `currentValidatorSetSize`c'est moins que .`validatorThreshold`
- Doit transférer `amount+heimdallFee`, met le validateur dans la période de mise aux enchères pour un intervalle d'enchères (plus dans la section Enchères).
- `updateTimeLine`met à jour la structure des données de la chronologie spéciale, qui garde la trace des validateurs actifs et du jeu actif pour le nombre d'époques / points de contrôle donné.
- Un unique est minutieusement mis à jour sur chaque nouveau `stake`ou appel, qui peut être transféré à n'importe `stakeFor`qui, mais peut être propriété `NFT`d'une adresse Ethereum 1:1.
- `acceptDelegation`défini sur true si les validateurs veulent accepter la délégation, le `ValidatorShare`contrat est déployé pour le validateur.

### Déstaker {#unstake}

- Supprimez le validateur de l'ensemble de validateurs dans l'epoch suivant (valable uniquement pour le point de contrôle actuel une fois `unstake`appelé)
- Supprimez le stake du validateur de la structure de données de la chronologie, mettez à jour le compte pour l'epoch de sortie du validateur.
- Si le validateur avait une délégation sur, collectez toutes les récompenses et verrouillez le contrat de délégation pour les nouvelles délégations.

### unstakeClaim {#unstakeclaim}

```solidity
function unstakeClaim(uint256 validatorId) public;
```

- Après , les validateurs sont mis en période de retrait afin qu'ils puissent être réduits, si une quelconque fraude trouvée `unstaking`après `unstaking`, pour les fraudes passées.
- Une fois que la `WITHDRAWAL_DELAY`période est desservie, les validateurs peuvent appeler cette fonction et faire le règlement avec `stakeManager`(obtenir des récompenses le cas échéant, récupérer des jetons staked arrière, graver NFT, etc).

### Restaker {#restake}

```solidity
function restake(uint256 validatorId, uint256 amount, bool stakeRewards) public;
```

- Permet aux validateurs d'augmenter leur stake en mettant un nouveau montant ou des récompenses, ou les deux.
- Doit mettre à jour la chronologie (montant) pour les parties actives.

### withdrawRewards {#withdrawrewards}

```solidity
function withdrawRewards(uint256 validatorId) public;
```

Cette méthode permet aux validateurs de retirer des récompenses accumulées, doit envisager d'obtenir des récompenses du contrat de délégation si le validateur accepte la délégation.

### updateSigner {#updatesigner}

```solidity
function updateSigner(uint256 validatorId, bytes memory signerPubkey) public
```

Cette méthode permet aux validateurs de mettre à jour l'adresse du signataire (qui est utilisée pour valider des blocs sur la blockchain Polygon et les signatures de points de contrôle sur `stakeManager`).

### topUpForFee {#topupforfee}

```solidity
function topUpForFee(uint256 validatorId, uint256 heimdallFee) public;
```

Les validateurs peuvent compléter leur solde pour les frais Heimdall en invoquant cette méthode.

### claimFee {#claimfee}

```solidity
function claimFee(
        uint256 validatorId,
        uint256 accumSlashedAmount,
        uint256 accumFeeAmount,
        uint256 index,
        bytes memory proof
    ) public;
```

Cette méthode est utilisée pour retirer les frais de Heimdall. `accountStateRoot`est mise à jour sur chaque point de contrôle, de sorte que les validateurs puissent fournir une preuve d'inclusion dans cette racine pour le compte sur Heimdall et retirer les frais.

Notez que `accountStateRoot`vous êtes ré-écrit pour empêcher les sorties sur plusieurs points de contrôle (pour les anciennes racines et enregistrer la déclaration sur `stakeManager`). `accumSlashedAmount`est inutilisé pour le moment et sera utilisé pour slasher sur Heimdall si nécessaire.

### StakingNFT {#stakingnft}

Contrat ERC721 standard avec quelques restrictions comme un jeton par utilisateur et exécuté de manière séquentielle.

### startAuction {#startauction}

```solidity
function startAuction(
    uint256 validatorId, /**  auction for validator */
    uint256 amount /**  amount greater then old validator's stake */
    ) external;
```

Afin de démarrer une offre ou une offre plus élevée sur les enchères déjà exécutées, cette fonction est utilisée. La période de vente aux enchères s'exécute en cycles `(auctionPeriod--dynasty)--(auctionPeriod--dynasty)--(auctionPeriod--dynasty)`comme il **doit vérifier la période de vente aux** enchères correcte.

`perceivedStakeFactor`est utilisé pour calculer le facteur exact jeu (notez actuellement qu'il est par défaut 1 WIP pour choisir la fonction). **Doit vérifier pour la vente aux enchères de la dernière période de vente aux enchères si toutes les personnes sont toujours en cours** (on peut choisir de ne pas appeler `confirmAuction`pour obtenir leur capital dans la prochaine enchère). La vente aux enchères anglaise normalement continue se poursuit dans un `auctionPeriod`.

### confirmAuctionBid {#confirmauctionbid}

```solidity
function confirmAuctionBid(
        uint256 validatorId,
        uint256 heimdallFee, /** for new validator */
        bool acceptDelegation,
        bytes calldata signerPubkey
    ) external
```

- **Doit vérifier que ce n'est pas une période de vente.**
- Si le dernier soumissionnaire est propriétaire de `validatorId`, le comportement devrait être similaire à la reprise.
- Dans le second cas, annulez le stake `validatorId` et ajoutez un nouvel utilisateur comme un validateur à partir du prochain point de contrôle, car le comportement du nouvel utilisateur doit être similaire à celui du stake/stakeFor.

### checkSignatures {#checksignatures}

```solidity
function checkSignatures(
        uint256 blockInterval,
        bytes32 voteHash,
        bytes32 stateRoot,
        bytes memory sigs
    ) public;
```

- Les écritures sont destinées uniquement au contrat de RootChain lors de la soumission des points de contrôle
- `voteHash` sur lequel tous les validateurs signent (accord de BFT ⅔+1)
- Cette fonction valide uniquement les signatures uniques et vérifie que la puissance de ⅔+1 a signé sur le root du point de contrôle (inclusion dans `voteHash` la vérification à l'intérieur du contrat de RootChain pour toutes les données) `currentValidatorSetTotalStake` fournit le stake actif actuel.
- Les récompenses sont distribuées proportionnellement au capital du validateur. Plus sur les récompenses dans [la distribution des récompenses](https://www.notion.so/Rewards-Distribution-127d586c14544beb9ea326fd3bb5d3a2).

### isValidator {#isvalidator}

Vérifie si un validateur donné est un validateur actif pour l'époque actuelle.

## Structure des données de la ligne de temps {#timeline-data-structure}

```solidity
struct State {
    int256 amount;
    int256 stakerCount;
}

mapping(uint256 => State) public validatorState;
```

<img src={useBaseUrl("img/staking_manager/staking_manager.png")} />

## StakingInfo {#stakinginfo}

Contrat d'enregistrement centralisé pour les événements validateurs et délégation inclut peu de fonctions en lecture seule. Vous pouvez consulter le code source du contrat [StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol) sur GitHub.

## ValidatorShareFactory {#validatorsharefactory}

Un contrat d'usine pour déployer un `ValidatorShare`contrat pour chaque validateur qui opt-in pour la délégation. Vous pouvez consulter le code source du contrat [ValidatorShareFactory.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/validatorShare/ValidatorShareFactory.sol) sur GitHub.
