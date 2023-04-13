---
id: security-models
title: Modèles de sécurité
description: PoS, Plasma et titres hybrides
keywords:
  - docs
  - matic
  - polygon
  - security
  - implementation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Modèles de sécurité {#security-models}

Polygon fournit trois types de modèles de sécurité pour un développeur pour construire leurs dApps sur :

1. [Sécurité de la preuve de participation](#proof-of-stake-security)
2. [Sécurité de Plasma](#plasma-security)
3. [Hybride (Plasma + PoS)](#hybrid)

Nous avons décrit chacun de ces modèles de sécurité proposés par Polygon et le flux de travail pour les développeurs pour chacun avec un exemple dApp ci-dessous.

## Sécurité de la preuve de participation {#proof-of-stake-security}

La sécurité Proof Stake (PoS) est fournie par la couche Heimdall & Bor qui est construite sur le dessus de Tendermint. Un point de contrôle n'est validé dans la chaîne root que lorsque ⅔ des validateurs ont signé dessus.

Pour activer le mécanisme de PoS sur notre plateforme, nous employons un ensemble de contrats de gestion de staking sur Ethereum, ainsi qu'un ensemble de validateurs incités exécutant des nœuds heimdall et bor. Cela implémente les fonctionnalités suivantes:

- La possibilité pour quiconque de miser des jetons MATIC sur le contrat intelligent Ethereum et de rejoindre le système en tant que validateur.
- Gagnez des récompenses en validant les transitions d'état sur Polygon.

Le mécanisme de PoS permet également d'atténuer le problème de l'indisponibilité des données pour nos chaînes latérales en ce qui concerne Plasma.

Nous disposons d'une couche de finalité rapide qui finalise périodiquement l'état de la chaîne latérale via des points de contrôle. La finalité rapide nous aide à cimenter l'état de la chaîne latérale. La chaîne compatible avec la machine virtuelle Ethereum (EVM) comporte peu de validateurs et un délai de blocage plus rapide avec un débit élevé. Elle privilégie l'évolutivité à un haut degré de décentralisation. Heimdall s'assure que la validation de l'état final est protégée et passe par un grand ensemble de validateurs, d'où une décentralisation élevée.

**Pour les développeurs**

En tant que développeur dApp construit sur la sécurité PoS, la procédure est aussi simple que de prendre votre contrat intelligent et de le déployer sur le réseau Polygon PoS. Cela est possible grâce à l'architecture basée sur les comptes qui active une chaîne latérale compatible avec l'EVM.

## Sécurité de Plasma {#plasma-security}

Polygon fournit des "garanties plasma" par rapport à divers scénarios d'attaque. Les deux principaux cas considérés sont les suivants :

- L'opérateur de chaîne (ou dans Polygon, la couche Heimdall) est corrompu, ou
- L'utilisateur est compromis

Dans les deux cas, si les actifs d'un utilisateur sur la chaîne plasma ont été compromis, ils doivent commencer à quitter la masse. Polygon fournit des structures sur le contrat intelligent de la chaîne root qui peuvent être exploitées. Pour plus de détails et des spécifications techniques concernant cette construction et les vecteurs d'attaque considérés, lisez [ici](https://ethresear.ch/t/account-based-plasma-morevp/5480).

En effet, la sécurité offerte par les contrats Plasma de Polygon s'appuie sur la sécurité d'Ethereum. Les fonds des utilisateurs sont uniquement menacés en cas de défaillance d'Ethereum. En bref, une chaîne plasma est aussi sûre que le mécanisme de consensus de la chaîne principale. Cela peut être extrapolé pour dire que la chaîne plasma peut utiliser des mécanismes de consensus vraiment simples et être toujours sûr.

**Pour les développeurs**

En tant que développeur dApp, si vous souhaitez construire sur Polygon avec la garantie de sécurité Plasma, vous êtes tenu d'écrire des prédicats personnalisés pour vos contrats intelligents. Cela signifie essentiellement écrire les contrats externes qui gèrent les conditions de conflit définies par les constructions plasmatiques Polygon.

## Hybride {#hybrid}

Outre la sécurité pure au plasma et la sécurité pure preuve de prise qui est possible dans dApps déployées sur Polygon, il existe également une approche hybride que les développeurs peuvent suivre - ce qui signifie simplement avoir des garanties Plasma et preuve de prise sur certains flux de travail particuliers de dApp.

Cette approche est mieux comprise avec un exemple.

Considérez une dApp de jeu avec un ensemble de contrats intelligents qui décrivent la logique du jeu. Supposons que le jeu utilise son propre jeton erc20 pour récompenser les joueurs. Alors, les contrats intelligents définissant la logique du jeu peuvent être déployés directement sur la chaîne latérale de Polygon, ce qui garantit la sécurité de la preuve de participation des contrats, tandis que le transfert du jeton erc20 peut être sécurisé par les garanties concernant Plasma et la prévention des fraudes intégrées dans les contrats de la chaîne root de Polygon.
