---
id: stakingmanager
title: Gestor de staking
description: O Gerenciador de staking é o principal contrato para lidar com atividades relacionadas com validadores na rede Polygon.
keywords:
  - docs
  - Staking Manager
  - polygon
  - wiki
  - validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Para o consenso baseado na Prova de Segurança do Polygon, toda a verificação e manipulação da staking da prova de .+1, as recompensas são executadas no contrato inteligente Ethereum. Todo o design segue esta filosofia de fazer menos no contrato da Mainnet. Ele faz verificação de informações e envia todas as operações de computação pesada para L2 (leia sobre [Heimdall](https://wiki.polygon.technology/docs/pos/heimdall/overview)).

**Os participantes** são divididos em **validadores**, **delegadores** e **observadores** (para relatórios de fraude).

O [**StakeManager**](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/stakeManager/StakeManager.sol) é o principal contrato para lidar com atividades relacionadas com validadores, como verificação de `checkPoint`assinatura, distribuição de recompensas e gerenciamento de estaca. Como o contrato está usando o **ID NFT** como fonte de propriedade, a alteração de propriedade e o signatário não afetarão nada no sistema.

:::tip

A partir de um endereço Ethereum, um **Staker pode ser apenas um validador ou delegador** (é apenas uma escolha de design, sem motivos difíceis).

:::

## Admissões de validador/substituição {#validator-admissions-replacement}

### Admissões {#admissions}
Actualmente, não há faixas de validador abertas disponíveis no Polygon PoS. Há também uma lista de espera para se tornar um validador. No futuro, se os espaços de estar disponíveis, os validadores podem aplicar-se para serem considerados e removidos da lista de espera.


### Substituição {#replacement}
O PIP4 introduziu o conceito de mostrar o desempenho do validador para visibilidade da comunidade. Se um validador estiver em estado não saudável por um período de tempo prolongado conforme descrito no PIP4, ele será deslocado da rede. O slot de validador é então disponibilizado para aqueles que estão fora da lista de espera.

:::info

Atualmente, a [<ins>Fase 2 da PARTE C do PIP4</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956/24) está a ser implementada. É aqui que a comunidade decide critérios de avaliação do prospecto de validador. Em tempo, este exercício irá produzir um processo de aplicação e admissões.

:::

## Métodos e Variáveis {#methods-and-variables}

:::caution Implementação de Slashing

`jail``unJail`, e as `slash`funções não são usadas atualmente como parte da implementação de slash.

:::

### validatorThreshold de retenção {#validatorthreshold}

Ele armazena o número máximo de validadores aceites pelo sistema, também chamados de slots.

### AccountStateRoot {#accountstateroot}

- Para várias contas feitas no Heimdall para validadores e delegadores, a raiz da conta é submetida ao enviar o `checkpoint`.
- accRoot é usado enquanto `claimRewards`e .`unStakeClaim`

### stakeFor {#stake-stakefor}

```solidity title="StakeManager.sol"
function stake(
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes calldata signerPubkey
) public;

function stakeFor(
    address user,
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes memory signerPubkey
) public;
```

- Permite que qualquer pessoa com quantidade (em tokens MATIC ) maior do que `minDeposit`, se `currentValidatorSetSize`for menor em seguida.`validatorThreshold`
- Deve transferir `amount+heimdallFee`, coloca o validador no período do leilão para um auctionInterval (mais na seção de leilões).
- `updateTimeLine`atualiza a estrutura de dados da linha de tempo especial, que mantém o controle de validadores ativos e da participação ativa para contagem dada de epa/pontos de verificação.
- Um único `NFT`é minerado em cada novo `stake`ou chamada, que pode ser transferido para qualquer `stakeFor`pessoa, mas pode ser propriedade do endereço Ethereum 1:1.
- `acceptDelegation`definido como se os validadores quiserem aceitar a delegação, o `ValidatorShare`contrato é implantado para o validador.

### Unstake {#unstake}

- Remover o validador do conjunto de validadores na próxima época (somente válido para o ponto de verificação atual uma vez `unstake`chamado)
- Remove o stake do validador da estrutura de dados da linha de tempo e atualiza a contagem para a época de saída do validador.
- Se o validador tiver delegação em, coletar todas as recompensas e bloquear o contrato de delegação para novas delegações.

### unstakeClaim {#unstakeclaim}

```solidity
function unstakeClaim(uint256 validatorId) public;
```

- Depois de `unstaking`, os validadores são colocados no período de retirada para que possam ser cortados, se houver fraude encontrada em `unstaking`seguida , para fraudes anteriores.
- Assim que o `WITHDRAWAL_DELAY`período for servido, os validadores podem chamar esta função e fazer o assentamento `stakeManager`(obter recompensas, se houver, receber tokens staked de volta, queimar NFT, etc).

### Restake {#restake}

```solidity
function restake(uint256 validatorId, uint256 amount, bool stakeRewards) public;
```

- Permite que os validadores aumentem o stake colocando uma nova quantidade ou recompensas, ou ambas.
- Deve atualizar a linha do tempo (quantidade) para a participação ativa.

### withdrawRewards {#withdrawrewards}

```solidity
function withdrawRewards(uint256 validatorId) public;
```

Este método permite que os validadores retirem as recompensas acumuladas, deve considerar a obtenção de recompensas do contrato de delegação se o validador aceitar a delegação.

### updateSigner {#updatesigner}

```solidity
function updateSigner(uint256 validatorId, bytes memory signerPubkey) public
```

Este método permite que os validadores atualizem o endereço do signer (que é usado para validar blocos na blockchain do Polygon e nas assinaturas do ponto de verificação `stakeManager`).

### topUpForFee {#topupforfee}

```solidity
function topUpForFee(uint256 validatorId, uint256 heimdallFee) public;
```

Os validadores podem fazer o backup do saldo da taxa de Heimdall invocando este método.

### claimFee {#claimfee}

```solidity
function claimFee(
        uint256 validatorId,
        uint256 accumSlashedAmount,
        uint256 accumFeeAmount,
        uint256 index,
        bytes memory proof
    ) public;
```

Este método é usado para retirar taxas do Heimdall. `accountStateRoot`é atualizado em cada ponto de verificação, para que os validadores possam fornecer prova de inclusão nesta raiz para conta no Heimdall e retirar taxa.

Note que `accountStateRoot`é reescrita para evitar saídas de vários pontos de verificação (para raiz antiga e para guardar a contabilidade `stakeManager`). não `accumSlashedAmount`é utilizado no momento e será usado para cortar no Heimdall, se necessário.

### StakingNFT {#stakingnft}

Contrato padrão do ERC-721 com poucas restrições como um token por usuário e minerado de maneira sequencial.

### startAuction {#startauction}

```solidity
function startAuction(
    uint256 validatorId, /**  auction for validator */
    uint256 amount /**  amount greater then old validator's stake */
    ) external;
```

Para iniciar um lance ou lance mais alto no leilão já em execução, esta função é usada. O período de leilão é executado em ciclos, como por `(auctionPeriod--dynasty)--(auctionPeriod--dynasty)--(auctionPeriod--dynasty)`isso, ele **deve verificar o período de leilão correto.**

`perceivedStakeFactor`é usado para calcular o fator exato * stake antigo (nota atualmente é por defeito 1 WIP para escolher a função). **Deve verificar o leilão no último período de leilão se algum ainda estiver em curso** (pode-se optar por não `confirmAuction`chamar para retirar o seu capital no próximo leilão). Em um leilão inglês normalmente contínuo está em curso em um `auctionPeriod`.

### confirmAuctionBid {#confirmauctionbid}

```solidity
function confirmAuctionBid(
        uint256 validatorId,
        uint256 heimdallFee, /** for new validator */
        bool acceptDelegation,
        bytes calldata signerPubkey
    ) external
```

- **Deve verificar se este não é um auctionPeriod.**
- Se o último licitante for proprietário de `validatorId`, o comportamento deve ser semelhante ao restauro.
- No segundo caso, faça unStake de `validatorId` e adicione um utilizador novo como validador do checkpoint seguinte; o comportamento do utilizador novo deve ser semelhante ao do stake/stakeFor.

### checkSignatures {#checksignatures}

```solidity
function checkSignatures(
        uint256 blockInterval,
        bytes32 voteHash,
        bytes32 stateRoot,
        bytes memory sigs
    ) public;
```

- As escritas são feitas apenas para o contrato RootChain ao enviar checkpoints
- `voteHash` onde todos os validadores assinam (acordo BFT de ⅔+1)
- Esta função valida apenas assinaturas exclusivas e verifica se o poder de ⅔+1 assinou a checkpoint ROOT (inclusão na verificação `voteHash` no contrato RootChain para todos os dados) `currentValidatorSetTotalStake` fornece o stake ativo atual.
- As recompensas são distribuídas proporcionalmente à participação do validador. Mais sobre recompensas na [Distribuição](https://www.notion.so/Rewards-Distribution-127d586c14544beb9ea326fd3bb5d3a2) de Recompensas.

### isValidator {#isvalidator}

Verifica se um validador dado é um validador ativo da época atual.

## Estrutura dos dados da linha do tempo {#timeline-data-structure}

```solidity
struct State {
    int256 amount;
    int256 stakerCount;
}

mapping(uint256 => State) public validatorState;
```

<img src={useBaseUrl("img/staking_manager/staking_manager.png")} />

## StakingInfo {#stakinginfo}

Contrato de registro centralizado para eventos de validador e de delegação, inclui poucas funções de leitura. Pode verificar o código-fonte do contrato [StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol) no GitHub.

## ValidatorShareFactory {#validatorsharefactory}

Um contrato de fábrica para implantar `ValidatorShare`contrato para cada validador que opt-in para delegação. Pode verificar o código-fonte do contrato [ValidatorShareFactory.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/validatorShare/ValidatorShareFactory.sol) no GitHub.
