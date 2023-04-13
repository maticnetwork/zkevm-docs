---
id: the-graph
title: The Graph ve Polygon PoS ile Proje Oluşturma
sidebar_label: The Graph
description: The Graph ve Polygon ile barındırılan bir proje oluşturmayı öğrenin.
keywords:
  - polygon
  - matic
  - graph
  - the graph
  - index
  - query
  - subgraph
image: https://matic.network/banners/matic-network-16x9.png
slug: graph
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Zincir verilerini dizinlemek ve sorgulamak için merkezi olmayan bir protokol olan The Graph, Matic zincirini destekler. Alt grafiklerle tanımlanan verilerin sorgulanması ve keşfedilmesi kolaydır. Alt grafikler yerel olarak oluşturulabilir veya dizinleme ve veri görüntüleme için ücretsiz barındırılan bir gezgin kullanabilir.

> Not: Daha fazla ayrıntı, yerel kurulum ve dahası için bkz. https://thegraph.com/docs/quick-start. Belgeler alt grafiklerin nasıl çalıştığını öğrenmek için bir örnek sunmaktadır ve bu video da iyi bir giriş sağlamaktadır.

## Adımlar {#steps}

1. Graph Explorer'a (https://thegraph.com/explorer/) gidin ve bir hesap oluşturun. Kimlik doğrulama için bir GitHub hesabına ihtiyacınız olacaktır.

2. Panonuza gidin ve Add Subgraph (alt grafik ekle) üzerine tıklayın. Alt grafik için Ad, Hesap ve Alt Başlık tanımlayın ve isterseniz görseli ve diğer bilgileri güncelleyin (sonra da güncelleyebilirsiniz).

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%"/>


3. Makinenize Graph CLI kurun (npm veya yarn kullanarak)

```bash
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. Aşağıdaki komut, mevcut bir sözleşmenin tüm olaylarını dizinleyen bir alt grafik oluşturur. BlockScout'tan sözleşme ABI'sini getirmeyi dener ve tekrar yerel bir dosya yolu istemeye geri döner. Opsiyonel argümanlardan herhangi biri eksikse sizi interaktif bir forma götürür.

```bash
graph init \
  --from-contract <CONTRACT_ADDRESS> \
  [--network Matic ] \
  [--abi <FILE>] \
  <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]

--network: choose “Matic” for Matic mainnet and “Mumbai” for Matic Testnet.
--from-contract <CONTRACT_ADDRESS> is the address of your existing contract which you have deployed on the Matic network: Testnet or Mainnet.
--abi <FILE> is a local path to a contract ABI file (optional, If verified in BlockScout, the graph will grab the ABI, otherwise you will need to manually add the ABI. You can save the abi from BlockScout or by running truffle compile or solc on a public project.)
The <GITHUB_USER> is your github user or organization name, <SUBGRAPH_NAME> is the name for your subgraph, and <DIRECTORY> is the optional name of the directory where graph init will put the example subgraph manifest.
```

> Not: Daha fazla detay için: https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. Barındırılan hizmet ile doğrulama yapın

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
Graph web sitesinde panonuza giderek erişim token'ını bulabilirsiniz.

6. cd komutunu kullanarak oluşturduğunuz dizine gidin ve alt grafiği tanımlamaya başlayın. Graph Belgelerinde alt grafik oluşturma hakkında bilgi şu adreste bulunabilir. https://thegraph.com/docs/define-a-subgraph

7. Hazır olduğunuzda alt grafiğinizi devreye alın. Gerekirse istediğiniz zaman test edebilir ve yeniden devreye alabilirsiniz.

> Önceden devreye aldığınız alt grafiğin senkronizasyonu devam ediyorsa, hemen yeni devreye alınan sürüm ile değiştirilecektir. Daha önce devreye alınmış olan alt grafik tamamen senkronize olmuş durumdaysa, Graph Düğümü yeni devreye alınan sürümü Bekleyen Sürüm olarak işaretler, arka planda senkronize eder ve yeni sürümün senkronizasyonu tamamlanınca devreye alınmış olan sürümün yerine yeni sürümü getirir. Bu, yeni sürüm senkronize olurken size üzerinde çalışabileceğiniz bir alt grafik sağlar.

```bash
yarn deploy
```

Alt grafiğiniz devreye alınır ve panonuzdan erişilebilir.

Alt grafiği sorgulama hakkında bilgi için: https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

Alt grafiğinizi herkese açmak isterseniz, panonuzdan alt grafiğinize erişip, düzenleme düğmesine tıklayarak bunu yapabilirsiniz. Düzenleme sayfasının altında kaydırıcı göreceksiniz.
