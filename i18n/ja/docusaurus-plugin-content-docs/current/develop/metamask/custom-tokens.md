---
id: custom-tokens
title: カスタムトークン設定
description: MetaMask上でカスタムトークンを設定します。
keywords:
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

このページでは、メタマスクにカスタムトークンを設定／追加する方法を説明します。

同じプロセスを使用して、メタマスク上の任意のネットワークにカスタムトークンを追加することができます。テストトークンの例をそれぞれのコントラクトアドレスで可視化するには[、この表](#tokens-and-contract-adresses)を参照してください。

## MetaMaskアカウントにカスタムトークンを追加する {#adding-a-custom-token-to-your-metamask-account}

まず、Metamaskのホーム画面で新しいトークンに適したネットワークを選択します。次に、「トークンをインポートする」をクリックします。

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/add-test-token.png")} />
</div>

<br></br>

次に新しい画面に移動します。トークンインポート画面で、トークンアドレス欄にアドレスをコピーペーストします。

:::info
このプロセスを説明するために、**Goerliネット**ワーク上で**ERC20-TESTV4**トークンを使用しています。他のネットワークから他のテストトークンを見つける[<ins>ことができます。</ins>](#tokens-and-contract-adresses)
:::

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/token-contract-address.png")} />
</div>

他のフィールドは自動的にポピュレートされます。カスタムトークンを追加するをクリックし、インポートするをクリックします。Metamaskのアカウント上に、`TEST`トークンが表示されます。

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/added-token.png")} />
</div>

**MetaMaskアカウントにテストERC1155トークンを追加する**

Polygonネットワークは、ERC1155をサポートしていますが、[Metamaskはまだ標準をサポートしていません](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-)。このアップデートは、2021年の第4四四半期に予定にされています。

### トークンとコントラクトのアドレス {#tokens-and-contract-adresses}

| token | ネットワーク | コントラクトアドレス |
|---------------|---------|----------------------------------------------|
| ERC20-TESTV4 | Goerli | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` |
| MATIC-TST | Mumbai | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| ERC721-TESTV4 | Goerli | `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b` |
| ERC721-TESTV4 | Mumbai | `0x33FC58F12A56280503b04AC7911D1EceEBcE179c` |