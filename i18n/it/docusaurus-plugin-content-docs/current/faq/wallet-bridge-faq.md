---
id: wallet-bridge-faq
title: Wallet <>Bridge
description: Costruisci la tua prossima app blockchain su Polygon.
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - wallet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Dove posso utilizzare il Polygon Web Wallet? {#where-can-i-use-the-polygon-web-wallet}
Ecco il Polygon Wallet Suite URL: https://wallet.polygon.technology/ La Polygon Wallet Suite è una raccolta di applicazioni Web3 fornite da Polygon. È costituito dal [Polygon Wallet](https://wallet.polygon.technology/polygon/assets) (un wallet decentralizzato), dal [Polygon Bridge](https://wallet.polygon.technology/polygon/bridge/deposit) (un ponte L1-L2), da [Polygon Staking](https://staking.polygon.technology/) (un ambiente per la creazione e la delega dei token MATIC) e dal [Polygon Safe Bridge](https://safe-bridge.polygon.technology/safe) (un ponte multisig).

<div align= "center">
  <img src={useBaseUrl("img/faq/wallet/wallet-hp.png")} />
</div>

## Quali wallet sono attualmente supportati? {#which-wallets-are-currently-supported}

Metamask, Coinbase, Bitski Wallet, Venly e WalletConnect sono i wallet attualmente supportati.

<div align="center">
  <img src={useBaseUrl("img/faq/wallet/supported-wallets.png")} width="400" />
</div>

## Cosa posso fare con il mio Polygon wallet? {#what-can-i-do-with-my-polygon-wallet}

- Inviare fondi a qualsiasi account su Polygon.
- Depositare fondi da Ethereum a Polygon (utilizzando il bridge).
- Riprelevare fondi da Polygon in Ethereum (anche utilizzando il bridge).

## Il mio wallet di MetaMask non si sta collegando con il wallet di Polygon {#my-metamask-wallet-is-not-connecting-with-polygon-wallet}

Ci sono molti motivi per cui potrebbe accadere. Ti suggeriamo di **provare un'altra volta**, **di utilizzare un altro browser** o, se uno di questi non aiuta, **[contattare il nostro team](https://support.polygon.technology/support/home)** di supporto.

## Come posso depositare fondi da Ethereum a Polygon utilizzando Polygon Wallet Suite. {#how-can-i-deposit-funds-from-ethereum-to-polygon-using-polygon-wallet-suite}
Si prega di guardare il video qui sotto o seguire [questo tutorial](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#depositing-funds-from-ethereum-to-polygon).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/deposit/deposit-polygon-wallet.mp4"></source>
  <p>Il tuo browser non supporta questo elemento video.</p>
</video>

## Come posso ritirare i fondi da Polygon a Ethereum tramite PoS Bridge utilizzando Polygon Wallet Suite? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-pos-bridge-using-polygon-wallet-suite}
Si prega di guardare il video qui sotto o seguire [questo tutorial](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-pos-bridge).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/pos/withdraw-polygon-wallet.mp4"></source>
  <p>Il tuo browser non supporta questo elemento video.</p>
</video>

## Come posso ritirare i fondi da Polygon a Ethereum tramite Plasma Bridge utilizzando Polygon Wallet Suite? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-plasma-bridge-using-polygon-wallet-suite}
Si prega di guardare il video qui sotto o seguire [questo tutorial](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-plasma-bridge).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/plasma/withdraw-plasma-v3.mov"></source>
  <p>Il tuo browser non supporta questo elemento video.</p>
</video>

## Come aggiungere un token nuovo o personalizzato alla lista dei Token di Polygon Wallet? {#how-to-add-a-new-or-custom-token-to-polygon-wallet-token-list}
Segui [questo tutorial.](/docs/faq/adding-a-custom-token)

## Come posso trovare il contratto token? {#how-do-i-find-the-token-contract}

L'indirizzo del contratto token sarà richiesto quando stai cercando di aggiungere un token nuovo o personalizzato. Puoi cercare il token con il suo nome sia su Coingecko o CoinMarketCap dove potrai vedere il suo indirizzo sulla catena Ethereum (per i token ERC20) e altre blockchain supportate come Polygon. L'indirizzo del token sulle altre catene potrebbe non essere aggiornato, ma puoi benissimo limitarti a utilizzare l'indirizzo root.

## Ho depositato i miei fondi ma non lo vedo su Metamask. Cosa posso fare? {#i-have-deposited-my-funds-but-i-don-t-see-it-on-metamask-what-do-i-do}

Devi aggiungere manualmente l'indirizzo token personalizzato a Metamask.

Apri Metamask e scorri verso il basso per cliccare su **Importa token**.

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/wallet-faq-3.png")} width="400" />
</div>

Poi aggiungi l'indirizzo del contratto, il simbolo e la precisione decimale. Gli indirizzi di contratto (PoS-WETH in questo caso) si possono trovare su questo link: [https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/](https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/). Devi aggiungi l'indirizzo del token figlio per visualizzare i bilanci su Polygon Mainnet. Il decimale della precisione è 18 per WETH (per la maggior parte dei token, il decimale della precisione è 18).

## Come posso aggiungere Polygon Mainnet su Metamask? {#how-can-i-add-polygon-mainnet-on-metamask}

Controlla [questo tutorial](/docs/develop/metamask/config-polygon-on-metamask).

## Il mio token non è visibile nell'elenco. Chi dovrei contattare? {#my-token-is-not-visible-in-the-list-who-should-i-contact}

Contatta il team Polygon su Discord o Telegram e ottieni il tuo token in elenco. Prima di questo, assicurati che il token sia mappato. Se non è mappata, si prega di sollevare una richiesta a [https://mapper.polygon.technology/](https://mapper.polygon.technology/).

## Posso annullare la mia transazione dopo che il checkpoint è arrivato? {#can-i-cancel-my-transaction-after-the-checkpoint-arrived}
Una volta che la transazione di ritiro è iniziata sul Polygon Mainnet, non può essere annullata o riconvertita. Nelle transazioni di prelievo, i token vengono bruciati dal Polygon Mainnet e creati sull'Ethereum Mainnet. Pertanto, i token una volta bruciato dalla catena di Polygon non possono essere riconvertiti al tuo wallet.

## La gas fee è troppo alta, posso annullare la mia transazione? {#the-gas-fee-is-too-high-can-i-cancel-my-transaction}

Purtroppo non possiamo annullare la transazione di prelievo una volta che i token vengono bruciati dal Polygon Mainnet. In altre parole, è impossibile annullare una transazione una volta che è iniziata. La gas fee non è controllata dal Polygon. Dipende totalmente dalla congestione della rete e dal numero di transazioni in un particolare blocco dell'Ethereum Mainnet. Se pensi di non poter permettersi la gas fee, puoi aspettare e provare a procedere con la transazione più tardi, quando la gas fee è in basso Puoi anche monitorare la gas fee su Ethereum Mainnet da qui: https://etherscan.io/gastracker


## Posso inviare i miei token da Polygon a qualsiasi altro wallet/exchange? {#can-i-send-my-tokens-from-polygon-to-any-other-wallet-exchange}

Non puoi inviare direttamente token da Polygon UI agli scambi/wallet. Devi prima prelevare da Polygon a Ethereum e poi inviare al tuo indirizzo Ethereum (a meno che il tuo exchange/wallet non supporti esplicitamente la rete).

## Ho commesso l'errore di inviare fondi direttamente a uno scambio/wallet. Puoi aiutare? {#i-made-the-mistake-of-sending-funds-to-an-exchange-wallet-directly-can-you-help}

Purtroppo, non possiamo fornire assistenza in questi casi. Non inviare fondi direttamente a scambi che supportano solo Ethereum, devi prima prelevare da Polygon a Ethereum e inviare al tuo indirizzo exchange.

## Ho effettuato un trasferimento all'indirizzo sbagliato. Come faccio a recuperare i fondi? {#i-made-a-transfer-to-the-wrong-address-how-do-i-retrieve-the-funds}

Purtroppo non si può fare nulla. Solo il proprietario delle chiavi private di quell'indirizzo particolare può spostare quelle risorse. È sempre consigliabile confermare se l'indirizzo a cui stai inviando token è quello giusto.

## La mia transazione è in attesa di troppo tempo, cosa posso fare? {#my-transaction-has-been-pending-for-too-long-what-can-i-do}
La transazione potrebbe essere scesa per le seguenti ragioni:

1. Impostare un prezzo basso del gas durante la presentazione della transazione.
2. Un improvviso aumento del prezzo del gas dovuto alla congestione dell'Ethereum Mainnet.
3. La transazione viene annullata dal tuo wallet o sostituita con una nuova transazione.

Puoi procedere con le transazioni calate nei seguenti modi:

1. Se la transazione è bloccata per più di un'ora, verrà mostrato un pulsante **di Try** again. Puoi fare clic sul pulsante **Prova di nuovo** per completare la stessa transazione. Puoi fare riferimento a questo video per ulteriori informazioni su come utilizzare la funzione **Try** Nuov.
2. Si prega di controllare il tuo wallet di MetaMask anche perché a volte le transazioni potrebbero essere cadute a causa delle transazioni in queued-up nella Metamask. In questo caso, cancellare le transazioni in queued-up o re-installare la MetaMask nello stesso browser.
3. Puoi installare la MetaMask in un browser alternativo e quindi cercare di completare la transazione utilizzando Polygon Wallet Suite.
4. Puoi anche utilizzare questo link per completare la transazione di ritiro in sospeso. Incolla l'hash della transazione nell'opzione di ricerca e clicca il pulsante **Conferma uscita** per completare la transazione.

## Cosa posso fare se il deposito viene confermato ma il saldo non viene aggiornato? {#what-do-i-do-if-the-deposit-is-confirmed-but-the-balance-is-not-getting-updated}

Per completare la transazione di deposito, impiega 22-30 minuti. Per favore aspetta un po' di tempo e clicca su **Refresh Balance**.

## Cosa devo fare se non sta avvenendo il checkpoint? {#what-should-i-do-if-the-checkpoint-is-not-happening}

I Checkpoint impiegano più di 45 minuti a 1 ora in base alla congestione della rete su Ethereum, consigliamo di aspettare un po' prima di aumentare un biglietto.

## La mia transazione è bloccata. {#my-transaction-is-stuck}

Abbiamo elencato alcuni errori comuni che gli utenti potrebbero affrontare. Puoi trovare la soluzione sotto l'immagine dell'errore. Nel caso in cui ti compaia un errore diverso, [inoltra un ticket di supporto](https://support.polygon.technology/support/home) al nostro team di risoluzione dei problemi.

  - ### Errori comuni {#common-errors}
a. Prelievo bloccato nella fase di inizializzazione.

    <img src={useBaseUrl("img/wallet-bridge/plasma-progress-stuck.png")} width="357" height="800"/>

    This normally occurs when the transaction gets replaced and the wallet web application is not able to detect the replaced transaction hash. Please follow the instructions on [https://withdraw.polygon.technology/](https://withdraw.polygon.technology/) and complete your withdrawal.

b. Errore RPC

    <img src={useBaseUrl("img/wallet-bridge/checkpoint-rpc-error.png")} width="357" height="600"/>   

    The current RPC error you're facing might be due to an RPC overload.

    Please try changing your RPC and proceed with the transaction. You may follow this link [here](https://docs.polygon.technology/docs/develop/network-details/network#matic-mainnet) for more information.

c.

  <img src={useBaseUrl("img/wallet-bridge/checkpoint-stumbled-error.png")} width="357" height="600"/>

Di solito si tratta di un errore a intermittenza che viene risolto automaticamente. Nel caso in cui continui a ricevere lo stesso errore durante il ripristino del passaggio, procedi con [l'inoltro di un ticket di supporto](https://support.polygon.technology/) con tutte le informazioni pertinenti per risolvere ulteriormente il problema.


## Mi viene mostrato un errore di saldo insufficiente. {#i-m-shown-an-insufficient-balance-error}

I prelievi e i depositi sulla rete di Polygon sono economici. Bisogna comprendere che l'errore di saldo insufficiente può essere eliminato ottenendo un po' di saldo ETH sulla Ethereum mainnet. Che in genere cancella il problema di un equilibrio insufficiente. Se si tratta di una transazione sul Polygon Mainnet, richiederemo di avere una quantità sufficiente di token MATIC.

## Le mie transazioni non sono visibili sull'explorer. Cosa devo fare? {#my-transactions-are-not-visible-on-the-explorer-what-should-i-do}

Probabilmente si tratta di un problema di indicizzazione con Polygonscan. Per ulteriori chiarimenti, contatti il [Team di](https://support.polygon.technology/support/home) supporto.

## Ho avviato un deposito su Ethereum ma risulta ancora in sospeso. Cosa devo fare? {#i-initiated-a-deposit-on-ethereum-but-it-still-shows-as-pending-what-should-i-do}

Probabilmente il tuo gas fornito è troppo basso. Devi aspettare un po' e ripetere la transazione se non viene minata. In caso di ulteriore aiuto, contatta il [team di supporto](https://support.polygon.technology/support/home) con il tuo indirizzo wallet, gli hash delle transazioni (se ce ne sono) e i relativi screenshot

## Non sto ricevendo un hash di transazione e i miei depositi non stanno andando a buon fine? Cosa succede? {#i-m-not-getting-a-transaction-hash-and-my-deposits-aren-t-going-through-what-is-happening}

Probabilmente hai delle transazioni precedenti in sospeso, perciò è bene che prima le cancelli o le acceleri. Le transazioni su Ethereum possono avvenire solo una dopo l'altra.

## Viene indicato che Polygon non addebita alcun importo per un prelievo ma dobbiamo pagare durante la transazione. {#it-shows-polygon-does-not-charge-any-amount-for-a-withdrawal-but-we-are-to-pay-during-the-transaction}

Una transazione di prelievo con il Plasma bridge è divisa in 3 passaggi: uno avviene sulla Polygon mainnet e due passaggi da completare sulla Ethereum mainnet. Sul bridge pos, la transazione di prelievo avviene su due passaggi: i token che bruciano sulla rete di Polygon e l'invio di prova sulla rete di Ethereum. In ogni caso, la bruciatura di token che avviene sulla Polygon mainnet sarà un costo molto minimo. I restanti passaggi che avvengono sulla Ethereum mainnet dovranno essere pagati in ETH a seconda dell'attuale gas price che può essere verificato [qui](https://ethgasstation.info/).

## Stavo cercando di effettuare un deposito ma la transazione si è interrotta al passaggio di Approvazione. {#i-was-trying-to-make-a-deposit-but-the-transaction-stopped-at-the-approve-step}

Se la transazione è ancora al passaggio di **Approvazione**, essa non è ancora completa. Per portarla a termine, devi pagare la gas fee, dopodiché dovrebbe passare.

## Il wallet di Polygon mostra il messaggio di errore 'Firma transazione negata dall'utente'. {#polygon-wallet-shows-user-denied-transaction-signature-error-message}

Di solito questo avviene perché l'utente ha annullato o si è rifiutato di firmare una transazione tramite Metamask. Quando viene richiesto dal wallet di MetaMask, procedere con la firma della transazione cliccando su **Approve** e non su **Annulla**.

## La transazione è di successo, ma mostra in sospeso. {#the-transaction-is-successful-but-it-shows-pending}

Se la transazione è terminata e hai ricevuto i tuoi fondi ma ancora la transazione mostra in attesa dell'UI, puoi aumentare un biglietto di supporto inviando dettagli e screenshot pertinenti.

## Qual è l'elenco degli scambi supportati su Polygon? {#what-is-the-list-of-supported-exchanges-on-polygon}

La moneta MATIC può essere scambiata in molti scambi. Tuttavia, è sempre importante fare la propria ricerca quando stai scegliendo uno per scambiare. Non è inusuale che alcuni scambi continuino a apportare modifiche alle loro attuali token disponibili e abbiano anche periodi di manutenzione.

Potresti visitare [Coinmarketcap]([https://coinmarketcap.com/currencies/polygon/markets/](https://coinmarketcap.com/currencies/polygon/markets/)) per una lista di scambi in cui potresti trovare MATIC.

## Polygon supporta gli hardware wallet?  {#does-polygon-support-hardware-wallets}

Sì, supportiamo i seguenti portafogli hardware:
1. Trezor
2. Ledger

Gli utenti possono collegare la propria opzione di wallet Hardware su MetaMask e procedere alla transazione. Ecco il link per collegare il wallet hardware su Metamask: https://metamask.zendesk.com/hc/en-us/articles/4408552261275

## Perché il token MATIC non è supportato su PoS? {#why-isn-t-the-matic-token-supported-on-pos}

MATIC è un token nativo di Polygon e ha un indirizzo di contratto  - 0x0000000000000000000000000000000000001010 sulla Polygon chain. Viene anche usato per pagare la gas. La mappatura del token MATIC sul bridge pos porterà MATIC a disporre di un indirizzo di contratto aggiuntivo sulla catena di Polygon. Ciò colliderà con l'indirizzo del contratto esistente in quanto questo nuovo indirizzo token non può essere usato per pagare gas e dovrà rimanere come un normale token erc20 sulla Polygon chain. Per evitare questa confusione, abbiamo deciso di mantenere MATIC solo su Plasma.

## Come posso mappare i token? {#how-do-i-map-tokens}

Consultare [questo tutorial] (/docs/develop/ethereum-polygon/submit-mapping-request) o si può andare direttamente al [Mapper Token](https://mapper.polygon.technology/).

## Cosa posso fare se la transazione ci sta mettendo troppo o se il gas price è troppo alto? {#what-do-i-do-if-the-transaction-is-taking-too-long-or-if-the-gas-price-is-too-high}

Il tempo di transazione e il prezzo del gas varia in base alla congestione della rete e viene anche determinato dalla domanda e dalla domanda tra i miner della rete.

Cosa potresti fare:
- Sii paziente.
- Aumentare la gas fee se è troppo lento.
- Controllare le tariffe prima di inviare le transazioni. Ecco un link per il gas tracker di Etherscan: https://etherscan.io/gastracker

Cosa non dovresti fare:
- Non impostare il limite di gas basso o la transazione potrebbe fallire.
- Non tentare di annullare la transazione. Controllare le commissioni in anticipo.


## Posso cambiare il limite di gas o il gas price? {#can-i-change-the-gas-limit-or-the-gas-price}

Il limite di gas è stimato e fissato dall'applicazione secondo alcune esigenze della funzione chiamata nel contratto. Questo non deve essere modificato. Solo il prezzo del gas può essere cambiato per aumentare o ridurre le commissioni di transazione.

## Come accelerare le transazioni? {#how-to-speed-up-the-transactions}
Puoi farlo aumentando le gas fee. Ecco un link che spiega come farlo su Metamask: https://metamask.zendesk.com/hc/en-us/articles/360015489251-How-to-Speed-Up-o-Cancel-a-Pending-Transaction.

## Quanto è sufficiente per la gas fee? {#how-much-matic-token-is-enough-for-the-gas-fee}
Gli utenti devono avere un minimo di 0.01 MATIC nel mainnet di Polygon.

## Dove inoltro un ticket di supporto? {#where-do-i-raise-a-support-ticket}
Se hai bisogno di aiuto dei nostri specialisti, inviaci un messaggio all'indirizzo https://support.polygon.technology/support/home.

## Come faccio a collegare gli asset tra le catene? {#how-do-i-bridge-assets-across-chains}

Polygon offre un ponte per spostare le risorse da Ethereum a Polygon e viceversa. Puoi saperne di più sulla [sezione Bridges]([https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started](https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started)) di questo wiki.

Tuttavia, se stai utilizzando qualsiasi servizio esterno che non sia di proprietà di Polygon, ti consigliamo di contattare il loro servizio clienti per richiedere tutorial e istruzioni. È anche importante fare la propria ricerca quando si utilizza i servizi web3.

## Ho un problema di prelievo token con OpenSea o qualsiasi altra applicazione che utilizzi il bridge Polygon. {#i-have-a-token-withdrawal-issue-with-opensea-or-any-other-application-which-uses-polygon-bridge}

Se hai un problema con la tua transazione di recesso bloccata, Polygon offre il ponte di prelievo con [https://withdraw.polygon.technology](https://withdraw.polygon.technology) per aiutarti a liberarti dal terreno se hai il tuo hash di ustione. Con questo strumento, vieni integrato rapidamente e il problema verrà risolto. Altre domande relative alla transazione con OpenSea e altre dApp dovranno essere gestite dal team di applicazione.

## Sono stato scammato. Come posso recuperare i miei token? {#i-have-been-scammed-how-will-i-retrieve-my-tokens}

Purtroppo non c'è nessun processo di recupero per i token perduti. Chiediamo che prima di effettuare una transazione, continui a controllare e a controllarla prima di iniziare e completarla. Vi invitiamo a notare che la rete Polygon e le nostre maniglie ufficiali non si impegnano in alcun post giveaway o in un token doubling e non vi avvicineremo mai per conto dell'organizzazione. Ti preghiamo di ignorare qualsiasi tentativo in quanto molto probabilmente sono scam. Tutte le nostre comunicazioni sono attraverso le nostre maniglie ufficiali.

## Ci sono alcune transazioni non autorizzate nel mio wallet. Il mio wallet è hackerato? {#there-are-some-unauthorized-transactions-in-my-wallet-is-my-wallet-hacked}

Purtroppo la rete non può riconvertire le transazioni indesiderate. È sempre importante fare attenzione alle proprie chiavi private e **non condividerle mai con nessuno**.
Se hai ancora dei fondi rimanenti, trasferiscili immediatamente a un nuovo wallet.

## Ethereum ha Goerli come sua rete di test. Polygon Network ha anche una rete di test? {#ethereum-has-goerli-as-its-test-network-does-polygon-network-have-a-test-network-too}

Poiché la rete Ethereum ha Goerli come sua rete di test, il Polygon Mainnet ha Mumbai. Tutte le transazioni su questa rete di prova verranno indicizzate sull'Explorer di Mumbai.

## Come posso scambiare i miei token per altri gettoni? {#how-can-i-swap-my-tokens-for-other-tokens}
Si prega di guardare il video qui sotto o seguire [questo tutorial](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#token-swap).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-token.mp4"></source>
  <p>Il tuo browser non supporta questo elemento video.</p>
</video>

## Lo Token Swap è troppo lento. {#the-token-swap-is-too-slow}

Se stai cercando di fare lo swap di token e ci mette troppo tempo, potresti provare ad eseguire la stessa transazione su un browser diverso. Se non funziona e stai riscontrando un errore, invia uno screenshot al nostro team di supporto.

## Quali token vengono addebitate come le gas fee per lo scambio di gettone? {#which-tokens-are-charged-as-the-gas-fees-for-token-swap}
Solo MATIC.

## Come posso scambiare il mio token per la gas? {#how-can-i-swap-my-token-for-gas}
Si prega di guardare il video qui sotto o seguire [questo tutorial](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#swap-for-gas).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-gas.mp4"></source>
  <p>Il tuo browser non supporta questo elemento video.</p>
</video>

## Quali token possono essere utilizzati per scambiare le gas? {#which-tokens-can-be-used-to-swap-for-gas}
Solo questi Token sono supportati per "Swap for Gas": ETH, USDC, USDT, DAI, AAVE, LINK, WBTC, UNI, GHST, TEL, EMON, e COMBO.

## Come ottenere i token ETH? {#how-to-get-eth-tokens}
Per acquistare i token ETH, puoi scambiarli per un altro token o per un altro gettone o per un accordo di scambio, comprarli su una rampa (o su Metamask) o anche scambiare altri token per ETH utilizzando [la funzione di token swap di Polygon](https://wallet.polygon.technology/polygon/token-swap).

## Come posso ottenere i token MATIC per pagare le gas fee? {#how-can-i-get-matic-tokens-to-pay-for-gas-fees}

Forniamo un servizio di [Gas Swap](https://wallet.polygon.technology/gas-swap/) che ti aiuterà in questo. Scegli una quantità di MATIC di cui hai bisogno per completare la tua transazione e poi fai lo swap con altri token come Ether o USDT. Vale la pena notare che si tratta di una **transazione senza gas**.

## Dove posso ottenere direttamente i token MATIC? {#where-can-i-get-matic-tokens-directly}

Quindi i token MATIC possono essere acquistati da qualsiasi scambio centralizzato ([Binance](https://www.binance.com/en), [Coinbase](https://www.coinbase.com/), et.al) o decentralizzato ([Uniswap](https://uniswap.org/), [QuickSwap](https://quickswap.exchange/#/swap)). Puoi anche cercare e provare alcune rampe come [Transak](https://transak.com/) e [Ramp](https://ramp.network/). Lo scopo del tuo acquisto di monete MATIC deve anche determinare da dove le acquisterai e la rete. È consigliabile avere MATIC sulla mainnet di Ethereum se la tua intenzione è o la delegazione. Se il tuo intento è una transazione sul Polygon Mainnet, dovresti tenere e transitare con MATIC sul Polygon Mainnet.





