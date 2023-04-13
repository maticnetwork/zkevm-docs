---
id: delegation
title: Delegação por meio de compartilhamentos de validadores
sidebar_label: Delegation
description: Delegação por meio de compartilhamentos de validadores
keywords:
  - polygon wiki
  - docs
  - polygon
  - delegation
  - validator shares
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

A Polygon apoia a delegação por meio de ações de validador. Ao utilizar este design, é mais fácil distribuir recompensas e cortar com escala (milhares de delegadores) nos contratos da Ethereum sem muita computação.

Os delegadores delegam comprando quotas de uma pool finita de validadores. Cada validador terá o seu próprio token de quota de validador. Chamemos a estes tokens fungíveis `VATIC` para um validador `A`. Assim que um utilizador delegar a um validador `A`, ser-lhe-ão emitidos `VATIC` com base na taxa de câmbio do par `MATIC/VATIC`. À medida que os utilizadores acumulam valor, a taxa de câmbio indica que estes podem agora retirar mais `MATIC` por cada `VATIC` e, quando os utilizadores são cortados, os utilizadores retiram menos `MATIC` pelos seus `VATIC`.

Note que o `MATIC` é um token de staking. Um delegador tem de ter tokens `MATIC` para participar na delegação.

Inicialmente, um delegador `D` compra tokens da pool específica do validador `A` quando `1 MATIC per 1 VATIC`.

Quando um validador é recompensado com mais tokens `MATIC`, são adicionados novos tokens à pool. Digamos que com o pool atual de `100 MATIC`tokens, as recompensas são `10 MATIC`adicionadas ao pool. Mas como o fornecimento total de tokens `VATIC` não se alterou devido às recompensas, a taxa de câmbio passa a ser `1 MATIC per 0.9 VATIC`. Agora, o delegador `D`recebe mais `MATIC`para as mesmas ações.

`VATIC`: tokens do validador de quotas com mint específico do validador (tokens ERC-20)

## Especificação técnica {#technical-specification}

```solidity
uint256 public validatorId; // Delegation contract for validator
uint256 public validatorRewards; // accumulated rewards for validator
uint256 public commissionRate; // validator's cut %
uint256 public validatorDelegatorRatio = 10; // to be implemented/used

uint256 public totalStake;
uint256 public rewards; // rewards for pool of delegation stake
uint256 public activeAmount; // # of tokens delegated which are part of active stake
```

A taxa de câmbio é calculada conforme mostramos abaixo:

```js
ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares
```

## Métodos e Variáveis {#methods-and-variables}

### buyVoucher {#buyvoucher}

```js
function buyVoucher(uint256 _amount) public;
```

- Transfere a `_amount` para o stakeManager e atualiza a estrutura dos dados da linha do tempo para o stake ativo.
- `updateValidatorState` é usado para atualizar a estrutura dos dados da linha do tempo.
- `Mint` as quotas de delegação usando a atual `exchangeRate` para `_amount`.
- `amountStaked` é usado para acompanhar o stake ativo de cada delegador para calcular as recompensas líquidas.

### sellVoucher {#sellvoucher}

```js
function sellVoucher() public;
```

- Usar o número de ações atuais `exchangeRate`e para calcular o valor total (stake + recompensas ativas).
- `unBond`stake ativo do validador e transferir recompensas para o delegador, se houver.
- Tem de remover o stake ativo da linha do tempo usando o `updateValidatorState` no stakeManger.
- O mapeamento dos `delegators` é usado para acompanhar os stakes no período de retirada.

### withdrawRewards {#withdrawrewards}

```js
function withdrawRewards() public;
```

- Para um delegador, calcule as recompensas e a transferência e dependendo da contagem de `exchangeRate`queimaduras de ações.
- Exemplo: se um delegador possuir 100 ações e a taxa de câmbio for 200 assim que as recompensas forem 100 tokens, transfere 100 tokens para o delegador. A stake restante é 100, portanto, usando a taxa de câmbio 200, agora vale 50 ações. Portanto, queimar 50 ações. O delegador tem agora 50 ações no valor de 100 tokens (que ele inicialmente traçou/delegou).

### Restake {#restake}

O retomar pode funcionar de duas maneiras: o delegador pode comprar mais compartilhamentos usando `buyVoucher`ou reatribuir recompensas.

```js
function reStake() public;
```

A função acima é usada para reatribuir as recompensas. O número de quotas não é afetado, porque a `exchangeRate` é a mesma; portanto, apenas as recompensas são movidas para o stake ativo, tanto para o contrato de quotas de validador como para a linha do tempo do stakeManager.

`getLiquidRewards`é usado para calcular recompensas acumuladas, isto é, o delegador possui 100 ações e a taxa de câmbio é de 200, portanto as recompensas são de 100 tokens. Mover 100 tokens para a participação ativa, uma vez que a taxa de câmbio ainda é o mesmo número de tokens permanecerá igual. A diferença é que agora 200 tokens são considerados na estaca ativa e não podem ser retirados imediatamente (não uma parte das recompensas de líquidos).

Finalidade da reclassificação é que, como o validador do delegador tem agora uma participação mais ativa e ganhará mais recompensas para isso, o delegador.

### unStakeClaimTokens {#unstakeclaimtokens}

```js
function unStakeClaimTokens()
```

Assim que o período de retirada terminar, os delegadores que vendeu as suas ações podem reivindicar os seus tokens MATIC. Tem de transferir tokens para o utilizador.

### updateCommissionRate {#updatecommissionrate}

```js
function updateCommissionRate(uint256 newCommissionRate)
        external
        onlyValidator
```

- Atualiza a % de comissão para o validador.

### updateRewards {#updaterewards}

```js
function updateRewards(uint256 reward, uint256 checkpointStakePower, uint256 validatorStake)
        external
        onlyOwner
        returns (uint256)
```

Quando um validador recebe recompensas para enviar o checkpoint, esta função é chamada para desembolsos de recompensas entre validador e delegadores.
