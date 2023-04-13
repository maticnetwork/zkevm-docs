---
id: api-architecture
title: APIアーキテクチャ
keywords:
    - api architecture
    - api type
    - read
    - write
    - polygon
description: APIプラストランザクション設定を読み込むおよび書き込む
---

ライブラリは、全体で共通のAPIアーキテクチャに従い、APIは2つの種類に分割されます。

1. APIを読み込む
2. APIを書き込む

## APIを読み込む {#read-api}

APIを読み込むことでブロックチェーン上で何も公開しないため、ガスを消費することはありません。APIの読み込みの例は、`getBalance` 、`isWithdrawExited`等です。

APIの読み込みの例を見てみましょう。

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

APIを読み込むことは非常にシンプルであり、直接的に結果を返します。

## 2.APIを書き込む {#2-write-api}

APIを書き込むことで、ブロックチェーン上でデータがいくつか公開されるため、ガスが消費されます。APIの書き込みの例は、`approve`、`deposit`等です。

APIを書き込むことを呼び出している場合 - 結果から2つのデータが必要です。

1. トランザクションハッシュ
2. トランザクションレシート

APIを書き込むの例を見て、トランザクションハッシュおよびレシートを取得しましょう。

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

### トランザクションオプション {#transaction-option}

すべてのAPIで利用可能な設定可能なオプションがあります。これらの設定は、パラメーターで渡ることができます。

利用可能な設定は -

- from?: string | number  - 送信先のアドレストランザクション
- to?: string - 宛先のアドレストランザクション
- value?: number | string | BN - weiでトランザクションのために転送される値
- gasLimit?: number | string - トランザクションに提供される最大のガス量（ガス制限）。
- gasPrice?: number | string | BN - トランザクションに使用するweiのガス代
- data?: string コントラクトのバイトコード
- nonce?: number;
- chainId?: number;
- chain?: string;
- hardfork?: string;
- returnTransaction?: boolean - それをtrueにすることは、手動でトランザクションを送信するために使用できるトランザクションオブジェクトを返します。

gasPriceを設定することで、例を見てみましょう。

```js
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
