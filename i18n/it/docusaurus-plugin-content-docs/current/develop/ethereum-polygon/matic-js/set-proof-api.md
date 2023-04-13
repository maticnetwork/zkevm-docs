---
id: set-proof-api
title: Impostare ProofApi
keywords:
    - setProofApi
    - polygon
    - sdk
description: Configurare API di prova.
---

Alcune delle funzioni in matic.js sono suffissi con il termine più veloce. Come suggerisce il nome, generano risultati più veloci rispetto alle controparti non più veloci. Lo fanno utilizzando le API di generazione di Proof come backend che può essere ospitato da chiunque.

[https://apis/matic.network](https://apis/matic.network) è una API di generazione di Proof che è disponibile al pubblico, ospitato da Polygon.

Il `setProofApi`metodo può aiutare a impostare l'URL dell'API di generazione di Proof nell'istanza matic.js.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

Utilizzando un servizio API di Proof Generation self-hosted offrirà migliori prestazioni rispetto a una ospitato pubblico.

Seguire le istruzioni di installazione fornite nel file README.md di https://github.com/maticnetwork/proof-generation-api per ospitare il servizio.

Ad esempio, se hai implementato l'API di prova e l'URL di base è `https://abc.com/`, allora devi impostare l'URL di base su `setProofApi`

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

:::tip
Consigliamo di utilizzare le API più veloci, perché alcune API in particolare in cui si generano prove, fanno molte chiamate RPC e potrebbe essere molto lento con le RPC pubbliche.
:::
