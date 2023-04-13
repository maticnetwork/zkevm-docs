---
id: adding-a-custom-token
title: Aggiungere un token personalizzato
sidebar_label: Adding a Custom Token
description: Costruisci la tua prossima app blockchain su Polygon.
keywords:
  - docs
  - matic
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

La funzionalità **Aggiungi token personalizzato** ti permette di aggiungere qualsiasi token in modo esplicito e di usarlo con la Suite di Polygon Wallet. Non devi far altro che cercare il token in base all'indirizzo del contratto, che sia root o figlio:

* Il **root** è il token del contratto su Ethereum
* Il **figlio** è il contratto su Polygon

### Come posso trovare il contratto token? {#how-do-i-find-the-token-contract}

Puoi cercare il token in base al nome su [Coingecko](http://coingecko.com) o su [Coinmarketcap](https://coinmarketcap.com/), dove potrai vederne l'indirizzo sulla catena di Ethereum (per i token ERC20) e altre catene come Polygon. L'indirizzo del token sulle altre catene potrebbe non essere aggiornato, ma puoi benissimo limitarti a utilizzare l'indirizzo root.

Quindi, quando selezioni un token, potrai cercarlo in base a:
* simbolo del token
* nome del token
* contratto

Ecco come funziona:

1. Aggiungi con facilità qualsiasi token alla tua lista aggiungendo l'indirizzo del contratto come un token personalizzato (supportiamo

indirizzi di contratto sia su Polygon che su Ethereum):

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/001.png")} width="500" height="420px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/002.png")} width="500"  height="600px"/>
</div>

2. Una volta ottenute le informazioni sul token, vedrai una schermata di conferma con tutte le informazioni relative al token. A quel punto puoi aggiungerlo come token personalizzato, che verrà memorizzato localmente sul tuo sistema. Ti suggeriamo di verificare i contratti dei token in modo accurato, dal momento che in circolazione esistono molti token clonati o fasulli:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/003.png")} width="500"  height="600px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/004.png")} width="500"  height="600px"/>
</div>

3. Il token che hai aggiunto viene ora mostrato quando selezioni un token:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/005.png")} width="500"  height="600px"/>
</div>

Puoi anche aggiungere un token direttamente dalla scheda token della schermata **Gestire:**

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/006.png")} width="500"  height="600px"/>
</div>