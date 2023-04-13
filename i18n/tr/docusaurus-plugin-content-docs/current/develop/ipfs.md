---
id: ipfs
title: IPFS
description: "IPFS - veriyi depolamak ve erişime açmak için kullanılan dağıtık sistem."
keywords:
  - IPFS
  - matic
  - docs
  - polygon
  - storage
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### Bağlam {#context}

Polygon blok zinciri, Ethereum ana ağına kıyasla veri depolama işlem maliyetlerini azaltır; ancak bu daha düşük maliyetler bile büyük dosyaları depolarken hızlı bir şekilde birikir. Geliştiriciler veriyi zincir üzerinde depolarken karşılaşılan blok boyut kısıtlamalarını ve işlem hız limitlerini de dikkate almalıdır. Bu endişelerin tümünü ele alan bir çözüm IPFS, InterPlanetary File System'dir.

#### IPFS nedir? {#what-is-ipfs}

IPFS; dosya, web siteleri, uygulamalar ve veri için depolama ve erişim sunan dağıtık bir sistemdir. IPFS kullanıcıların doğrulanabilir veriyi depolamaları, talep etmeleri ve birbirleri arasında transfer etmelerine olanak tanımak için merkezsizleştirme, içerik adresleme ve sağlam aktif katılımcılardan oluşan sağlam bir eşler arası ağ kullanır.

Merkezsizleştirme bir kuruluş tarafından yönetilmeyen, birçok konumdaki dosyaları indirmeyi mümkün kılarak en yalın haliyle bile dayanıklılık ve sansür direnci sağlar.

İçerik adresleme, dosyanın bulunduğu konum yerine dosyanın içeriğini temel alan benzersiz bir doğrulanabilir hash oluşturmak için kriptografiyi kullanır. Ortaya çıkan içerik tanımlayıcı (Content Identifier - CID), bir veri parçasının depolandığı yeri dikkate almaksızın özdeş olduğu garantisini sağlar.

Son olarak, giderek büyüyen aktif kullanıcı topluluğu, bu eşler arası içerik paylaşımını mümkün kılar. Geliştiriciler içeriği to yükler ve pin ederken, Filecoin veya Crust depolama sağlayıcıları bu içeriğin kalıcı olarak depolanmasını sağlamaya yardımcı olurlar.


IPFS tabanlı depolama, dosyaların tamamını Polygon blok zincirinde yüklemek yerine yalnızca içeriğiniz için CID depolamanıza olanak tanır; bu şekilde daha az maliyetlere, daha büyük dosya boyutlarına ve kanıtlanmış bir şekilde kalıcı depolamaya imkan sağlar. Daha fazla ayrıntı için [IPFS Dokümanları](https://docs.ipfs.io/) bakın.

### Örnek Projeler {#example-projects}

1. IPFS ile Polygon üzerinde bir NFT nane nasıl gösterir iskele içinde Tutorial - [bağlantı](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example)

2. Next.js, Polygon, Solidity, Grafik, IPFS ve Hardhat ile tam yığın bir web3 uygulaması oluşturma - [bağlantı](https://dev.to/dabit3/the-complete-guide-to-full-stack-web3-development-4g74)
