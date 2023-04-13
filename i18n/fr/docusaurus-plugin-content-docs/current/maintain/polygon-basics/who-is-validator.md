---
id: who-is-validator
title: Qui est un validateur
sidebar_label: Who is a Validator
description: "Un participant au réseau qui gère les nœuds Heimdall et Bor."
keywords:
  - docs
  - matic
  - polygon
  - validator
  - Who is a Validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Le validateur est un participant au réseau qui verrouille les jetons MATIC dans le système et exécute les nœuds de validation Heimdall et de producteurs de blocs Bor afin de contribuer à exécuter le réseau. Les validateurs stakent leurs jetons MATIC comme garantie pour travailler à la sécurité du réseau et, en échange de leur service, gagnent des récompenses.

Les récompenses sont distribuées à tous les participants proportionnellement à leur stake à chaque point de contrôle, à l'exception du proposant, qui reçoit un bonus supplémentaire. Le solde des récompenses de l'utilisateur est mis à jour dans le contrat auquel il est fait référence lorsqu'il sollicite des récompenses.

Les stakes risquent d'être réduits si le nœud de validation réalise un acte malveillant, comme la double signature, qui affecte également les délégateurs liés à ce point de contrôle.

:::tip

Ceux qui sont intéressés à sécuriser le réseau, mais ne exécutent pas un nœud complet peuvent participer en tant que [délégateurs](/docs/maintain/glossary.md#delegator).

:::

## Aperçu {#overview}

Les validateurs du réseau Polygon sont sélectionnés par un processus d'enchères sur la chaîne qui a lieu à intervalles réguliers. Ces validateurs sélectionnés participent en tant que producteurs et vérificateurs de blocs. Une fois qu'un [point de contrôle](/docs/maintain/glossary.md#checkpoint-transaction) est validé par les participants, des mises à jour sont effectuées sur la chaîne mère (le réseau principal Ethereum), qui libère les récompenses pour les validateurs en fonction de leur participation au réseau.

Polygon s'appuie sur un ensemble de [validateurs](/docs/maintain/glossary.md#validator) pour sécuriser le réseau. Le rôle des validateurs est de faire fonctionner un nœud complet, de [produire des blocs](/docs/maintain/glossary.md#block-producer), de valider et de participer au consensus, ainsi que d'engager des [points de contrôle](/docs/maintain/glossary.md#checkpoint-transaction) sur le réseau principal Ethereum. Pour devenir un validateur, il faut [staker](/docs/maintain/glossary.md#staking) ses jetons MATIC avec des contrats de gestion de staking se trouvant sur le réseau principal Ethereum.

## Composants principaux {#core-components}

[Heimdall](/docs/maintain/glossary.md#heimdall) lit les événements émis par les contrats de staking pour choisir les validateurs de l'ensemble actuel avec leur ratio de stake actualisé, qui est également utilisé par [Bor](/docs/maintain/glossary.md#bor) lors de la production de blocs.

La [délégation](/docs/maintain/glossary.md#delegator) est également enregistrée dans les contrats de staking et toute mise à jour de la puissance du validateur ou de l'[adresse du signataire](/docs/maintain/glossary.md#signer-address) du nœud ou des demandes de verrouillage entre en vigueur lorsque le prochain point de contrôle est validé.


## Flux de bout en bout pour un validateur de Polygon {#end-to-end-flow-for-a-polygon-validator}

Les validateurs configurent leurs nœuds de signature, synchronisent les données et stakent leurs jetons sur les contrats de staking du réseau principal Ethereum afin d'être acceptés comme validateurs dans l'ensemble actuel. Si un créneau est disponible, le validateur est accepté immédiatement. Sinon, il faut passer par le mécanisme de remplacement pour obtenir un créneau.

:::warning

La capacité de réception de nouveaux validateurs est limitée. Les nouveaux validateurs ne peuvent rejoindre l'ensemble actif que lorsqu'un validateur actuellement actif verrouille. Un nouveau processus d'enchères pour le remplacement des validateurs est introduit.

:::

Les producteurs de blocs sont choisis parmi l'ensemble des validateurs. Il est de la responsabilité des validateurs sélectionnés de produire des blocs pour une [durée](/docs/maintain/glossary.md#span) donnée.

Les nœuds de Heimdall valident les blocs produits, participent au consensus et engagent des points de contrôle sur le réseau principal Ethereum à intervalles définis.

La probabilité pour les validateurs d'être sélectionnés en tant que producteurs de blocs ou [proposants](/docs/maintain/glossary.md#proposer) de points de contrôle dépend du ratio de stake de chacun, qui inclut les délégations dans le pool global.

Les validateurs reçoivent des récompenses à chaque point de contrôle en fonction de leur ratio de stake, après déduction de la prime du proposant, qui est versée au proposant du point de contrôle.

Il est possible de se désengager du système à tout moment et de retirer des jetons à la fin de la période de verrouillage.

## Économie {#economics}

Voir [Récompenses](/docs/maintain/validator/rewards)

## Configuration d'un nœud de validation {#setting-up-a-validator-node}

Voir [Valider](/docs/maintain/validate/validator-index).

## Voir aussi {#see-also}

* [Responsabilités du validateur](/docs/maintain/validate/validator-responsibilities)
* [Valider](/docs/maintain/validate/validator-index)
* [FAQ du validateur](/docs/maintain/validate/faq/validator-faq)
