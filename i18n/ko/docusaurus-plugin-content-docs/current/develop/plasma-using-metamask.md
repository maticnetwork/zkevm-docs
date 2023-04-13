---
id: plasma-using-metamask
title: 메타마스크를 이용한 플라즈마
description: 메타마스크를 사용한 플라즈마 토큰 전송 자습서
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

이 자습서는 **_matic.js SDK와 메타마스크_**를 사용하여 플라즈마에서 이더리움과 폴리곤 간에 토큰을 전송하는 방법에 대한 간략한 소개입니다. Polygon-Ethereum 브리지는 사용자가 이더리움에서 폴리곤으로 또는 그 반대로 토큰을 전송할 수 있는 교차 체인 채널을 제공합니다. 브리지 사용에 대한 자세한 내용은 [여기](/docs/develop/ethereum-polygon/plasma/getting-started)에서 확인할 수 있습니다. 이 **자습서는 주로 프런트 엔드 관점에서 브리지를 사용하는 데 중점을 둡니다**. 이를 위해 메타마스크를 사용할 것입니다.

이 튜토리얼에서 이해해야 할 가장 중요한 것은 우리가 생성하는 **matic.js 인스턴스에서 web3 제공자를 적절하게 사용**하는 것입니다. PoS를 사용하든 플라즈마를 사용하든 특정 작업은 폴리곤에서 수행해야 하고 일부는 이더리움에서 수행해야 합니다. 이러한 이유로 서로 다른 시나리오에서 **서로 다른 provider가 필요합니다. 따라서 provider를 올바르게 설정하는 것이 매우 필요합니다.**

1. Plasma 및 PoS 브리지의 사용을 보여주는 예제 반응 앱은 [여기](https://github.com/maticnetwork/pos-plasma-tutorial)에서 찾을 수 있습니다.
2. `npm install`을 사용하여 종속물을 설치합니다.
3. src/config.json의 토큰 주소를 해당 토큰 주소로 바꿉니다.

```jsx

posRootERC20: pos 브리지의 ERC20 루트 토큰 주소
posChildERC20: pos 브리지의 ERC20  하위 토큰 주소
posWETH: PoS 랩이더(WETH)
rootChainWETH: 루트 체인에 배포된 WETH
plasmaWETH: 플라즈마 WETH
plasmaRootERC20: 플라즈마에 배포된 ERC20 루트 토큰
plasmaChildERC20: 플라즈마에 배포된 ERC20 하위 토큰
MATIC_RPC: 하위체인용 RPC,
ETHEREUM_RPC:  루트체인용 RPC,
VERSION:  네트워크 버전,
NETWORK: "testnet" or "mainnet"
MATIC_CHAINID:  하위 체인의 Chain ID,
ETHEREUM_CHAINID:  루트 체인의 Chain ID

```

- Polygon 메인넷 및 뭄바이 테스트넷의 구성 및 키 값은 여기에서 확인할 수 있습니다.
  1. [Mumbai Testnet Config](https://static.matic.network/network/testnet/mumbai/index.json)
  2. [Polygon Mainnet Config](https://static.matic.network/network/mainnet/v1/index.json)

4. `npm start` 를 이용한 프로젝트 실행하기

## 플라즈마 ERC20을 사용한 예

> 참고: 메인넷의 경우, 이더리움은 루트 체인이고 폴리곤 메인넷은 하위 체인이며 테스트넷의 경우 Goerli는 루트 체인이고 Mumbai는 하위 체인입니다. config.json 파일의 값은 그에 따라 설정되어야 합니다. Goerli 및 Mumbai 네트워크는 이 튜토리얼에서 루트 및 하위 체인으로 사용됩니다.

> getMaticPlasmaParent() 및 getMaticPlasmaChild()는 플라즈마 브리지의 루트 및 하위 체인 matic.js 객체를 초기화하는 데 사용됩니다. 각 단계에서 아래에 언급된 코드 조각은 [튜토리얼](https://github.com/maticnetwork/pos-plasma-tutorial) 리포지토리에서도 찾을 수 있습니다.

### 입금

ERC20 토큰을 입금하기 위해서는 deposit 함수를 호출하기 전에 approve 함수를 호출해야 합니다. 입금 버튼을 클릭하면 메타마스크는 먼저 지정된 수량의 토큰 전송 승인을 요청하고 승인 거래 확인 후 메타마스크는 입금 거래 확인을 요청합니다. 입금 기능을 위해 메타마스크에서 루트 체인 네트워크가 선택되었는지 확인하십시오.

```js
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);
```

ERC20 토큰을 입금하는 동안, provider는 다음과 같이 지정됩니다.

`maticProvider: maticprovider`

`parentProvider: window.web3`

> 참고: 이더리움에서 폴리곤으로의 입금은 상태 동기화 메커니즘을 사용하여 발생하며 약 5-7분 정도 걸립니다. 이 시간 간격을 두고 기다린 후 web3.js/matic.js 라이브러리나 메타마스크를 이용하여 잔고를 확인하는 것을 권장합니다. 탐색기는 하위 체인에서 하나 이상의 자산 전송이 발생한 경우에만 잔고를 표시합니다. 이 [링크](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma/)는 입금 이벤트를 추적하는 방법을 설명합니다.

<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/plasma-using-metamask/deposit.png")} />
</div>

### 전송

일단 입금되면, 토큰은 Matic 체인의 다른 계정으로 이체될 수 있습니다.

전송하는 동안 `maticProvider`만 `window.web3`으로 설정해야 합니다.

```js
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
MATIC은 폴리곤의 기본 토큰입니다 따라서 토큰 주소 없이 matic 토큰의 전송을 지원합니다.

```js
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```

### 출금 시작

루트 체인으로 토큰을 다시 인출하려면 먼저 하위 체인에서 토큰을 소각해야 합니다. 메타마스크에서 하위 체인 네트워크가 선택되어 있는지 확인하십시오.

```js
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

ERC20 토큰을 소각하는 동안 provider는 다음과 같이 지정됩니다.

`maticProvider: window.web3`

`parentProvider: ethereumprovider`

<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/plasma-using-metamask/burn.png")} />
</div>

### 출금 확인

자금 인출은 하위 체인에서 시작됩니다. 체크포인트 간격은 30분(테스트넷의 경우 ~10분)으로 설정되며, 여기서 폴리곤 블록 레이어의 모든 블록이 검증됩니다. 체크포인트가 루트 체인에 제출되면 withdraw함수가 트리거될 수 있습니다.

출금 기능이 성공하면 NFT Exit(ERC721) 토큰이 생성됩니다. 인출된 자금은 다음 단계에서 설명하는 프로세스 종료를 사용하여 루트 체인의 계정으로 다시 청구될 수 있습니다.

인출 확인 단계에서 provider는 다음과 같이 지정됩니다.

`maticProvider: maticprovider`

`parentProvider: window.web3`

Plasma Bridge의 **_withdrawConfirm_**함수는 하위 체인을 여러 번 쿼리하여 블록 증명 생성을 포함하므로 트랜잭션 개체를 빌드하는 데 시간을 소비하므로 메타마스크가 팝업되는 데 4-5초가 소요될 수 있습니다.

```js
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

백엔드에서 증명을 생성하기 때문에 **_withdrawConfirmFaster_**메소드를 사용할 수 있습니다. 사용 방법에 대한 자세한 내용은 이 [가이드](https://maticnetwork.github.io/matic.js/docs/plasma/erc20/withdraw-confirm-faster/)를 참조하세요.

<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/plasma-using-metamask/confirmWithdraw.png")} />
</div>

### 출금 종료

종료 프로세스는 루트 체인에서 발생하며 루트 체인에서 확인되면 하위 체인에서 소각된 동일한 양의 토큰이 사용자 계정으로 해제됩니다. 메타마스크에서 루트 체인 네트워크가 선택되어 있는지 확인하십시오.

```js
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

프로세스 종료 단계에서 공급자는 다음과 같이 지정됩니다

`maticProvider: maticprovider`

`parentProvider: window.web3`

<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/plasma-using-metamask/Exit.png")} />
</div>
