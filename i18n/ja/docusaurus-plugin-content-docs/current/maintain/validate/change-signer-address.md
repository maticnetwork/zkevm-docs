---
id: change-signer-address
title: 署名アドレスを変更
description: バリデータの署名者のアドレスを変更する
keywords:
  - docs
  - matic
  - polygon
  - signer address
  - change
  - validator
slug: change-signer-address
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

[signer address](/docs/maintain/glossary.md#signer-address) が何であるか情報については、参照してください。
[Key Management](/docs/maintain/validator/core-components/key-management).

## 前提条件 {#prerequisites}

バリデータノードが完全に同期され、新しい署名アドレスとともに実行されていることを確認してください。

## 署名アドレスを変更 {#change-the-signer-address}

ガイドはノード1として、新しいババリデータノードノードはノード2として参照します。

1. ノード 1 のアドレスで[staking dasboard](https://staking.polygon.technology/)にログインします。
2. プロフィールで**Edit Profile**をクリックします。
3. **Signer's address**フィールドで、ノード２アドレスを提供します。
4. **Signer's public key**フィールドでノード２パブリック鍵を提供します。

   パブリックキーを取得するには実行します:バリデータノードで次のコマンドを実行します:

   ```sh
   heimdalld show-account
   ```

**Save**をクリックするとノードのために新しい詳細が保存されます。これは基本的に、ノード1がステークを管理するあなたのアドレスになり、報酬の送り先などになることを意味します。そしてノード2は、ブロックへの署名、チェックポイントへの署名などの活動を行うようになります。
