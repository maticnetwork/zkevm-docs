---
id: set-proof-api
title: Настройка ProofApi
keywords:
    - setProofApi
    - polygon
    - sdk
description: Конфигурируйте API доказательства.
---

Некоторые функции в matic.js suffixed с термином быстрее. Как следует из названия, они генерируют результаты быстрее по сравнению с их non-faster аналогами. Они делают это, используя API поколения доказательства в качестве бэкэнда, который может быть размещен любым человеком.

[https://apis/matic.network](https://apis/matic.network) — это общедоступный API поколения доказательств, размещённый Polygon.

`setProofApi`Метод может помочь в настройке URL API поколения Proof Generation в экземпляр matic.js.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

Использование сервиса API для создания собственно поддерживаемого доказательства обеспечит лучшую производительность по сравнению с размещённым.

Пожалуйста, следуйте инструкции по установке, приведенные в файле README.md https://github.com/maticnetwork/proof-generation-api для самостоятельного хоста службы.

Например, если вы развернули api доказательства и базовым url является `https://abc.com/`, вам необходимо задать базовый url в `setProofApi`

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

:::tip
Мы рекомендуем использовать более быстрый API потому что некоторые API, особенно там, где генерируются доказательства, делают множество звонков RPC, и это может быть очень медленно с помощью публичных RPC.
:::
