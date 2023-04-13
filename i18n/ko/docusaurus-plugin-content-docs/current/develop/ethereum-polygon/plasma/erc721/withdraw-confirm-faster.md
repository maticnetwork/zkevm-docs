---
id: withdraw-confirm-faster
title: withdrawChallengeFaster
keywords:
- 'plasma client, erc721, withdrawChallengeFaster, polygon, sdk'
description: 'Maticjs를 시작합니다'
---

# withdrawConfirmFaster {#withdrawconfirmfaster}

`withdrawConfirmFaster` 메서드는 플라스마 출금 프로세스의 두 번째 단계입니다. 이 단계에서는 소각 트랜잭션 증명(첫 번째 트랜잭션)이 제출되고 동일한 값의 ERC721 토큰이 생성됩니다.

이 프로세스가 성공하면 챌린지 기간이 시작되고, 챌린지 기간이 만료되면 사용자는 출금된 금액을 루트 체인의 사용자 계정으로 돌려받을 수 있습니다.

메인넷의 챌린지 기간은 7일입니다.

<div class="highlight mb-20px mt-20px">
백엔드에서 증명을 생성하기 때문에 빠릅니다. [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)를 구성해야 합니다.
</div>

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
