---
id: consensus
title: Consenso BOR
description: Mecanismo de bor para buscar novos produtores
keywords:
  - docs
  - matic
  - Bor Consensus
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Consenso BOR {#bor-consensus}

O consenso do Bor é inspirado no consenso do clique: [https://eips.ethereum.org/EIPS/eip-225](https://eips.ethereum.org/EIPS/eip-225). O Clique trabalha com múltiplos produtores pré-definidos. Todos os produtores votam em novos produtores usando APIs do Clique. Eles revezam a criação de blocos.

O BOR busca novos produtores através do mecanismo de gestão de span e sprint.

## Validadores {#validators}

O Polygon é um sistema Proof-of-stake. Qualquer pessoa pode fazer stake do seu token MATIC no contrato inteligente Ethereum ("staking contract") e tornar-se um validador para o sistema.

```jsx
function stake(
	uint256 amount,
	uint256 heimdallFee,
	address signer,
	bool acceptDelegation
) external;
```

Assim que os validadores estiverem ativos no Heimdall, estes são selecionados como produtores através do módulo `bor`.

Verificar a visão geral do Bor para entender o gerenciamento do espaço mais [em](https://www.notion.so/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab) detalhes:

## Span {#span}

Um conjunto de blocos definidos logicamente para os quais um conjunto de validadores é escolhido entre todos os validadores disponíveis. O Heimdall fornece detalhes de span através de APIs de detalhes de span.

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

Geth (neste caso, BOR) usa o bloco `snapshot` para armazenar dados de estado para cada bloco, incluindo dados relacionados com consenso.

Cada validador no span tem poder de voto. Com base no seu poder, estes são selecionados como produtores blocos. Quanto maior a potência, maior a probabilidade de se tornarem produtores de blocos. O BOR usa o algoritmo do Tendermint para fazer o mesmo. Fonte: [https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go)

## Sprint {#sprint}

Um conjunto de blocos dentro de um span para o qual apenas um único produtor de blocos é escolhido para produzir blocos. O tamanho do sprint é um fator de tamanho do espaço. O BOR usa `validatorSet` para obter o proponente/produtor atual para o sprint atual.

```go
currentProposerForSprint := snap.ValidatorSet().Proposer
```

Além do proponente atual, o BOR seleciona produtores substitutos.

## Autorizar um bloco {#authorizing-a-block}

Os produtores no BOR também são chamados signatários uma vez que, para autorizar um bloco para a rede, o produtor precisa de assinar o hash do bloco que contém **tudo exceto a assinatura em si**. Isto significa que o hash contém todos os campos do cabeçalho e também o `extraData`, com exceção do sufixo de assinatura de 65 bytes.

Este hash é assinado usando a curva `secp256k1` padrão, e a assinatura resultante de 65 bytes é incorporada no `extraData` como o sufixo de 65 bytes final.

A cada bloco assinado é atribuída uma dificuldade que coloca um peso no bloco. A assinatura no turno pesa mais (`DIFF_INTURN`) do que uma fora do turno (`DIFF_NOTURN`).

### Estratégias de autorização {#authorization-strategies}

Enquanto os produtores estiverem em conformidade com as especificações acima, podem autorizar e distribuir blocos conforme entenderem melhor. A estratégia sugerida a seguir, no entanto, reduz o tráfego de rede e pequenas bifurcações; por isso, é um recurso sugerido:

- Se um produtor tiver permissão para assinar um bloco (está na lista autorizada)
    - Calcule o tempo de assinatura ideal do próximo bloco (pai + `Period`)
    - Se o produtor estiver no turno, aguarde o momento exato para chegar, assinar e transmitir imediatamente
    - Se o produtor não estiver no turno, atrase a assinatura por `wiggle`

Esta simples estratégia irá garantir que o produtor que estiver no turno (cujo bloco pesa mais) tenha uma ligeira vantagem para assinar e propagar, em comparação com os signatários que não estão no turno. Além disso, o esquema permite um pouco de escala, com um aumento do número de produtores.

### Assinatura fora do turno {#out-of-turn-signing}

O BOR escolhe múltiplos produtores de blocos como backup quando o produtor que está no turno não produz um bloco. Isso pode acontecer por uma variedade de razões, como:

- O nó do produtor de blocos está inativo
- O produtor de blocos está a tentar reter o bloco
- O produtor de blocos não está a produzir um bloco intencionalmente.

Quando isso acontece, é iniciado o mecanismo de backup do BOR.

A qualquer momento, o conjunto dos validadores é armazenado como um array classificado com base no endereço do signatário. Imagine que o conjunto do validador é ordenado como A, B, C, D, e que é a vez de C produzir um bloco. Se C não produzir um bloco numa quantidade suficiente de tempo, é a vez de D produzir um. Se D não o fizer, então A e depois B.

No entanto, como levará algum tempo para que C produza e propague um bloco, os validadores de backup aguardarão uma certa quantidade de tempo antes de começar a produzir um bloco. Essa diferença de tempo é chamada "wiggle".

### Wiggle {#wiggle}

O "wiggle" é o tempo que um produtor deve aguardar antes de começar a produzir um bloco.

- Vamos assumir que o último bloco (n-1) foi produzido no período `t`.
- Nós impomos um intervalo de tempo mínimo entre o bloco atual e o próximo, através de um parâmetro variável `Period`.
- Em condições ideais, C aguardará por `Period` e depois produzirá e propagará o bloco. Como o tempo dos blocos na Polygon estão projetados para serem bastante baixos (2 a 4 segundos), o atraso de propagação também é considerado como o mesmo valor que `Period`.
- Então, se D não vir um novo bloco no momento `2 * Period`, D começa imediatamente a produzir um bloco. Especificamente, o tempo de "wiggle" de D é definido como `2 * Period * (pos(d) - pos(c))` onde `pos(d) = 3` e `pos(c) = 2`no conjunto do validador. Assumindo que , em `Period = 1`, o "wiggle" de D é de 2 segundos.
- Agora, se D também não produzir um bloco, A iniciará a produção de um quando o tempo de "wiggle" de `2 * Period * (pos(a) + len(validatorSet) - pos(c)) = 4s` tiver decorrido.
- Da mesma maneira, o "wiggle" de C é `6s`

### Como resolver bifurcações {#resolving-forks}

Apesar do mecanismo acima contribuir para a robustez da chain em certa medida, este também introduz a possibilidade de bifurcações. Pode ser realmente possível que C produza um bloco, mas que haja um atraso maior do que o esperado na propagação e, portanto, que D também produza um bloco, o que leva a pelo menos 2 bifurcações.

A solução é simples - escolha a chain com maior dificuldade. Mas, então, a questão é: como definimos a dificuldade de um bloco na nossa configuração?

### Dificuldade {#difficulty}

- A dificuldade de um bloco que é produzido por um signatário que está no turno (digamos, C) é definida como a maior = `len(validatorSet)`.
- Como D é o próximo produtor na fila; se e quando surgir a situação na qual D está produzir o bloco; a dificuldade do bloco será definida tal como no "wiggle" como `len(validatorSet) - (pos(d) - pos(c))`, que é `len(validatorSet) - 1`
- A dificuldade do bloco que está a ser produzido por A, enquanto atua como backup, torna-se `len(validatorSet) - (pos(a) + len(validatorSet) - pos(c))`, que é `2`

Agora, depois de definir a dificuldade de cada bloco, a dificuldade de uma bifurcação é simplesmente a soma das dificuldades dos blocos nessa bifurcação. No caso de ser preciso escolher uma bifurcação, é escolhida aquela com maior dificuldade, pois isso é um reflexo do facto de que os blocos foram produzidos por produtores de blocos que estavam no turno. Isso é apenas para fornecer uma sensação de finalidade para o utilizador do BOR.

## Alteração de exibição {#view-change}

Depois de cada span, o BOR muda de exibição. Isso significa que este busca novos produtores para o próximo span.

### Span de commit {#commit-span}

Quando o span atual está prestes a terminar (especificamente no final do penúltimo sprint no span), o BOR puxa um novo span do Heimdall. Esta é uma CALL HTTP simples para o nó Heimdall. Assim que os dados são recolhidos é feita uma CALL `commitSpan` é feita para o contrato de génese BorValidatorSet, através de CALL do Sistema.

O BOR também define os bytes de produtores no cabeçalho do bloco. Isto é necessário durante a sincronização rápida do BOR. Durante a sincronização rápida, o BOR sincroniza cabeçalhos em massa e valida se os blocos são criados por produtores autorizados.

No início de cada Sprint, o BOR recolhe bytes de cabeçalho do cabeçalho anterior para os próximos produtores e começa a criar blocos com base no algoritmo `ValidatorSet`.

Veja aqui o aspeto do cabeçalho num bloco:

```js
header.Extra = header.Vanity + header.ProducerBytes /* optional */ + header.Seal
```

<img src={useBaseUrl("img/Bor/header-bytes.svg")} />

## Sincronização de estado na chain da Ethereum {#state-sync-from-ethereum-chain}

O BOR fornece um mecanismo em que alguns eventos específicos na chain principal da Ethereum são retransmitidos para o BOR. Isto é também como os depósitos para contratos plasma são processados.

1. Qualquer contrato na Ethereum pode fazer CALL de [syncState](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L33) em `StateSender.sol`. Esta CALL emite o evento `StateSynced`: https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38

  ```js
  event StateSynced(uint256 indexed id, address indexed contractAddress, bytes data)
  ```

2. O Heimdall ouve estes eventos e `function proposeState(uint256 stateId)`chamadas - actuando `StateReceiver.sol`assim como um armazenamento para os potenciais deslocamentos de estado pendentes. Observe que a transação `proposeState` será processada mesmo com uma taxa de gás 0, enquanto esta for feita por um dos validadores no conjunto de validadores atual: https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L24

3. No início de cada sprint, o BOR puxa os detalhes sobre as variações de estado pendentes, usando os estados do Heimdall, e entrega-os ao BOR usando uma CALL de sistema. Consulte `commitState` aqui: https://github.com/maticnetwork/genesis-contracts/blob/f85d0409d2a99dff53617ad5429101d9937e3fc3/contracts/StateReceiver.sol#L41
