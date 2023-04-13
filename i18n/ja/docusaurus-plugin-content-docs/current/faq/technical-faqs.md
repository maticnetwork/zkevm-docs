---
id: technical-faqs
title: 技術的なFAQ
description: Polygonで新しいブロックチェーンアプリを構築しましょう。
keywords:
  - docs
  - matic
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip 内情に精通し続けましょう。

[<ins>Polygon通知</ins>](https://polygon.technology/notifications/)を購読して、Polygonチームとコミュニティからの最新のノードとバリデーターの更新を把握してください。

:::

### 1. 秘密鍵はHeimdallとBor keystoreで同じですか？ {#1-are-the-private-keys-same-for-heimdall-and-bor-keystore}
はい、ValidatorキーとBor Keystoreの生成に使用する秘密鍵は同じものです。ここで使用される秘密鍵は自身のPolygonテストネットトークンが保存されているウォレットのETHアドレスです。

### 2. 共通コマンドのリスト {#2-list-of-common-commands}

現在、Linuxパッケージのための簡単に処理できるリストがあります。より便利にするためにこのリストを定期的に更新し続けます。

**Linuxパッケージ用**

#### A. Heimdall genesisファイルの場所 {#a-where-to-find-heimdall-genesis-file}

`$CONFIGPATH/heimdall/config/genesis.json`

#### B. heimdall-config.tomlの場所 {#b-where-to-find-heimdall-config-toml}

`/etc/heimdall/config/heimdall-config.toml`

#### C. config.tomlの場所 {#c-where-to-find-config-toml}

`/etc/heimdall/config/config.toml`

#### D. heimdall-seeds.txtの場所 {#d-where-to-find-heimdall-seeds-txt}

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

#### E. Heimdallの開始 {#e-start-heimdall}

`$ sudo service heimdalld start`

#### F. Heimdall rest-serverの開始 {#f-start-heimdall-rest-server}

`$ sudo service heimdalld-rest-server start`

#### G. Heimdall bridge-serverの開始 {#g-start-heimdall-bridge-server}

`$ sudo service heimdalld-bridge start`

#### H. Heimdall ログ {#h-heimdall-logs}

`/var/log/matic-logs/`

#### I. Bor genesisファイルの場所 {#i-where-to-find-bor-genesis-file}

`$CONFIGPATH/bor/genesis.json`

#### J. Borの開始 {#j-start-bor}

`sudo service bor start`

#### K heimdallログの確認 {#k-check-heimdall-logs}

`tail -f heimdalld.log`

#### L. Heimdall rest-serverの確認 {#l-check-heimdall-rest-server}

`tail -f heimdalld-rest-server.log`

#### M. Heimdall bridgeログの確認 {#m-check-heimdall-bridge-logs}

`tail -f heimdalld-bridge.log`

#### N. borログの確認 {#n-check-bor-logs}

`tail -f bor.log`

#### O. Bor processを削除 {#o-kill-bor-process}

**linux用**：

1. `ps -aux | grep bor`。Bor用のPIDを取得し、その後次のコマンドを実行します。
2. `sudo kill -9 PID`

**バイナリ用**:

`CS-2003/bor`へアクセスし、`bash stop.sh`を実行

### 3. エラー： アカウントのロックを解除できませんでした （0x...）  特定のアドレスまたはファイルのための鍵がありません。 {#3-error-failed-to-unlock-account-0x-no-key-for-given-address-or-file}

エラーは、password.txtファイルのためのパスが間違っているため、発生します。下記の手順で修正できます：

このエラーは、password.txtとKeystoreファイルのためのパスが間違っているため、発生します。下記の手順で修正できます：

1. Borキーストアファイルを次へコピーします

    /etc/bor/dataDir/keystore

2. password.txtを次へコピーします

    /etc/bor/dataDir/

3. `/etc/bor/metadata`に正しいアドレスが追加されたことを確認してください。

バイナリ用:

1. Borキーストアファイルを次へコピーします：

`/var/lib/bor/keystore/`

2. password.txtを次へコピーします

`/var/lib/bor/password.txt`


### 4. エラー: Wrong Block.Header.AppHash. 予想 xxxx {#4-error-wrong-block-header-apphash-expected-xxxx}

このエラーは通常、Heimdallサービスがブロック上で停止し、Heimdallで利用可能な取り消し方法がないときに発生します。

これを解決するためには、Heimdallを完全にリセットする必要があります：

```bash
    sudo service heimdalld stop

    heimdalld unsafe-reset-all
```

その後、スナップショットから再び同期する必要があります：

```bash
    wget -c <Snapshot URL>

    tar -xzvf <snapshot file> -C <HEIMDALL_DATA_DIRECTORY>

```

Heimdallサービスを再度開始します。


### 5. API鍵を作成するにはどこから作成しますか。 {#5-from-where-do-i-create-the-api-key}

こちらのリンクにアクセスすることができます： [https://infura.io/register](https://infura.io/register) 。アカウントとプロジェクトを設定したら、メインネットではなく、RopstenのためのAPI鍵をコピーしてください。

デフォルトでメインネットが選択されています。

### 6. Heimdallは機能していません。パニックエラーが発生しています。 {#6-heimdall-isn-t-working-i-m-getting-a-panic-error}

**実際のエラー**:私のheimdalldは機能していません。ログで最初の行は次のとおりです：
panic: Unknown db_backend leveldbldb, expected either goleveldb or memdb or fsdb

config.tomlで設定を`goleveldb`に変更する


### 7. HeimdallとBorの残りを削除するにはどうすればよいですか。 {#7-how-do-i-delete-remnants-of-heimdall-and-bor}

HeimdallBorとBorの残りを削除したい場合は次のコマンド実行することができます。
Bor:

Linuxパッケージ用：

```$ sudo dpkg -i matic-bor```

Bor Directoryを削除：

```$ sudo rm -rf /etc/bor```

バイナリ用:

```$ sudo rm -rf /etc/bor```

と

```$ sudo rm /etc/heimdall```


### 8. 何人のバリデータが同時にアクティブになることができるのですか？ {#8-how-many-validators-can-be-active-concurrently}

同時に最大100人のアクティブバリデータがいます。イベント中途中で制限に達した場合、より多くの参加者を招待します。アクティブバリデータはほとんどがアップタイムが高いものであることにご注意ください。ダウンタイムが高い参加者は強制的にアウトされます。

### 9. いくらステーキングすべきですか？ {#9-how-much-should-i-stake}

[stake-amount］と［heimdall-fee-amount］ - それがどのくらいであるべきですか？

ステーキング量には最低でも10Maticトークンが必要であり、Heimdallの手数料は10より大きくなります。たとえば、ステーキング量は400です。その場合Heimdallの手数料は20になります。Heimdallの手数料を20としておくことをお勧めします。

ただし、ステーキングの量とheimdal-fee-amountで入力された値は18桁(10^18)で入力する必要があります。

例、

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 10. バリデータになるよう選ばれましたが、ETHアドレスが間違っています。何をすべきですか？ {#10-i-was-selected-to-become-a-validator-but-my-eth-address-was-incorrect-what-do-i-do}

前に提出したETHアドレスにアクセスできる場合はそのアカウントから現在アカウントにテストトークンを転送することができます。ノード設定のプロセスを開始することができます。

ETHアドレスにアクセスできない場合、トークンを別途転送することはありません。正しいETHアドレスでフォームで再登録することができます。

### 11. ブリッジを開始するのにエラーが発生しています。 {#11-i-m-getting-an-error-starting-the-bridge}

**エラー**: Object "start" is unknown, try "bridge help". これをまだ無視したままでも大丈夫ですか？

[which bridge]（どのブリッジ）を確認する - `/usr/sbin/bridge`の場合、正しい[bridge]（ブリッジ）プログラムを実行していません。

`(or $GOBIN/bridge)`の代わりに`~/go/bin/bridge`を試してください。


### 12. dpkgエラーが発生しています。 {#12-i-m-getting-dpkg-error}

**エラー**: "dpkg: error processing archive matic-heimdall_1.0.0_amd64.deb (--install): trying to overwrite '/heimdalld-rest-server.service', which is also in package matic-node 1.0.0"

主に機器上に過去にインストールされたMaticが原因で、これが発生します。これを解決するために下記を実行できます：

`sudo dpkg -r matic-node`


### 13. バリデータキーを生成したときに追加すべき秘密鍵はどれなのか明らかではありません。 {#13-i-m-not-clear-on-which-private-key-should-i-add-when-i-generate-validator-key}

使用する秘密鍵はウォレットのETHアドレスでPolygonテストネットトークンが格納されています。フォームに送信されたアドレスに結び付けられたひとつの公開と秘密鍵のペアで設定を完了できます。


### 14. Heimdallが同期しているかどうかを知る方法はありますか？ {#14-is-there-a-way-to-know-if-heimdall-is-synced}

次のコマンド実行して、確認できます：

```$ curl [http://localhost:26657/status](http://localhost:26657/status)```

catching_upの値を確認します。falseの場合、ノードはすべて同期されています。


### 15. 誰かがトップ10ステーカーになった場合、最終的にどうすればMatic報酬を受け取ることができますか。 {#15-what-if-someone-become-a-top-10-staker-how-he-will-receive-his-matic-reward-at-the-end}

ステージ1報酬はステークに基づいていません。報酬詳細についてはhttps://blog.matic.network/counter-stake-stage-1-stake-on-the-beach-full-details-matic-network/を参照してください。ステーキングが高い参加者はこのステージで報酬の資格を自動的に取得することはありません。


### 16. Heimdallバージョンは何であるべきですか。 {#16-what-should-be-my-heimdall-version}

Heimdallバージョンを確認するには、次を実行してください：

```heimdalld version```

ステージ1の正確なHeimdallのバージョンは `heimdalld version is beta-1.1-rc1-213-g2bfd1ac`です。


### 17. ステーキング量および手数料に追加すべき値は何ですか。 {#17-what-values-should-i-add-in-the-stake-amount-and-fee-amount}

ステーキング量には最低でも10Maticトークンが必要であり、Heimdallの手数料は10より大きくなります。たとえば、ステーキング量は400です。その場合Heimdallの手数料は20になります。Heimdallの手数料を20としておくことをお勧めします。

ただし、ステーキングの量とheimdal-fee-amountで入力された値は18桁(10^18)で入力する必要があります。

例、

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 18. `/var/lib/heimdall`と`/etc/heimdall?`の違いはなんですか？

`/var/lib/heimdall`はバイナリインストールメソッドを使用する際のHeimdall. dirです。`/etc/heimdall`はLinuxパッケージインストールメソッド用です。


### 19. ステーキングトランザクションを作成するとき、[Gass Exceeded]（ガス超過）エラーが発生しています。 {#19-when-i-make-the-stake-transaction-i-m-getting-gas-exceeded-error}

ステーキングまたは手数料のフォーマットのためにエラーが発生する可能性があります。ステーキングコマンド中に入力された値は18桁（10^18）を持つ必要があります。

ただし、ステーキングの量とheimdal-fee-amountで入力された値は18桁(10^18)で入力する必要があります。

例、

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 20. バリデータになるチャンスはいつですか？ {#20-when-will-i-get-a-chance-to-become-a-validator}

ステージ１イベントの期間中バリデータを徐々に追加していきます。外部バリデータのリストを徐々にリリースします。Discordチャンネルでリストが発表されます。


### 21. Heimdallアカウント情報の場所はどこで見つけることができますか？ {#21-where-can-i-find-heimdall-account-info-location}

For Binaries:

    /var/lib/heimdalld/config folder

Linuxパッケージの場合：

    /etc/heimdall/config


### 22. API鍵を追加するのはどのファイルですか？ {#22-which-file-do-i-add-the-api-key-in}

API鍵を作成したら、`heimdall-config.toml`ファイルにAPI鍵を追加する必要があります。


### 23. persistent_peersを追加するのはどのファイルですか？ {#23-which-file-do-i-add-the-persistent_peers}

ファイルにpersistent_peersを追加できます：

    /var/lib/heimdalld/config/config.toml


### 24. アプリケーションのデータをリセットせずにTendermintをリセットしましたか？ {#24-did-you-reset-tendermint-without-resetting-your-application-s-data}

このような場合、Heimdallの設定データをリセットしてインストールを再度実行してください。

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge


### 25. エラー: unmarshall設定エラー1エラーデコードできません。 {#25-error-unable-to-unmarshall-config-error-1-error-s-decoding}

エラー：`* '' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract`

誤字、パーツが欠けている、残っている古い設定ファイルが存在する場合、これが起こります。残っているものをクリアしてから再度設定してください。

### 26. HeimdallおよびBorサービスを停止します。 {#26-to-stop-heimdall-and-bor-services}

**Linuxパッケージ用**:

Heimdallを停止する： `sudo service heimdalld stop`

Borを停止する： `sudo service bor stop` または

1. `ps -aux | grep bor`。Bor用のPIDを取得し、その後次のコマンドを実行します。
2. `sudo kill -9 PID`

**バイナリ用**:

Heimdallを停止する： `pkill heimdalld`

ブリッジを停止する：`pkill heimdalld-bridge`

Borの停止: CS-2001/borへアクセスし、`bash stop.sh`を実行します。

### 27. HeimdallとBorディレクトリを削除 {#27-to-remove-heimdall-and-bor-directories}

**Linuxパッケージ用**：
Heimdall削除: `sudo rm -rf /etc/heimdall/*`

Borを削除： `sudo rm -rf /etc/bor/*`

**バイナリ用**:

Heimdall削除: `sudo rm -rf /var/lib/heimdalld/`

Borを削除： `sudo rm -rf /var/lib/bor`

### 28. [Wrong Block.Header.AppHash]エラーが発生したときに何をすべきですか？ {#28-what-to-do-when-you-get-wrong-block-header-apphash-error}

このエラーは通常、Infuraのリクエストが殺到することで発生します。Polygonでノード設定をすると、設定ファイル（Heimdall）にInfura鍵を追加します。デフォルトでは1日あたり100kリクエストが許可されています。この制限を超えると、このような問題が発生します。これを解決するために新しいAPI鍵を作成し、`config.toml`ファイルに追加することができます。