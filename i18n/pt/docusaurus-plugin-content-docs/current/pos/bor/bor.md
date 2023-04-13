---
id: bor
title: Arquitetura BOR
description: O papel de Bor na arquitetura do Polygon
keywords:
  - docs
  - matic
  - Bor Architecture
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Arquitetura BOR {#bor-architecture}

O Polygon é uma plataforma híbrida de **Plasma + Proof-of-Stake (PoS)**. Utilizamos uma arquitetura de duplo consenso na Polygon Network para otimizar a velocidade e descentralização. Arquitetámos conscientemente o sistema para suportar transições de estado arbitrárias nas nossas sidechains, que são suportadas por EVM.

## Arquitetura {#architecture}

<img src={useBaseUrl("img/Bor/matic_structure.png")}/>

Um blockchain é um conjunto de clientes de rede que interagem e trabalham juntos. O cliente é um software capaz de estabelecer um canal de comunicação p2p com outros clientes, assinar e transmitir transações, implementar e interagir com contratos inteligentes , etc. O cliente é frequentemente chamado de nó.

Para o Polygon, o nó é projetado com uma implementação de duas camadas Heimdall (Camada de Validador) e layer de Produtor de Blocos).

1. Heimdall
    - Verificação de Proof-of-Stake
    - Blocos de ckeckpoint na chain principal do Ethereum
    - Validador e Gestão de Recompensas
    - Garantir a sincronização com a chain principal do Ethereum
    - Bridge Descentralizado
2. BOR
    - Chain da Polygon
    - VM compatível com EVM
    - Seleção de conjunto de Proponentes e Produtores
    - SystemCall
    - Modelo de Taxa

## Heimdall (camada de validador) {#heimdall-validator-layer}

O Heimdall (o All-Protector) é o fornecedor de tudo o que acontece no sistema Polygon Proof-of-Stake – bom ou ruim.

A Heimdall é a nossa camada de verificação de Proof of Stake da Polygon, responsável pelo checkpoint de uma representação dos blocos Plasma na chain principal da nossa arquitetura. Foi implementada através da construção sobre o mecanismo de consenso Tendermint com alterações no esquema de assinatura e diversas estruturas de dados.

Para mais informações consulte [https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/](https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/).

## BOR (camada produtora de blocos) {#bor-block-producer-layer}

A implementação do nó BOR é basicamente o operador sidechain. A sidechain VM é compatível com EVM. Atualmente, é uma implementação Geth básica com mudanças personalizadas feitas no algoritmo de consenso. No entanto, este será construído a partir do zero para se tornar leve e focado.

A BOR é a nossa camada produtora de blocos que, em sincronia com a Heimdall, seleciona os produtores e verificadores para span e sprint. A interação para os utilizadores Polygon ocorre nesta sidechain, que é compatível com EVM, para aproveitar a funcionalidade e a compatibilidade das ferramentas e aplicações do programador Ethereum.

### Chain da Polygon {#polygon-chain}

Esta chain é uma blockchain separada que é anexada ao Ethereum utilizando um peg bidirecional. O peg bidirecional permite a permutabilidade de ativos entre Ethereum e Polygon.

### VM compatível com EVM {#evm-compatible-vm}

Ethereum Virtual Machine (EVM) é uma pilha virtual poderosa em área restrita incorporada em cada nó completo Polygon, responsável pela execução do bytecode do contrato. Os contratos são tipicamente escritos em linguagens de nível superior, como Solidity, e depois compilados para bytecode EVM.

### Seleção de Proponentes e Produtores {#proposers-and-producers-selection}

Os Produtores de Blocos para a camada BOR são um comité selecionado do pool de Validadores com base no seu stake, que acontece em intervalos regulares e é baralhado periodicamente. Esses intervalos são decididos pela governação do Validador em relação à dinastia e à rede.

A razão de Stake/poder de Staking especifica a probabilidade de ser selecionado como membro do comité produtor de blocos.

<img src={useBaseUrl("img/Bor/bor-span.png")} />

#### Processo de Seleção {#selection-process}

- Vamos supor que temos 3 validadores no pool, que são Alice, Bill e Clara.
- Alice fez stake de 100 tokens MATIC enquanto Bill e Clara fizeram stake de 40 tokens MATIC.
- Os validadores recebem slots de acordo com os stakes; como a Alice fez stake de 100 tokens MATIC, esta receberá slots proporcionalmente. A Alice receberá 5 slots no total. Da mesma forma, o Bill e a Clara obtêm 2 slots no total.
- Todos os validadores recebem estes slots [A, A, A, A, A, B, B, C, C]
- Utilizando dados históricos do bloco Ethereum como seed, embaralhamos este array.
- Depois de baralhar os slots utilizando o seed, vamos assumir que obtemos este array [A, B, A, A, C, B, A, A, C]
- Agora, dependendo da contagem de produtores (mantida pela governança do validador)*, removemos os validadores do topo. Por exemplo, se quisermos selecionar 5 produtores, obteremos o produtor definido como [A, B, A, A, C]
- Portanto, o conjunto produtor configurado para o próximo span é definido como [A: 3, B:1, C:1].
- Utilizando este conjunto de validadores e o algoritmo de seleção de proponentes tendermint, escolhemos um produtor para cada sprint na BOR.

### Interface SystemCall {#systemcall-interface}

System call é um endereço operador interno que está sob EVM. Isto ajuda a manter o estado dos produtores de bloco para cada sprint. Uma System Call é acionada no final de um sprint e é feita uma solicitação para a nova lista de produtores de bloco. Assim que o estado é atualizado, as alterações são recebidas após a geração do bloco na Bor para todos os validadores.

### funções {#functions}

#### proposeState {#proposestate}

- CALL só é permitido aos validadores.
- Inspecione `stateId` se já estiver proposto ou comprometido.
- Proponha o `stateId` e atualize o sinalizador para `true`.

#### commitState {#commitstate}

- CALL só é permitido ao Sistema.
- Inspecione `stateId` se já estiver proposto ou comprometido.
- Notifique o Contrato `StateReceiver` com novo `stateId`.
- Atualize o sinalizador `state` para `true`, e `remove` o `proposedState`.

#### proposeSpan {#proposespan}

- CALL só é permitido aos validadores.
- Verifique se a proposta span é `pending`.
- Atualize a proposta span para `true`

#### proposeCommit {#proposecommit}

- CALL só é permitido ao Sistema.
- Defina `initial validators` se o span atual for zero.
- Verifique as condições de sprint e span para `spanId` e `time_period`.
- Atualize os novos `span` e `time_period`.
- Defina `validators` e `blockProducers` para o `sprint`.
- Atualize o sinalizador de `spanProposal` para `true`.

### Modelo de taxa BOR {#bor-fee-model}

Para transação normal, as taxas no token MATIC são recolhidas e distribuídas aos produtores de blocos, de forma semelhante às transações do Ethereum.

Como outras blockchains, a Polygon tem um token nativo chamado Matic(MATIC). MATIC é um token ERC-20 utilizado principalmente para pagar gás (taxas de transação) na Polygon e staking.

:::info

Uma coisa importante a notar é que na chain da Polygon os tokens MATIC funcionam como tokens ERC-20 , mas também como o token nativo - ambos ao mesmo tempo. Portanto, isto significa que um utilizador pode pagar gás com MATIC e enviar MATIC para outras contas.

:::

Para contratos de génese `gasPrice`e `gasLimit`funciona da mesma forma que o Ethereum, mas durante a execução não deduzirá as taxas da conta do remetente.

As transações Genesis a partir de validadores atuais são executadas com `gasPrice = 0`.

Além disso, os validadores têm de enviar seguintes tipos de transações, como propostas de Estado, como depósitos e propostas de Span no Bor.

## Insight Técnico {#technical-insight}

### Contratos Genesis {#genesis-contracts}

[BorValidatorSet(0x1000)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.template) ⇒ Este contrato gere o conjunto de validadores para cada  span e sprint.

[BorStateReceiver(0x1001)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol) ⇒ Este contrato gere a transferência de dados arbitrários de contratos Ethereum para contratos Polygon

MaticChildERC-20(0x1010) ⇒ contrato filho para tokens da chain principal que permite mover ativos Ethereum para Polygon.

### [Bor.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/bor.go)

Protocolo BOR

## Glossário {#glossary}

- StartEpoch - publicação do número de checkpoint no qual um validador é ativado e participará no consenso.
- EndEpoch - publicação do número checkpoint no qual um validador é considerado desativado e não participará no consenso.
- Sprint - Sprint é um conjunto contínuo de blocos criados por um único validador.
- Span - Span é um grande conjunto de blocos com um conjunto de validadores fixo, mas composto por vários sprints. Por exemplo, um span de comprimento 6400 blocos, será composto por 100 sprints de 64 blocos.
- Dynasty: tempo entre o final do último leilão e o início do próximo leilão.

## Recursos {#resources}

- [Bor](https://github.com/maticnetwork/bor)
- [EVM](https://www.bitrates.com/guides/ethereum/what-is-the-unstoppable-world-computer)
- [Como funciona o EVM?](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)
- [Seleção do Propositor do Tendermint](https://docs.tendermint.com/master/spec/reactors/consensus/proposer-selection.html)
