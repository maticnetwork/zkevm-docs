---
id: meta-transactions
title: Meta transazioni
sidebar_label: Overview
description: Scopri di più sulle meta transazioni e su come usarle.
keywords:
  - docs
  - polygon
  - matic
  - transactions
  - meta transactions
  - gasless
image: https://matic.network/banners/matic-network-16x9.png
slug: meta-transactions
---

Le chiamate giornaliere di smart contract sono al loro massimo, con circa 2,5-3 milioni al giorno. Le dApp vengono riconosciute per la loro utilità, ma stanno diventando vittime del loro successo o di quello di altre
dovuto alle gas fee. Per non parlare degli ostacoli all'ingresso in azienda degli utenti e delle sfide che si pongono alle attuali
UX che non sono semplici da risolvere.

## Utilizzo degli smart contract {#servicing-smart-contracts}

Gli smart contract sono macchine a stati deterministici che vengono eseguite quando le commissioni sulle transazioni vengono
pagate per servire la logica del contratto utilizzando le risorse computazionali della rete. Ciò avviene tramite un modello di misurazione delle gas fee su Ethereum (e Polygon).

## Lo stato attuale delle transazioni {#the-current-state-of-transacting}

Questo modello di transazione tradizionale su Ethereum (e su altre blockchain) presenta delle limitazioni. Una limitazione comune riguarda il fatto che l'utente non abbia i mezzi per pagare le gas fee. Per impostazione predefinita, il mittente della
agisce come pagatore, in quanto questi comportamenti sono accoppiati, per cui se un utente tenta di creare e inviare
una transazione, è responsabile delle gas fee associate. Allo stesso modo, se un utente costruisce, interagisce
o esegua una dApp, dovrà pagare le gas.

Non è realistico aspettarsi che l'utente medio compri criptovalute e paghi le gas fee per interagire con una
applicazione. Ciò che si può fare per risolvere questo problema è scollegare il mittente di una transazione dall'agire
come pagatore, dando la possibilità di scalare l'esecuzione delle transazioni e di avviare un'esperienza di transazione
fluida.

Invece dell'esecuzione diretta delle transazioni, esisterebbe un middleware (tramite una terza parte) per gestire le gas fee.
Qui entrano in gioco le meta transazioni.

## Cosa sono le meta transazioni? {#what-are-meta-transactions}

Le meta transazioni permettono a chiunque di interagire con la blockchain. Non richiedono agli utenti di avere
token per pagare i servizi di rete mediante commissioni di transazione. Questo avviene mediante lo scollegamento del
mittente di una transazione e il pagatore delle gas fee.

Una soluzione in grado di accogliere nuovi utenti e di aiutare quelli attuali.

L'esecutore di una transazione agisce come mittente. Invece di spendere le gas fee, crea solo una
richiesta di transazione firmando l'azione prevista (i parametri della transazione) con la propria chiave
privata. La meta transazione è una normale transazione di Ethereum che include parametri aggiuntivi per realizzare
la meta transazione.

I parametri della transazione firmata vengono passati a una rete secondaria, che funge da relayer..
Sebbene esistano diversi schemi per questo, i relayer generalmente scelgono quali transazioni vale la pena di
inviare mediante la convalida della transazione (ad esempio, che sia rilevante per la dApp). Al momento della convalida, il relayer
accorpa la richiesta (il messaggio firmato) in una vera e propria transazione (il che significa pagare la gas fee)
e la trasmette alla rete, dove il contratto scarta la transazione convalidando la firma originale
e la esegue per conto dell'utente.

:::note I termini meta e batch possono essere analoghi ad altri

Per chiarire: una meta transazione è diversa da una transazione in batch, infatti una transazione in batch è
un invio contemporaneo di varie transazioni che vengono eseguite da un unico mittente
(singolo nonce specificato) in sequenza.

:::

In sintesi, le transazioni sono un modello di progettazione in cui:

* Un utente (mittente) firma una richiesta con la propria chiave privata e la invia a un relayer
* Il relayer inserisce la richiesta in un tx e lo invia a un contratto
* Il contratto scarta la tx e la esegue

Le transazioni native implicano che il "mittente" sia anche il "pagatore". Quando si toglie il "pagatore" dal
"mittente", il "mittente" diventa più simile a un "mittente di intesa": il mittente mostra l'intento della transazione
che vorrebbe fosse eseguita sulla blockchain firmando un messaggio contenente parametri specifici relativi al
suo messaggio e non una transazione interamente costruita.

## Casi d'uso {#use-cases}

Si possono immaginare le potenzialità delle meta transazioni per garantire scalabilità alle dApp e alle interazioni con gli smart contract. Non solo un utente può creare una transazione gasless, ma può anche farlo più volte e con uno strumento di automazione.
Le meta transazioni possono influenzare la prossima ondata di applicazioni per casi d'uso pratici. Le meta transazioni
consentono di ottenere una reale utilità nella logica degli smart contract, che spesso è limitata a causa delle gas fee e delle interazioni
richieste on-chain.

### Esempio con la votazione {#example-with-voting}

Un utente vuole partecipare alla governance on-chain e intende votare per un particolare risultato tramite un
contratto di voto. L'utente firmerebbe un messaggio che riporta la sua decisione in una votazione per questo particolare
contratto. Tradizionalmente, dovrebbe pagare una gas fee per interagire con il contratto (e capire come
interagire con il contratto), ma può invece firmare una meta transazione (off-chain) con le necessarie
informazioni per il voto e passarle a un relayer che eseguirà la transazione per suo conto.

Il messaggio firmato viene inviato a un relayer (i parametri della tx firmata relativi alle informazioni di voto). Il relayer
convalida questa transazione come una votazione prioritaria, incorpora la richiesta di voto in una transazione vera e propria,
paga le gas fee e la trasmette al contratto di voto. Il contratto di voto è in regola
e il voto viene eseguito per conto dell'utente.

## Provale {#try-them-out}

Partendo dal presupposto che tu abbia familiarità con i diversi approcci che è possibile adottare per integrare le meta transazioni nella tua
dApp, e a seconda che tu stia migrando verso le meta transazioni o stia costruendo una nuova dApp che le utilizzi.

Per integrare la tua dApp con le meta transazioni su Polygon, puoi scegliere uno dei seguenti
relayer o scegliere una soluzione personalizzata:

* [Biconomy](https://docs.biconomy.io/products/enable-gasless-transactions)
* [Gas Station Network (GSN)](https://docs.opengsn.org/#ethereum-gas-station-network-gsn)
* [Infura](https://infura.io/product/ethereum/transactions-itx)
* [Gelato](https://docs.gelato.network/developer-products/gelato-relay-sdk)
