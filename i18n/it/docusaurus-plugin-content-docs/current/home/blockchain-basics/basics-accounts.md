---
id: accounts
title: Cosa sono gli account?
sidebar_label: Accounts
description: "EOA e Account contrattuali."
keywords:
  - docs
  - matic
  - polygon
  - accounts
  - EOAs
  - contract accounts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Cosa sono gli account? {#what-are-accounts}

Lo stato globale di Ethereum è composto da account che interagiscono tra loro attraverso un framework di passaggio di messaggi. L'interazione più fondamentale è quella di inviare un certo valore, come i token MATIC, il token nativo di Polygon, o $ETH, il token nativo della blockchain di Ethereum.

Ogni account è identificato da un identificatore hex di 20 byte che viene chiamato un indirizzo - che è generato dalla chiave pubblica dell'account.

Ci sono due tipi di account: **account esterno** e **Contratti di proprietà**.

## Account di proprietà esterna {#externally-owned-accounts}

Gli EOA sono account controllati da una chiave privata, con la possibilità di inviare token e messaggi.

1. Possono inviare transazioni (trasferimento di etere o trigger codice contratto),
2. sono controllate da chiavi private,
3. e non hanno codice associato.

## Account di proprietà contratto {#contract-owned-accounts}
Contrattare l'account di proprietà sono account che hanno un codice smart contract associato con esso e la loro chiave privata non è di proprietà di nessuno.

1. Hanno codice associato.
2. la loro esecuzione di codice è innescata da transazioni o messaggi (chiamate) ricevuti da altri contratti.
3. e quando viene eseguito questo codice - esegua le operazioni di complessità arbitraria (Turing completezza) - manipola la propria conservazione persistente e può chiamare altri contratti.

### Risorse {#resources}

- [Per saperne di più sugli account](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#externally-owned-accounts-eoas)
