---
id: move-stake
title: Sposta lo stake
description: Spostare la tua puntata sulla rete di polygon
keywords:
  - docs
  - polygon
  - matic
  - stake
  - move stake
  - validator
  - delegator
slug: move-stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Spostare lo stake dai nodi della fondazione ai nodi esterni {#moving-stake-from-foundation-nodes-to-external-nodes}

<video loop autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/staking/MoveStakeDemo.mp4"></source>
  <source type="video/quicktime" src="/img/staking/MoveStakeDemo.mov"></source>
  <p>Il tuo browser non supporta questo elemento video.</p>
</video>

Ora i delegatori hanno l'opzione di spostare il proprio stake dai nodi della Fondazione ai nodi esterni di loro scelta usando la funzionalità Sposta lo stake presente nell'interfaccia utente di staking

Spostare lo stake dal nodo della fondazione al nodo esterno costituisce una singola transazione. Quindi non ci sono ritardi o periodi di unbonding durante questo evento.

Ricorda che è consentito usare la funzione Sposta lo stake solo dal nodo della fondazione ai nodi esterni. Se desideri spostare lo stake da un nodo esterno a un altro nodo esterno, dovrai prima eseguire la procedura di Unbond e quindi delegare sul nuovo nodo esterno.

Inoltre, la funzione Sposta lo stake è una funzionalità temporanea sviluppata dal team di Polygon per garantire la semplicità di spostamento dei fondi dai nodi della fondazione ai nodi esterni. E resterà attiva solo fino a quando i nodi della fondazione verranno disabilitati.

## Come spostare lo stake {#how-to-move-stake}

Per spostare la stake, prima dovrai effettuare il login [all'interfaccia utente di Staking](https://wallet.polygon.technology/staking) utilizzando il tuo indirizzo Delegatore.

**Indirizzo** Delegatore: l'indirizzo che hai già utilizzato per la messa in gioco delle nodi della Fondazione.

Una volta che è stato acceduto, vedrai un elenco di Validatori.

<img src={useBaseUrl("img/staking/validator-list.png")} />

Ora vai al tuo profilo delegatore cliccando sul pulsante **Mostra dettagli del delegatore** o sull'opzione **Dettagli del mio Delegatore** a sinistra.

<img src={useBaseUrl("img/staking/show-delegator-details.png")} />

Qui troverai un nuovo pulsante chiamato **Move Stake**.

<img src={useBaseUrl("img/staking/move-stake-button.png")} />

Cliccando questo pulsante verrai portato a una pagina contenente un elenco dei validatori a cui è possibile delegare. Puoi delegare a qualsiasi validatore presente in questo elenco.

<img src={useBaseUrl("img/staking/move-stake-validator.png")} />

Ora dopo aver scelto il tuo validatore a cui vuoi delegare, clicca sul pulsante **Delegato** Qui. Cliccando su quel pulsante aprirà una finestra di popup.

<img src={useBaseUrl("img/staking/stake-funds.png")} />

Qui vedreste un campo **di quantità** che si popola automaticamente con l'intera quantità per la Delegazione. Puoi anche scegliere un importo parziale da delegare a un validatore.

Ad esempio, se hai delegato 100 token Matic al nodo della fondazione 1 e ora desideri spostare il tuo stake dal nodo della fondazione a un nodo esterno, puoi delegare un importo parziale al nodo esterno di tua scelta, supponiamo 50 token Matic. I restanti 50 token Matic rimarranno nel nodo della fondazione 1. Quindi, puoi scegliere di delegare il resto dei 50 token a un altro nodo esterno oppure allo stesso nodo esterno.

Una volta entrato l'importo puoi quindi cliccare sul pulsante **Stake** Fund. Ti verrà quindi chiesta una conferma sul tuo Metamask per firmare la transazione.

Una volta firmata la transazione, il tuo stake viene spostato correttamente dal nodo della fondazione al nodo esterno. Tuttavia, dovrai attendere 12 conferme del blocco prima che questo sia visibile sull'interfaccia utente di staking. Se i fondi da te spostati non vengono visualizzati dopo 12 conferme del blocco, prova a ricaricare la pagina per visualizzare gli stake aggiornati.

Se hai domande o problemi, invia un ticket [qui](https://support.polygon.technology/support/home).
