---
id: set-proof-api
title: ProofApi einstellen
keywords:
    - setProofApi
    - polygon
    - sdk
description: Proof Api konfigurieren
---

Einige der Funktionen in matic.js werden mit dem Begriff schneller erstickt. Wie der Name schon sagt, generieren sie Ergebnisse schneller im Vergleich zu ihren nicht schnelleren Gegenstücken. Sie nutzen die Proof Generation API als Backend, das von jedem gehostet werden kann.

[https://apis/matic.network](https://apis/matic.network) ist eine öffentlich verfügbare Proof Generation API, die von Polygon gehostet wird.

Die `setProofApi`Methode kann helfen, die URL der Proof Generation API auf die matic.js Instanz zu setzen.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

Die Nutzung eines selbst gehosteten Proof Generation API-Services bietet eine bessere Leistung im Vergleich zu einem öffentlich gehosteten Anbieter.

Bitte folge den Installationsanweisungen in der Datei README.md von https://github.com/maticnetwork/proof-generation-api zur Verfügung gestellt, um den Service selbst zu hosten

z.B. - Wenn du die Proof API eingesetzt hast und die Basis-URL ist - `https://abc.com/`, dann musst du die Basis-URL in `setProofApi` einrichten.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

:::tip
Wir empfehlen, schnellere APIs zu verwenden, da einige API's, insbesondere dort, wo ein Beweis generiert wird, eine Menge RPC tätigen und es mit öffentlichen RPCs sehr langsam sein könnte.
:::
