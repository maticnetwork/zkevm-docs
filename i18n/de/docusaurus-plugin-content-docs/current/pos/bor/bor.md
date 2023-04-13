---
id: bor
title: Bor-Architektur
description: Die Bor Rolle in der Polygon Architektur
keywords:
  - docs
  - matic
  - Bor Architecture
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Bor-Architektur {#bor-architecture}

Polygon ist eine hybride **Plasma + Proof-of-Stake-(PoS)-Plattform**. Wir wenden auf dem Polygon-Netzwerk eine Dual-Konsens-Architektur an, um Geschwindigkeit und Dezentralisierung zu optimieren. Wir haben bewusst ein solches System aufgebaut, das beliebige EVM-fähige Statusübergänge auf unseren Sidechains unterstützt.

## Architektur {#architecture}

<img src={useBaseUrl("img/Bor/matic_structure.png")}/>

Eine Blockchain ist eine Reihe von Netzwerk-Clients, die miteinander interagieren und zusammenarbeiten. Der Client ist eine Software, die einen p2p-Kommunikationskanal mit anderen Clients einrichten kann, Transaktionen unterzeichnet und aussendet, andere Smart Contracts einsetzt und mit ihnen interagiert usw. Häufig wird der Client als Knoten bezeichnet.

Für Polygon ist der Knoten mit einer two Heimdall (Validator Layer) und Bor(Block Producer Layer) konzipiert.

1. Heimdall
    - Proof-of-Stake-Verifizierung
    - Mit Checkpoints ausgestatte Blöcke auf der Ethereum-Mainchain
    - Validatoren- und Prämienmanagement
    - Die Synchronisation mit der Ethereum-Chain wird sichergestellt
    - Defi-Bridge
2. Bor
    - Polygon-Chain
    - EVM-kompatible VM
    - Proposer und Produzenten treffen eine Auswahl
    - SystemAufruf
    - Gebührenmodell

## Heimdall (Validator {#heimdall-validator-layer}

Heimdall (der All-Protector) ist der Reiniger von allem, was im Polygon Proof-of-Stake-System geschieht – gut oder schlecht.

Heimdall ist unsere Proof-of-Stake-Verifier-Layer, die in unserer Architektur für das Checkpointing einer Repräsentation der Plasma-Blöcke in die Mainchain hinein verantwortlich ist. Wir haben dies implementiert, indem wir auf der Tendermint-Konsens-Engine aufbauten und das Signaturschema sowie verschiedene Datenstrukturen änderten.

Weitere Informationen findest du unter [https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/](https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/).

## Bor (Block-Produzenten-Layer) {#bor-block-producer-layer}

Die Implementierung des Bor-Knotens ist im Grunde genommen der Sidechain-Operator. Die Sidechain-VM ist EVM-kompatibel. Derzeit handelt es sich um eine grundlegende Geth-Implementierung mit benutzerdefinierten Änderungen am Konsensalgorithmus. Sie wird jedoch von Grund auf neu aufgebaut, um sie schlank und fokussiert zu machen.

Bor ist unsere Block-Produzenten-Layer, die in Einklang mit Heimdall die Produzenten und Verifizierer für jede Spanne und jeden Durchlauf auswählt. Die Interaktion für Polygon-Benutzer findet auf dieser Sidechain statt; sie ist EVM-kompatibel, um von der Funktionalität und Kompatibilität der Tools und Anwendungen von Ethereum-Entwicklern Gebrauch zu machen.

### Polygon-Chain {#polygon-chain}

Diese Chain ist eine separate Blockchain, die an Ethereum mittels eines Zwei-Wege-Hakens angegliedert ist. Der Zwei-Wege-Haken ermöglicht die Austauschbarkeit von Assets zwischen Ethereum und Polygon.

### EVM-kompatible VM {#evm-compatible-vm}

Die Ethereum-Virtual-Machine (EVM) ist ein leistungsstarker, mit Sandbox verwandter virtueller Stapelspeicher, der in jede Polygon-Full-Node eingebettet ist, die für die Ausführung des Contract-Byte-Codes zuständig ist. Die Contracts sind in der Regel in Sprachen höheren Niveaus, wie Solidity, geschrieben und werden dann in EVM-Byte-Codes kompiliert.

### Proposer- und Produzenten-Auswahl {#proposers-and-producers-selection}

Blockproduzenten für die Bor-Layer sind ein aus dem Validatorenpool ausgewähltes Komitee (Auswahl entsprechend ihres Stakes), welche in wiederkehrenden Abständen stattfindet und regelmäßig durchgemischt wird. Diese Intervalle werden von der Validatoren-Governance in Bezug auf die Dynastie und das Netzwerk festgelegt.

Das Verhältnis von Stake/Staking-Macht entscheidet über die Wahrscheinlichkeit, als ein Mitglied des Blockproduzenten-Komitees ausgewählt zu werden.

<img src={useBaseUrl("img/Bor/bor-span.png")} />

#### Auswahlprozess {#selection-process}

- Nehmen wir an, wir haben 3 Validatoren im Pool und sie heißen Alice, Bill und Clara.
- Alice stakt 100 Matic-Token, während Bill und Clara 40 Matic-Token staken.
- Den Validatoren werden Slots entsprechend ihres Stakes ausgeteilt, und da Alice 100 Matic-Token gestaked hat, wird sie ihre Slots anteilig daran erhalten. Insgesamt wird Alice 5 Slots erhalten. Ebenso erhalten Bill und Clara insgesamt 2 Slots.
- Allen Validatoren werden diese Slot gegeben: [A, A, A, A, A, B, B, C, C]
- Mithilfe von Ethereum-Blockverlaufsdaten als Seed mischen wir dieses Array durch.
- Nehmen wir an, dass wir, nachdem wir die Slots mithilfe der Seed durchmischt haben, dieses Array bekommen [A, B, A, A, C, B, A, A, C]
- Jetzt lassen wir Validatoren je nach Produzenten-Zähler *(von der Validatoren-Governance gepflegt)* von oben aus los. Wenn wir beispielsweise 5 Produzenten auswählen möchten, erhalten wir in etwa eine solche Produzenten-Auswahl [A, B, A, A, C]
- Folglich wird die Produzenten-Auswahl für die nächste Spanne definiert als [A: 3, B:1, C:1].
- Mithilfe dieser Validatoren-Auswahl und des Proposer-Auswahl-Algorithmus von Tendermint wählen wir die Produzenten für jeden Durchlauf auf BOR aus.

### Schnittstelle für einen Systemaufruf {#systemcall-interface}

Ein Systemaufruf ist eine interne Betreiberadresse, welche der EVM untersteht. Dies hilft, den Status für Blockproduzenten bei jedem Durchlauf aufrechtzuerhalten. Ein Systemaufruf wird gegen Ende eines Durchlaufs ausgelöst und eine Anfrage wird für die neue Blockproduzentenliste gestellt. Sobald der Status aktualisiert wurde, werden die Änderungen nach der Blockgenerierung auf Bor an alle Validatoren übergeben.

### Funktionen {#functions}

#### proposeState {#proposestate}

- Der Aufruf ist nur den Validatoren gestattet.
- Überprüfe, ob `stateId` bereits vorgeschlagen oder eingereicht wurde.
- Schlage die `stateId` vor und aktualisiere die Flagge auf `true`.

#### commitState {#commitstate}

- Ein Aufruf ist nur an das System gestattet.
- Überprüfe, ob `stateId` bereits vorgeschlagen oder eingereicht wurde.
- Benachrichtige den `StateReceiver`-Contract mit einer neuen `stateId`.
- Aktualisiere die `state`-Flagge auf `true` und `remove` auf die `proposedState`.

#### proposeSpan {#proposespan}

- Der Aufruf ist nur den Validatoren gestattet.
- Überprüfe, ob der Spannen-Vorschlag `pending` ist.
- Aktualisiere den Spannen-Vorschlag auf `true`

#### proposeCommit {#proposecommit}

- Ein Aufruf ist nur an das System gestattet.
- Stelle `initial validators` ein, wenn die aktuelle Spanne null ist.
- Kontrolliere die Bedingungen für  `spanId`und `time_period` für Durchlauf und Spanne.
- Aktualisiere die neue `span` und `time_period`.
- Stelle `validators` und `blockProducers` für die `sprint` ein.
- Aktualisiere die Flagge für `spanProposal` auf `true`.

### Bor-Gebührenmodell {#bor-fee-model}

Für normale Transaktionen, werden die Gebühren in Matic-Token erhoben und an die Blockproduzenten ausgeschüttet, ähnlich wie bei Ethereum-Transaktionen.

Wie andere Blockchains auch, hat Polygon einen nativen Token namens Matic(MATIC). MATIC ist ein ERC20-Token, der in erster Linie für die Zahlung von Gas (Transaktionsgebühren) auf Polygon und beim Staking verwendet wird.

:::info

Wichtig an dieser Stelle: Beachte, dass der MATIC-Token auf der Polygon-Chain als ein ERC20-Token, aber gleichzeitig auch als nativer Token fungiert. Daher bedeutet dies, dass die Benutzer ihr Gas mit MATIC bezahlen können und MATIC ebenso an andere Accounts senden können.

:::

Für genesis-Contracts `gasPrice`und `gasLimit`funktioniert genauso wie Ethereum, aber während der Ausführung wird es die Gebühren nicht von dem Konto des Senders abgezogen.

Genesis-Transaktionen von aktuellen Validatoren werden mit `gasPrice = 0` ausgeführt.

Außerdem müssen Prüfer folgende Transaktionsarten senden, wie z.B. staatliche Vorschläge wie Einlagen & Span Vorschläge auf Bor.

## Technische Einblicke {#technical-insight}

### Genesis-Verträge {#genesis-contracts}

[BorValidatorSet(0x1000)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.template) ⇒ Dieser Contract verwaltet die Validatoren-Auswahl für jede Spanne und jeden Durchlauf.

[BorStateReceiver(0x1001)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol) ⇒ Dieser Contract verwaltet den Transfer beliebiger Contract-Daten aus Ethereum-Constracts an Polygon-Contracts

MaticChildERC20(0x1010) ⇒ Child-Contract für Mainchain-Token, welcher es zulässt, Assets von Ethereum auf Polygon zu verschieben.

### [Bor.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/bor.go)

Bor-Protokoll

## Glossar {#glossary}

- StartEpoch – Nummerposten eines Checkpoints, an welchem ein Validator aktiviert ist und am Konsens teilnehmen wird.
- EndEpoch – Nummerposten eines Checkpoints, an welchem ein Validator als deaktiviert gilt und nicht am Konsens teilnehmen wird.
- Durchlauf – Ein Durchlauf ist eine kontinuierliche Blockaufstellung, die von einem einzelnen Validator erstellt wurde.
- Spanne – Eine Spanne ist eine Blockaufstellung mit einer festen Validatoren-Auswahl, sie besteht jedoch aus verschiedenen Durchläufen. Eine Spanne mit einer Länge von 6400 Blöcken, beispielsweise, wird aus 100 Durchläufen von 64 Blöcken bestehen.
- Dynastie: Zeit zwischen Ende der letzten Auktion und Startzeit der nächsten Auktion.

## Ressourcen {#resources}

- [Bor](https://github.com/maticnetwork/bor)
- [EVM](https://www.bitrates.com/guides/ethereum/what-is-the-unstoppable-world-computer)
- [Wie funktioniert EVM?](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)
- [Tendermint Proposer Selection](https://docs.tendermint.com/master/spec/reactors/consensus/proposer-selection.html)
