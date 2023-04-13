---
id: contributor-guidelines
title: Come contribuire
sidebar_label: Contributor guidelines
description: Preparati per il tuo prossimo contributo
keywords:
  - docs
  - matic
  - polygon
  - contribute
  - contributor
  - contributing
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: orientation
---

:::tip
Sentitevi liberi di [sollevare un problema sul nostro repository Polygon Wiki](https://github.com/maticnetwork/matic-docs/issues)
:::

## Trova un'area a cui contribuire {#identify-an-area-to-contribute-to}

Ci sono diversi modi per identificare un'area dove puoi contribuire alla wiki:

- Il modo più semplice è quello di contattare uno dei [maintainer della wiki](/docs/contribute/community-maintainers) 
dicendo "Voglio aiutare a contribuire alla wiki di Polygon". Ti aiuteranno a trovare un'area a cui contribuire.
- Se hai un contributo particolare in mente, ma non sei sicuro, chiedi se il tuo contributo è appropriato contattando direttamente uno dei [maintainer della Wiki](/docs/contribute/community-maintainers).
- Se non hai un contributo specifico in mente, puoi anche navigare i problemi identificati come `help wanted` sui [repo GitHub di Polygon](https://github.com/maticnetwork).
- I problemi che sono anche identificati come `good first issue` sono considerati ideali per
i nuovi arrivati.

## Contribuisci alla documentazione di Polygon {#add-to-the-polygon-documentation}

  - Se hai bisogno di aggiungere o modificare qualcosa sulla wiki di Polygon, apri un PR con la `master` sezione (ti preghiamo di controllare il modello PR).
  - Il team della documentazione verificherà il PR o ti contatterà se necessario.
  - Repository: https://github.com/maticnetwork/matic-docs
  - Modello PR: https://github.com/maticnetwork/matic-docs/pull/360

:::tip
Se vuoi eseguire la nostra Wiki localmente sulla tua macchina, controlla la sezione [che esegua la Wiki localmente.](https://github.com/maticnetwork/matic-docs#run-the-wiki-locally) Se stai aggiungendo un nuovo documento, si consiglia di avere una semplice sintesi/introduzione e un link al tuo Github o alla documentazione per maggiori dettagli.
:::

## Regole di Git {#git-rules}

Usiamo `gitchangelog` per tutti i nostri repo per cambiare registri. Per questo, dobbiamo restare in conformità con le seguenti convenzioni per i messaggi di commit. Non ci sarà un merge se non segui queste convenzioni.

### Convenzioni per i messaggi di commit. {#commit-message-convention}

I seguenti sono suggerimenti su come procedere se hai intenzione di contribuire con i tuoi messaggi di commit. Potrebbe essere una buona idea dividere i tuoi commit in grandi sezioni:

- per intento (per esempio: nuovo, fix, modifica...)
- per oggetto (per esempio: doc, packaging, codice...)
- per audience (per esempio: sviluppatori, tester, utenti...)

Inoltre, potresti voler applicare tag ad alcuni commit:

- Come commit "minori" che non dovrebbero ottenere output sul tuo changelog (modifiche estetiche, piccoli typo nei commenti...).
- Come "refactoring" se non ci sono state modifiche significative alle funzionalità. Di conseguenza questo dovrebbe a sua volta essere escluso dal changelog visualizzato dagli utenti finali, per esempio, ma potrebbe essere significativo se hai un changelog per sviluppatori.
- Potresti anche applicare le tag "api" per contrassegnare modifiche API, o se è una nuova API, per esempio.

Prova a scrivere il tuo messaggio commit concentrandoti sulla funzionalità utente il più possibile.

:::note Esempio

Questo è un log git standard `--oneline` con lo scopo di evidenziare come potrebbero essere memorizzate queste informazioni:

```
* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor
```

:::

Per maggiori informazioni consulta [Quali sono dei buoni metodi per gestire un changelog con Git?](https://stackoverflow.com/questions/3523534/good-ways-to-manage-a-changelog-using-git/23047890#23047890).

Per maggiori dettagli, consulta [https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/).
