---
id: change-signer-address
title: Cambiare l'indirizzo del firmatario
description: Cambia l'indirizzo del tuo validatore
keywords:
  - docs
  - matic
  - polygon
  - signer address
  - change
  - validator
slug: change-signer-address
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Per informazioni su cosa sia un [indirizzo del firmatario](/docs/maintain/glossary.md#signer-address), consulta
[Gestione della chiave](/docs/maintain/validator/core-components/key-management).

## Prerequisiti {#prerequisites}

Assicurati che il tuo nuovo nodo validatore sia completamente sincronizzato e stia funzionando col nuovo indirizzo del firmatario.

## Cambiare l'indirizzo del firmatario {#change-the-signer-address}

Questa guida fa riferimento al tuo nodo validatore attuale come Nodo 1 e al tuo nuovo nodo validatore come Nodo 2.

1. Accedi alla [dasboard di staking](https://staking.polygon.technology/) con l'indirizzo del Nodo 1.
2. Nel tuo profilo, clicca **Modifica profilo**.
3. Nel campo **Indirizzo del firmatario**, inserisci l'indirizzo del Nodo 2.
4. Nel campo **Chiave pubblica del firmatario**, inserisci la chiave pubblica del Nodo 2.

   Per ottenere la chiave pubblica, esegui il seguente comando sul nodo validatore:

   ```sh
   heimdalld show-account
   ```

Cliccando su **Salva**, verranno salvati i dati del tuo nuovo nodo. Questo significa essenzialmente che il Nodo 1 sarà il tuo indirizzo che controlla lo stake, dove verranno inviate le ricompense ecc., mentre ora il Nodo 2 eseguirà attività come firmare i blocchi, firmare i checkpoint, ecc.
