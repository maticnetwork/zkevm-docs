---
id: set-proof-api
title: Configurez ProofApi
keywords:
    - setProofApi
    - polygon
    - sdk
description: Configurez l'API de preuve.
---

Certaines des fonctions dans matic.js sont suffixées avec le terme plus rapide. Comme le nom l'indique, ils génèrent des résultats plus rapides comparativement à leurs homologues non plus rapides. Ils le font en utilisant l'API Proof Generation comme backend qui peut être hébergé par n'importe qui.

[https://apis/matic.network](https://apis/matic.network) est une API Proof Generation accessible au public, hébergée par Polygon.

La `setProofApi`méthode peut aider à définir l'URL de l'API Proof Generation vers l'instance matic.js.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

L'utilisation d'un service API Proof Generation auto-hébergé offrira de meilleures performances par rapport à un service hébergé publiquement.

Veuillez suivre les instructions d'installation fournies dans le fichier README.md de https://github.com/maticnetwork/proof-generation-api pour héberger le service.

Par exemple - si vous avez déployé l'api de preuves et que l'url de base est - `https://abc.com/`, vous devez alors définir l'url de base dans `setProofApi`

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

:::tip
Nous vous recommandons d'utiliser des API plus rapides, parce que certaines API, en particulier lorsque la preuve est générée, effectuez beaucoup d'appels RPC et cela pourrait être très lent avec les RPC publics.
:::
