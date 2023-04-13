---
id: consensus-mechanism
title: コンセンサスメカニズム
description: "PoW、PoS、DPoS、PoSpace、PoET。"
keywords:
  - docs
  - matic
  - polygon
  - consensus mechanisms
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# コンセンサスメカニズム {#consensus-mechanism}

コンセンサスメカニズムとは、暗号通貨などの分散型プロセスまたはマルチエージェントシステム間の単一のデータバリューまたはネットワークの単一の状態で必要な合意を達成するために、コンピュータおよびブロックチェーンシステムで使用されるフォールトトレラントメカニズムです。

## コンセンサスメカニズムの種類 {#types-of-consensus-mechanism}

### 作業のプルーフ {#proof-of-work}
プルーフ・オブ・ワーク（PoW）システムは、DoS（denial-of-service）攻撃やその他の悪意のある攻撃を阻止するために、重要ではないが実現可能な労力がかかるシステムを示しています。ブロックチェーンで新しいブロックを作成するには、困難な計算パズルを解決する必要があります。

### プルーフ・オブ・ステーク（PoS） {#proof-of-stake}
プルーフ・オブ・ステークメカニズムは、トランザクションブロックを検証するために選択された可能性を有するトークン量をステークするようにユーザーに要求することによりコンセンサスを達成します。優先度はブロックチェーンシステムで最も多くステーキングしているマイナーにより多く付与されます。

### 委任されたプルーフ・オブ・ステーク {#delegated-proof-of-stake}
このコンセンサスの形式は、統治機関におけるメンバーの選定を反映しています。ステークホルダーは、資産を自らステークホルダーでステークホルダーが、このアクティビティを第三者、証人または委任者に委任することができます。トランザクションを検証する人は、通常提案を提示し、投票を求め、ステークホルダーによって選ばれます。これらのエンティティが得た報酬は、通常、ネットワーク参加者と共有されます。

### スペースの証明 {#proof-of-space}
この種のコンセンサスメカニズムは、Storj.io、Filecoin、Crustのような分散型ファイルストレージアプリケーションで役立ちます。しかし、PoWメカニズムと同様に大量の計算を使用する代わりに、各ノードごとのストレージ容量を活用しています。PoStorageまたはPoCapacityとも呼ばれることもあります。

### 経過時間の証明 {#proof-of-elapsed-time}
PoWに代わる、より少ない計算リソースを消費する優れた方法です。参加する各ノードはランダムな時間を待つ必要があり、スリープから目を覚ます最初のノードは新しいブロックを作成する機会を得て、ネットワークを介して伝播します。Intel SGXのような信頼できる実行環境（TEE）が必要です。これは、メモリの一部であり、一定の手順セットを使用してのみアクセスできます。

## **リソース**

- [ビザンチン障害の許容](https://medium.com/loom-network/understanding-blockchain-fundamentals-part-1-byzantine-fault-tolerance-245f46fe8419)<br></br>
- [コンセンサスメカニズムの種類](https://www.codementor.io/blog/consensus-algorithms-5lr8exfi0s#types-of-consensus-algorithms)<br></br>
- [コンセンサスシステム開発の概要と沿革](https://softwareengineeringdaily.com/2018/03/26/consensus-systems-with-ethan-buchman/)<br></br>
- [分散型コンセンサスについて](https://medium.com/s/story/lets-take-a-crack-at-understanding-distributed-consensus-dad23d0dc95)<br></br>
- [ビザンチンジェネラル問題](https://en.wikipedia.org/wiki/Byzantine_fault#Byzantine_Generals'_Problem)