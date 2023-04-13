---
id: validator-staking-operations
title: Participation sur Polygon
description: Apprenez à mettre en jeu comme validateur sur le réseau Polygon
keywords:
  - docs
  - matic
  - polygon
  - stake
  - claim
  - unstake
slug: validator-staking-operations
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Prérequis {#prerequisites}

### Configuration complète de nœuds {#full-node-set-up}

Votre nœud validateur entièrement configuré et synchronisé. Voir aussi:

* [exécutez un nœud validateur](run-validator.md)
* [Exécuter un nœud validateur avec Ansible](run-validator-ansible.md)
* [Exécuter un nœud de validation à partir de binaires](run-validator-binaries.md)

### Configuration de compte {#account-setup}

Sur votre nœud validateur, vérifiez que le compte est configuré. Pour vérifier, exécutez la commande suivante **sur le nœud de validation** :

```sh
    heimdalld show-account
```

Votre résultat devrait apparaître dans le format suivant :

```json
{
    "address": "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
    "pub_key": "0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19"
}
```

Cela affichera votre adresse et la clé publique de votre nœud de validation. Notez que **cette adresse doit correspondre à votre adresse signataire sur Ethereum**.

### Afficher une clé privée {#show-private-key}

Cette étape est facultative.

Sur votre nœud validateur, vérifiez que la clé privée est correcte. Pour vérifier, exécutez la commande suivante **sur le nœud de validation** :

```sh
heimdalld show-privatekey
```

Le résultat suivant devrait apparaître :

```json
{
    "priv_key": "0x********************************************************"
}
```

## Participation sur Polygon {#stake-on-polygon}

Vous pouvez participer à Polygon en utilisant le [tableau de bord du validateur](https://staking.polygon.technology/validators/).

### Miser en utilisant le tableau de bord de staking {#stake-using-the-staking-dashboard}

1. Accédez au [tableau de bord du validateur](https://staking.polygon.technology/validators/).
2. Connectez-vous avec votre portefeuille. MetaMask est le portefeuille recommandé. Vous devez vous assurer de vous connecter à l'aide de la même adresse où sont présents vos jetons MATIC.
3. Cliquez sur **Devenir un validateur**. Vous serez invité à configurer votre nœud. Si vous n'avez pas encore configuré votre nœud, il est indispensable de le faire, sinon vous recevrez une erreur lorsque vous essaierez de miser.
4. Sur l'écran suivant, ajoutez vos coordonnées de validateur, le taux de commission et le montant de la mise.
5. Cliquez sur **Miser maintenant**

Une fois la transaction terminée, vous aurez réussi à participer pour devenir validateur. Il vous sera demandé trois fois de confirmer la transaction.

* Approuver la transaction — ceci approuvera votre transaction de participation.
* Participation — ceci confirmera votre transaction de participation.
* Sauvegarde — ceci permettra de sauvegarder vos coordonnées de validateur.

:::note

Les changements prendront effet sur le [tableau de bord de staking](https://staking.polygon.technology/account) si un minimum de 12 confirmations de blocs est effectué.

:::

### Consulter le solde {#check-the-balance}

Pour vérifier le solde de votre adresse :

```sh
heimdallcli query auth account SIGNER_ADDRESS --chain-id CHAIN_ID
```

où

* SIGNER_ADDRESS — votre [adresse de signataire](/docs/maintain/glossary.md#validator).
* CHAIN_ID — identifiant de la chaîne du réseau principal de Polygon avec le préfixe du client : `heimdall-137`.

Le résultat suivant devrait apparaître :

```json
address: 0x6c468cf8c9879006e22ec4029696e005c2319c9d
coins:
- denom: matic
amount:
    i: "1000000000000000000000"
accountnumber: 0
sequence: 0
```

### Réclamer des récompenses en tant que validateur {#claim-rewards-as-a-validator}

Une fois que vous avez été configuré et que vous êtes devenu validateur, vous gagnerez des récompenses en accomplissant vos tâches de validateur. Lorsque vous remplissez consciencieusement les fonctions de validateur, vous êtes récompensé.

Pour réclamer des récompenses, vous pouvez vous rendre sur le [tableau de bord de votre validateur](https://staking.polygon.technology/account).

Deux boutons apparaissent sur votre profil :

* Retirer la récompense
* Relancer la récompense

#### Retirer la récompense {#withdraw-reward}

En tant que validateur, vous gagnez des récompenses tant que vous accomplissez correctement les tâches liées à votre fonction.

En cliquant sur **Retirer la récompense**, vos récompenses seront transférées dans votre portefeuille.

Le tableau de bord sera mis à jour après 12 confirmations de bloc.

#### Relancer la récompense {#restake-reward}

Relancer vos récompenses est un moyen facile d'augmenter votre participation en tant que validateur.

En cliquant sur **Relancer la récompense**, vous remettez en jeu votre récompense et augmenterez votre mise.

Le tableau de bord sera mis à jour après 12 confirmations de bloc.
