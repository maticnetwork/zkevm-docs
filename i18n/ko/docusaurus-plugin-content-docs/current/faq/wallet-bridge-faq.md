---
id: wallet-bridge-faq
title: 지갑 <>브리지 FAQ
description: Polygon에서 차세대 블록체인 앱을 구축하세요.
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - wallet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Polygon 웹 지갑을 어디에서 사용할 수 있습니까? {#where-can-i-use-the-polygon-web-wallet}
다음은 Polygon Wallet URL입니다. https://wallet.polygon.technology/Polygon에서 제공하는 웹3 애플리케이션 모음입니다. Polygon [Walet(Polygon](https://wallet.polygon.technology/polygon/assets) Walet), [Polygon Bridge](https://wallet.polygon.technology/polygon/bridge/deposit)(L1-L2 브리지), Polygon 스테이크(matic tokens를 스테이킹하고 위임하는 환경), [Polygon Staking](https://staking.polygon.technology/)[](https://safe-bridge.polygon.technology/safe)(matic Johkens을 위한 환경) 및 Polygon Fridge로 구성됩니다.

<div align= "center">
  <img src={useBaseUrl("img/faq/wallet/wallet-hp.png")} />
</div>

## 현재 어떤 지갑이 지원되나요? {#which-wallets-are-currently-supported}

메타마스크, Coinbase, Bitski Wallet, Venly 및 WalletConnect는 현재 지원되는 지갑입니다.

<div align="center">
  <img src={useBaseUrl("img/faq/wallet/supported-wallets.png")} width="400" />
</div>

## Polygon 지갑으로 무엇을 할 수 있습니까? {#what-can-i-do-with-my-polygon-wallet}

- Polygon의 계정으로 자금 보내기
- 이더리움에서 Polygon으로 자금 입금하기 (브리지 이용)
- 다시 Polygon에서 이더리움으로 자금 입금하기 (이 경우에도 브리지 이용)

## 메타 마스크 지갑이 Polygon 지갑과 연결되지 않습니다 {#my-metamask-wallet-is-not-connecting-with-polygon-wallet}

발생 원인은 여러 가지 입니다. **다른 시간을 시도하고** **다른 브라우저를** 사용하거나, 만약 이 중 하나가 도움이 되지 않는다면 **[지원 팀에 문의하십시오](https://support.polygon.technology/support/home)**.

## Polygon Wallet Suite를 사용하여 Eygon에서 Polygon으로 자금을 예치할 수 있습니다. {#how-can-i-deposit-funds-from-ethereum-to-polygon-using-polygon-wallet-suite}
아래 비디오를 보거나 [이 튜토리얼을](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#depositing-funds-from-ethereum-to-polygon) 따르십시오.

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/deposit/deposit-polygon-wallet.mp4"></source>
  <p>사용하는 브라우저가 비디오 요소를 지원하지 않습니다.</p>
</video>

## Polygon Wallet Suite를 사용하여 Polygon Please Bridge를 통해 Exy에서 Exygon에서 Eygon으로 자금을 어떻게 인출할 수 있습니까? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-pos-bridge-using-polygon-wallet-suite}
아래 비디오를 보거나 [이 튜토리얼을](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-pos-bridge) 따르십시오.

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/pos/withdraw-polygon-wallet.mp4"></source>
  <p>사용하는 브라우저가 비디오 요소를 지원하지 않습니다.</p>
</video>

## Polygon Wallet Suite를 사용하여 Plasma 브리지를 통해 Polygon에서 Eygon에서 자금을 어떻게 인출할 수 있습니까? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-plasma-bridge-using-polygon-wallet-suite}
아래 비디오를 보거나 [이 튜토리얼을](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-plasma-bridge) 따르십시오.

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/plasma/withdraw-plasma-v3.mov"></source>
  <p>사용하는 브라우저가 비디오 요소를 지원하지 않습니다.</p>
</video>

## Polygon Wallet Token 목록에 새로운 또는 사용자 정의 토큰을 추가하는 방법 {#how-to-add-a-new-or-custom-token-to-polygon-wallet-token-list}
[이 튜토리얼을](/docs/faq/adding-a-custom-token) 따르십시오.

## 토큰 계약은 어떻게 확인할 수 있습니까? {#how-do-i-find-the-token-contract}

새로운 또는 사용자 정의 토큰을 추가하려고 할 때 토큰을 반드시 필요할 것입니다. Coingecko 또는 CoinMarketCap에서 해당 이름을 사용하여 Eygon 체인(ERC20 토큰을 받으면, Exygon과 같은 기타 지원 블록체인에 대한 주소를 확인할 수 있습니다. 다른 체인의 토큰 주소는 업데이트되지 않을 수 있지만, 루트 주소는 어떤 용도로든 사용할 수 있습니다.

## 나는 자금을 예금했지만 메타마스크에서 그것을 볼 수 없습니다. 어떻게 해야 하나요? {#i-have-deposited-my-funds-but-i-don-t-see-it-on-metamask-what-do-i-do}

메타마스크에 사용자 정의 토큰 주소를 수동으로 추가해야 합니다.

메타 마스크를 열고 아래로 내려 **토큰 가져오기**를 클릭하세요.

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/wallet-faq-3.png")} width="400" />
</div>

그런 다음 관련 계약 주소, 기호 및 소수점 정밀도를 추가합니다. 계약 주소(이 경우 PoS-WETH)는 다음 링크에서 확인하세요: ([https://docs.polygon.technology/docs/develop/mapped/token/side/mapped/tails](https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/)) Polygon 메인넷에서 잔고를 보려면 차일드 토큰 주소를 추가해야 합니다. 정밀도의 소수점은 WET의 18입니다(대부분의 토큰의 경우 정밀도의 소수점 18은 18).

## 메타마스크에 Polygon 메인넷을 어떻게 추가할 수 있을까요? {#how-can-i-add-polygon-mainnet-on-metamask}

[이 튜토리얼을](/docs/develop/metamask/config-polygon-on-metamask) 확인하십시오.

## 목록에서 사용자의 토큰이 보이지 않습니다. 누구에게 연락해야 하나요? {#my-token-is-not-visible-in-the-list-who-should-i-contact}

Discord 또는 Telegram에 있는 Polygon 팀에 연락하여 토큰을 등록하세요. 그 전에 토큰이 매핑되었는지 확인하세요. 매핑되지 않은 경우 [https://mapper.polygon.technology/에서](https://mapper.polygon.technology/) 요청을 제기하십시오.

## 검문소가 도착한 후 트랜잭션을 취소할 수 있습니까? {#can-i-cancel-my-transaction-after-the-checkpoint-arrived}
Polygon 메인넷에서 철수 거래가 시작되면 불행히도 취소되거나 되돌릴 수 없습니다. 철수 거래에서 Polygon 메인넷에서 토큰을 태우고 이더리움 메인넷에 채굴되어 있습니다. 따라서 Polygon 체인에서 불이 붙은 토큰은 지갑으로 다시 돌아갈 수 없습니다.

## 가스 수수료가 너무 높아서 트랜잭션을 취소할 수 있습니까? {#the-gas-fee-is-too-high-can-i-cancel-my-transaction}

불행하게도, Polygon 메인넷에서 토큰을 태워지면 철수 트랜잭션을 취소할 수 있습니다. 즉, 일단 시작하면 트랜잭션을 취소할 수 있습니다. 가스 수수료는 Polygon에서 제어되지 않습니다. 그것은 전적으로 이더리움 메인넷의 특정 블록에서 네트워크 혼잡과 트랜잭션 수에 달려 있습니다. 현재 가스 수수료를 감당할 수 없다고 생각되면 나중에 가스 수수료가 하부면에 있을 때 계속 거래를 진행하려고 노력할 수 있습니다. 여기에서 이더리움 메인넷에서 가스 수수료를 모니터링할 수도 있습니다. https://에테르scan.io/gastracker를 확인할 수 있습니다.


## 내 토큰을 Polygon에서 다른 지갑 또는 거래소로 보낼 수 있나요? {#can-i-send-my-tokens-from-polygon-to-any-other-wallet-exchange}

Polygon UI에서 exchanges/지갑에 토큰을 직접 보낼 수 없습니다. 먼저 Polygon에서 이더리움으로 인출한 다음 사용자의 거래소 주소로 보내야 합니다(사용자의 거래소 또는 지갑이 해당 네트워크를 명시적으로 지원하는 경우는 예외).

## 나는 직접 교환/지갑에 자금을 보내는 실수를 저질렀다. 도와줄 수 있나요? {#i-made-the-mistake-of-sending-funds-to-an-exchange-wallet-directly-can-you-help}

안타깝지만 그러한 경우에는 도움을 드릴 수 없습니다. 오직 이더리움만 지원하는 거래소에 직접 자금을 보내지 마시고, 먼저 폴리곤에서 이더리움으로 출금한 후 사용자의 거래소 주소로 보내야 합니다.

## 잘못된 주소로 이체하였습니다. 자금을 어떻게 회수할 수 있나요? {#i-made-a-transfer-to-the-wrong-address-how-do-i-retrieve-the-funds}

유감스럽지만 회수할 수 있는 방법이 없습니다. 개인 키의 소유자만이 해당 주소를 통해 해당 자산을 이동할 수 있습니다. 귀하가 토큰을 보내는 주소가 올바른 주소인지 확인하는 것이 항상 좋습니다.

## 내 거래가 너무 오랫동안 보류 중이었습니다. {#my-transaction-has-been-pending-for-too-long-what-can-i-do}
다음 이유로 거래가 삭제 될 수 있습니다.

1. 트랜잭션을 제출하는 동안 낮은 가스 가격을 설정합니다.
2. 이더리움 메인넷의 혼잡으로 인해 가스 가격의 급격한 급증.
3. 거래가 지갑에서 취소되거나 새로운 거래로 대체됩니다.

다음 방법으로 드롭 트랜잭션을 진행할 수 있습니다.

1. 거래가 1시간 이상 붙어 있으면 **시도하고 다시** 버튼이 표시됩니다. **See** also Red 버튼을 클릭하면 동일한 트랜잭션을 완료할 수 있습니다. 이 비디오를 참고할 **수** 있습니다.
2. 메타마스크 지갑을 확인하십시오. 때로는 메타마스크 거래가 메타마스크에서 퀴드 업 거래로 인해 거래가 떨어질 수 있기 때문에 메타마스크 지갑을 확인하십시오. 이 경우 퀴 업 트랜잭션을 지우거나 동일한 브라우저에서 메타마스크를 다시 설치하십시오.
3. Polygon Wallet Suite를 사용하여 메타마스크를 대체 브라우저에서 설치할 수 있습니다.
4. 이 링크를 사용하여 보류 중인 철수 트랜잭션을 완료하는 것입니다. 검색 옵션에 트랜잭션 해시를 붙여 넣고 **확인 단추를** 클릭하여 트랜잭션을 완료하십시오.

## 입금이 확인되었지만 잔고가 업데이트되지 않는 경우에는 어떻게 해야 합니까? {#what-do-i-do-if-the-deposit-is-confirmed-but-the-balance-is-not-getting-updated}

예금 거래가 완료되려면 22-30분이 소요됩니다. 한동안 기다려 **Refreface** Balance를 클릭하십시오.

## 체크포인트가 발생하지 않으면 어떻게 해야 합니까? {#what-should-i-do-if-the-checkpoint-is-not-happening}

이더리움에서 네트워크 혼잡을 기반으로 45분 이상을 소요하면 티켓을 모으기 전에 잠시 기다리는 것을 제안합니다.

## 트랙잭션이 멈췄습니다. {#my-transaction-is-stuck}

사용자가 직면할 수 있는 몇 가지 일반적인 오류를 나열했습니다. 오류 이미지 아래에서 해결 방법을 확인할 수 있습니다. 다른 오류가 표시되는 경우에는, Polygon 팀이 문제를 해결하도록 [지원 티켓을 제출](https://support.polygon.technology/support/home)하시기 바랍니다.

  - ### 일반적인 오류 {#common-errors}
a. 인출이 시작 단계에서 멈춤.

    <img src={useBaseUrl("img/wallet-bridge/plasma-progress-stuck.png")} width="357" height="800"/>

    This normally occurs when the transaction gets replaced and the wallet web application is not able to detect the replaced transaction hash. Please follow the instructions on [https://withdraw.polygon.technology/](https://withdraw.polygon.technology/) and complete your withdrawal.

b. RPC 오류

    <img src={useBaseUrl("img/wallet-bridge/checkpoint-rpc-error.png")} width="357" height="600"/>   

    The current RPC error you're facing might be due to an RPC overload.

    Please try changing your RPC and proceed with the transaction. You may follow this link [here](https://docs.polygon.technology/docs/develop/network-details/network#matic-mainnet) for more information.

 c.

  <img src={useBaseUrl("img/wallet-bridge/checkpoint-stumbled-error.png")} width="357" height="600"/>

이것은 대개 불규칙하게 발생하고 자동으로 해결되는 오류입니다. 이 단계를 다시 시작하는 동안 여전히 동일한 오류가 발생하는 경우, 이 문제를 해결하려면 모든 관련 정보와 함께 [지원 티켓을 제출](https://support.polygon.technology/)하세요.


## 잔액 부족 오류가 표시됩니다. {#i-m-shown-an-insufficient-balance-error}

Polygon 네트워크에서의 출금과 입금 비용은 저렴합니다. 이더리움 메인넷의 일부 ETH 잔액을 가져와서 잔액 부족 오류를 해결할 수 있습니다. 일반적으로 불충분 한 균형의 문제를 지우십시오. Polygon 메인넷에서 거래라면 충분한 양의 MATIC 토큰을 가지고 있어야 합니다.

## 트랜잭션이 탐색기에 나타나지 않습니다. 어떻게 해야 할까요? {#my-transactions-are-not-visible-on-the-explorer-what-should-i-do}

이는 아마도 Polygonscan의 인덱싱 문제일 수 있습니다. 더 많은 설명을 위해 [지원 팀에](https://support.polygon.technology/support/home) 문의하십시오.

## 이더리움에 입금을 시작했는데 여전히 진행 중으로 표시됩니다. 어떻게 해야 할까요? {#i-initiated-a-deposit-on-ethereum-but-it-still-shows-as-pending-what-should-i-do}

아마도 사용자의 가스가 너무 적은 것 같습니다. 잠시 기다렸다가 채굴되지 않으면 트랜잭션을 다시 실행해야 합니다. 추가 도움이 필요한 경우, 귀하의 지갑 주소, 트랜잭션 해시(있는 경우), 해당 스크린샷을 가지고 [지원팀](https://support.polygon.technology/support/home)에 문의하시기 바랍니다.

## 트랜잭션 해시를 받지 못하고 입금도 진행되지 않습니다. 무슨 문제가 있나요? {#i-m-not-getting-a-transaction-hash-and-my-deposits-aren-t-going-through-what-is-happening}

이전에 보류 중인 트랜잭션이 있을 수 있습니다. 먼저 그것을 취소하거나 속도를 높이십시오. 이더리움에서의 트랜잭션은 순차적으로만 진행됩니다.

## Polygon은 인출에 대해서는 어떠한 요금도 청구하지 않지만, 트랜잭션을 하는 동안에는 지불해야 합니다. {#it-shows-polygon-does-not-charge-any-amount-for-a-withdrawal-but-we-are-to-pay-during-the-transaction}

플라즈마 브리지를 이용한 출금 트랜잭션은 Polygon 메인넷에서 발생하는 하나의 단계와 이더리움 메인넷에서 완료되어야 하는 2개의 단계 등 3개의 단계로 나뉩니다. PoS 브리지에서 출금 트랜잭션은 Polygon 네트워크에서의 토큰 소각과 이더리움 네트워크에서의 증명 제출, 두 단계로 이루어집니다. 모든 경우에 Polygon Mainnet에서 행해지는 토큰 소각은 비용이 매우 낮습니다. 이더리움 메인넷에서 진행되는 나머지 단계는 현재의 가스 가격([여기](https://ethgasstation.info/)에서 확인 가능)에 따라 ETH로 지급해야 합니다.

## 입금하려고 했으나 승인 단계에서 트랜잭션이 중단되었습니다. {#i-was-trying-to-make-a-deposit-but-the-transaction-stopped-at-the-approve-step}

그 트랜잭션이 여전히 **승인** 단계에 있다면, 아직 완료되지 않은 것입니다. 이를 완료하려면 가스 요금을 지불한 후 계속 진행해야 합니다.

## Polygon 지갑에 '사용자가 트랜잭션 서명을 거절했습니다'라는 오류 메시지가 표시됩니다. {#polygon-wallet-shows-user-denied-transaction-signature-error-message}

이는 일반적으로 사용자가 메타 마스크를 통한 트랜잭션 서명을 취소하거나 거절하는 경우에 발생합니다. 메타마스크 지갑에 의해 **촉발된** 경우 **취소를** 클릭하여 트랜잭션을 진행할 수 있습니다.

## 트랜잭션 은 성공적이지만 보류 중 모습을 보여줍니다. {#the-transaction-is-successful-but-it-shows-pending}

거래가 완료되고 자금을 수령하면 UI에 보류 중인 트랜잭션 쇼는 관련 세부 사항과 스크린 샷을 보내 지원 티켓을 모금할 수 있습니다.

## Polygon에서 지원되는 Exchanges 목록은 무엇입니까? {#what-is-the-list-of-supported-exchanges-on-polygon}

MATIC 동전은 많은 거래소에서 거래될 수 있습니다. 그러나 하나를 선택할 때 자신의 연구를 수행하는 것이 항상 중요합니다. 일부 교환이 현재 이용 가능한 토큰에 대한 변경을 계속 하고 유지 보수 기간을 갖는 것은 드문 일이 아닙니다.

MATIC를 찾을 수 있는 교환 목록을 위해 [Coinmark캡을]([https://coinmarketcap.com/currencies/polygon/markets/](https://coinmarketcap.com/currencies/polygon/markets/)) 방문할 수 있습니다.

## Polygon은 하드웨어 지갑을 지원하나요? {#does-polygon-support-hardware-wallets}

예, 다음 하드웨어 지갑을 지원합니다.
1. Trezor
2. 레저

사용자는 메타마스크에서 하드웨어 지갑 옵션을 연결하고 트랜잭션을 진행할 수 있습니다. 메타마스크에서 하드웨어 지갑을 연결하는 링크는 다음 링크를 참조하십시오. https://metamask.zendesk.com/hc/en-us/artisle/44085261275

## PoS에서 지원되는 MATIC 토큰은 왜 일까요? {#why-isn-t-the-matic-token-supported-on-pos}

매틱은 Polygon의 네이티브 토큰이며, Polygon 체인에 계약 주소(0x0000000000000000000000000000000000001010)를 가지고 있습니다. 또한 가스에 대한 비용을 지불하는 데 사용됩니다. PoS 브리지에서 매틱 토큰을 매핑하면 매틱이 Polygon 체인에 추가적인 계약 주소를 갖게 됩니다. 이 새로운 토큰 주소는 가스 지급에 사용될 수 없고 Polygon 체인에 일반 ERC20 토큰으로 남아 있어야 하므로, 이것은 기존 계약 주소와 충돌합니다. 따라서 이러한 혼란을 피하기 위해 Plasma에서 MATIC를 유지하기로 결정했습니다.

## 토큰을 어떻게 매핑하나요? {#how-do-i-map-tokens}

[이] 튜토리얼(/docs/developed/eisyum-Poly/submit-mapping 요청)을 참조하십시오. 또는 [직접](https://mapper.polygon.technology/) Token Mapper로 갈 수 있습니다.

## 트랜잭션이 너무 오래 걸리거나 가스 가격이 너무 높으면 어떻게 해야 합니까? {#what-do-i-do-if-the-transaction-is-taking-too-long-or-if-the-gas-price-is-too-high}

트랜잭션 시간과 가스 가격은 네트워크 혼잡을 기반으로 다양하며 네트워크의 마이너 간의 공급 및 수요에 의해 결정됩니다.

할 수 있는 일:
- 인내심을 가지세요.
- 너무 느리면 가스 요금을 인상하십시오.
- 거래를 보내기 전에 수수료를 확인하십시오. 다음은 Etherscan의 가스 트래커에 대한 링크입니다. https://에테르scan.io/gastracker

하지 말아야 할 내용:
- 가스 제한을 낮게 설정하지 마십시오.
- 트랜잭션을 취소하려고 시도하지 마십시오. 사전에 수수료를 확인하십시오.


## 사용자가 가스 한도나 가스 가격을 변경할 수 있습니까? {#can-i-change-the-gas-limit-or-the-gas-price}

가스 제한은 계약에서 호출되는 기능의 특정 요구 사항에 따라 신청서에 의해 추정되고 설정됩니다. 이것은 편집해서는 안됩니다. 트랜잭션 수수료를 늘리거나 줄이기 위해 가스 가격을 변경할 수 있습니다.

## 트랜잭션 가속화하는 방법 {#how-to-speed-up-the-transactions}
가스 수수료를 늘리면 그렇게 할 수 있습니다. 메타마스크에서 어떻게 할지 설명하는 링크가 있습니다. https://메타amask.zendesk.com/hc/en-us/article/360015489251-How-to-Speed-Up-Corn-Pendion-Transaction을 참조하십시오.

## 가스 수수료에 대해 얼마나 많은 MATIC 토큰을 충분합니까? {#how-much-matic-token-is-enough-for-the-gas-fee}
사용자는 Polygon 메인넷에서 최소 0.01의 MATIC를 가져야 합니다.

## 지원 티켓은 어디에서 제출합니까? {#where-do-i-raise-a-support-ticket}
전문가의 도움이 필요하면 https://support.polygon.technology/home에서 메시지를 보내주십시오.

## 체인 간에 자산을 연결하려면 어떻게 해야 합니까? {#how-do-i-bridge-assets-across-chains}

Polygon은 Eygon에서 Polygon으로 자산을 이동할 수 있는 다리를 제공하며 그 반대의 경우도 마찬가지입니다. 이 위키의 [브리지스 섹션에서]([https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started](https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started)) 더 자세히 확인할 수 있습니다.

그러나 Polygon이 소유하지 않는 외부 서비스를 사용하는 경우 고객 서비스에 연락하여 자습서와 지침을 요청하도록 권장합니다. 웹3 서비스를 사용할 때 자체 연구를 수행하는 것도 중요합니다.

## OpenSea 또는 폴리곤 브리지를 사용하는 다른 애플리케이션에서 토큰 인출에 문제가 있습니다. {#i-have-a-token-withdrawal-issue-with-opensea-or-any-other-application-which-uses-polygon-bridge}

인출 거래가 붙어 있는 문제가 있다면 [Polygon은](https://withdraw.polygon.technology) 인출 브리지를 https://information.polygon.technology를 통해 제공할 수 있습니다. talgon.technology를 사용하여 번 해시를 착용하면 해당 사이트에서 얻을 수 있습니다. 이 도구를 이용하면 사용자가 신속하게 온보딩되고 문제를 해결할 수 있습니다. OpenSea 및 기타 dApps와 거래와 관련된 다른 질문은 애플리케이션 팀이 처리해야 합니다.

## 사기를 당했습니다. 어떻게 하면 토큰을 회수할 수 있나요? {#i-have-been-scammed-how-will-i-retrieve-my-tokens}

안타깝게도 손실된 코인의 회수 프로세스는 없습니다. 거래를 하기 전에 확인하고 완료하기 전에 체크와 더블 체크를 해보세요. Polygon 네트워크와 공식 핸들이 어떤 기부자 게시물이나 토큰을 두 번 코딩하지 않는다는 점에 유의하십시오. 우리는 결코 조직을 대신하여 접근하는 것이 없습니다. 사기일 가능성이 높으므로 이러한 시도는 모두 무시하십시오. 모든 커뮤니케이션은 공식 핸드를 통해 제공됩니다.

## 지갑에 승인되지 않은 트랜잭션이 있습니다. 지갑이 해킹당한 건가요? {#there-are-some-unauthorized-transactions-in-my-wallet-is-my-wallet-hacked}

유감스럽지만, 네트워크는 원치 않는 거래를 되돌릴 수 없습니다. 개인 키는 항상 조심해야 하며, **절대로 타인과 공유하지 마십시오**. 아직 자금이 남아 있다면 즉시 새 지갑으로 이체하십시오.

## 이더리움에는 Goerli가 테스트 네트워크로 있습니다. Polygon Network도 테스트 네트워크가 있습니까? {#ethereum-has-goerli-as-its-test-network-does-polygon-network-have-a-test-network-too}

이더리(Eygon Network)가 Goerli를 테스트 네트워크로 가지고 있으므로 Polygon Mainnet은 Mumbai를 보유하고 있습니다. 이 테스트 네트워크상의 모든 트랜잭션은 Mumbai 탐색기에서 인덱싱됩니다.

## 다른 토큰을 위해 토큰을 어떻게 바꿀 수 있습니까? {#how-can-i-swap-my-tokens-for-other-tokens}
아래 비디오를 보거나 [이 튜토리얼을](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#token-swap) 따르십시오.

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-token.mp4"></source>
  <p>사용하는 브라우저가 비디오 요소를 지원하지 않습니다.</p>
</video>

## Token 스왑은 너무 느립니다. {#the-token-swap-is-too-slow}

토큰을 스왑하려고 하는데 시간이 너무 오래 걸린다면 다른 브라우저에서 동일한 트랜잭션을 시도해 보세요. 그렇게 해도 효과가 없고 오류가 발생한다면 Polygon 지원 팀에 스크린샷을 보내주시기 바랍니다.

## 토큰 스왑의 가스 수수료로 청구되는 토큰을 누구입니까? {#which-tokens-are-charged-as-the-gas-fees-for-token-swap}
MATIC만

## 토큰을 가스의 경우 어떻게 바꿀 수 있습니까? {#how-can-i-swap-my-token-for-gas}
아래 비디오를 보거나 [이 튜토리얼을](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#swap-for-gas) 따르십시오.

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-gas.mp4"></source>
  <p>사용하는 브라우저가 비디오 요소를 지원하지 않습니다.</p>
</video>

## 가스의 교환을 위해 어떤 토큰을 사용할 수 있습니까? {#which-tokens-can-be-used-to-swap-for-gas}
이 토큰만이 ETH, USDT, DAI, AAVE, LINK, WBTC, UNI, GHST, TEL, COMBO를 위해 '스왑 스왑'에 지원됩니다.

## ETHS 토큰을 얻는 방법은 무엇입니까? {#how-to-get-eth-tokens}
ETH의 토큰을 구입하려면 교환에서 다른 토큰이나 피아트 돈으로 거래하거나 온램프 (또는 메타마스크)에서 구입하거나 [Polygon의 토큰을](https://wallet.polygon.technology/polygon/token-swap) 사용하여 ETH를 교환하거나 다른 토큰을 교환할 수 있습니다.

## 가스 요금을 지급하기 위해 MATIC 토큰을 얻으려면 어떻게 해야 합니까? {#how-can-i-get-matic-tokens-to-pay-for-gas-fees}

당사는 이를 위하여 [가스 스왑](https://wallet.polygon.technology/gas-swap/) 서비스를 제공합니다. 트랜잭션 완료에 필요한 MATIC의 양을 선택하여 Ether 또는 USDT와 같은 다른 토큰으로 스왑할 수 있습니다. 이것은 **가스 없는 트랜잭션**이라는 사실을 주목하시기 바랍니다.

## 매틱 토큰은 어디에서 직접 얻을 수 있나요? {#where-can-i-get-matic-tokens-directly}

따라서 모든 중앙 집중식 ([Binance](https://www.binance.com/en), [Coinbase](https://www.coinbase.com/), et.al) 또는 분산 ([Uniswap](https://uniswap.org/), [QuickSwap](https://quickswap.exchange/#/swap)) 교환에서 MATIC 토큰을 구입할 수 있습니다. [또한](https://transak.com/) Transak과 [Ramp와](https://ramp.network/) 같은 온램프를 연구하고 시도할 수도 있습니다. 매틱 코인을 구매하는 목적에 따라 구매처와 네트워크도 판단해야 합니다. 귀하의 의향이 스테이킹 또는 대표단이라면 이더리움 메인넷에 MATIC를 갖는 것이 좋습니다. 귀하의 의도가 Polygon 메인넷에서 거래라면, Polygon 메인넷에서 MATIC를 잡고 트랜스action해야 합니다.





