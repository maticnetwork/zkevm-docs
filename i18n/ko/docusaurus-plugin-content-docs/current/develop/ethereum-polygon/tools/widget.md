---
id: widget
title: 지갑 위젯
sidebar_label: Wallet Widget
description: "브리지 트랜잭션을 실행하는 UI 도구"
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

지갑 위젯은 브리지 트랜잭션(입금 및 출금)을 실행하도록 웹 애플리케이션에 내장할 수 있는 UI 도구입니다.

모든 위젯은 고유한 이름으로 식별되며 이러한 이름은 [위젯 대시보드](https://wallet.polygon.technology/widget-dashboard)에서 받을 수 있습니다.

### 위젯 대시보드 {#widget-dashboard}

위젯은 지갑 애플리케이션의 위젯 대시보드 페이지에서 생성할 수 있습니다. 사용자는 사용자 정의 옵션을 통해 새로운 위젯을 생성할 수 있습니다.

위젯이 생성되면 코드 스니펫을 복사하여 애플리케이션에 추가하거나 위젯 이름을 사용하여 직접 구성할 수 있습니다.

위젯 대시보드의 링크는 다음과 같습니다.

* 메인넷 - https://wallet.polygon.technology/widget-dashboard
* 테스트넷 - https://wallet-dev.polygon.technology/widget-dashboard

## 설치 {#install}

위젯은 javascript 라이브러리로 내보내고 npm 패키지로 사용할 수 있습니다.

```bash
npm i @maticnetwork/wallet-widget
```

## 예시 {#examples}

개발에 도움이 되도록 다양한 프레임워크 및 도구에 대한 예시를 마련했습니다. 모든 예시는 [https://github.com/maticnetwork/wallet-widget-example](https://github.com/maticnetwork/wallet-widget-example)에서 확인할 수 있습니다.

## 사용 방법 {#how-to-use}
### 대상이 있는 경우 {#with-target}

앱 안에 버튼이 있고 해당 버튼을 클릭할 때 위젯을 표시하려고 합니다.

```html
<button id="btnMaticWidget"></btn>
```

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'mainnet' // network to be used - testnet or mainnet
});
```

준비가 되었다면 위젯을 만드세요. 문서를 불러온 후 생성 함수를 호출하는 것이 가장 좋습니다.

```javascript
await widget.create();
```
위젯이 생성되었습니다. 이제 버튼을 클릭하면 위젯이 표시됩니다.

### 대상이 없는 경우 {#without-target}

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    network: 'mainnet' // network to be used - testnet or mainnet
});

await widget.create();
```

이제 위젯이 생성되었지만 위젯을 표시하려면 `show` API를 호출해야 합니다.

```
widget.show();
```

마찬가지로 `hide` API를 호출하여 위젯을 숨길 수 있습니다.

```
widget.hide();
```

### 중요 사항 👉 {#important-note}

1. 네트워크 '테스트넷' 또는 '메인넷'에 따라 각 대시보드에서 앱을 생성해야 합니다. 네트워크 변경 시 문제가 없도록 테스트넷과 메인넷에서 모두 동일한 이름으로 앱을 생성하는 것을 권장합니다.

2. 지갑 위젯은 UI 라이브러리로서, 다양한 웹사이트에서 다르게 나타나거나 색상, 응답성 등에서 문제가 있을 수 있습니다. 따라서 테스트 및 맞춤화에 시간을 투자하세요. 도움이 필요한 경우 [지원팀](https://support.polygon.technology/)에 문의하세요.

3. 지갑 위젯은 모바일 기기에서 전체 화면으로 표시되지만, `style` 구성을 통해 맞춤화할 수 있습니다.

## 구성 {#configuration}

구성은 위젯 생성자에서 제공할 수 있습니다.

## 사용 가능한 구성은 다음과 같습니다. {#available-configuration-are}

- **target**: 문자열 - 요소 클릭 시 위젯을 표시하기 위한 CSS 선택자. 예를 들어, '#btnMaticWidget'은 아래 코드의 타겟입니다.

```javascript
<button id="btnMaticWidget">Matic widget</button>
```

- **network**: 문자열 - 사용할 네트워크. '테스트넷' 또는 '메인넷'의 두 가지 옵션이 제공됩니다.
- **width**: 숫자 - 위젯의 너비
- **height**: 숫자 - 위젯의 높이
- **autoShowTime**: 숫자 - 지정된 시간(밀리초) 후 위젯을 자동으로 표시합니다.
- **appName**: 문자열 - 앱의 이름으로, 위젯 대시보드에서 검색할 수 있습니다.
- **position**: 문자열 - 위젯의 위치를 설정합니다. 사용 가능한 옵션 -
    - 가운데
    - 오른쪽 아래
    - 왼쪽 아래
- **amount**: 문자열 - 텍스트 상자에 금액을 미리 입력합니다.
- **page**: 문자열 - 페이지를 선택합니다. 사용 가능한 옵션 - `withdraw`, `deposit`.
- **overlay** : 불리언 - 위젯이 열릴 때 오버레이를 표시합니다. 기본값은 false입니다.
- **style**: 객체 - 위젯에 일부 css 스타일을 적용합니다.

```
var widget = new MaticWidget({
    appName: "<your app id>", //appName from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'testnet' // network to be used - testnet or mainnet,
    style:{
      color:'red'
    }
});
```

## 이벤트 {#events}

위젯은 애플리케이션의 내부 상황을 파악하는 데 사용할 수 있는 몇몇 이벤트를 발생시킵니다.

### 이벤트 구독 {#subscribe-to-events}

```javascript
widget.on('load',()=>{
  console.log('widget is loaded');
})
```

### 이벤트 구독 취소 {#unsubscribe-to-events}

```javascript
widget.off('load',<callback>)
```

> 콜백은 이벤트 구독 시 사용한 것과 동일해야 합니다. 따라서 변수에 콜백을 저장하는 것이 좋습니다. `

## 이벤트 목록: {#list-of-events}

- **load** - 위젯을 로드합니다.
- **close** - 위젯을 닫습니다.
- **approveInit** - 승인 트랜잭션을 시작합니다.
- **approveComplete** - 승인 트랜잭션을 완료합니다.
- **approveError** - 오류로 인해 승인 트랜잭션이 실패했거나 사용자가 메타마스크에서 트랜잭션을 거부했습니다.
- **depositInit** - 입금 트랜잭션을 시작합니다.
- **depositComplete** - 입금 트랜잭션을 완료합니다.
- **depositError** - 오류로 인해 입금 트랜잭션이 실패했거나 사용자가 메타마스크에서 입금 완료 트랜잭션을 거부했습니다.
- **burnInit** - 출금 소각 트랜잭션을 시작합니다.
- **burnComplete** - 출금 소각 트랜잭션을 완료합니다.
- **confirmWithdrawInit** - 출금에 체크포인트를 적용하고 확인 트랜잭션을 시작합니다.
- **confirmWithdrawComplete** - 출금 확인 트랜잭션을 완료합니다.
- **confirmWithdrawError** - 오류로 인해 출금 확인 트랜잭션이 실패했거나 사용자가 메타마스크에서 출금 확인 트랜잭션을 거부했습니다.
- **exitInit** - 출금 종료 트랜잭션을 시작합니다.
- **exitComplete** - 출금 종료 트랜잭션을 완료합니다.
- **exitError** - 오류로 인해 출금 종료 트랜잭션이 실패했거나 사용자가 메타마스크에서 출금 종료 트랜잭션을 거부했습니다.

## API {#apis}

- **show** -
위젯을 표시합니다.

```javascript
widget.show()
```

- **hide** -
위젯을 숨깁니다.

```javascript
widget.hide()
```

- **on** -
이벤트를 구독합니다.

```javascript
widget.on('<event name>', callback)
```

- **off** -
이벤트 구독을 취소합니다.

```javascript
widget.off('<event name>', callback)
```
