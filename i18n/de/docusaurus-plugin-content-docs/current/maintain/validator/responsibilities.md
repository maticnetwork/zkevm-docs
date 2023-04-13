---
id: responsibilities
title: Zuständigkeiten
description: Die Verantwortung der als Prüfer im Polygon Network zu sein
keywords:
  - docs
  - matic
  - polygon
  - validate
  - validator
  - responsibilities
slug: responsibilities
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Immer auf dem Laufenden

Behalte mit den neuesten Node und validator aus dem Polygon Team und der Community fort, indem du die [Polygon Benachrichtigungsgruppen](https://polygon.technology/notifications/) abonnierst.

:::

Ein Blockchain-Prüfer ist jemand, der für die Validierung von Transaktionen innerhalb einer Blockchain verantwortlich ist. Auf dem Polygon Network kann jeder Teilnehmer qualifiziert werden, ein Validator von Polygon zu werden, indem er einen **Prüferknoten (Sentry + Validator)** ausführt, um Prämien zu sammeln und Transaktionsgebühren zu sammeln. Um eine gute Beteiligung der Prüfer zu gewährleisten, schließen sie mindestens 1 MATIC-Token als Anteil an dem Ökosystem ein.

:::info

Derzeit gibt es eine Grenze von 100 aktiven Prüfern auf einmal zugleich. Eine detaillierte Beschreibung darüber, was ein Prüfer ist, findest du unter [Prüfer](/maintain/validator/architecture).

Nachdem der [<ins>PIP4</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956) governance auf Vertragsebene umgesetzt wurde, wird der contract-level, auf 10.000 MATIC steigen.

:::

Jeder [Validator](/maintain/glossary.md#validator) im Polygon-Netzwerk hat die folgenden Zuständigkeiten:

* Technische Knotenoperationen (automatisch von den Knoten)
* Operationen
  * Hohe Verfügbarkeit aufrechterhalten
  * Überprüfe die knotenbezogenen Services und Prozesse täglich
  * Überwachung von Knoten ausführen
  * Halten Sie den ETH-Guthaben (zwischen 0,5 und 1) auf der Signer-Adresse
* Delegation
  * Seien Sie offen für die Delegation
  * Kommunizieren von Provisionssätzen
* Kommunikation
  * Kommunikationsprobleme
  * Feedback und Vorschläge einreichen
* Verdiene Staking Prämien für die Validierung von Blöcken auf der Blockchain

## Technische Knotenoperationen {#technical-node-operations}

Folgende technische Knotenoperationen werden **automatisch von den Knoten durchgeführt:**

* Auswahl des Blockproduzenten:
  * Wähle eine Untermenge von Validatoren für die Auswahl der Blockproduzenten für die jeweilige [Spanne](/docs/maintain/glossary.md#span) aus
  * Bestimme für jede Spanne die Auswahl der Blockproduzenten auf [Heimdall](/maintain/glossary.md#heimdall) erneut und übertrage die Auswahlinformationen regelmäßig an [Bor](/maintain/glossary.md#bor).
* Validierung von Blöcken auf Bor:
  * Für ein Set von Bor liest jeder Validator unabhängig Blockdaten für diese Blöcke und validiert die Daten auf Heimdall.
* Checkpoint-Einreichung:
  * Für jeden Heimdall-Block wird ein [Proposer](/maintain/glossary.md#proposer) aus den Validatoren ausgewählt. Der [Checkpoint](/maintain/glossary.md#checkpoint-transaction)-Proposer erstellt den Checkpoint der Bor-Blockdaten, validiert und sendet die signierte Transaktion an andere Validatoren, die ihr zustimmen müssen.
  * Wenn mehr als 2/3 der aktiven Validatoren einen Konsens am Checkpoint erreichen, wird der Checkpoint dem Ethereum Mainnet übermittelt.
* Synchronisieren Sie Änderungen an Polygon auf Ethereum:
  * Da es sich hierbei um einen externen Netzwerkaufruf handelt, kann die Checkpoint-Transaktion auf Ethereum bestätigt oder nicht bestätigt werden oder aufgrund von Überlastungsproblemen von Ethereum noch ausstehen.
  * In diesem Fall gibt es ein `ack/no-ack`-Verfahren, mit dem sichergestellt wird, dass der nächste Checkpoint auch einen Schnappschuss der vorherigen Bor-Blöcke enthält. Wenn der Checkpoint 1 beispielsweise für die Bor-Blöcke 1-256 ist und er aus irgendeinem Grund fehlschlägt, wird der nächste Checkpoint 2 für die Bor-Blöcke 1-512 sein. Siehe auch [Heimdall-Architektur: Checkpoint](/pos/heimdall/checkpoint).
* Synchronisieren des Status vom Ethereum Mainnet mit der Bor-Sidechain:
  * Der Status des Contracts kann zwischen Ethereum und Polygon verschoben werden, insbesondere durch [Bor](/maintain/glossary.md#bor):
  * Ein Dapp-Contract auf Ethereum ruft eine Funktion auf einem speziellen Polygon-Contract auf Ethereum auf.
  * Das entsprechende Event wird an Heimdall und dann an Bor weitergeleitet.
  * Sodann wird eine statussynchronisierende Transaktion auf einem Polygon Smart Contract aufgerufen und die Dapp kann den Wert auf Bor über einen Funktionsaufruf auf Bor selbst abrufen.
  * Ein ähnlicher Mechanismus ist vorhanden, um den Status von Polygon an Ethereum zu senden. Siehe auch [State-Sync-Mechanismus](/docs/pos/state-sync/state-sync).

## Operationen {#operations}

### Hohe Verfügbarkeit erhalten {#maintain-high-uptime}

Die Verfügbarkeit des Knotens im Polygon-Netz basiert auf der Anzahl der [Checkpoint-Transaktionen](/docs/maintain/glossary.md#checkpoint-transaction), die der Validierungsknoten unterzeichnet hat.

Etwa alle 34 Minuten übermittelt ein Proposer eine Checkpoint-Transaktion an das Ethereum Mainnet. Die Checkpoint-Transaktion muss von jedem [Prüfer](/maintain/glossary.md#validator) im Polygon Network signiert werden. **Wenn du eine checkpoint unterschriebst, führt die Verringerung deiner validator**

Der Prozess der Unterzeichnung der Checkpoint-Transaktionen wird automatisiert. Um sicherzustellen, dass Ihr Validierungsknoten alle gültigen Checkpoint-Transaktionen signiert, müssen Sie Ihre Transaktionen erhalten und überwachen.

### Überprüfen Sie die Dienste und Prozesse täglich. {#check-node-services-and-processes-daily}

Du musst täglich die Services und Prozesse in Verbindung mit [Heimdall](/maintain/glossary.md#heimdall) und [Bor](/maintain/glossary.md#bor) überprüfen. Außerdem sollte das Einschneiden der Knoten regelmäßig erfolgen, um die Datenträgernutzung zu reduzieren.

### Überwachung von Knoten ausführen {#run-node-monitoring}

Führe entweder Folgendes aus:

* Grafana Dashboards von Polygon. Siehe GitHub repository: [Matic-Jagar setup](https://github.com/vitwit/matic-jagar)
* Oder verwende deine eigenen Monitoring-Tools für den [Prüfer](/maintain/glossary.md#validator) und [Sentry-Knoten](/maintain/glossary.md#sentry)
* Ethereum Endpunkt, der auf Knoten verwendet wird, sollte überwacht werden, um sicherzustellen, dass der Knoten innerhalb der request ist

### Halte ETH-Guthaben bereit. {#keep-an-eth-balance}

Du musst eine ausreichende Menge an ETH aufrechterhalten (sollte immer um den Schwellenwert sein, d.h. 0,5 bis 1) auf deiner [validator](/maintain/glossary.md#signer-address) auf dem Ethereum Mainnet.

Du benötigst ETH für Folgendes:

* Um die vorgeschlagenen [Checkpoint-Transaktionen](/maintain/glossary.md#checkpoint-transaction) auf dem Ethereum Mainnet zu unterschreiben.
* Schlage Checkpoint-Transaktionen vor und sende sie an das Ethereum Mainnet.

Wenn du keine ausreichende Menge an ETH auf der Signieradresse bereithältst, führt dies zu:

* Verzögerungen in der Checkpoint-Einreichung. Beachte, dass die Transaktionsgaspreise im Ethereum-Netzwerk schwanken und in die Höhe schnellen können.
* Verzögerungen beim Abschluss von in den Checkpoints enthaltenen Transaktionen.
* Verzögerungen bei darauffolgenden Checkpoint-Transaktionen.

## Delegation {#delegation}

### Sei offen für Delegation. {#be-open-for-delegation}

Alle Prüfer müssen für die Delegation aus der Community offen sein. Jeder Validator kann seinen eigenen Provisionssatz selbst festlegen. Es gibt keine Höchstgrenze für den Provisionssatz.

### Kommunizieren von Provisionssätzen {#communicate-commission-rates}

Es ist die moralische Pflicht der Prüfer, die Provisionsraten und die Provisionsrate an die Community zu übermitteln. Die bevorzugten Plattformen, um die Provisionssätze zu kommunizieren, sind:

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)

## Kommunikation {#communication}

### Kommunikationsprobleme {#communicate-issues}

Die Kommunikation von Problemen gewährleistet, dass die Community und das Polygon Team die Probleme so schnell wie möglich beheben können. Die bevorzugten Plattformen, um die Provisionssätze zu kommunizieren, sind:

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)
* [GitHub](https://github.com/maticnetwork)

### Feedback und Vorschläge einreichen {#provide-feedback-and-suggestions}

Bei Polygon schätzen wir dein Feedback und deine Vorschläge zu jedem Aspekt des Validator-Ökosystems ein. Das [Forum](https://forum.polygon.technology/) ist die ideale Plattform, um Feedback und Vorschläge einzureichen.
