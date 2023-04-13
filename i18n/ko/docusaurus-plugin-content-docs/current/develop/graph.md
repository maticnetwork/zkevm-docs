---
id: the-graph
title: 그래프 및 폴리곤을 사용하여 프로젝트를 설정하기
sidebar_label: The Graph
description: 그래프와 폴리곤으로 호스팅 프로젝트를 설정하는 방법 알아보기
keywords:
  - 폴리곤
  - matic
  - graph
  - 그래프
  - index
  - query
  - subgraph
image: https://matic.network/banners/matic-network-16x9.png
slug: graph
---

import useBaseUrl from '@docusaurus/useBaseUrl';

체인 데이터 인덱싱 및 쿼리를 위한 분산 프로토콜인 Graph는 Matic 체인을 지원합니다. 하위 그래프를 통해 정의된 데이터는 쿼리 및 탐색이 쉽습니다. 위 그래프는 로컬에서 생성하거나 인덱싱 및 데이터 표시를 위해 무료 호스팅 탐색기를 사용할 수 있습니다.

> 참고: 자세한 내용, 로컬 설치 등은 https://thegraph.com/docs/quick-start를 참조하십시오. 문서에는 하위 그래프의 작동 방식을 학습하기 위한 예제가 포함되어 있으며 이 비디오는 좋은 소개를 제공합니다.

## 단계

1. 그래프 탐색기(https://thegraph.com/explorer/)로 이동하여 계정을 설정합니다. 인증을 위해 GitHub 계정이 필요합니다.

2. 대시보드로 이동하여 하위 그래프 추가를 클릭합니다. 하위 그래프 이름, 계정 및 부제목을 정의하고 원하는 경우 이미지 및 기타 정보(나중에 업데이트할 수 있음)를 업데이트합니다.

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%" />


3. 컴퓨터에 Graph CLI 설치(npm 또는 yarn 사용)

```bash 
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. 다음 명령은 기존 컨트랙트의 모든 이벤트를 인덱싱하는 하위 그래프를 만듭니다. BlockScout에서 컨트랙트 ABI를 가져오려고 시도하고 로컬 파일 경로를 요청하는 것으로 대체합니다. 선택적 인수가 누락된 경우 대화형 양식을 통해 안내합니다.

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
> 참고: 자세한 내용은 여기에 있음: https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. 호스팅 서비스로 인증

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
그래프 웹사이트의 대시보드로 이동하여 액세스 토큰을 찾을 수 있습니다.

6. cd를 생성한 디렉토리로 이동하고 하위 그래프 정의를 시작합니다. 하위 그래프 생성에 대한 정보는 다음 그래프 문서에서 확인할 수 있습니다. https://thegraph.com/docs/define-a-subgraph

7. 준비가 되면 하위 그래프를 배포합니다. 필요에 따라 언제든지 테스트하고 재배포할 수 있습니다.
> 이전에 배포한 하위 그래프가 여전히 동기화 중 상태인 경우 새로 배포된 버전으로 즉시 교체됩니다. 이전에 배포된 하위 그래프가 이미 완전히 동기화된 경우 그래프 노드는 새로 배포된 버전을 보류 버전으로 표시하고 백그라운드에서 동기화하고 새 버전 동기화가 완료된 후에만 현재 배포된 버전을 새 버전으로 교체합니다. 이렇게 하면 새 버전이 동기화되는 동안 작업할 하위 그래프가 있습니다.

```bash
yarn deploy
```

하위 그래프가 배포되고 대시보드에서 액세스할 수 있습니다.

여기에서 하위 그래프 쿼리에 대해 배울 수 있습니다: https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

하위 그래프를 공개하려면 대시보드에서 하위 그래프에 액세스한 다음 편집(edit) 버튼을 클릭하면 됩니다. 편집 페이지 하단에 슬라이더가 표시됩니다.
