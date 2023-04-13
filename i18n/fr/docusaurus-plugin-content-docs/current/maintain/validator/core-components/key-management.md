---
id: key-management
title: Gestion des clés
description: Gestion des clés du signataire et du propriétaire
keywords:
  - docs
  - polygon
  - matic
  - key
  - key management
  - signer
  - owner
slug: key-management
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Chaque validateur utilise deux clés pour gérer les activités liées au validateur sur Polygon:

* Clé du signataire
* Clé du propriétaire

## Clé du signataire {#signer-key}

La clé du signataire est l'adresse utilisée pour la signature des blocs Heimdall, des points de contrôle et d'autres activités liées à la signature.

La clé privée de l'adresse du signataire doit être située sur la machine qui exécute le nœud du validateur à des fins de signature.

La clé du signataire ne peut pas gérer le staking, les récompenses ou les délégations.

Le validateur doit conserver des ETH sur l'adresse du signataire sur le réseau principal d'Ethereum pour envoyer des [points de contrôle](/docs/maintain/glossary.md#checkpoint-transaction).

## Clé du propriétaire {#owner-key}

La clé du propriétaire est l'adresse utilisée pour miser, relancer, changer la clé du signataire, retirer les récompenses et gérer les paramètres liés à la délégation sur le réseau principal d'Ethereum. La clé privée de la clé du propriétaire doit être sécurisée à tout prix.

Toutes les transactions effectuées par le biais de la clé du propriétaire sont réalisées sur le réseau principal d'Ethereum.

La clé du signataire est conservée sur le nœud et est généralement considérée comme un portefeuille **dynamique**, tandis que la clé du propriétaire est censée être très sécurisée, est rarement utilisée et est généralement considérée comme un portefeuille **froid**. Les fonds jalonnés sont contrôlés par la clé du propriétaire.

Cette séparation des responsabilités entre les clés du signataire et du propriétaire est faite pour assurer un compromis efficace entre la sécurité et la facilité d'utilisation.

Les deux clés sont des adresses compatibles avec Ethereum et fonctionnent exactement de la même manière.

## Changement de signataire {#signer-change}

Voir [Modifier l'adresse du signataire](/docs/maintain/validate/change-signer-address).
