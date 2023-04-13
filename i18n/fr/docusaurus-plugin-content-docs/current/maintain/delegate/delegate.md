---
id: delegate
title: Comment déléguer
description: Apprenez à devenir un délégant sur le réseau Polygon.
keywords:
  - docs
  - matic
  - polygon
  - how to delegate
  - validator
  - stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: delegate
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Comment déléguer {#how-to-delegate}

Ceci est un guide étape par étape pour vous aider à devenir un [délégant](/docs/maintain/glossary.md#delegator) sur le réseau Polygon.

La seule condition préalable est d’avoir vos jetons MATIC et ETH sur l’adresse du réseau principal d'Ethereum.

## Accéder au tableau de bord {#access-the-dashboard}

1. Dans votre portefeuille (par exemple, MetaMask), choisissez le réseau principal d'Ethereum.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/choose-eth-mainnet.png")} width="300" />
</div>
<br />

2. Connectez-vous à [Polygon Staking](https://staking.polygon.technology/).
3. Une fois que vous vous connectez, vous verrez quelques statistiques globales avec la liste des validateurs.

![img](/img/staking/home.png)

:::note

Si vous êtes un validateur, utilisez une adresse différente non validante pour vous connecter en tant que délégateur.

:::

## Déléguer à un validateur {#delegate-to-a-validator}

1. Cliquez sur **Devenez un Délégateur** ou faites défiler vers un validateur spécifique et cliquez sur **Déléguer**.

![img](/img/staking/home.png)

2. Indiquez le montant de MATIC à déléguer.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate.png")} width="500" />
</div>
<br />

3. Approuvez la transaction de délégation et cliquez sur **Déléguer**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate2.png")} width="500" />
</div>
<br />

Une fois la transaction de délégation terminée, vous verrez le message **Délégation terminée**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate3.png")} width="500" />
</div>
<br />

## Consulter vos délégations {#view-your-delegations}

Pour consulter vos délégations, cliquez sur [Mon compte](https://staking.polygon.technology/account).

![img](/img/staking/myAccount.png)

## Retirer vos récompenses {#withdraw-rewards}

1. Cliquez sur [Mon compte](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Sous votre validateur délégant, cliquez sur **Retirer ma récompense**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/withdraw-reward.png")} width="800" />
</div>
<br />

Cela permettra de retirer les récompenses en jetons MATIC sur votre adresse Ethereum.

## Remiser des récompenses {#restake-rewards}

1. Cliquez sur [Mon compte](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Sous votre validateur délégant, cliquez sur **Remiser des récompenses**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/restake-rewards.png")} width="800" />
</div>
<br />

Cela reprendra les récompenses du jeton MATIC au validateur et augmentera votre participation de délégation.

## Unbond d’un validateur {#unbond-from-a-validator}

1. Cliquez sur [Mon compte](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Sous votre validateur délégant, cliquez sur **Unbond**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond-from-validator.png")} width="800" />
</div>
<br />

Cela retirera vos récompenses du validateur et de votre enjeu entier du validateur.

Vos récompenses retirées apparaîtront immédiatement sur votre compte Ethereum.

Vos fonds de mise retirés seront verrouillés à 80 [points de contrôle](/docs/maintain/glossary.md#checkpoint-transaction).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond.png")} width="500" />
</div>
<br />

:::note

Le verrouillage des fonds pour la période d’unbonding est en place pour s’assurer qu’il n’y a pas de comportement malveillant sur le réseau.

:::

## Déplacer la mise d’un nœud à un autre nœud {#move-stake-from-one-node-to-another-node}

Le déplacement d’une mise d’un nœud à un autre nœud est une transaction unique. Il n’y a aucun délai ou période d’unbonding pendant cet événement.

1. Connectez-vous à [Mon compte](https://wallet.polygon.technology/staking/my-account) sur le tableau de bord de staking.
1. Cliquez sur **Déplacer la mise** sous votre validateur délégant.
1. Sélectionnez un validateur externe et cliquez sur **Miser ici** .

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move.png")} width="1500" />
</div>
<br />

4. Indiquez le montant de la mise et cliquez sur **Déplacer la mise**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move2.png")} width="400" />
</div>
<br />

Cela déplacera la mise. Le tableau de bord sera mis à jour après 12 confirmations de bloc.

:::info

Le jeu mobile est autorisé entre n'importe quel nœud. La seule exception est de déplacer le jeu d'un nœud Fondation vers un autre nœud Fondation qui n'est pas autorisé.

:::
