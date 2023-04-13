---
id: connext
title: Crosschain-Übertragungen mit Connext
description: Die nächste Blockchain-App auf Polygon erstellen.
keywords:
  - docs
  - matic
  - connext
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Connext ist ein Crosschain-Liquiditätnetzwerk, das schnelle Non-Custodial-Swaps zwischen evm-kompatiblen Chains und den L2-Systemen von Ethereum ermöglicht.

Ethereum ist jetzt ein Multichain-System. Die wachsende Akzeptanz von evm-kompatiblen Chains und L2s brachte eine neue Herausforderung betreffend die Liquiditätsfragmentierung im Ökosystem mit sich. Connext löst dieses Problem, indem es diskreten Liquiditätspool jeder Chain mit einem globalen Netzwerk verbindet, ohne signifikante Vertrauensprobleme für die Benutzer zu kreieren. Entwickler können diese Liquidität nutzen, um eine neue Klasse von nativen, Chain-unabhängigen dApps auf Connext zu erstellen.

Connext ermöglicht es Benutzern, mit bedingten Übertragungen auf hohem Niveau assetA auf der chainA gegen asset B auf der chainB zu tauschen. Dazu sind einige einfache Schritte nötig:

Alice, eine Connext-Benutzerin, sendet einen bedingten Transfer von assetA an Bob.
Bob, ein Liquiditätsanbieter (auch Router genannt), sendet die entsprechende Menge von assetB an Alice.
Alice aktiviert ihre bedingte Übertragung, um assetB zu empfangen, was es wiederum Bob ermöglicht, dasselbe zu tun.
Router bilden das Rückgrat unseres Netzwerkes, stellen Liquidität für verschiedene Chains zur Verfügung und verdienen damit Gebühren. In unserem Protokoll-Primer erfährst du mehr darüber, wie das funktioniert.

Um crosschain vom Ethereum Goerli Testnet auf Polygon Mumbai Testnet in einem Browser dApp [einzurichten,](https://docs.connext.network/quickstart-polygon-matic-integration) gehe bitte durch diesen Leitfaden.
