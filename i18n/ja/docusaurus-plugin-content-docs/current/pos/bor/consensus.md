---
id: consensus
title: Borコンセンサス
description: 新しいプロデューサーを取得するためのメカニズム
keywords:
  - docs
  - matic
  - Bor Consensus
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Borコンセンサス {#bor-consensus}

Borコンセンサスは、Cliqueコンセンサスに触発されています：[https://eips.ethereum.org/EIPS/eip-225](https://eips.ethereum.org/EIPS/eip-225)。Cliqueは事前に定義された複数のプロデューサーと連携します。すべてのプロデューサは、CliqueAPIを使用して新しいプロデューサに投票します。ブロックを作成するターンになります。

Borは、スパンとスプリントの管理メカニズムを介して新しいプロデューサをフェッチします。

## バリデータ {#validators}

Polygonは、プルーフ・オブ・ステークシステムです。だれでもEthereumのスマートコントラクト「ステーキングコントラクト」でMaticトークンをステーキングし、システムのバリデータになることができます。

```jsx
function stake(
	uint256 amount,
	uint256 heimdallFee,
	address signer,
	bool acceptDelegation
) external;
```

一旦バリデータがHeimdallでアクティブになると、`bor`モジュールを介してプロデューサに選ばれます。

スパン管理を詳細に理解するには、Borの概要を確認してください：[Borの概要](https://www.notion.so/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab)

## スパン {#span}

利用可能なすべてのバリデータの中からバリデータセットが選択されるブロックの論理的に定義されています。Heimdallは、span-details APIを通じてスパンの詳細を提供します。

```go
// HeimdallSpan represents span from heimdall APIs
type HeimdallSpan struct {
	Span
	ValidatorSet      ValidatorSet `json:"validator_set" yaml:"validator_set"`
	SelectedProducers []Validator  `json:"selected_producers" yaml:"selected_producers"`
	ChainID           string       `json:"bor_chain_id" yaml:"bor_chain_id"`
}

// Span represents a current bor span
type Span struct {
	ID         uint64 `json:"span_id" yaml:"span_id"`
	StartBlock uint64 `json:"start_block" yaml:"start_block"`
	EndBlock   uint64 `json:"end_block" yaml:"end_block"`
}

// Validator represents a volatile state for each Validator
type Validator struct {
	ID               uint64         `json:"ID"`
	Address          common.Address `json:"signer"`
	VotingPower      int64          `json:"power"`
	ProposerPriority int64          `json:"accum"`
}
```

Geth（この場合はBor）は、`snapshot`ブロックを使用して、コンセンサス関連データを含む各ブロック用の状態データを保存します。

スパンの各バリデータには投票権があります。この権利により、バリデータはブロックプロデューサに選ばれます。より大きな権利を持つと、ブロックプロデューサになる可能性がより高くなります。Borは、Tendermintのアルゴリズムを同様に使用します。出典：[https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go)

## スプリント {#sprint}

スパン内のブロックのセットで、プロックを生成するのに単一のブロックプロデューサだけが選ばれます。スプリントサイズはスパンのサイズの要素です。Borは`validatorSet`を使用して、現在のスプリントに現在のプロポーザー／プロデューサを取得します。

```go
currentProposerForSprint := snap.ValidatorSet().Proposer
```

現在のプロポーザーとは別に、Borはバックアッププロデューサを選択します。

## ブロックを承認する {#authorizing-a-block}

Borのプロデューサは署名者とも呼ばれます。これは、ネットワークのブロックを承認するために、プロデューサが**署名自体以外のすべてを含む**ブロックのハッシュに署名をしなければならないためです。つまり、ハッシュは、ヘッダのすべてのフィールドと65バイトの署名サフィックスを除いた`extraData`を含みます。

このハッシュは、標準`secp256k1`カーブを用いて署名され、その結果の65バイトの署名は、末尾の65バイトサフィックスとして`extraData`に組み込まれます。

署名された各ブロックはブロックに重みづけを行う難易度に割り当てられます。In-turn（ターン内）の署名（`DIFF_INTURN`）はターン外の署名（`DIFF_NOTURN`）より重みをもちます。

### 承認戦略 {#authorization-strategies}

プロデューサは、上記の仕様に準拠している限り、適合するブロックを承認して配布できます。しかし、次に提案する戦略は、ネットワークトラフィックと小さなフォークを削減します。以下は、提案する機能です：

- プロデューサがブロックへの署名を許可されている場合（承認リストににっている場合）
    - 次のブロックの最適署名時間（親＋`Period`）を計算する
    - プロデューサがIn-turn（ターン内）になっている場合は、正確な時間が到着するまで待機してから、すぐに署名して配信する
    - プロデューサがout-of-turn（ターン外）になっている場合、`wiggle`により署名を遅らせる

この小さな戦略により、ターン内のプロデューサ（ブロックがより重いもの）は、ターン外の署名者に対し、署名と伝播を行うのに若干有利になることができます。また、このスキームにより、プロデューサの数を増加させることで、若干のスケールが可能です。

### Out-of-turn（ターン外）署名 {#out-of-turn-signing}

Borは、ターン内ブロデューサがブロックを生成しない際、バックアップとして複数のブロックプロデューサを選びます。これは、以下のような様々な理由で発生する可能性があります。：

- ブロックプロデューサノードがダウンしている
- ブロックプロデューサがブロックを保持しようとしている
- ブロックプロデューサが意図的にブロックを生成しません。

上記のことが発生した場合、Borのバックアップメカニズムが開始されます。

バリデータのセットは、いつでも署名者のアドレスに基づいてソートされた配列として格納されます。こう考えてください、バリデータセットはA、B、C、Dの順番に並んでおり、ブロックを生成するCの番が来ました。Cが十分な時間内にブロックを生成しない場合、Dがブロックを生成する番になります。Dが生成しない場合は、Aの順番となり、そしてBの番となります。

ただし、Cがブロックを生成して伝播するまでには多少時間がかかるため、バックアップバリデータは、ブロックの生成を開始する前に一定の時間待機します。この時間の遅れをウィグルと呼びます。

### ウィグル {#wiggle}

ウィグルは、プロデューサがブロックの生成を開始する前に待機しなければならない時間です。

- 最後のブロック（n-1）が、`t`時に生成されたとしましょう。
- 現在のブロックと次のブロックとの間には、変数パラメータ`Period`を使用して最小遅延時間を適用します。
- 理想的な状態では、Cは`Period`を待機し、ブロックを生成、伝播します。Polygonのブロック時間は非常に短く（2～4秒）設計されているため、伝播の遅れも`Period`と同様の値になると想定されます。
- そのため、Dが、`2 * Period`時間内に新しいブロックを確認できない場合は、Ｄは即座にブロックの生成を始めます。特にDのウィグル時間はとで`2 * Period * (pos(d) - pos(c))`と定義されます。バリデータセットで、`pos(d) = 3`で、`pos(c) = 2`です。`Period = 1`と想定すると、Dのウィグルは2秒です。
- 今、Dもブロックを生成しない場合、`2 * Period * (pos(a) + len(validatorSet) - pos(c)) = 4s`のウィグル時間が経過したとき、Aがブロックを生成し始めます。
- 同様にCのウィグルは`6s`です

### フォークの解決 {#resolving-forks}

上記のメカニズムが、チェーンにある程度の堅牢さを加えますが、同時にフォークの可能性をもたらします。これは、Cがブロックを生成したが、伝播に予想以上に大きな遅れがあり、そのためDもブロックを生成したため、少なくとも2つのフォークをもたらすということが実際に発生する可能性があります。

解決は簡単です。より難易度の高いチェーンを選ぶことです。しかし、我々の設定でブロックの難易度をどのように定義するのかが問題になります。

### 難易度 {#difficulty}

- ターン内の署名者（cとしましょう）によって生成されたブロックの難易度を最大`len(validatorSet)`と定義します。
- Dが次の順番のプロデューサであるため、Dがブロックを生成する状況が起こった場合、ブロックの難易度は`len(validatorSet) - 1`である`len(validatorSet) - (pos(d) - pos(c))`としてウィグル内に定義されます。
- バックアップとして機能している間にAによって生成されるブロックの難易度は、`2`である`len(validatorSet) - (pos(a) + len(validatorSet) - pos(c))`になります。

各ブロックの難易度を定義したので、フォークの難易度はそのフォークのブロックの難しさの合計になります。フォークを選ぶべき場合、より高い難易度のものが選択されます。これは、ブロックがターン内のブロックプロデューサにより生成されたという事実を反映するためです。これは単にBorのユーザーにファイナリティの感覚を提供するものです。

## 表示の変更 {#view-change}

各スパン後、Borは表示を変更します。つまり、次のスパン用に新しいプロデューサをフェッチするということです。

### スパンのコミット {#commit-span}

現在のスパンが終了しようとしている時（特にスパン内の最後から2番目のスプリントの終了時）、BorはHeimdallから新しいスパンを引き出します。これは、HeimdallノードへのシンプルなHTTP呼び出しです。このデータがフェッチされると、`commitSpan`呼び出しがBorValidatorSetジェネシスコントラクトにシステム呼び出しを通じて行われます。

Borもまたブロックのヘッダ内にプロデューサバイトを設定します。これは、Borを高速同期している間必要です。高速同期中、Borはヘッダをバルクで同期し、承認されたプロデューサによりブロックが生成されているかを確認します。

各スプリントの開始時、Borは、前のヘッダから次のプロデューサ用にヘッダバイトをフェッチし、`ValidatorSet`アルゴリズムに基づきブロックの生成を開始します。

ヘッダがブロックにどのように見えるかは以下の通りです：

```js
header.Extra = header.Vanity + header.ProducerBytes /* optional */ + header.Seal
```

<img src={useBaseUrl("img/Bor/header-bytes.svg")} />

## Ethereumチェーンからの状態同期 {#state-sync-from-ethereum-chain}

Borは、メインのEthereumチェーン上の特定のイベントがBorに渡されるメカニズムを提供します。これはまた、Plasmaコントラクトへのデポジットがどのように処理されるかということでもあります。

1. Ethereum上のあらゆるコントラクトは`StateSender.sol`上の[syncState](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L33)を呼び出します。この呼び出しは`StateSynced`イベントを出します：https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38

  ```js
  event StateSynced(uint256 indexed id, address indexed contractAddress, bytes data)
  ```

2. Heimdallはこれらのイベントをリスンし、`function proposeState(uint256 stateId)`コールインします。`StateReceiver.sol`つまり、保留中の状態変更のIDのためのストアとして機能します。`proposeState`トランザクションは、現在のバリデータセットの中のバリデータの一つによって作成されている限り、ガス代なしでも処理されることにご注意ください：https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L24

3. 各スプリントの開始時に、Heimdallからの状態を利用してBorは保留中の状態変更についての詳細を引き出し、システム呼び出しを使用してBor状態にこれらをコミットします。`commitState`はこちらをご覧ください：https://github.com/maticnetwork/genesis-contracts/blob/f85d0409d2a99dff53617ad5429101d9937e3fc3/contracts/StateReceiver.sol#L41
