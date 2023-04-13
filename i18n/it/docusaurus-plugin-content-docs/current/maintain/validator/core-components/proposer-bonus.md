---
id: proposer-bonus
title: Bonus del proponente
description: Ulteriori incentivo a essere un validatore
keywords:
  - docs
  - polygon
  - matic
  - validate
  - proposer
  - bonus
  - incentive
slug: proposer-bonus
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Bonus del proponente {#proposer-bonus}

In Polygon esiste un elemento aggiuntivo per l'invio periodico di [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) alla Ethereum mainnet. Questa è una parte importante delle responsabilità dei validatori e vengono incentivati a svolgere questa attività. Questo costituisce un costo per il validatore, un aspetto unico per una soluzione Layer 2 come Polygon. Ci impegnamo per inserire questo costo nel meccanismo di pagamento delle ricompense di staking del validatore come bonus da pagare al [proponente](/docs/maintain/glossary.md#proposer), che è responsabile dell'invio del checkpoint. Le ricompense, meno il bonus, devono essere ripartite proporzionalmente tra tutti gli staker, il proponente e i [firmatari](/docs/maintain/glossary.md#signer-address).

Per usufruire completamente del bonus, il proponente deve includere tutte le firme nel checkpoint. Poiché il protocollo richiede un valore pari ai ⅔ +1 dello stake totale, il checkpoint viene accettato anche con l'80% dei voti. Tuttavia, in questo caso, il proponente ottiene solo l'80% del bonus calcolato.
