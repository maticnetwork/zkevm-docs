---
id: get-allowance
title: getAllowance
keywords:
    - pos client
    - erc20
    - getAllowance
    - polygon
    - sdk
description: "사용자에 대해 승인된 금액을 가져옵니다."
---

`getAllowance` 메서드를 사용해 사용자에 대해 승인된 금액을 가져올 수 있습니다.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```

## spenderAddress {#spenderaddress}

승인이 이루어지는 주소는 `spenderAddress`라고 합니다. 사용자를 대신하여 토큰을 이전할 수 있는 제삼자 사용자 또는 스마트 계약입니다.

기본적으로 spenderAddress 값은 ERC20 조건자 주소입니다.

지출자 주소 값은 수동으로 지정할 수 있습니다.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```
