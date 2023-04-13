---
id: pos-using-metamask
title: 메타마스크를 이용한 PoS
description: 메타마스크를 사용한 PoS 토큰 전송 자습서
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

이 자습서는 **_matic.js SDK와 메타마스크_**를 사용하여 PoS 브리지에서 이더리움과 폴리곤 간에 토큰을 전송하는 방법에 대한 간략한 소개입니다. Polygon-Ethereum 브리지는 사용자가 이더리움에서 폴리곤으로 또는 그 반대로 토큰을 전송할 수 있는 교차 체인 채널을 제공합니다. 브리지 사용에 대한 자세한 내용은 [여기](/docs/develop/ethereum-polygon/pos/getting-started)에서 확인할 수 있습니다. 이 **자습서는 주로 프런트 엔드 관점에서 브리지를 사용하는 데 중점을 둡니다**. 이를 위해 메타마스크를 사용할 것입니다.

이 튜토리얼에서 이해해야 할 가장 중요한 것은 우리가 생성하는 **matic.js instance에서 web3 provider를 적절하게 사용**하는 것입니다. PoS를 사용하든 플라즈마를 사용하든 특정 작업은 폴리곤에서 수행해야 하고 일부는 이더리움에서 수행해야 합니다. 이러한 이유로 **서로 다른 시나리오에서 서로 다른 provider가 필요합니다. 따라서 provider를 올바르게 설정하는 것이 매우 필요합니다.**

1. **Plasma 및 PoS 브리지의 사용을 보여주는 반응 앱의 예시**는 [여기](https://github.com/maticnetwork/pos-plasma-tutorial)에서 찾을 수 있습니다.
2. `npm install` 을 사용하여 종속성을 설치합니다.
3. src/config.json의 토큰 주소를 해당 토큰 주소로 바꿉니다.

```jsx

posRootERC20: PoS브리지의 ERC20 루트 토큰 주소
posChildERC20: PoS브리지의 ERC20 하위 토큰 주소
posWETH: PoS Weth(랩이더)
rootChainWETH: 루트 체인에 배포된 랩이더(WETH)
plasmaWETH:  플라즈마 랩이더(WETH)
plasmaRootERC20: 플라즈마에 배포된 ERC20 루트 토큰
plasmaChildERC20: 플라즈마에서 배포된 ERC20 하위 토큰
MATIC_RPC:  하위 체인을 위한 RPC,
ETHEREUM_RPC: 루트 체인을 위한 RPC,
VERSION: 테트워크 버전,
NETWORK: "테스트넷" or "메인넷"
MATIC_CHAINID: 하위 체인의 체인 ID,
ETHEREUM_CHAINID: 루트 체인의 체인 ID

```

- Polygon 메인넷 및 뭄바이 테스트넷의 구성 및 키 값은 여기에서 확인할 수 있습니다.
  1. [Mumbai Testnet Config](https://static.matic.network/network/testnet/mumbai/index.json)
  2. [Polygon Mainnet Config](https://static.matic.network/network/mainnet/v1/index.json)

4. `npm start` 를 이용하여 프로젝트 실행합니다.

## PoS ERC20 테스트 토큰을 이용한 예시

> 참고: 메인넷의 경우, 이더리움은 루트 체인이고 폴리곤 메인넷은 하위 체인이며 테스트넷의 경우 Goerli는 루트 체인이고 Mumbai는 하위 체인입니다. config.json 파일의 값은 그에 따라 설정되어야 합니다. Goerli 및 Mumbai 네트워크는 이 튜토리얼에서 루트 및 하위 체인으로 사용됩니다.

> posClientParent() 및 posClientChild는 PoS 브리지에 대한 루트 및 하위 체인 matic.js 객체를 초기화하는 데 사용됩니다. 각 단계에서 아래에 언급된 코드 조각은  [tutorial](https://github.com/maticnetwork/pos-plasma-tutorial) 리포지토리에서도 찾을 수 있습니다.

### 입금

ERC20 토큰을 입금하기 위해서는 deposit 함수를 호출하기 전에 approve함수를 호출해야 합니다. 입금 버튼을 클릭하면 메타마스크는 먼저 지정된 수량의 토큰 전송의 승인을 요청하고 승인 거래 확인 후 메타마스크는 입금 트랜잭션의 확인을 요청합니다. 입금 기능을 위해 메타마스크에서 루트 체인 네트워크가 선택되었는지 확인하십시오.

```js
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

const erc20RootToken = posClient.erc20(<root token address>, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

```

ERC20 토큰을 입금하는 동안 provider는 다음과 같이 지정됩니다.

`maticProvider: maticprovider`

`parentProvider: window.web3`

> 참고: 이더리움에서 폴리곤으로의 입금은 상태 동기화 메커니즘을 사용하여 발생하며 약 5-7분 정도 걸립니다. 이 시간 간격을 두고 기다린 후 web3.js/matic.js 라이브러리를 이용하거나 메타마스크를 이용하여 잔고를 확인하는 것이 좋습니다. 탐색기는 하위 체인에서 하나 이상의 자산 전송이 발생한 경우에만 잔고를 표시합니다. 이 [링크](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/)는 입금 이벤트를 추적하는 방법을 설명합니다.

<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/pos-using-metamask/deposit.png")} />
</div>

### 전송

일단 입금되면, 토큰은 폴리곤 체인의 다른 계정으로 이전될 수 있습니다.

전송하는 동안 `maticProvider`만 `window.web3`으로서 설정되어야 합니다.

```js
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

### 소각

루트 체인으로 토큰을 다시 인출하려면 먼저 하위 체인에서 토큰을 소각해야 합니다. 메타마스크에서 하위 체인 네트워크가 선택되어 있는지 확인하십시오. **withdrawStart()** 메서드를 사용하여 폴리곤 체인에서 지정된 수량을 소각할 인출 프로세스를 시작할 수 있습니다.

```js
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

ERC20 토큰을 소각하는 동안, provider는 아래와 같이 지정됩니다.

`maticProvider: window.web3`

`parentProvider: ethereumprovider`

<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/pos-using-metamask/burn.png")} />
</div>

### 종료

종료 프로세스는 이더리움에서 이루어지며 확인 시 하위 체인에서 소각된 동일한 수량의 토큰이 루트 체인의 사용자 주소로 전송됩니다. 메타마스크에서 루트 체인 네트워크가 선택되었는지 확인하십시오. 토큰 소각 후 얻은 소각 해시가 입력으로 제공됩니다. 이 종료 프로세스를 수행하기 전에 체크포인트가 완료될 때까지 기다리십시오. 체크포인트 시간은 일반적으로 ~10분입니다.

ERC20 토큰을 종료하는 동안 provider는 다음과 같이 지정됩니다

`maticProvider: maticprovider`

`parentProvider: window.web3`

PoS 브리지의 withdrawExit함수는 하위 체인을 여러 번 쿼리하여 블록 증명 생성을 포함하므로 트랜잭션 개체를 빌드하는 데 시간을 소비하므로 메타마스크가 팝업되는 데 4-5초가 소요될 수 있습니다.

```js
const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
또한 인출 프로세스를 더 빨리 종료하는 데 사용할 수 있는 **_withdrwaExitFaster_** 메소드를 사용할 수도 있습니다. 자세한 내용은 이 [가이드](https://maticnetwork.github.io/matic.js/docs/pos/erc20/withdraw-exit-faster/)를 참조하세요.

<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/pos-using-metamask/exit.png")} />
</div>
