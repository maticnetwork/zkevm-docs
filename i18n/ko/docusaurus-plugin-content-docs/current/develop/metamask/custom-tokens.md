---
id: custom-tokens
title: 사용자 정의 토큰을 설정하기
description: 메타 마스크에서 사용자 정의 토큰을 구성합니다.
keywords:
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

이 페이지는 메타마스크에 사용자 지정 토큰을 추가하는 프로세스를 보여줍니다.

메타마스크에서 어떤 네트워크에 사용자 정의 토큰을 추가할 수 있습니다. [이 테이블을](#tokens-and-contract-adresses) 참조하여 각각의 계약 주소와 함께 테스트 토큰의 예를 시각화 할 수 있습니다.

## 메타마스크 계정에 사용자 정의 토큰을 추가 {#adding-a-custom-token-to-your-metamask-account}

첫째, 메타마스크의 홈 화면에서 새로운 토큰에 대한 적절한 네트워크를 선택하십시오. 그런 다음 "Import Tokens"를 클릭하십시오.

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/add-test-token.png")} />
</div>

<br></br>

그런 다음 새로운 화면으로 여러분을 탐색할 것입니다. Import Tokens 화면에서 Tokens 필드에서 주소를 복사-페이스트를 권장합니다.

:::info
이 프로세스를 설명하기 위해 **Goerli 네트워크에서** **ERC20-TestV4** 토큰을 사용하고 있습니다. 다른 네트워크에서 다른 테스트 토큰을 [<ins>찾아보십시오</ins>](#tokens-and-contract-adresses).
:::

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/token-contract-address.png")} />
</div>

다른 필드는 자동으로 채워집니다. 사용자 정의 토큰을 추가하고 Import Tokens를 클릭하십시오. 이제 메타 마스크의 계정에 `TEST` 토큰이 표시될 것입니다.

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/added-token.png")} />
</div>

**메타 마스크 계정에 테스트 ERC1155 토큰 추가하기**

Polygon 네트워크는 ERC1155를 지원하지만, [메타 마스크는 아직 이 표준을 지원하지 않습니다](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-). 2021년 4분기에 업데이트가 예상됩니다.

### Tokens 및 계약 Adrees {#tokens-and-contract-adresses}

| token | 네트워크 | 계약 주소 |
|---------------|---------|----------------------------------------------|
| ERC20-TestV4 | Goerli | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` |
| MATIC-TST | Mumbai | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| ERC721-TestV4 | Goerli | `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b` |
| ERC721-TestV4 | Mumbai | `0x33FC58F12A56280503b04AC7911D1EceEBcE179c` |