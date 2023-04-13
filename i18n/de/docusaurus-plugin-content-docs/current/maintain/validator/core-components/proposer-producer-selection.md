---
id: proposers-producers-selection
title: Antragsteller & Producer Auswahl
sidebar_label: Proposers & Producers
description: Proposer & blockieren die Herstellerauswahl auf Polygon
keywords:
  - docs
  - polygon
  - matic
  - proposers
  - block producers
  - selection
slug: proposers-producers-selection
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Die Block Producer für den Layer BOR sind ein Gremium, das aus dem Prüfer-Pool auf der Grundlage ihres Stakes ausgewählt wird, was in regelmäßigen Abständen geschieht. Diese Intervalle werden von der Validatoren-Governance in Bezug auf die Dynastie und das Netzwerk festgelegt.

Das Verhältnis von [Stake](/docs/maintain/glossary.md#staking) gibt die Wahrscheinlichkeit an, dass man als Mitglied des Ausschusses der [Block Producer](/docs/maintain/glossary.md#block-producer) ausgewählt wird.

## Auswahlprozess {#selection-process}

Nehmen wir an, wir haben 3 Prüfer im Pool – Alice, Bill und Clara:

* Alice setzt 100 MATIC-Tokens ein.
* Bill setzt 40 MATIC-Tokens ein.
* Clara setzt 40 MATIC-Tokens ein.

Die Prüfer erhalten Slots entsprechend dem Stake.

Da Alice 100 MATIC-Token als Stake hat und die Kosten pro Slot 10 MATIC-Token betragen, wie von der Validator-Governance behauptet, bekommt Alice insgesamt 5 Slots. Ebenso erhalten Bill und Clara insgesamt 2 Slots.

Die Prüfer Alice, Bill und Clara erhalten folgende Slots:

* [A, A, A, A, A, B, B, C, C]

Polygon mischt dann das Slot-Array von Alice, Bill und Clara und verwendet dazu die Ethereum-Blockhashes als Seed.

Das Ergebnis der Mischung ist die folgende Reihenfolge von Slots:

* [A, B, A, A, C, B, A, A, C]

Abhängig von der Gesamtzahl der Block Producer, die von der Validator-Governance festgelegt wird, verwendet Polygon die Prüfer von oben nach unten – zum Beispiel ist bei einem Satz von 5 Producern die Reihenfolge der Slots [A, B, A, A, C].

Der Producer Satz für die nächste Spanne ist als [A: 3, B:1, C:1] definiert.

Mit dem daraus resultierenden Prüfer-Set und dem [Antragsteller-Auswahlalgorithmus](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html) von Tendermint wählt Polygon für jeden Sprint auf Bor einen Producer aus.

<img src={useBaseUrl("img/validators/producer-proposer.png")} />

**Legende:**

* Dynasty: Zeit zwischen dem Ende der letzten Auktion und der Startzeit der nächsten Auktion.
* Sprint: Zeitintervall, für den der Block Producer Ausschuss ausgewählt wird.
* Spanne: Anzahl der Blöcke, die von einem einzelnen Producer produziert werden.
