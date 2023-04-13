---
id: get-started
title: 시작하기
keywords:
  - maticjs
  - introduction
  - contract
  - polygon
  - sdk
description: Matic.js를 시작합니다
---

`@matic.js`는 매틱 네트워크의 다양한 구성 요소와 상호작용할 수 있도록 도와주는 javascript 라이브러리입니다.

이 시작하기 튜토리얼에서는 설정 및 PoS 브리지와 상호작용하는 방법에 대해 알아볼 것입니다.

## 설치 {#installation}

**npm을 통한 maticjs 패키지 설치:**

```bash
npm install @maticnetwork/maticjs
```

**web3js 플러그인 설치**

```bash
npm install @maticnetwork/maticjs-web3
```

## 설정 {#setup}

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

위 코드에서는 `web3js`를 사용하여 maticjs를 시작하지만, 유사한 방법으로 [이더](/docs/develop/ethereum-polygon/matic-js/setup/ethers)를 사용하여 시작할 수도 있습니다.

## PoS 클라이언트 {#pos-client}

`POSClient`는 PoS 브리지와 상호작용할 수 있도록 도와줍니다.

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider(privateKey, mainRPC),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, childRPC),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

`POSClient`가 시작되면, `erc20`, `erc721` 등과 같은 필요한 토큰 유형을 시작해야 합니다.

`erc20`을 시작해 봅시다.

### ERC20 {#erc20}

**ERC20 하위 토큰 생성**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**ERC20 상위 토큰 생성**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

ERC20이 시작되면, `getBalance`, `approve`, `deposit`, `withdraw` 등 사용 가능한 다양한 메서드를 호출할 수 있습니다.

일부 API 예시를 살펴봅시다.

#### get balance {#get-balance}

```
const balance = await erc20ChildToken.getBalance(<userAddress>)
console.log('balance', balance)
```

#### approve {#approve}

```
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

// get transaction hash
const txHash = await approveResult.getTransactionHash();

// get transaction receipt
const txReceipt = await approveResult.getReceipt();
```


보시다시피, 간단한 API를 사용해 maticjs는 maticjs 브리지와 쉽게 상호작용할 수 있습니다. **이제 멋진 것을 만들어 봅시다.**

### 중요한 링크 {#some-important-links}

- [예시](https://github.com/maticnetwork/matic.js/tree/master/examples)
