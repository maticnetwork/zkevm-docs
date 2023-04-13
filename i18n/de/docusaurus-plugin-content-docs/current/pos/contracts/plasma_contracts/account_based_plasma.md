---
id: account_based_plasma
title: Kontenbasiertes Plasma
description: Eine kontobasierte Implementierung von Plasma
keywords:
  - docs
  - matic
  - Account Based Plasma
  - polygon
  - implementation
image: https://matic.network/banners/matic-network-16x9.png
---

# Kontenbasiertes Plasma {#account-based-plasma}

Polygon Plasma folgt einem ähnlichen Modell wie [Plasma MoreVP](https://ethresear.ch/t/more-viable-plasma/2160), ist aber im Vergleich zu anderen UTXO-basierten Implementierungen eine **kontenbasierte Implementierung**. Die Sidechain ist EVM-kompatibel. Durch die MoreVP-Konstruktion entfällt auch die Notwendigkeit von Bestätigungssignaturen.

## Pos-Layer und Checkpoints {#pos-layer-and-checkpoints}

Das Polygon-Netzwerk verwendet eine duale Strategie von Proof of Stake auf dem Checkpointing-Layer und Blockproduzenten auf der Block Producer Layer, um schnellere Blockzeiten zu erreichen und die Finalität der Mainchain mithilfe der Checkpoints und Betrugsnachweise zu erreichen.

Auf dem Checkpointing-Layer des Polygon-Netzwerks wird alle paar Blöcke auf dem Block-Layer des Polygon-Netzwerks ein (ausreichend gebundener) Validator einen Checkpoint auf der Mainchain erstellen, nachdem er alle Blöcke auf dem Block-Layer validiert und den Merkle der Block-Hashes seit dem letzten Checkpoint erstellt hat.

Abgesehen von der Endgültigkeit auf der Mainchain spielen Checkpoints eine Rolle bei Entnahmen, da sie den Nachweis des Proof of Burn (der Entnahme) von Token im Falle einer Entnahme durch den Benutzer enthalten. Es ermöglicht den Nutzern, ihre verbleibenden Token auf dem Root-Vertrag mit Patricia-Merkle-Proof und Header-Block-Proof nachzuweisen. Um die verbleibenden Token nachzuweisen, muss der Anfangsblock durch PoS (Stakeholder) an die Root Chain übergeben werden. Bei der Abhebung fallen wie üblich Ethereum-Gasgebühren an. Wir nutzen die Checkpoints intensiv für die Exit Games.

## UTXO-artige Ereignisprotokolle {#utxo-like-event-logs}

Bei ERC20-/ERC721-Übertragungen wird dies durch die Verwendung einer UTXO-artige Ereignisprotokolldatenstruktur erreicht. Nachstehend finden Sie ein `LogTransfer` Ereignis als Referenz.

```jsx
event LogTransfer(
    address indexed token,
    address indexed from,
    address indexed to,
    uint256 amountOrTokenId,
    uint256 input1, // previous account balance of the sender
    uint256 input2, // previous account balance of the receiver
    uint256 output1, // new account balance of the sender
    uint256 output2 // new account balance of the receiver
);
```

Bei jeder ERC20-/ERC721-Übertragung wird dieses Ereignis ausgelöst, und die vorherigen Salden des Senders und des Empfängers (`output1` und `input2`) werden zum Eingang (UTXO-artig) des Senders und die neuen Salden werden zu den Ausgaben (`input1` und `output2`). Die Übertragungen werden durch die Zusammentragung aller damit verbundenen `LogTransfer` Ereignisse verfolgt.

## Exit Games {#exit-games}

Da die Blöcke von einem einzigen (oder sehr wenigen) Block Producern hergestellt werden, bietet dies eine Angriffsfläche für Betrug. Wir werden die Angriffsszenarien kurz besprechen und dann darüber sprechen, wie Plasma die Sicherheit eines Benutzers garantiert.

## Angriffsvektoren {#attack-vectors}

### Malicious Operator {#malicious-operator}
Im Folgenden werden die Szenarien erläutert, in denen der Betreiber bösartig werden und versuchen könnte, zu betrügen.

1. Token aus dem Nichts / doppelte Ausgaben / fehlerhafte Quittungen, die in betrügerischer Weise das Token-Guthaben erhöhen (für ein vom Betreiber kontrolliertes Konto) oder verringern (für einen Benutzer).
2. Nichtverfügbarkeit von DatenNachdem ein Benutzer einen tx gesendet hat, nehmen wir an, der Betreiber hat den tx in den Plasmablock aufgenommen, aber die Daten der Chain für den Benutzer nicht verfügbar gemacht. In diesem Fall könnte ein Benutzer, der einen Exit von einem älteren tx startet, in der Chain herausgefordert werden, indem er seinen letzten tx vorzeigt. Es wird einfach, dem Benutzer Kummer zu bereiten.
3. Schlechter CheckpointIm schlimmsten Fall könnte ein Betreiber A.1 und (oder) A.2 durchführen und sich mit den Validatoren absprechen, um diese ungültigen Zustandsübergänge an die Root Chain zu übergeben.
4. Anhalten der SidechainDer Betreiber hört auf, Blöcke zu produzieren, und die Chain kommt zum Stillstand. Wenn ein Checkpoint für eine bestimmte Dauer nicht übermittelt wurde, könnte man die Sidechain in der Root Chain als angehalten markieren. Danach können keine Checkpoints mehr übermittelt werden.

Wenn die Plasma-Chain aus den oben genannten Gründen oder aus anderen Gründen nicht mehr funktioniert, müssen die Benutzer komplett entfernt werden, und wir streben danach, Ausstiegskonstruktionen für die Root Chain bereitzustellen, die die Benutzer nutzen können, wenn die Zeit gekommen ist.

### Bösartiger User {#malicious-user}

1. Der Benutzer beginnt den Exit von einem Committed tx, gibt aber weiterhin Token in der Side Chain aus. Ähnlich wie doppelte Ausgaben, aber über 2 Chains hinweg.

Wir bauen auf den Ideen von [MoreVp 7](https://ethresear.ch/t/more-viable-plasma/2160) auf. Kurz gesagt, MoreVP führt eine neue Methode zur Berechnung der Exit-Prioritäten ein, die sogenannte „Jüngste-Eingabe-Priorität“. Anstatt die Exits nach dem Alter der Ausgabe zu ordnen, ordnet moreVP die Exits nach dem Alter der jüngsten Eingabe. Dies hat den Effekt, dass Exits von Ausgaben, auch wenn sie nach Transaktionen „wie aus dem Nichts“ in zurückgehaltene Blöcke enthalten sind, korrekt verarbeitet werden, solange sie nur von gültigen Eingaben stammen. Wir definieren  `getAge` , das einem enthaltenen tx ein Alter zuweist. Dies ist wie in [mindestens lebensfähiges Plasma 1](https://ethresear.ch/t/minimal-viable-plasma/426) definiert.

```jsx
function getAge(receipt) {
  const { headerNumber, plasmaBlockNum, txindex, oindex } = receipt
  return f(headerNumber, plasmaBlockNum, txindex, oindex) // multiplied with their respective weights
}
```

## Exit-Scenarios {#exit-scenarios}

Lassen Sie uns einige Terminologie vorstellen, bevor wir die Exit-Szenarien weiter besprechen:

- **Abheber**: Ein Benutzer, der die Plasma-Chain verlassen möchte.
- **Commited tx**: Ein tx, der im Polygon-Chain-Block enthalten war und auf der Root Chain mit Checkpoint versehen wurde.
- **Tx ausgeben**: Ein tx, der das Token-Guthaben des Benutzers in Reaktion auf eine vom Benutzer signierte Aktion ändert (enthält keine eingehenden Token-Übertragungen). Dies kann eine vom Benutzer initiierte Übertragung, ein tx-Burn usw. sein.
- **Referenz tx**: Txs, die dem Exit-tx für diesen bestimmten Benutzer und Token unmittelbar vorausgehen. Wie in unserem auf dem Kontostand basierenden UTXO-Schema definiert, werden die Ausgaben der Referenz-tx zu den Eingängen der tx, von der sie verlassen wird.
- **Exit-Priorität von MoreVP**: Alter des jüngsten Eingangs (unter den Referenz-tx) an eine bestimmte tx. Er wird meist für die Berechnung der Exit-Priorität verwendet.

### Token brennen {#burn-tokens}

Um die Sidechain zu verlassen, würde ein Nutzer ein *Auszahlen aka Token Burn* tx auf der Plasma-Chain starten. Dieser tx wird ein `Withdraw` Ereignis ausgeben.

```jsx
event Withdraw(
    address indexed token,
    address indexed from,
    uint256 amountOrTokenId,
    uint256 input1,
    uint256 output1
);
```

Dabei steht `input1` für das bisherige Saldo des Benutzers für den betreffenden Token und `output1` für die Anzahl der in der Sidechain verbliebenen Token. Diese Konstruktion ist kohärent mit unserem kontenbasierten *UTXO* Schema. Ein Benutzer legt die Quittung dieses Auszahlungs-tx vor, um die Token auf der Main-Chain abzuheben. Bei der Bezugnahme auf diesen Beleg muss der Benutzer auch Folgendes angeben:

1. Merkle-Proof für die Aufnahme eines Belegs in einen Side-Chain-Block (`receiptsRoot`)
2. Merkel-Nachweis für die Aufnahme einer Transaktion in den Side-Chain-Block (`transactionsRoot`)
3. Beweis für die Aufnahme des Block-Headers der Side-Chain in den Checkpoint der Root-Chain

```jsx
startExit(withdrawTx, proofOfInclusion /* of the withdrawTx in the checkpoint */) {
  Verify inclusion of withdrawTx in checkpoint using proofOfInclusion
  Verify msg.sender == ecrecover(withdrawTx)

  uint age = getAge(withdrawTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}
```

Wann immer ein Benutzer die Plasma-Chain verlassen möchte, sollte er (oder abstrahiert durch seine Client-Anwendung, d. h. Wallet) einen Token Burn auf der Side-Chain vornehmen, auf den Checkpoint warten und dann einen Exit vom Checkpoint-Auszahlungs-tx starten.

### Beende von den letzten ERC20/721 Transfers (MoreVP) {#exit-from-the-last-erc20-721-transfers-morevp}

Betrachten Sie das Szenario, wenn Benutzer eine Erc20-Übertragung auf die Side-Chain vorgenommen haben. Der Betreiber fügte kurz vor der Übertragung des Benutzers ein tx wie aus dem Nichts ein und stimmte sich mit den Validatoren ab, um diesen Block zu überprüfen. In diesem Szenario und allgemeiner in den oben beschriebenen Angriffsvektoren A1 bis A3 hatte der Benutzer möglicherweise keine Gelegenheit für einen Token Burn, bevor ein bösartiger tx eingeschlossen wird, und müsste daher einen Exit vom letzten geprüften tx auf der Root-Chain starten. Aus diesem Grund müssen wir zusätzlich zum Burn-Exit Exits von einer Vielzahl von tx wie ERC20-/721-Übertragungen unterstützen. Aufbauend auf diesem Angriffsvektor und einer Aufschlüsselung der 2 Szenarien:

**Ausgehender Transfer:** Ich habe einige Token an einen Benutzer übertragen, aber ich habe bemerkt, dass der Betreiber einen bösartigen tx in den Block/Checkpoint einfügte, bevor er meinen Übertragungs-tx einfügte. Ich muss einen Exit der Chain starten. Ich werde einen Exit aus dem Übertragungs-tx starten. Wie in MoreVP definiert, muss ich einen Referenz-tx (*Eingang-UTXO*) bereitstellen, der die Exit-Priorität des Exits definiert. Ich beziehe mich also auf einen tx, der meinen Token-Saldo aktualisiert hat und dem tx für die ausgehende Übertragung vorausgeht.

```jsx
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the user after the input tx was executed >= tokens being transferred in the exitTx
  Verify msg.sender == ecrecover(exitTx)

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

**Eingehende Übertragung:** Ich habe bemerkt, dass der Betreiber einen bösartigen tx in den Block/Checkpoint einfügte, bevor er in meiner eingehenden Übertragung tx einfügte. Ich starte einen Exit vom eingehenden Übertragungs-tx, während ich mich auf den Saldo der Gegenpartei beziehe – denn hier ist der *Eingangs-UTXO* der Token-Saldo der Gegenpartei.

```
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the counterparty after the input tx was executed >= tokens being transferred in the exitTx
  Verify input.sender == ecrecover(exitTx) && input.receiver == msg.sender

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

### Beende von einer in-flight (MoreVP) {#exit-from-an-in-flight-transaction-morevp}

Mit diesem Szenario soll die Nichtverfügbarkeit von Daten bekämpft werden. Nehmen wir an, ich habe einen tx gemacht, weiß aber nicht, ob dieser tx aufgrund der Nichtverfügbarkeit von Daten aufgenommen wurde. Ich kann einen Exit von dieser In-Flight-tx starten, indem ich auf den letzten tx mit Checkpoint verweise. Der Benutzer sollte darauf achten, dass er keine txs macht, wenn er einen MoreVP-artigen Exit startet, da er sonst herausgefordert wird.

**Hinweise:** Beim Verlassen einer MoreVP-ähnlichen Konstruktion kann ein Benutzer einen Exit starten, indem er Referenz-Txs und Exit-Tx angibt und `exit bond` (klein) platziert. Wird ein Exit erfolgreich herausgefordert, so wird der Exit annulliert und die Exit Bond wird eingezogen.

## Einschränkungen {#limitations}

1. Großer Beweisumfang: Merkle-Proof für die Einbeziehung der Übertragung und Merkle-Proof für die Einbeziehung des Blocks (der diese Übertragung enthält) in den Checkpoint.
2. Massen-Exit: Wenn der Bediener böswillig wird, müssen die Benutzer den Massen-Exit starten.

Die Spezifikation befindet sich noch im Anfangsstadium, und wir würden uns über jede Rückmeldung freuen, die uns hilft, sie zu verbessern oder ganz neu zu gestalten, falls diese Konstruktion hoffnungslos fehlerhaft ist. Die Implementierung ist in unserem [Contract](https://github.com/maticnetwork/contracts)-5-Repository in laufenden Arbeit.