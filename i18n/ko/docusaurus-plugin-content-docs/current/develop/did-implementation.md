---
id: did-implementation
title: Polygon DID 구현
sidebar_label: Identity
description: Polygon에서 DID를 구현하는 방법에 관해 자세히 알아봅니다.
keywords:
  - docs
  - polygon
  - matic
  - DID
  - identity
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: did-implementation/getting-started
---

Polygon 팀에서 게시한 구현 패키지를 사용해 Polygon 장부에서 Polygon DID를 생성 및 게시하려는 사용자를 위해 마련된 시작 가이드입니다.

Polygon DID 메서드 구현은 3가지 패키지, 즉 polygon-did-registrar, polygon-did-resolver 및 polygon-did-registry-contract로 구성됩니다. Polygon 네트워크에 DID를 등록하거나 읽는 기능을 통합하려는 사용자는 다음 가이드를 사용할 수 있습니다.

DID는 본질적으로 고유한 식별자로써, 중앙 권한이 존재하지 않는 상태로 생성되었습니다.  자격 증명의 맥락에서 DID는 문서에 서명하기 위해 사용되므로, 필요한 경우 사용자는 문서의 소유권을 쉽게 증명할 수 있습니다.

## Polygon DID 메서드 {#polygon-did-method}

Polygon DID 메서드 정의는 DID-핵심 사양 및 표준을 따릅니다. DID URI는 콜론으로 구분된 3가지 구성 요소, 즉 스킴, 메서드 이름, 마지막으로 메서드 고유 식별자로 구성됩니다. Polygon의 경우 URI는 다음과 같습니다.

```
did:polygon:<Ethereum address>
```

다음은 SEE-XEX `did``polygon`어드레스입니다.

## Polygon DID 구현 {#polygon-did-implementation}

Polygon DID는 두 가지 패키지를 사용해 구현할 수 있으며, 사용자는 각각의 npm 라이브러리를 가져와 각 애플리케이션에 Polygon DID 방법론을 통합하는 데 사용할 수 있습니다. 구현에 관한 자세한 내용은 다음 섹션에서 설명합니다.

시작하려면 먼저 DID를 생성해야 합니다. Polygon DID의 경우 생성은 두 단계의 캡슐화(먼저 사용자가 DID URI을 생성한 다음, Polygon 장부에 등록해야 함)로 이루어집니다.

### DID 생성 {#create-did}

프로젝트에서 Polygon DYURI를 만들려면 먼저 설치할 필요가 있습니다.

```
npm i @ayanworks/polygon-did-registrar --save
```

설치가 완료되면 사용자는 다음과 같이 사용할 수 있습니다.

```
import { createDID } from "polygon-did-registrar";
```

이 `createdDID`함수는 사용자가 DID URI를 생성하는 데 도움이 됩니다. DID를 생성할 때 다음 두 가지 상황이 있을 수 있습니다.

  1. 사용자가 이미 지갑을 소유하고 있으며 동일한 지갑에 해당하는 DID를 생성하려고 합니다.

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network, privateKey);
    ```

  2. 사용자가 기존 지갑을 가지고 있지 않고 하나를 만들고 싶다면 사용자가 사용할 수 있습니다.

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network);
    ```

두 경우 모두 네트워크 파라미터는 사용자가 Polygon Mumbai Testnet 또는 Polygon Mainnet에서 DID를 만들고 싶은지 여부를 나타냅니다.

샘플 입력:

```
network :"testnet | mainnet"
privateKey? : "0x....."
```

DID를 만든 후 DIDI 생성 후 DID URI를 생성합니다.

```
DID mainnet: did:polygon:0x...
DID testnet: did:polygon:testnet:0x...
```

### 레지스터가 그랬습니다 {#register-did}

DID URI 및 해당 DID 문서를 RESEARD에 등록하려면 사용자가 먼저 다음과 `polygon-did-registrar`같이 사용할 필요가 있습니다.

```js
import { registerDID } from "polygon-did-registrar";
```

DID를 등록하기 위한 전제 조건으로 사용자는 D에 지갑 corrponing을 사용할 수 있도록 해야 합니다. 사용자가 지갑에서 토큰의 밸런스를 가지고 있으면 아래 표시된 레지스터에 전화를 걸어 주십시오.

```js
const txHash = await registerDID(did, privateKey, url?, contractAddress?);
```

인자 `did``privateKey`및 필수 인자 중 `url`인자 및 인자를 입력하는 것이 선택적인 반면, 인자 인자 및 인자를 입력할 수 있습니다.`contractAddress` 사용자가 마지막 두 매개변수를 제공하지 않으면, 라이브러리는 DID URI에서 네트워크 기본 구성을 선택합니다.

모든 파라미터가 사양에 부합하고 모든 파라미터가 올바른 순서로 주어지면 `registerDID`함수는 트랜잭션 해시를 반환하고 해당 에러가 그렇지 않으면 반환됩니다.

그리고 이 작업을 통해 Polygon 네트워크에 DID를 등록하는 작업을 성공적으로 완료했습니다.

## DID의 DID 문서로의 전환 {#resolve-did}

다음 라이브러리를 설치하십시오.

```bash
npm i @ayanworks/polygon-did-resolver --save
npm i did-resolver --save
```

장부에 등록된 DID 문서를 읽으려면, DID Polygon URI가 있는 사용자 누구든지 먼저 프로젝트로 가져올 수 있습니다.

```js
import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
```

패키지를 수입한 후 DID 문서를 사용하여 검색할 수 있습니다.

```js
const myResolver = didPolygon.getResolver()
const resolver = new DIDResolver(myResolver)

const didResolutionResult = this.resolver.resolve(did)
```

`didResolutionResult`객체의 경우 다음과 같습니다.

```js
didResolutionResult:
{
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata
}
```

사용자가 DID를 DID 문서로 전환하려고 하는 동안 가스 비용이 들지 않습니다.

## DID 문서 업데이트 {#update-did-document}

프로젝트를 업데이트할 수 있는 능력을 갖춘 프로젝트를 캡슐화하려면 사용자가 먼저 다음과 `polygon-did-registrar`같이 사용할 필요가 있습니다.

```js
import { updateDidDoc } from "polygon-did-registrar";
```

다음으로, 함수를 호출합니다.

```js
const txHash = await updateDidDoc(did, didDoc, privateKey, url?, contractAddress?);
```

DID 문서를 업데이트하는 데 ID의 소유자만이 요청을 보낼 수 있다는 점에 유의해야 합니다. 여기에서 비공개 키에 해당하는 매틱 토큰이 있어야 합니다.

사용자가 `url` 및 `contractAddress`를 사용한 구성을 제공하지 않는 경우, 라이브러리는 DID URI에서 네트워크 기본 구성을 선택합니다.

## DID 문서 삭제 {#delete-did-document}

Polygon 구현으로 사용자는 DID 문서를 Regeser에서 취소 할 수 있습니다. 사용자는 먼저 다음과 `polygon-did-registrar`같이 사용할 필요가 있습니다.

```js
import { deleteDidDoc } from "polygon-did-registrar";
```

그리고 나서 다음을 사용합니다.

```js
const txHash = await deleteDidDoc(did, privateKey, url?, contractAddress?);
```

매개변수 중 `url` 및 `contractAddress`는 선택적 매개변수이며, 사용자가 제공하지 않는 경우 DID URI에 따라 함수에서 기본 구성을 선택합니다.

DID의 네트워크 구성에 따라 비공개 키에 필요한 매틱 토큰이 있어야 하며, 그렇지 않은 경우 트랜잭션이 실패합니다.

## 저장소에 기여하기 {#contributing-to-the-repository}

표준 포크, 분기, 가져오기 요청 워크플로를 사용하여 저장소에 변경을 제안하세요. 예를 들어, 문제 또는 버그 번호를 포함하여 지점 이름을 알리십시오.

```
https://github.com/ayanworks/polygon-did-registrar
https://github.com/ayanworks/polygon-did-resolver
```
