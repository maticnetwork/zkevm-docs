---
id: account_based_plasma
title: Plasma basé sur un compte
description: Une implémentation de plasma basée sur un compte
keywords:
  - docs
  - matic
  - Account Based Plasma
  - polygon
  - implementation
image: https://matic.network/banners/matic-network-16x9.png
---

# Plasma basé sur un compte {#account-based-plasma}

Le Plasma de Polygon suit un modèle similaire au [Plasma MoreVP](https://ethresear.ch/t/more-viable-plasma/2160), mais c'est une **mise en oeuvre basée sur un compte ** par rapport à d'autres implémentations basées sur UTXO. La chaîne latérale est compatible avec EVM. En utilisant la construction de MoreVP, nous éliminons également le besoin des signatures de confirmation.

## La couche de Preuve de Participation et des Points de Contrôle {#pos-layer-and-checkpoints}

Le Réseau de Polygon utilise une double stratégie de la Preuve d'Enjeu sur la couche du Point de Contrôle et des Producteurs de Bloc se trouvant sur la couche de producteur de bloc, pour rattrapper des temps de bloc plus rapides, et il atteint la finalité de la chaîne principale à l'aide des points de contrôle et des preuves de fraude.

Sur la couche du point de contrôle du Réseau de Polygon, pour les moindres blocs sur la couche de bloc du Réseau de Polygon, un validateur (suffisamment lié) créera un point de contrôle sur la chaîne principale après avoir validé tous les blocs sur la couche de bloc et créer l'arbre de Merkle des identifiants de bloc depuis le dernier point de contrôle.

En plus de fournir la finalité sur la chaîne principale, les points de contrôle jouent un rôle dans les retraits car ils contiennent la preuve de brûlure (retrait) des jetons dans l'événement de retrait de l'utilisateur. Cela permet aux utilisateurs de prouver leurs jetons restants sur le contrat de root à l'aide de preuve de Patricia Merkle et de la preuve de bloc d'en-tête. Remarquez que pour prouver les jetons restants, le bloc d'en-tête doit être engagé dans la Chaîne de Root à travers la Preuve de Participation PoS (Parties prenantes). Le processus de retrait entraînera des frais de gaz Ethereum comme d'habitude. Nous exploitons les points de contrôle largement pour les jeux de sortie.

## Les registres d'événement de type UTXO {#utxo-like-event-logs}

Pour les transferts ERC20/ERC721, cela est réalisé à l'aide d'une structure des données de registre d'événement de type UTXO. Ci-dessous est un `LogTransfer`événement pour référence.

```jsx
event LogTransfer(
    address indexed token,
    address indexed from,
    address indexed to,
    uint256 amountOrTokenId,
    uint256 input1, // previous account balance of the sender
    uint256 input2, // previous account balance of the receiver
    uint256 output1, // new account balance of the sender
    uint256 output2 // new account balance of the receiver
);
```

Ainsi, fondamentalement chaque transfert ERC20/ERC721 émet cet événement et les balances précédentes de l'expéditeur et du récepteur (`input1` et `input2`) deviennent l'entrée (de type UTXO) du tx et les nouvelles balances deviennent les sorties (`output1` et `output2`). Les transferts sont suivis par le moyen de rassembler tous les `LogTransfer` événements liés.

## Jeux de Sortie {#exit-games}

Étant donné que les blocs sont produits par un seul producteur de blocs (ou très peu), il expose une surface pour la fraude Nous discuterons brièvement des scénarios d'attaque, puis nous parlerons de la façon dont le plasma garantit la sauvegarde d'un utilisateur.

## Vecteurs d'Attaque {#attack-vectors}

### Opérateur malveillant {#malicious-operator}
Les options suivantes discutent sur des scénarios dans lesquels l'opérateur pourrait devenir malveillant et essayer de tricher.

1. Des jetons hors de nulle part / des doubles dépenses / des reçus malformés qui augmentent frauduleusement (pour un compte contrôlé par un opérateur) / diminue (pour un utilisateur ) la balance du jeton.
2. Indisponibilité des données après qu'un utilisateur a envoyé un tx, disons que l'opérateur a inclus le tx dans le plasma mais a rendu la chaîne des données indisponibles à l'utilisateur. Dans ce cas, si un utilisateur démarre une sortie d'un tx plus ancien, alors ils pourraient être défiés sur la chaîne en présentant son tx le plus récent. Cela devient facile d'attrister l'utilisateur
3. Avec un mauvais point de contrôle dans le pire des cas, un opérateur pourrait exécuter A.1 et (ou) A.2 et comploter avec les validateurs pour valider ces transitions d'état invalides sur la chaîne root.
4. En arrêtant le côté de la chaîne, L'opérateur cesse de produire des blocs et la chaîne parvient à s'arrêter. Si un point de contrôle n'a pas été soumis pour une durée spécifiée, il serait possible de marquer la chaîne latérale comme discontinue sur la chaîne de root. Après cela, plus de points de contrôle ne peuvent être soumis.

Pour des raisons énumérées ci-dessus ou autrement, si la chaîne de plasma est devenue malveillante, les utilisateurs ont besoin de démarrer la sortie en masse et nous aspirons à fournir des constructions de sortie sur la chaîne de root que les utilisateurs peuvent exploiter, si et quand vient le moment.

### Utilisateur malveillant {#malicious-user}

1. L'utilisateur démarre la sortie d'un tx engagé mais continue de dépenser des jetons sur la chaîne latérale. Similaire à des dépenses doubles mais sur 2 chaînes.

Nous nous appuyons sur les idées de [MoreVp 7 ](https://ethresear.ch/t/more-viable-plasma/2160). En résumé, MoreVP introduit une nouvelle façon de calculer la priorité de sortie, appelée la priorité « youngest-input ». Au lieu de commander des sorties par l'âge de la sortie, moreVP commande des sorties par l'âge de l'entrée la plus jeune. Cela a pour effet que les sorties des résultats, même si elles sont incluses dans des blocs retenus après des transactions « hors de nulle part », elles seront correctement traitées tant que celles-ci ne proviennent que des entrées valables. Nous définissons `getAge` ce qui attribue un âge à un tx inclus. Cela est comme défini dans [le plasma viable minimum 1](https://ethresear.ch/t/minimal-viable-plasma/426).

```jsx
function getAge(receipt) {
  const { headerNumber, plasmaBlockNum, txindex, oindex } = receipt
  return f(headerNumber, plasmaBlockNum, txindex, oindex) // multiplied with their respective weights
}
```

## Les Scénarios de Sortie {#exit-scenarios}

Introduisons une certaine terminologie avant de continuer à discuter des scénarios de sortie:

- **Préleveur**: Un utilisateur qui veut la sortie de la chaîne de plasma.
- **Tx engagé**: Un tx qui a été inclus dans un bloc de la chaîne de Polygon et a été mis en point de contrôle sur la chaîne de root.
- **Dépenser tx**: Un tx qui modifie la balance du jeton de l'utilisateur en réponse d'une action signée par l'utilisateur (cela n'inclut pas les transferts de jeton entrants). Cela peut être un transfert initié de l'utilisateur, de brûlure de tx etc
- **Référence de tx**: Les Txs juste avant la sortie de tx pour cet utilisateur et ce jeton en particulier. Comme défini dans notre schéma de UTXO basé sur une balance de compte, les sorties à la référence de tx deviennent les entrées vers le tx en train de sortir.
- **La priorité de sortie de MoreVP**: L'âge de la plus jeune entrée (parmi les txs de référence) à un tx particulier. Ce sera le plus souvent utilisé pour calculer la priorité de sortie.

### Gravez des jetons {#burn-tokens}

Pour sortir la chaîne latérale, un utilisateur lancerait un *retrait des jetons de brûlure aka* de tx sur la chaîne de plasma. Ce tx émettra un `Withdraw` événement.

```jsx
event Withdraw(
    address indexed token,
    address indexed from,
    uint256 amountOrTokenId,
    uint256 input1,
    uint256 output1
);
```

Ici `input1` indique la balance précédente de l'utilisateur pour le jeton en question et  `output1` le nombre de jetons laissés sur la chaîne latérale. Cette construction est cohérente avec notre schéma *UTXO* basé sur le compte. Un utilisateur présentera le reçu de ce retrait de tx pour retirer les jetons sur la chaîne principale. Tout en faisant référence de ce reçu, l'utilisateur doit également fournir les éléments suivants:

1. La preuve de Merkle de l'inclusion d'un reçu dans un bloc de chaîne latérale (`receiptsRoot`)
2. La preuve de Merkle de l'inclusion d'une transaction dans un bloc de chaîne latérale (`transactionsRoot`)
3. La preuve de l'inclusion de l'entête du bloc de la chaîne latérale dans le point de contrôle sur la chaîne de root

```jsx
startExit(withdrawTx, proofOfInclusion /* of the withdrawTx in the checkpoint */) {
  Verify inclusion of withdrawTx in checkpoint using proofOfInclusion
  Verify msg.sender == ecrecover(withdrawTx)

  uint age = getAge(withdrawTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}
```

Toutes les fois qu'un utilisateur souhaite sortir la chaîne de plasma, ils (ou abstrait de leur application client c'est-à-dire le portefeuille) devraient brûler les jetons sur la chaîne latérale , attendre que cela soit mis en point de contrôle et ensuite commencer une sortie du retrait tx mis en point de contrôle.

### Quittez les derniers transferts ERC20/721 (MoreVP) {#exit-from-the-last-erc20-721-transfers-morevp}

Considérant le scénario, un utilisateur a fait un transfert ERC20 sur la chaîne latérale. L'opérateur a ajouté un tx hors de nulle part juste avant le transfert de l'utilisateur et a comploté avec les validateurs pour faire le point de contrôle de ce bloc. Dans ce scénario et plus généralement, dans les vecteurs d'attaque A1 jusqu'à A3 discutés ci-dessus, l'utilisateur peut n'avoir pas eu la possibilité de brûler leurs jetons avant qu'un tx malveillant ne soit inclus et par conséquent devrait avoir besoin de commencer une sortie de tx à partir du dernier point de contrôle sur la chaîne de root - pour cette raison, en plus de la sortie brûlée, nous devons supporter des sorties d'une variété de txs telles que les transferts ERC20/721 parmi d'autres. En s'appuyant sur ce vecteur d'attaque et en décomposant les 2 scénarios:

**Transfert de sortie:** J'ai transféré des jetons à un utilisateur, mais j'ai remarqué que l'opérateur a inclus un tx malveillant dans le bloc/point de contrôle avant d'inclure mon transfert tx. Je dois commencer à sortir la chaîne. Je commencerai une sortie du transfert tx. Comme défini dans MoreVP, je vais devoir fournir une référence tx (*UTXO d'entrée*) qui définira la priorité de la sortie. Donc, je vais référencer un tx qui a mis à jour ma balance de jeton et qui précède simplement le transfert de sortie tx.

```jsx
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the user after the input tx was executed >= tokens being transferred in the exitTx
  Verify msg.sender == ecrecover(exitTx)

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

**Le transfert entrant:** J'ai remarqué que l'opérateur a inclus un tx malveillant dans le bloc/point de contrôle avant d'inclure mon transfert entrant de tx. Je vais commencer une sortie du transfert entrant de tx tout en faisant référence à la balance de la contrepartie parce qu'ici *un UTXO d'entrée * est la balance de jeton de la contrepartie.

```
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the counterparty after the input tx was executed >= tokens being transferred in the exitTx
  Verify input.sender == ecrecover(exitTx) && input.receiver == msg.sender

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

### Quittez d'une transaction en vol (MoreVP) {#exit-from-an-in-flight-transaction-morevp}

Ce scénario sert à combattre contre le scénario d'indisponibilité des données. Disons que j'ai fait un tx mais je ne sais pas si ce tx a été inclut en raison de l'indisponibilité des données. Je peux commencer une sortie de ce tx en vol en faisant référence au dernier tx mis en point de contrôle. L'utilisateur devrait faire attention de ne pas faire des txs à chaque fois qu'il commence une sortie de style MoreVP, sinon ils seront défiés.

**Remarques:** Lors de la sortie d'une construction de style de MoreVP, un utilisateur peut démarrer une sortie en fournissant des txs de référence, la sortie de tx, et en plaçant un petit `exit bond`. Pour toute sortie, si la sortie est défiée avec succès, la sortie sera annulée et la liaison de sortie sera saisie.

## Limitations {#limitations}

1. La preuve de grande dimension: La preuve de Merkle de l'inclusion de transaction et la preuve de merkle de l'inclusion de bloc (qui contient cette transaction) dans le point de contrôle.
2. La sortie de masse: Si l'opérateur devient malveillant, les utilisateurs doivent commencer la sortie de masse.

La spec est dans un stade naissant et nous apprécierions tout commentaire servant à l'améliorer ou à refaire complètement la conception si cette construction est désespérément détruite. La mise en œuvre est un travail en cours dans notre répertoire [de](https://github.com/maticnetwork/contracts) contrats.