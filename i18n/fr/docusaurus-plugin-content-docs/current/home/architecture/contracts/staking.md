---
id: staking
title: Staking on Polygon
description: Staking on Polygon
keywords:
  - docs
  - polygon
  - matic
  - staking
  - unstake
  - restake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Staking on Polygon {#staking-on-polygon}

Pour le réseau Polygon, n'importe quel participant peut être qualifié pour devenir un validateur de réseau en exécutant un nœud complet. L'incitation principale pour exécuter un nœud complet pour les validateurs est de gagner des récompenses et des frais de transaction. Le validateur participant au consensus pour Polygon est incité à participer, car il reçoit des récompenses de bloc et des frais de transaction.

Étant donné que les créneaux de validateur sont limités pour le réseau, le processus pour être sélectionné comme validateur est de participer à une enchère sur chaîne qui se produit à intervalles réguliers comme défini [ici](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#a55fbd158b7d4aa89648a4e3b68ac716).

## Stake {#stake}

Si le créneau est ouvert, l'enchère est lancée aux validateurs intéressés :

- Au cours de laquelle ils enchériront sur la dernière offre faite pour le créneau.
- Le processus de participation aux enchères est décrit ici :
    - L'enchère est automatiquement démarrée dès l'ouverture du créneau.
    - Pour commencer à participer aux enchères, faites une offre `startAuction()`
    - Cela verrouillera vos actifs dans Stack Manager.
    - Si un autre validateur potentiel met plus que votre jeu, les jetons verrouillés vous seront retournés.
    - Encore une fois, vous devez jouer davantage pour gagner la vente.
- À la fin de la période de vente, le soumissionnaire le plus élevé gagne et devient un validateur sur le réseau Polygon.

:::note

Veuillez garder votre nœud complet en cours d'exécution si vous participez à la vente aux enchères.

:::

Le processus de devenir validateur après que le soumissionnaire le plus élevé gagne le slot est décrit ci-dessous:

- Enchérissez `confirmAuction()` pour confirmer votre participation.
- Bridge on Heimdall écoute à cet événement et diffuse à Heimdall.
- Après consensus, le validateur est ajouté à Heimdall mais non activé.
- Le validateur commence à valider seulement après `startEpoch`(défini [ici)](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#c1c3456813dd4b5caade4ed550f81187).
- Dès que vous `startEpoch`atteindrez, le validateur est ajouté au mécanisme consensus `validator-set`et commence à participer au commencement.

:::info Recommandé

Pour assurer la sécurité de la participation des validateurs, nous recommandons à ces derniers de fournir une adresse `signer` différente à partir de laquelle la vérification des signatures `checkPoint` sera traitée. Cela veut garder la clé de signature séparée de la clé portefeuille du validateur afin que les fonds soient protégés en cas de piratage de nœud.

:::

### Déstaker {#unstake}

Unstaking permet au validateur d'être hors du pool actif de validateurs. Afin de garantir **une Bonne Participation**, leur mise est verrouillée pour les 21 prochains jours.

Lorsque les validateurs veulent quitter le réseau et arrêter de valider des blocs et soumettre des points de contrôle, ils peuvent `unstake`. Cette action est immédiate à partir de maintenant. Après cette action, le validateur est considéré comme étant hors de l'ensemble actif des validateurs.

### Restaker {#restake}

Les validateurs peuvent également ajouter plus de enjeux dans leur montant afin de gagner plus de récompenses et d'être compétitifs pour leur place validatrice et de maintenir leur position.
