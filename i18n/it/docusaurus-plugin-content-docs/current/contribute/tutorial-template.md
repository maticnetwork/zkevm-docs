---
id: tutorial-template
title: Template generale per i tutorial
sidebar_label: Tutorial template
description: Segui il template del tutorial quando scrivi un tutorial tecnico.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - tutorial
  - contribute
  - template
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: tutorial-template
---

Questo modello dovrebbe essere utilizzato quando si contribuisce a un tutorial al Polygon Wiki. Puoi scegliere di contribuire con un tutorial su un argomento di tua scelta.

## Linee guida generali {#general-guidelines}

* L'ambito del tutorial dovrebbe essere chiaro dal titolo.
* Il tutorial dovrebbe essere in grado di descrivere con precisione le caratteristiche e le funzionalità dei prodotti o dei servizi.
* Cerca di tenere il tutorial veloce e conciso, ma approfondisci su concetti chiave quando appropriato. Fornisci informazioni contestuali quando possibile.
* Sii specifico per i passaggi di configurazione e implementazione.
* Cerca di aggiungere immagini, icone o screenshot di supporto che complementino il contenuto scritto.
  > Il team della documentazione può anche aiutarti a creare diagrammi.
* Tieni in mente il tipo di audience per cui stai scrivendo. Se il materiale ha un certo livello di difficoltà, questo dovrebbe essere menzionato nel tutorial.
  > Se ci sono passaggi che un utente dovrebbe seguire prima di iniziare a seguire il tutorial, menzionali.
* Il team della documentazione può aiutarti a creare un tutorial.
* Ricorda di considerare la **[Guida di stile](writing-style.md)**.

:::caution Come aggiornare tutorial già esistenti

Se noti che i tutorial sulla wiki di Polygon non seguono questo template, è perché il team della documentazione ha deciso di implementare uno standard, così che il flow dei tutorial resti coerente in tutti i tutorial. Il team sta lavorando per aggiornare questi tutorial così che assomiglino a questo template. Se sei interessato ad aiutare, puoi anche aggiornare un tutorial già esistente per ristrutturarlo.

:::

## Sezioni dei tutorial {#tutorial-sections}

### Panoramica {#overview}

Spiega i prodotti o servizi che verranno discussi nel tutorial. Fornisci informazioni contestuali attinenti al tutorial e ciò che il tutorial vuole presentare. Il tutorial dovrebbe sempre essere incentrato sull'utilizzo di un prodotto Polygon.

### Cosa imparerai a fare {#what-you-ll-learn}

Riassumi ciò che l'utente imparerà durante il tutorial.

:::note Esempio

Scoprirai come utilizzare la Truffle Suite per sviluppare dApps Polygon.

:::

#### Obiettivi d'apprendimento {#learning-outcomes}

Delinea gli obiettivi d'apprendimento.

:::note Esempio

1. Scoprirai di più su Fauna.
2. Imparerai come utilizzare ReactJS per la UI della tua dApp.
3. Scoprirai come mantenere sicuri i dati dApp.

:::

Menzionare i prerequisiti e cosa dovrebbe l'utente già avere familiarità con. Fornisci link per la documentazione necessaria per tutto ciò che l'utente dovrebbe già sapere.

:::note Esempio

Prima di iniziare questo tutorial, dovresti conoscere le basi dello sviluppo EVM di dApp. Consulta "questi documenti" per maggiori informazioni.

:::

### Cosa farai {#what-you-ll-do}

Descrivi i passaggi del tutorial e gli strumenti che verranno utilizzati.

:::note Esempio

Utilizzerai Solidity per creare uno smart contract in un ambiente ChainIDE.

1. Configurare un wallet
2. Scrivi uno smart contract ERC-721
3. Compila uno smart contract ERC-721
4. Implementa uno smart contract ERC-721
5. Crea un file flattened utilizzando Flattener Library
6. Verifica uno smart contract
7. Minting di NFT

:::

### Il tutorial stesso {#the-tutorial-itself}

In generale, il tutorial può essere presentato nella migliore categorizzazione che lo scrittore si vede in forma; questo dovrebbe riflettersi in [quello che farai](#what-youll-do) sezione. Detto questo, le sezioni del tutorial dovrebbero coprire queste tre categorie principali:

> Assicurati di considerare le parole chiavi e tieni in mente il SEO quando delinei le sezioni.

#### Costruisci la tua applicazione {#build-your-application}

Il contenuto principale del tutorial. Questo può includere sezioni come "installazione", "configurazione", e "implementazione", per esempio.

#### Esegui o implementa la tua applicazione {#run-or-deploy-your-application}

Spiega come l'utente dovrebbe eseguire o implementare la propria applicazione.

#### Testa la tua applicazione {#test-your-application}

Potrebbe essere la scrittura di test per uno smart contract, uno smart contract verifica, ecc.

### Prossimi passi {#next-steps}

Concludi il tutorial e rifletti sugli obiettivi d'apprendimento. Descrivi i prossimi passaggi che l'utente può seguire.

:::note Esempio

Congratulazioni, hai implementato il tuo smart contract. Ora sai come usare ChainIDE per creare e implementare smart contract. Potresti voler provare "questo tutorial".

:::
