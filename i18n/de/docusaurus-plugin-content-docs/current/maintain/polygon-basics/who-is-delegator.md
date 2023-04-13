---
id: who-is-delegator
title: Wer ist ein Delegierter
description: Token-Inhaber, die keinen Knoten ausführen
keywords:
  - docs
  - matic
  - polygon
  - delegator
  - Who is a Delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Delegatoren sind Token-Inhaber, die nicht selbst einen [Validator](/docs/maintain/glossary.md#validator)-Knoten betreiben können oder wollen. Stattdessen sichern sie das Netz, indem sie ihren Anteil an die Validierungsknoten delegieren, und spielen eine entscheidende Rolle im System, da sie für die Auswahl der Validatoren verantwortlich sind. Sie führen ihre Delegationstransaktion auf der Grundlage des Staking-Vertrags im Ethereum Mainnet durch.

Die MATIC-Token sind mit dem nächsten [Checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) im Ethereum Mainnet verbunden. Delegatoren haben auch die Möglichkeit, sich jederzeit aus dem System zu verabschieden. Ähnlich wie die Validatoren müssen auch die Delegatoren das Ende der etwa 9-tägigen Bindungsfrist abwarten, bevor sie ihren Einsatz zurückziehen können.

## Gebühren und Belohnungen {#fees-and-rewards}

Delegatoren setzen ihre Token ein, indem sie sie an Validatoren delegieren und dafür einen Prozentsatz ihrer Belohnungen erhalten. Da Delegatoren Belohnungen mit ihren Validatoren teilen, teilen Delegatoren auch Risiken. Sollte sich ein Validator nicht korrekt verhalten, besteht für jeden seiner Delegatoren die Gefahr, dass er im Verhältnis zu seinem delegierten Anteil teilweise zurückgestuft wird.

Validatoren legen einen Prozentsatz für [die Kommission](/docs/maintain/glossary.md#commission) fest, um den Prozentsatz der Belohnungen zu bestimmen, der an sie geht. Die Delegatoren können den Kommissionssatz jedes Validators einsehen, um die Verteilung der Belohnungen jedes Validators und die relative Rendite ihres Einsatzes zu erfahren.

:::caution Validatoren mit einem Kommissionssatz von 100 %

Dies sind Prüfer, die alle Belohnungen nehmen und nicht nach einer Delegation suchen, da sie genügend Token haben, um auf eigene stake zu spielen.

:::

Delegatoren haben die Möglichkeit, ihre Token an andere Prüfer erneut zu delegieren. Belohnungen werden an jedem Checkpoint angesammelt.

:::tip Als aktiver Delegator

Die Delegation sollte nicht als passive Tätigkeit betrachtet werden, da die Delegatoren ein wesentlicher Bestandteil der Aufrechterhaltung vom
 Polygon-Netzwerk sind. Jeder Delegator ist für die Verwaltung seines eigenen Risikos verantwortlich, aber dabei sollten Delegatoren sich darum bemühen, Validatoren zu wählen, die sich gut verhalten.

:::

## Siehe auch {#see-also}

* [Delegieren](/docs/maintain/delegate/delegate)
* [Validator FAQ](/docs/maintain/validate/faq/validator-faq)
