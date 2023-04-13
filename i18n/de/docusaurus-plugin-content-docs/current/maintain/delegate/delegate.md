---
id: delegate
title: Wie man delegiert
description: Erfahren Sie, wie man Delegator im Polygon-Netzwerk werden kann.
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

# Wie man delegiert {#how-to-delegate}

Dieser Leitfaden erklärt schrittweise, wie man ein [Delegator](/docs/maintain/glossary.md#delegator) im Polygon-Netzwerk werden kann.

Die einzige Voraussetzung ist, dass Ihre MATIC-Token und ETH auf dem Ethereum-Mainnet liegen.

## Zugriff auf das Dashboard {#access-the-dashboard}

1. In Ihrer Wallet (z.B. MetaMask) das Ethereum Mainnet auswählen.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/choose-eth-mainnet.png")} width="300" />
</div>
<br />

2. Melde dich bei [Polygon Staking](https://staking.polygon.technology/) an.
3. Sobald du dich eingeloggt hast, wirst du einige allgemeine Statistiken zusammen mit der Liste der Prüfer sehen.

![img](/img/staking/home.png)

:::note

Wenn du ein Prüfer bist, verwende eine andere nicht-validierende Adresse, um dich als Delegator anzumelden.

:::

## An einen Prüfer delegieren {#delegate-to-a-validator}

1. Auf **Delegator werden** klicken oder nach unten zu einem bestimmten Prüfer scrollen und auf **Delegieren** klicken.

![img](/img/staking/home.png)

2. Geben Sie die Anzahl der zu delegierenden MATIC an.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate.png")} width="500" />
</div>
<br />

3. Genehmigen Sie den Delegationsvorgang und klicken auf **Delegieren**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate2.png")} width="500" />
</div>
<br />

Nach Abschluss des Delegationsvorgangs wird die Meldung **Delegation abgeschlossen** angezeigt.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate3.png")} width="500" />
</div>
<br />

## Ihre Delegationen ansehen {#view-your-delegations}

Um Ihre Delegationen anzuzeigen, auf [Mein Konto](https://staking.polygon.technology/account) klicken.

![img](/img/staking/myAccount.png)

## Prämien abheben {#withdraw-rewards}

1. Auf [Mein Konto](https://staking.polygon.technology/account) klicken.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Klicken Sie unter Ihrem delegierten Prüfer auf **Prämie abheben**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/withdraw-reward.png")} width="800" />
</div>
<br />

Dadurch werden die Prämien des MATIC-Tokens an Ihre Ethereum-Adresse überwiesen.

## Prämien zurückholen {#restake-rewards}

1. Auf [Mein Konto](https://staking.polygon.technology/account) klicken.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Klicke unter deinem delegierten Prüfer auf **Prämien zurückholen**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/restake-rewards.png")} width="800" />
</div>
<br />

Dies wird die MATIC token an den Prüfer erneut beladen und deinen delegation erhöhen.

## Aufhebung der Bindung von einem Prüfer {#unbond-from-a-validator}

1. Auf [Mein Konto](https://staking.polygon.technology/account) klicken.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Klicke unter deinem delegierten Prüfer auf **Bindung aufheben**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond-from-validator.png")} width="800" />
</div>
<br />

Dies wird deine Prämien vom Prüfer und deinen gesamten Einsatz vom Prüfer zurückziehen.

Deine ausgezahlten Prämien werden sofort auf deinem Ethereum-Konto angezeigt.

Ihr abgehobenes Guthaben wird für 80 [Checkpoints](/docs/maintain/glossary.md#checkpoint-transaction) gesperrt.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond.png")} width="500" />
</div>
<br />

:::note

Die Mittelsperre für die Zeit der Aufhebung der Bindung wurde eingerichtet, damit kein missbräuchliches Handeln im Netz stattfindet.

:::

## Stake von einem Knoten zu einem anderen Knoten verschieben {#move-stake-from-one-node-to-another-node}

Die Übertragung eines Stakes von einem Knoten zu einem anderen Knoten ist eine einzige Transaktion. Während dieser Zeitspanne gibt es keine Verspätungen oder Entsperrungen.

1. Melden Sie sich unter [Mein Konto](https://wallet.polygon.technology/staking/my-account) im Staking-Dashboard an.
1. Klicken Sie unter Ihrem delegierten Prüfer auf **Stake verschieben**.
1. Wählen Sie einen externen Prüfer und klicken auf **Stake hier**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move.png")} width="1500" />
</div>
<br />

4. Die Höhe des Stakes angeben und auf **Stake verschieben** klicken.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move2.png")} width="400" />
</div>
<br />

Dadurch wird der Stake verschoben. Das Dashboard wird nach 12 Blockbestätigungen aktualisiert.

:::info

Der Moving Stake ist zwischen allen Knoten erlaubt. Die einzige Ausnahme ist das Verschieben von Stake von einem Foundation-Knoten auf einen anderen Foundation-Knoten, der nicht erlaubt ist.

:::
