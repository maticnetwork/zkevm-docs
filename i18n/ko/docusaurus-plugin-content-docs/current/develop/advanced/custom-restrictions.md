---
id: custom-restrictions
title: 사용자 지정 제한 사항 (ERC20/ERC721)
#sidebar_label: Adding
description: Matic에서 다음 블록체인앱을 만듭니다.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

**폴리곤의 ERC20 토큰에 사용자 지정 제한을 추가하는 방법**

폴리곤 체인의 ERC20 토큰은 표준 컨트랙트이며, 폴리곤에 새로운 ERC20 토큰을 등록하는 동안 플라즈마 루트 체인 컨트랙트에 의해 자동 배포됩니다. 모든 상태 전환이 루트 체인 컨트랙트의 사기 증거에 매핑되도록 하기 위해 수정할 수 없습니다. 기본적으로 이러한 컨트랙트는 이더리움 네트워크와 동일한 보안을 유지할 수 있습니다.

그러나 실제 시나리오에서 ERC20 토큰 소유자는 컨트랙트, 특히 `transfer` 함수에 사용자 지정 제한을 추가해야 할 수 있습니다.

**TL;DR**

- IParentToken 인터페이스(https://github.com/maticnetwork/contracts/blob/master/ contracts/child/misc/IParentToken.sol)구현에서 `beforeTransfer` 기능을 구현하고 폴리곤 체인에 배포합니다.

**이 페이지에서는 ERC20 토큰에 사용자 지정 전송 제한을 추가하는 프로세스를 자세히 설명합니다:**

- ERC20 토큰이 폴리곤에 추가/매핑될 때 루트 컨트랙트(링크)의 기능은 다음을 기대합니다
    - 루트체인 토큰 컨트랙트 주소,
    - 토큰에 대한 메타데이터 및
    - 소유자 주소

    이것은 또한 루트 토큰 컨트랙트에 대한 매핑과 함께 해당 표준 ERC20 토큰 컨트랙트를 폴리곤 체인에 자동 배포합니다. 또한 소유자 주소를 제공해야 나중에 추가 컨트랙트 배포를 승인할 수 있습니다. 이를 통해 ERC20 토큰 소유자는 폴리곤 체인의 컨트랙트에 전송 제한을 추가할 수 있습니다.

- ERC20 토큰의 표준 `transfer` 함수에서 사용자 정의 논리를 정의하려면 `IParentToken` 인터페이스를 구현해야 합니다. 여기 링크 참조 - https://github.com/maticnetwork/contracts/blob/master/contracts/child/misc/IParentToken.sol

- `beforeTransfer` 후크 함수는 각 전송 전에 사용자 정의 로직을 실행할 수 있는 곳입니다.
- 이행된 컨트랙트는 반드시
    - 이 인터페이스를 따라야 하며,
    - `bool` 값을 반환하고
    - ERC20 컨트랙트의 경우 `require` 문이 없어야 하며 대신 `false`를 반환해야 합니다.
- 다음은 샘플 `IParentToken` 컨트랙트 구현입니다:

<script src="https://gist.github.com/anurag-arjun/c7382e2abaf0822e6ec7e988eb46c92e.js"></script>

- 토큰 등록 시 제공된 소유자 주소만 폴리곤의 표준 ChildToken 컨트랙트에서 상위 컨트랙트 주소(`beforeTransfer` 후크를 사용한 `IParentToken` 구현)를 추가/업데이트할 수 있습니다.
- 참고로, 레지스트리 컨트랙트(https://github.com/maticnetwork/contracts/blob/ master/contracts/common/Registry.sol)에서 `rootToChildToken` 매핑을 쿼리하여 표준 ChildToken 컨트랙트(폴리곤 루트 컨트랙트에 의해 자동 배포)의 주소를 얻을 수 있습니다.

    ```solidity
    contract Registry is Governable {
    mapping(bytes32 => address) contractMap;
    mapping(address => address) public rootToChildToken;
    mapping(address => address) public childToRootToken;
    ...
    }
    ```

- 이러한 방식으로 구현된 상위 컨트랙트의 소유권(`beforeTransfer` 후크를 사용한 `IParentToken` 구현)은 폴리곤 체인의 ChildERC20 컨트랙트에서 `setParent` 함수를 호출하여 이전할 수 있습니다 - 참고 https://github.com/maticnetwork/contracts/blob/master/contracts/child/ChildERC20.sol

    ```js
    function setParent(address _parent) public isParentOwner {
        require(_parent != address(0x0));
        parent = _parent;
    }
    ```