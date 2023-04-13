---
id: validator-key-management
title: Gestione chiavi dei validatori
description: Gestione del firmatore e del proprietario Key validator
keywords:
  - docs
  - matic
  - polygon
  - Validator Key Management
  - signer
  - owner
image: https://matic.network/banners/matic-network-16x9.png
---

# Gestione chiavi dei validatori {#validator-key-management}

Ogni validatore utilizza due chiavi per gestire le attività correlate al validatore su Polygon. La chiave del firmatario viene mantenuta sul nodo ed è solitamente considerata un `hot` wallet, mentre la chiave del proprietario va tenuta al sicuro e usata di rado, essendo generalmente considerata un `cold` wallet. I fondi messi in staking sono controllati dalla chiave del proprietario.

Questa separazione delle responsabilità è stata fatta per garantire un efficace scambio tra sicurezza e facilità d'uso. Entrambe le chiavi sono gli indirizzi compatibili con Ethereum e funzionano esattamente allo stesso modo. E sì, è possibile avere le stesse chiavi del proprietario e del firmatore.

## Chiave del firmatario {#signer-key}

La chiave del segnale è un indirizzo che viene utilizzato per la firma di blocchi di Heimdall e di altre attività correlate alla firma. La chiave privata di questa chiave si trova sul nodo validatore a scopo di firma. Non può gestire stake, ricompense o deleghe.

Il validatore deve tenere due tipi di bilancia su questo indirizzo:

- I token Matic su Heimdall (attraverso le transazioni Topup) per espletare le responsabilità di validatore su Heimdall
- L'ETH sulla catena di Ethereum per inviare i checkpoint su Ethereum

## Chiave del proprietario {#owner-key}

La chiave del proprietario è un indirizzo che viene utilizzato per la staking, la nuova stake, la modifica della chiave del firmatario, la revoca delle ricompense e la gestione dei parametri relativi alla delega sulla catena di Ethereum. La chiave privata di questa chiave dev'essere tenuta assolutamente al sicuro.

Tutte le transazioni attraverso questa chiave verranno eseguite sulla catena di Ethereum.

## Cambio di firmatario {#signer-change}

In caso di cambio di firmatario sulla catena di Ethereum, su `StakingInfo.sol` si genera questo evento: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol)

```go
// Signer change
event SignerChange(
  uint256 indexed validatorId,
  address indexed oldSigner,
  address indexed newSigner,
  bytes signerPubkey
);
```

Il bridge Heimdall elabora questi eventi e invia le transazioni su Heimdall per cambiare lo stato in base agli eventi.