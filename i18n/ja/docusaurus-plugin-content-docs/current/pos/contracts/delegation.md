---
id: delegation
title: バリデーターシェアによるデリゲーション
sidebar_label: Delegation
description: バリデーターシェアによるデリゲーション
keywords:
  - polygon wiki
  - docs
  - polygon
  - delegation
  - validator shares
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygonはバリデーターシェア介してdelegationをサポートしています。このデザインを使用することにより、多くの計算を行うことなく、Ethereumコントラクトで報酬を分配し、スケール（数千のデリゲータ）をもってスラッシュすることがより簡単になります。

デリゲータは、バリデータから有限プールのシェアを購入することにより、デリゲートを行います。各バリデータは、自身のバリデータにトークンをシェアさせます。これらの代替性トークン`VATIC`をバリデータ`A`用に呼び出しましょう。ユーザーがバリデータ`A`にデリゲートするとすぐに、`MATIC/VATIC`ペアの取引レートに基づきこれらは`VATIC`に発行されます。ユーザーが値を獲得するため、取引レートは、ユーザーが各`VATIC`により多くの`MATIC`を引き出すことができること、ユーザーがスラッシュされた際は、自身の`VATIC`に`MATIC`がより少量しか引き出せないことを示します。

`MATIC`はステーキングトークンであることに注意してください。デリゲータは`MATIC`トークンをデリゲーションに参加させる必要があります。

まず、デリゲータ`D`は、`1 MATIC per 1 VATIC`の際に、バリデータ`A`の特定プールからトークンを購入します。

バリデータがより多くの`MATIC`トークンで報酬を得るとき、新しいトークンがプールに追加されます。現在の`100 MATIC`トークンプールで、`10 MATIC`報酬がプールに追加されるとします。しかし、`VATIC`トークンの合計の供給量は報酬のために変化しなかったため、取引レートは`1 MATIC per 0.9 VATIC`になります。代理人は同じ株式`MATIC`をより多く取得`D`します。

`VATIC`：バリデータ特有のミントされたバリデータシェアトークン（ERC20トークン）

## 技術仕様 {#technical-specification}

```solidity
uint256 public validatorId; // Delegation contract for validator
uint256 public validatorRewards; // accumulated rewards for validator
uint256 public commissionRate; // validator's cut %
uint256 public validatorDelegatorRatio = 10; // to be implemented/used

uint256 public totalStake;
uint256 public rewards; // rewards for pool of delegation stake
uint256 public activeAmount; // # of tokens delegated which are part of active stake
```

取引レートは下記のように計算されます：

```js
ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares
```

## メソッドと変数 {#methods-and-variables}

### buyVoucher（バウチャーの購入） {#buyvoucher}

```js
function buyVoucher(uint256 _amount) public;
```

- `_amount`をstakeManagerに転送し、有効なステークにタイムデータ構造を更新します。
- `updateValidatorState`はタイムラインDSを更新するのに使用されます。
- `_amount`の現在の`exchangeRate`を使用してデリゲーションシェアを`Mint`します。
- `amountStaked`は、流動性報酬を計算するために各デリゲータの有効なステークを追跡するために使用されます。

### sellVoucher（バウチャーを売却） {#sellvoucher}

```js
function sellVoucher() public;
```

- 現在`exchangeRate`と株式数を使用して総額（アクティブステーク＋報酬）を計算します。
- `unBond`バリデータからのアクティブなステークと、リワードをデリゲーターに移行します。
- stakeManagerの`updateValidatorState`を使用して、タイムラインから有効なステークを削除する必要があります。
- `delegators`マッピングは引き出し期間中にステークを追跡するために使用されます。

### withdrawRewards（報酬の引き出し） {#withdrawrewards}

```js
function withdrawRewards() public;
```

- 代理人の場合、報酬と転送、株式の`exchangeRate`焼き払い数に応じて計算してください。
- 例：デリゲーターが100株を所有し、為替レートが200である場合、報酬が100トークンである場合、100トークンをデリゲーターに転送します。残りの株式は100株であるため、為替レート200を使用しており、現在は50株相当です。50株を燃やす。デリゲーターには、100トークン（当初はステーク／委任）に相当する50株の株式が所有しています。

### リステーク {#restake}

再ステークは2つの方法で動作することができます：デリゲーターは、より多くの株式を購入するか`buyVoucher`、またはreStakeの報酬を使用します。

```js
function reStake() public;
```

報酬を再ステークするために上記の機能を使用します。シェアの数は影響を受けません。と言うのも、`exchangeRate`が同じであるからです。そのため、バリデータシェアコントラクトとstakeManagerタイムライン用に報酬が有効なステークに移行されるだけです。

`getLiquidRewards`集計した報酬を計算するために使用されます。すなわち、デリゲーターが100株を所有し、為替レートは200であるため、報酬は100トークンです。為替レートはまだ同じ数であるため、100トークンをアクティブなステークに移動します。差異は、現在200トークンがアクティブなステークとみなされ、（リキッド報酬の一部ではなく）すぐに引き出すことができないということです。

再ステーキングの目的は、デリゲーターのバリデータがよりアクティブなステークになり、デリゲーターがより多くの報酬を得るためです。

### unStakeClaimTokens（ステーククレームを行わないトークン） {#unstakeclaimtokens}

```js
function unStakeClaimTokens()
```

引き出し期間が終わると、株式を売却したデリゲーターはMATICトークンを獲得できます。トークンをユーザーに転送する必要があります。

### updateCommissionRate（コミッションレートの更新） {#updatecommissionrate}

```js
function updateCommissionRate(uint256 newCommissionRate)
        external
        onlyValidator
```

- バリデータに対するコミッションの%を更新します。

### updateRewards（報酬の更新） {#updaterewards}

```js
function updateRewards(uint256 reward, uint256 checkpointStakePower, uint256 validatorStake)
        external
        onlyOwner
        returns (uint256)
```

バリデータがチェックポイントを提出するための報酬を取得した場合、バリデータとデリゲーター間で報酬を払うためにこの機能を呼び出します。
