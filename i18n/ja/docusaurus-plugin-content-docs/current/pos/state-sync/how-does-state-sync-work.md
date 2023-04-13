---
id: how-state-sync-works
title: State Sync（状態同期）はどのように機能しますか？
description: "EthereumチェーンからBorチェーンに状態を送信します。"
keywords:
  - docs
  - matic
  - state sync
  - working
image: https://matic.network/banners/matic-network-16x9.png
---

# State Sync（状態同期）はどのように機能しますか？ {#how-does-state-sync-work}

状態管理は、EthereumチェーンからBorチェーンに状態を送信します。**ステート同期**と呼ばれています。

EthereumからBorへのステート転送は、システムコールによって行われます。ユーザーがUSDCをEthereum上のデポジットマネージャーに預け込むとします。バリデータはこれらのイベントを聴き、バリデートし、Heimdall状態に保存します。Borは、システム呼び出しを使用して、最新のstate-sync（状態同期）記録を取得し、Bor状態を更新（Bor上でUSDCと同額をミントする）します。

## State sender（状態の送信者） {#state-sender}

出典：[https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

状態を同期させるには、コントラクトがEthereumチェーンで次の**state senderコントラクト**メソッドを呼び出します。

```jsx
contract StateSender {
	/**
	 * Emits `stateSynced` events to start sync process on Ethereum chain
	 * @param receiver    Target contract on Bor chain
	 * @param data        Data to send
	 */
	function syncState (
		address receiver,
		bytes calldata data
	) external;
}
```

`receiver`コントラクトは、子チェーンに存在する必要があります。子チェーンは、プロセスが完了すると、状態`data`を受け取ります。`syncState`はEthereumで`StateSynced`イベントを出します。これは以下のようになります。

```jsx
/**
 * Emits `stateSynced` events to start sync process on Ethereum chain
 * @param id                  State id
 * @param contractAddress     Target contract address on Bor
 * @param data                Data to send to Bor chain for Target contract address
 */
event StateSynced (
	uint256 indexed id,
	address indexed contractAddress,
	bytes data
);
```

一旦Ethereumチェーンの`stateSender`コントラクトに`StateSynced`イベントが出されると、Heimdallは、これらのイベントを聞き、3分の２プラスのバリデータが合意した後、Heimdall状態に追加します。

各スプリント（現在Borで64ブロック）の後、Borは、新しいstate-sync（状態同期）記録を取得し、`system`呼び出しを使用して状態を更新します。ここに同様のコードがあります：[https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51](https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51)

`commitState`の間、ターゲットコントラクトに引数として`stateId`と`data`でBorは`onStateReceive`を実行します。

## Borの状態レシーバインターフェース {#state-receiver-interface-on-bor}

Borチェーンの`receiver`コントラクトは、次のインターフェースに実装する必要があります。

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

`0x0000000000000000000000000000000000001001` — `StateReceiver.sol`のみが、ターゲットコントラクトで`onStateReceive`機能を呼び出す必要があります。

## システムコール {#system-call}

システムアドレス`2^160-2`だけが、システムコールが可能です。Borは、内部でシステムアドレスで`msg.sender`として呼び出します。これは、コントラクト状態を変更し、特定のブロックの状態ルートを更新します。[https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md)と[https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)からヒントを得ました。

システムコールは、トランザクションを行わずに状態をコントラクトに変更するのに役立ちます。

## state-sync（状態同期）ログとBorブロックレシート {#state-sync-logs-and-bor-block-receipt}

システムコールにより出力されたイベントは、通常のログとは異なる方法で処理されます。コードは次のとおりです：[https://github.com/maticnetwork/bor/pull/90](https://github.com/maticnetwork/bor/pull/90)。

Borは、ステート同期のためのすべてのログを含むクライアントのためにのみ新しいtx /レシートを作成します。Txハッシュはブロック番号とブロックハッシュ（スプリントの最後のブロック）から派生します：

```jsx
keccak256("matic-bor-receipt-" + block number + block hash)
```

これにより、コンセンサスロジックは変更されません。クライアントの変更のみです。 , `eth_getTransactionReceipt`、そして、デリバリード付きのステート同期ログを`eth_getLogs`含めることができます`eth_getBlockByNumber`。ブロックのブルームフィルタは、state-sync（状態同期）ログに含まれるものを含まないことにご注意ください。派生した`transactionRoot`txも含まれていません。`receiptRoot`