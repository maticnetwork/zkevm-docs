---
id: how-state-sync-works
title: Wie funktioniert State Sync?
description: "Senden des Status von der Ethereum-Chain an die Bor-Chain."
keywords:
  - docs
  - matic
  - state sync
  - working
image: https://matic.network/banners/matic-network-16x9.png
---

# Wie funktioniert State Sync? {#how-does-state-sync-work}

Die Statusverwaltung sendet den Status von der Ethereum-Chain an die Bor-Chain. Es wird **state-sync** genannt.

Der staatliche Transfer von Ethereum zu Bor geschieht durch system Angenommen, ein Benutzer hinterlegt USDC an den deposit auf Ethereum. Prüfer hören diese Ereignisse an, validieren und speichern sie im Heimdall Bor holt sich die neuesten State-Sync-Datensätze und aktualisiert den Bor-Status (stellt die gleiche Menge USDC auf Bor bereit) durch einen Systemaufruf.

## Statussender {#state-sender}

Quelle: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Um den Status zu synchronisieren, ruft Contract die folgende Methode auf: **Statussender-Contract** auf der Ethereum-Kette.

```jsx
contract StateSender {
	/**
	 * Emits `stateSynced` events to start sync process on Ethereum chain
	 * @param receiver    Target contract on Bor chain
	 * @param data        Data to send
	 */
	function syncState (
		address receiver,
		bytes calldata data
	) external;
}
```

`receiver` Contract muss in der Child-Chain vorhanden sein, die den Status `data` erhält, sobald der Prozess abgeschlossen ist. `syncState` sendet das Ereignis `StateSynced` auf Ethereum, welches das folgende ist:

```jsx
/**
 * Emits `stateSynced` events to start sync process on Ethereum chain
 * @param id                  State id
 * @param contractAddress     Target contract address on Bor
 * @param data                Data to send to Bor chain for Target contract address
 */
event StateSynced (
	uint256 indexed id,
	address indexed contractAddress,
	bytes data
);
```

Sobald das Ereignis `StateSynced` auf dem Contract `stateSender` auf der Ethereum-Chain ausgelöst wurde, hört Heimdall auf diese Ereignisse und fügt dem Heimdall-Status etwas hinzu, nachdem 2/3+ Validatoren dem zustimmen.

Nach jedem Sprint (derzeit 64 Blöcke bei Bor) holt Bor einen neuen State-Sync-Datensatz und aktualisiert den Status mit einem `system` Call Hier ist der Code für dieselben: [https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51](https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51)

Während `commitState`, führt Bor `onStateReceive`, mit `stateId` und `data` als Args, auf Target-Contract aus.

## Status-Empfänger-Schnittstelle auf Bor {#state-receiver-interface-on-bor}

`receiver`-Contractauf der Bor Chain muss die folgende Schnittstelle implementieren.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

Nur `0x0000000000000000000000000000000000001001` – `StateReceiver.sol`, muss die Funktion `onStateReceive` auf dem Target-Contract aufrufen dürfen.

## System Call {#system-call}

Nur die Systemadresse, `2^160-2`, erlaubt einen Systemaufruf. Bor ruft sie intern mit der Systemadresse als `msg.sender` auf. Sie ändert den Contract-Zustand und aktualisiert den State-Root für einen bestimmten Block. Inspiriert von [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) und [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

Der System Call ist hilfreich, um von Status auf Contract zu wechseln, ohne eine Transaktion durchzuführen.

## State-sync-Logs und Bor-Block-Beleg {#state-sync-logs-and-bor-block-receipt}

Ereignisse, die von Systemaufrufen ausgehen, werden anders behandelt als normale Protokolle. Hier ist der Code: [https://github.com/maticnetwork/bor/pull/90](https://github.com/maticnetwork/bor/pull/90).

Bor erstellt einen neuen tx / Quittung nur für den Client, der alle Protokolle für state-sync enthält. Tx hash wird von der Blocknummer und dem Block hash abgeleitet (letzter Block in diesem Sprint):

```jsx
keccak256("matic-bor-receipt-" + block number + block hash)
```

Dies ändert keine Konsenslogik, nur `eth_getBlockByNumber``eth_getTransactionReceipt`client und `eth_getLogs`enthält State-Sync-Protokolle mit abgeleitet. Beachten Sie, dass der Bloom-Filter des Blocks keine State-Sync-Protokolle einbezieht. Es beinhaltet auch nicht abgeleitete tx in `transactionRoot`oder .`receiptRoot`