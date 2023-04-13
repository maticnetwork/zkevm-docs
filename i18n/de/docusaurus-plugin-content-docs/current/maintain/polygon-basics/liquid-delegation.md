---
id: liquid-delegation
title: Liquid Delegation
sidebar_label: Liquid Delegation
description: Wie Polygon Liquid Delegation zur Pflege des Netzes einsetzt.
keywords:
  - docs
  - polygon
  - matic
  - delegation
  - liquid delegation
slug: liquid-delegation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

In einem traditionellen Proof of Stake-Mechanismus verfolgt die Blockchain einen Überblick über eine Reihe von Prüfern. Jeder kann diesem Rang beitreten, um Transaktionen zu validieren, indem er eine spezielle Art von Transaktion sendet, die ihre Münzen einsetzt (im Ethereum's ETH) und in eine Einzahlung einschließt. Danach wird der Prozess der Erstellung und der Zustimmung zu neuen Blöcken durch einen consensus von allen aktiven Prüfern durchgeführt.

Sie sperren einen Teil ihres Einsatzes für eine bestimmte Zeit (wie eine Sicherheitseinlage) und erhalten im Gegenzug eine Chance, die proportional zu diesem Einsatz ist, den nächsten Block auszuwählen.

Staking Belohnungen werden als Anreiz an die Teilnehmer verteilt.

## Delegation {#delegation}

Staking kann teuer sein, die Barriere für den Einstieg erhöhen, was die Reichen begünstigt, reicher werden. Jeder sollte an der Netzwerksicherheit teilnehmen und Wertschätzung erhalten. Die einzige andere Option ist, an einem Staking Pool zu teilnehmen, der ähnlich einem Mining-Pool ist, auf dem Validatoren vertraut werden müssen. Wir glauben, dass das Festhalten an dem Protokoll der beste Vorgang für neue Delegatoren ist. Da Kapital und Belohnungen offen und durch in-protocol Mechanismen geschützt sind.

Delegatoren können an der Validierung teilnehmen, obwohl sie nicht ganze Knoten hosten haben. Durch das Staking mit Prüfern können sie jedoch die Stärke des Netzwerks erhöhen und Belohnungen erhalten, indem sie eine winzige commission (die je nach Prüfer variiert) an den Prüfer ihrer Wahl zahlen.

## Einschränkung des Traditional Delegators und Validators {#limitation-of-traditional-delegator-and-validator}

Aufgrund des Proof of Stake-Protokolls sind die Kosten für die Kapitalbindung sowohl für Validatoren als auch für Delegatoren hoch.

Trotzdem können wir mehr liquidity Mechanismus wie dem Prüfer NFT bringen, wo jede neue Partei, die ein Prüfer werden möchte, von einem Prüfer kaufen kann, der aus irgendeinem Grund aus dem System verlassen möchte.

Im Falle von Delegatoren wird angenommen, dass die gesperrte Menge in kleineren Chunks sein, also wollen wir, dass sie flüssig sein, damit die Teilnahme aktiver ist (d.h. wenn ein Delegator denkt, dass die Chancen jetzt groß in DeFi sind, aber ihre Kapital in Staking Pool gesperrt ist, auch für den Auszahlung, müssen sie noch 21 Tage warten).

Das Sperren von X ETH in einer Einzahlung ist nicht kostenlos; es bedeutet ein sacrifice der Optionalität für den ETH Wenn du 1000 ETH hast, kannst du alles tun, was du damit tun möchtest. Wenn du sie in einer Einzahlung sperren, ist sie monatelang dort festgehalten, um Angriffe wie [**nichts auf dem Spiel**](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed) zu verhindern und Prüfer für ihre schlechte Teilnahme zu bestrafen.

## In-Protocol vs Application Layer {#in-protocol-vs-application-layer}

Auf der Anwendungsebene staking Liquidation hat Vertrauen Problem. Die Staking Liquidation auf Protokollebene wird viel mehr geschätzt, da jeder neue Schauspieler ihr vertrauen kann (der mehr Kapital anzieht, selbst von kleineren Schauspielern/Delegierern).

## Polygons Lösung für die Delegation {#polygon-s-solution-for-delegation}

Während wir die Delegation erforschen, haben wir erkannt, dass die Delegation im Protokoll sein muss, um mehr Vertrauen von Delegatoren zu haben.

Wir hatten eine ähnliche Frage wie die validators von Prüfern konfrontiert und dachten, es zu machen, die Transfers sein und auf ähnliche Gedanken erforschen kann, wie es flüssiger gemacht werden kann und sikka-chorus.one 's [fantastisches Design wurde](https://blog.chorus.one/delegation-vouchers/) auf die Aufmerksamkeit geachtet.

Der Gedanke, sich am Validator-Pool zu beteiligen, ist eine großartige Idee, und da Polygons Staking auf einem Ethereum-Smart-Contract implementiert ist, eröffnet es uns viele weitere Optionen, wie z. B. die ERC20-Kompatibilität, sodass es in Defi-Protokollen verwendet werden kann.

Ab sofort hat jeder Prüfer seine eigene VMatic (d.h. für Prüfer Ashish wird es AMatic Token geben), weil jeder Prüfer unterschiedliche Leistung hat (Prämien und Provisionsrate). Delegatoren können mehrere validator kaufen und ihr Risiko für eine schlechte Leistung eines bestimmten Prüfers absichern.

## Vorteile {#advantages}

- Da unser Design ERC20 wie Interface in der Implementierung der Delegation folgt, können DeFi-Anwendungen einfach darauf aufgebaut werden.
- Delegierte Token können in Leihprotokollen verwendet werden.
- Delegatoren können ihr Risiko über Prognosemärkte wie Auger absichern.

Künftiger Anwendungsbereich:

- ERC20 sind derzeit nicht fungible mit anderen Prüfern ERC20 / ERC20 aber in Zukunft denken wir, dass viele neue DeFi-Anwendungen darauf aufbauen und einige Märkte für sie oder sogar bessere Produkte machen können.
- Mit [chorus.one](http://chorus.one) initiierte Forschung erforschen wir auch Probleme wie Prüfer, die ihre eigenen Token und andere Probleme kurzfristig shorting können vermieden werden, indem man den eigenen Einsatz für X Monate sperrt, und andere Dinge wie die validator (on-chain), die mehr Vertrauen für Delegierte bringt).
- Delegator zur Teilnahme an Governance-Entscheidungen.
- Während wir Delegation liquidieren, wollen wir auch die Netzwerksicherheit gewährleisten. Deshalb ist in irgendeiner Form das slash-able Kapital gesperrt, wenn es um Betrug handelt.

In Anbetracht des obigen Designs, das im Protokoll verfügbar ist, können Validatoren immer ihre eigenen ähnlichen Mechanismen implementieren und über einen Vertrag einsetzen, der in der Polygon Staking UI nicht verfügbar ist.

## Künftige Ziele {#future-goals}

Dinge wie interchain / cross-chain über Cosmos Hub und Everett B-harvest

## Ressourcen {#resources}

- [Das POS-Design von Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Intro zu Staking Derivatives](https://medium.com/lemniscap/an-intro-to-staking-derivatives-i-a43054efd51c)
- [Staking Pools](https://slideslive.com/38920085/ethereum-20-trustless-staking-pools)
- [Inflation in Proof of Stake](https://medium.com/figment-networks/mis-understanding-yield-and-inflation-in-proof-of-stake-networks-6fea7e7c0e41)
