---
id: who-is-validator
title: Chi è il validatore
sidebar_label: Who is a Validator
description: "Un partecipante della rete che esegua nodi Heimdall e Bor."
keywords:
  - docs
  - matic
  - polygon
  - validator
  - Who is a Validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Validator è un partecipante alla rete che blocca i token MATIC nel sistema e gestisce i nodi di produttori di Heimdall e Bor per aiutare a eseguire la rete. I validatori mettono in stake i loro token MATIC come garanzia per lavorare per la sicurezza della rete e, in cambio del loro servizio, ottengono ricompense.

Ad ogni checkpoint vengono distribuite le ricompense, destinate a tutti coloro che abbiano vincolato i propri token, in modo proporzionale al rispettivo stake, con l'eccezione del proponente che ottiene un bonus aggiuntivo. Il saldo delle ricompense dell'utente viene aggiornato nel contratto di riferimento durante la richiesta di ricompense.

Gli stake sono a rischio di slashing nel caso il nodo validatore commetta un atto fraudolento, come nel caso di una doppia firma, e questa procedura colpisce anche i delegatori per quel checkpoint.

:::tip

Chi è interessato a garantire la rete, ma non è in esecuzione un nodo completo può partecipare come [delegatori](/docs/maintain/glossary.md#delegator).

:::

## Panoramica {#overview}

I validatori sulla rete di Polygon vengonono selezionati attraverso un'asta on-chain che ha luogo a intervalli regolari. I validatori selezionati partecipano come produttori di blocchi e verificatori. Una volta che i partecipanti abbiano convalidato un [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction), vengono effettuati aggiornamenti sulla parent chain (la Ethereum mainnet), che distribuisce le ricompense ai validatori in base al loro stake nella rete.

Polygon si affida a un insieme di [validatori](/docs/maintain/glossary.md#validator) per mantenere la rete sicura. Il ruolo dei validatori è quello di eseguire un nodo completo, [produrre blocchi](/docs/maintain/glossary.md#block-producer), convalidare e partecipare al consenso ed inviare [i checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) sulla Ethereum mainnet. Per diventare un validatore e necessario mettere in [staking](/docs/maintain/glossary.md#staking), i propri token MATIC con contratti di gestione dello staking che si trovano sulla Ethereum mainnet.

## Componente principale {#core-components}

Il nodo [Heimdall](/docs/maintain/glossary.md#heimdall) legge gli eventi emessi dai contratti di staking al fine di scegliere i convalidatori per l'insieme corrente con il corrispondente, aggiornato rapporto di stake che viene anche usato dai nodi [Bor](/docs/maintain/glossary.md#bor) durante la produzione dei blocchi.

[La delega](/docs/maintain/glossary.md#delegator) viene anche registrata nei contratti di staking e viene effettuato qualsiasi aggiornamento circa la potenza o l'[indirizzo firmatario](/docs/maintain/glossary.md#signer-address) del nodo del convalidatore o circa le richieste di svincolamento al momento dell'esecuzione del checkpoint successivo.


## Flusso del convalidatore dal principio alla fine {#end-to-end-flow-for-a-polygon-validator}

Per essere accettati come convalidatori nell'insieme corrente, i convalidatori impostano prima i nodi di firma, poi i dati di sincronizzazione e successivamente stanziano i tokens (stake) sulla catena principale di Ethereum. Qualora uno slot si liberi, il convalidatore viene accettato immediatamente. In caso contrario, è necessario passare attraverso il meccanismo di sostituzione per ottenere uno slot.

:::warning

Lo spazio per accettare nuovi validatori è limitato. Nuovi convalidatori possono unirsi all'insieme attivo solo dopo che un convalidatore attualmente attivo effettui la procedura di svincolamento. Verrà lanciato un nuovo processo di asta per sostituire il validatore.

:::

I produttori del blocco vengono scelti dall'insieme di convalidatori e spetta ai convalidatori selezionati produrre blocchi per un determinato [arco di tempo.](/docs/maintain/glossary.md#span)

I nodi heimdall convalidano i blocchi in produzione, partecipano ai consensi ed eseguono i checkpoint sulla rete principale di Ethereum (ethereum mainnet) a intervalli definiti.

La probabilità che un convalidatore sia selezionato come produttore di blocco o [proponente](/docs/maintain/glossary.md#proposer) di checkpoint dipende dal rapporto di stake di ciascun, incluse le deleghe nel gruppo globale (pool).

I convalidatori ricevono ricompense ad ogni checkpoint secondo il rapporto dello stake di ciascuno, dopo aver dedotto il bonus erogato per il proponente di checkpoint al proponente stesso.

È possibile optare a qualsiasi momento di non partecipare al sistema e prelevare i propri token una volta terminato il periodo di svincolamento.

## Economia {#economics}

Vedi [ricompense](/docs/maintain/validator/rewards).

## Configurare un nodo validatore {#setting-up-a-validator-node}

Vedi [convalidare](/docs/maintain/validate/validator-index).

## Vedi anche {#see-also}

* [Responsabilità del validatore](/docs/maintain/validate/validator-responsibilities)
* [Convalidare](/docs/maintain/validate/validator-index)
* [Domande frequenti sul ruolo del convalidatore](/docs/maintain/validate/faq/validator-faq)
