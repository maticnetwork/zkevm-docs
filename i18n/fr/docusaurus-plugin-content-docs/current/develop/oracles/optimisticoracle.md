---
id: optimisticoracle
title: L'Oracle Optimiste d'UMA
sidebar_label: UMA
description: L'Oracle Optimistic d'UMA permet aux contrats de demander rapidement et de recevoir n'importe quel type de données
keywords:   
  - wiki
  - polygon
  - oracle
  - UMA
  - Optimistic Oracle
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

L'Oracle Optimistic d'UMA permet aux contrats de demander rapidement et de recevoir n'importe quel type de données. Le système oracle d'UMA est composé de deux composants principaux:

1. Oracle Optimiste
2. Mécanisme de Vérification des Données (DVM)

## Oracle Optimiste {#optimistic-oracle}

**L'Oracle Optimistic** d'UMA permet aux contrats de demander et de recevoir rapidement des informations sur les prix. The Oracle agit comme un jeu d'escalade généralisé entre les contrats qui initient une demande de prix et le système de résolution des différends UMA connu sous le nom de mécanisme de vérification des données (DVM).

Les prix proposés par l'Oracle Optimiste ne seront pas envoyés au MVD, sauf s'ils sont contestés. Cela permet aux contrats d'obtenir des informations de prix dans n'importe quelle durée prédéfinie sans écrire le prix d'un actif sur chaîne.

## Mécanisme de Vérification des Données (DVM) {#data-verification-mechanism-dvm}

Si un litige est soulevé, une demande est envoyée au MVD. Tous les contrats construits sur l'UMA utilisent le MVD comme filet de sécurité pour résoudre les litiges. Les litiges envoyés au MVD seront résolus 48 heures après le vote des détenteurs de jetons UMA sur le prix de l'actif à un moment donné. Les contrats sur UMA n'ont pas besoin d'utiliser l'Oracle Optimiste, sauf s'ils nécessitent un prix d'un actif plus rapide que 48 heures.

Le Mécanisme de Vérification des Données (MVD) est le service de résolution des litiges pour les contrats construits sur le protocole UMA. Le MVD est puissant parce qu'il englobe un élément de jugement humain pour garantir que les contrats sont gérés de manière sûre et correcte lorsque des problèmes surviennent sur des marchés volatils (et parfois manipulables).

## Interface Oracle Optimiste {#optimistic-oracle-interface}

L'Oracle Optimiste est utilisé par les contrats financiers ou tout autre tiers pour récupérer les prix. Une fois qu'un prix est demandé, n'importe qui peut proposer un prix en réponse. Une fois proposé, le prix passe par une période de validité pendant laquelle toute personne peut contester le prix proposé et envoyer le prix contesté au MVD de l'UMA pour règlement.

:::info

Cette section explique comment les différents participants peuvent interagir avec l'Oracle Optimiste. Pour voir les déploiements de réseau principal, kovan ou L2 les plus récents des contrats Optimistic Oracle, consultez les [adresses production](https://docs.umaproject.org/dev-ref/addresses).

:::

Douze méthodes composent l'interface de l'Oracle Optimiste.
- `requestPrice`
- `proposePrice`
- `disputePrice`
- `settle`
- `hasPrice`
- `getRequest`
- `settleAndGetPrice`
- `setBond`
- `setCustomLiveness`
- `setRefundOnDispute`
- `proposePriceFor`
- `disputePriceFor`

### PrixDemandé {#requestprice}

Demande un nouveau prix. Cela doit être pour un identifiant de prix enregistré. Notez que cette fonction est appelée automatiquement par la plupart des contrats financiers enregistrés dans le système UMA, mais qu'elle peut être appelée par n'importe qui pour tout identifiant de prix enregistré. Par exemple, le contrat Multipartite Expirant (EMP) appelle cette méthode lorsque sa `expire`méthode  est appelée.

Paramètres:
- `identifier`: identifiant du prix en demande.
- `timestamp`
: horodatage du prix en demande.
- `ancillaryData`: données auxiliaires représentant les arguments supplémentaires en transmission avec la demande de prix.
- `currency`: Jeton ERC20 utilisé pour le paiement des récompenses et des frais. Doit être approuvé pour être utilisé avec le MVD.
- `reward`: récompense offerte à un proposant à succès. Sera payé par l'appelant. Remarque : cela peut être 0.

### Priceproposer {#proposeprice}

Propose une valeur de prix pour une demande de prix existante.

Paramètres:
- `requester`: expéditeur de la demande de prix initial.
- `identifier`: identifiant de prix pour identifier la demande existante.
- `timestamp`: horodatage pour identifier la demande existante.
- `ancillaryData`: données annexes du prix en demande.
- `proposedPrice`: prix en proposition.

### Prixdiscuté {#disputeprice}

Conteste une valeur de prix pour une demande de prix existante avec une proposition active.

Paramètres:
- `requester`: expéditeur de la demande de prix initial.
- `identifier`: identifiant de prix pour identifier la demande existante.
- `timestamp`: horodatage pour identifier la demande existante.
- `ancillaryData`: données annexes du prix en demande.

### régler  {#settle}

Tentatives de règlement d'une demande de prix en suspens. Retournera s'il ne peut pas être réglé.

Paramètres :
- `requester`: expéditeur de la demande de prix initial.
- `identifier`: identifiant de prix pour identifier la demande existante.
- `timestamp`: horodatage pour identifier la demande existante.
- `ancillaryData`: données annexes du prix en demande.

### aunPrix {#hasprice}

Vérifie si une demande donnée a été résolue ou réglée (c'est-à-dire que l'oracle optimiste a un prix).

Paramètres:
- `requester`: expéditeur de la demande de prix initial.
- `identifier`: identifiant de prix pour identifier la demande existante.
- `timestamp`: horodatage pour identifier la demande existante.
- `ancillaryData`: données annexes du prix en demande.

### getRequest {#getrequest}

Obtient la structure de données actuelle contenant toutes les informations sur une demande de prix.

Paramètres:
- `requester`: expéditeur de la demande de prix initial.
- `identifier`: identifiant de prix pour identifier la demande existante.
- `timestamp`: horodatage pour identifier la demande existante.
- `ancillaryData`: données annexes du prix en demande.

### réglerEtObtenirlePrix {#settleandgetprice}

Récupère un prix qui a été précédemment demandé par un appelant. Se rétracte si la demande n'est pas réglée ou ne peut être réglée. Remarque: cette méthode n'est pas visualisée de sorte que cet appel puisse effectivement régler la demande de prix si elle n'a pas été réglée.

Paramètres:
- `identifier`: identifiant de prix pour identifier la demande existante.
- `timestamp`: horodatage pour identifier la demande existante.
- `ancillaryData`: données annexes du prix en demande.

### setBond {#setbond}

Définissez l'adhésion de la proposition associée à une demande de prix.

Paramètres:
- `identifier`: identifiant de prix pour identifier la demande existante.
- `timestamp`: horodatage pour identifier la demande existante.
- `ancillaryData`: données annexes du prix en demande.
- `bond`: montant de la caution personnalisée à définir.

### setCustomLiveness {#setcustomliveness}

Définit une valeur de validation personnalisée pour la demande. Le processus de validation est le temps qu'une proposition doit attendre avant d'être résolue automatiquement.

Paramètres:
- `identifier`: identifiant de prix pour identifier la demande existante.
- `timestamp`: horodatage pour identifier la demande existante.
- `ancillaryData`: données annexes du prix en demande.
- `customLiveness`: nouvelle validation personnalisée.

### définirRembourssementSurDiscussion {#setrefundondispute}

Définit la demande de remboursement de la récompense si la proposition est contestée. Cela peut aider à "couvrir" l'appelant en cas de retard dû à un litige. Remarque : en cas de litige, le gagnant reçoit toujours la caution de l'autre, de sorte qu'il reste un bénéfice à réaliser même si la récompense est remboursée.

Paramètres:
- `identifier`: identifiant de prix pour identifier la demande existante.
- `timestamp`: horodatage pour identifier la demande existante.
- `ancillaryData`: données annexes du prix en demande.

### contesterlePrixPour {#disputepricefor}

Conteste une demande de prix avec une proposition active au nom d'une autre adresse. Remarque : cette adresse recevra toutes les récompenses découlant de ce litige. Cependant, toutes les obligations sont retirées sur l'appelant.

Paramètres:
- `disputer`
: adresse à définir comme contestant.
- `requester`: expéditeur de la demande de prix initial.
- `identifier`: identifiant de prix pour identifier la demande existante.
- `timestamp`: horodatage pour identifier la demande existante.
- `ancillaryData`: données annexes du prix en demande.

### proposelePrixPour {#proposepricefor}

Propose une valeur de prix au nom d'une autre adresse. Remarque : cette adresse recevra toutes les récompenses découlant de cette proposition. Cependant, toutes les obligations sont retirées sur l'appelant.

Paramètres:
- `proposer`: adresse à définir en tant que proposant.
- `requester`: expéditeur de la demande de prix initial.
- `identifier`: identifiant de prix pour identifier la demande existante.
- `timestamp`: horodatage pour identifier la demande existante.
- `ancillaryData`: données annexes du prix en demande.
- `proposedPrice`: prix en proposition.

## Intégrer l'Oracle Optimiste {#integrating-the-optimistic-oracle}

Cette démo va mettre en place un `OptimisticDepositBox` contrat  qui garde le solde des jetons ERC-20 d'un utilisateur.

Sur une blockchain testnet locale, l'utilisateur déposera des wETH (Wrapped Ether) dans le contrat et retirera des wETH libellés en USD. Par exemple, si l'utilisateur veut retirer $10,000 USD of wETH, and the ETH/USD exchange rate is $2,000, il retirera 5 wETH.

* L'utilisateur associe le `OptimisticDepositBox`à l'un des identifiants de prix activés sur le MVD.

* L'utilisateur dépose des wETH dans le `OptimisticDepositBox` et les enregistre avec l'identifiant de `ETH/USD`prix.

* L'utilisateur peut désormais retirer un montant wETH libellé en USD de son  `DepositBox` par le biais d'appels de contrats intelligents, avec l'Oracle Optimiste permettant une tarification optimiste sur le canal.

Dans cet exemple, l'utilisateur n'aurait pas été en mesure de transférer des montants de wETH libellés en USD sans se référer à un flux de `ETH/USD`prix hors chaîne. L'Oracle Optimiste permet donc à l'utilisateur de "tirer" un prix de référence.

Contrairement aux demandes de prix auprès du MVD, une demande de prix auprès de l'Oracle Optimiste peut être résolue dans une fenêtre de validité spécifiée s'il n'y a pas de litiges, ce qui peut être considérablement plus court que la période de vote du MVD. La fenêtre de validité est configurable, mais elle est généralement de deux heures, contre 2 à 3 jours pour le règlement via le MVD.

Le demandeur de prix n'est pas actuellement tenu de payer des taxes au MVD. Le demandeur peut offrir une récompense au proposant qui répond à une demande de prix, mais la valeur de la récompense est fixée à `0` dans cet exemple.

Le proposant dépose une caution avec son prix, qui sera remboursée si le prix n'est pas contesté, ou si un litige est résolu en faveur du proposant. Dans le cas contraire, cette caution est utilisée pour payer les frais finaux au MVD et verser une récompense au contestant qui a réussi.

Dans la démo, le demandeur n'exige pas de caution supplémentaire de la part du proposant du prix, en sorte que la caution totale déposée est égale à la taxe finale de 0,2 wETH actuellement. Voir la `proposePriceFor` fonction dans le `OptimisticOracle`[contrat](https://docs-dot-uma-protocol.appspot.com/uma/contracts/OptimisticOracle.html) pour les détails de mise en œuvre.

## Exécuter la Démo {#running-the-demo}

1. Assurez-vous d'avoir suivi toutes les étapes de configuration préalables [ici](https://docs.umaproject.org/developers/setup).
2. Exécuter une instance locale de Ganache (c'est-à-dire pas Kovan/Ropsten/Rinkeby/Réseauprincipal) avec`yarn ganache-cli --port 9545`
3. Dans une autre fenêtre, migrez les contrats en exécutant la commande suivante:

  ```bash
  yarn truffle migrate --reset --network test
  ```

1. Pour déployer le  `OptimisticDepositBox`[contrat](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol) et passer par un simple flux d'utilisateur, exécutez le script de démonstration suivant depuis la racine du dépôt:

```bash
yarn truffle exec ./packages/core/scripts/demo/OptimisticDepositBox.js --network test
```

Vous devriez voir le résultat suivant:

```
1. Deploying new OptimisticDepositBox
  - Using wETH as collateral token
  - Pricefeed identifier for ETH/USD is whitelisted
  - Collateral address for wETH is whitelisted
  - Deployed an OptimisticOracle
  - Deployed a new OptimisticDepositBox


2. Minting ERC20 to user and giving OptimisticDepositBox allowance to transfer collateral
  - Converted 10 ETH into wETH
  - User's wETH balance: 10
  - Increased OptimisticDepositBox allowance to spend wETH
  - Contract's wETH allowance: 10


3. Depositing ERC20 into the OptimisticDepositBox
  - Deposited 10 wETH into the OptimisticDepositBox
  - User's deposit balance: 10
  - Total deposit balance: 10
  - User's wETH balance: 0


4. Withdrawing ERC20 from OptimisticDepositBox
  - Submitted a withdrawal request for 10000 USD of wETH
  - Proposed a price of 2000000000000000000000 ETH/USD
  - Fast-forwarded the Optimistic Oracle and Optimistic Deposit Box to after the liveness window so we can settle.
  - New OO time is [fast-forwarded timestamp]
  - New ODB time is [fast-forwarded timestamp]
  - Executed withdrawal. This also settles and gets the resolved price within the withdrawal function.
  - User's deposit balance: 5
  - Total deposit balance: 5
  - User's wETH balance: 5
```

## Explication des Fonctions du Contrat {#explaining-the-contract-functions}

Le [code du contrat](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol)`OptimisticDepositBox` montre comment interagir avec l'Oracle.

La `constructor` fonction comprend un `_finderAddress`argument pour le contrat UMA`Finder`, qui tient un registre de l'`OptimisticOracle` adresse, des listes blanches de garanties et d'identifiants de prix approuvés, et d'autres adresses importantes du contrat.

Cela permet au `constructor` de vérifier que le type de garantie et l'identifiant du prix sont valides, et permet au `OptimisticDepositBox` de trouver et d'interagir avec `OptimisticOracle` par la suite.

La  `requestWithdrawal`fonction  comprend un appel interne au  `OptimisticOracle`pour demander le `ETH/USD`prix. Une fois qu'il a été rendu, l'utilisateur peut appeler `executeWithdrawal`pour compléter le retrait.

Il y a beaucoup plus d'informations et d'explications dans les commentaires du code, donc s'il vous plaît jeter un oeil si vous êtes intéressé à en apprendre plus.

## Ressources Supplémentaires {#additional-resources}

Voici quelques ressources supplémentaires concernant le MVD de l'UMA:

- [Architecture Technique](https://docs.umaproject.org/oracle/tech-architecture)
- [Architecture Économique](https://docs.umaproject.org/oracle/econ-architecture)
- [Article de blog](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8) sur la conception du MVD de l'UMA
- [Livre blanc](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf) sur la conception du MVD de l'UMA
- [Recherche de la repo](https://github.com/UMAprotocol/research)  pour une politique de frais optimal
- [UMIP repo](https://github.com/UMAprotocol/UMIPs) pour les propositions de gouvernance
