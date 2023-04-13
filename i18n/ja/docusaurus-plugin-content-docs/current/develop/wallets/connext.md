---
id: connext
title: Connextを使用してCrosschainを転送
description: Polygonで新しいブロックチェーンアプリを構築しましょう。
keywords:
  - docs
  - matic
  - connext
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Connextは、evmの互換性のあるチェーンとEthereum L2システムの間の高速で完全に非カストディアルなスワップを強化するクロスチェーンの流動性ネットワークです。

Ethereumは、マルチチェーンを行っています。evmの互換性のあるチェーンとL2の採用が増加する中で、エコシステム内の流動性の断片化に関する新たな課題が浮上しました。Connextは、チェーン上の個別の流動性プールをネットワークに接続することで、ユーザに新しい重要な信頼についての考慮事項を導入せずに、この問題を解決します。開発者は流動性を活用して、Connext上でネイティブなチェーンアグノスティックのDAppの新しいクラスの構築を可能にします。

高いレベルで、Connextはユーザが条件付き転送を使用して、chainB上のassetBをassetA上のassetAにスワップさせます。これは、いくつかの簡単なステップで発生します：

Connextのユーザであるアリスは、assetAの条件転送をボブに送信します。流動性プロバイダ（別名ルーター）であるボブは、assetBの同額をアリスに送信します。アリスはassetBを受け取るために、条件転送をアンロックします。これにより、ボブは同じことをすることができます。ルーターは、ネットワークのバックボーンを形成し、異なるチェーンで流動性を提供し、そのための手数料を稼ぐことができます。プロトコルプライマーで、これが管理者が存在せずにどのように機能するのか、ということについての詳細は、こちらをご覧ください。

ブラウザのdAppでEthereum GoerliテストネットからPolygon Mumbaiテストネットへのクロスチェーン転送を設定するには、この[ガイド](https://docs.connext.network/quickstart-polygon-matic-integration)を参照してください。
