---
id: the-graph
title: The Graph 및 Polygon PoS로 프로젝트 설정하기
sidebar_label: The Graph
description: The Graph와 Polygon으로 호스팅 프로젝트를 설정하는 방법을 알아봅니다.
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

색인 지정 및 체인 데이터 쿼리를 위한 분산형 프로토콜인 The Graph는 매틱 체인을 지원합니다. 서브그래프를 통해 정의된 데이터는 쿼리 및 탐색하기 쉽습니다. 서브그래프는 로컬에서 생성하거나, 무료 호스팅 탐색기를 사용해 색인 지정 및 데이터 표시를 할 수 있습니다.

> 참고: 로컬 설치를 비롯한 자세한 내용은 다음 링크를 참조하십시오. https://thegraph.com/docs/quick-start 이 문서에는 서브그래프가 작동하는 방식을 학습할 수 있도록 예시가 포함되어 있습니다. 비디오는 유용한 입문 수준 정보를 담고 있습니다.

## 단계 {#steps}

1. Graph 탐색기(https://thegraph.com/explorer/)로 이동하여 계정을 설정하십시오. 인증하려면 GitHub 계정이 필요합니다.

2. 대시보드로 이동하여 서브그래프 추가(Add Subgraph)를 클릭하십시오. 서브그래프 이름, 계정 및 부제목을 정의하고, 원하는 경우 이미지 및 기타 정보를 업데이트합니다(나중에 업데이트 가능).

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%"/>


3. (npm 또는 yarn을 사용하여) 머신에 Graph CLI를 설치하십시오.

```bash
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. 다음 명령어는 기존 계약의 모든 이벤트를 색인 지정하는 서브그래프를 생성합니다. 이는 BlockScout에서 계약 ABI 가져오기를 시도하고 로컬 파일 경로 요청으로 돌아갑니다. 선택적 인수 중 어느 것이라도 누락되면, 대화형 형식으로 이동하게 됩니다.

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

> 참고: 자세한 내용은 다음 링크를 참조하십시오. https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. 호스팅 서비스로 인증합니다.

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
The Graph 웹사이트의 대시보드로 이동하면 액세스 토큰을 찾을 수 있습니다.

6. CD 명령어를 사용해 생성한 디렉터리로 이동하여 서브그래프 정의를 시작하십시오. 서브그래프 생성에 관한 정보는 다음 The Graph 문서에서 확인할 수 있습니다. https://thegraph.com/docs/define-a-subgraph

7. 준비가 되면, 서브그래프를 배포하십시오. 필요에 따라 테스트하고 재배포할 수 있습니다.

> 이전에 배포한 서브그래프가 여전히 동기화 중인 상태라면, 새로 배포된 버전으로 즉시 교체됩니다. 이전에 배포된 서브그래프가 이미 완전히 동기화되어 있는 경우, 그래프 노드는 새로 배포된 버전을 '대기 중 버전'으로 표시하고 백그라운드에서 동기화한 다음, 새 버전의 동기화가 완료된 후에야 현재 배포된 버전을 새 버전으로 바꿉니다. 이렇게 하면 새 버전이 동기화되는 동안 작업할 서브그래프를 확보할 수 있습니다.

```bash
yarn deploy
```

서브그래프가 배포되어 대시보드에서 액세스할 수 있습니다.

서브그래프 쿼리에 대한 내용은 다음 링크에서 확인할 수 있습니다. https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

대시보드에서 서브그래프에 액세스한 후 편집 버튼을 클릭하여 서브그래프를 공개 설정할 수 있습니다. 편집 페이지 하단에서 슬라이더를 확인할 수 있습니다.
