---
id: config-polygon-on-metamask
title: 폴리곤 네트워크 추가하기
description: 폴리곤에 다음 블록체인 앱을 설치합니다.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

폴리곤 네트워크상에서 계정에서 자금 흐름을 보기 위해서는 메타마스크에  `{testnet, mainnet}` URL을 구성해야 합니다.

거기에는 두가지 방법이 있습니다:
1. [폴리곤스캔(Polygonscan) 이용하기](/develop/metamask/config-polygon-on-metamask.md#polygon-scan)
2. [폴리곤 네트워크를 수동으로 추가하기](/develop/metamask/config-polygon-on-metamask.md#add-the-polygon-network-manually)

### Polygonscan 이용하기

:::참고
<ins>**[Metamask]<a href="(https://metamask.io/)"></a>**</ins>를 이미 설치했는지 확인하십시오!
:::

<Tabs
  defaultValue="mainnet"
  values={[
    { label: 'Polygon-Mainnet', value: 'mainnet', },
 { label: 'Mumbai-Testnet', value: 'mumbai', },
 ]
}>

<TabItem value="mumbai">

폴리곤 뭄바이-테스트넷을 추가하려면 다음 단계들을 따르십시오:

- [mumbai.polygonscan.com](https://mumbai.polygonscan.com/)으로 이동합니다.

<img src={useBaseUrl("img/metamask/testnet-button.png")} />
<p></p>

- 페이지 하단으로 스크롤하여 'Add Mumbai Network' 버튼을 클릭합니다.

<img src={useBaseUrl("img/metamask/testnet-addnetwork.png")} />

- 버튼을 클릭하면 메타마스크 알림이 표시됩니다. 이제 **Approve**를 클릭합니다.
이제 네트워크 드롭다운 목록에서 폴리곤의 메인넷으로 직접 전환될 것입니다. 이제 대화 상자를 닫을 수 있습니다.

</TabItem>

<TabItem value="mainnet">

폴리곤 메인넷을 추가하려면 다음 단계들을 따르십시오:

- [polygonscan.com](https://polygonscan.com/)으로 이동합니다.

<img src={useBaseUrl("img/metamask/mainnet-button.png")} />
<p></p>

페이지 하단으로 스크롤하여 `Add Polygon Network` 버튼을 클릭합니다.

<img src={useBaseUrl("img/metamask/mainnet-addnetwork.png")} />

- 버튼을 클릭하면 메타마스크 알림이 표시됩니다. 이제 **Approve**를 클릭합니다. 
이제 네트워크 드롭다운 목록에서 Polygon의 메인넷으로 직접 전환됩니다. 이제 대화 상자를 닫을 수 있습니다.

</TabItem>

</Tabs>

만약 문제가 발생하면, **네트워크 수동으로 추가하기(아래 단계 참조)**

### 폴리곤 네트워크 수동으로 추가하기

<Tabs
  defaultValue="mainnet"
  values={[
    { label: 'Polygon-Mainnet', value: 'mainnet', },
 { label: 'Mumbai-Testnet', value: 'mumbai', },
 ]
}>

<TabItem value="mumbai">
폴리곤의 Mumbai-Testnet을 추가하려면, 네트워크 선택 드롭다운을 클릭한 다음 Custom RPC를 클릭합니다.

<img src={useBaseUrl("img/metamask/select-network.png")} />

상단에 Settings and Info라는 2개의 탭이 있는 양식이 열립니다. 설정 탭에서 네트워크 이름 필드에 'Matic Mumbai', 새 RPC URL 필드에 URL `https://rpc-mumbai.maticvigil.com/`, 체인 ID 필드에 '80001', 통화 기호 필드에 'MATIC' 그리고 블록탐색기 URL필드에 'https://mumbai.polygonscan.com/'을 추가할 수 있습니다.

<img src={useBaseUrl("img/metamask/metamask-settings-mumbai.png")} />

새 네트워크 필드에 정보를 추가했으면, Save(저장)를 클릭합니다. 이제 네트워크 드롭다운 목록에서 폴리곤의 Mumbai-Testnet으로 직접 전환됩니다. 이제 대화 상자를 닫을 수 있습니다.
</TabItem>

<TabItem value="mainnet">
폴리곤 메인넷을 추가하려면 네트워크 선택 드롭다운을 클릭한 다음 Custom RPC를 클릭합니다.

<img src={useBaseUrl("img/metamask/select-network.png")} />

상단에 Settings and Info라는 2개의 탭이 있는 양식이 열립니다. 설정 탭에서 네트워크 이름 필드에 'Polygon Mainnet', 새 RPC URL 필드에 URL 'https://polygon-rpc.com/', 체인 ID 필드에 '137', 통화 기호 필드에 'MATIC' 그리고 블록탐색기 URL필드에 'https://polygonscan.com/'을 추가할 수 있습니다.

<img src={useBaseUrl("img/metamask/metamask-settings-mainnet.png")} />

새 네트워크 필드에 정보를 추가했으면, Save(저장)를 클릭합니다. 이제 네트워크 드롭다운 목록에서 폴리곤의 메인넷으로 직접 전환될 것입니다. 이제 대화 상자를 닫을 수 있습니다.
</TabItem>
</Tabs>

**메타마스크에 폴리곤 네트워크를 성공적으로 추가했습니다!**
