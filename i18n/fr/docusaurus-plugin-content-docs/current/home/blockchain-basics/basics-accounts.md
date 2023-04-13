---
id: accounts
title: Que sont les comptes ?
sidebar_label: Accounts
description: "Comptes externes et comptes de contrat."
keywords:
  - docs
  - matic
  - polygon
  - accounts
  - EOAs
  - contract accounts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Que sont les comptes ? {#what-are-accounts}

Le système Ethereum global est composé de comptes qui interagissent les uns avec les autres par le biais d'un cadre de passage de messages. L'interaction la plus fondamentale est celle d'envoyer une certaine valeur - comme les jetons MATIC, le jeton native de Polygon, ou $ETH, le jeton native de la blockchain Ethereum.

Chaque compte est identifié par un identifiant hexagonal de 20 octets qui est appelé une adresse - généré à partir de la clé publique du compte.

Il existe deux types de comptes: **Compte propriétaire externe** et **Comptes propriété Contrats**.

## Les comptes détenus par des tiers {#externally-owned-accounts}

Les EOA sont des comptes contrôlés par une clé privée, avec la possibilité d'envoyer des jetons et des messages.

1. Ils peuvent envoyer des transactions (transfert d'éther ou code de contrat de déclenchement),
2. sont contrôlés par des clés privées,
3. et n'ont pas de code associé.

## Les comptes détenant un contrat {#contract-owned-accounts}
Le compte propriétaire du contrat sont des comptes qui ont un code de contrat intelligent associé avec celui-ci et leur clé privée n'est pas la propriété de personne.

1. Ils ont du code associé,
2. leur exécution de code est déclenchée par des transactions ou des messages (appels) reçus d'autres contrats,
3. et lorsque ce code est exécuté - il effectue des opérations de complexité arbitraire (Turing complet) - manipule son propre stockage persistant et peut appeler d'autres contrats.

### Ressources {#resources}

- [En savoir plus sur les comptes](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#externally-owned-accounts-eoas)
