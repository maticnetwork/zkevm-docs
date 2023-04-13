---
id: general-faq
title: Allgemeine FAQs
description: Häufige Fragen zum Polygon-Netzwerk.
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Was ist das Polygon-Netzwerk? {#what-is-polygon-network}

Das Polygon-Netzwerk ist eine Layer-2-Skalierungslösung, die Skalierung durch die Nutzung von Sidechains für Off-Chain-Berechnungen erreicht und gleichzeitig für die Sicherheit und Dezentralisierung von Assets durch Proof of Stake (PoS)-Validatoren sorgt.

Siehe auch [Was ist Polygon?](/docs/home/polygon-basics/what-is-polygon).

## Was ist Proof of Stake (PoS)? {#what-is-proof-of-stake-pos}

Der Proof-of-Stake-Mechanismus ist ein System, bei dem das Blockchain-Netzwerk versucht, einen verteilten Konsens zu erreichen. Jeder, der eine ausreichende Menge an Token besitzt, kann seine Kryptowährungen sperren. Der wirtschaftliche Anreiz liegt im gemeinsamen Mehrwert des dezentralen Netzwerks. Personen, die ihre Kryptowährungen staken, validieren Transaktionen, indem sie über diese abstimmen. Der Konsens ist erreicht, wenn eine Transaktion oder eine Reihe von Transaktionen in einem Block bzw. einer Reihe von Blöcken in einem Checkpoint genügend Stimmen erhält. Der Schwellenwert bedient sich der Gewichtung in Form von Stakes, die mit jeder Stimme hinzukommen. Bei Polygon wird zum Beispiel ein Konsens für die Übergabe von Checkpoints der Polygon-Blöcke an das Ethereum-Netzwerk erreicht, wenn mindestens ⅔ + 1 der gesamten Staking-Abstimmungsmacht dafür stimmt.

Siehe auch [Was ist der Proof of Stake?](/docs/home/polygon-basics/what-is-proof-of-stake).

## Welche Rolle spielt der Proof of Stake in der Polygon-Architektur? {#what-role-does-proof-of-stake-play-in-the-polygon-architecture}

Die Proof-of-Stake-Schicht in der Polygon-Architektur dient den folgenden 2 Zwecken:

* Sie dient als Incentivierungs-Schicht für die Aufrechterhaltung der Plasma-Chain und entschärft vor allem das heikle Problem der Nichtverfügbarkeit von Daten.
* Sie implementiert die Proof-of-Stake-Sicherheitsgarantien für Zustandsübergänge, die nicht von Plasma abgedeckt werden.

## Wie unterscheidet sich Polygon PoS von anderen ähnlichen Systemen? {#how-is-polygon-pos-different-from-other-similar-systems}

Er unterscheidet sich insofern, als er einen doppelten Zweck erfüllt: Er bietet Datenverfügbarkeitsgarantien für die Plasma-Chain, die Zustandsübergänge über Plasma-Prädikate abdeckt, sowie eine Proof-of-Stake-Validierung für generische Smart Contracts in der EVM.

Die Polygon-Architektur teilt auch den Prozess der Blockproduktion und -validierung in 2 verschiedene Layers auf. Validatoren erstellen als Blockproduzenten (wie der Name vermuten lässt) Blöcke auf der Polygon-Chain für schnellere (< 2 Sekunden) Teilbestätigungen, während die endgültige Bestätigung erreicht wird, sobald der Checkpoint auf der Mainchain mit einem bestimmten Intervall übergeben wird, dessen Dauer von verschiedenen Faktoren wie der Ethereum-Überlastung oder der Anzahl der Polygon-Transaktionen abhängen kann. Unter idealen Bedingungen dauert dies etwa 15 Minuten bis 1 Stunde.

Ein Checkpoint ist im Grunde die Merkle-Wurzel aller Blöcke, die zwischen den Intervallen produziert werden. Validatoren spielen mehrere Rollen: Sie erstellen Blöcke auf dem Blockproduzenten-Layer, nehmen am Konsens teil, indem sie alle Checkpoints signieren und übergeben den Checkpoint, wenn sie als Proposer auftreten. Die Wahrscheinlichkeit, dass ein Validator zum Blockproduzenten oder Proposer wird, hängt von seinem Stake-Anteil am Gesamtpool ab.

## Wie lässt sich der Proposer dazu bringen, alle Signaturen einzubeziehen {#encouraging-the-proposer-to-include-all-signatures}

Um den Proposer-Bonus vollständig in Anspruch nehmen zu können, muss der Proposer alle Signaturen in den Checkpoint einbeziehen. Da das Protokoll eine Gewichtung von 2/3 + 1 am Gesamt-Stake wünscht, wird der Checkpoint auch mit 80 % der Stimmen angenommen. In diesem Fall erhält der Proposer jedoch nur 80 % des berechneten Bonus.

## Wie kann ich ein Support-Ticket erstellen oder zur Polygon-Dokumentation beitragen? {#how-can-i-raise-a-support-ticket-or-contribute-to-polygon-documentation}
Wenn du denkst, dass etwas in unserer Dokumentation korrigiert werden muss oder du sogar neue Informationen hinzufügen möchtest, kannst du hier [eine Frage im Github-Onlinebereich stellen](https://github.com/maticnetwork/matic.js/issues). Die [Readme-Datei](https://github.com/maticnetwork/matic-docs/blob/master/README.md) in diesem Onlinebereich gibt dir auch einige Vorschläge, wie du zu unserer Dokumentation beitragen kannst.

Wenn du weitere Hilfe benötigst, kannst du dich jederzeit an **unser Support-Team** wenden.
