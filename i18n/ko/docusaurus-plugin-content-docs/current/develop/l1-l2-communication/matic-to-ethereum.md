---
id: matic-to-ethereum
title: Polygon에서 이더리움으로 데이터 전송하기
description: 계약을 통해 Polygon에서 이더리움으로 상태 또는 데이터 전송하기
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon에서 이더리움으로 데이터를 전송하는 메커니즘은 이더리움에서 Polygon으로 데이터를 전송하는 메커니즘과 약간 다릅니다. 이 작업에는 이더리움 체인에서 검증자가 생성한 **체크포인트** 트랜잭션이 사용됩니다. 기본적으로 처음 트랜잭션은 Polygon에서 생성됩니다. 이 트랜잭션을 생성할 때 **이벤트가 발생하는지** 그리고 **이벤트 로그가 Polygon에서 이더리움으로 이전하려는 데이터를 포함하는지** 확인해야 합니다.

시간 기간 (약 10-30분)에서 이 거래는 유효한 사람에 의해 이더리움 체인을 체크하여 표시됩니다. 체크포인트 설정이 완료되면 Polygon 체인에서 생성된 트랜잭션의 해시를 이더리움 체인의 **RootChainManager**에서 증명으로 제출할 수 있습니다. 이 계약은 트랜잭션을 검증하고, 트랜잭션이 체크포인트에 포함되어 있는지 확인하고, 마지막으로 트랜잭션의 이벤트 로그를 디코딩합니다.

이 단계가 완료되면 **디코딩된 이벤트 로그 데이터를 사용하여 이더리움 체인에 배포된 루트 계약에서 모든 변경 작업을 수행**할 수 있습니다. 이를 위해서는 이더리움에서 상태 변경이 안전한 방법으로만 이루어졌는지도 확인해야 합니다. 이에 따라 **RootChainManager** 계약에 의해서만 트리거할 수 있는 특수 계약 유형인 **조건자** 계약을 사용합니다. 이 아키텍처를 통해 Polygon의 트랜잭션이 **RootChainManager** 계약에 의해 체크포인트 설정 및 검증되는 경우에만 이더리움의 상태 변경이 발생하도록 보장할 수 있습니다.

# 개요 {#overview}

- Polygon 체인에 배포된 하위 계약에서 트랜잭션이 실행됩니다.
- 이 트랜잭션에서 이벤트도 발생합니다. 이 이벤트의 매개변수는 Polygon에서 이더리움으로 **전송해야 하는 데이터를 포함**합니다.
- Polygon 네트워크의 검증자는 특정 간격(약 10~30분)으로 이 트랜잭션을 수집하고 검증을 수행하고 이더리움의 **체크포인트에 추가**합니다.
- 체크포인트 트랜잭션은 **RootChain** 계약에서 생성되며, 체크포인트 포함 여부는 이 [스크립트](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js)를 사용하여 확인할 수 있습니다.
- 체크포인트 추가가 완료되면 **matic.js** 라이브러리를 사용하여 **RootChainManager** 계약의 **종료** 함수를 호출할 수 있습니다. **종료** 함수는 이 [예시](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/exit.js)에서와 같이 matic.js 라이브러리를 사용하여 호출할 수 있습니다.

- 스크립트를 실행하면 이더리움 체인에서 Polygon 트랜잭션 해시의 포함 여부를 검증한 다음 [조건자](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/contracts/CustomPredicate.sol) 계약의 **exitToken** 함수를 호출합니다.
- 이를 통해 **루트 체인 계약의 상태 변경**이 항상 **안전한** 방식으로 **조건자 계약을 통해서만** 완료되도록 보장할 수 있습니다.
- 중요한 점은 Polygon의 **트랜잭션 해시를 검증**하고 **조건자 계약을 트리거**하는 작업이 **단일 트랜잭션**에서 발생하므로 루트 계약의 모든 상태 변경에 보안이 보장된다는 것입니다.

# 구현 {#implementation}

Polygon에서 이더리움으로 데이터가 전송되는 방법을 보여주는 간단한 데모입니다. 이 튜토리얼은 체인을 통해 uint256 값을 전송하는 예를 보여줍니다. 그러나 데이터 유형도 전송할 수 있습니다. 단, 데이터를 바이트로 인코딩한 다음 하위 계약에서 내보내야 합니다. 최종적으로는 루트 계약에서 디코딩될 수 있습니다.

1. 먼저 루트 체인과 하위 체인 계약을 생성합니다. 상태를 변경하는 함수가 이벤트를 발생시키는지도 확인하세요. 이 이벤트는 전송할 데이터를 매개변수 중 하나로 포함해야 합니다. 아래의 샘플 형식은 하위 및 루트 계약이 갖춰야 할 형식을 보여줍니다. 하나의 데이터 변수를 가진 아주 간단한 계약이며 값은 setData 함수를 사용하여 설정됩니다. setData 함수를 호출하면 데이터 이벤트가 발생합니다. 계약의 나머지 부분은 이 튜토리얼의 다음 섹션에서 설명합니다.

A. 하위 계약

```javascript
contract Child {

    event Data(address indexed from, bytes bytes_data);

    uint256 public data;

    function setData(bytes memory bytes_data) public {
     data = abi.decode(bytes_data,(uint256));
     emit Data(msg.sender,bytes_data);
    }

}
```

B. 루트 계약

이 `0x1470E07a6dD1D11eAE439Acaa6971C941C9EF48f`를 루트 계약 생성자의 `_predicate` 값으로 전달합니다.

```javascript
contract Root {

    address public predicate;
    constructor(address _predicate) public{
        predicate=_predicate;
    }

   modifier onlyPredicate() {
        require(msg.sender == predicate);
        _;
    }

    uint256 public data;

    function setData(bytes memory bytes_data) public onlyPredicate{
        data = abi.decode(bytes_data,(uint256));
    }

}
```

2. Polygon 및 이더리움 체인에서 하위 및 루트 계약이 각각 배포되면 PoS 브리지를 사용하여 이 계약들을 매핑해야 합니다. 이 매핑을 통해 이 두 계약의 체인 간 연결이 유지될 수 있습니다. 이 매핑을 수행하려면 [discord](https://discord.com/invite/0xPolygon)에서 Polygon 팀에 문의하세요.

3. 주목해야 할 한 가지 중요한 점은 루트 계약에 onlyPredicate 한정자가 있다는 것입니다. 항상 이 한정자를 사용하는 것이 좋습니다. 조건자 계약에 의해서만 루트 계약의 상태가 변경되도록 보장할 수 있기 때문입니다. 조건자 계약은 Polygon 체인에서 발생한 트랜잭션이 이더리움 체인에서 RootChainManager에 의해 검증되는 경우에만 루트 계약을 트리거하는 특수 계약입니다. 루트 계약에서 안전한 상태 변경을 보장합니다.

위의 구현을 테스트하기 위해 하위 계약의 **setData** 함수를 호출하여 Polygon 체인에서 트랜잭션을 생성할 수 있습니다. 이 시점에서는 체크포인트가 완료되기를 기다려야 합니다. 체크포인트 포함 여부는 이 [스크립트](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js)를 사용하여 확인할 수 있습니다. 체크포인트가 완료되면 matic.js SDK를 사용하여 RootChainManager의 종료 함수를 호출합니다.

```jsx
const txHash =
  "0xc094de3b7abd29f23a23549d9484e9c6bddb2542e2cc0aa605221cb55548951c";

const logEventSignature =
  "0x93f3e547dcb3ce9c356bb293f12e44f70fc24105d675b782bd639333aab70df7";

const execute = async () => {
  try {
    const tx = await maticPOSClient.posRootChainManager.exit(
      txHash,
      logEventSignature
    );
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};
```

위의 스크린샷에서 볼 수 있듯, **txHash**는 Polygon 체인에 배포된 하위 계약에서 발생한 트랜잭션의 트랜잭션 해시입니다.

**logEventSignature**는 데이터 이벤트의 keccack-256 해시로, 조건자 계약에 포함한 것과 동일한 해시입니다. 이 튜토리얼과 종료 스크립트에 사용된 모든 계약 코드는 [여기](https://github.com/rahuldamodar94/matic-learn-pos/tree/transfer-matic-ethereum)에서 찾을 수 있습니다.

종료 스크립트가 완료되면 이더리움 체인의 루트 계약을 쿼리하여 하위 계약에서 설정한 변수 **데이터**의 값이 루트 계약의 **데이터** 변수에도 반영되었는지 검증할 수 있습니다.
