---
id: staking-faq
title: ステーキングについてのよくある質問
sidebar_label: Staking FAQ
description: Polygonで新しいブロックチェーンアプリを構築しましょう。
keywords:
  - docs
  - matic
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Polygonでトークンをステーキングする方法 {#how-to-stake-tokens-on-polygon}

ステーキングを行うためには、Ethereumメインネット（詳細は[こちら](https://etherscan.io/gastracker)）にファンドを持っている必要があります。ステーキングダッシュボードを使用してEthereumネットワークでMetaMaskにログインします。https://staking.polygon.technology/

これがどのように機能するかを映像で示す動画をご覧ください：

<video autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking/staking.mp4"></source>
  <p>お使いのブラウザはビデオエレメントをサポートしていません。</p>
</video>

### Maticトークンをステーキングしました。もっとステーキングする方法 {#i-ve-staked-my-matic-tokens-how-can-i-stake-more}
[Your Delegations]（デリゲーション）に移動し、ステーキングのいずれかを選択し、[Stake More]（もっとステーキングをする）をクリックします。

これがどのように機能するかを映像で示す動画をご覧ください：

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking_faq/staking-more.mov"></source>
  <p>お使いのブラウザはビデオエレメントをサポートしていません。</p>
</video>

### ステーキングできないのはどうしてですか。 {#why-am-i-not-able-to-stake}

メインのEthereumネットワークにファンドがあるか確認し、トークンをデリゲートします。すべてのステーキングは、Ethereumネットワークでのみ行われます。

### ステーキングタブを表示できません。ステーキングにアクセスするには、どうすればよいですか。 {#i-am-unable-to-view-the-staking-tab-how-do-i-access-staking}

**https://staking.polygon.technology/**にアクセスするだけです。次のランディングページが表示されます：

<img src={useBaseUrl("img/staking_faq/staking-lp.png")} height="500px"/>

または、[Polygonウォレット](https://wallet.polygon.technology/)スイートにログインしたら、**[詳細] > [ステーキング]**をクリックすることができます。**ステーキングの概要**ページにユーザーが上陸されます。ガイドの参照：

<img src={useBaseUrl("img/staking_faq/staking-app.png")} height="500px"/>

### 報酬をより多く取得するために、どのバリデータを選択するべきか知るにはどうしたらいいですか。 {#how-do-i-know-which-validator-to-select-for-better-rewards}

それは、ステーキングしたいバリデータに関するご自身の理解と研究に依存します。バリデータの一覧はこちらにあります：https://staking.polygon.technology/validators

### 接続を解除する方法 {#how-to-unbond}

バリデータから接続を解除するには、[MyAccount]（アカウント）に移動し、[Your Delegations]（デリゲーション）を見つけます。
そこに、各バリデータごとに、接続の解除ボタンが表示されます。接続を解除したいバリデータの接続解除ボタンをクリックします。

`Step 1` <br/>
<img src={useBaseUrl("img/staking_faq/step1unbond.png")} height="400px"/><br/>

`Step 2` <br/>
<img src={useBaseUrl("img/staking_faq/step2unbond.png")} height="500px"/><br/>

これがどのように機能するかを映像で示す動画をご覧ください：

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking/unbond.mp4"></source>
  <p>お使いのブラウザはビデオエレメントをサポートしていません。</p>
</video>

### 接続解除にかかる期間はどのくらいですか？ {#what-is-the-unbonding-period}

Polygon上で接続解除にかかる期間は、チェックポイント80件です。これは約３〜４日です。チェックポイントごとに、約3時間かかります。しかし、Ethereum上の混雑により、一部のチェックポイントが遅れる可能性があります。
この期間は、もともとデリゲートされた量と再デリゲートされ量に適用します。再デリゲートされていない報酬には適用されません。

### 報酬を再ステーキングする方法 {#how-to-restake-rewards}

[My Account]（アカウント）に移動して、[Your Delegations]（デリゲーション）を確認します。
[Restake Reward]（報酬の再ステーキング）をクリックすると、MetaMaskアカウントから承認を求められます。トランザクションを承認すると、再ステーキングトランザクションが完了します。

`Step 1` <br/>
<img src={useBaseUrl("img/staking_faq/restake-rewards1.png")} height="300px"/><br/>

`Step 2` <br/>
<img src={useBaseUrl("img/staking_faq/restake-rewards2.png")} height="415px"/><br/>

これがどのように機能するかを映像で示す動画をご覧ください：

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking/restake.mp4"></source>
  <p>お使いのブラウザはビデオエレメントをサポートしていません。</p>
</video>

### 報酬を再ステーキングしたいのですが、できません。 {#i-want-to-restake-rewards-but-i-am-unable-to}

報酬を再ステーキングするには、最低でも**2 Matic**必要です。

### 報酬を引き出す方法 {#how-to-withdraw-rewards}

[My Account]（アカウント）をクリックして報酬を請求することができ、バリデータ用のデリゲータすべてが表示されます。[Withdraw Reward]（報酬を引き出す）ボタンをクリックすると、MetaMaskのデリゲートされたアカウントに報酬が転送されます。

`Step 1` <br/>
<img src={useBaseUrl("img/staking_faq/withdraw1.png")} height="300px"/><br/>

`Step 2` <br/>
<img src={useBaseUrl("img/staking_faq/withdraw2.png")} height="380px"/><br/>

これがどのように機能するかを映像で示す動画をご覧ください：

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking_faq/claim-rewards.mp4"></source>
  <p>お使いのブラウザはビデオエレメントをサポートしていません。</p>
</video>

### 報酬を引き出したいのですが、できません。 {#i-want-to-withdraw-rewards-but-i-am-unable-to}

報酬を引き出すには、最低でも**2 Matic**必要です。

### ステークを請求する方法 {#how-to-claim-stake}

**接続解除期間が完了**すると、[Claim Stake]（ステークを請求する）ボタンが有効になり、ステーキングされたトークンを請求できます。トークンはアカウントに転送されます。

`Step 1` <br/>
<img src={useBaseUrl("img/staking_faq/claim-stake1.png")} height="400px"/><br/>

`Step 2` <br/>
<img src={useBaseUrl("img/staking_faq/claim-stake2.png")} height="300px"/><br/>

`Step 3` <br/>
<img src={useBaseUrl("img/staking_faq/claim-stake3.png")} height="400px"/><br/>

これがどのように機能するかを映像で示す動画をご覧ください：

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking_faq/claiming-stake.mov"></source>
  <p>お使いのブラウザはビデオエレメントをサポートしていません。</p>
</video>

### ハードウェアウォレットはサポートされていますか？ {#are-hardware-wallets-supported}

はい、ハードウェアウォレットはサポートされています。MetaMaskで[Connect Hardware Wallet]（ハードウェアウォレット接続）オプションを使用し、ハードウェアウォレットを接続し、デリゲーションプロセスを継続できます。

### Binanceから直接ステーキングができないのはなぜですか。 {#why-can-t-i-stake-directly-from-binance}

Binanceを介したステーキングはまだサポートされていません。Binanceがサポートを開始すると、通知が表示されます。

### ステーキングのためにMaticトークンをPolygon Mainnetネットワークに入金する必要はありますか。 {#do-i-need-to-deposit-matic-tokens-to-the-polygon-mainnet-network-for-staking}

いいえ。すべてのファンドはメインのEthereumネットワーク上にある必要があります。

### 報酬はいつ分配されますか。 {#when-do-rewards-get-distributed}

チェックポイントが送信されるたびに報酬が配布されます。

約20188のMaticトークンは、すべてのバリデータとデリゲータの全体ステーキングプールに対するステークに基づいて各デリゲータへの成功したチェックポイントの送信に比例して分配されます。また、各デリゲータに分配される報酬の割合は、デリゲータ、バリデータ、全体のステークの相対的な関係によって、チェックポイントごとに変化します。

（チェックポイントを送信したバリデータには10%のプロポーザボーナスが発生しますが、異なるバリデータによる複数のチェックポイントでは、時間の経過とともにボーナスの効果は無効となります。）

チェックポイントの送信は約34分ごとに一人のバリデータが行います。この時間はPolygon Heimdallレイヤーに関するバリデータのコンセンサスに基づいて変動する可能性があります。これはEthereumネットワークに基づいて異なる場合もあります。ネットワーク内の混雑が大きくなると、チェックポイントが遅れる可能性があります。

ステーキングコントラクトのチェックポイントをここで追跡することができます：https://etherscan.io/address/0x86e4dc95c7fbdbf52e33d563bbdb00823894c287

### チェックポイントごとに報酬が減少し続けるのはなぜですか。 {#why-do-rewards-keep-getting-decreased-at-every-checkpoint}

報酬は、チェックポイントごとにネットワーク内の実際のロックされた供給の合計に依存しています。これはステーキングコントラクトにロックされるMaticトークンが増えるにつれて大きく変化すると予想されます。
報酬は当初、高いですが、ロックされた供給の割合が上がるにつれて減少を続けます。ロックした供給の変更はチェックポイントごとに発生し、報酬はこれに基づいて計算されます。

### 接続解除後に報酬を受け取り続けることはできますか。 {#will-i-keep-receiving-rewards-after-i-unbond}

いいえ。接続解除後は報酬を受け取れなくなります。

### ステーキングを別のバリデータに移行できますか。 {#can-i-move-the-stake-to-another-validator}
はい、[Your Delegations]（デリゲーション）にアクセスし、[Move Stake]（ステークを移行する）をクリックし、新しいバリデータ選択してください。

これがどのように機能するかを映像で示す動画をご覧ください：

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking_faq/moving.mp4"></source>
  <p>お使いのブラウザはビデオエレメントをサポートしていません。</p>
</video>

### ステーキングダッシュボードと互換性のあるブラウザはどれですか。 {#which-browsers-are-compatible-with-the-staking-dashboard}

Chrome、Firefox、Brave

### ログインしようとしていますが何も起こりません、また、ログイン後MetaMaskが承認で止まっています。何をすべきですか？ {#nothing-happens-when-i-try-to-log-in-or-my-metamask-is-stuck-at-confirming-after-logging-in-what-do-i-do}

次を確認します：
- Braveを使用している場合は設定パネルの[Use Crypto Wallets]（暗号ウォレットを使用）オプションをオフにしてください。
- MetaMaskにログインしているかどうか確認します。
- MetaMaskに Trezor/Ledgerでログインしているか確認してください。Ledgerデバイス上でコントラクトを呼び出す許可をオンにする必要があります。
- システムタイムスタンプを確認してください。システム時間が正しくない場合は修正する必要があります。