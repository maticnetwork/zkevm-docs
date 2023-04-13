---
id: mintable-assets
title: Polygon ミント可能なアセット
description: Fx-PortalでPolygonネットワーク上の資産を作成します。
keywords:
  - docs
  - polygon wiki
  - polygon
  - mintable assets
  - mint
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

アセットは、PoSブリッジを使用して、EthereumおよびPolygonチェーン間で、転送できます。これらのアセットには、ERC20、ERC721、ERC1155、その他多くのトークン規格が含まれます。アセットの大部分は、Ethereumチェーンに事前に既存しています。しかし、新しいアセットは、Polygonチェーンでも作成され、必要に応じて、Ethereumチェーンに戻すことができます。これにより、Ethereumでのトークンマイニングに費やす多くのガスと時間を節約できます。

Polygonチェーン上のアセットの作成は、はるかに簡単で、より推奨されるアプローチです。**これらの資産を必要に応じてEthereumチェーンに移動することができます。**このような種類の資産は**、Polygon mintable**アセットと呼ばれています。

Polygon Mintableトークンが存在する場合、Polygonネットワーク上にアセットが作成されます。Polygonのミントされたアセットは、Ethereumに移動する際、アセットは、最初にバーンされ、このバーントランザクションのProofはEthereumチェーンに送信する必要があります。Polygon Mintableトークン機能を利用する推奨される方法は、[fx-portal](/develop/l1-l2-communication/fx-portal.md)を利用することです。
