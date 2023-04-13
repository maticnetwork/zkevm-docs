---
id: how-state-sync-works
title: Come funziona State Sync?
description: "Inviare lo stato dalla catena di Ethereum alla catena di Bor."
keywords:
  - docs
  - matic
  - state sync
  - working
image: https://matic.network/banners/matic-network-16x9.png
---

# Come funziona State Sync? {#how-does-state-sync-work}

La gestione dello stato invia lo stato dalla catena di Ethereum alla catena di Bor. Si chiama **state-sync**.

Il trasferimento di Stato da Ethereum a Bor avviene tramite la chiamata di sistema. Supponiamo che un utente depositi USDC al deposit manager su Ethereum. I convalidatori ascoltano quegli eventi, convalidano e memorizzarli in Heimdall state. Bor ottiene gli ultimi record di sincronizzazione dello stato e aggiorna lo stato Bor (conia la stessa quantità di USDC su Bor) utilizzando una chiamata di sistema.

## Mittente dello stato {#state-sender}

Fonte: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Per sincronizzare lo stato, il contratto chiama seguendo il metodo **contratto del mittente dello stato** nella catena di Ethereum.

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

Il contratto `receiver` deve essere presente sulla catena figlio, che riceve lo stato `data` una volta completato il processo. `syncState` emette un evento `StateSynced` su Ethereum, che è il seguente:

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

Una volta che l'evento `StateSynced` è stato emesso sul contratto `stateSender` della catena Ethereum, Heimdall ascolta quegli eventi e si aggiunge allo stato di Heimdall dopo che 2/3+ validatori concordano sul.

Dopo ogni sprint (attualmente 64 blocchi su Bor), Bor recupera un nuovo record di sincronizzazione dello stato e aggiorna lo stato utilizzando una chiamata `system`. Ecco il codice per la stessa cosa: [https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51](https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51)

Durante `commitState`, Bor esegue `onStateReceive`, con `stateId` e `data` come args, sul contratto target.

## Interfaccia del ricevitore dello stato su Bor {#state-receiver-interface-on-bor}

Il contratto `receiver` sulla catena Bor deve implementare la seguente interfaccia.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

Solo `0x0000000000000000000000000000000000001001` — `StateReceiver.sol`, deve essere autorizzato a chiamare la funzione `onStateReceive` sul contratto target.

## Chiamata di sistema {#system-call}

Solo l'indirizzo di sistema, `2^160-2`, consente di effettuare una chiamata di sistema. Bor lo chiama internamente con l'indirizzo di sistema come `msg.sender`. Cambia lo stato del contratto e aggiorna la root dello stato per un blocco particolare. Ispirato da [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) e [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

La chiamata di sistema è utile per cambiare lo stato in contratto senza effettuare alcuna transazione.

## Log di sincronizzazione dello stato e ricevuta di blocco di Bor {#state-sync-logs-and-bor-block-receipt}

Gli eventi emessi dalle chiamate di sistema sono gestiti in modo diverso rispetto ai normali log. Ecco il codice: [https://github.com/maticnetwork/bor/pull/90](https://github.com/maticnetwork/bor/pull/90).

Bor produce una nuova tx/ricevuta solo per il client che include tutti i log per la state-sync. Tx hash deriva dal numero di blocco e dall'hash di blocco (ultimo blocco a quella sprint):

```jsx
keccak256("matic-bor-receipt-" + block number + block hash)
```

Questo non cambia alcuna logica di consenso, solo le modifiche dei `eth_getBlockByNumber`client. `eth_getTransactionReceipt`, e `eth_getLogs`include log di stato sincronizzazione con derivato. Nota che il filtro bloom sul blocco non comprende l'inclusione per i log di sincronizzazione dello stato. Inoltre non include tx derivata in `transactionRoot`o .`receiptRoot`