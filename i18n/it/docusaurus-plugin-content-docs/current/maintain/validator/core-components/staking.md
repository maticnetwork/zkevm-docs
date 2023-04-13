---
id: staking
title: Staking
sidebar_label: Staking
description: Passare, unstake, e tornare come un validatore
keywords:
  - docs
  - matic
  - polygon
  - staking
  - unstake
  - restake
  - validator
slug: staking
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

La rete di Polygon consente a qualsiasi partecipante di diventare un validatore eseguendo un nodo completo per guadagnare ricompense e riscuotere le commissioni derivanti dalle transazioni. Per garantire la partecipazione in buona fede dei validatori, questi vincolano parte dei loro token MATIC come stake all'interno dell'ecosistema.

I validatori della rete di Polygon vengono selezionati tramite un processo di asta on-chain che avviene a intervalli regolari.

Un validatore possiede due indirizzi, uno come proprietario e uno da firmatario. Lo staking viene fatto con l'indirizzo come proprietario.

Vedi anche [Gestione delle chiavi](key-management.md).

## Stake {#stake}

:::note

Attualmente lo spazio disponibile per accettare nuovi validatori è limitato.

Un nuovo validatore può unirsi al set attivo solo quando un validatore attualmente attivo esegue la procedura di unbond.

:::

Per entrare a far parte del set di validatori, devi mettere in staking i tuoi token MATIC. Vedi [le operazioni di staking del validatore](/docs/maintain/validate/validator-staking-operations).

## Annulla lo stake {#unstake}

L'unstaking consente al validatore di uscire dal pool attivo di validatori.

Per garantire la partecipazione in buona fede, lo stake dei validatori viene bloccato per 80 checkpoint.

## Restaking {#restake}

I validatori possono aggiungere più token MATIC al loro stake:

* Per guadagnare più ricompense.
* Per mantenere la posizione nel set di validatori.
