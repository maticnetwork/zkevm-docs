---
id: full-node-docker
title: Dockerでフルノード実行をする
sidebar_label: Run a full node with Docker
description:  Dockerを使用してフルノードを実行する方法
keywords:
  - docs
  - matic
  - docker
  - full node
  - polygon
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygonチームは、Polygon Mainnetでノードを実行するために使用できる公式のDockerイメージを配布しています。これらの手順は、フルノードを実行するためのものですが、セントリーノードやバリデータを実行する場合にも適用できます。

:::tip スナップショット

ゼロから同期するのに時間がかかることがあります。プロセスをスピードアップしたい場合は、ここに記載されている手順に従ってください：[<ins>HeimdallとBorのためのスナップショットの説明</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor)書

これは最新の手順になりますが、大まかに以下のステップのようなことを行うことができます：
```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# at this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```

スナップショットをより速くダウンロードするために`aria2c`使用されます。ダウンロードしたスナップショットを直接抽出できる方法が代替可能です。

**そのための手順：**

```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::

## 前提条件 {#prerequisites}

Polygonフルノードを実行するための一般的な設定では、**少なくとも**4つのCPU/コアと16GBのRAMを搭載しています。このチュートリアルでは、AWSと`t3.2xlarge`インスタンスタイプを使用します。このアプリケーションは、x86とArmアーキテクチャの両方で実行できます。

これらの手順は、Dockerに基づいているため、ほぼすべてのオペレーティングシステムで、それに簡単に従うことができますが、ここではUbuntuを使用しています。

スペースに関しては、フルノードのために**、おそらく2.5から5テラバイト（またはより速い）のSSD**ストレージが必要です。

通常、Polygonフルノードのピア取引は、開いているポート30303と26656に依存します。ファイアウォールまたはセキュリティグループをAWSに設定する際は、マシンにアクセスする必要のあるポートとともにこれらのポートが開いていることを確認してください。

TLDR：

- 少なくとも4コアと16GB RAMを搭載したマシンを使用する
- 2.5 TBから5 TBの高速ストレージがあることを確認してください。
- パブリックIPを使用し、ポート30303および26656を開く

## 初期セットアップ {#initial-setup}
この時点で、Linuxマシンへのルート権限によるシェルアクセスが必要です。

![img](/img/full-node-docker/term-access.png)

### Dockerをインストールする {#install-docker}
ほとんどの場合、デフォルトでは、オペレーティングシステムに、Dockerがインストールされていません。以下を参照して、特定のディストリビューションの手順に従うようにしてください：https://docs.docker.com/engine/install/

ここれは、Ubuntuの手順に従っています。手順は、以下に含まれていますが、更新されている場合は、公式のステップを参照してください。

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

この時点で、Dockerがインストールされている必要があります。検証するには、以下のようにコマンド実行ができる必要があります：

```bash
sudo docker run hello-world
```

![img](/img/full-node-docker/hello-world.png)

多くの場合、dockerを`root`ユーザとして実行するのは不便なので、インストール後のステップ[こちら](https://docs.docker.com/engine/install/linux-postinstall/)に従って、`root`にならなくても、dockerとやり取りできるようにします：

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

これで、ログアウトして再度ログインすると、`sudo`なしでdockerコマンドを実行できるはずです。

### ディスクのセットアップ {#disk-setup}
ここで必要な正確なステップは、ニーズによって大きく異なります。ほとんどの場合、1つのデバイス上で、オペレーティングシステムを実行するルートパーティションを作成します。ブロックチェーンデータを実際に保持するために、おそらく、1つ以上のデバイスが必要になるでしょう。 チュートリアルの残りの部分では、追加のデバイスを`/mnt/data`にマウントします。

この例では、4TBの利用可能なスペースを持つデバイスがあります`/dev/nvme1n1`。次の手順でマウントします：

```bash
sudo mkdir /mnt/data
sudo mount /dev/nvme1n1 /mnt/data
```

マウントが良く見えるようにするために、`df -h`を使用します。

![img](/img/full-node-docker/space.png)

これで問題がなければ、このマウントに、BorとHeimdallのホームディレクトリを作成することもできます。

```bash
sudo mkdir /mnt/data/bor
sudo mkdir /mnt/data/heimdall
```

ユースケースとオペレーティングシステムに応じて、デバイスがマウントされていることを確認するために、システムの再起動時に、`/etc/fstab`でエントリを作成する必要があります。

この場合、以下のようないくつかのステップに従っています：

```bash
# Use blkid to get the UUID for the device that we're mounting
blkid

# Edit the fstab file  and add a line to mount your device
# UUID={your uuid}		/mnt/data	{your filesystem}	defaults	0	1
sudo emacs /etc/fstab

# use this to verify the fstab actually works
sudo findmnt --verify --verbose
```

この時点で、再起動して、システムがマウントを適切にロードするか確認できるはずです。

### Heimdallのセットアップ {#heimdall-setup}

この時点で、Dockerが実行されているホストがあり、Polygonノードソフトウェアを実行するための十分なストレージがマウントされていますね。それでは、Heimdallを設定して実行しましょう。

まず、DockerでHeimdallを実行できるか確認しましょう。以下のコマンドを実行します：

```bash
docker run -it 0xpolygon/heimdall:0.3.0 heimdallcli version
```

DockerでHeimdallを初めて実行する場合は、必要なイメージが自動的にプルされ、バージョン情報が出力されます。

![img](/img/full-node-docker/heimdall-version.png)

Heimdallイメージの詳細を確認したり、別のタグを見つけたりするには、Docker Hubのリポジトリ（https://hub.docker.com/repository/docker/0xpolygon/heimdall）を参照してください。

この時点で、Heimdallの`init`コマンドを実行して、ホームディレクトリをセットアップしましょう。

```bash
docker run -v /mnt/data/heimdall:/heimdall-home:rw --entrypoint /usr/bin/heimdalld -it 0xpolygon/heimdall:0.3.0 init --home=/heimdall-home
```

何か問題が発生した場合に、このコマンドを少し分割してみましょう。

* dockerでコマンドを実行`docker run`するために使用しています。

* スイッチ`-v /mnt/data/heimdall:/heimdall-home:rw`は非常に重要です。ホストシステム`/mnt/data/heimdall`から先に作成したフォルダをdockerボリュームとしてコンテナ内`/heimdall-home`にマウントしています。

* `rw`により、コマンドは、このdockerボリュームへの書き込みがができます。すべての意図と目的のために、dockerコンテナ内からHeimdall用のホームディレクトリが行われます`/heimdall-home`。

* 引数は、このコンテナのデフォルトのエントリーポイントにオーバーライドされます`--entrypoint /usr/bin/heimdalld`。

* `-it`スイッチを使用して、コマンドをインタラクティブに実行します。

* 最後に、どの画像を実行したいかを指定します`0xpolygon/heimdall:0.3.0`。

* その後、`init --home=/heimdall-home`は、heimdalldの実行可能ファイルに渡される引数となっています。`init`は、実行したいコマンドで、`--home`は、ホームディレクトリの場所を指定するために使用されます。

`init`コマンドを実行した後、`/mnt/data/heimdall`ディレクトリは、以下のような構造になっているはずです。

![img](/img/full-node-docker/heimdall-tree.png)

ここで、Heimdallを開始する前に、いくつかの更新を行う必要があります。まず、`config.toml`ファイルを編集します。

```bash
# Open the config.toml and and make three edits
# moniker = "YOUR NODE NAME HERE"
# laddr = "tcp://0.0.0.0:26657"
# seeds = "LATEST LIST OF SEEDS"

sudo emacs /mnt/data/heimdall/config/config.toml
```

シードのリストがない場合は、フルノードのセットアップに関するドキュメントを参照してください。この場合、ファイルには、以下の3行があります：

```
# A custom human readable name for this node
moniker="examplenode01"

# TCP or UNIX socket address for the RPC server to listen on
laddr = "tcp://0.0.0.0:26657"

# Comma separated list of seed nodes to connect to
seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
```

:::caution

ファイル`laddr`には2つあります`config.toml`。セクションの下にある`laddr`パラメーターのみを変更するようにしてください`[rpc]`。

:::

さて、`config.toml`ファイルがすべて設定されたところで、`heimdall-config.toml`ファイルに2つの小さな変更を加える必要があります。お気に入りのエディタを使用して、以下の2つの設定を更新します。

```
# RPC endpoint for ethereum chain
eth_rpc_url = "http://localhost:9545"

# RPC endpoint for bor chain
bor_rpc_url = "http://localhost:8545"
```

`eth_rpc_url`は、Ethereum Mainnet RPCに使用するURLに更新する必要があります。私たちの場合`bor_rpc_url`には、更新されます。`http://bor:8545`編集を行った後、ファイルには次の行があります：

```
# RPC endpoint for ethereum chain
eth_rpc_url = "https://eth-mainnet.g.alchemy.com/v2/ydmGjsREDACTED_DONT_USE9t7FSf"

# RPC endpoint for bor chain
bor_rpc_url = "http://bor:8545"
```

デフォルトの`init`コマンドは、`genesis.json`を提供しますが、Polygon MainnetまたはMumbaiでは機能しません。Mainnetノードをセットアップしている場合は、以下のコマンドを実行して、正しいジェネシスファイルをダウンロードできます。

```bash
sudo curl -o /mnt/data/heimdall/config/genesis.json https://raw.githubusercontent.com/maticnetwork/heimdall/master/builder/files/genesis-mainnet-v1.json
```

正しいファイルがあることを確認したい場合は、次のハッシュをチェックできます。

```
# sha256sum genesis.json
498669113c72864002c101f65cd30b9d6b159ea2ed4de24169f1c6de5bcccf14  genesis.json
```

## Heimdallをスタートする {#starting-heimdall}
Heimdallをスタートする前に、dockerネットワークを作成し、コンテナが名前に基づいて相互に簡単にネットワーク接続できるようします。ネットワークを作成するには、以下のコマンドを実行します：

```bash
docker network create polygon
```

さて、Heimdallをスタートします。以下のコマンドを実行します：

```bash
docker run -p 26657:26657 -p 26656:26656 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdall --entrypoint /usr/bin/heimdalld -d --restart unless-stopped  0xpolygon/heimdall:0.3.0 start --home=/heimdall-home
```

このコマンドの多くの部分は見慣れたものですね。それでは、何をすべきかについて話しましょう。

* `-p 26657:26657`と`-p 26656:26656`スイッチは、ポートマッピングです。これにより、dockerにホストポートをコンテナポート`26657`にマップするよう指示します`26657`。`26656`

* `--net polygon`スイッチは、dockerに、このコンテナをPolygonネットワークで実行するように伝えます。

* `--name heimdall`デバッグに便利なコンテナを名前付けていますが、他のコンテナにHeimdallに接続するために使用される名前です。

* `-d`引数は、dockerにバックグラウンドでこのコンテナを実行するように指示します。

* スイッチは、手動で停止しない限り、コンテナを自動的に再起動するようにdockerに`--restart unless-stopped`指示します。

* 最後に、ホームディレクトリを設定`init`するだけでなく、実際にアプリケーションを実行するために使用`start`されています。

この時点で、何が起こっているのかをチェックし、確認すると役に立ちます。これら2つのコマンドは、役に立ちます：

```bash
# ps will list the running docker processes. At this point you should see one container running
docker ps

# This command will print out the logs directly from the heimdall application
docker logs -ft heimdall
```

この時点で、Heimdallは同期をスタートするはずです。ログを見ると、次のように見える情報のログが流出していることがわかります：

```
2022-12-14T19:43:23.687640820Z INFO [2022-12-14|19:43:23.687] Executed block                               module=state height=26079 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.721220869Z INFO [2022-12-14|19:43:23.721] Committed state                              module=state height=26079 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.730533414Z INFO [2022-12-14|19:43:23.730] Executed block                               module=state height=26080 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.756646938Z INFO [2022-12-14|19:43:23.756] Committed state                              module=state height=26080 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.768129711Z INFO [2022-12-14|19:43:23.767] Executed block                               module=state height=26081 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.794323918Z INFO [2022-12-14|19:43:23.794] Committed state                              module=state height=26081 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.802989809Z INFO [2022-12-14|19:43:23.802] Executed block                               module=state height=26082 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.830960386Z INFO [2022-12-14|19:43:23.830] Committed state                              module=state height=26082 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.840941976Z INFO [2022-12-14|19:43:23.840] Executed block                               module=state height=26083 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.866564767Z INFO [2022-12-14|19:43:23.866] Committed state                              module=state height=26083 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.875395744Z INFO [2022-12-14|19:43:23.875] Executed block                               module=state height=26084 validTxs=0 invalidTxs=0
```

このような情報が表示されない場合、ノードが十分なピアを見つけられていない可能性があります。この時点で役に立つもう1つのコマンドは、Heimdall同期の状態をチェックするためのRPC呼び出しです。

```bash
curl localhost:26657/status
```

これは、以下のような応答をリターンします：

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "node_info": {
      "protocol_version": {
        "p2p": "7",
        "block": "10",
        "app": "0"
      },
      "id": "0698e2f205de0ffbe4ca215e19b2ee7275d2c334",
      "listen_addr": "tcp://0.0.0.0:26656",
      "network": "heimdall-137",
      "version": "0.32.7",
      "channels": "4020212223303800",
      "moniker": "examplenode01",
      "other": {
        "tx_index": "on",
        "rpc_address": "tcp://0.0.0.0:26657"
      }
    },
    "sync_info": {
      "latest_block_hash": "812700055F33B175CF90C870B740D01B0C5B5DCB8D22376D2954E1859AF30458",
      "latest_app_hash": "83A1568E85A1D942D37FE5415F3FB3CBD9DFD846A42CBC247DFD6ABB9CE7E606",
      "latest_block_height": "16130",
      "latest_block_time": "2020-05-31T17:06:31.350723885Z",
      "catching_up": true
    },
    "validator_info": {
      "address": "3C6058AF387BB74D574582C2BEEF377E7A4C0238",
      "pub_key": {
        "type": "tendermint/PubKeySecp256k1",
        "value": "BOIKA6z1q3l5iSJoaAiagWpwUw3taAhiEMyZ9ffxAMznas2GU1giD5YmtnrB6jzp4kkIqv4tOmuGYILSdy9+wYI="
      },
      "voting_power": "0"
    }
  }
}
```

この初期セットアップ段階では、`sync_info`フィールドに注意を払うことが重要です。`catching_up`がtrueの場合は、Heimdallが完全に同期されていないことを意味します。`sync_info`内の他のプロパティを確認して、Heimdallがどれだけ遅延しているかを把握できます。

## Borをスタートする {#starting-bor}

この時点では、Heimdallを正常に実行しているノードが必要です。これで、Borを実行する準備が整いました。

Borを使い始める前に、Heimdallレストサーバーを実行する必要があります。このコマンドは、BorがHeimdallから情報を取得するために使用するREST APIをスタートします。サーバーを開始するコマンドは次のとおりです：

```bash
docker run -p 1317:1317 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdallrest --entrypoint /usr/bin/heimdalld -d --restart unless-stopped 0xpolygon/heimdall:0.3.0 rest-server --home=/heimdall-home --node "tcp://heimdall:26657"
```

このコマンドには、注目に値する異なる2つの部分があります。`start`コマンドを実行するのではなく、`rest-server`コマンドを実行しています。また、残りのサーバーに、Heimdallとの通信方法を伝える`~–node “tcp://heimdall:26657”~`を渡します。

このコマンドが正常に`docker ps`実行されると、実行すると、2つのコマンドコンテナが実行されているはずです。さらに、このコマンドを実行すると、いくつかの基本的な出力が表示されます。

```bash
curl localhost:1317/bor/span/1
```

Borは、このインターフェースに依存します。JSON出力が表示されないと問題が発生します！

次に、具体的にBor用の`genesis`ファイルをダウンロードしてみましょう：

```bash
sudo curl -o /mnt/data/bor/genesis.json 'https://raw.githubusercontent.com/maticnetwork/bor/master/builder/files/genesis-mainnet-v1.json'
```

このファイルの`sha256 sum`をもう一度検証しましょう。

```
# sha256sum genesis.json
5c10eadfa9d098f7c1a15f8d58ae73d67e3f67cf7a7e65b2bd50ba77eeac67e1  genesis.json
```

Borを開始するためのデフォルト設定ファイルを作成する必要があります。

```bash
docker run -it  0xpolygon/bor:0.3.3 dumpconfig | sudo tee /mnt/data/bor/config.toml
```

このコマンドはデフォルト設定で .tomlファイルを生成します。ファイルにいくつかの変更を加える予定ですので、お気に入りのエディタで開き、いくつかの更新を行います。注：変更された行のみを表示しています。

参考のために、Borイメージの詳細はこちらをご覧ください：[https://hub.docker.com/repository/docker/0xpolygon/bor](https://hub.docker.com/repository/docker/0xpolygon/bor)

```bash
# Similar to moniker, you might want to update this with a name of your own choosing
identity = "docker.example"

# Setting this to the location of a mount that we'll make
datadir = "/bor-home"

# We'll want to specify some boot nodes
[p2p]
  [pep.discovery]
    bootnodes = ["enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303", "enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303"]

# Because we're running inside docker, we'll likely need to change the way we connect to heimdall
[heimdall]
  url = "http://heimdallrest:1317"

# Assumming you want to access the RPC, you'll need to make a change here as well
[jsonrpc]
  [jsonrpc.http]
    enabled = true
    host = "0.0.0.0"
```

この時点で、Borをスタートする準備ができているはずです。以下のコマンドを使用します：
```bash
docker run -p 30303:30303 -p 8545:8545 -v /mnt/data/bor:/bor-home:rw --net polygon --name bor -d --restart unless-stopped  0xpolygon/bor:0.3.3 server --config /bor-home/config.toml
```

すべてがうまくいけば、次のように見えるログがたくさん表示されるはずです：

```bash
2022-12-14T19:53:51.989897291Z INFO [12-14|19:53:51.989] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:47:46Z
2022-12-14T19:53:51.989925064Z INFO [12-14|19:53:51.989] Fetching state sync events               queryParams="from-id=4&to-time=1590882466&limit=50"
2022-12-14T19:53:51.997640841Z INFO [12-14|19:53:51.997] StateSyncData                            Gas=0       Block-number=12800 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.021990622Z INFO [12-14|19:53:52.021] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:49:58Z
2022-12-14T19:53:52.022015930Z INFO [12-14|19:53:52.021] Fetching state sync events               queryParams="from-id=4&to-time=1590882598&limit=50"
2022-12-14T19:53:52.040660857Z INFO [12-14|19:53:52.040] StateSyncData                            Gas=0       Block-number=12864 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.064795784Z INFO [12-14|19:53:52.064] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:52:10Z
2022-12-14T19:53:52.064828634Z INFO [12-14|19:53:52.064] Fetching state sync events               queryParams="from-id=4&to-time=1590882730&limit=50"
2022-12-14T19:53:52.085029612Z INFO [12-14|19:53:52.084] StateSyncData                            Gas=0       Block-number=12928 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.132067703Z INFO [12-14|19:53:52.131] ✅ Committing new span                    id=3                startBlock=13056 endBlock=19455 validatorBytes=f8b6d906822710940375b2fc7140977c9c76d45421564e354ed42277d9078227109442eefcda06ead475cde3731b8eb138e88cd0bac3d9018238a2945973918275c01f50555d44e92c9d9b353cadad54d905822710947fcd58c2d53d980b247f1612fdba93e9a76193e6d90482271094b702f1c9154ac9c08da247a8e30ee6f2f3373f41d90282271094b8bb158b93c94ed35c1970d610d1e2b34e26652cd90382271094f84c74dea96df0ec22e11e7c33996c73fcc2d822 producerBytes=f8b6d906822710940375b2fc7140977c9c76d45421564e354ed42277d9078227109442eefcda06ead475cde3731b8eb138e88cd0bac3d9018238a2945973918275c01f50555d44e92c9d9b353cadad54d905822710947fcd58c2d53d980b247f1612fdba93e9a76193e6d90482271094b702f1c9154ac9c08da247a8e30ee6f2f3373f41d90282271094b8bb158b93c94ed35c1970d610d1e2b34e26652cd90382271094f84c74dea96df0ec22e11e7c33996c73fcc2d822
2022-12-14T19:53:52.133545235Z INFO [12-14|19:53:52.133] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:54:22Z
2022-12-14T19:53:52.133578948Z INFO [12-14|19:53:52.133] Fetching state sync events               queryParams="from-id=4&to-time=1590882862&limit=50"
2022-12-14T19:53:52.135049605Z INFO [12-14|19:53:52.134] StateSyncData                            Gas=0       Block-number=12992 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.152067646Z INFO [12-14|19:53:52.151] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:56:34Z
2022-12-14T19:53:52.152198357Z INFO [12-14|19:53:52.151] Fetching state sync events               queryParams="from-id=4&to-time=1590882994&limit=50"
2022-12-14T19:53:52.176617455Z INFO [12-14|19:53:52.176] StateSyncData                            Gas=0       Block-number=13056 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.191060112Z INFO [12-14|19:53:52.190] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:58:46Z
2022-12-14T19:53:52.191083740Z INFO [12-14|19:53:52.190] Fetching state sync events               queryParams="from-id=4&to-time=1590883126&limit=50"
2022-12-14T19:53:52.223836639Z INFO [12-14|19:53:52.223] StateSyncData                            Gas=0       Block-number=13120 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.236025906Z INFO [12-14|19:53:52.235] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:00:58Z
2022-12-14T19:53:52.236053406Z INFO [12-14|19:53:52.235] Fetching state sync events               queryParams="from-id=4&to-time=1590883258&limit=50"
2022-12-14T19:53:52.269611566Z INFO [12-14|19:53:52.269] StateSyncData                            Gas=0       Block-number=13184 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.283199351Z INFO [12-14|19:53:52.283] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:03:10Z
2022-12-14T19:53:52.283737573Z INFO [12-14|19:53:52.283] Fetching state sync events               queryParams="from-id=4&to-time=1590883390&limit=50"
2022-12-14T19:53:52.314141359Z INFO [12-14|19:53:52.314] StateSyncData                            Gas=0       Block-number=13248 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.325150782Z INFO [12-14|19:53:52.325] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:05:22Z
2022-12-14T19:53:52.325171075Z INFO [12-14|19:53:52.325] Fetching state sync events               queryParams="from-id=4&to-time=1590883522&limit=50"
2022-12-14T19:53:52.354470271Z INFO [12-14|19:53:52.354] StateSyncData                            Gas=0       Block-number=13312 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.372354857Z INFO [12-14|19:53:52.372] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:07:34Z
2022-12-14T19:53:52.372389214Z INFO [12-14|19:53:52.372] Fetching state sync events               queryParams="from-id=4&to-time=1590883654&limit=50"
2022-12-14T19:53:52.398246950Z INFO [12-14|19:53:52.398] StateSyncData                            Gas=0       Block-number=13376 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.413321099Z INFO [12-14|19:53:52.413] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:09:46Z
2022-12-14T19:53:52.413345355Z INFO [12-14|19:53:52.413] Fetching state sync events               queryParams="from-id=4&to-time=1590883786&limit=50"
2022-12-14T19:53:52.437176855Z INFO [12-14|19:53:52.437] StateSyncData                            Gas=0       Block-number=13440 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.450356966Z INFO [12-14|19:53:52.450] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:11:58Z
```

Borの同期状態をチェックするには、いくつかの方法があります。最も単純なのは、`curl`の場合です:

```bash
curl 'localhost:8545/' \
--header 'Content-Type: application/json' \
-d '{
	"jsonrpc":"2.0",
	"method":"eth_syncing",
	"params":[],
	"id":1
}'
```

このコマンドを実行すると、次のような結果が得られます：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x2eebf",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodeBytes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x1d4ee3e",
    "startingBlock": "0x0",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

これは、同期されている `currentBlock`と、認識している`highestBlock`を示します。すでにノードが同期されている場合は、取得する必要があります`false`。

## スナップショット {#snapshots}
ゼロから同期するのに時間がかかることがあります。プロセスをスピードアップしたい場合は、ここに記載されている手順に従ってください：[https://docs.polygon.technology/docs/develop/network-details/snapshot-instructures-heimdall-bor/](https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/)

これは最新の手順になりますが、大まかに以下のステップのようなことを行うことができます：

```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# At this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```
