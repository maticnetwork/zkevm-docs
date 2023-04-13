---
id: validator-key-management
title: Gestion clé de validateur
description: Gestion des validateurs de clés de signataire et de propriétaire
keywords:
  - docs
  - matic
  - polygon
  - Validator Key Management
  - signer
  - owner
image: https://matic.network/banners/matic-network-16x9.png
---

# Gestion clé de validateur {#validator-key-management}

Chaque validateur utilise deux clés pour gérer les activités liées aux validateurs sur Polygon. La clé du signataire est maintenue sur le nœud et est généralement considérée comme un `hot`portefeuille, tandis que la clé du propriétaire est censée être gardée en sécurité, est utilisée peu souvent et est généralement considérée comme un `cold` portefeuille. Les fonds jalonnés sont contrôlés par la clé du propriétaire.

Cette séparation des responsabilités a été faite pour assurer un compromis efficace entre la sécurité et la facilité d'utilisation. Les deux clés sont des adresses compatibles Ethereum et fonctionnent exactement de la même manière. Et oui, il est possible d'avoir les mêmes clés propriétaire et Signer.

## Clé du signataire {#signer-key}

La clé de signataire est une adresse utilisée pour signer des blocs Heimdall, des points de contrôle et d'autres activités liées à la signature. La clé privée de cette clé sera sur le nœud de validateur à des fins de signature. Il ne peut pas gérer des enjeux, des récompenses ou des délégations.

Le validateur doit conserver deux types de soldes sur cette adresse:

- Des jetons Matic sur Heimdall (à travers des transactions de Recharge) pour performer les responsabilités de validateur sur Heimdall
- ETH sur la chaîne Ethereum pour envoyer des points de contrôle sur Ethereum

## Clé du propriétaire {#owner-key}

La clé propriétaire est une adresse utilisée pour le staking, re-tire, modifier la clé staking, retirer les récompenses et gérer les paramètres liés à la délégation sur la chaîne Ethereum. La clé privée pour cette clé doit être sécurisée à tout prix.

Toutes les transactions via cette clé seront effectuées sur la chaîne Ethereum.

## Changement de signataire {#signer-change}

L'événement suivant est généré en cas de changement de signataire sur la chaîne Ethereum sur        `StakingInfo.sol`: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol)      

```go
// Signer change
event SignerChange(
  uint256 indexed validatorId,
  address indexed oldSigner,
  address indexed newSigner,
  bytes signerPubkey
);
```

Le pont de Heimdall traite ces événements et envoie des transactions sur Heimdall pour modifier l'état en fonction des événements.