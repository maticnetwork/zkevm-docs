---
id: move-stake
title: Stake verschieben
description: Bewege deinen Einsatz auf Polygon Netzwerk
keywords:
  - docs
  - polygon
  - matic
  - stake
  - move stake
  - validator
  - delegator
slug: move-stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Stake von Foundation-Knoten zu externen Knoten verschieben {#moving-stake-from-foundation-nodes-to-external-nodes}

<video loop autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/staking/MoveStakeDemo.mp4"></source>
  <source type="video/quicktime" src="/img/staking/MoveStakeDemo.mov"></source>
  <p>Dein Browser unterstützt das Video-Element nicht.</p>
</video>

Delegatoren haben jetzt die Möglichkeit, ihren Stake von den Foundation-Knoten auf einen externen Knoten ihrer Wahl zu verschieben, indem sie die Funktion „Stake verschieben„ auf der Staking-UI nutzen

Die Übertragung des Stake vom Foundation-Knoten zum externen Knoten ist eine einzige Transaktion. Während dieses Events gibt es also keine Verzögerungen bzw. können in diesem Zeitraum Bindungen nicht aufgehoben werden.

Bitte beachte, dass das Verschieben von Stake nur von Foundation-Knoten zu externen Knoten erlaubt ist. Wenn du deinen Stake von einem externen Knoten auf einen anderen externen Knoten verschieben willst, musst du zuerst die Bindung aufheben und dann auf dem neuen externen Knoten delegieren.

Außerdem ist die Funktion „Stake verschieben„ eine temporäre Funktion, die vom Polygon-Team entwickelt wurde, um einen reibungslosen Übergang von Geldern von den Foundation-Knoten zu externen zu gewährleisten. Und bleibt nur so lange aktiv, bis die Foundation-Knoten ausgeschaltet werden.

## Wie man Stake verschieben kann {#how-to-move-stake}

Um den Einsatz verschieben, musst du dich zuerst mit deiner Delegator-Adresse in die [Staking UI](https://wallet.polygon.technology/staking) anmelden.

**Delegator-Adresse** : Die Adresse, die du bereits für das Staking auf den Foundation-Knoten verwendet hast.

Sobald du angemeldet bist, wirst du eine Liste der Validatoren sehen.

<img src={useBaseUrl("img/staking/validator-list.png")} />

Gehe nun zu deinem Delegator-Profil, indem du auf die Schaltfläche **Delegator-Details anzeigen** oder auf der linken Seite die Option **Meine Delegator-Details** klickst.

<img src={useBaseUrl("img/staking/show-delegator-details.png")} />

Hier findest du einen neuen Button namens **Move Stake**.

<img src={useBaseUrl("img/staking/move-stake-button.png")} />

Wenn du auf diese Schaltfläche klickst, wirst du zu einer Seite mit einer Liste von Prüfern weitergeleitet, an die du delegieren kannst. Du kannst an jeden Prüfer auf dieser Liste delegieren.

<img src={useBaseUrl("img/staking/move-stake-validator.png")} />

Nachdem du deinen Prüfer ausgewählt hast, den du delegieren möchtest, klicke auf die Schaltfläche **Hier** übertragen. Wenn du auf diesen Button klickst, öffne ein Popup-Fenster.

<img src={useBaseUrl("img/staking/stake-funds.png")} />

Hier siehst du ein **Feld** Amos, das automatisch mit dem gesamten Betrag für die Delegation ausgefüllt wird. Du kannst auch einen Teilbetrag verwenden, um ihn an einen Prüfer zu delegieren.

Beispiel: Wenn du 100 Matic-Token an Foundation-Knoten 1 delegiert hast und nun deinen Stake vom Foundation-Knoten zu einem externen Knoten verschieben möchtest, kannst du einen Teilbetrag an den externen Knoten deiner Wahl – zum Beispiel 50 Matic-Token – delegieren. Die restlichen 50 Matic-Token verbleiben auf dem Foundation-Knoten 1. Du kannst dann wählen, ob du die restlichen 50 Token an einen anderen externen Knoten oder an denselben externen Knoten delegierst.

Sobald du den Betrag eingegeben hast, kannst du auf den **Stake Funds** klicken. Dieser fragt dann nach einer Bestätigung auf deiner Metamask, um die Adresse zu unterschreiben.

Sobald du die Transaktion unterzeichnet hast, wurde dein Stake erfolgreich vom Foundation-Knoten zum externen Knoten verschoben. Allerdings musst du 12 Blockbestätigungen abwarten, bis sie in der Stake-UI angezeigt werden. Wenn deine verschobenen Gelder nach 12 Blockbestätigungen noch nicht angezeigt werden, versuche, die Seite zu aktualisieren, um die aktualisierten Stakes aufzurufen.

Wenn du Fragen oder Probleme hast, reiche bitte [hier](https://support.polygon.technology/support/home) ein Ticket ein.
