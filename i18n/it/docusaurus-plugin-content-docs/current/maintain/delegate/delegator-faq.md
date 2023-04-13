---
id: delegator-faq
title: Domande frequenti sul delegatore
sidebar_label: Delegator FAQ
description: FAQ relative alla Delegazione sulla rete Polygon
keywords:
  - docs
  - polygon
  - how to delegate
  - validator
  - stake
  - faq
  - delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

### Qual è l'URL della dashboard di staking? {#what-is-the-staking-dashboard-url}

L'URL del dashboard di staking è https://staking.polygon.technology/.

### Qual è l'importo minimo dello stake? {#what-is-the-minimum-stake-amount}

Non esiste un importo minimo dello stake da delegare. Tuttavia, puoi sempre iniziare con 1 token MATIC.

### Quante ricompense potrò ottenere se delego? {#how-many-rewards-will-i-get-if-i-delegate}

Utilizza il [Calcolatore di Ricompense](https://staking.polygon.technology/rewards-calculator) per determinare le tue stime.

### Perché la mia transazione impiega così tanto? {#why-does-my-transaction-take-so-long}

Tutte le transazioni di staking di Polygon avvengono su Ethereum per motivi di sicurezza.

Il tempo impiegato per completare una transazione dipende dalle gas fee da te consentite e dalla congestione della Ethereum mannet in un dato momento. Puoi sempre utilizzare l'opzione "Speed Up" per aumentare le gas fee in modo che la transazione possa essere completata presto.

### Quali wallet sono attualmente supportati? {#which-wallets-are-currently-supported}

Al momento, sono supportati solamente l'estensione Metamask sul browser per computer fissi e il Coinbase Wallet. Inoltre puoi utilizzare WalletConnect e Walletlink dai wallet mobili supportati per interagire con la dashboard dell'interfaccia utente di Staking sul desktop / laptop. Presto aggiungeremo gradualmente il supporto per altri wallet.

### Sono supportati gli hardware wallet? {#are-hardware-wallets-supported}

Sì, gli hardware wallet sono supportati. Puoi utilizzare l'opzione "Connetti hardware wallet" su Metamask per collegare il tuo hardware wallet e proseguire con il processo di delegazione.

### Perché non è possibile effettuare direttamente lo staking da Binance? {#why-can-t-i-stake-directly-from-binance}

Lo staking tramite Binance non è ancora supportato. Verrà inviato un annuncio nel caso Binance inizi a supportare queste operazioni.

### Ho completato la mia delegazione, dove posso controllare i dettagli? {#i-have-completed-my-delegation-where-can-i-check-details}

Una volta completato la tua delegazione, aspetta 12 block confirmations su Ethereum (circa 3-5 minuti), poi sulla Dashboard, puoi cliccare sul **mio account**.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### Dove posso controllare le mie ricompense? {#where-can-i-check-my-rewards}

Sulla Dashboard puoi cliccare sull'opzione **My Account** sul lato sinistro.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### Ho bisogno di ETH per pagare le gas fee? {#do-i-need-eth-to-pay-for-gas-fees}

Sì. Dovresti mantenere ~0,05-0,1 ETH per sicurezza.

### Per lo staking devo depositare token Matic sulla Polygon Mainnet? {#do-i-need-to-deposit-matic-tokens-to-the-polygon-mainnet-network-for-staking}

No. Tutti i tuoi fondi devono essere sulla rete principale di Ethereum.

### Quando provo a effettuare la transazione il pulsante Conferma è disabilitato, come mai? {#when-i-try-to-do-the-transaction-my-confirm-button-is-disabled-why-so}

Controlla se hai abbastanza ETH per le gas fee.

### Quando viene distribuita la ricompensa? {#when-does-reward-get-distributed}

Le ricompense vengono distribuite ogni volta che viene inviato un checkpoint.

Attualmente, i token MATIC 20188 vengono distribuiti in proporzione a ogni presentazione di checkpoint di successo a ciascun delegatore in base al loro gioco rispetto al pool di staking complessivo di tutti i validatori e delegatori. Inoltre, la percentuale della ricompensa distribuita a ogni delegatore varia per ciascun checkpoint a seconda del rispettivo stake del delegatore, validatore e dello stake complessivo.

(È previsto un bonus del 10% per il proponente, questo viene collezionato dal validatore che invia il checkpoint, ma nel corso del tempo l'effetto del bonus extra viene annullato dopo checkpoint multipli da parte di differenti validatori.)

L'invio di un checkpoint viene effettuato da uno dei validatori approssimativamente ogni 34 minuti. Tale tempo è approssimativo e può variare in base al consenso del validatore sul layer Heimdall di Polygon. Potrebbe variare anche in base alla rete di Ethereum. Una maggiore congestione nella rete può causare ritardi nei checkpoint.

Puoi tracciare i [checkpoint](https://etherscan.io/address/0x86e4dc95c7fbdbf52e33d563bbdb00823894c287) sul contratto di staking

### Perché la ricompensa viene diminuita a ogni checkpoint? {#why-does-reward-keep-getting-decreased-every-checkpoint}

Le ricompense reali ottenute dipenderanno dalla supply totale realmente vincolata sulla rete per ciascun checkpoint. È probabile che questo vari notevolmente con l'aumento dei token MATIC vincolari nei contratti di staking.

Prima di tutto, le ricompense saranno più alte e diminuiranno con l'aumentare della % di supply vincolata. Tale variazione della supply vincolata viene registrata a ogni checkpoint e le ricompense vengono calcolate di conseguenza.

### Come posso riscuotere le mie ricompense? {#how-can-i-claim-my-rewards}

Puoi richiedere le tue ricompense istantaneamente cliccando sul pulsante **Prelevare la** ricompensa. In questo modo, le ricompense accumulate verranno trasferite sull'account a te delegato su Metamask.

<div>
  <img src={useBaseUrl("/img/delegator-faq/withdraw-reward.png")} />
</div>

### Quanto dura il periodo di unbonding? {#what-is-the-unbonding-period}

Il periodo di unbonding su Polygon è al momento di circa 9 giorni. Precedentemente era di 19 giorni. Questo periodo si applica all'importo originariamente delegato e agli importi ridelegati: non si applica a nessuna ricompensa che non sia stata riconsegnata.

### Continuerò a ricevere ricompense dopo la procedura di unbond? {#will-i-keep-receiving-rewards-after-i-unbond}

No. Una volta che ti disaggregati, smetterai di ricevere premi.

### Quante transazioni sono necessarie per la delegazione? {#how-many-transactions-does-the-delegation-require}

La delegazione richiede 2 transazioni, una dopo l'altra. Uno per **Approvare** la richiesta e l'altro per **Deposit**.

<div>
  <img src={useBaseUrl("/img/delegator-faq/delegate.png")} />
</div>

### Cosa significa ridelega le ricompense? {#what-does-redelegate-rewards-mean}

La delega delle tue ricompense significa semplicemente che vuoi aumentare la tua partecipazione restituendo le ricompense che hai accumulato.

### Posso eseguire lo staking su qualsiasi validatore? {#can-i-stake-to-any-validator}

Sì. Al momento tutti i validatori sono dei nodi della Polygon Foundation.

Stiamo conducendo una messa in opera a fasi della Polygon mainnet. In seguito, verranno inseriti gradualmente dei validatori esterni. Per ulteriori dettagli, consulta https://blog.matic.network/mainnet-is-going-live-announcing-the-launch-sequence/.

### Quale browser è compatibile con la dashboard di staking? {#which-browser-is-compatible-with-staking-dashboard}

Chrome, Firefox e Brave

### Il mio Metamask è bloccato alla conferma dopo il login, cosa posso fare? Oppure quando provo a fare il login non succede nulla? {#my-metamask-is-stuck-at-confirming-after-login-what-do-i-do-or-nothing-happens-when-i-try-to-login}

Controlla le seguenti possibilità:

- Se stai usando Brave, ti invitiamo a spegnere l'opzione per **Usare le Wallet Crypto** nel pannello delle impostazioni.
- Controlla se hai effettuato il login a Metamask
- Controlla se hai effettuato il login a Metamask con Trezor/Ledger. Devi inoltre attivare il permesso per i contratti call sul tuo dispositivo Ledger, se non lo hai già fatto.
- Controlla la data e ora del tuo sistema. Nel caso l'orario del sistema non sia corretto, devi correggerlo.

### Come posso inviare i fondi da Binance o altri exchange al Polygon wallet? {#how-do-i-send-funds-from-binance-or-other-exchanges-to-polygon-wallet}

Tecnicamente, il Polygon wallet/l'interfaccia di staking è solo un'applicazione web. Attualmente supporta i seguenti wallet - Metamask, WalletConnect e WalletLink.

Prima di tutto, devi ritirare i fondi da Binance o qualsiasi altro scambio con il tuo indirizzo Ethereum su Metamask. Se non sai come usare Metamask, fai qualche ricerca su Google. Ci sono numerosi video su come iniziare a utilizzarlo.

### Quando posso diventare un validatore e quanti token faccio per questo? {#when-can-i-become-a-validator-and-how-many-tokens-do-i-for-that}

Un utente può diventare validatore solo nel caso si verifichino le seguenti condizioni:
1. Quando un validatore decide di uscire dalla rete, o
2. Attendere il meccanismo d'asta e sostituire un validatore inattivo.

Lo stake minimo dipende dal processo d'asta nel quale viene selezionato l'utente la cui offerta superi quelle degli altri.

### Cosa succede nel caso abbia guadagnato delle ricompense durante la delegazione e aggiunga ulteriori fondi allo stesso nodo validatore? {#if-i-have-earned-rewards-while-delegating-and-if-i-add-additional-funds-to-the-same-validator-node-what-happens}

Se non hai ridelegato le tue ricompense prima di delegare ulteriori fondi allo stesso nodo validatore, le tue ricompense verranno prelevate automaticamente.

Se non vuoi che ciò avvenga, ridelega le tue ricompense prima di delegare ulteriori fondi.

### Ho delegato i miei token attraverso Metamask sulla Dashboard di staking. Devo mantenere acceso il sistema o dispositivo? {#i-have-delegated-my-tokens-via-metamask-on-the-staking-dashboard-do-i-need-to-keep-my-system-or-device-on}

No. Una volta che le transazioni della Delegazione sono confermate e puoi vedere i tuoi token riflessi nelle sezioni **Total Stake** e **New Reward** allora hai finito. Non è necessario tenere acceso il sistema o dispositivo.

### Ho incollato, quanto tempo ci vorrà per Unbond? {#i-have-unbonded-how-long-will-it-take-to-unbond}

Il periodo di unbond è attualmente impostato a 82 checkpoint. Approssimativamente 9 giorni. Ogni checkpoint richiede circa 34 minuti. Tuttavia, alcuni checkpoint potrebbero subire ritardi fino a ~1 ora per via della congestione su Ethereum.

### Ho incollato e ora vedo il pulsante Claim Stake, ma è disabilitato, perché è? {#i-have-unbonded-and-i-now-see-the-claim-stake-button-but-it-is-disabled-why-is-that}

Il pulsante Richiedi stake sarà abilitato solo quando il periodo di unbond sarà completato. Il periodo di unbond è attualmente impostato a 82 checkpoint.

### Posso sapere quando il pulsante Richiedi stake sarà abilitato? {#do-i-know-when-will-the-claim-stake-button-be-enabled}

Sì, sotto il pulsante Richiedi stake potrai visualizzare una nota con quanti checkpoint rimangono ancora all'attivazione del pulsante Richiedi stake. Ciascun checkpoint richiede circa 30 minuti. Tuttavia, alcuni checkpoint potrebbero subire ritardi fino a ~1 ora per via della congestione su Ethereum.

<div>
  <img src={useBaseUrl("/img/delegator-faq/unbond.png")} />
</div>

### Come posso trasferire la mia delegazione dai nodi della Fondazione ai nodi esterni? {#how-do-i-switch-my-delegation-from-foundation-nodes-to-external-nodes}

Puoi trasferire la tua delegazione tramite l'opzione **Sposta stake** sull'interfaccia utente di staking. In questo modo, la tua delegazione verrà spostata dal nodo della Fondazione a qualsiasi nodo esterno di tua scelta.

<div align="center">
  <img src={useBaseUrl("/img/delegator-faq/move-stake.png")} width="500" />
</div>

Vedrai un elenco di altri validatori:

<div>
  <img src={useBaseUrl("/img/delegator-faq/validators.png")} />
</div>

### È previsto un periodo di ubonding quando trasferisco la delegazione dai nodi della Fondazione ai nodi esterni? {#will-there-be-any-ubonding-period-when-i-switch-delegation-from-foundation-nodes-to-external-nodes}

Non esiste alcun periodo di unbonding quando trasferisci la delegazione dai nodi della Fondazione ai nodi esterni. Il passaggio sarà diretto e senza ritardi. Tuttavia, è previsto un periodo di unbonding in caso di unbonding da un nodo della Fondazione o da un nodo esterno.

### Ci sono delle specifiche per scegliere un nodo esterno durante il trasferimento della delegazione? {#are-they-any-specifics-to-choose-an-external-node-during-switch-delegation}

No. Puoi scegliere il nodo che desideri.

### Cosa succede alle ricompense che ho accumulato quando trasferisco la delegazione dal nodo della Fondazione al nodo esterno? {#what-happens-to-my-rewards-that-are-accumalated-if-i-switch-delegation-from-foundation-to-external-node}

Nel caso tu non abbia già riscosso le ricompense prima di trasferire la delegazione, una volta trasferita con successo la tua delegazione dal nodo della Fondazione al nodo esterno, le tue ricompense accumulate fino a quel momento verranno trasferite di nuovo sul tuo account.

### La delegazione ai nodi esterni funziona come quella ai nodi della Fondazione? {#will-delegation-on-the-external-nodes-work-the-same-as-foundation-nodes}

Sì, funzionerà lo stesso dei nodi della Fondazione.

### Continuerò a ricevere ricompense dopo la delegazione a un nodo esterno? {#will-i-still-get-rewards-after-delegating-to-an-external-node}

Sì, le ricompense verranno distribuite come succedeva in precedenza con i nodi della Fondazione. L'invio corretto di un checkpoint genererà delle ricompense. Le ricompense verranno calcolate e distribuite a ogni checkpoint in relazione alla proporzione dello stake, secondo l'implementazione attuale.

### È previsto un periodo di unbonding in caso di unbond da un nodo esterno? {#will-there-be-any-unbonding-period-if-i-unbond-from-an-external-node}

Sì, il periodo di unbond rimarrà lo stesso dell'implementazione attuale. 82 checkpoint.

### È previsto un periodo di vincolo una volta trasferita la mia Delegazione dalla Fondazione al nodo esterno? {#will-there-be-any-locking-period-after-i-switch-my-delegation-from-foundation-to-external-node}

No. Non ci sarà alcun periodo di vincolo a seguito del trasferimento della tua delegazione.

### È possibile effettuare un trasferimento parziale della mia delegazione dalla Fondazione ai nodi esterni? {#can-i-partially-switch-my-delegation-from-foundation-to-external-nodes}

Sì, hai la possibilità di trasferire parzialmente il tuo stake dal nodo della Fondazione al nodo esterno. Lo stake parziale rimanente rimarrà sul nodo della Fondazione. Potrai spostarlo a un altro nodo di tua scelta o sullo stesso nodo.

### Posso trasferire la delegazione da un nodo esterno a un altro nodo esterno? {#can-i-switch-delegation-from-an-external-node-to-another-external-node}

No, l'opzione **Sposta stake** è disponibile solo sui nodi della Fondazione. Se vuoi trasferire la tua delegazione da un nodo esterno a un altro nodo esterno, dovrai prima effettuare la procedura di unbond e quindi delegare a un altro nodo esterno.

### Quando verranno disattivati i nodi della Fondazione? {#when-will-the-foundations-node-be-turned-off}

I nodi di fondazione saranno turned entro la fine di gennaio 2021.

### Sono previsti dei nodi della Fondazione in futuro? {#will-there-be-any-foundation-nodes-in-the-future}

No, non ci saranno nodi della Fondazione in futuro.

### Per quante transazioni dovrò pagare le gas fee usando la funzione Sposta stake? {#how-many-transactions-do-i-need-to-pay-for-gas-when-i-do-a-move-stake}

La funzione Sposta stake costituisce una singola transazione. Tutte le transazioni avverranno sulla blockchain di Ethereum, quindi dovrai spendere alcuni ETH per eseguire la transazione Sposta stake.
