---
id: validator-index
title: Indice validatore
description: Una raccolta di istruzioni su come eseguire e utilizzare i nodi di validatore sulla Polygon Network
keywords:
  - docs
  - polygon
  - validate
  - validator
  - maintain
  - architecture
  - Validator Index
slug: validator-index
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Rimani informato

Continua con gli ultimi aggiornamenti del nodo e del validatore del team di Polygon e della community abbonandosi alle [notifiche di Polygon](https://polygon.technology/notifications/).

:::

I validatori sono la componente chiave per mantenere sicura la rete di Polygon. I validatori eseguono un nodo completo e proteggono
la rete mediante lo staking di MATIC per produrre blocchi, validare e partecipare al consenso PoS.

:::info

Lo spazio per accettare nuovi validatori è limitato. I nuovi validatori possono unirsi al set attivo solo dopo che un validatore attualmente attivo abbia eseguito la procedura di unbonding.

Verrà lanciato un nuovo processo di asta per sostituire il validatore.

:::

## Panoramica {#overview}

Polygon è composto dai tre seguenti layer:

* Layer Ethereum — un insieme di contratti sulla Ethereum mainnet.
* Layer Heimdall — un insieme di nodi Heimdall proof-of-stake che vengono eseguiti in parallelo alla Ethereum mainnet, monitorando il set di contratti di staking distribuiti sulla Ethereum mainnet e inviando i checkpoint della rete di Polygon alla Ethereum mainnet. Heimdall è basato su Tendermint.
* Layer Bor — un insieme di nodi Bor che producono blocchi ridistribuiti dai nodi Heimdall. Bor è basato su Go Ethereum.

Per essere un validatore sulla rete di Polygon, devi eseguire:

* Nodo sentinella — una macchina separata che esegue un nodo Heimdall e un nodo Bor. Un nodo sentinella è accessibile da tutti i nodi sulla rete di Polygon.
* Nodo validatore — una macchina separata che esegue un nodo Heimdall e un nodo Bor. Un nodo validatore è accessibile solo dal proprio nodo sentinella e non è accessibile dal resto della rete.
* Staking dei token MATIC nei contratti di staking distribuiti sull'Ethereum mainnet.

## Componenti {#components}

### Heimdall {#heimdall}

Heimdall effettua le seguenti operazioni:

* Monitora i contratti di staking sull'Ethereum mainnet.
* Verifica tutte le transizioni di stato sulla Bor chain.
* Invia i checkpoint di stato della Bor chain all'Ethereum mainnet.

Heimdall è basato su Tendermint.

:::info Vedi anche

* Repository di GitHub: [Heimdall](https://github.com/maticnetwork/heimdall)
* Repository di GitHub: [Contratti di staking](https://github.com/maticnetwork/contracts/tree/master/contracts/staking)
* Post del blog: [Heimdall e Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

### Bor {#bor}

Bor effettua le seguenti operazioni:

* Produce blocchi sulla rete di Polygon.

Bor è il nodo produttore del blocco e un layer per la rete di Polygon. Si basa su Go Ethereum. I blocchi prodotti su Bor vengono validati dai nodi Heimdall.

:::info Vedi anche

* Repository di GitHub: [Bor](https://github.com/maticnetwork/bor)
* Post del blog: [Heimdall e Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

Questa sezione ti guida attraverso i seguenti argomenti:

* [Responsabilità del validatore](validator-responsibilities.md)
* Unirsi alla rete come validatore:
  * [Avviare ed eseguire i nodi con Ansible](run-validator-ansible.md)
  * [Avviare ed eseguire i nodi con i binari](run-validator-binaries.md)
  * [Staking come validatore](validator-staking-operations.md)
* Mantenere sicuri i propri nodi validatore:
  * [Cambiare l'indirizzo del firmatario](change-signer-address.md)
  * [Cambiare la commissione](validator-commission-operations.md)

Assistenza dalla community:

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)
