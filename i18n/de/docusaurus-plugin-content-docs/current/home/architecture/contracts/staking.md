---
id: staking
title: Staking auf Polygon
description: Staking auf Polygon
keywords:
  - docs
  - polygon
  - matic
  - staking
  - unstake
  - restake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Staking auf Polygon {#staking-on-polygon}

Für das Polygon Network kann jeder Teilnehmer qualifiziert werden, um network zu werden, indem er einen vollständigen Knoten ausführt. Der primäre Anreiz, einen vollständigen Knoten für Prüfer auszuführen, ist die Ermittlung von Prämien und Transaktionsgebühren. Prüfer, die an Polygon teilnehmen, werden dazu ermutigt, da sie Blockbelohnungen und Transaktionsgebühr erhalten.

Da Validator-Slots für das Netzwerk begrenzt sind, ist der Prozess, als Validator ausgewählt zu werden, die an einer On-Chain Auktion teilnehmen soll, die in regelmäßigen Intervallen geschieht, wie [hier](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#a55fbd158b7d4aa89648a4e3b68ac716) definiert.

## Stake {#stake}

Wenn der Slot geöffnet ist, wird die Auktion für interessierte Prüfer gestartet:

- Wo sie mehr bieten als das letzte Gebot für den Slot.
- Der Prozess der Teilnahme an der Auction ist hier dargestellt:
    - Die Auktion wird nach der Eröffnung des Slots automatisch gestartet.
    - Um die Teilnahme an der Auktion zu beginnen, rufen Sie `startAuction()`an
    - Dies wird Ihre Assets im Stack Manager sperren.
    - Wenn ein anderer potenzieller Prüfer mehr als dein Einsatz setzt, werden gesperrte Token an dich zurückgesandt.
    - Du kannst wieder mehr spielen, um die Auktion zu gewinnen.
- Am Ende der Auktionsperiode gewinnt der höchste Bieter und wird ein Prüfer im Polygon-Netzwerk.

:::note

Bitte halte deinen vollständigen Knoten laufen, wenn du an der Auktion teilnimmst.

:::

Der Prozess der werden, ein Prüfer zu werden, nachdem der höchste Bieter den Slot gewinnt, wird unten beschrieben:

- Rufen Sie `confirmAuction()` an, um Ihre Teilnahme zu bestätigen.
- Bridge on Heimdall hört diese Veranstaltung und sendet an Heimdall.
- Nach dem Konsens wird Validator zu Heimdall hinzugefügt, aber nicht aktiviert.
- Validator beginnt erst nach (hier `startEpoch`[definiert)](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#c1c3456813dd4b5caade4ed550f81187) zu validieren.
- Sobald erreicht `startEpoch`wird, wird der Prüfer hinzugefügt `validator-set`und beginnt am consensus teilzunehmen.

:::info Empfohlen

Um die Sicherheit für den Stake des Prüfers zu gewährleisten, empfehlen wir Prüfern eine andere `signer`Adresse anzugeben, von der die Prüfung der  `checkPoint`sigs ausgeführt wird. Dies soll weiterhin Key getrennt von dem wallet des Validators unterzeichnen, damit Fonds geschützt werden, wenn ein node

:::

### Entfernen {#unstake}

Unstaking ermöglicht es dem Prüfer, aus dem aktiven Pool von Prüfern zu sein. Um **eine gute Teilnahme** zu gewährleisten, wird ihr Einsatz für die nächsten 21 Tage gesperrt.

Wenn Prüfer aus dem Netzwerk verlassen und die Validierung von Blöcken und die Übermittlung von Checkpoints stoppen möchten, können sie `unstake`. Diese Aktion ist sofort ab sofort verfügbar. Nach dieser Aktion wird der Prüfer aus dem aktiven Set von Prüfern berücksichtigt.

### Wiederverwenden {#restake}

Validatoren können auch mehr Einsätze in ihren Betrag hinzufügen, um mehr Prämien zu verdienen und für ihren validator wettbewerbsfähig zu sein und ihre Position zu erhalten.
