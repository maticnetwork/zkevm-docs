---
id: writing-style
title: Linee guida generali per la scrittura
sidebar_label: General writing guidelines
description: Segui queste linee guida quando scrivi.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - writing
  - contribute
  - style
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: writing-style
---

Queste linee guide si concentrano sulle migliori pratiche per la stesura della documentazione tecnica e
sulle convenzioni di stile da utilizzare per lo sviluppo della documentazione per la wiki di Polygon.
L'obiettivo di questa guida è aiutare i collaboratori a scrivere contenuti chiari, concisi
e coerenti. Il team di Polygon considera la wiki di Polygon come un prodotto ufficiale di documentazione.

## Linee guida principali {#primary-guidelines}

Crediamo che uno degli aspetti che rende Polygon speciale sia il suo design coerente e
cerchiamo di mantenere questa importante caratteristica. Il team di Polygon considera la wiki di Polygon come un prodotto ufficiale di documentazione. Fin dall'inizio abbiamo definito alcune linee guida per garantire che i nuovi
 contributi migliorino sempre e solo l'intero progetto:

- **Qualità**: Il codice del progetto Polygon deve rispettare le linee guida di stile, con
sufficienti test-case, messaggi di commit descrittivi, prove che il contributo
non infrange alcun impegno di compatibilità o non causa interazioni negative tra le funzionalità
e prove di una peer review di alta qualità.
- **Dimensioni**: La cultura del progetto Polygon prevede l'invio regolare di piccole richieste di
contributo. Quanto più grande è una richiesta, tanto più è probabile che ti venga chiesto di ripresentarla sotto forma di una serie di piccole PR autonome e rivedibili singolarmente.
- ****Manutenzione: se la funzionalità richiede una manutenzione continua (ad esempio il supporto
per una particolare marca di database), potremmo chiederti di accettare la responsabilità di
mantenere questa funzionalità.

La guida di stile prende spunto dai seguenti manuali di stile:

> Se non riesci a trovare la risposta a una domanda sullo stile, sulla voce o sulla terminologia all'interno di questa guida, consulta queste risorse.

- [Guida di stile di Google](https://github.com/google/styleguide/blob/gh-pages/docguide/style.md)
- [Il manuale di stile di Oxford](https://global.oup.com/academic/product/new-oxford-style-manual-9780198767251?cc=nl&lang=en&)
- [Il Manuale di stile Microsoft](https://docs.microsoft.com/en-us/style-guide/welcome/)

### Generatore di siti statici {#static-site-generator}

La wiki è realizzata utilizzando [Docusaurus](https://docusaurus.io/), un generatore di siti statici per la creazione di siti di documentazione in markdown. La wiki segue il seguente modello di metadati per i suoi file markdown, che deve essere adottato per ogni nuovo documento:

```
---
id: wiki-maintainers
title: Wiki Maintainers
sidebar_label: Maintainers
description: A list of Polygon Wiki maintainers
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - docs
  - maintainers
  - contributors
image: https://matic.network/banners/matic-network-16x9.png
slug: community-maintainers
---
```

Ci sono alcuni aspetti importanti da considerare quando si scrivono i metadati di un file markdown:
- Chiediamo ai collaboratori di utilizzare un **id univoco**; evita di utilizzare **solo** parole o frasi generiche come "Introduzione" o "Panoramica".
- Il **titolo** è la frase utilizzata all'inizio dell'articolo, "Linee guida generali per la scrittura" per questo articolo. Quindi, non è quindi necessario aggiungere un'intestazione H1/H2 per introdurre ogni articolo. Utilizza invece questo **titolo** dai metadati.
- La **descrizione** non deve essere troppo lunga, poiché viene utilizzata nelle schede dell'indice che hanno una limitazione nel numero di caratteri. Ad esempio, la descrizione "Blockchain è un libro mastro immutabile per la registrazione delle transazioni" per il file *basics-blockchain.md* viene visualizzata su un riquadro dell'indice come segue:
 ![img](/img/contribute/index-tile.png)

  La **descrizione** dovrebbe avere **un massimo di 60 caratteri**, inclusi anche gli spazi tra i caratteri.
- Le parole chiave sono importanti per aumentare la SEO e descrivere l'articolo. Cerca di usare almeno cinque parole chiave.

:::note

Visita la
[documentazione ufficiale sui metadati](https://docusaurus.io/docs/next/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter) per maggiori informazioni.

:::

### Condividi l'esperienza con il lettore {#share-the-experience-with-the-reader}

- Prima persona: Non usare "io" o "me". Usa il punto di vista in prima persona con parsimonia e con intenzione. Quando viene utilizzata in modo eccessivo, la narrazione in prima persona può sopraffare il senso di un'esperienza condivisa e oscurare il viaggio del lettore.
- Seconda persona: nella maggior parte dei casi, rivolgiti direttamente al lettore. Per i tutorial, usa la prima persona plurale (noi, ci, nostro, nostri) o il punto di vista in seconda persona. Poiché i tutorial forniscono un approccio più guidato a un argomento, l'uso della prima persona plurale è una pratica più naturale e comunemente accettata rispetto ad altri tipi di documentazione.
- Terza persona: non usare il "noi" per riferirti a Polygon o Polygon Technology.
- Voce attiva: usa il tempo presente quando possibile. Ci sono situazioni in cui la voce passiva è appropriata; torna alla voce passiva quando l'agente deve essere al centro dell'attenzione.
- Tieni conto della presenza umana: avere un tono dinamico quando si descrivono concetti tecnici
aiuta molto il lettore a entrare in contatto con il materiale, invece di descrivere un software (o un codice) solo per le sue funzioni.
- Pronomi: usa pronomi neutri, quando possibile. In linea di massima,
usare il plurale permette spesso di evitare
l'uso di pronomi specifici ("lei", "lui").
  - Attenzione all'uso di pronomi impersonali e potenzialmente ambigui. Se utilizzi uno dei seguenti
  pronomi impersonali, assicurati di rispondere "di cosa?", "di quale?" o "come?" nella frase.
    - tutti, un altro, qualsiasi
    - ciascuno, o... o,
    - pochi, molti, nessuno,
    - uno, altro,
    - stesso, diversi, alcuni, come,
    - che, loro, questi, quelli

### Cerca di scrivere in modo conciso e di mirare dritto al punto {#being-swift-and-concise}

- La documentazione risulta solida e significativa quando vengono utilizzate le parole necessarie e le espressioni giuste.
  - Usa parole comuni e conosciute quando possibile.
  - Evita il linguaggio forbito e frasi troppo letterarie.
  - Evita il gergo, i colloquialismi e le frasi idiomatiche.
  - Evita gli avverbi e le affermazioni soggettive. Ad esempio, non usare parole e frasi che includono
  facilmente, rapidamente, semplicemente, velocemente.
   Se necessario, è sempre meglio sottostimare piuttosto che esagerare.
  - Non usare frasi che introducono ambiguità. Ad esempio, invece di "Quando questa release sarà disponibile..." usa "Dopo che questa release sarà disponibile...".
  - Presta particolare attenzione alla scelta delle parole. Scegliere "da quando" (che implica un periodo di tempo) invece di
  "perché" (che implica una causa e un risultato) o usare "una volta" (singola occorrenza) invece di "dopo"
   (ogni volta).
  - Evita i punti esclamativi.
- Evita di aggiungere parole o frasi inutili. Alcuni esempi:
  - Invece di dire "e poi", usa semplicemente "poi".
  - Invece di dire "al fine di", usa "per".
  - Invece di dire "nonché", usa "e".
  - Invece di dire "via", che è un latinismo, usa un sostituto appropriato in italiano come "mediante" o "attraverso".

- Usa un tono colloquiale, non troppo formale, ma comunque professionale.
- Chiarezza: dai vita alla parola o alla frase, ove possibile. Ad esempio:
  - invece di dire "ad es.", usa "ad esempio".
  - Piuttosto che dire "cioè", prova a riscrivere la frase per rendere chiaro il significato senza bisogno
   di ulteriori qualificazioni.
  - Invece di dire "ecc.", usa "e così via" o riformula il contenuto affinché il termine non sia più necessario. Invece
  di "ecc." per terminare un elenco di esempi, concentrati su uno o due esempi e usa "ad esempio" o "come".
  - Invece di "caveat", usa un sostituto italiano appropriato come "nota", "avvertenza" o "avvertimento".
  - Le contrazioni conferiscono alla documentazione un tono colloquiale più naturale.
  Usale con attenzione, però.

## Struttura {#structure}

I documenti devono essere organizzati in sezioni. Ogni sezione dovrebbe
presentare un tema o un argomento. All'interno di ogni sezione ci saranno uno o più paragrafi. Ogni paragrafo deve trasmettere un solo pensiero. Cerca di evitare di ripetere gli stessi pensieri in sezioni diverse e di dividere i paragrafi che hanno più punti di discussione.
Il lettore dovrebbe capire l'argomento di un paragrafo già dalla prima frase.

## Documentazione sul prodotto {#product-documentation}

Se stai scrivendo di un prodotto specifico, assicurati che il documento assomigli a quel
prodotto. In precedenza, la documentazione di Polygon era generica, basata sul PoS di Polygon.
 Ora che esistono più prodotti basati su Polygon, i collaboratori devono fare attenzione alle loro
aggiunte.

Ad esempio, "Distribuzione di uno smart contract su Polygon utilizzando ####" è ambiguo. Se questo tutorial
fa riferimento al PoS di Polygon, dovrebbe essere chiaro, ad esempio, scrivere
"Distribuzione di uno smart contract sul PoS di Polygon utilizzando ####". Utilizzando lo stesso esempio con un
Polygon Rollup, come Polygon Hermez, "Distribuzione di uno smart contract su Polygon Hermez utilizzando ####".


Assicurati che la documentazione del prodotto, che si tratti di una guida generale o di un tutorial, venga aggiunta
al giusto Hub di documentazione del prodotto. Per la maggior parte dei documenti, il loro riferimento dovrebbe essere presente in
uno degli Hub generali (ad esempio "Sviluppare" o "Convalidare"), ma il documento vero e
proprio sarà presente nella documentazione del prodotto. Dovrai fare riferimento al documento nell'Hub
aggiungendolo a `sidebars.js`.
Tuttavia, il documento vero e proprio esisterà nel rispettivo Hub di documentazione del prodotto
e reindirizzerà l'utente dopo che vi clicca. Le stesse linee guida si applicano alla maggior parte dei
documenti. Il loro riferimento dovrebbe essere presente in uno degli Hub generali, ma il documento vero e
proprio sarà presente nella documentazione del prodotto.

La maggior parte della documentazione basata sulle API sulla wiki di Polygon è sotto forma di
documentazione di riferimento, ad eccezione delle API citate nei tutorial.
Ad esempio, la documentazione sulle API di Matic.js fornisce informazioni sulla
struttura, i parametri e i valori di ritorno di ogni funzione o metodo dell'API.

## Documentazione API {#api-documentation}

Quando documenti un'API, tieni conto di quanto segue:

* Una solida introduzione che fornisca un punto di partenza.
* Una descrizione chiara della chiamata o della richiesta. Descrivi cosa fa l'endpoint.
* Un elenco completo dei parametri:
  * Tipi di parametri
  * Espressioni sintattiche con segnaposto che mostrano i parametri disponibili
  * Formattazione speciale
* Esempi di codice per più linguaggi.
* Un esempio di chiamata con l'output previsto.
* Codici di errore. Casi limite.
* Istruzioni su come acquisire le chiavi API, se necessario.
* È sempre utile segnalare le domande frequenti o gli scenari più comuni.
* Link a risorse aggiuntive come post sui social media, blog o contenuti video.
