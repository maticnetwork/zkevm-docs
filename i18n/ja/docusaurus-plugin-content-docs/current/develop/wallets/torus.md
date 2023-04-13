---
id: torus
title: Torus
description: トーラスはdAppsのための非カストディアル鍵管理システムです。
keywords:
  - wiki
  - polygon
  - torus
  - wallet
  - guide
  - dApp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Torusは分散型アプリのためのユーザーフレンドリーで安全で、管理されていない鍵管理システムです。私たちは、メインストリームユーザに分散型エコシステムへのゲートウェイを提供することに焦点を当てています。

**タイプ：**非カストディアル／HD<br/>**秘密鍵ストレージ：**ユーザーのローカルブラウザストレージ／暗号化およびトーラスサーバーに保存<br/>**Ethereum Ledger**：Infuraへの通信<br/>**秘密鍵エンコード：**Mnemonic / Social-Auth-login<br/>

アプリケーションに応じて、トーラスウォレットを介して統合するか、またはCustomAuth経由でトーラスネットワークと直接やり取りすることによって、トーラスを統合することができます。詳細については、トーラスのドキュメントを参照してください[。](https://docs.tor.us/)

## トーラスウォレットの統合 {#torus-wallet-integration}

アプリケーションがすでにMetaMaskまたは他のWeb3プロバイダーと互換性がある場合、Torusウォレットを統合すると、同じWeb3インターフェースをラップするプロバイダーが提供されます。npmパッケージでインストールすることができます。詳細と詳細な情報については、[ウォレット統合](https://docs.tor.us/wallet/get-started)に関する公式トーラスのドキュメントを参照してください。

### インストール {#installation}

```bash
npm i --save @toruslabs/torus-embed
```

### 例 {#example}

```js title="torus-example.js"
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

const torus = new Torus({
  buttonPosition: "top-left" // default: bottom-left
});

await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mumbai", // default: mainnet
    chainId: 80001, // default: 1
    networkName: "Mumbai Test Network" // default: Main Ethereum Network
  },
  showTorusButton: false // default: true
});

await torus.login(); // await torus.ethereum.enable()
const web3 = new Web3(torus.provider);
```

## CustomAuthの統合 {#customauth-integration}

ログインからインタラクションまで、独自のUXを制御したい場合は、CustomAuthを使用することができます。構築しているプラットフォームに応じて、それぞれのSDKを介して統合することができます。詳細は[、Torus CustomAuth統合](https://docs.tor.us/customauth/get-started)を参照してください。
