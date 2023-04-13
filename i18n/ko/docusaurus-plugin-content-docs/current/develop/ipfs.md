---
id: ipfs
title: IPFS
description: "IPFS - 데이터 저장 및 액세스를 위한 분산형 시스템"
keywords:
  - IPFS
  - matic
  - docs
  - polygon
  - storage
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### 맥락 {#context}

이더리움 메인넷과 비교하여 Polygon 블록체인은 데이터 저장에 드는 트랜잭션 비용을 줄일 수 있습니다. 그러나 상당한 크기의 파일들을 저장하다 보면 이렇게 낮은 비용도 순식간에 누적됩니다. 또한, 개발자는 온체인에 데이터를 저장할 때 블록 크기 제약 및 트랜잭션 속도 제한을 고려해야 합니다. 이러한 모든 우려를 해결하는 한 가지 해결책은 IPFS, InterPlanety 파일 시스템입니다.

#### IPFS는 무엇입니까? {#what-is-ipfs}

IPFS는 파일, 웹사이트, 애플리케이션, 데이터를 저장하고 이에 액세스하기 위한 분산형 시스템입니다. IPFS는 분산화, 콘텐츠 주소 지정, 활성 참가자의 강력한 P2P 네트워크를 사용하므로 사용자들이 서로 검증 가능한 데이터를 저장, 요청 및 이전할 수 있습니다.

분산화를 사용하면 한 조직에서 관리하지 않는 여러 위치에서 파일을 다운로드할 수 있어 즉시 회복 탄력성과 검열 저항성을 제공합니다.

콘텐츠 주소 지정은 파일의 위치 대신 파일의 내용을 토대로 암호화를 사용하여 고유하게 검증 가능한 해시를 생성합니다. 그 결과 콘텐츠 식별자(CID)는 저장 위치와 관계없이 데이터 조각이 동일함을 보장할 수 있습니다.

마지막으로, 활성 사용자 커뮤니티가 지속적으로 증가하며 이러한 P2P 콘텐츠 공유가 가능해졌습니다. Filecoin 또는 Crustom 스토리지 공급자가 해당 콘텐츠를 지속적으로 보관할 수 있도록 도와주는 동안 IPFS에 콘텐츠를 업로드 및 핀 입력하세요.


IPFS 기반 스토리지를 사용하면 Polygon 블록체인에 전체 파일을 로드하는 대신 간단히 콘텐츠의 CID를 저장할 수 있어 비용 절감과 더 큰 파일 크기 그리고 입증 가능 영구 저장을 지원할 수 있습니다. 자세한 내용은 [IPFS 문서를](https://docs.ipfs.io/) 참조하십시오.

### 예시 프로젝트 {#example-projects}

1. Polygon에서 NF를 IFS로 채굴하는 방법을 보여주는 scaffold-et의 자습서 - [링크](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example)

2. 넥스트.js, Polygon, Solidity, Graph, IPFS, 및 Hardhat 와 함께 전체 스택 웹3 앱을 구축하십시오. [링크](https://dev.to/dabit3/the-complete-guide-to-full-stack-web3-development-4g74)
