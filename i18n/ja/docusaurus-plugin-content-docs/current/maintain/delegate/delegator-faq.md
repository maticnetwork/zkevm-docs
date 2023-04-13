---
id: delegator-faq
title: デリゲータよくある質問
sidebar_label: Delegator FAQ
description: Polygonネットワークでのデリゲーションに関するFAQ
keywords:
  - docs
  - polygon
  - how to delegate
  - validator
  - stake
  - faq
  - delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

### ステーキングダッシュボードURLとは何ですか？ {#what-is-the-staking-dashboard-url}

ステーキングダッシュボードURLはhttps://staking.polygon.technology/です。

### ステーク最低額はいくらですか？ {#what-is-the-minimum-stake-amount}

デリゲートする最小ステーク額はありません。ただし、1つのMATICトークンから始めることができます。

### デリゲートした場合、報酬はいくらですか？ {#how-many-rewards-will-i-get-if-i-delegate}

[ステーキング報酬計算機](https://staking.polygon.technology/rewards-calculator)を使用して見積もりを決定してください。

### トランザクションに長い時間をかけるのはなぜですか？ {#why-does-my-transaction-take-so-long}

Polygonのステーキングトランザクションはセキュリティ上の理由でEthereum上で発生します。

トランザクションを完了するのにかかる時間は、許可したガス代と、その時間にEthereumメインネットのネットワーク混雑によって異なります。			ガス料金を引き上げるには、いつでも「スピードアップ」オプションを使用することができます。

### 現在サポートされているウォレットはどのですか？ {#which-wallets-are-currently-supported}

現在、ブラウザとCoinbウォレットのMetaMask拡張機能のみがサポートされています。さらに、サポートされているモバイルウォレットからWalletConnectとWalletlinkを使用して、デスクトップ/ラップトップ上のステーキングUIダッシュボードとやり取りすることができます。他のウォレットのサポートはすぐに追加される予定です。

### ハードウェアウォレットはサポートされていますか？ {#are-hardware-wallets-supported}

はい、ハードウェアウォレットはサポートされています。MetaMaskで[Connect Hardware Wallet]（ハードウェアウォレット接続）オプションを使用し、ハードウェアウォレットを接続し、デリゲーションプロセスを継続できます。

### Binanceから直接ステーキングができないのはなぜですか。 {#why-can-t-i-stake-directly-from-binance}

Binanceを介したステーキングはまだサポートされていません。Binanceがサポートを開始すると、通知が表示されます。

### デリゲーションを完了しました。詳細チェックはどこでできますか？ {#i-have-completed-my-delegation-where-can-i-check-details}

委任が完了したら、Ethereumで12ブロックの確認を待ち（約3〜5分）、ダッシュボードで**マイアカウント**をクリックすることができます。

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### 報酬チェックはどこでできますか？ {#where-can-i-check-my-rewards}

ダッシュボードで、左側の**マイアカウント**オプションをクリックすることができます。

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### ガス代の支払うためにETHが必要ですか？ {#do-i-need-eth-to-pay-for-gas-fees}

はい。安全なETHのために支給する必要があります。

### ステーキングのためにMaticトークンをPolygon Mainnetネットワークに預け入れする必要がありますか？ {#do-i-need-to-deposit-matic-tokens-to-the-polygon-mainnet-network-for-staking}

いいえ。すべてのファンドはメインのEthereumネットワーク上にある必要があります。

### トランザクションを試みると、確認ボタンが無効になっているのはなぜですか？ {#when-i-try-to-do-the-transaction-my-confirm-button-is-disabled-why-so}

ガス代にETHが十分なことをチェックしてください。

### 報酬は分配されるのはいつですか？ {#when-does-reward-get-distributed}

チェックポイントが送信されるたびに報酬が配布されます。

現在、20188年のMATICトークンが、すべてのバリデータとデリゲーターの全体的なステーキングプールに相当するステーキングに基づいて、各デリゲーターへのチェックポイント提出を成功させるごとに、それぞれのデリゲーターに比例して割り当てられます。また、各デリゲータに分配される報酬の割合は、デリゲータ、バリデータ、全体のステークの相対的な関係によって、チェックポイントごとに変化します。

（チェックポイントを送信したバリデータには10%のプロポーザボーナスが発生しますが、異なるバリデータによる複数のチェックポイントでは、時間の経過とともにボーナスの効果は無効となります。）

チェックポイント送信は約34分ごとにバリデータの1人が行います。この時間はおおよそのもので、Polygon Heimdallのレイヤーに関するバリデータのコンセンサスに基づいて変動する可能性があります。これはEEthereumネットワークに基づいて異なる場合があります。ネットワーク内の混雑が大きくなると、チェックポイントが遅れる可能性があります。

ステーキングコントラクトのチェックポイント[を](https://etherscan.io/address/0x86e4dc95c7fbdbf52e33d563bbdb00823894c287)追跡できます。

### なぜ報酬チェックポイントごとに減少を続けるのですか？ {#why-does-reward-keep-getting-decreased-every-checkpoint}

獲得した報酬はチェックポイントごとにネットワーク内の実際のロックされた供給量によって異なります。これはステーキングコントラクトにロックされるMATMaticトークンが増えるにつれて大きく変化すると予想されます。

報酬は当初は高くなります。ロックされた供給％が上がるにつれて減少を続けます。ロックした供給の変更はチェックポイントごとに捕捉報酬はこれに基づいて計算されます。

### 報酬を請求するにはどうすればよいですか？ {#how-can-i-claim-my-rewards}

**報酬**を引き出すボタンをクリックすると即座に報酬を獲得できます。これにより、MetaMaskのデリゲートアカウントに蓄積された報酬を転送します。

<div>
  <img src={useBaseUrl("/img/delegator-faq/withdraw-reward.png")} />
</div>

### アンボンディング期間は何時ですか？ {#what-is-the-unbonding-period}

Polygonのアンボンディング期間は現在約9日です。それは19日前でした。この期間は、元々委任された金額と再委任された金額に適用されます。再委任されたものでない報酬には適用されません。

### 接続解除後に報酬を受け取り続けることはできますか。 {#will-i-keep-receiving-rewards-after-i-unbond}

いいえ。ボンドを解除した後、報酬の受領を停止します。

### デリゲーションに必要な取引回数は？ {#how-many-transactions-does-the-delegation-require}

委任には2つのトランザクションが必要です。要請を**承認**するものと、別の**もの**を預金するものとします。

<div>
  <img src={useBaseUrl("/img/delegator-faq/delegate.png")} />
</div>

### 再デリゲーション・報酬とは何ですか？ {#what-does-redelegate-rewards-mean}

報酬を再委託することは、蓄積した報酬を再度再度再利用することによって、ステークを増やすことを意味します。

### バリデータにステークすることはできますか？ {#can-i-stake-to-any-validator}

はい。全てのバリデータは現在PolyPolygon Foundationノードです。

Polygon Mainnetの段階的な展開を行っています。後で外部バリデータは徐々にオンボードされます。詳細についてはhttps://blog.matic.network/mainnet-is-going-live-announcing-the-launch-sequence/をご覧ください。

### ステーキングダッシュボードと互換性のあるブラウザはどれですか？ {#which-browser-is-compatible-with-staking-dashboard}

Chrome, Firefox, and Brave

### MetaMaskログイン後に確認に立ち往生しています。どうすればよいですか？ログインしようとしたときに何も起こらない？ {#my-metamask-is-stuck-at-confirming-after-login-what-do-i-do-or-nothing-happens-when-i-try-to-login}

次を確認します：

- Braveを使用している場合は、設定パネルで**暗号ウォレット**を使用するオプションをオフにしてください。
- MetaMaskにログインしているかチェックする
- MetaMaskに Trezor / Ledgerでログインしているかチェックしてください。Ledgerデバイス上でコントラクトを呼び出す許可をオンにする必要があります。
- システムタイムスタンプを確認してください。システム時間が正しくない場合は修正する必要があります。

### Binanceまたは他の取引所からPPolygonウォレットにファンド送信するにはどうすればよいですか？ {#how-do-i-send-funds-from-binance-or-other-exchanges-to-polygon-wallet}

技術的にはPolygonウォレットスイ/ステーキングインターフェースはwebアプリケーションに過ぎません。現在、メタマスク、ウォレットコネクト、ウォレットリンクをサポートしています。

まず、Binanceまたは他の取引所からEthereumアドレスに資金を引き出す必要があります。MetaMaskを使用する方法がわからない場合は少しググってください。それから始めるには多くのビデオやブログがあります。

### バリデータになることはいつですか？それには何トークンが必要ですか？ {#when-can-i-become-a-validator-and-how-many-tokens-do-i-for-that}

ユーザーは下記に条件が発生した場合にのみバリデータスポットを獲得できます：
1. バリデータがネットワークからのステークを解除した場合、または
2. オークションメカニズムを待機し、非アクティブなバリデータを交換します。

最低ステークは、あるユーザーが他のユーザーを競り落とすオークションのプロセスによって決まります。

### デリゲーション中に報酬を追加した場合、バリデータノードにファンド追加した場合、どうなりますか？ {#if-i-have-earned-rewards-while-delegating-and-if-i-add-additional-funds-to-the-same-validator-node-what-happens}

バリデータノードに追加ファンドをデリゲートする前に報酬を再デリゲートしない場合、報酬は自動的に引き落とされます。

もしそうしたくない場合はファンドをデリゲートする前に報酬を再デリゲートしてください。

### ステーキングダッシュボードでMetaMask介してトークンをデリゲートしました。システムまたはデバイスをオンにする必要がありますか？ {#i-have-delegated-my-tokens-via-metamask-on-the-staking-dashboard-do-i-need-to-keep-my-system-or-device-on}

デリゲーショントランザクションが確認されたら、**トークン**がトータルステークと**新規報酬**に反映されることができ、完了です。システムまたはデバイスをオンにする必要はありません。

### アンボンドを解除しましたが、アンボンドにかかる時間はかかりますか。 {#i-have-unbonded-how-long-will-it-take-to-unbond}

アンボンディング期間は現在、82チェックポイントに設定されています。これは約9日です。チェックポイントごとに約34分かかります。ただし、Ethereum上の混雑のために、一部のチェックポイントは最大1期限まで遅延する可能性があります。

### ボンドを解除しましたが、クレームステークボタンが表示されますが、無効になっています。なぜですか？ {#i-have-unbonded-and-i-now-see-the-claim-stake-button-but-it-is-disabled-why-is-that}

クレームステークボタンはアンボンディング期間が完了した場合にのみ有効になります。アンボンディング期間は現在82チェックポイントに設定されています。

### ステークボタンが有効なタイミングを知っていますか？ {#do-i-know-when-will-the-claim-stake-button-be-enabled}

はい、クレームステークのボタンの下に、クレームステークボタンが有効になるまでに何回チェックポイントが保留されているかを表示します。チェックポイントごとに約30分かかります。ただし、Ethereum上の混雑のために、一部のチェックポイントは最大1期限まで遅延する可能性があります。

<div>
  <img src={useBaseUrl("/img/delegator-faq/unbond.png")} />
</div>

### ファンデーションノードから外外部ノードにデリゲーションを切り替える方法は？ {#how-do-i-switch-my-delegation-from-foundation-nodes-to-external-nodes}

ステーキングUIの**Move Stake**オプションを使用してデリゲーションを切り替えることができます。これにより、ファンデーションノードからデリゲーションを、選択した外部ノードに切り替えます。

<div align="center">
  <img src={useBaseUrl("/img/delegator-faq/move-stake.png")} width="500" />
</div>

他のバリデーターの一覧が表示されます：

<div>
  <img src={useBaseUrl("/img/delegator-faq/validators.png")} />
</div>

### ファンデーションノードから外外部ノードにデリゲーションを切り替える際に、アンボンディング期間はありますか？ {#will-there-be-any-ubonding-period-when-i-switch-delegation-from-foundation-nodes-to-external-nodes}

ファンデーションノードから外部ノードにデリゲーションを切り替えるとき、アンボンディング期間はありません。遅延なしで直接スイッチになります。ただし、ファンデーションノードまたは外部ノードからアンボンディングする場合、そのためアンボンディング期間があります。

### スイッチデリゲーション時に外部ノードを選択する仕様はあるのでしょうか？ {#are-they-any-specifics-to-choose-an-external-node-during-switch-delegation}

いいえ。任意のノード選択できます。

### ファンデーションから外部ノードにデリゲーション外部に切り替えると、蓄積された報酬はどうなりますか？ {#what-happens-to-my-rewards-that-are-accumalated-if-i-switch-delegation-from-foundation-to-external-node}

デリゲーションを切り替える前に報酬を取得しない場合、ファンデーションから外部にデリゲーションを成功させると、それまで蓄積した報酬はアカウントに転送されます。

### 外部ノード上のデリゲーションはファンデーションノードと同じように動作しますか？ {#will-delegation-on-the-external-nodes-work-the-same-as-foundation-nodes}

はい、Foundationノードと同じように動作します。

### 外部ノードにデリゲートした後にまだ報酬は取得できますか？ {#will-i-still-get-rewards-after-delegating-to-an-external-node}

はい、報酬はファンデーションノードと同じように分散されます。チェックポイントを送信するたび報酬が得られます。報酬はステーク比率を相対的にチェックポイントで分散し、現在実装しているように計算されます。

### 外部ノードからアンボンディングする場合、アンボンディング期間はありますか？ {#will-there-be-any-unbonding-period-if-i-unbond-from-an-external-node}

はい、アンボンディング期間は現行通りです。82 チェックポイント。

### デリゲーションをファンデーションから外部ノードに切り替えるとロッキング期間はありますか？ {#will-there-be-any-locking-period-after-i-switch-my-delegation-from-foundation-to-external-node}

いいえ。デリゲーションを切り替えた後、ロッキング期間はありません。

### ファンデーションから外部ノードに一部切り替えることはできますか？ {#can-i-partially-switch-my-delegation-from-foundation-to-external-nodes}

はい、ファンデーションノードから外部ノードにステークを部分的に移動するオプションがあります。残りのステークはファンデーションノードに残ります。その後、選択したノードまたは同じノードに移動できます。

### 外部ノードから別の外部ノードにデリゲーションを切り替えることはできますか？ {#can-i-switch-delegation-from-an-external-node-to-another-external-node}

いいえ、**Move Stake**オプションはファンデーションノードでのみ使用できます。外部ノードから別の外部ノードにデリゲートする場合は、最初にボンドをアンボンドし、別の外部ノードにデリゲートする必要があります。

### ファウンデーションノードはオフにするのはいつですか？ {#when-will-the-foundations-node-be-turned-off}

基礎ノードは2021年1月末までにオフになります。

### 将来的にファウンデーションノードはありますか？ {#will-there-be-any-foundation-nodes-in-the-future}

いいえ、将来的にファンデーションノードは存在しません。

### ステーク移動時にガス代金を支払うために必要なトランザクション数は？ {#how-many-transactions-do-i-need-to-pay-for-gas-when-i-do-a-move-stake}

ステーク移動はトランザクションのみです。すべてのトランザクションはEthereumブロックチェーン上にあるため、ステーク移動トランザクションを行う際にETHを費やす必要があります。
