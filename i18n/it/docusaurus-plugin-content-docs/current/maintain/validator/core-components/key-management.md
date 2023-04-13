---
id: key-management
title: Gestione delle chiavi
description: Gestione delle chiavi del firmatore e del proprietario
keywords:
  - docs
  - polygon
  - matic
  - key
  - key management
  - signer
  - owner
slug: key-management
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Ciascun validatore utilizza due chiavi per gestire le attività correlate ai validatori su Polygon:

* Chiave del firmatario
* Chiave del proprietario

## Chiave del firmatario {#signer-key}

La chiave del firmatario è l'indirizzo utilizzato per firmare i blocchi Heimdall, i checkpoint e altre attività correlate alla firma.

La chiave privata dell'indirizzo del firmatario deve trovarsi sulla macchina che esegue il nodo validatore ai fini della firma.

La chiave del firmatario non può gestire lo staking, le ricompense o le deleghe.

Il validatore deve tenere ETH sull'indirizzo del firmatario sulla Ethereum mainnet per inviare i [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction).

## Chiave del proprietario {#owner-key}

La chiave del proprietario è l'indirizzo utilizzato per mettere in staking, rimettere in staking, modificare la chiave del firmatario, ritirare le ricompense e gestire i parametri relativi alla delega sulla Ethereum mainnet. La chiave privata per la chiave del proprietario deve essere protetta a tutti i costi.

Tutte le transazioni tramite la chiave del proprietario vengono eseguite sulla Ethereum mainnet.

La chiave del firmatario viene conservata nel nodo ed è generalmente considerata un **hot** wallet, mentre la chiave del proprietario dovrebbe essere molto sicura, viene utilizzata di rado ed è generalmente considerata un **cold** wallet. I fondi messi in staking sono controllati dalla chiave del proprietario.

Questa separazione delle responsabilità tra le chiavi del firmatario e del proprietario viene effettuata per garantire un efficiente compromesso tra sicurezza e facilità d'uso.

Entrambe le chiavi sono indirizzi compatibili con Ethereum e funzionano esattamente allo stesso modo.

## Cambio di firmatario {#signer-change}

Vedi [Cambia il tuo indirizzo di firmatario](/docs/maintain/validate/change-signer-address).
