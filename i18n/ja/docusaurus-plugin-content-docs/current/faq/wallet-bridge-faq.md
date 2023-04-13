---
id: wallet-bridge-faq
title: ウォレット<>ブリッジFAQ
description: Polygonで新しいブロックチェーンアプリを構築しましょう。
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - wallet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Polygonウェブウォレットはどこで使用できますか。 {#where-can-i-use-the-polygon-web-wallet}
PolygonウォレットスイートURLは次のとおりです：https://wallet.polygon.technology/ Polygonウォレットスイートは、Polygonが提供するWeb3アプリケーションのコレクションです。[Polygonウォレット](https://wallet.polygon.technology/polygon/assets)（分散型ウォレット）、[Polygonブリッジ](https://wallet.polygon.technology/polygon/bridge/deposit)（L1-L2ブリッジ）、[Polygonステーキング](https://staking.polygon.technology/)（MATICトークンをステーキングおよび委任するための環境）、[Polygonセーフブリッジ](https://safe-bridge.polygon.technology/safe)（マルチシグブリッジ）から構成されています。

<div align= "center">
  <img src={useBaseUrl("img/faq/wallet/wallet-hp.png")} />
</div>

## 現在サポートされているウォレットはどのですか？ {#which-wallets-are-currently-supported}

MetaMask、Coinbase、Bitskiウォレット、Venly、WalletConnectは現在サポートされているウォレットです。

<div align="center">
  <img src={useBaseUrl("img/faq/wallet/supported-wallets.png")} width="400" />
</div>

## Polygonウォレットで何をすべきですか。 {#what-can-i-do-with-my-polygon-wallet}

- Polygon上のアカウントにファンドを送信します。
- EthereumからPolygonにファンドを入金する（ブリッジを使用）。
- PolygonからEthereumにファンドを引き出す（ブリッジも使用）。

## MetaMaskウォレットがPolygonウォレットと接続していません。 {#my-metamask-wallet-is-not-connecting-with-polygon-wallet}

これが起こりうる理由はたくさん考えられます。**別の時間を試してみ**たり、**別のブラウザを**使用したり、それらのいずれかが役に立たない場合は、**[サポートチームにご連絡](https://support.polygon.technology/support/home)**ください。

## Polygonウォレットスイートを使用してEthereumからPolygonに資金を入金するにはどうすればよいですか。 {#how-can-i-deposit-funds-from-ethereum-to-polygon-using-polygon-wallet-suite}
下記のビデオをご覧いただくか[、この](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#depositing-funds-from-ethereum-to-polygon)チュートリアルに従ってください。

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/deposit/deposit-polygon-wallet.mp4"></source>
  <p>お使いのブラウザはビデオエレメントをサポートしていません。</p>
</video>

## Polygonウォレットスイートを使用してPoSブリッジを介してPolygonからEthereumに資金を引き出すにはどうすればよいですか。 {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-pos-bridge-using-polygon-wallet-suite}
下記のビデオをご覧いただくか[、この](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-pos-bridge)チュートリアルに従ってください。

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/pos/withdraw-polygon-wallet.mp4"></source>
  <p>お使いのブラウザはビデオエレメントをサポートしていません。</p>
</video>

## Polygonウォレットスイートを使用してPlasma Bridgeを介してPolygonからEthereumに資金を引き出すにはどうすればよいですか。 {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-plasma-bridge-using-polygon-wallet-suite}
下記のビデオをご覧いただくか[、この](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-plasma-bridge)チュートリアルに従ってください。

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/plasma/withdraw-plasma-v3.mov"></source>
  <p>お使いのブラウザはビデオエレメントをサポートしていません。</p>
</video>

## Polygonウォレットトークンリストに新しいトークンまたはカスタムトークンを追加する方法は？ {#how-to-add-a-new-or-custom-token-to-polygon-wallet-token-list}
[このチュートリアル](/docs/faq/adding-a-custom-token)に従ってください。

## トークンコントラクトはどこで見つけることができますか。 {#how-do-i-find-the-token-contract}

新しいトークンまたはカスタムトークンを追加しようとする際には、トークンコントラクトアドレスが必要です。コーンチェーン（ERC20トークン用）やPolygonのような他のサポートされているブロックチェーン上のアドレスを確認することができます。他のチェーン上のトークンアドレスは、更新されていないかもしれませんが、すべての目的において確実にルートアドレスを使用することはできます。

## 資金を入金しましたが、MetaMaskで見られません。何をすべきですか？ {#i-have-deposited-my-funds-but-i-don-t-see-it-on-metamask-what-do-i-do}

メタマスクにカスタムトークンアドレスを手動で追加する必要があります。

MetaMaskを開き、下にスクロールして、**Import tokens**（トークンをインポートする）をクリックします。

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/wallet-faq-3.png")} width="400" />
</div>

次に、関連するコントラクトアドレス、シンボル、小数点の精度を追加します。コントラクトアドレス（この場合、PoS-WETH）はこちらのリンクで確認できます：[https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/](https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/)。Polygon Mainnetで残高を確認するために、子トークンアドレスを追加する必要があります。精度はWETHで18です（ほとんどのトークンでは18進数は18進数です）。

## メタマスクにPolygonメインネットを追加するにはどうすればよいですか。 {#how-can-i-add-polygon-mainnet-on-metamask}

[このチュートリアル](/docs/develop/metamask/config-polygon-on-metamask)を確認してください。

## トークンがリストに表示されません。どちらに連絡すべきですか。 {#my-token-is-not-visible-in-the-list-who-should-i-contact}

DiscordまたはTelegramでPolygonチームにお問い合わせいただき、トークンをリストに表示させてください。その前に、トークンがマッピングされたことを確認してください。マップされていない場合は、[https://mapper.polygon.technology/](https://mapper.polygon.technology/)でリクエストを提出してください。

## チェックポイント到着後にトランザクションをキャンセルすることはできますか。 {#can-i-cancel-my-transaction-after-the-checkpoint-arrived}
Polygonメインネットで引き出しトランザクションを開始した後、残念ながらキャンセルまたは取り消しはできません。引き出しトランザクションでは、トークンがPolygonメインネットからバーンされ、Ethereumメインネットでマイトされます。そのため、Polygonチェーンから一度書き込まれたトークンがウォレットに戻すことはできません。

## ガス代が高すぎるのですが、トランザクションをキャンセルすることはできますか。 {#the-gas-fee-is-too-high-can-i-cancel-my-transaction}

残念ながら、Polygonメインネットからトークンがバーンされると、引き出しトランザクションをキャンセルすることはできません。つまり、実行が開始されるとトランザクションをキャンセルすることはできません。ガス代はPolygonによって制御されません。ネットワーク混雑とEthereumメインネット上の特定のブロック内のトランザクションの数に完全に依存しています。現在のガス料金が買えないと思われる場合は、ガス料金が下記のとおりに待ち、後で取引を進めることを試みることができます。Ethereumメインネットでガス料金を監視することもできます：https://etherscan.io/gastracker


## Polygonから他のウォレット／取引所にトークンを送信することはできますか。 {#can-i-send-my-tokens-from-polygon-to-any-other-wallet-exchange}

Polygon UIから取引所／ウォレットに直接トークンを送信することはできません。PolygonからEthereumにまず引き出し、取引所アドレスに送信する必要があります（取引所／ウォレットがネットワークを明示的にサポートしている場合を除く）。

## 取引所／ウォレットに直接資金を送るという間違いを犯しました。どうしたら良いでしょうか。 {#i-made-the-mistake-of-sending-funds-to-an-exchange-wallet-directly-can-you-help}

残念ながら、この場合はサポートすることはできません。Ethereumのみをサポートする取引所に直接ファンドを送信しないでください。PolygonからEthereumにまず引き出し、取引所のアドレスに送信する必要があります。

## 間違えて違うアドレスに転送しました。ファンドを取り戻すにはどうすればよいですか。 {#i-made-a-transfer-to-the-wrong-address-how-do-i-retrieve-the-funds}

残念ながら、できることはありません。その特定のアドレスへの秘密鍵の所有者だけが、それらの資産を移動することができます。トークンを送信するアドレスが正しいかどうかを確認することをお勧めします。

## トランザクションが長く保留されていることがありますが、どうすればよいですか。 {#my-transaction-has-been-pending-for-too-long-what-can-i-do}
次の理由によりトランザクションを削除する可能性があります：

1. トランザクションを送信する際に低ガス価格を設定する。
2. Ethereumメインネットの混雑によるガス価格の急騰。
3. トランザクションはウォレットからキャンセルされるか、新しいトランザクションに置き換えられます。

ドロップされたトランザクションを次の方法で進めることができます：

1. トランザクションが1時間以上停止している場合、**再度試行**するボタンが表示されます。[**再度試行**する]ボタンをクリックして同じトランザクションを完了することができます。**再試行機能**の使用方法については、このビデオを参照してください。
2. メタマスクでのキュードアップトランザクションによりトランザクションが削除される場合がありますので、MetaMaskウォレットを確認してください。その場合、キュードアップトランザクションをクリアするか、同じブラウザでMetaMaskを再インストールしてください。
3. 別のブラウザにMetaMaskをインストールして、Polygonウォレットスイートを使用してトランザクションを完了しようとします。
4. このリンクを使用して、保留中の引き出しトランザクションを完了することもできます。トランザクションハッシュを検索オプションにペーストし、**[Exit]**ボタンをクリックしてトランザクションを完了します。

## 入金が承認されましたが、残高が更新されていない場合はどうしたらいいですか。 {#what-do-i-do-if-the-deposit-is-confirmed-but-the-balance-is-not-getting-updated}

入金トランザクションが完了するまでに22〜30分かかります。しばらく待ち、**バランスの更新**をクリックしてください。

## チェックポイントが発生しない場合はどうしたらいいですか。 {#what-should-i-do-if-the-checkpoint-is-not-happening}

Ethereum上のネットワーク混雑により、チェックポイントには45分～1時間以上かかる場合があります。チケットを引き付ける前にしばらく待つことをお勧めします。

## トランザクションが停止しています。 {#my-transaction-is-stuck}

ユーザーが直面する可能性のある一般的なエラーをリストしています。エラー画像の下のソリューションをご確認ください。異なるエラーが表示される場合は、当社のチームに[サポートチケットをあげ](https://support.polygon.technology/support/home)、トラブルシューティングしてください。

  - ### 一般的なエラー {#common-errors}
a. 初期化段階で引き出し処理が停止している。

    <img src={useBaseUrl("img/wallet-bridge/plasma-progress-stuck.png")} width="357" height="800"/>

    This normally occurs when the transaction gets replaced and the wallet web application is not able to detect the replaced transaction hash. Please follow the instructions on [https://withdraw.polygon.technology/](https://withdraw.polygon.technology/) and complete your withdrawal.

b. RPCエラー

    <img src={useBaseUrl("img/wallet-bridge/checkpoint-rpc-error.png")} width="357" height="600"/>   

    The current RPC error you're facing might be due to an RPC overload.

    Please try changing your RPC and proceed with the transaction. You may follow this link [here](https://docs.polygon.technology/docs/develop/network-details/network#matic-mainnet) for more information.

c.

  <img src={useBaseUrl("img/wallet-bridge/checkpoint-stumbled-error.png")} width="357" height="600"/>

これは通常、オフおよびオンエラーで、自動的に解決されます。ステップを再開中に同様のエラーがまだ発生している場合は、すべての関連する情報を記載して[サポートチケットを上げて](https://support.polygon.technology/)、これをさらにトラブルシューティングしてください。


## 残高不十分のエラーが表示されています。 {#i-m-shown-an-insufficient-balance-error}

Polygonネットワーク上の引き出しと入金は安価です。理解すべきことは、残高不十分のエラーはEthereumメインネットでETHの残高を取得することで解除できます。これは、バランスが不十分な問題を一般的にクリアしています。これがPolygonメインネット上のトランザクションである場合、十分な量のMATICトークンを持つ必要があります。

## トランザクションが、エクスプローラに表示されません。どうすればよいですか。 {#my-transactions-are-not-visible-on-the-explorer-what-should-i-do}

これはおそらくPolygonscanに関するインデックス化問題です。詳細については[、](https://support.polygon.technology/support/home)サポートチームにご連絡ください。

## Ethereumに入金を始めましたが、まだ保留中です。どうすればよいですか。 {#i-initiated-a-deposit-on-ethereum-but-it-still-shows-as-pending-what-should-i-do}

ガスが低すぎる可能性があります。しばらく待機して、マイニングが行われない場合はトランザクションをやり直してください。追加のヘルプが必要な場合、ウォレットアドレス、トランザクションハッシュ（もしあれば）、関連するスクリーンショットをご用意の上、[サポートチーム](https://support.polygon.technology/support/home)にお問い合わせください。

## トランザクションハッシュを取得していない場合は、入金が行われませんか。何が起こっていますか。 {#i-m-not-getting-a-transaction-hash-and-my-deposits-aren-t-going-through-what-is-happening}

おそらく以前の保留中のトランザクションがあり、最初にキャンセルまたは速度を上げてください。Ethereumでのトランザクションは、次々と発生します。

## Polygonが引き出しのために金額を請求することはありませんが、当社はトランザクション中に支払う必要があります。 {#it-shows-polygon-does-not-charge-any-amount-for-a-withdrawal-but-we-are-to-pay-during-the-transaction}

Plasmaブリッジを使用した引き出しトランザクションは、3つのステップに別れます。1つのステップはPolygon Mainnetで発生し、2つのステップはEthereumメインネットで完了します。PoSブリッジでは、引き出しトランザクションは、2つのステップを介して発生します：Polygonネットワークでトークンを燃焼するステップと、Ethereumネットワークでプルーフを送信するステップです。いずれの場合においても、Polygon Mainnetで発生するトークンの燃焼は、非常に最小限のコストになります。Ethereumメインネットで発生する残りのステップは、[こちら](https://ethgasstation.info/)で検証できるガス代に応じてETHで支払う必要があります。

## 入金を試そうとしましたが、承認ステップでトランザクションが停止されました。 {#i-was-trying-to-make-a-deposit-but-the-transaction-stopped-at-the-approve-step}

トランザクションが**承認**ステップにある場合、まだ完了していません。それを達成するためには、ガス手数料を支払う必要があります。

## Polygonウォレットに、[User denied transaction signature]（ユーザーがトランザクション署名を拒否しました）というエラーメッセージが表示されます。 {#polygon-wallet-shows-user-denied-transaction-signature-error-message}

これは通常、ユーザーがMetaMaskを介してトランザクションをキャンセルしたり、署名することを拒否したためです。MetaMaskウォレットが求められたら、**「****承認**」をクリックしてトランザクションに署名してキャンセルを行います。

## トランザクションは成功していますが、保留中の状態が表示されます。 {#the-transaction-is-successful-but-it-shows-pending}

トランザクションが完了して資金を受け取ったが、UIに保留中のトランザクションが表示されている場合、関連する詳細とスクリーンショットを送信することでサポートチケットを引き上げることができます。

## Polygonでサポートされている取引所のリストは何ですか。 {#what-is-the-list-of-supported-exchanges-on-polygon}

MATICコインは多くの取引所で取引することができます。しかし、取引する方法を選択する際に、自分で研究を行うことが重要です。一部の取引所は現在利用可能なトークンに変更を続け、メンテナンス期間もあります。

MATICを見つける可能性のある取引所のリストのために、[Coinmarketcap]([https://coinmarketcap.com/currencies/polygon/markets/](https://coinmarketcap.com/currencies/polygon/markets/))にアクセスすることができます。

## Polygonは、ハードウェアウォレットをサポートしていますか。 {#does-polygon-support-hardware-wallets}

はい、次のハードウェアウォレットをサポートしています：
1. トレザー
2. 元帳

ユーザーは、MetaMaskでハードウェアウォレットオプションを接続してトランザクションを進めることができます。メタマスクでハードウェアウォレットを接続するリンクはこちらです：https://metamask.zendesk.com/hc/en-us/articles/4408552261275

## MATICトークンがPoSでサポートされていないのはなぜですか。 {#why-isn-t-the-matic-token-supported-on-pos}

Maticは、Polygonのネイティブトークンであり、Polygonチェーン上に次のコントラクトアドレスがあります - 0x0000000000000000000000000000000000001010 ガス代金を支払うこともできます。PoSブリッジでMaticトークンをマッピングすると、MaticにPolygonチェーン上に追加のコントラクトアドレスが追加されます。これは既存のコントラクトアドレスと衝突し、この新しいトークンアドレスはガス代を支払うために使用できないため、Polygonチェーン上の通常のERC20トークンとして残す必要があります。この混乱を避けるために、MATICをPlasma上に保持することにしました。

## トークンをマッピングするにはどうしたらいいですか。 {#how-do-i-map-tokens}

[この]チュートリアル（/docs/develop/ehereum-polygon/submit-mapping-request）を参照するか、[トークン](https://mapper.polygon.technology/)マッパーに直接アクセスできます。

## トランザクションの時間がかかりすぎる、または、ガス代が高すぎる場合にはどうしたらいいですか。 {#what-do-i-do-if-the-transaction-is-taking-too-long-or-if-the-gas-price-is-too-high}

トランザクション時間とガス価格はネットワーク混雑によって異なりますが、ネットワーク内のマイナー間の需要によって決定されます。

できること：
- 患者にしてください。
- 遅すぎる場合、ガス代を増やします。
- トランザクションを送信する前に手数料を確認してください。Etherscanのガストラッカーのためのリンクはこちらです：https://etherscan.io/gastracker

すべきではありません：
- ガス制限を低く設定しないでください。または取引が失敗する可能性があります。
- トランザクションをキャンセルしようとしないでください。事前に手数料を確認してください。


## ガスの制限またはガス代を変更することはできますか。 {#can-i-change-the-gas-limit-or-the-gas-price}

ガス制限は、契約で呼び出される機能の特定の要件に従って、アプリケーションによって推定および設定されます。これは編集すべきではありません。トランザクション手数料を増やしたり減少させるため、ガス価格のみを変更することができます。

## トランザクションをスピードアップするには？ {#how-to-speed-up-the-transactions}
ガス代を増やすことで、これを行うことができます。Metamaskで実行する方法を説明するリンクを次に示します：https://metamask.zendesk.com/hc/en-us/articles/360015489251-How-to-Speed-Up-or-Cancel-a-Pending-Transaction。

## ガス代金でMATICトークンがいくらですか。 {#how-much-matic-token-is-enough-for-the-gas-fee}
ユーザーは、Polygonメインネットで最低0.01MATICを必要とします。

## サポートチケットはどこで作成できますか。 {#where-do-i-raise-a-support-ticket}
スペシャリストからの助けが必要な場合は、https://support.polygon.technology/support/homeにメッセージを送信してください。

## チェーン間でアセットをブリッジする方法 {#how-do-i-bridge-assets-across-chains}

Polygonは、EthereumからPolygonに資産を移行するためのブリッジを提供しています。詳細については、このWikiの[ブリッジセクション]([https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started](https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started))でご覧いただけます。

ただし、Polygonが所有していない外部サービスを使用している場合は、チュートリアルと手順を要求するために、カスタマーサービスに連絡することをお勧めします。Web3サービスを使用する際には、自身で研究を行うことも重要です。

## OpenSeaやPolygonブリッジを使用する他のアプリケーションでトークンの引出しに問題があります。 {#i-have-a-token-withdrawal-issue-with-opensea-or-any-other-application-which-uses-polygon-bridge}

引き出しトランザクションが停止された場合、[Polygon](https://withdraw.polygon.technology)はhttps://dewrite.polygon.technologyを用いた引き出しブリッジを提供し、バーンハッシュがある場合に手を出すことができます。このツールを使うと、すぐにオンボードが始まり、問題が解決されます。OpenSeaや他のdAppsとの取引に関するその他の質問は、アプリケーションチームが処理する必要があります。

## 詐欺にあいました。トークンを取り戻すにはどうすればよいですか。 {#i-have-been-scammed-how-will-i-retrieve-my-tokens}

残念ながら、失われたコインを回復させるプロセスはありません。トランザクションを行う前に、開始して完了する前に確認とダブルチェックを行ってください。Polygonネットワークおよび公式ハンドルがプレゼント投稿やトークン倍増を行うことはなく、組織に代わってあなたにアプローチすることはありません。そのような連絡が来た場合は、ほとんどが詐欺ですので、すべて無視するようにしてください。当社の通信はすべて、公式ハンドルによって行われています。

## ウォレットに不正なトランザクションが存在します。ウォレットがハッキングされているのでしょうか。 {#there-are-some-unauthorized-transactions-in-my-wallet-is-my-wallet-hacked}

残念ながら、ネットワークは不要なトランザクションを元に戻すことはできません。
秘密鍵に常に注意を払うことが重要であり、**誰とも共有してはいけません。**
まだファンドが残っている場合は、新しいウォレットにすぐに転送してください。

## EthereumはテストネットワークとしてGoerliを持っています。Polygonネットワークにもテストネットワークがありますか。 {#ethereum-has-goerli-as-its-test-network-does-polygon-network-have-a-test-network-too}

EthereumネットワークはGoerliをテストネットワークとして持っているため、Polygonメインネットはムンバイを持っています。このテストネットワーク上のトランザクションはすべてMumbaiエクスプローラーでインデックス化されます。

## 他のトークンと交換するにはどうすればよいですか。 {#how-can-i-swap-my-tokens-for-other-tokens}
下記のビデオをご覧いただくか[、この](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#token-swap)チュートリアルに従ってください。

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-token.mp4"></source>
  <p>お使いのブラウザはビデオエレメントをサポートしていません。</p>
</video>

## トークンスワップが遅すぎます。 {#the-token-swap-is-too-slow}

トークンをスワップしようとし、時間がかかっている場合は、別のブラウザーで同じトランザクションを試すことができます。それでも解決せず、エラーが発生している場合は、サポートチームにスクリーンショットを送信してください。

## トークンスワップのガス料として請求されるトークンはどのようなものですか。 {#which-tokens-are-charged-as-the-gas-fees-for-token-swap}
MATICのみです。

## トークンをガスに交換するにはどうすればよいですか。 {#how-can-i-swap-my-token-for-gas}
下記のビデオをご覧いただくか[、この](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#swap-for-gas)チュートリアルに従ってください。

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-gas.mp4"></source>
  <p>お使いのブラウザはビデオエレメントをサポートしていません。</p>
</video>

## ガスと交換するためにどのトークンを使用することができますか。 {#which-tokens-can-be-used-to-swap-for-gas}
ETH、USDC、USDT、DAI、AAVE、LINK、WBTC、UNI、GHST、TEL、EMON、およびCOMBOでサポートされています。

## ETHトークンを取得するには？ {#how-to-get-eth-tokens}
ETHトークンを取得するには、別のトークンまたは取引所で合計金銭を取引したり、オンランプ（またはメタマスク）で購入したり、[Polygonのトークンスワップ機能](https://wallet.polygon.technology/polygon/token-swap)を使用して他のトークンをETHに交換することもできます。

## ガス代を支払うためにMaticトークンを取得するにはどうすればよいですか。 {#how-can-i-get-matic-tokens-to-pay-for-gas-fees}

それをサポートする[Gas Swap](https://wallet.polygon.technology/gas-swap/)サービスを提供しています。トランザクションを完了する必要があるMaticの額を選択し、EtherやUSDTなどの他のトークンにスワップできます。これが**ガスレストランザクション**であることに注目すべきです。

## Maticトークンを直接取得できますか。 {#where-can-i-get-matic-tokens-directly}

MATICトークンを使用すると、集中型[（バイナンス、](https://www.binance.com/en)[コインベース、](https://www.coinbase.com/)et.al）または分散型（[Uniswap](https://uniswap.org/)、[QuickSwap](https://quickswap.exchange/#/swap)）取引所から購入できます。[Transak](https://transak.com/)、[Ramp](https://ramp.network/)などのオンランプを研究して試してみることもできます。Maticコインを購入する目的によりどこから購入するか、そしてネットワークを決定する必要があります。意図がステーキングまたは委任である場合、EthereumメインネットにMATICを持つことをお勧めします。意図がPolygonメインネットでトランザクションである場合、PolygonメインネットでMATICを保持してトランザクションする必要があります。





