---
id: hello
title: 메타 마스크 지갑을 생성하는 방법
sidebar_label: Hello Metamask
description: 메타 마스크 지갑을 생성하는 방법에 대해 알아봅니다.
keywords:
  - docs
  - matic
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

새로운 암호화폐 지갑을 생성하는 방법이 궁금하다면 메타 마스크 확장 프로그램을 설치하여 하나를 만들어 보십시오.

메타 마스크는 안전한 무료 브라우저 확장 프로그램으로, 웹 애플리케이션이 이더리움 블록체인을 읽고 상호 작용할 수 있도록 합니다.

## 1단계. 브라우저에 메타 마스크 설치하기 {#step-1-install-metamask-on-your-browser}

메타 마스크를 사용하여 새 지갑을 생성하려면 먼저 이 확장 프로그램을 설치해야 합니다.  [Chrome](https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn),  [Firefox](https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/), Brave 및  [Opera](https://addons.opera.com/en/extensions/details/metamask/) 브라우저에서 메타 마스크를 설치할 수 있습니다.

1.  [https://metamask.io](https://metamask.io/) 를 열거나 선호하는 검색 엔진을 사용하여 "메타 마스크 확장 프로그램"을 검색합니다.

:::note
이 튜토리얼에서 Google크롬을 예로 사용할 것이지만 모든 브라우저에서 워크플로 동일한 것이 됩니다.
:::

<img src={useBaseUrl("img/metamask/develop/metamask-home.png")} />

2. Google크롬 확장자로 메타마스크를 설치하기 위해 **다운로드를** 클릭하십시오.

3.  **Chrome에 추가(Add to Chrome)**를 클릭합니다.

<img src={useBaseUrl("img/metamask/develop/add-chrome.png")} />

4.  **확장 프로그램 추가(Add Extension)**를 클릭합니다.

<div align="center">
<img src={useBaseUrl("img/metamask/develop/add-extension.png")} />
</div>

이제 완료되었습니다! 메타 마스크 확장 프로그램을 성공적으로 설치했습니다!

## 2단계. 계정 생성하기 {#step-2-create-an-account}

다음 단계는 계정 생성입니다.

1. 다운로드가 완료되면 새로운 **지갑을** 생성하고 새로운 **계정을 만들** 수 있습니다.

<div align="center">
<img src={useBaseUrl("img/metamask/develop/new-metamask.png")} />
</div>

2. 새로운 비밀번호를 생성하라는 메시지가 표시됩니다. 강력한 비밀번호를 생성하고  **생성(Create)**을 클릭합니다.

<div align="center" >
<img width="500" src={useBaseUrl("img/metamask/develop/create-password.png")} />
</div>

3. 메타마스크는 Secretary Recovery 구문 구문 및 다음 페이지에 대한 정보를 제공할 것입니다.

<div align="center" >
<img  src={useBaseUrl("img/metamask/develop/reveal-phrase.png")} />
</div>


4. 현재 발표된 동일한 순서로 12단어 구문을 종이에 적으세요.

:::caution
신중하게 메타마스크의 지침을 읽으십시오. 이 문구를 종이 한 조각으로 작성하고 안전한 위치에 저장하십시오. 더 많은 보안을 원한다면 여러 개의 페이퍼를 작성하여 2-3개의 다른 위치에 각각 저장합니다. 이 문구를 기억할 수도 있습니다.
:::

5. 이전에 생성된 문구를 선택하여 시크릿 문구를 확인합니다. 완료되면  **확인(Confirm)**을 클릭합니다.

<img src={useBaseUrl("img/metamask/develop/phrase.gif")} />

"이 퍼즐을 해결"하면 비밀 문구를 알고 있음을 확인합니다.

**축하합니다!**  메타 마스크 계정을 성공적으로 만들었습니다. 새로운 이더리움 지갑 주소가 자동으로 생성되었습니다!