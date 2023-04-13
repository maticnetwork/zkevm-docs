---
id: how-state-sync-works
title: Comment fonctionne la Synchronisation d'État?
description: "Envoyez l'état de la chaîne d'Ethereum sur la chaîne de Bor."
keywords:
  - docs
  - matic
  - state sync
  - working
image: https://matic.network/banners/matic-network-16x9.png
---

# Comment fonctionne la Synchronisation d'État? {#how-does-state-sync-work}

Une gestion d'état envoie l'état de la chaîne d'Ethereum vers la chaîne de Bor. Il s'appelle **state-sync**.

Le transfert d'État d'Ethereum vers Bor se fait via un appel système. Supposons qu'un utilisateur dépose USDC au gestionnaire de dépôts sur Ethereum. Les validateurs écoutent ces événements, valident et les stockent dans l'état Heimdall. Bor obtient les dernières informations de synchronisation d'état et met à jour l'état de Bor (frappe un montant égal d’USDC sur Bor) en utilisant un appel de système.

## Expéditeur d'état {#state-sender}

Source: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Pour synchroniser l'état, le contrat appelle la méthode suivante: **contrat expéditeur d'état** sur la chaîne Ethereum.

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

`receiver`Le contrat doit être présent sur la chaîne enfant, qui reçoit l'état `data` une fois que le processus est terminé. `syncState` émet `StateSynced` l'événement  sur Ethereum, qui est le suivant:

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

Une fois `StateSynced`l'événement émis sur le `stateSender`contrat sur la chaîne Ethereum, Heimdall écoute ces événements et ajoute sur l'état Heimdall après l'accord de plus de deux tiers des validateurs.

Après chaque sprint (actuellement 64 blocs sur Bor), Bor récupère une nouvelle information de synchronisation d'état et met à jour l'état en utilisant un `system`appel. Voici le code por la même chose: [https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51](https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51)

Tout au long `commitState`, Bor exécute `onStateReceive`, avec `stateId` et `data` en tant que args, sur le contrat cible.

## Interface du destinataire de l'état sur Bor {#state-receiver-interface-on-bor}

`receiver`Le contrat sur la chaîne de Bor doit mettre en oeuvre l'interface suivante.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

Seulement `0x0000000000000000000000000000000000001001` -  `StateReceiver.sol`, doit être autorisé à appeller `onStateReceive` la fonction sur le contrat cible.

## Appel de système {#system-call}

Seulement une adresse de système, `2^160-2`, permet de faire un appel de système. Bor fait l'appel en interne avec l'adresse de système comme `msg.sender`. Cela modifie le contrat d'état et met à jour le root d'état pour un bloc particulier. Inspiré de [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) et [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

L'appel de système est utile pour modifier l'état du contrat sans faire aucune transaction.

## Registres de synchronisation d'état et Réception de Blocs de Bor {#state-sync-logs-and-bor-block-receipt}

Les événements émanant des appels de système sont traités d'une manière différente des journaux normaux. Voici le code: [https://github.com/maticnetwork/bor/pull/90](https://github.com/maticnetwork/bor/pull/90).

Bor produit un nouveau tx/reçu pour le client qui inclut tous les fichiers journaux pour state-sync. Le hash Tx est dérivé du nombre de blocs et du hash de blocs (dernier bloc à ce sprint):

```jsx
keccak256("matic-bor-receipt-" + block number + block hash)
```

Cela ne change pas de logique de consensus , seuls les changements du client. `eth_getBlockByNumber``eth_getTransactionReceipt`, et `eth_getLogs`inclut des journaux state-sync avec dérivé. Veuillez noter que le filtre de Bloom sur le bloc ne prévoit pas l'inclusion des registres de synchronisation d'état. Il n'inclut pas non plus de tx dérivés dans `transactionRoot`ou .`receiptRoot`