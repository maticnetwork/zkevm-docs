---
id: responsibilities
title: Responsabilités
description: Les responsabilités d'être un validateur sur le réseau Polygon
keywords:
  - docs
  - matic
  - polygon
  - validate
  - validator
  - responsibilities
slug: responsibilities
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Tenez-vous au courant

Restez informés des dernières mises à jour de nœud et de validateurs de l'équipe Polygon et de la communauté en vous abonnant aux groupes de [notification Polygon](https://polygon.technology/notifications/).

:::

Un validateur de blockchain est quelqu'un qui est responsable de la validation des transactions au sein d'une blockchain. Sur le réseau Polygon, n'importe quel participant peut être qualifié pour devenir validateur de Polygon, en exécutant un **nœud validateur (Sentry + validateur)** pour gagner des récompenses et collecter des frais de transaction. Pour assurer la bonne participation des validateurs, ils verrouillent au moins 1 jeton MATIC en tant que mise dans l'écosystème.

:::info

Actuellement, il existe une limite de 100 validateurs actifs à la fois. Pour une description détaillée sur ce qu'est un validateur, consultez [Validateur](/maintain/validator/architecture).

De plus, après que la [<ins>proposition de gouvernance PIP4</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956) sera mise en œuvre au niveau des contrats, le montant minimum de mise en place augmentera à 10 000 MATIC.

:::

Tout [validateur](/maintain/glossary.md#validator) sur le réseau Polygon a les responsabilités suivantes :

* Opérations de nœuds techniques (effectuées automatiquement par les nœuds)
* Opérations
  * Maintenir une disponibilité élevée
  * Vérifiez les services et les processus liés aux nœuds quotidiennement
  * Exécuter la surveillance des nœuds
  * Gardez le solde ETH (entre 0,5 et 1) sur l'adresse du signataire
* Délégation
  * Soyez ouvert à la délégation
  * Communiquer les taux de commission
* Communication
  * Signaler un problème
  * Fournir des commentaires et des suggestions
* Gagnez des récompenses staking pour valider des blocs sur la blockchain

## Opérations techniques des nœuds {#technical-node-operations}

Les opérations des nœuds techniques suivantes sont **effectuées automatiquement par les nœuds :**

* Sélection des producteurs de blocs :
  * Sélectionner un sous-ensemble de validateurs pour le bloc producteur défini pour chaque [span](/docs/maintain/glossary.md#span)
  * Pour chaque span, sélectionnez à nouveau le producteur de blocs défini sur [Heimdall](/maintain/glossary.md#heimdall) et transmettez périodiquement les informations de sélection à [Bor](/maintain/glossary.md#bor).
* Validation des blocs sur Bor :
  * Pour un ensemble de blocs de la chaîne latérale Bor, chaque validateur lit indépendamment les données des blocs pour le compte de ces blocs et valide les données sur Heimdall.
* Ajout des points de contrôle :
  * Un [proposant](/maintain/glossary.md#proposer) est choisi parmi les validateurs pour chaque bloc de Heimdall. Le proposant de [point de contrôle](/maintain/glossary.md#checkpoint-transaction) crée le point de contrôle des données de bloc Bor, valide et diffuse la transaction signée pour obtenir le consentement des autres validateurs.
  * Si plus de deux ou trois des validateurs actifs parviennent à un consensus sur le point de contrôle, celui-ci est soumis au réseau principal d'Ethereum.
* Synchroniser les modifications aux contrats de staking Polygon sur Ethereum :
  * Suite à l'étape de l'ajout de point de contrôle, étant donné qu'il s'agit d'un appel réseau externe, la transaction de point de contrôle sur Ethereum peut être confirmée ou non, ou peut être mise en attente en raison de problèmes de congestion sur Ethereum.
  * Dans ce cas, un `ack/no-ack`processus est suivi pour s'assurer que le prochain point de contrôle contient également un snapshot des blocs Bor précédents. Par exemple, si le point de contrôle 1 est pour les blocs Bor 1-256, et qu'il a échoué pour une raison quelconque, le prochain point de contrôle 2 sera pour les blocs Bor 1-512. Voir aussi [Architecture Heimdall : point de contrôle](/pos/heimdall/checkpoint).
* Synchronisation de l'état du réseau principal d'Ethereum à la chaîne latérale Bor :
  * L'état du contrat peut être déplacé entre Ethereum et Polygon, en particulier via [Bor](/maintain/glossary.md#bor) :
  * Un contrat DApp sur Ethereum lance une fonction sur un contrat Polygon spécial sur Ethereum.
  * L'événement correspondant est relayé à Heimdall puis à Bor.
  * Une transaction de synchronisation d'état est lancée sur un contrat intelligent Polygon et le DApp peut obtenir la valeur sur Bor via une activation de fonction sur Bor lui-même.
  * Un mécanisme similaire est en place pour envoyer l'état de Polygon à Ethereum. Voir aussi [Mécanisme de synchronisation d'état](/docs/pos/state-sync/state-sync).

## Opérations {#operations}

### Maintenir une disponibilité élevée {#maintain-high-uptime}

Le temps de fonctionnement du nœud sur le réseau Polygon est basé sur le nombre de [transactions de points de contrôle](/docs/maintain/glossary.md#checkpoint-transaction) que le nœud de validation a signées.

Toutes les 34 minutes environ, un proposant soumet une transaction de point de contrôle au réseau principal d'Ethereum. La transaction au point de contrôle doit être signée par chaque [validateur](/maintain/glossary.md#validator) sur le réseau Polygon. **Le défaut de signer une transction de point de contrôle entraîne la diminution des performances de votre nœud validateur**.

Le processus de signature des transactions de points de contrôle est automatisé. Pour vous assurer que votre nœud de validateur signe toutes les transactions de points de contrôle valides, vous devez maintenir et surveiller l'état de votre nœud.

### Vérifiez quotidiennement les services et les processus des nœuds {#check-node-services-and-processes-daily}

Vous devez vérifier tous les jours les services et les processus associés à [Heimdall](/maintain/glossary.md#heimdall) et [Bor](/maintain/glossary.md#bor). Aussi, la taille des nœuds devrait être faite régulièrement pour réduire l'utilisation du disque.

### Exécuter la surveillance des nœuds {#run-node-monitoring}

Vous devez exécuter soit :

* Les tableaux de bord Grafana fournis par Polygon. Voir le dépôt GitHub: [Configuration Matic-Jagar](https://github.com/vitwit/matic-jagar)
* Ou, utilisez vos propres outils de surveillance pour le [validateur](/maintain/glossary.md#validator) et les nœuds [sentinelles](/maintain/glossary.md#sentry)
* Le point d'extrémité Ethereum utilisé sur les nœuds doit être surveillé pour s'assurer que le nœud se trouve dans les limites de la demande

### Conserver un solde ETH {#keep-an-eth-balance}

Vous devez maintenir un montant suffisant d'ETH (devrait être toujours autour de la valeur seuil c'est-à-dire 0,5 à 1) sur votre [adresse de signataire](/maintain/glossary.md#signer-address) validateur sur le réseau principal Ethereum.

Vous avez besoin d'ETH pour :

* Signer les transactions de [point de contrôle](/maintain/glossary.md#checkpoint-transaction) proposées sur le réseau principal d'Ethereum.
* Proposer et envoyer des transactions de points de contrôle sur le réseau principal d'Ethereum.

Le fait de ne pas conserver une quantité suffisante d'ETH sur l'adresse du signataire aura les conséquence suivantes :

* Retards dans l'ajout du point de contrôle. Notez que les prix du gaz de transaction sur le réseau Ethereum peuvent fluctuer et grimper.
* Retards dans la finalité des transactions incluses dans les points de contrôle.
* Retards dans les transactions de points de contrôle ultérieures.

## Délégation {#delegation}

### Soyez ouvert à la délégation {#be-open-for-delegation}

Tous les validateurs doivent être ouverts pour la délégation de la communauté. Chaque validateur a le choix de fixer son propre taux de commission. Il n'y a pas de limite supérieure au taux de commission.

### Communiquer les taux de commission {#communicate-commission-rates}

Il est du devoir moral des validateurs de communiquer les taux de commission et les changements de taux de commission à la communauté. Les plateformes préférées pour communiquer les taux de commission sont :

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)

## Communication {#communication}

### Signaler un problème {#communicate-issues}

Communiquer les problèmes le plus tôt possible garantit que la communauté et l'équipe Polygon peuvent corriger les problèmes le plus tôt possible. Les plateformes préférées pour communiquer les taux de commission sont :

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)
* [GitHub](https://github.com/maticnetwork)

### Fournir des commentaires et des suggestions {#provide-feedback-and-suggestions}

Chez Polygon, nous apprécions vos commentaires et suggestions sur n'importe quel aspect de l'écosystème validateur. [Forum](https://forum.polygon.technology/) est la plateforme préférée pour laisser des commentaires et des suggestions.
