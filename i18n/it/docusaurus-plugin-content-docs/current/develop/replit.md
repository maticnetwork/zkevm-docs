---
id: replit
title: Distribuzione di uno Smart Contract utilizzando Replit
sidebar_label: Using Replit
description: Distribuire Smart Contract utilizzando ReplitIDE su Polygon
keywords:
  - docs
  - matic
  - replit
  - deploy
  - smart contract
  - polygon
  - IDE
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Panoramica {#overview}

[Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) è una piattaforma di codifica che ti permette di scrivere codice e ospitare app. Replit supporta il [linguaggio di programmazione Solidity](https://replit.com/@replit/Solidity-starter-beta?v=1), quindi fornisce tutte le caratteristiche e le funzionalità agli sviluppatori Web3 per creare e distribuire contratti intelligenti.

Questo articolo ti guida a costruire e distribuire uno smart contract di solidità su Polygon utilizzando il modello di sviluppo di [Replit IDE](https://replit.com/signup) e [Replit Solidity (Solidity starter beta)](https://replit.com/@replit/Solidity-starter-beta?v=1).

## Cosa farai {#what-you-will-do}

- Creare un account Replit
- Creare un ambiente Repl
- Distribuire un progetto di campione sulla rete Polygon Mumbai
- Verificare il contratto
- Pubblicare il progetto su un profilo Replit personale.

:::tip

Per ulteriori esempi su Solidity con Replit, puoi leggere l'articolo <ins>**[Iniziare con](https://blog.replit.com/solidity)**</ins> Replit o controllare <ins>**[Replit Solidity e il tutorial del contratto Escrow](https://docs.replit.com/tutorials/33-escrow-contract-with-solidity)**</ins>.
:::

## Prerequisiti {#prerequisites}

Non hai bisogno di una configurazione locale per distribuire il tuo smart contract di solidity su Polygon utilizzando Replit.

Per interagire con la Testnet di Polygon Mumbai e con i contratti distribuiti è necessario un wallet web3 basato su browser. Se stai già utilizzando MetaMask, ti consigliamo di creare un nuovo account per effettuare i test con Replit. Puoi farlo dal menu dell'account, che appare quando clicchi sull'avatar dell'account nell'angolo in alto a destra dell'interfaccia di MetaMask.

Devi impostare tutti i seguenti prerequisiti per poter distribuire il tuo solidity smart contract su Polygon:

1. [Creare un account Replit](https://replit.com/signup)
2. [Scaricare il wallet Metamask](/docs/develop/metamask/hello)
3. [Configurare Polygon su MetaMask](/docs/develop/metamask/config-polygon-on-metamask)
4. [Ottenere token testnet](https://faucet.polygon.technology)

## Lavorare con un Repl {#working-with-a-repl}

Ogni Repl che crei è un ambiente di sviluppo e di produzione completamente funzionale. Segui i passaggi per creare un solidity starter Replit:

1. [Accedi](https://replit.com/login) o [crea un account](https://replit.com/signup). Dopo aver creato il tuo [account Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide), la schermata iniziale includerà una dashboard in cui puoi visualizzare, creare progetti e gestire il tuo account.

![img](/img/replit/dashboard.png)

2. Una volta che è stato acceduto, crea un starter Solidity repl, Seleziona **+ Crea Repl** dal pannello di sinistra o **+** nell'angolo in alto a destra dello schermo.

![img](/img/replit/solidity.png)

3. Seleziona il modello [**starter (beta) di Solidity**](https://replit.com/@replit/Solidity-starter-beta?v=1) e dà al tuo progetto un titolo.

4. Clicca su **+ Crea Repl** per creare il tuo progetto.

:::note

Il starter Solidity repl è dotato di un'interfaccia che consente di utilizzare il <ins>**[Web3 Ethereum JavaScript API](https://web3js.readthedocs.io/en/v1.5.2/)**</ins>, che puoi utilizzare per distribuire e interagire con i nostri contratti. Distribuiremo alla testnet di Replit, una versione personalizzata della blockchain Ethereum gestita da Replit e ottimizzata per il test.

:::

## Distribuzione su Polygon {#deploy-on-polygon}

Assicurati di aver seguito l'elenco delle **Prerequisiti** sopra in modo che tu sia pronto a distribuire e a interagire con il tuo smart contract.

1. Clicca su **Esegui** (in Top) per installare tutti i pacchetti pertinenti e per avviare l'interfaccia utente per la distribuzione del contratto.

2. Collegare il tuo wallet MetaMask all'interfaccia web e passare alla [Mumbai Testnet](docs/develop/metamask/config-polygon-on-metamask).

![img](/img/replit/connect.png)

3. Clicca sul **wallet** Connect, seleziona il tuo account, quindi scegli **Connect**.

![img](/img/replit/deploy-list.png)

4. Dall'elenco a discesa, seleziona il contratto che vuoi distribuire. Clicca su **Distribuzione**.

5. Riceverai una finestra popup di MetaMask che ti chiede la conferma. Approva la transazione dal tuo wallet per distribuire il tuo contratto.

## Verificare e provare il contratto {#verifying-and-testing-your-contract}

Quando il contratto è stato distribuito, [Vai su Polyganscan](https://mumbai.polygonscan.com/) per cercare il tuo account, visualizzare il contratto distribuito e copiare l'indirizzo del tuo account.

Una volta che il contratto sarà stato distribuito, si presenterà come caselle espandibili sotto la casella a discesa. Espandilo e dai un'occhiata a tutte le diverse funzioni disponibili. Ora puoi interagire con il tuo contratto utilizzando l'interfaccia utente fornita o da un URL condivisibile mostrato sull'interfaccia.

## Pubblicare su Replit​ {#publish-to-replit}

Replit ti permette di pubblicare i tuoi progetti su un profilo personale. Dopo la pubblicazione, i progetti appariranno sulla tua pagina Spotlight per essere esplorati, utilizzati, clonati ed elaborati da altri.

Segui le seguenti fasi per pubblicare i tuoi progetti per Replit:

1. Seleziona il titolo del progetto nella parte superiore dello schermo.
2. Completa il tuo nome e la descrizione del progetto e clicca **su Pubblica**.
