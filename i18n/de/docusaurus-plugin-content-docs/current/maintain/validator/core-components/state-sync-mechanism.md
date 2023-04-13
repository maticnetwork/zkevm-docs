---
id: state-sync-mechanism
title: State-Sync-Mechanismus
description: State Sync Mechanismus zum nativen Lesen von Ethereum-Daten
keywords:
  - docs
  - matic
  - polygon
  - state sync
  - mechanism
slug: state-sync-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Prüfer auf dem Layer [Heimdall](/docs/maintain/glossary.md#heimdall) nehmen das Event [StateSynced](https://github.com/maticnetwork/contracts/blob/a4c26d59ca6e842af2b8d2265be1da15189e29a4/contracts/root/stateSyncer/StateSender.sol#L24) auf und geben das Event an den Layer [Bor](/docs/maintain/glossary.md#bor) weiter. Siehe auch [Polygon Architektur](/docs/pos/polygon-architecture).

Der **Empfänger-Contract** erbt [IStateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol) und die benutzerdefinierte Logik befindet sich in der [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/05556cfd91a6879a8190a6828428f50e4912ee1a/contracts/IStateReceiver.sol#L5)-Funktion.

Die neueste Version, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), enthält einige Verbesserungen wie:
1. Einschränkung der Datengröße in der state sync txs auf:
    * **30 kB** bei Darstellung in **Byte**
    * **60 kB** bei Darstellung als **String**.
2. Erhöhung der **Verzögerungszeit** zwischen den Vertragsevents verschiedener Validatoren, um sicherzustellen, dass der Speicherpool im Falle einer Event-Häufung nicht zu schnell gefüllt wird, was den Fortschritt der Chain behindern könnte.

Im folgenden Beispiel wird gezeigt, wie die Datengröße eingeschränkt ist:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

## Anforderungen für die Benutzer {#requirements-for-the-users}

Folgende Dinge werden von Dapps/Benutzern benötigt, um mit State-Sync zu arbeiten:

1. Rufe die [syncState](https://github.com/maticnetwork/contracts/blob/19163ddecf91db17333859ae72dd73c91bee6191/contracts/root/stateSyncer/StateSender.sol#L33)-Funktion auf.
2. Die `syncState`-Funktion sendet ein Event namens `StateSynced(uint256 indexed id, address indexed contractAddress, bytes data);`
3. Alle Validatoren in der Heimdall-Chain erhalten das `StateSynced` Event. Jeder Validator, der die Transaktionsgebühr für die State-Sync erhalten möchte, sendet die Transaktion an Heimdall.
4. Sobald die `state-sync`-Transaktion auf Heimdall in einem Block enthalten ist, wird sie zur Liste der ausstehenden State-Sync hinzugefügt.
5. Nach jedem Sprint auf Bor holt der Bor-Knoten über einen API-Aufruf die ausstehenden State-Sync-Events von Heimdall ab.
6. Der Empfänger-Contract erbt die `IStateReceiver`-Schnittstelle; und die benutzerdefinierte Logik zum Dekodieren der Datenbytes und zum Ausführen von Aktionen befindet sich in der [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol)-Funktion.
