---
id: bandchain
title: BandChain
sidebar_label: BandChain
description: BandChain은 전통적인 웹 API에서 데이터를 질의하기 위해 데이터 오라클을 위해 지어진 고성능 블록체입니다.
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

밴드 프로토콜을 사용하면 기존 웹 API에서 데이터를 쿼리하여 블록체인에서 사용할 수 있습니다. 개발자는 오라클 요청 및 지불을 용이하게 하기 위해 **아늑한 블록체인 인** BandChain을 통해 쿼리를 만들고 인터 체인 통신을 통해 dApp에 대한 데이터를 사용할 수 있습니다. 다음과 같이 간단한 3단계를 밟아 오라클 데이터를 통합할 수 있습니다.

1. **오라클 스크립트 선택**

    오라클 스크립트는 밴드 체인에서 요청하는 데이터 유형을 고유하게 식별하는 해시입니다. 이 스크립트는 [**여기**](https://guanyu-devnet.cosmoscan.io/oracle-scripts)에서 찾을 수 있습니다. 이러한 스크립트는 오라클 요청을 만드는 동안 파라미터 중 하나로 사용됩니다.

2. **BandChain에서 데이터 요청**

이것은 두 가지 방법으로 수행됩니다.

    - **BandChain 탐험가를 사용하여**

    선택한 오라클스크립트를 클릭하면 인정한 다음 **실행** 탭에서 파라미터를 넘겨서 BandChain에서 응답을 받을 수 있습니다. 응답에는 결과와 더불어 evm 증명이 포함됩니다. 이 증명을 복사해야 합니다. 최종 단계에서 사용됩니다. 탐험을 사용하여 오라클을 질의하는 BandChain docs는 [**여기에서**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer) 확인할 수 있습니다.

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    위의 주어진 예는 난수 값을 얻기 위해 오라클 요청을 하는 한 예입니다. 값 100은 오라클 요청의 `max_range`파라미터에 전달됩니다. 응답에서 해시를 받습니다. 이 해시를 클릭하면 응답의 전체 세부 정보가 표시됩니다.

    - **BandChain-Devnet JS 라이브러리 사용하기**

    BandChain-Devnet 라이브러리를 사용하여 직접 질의 BandChain을 요청할 수 있습니다. 쿼리하면 응답에서 **evm 증명**을 제공합니다. 이 증명은 BandChain 통합의 최종 단계에서 사용될 수 있습니다. BandChain-Devnet JS 라이브러리를 사용하여 오라클을 질의하는 BandChain docs는 [**여기에서**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library) 확인할 수 있습니다. 난수 오라클에 대한 요청 페이로드는 다음과 같습니다. 요청 본문이 application/json 형식으로 전달되었는지 확인하십시오.

3. **스마트 계약에서 데이터 사용하기**

  마지막 단계는 유효성 검사 계약을 배포하고 오라클 요청의 응답을 유효성 검사 계약 상태 변수에 저장하는 것입니다. 이러한 상태 변수가 설정되면, dApp에서 필요할 때 액세스할 수 있습니다. 또한 이러한 상태 변수는 dApp에서 오라클 스크립트를 다시 쿼리하여 새로운 값으로 업데이트할 수 있습니다. 아래 주어진 것은 난수 오라클 스크립트를 사용하여 난수 값을 저장하는 유효성 검사 계약입니다.

  ```jsx
  pragma solidity 0.5.14;
  pragma experimental ABIEncoderV2;

  import "BandChainLib.sol";
  import "IBridge.sol";

  contract SimplePriceDatabase {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    constructor(
      bytes32 _codeHash ,
      bytes memory _params,
      IBridge _bridge
    ) public {
      codeHash = _codeHash;
      params = _params;
      bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
      IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
      uint64[] memory decodedInfo = result.data.toUint64List();

      require(result.codeHash == codeHash, "INVALID_CODEHASH");
      require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
      require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

      latestPrice = uint256(decodedInfo[0]);
      lastUpdate = uint256(decodedInfo[1]);
    }
  }
  ```

배포시 3개의 파라미터를 통과해야 합니다. **첫 번째 파라미터는** 오라클스크립트 해시인 첫 번째 파라미터가 바로 아까의 `codeHash`파라미터가 됩니다. **두 번째 파라미터는** 오라클스크립트 요청 파라미터 객체입니다. 이것은 바이트 형식으로 전달되어야 합니다. BandChain은 파라미터 JSON 객체를 바이트 형식으로 변환하는 REST API를 제공합니다. 이 API 세부 사항은 [**여기**](https://docs.bandchain.org/references/encoding-params)에서 확인할 수 있습니다. 이 API에서 받은 응답에 0x를 추가해야 합니다. **세 번째 파라미터는** Polygon 네트워크에 이미 배포된 BandChain 계약의 계약 주소입니다. 밴드 프로토콜은 Polygon TestnetV3: 0x3ba819b03fb8d34995f68304946efa6dcff7cbf를 지원합니다.

주목할 것은 유효성 검사 계약이 각각 `BandChainLib.sol`호출되어 있는 도우미 라이브러리 및 인터페이스를 가져오어야 한다는 `IBridge.sol`것입니다. 다음 링크에서 볼 수 있습니다. [**밴드체인**](https://docs.bandchain.org/references/bandchainlib-library) 라이브러리 및 [**IBridge**](https://docs.bandchain.org/references/ibridge-interface) 인터페이스에서,

  유효성 검사 계약이 배포되면, dApp에서 쿼리하여 상태 변수에 액세스할 수 있습니다. 마찬가지로 여러 개의 유효성 검사 계약이 다른 인내 오라클 스크립트를 위해 생성 될 수 있습니다. IBridge 인터페이스에는 검증 계약에서 매번 업데이트되는 값을 확인하는 `relayAndVerify()`방법이 있습니다. 유효성 검사 계약의 `update()`방법은 상태 변수를 업데이트하는 로직이 있습니다. 오라클스크립트를 질의하는 EVM 증명을 이 방법에 전달해야 `update()`합니다. 값이 업데이트될 때마다 Polygon에 배포된 BandChain 계약이 계약 상태 변수에 저장되기 전에 데이터를 확인합니다.

BandChain은 dApp에 의해 사용할 수 있는 분산 된 Aracces의 네트워크를 제공하여 스마트 계약 로직을 강화하기 위해 스마트 계약 로직을 제공합니다. 계약을 배포하고, 값을 저장하고, 업데이트 중인 BandChain docs는 [**여기에서**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library) 확인할 수 있습니다.