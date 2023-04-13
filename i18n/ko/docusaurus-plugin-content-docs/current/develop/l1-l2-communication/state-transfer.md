---
id: state-transfer
title: 상태 전송
description: 이더리움에서 Polygon으로 쉽게 이전 상태 또는 데이터를 전달합니다.
keywords:
  - docs
  - polygon
  - polygon wiki
  - state transfer
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon 유효성 검사자는 계속해서 이라는 이더리움 체인에서 계약을 모니터링하고 `StateSender`있습니다. 이더리움 체인에 등록된 계약이 이 계약을 호출할 때마다 이벤트가 발생합니다. Polygon 검증자는 이 이벤트를 사용해 데이터를 Polygon 체인의 다른 계약으로 전달합니다. 이 **스테이트 동기화** 메커니즘은 이더리움에서 Polygon에 데이터를 보내는 데 사용됩니다.

또한 Polygon 유효성 검사자는 Polygon 체인에서 각 트랜잭션 의 이더리움 해시를 정기적으로 보냅니다. Polygon에서 일어난 트랜잭션을 검증하기 위해 이 **검문소를** 사용할 수 있습니다. Polygon 체인에서 거래가 확인되면 Eygon은 해당 조치를 수행하는 데 사용할 수 있습니다.

이 2개의 메커니즘은 함께 사용하여 이더리움과 Polygon의 양방향 데이터(상태) 전송을 가능하게합니다. 이러한 모든 상호 작용을 추상화하려면 `FxBaseRootTunnel`(이더리움에서) 및 `FxBaseChildTunnel`( Polygon) 계약을 직접 상속받을 수 있습니다.

## 루트 터널 계약 {#root-tunnel-contract}

[여기](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseRootTunnel.sol)의 `FxBaseRootTunnel` 계약을 사용하세요. 이 계약은 다음 기능에 대한 액세스를 제공합니다.

- `function _processMessageFromChild(bytes memory data)`:이 기능은 계약에서 구현되어야 할 가상 함수인데 이는 해당 데이터를 수신해서 데이터를 처리하기 위해 상속받을 수 `ChildTunnel`있습니다.
- `_sendMessageToChild(bytes memory message)`: 이 함수는 바이트 데이터를 메시지로 사용해 내부적으로 호출할 수 있습니다. 이 데이터는 그대로 하위 터널로 전송됩니다.
- `receiveMessage(bytes memory inputData)`:이 기능은 사용자가 방출하는 메시지를 수신하기 위해 호출되어야 `ChildTunnel`합니다. 트랜잭션 증명은 calldata로 제공되어야 합니다. **matic.js를** 사용하여 증거를 생성하는 예제 스크립트를 아래에 포함시킵니다.

## 하위 터널 계약 {#child-tunnel-contract}

[여기](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseChildTunnel.sol)의 `FxBaseChildTunnel` 계약을 사용하세요. 이 계약으로 다음 함수에 액세스할 수 있습니다.

- `function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`: 이것은 로직을 구현해야 하는 가상 `RootTunnel`함수입니다.
- `function _sendMessageToRoot(bytes memory message)`: 이 함수를 내부적으로 호출해 바이트 메시지를 루트 터널로 보낼 수 있습니다.

## 기본 요건 {#prerequisites}

- 이더리움에서 루트 계약에서 `FxBaseRootTunnel`계약을 상속해야 합니다. 예를 들어, 이 [계약](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateRootTunnel.sol)을 따를 수 있습니다. 마찬가지로, Polygon에서 자녀에서 `FxBaseChildTunnel`계약을 상속하십시오. 이 [계약](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateChildTunnel.sol)을 예시로 따르세요.
- 루트 계약을 배포하는 동안
  - **Goerli** Testnet은 0**x2890bA17EfE978480615e330ecB65333b880928e **`_fxRoot`및 `_checkpointManager`**0x3d1d34f7fB6D26245E640E1c50710eFf15bA의** 주소를 전달합니다.

  - **이더리움 메인넷은** `_fxRoot`0**x86e4dc95c7fbdbf52e3d563bdbdb00823894c287이며** `_checkpointManager`**0xfe55D361bad62c541bAb87C45a0B9B018389a2입니다.**
- **뭄바이** 테스넷에 어린이 계약을 배포하려면 **0xCcf73231F28B7331BBBe3124B907840A94851f9f11을**`_fxChild` 건설업자로 통과하십시오. **Polygon****** 메인넷의 경우 0x8397259c983751DAf4040079063935a11afa28a가 될 `_fxChild`것입니다.
- 어린이 터널의 주소가 있는 배포된 루트 터널을 `setFxChildTunnel`호출하십시오. 예: [0x79cd30ace561a226258918b56ce098a08ce0c707a80ba91197f127a48b5c2](https://goerli.etherscan.io/tx/0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2)
- 루트 터널의 주소를 사용하여 배포된 아동 터널을 `setFxRootTunnel`호출하십시오. 예: [0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc4b864d2b45a8b7e98b8](https://mumbai.polygonscan.com/tx/0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8/internal-transactions)

## 상태 전송 브리지의 계약 예시 {#example-contracts-of-state-transfer-bridge}

- **계약**: [Fx-Portal Github 저장소](https://github.com/jdkanani/fx-portal/tree/main/contracts/tunnel)
- **Goerli:** [0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af](https://goerli.etherscan.io/address/0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af)
- **Mumbai:** [0xa0060Cc969d760c3FA85844676fB654Bba693C22](https://mumbai.polygonscan.com/address/0xa0060Cc969d760c3FA85844676fB654Bba693C22/transactions)

## 이더리움에서 상태 이전 → Polygon {#polygon}

- root 계약에 `_sendMessageToChild()`내부적으로 호출하고 데이터를 Polygon에 보낼 논쟁으로 전달해야 합니다. 예: [0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb420cff960537644c1](https://goerli.etherscan.io/tx/0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1)
- 하위 계약에서 `FxBaseChildTunnel`에 `_processMessageFromRoot()` 가상 함수를 구현해 이더리움에서 데이터를 검색합니다. 상태가 동기화되면 데이터가 상태 수신기에서 자동으로 수신됩니다.

## Polygon에서 상태 이전 → 이더리움에서 Eygum을 제공합니다. {#ethereum}

1. 데이터를 이더리움으로 보낼 매개변수로 사용해 하위 계약에서 내부적으로 `_sendMessageToRoot()`를 호출합니다. 예: [0x3cc9f7e675b4f6af87e9947bf24c38cbffa0b933d8c98164a2f550e6a](https://mumbai.polygonscan.com/tx/0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a/logs)

참고: 트랜잭션 해시를 참고하여 체크포인트로 포함된 후 증거를 생성하는 데 사용됩니다.

2. **rot체인에서 종료를 완료하는 증명 생성 **: **tx 해시와** **MESSAGE_SENT_EVENT_SIG를** 사용하여 증거를 생성합니다. 증거를 생성하기 위해 Polygon이 호스팅한 증명 생성 API를 사용할 수 있거나 [여기에](https://github.com/maticnetwork/proof-generation-api) 지시서에 따라 자체 증명 생성 API를 스핀화할 수 있습니다.

Polygon에서 호스팅하는 증명 생성 끝점 [여기에서](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature}) 확인할 수 있습니다.

    - `burnTxHash` is the transaction hash of the `_sendMessageToRoot()` transaction you initiated on Polygon.
    - `eventSignature` is the event signature of the event emitted by the `_sendMessageToRoot()` function. The event signature for the MESSAGE_SENT_EVENT_SIG is `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

메인넷과 테스트넷의 증명 API 사용 예는 다음과 같습니다. -

→ [Mumbai Testnet Pro 생성](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Polygon 메인넷 Pro 생성](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

3. 루트 계약에서 `_processMessageFromChild()`를 구현합니다.

4. 생성된 증명을 `receiveMessage()`에 대한 입력으로 사용해 하위 터널에서 계약으로 보낸 데이터를 검색합니다. 예: [0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b66166ef75e3515)](https://goerli.etherscan.io/tx/0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515)
