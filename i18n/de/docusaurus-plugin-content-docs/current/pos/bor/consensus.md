---
id: consensus
title: Bor-Konsens
description: Bor-Mechanismus zum Abrufen neuer Produzenten
keywords:
  - docs
  - matic
  - Bor Consensus
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Bor-Konsens {#bor-consensus}

Bor Consensus ist inspiriert von Clique consensus: [https://eips.ethereum.org/EIPS/eip-225](https://eips.ethereum.org/EIPS/eip-225). Clique arbeitet mit mehreren vordefinierten Produzenten zusammen. Alle Produzenten stimmen mithilfe der Clique-APIs über neue Produzenten ab. Sie nehmen abwechselnd Blöcke zu erstellen.

Bor beschafft sich neue Produzenten durch den Spannen- und Durchlauf-Management-Mechanismus.

## Validatoren {#validators}

Polygon ist ein Proof-of-Stake-System. Jeder kann seine Matic-Token auf dem Ethereum-Smart-Contract, dem „Staking Contract“, staken und ein Validator für das System werden.

```jsx
function stake(
	uint256 amount,
	uint256 heimdallFee,
	address signer,
	bool acceptDelegation
) external;
```

Sobald die Validatoren auf Heimdall aktiv sind, werden sie über das `bor`-Modul als Produzenten ausgewählt.

Überprüfe die Bor-Übersicht, [um](https://www.notion.so/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab) die Span Management mehr im Detail zu verstehen:

## Spanne {#span}

Eine logisch definierte Menge von Blöcken, für die eine Auswahl von Validatoren aus allen verfügbaren Validatoren ausgewählt wird. Heimdall bietet Spannen-Details über die Spannen-Details-APIs.

```go
// HeimdallSpan represents span from heimdall APIs
type HeimdallSpan struct {
	Span
	ValidatorSet      ValidatorSet `json:"validator_set" yaml:"validator_set"`
	SelectedProducers []Validator  `json:"selected_producers" yaml:"selected_producers"`
	ChainID           string       `json:"bor_chain_id" yaml:"bor_chain_id"`
}

// Span represents a current bor span
type Span struct {
	ID         uint64 `json:"span_id" yaml:"span_id"`
	StartBlock uint64 `json:"start_block" yaml:"start_block"`
	EndBlock   uint64 `json:"end_block" yaml:"end_block"`
}

// Validator represents a volatile state for each Validator
type Validator struct {
	ID               uint64         `json:"ID"`
	Address          common.Address `json:"signer"`
	VotingPower      int64          `json:"power"`
	ProposerPriority int64          `json:"accum"`
}
```

Geth (In diesem Falle, Bor) verwendet Block-`snapshot`, um Statusdaten für jeden Block, inklusive der Konsens-Daten, zu speichern.

Jeder Validator in der Spanne verfügt über eine gewisse Abstimmungsmacht. Basierend auf ihrer „Macht“ werden sie als Blockproduzenten ausgewählt. Je größer ihre Macht, desto höher ist die Wahrscheinlichkeit, Blockproduzent zu werden. Bor setzt hierfür den Tendermint-Algorithmus ein. Quelle: [https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go)

## Durchlauf {#sprint}

Eine Reihe von Blöcken innerhalb einer Spanne, für welche nur ein einziger Blockproduzent ausgewählt wurde, um Blöcke zu produzieren. Das Ausmaß des Durchlaufs ist ein Vielfaches der Spannengröße. Bor verwendet `validatorSet`, um den aktuellen Proposer/Produzenten für den aktuellen Durchlauf zu erhalten.

```go
currentProposerForSprint := snap.ValidatorSet().Proposer
```

Neben dem aktuellen Proposer wählt Bor Backup-Produzenten aus.

## Autorisierung eines Blockes {#authorizing-a-block}

Die Produzenten bei Bor werden auch Signer genannt, da die Produzenten, um einen Block für das Netzwerk zu autorisieren, den Hash des Blocks unterschreiben müssen, in welchem **alles außer der Unterschrift selbst** enthalten ist. Dies bedeutet, dass der Hash jedes Feld des Headers und auch das `extraData`  außer dem 65-Byte-Suffix der Unterschrift enthält.

Dieser Hash wird mithilfe der Standard- `secp256k1` -Kurve unterschrieben und die daraus resultierende 65-Byte-Unterschrift wird in den  `extraData`  als das nachfolgende 65-Byte-Suffix eingebettet.

Jedem unterzeichneten Block wird eine Schwierigkeit zugewiesen, die ein gewisses Gewicht auf den Block legt. Zwischengeschaltetes Unterschreiben wiegt schwerer (`DIFF_INTURN`) als das Unterschreiben von außerhalb (`DIFF_NOTURN`).

### Autorisierungsstrategien {#authorization-strategies}

Solange die Produzenten die oben genannten Spezifikationen einhalten, können sie Blöcke genehmigen und verteilen, wie sie es für richtig halten. Die folgende vorgeschlagene Strategie wird jedoch den Netzwerk-Traffic und die Small Forks reduzieren, daher ist es ein Vorschlag für eine Funktion:

- Für den Fall, dass ein Produzent einen Block unterschreiben darf (ist auf der freigegebenen Liste)
    - Berechne die optimale Signing-Zeit des nächsten Blockes (Parent + `Period`)
    - Wenn der Produzent zwischengeschaltet ist, warte die genaue Zeit ab, um einzutreffen, zu unterschreiben und sofort zu übertragen
    - Wenn der Produzent außerhalb ist, verzögere das Unterschreiben um `wiggle`

Diese kleine Strategie wird sicherstellen, dass der zwischengeschaltete Produzent (dessen Block schwerer wiegt) gegenüber dem Signer außerhalb einen kleinen Vorsprung hat, was das Unterschreiben und die Weitergabe betrifft. Außerdem erlaubt es dieses Schema, mit einer wachsenden Anzahl an Produzenten ein wenig skalieren zu können.

### Unterzeichnen von außerhalb der Runde {#out-of-turn-signing}

Bor wählt mehrere Blockproduzenten als Unterstützung (Backup) für den Fall aus, dass zwischengeschaltete Produzenten keinen Block produzieren. Dies könnte aus einer Vielzahl von Gründen passieren, wie:

- Der Knoten des Blockproduzenten ist abgeschaltet
- Der Blockproduzent versucht, den Block zurückzuhalten
- Der Blockproduzent produziert absichtlich keinen Block.

Wenn die oben beschriebene Situation eintritt, schaltet sich Bors Backup-Mechanismus ein.

Zu einem beliebigen Zeitpunkt wird die Validatoren-Auswahl als Array gespeichert, die auf Grundlage der Signer-Adresse desselben sortiert ist. Nehmen wir an, dass die Validatoren-Auswahl als A, B, C, D geordnet ist und C an der Reihe ist, einen Block zu produzieren. Wenn C innerhalb einer ausreichenden Zeitspanne keinen Block produziert, kommt D an die Reihe, einen Block zu produzieren. Wenn D dies nicht tut, dann kommen A und B an die Reihe.

Da allerdings etwas Zeit sein wird, bevor C einen Block produziert und diesen weitergibt, wird der Backup-Validator eine gewisse Zeit abwarten, bis er anfängt, einen Block zu produzieren. Diese Verzögerung wird „Wiggle“ genannt.

### Wiggle {#wiggle}

„Wiggle“ ist die Zeit, die ein Produzent abwarten sollte, bevor er anfängt, einen Block zu produzieren.

- Sagen wir, der letzte Block (n-1) wurde zum Zeitpunkt `t` produziert.
- Wir erzwingen eine Mindestverzögerung zwischen dem aktuellen und dem nächsten Block mittels eines variablen Parameters `Period`.
- Unter idealen Bedingungen wird C `Period` abwarten und dann den Block produzieren und weitergeben. Da die Blockzeiten bei Polygon ziemlich kurz ausgelegt sind (2-4 Sek.), wird davon ausgegangen, dass die Verzögerung der Weitergabe dementsprechend gleich ist wie `Period`.
- Wenn D also keinen Block in der Zeit `2 * Period` sieht, beginnt D sofort damit, einen Block zu produzieren. Insbesondere dann, wenn die Wiggle-Zeit von D als `2 * Period * (pos(d) - pos(c))` festgelegt ist, wo `pos(d) = 3` und `pos(c) = 2` in der Validatoren-Auswahl. Nehmen wir an, `Period = 1`, die Wiggle-Zeit für D ist 2 Sek.
- Wenn D nun keinen Block produziert, beginnt A damit, einen Block zu produzieren, wenn die Wiggle-Zeit von `2 * Period * (pos(a) + len(validatorSet) - pos(c)) = 4s` abgelaufen ist.
- Ebenso liegt die Wiggle-Zeit für C bei `6s`

### Forks auflösen {#resolving-forks}

Während der oben beschriebene Mechanismus in gewisser Weise zur Robustheit der Chain beiträgt, lässt er gleichzeitig auch das Auftreten von Forks zu. Es könnte tatsächlich auch passieren, dass C einen Block produziert, aber bei der Weitergabe eine Verzögerung auftritt, die länger als erwartet dauert und D demnach einen Block produziert, was zu mindestens 2 Forks führt.

Die Auflösung ist einfach – Wähle die Chain mit der höheren Schwierigkeit aus. Aber dann ist die Frage, wie definieren wir die Schwierigkeit eines Blocks in unserem Setup?

### Schwierigkeit {#difficulty}

- Die Schwierigkeit für einen Block, der von einem zwischengeschalteten Signer (nennen wir ihn C) produziert wird, wird als die höchste = `len(validatorSet)` eingestuft.
- Da D der Produzent der nächster in der Reihenfolge ist; im Falle dass und wenn tatsächlich die Situation auftritt, dass D den Block produziert; die Schwierigkeit für den Block wird genauso wie die Wiggle-Zeit bei `len(validatorSet) - (pos(d) - pos(c))` festgelegt, die bei `len(validatorSet) - 1` liegt
- Die Schwierigkeit für den von A produzierten Block, während er als Backup fungiert, wird `len(validatorSet) - (pos(a) + len(validatorSet) - pos(c))`, was `2` entspricht

Nachdem nun die Schwierigkeit jedes Blocks definiert wurde, ist die Schwierigkeit einer Fork schlichtweg die Summe der Schwierigkeiten der Blöcke in dieser Fork. Für den Fall, dass eine Fork ausgewählt werden muss, wird diejenige mit der höheren Schwierigkeit ausgewählt, da dies die Tatsache widerspiegelt, dass Blöcke von zwischengeschalteten Blockproduzenten produziert wurden. Dies dient einfach dazu, dass der Benutzer den Vorgang auf Bor als abgeschlossen wahrnehmen kann.

## Wechsel der Ansicht {#view-change}

Nach jeder Spanne ändert Bor die Ansicht. Dies bedeutet, dass es sich neue Produzenten für die nächste Spanne verschafft.

### Spanne einreichen {#commit-span}

Kurz vor Ende der aktuellen Spanne (genauer genommen am Ende des vorletzten Durchlaufs in der Spanne) zieht Bor eine neue Spanne von Heimdall herunter. Dies ist ein einfacher HTTP-Aufruf an den Heimdall-Knoten. Sobald die Daten beschafft wurden, wird ein `commitSpan`-Aufruf an den BorValidatorSet-Genesis-Contract durch einen Systemaufruf getätigt.

Bor legt auch Produzenten-Bytes in den Header des Blocks ein. Dies ist während der schnellen Synchronisierung (Fast-Sync) von Bor notwendig. Während der Fast-Sync synchronisiert Bor die Header in Masse und validiert, ob Blöcke von autorisierten Produzenten erstellt werden.

Zu Beginn jedes Durchlaufs beschafft Bor den nächsten Produzenten die Header-Bytes vom vorherigen Header und beginnt mit der Erstellung von Blöcken basierend auf dem -`ValidatorSet`Algorithmus.

Hier kannst du sehen, wie ein Header für einen Block aussieht:

```js
header.Extra = header.Vanity + header.ProducerBytes /* optional */ + header.Seal
```

<img src={useBaseUrl("img/Bor/header-bytes.svg")} />

## Status von der Ethereum-Chain synchronisieren {#state-sync-from-ethereum-chain}

Bor bietet einen Mechanismus, bei welchem einige bestimmte Ereignisse auf der Ethereum-Mainchain an die Bor-Chain weitergeleitet werden. Auf diese Weise werden auch Einzahlungen an die Plasma-Contracts verarbeitet.

1. Jeder Contract auf Ethereum kann den [syncState](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L33)-Aufruf bei `StateSender.sol` tätigen. Dieser Aufruf löst das `StateSynced`-Ereignis aus: https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38

  ```js
  event StateSynced(uint256 indexed id, address indexed contractAddress, bytes data)
  ```

2. Heimdall hört diese Ereignisse und ruft `function proposeState(uint256 stateId)`an, und fungiert `StateReceiver.sol`damit als Store für die anstehenden Statusänderungen IDs. Beachte, dass die `proposeState`-Transaktion sogar mit 0 Gasgebühren verarbeitet wird, solange sie von einem der Validatoren in der aktuellen Validatoren-Auswahl durchgeführt wird: https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L24

3. Zu Beginn jedes Durchlaufs zieht Bor die Details über die ausstehenden Statuswechsel von Heimdall herunter, indem er die Status desselben verwendet und diese mithilfe eines Systemaufrufs an den Bor-Status einreicht. Siehe `commitState` hier: https://github.com/maticnetwork/genesis-contracts/blob/f85d0409d2a99dff53617ad5429101d9937e3fc3/contracts/StateReceiver.sol#L41
