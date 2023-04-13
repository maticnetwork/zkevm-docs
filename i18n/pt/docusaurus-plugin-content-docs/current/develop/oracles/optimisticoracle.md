---
id: optimisticoracle
title: Oracle Optimistic da UMA
sidebar_label: UMA
description: Oracle otimista do UMA permite que os contratos solicitem e recebam rapidamente qualquer tipo de dados
keywords:   
  - wiki
  - polygon
  - oracle
  - UMA
  - Optimistic Oracle
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

O Oracle Otimista do UMA, permite que os contratos solicitem e recebam rapidamente qualquer tipo de dados. O sistema oracle do UMA, é composto de dois componentes principais:

1. Oracle Optimistic
2. Mecanismo de Verificação de Dados (DVM)

## Oracle Optimistic {#optimistic-oracle}

**O Oracle Otimista** do UMA permite que os contratos solicitem e recebam informações de preços rapidamente. O Oracle Otimista atua como um jogo de escalada generalizada entre contratos que iniciam uma solicitação de preço e o sistema de resolução de litígios do UMA, conhecido como Mecanismo de Verificação de Dados (DVM).

Os preços propostos pelo Oracle Optimistic não serão enviados ao DVM a menos que seja contestado. Isso permite que os contratos obtenham informações de preços dentro de qualquer período de tempo pré-definido sem escrever o preço de um ativo na chain.

## Mecanismo de Verificação de Dados (DVM) {#data-verification-mechanism-dvm}

Se for levantada uma contestação, é enviada uma solicitação ao DVM. Todos os contratos construídos na UMA usam o DVM como uma defesa para resolução de disputas. As contestações enviadas ao DVM serão resolvidas nas 48 horas após a votação dos titulares de tokens da UMA sobre o preço do ativo num determinado momento. Os contratos na UMA não têm de usar o Oracle Optimistic, a não ser que seja necessário o preço de um ativo num período inferior a 48 horas.

O mecanismo de verificação de dados (DVM) é o serviço de resolução de disputas nos contratos construídos num protocolo UMA. O DVM é poderoso porque engloba um elemento de julgamento humano para garantir que os contratos são geridos de forma segura e correta quando são levantadas contestações a partir de mercados voláteis (e por vezes manipuláveis).

## Interface do Oracle Optimistic {#optimistic-oracle-interface}

O Oracle Optimistic é usado por contratos financeiros ou qualquer entidade terceira para recuperar os preços. Desde que o preço seja solicitado, qualquer pessoa pode propor um preço em resposta. Assim que for proposto, o preço passa por um período de “liveness” onde qualquer pessoa pode contestar o preço proposto e enviar o preço disputado ao DVM da UMA para resolução.

:::info

Esta secção explica de que forma é que os vários participantes podem interagir com o Oracle Optimistic. Para ver as implantações mais recentes dos contratos Oracle Optimistic na mainnet, kovan ou L2, consulte os [endereços de produção](https://docs.umaproject.org/dev-ref/addresses).

:::

Existem doze métodos que compõem a interface do Oracle Optimistic.
- `requestPrice`
- `proposePrice`
- `disputePrice`
- `settle`
- `hasPrice`
- `getRequest`
- `settleAndGetPrice`
- `setBond`
- `setCustomLiveness`
- `setRefundOnDispute`
- `proposePriceFor`
- `disputePriceFor`

### requestPrice {#requestprice}

Solicita um preço novo. Tem de ser para um identificador de preço registado. Note que é chamado automaticamente pela maioria dos contratos financeiros que estão registados no sistema UMA, mas pode ser chamado por qualquer pessoa para qualquer identificador de preço registado. Por exemplo, o contrato Expiring Multiparty (EMP) chama este método quando o seu método `expire` é chamado.

Parâmetros:
- `identifier`: identificador do preço a ser solicitado.
- `timestamp`: carimbo de data/hora do preço a ser solicitado.
- `ancillaryData`: dados auxiliares que representam args adicionais a serem passados com o preço solicitado.
- `currency`: token ERC20 usado para o pagamento de recompensas e taxas. Deve ser aprovado para ser usado com o DVM.
- `reward`: recompensa oferecida a um proponente com êxito. Será pago pelo autor da chamada. Note que pode ser igual a 0.

### proposePrice {#proposeprice}

Propõe um valor de preço para uma solicitação de preço existente.

Parâmetros:
- `requester`: remetente da solicitação inicial do preço.
- `identifier`: identificador do preço para identificar a solicitação existente.
- `timestamp`: carimbo de data/hora para identificar a solicitação existente.
- `ancillaryData`: dados auxiliares do preço a serem solicitados.
- `proposedPrice`: preço a ser proposto.

### disputePrice {#disputeprice}

Disputa um valor de preço para uma solicitação de preço existente com uma proposta ativa.

Parâmetros:
- `requester`: remetente da solicitação inicial do preço.
- `identifier`: identificador do preço para identificar a solicitação existente.
- `timestamp`: carimbo de data/hora para identificar a solicitação existente.
- `ancillaryData`: dados auxiliares do preço a serem solicitados.

### resolução {#settle}

Tentativas de resolução de uma solicitação de preço pendente. Irá reverter se não puder ser resolvido.

Parâmetros:
- `requester`: remetente da solicitação inicial do preço.
- `identifier`: identificador do preço para identificar a solicitação existente.
- `timestamp`: carimbo de data/hora para identificar a solicitação existente.
- `ancillaryData`: dados auxiliares do preço a serem solicitados.

### hasPrice {#hasprice}

Verifica se uma determinada solicitação foi resolvida ou terminou (ou seja, o oracle optimist já tem um preço).

Parâmetros:
- `requester`: remetente da solicitação inicial do preço.
- `identifier`: identificador do preço para identificar a solicitação existente.
- `timestamp`: carimbo de data/hora para identificar a solicitação existente.
- `ancillaryData`: dados auxiliares do preço a serem solicitados.

### getRequest {#getrequest}

Obtém a estrutura de dados atual contendo informações sobre a solicitação do preço.

Parâmetros:
- `requester`: remetente da solicitação inicial do preço.
- `identifier`: identificador do preço para identificar a solicitação existente.
- `timestamp`: carimbo de data/hora para identificar a solicitação existente.
- `ancillaryData`: dados auxiliares do preço a serem solicitados.

### settleAndGetPrice {#settleandgetprice}

Recupera um preço que foi anteriormente solicitado pelo autor da chamada. Reverte se a solicitação não for resolvida ou passível de ser resolvida. Note que este método não está visível para que esta CALL possa realmente resolver a solicitação do preço, caso não tenha ainda sido resolvida.

Parâmetros:
- `identifier`: identificador do preço para identificar a solicitação existente.
- `timestamp`: carimbo de data/hora para identificar a solicitação existente.
- `ancillaryData`: dados auxiliares do preço a serem solicitados.

### setBond {#setbond}

Definir o título proposto associado à solicitação do preço.

Parâmetros:
- `identifier`: identificador do preço para identificar a solicitação existente.
- `timestamp`: carimbo de data/hora para identificar a solicitação existente.
- `ancillaryData`: dados auxiliares do preço a serem solicitados.
- `bond`: valor personalizado do título a ser definido.

### setCustomLiveness {#setcustomliveness}

Define um valor de liveness personalizado para a solicitação. Liveness é a quantidade de tempo que uma proposta tem de aguardar antes de passar a automaticamente resolvida.

Parâmetros:
- `identifier`: identificador do preço para identificar a solicitação existente.
- `timestamp`: carimbo de data/hora para identificar a solicitação existente.
- `ancillaryData`: dados auxiliares do preço a serem solicitados.
- `customLiveness`: novo liveness personalizado.

### setRefundOnDispute {#setrefundondispute}

Define a solicitação para reembolsar a recompensa se a proposta for contestada. Isto ajuda a “cobrir” o autor da chamada, no caso de haver um atraso devido a uma disputa. Note que, no caso de existir uma disputa, o vencedor ainda recebe o título do outro, pelo que ainda há lucro a realizar mesmo que a recompensa seja reembolsada.

Parâmetros:
- `identifier`: identificador do preço para identificar a solicitação existente.
- `timestamp`: carimbo de data/hora para identificar a solicitação existente.
- `ancillaryData`: dados auxiliares do preço a serem solicitados.

### disputePriceFor {#disputepricefor}

Disputa uma solicitação do preço com uma proposta ativa em nome de outro endereço. Note que este endereço irá receber quaisquer recompensas que resultem desta disputa. No entanto, quaisquer títulos serão retirados ao autor da chamada.

Parâmetros:
- `disputer`: endereço a definir como o autor da disputa.
- `requester`: remetente da solicitação inicial do preço.
- `identifier`: identificador do preço para identificar a solicitação existente.
- `timestamp`: carimbo de data/hora para identificar a solicitação existente.
- `ancillaryData`: dados auxiliares do preço a serem solicitados.

### proposePriceFor {#proposepricefor}

Propõe um valor do preço em nome de outro endereço. Note que este endereço irá receber quaisquer recompensas que resultem desta proposta. No entanto, quaisquer títulos serão retirados ao autor da chamada.

Parâmetros:
- `proposer`: endereço a definir como o proponente.
- `requester`: remetente da solicitação inicial do preço.
- `identifier`: identificador do preço para identificar a solicitação existente.
- `timestamp`: carimbo de data/hora para identificar a solicitação existente.
- `ancillaryData`: dados auxiliares do preço a serem solicitados.
- `proposedPrice`: preço a ser proposto.

## Integração do Oracle Optimistic {#integrating-the-optimistic-oracle}

Esta demonstração irá configurar um contrato `OptimisticDepositBox`, que tem a custódia do saldo token ERC-20 do utilizador.

Numa blockchain testnet local, o utilizador irá depositar wETH (Wrapped Ether) no contrato e fazer a retirada de wETH em USD. Por exemplo, se o utilizador quiser retirar 2.000 $10,000 USD of wETH, and the ETH/USD exchange rate is $, este deve fazer a retirada de 5 wETH.

* O utilizador liga o `OptimisticDepositBox` com um dos identificadores de preço ativos no DVM.

* O utilizador deposita wETH no `OptimisticDepositBox` e regista-o com o identificador de preço `ETH/USD` .

* O utilizador já pode fazer a retirada de um valor de wETH em USD das suas `DepositBox` através da CALL do contrato inteligente, onde o Oracle Optimistic permite um preço otimista na chain.

Neste exemplo, o utilizador não teria conseguido transferir valores de wETH em USD sem referenciar um feed de preço `ETH/USD` fora da chain. Portanto, o Oracle Optimistic permite ao utilizador “ir buscar” um preço de referência.

Ao contrário das solicitações de preço ao DVM, uma solicitação ao Oracle Optimistic pode ser resolvida dentro de uma janela de liveness específica, se não houver disputas, o que pode ser significativamente mais curto do que o período de votação do DVM. A janela de liveness é configurável, mas é tipicamente de duas horas, em comparação com 2 a 3 dias para resolução no DVM.

Atualmente, o requerente do preço não é obrigado a pagar taxas ao DVM. O requerente pode oferecer uma recompensa ao proponente que responde à solicitação de preço, mas o valor da recompensa está definido como `0` neste exemplo.

O proponente do preço publica um título juntamente com o seu preço, que será reembolsado se o preço não for contestado, ou se uma disputa for resolvida a favor do proponente. Caso contrário, este título é usado para pagar a taxa final ao DVM e a recompensa a um autor da disputa com êxito.

Na demonstração, o requerente não é obrigado a ter um título adicional do proponente do preço, pelo que o total do título publicado é igual à taxa final do wETH, atualmente 0,2 wETH. Consulte a função `proposePriceFor` no [contrato](https://docs-dot-uma-protocol.appspot.com/uma/contracts/OptimisticOracle.html) `OptimisticOracle` para mais detalhes sobre a implementação.

## Executar uma Demonstração {#running-the-demo}

1. Certifique-se de que seguiu todos os passos de configuração dos pré-requisitos [aqui](https://docs.umaproject.org/developers/setup).
2. Faça RUN de uma instância local Ganache (ou seja, não Kovan/Ropsten/Rinkeby/Mainnet) com `yarn ganache-cli --port 9545`
3. Noutra janela, faça migração dos contratos executando o seguinte comando:

  ```bash
  yarn truffle migrate --reset --network test
  ```

1. Para implantar o [contrato](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol) `OptimisticDepositBox` e passar por um fluxo do utilizador simples, execute o seguinte script de demonstração a partir da ROOT do repositório:

```bash
yarn truffle exec ./packages/core/scripts/demo/OptimisticDepositBox.js --network test
```

Deve ver o seguinte resultado:

```
1. Deploying new OptimisticDepositBox
  - Using wETH as collateral token
  - Pricefeed identifier for ETH/USD is whitelisted
  - Collateral address for wETH is whitelisted
  - Deployed an OptimisticOracle
  - Deployed a new OptimisticDepositBox


2. Minting ERC20 to user and giving OptimisticDepositBox allowance to transfer collateral
  - Converted 10 ETH into wETH
  - User's wETH balance: 10
  - Increased OptimisticDepositBox allowance to spend wETH
  - Contract's wETH allowance: 10


3. Depositing ERC20 into the OptimisticDepositBox
  - Deposited 10 wETH into the OptimisticDepositBox
  - User's deposit balance: 10
  - Total deposit balance: 10
  - User's wETH balance: 0


4. Withdrawing ERC20 from OptimisticDepositBox
  - Submitted a withdrawal request for 10000 USD of wETH
  - Proposed a price of 2000000000000000000000 ETH/USD
  - Fast-forwarded the Optimistic Oracle and Optimistic Deposit Box to after the liveness window so we can settle.
  - New OO time is [fast-forwarded timestamp]
  - New ODB time is [fast-forwarded timestamp]
  - Executed withdrawal. This also settles and gets the resolved price within the withdrawal function.
  - User's deposit balance: 5
  - Total deposit balance: 5
  - User's wETH balance: 5
```

## Explicação das funções do contrato {#explaining-the-contract-functions}

O [código do contrato](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol)`OptimisticDepositBox` mostra como interagir com o Oracle.

A função `constructor` inclui um argumento `_finderAddress` para o contrato `Finder` UMA, que mantém um registo do endereço `OptimisticOracle`, garantia aprovada e “lista branca” do identificador do preço, bem como outros endereços de contrato importantes.

Isto permite que `constructor` verifique se o tipo de garantia e o identificador do preço são válidos, e permite que `OptimisticDepositBox` encontre e interaja com `OptimisticOracle` mais tarde.

A função `requestWithdrawal` inclui uma CALL interna ao `OptimisticOracle` a solicitar o preço `ETH/USD` . Assim que for devolvido, o utilizador pode fazer a CALL de `executeWithdrawal` para concluir a retirada.

Há muito mais informações e explicação nos comentários do código, então por favor dê uma olhada se estiver interessado em saber mais.

## Recursos adicionais {#additional-resources}

Alguns recursos adicionais relativos ao DVM da UMA:

- [Arquitetura Técnica](https://docs.umaproject.org/oracle/tech-architecture)
- [Arquitetura Económica](https://docs.umaproject.org/oracle/econ-architecture)
- [Post do blog](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8) sobre o design do DVM da UMA
- [Whitepaper](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf) sobre o design do DVM da UMA
- [Repositório da pesquisa](https://github.com/UMAprotocol/research) para uma política de taxas ideal
- [Repositório da UMIP](https://github.com/UMAprotocol/UMIPs) para propostas de governança
