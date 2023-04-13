---
id: full-node-deployment
title: Ansibleでフルノードを実行する
description: Ansibleを使用してフルノードを展開する
keywords:
  - docs
  - polygon
  - matic
  - node
  - full node setup
  - ansible
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

このチュートリアルでは、Ansibleを使用してフルノードを開始して実行する方法を説明します。

[Ansibleのプレイブック](https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html)を使用します。フルノードを設定および管理します。システム要件については[、最小技術](technical-requirements.md)要件ガイドを参照してください。

:::tip

このガイドのステップには、HeimdallとBorサービスが完全に同期するのを待つものがあります。このプロセスは、完了までに数日かかります。

あるいは、維持されたスナップショットを使用することもできます。同期時間を数時間に短縮できます。詳細については[<ins>Snapshot Instructions for Heimdall and Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor)を参照してください。

スナップショットのダウンロードリンクについては、[<ins>Polygonチェーンスナップショット</ins>](https://snapshot.polygon.technology/)のページを参照してください。

:::

## 前提条件 {#prerequisites}

- Python3.xでローカルマシンにAnsibleをインストールします。このセットアップは、Python2.xを使用している場合には動作しません。
    - Python 3.xでAnsibleをインストールするには、pipを使用することができます。マシンにピップがない場合は、[ここ](https://pip.pypa.io/en/stable/)に概要した手順に従ってください。インストールする`pip3 install ansible`実行アンシブルです。
- [Polygon PoS Ansibleリポジトリ](https://github.com/maticnetwork/node-ansible#requirements)を確認してください。要件。
- 環境にGoが**インストールされていない**ことを確認する必要があります。Ansibleでは、Goの特定のパッケージをインストールする必要があるため、GoをインストールしたAnsibleを介してフルノードをセットアップしようとすると、問題が発生します。
- また、VM/マシンに、Polygonバリデータ、Heimdall、またはBor用に設定したセットアップがないことを確認する必要があります。セットアップで問題が発生するため、それらを削除する必要があります。

:::info Heimdallソースの強化

最新のHeimdallバージョンである**[v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0)**には、いくつかの機能が追加されています。異なるバリデーターのコントラクトイベント間の遅延時間が**増加**し、メンバーが満たされないようにします。チェーンが進行を妨げる可能性のあるイベントがバーストした場合には、迅速に。

さらに、**ステート同期のtxsで（バイトで表す場合）、60Kb（文字列として定義される場合）に制限されています。**例：

```bash
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```
:::

## フルノード設定 {#full-node-setup}

- フルノードが設定されているリモートマシンまたはVMにアクセスできることを確認します。
  > 詳細は[https://github.com/maticnetwork/node-ansible#setup](https://github.com/maticnetwork/node-ansible#setup)を参照してください。
- [https://github.com/maticnetwork/node-ansible](https://github.com/maticnetwork/node-ansible)リポジトリをクローンします。
- ノード・アンシブルフォルダーに移動します：`cd node-ansible`
- `inventory.yml`ファイルを編集し、セクションにIPを挿入します`sentry->hosts`。
  > 詳細は[https://github.com/maticnetwork/node-ansible#inventory](https://github.com/maticnetwork/node-ansible#inventory)を参照してください。
- リモートマシンが実行されているかどうかを確認してください：`ansible sentry -m ping`
- 正しいマシンが設定されているかどうかをテストするには、次のコマンドを実行します：

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry" --list-hosts

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry" --list-hosts
  ```

  <img src={useBaseUrl("img/network/full-node-mumbai.png")} />

- 次に、このコマンドでフルノードを設定します：

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry"

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry"
  ```

- 問題が発生した場合、設定全体を削除してクリーンする方法を説明します：
  ```
  ansible-playbook playbooks/clean.yml
  ```

- Ansibleのプレイブックを開始したら、リモートマシンにログインします。

- Heimdallシードノード：

  ```bash
  moniker=<enter unique identifier>

  # Mainnet:
  seeds="d3a8990f61bb3657da1664fe437d4993c4599a7e@3.211.248.31:26656,d3d7d397339c9126235dfab11bf925e269776f4f@3.212.183.151:26656,68254d33685fad151e45bfe1ed33d538ba6ec8cb@3.93.224.197:26656,d26c54ebbf274896f12977bb13d83ac1237a8226@184.73.124.158:26656,f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656"

  # Testnet:
  seeds="b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656,4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,7a6c7b5d25b13ce3448b047dbebeb1a19cc2e092@18.213.200.99:26656"
  ```
- ブートノード：

  ```bash
  # Mainnet:
  bootnode ["enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303","enode://4be7248c3a12c5f95d4ef5fff37f7c44ad1072fdb59701b2e5987c5f3846ef448ce7eabc941c5575b13db0fb016552c1fa5cca0dda1a8008cf6d63874c0f3eb7@3.93.224.197:30303","enode://32dd20eaf75513cf84ffc9940972ab17a62e88ea753b0780ea5eca9f40f9254064dacb99508337043d944c2a41b561a17deaad45c53ea0be02663e55e6a302b2@3.212.183.151:30303"]

  # Testnet:
  bootnodes ["enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303","enode://f0f48a8781629f95ff02606081e6e43e4aebd503f3d07fc931fad7dd5ca1ba52bd849a6f6c3be0e375cf13c9ae04d859c4a9ae3546dc8ed4f10aa5dbb47d4998@34.226.134.117:30303"]
  ```

- Heimdallが同期されているかチェックするには：
    - リモートマシン/VM上で、`curl localhost:26657/status`を実行します
    - 出力では、`catching_up`バリューは、`false`となる必要があります

- Heimdallが同期されると、実行します。
    - `sudo service bor start`

Ansibleでフルノードを設定することに成功しました。

:::note

Borがデータへのアクセス許可のエラーを示した場合、このコマンドを実行してBorユーザーをBorファイルの所有者にさせることができます：

```bash
sudo chown bor /var/lib/bor
```

:::
## ログ {#logs}

ログは、`journalctl`linuxツールで管理できます。詳細な使用方法を説明します：[Journalctlを使用してSystemdログを表示および操作する方法](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs)。

**Heimdallノードログをチェックする**

```bash
journalctl -u heimdalld.service -f
```

**Borのリストサーバーログを確認する**

```bash
journalctl -u bor.service -f
```

## ポートとファイアウォールのセットアップ {#ports-and-firewall-setup}

セントリーノードファイアウォール上のワールド (0.0.0.0/0) に対して、ポート22、26656、および30303を開きます。

要件とセキュリティガイドラインに従って、VPNを使用してポート22へのアクセスを制限できます。