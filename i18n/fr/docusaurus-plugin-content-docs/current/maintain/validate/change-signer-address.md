---
id: change-signer-address
title: Modifier votre adresse de signataire
description: Changez l'adresse signer de votre validateur
keywords:
  - docs
  - matic
  - polygon
  - signer address
  - change
  - validator
slug: change-signer-address
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Pour avoir des informations sur l'adresse d'un [signataire](/docs/maintain/glossary.md#signer-address), voir [Gestion des clés](/docs/maintain/validator/core-components/key-management).

## Prérequis {#prerequisites}

Assurez-vous que votre nouveau nœud de validation est entièrement synchronisé et s'exécute avec la nouvelle adresse de signataire.

## Modifier l'adresse du signataire {#change-the-signer-address}

Ce guide fait référence à votre nœud de validation actuel en tant que nœud 1 et à votre nouveau nœud de validation en tant que nœud 2.

1. Connectez-vous au [tableau de bord de staking](https://staking.polygon.technology/) avec l'adresse de noeud 1.
2. Sur votre profil, cliquez sur **Modifier le profil**.
3. Dans le champ **Adresse du signataire**, indiquez l'adresse du nœud 2.
4. Dans le champ **Clé publique du signataire**, fournissez la clé publique du noeud 2.

Pour obtenir la clé publique, exécutez la commande suivante au niveau du nœud de validation :

   ```sh
   heimdalld show-account
   ```

Cliquez sur **Enregistrer** pour enregistrer les nouvelles informations sur votre nœud. Concrètement, cela signifie que le nœud 1 sera votre adresse qui contrôlera la mise, où les récompenses seront envoyées, etc. Le nœud 2 effectuera des activités comme la signature de blocs, la signature de points de contrôle, etc.
