---
id: consensus
title: Consensus de Bor
description: Mécanisme Bor pour récupérer de nouveaux producteurs
keywords:
  - docs
  - matic
  - Bor Consensus
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Consensus de Bor {#bor-consensus}

Le consensus Bor est inspiré par le consensus Clique: [https://eips.ethereum.org/EIPS/eip-225](https://eips.ethereum.org/EIPS/eip-225). Clique fonctionne avec plusieurs producteurs prédéfinis. Tous les producteurs votent sur les nouveaux producteurs en utilisant des API de Clique. Ils prennent à tour de rôle créant des blocs.

Bor obtient de nouveaux producteurs à travers un mécanisme de gestion d'une durée et de sprint.

## Validateurs {#validators}

Polygon est un système de Preuve d'enjeu. N'importe qui peut faire un stake de leur jeton Matic sur le contrat intelligent d'Ethereum, contrat d'enjeu, et devenir un validateur pour le système.

```jsx
function stake(
	uint256 amount,
	uint256 heimdallFee,
	address signer,
	bool acceptDelegation
) external;
```

Une fois que les validateurs sont actifs sur Heimdall, ils sont sélectionnés comme des producteurs par le biais du `bor` module.

Vérifiez [la](https://www.notion.so/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab) vue d'ensemble Bor pour comprendre la gestion de portée plus en détails:

## Span {#span}

Un ensemble de blocs définis logiquement pour lesquels un ensemble de validateurs est choisi parmi tous les validateurs disponibles. Heimdall fournit des détails de durée par l'intermédiaire des API détaillés en durée.

```go
// HeimdallSpan represents span from heimdall APIs
type HeimdallSpan struct {
	Span
	ValidatorSet      ValidatorSet `json:"validator_set" yaml:"validator_set"`
	SelectedProducers []Validator  `json:"selected_producers" yaml:"selected_producers"`
	ChainID           string       `json:"bor_chain_id" yaml:"bor_chain_id"`
}

// Span represents a current bor span
type Span struct {
	ID         uint64 `json:"span_id" yaml:"span_id"`
	StartBlock uint64 `json:"start_block" yaml:"start_block"`
	EndBlock   uint64 `json:"end_block" yaml:"end_block"`
}

// Validator represents a volatile state for each Validator
type Validator struct {
	ID               uint64         `json:"ID"`
	Address          common.Address `json:"signer"`
	VotingPower      int64          `json:"power"`
	ProposerPriority int64          `json:"accum"`
}
```

Geth (Dans ce cas, Bor) utilise un bloc  `snapshot`pour stocker des données d'état pour chaque bloc, en incluant les données liés au consensus.

Chaque validateur dans une durée contient un pouvoir de vote. Selon leur puissance, ils sont sélectionnés comme des producteurs bloc. Plus grande puissance, une probabilité plus élevée de devenir des producteurs de bloc. Bor utilise l'algorithme de Tendermint également. Source: [https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go)

## Sprint {#sprint}

Un ensemble de blocs dans une durée pour laquelle seul un producteur de bloc unique est choisi pour produire des blocs. La taille du sprint est un facteur de taille de portée . Bor utilise `validatorSet` pour obtenir un proposant/producteur pour un sprint actuel.

```go
currentProposerForSprint := snap.ValidatorSet().Proposer
```

En dehors du proposant actuel, Bor sélectionne les producteurs de back-up.

## Autoriser un bloc {#authorizing-a-block}

Les producteurs dans Bor ont également appelé des signataires, car pour autoriser un bloc pour le réseau, le producteur doit signer l'identifiant du bloc contenant **tout sauf la signature elle-même**. Cela signifie que l'identifiant contient tous les champs de l'en-tête, et aussi le`extraData` à l'exception du suffixe de signature de 65 octets.

Cet identifiant est signé en utilisant la `secp256k1`courbe standard, et la signature résultante de 65 octets est intégrée dans le `extraData` comme la suite du suffixe de 65 octets.

Chaque bloc signé est attribué à une difficulté qui met du poids sur un Bloc. La signature en succession pèse plus (`DIFF_INTURN`) que lorsqu'il n'y a pas de succession (`DIFF_NOTURN`).

### Stratégies d'autorisation {#authorization-strategies}

Tant que les producteurs respectent les spécifications ci-dessus, ils peuvent autoriser et distribuer des blocs comme ils le jugent approprié. La stratégie qui est proposée réduira cependant le traffic du réseau et les petites fourches, par conséquent c'est une caractéristique recommandée:

- Si un producteur est autorisé à signer un bloc (c'est sur la liste autorisée)
    - Calculez l'heure de signature optimale du prochain bloc (parent + `Period`)
    - Si le producteur est à son tour de rôle, attendez l'heure exacte pour arriver, signer et diffuser immédiatement
    - Si le producteur n'est pas à son tour de rôle, retardez la signature en `wiggle`

Cette petite stratégie garantira que le producteur ayant son tour de rôle (qui a un poids de bloc qui pèse le plus) a un léger avantage pour signer et pour se propager par opposition aux signataires qui n'ont pas leur tour de rôle. De plus, le schéma permet un peu d'échelle avec une augmentation du nombre de producteurs.

### Signature pour ceux qui n'ont pas leur tour de rôle {#out-of-turn-signing}

Bor choisit des producteurs de blocs multiples comme une sauvegarde lorsque le tour de rôle du producteur ne produit pas un bloc. Cela pourrait se produire pour diverses raisons telles que:

- Le noeud du producteur de bloc est en panne
- Le producteur de bloc essaie de retenir le bloc
- Le producteur de bloc ne produit pas de bloc intentionnellement.

Lorsque cela se produit, le mécanisme de sauvegarde de Bor se démarre.

À n'importe quel moment, l'ensemble des validateurs est stocké en tant que tableau organisé sur la base de leur adresse du signataire. Supposons que l'ensemble de validateur est ordonné sous la forme de A, B, C, D et que c'est au tour de C de produire bloc. Si C ne produit pas un bloc dans un nombre de temps suffisant, ça devient le tour de D pour en produire un. Si D ne produit pas alors soit A et soit B.

Cependant, étant donné qu'il y aura un peu de temps avant que C produit et propage un bloc, les validateurs de sauvegarde attendront un certain nombre de temps avant de commencer à produire un bloc. Ce temps de retard est appelé wiggle.

### Wiggle {#wiggle}

Wiggle est le temps qu'un producteur devrait attendre avant de commencer à produire un bloc.

- Mettons que le dernier bloc (n-1) a été produit à temps `t`.
- Nous appliquons un délai de temps minimum entre le bloc actuel et le prochain bloc par un paramètre variable `Period`.
- Dans des conditions idéales, C attendra `Period` et ensuite produira et propagera le bloc. Puisque les temps de bloc dans Polygon sont conçus pour être assez bas (2-4s), le retard de propagation est également supposé être la même valeur que `Period`.
- Donc, si D ne voit pas un nouveau bloc à temps `2 * Period`, D commence immédiatement à produire un bloc. Plus particulièrement, le temps associé au wiggle de D est définie comme `2 * Period * (pos(d) - pos(c))`où `pos(d) = 3` et `pos(c) = 2` dans l'ensemble de validateur. Supposant que, `Period = 1`, le wiggle pour D est de 2s.
- Maintenant, si D ne produit pas non plus un bloc, A commencera à produire une lorsque le temps de wiggle de `2 * Period * (pos(a) + len(validatorSet) - pos(c)) = 4s`a été écoulée.
- De la même façon, le wiggle pour C est `6s`

### Résoudre des fourches {#resolving-forks}

Bien que le mécanisme ci-dessus ajoute à la robustesse de la chaîne dans une certaine mesure, il introduit la possibilité de fourches. Il pourrait en fait être possible que C ait produit un bloc, mais il y a eu un retard de propagation plus important que prévu et de ce fait D a également produit un bloc, de sorte que cela mène à au moins 2 fourches.

La résolution est simple - choisissez la chaîne ayant plus de difficulté. Mais la question est alors de savoir comment définir la difficulté d'un bloc dans notre configuration?

### Difficulté {#difficulty}

- La difficulté pour un bloc qui est produit par un signataire à tour de rôle (disons c) est définie comme étant la plus élevée = `len(validatorSet)`.
- Puisque D est le producteur qui est le prochain dans la ligne; si toutefois, et lorsque la situation se pose que D produit le bloc; la difficulté pour le bloc sera définie comme dans le wiggle en tant que `len(validatorSet) - (pos(d) - pos(c))` qui est `len(validatorSet) - 1`
- La difficulté pour un bloc étant produit par A tout en agissant comme une sauvegarde devient `len(validatorSet) - (pos(a) + len(validatorSet) - pos(c))` qui est `2`

Ayant maintenant défini la difficulté de chaque bloc, la difficulté d'une fourche est simplement la somme des difficultés des blocs dans cette fourche. Dans le cas où une fourche doit être choisie, celle qui a plus de difficulté est choisie, car c'est un reflet du fait que des blocs étaient produits par des producteurs de bloc à tour de rôle. C'est simplement pour fournir un certain sens de finalité à l'utilisateur sur Bor.

## Affichage de modification {#view-change}

Après chaque durée, Bor modifie l'affichage. Cela signifie que cela récupère de nouveaux producteurs pour la prochaine durée.

### Durée d'engagement {#commit-span}

Lorsque l'intervalle de durée actuelle est sur le point de terminer (en particulier à la fin du deuxième sprint dans l'intervalle), Bor retire une nouvelle durée de la part d'Heimdall. Il s'agit d'un simple appel HTTP simple pour le noeud d'Heimdall. Une fois que ces données sont récupérées, un `commitSpan` appel est effectué à l'aide du contrat de genèse de BorValidatorSet à travers l'appel de Système.

Bor définit également des octets de producteurs dans l'en-tête du bloc. C'est nécessaire tout en ayant une synchronisation rapide de Bor. Pendant la synchronisation rapide, Bor synchronise les en-têtes en volume et valide si des blocs sont créés par des producteurs autorisés.

Au début de chaque Sprint, Bor récupère des octets d'en-tête de l'en-tête précédent pour les prochains producteurs et commence à créer des blocs basés sur `ValidatorSet`     un algorithme.

Voici à quoi ressemble l'en-tête pour un bloc:

```js
header.Extra = header.Vanity + header.ProducerBytes /* optional */ + header.Seal
```

<img src={useBaseUrl("img/Bor/header-bytes.svg")} />

## La synchronisation d'état de la chaîne d'Ethereum {#state-sync-from-ethereum-chain}

Bor fournit un mécanisme où certains événements spécifiques sur la chaîne principale d'Ethereum sont retransmis vers Bor. C'est également de cette façon que les dépôts vers les contrats de plasma sont traités.

1. N'importe quel contrat sur Ethereum peut appeler [syncState](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L33) dans    `StateSender.sol`. Cet appel émet `StateSynced` l'événement: https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38  

  ```js
  event StateSynced(uint256 indexed id, address indexed contractAddress, bytes data)
  ```

2. Heimdall écoute à ces événements et appels `function proposeState(uint256 stateId)`dans- agissant `StateReceiver.sol`ainsi comme un magasin pour les ID de changement d'état en attente. Remarquez que la      `proposeState`transaction sera traitée de même avec aucun frais de gaz tant que celle-ci est faite par l'un des validateurs dans l'ensemble validateur actuel: https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L24

3. Au début de chaque sprint, Bor retire les détails sur les changements d'état en attente en utilisant des états d'Heimdall et les engage à l'état de Bor grâce à un appel de système. Voir `commitState` ici: https://github.com/maticnetwork/genesis-contracts/blob/f85d0409d2a99dff53617ad5429101d9937e3fc3/contracts/StateReceiver.sol#L41
