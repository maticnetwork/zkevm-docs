---
id: fx-portal
title: FxPortal
description: FxPortal을 사용하지 않고 이더리움에서 Polygon으로 이전 상태 또는 데이터를 전달합니다.
keywords:
  - docs
  - polygon wiki
  - polygon
  - FxPortal
  - ethereum to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon에서 이더리움 데이터를 native 읽는 일반적인 메커니즘은 **스테이트** Sync를 사용하여 있습니다. 이를 통해 이더리움에서 Polygon으로 임의 데이터를 전송할 수 있습니다. 그러나 기본 인터페이스를 사용할 수 없는 경우에는 루트 및 하위 계약의 매핑이 필요합니다. FxPortal은 배포된 기본 FxPortal 계약을 사용하여 매핑 없이 ERC 표준화된 토큰을 배포할 수 있는 대안을 제공합니다.

## FxPortal은 무엇입니까? {#what-is-fxportal}

Polygon [상태 동기화](../../pos/state-sync/state-sync-mechanism.md) 메커니즘의 강력하고 간단한 구현입니다. Polygon PoS 브리지는 동일한 아키텍처에 빌드됩니다. [예리한](https://github.com/fx-portal/contracts/tree/main/contracts/examples) 폴더의 코드는 몇 가지 사용사례입니다. 이 예를 쉽게 사용하여 직접 구현되거나 사용자 지정 브리지를 제작하여 매핑이 없으면 어떤 상태동기화도 가능합니다.

계약 및 예를 위해 [GitHub 저장소를](https://github.com/fx-portal/contracts) 확인할 수 있습니다.

## 작동 방식 {#how-does-it-work}

[FxChild](https://github.com/fx-portal/contracts/blob/main/contracts/FxChild.sol) 및 [FxRot는](https://github.com/fx-portal/contracts/blob/main/contracts/FxRoot.sol) FxPortal이 작동하는 주요 계약입니다. 상태 동기화 메커니즘을 사용하여 매핑하지 않고 다른 체인에 대한 사용자 정의 방법에 데이터를 호출하고 전달합니다. 배포된 기본 계약을 사용하려면 배포하는 스마트 계약([FxBaseRootTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) 및 [FxBaseChildTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseChildTunnel.sol))에서 FxPortal의 기본 계약을 구현하면 됩니다. 이러한 계약을 기반으로 빌드하면 배포된 계약이 데이터 터널 메커니즘을 사용하여 서로 통신할 수 있습니다.

그렇지 않으면 이미 배포된 터널 계약을 통해 토큰을 매핑할 수 있습니다. Polygon 메인넷과 Mumbai 테스트넷을 위한 기본 Fxunnel 배포 세부 사항은 다음과 같습니다.

- [Polygon 메인넷](https://static.matic.network/network/mainnet/v1/index.json)
- [Mumbai Testnet](https://static.matic.network/network/testnet/mumbai/index.json)

위의 `FxPortalContracts`링크에서 키워드를 검색하여 모든 기본 터널 계약 및 기타 중요한 FxPortal 계약 배포와 함께 배포되는 모든 기본 FxPortal 계약 배열을 확인하십시오.

## 사용자 정의 FxNonel 구현이 필요합니까? {#do-i-need-a-custom-fxtunnel-implementation}

현재 기본 터널 구현이 사용 케이스에 일치하지 않는 경우에만 **사용자 지정 FxTunnel 구현을** 위해 가야 합니다. 기본 FxPortal 터널을 사용할 때 어린이 계약 코드를 수정할 수 없습니다. 어린이 토큰 계약의 byecode는 항상 고정되며 [항상 기본 FxTunnel](https://github.com/fx-portal/contracts/tree/main/contracts/examples) 배포에 대해 동일한 상태로 유지됩니다. 사용자 정의 아이토큰이 필요한 경우 자체 사용자 정의 FxTunnel을 위해 가서 다음 부분을 읽으면 자체 사용자 정의 FxTunnel을 배포하면 사용자 정의 FxTunnel을 배포할 때 더 많은 정보를 제공할 수 있습니다.

다가오는 섹션을 읽기 전에 [FxPortal 스테이트 전송을](state-transfer.md) 읽고 이해하는 것이 좋습니다. 다가오는 각 섹션은 해당 섹션에 첨부 된 예를 들어 터널 계약 링크가 있습니다. 이 예들은 자신의 맞춤형 fx-터널을 구축하면서 참조 대상이 될 수 있습니다.

## ERC20 이전 {#erc20-transfer}

[아이와 루트 터널 계약을](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc20-transfer) 통해 루트 체인에서 토큰을 예치하고 어린이 체인의 철회를 허용합니다.

#### `FxERC20RootTunnel`

- `mapToken(address rootToken)`: 당신은 배포된 계약에 대한 함수를 호출하여 ERC20 토큰을 매핑하고 어린이 체인에 해당 아동 토큰을 만들 수 있습니다.
- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`:: 매핑된 토큰의 주소를 사용하여 호출을 `deposit()`하면 해당 액티에이션(필요한 경우 데이터)을 인출할 수 있는 주소를 입력하십시오. 먼저 토큰을 지출하기 위해 표준 ERC20 `approve` 함수를 사용하여 계약을 승인해야 합니다.

#### `FxERC20ChildTunnel`

- `withdraw(address childToken, uint256 amount)`:이 기능을 사용하여 모든 아동 토큰을 인출할 `deposit()`수 있습니다. 처음 매핑될 때 생성된 하위 토큰을 수신합니다.
- `rootToChildToken`:이 공개 변수는 아동 토큰을 매핑에 뿌린 토큰을 포함하고 있습니다. 루트 토큰의 주소로 매핑을 쿼리하여, 배포된 하위 토큰의 주소를 알 수 있습니다.

### 이더리움에서 Polygon → {#polygon}

1. 루트 체인에 자체 ERC20 토큰을 배포합니다. 이 주소는 나중에 필요합니다.
2. 루트 토큰의 `approve()` 함수를 호출하고 루트 터널의 주소와 금액을 인수로 사용하여 이전할 토큰을 승인합니다.
3. 루트 체인에서 수신자 주소와 금액으로 `deposit()`을 호출하여 하위 체인에서 동일한 금액의 하위 토큰을 수신합니다. 토큰도 자동으로 매핑됩니다. 또는 입금 전에 `mapToken()`을 먼저 호출할 수도 있습니다.
4. 매핑 후 이제 터널의 `deposit`기능과 `withdraw`기능을 사용하여 크로스체인 전송을 실행할 수 있어야합니다.

:::note

루트 `deposit()`체인에서 수행한 후, 상태 동기화에 대해 22-30분이 소요됩니다. 상태 동기화 발생하면 주어진 주소에 증착된 토큰을 얻을 수 있습니다.

:::

### Polygon에서 Eygon에서 Progres을 제공합니다. {#ethereum}

1. 하위 체인에서 토큰 주소와 금액을 각 인수로 사용하는 `withdraw()`를 호출하여 루트 체인의 지정된 수신자에게 하위 토큰을 다시 이전합니다. 소각 증명을 생성하는 데 사용될 **트랜잭션 해시를 기록**해 두세요.

2. [여기에서](#withdraw-tokens-on-the-root-chain) 철회를 완료하는 단계를 확인할 수 있습니다.

## ERC721 이전 {#erc721-transfer}

예시가 필요하면 [이 ERC721 루트 및 Child Tunnel](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc721-transfer) 가이드를 확인하십시오.

### 이더리움에서 Polygon → {#polygon-1}

1. 루트 체인에 자체 ERC721 토큰을 배포합니다. 이 주소는 나중에 필요합니다.
2. 루트 터널의 주소와 토큰 ID를 인수로 사용하여 루트 토큰의 `approve()` 함수를 호출하여 이전할 토큰을 승인합니다.
3. 루트 체인에서 수신자 주소와 토큰 ID로 `deposit()`을 호출하여 하위 체인에서 동일한 금액의 하위 토큰을 수신합니다. 토큰도 자동으로 매핑됩니다. 또는 입금 전에 `mapToken()`을 먼저 호출할 수도 있습니다.

:::note

루트 `deposit()`체인에서 수행한 후, 상태 동기화에 대해 22-30분이 소요됩니다. 상태 동기화 발생하면 주어진 주소에 증착된 토큰을 얻을 수 있습니다.

:::

### Polygon에서 Eygon에서 Progres을 제공합니다. {#ethereum-1}

1. 하위 체인에서 토큰 주소와 토큰 ID를 각 인수로 사용하는 `withdraw()`을 호출하여 루트 체인의 지정된 수신자에게 하위 토큰을 다시 이전합니다. **참고 tx 해시 를** 사용하여 화상 증거를 생성합니다.

2. [여기에서](#withdraw-tokens-on-the-root-chain) 철회를 완료하는 단계를 확인할 수 있습니다.

## ERC1155 이전 {#erc1155-transfer}

예시가 필요하면 [ERC1155 루트 및 Child Tunnel](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc1155-transfer) 가이드를 확인하십시오.

#### `FxERC1155RootTunnel`

- `mapToken(rootToken)`: 루트 ERC1155 토큰을 하위 체인에 매핑하는 데 사용됩니다
- `deposit(rootToken, user, id, amount, data)`: 루트 토큰을 하위 체인에 입금하는 데 사용되는 함수입니다
- `depositBatch(rootToken, user,  ids, amounts, bytes memory data)`: 여러 토큰 ID 및 해당 금액에 사용됩니다
- `receiveMessage(inputData)`: 페이로드를 `inputData`로 하여 소각 증명이 생성된 후 호출됩니다

#### `FxERC1155ChildTunnel`

- `withdraw(childToken, id, amount, data)`: Polygon에서 이더리움으로 토큰을 출금하는 데 사용됩니다
- `withdrawBatch(childToken, ids, amounts, data)`: 출금과 동일하지만 여러 토큰 ID를 출금할 수 있습니다

### 이더리움에서 Polygon → {#polygon-2}

1. 루트 체인에 ERC1155 토큰을 배포합니다. 이 주소는 나중에 필요합니다.
2. Polygon에서 토큰을 `FxERC1155RootTunnel`전송할 수 `operator`있도록 `FxERC1155RootTunnel`주소를 사용하여 배포된 토큰을 `setApprovalForAll(operator, approved)``FxERC1155ChildTunnel`호출하십시오.
3. 배포된 토큰의 주소를 as 로 `mapToken()``FxERC1155RootTunnel`호출하십시오.`rootToken` 이것은 Polygon에서 ERC1155 토큰을 배포하고 매핑하도록 `FxERC1155ChildTunnel`지시하는 메시지를 보낼 것입니다. 자녀 토큰 주소를 질의하려면 다음 `rootToChildToken`호출을 통해 문의하십시오.`FxERC1155ChildTunnel`
4. 리시버로서 `rootToken``user`이더리시버로서 Eygum에서 토큰의 주소를 `FxERC1155RootTunnel`함께 `deposit()``id`호출하십시오.`amount` 또는 여러 토큰 ID에 대해 `depositBatch()`를 호출할 수도 있습니다.

:::note

루트 `deposit()`체인에서 수행한 후, 상태 동기화에 대해 22-30분이 소요됩니다. 상태 동기화 발생하면 주어진 주소에 증착된 토큰을 얻을 수 있습니다.

:::

### Polygon에서 Eygon에서 Progres을 제공합니다. {#ethereum-2}

1. Polygon에 배포된 아동 토큰의 주소를 `FxERC1155ChildTunnel``id`'Xken'으로 `withdraw()``childToken`호출하십시오(아동 토큰의 주소를 작성에서 질의할 수 `rootToChildToken`있음). 또는 여러 토큰 ID와 금액에 대해 `withdrawBatch()`를 호출할 수도 있습니다. **참고 tx 해시 를** 사용하여 화상 증거를 생성합니다.

2. [여기에서](#withdraw-tokens-on-the-root-chain) 철회를 완료하는 단계를 확인할 수 있습니다.

## 루트 체인에서 토큰을 철회하기 {#withdraw-tokens-on-the-root-chain}

:::info

어린이 체인에서 수행한 후, 검문소가 발생할 수 `withdraw()`있는 30~90분이 소요됩니다. 다음 검문소가 화상 트랜잭션을 포함하면 루트 체인에서 토큰을 철회할 수 있습니다.

:::

1. **tx 해시와** **MESSAGE_SENT_EVENT_SIG를** 사용하여 화상 증거를 생성합니다. 증거를 생성하기 위해 Polygon이 호스팅한 증명 생성 API를 사용할 수 있거나 [여기에](https://github.com/maticnetwork/proof-generation-api) 지시서에 따라 자체 증명 생성 API를 스핀화할 수 있습니다.

Polygon에서 호스팅하는 증명 생성 끝점 [여기에서](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature}) 확인할 수 있습니다.

  - `burnTxHash`Polygon에서 시작한 `withdraw()`트랜잭션 해시입니다.
  - `eventSignature`이 함수는 함수가 발산하는 이벤트의 이벤트 `withdraw()`서명입니다. MESCAGE_SENT_EVENT_SIG의 이벤트 서명은 IS `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`입니다.

메인넷과 테스트넷의 증명 API 사용 예는 다음과 같습니다. -

→ [Polygon 메인넷 Pro 생성](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Mumbai Testnet Pro 생성](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

2. Goerli 또는 이더리움에서 각 루트 터널 `receiveMessage()`계약에서 인수로 생성된 페이로드를 피하십시오.

## 발행 가능한 ERC-20 이전 {#mintable-erc-20-transfer}

예시가 필요하면 이 [Mintable ERC20 루트 및 Child Tunnel](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc20-transfer) 가이드를 확인하십시오.

:::info

Mintable Token FxTunnels의 경우 먼저 아이용 토큰을 배포하고 첫 번째 인출 프로세스가 완료되면 루트 토큰을 배포합니다. 루트 토큰 계약 주소는 아동 계약이 배포된 직후 미리 결정될 수 있지만, 첫 번째 인출 / 출구가 완료되면 매핑은 기술적으로 존재할 것입니다.

:::

#### `FxMintableERC20RootTunnel`

- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: 이더리움에서 Polygon으로 토큰 입금
- `receiveMessage(bytes memory inputData)`: 루트 체인에서 토큰을 수신하기 위해 `inputData`로 제공할 소각 증명

#### `FxMintableERC20ChildTunnel`

- `deployChildToken(uint256 uniqueId, string memory name, string memory symbol, uint8 decimals)`: Polygon 네트워크에 ERC20 토큰을 배포하려면
- `mintToken(address childToken, uint256 amount)`: Polygon에서 특정 금액의 토큰 발행
- `withdraw(address childToken, uint256 amount)`: 루트 체인으로 출금하기 위해 하위 체인에서 토큰 소각

### Polygon에서 토큰 채광 토큰 채광 {#minting-tokens-on-polygon}

1. `FxMintableERC20ChildTunnel`에서 `deployChildToken()`을 호출하고 필요한 토큰 정보를 매개변수로 전달합니다. `rootToken` 및 `childToken` 주소가 포함된 `TokenMapped` 이벤트가 발생합니다. 이 주소를 기록해 두세요.
2. `FxMintableERC20ChildTunnel`에서 `mintToken()`을 호출하여 하위 체인의 토큰을 발행합니다.
3. `FxMintableERC20ChildTunnel`에서 `withdraw()`를 호출하여 Polygon에서 토큰을 출금합니다. 참고: 이 경우 트랜잭션 해시를 사용하여 화상 증거를 생성합니다.
4. [여기에서](#withdraw-tokens-on-the-root-chain) 철회를 완료하는 단계를 확인할 수 있습니다.

### 이더리움에서 토큰을 인출하기 {#withdrawing-tokens-on-ethereum}

생성된 소각 증명을 `FxMintableERC20RootTunnel`의 `receiveMessage()`에 인수로 제공합니다. 이후 토큰 잔액이 루트 체인에 반영됩니다.

### Polygon으로 다시 예치하는 토큰 예치 {#deposit-tokens-back-to-polygon}

1. 토큰을 이전하려면 `FxMintableERC20RootTunnel`을 승인해야 합니다.
2. `rootToken`을 루트 토큰의 주소로, `user`를 수신자로 하여 `FxMintableERC20RootTunnel`의 `deposit()`을 호출합니다.
3. 상태 싱크 이벤트(22-30 min)를 기다려 보십시오. 그런 다음 하위 체인에서 대상 수신자의 잔액을 쿼리할 수 있습니다.

**ERC721** 및 **ERC1155** Mintable Fxunnel 예제는 다음과 같습니다. -

- [FxMintableERC721Tunnel](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc721-transfer)
- [FxMintableERC1155Tunnel](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc1155-transfer)

## 배포 예시 {#example-deployments}

### Goerli {#goerli}

- Checkpoint Manager: [0x2890bA17EfE978480615e330ecB65333b880928e](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e)
- Dummy ERC20 토큰: [0xe9c7873f81c815d64c71c2233462cb175e4765b3](https://goerli.etherscan.io/address/0xe9c7873f81c815d64c71c2233462cb175e4765b3)
- FxERC20RootTunnel: [0x3658ccFDE5e9629b0805EB06ACFc42416850961](https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxMintableERC20RootTunnel: [0xA200766a7D64E5611E2D232AA6c1f870aCb63c1](https://goerli.etherscan.io/address/0xA200766a7D64E54611E2D232AA6c1f870aCb63c1)
- Dummy ERC721 토큰: [0x73594a053cb5dDE558268d28a774375C4E23dA](https://goerli.etherscan.io/address/0x73594a053cb5ddDE5558268d28a774375C4E23dA)
- FxERC721RootTunnel: [0xF9bc4a80464E48369303196645e876c8C7D972de](https://goerli.etherscan.io/address/0xF9bc4a80464E48369303196645e876c8C7D972de)
- Dummy ERC1155 Token: [0x1906d395752FE0c930f8d061DFEB785eBE6f0B4E](https://goerli.etherscan.io/address/0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E)
- FxERC1155RootTunnel : [0x48DE785970ca6eD289315036B6d18788cF9F48](https://goerli.etherscan.io/address/0x48DE785970ca6eD289315036B6d187888cF9Df48)

### 뭄바이 {#mumbai}

- FxERC20: [0xDDE69724AeFBdb08413719fE745aB66e3b05C7](https://mumbai.polygonscan.com/address/0xDDE69724AeFBdb084413719fE745aB66e3b055C7)
- [FxERC20ChildTunnel: 0x9C37aEbdb7D337E0215BC40152d6689DaF9767](https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767)
- FxMintableERC20ChildTunnel: [0xA2C7eBEF68B44056b4A39C2CEC23844275C56e9](https://mumbai.polygonscan.com/address/0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9)
- 하위 토큰 더미 ERC20: 0x346d21bc2bD3dEE2d1168E1A632b10D1d7B9c0A
- FxERC721: [0xf2720927E0487267C0221ffA41A88528048726](https://mumbai.polygonscan.com/address/0xf2720927E048726267C0221ffA41A88528048726)
- [FxERC721ChildTunnel: 0x3658ccFDE5e9629b0805EB06ACFc42416850961](https://mumbai.polygonscan.com/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxERC1155: [0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C](https://mumbai.polygonscan.com/address/0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C)
- FxERC1155ChildTunnel: [0x3A0f90D3905601501652fe925e96d8B294243Efc](https://mumbai.polygonscan.com/address/0x3A0f90D3905601501652fe925e96d8B294243Efc)

해당 메인넷 배포는 [여기에서](https://static.matic.network/network/mainnet/v1/index.json) 확인할 수 있습니다. `FxPortalContracts`키워드를 사용하여 모든 기본 터널 계약 및 기타 중요한 FxPortal 계약 배포와 함께 배포되는 모든 기본 FxPortal 계약 계약을 확인하십시오. 계약 주소와 ABI에 액세스하는 데 대한 [`maticnetwork/meta`](https://www.npmjs.com/package/@maticnetwork/meta)패키지를 사용할 수 있습니다.

## 계약 주소 {#contract-addresses}

### Mumbai 테스트넷 {#mumbai-testnet}

| 계약 | 배포된 주소  |
| :----- | :- |
| [FxRoot(Goerli)](https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA#code) | `0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA` |
| [FxChild(Mumbai)](https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11/contracts) | `0xCf73231F28B7331BBe3124B907840A94851f9f11`|

### Polygon 메인넷 {#polygon-mainnet}


| 계약 | 배포된 주소  |
| :----- | :- |
| [FxRoot(이더리움 메인넷)](https://etherscan.io/address/0xfe5e5d361b2ad62c541bab87c45a0b9b018389a2#code) | `0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2` |
| [FxChild(Polygon 메인넷)](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a/contracts) | `0x8397259c983751DAf40400790063935a11afa28a`|
