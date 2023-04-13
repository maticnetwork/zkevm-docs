---
id: consensys-framework
title: Scaling Framework FAQ
sidebar_label: Scaling Framework FAQ
description: Erstelle deine nächste Blockchain-App auf Polygon.
keywords:
  - docs
  - matic
  - wiki
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Dieser Framework ist von Consensys [Four Fragen abgeleitet, um jede Skalierungslösung zu beurteilen.](https://consensys.net/?p=19015&preview=true&_thumbnail_id=19017)

## Wer betreibt es? {#who-operates-it}
Miner-Knoten im Ethereum Mainnet bringen das Netzwerk voran oder „betreiben“ es, indem sie Proofs of Work lösen und neue Blöcke erstellen. Die L2-Lösung erfordert eine ähnliche „Betreiber“-Rolle in ihrem Netzwerk, die das Miner-Äquivalent zum Ethereum Mainnet ist und das L2-Netzwerk voranbringen kann. Es gibt jedoch ein paar Unterschiede. Zum Beispiel kann ein L2-Betreiber nicht nur wie ein Miner Transaktionen verarbeiten und autorisieren, sondern Benutzern auch das Betreten und Verlassen der L2-Schicht selbst erleichtern.

### - Wer oder was wird benötigt, um das Proof-of-Stake-Netzwerk von Polygon zu betreiben? {#who-or-what-is-required-to-operate-the-polygon-proof-of-stake-network}

Die Polygon PoS-Commit-Chain stützt sich auf eine Reihe von Validatoren, die das Netzwerk sichern. Die Rolle der Validatoren besteht darin, einen vollständigen Knoten zu betreiben, Blöcke zu produzieren, zu validieren und am Konsens teilzunehmen und Checkpoints auf die Ethereum Mainchain zu übertragen. Um ein Validator zu werden, muss man seine MATIC-Token mit Staking-Management-Contracts staken, die sich auf der Ethereum Mainchain befinden.

Für weitere Details siehe den [Abschnitt Validator](/maintain/validate/getting-started.md).

### - Wie werden sie zu Betreibern im Polygon PoS-Netzwerk? Welche Regeln müssen sie einhalten? {#how-do-they-become-operators-in-the-polygon-pos-network-what-rules-do-they-abide-by}

Um ein Validator zu werden, muss man seine MATIC-Token mit Staking-
 Management-Contracts staken, die sich auf der Ethereum Mainchain befinden.

Die Belohnungen werden an alle Staker proportional zu ihrem Stake an jedem Checkpoint ausgeschüttet, mit der Ausnahme, dass der Antragsteller einen zusätzlichen Bonus erhält. Der Belohnungssaldo des Benutzers wird in dem Contract aktualisiert, auf den beim
 Einfordern von Belohnungen verwiesen wird.

Es besteht die Gefahr, dass die Stakes gekürzt werden, wenn der Prüfknoten
eine böswillige Handlung begeht, wie z. B. „Double-Signing“ oder eine Ausfallzeit des Validators vorliegt, die sich auch auf die verbundenen
Delegatoren an diesem Checkpoint auswirkt.

Für mehr Details siehe unter: [End-to-end zu einem Polygon Validator](/maintain/polygon-basics/who-is-validator.md#end-to-end-flow-for-a-polygon-validator) und [Responsibilities eines Prüfers](/maintain/validate/validator-responsibilities.md).


### - Welche Vertrauensannahmen müssen die Polygon-PoS-Benutzer über den Betreiber treffen? {#what-trust-assumptions-must-the-polygon-pos-users-make-about-the-operator}

Die Polygon-PoS-Commit-Chain stützt sich auf eine Reihe von Validatoren, die das Netzwerk sichern. Die Rolle der Validatoren besteht darin, einen vollständigen Knoten zu betreiben, Blöcke zu produzieren, zu validieren und am Konsens teilzunehmen und Checkpoints auf der Mainchain zu übertragen. Um ein Validator zu werden, muss man seine MATIC-Token mit Staking-Management-Contracts staken, die sich auf der Mainchain befinden.
Solange ⅔ des gewichteten Stakes der Validatoren ehrlich ist, läuft die Chain korrekt weiter.

### - Wofür sind die Betreiber zuständig? Welche Befugnisse haben sie? {#what-are-the-operators-responsible-for-what-power-do-they-have}

Die Rolle der Validatoren besteht darin, einen vollständigen Knoten zu betreiben, Blöcke zu produzieren, zu validieren und am Konsens teilzunehmen und Checkpoints in der Mainchain zu übertragen.

Die Validatoren haben die Befugnis, den Fortschritt der Chain zu stoppen, Blöcke neu zu ordnen usw., wenn ⅔ der Validatoren des gewichteten Stakes nicht ehrlich sind. Sie haben nicht die Befugnis, den Zustand, die Asset-Salden der Benutzer usw. zu ändern.

### - Was sind die Beweggründe, ein Betreiber des Polygon PoS zu werden? {#what-are-the-motivations-to-become-an-operator-of-the-polygon-pos}

Validatoren setzen ihre MATIC-Token als Sicherheit ein, um für die Sicherheit des Netzwerks zu arbeiten, und erhalten im Gegenzug für ihre Dienste Belohnungen.

Bitte verweise auf [Was ist der Anreiz](/maintain/validator/rewards.md#what-is-the-incentive) für weitere Details.

## Wie ist die Datenlage? {#how-s-the-data}
Per definitionem muss eine Layer-2-Technologie inkrementelle Daten-Checkpoints auf einem Layer 1 (Ethereum Mainnet) erstellen. Unsere Sorge gilt also der Zeit zwischen diesen regelmäßigen Layer-1-Check-ins. Insbesondere stellt sich folgende Frage: Wie werden Layer-2-Daten generiert, gespeichert und verwaltet, wenn sie sich nicht im sicheren Hafen von Layer 1 befinden? Dies beschäftigt uns am meisten, weil der Benutzer dann am weitesten von der vertrauenswürdigen Sicherheit eines öffentlichen Mainnets entfernt ist.

### - Wie lauten die Sperrbedingungen für Polygon PoS? {#what-are-the-lock-up-conditions-for-polygon-pos}

Bei den meisten Token-Designmustern wird der Token auf Ethereum gemintet und kann an Polygon PoS gesendet werden. Um einen solchen Token von Ethereum zu Polygon PoS zu verschieben, muss der Benutzer Geldmittel in einem Contract auf Ethereum sperren – und dann werden die entsprechenden Token auf Polygon PoS gemintet.

Dieser Bridge-Relay-Mechanismus wird von den Polygon PoS-Validatoren ausgeführt, die sich zu ⅔ über das gesperrte Token-Ereignis auf Ethereum einigen müssen, um den entsprechenden Token-Betrag auf Polygon PoS zu minten.

Die Abhebung von Assets auf Ethereum ist ein zweistufiger Prozess, bei dem die Asset-Token zuerst auf der Polygon PoS-Commit-Chain verbrannt werden müssen, wonach der Nachweis für diese Burn-Transaktion auf die Ethereum-Chain übermittelt werden muss.


Weitere Details findest du unter [Steps zur Nutzung der PoS Bridge](/develop/ethereum-polygon/pos/getting-started.md#steps-to-use-the-pos-bridge) auf.

### - Wie schnell sind diese Geldmittel auf dem Polygon PoS verfügbar? {#how-soon-are-those-funds-available-on-the-polygon-pos}

Etwa ~22-30 Minuten. Dies geschieht über einen Message passing genannt `state sync`. Mehr Details findest du [hier](/pos/state-sync/state-sync-mechamism.md).

Bietet Polygon PoS Unterstützung für Benutzer, die ohne L1-Sperre einsteigen (d. h. wenn ein Benutzer, der direkt auf Polygon integriert ist, dann zum Ethereum Mainnet wechseln möchte)?

Ja, dafür wird ein spezieller Bridge-Mechanismus verwendet. Wenn der Benutzer zu Ethereum wechseln möchte, werden die Token nicht wie üblich durch einen speziellen Contract freigeschaltet, sondern gemintet.

Über sie kannst du [hier](/develop/ethereum-polygon/mintable-assets.md) lesen.

### - Wie kann ein Benutzer eine ungültige Polygon-PoS-Transaktion anfechten? Eine gültige Polygon-PoS-Transaktion nachweisen? {#how-would-a-user-dispute-an-invalid-polygon-pos-transaction-prove-a-valid-polygon-pos-transaction}

Es gibt derzeit keine Möglichkeit auf der Chain, eine ungültige Polygon-PoS-Transaktion anzufechten. Prüfer der Polygon PoS Chain reichen jedoch periodische Checkpoints an Ethereum ein. Mehr Details findest du [hier](/pos/heimdall/modules/checkpoint.md). Es ist möglich, eine Transaktion auf Polygon PoS Chain auf Ethereum zu überprüfen, indem du einen Merkle Tree Proof erstellt und ihn gegen die periodischen Checkpoints überprüfst, die auf Ethereum der Polygon PoS Transaktion und dem Erhalt der Merkle Tree Roots geschehen.

### - Sobald ein Polygon Benutzer austreten möchte, wie bald ist der gesperrte Layer 1 Fonds (plus oder abzüglich von L2-Gewinne oder -Verlusten) wieder auf L1 verfügbar? {#once-a-polygon-user-wishes-to-exit-how-soon-are-the-locked-up-layer-1-fund-plus-or-minus-any-l2-gains-or-losses-available-back-on-l1}

Etwa ~1-3 Stunden abhängig von der Häufigkeit der [Checkpoints](/pos/heimdall/modules/checkpoint.md). Die Häufigkeit hängt hauptsächlich von den Kosten ab, die die Validatoren bereit sind, für ETH-Gasgebühren auszugeben, um Checkpoints einzureichen.

### - Gehen Sie davon aus, dass es Liquiditätsanbieter auf Layer 1 gibt, die bereit sind, bestehenden Polygon-PoS-Benutzern sofort rückzahlbare L1-Geldmittel zur Verfügung zu stellen? {#do-you-anticipate-there-being-liquidity-providers-on-layer-1-willing-to-provide-immediately-redeemable-l1-funds-to-existing-polygon-pos-users}

Es gibt bereits ein paar Spieler, wie [Connext](https://connext.network/) und [Biconomy](https://biconomy.io/), die diesen Service anbieten oder erbringen. Es gibt eine Reihe von anderen Anbietern, die ebenfalls schon bald live gehen werden.

## Wie sieht es aus mit Stack? {#how-s-the-stack}
Der Vergleich der Stacks ist wichtig, um zu verdeutlichen, was sich auf dem Layer 2 gegenüber dem Ethereum Mainnet geändert hat und was nicht.

### - Wie viel hat der Polygon-PoS-Stack mit dem Ethereum-Mainnet-Stack gemeinsam? {#how-much-does-the-polygon-pos-stack-share-with-the-ethereum-mainnet-stack}

Wenn du ein Ethereum-Entwickler bist, bist du bereits ein Polygon-PoS-Entwickler. Alle Tools, die du kennst, werden von Polygon PoS standardmäßig unterstützt: Truffle, Remix, Web3js und viele, viele mehr.

Die EVM-Schnittstelle für Polygon PoS hat sich im Vergleich zu Ethereum nicht wesentlich verändert.

### -  Worin unterscheidet sich das Polygon PoS vom Ethereum Mainnet-Stack und welche Risiken/Belohnungen ergeben sich daraus? {#where-does-the-polygon-pos-differ-from-ethereum-mainnet-stack-and-what-risks-rewards-does-that-introduce}

Keine wesentlichen Änderungen.

## Auf das Schlimmste vorbereitet sein {#preparing-for-the-worst}
Wie bereitet sich das Polygon PoS-System vor auf:

### -  Einen Massenaustritt von Benutzern? {#a-mass-exit-of-users}

Solange ⅔ der Validatoren ehrlich sind, sind die Geldmittel auf der Chain sicher. Wenn diese Annahme nicht zutrifft, kann in einem solchen Szenario die Chain unterbrochen oder neu geordnet werden. Ein gesellschaftlicher Konsens ist erforderlich, um die Chain von einem früheren Zustand aus neu zu starten – einschließlich Schnappschüssen des Polygon PoS-Zustands, die über Checkpoints übermittelt werden, die dazu verwendet werden können.

### - Polygon-Teilnehmer, die versuchen, den Polygon-Konsens auszutricksen. Zum Beispiel durch die Bildung eines Kartells? {#polygon-participants-attempting-to-game-the-polygon-consensus-for-example-by-forming-a-cartel}

Ein gesellschaftlicher Konsens ist erforderlich, um die Chain von einem früheren Zustand aus neu zu starten, indem diese Validatoren entfernt werden und die Chain mit einem neuen Satz von Validatoren neu gestartet wird – einschließlich Schnappschüssen des Polygon-PoS-Zustands, die über Checkpoints übermittelt werden, die dazu verwendet werden können.


### - Einen erkannten Fehler oder einen Exploit in einem kritischen Teil des Systems? {#a-bug-or-exploit-discovered-in-a-critical-part-of-its-system}

Bei der Entwicklung des Systems wurde darauf geachtet, dass kampferprobte Komponenten wiederverwendet werden. Wenn jedoch ein Fehler oder ein Exploit in einem kritischen Teil des Systems auftritt, ist die Wiederherstellung der Chain zu einem früheren Zustand durch gesellschaftlichen Konsens der wichtigste Lösungsweg.
