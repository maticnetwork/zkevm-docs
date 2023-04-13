---
id: account_based_plasma
title: 계정 기반 플라즈마
description: 플라즈마의 계정 기반 구현
keywords:
  - docs
  - matic
  - Account Based Plasma
  - polygon
  - implementation
image: https://matic.network/banners/matic-network-16x9.png
---

# 계정 기반 플라즈마 {#account-based-plasma}

Polygon 플라즈마는 [Plasma MoreVP](https://ethresear.ch/t/more-viable-plasma/2160)와 유사한 모델을 따르지만, 다른 UTXO 기반 구현과 대조되는 **계정 기반** 구현입니다. 사이드체인은 EVM과 호환됩니다. MoreVP 구조를 사용하면 확인 서명이 필요하지 않습니다.

## PoS 계층 및 체크포인트 {#pos-layer-and-checkpoints}

Polygon 네트워크는 듀얼 전략(체크포인트 계층의 스테이크 증명 및 블록프로듀서 계층의 블록프로듀서)을 사용하여 더 빠른 블록타임을 달성하고 체크포인트 및 사기 증명을 사용하여 메인 체인에서 최종성을 확보합니다.

Polygon 네트워크의 체크포인트 층에서, (충분히 본딩된) 유효성 검사자는 블록 층의 모든 블록에 유효성 검사를 수행하고 마지막 체크포인트 이후 블록 해시의 머클 트리를 생성한 후, Polygon 네트워크 블록 계층의 매 수개 블록마다 메인 체인에 체크포인트를 생성합니다.

메인 체인에서 최종성을 제공하는 것 외에도 체크포인트는 사용자 인출 시 토큰의 소각 증명(인출)을 포함하므로 인출에 중요한 역할을 합니다. 이를 통해 사용자는 패트리샤 머클 증명 및 헤더 블록 증명을 사용하여 루트 계약에 남아 있는 토큰을 증명할 수 있습니다. 잔여 토큰을 증명하기 위해서는 헤더 블록이 PoS(이해관계자)를 통해 루트 체인에 커밋되어야 한다는 것에 유의하세요. 인출 프로세스에는 통상적으로 이더리움 가스 요금이 발생합니다. Polygon은 종료 게임을 하는데 체크포인트를 많이 활용합니다.

## UTXO와 유사한 이벤트 로그 {#utxo-like-event-logs}

ERC20/ERC721 이전은 UTXO와 유사한 이벤트 로그 데이터 구조를 사용하여 수행됩니다. 아래는 참고용 `LogTransfer`이벤트입니다.

```jsx
event LogTransfer(
    address indexed token,
    address indexed from,
    address indexed to,
    uint256 amountOrTokenId,
    uint256 input1, // previous account balance of the sender
    uint256 input2, // previous account balance of the receiver
    uint256 output1, // new account balance of the sender
    uint256 output2 // new account balance of the receiver
);
```

기본적으로 모든 ERC20/ERC721 이전은 이 이벤트를 발생시킵니다. 발신자 및 리씨버의 이전 잔액(`input1` 및)`input2`은 tx의 입력(UTXO와 유사)이 되고 새로운 잔액은 출력( `output1`및)이`output2` 됩니다. 모든 관련 `LogTransfer`이벤트를 대조하는 방식으로 이전을 추적합니다.

## 종료 게임 {#exit-games}

블록은 단일(또는 소수) 블록프로듀서에 의해 생성되기 때문에 사기에 노출될 수 있습니다. 공격 시나리오를 간략하게 논의하고 플라즈마가 사용자 보호를 보장하는 방법에 대해 알아보겠습니다.

## 공격 벡터 {#attack-vectors}

### 악의적인 운영자 {#malicious-operator}
다음은 운영자가 악의적으로 변질되어 속임수를 시도하는 시나리오 입니다.

1. 근거 없는 토큰, 이중 지출, 잘못된 영수증 등 부정한 방법으로 토큰 잔액을 증가(운영자 관리 계정) 또는 감소(사용자) 시키는 것.
2. 데이터 비가용성. 사용자가 트랜잭션을 발송한 후, 운영자가 플라즈마 블록에 트랜잭션을 포함시키지만 사용자가 사용할 수 없는 상태로 체인 데이터를 만든다고 가정해 보겠습니다. 이 경우 사용자가 이전 트랜젝션에서 종료하고 나가기를 시작하면 가장 최근의 트랜젝션을 표시하는 방식으로 체인에서 문제가 발생할 수 있습니다. 이렇게 되면 사용자를 쉽게 곤란하게 만들 수 있습니다.
3. 불량 체크포인트. 최악의 경우 운영자는 A.1 과(또는) A.2를 수행하고 유효성 검사자와 공모하여 이러한 잘못된 상태 전환을 루트 체인에 커밋할 수 있습니다.
4. 사이드체인 정지. 운영자는 블록 생성을 멈추고 체인은 중단됩니다. 지정된 기간 동안 체크포인트가 제출되지 않으면 루트 체인에서 사이드체인이 중단된 것으로 표시할 수 있습니다. 그 후에는 더 이상 체크포인트를 제출할 수 없습니다.

위에 열거한 이유나 다른 이유로 플라즈마 체인이 불량이 되면 사용자는 대량 종료하고 나가기 시작할 것입니다. Poligon은 그러한 경우 루트 체인에 사용자가 활용할 수 있는 종료 구조를 제공하고자 합니다.

### 악의적인 사용자 {#malicious-user}

1. 사용자가 커밋된 트랜잭션으로 부터 종료하고 나가기를 시작하지만, 사이드체인에서 토큰을 계속 지출합니다. 이중 지출과 비슷하지만, 2개의 체인에 걸쳐 있습니다.

Polygon은 [MoreVp 7](https://ethresear.ch/t/more-viable-plasma/2160)의 아이디어에 기반하여 구축 작업을 진행하고 있습니다. 간단히 말해 MoreVP는 '최근 입력' 우선이라고 불리는 새로운 종료 우선순위 산정 방법을 도입합니다. MoreVP는 출력 시기 순으로 종료 순서를 정하지 않고, 최근 입력 기준으로 종료 순서를 정합니다. 이렇게 하면 '무근거' 트랜잭션으로 보류된 블록에 포함되어 있더라도 유효한 입력에 근거하는 한 출력의 이탈이 올바르게 처리될 수 있습니다. Polygon에서 `getAge`는 포함된 트랜잭션에 나이를 설정합니다. 이는 [minimum viable plasma 1](https://ethresear.ch/t/minimal-viable-plasma/426)에 정의된 바와 같습니다.

```jsx
function getAge(receipt) {
  const { headerNumber, plasmaBlockNum, txindex, oindex } = receipt
  return f(headerNumber, plasmaBlockNum, txindex, oindex) // multiplied with their respective weights
}
```

## 종료 시나리오 {#exit-scenarios}

출구 시나리오에 대해 계속 논의하기 전에 몇 가지 용어를 소개해 봅시다.

- **인출자**: 플라즈마 체인에서 종료하고 나가기를 원하는 사용자
- **커밋된 tx(트랜잭션)**: Polygon 체인 블록에 포함되었고 루트 체인에서 체크포인트가 적용된 트랜잭션
- **지출 tx**: 사용자가 서명한 행동에 따라 사용자의 토큰 잔액을 변경하는 트랜잭션(수신하는 토큰 이전은 포함하지 않음). 사용자 측의 이체, 소각 트랜잭션 등이 해당될 수 있습니다.
- **참조 tx**: 해당 특정 사용자 및 토큰에 대한 종료 트랜잭션의 바로 앞 트랜젝션. 계정 잔액 기반 UTXO 체계에 정의된 바와 같이, 참조 트랜잭션의 출력은 종료 대상 트랜잭션의 입력이 됩니다.
- **MoreVP 우선순위**: 특정 트랜잭션에 대한 가장 최근 입력한 나이(참조 트랜젝션 가운데). 종료 우선순위를 계산하는 데 가장 자주 사용됩니다.

### Burn 토큰 {#burn-tokens}

사이드체인에서 이탈하기 위해, 사용자는 플라즈마 체인에서 *소위 토큰 소각이라고 하는 인출* 트랜잭션을 시작합니다. 이 트랜잭션은 `Withdraw`이벤트를 발생시킵니다.

```jsx
event Withdraw(
    address indexed token,
    address indexed from,
    uint256 amountOrTokenId,
    uint256 input1,
    uint256 output1
);
```

여기에서 `input1`은 해당 토큰에 대한 사용자의 이전 잔액을 나타내고 `output1`은 사이드체인에 남아 있는 토큰의 갯수를 나타냅니다. 이 구조는 Polygon의 계정 기반 *UTXO* 체계와 일치합니다. 사용자는 메인 체인에서 토큰을 인출하기 위해 이 인출 트랜잭션의 영수증을 제시합니다. 이 영수증을 참조하는 동안 사용자는 또한 다음을 제공해야 합니다.

1. 사이드체인 블록에 영수증이 포함되었음을 입증하는 머클 증명(`receiptsRoot`)
2. 사이드체인 블록에 트랜잭션이 포함되었음을 입증하는 머클 증명(`transactionsRoot`)
3. 루트 체인의 체크포인트에 사이드체인 블록 헤더가 포함되었음을 입증하는 증명

```jsx
startExit(withdrawTx, proofOfInclusion /* of the withdrawTx in the checkpoint */) {
  Verify inclusion of withdrawTx in checkpoint using proofOfInclusion
  Verify msg.sender == ecrecover(withdrawTx)

  uint age = getAge(withdrawTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}
```

사용자(또는 클라이언트 앱, 즉 지갑)는 플라스마 체인에서 나가고자 할 때마다 사이드체인에서 토큰을 소각하고 체크포인트 적용을 기다린 다음 체크포인팅된 인출 트랜젝션에서 나가기를 시작해야 합니다.

### 마지막 ERC20/721 이전 종료(MoreVP) {#exit-from-the-last-erc20-721-transfers-morevp}

사용자가 사이드체인에서 ERC20을 이전하는 시나리오를 고려하십시오. 운영자는 사용자가 이체하기 직전에 근거 없는 트랜젝션을 추가하고, 유효성 검사자와 공모하여 이 블록에 체크포인트를 적용하기로 하였습니다. 이 시나리오와 위에서 논의된 A1에서 A3까지의 공격 벡터에서, 사용자는 악의적인 트랜잭션이 포함되기 전에 토큰을 소각할 기회를 갖지 못했을 수 있고, 그에 따라 마지막 체크포인트가 적용된 루트 체인의 트랜잭션으로부터 종료하고 나가기를 시작해야 할 수 있습니다. 이 때문에, Polygon은 소각 종료 외에도 ERC20/721 이전과 같은 다양한 트랜잭션으로부터의 종료를 지원해야 합니다. 이 공격 벡터를 기반으로 2가지 시나리오를 분석해 보겠습니다.

**발신 전송:** 사용자에게 일부 토큰을 전송했으나, 내 전송 트랜잭션을 포함하기 전에 운영자가 블록/체크포인트에 악의적인 트랜잭션를 포함시켰음을 인지했습니다. 체인 종료하고 나가기를 시작해야 합니다. 이전 트랜잭션에서 종료하고 나가기를 시작합니다. MoreVP에 정의된 바와 같이, 종료 우선순위를 규정할 참조 tx(*입력 UTXO*)를 제공해야 합니다. 그래서, 내 토큰 잔액을 업데이트한, 발신 전송 트랜잭션 바로 전의 트랜잭션을 참조합니다.

```jsx
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the user after the input tx was executed >= tokens being transferred in the exitTx
  Verify msg.sender == ecrecover(exitTx)

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

**수신 전송:** 운영자가 나의 수신 전송 트랜잭션을 포함시키기 전에 블록/체크포인트에 악의적인 트랜잭션을 포함시킨 것을 인지했습니다. 상대방의 잔액을 참조하는 동안 수신 전송 트랜잭션에서 종료하고 나가기를 하려고 합니다. 여기에서 *입력 UTXO*는 상대방의 토큰 잔액이기 때문입니다.

```
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the counterparty after the input tx was executed >= tokens being transferred in the exitTx
  Verify input.sender == ecrecover(exitTx) && input.receiver == msg.sender

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

### In-light 트랜잭션 (MoreVP) 종료 {#exit-from-an-in-flight-transaction-morevp}

이 시나리오는 데이터 비가용성 시나리오에 대처하기 위한 것입니다. 트랜잭션을 했으나, 데이터 비가용성으로 인해 해당 트랜잭션이 포함되었는지 여부를 알 수 없다고 가정해 보겠습니다. 마지막으로 체크포인트가 적용된 트랜잭션을 참조하여 이 인플라이트 트랜잭션에서 종료하고 나가기를 시작할 수 있습니다. 사용자는 MoreVP 스타일의 종료하고 나가기를 시작할 때마다 트랜잭션을 만들지 않도록 주의해야 합니다. 그렇지 않으면 이의가 제기될 수 있습니다.

**참고:** MoreVP 스타일 구조에서 종료하고 나갈 때, 사용자는 참조 트랜잭션과 종료 트랜잭션을 수행하고 소규모의 `exit bond`를 설정한 후 종료 작업을 시작할 수 있습니다. 종료하고 나가기에 대해 성공적으로 이의가 제기되면 종료는 취소되고 설정된 본드는 압류됩니다.

## 제한 사항 {#limitations}

1. 큰 증명 규모: 체크포인트 내 트랜잭션이 포함되었음을 입증하는 머클 증명 및 블록(해당 트랜잭션을 포함하는)이 포함되었음을 입증하는 머클 증명
2. 대규모로 종료하고 나가기: 운영자가 악의적으로 변질되면 사용자는 대규모로 종료하고 나가기 시작합니다.

사양은 초기 단계에 있습니다. 이를 개선하거나 또는 이 구조가 심하게 파손된 경우 재설계를 하는데 도움이 될 수 있도록 피드백해 주시면 감사하겠습니다. 구현은 [계약](https://github.com/maticnetwork/contracts) 저장소에서 진행되는 작업입니다.