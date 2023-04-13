---
id: who-is-delegator
title: Chi è un Delegatore
description: I titolari di Token che non eseguono un nodo
keywords:
  - docs
  - matic
  - polygon
  - delegator
  - Who is a Delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

I delegatori sono possessori di token che non possono o non vogliono eseguire un nodo come [validatori](/docs/maintain/glossary.md#validator). Preferiscono quindi rendere la rete sicura delegando il proprio stake a nodi validatori svolgendo così un ruolo fondamentale nel sistema in quanto responsabili della scelta dei validatori. Eseguono la transazione di delega in un contratto di staking sulla Ethereum mainnet.

I token MATIC vengono vincolati al successivo [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) fissato sulla Ethereum mainnet. Inoltre, i delegatori hanno la possibilità di abbandonare il sistema in qualsiasi momento. Analogamente ai validatori, i delegatori devono aspettare la fine del periodo di unbonding, della durata approssimativa di 9 giorni, prima di poter prelevare il proprio stake.

## Commissioni e ricompense {#fees-and-rewards}

I delegatori mettono in staking i loro token delegandoli ai validatori e ricevendo in cambio una percentuale delle loro ricompense. Poiché i delegatori condividono le ricompense con i rispettivi validatori, anche i delegatori sono soggetti a rischi. Se un validatore si comporta inappropriatamente, ognuno dei rispettivi delegatori rischia di incorrere nella procedura di slashing parziale, proporzionalmente allo stake delegato.

I validatori stabiliscono una percentuale di [commissione](/docs/maintain/glossary.md#commission) che determina la percentuale di ricompense a loro destinata. I delegatori sono in grado di visualizzare il tasso di commissione di ciascun validatore per capire la distribuzione delle ricompense di ciascun validatore e il relativo tasso di rendimento del proprio stake.

:::caution Validatori con un tasso di commissione del 100%

Questi sono i validatori che prendono tutte le ricompense e non cercano la delegazione, in quanto hanno abbastanza token da giocare da soli.

:::

I delegatori hanno la possibilità di riconsegnare i propri token ad altri validatori. Le ricompense si accumulano ad ogni checkpoint.

:::tip Il ruolo di delegatore attivo

La delega non deve essere considerata un'attività passiva, poiché i delegatori fanno parte del funzionamento corretto della rete di Polygon. Ogni delegatore è responsabile per la gestione del proprio rischio, ma nel far ciò dovrebbe cercare di scegliere validatori che si comportino appropriatamente.

:::

## Vedi anche {#see-also}

* [Delegare](/docs/maintain/delegate/delegate)
* [Domande frequenti sul ruolo di validatore](/docs/maintain/validate/faq/validator-faq)
