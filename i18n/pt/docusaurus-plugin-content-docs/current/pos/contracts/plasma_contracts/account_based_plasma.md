---
id: account_based_plasma
title: Plasma baseado em conta
description: Implementação de plasma com base em conta
keywords:
  - docs
  - matic
  - Account Based Plasma
  - polygon
  - implementation
image: https://matic.network/banners/matic-network-16x9.png
---

# Plasma baseado em conta  {#account-based-plasma}

Polygon Plasma segue um modelo semelhante a [Plasma MoreVP](https://ethresear.ch/t/more-viable-plasma/2160), mas é uma **implementação baseada em conta**, em comparação com outras implementações baseadas em UTXO. A sidechain é compatível com a EVM. Utilizando a construção MoreVP, também eliminamos a necessidade de assinaturas de confirmação.

## Camada PoS e Checkpoints {#pos-layer-and-checkpoints}

A rede da Polygon utiliza uma estratégia dupla de Proof of Stake na camada de checkpointing e produtores de blocos na camada de produtor de blocos para alcançar tempos de bloqueio mais rápidos e atingir a finalidade na chain principal utilizando os checkpoints e as provas de fraude.

Na camada de checkpointing da rede da Polygon para cada poucos blocos na camada de bloco na rede da Polygon, um validador (suficientemente ligado) irá criar um checkpoint na chain principal depois de validar todos os blocos na camada de bloco e criar a árvore Merkle dos hashes do bloco desde o último checkpoint.

Além de fornecer finalidade na Mainchain, os checkpoints desempenham um papel em retiradas, pois contêm a prova de burn (retirada) de tokens no evento de retirada do utilizador. Permite aos utilizadores provar os seus tokens restantes no contrato ROOT utilizando a prova Patricia Merkle e a prova do cabeçalho do bloco. Note que para provar os tokens restantes, o cabeçalho do bloco deve estar comprometido com ROOT chain através de PoS (Stakeholders). O processo de retirada irá incorrer em taxas de gás Ethereum, como de costume. Alavancamos fortemente os checkpoints para os jogos de saída.

## Logs de eventos do tipo UTXO {#utxo-like-event-logs}

Para transferências ERC20/ERC721, isto é conseguido utilizando uma estrutura de dados de log de eventos do tipo UTXO. Abaixo está um evento `LogTransfer` para referência.

```jsx
event LogTransfer(
    address indexed token,
    address indexed from,
    address indexed to,
    uint256 amountOrTokenId,
    uint256 input1, // previous account balance of the sender
    uint256 input2, // previous account balance of the receiver
    uint256 output1, // new account balance of the sender
    uint256 output2 // new account balance of the receiver
);
```

Assim, basicamente todas as transferências ERC20/ERC721 emitem este evento e os saldos anteriores do remetente e do destinatário (`input1` e `input2`) tornam-se entradas (tipo UTXO ) para o tx e os novos saldos tornam-se as saídas (`output1` e `output2`). As transferências são rastreadas por meio de colagem de todos os eventos `LogTransfer` relacionados.

## Jogos de saída {#exit-games}

Como os blocos são produzidos por um produtor de blocos único (ou por muito poucos), isso expõe uma superfície para fraude. Vamos discutir brevemente os cenários de ataque e depois falar sobre como plasma garante a proteção de um utilizador.

## Vetores de ataque {#attack-vectors}

### Operador Malicioso {#malicious-operator}
O seguinte discute os cenários em que o operador poderia tornar-se malicioso e tentar cometer fraude.

1. Tokens do nada / gastos duplos / recibos malformados que aumentam de forma fraudulenta (para uma conta controlada pelo operador) / diminuição (para um utilizador) do saldo do token.
2. Indisponibilidade de dados: Depois de um utilizador enviar um tx, digamos que o operador inclui o tx no bloco de plasma, mas torna os dados da chain indisponíveis para o utilizador. Nesse caso, se o utilizador iniciar uma saída de um tx mais antigo, pode ser desafiado na chain mostrando o seu tx mais recente. Torna-se fácil afligir o utilizador.
3. No pior dos casos, um operador poderia executar A.1 e (ou) A.2 e colmatar com os validadores para comprometer as transições de estado inválidas para ROOT chain.
4. Interrupção da sidechain: O operador para de produzir blocos e a chain para. Se um checkpoint não tiver sido submetido para uma duração especificada, seria possível marcar a sidechain como interrompida na ROOT chain. Depois disso, não podem ser submetidos mais checkpoints.

Por razões listadas acima ou por outras, se a plasma chain se tornou desonesta, o utilizador precisa de iniciar uma saída em massa, e aspiramos fornecer instruções na ROOT chain para que os utilizadores possam alavancar, se e quando o momento chegar.

### Usuário Malicioso {#malicious-user}

1. O utilizador inicia a saída de um tx comprometido, mas continua a gastar na sidechain. Semelhante a gastos duplos, mas em 2 chains.

Estamos a constuir sobre as ideias de [MoreVp 7](https://ethresear.ch/t/more-viable-plasma/2160). Em suma, o MoreVP introduz uma nova maneira de calcular a prioridade de saída, chamada de prioridade de "entrada mais nova". Em vez de ordenar saídas pela idade da saída, as ordens moreVP saem pela idade da entrada mais nova. Isto tem o efeito que saídas de outputs, mesmo que estejam incluídas em blocos retidos depois de transações "do nada", serão processadas corretamente, desde que tenham origem apenas de entradas válidas. Definimos `getAge` que atribui uma idade a um tx incluído. Isto é definido no [plasma mínimo viável 1](https://ethresear.ch/t/minimal-viable-plasma/426).

```jsx
function getAge(receipt) {
  const { headerNumber, plasmaBlockNum, txindex, oindex } = receipt
  return f(headerNumber, plasmaBlockNum, txindex, oindex) // multiplied with their respective weights
}
```

## Cenários de saída {#exit-scenarios}

Apresentaremos alguma terminologia antes de continuar a discutir os cenários de saída:

- **Retirador**: Um utilizador que quer sair da plasma chain.
- **Tx comprometido**: Um tx que foi incluído num bloco da chain da Polygon e foi checkpointed na ROOT chain.
- **Tx de gasto**: Um tx que altera o saldo do token do utilizador em resposta a uma ação assinada pelo utilizador (não inclui transferências de token recebidas). Pode ser uma transferência, burn, tx, etc, iniciada pelo utilizador
- **Tx de referência**: Txs antes do tx de saída para esse utilizador e token em particular. Conforme definido no nosso esquema do saldo de conta baseado em UTXO, as saídas para o tx de referência tornam-se as entradas para o tx de que se está a sair.
- **Prioridade de saída MoreVP**: Idade da entrada mais nova (entre os txs de referência) para um tx em particular. Na maioria das vezes será utilizado para calcular a prioridade da saída.

### Gravar tokens {#burn-tokens}

Para sair da side chain, um utilizador iniciaria uma *retirada ou burn de tokens* tx na plasma chain. Este tx emitirá um evento `Withdraw`.

```jsx
event Withdraw(
    address indexed token,
    address indexed from,
    uint256 amountOrTokenId,
    uint256 input1,
    uint256 output1
);
```

Aqui `input1` denota o saldo anterior do utilizador para o token em questão e `output1` indica o número de tokens restantes na sidechain. Esta construção é coerente com o nosso esquema *UTXO* baseado em conta. Um utilizador apresentará o recibo deste tx de retirada para retirar os tokens na Mainchain. Ao referenciar este recibo, o utilizador também tem de fornecer o seguinte:

1. Prova Merkle da inclusão de um recibo num bloco sidechain (`receiptsRoot`)
2. Prova Merkle da inclusão de uma transação num bloco sidechain (`transactionsRoot`)
3. Prova da inclusão do cabeçalho do bloco sidechain no checkpoint na ROOT chain

```jsx
startExit(withdrawTx, proofOfInclusion /* of the withdrawTx in the checkpoint */) {
  Verify inclusion of withdrawTx in checkpoint using proofOfInclusion
  Verify msg.sender == ecrecover(withdrawTx)

  uint age = getAge(withdrawTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}
```

Sempre que um utilizador desejar sair da plasma chain, eles (ou abstraído pela aplicação do cliente, ou seja, a carteira) devem queimar os tokens na sidechain, aguardar para que seja checkpointed e, em seguida, iniciar uma saída do tx de restirada checkpointed.

### Sair das últimas transferências ERC20/721 (MoreVP) {#exit-from-the-last-erc20-721-transfers-morevp}

Considere o cenário: o utilizador fez uma transferência ERC-20 na sidechain. O operador adicionou um tx do nada antes da transferência do utilizador e conspirou com os validadores para fazer o checkpoint deste bloco. Neste cenário e, mais geralmente, nos vetores de A1 até A3 discutidos acima, o utilizador pode não ter tido a oportunidade de fazer burn dos seus tokens antes de um tx malicioso ser incluído e, portanto, teria de iniciar uma saída desde o último tx checkpointed na ROOT chain - por esta razão, além da saída por burn, temos de dar suporte a saídas de uma variedade de txs como transferências ERC20/721, entre outras. Com base neste vetor de ataque e explicando os 2 cenários:

**Transferência de saída:** Transferi alguns tokens para um utilizador, no entanto, notei que o operador incluiu um tx malicioso no bloco/chekpoint antes de incluir o meu tx de transferência. Preciso de iniciar a saída da chain. Vou iniciar uma saída do tx de transferência Conforme definido no MoreVP, vou precisar de fornecer um tx de de referência (*entrada UTXO*) que definirá a prioridade de saída da saída. Então, vou referenciar um tx que atualizou o meu saldo de token e que apenas precede o tx de transferência de saída.

```jsx
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the user after the input tx was executed >= tokens being transferred in the exitTx
  Verify msg.sender == ecrecover(exitTx)

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

**Transferência de entrada:** Percebi que o operador incluiu um tx malicioso no bloco/chekpoint antes de incluir o meu tx de transferência de entrada. Vou iniciar uma saída do tx de transferência de entrada ao referenciar o saldo da contraparte - porque aqui a *entrada UTXO* é o saldo da contraparte.

```
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the counterparty after the input tx was executed >= tokens being transferred in the exitTx
  Verify input.sender == ecrecover(exitTx) && input.receiver == msg.sender

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

### Sair de uma transação no voo (MoreVP) {#exit-from-an-in-flight-transaction-morevp}

Este cenário é para combater o cenário de indisponibilidade de dados. Digamos que fiz um tx, mas não sei se esse tx foi incluído devido à indisponibilidade de dados. Posso iniciar uma saída deste tx em andamento referenciando o último tx com checkpoint. O utilizador deve ter cuidado para não fazer txs sempre que inicia uma saída estilo MoreVP, caso contrário será desafiado.

**Observações:** Ao sair de uma construção estilo MoreVP, um utilizador pode iniciar uma saída fornecendo referências txs, tx de saída e colocando um pequeno `exit bond`. Para qualquer saída, se a saída for contestada com sucesso, a saída será cancelada e a fiança de saída será apreendida.

## Limitações {#limitations}

1. Tamanho de prova grande: Prova Merkle da inclusão da transação e prova merkle da inclusão do bloco (que contém aquela transação) no checkpoint.
2. Sair em massa: Se o operador se tornar malicioso, os utilizadores precisam de iniciar uma saída em massa.

A especificação está numa fase nascente, e gostaríamos de receber qualquer feedback que nos ajude a melhorá-la ou redesenhar completamente, se esta construção tiver problemas sem solução. A implementação é um trabalho em andamento no repositório de nossos [contratos.](https://github.com/maticnetwork/contracts)