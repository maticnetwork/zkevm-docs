---
id: bandchainadvanced
title: 고도화된 BandChain
sidebar_label: 고도화
description: 폴리곤에서 다음 블록체인 앱을 만듭니다.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

스마트 계약에는 Dapp이 작동하는 데 기반을 둔 일련의 로직이 포함되어 있습니다. 그러나 사용자 입력에만 의존할 수 없으며 로직을 강화하기 위해 외부 정보가 필요합니다. BandChain은 외부 웹 API와 통신하는 데 사용할 수 있는 일련의 오라클 스크립트를 제공합니다. 분산형 BandChain 네트워크에서 데이터를 받으면 필요할 때 dApp에서 사용할 수 있습니다.

<img src={useBaseUrl("img/bandchain/bandchain.png")} />

위의 아키텍처에서 전체 프로세스를 명확하게 이해할 수 있습니다. 처음에는 BandChain 네트워크에 요청이 이루어집니다. 네트워크에서 응답을 수신하는 데 약간의 지연이 있을 것입니다. 이 응답은 폴리곤에 배포될 검증 컨트랙트에 저장되어야 합니다. 이 검증 컨트랙트는 이미 폴리곤에 배포된 BandChain 컨트랙트와는 다릅니다. 따라서 이 검증 컨트랙트가 배포되면, 필요할 때 검증 컨트랙트의 상태 변수에서 외부 웹 API 응답 데이터를 업데이트할 수 있습니다. 이 검증 컨트랙트는 BandChain 컨트랙트를 사용하여 저장되는 데이터의 유효성을 검증합니다. dApp은 외부 세계에서 데이터를 가져와야 할 때 언제든지 이 검증 컨트랙트를 쿼리할 수 있습니다. 다음 단계는 이 아키텍처를 더 나은 방식으로 이해하는 데 도움이 될 것입니다.

 **1.** **오라클 스크립트 선택하기**

이러한 Oracle 스크립트는 외부 데이터를 쿼리하는 데 필요합니다. 스크립트는 요청하려는 데이터를 고유하게 식별합니다. [http://scan.alpha.bandchain.org](http://scan.alpha.bandchain.org/)로 이동합니다. 거기에서 BandChain에 대한 정보가 있는 탐색기를 찾을 수 있습니다. 다음으로 오른쪽 상단 모서리에 있는 링크를 사용하여 Oracle Scripts 페이지를 방문합니다. [http://scan.alpha.bandchain.org/scripts](http://scan.alpha.bandchain.org/scripts)에서 직접 oracle 스크립트를 방문할 수도 있습니다. 여기에서 몇 가지 내장된 Oracle 스크립트를 볼 수 있습니다. 난수 생성기 예제를 사용하여 전체 프로세스를 설명합니다. random_u64로 레이블이 지정된 Random 생성기 oracle 스크립트를 클릭해 보겠습니다.

<img src={useBaseUrl("img/bandchain/oraclescripts.png")} />

 **2. 스크립트 실행하기**

스크립트를 클릭하면 스크립트의 세부 정보를 볼 수 있는 다른 페이지로 이동됩니다. 스크립트 해시는 `0xe7944e5e24dc856dcb6d9926460926ec10b9b66cf44b664f9971b5a5e9255989`입니다. 다른 세부 정보에는 스크립트와 관련된 최근 트랜잭션, 스크립트 코드 및 실행이라는 탭이 포함됩니다. 이 탭으로 이동하면 이 스크립트를 실행할 수 있습니다. max_range 매개변수에 숫자 값을 전달해야 합니다. 이 매개변수는 난수의 최대 범위를 나타냅니다 요청 보내기를 클릭하면 몇 초 안에 해시가 생성됩니다.

<img src={useBaseUrl("img/bandchain/executeoracle.png")} />

해시를 클릭하면 요청 결과를 보여주는 다른 페이지로 이동됩니다. 여기에서 데이터 요청 메시지를 클릭해야 응답의 전체 세부 정보와 BandChain의 유효성 증명을 볼 수 있는 다른 페이지로 이동합니다. 여기에서 타임스탬프와 함께 생성되는 난수를 볼 수도 있습니다. 유효성 증명 탭에서 이더리움에 대한 증명 복사를 클릭하면 BandChain이 지원하는 모든 EVM 호환 블록체인에서 작동하는 페이로드가 생성됩니다. 이 페이로드는 검증 컨트랙트의 상태 변수를 업데이트하는 데 사용해야 합니다.

<img src={useBaseUrl("img/bandchain/copyproof.png")} />

이것은 오라클 요청을 하는 한 가지 방법입니다. 여기서는 탐색기를 사용했습니다. Bandchain REST API를 사용하여 요청하는 또 다른 방법이 있습니다.

요청을 위한 API 엔드포인트는 [http://rpc.alpha.bandchain.org/bandsv/request](http://rpc.alpha.bandchain.org/bandsv/request)입니다. 이것은 axios와 같은 HTTP 클라이언트 라이브러리를 사용하여 dApp에서 직접 액세스할 수 있습니다. 이 예에서는 API 끝점을 테스트하는 데 매우 유용한 도구인 Postman이라는 도구를 사용할 것입니다. [https://www.postman.com](https://www.postman.com/)에서 직접 다운로드할 수 있습니다. 다운로드가 완료되면 Postman 애플리케이션을 설치하고 모든 유형의 HTTP 요청을 시작할 수 있습니다. Oracle 요청 API는 application/json 형식의 본문 매개변수를 수락하는 POST 메서드입니다. 기본적으로 세 가지 매개변수가 있습니다.

A. 유형 - 문자열 유형이며 "동기(Synchronous)" | "비동기(Asynchronous)" | "Full"값을 사용할 수 있습니다. dApp에서 요청할 때 "FULL" 모드를 사용하는 것이 좋습니다.

B. params -  유형 객체입니다. 임의 생성기 예제에는 {"max_range": "100"} 같은 매개변수가 필요합니다.

C. codeHash: 문자열 타입이며 오라클 스크립트를 값으로 받아들입니다. 이 예에서 이 필드의 값은 `0xe7944e5e24dc856dcb6d9926460926ec10b9b66cf44b664f9971b5a5e9255989`입니다. 오라클 스크립트가 있는 경우 '0x'를 제거해야 합니다.

전체 페이로드와 요청은 다음과 같습니다.

<img src={useBaseUrl("img/bandchain/requestapi.png")} />

포스트 맨에서는 난수, 타임스탬프 및 유효성 증명이 포함된 응답을 얻기 위해 위와 같이 요청합니다. 또한 다음 단계에서 검증 컨트랙트의 상태 변수를 업데이트하는 데 필요한 페이로드인 응답에 evmProofBytes라는 필드가 있습니다. 위의 요청에서 오라클 스크립트와 매개변수 객체를 교체하여 다양한 내장 오라클 스크립트에 요청할 수 있습니다.

**3. 스마트 컨트랙트에서 데이터 이용하기**

이것은 실제로 폴리곤의 검증 컨트랙트에 데이터를 저장하는 단계입니다. 저장하기 전에 검증 컨트랙트를 배포해야 합니다. 그래서 이것은 검증 컨트랙트가 보여지는 모습입니다.

```jsx
pragma solidity 0.5.14;
pragma experimental ABIEncoderV2;

import "BandChainLib.sol";
import "IBridge.sol";

contract RandomNumber {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public randomNumber;
    uint256 public lastUpdate;

    constructor(bytes32 _codeHash, bytes memory _params, IBridge _bridge)
        public
    {
        codeHash = _codeHash;
        params = _params;
        bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
        IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(
            _reportPrice
        );
        uint64[] memory decodedInfo = result.data.toUint64List();

        require(result.codeHash == codeHash, "INVALID_CODEHASH");
        require(
            keccak256(result.params) == keccak256(params),
            "INVALID_PARAMS"
        );
        require(
            uint256(decodedInfo[1]) > lastUpdate,
            "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE"
        );

        randomNumber = uint256(decodedInfo[0]);
        lastUpdate = uint256(decodedInfo[1]);
    }
}
```

이 계약에는 난수 값과 마지막 업데이트 시간의 타임스탬프를 각각 저장하기 위해 randomNumber 및 lastUpdated라는 두 가지 상태 변수가 있다는 점에 유의하는 것이 중요합니다. RandomNumber 계약은 도우미 라이브러리 및 인터페이스인 BandChainLib.sol 및 IBridge.sol도 가져와야 합니다. 이 두 도우미는 유효성 검사 계약을 생성하는 데 필수입니다. [https://docs.bandchain.org/references/bandchainlib-library](https://docs.bandchain.org/references/bandchainlib-library) 및 [https://docs.bandchain.org/references/ibridge-interface](https://docs.bandchain.org/references/ibridge-interface)에서 각각 찾을 수 있습니다.

두 파일을 기본 솔리디티 계약으로 가져오면 리믹스로 이동하여 해당 콘텐츠로 RandomNumber.sol, IBridgesol 및 BandChainLib.sol 세 개의 솔리디티 파일을 생성할 수 있습니다. 위의 예제가 작동하려면 컴파일러 버전을 0.5.14로 변경하십시오. 약을 컴파일하고 폴리곤 TestnetV3인 [https://testnetv3.matic.network](https://testnetv3.matic.network/)를 가리키도록 메타마스크 RPC를 설정합니다. 메타마스크를 구성하는 데 어려움이 있는 경우 이 [자습서](/docs/develop/metamask/config-polygon-on-metamask)를 따를 수 있습니다.

<img src={useBaseUrl("img/bandchain/cmpilecontract.png")} />

컴파일이 성공하면 다음 단계는 RandomNumber 계약을 배포하는 것입니다. 이 계약은 생성자 인수에 3개의 매개변수를 사용합니다. 첫 번째 매개변수는 오라클 스크립트 해시를 값으로 사용하는 codeHash 매개변수입니다. 따라서 이 예에서는 `0xe7944e5e24dc856dcb6d9926460926ec10b9b66cf44b664f9971b5a5e9255989`를 해시 값으로 사용해야 합니다. 두 번째 매개변수는 오라클 요청에 대해 직렬화된 매개변수 문자열을 취하는 params입니다. 바이트 형식의 직렬화된 문자열을 얻기 위해 Bandchain은 [http://rpc.alpha.bandchain.org/zoracle/serialize_params/:codeHash](http://rpc.alpha.bandchain.org/zoracle/serialize_params/:codeHash) 끝점이 있는 API를 제공합니다. axios와 같은 HTTP 클라이언트 라이브러리를 사용하여 적중할 수 있는 GET 메소드입니다. 이 예에서는 Postman 도구를 사용하여 이 API를 조회합니다. URL의 ':codeHash'는 오라클 스크립트 해시로 대체될 수 있으며 param 개체(바이트로 변환될)는 params 키를 사용하여 이 끝점에 쿼리 매개변수로 전달할 수 있습니다. 이 예에서 Postman GET 요청은 다음과 같습니다.

<img src={useBaseUrl("img/bandchain/bytesapi.png")} />

위 API 응답의 결과 키 값은 단순히 0x를 추가하여 16진수로 변환할 될 수 있습니다. 이 예에서 최종 16진수 값은 0x0000000000000064가 됩니다. params 개체의 max_range 키에 값으로 100을 전달했습니다. max_range의 값은 2단계에서 오라클 요청 시 사용한 값과 같아야 합니다. 세 번째 매개변수는 폴리곤 TesntetV3에 이미 배포된 BandChain 컨트랙트의 컨트랙트 주소를 값으로 받는 브릿지입니다. BandChain 계약의 계약 주소는 `0x3ba819b03fb8d34995f68304946eefa6dcff7cbf`입니다.

<img src={useBaseUrl("img/bandchain/deploycontract.png")} />

이제 컨트랙트를 배포할 수 있습니다. 배포가 성공하면 컨트랙트의 업데이트 메소드를 사용하여 필요할 때 randomNumber 상태 변수의 값을 업데이트할 수 있습니다. 여기에 BandChain의 마법의 고기가 있습니다. 업데이트 기능은 BandChain에서 요청한 데이터를 사용하는 하나의 매개변수 바이트 memory_reportPrice만 사용합니다. 2단계로 돌아가면 BandChain 네트워크를 요청할 때 페이로드를 수신했음을 알 수 있습니다. 그것은 응답 객체의 evmProofBytes 값이 될 것입니다. 시작 부분에 0x를 추가하여 16진수로 변환해야 합니다. 이것은 마지막으로 컨트랙트의 업데이트 메소드에 전달됩니다. 아래 이미지에서 randomNumber의 초기 값이 59임을 알 수 있습니다.

<img src={useBaseUrl("img/bandchain/update.png")} />

다음으로 _reportPrice에서 요청 정보를 디코딩해야 합니다. 요청의 데이터, codeHash 및 매개변수를 포함하는 IBridge.VerifyOracleDataResult 구조체를 반환하는 IBridge.relayAndVerify 함수를 사용하여 이를 수행합니다. 이 경우 난수와 타임스탬프인 데이터를 읽기 위해 result.data 바이트에 BandChainLib.toUint64List를 사용합니다.

데이터의 무결성을 확인하기 위해, 요청의 codeHash 및 params가 생성자에서 지정한 것과 일치하는지 확인합니다. 마지막으로 계약이 항상 최신 타임스탬프로만 가격을 업데이트하는지 확인합니다.

이제 데이터를 디코딩하고 해당 ID를 확인하고 난수 값 업데이트 조건을 확인했습니다. 이제 BandChain에서 얻은 난수 값과 타임스탬프로 스마트 컨트랙트 상태를 업데이트할 수 있습니다. update 메소드를 실행한 후 randomNumber의 값이 이제 17로 변경되었음을 알 수 있습니다.

<img src={useBaseUrl("img/bandchain/updated.png")} />

이제 임의의 숫자가 필요할 때마다 dapp은 "동일한 매개변수를 사용하는" BandChain API에 도달하고 새 evmProof를 가져와 검증 컨트랙트를 업데이트하는 데 사용해야 합니다. 그런다음 검증 컨트랙트는 난수 값에 액세스하는 dapp에 의해 쿼리될 수 있습니다. 상태 변수가 업데이트될 때마다 업데이트될 값은 폴리곤에 이미 배포된 BandChain 컨트랙트에 의해 검증됩니다.

이 예는 난수 값이 필요할 때 저장되고 업데이트되는 방법을 보여주었습니다. 이 값은 dApp에서 스마트 계약 논리를 강화하는 데 사용할 수 있습니다. 마찬가지로 다른 유효성 검사 계약을 만들어 여러 값을 저장할 수 있습니다. Bandchain은 여러 내장 오라클 스크립트를 제공합니다. 또한 truffle을 사용하여 검증 컨트랙트를 배포하고 web3를 사용하여 리믹스를 사용하는 대신 컨트랙트와 상호 작용할 수 있습니다.