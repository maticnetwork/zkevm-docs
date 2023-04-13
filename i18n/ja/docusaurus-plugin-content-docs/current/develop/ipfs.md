---
id: ipfs
title: IPFS
description: "IPFS - データ保存とアクセスのための分散システム"
keywords:
  - IPFS
  - matic
  - docs
  - polygon
  - storage
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### コンテキスト {#context}

Polygon ブロックチェーンは、Ethereum Mainnetと比較して、データを保存するためのトランザクションコストを削減します。ただし、これらの低コストでさえも、サイズの大きなファイルを保存する場合はすぐに追加されます。ディベロッパは、データをオンチェーンに保存するとき、ブロックサイズの制約や取引速度の制限を考慮する必要もあります。これらの懸念のすべてに対処する解決策の一つは、IPFS、InterPlanetary File Systemです。

#### IPFSとは何ですか？ {#what-is-ipfs}

IPFSは、ファイル、Webサイト、アプリケーション、データを、保存しアクセスするための分散システムです。IPFSは、分散化、コンテンツアドレッシング、アクティブな参加者の堅牢なピアツーピアネットワークを使用して、ユーザが相互に検証可能なデータを保存、リクエスト、および転送できるようにします。

分散化により、さまざまな場所からファイルをダウンロードできるので、組織で管理がされていない場所でも、レジリエンスと検閲への耐性がすぐに得られます。

コンテンツアドレスは、暗号技術を利用して、ファイルの場所ではなく、ファイルの中身に基づいて、一意に検証可能なハッシュを作成します。その結果、CID（コンテンツ識別子）は、どこに保存されていても、データが同一であることを保証することになります。

さらに、活発なユーザのコミュニティが、コンテンツのピアツーピアの共有を可能にします。開発者は、IPFSにコンテンツをアップロードおよびピン留めしながら、FilecoinまたはCrustストレージプロバイダーは、そのコンテンツの永続的なストレージを確保するのに役立ちます。


IPFSベースのストレージでは、ファイル全体をPolygonブロックチェーンにロードするのではなく、コンテンツのCIDを単純に保存できます。コストの削減、ファイルサイズの拡大、永続的なストレージの証明が可能になります。詳細は[、IPFSドキュメント](https://docs.ipfs.io/)を参照してください。

### プロジェクトの例 {#example-projects}

1. IPFSでPolygonでNFTをミントする方法を示すスカッフォールドエットのチュートリアル - [link](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example)

2. Next.js、Polygon、Solidity、グラフ、IPFS、およびHardhatでフルスタックのWeb3アプリを構築する - [link](https://dev.to/dabit3/the-complete-guide-to-full-stack-web3-development-4g74)
