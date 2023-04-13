---
id: contributor-guidelines
title: 貢献する方法
sidebar_label: Contributor guidelines
description: 今後の貢献に備える
keywords:
  - docs
  - matic
  - polygon
  - contribute
  - contributor
  - contributing
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: orientation
---

:::tip
[Polygon Wikiリポジトリで問題を提起](https://github.com/maticnetwork/matic-docs/issues)することもできます。
:::

## 貢献するエリアを識別する {#identify-an-area-to-contribute-to}

Wikiに貢献できるエリアを判別するにはいくつかの方法があります。

- 最も簡単なのは[Wikiのメインテナ](/docs/contribute/community-maintainers)の1人に連絡して「Polygon Wikiに貢献したい」と伝えることです。彼らはあなたと一緒に貢献するエリアを探してくれるでしょう。
- 特定の貢献を念頭に置いていながら確信が持てない場合には、[Wikiのメインテナ](/docs/contribute/community-maintainers)の1人に直接連絡してその貢献が適切かどうか確認してください。
- 特定の貢献を念頭に置いていない場合、 [Polygon GitHubリポ](https://github.com/maticnetwork)上に`help wanted`としてラベル付けされた問題を参照することもできます。
- `good first issue`ラベルが追加されている課題は初めての人に適しているとみなされています。

## Polygonドキュメントに追加する {#add-to-the-polygon-documentation}

  - Polygon Wikiで何かを追加または変更する必要がある場合、`master`ブランチに対してPRを作成してください（サンプルPRのチェックをお願いします）。
  - ドキュメントチームはPRを検討するか、またはそれに応じて連絡します。
  - リポジトリ：https://github.com/maticnetwork/matic-docs
  - サンプルPR：https://github.com/maticnetwork/matic-docs/pull/360

:::tip
マシンでローカルにWikiを実行する場合は、ローカルに[Wikiを実行し](https://github.com/maticnetwork/matic-docs#run-the-wiki-locally)ているセクションを確認してください。新しいドキュメントを追加する場合は、基本的な概要／紹介と、Githubまたはドキュメントへのリンクを用意することをお勧めします。
:::

## Gitルール {#git-rules}

変更ログに、すべてのリポについて`gitchangelog`を使用しています。そのため、コミットメッセージでは次の規約に準拠する必要があります。この規約に準拠していない場合は、マージはありません。

### コミットメッセージの規約 {#commit-message-convention}

以下はコミットメッセージに追加することを考えるのに役立つ可能性のある提案です。コミットを大まかに大きなセクションへと区分けすることが良いかもしれません：

- 目的による（例：新規、修正、変更、…）
- 対象による（例：doc、パッケージング、コード、...）
- オーディエンスによる（例：開発者、テスター、ユーザー、...)

さらに、一部のコミットにタグを付けることもできます：

- 「minor」（マイナー）なコミットは変更ログに出力されるべきではない（表面的な変更、コメントの小さな誤字脱字...）ものです。
- 「refactor」（リファクタ）は実際には大きな機能変更がないものに使用します。したがって、これは例えば最終ユーザーに表示される変更ログの一部にはすべきでないが、開発者の変更ログであれば興味を引く可能性があるものです。
- また「api」のタグを付けることでAPIの変更、あるいは新規のAPIや同様のものをマークすることもできます。

できるだけ頻繁に、ユーザーの機能性を意識してコミットメッセージを書くようにしてください。

:::note 例

これはこれらの情報がどのように保存されるかを表示するための標準のgitログ`--oneline`です：

```
* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor
```

:::

詳しい情報についてはこちらを参照してください[Gitを使用して変更ログを管理するいくつかの良い方法は何ですか？](https://stackoverflow.com/questions/3523534/good-ways-to-manage-a-changelog-using-git/23047890#23047890)

詳細については、[https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/)を参照してください。
