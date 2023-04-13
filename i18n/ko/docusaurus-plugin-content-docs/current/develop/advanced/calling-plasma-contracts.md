---
id: calling-plasma-contracts
title: Plasma 컨트랙트 호출하기
description: 폴리곤에서 다음 블록체인 앱을 설치합니다.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

대부분의 개발자는 Matic.js 라이브러리를 사용하여 폴리곤과 상호 작용하는 것이 좋습니다.

그러나 이 페이지는 이더리움의 스마트 컨트랙트에 대해 잘 알고 있는 개발자가 Matic.js 라이브러리를 우회하고 폴리곤 스마트 컨트랙트와 직접 상호 작용할 수 있도록 도와줍니다. 이것은 개발자가 폴리곤의 내부 작동을 이해하고 폴리곤과의 상호 작용을 어느 정도 사용자화 하는 데 도움이 될 수 있습니다.

## 중요한 주소 및 링크

**폴리곤 RPC endpoint**: (Sign up for a free RPC link at https://rpc.maticvigil.com/)

| 컨트랙트                             | ABI                       | Goerli                                       | 폴리곤                                          |
| -------------------------------- | ------------------------- | -------------------------------------------- | -------------------------------------------- |
| TEST (ERC20) token               | <a target="_blank" href="https://static.matic.network/network/testnet/mumbai/artifacts/plasma/ChildERC20.json"><img src="https://img.icons8.com/metro/26/000000/download.png" width="25px" style={{padding: '2px'}} /></a> | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| Registry Root Contract           | <a target="_blank" href="https://static.matic.network/network/testnet/mumbai/artifacts/plasma/Registry.json"><img src="https://img.icons8.com/metro/26/000000/download.png" width="25px" style={{padding: '2px'}} /></a> | `0xeE11713Fe713b2BfF2942452517483654078154D` |                                              |
| DepositManager (Proxy) Contract  | <a target="_blank" href="https://static.matic.network/network/testnet/mumbai/artifacts/plasma/DepositManager.json"><img src="https://img.icons8.com/metro/26/000000/download.png" width="25px" style={{padding: '2px'}} /></a> | `0x7850ec290A2e2F40B82Ed962eaf30591bb5f5C96` | |                                            |
| Child Chain Contract             | <a target="_blank" href="https://static.matic.network/network/testnet/mumbai/artifacts/plasma/ChildChain.json"><img src="https://img.icons8.com/metro/26/000000/download.png" width="25px" style={{padding: '2px'}} /></a> |                                              | `0x1EDd419627Ef40736ec4f8ceffdE671a30803c5e` |
| WithdrawManager (Proxy) Contract | <a target="_blank" href="https://static.matic.network/network/testnet/mumbai/artifacts/plasma/WithdrawManager.json"><img src="https://img.icons8.com/metro/26/000000/download.png" width="25px" style={{padding: '2px'}} /></a> | `0x2923C8dD6Cdf6b2507ef91de74F1d5E0F11Eac53` |                                              |

### 테스트용 토큰

Goerli 네트워크에서 일부 `TEST`토큰을 얻으려면 아래 링크를 클릭하여 Polygon Faucet에 액세스할 수 있습니다:

<div style={{textAlign: 'center', paddingTop: '15px', paddingBottom: '15px'}}>
  <button className="btn btn-primary btn-md">
    <a href="https://faucet.polygon.technology" target="_blank" style={{color: 'inherit'}}>
      Test 토큰 가져오기
    </a>
  </button>
</div>

### 폴리곤 탐색기

폴리곤 탐색기를 사용하여 폴리곤 사이트체인에서 처리된 트랜잭션을 확인할 수도 있습니다.

탐색기 링크 - https://mumbai.polygonscan.com/

## 작업 흐름

### 1. Goerli 에서 폴리곤으로 ERC20토큰 입금

**설명**: Goerli에서 폴리곤으로 자산(ERC20)을 입금하려면

필요한 토큰 수를 **X**라고 합시다

1. 입금 관리자 컨트랙트는 `msg.sender`를 대신하여 **X** 를 지출하도록 승인됩니다.
   - **컨트랙트**: `ERC20.sol` 및 `DepositManager.sol`
   - **네트워크**: Goerli
   - **함수**: `approve`

ERC20 컨트랙트의 표준 `approve` 함수를 호출하여 `DepositManager`가 토큰의 금액을 이체하도록 승인합니다.

```javascript
RootERC20Contract.methods.approve(
  this.depositManagerContract.options.address,
  this.encode(amount)
);
```

2. Deposit Manager는 `msg.sender`에서 자신에게 금액을 이체합니다.

   - **컨트랙트**: `DepositManager.sol`
   - **네트워크**: Goerli
   - **함수**: [`despositERC20ForUser()`](https://github.com/maticnetwork/contracts/blob/6413308db75ecdbf8ab9ec2beee1db0d362acea3/contracts/root/depositManager/DepositManager.sol#L129)

msg.sender에서 DepositManager로 토큰 금액을 전송합니다. [NewDepositBlock](https://github.com/maticnetwork/contracts/blob/6413308db75ecdbf8ab9ec2beee1db0d362acea3/contracts/root/depositManager/DepositManager.sol#L223) 이벤트를 내보냅니다.

```javascript
depositManagerContract.methods.depositERC20ForUser(
  token,
  user,
  this.encode(amount)
);
```

> 폴리곤에 토큰을 예치하면 폴리곤의 ChildERC20 컨트랙트를 위한 새 토큰이 발행됩니다. ChildERC20 컨트랙트는 매핑 과정으로 전개되는 컨트랙트로, 메인 네트워크에 존재하는 토큰을 대표합니다.

### 2. 폴리곤에서 토큰 전송하기

**설명**: 폴리곤 테스트넷에서 토큰을 전송하려면

1. ERC20 컨트랙트의 표준 `transfer` 함수를 호출합니다.
   - **컨트랙트**: `ChildERC20.sol`
   - **네트워크**: Polygon
   - **함수**: `transfer`


    ```javascript
    ChildERC20.methods
      .transfer(
        recipientAddress,
        this.encode(amount)
      )
    ```

### 3. 폴리곤 사용자의 계정 잔고 표시하기

**설명**: 폴리곤 및 Goerli 사용자의 ERC20 토큰 잔고 쿼리

1. ERC20 컨트랙트의 표준 `balanceOf` 함수를 호출합니다.
   - **컨트랙트**: `ChildERC20.sol`
   - **네트워크**: Polygon
   - **함수**: `balanceOf`
     ```javascript
     // ERC20TokenContract can be either on Goerli or Polygon
     ERC20TokenContract.methods.balanceOf(owner);
     ```

### 4. 폴리곤에서 Goerli로 ERC20 토큰 인출하기

**설명**: 폴리곤 테스트넷에서 Goerli로 자산(ERC20)을 인출하려면

인출 절차:

1. 폴리곤 사이드체인에서 토큰 소각
2. 루트체인에 소각 증명(소각 트랜잭션 영수증) 제출
   1. 이 단계는 소각 트랜잭션으로 구성된 블록이 루트 체인의 체크포인트에 포함된 후에만 실행됩니다.
   2. 체크포인트 제출 후, 이 단계의 성공적인 실행
      1. 챌린지 종료 기간의 시작을 표시합니다(메인 네트워크에서는 7일, 테스트 네트워크에서는 5분으로 설정됨).
      2. 인출 계정에 `ExitNFT` 토큰을 발행합니다. 이는 인출자가 하위 체인에서 시작한 인출을 나타냅니다.
   3. processExits는 Exit NFT를 소각하고 토큰을 Deposit manager에서 인출자에로 다시 전송합니다.

**X**를 인출할 토큰의 수량이라고 합시다.

1. 폴리곤에서 **X** 토큰의 출금 요청 제출 - 토큰을 소각하고 tx ID를 반환합니다.

   - **컨트랙트**: `ChildERC20.sol`
   - **네트워크**: Polygon
   - **함수**: `withdraw`

   폴리곤에서 토큰을 소각하고 [Withdraw](https://github.com/maticnetwork/contracts/blob/6413308db75ecdbf8ab9ec2beee1db0d362acea3/contracts/child/ChildERC20.sol#L52) 이벤트를 발생시킵니다.

   ```javascript
   ChildToken.methods.withdraw(amount);
   ```

2. 이전 단계의 tx ID를 사용하여 Goerli에서 인출 트랜잭션을 생성합니다.

   - **컨트랙트**: `ERC20Predicate.sol`
   - **네트워크**: Goerli
   - **함수**: `startExitWithBurntTokens`

   이 기능은 이전 트랜잭션에서 수행된 토큰 소각의 증거인 페이로드 데이터를 수락합니다. 이 페이로드는 오프체인에서 생성됩니다.

   ```javascript
   payload = await _buildPayloadForExit(burnTxHash);
   erc20PredicateContract.methods.startExitWithBurntTokens(payload);
   ```

   종료에 대한 페이로드를 만들려면:

   1. RootChain.sol - 루트 체인에서 마지막으로 체크포인트된 블록 수-에서 마지막 하위 블록 가져옵니다
   2. 마지막 체크포인트된 블록이 소각 트랜잭션을 포함하는 블록보다 작으면 블록이 체크포인트될 때까지 기다립니다.
   3. 체크포인트가 포함된 경우
      1. RootChain.sol에서 HeaderBlockNumber를 찾습니다
         1. 마지막 체크포인트 블록부터 소각 트랜잭션으로 구성된 블록까지 검색(matic.js는 바이너리 검색을 수행)을 수행하여 burn tx가 있는 블록을 찾습니다.
         2. 헤더 블록 번호로 RootChain.sol 쿼리합니다
      2. 블록 증명을 작성합니다, 예시: https://github.com/maticnetwork/contracts/blob/fa6862dc6ddae97351aa1b4d16c087861b5a489e/contracts-core/helpers/proofs.js#L24
      3. 영수 증명을 작성합니다, 예시: https://github.com/maticnetwork/contracts/blob/fa6862dc6ddae97351aa1b4d16c087861b5a489e/contracts-core/helpers/proofs.js#L106
   4. 16진수로 인코딩된 바이트 문자열 반환: `headernumber`, `blockProof`, `block number of burn transaction`, `timestamp of the burn tx block`, `root of block`, `root of receipts`, `RLP encoded receipt bytes`, `receipt parent nodes`, `receipt path`, `logIndex`

   ````javascript
   private async _buildPayloadForExit(burnTxHash) {
     // check checkpoint
     const lastChildBlock = await rootChain.getLastChildBlock()
     const burnTx = await web3.eth.getTransaction(burnTxHash)
     const receipt = await web3.eth.getTransactionReceipt(burnTxHash)
     const block = await web3.eth.getBlock(
       burnTx.blockNumber,
       true /* returnTransactionObjects */
     )

     // check here if the burn tx has been checkpointed or not
     logger.info( { 'burnTx.blockNumber': burnTx.blockNumber, lastCheckPointedBlockNumber: lastChildBlock } )
     assert.ok(
       new BN(lastChildBlock).gte(new BN(burnTx.blockNumber)),
       'Burn transaction has not been checkpointed as yet',
     )
       // if the block has been checkpointed, move ahead

       const headerBlockNumber = await rootChainContract.findHeaderBlockNumber(burnTx.blockNumber)
       const headerBlock = await web3.call(
         rootChainContract
           .getRawContract()
           .methods.headerBlocks(this.encode(headerBlockNumber)),
       )
       logger.info({ 'headerBlockNumber': headerBlockNumber.toString(), headerBlock })

         // build block proof
         const blockProof = await Proofs.buildBlockProof(
           this.web3Client.getMaticWeb3(),
           headerBlock.start,
           headerBlock.end,
           burnTx.blockNumber,
         )
         // build receipt proof
         const receiptProof = await Proofs.getReceiptProof(
           receipt,
           block,
           this.web3Client.getMaticWeb3(),
         )
         return this._encodePayload(
           headerBlockNumber,
           blockProof,
           burnTx.blockNumber,
           block.timestamp,
           Buffer.from(block.transactionsRoot.slice(2), 'hex'),
           Buffer.from(block.receiptsRoot.slice(2), 'hex'),
           Proofs.getReceiptBytes(receipt), // rlp encoded
           receiptProof.parentNodes,
           receiptProof.path,
           // @todo logIndex can vary
           1, // logIndex
         )
       }
     ```

     To encode payload (returned in the previous function)

     ```javascript
       function _encodePayload(
         headerNumber,
         buildBlockProof,
         blockNumber,
         timestamp,
         transactionsRoot,
         receiptsRoot,
         receipt,
         receiptParentNodes,
         path,
         logIndex,
       ) {
         return ethUtils.bufferToHex(
           ethUtils.rlp.encode([
             headerNumber,
             buildBlockProof,
             blockNumber,
             timestamp,
             ethUtils.bufferToHex(transactionsRoot),
             ethUtils.bufferToHex(receiptsRoot),
             ethUtils.bufferToHex(receipt),
             ethUtils.bufferToHex(ethUtils.rlp.encode(receiptParentNodes)),
             ethUtils.bufferToHex(ethUtils.rlp.encode(path)),
             logIndex,
           ]),
         )
       }

       ```

   ````
3. 프로세스 종료
인출 프로세스의 세 번째이자 마지막 단계는 루트 체인에서 보류 중인 종료를 처리하는 것입니다.
- **컨트랙트**: `WithdrawManager.sol`
- **네트워크**: Goerli
- **함수**: `processExits`
     ```javascript
     withdrawManager.methods.processExits(token);
     ```
