---
id: consensys-framework
title: FAQ do Scaling Framework
sidebar_label: Scaling Framework FAQ
description: Construa a sua próxima aplicação blockchain na Polygon.
keywords:
  - docs
  - matic
  - wiki
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Este framework é derivado de quatro perguntas do Consensys [para julgar qualquer solução de escaldamento.](https://consensys.net/?p=19015&preview=true&_thumbnail_id=19017)

## Quem a opera? {#who-operates-it}
Os nós mineradores da mainnet Ethereum “operam” ou fazem avançar a rede ao resolver o Proof of Work e criar novos blocos. A solução L2 (camada 2) requer um papel de "operador" semelhante na sua rede, que é o equivalente ao minerador da mainnet Ethereum que pode fazer avançar a rede L2. No entanto, existem algumas diferenças. Por exemplo, juntamente com o processamento e a autorização de transações como um minerador, um operador de L2 também pode facilitar a entrada e saída de utilizadores da própria camada L2.

### - Quem ou o que é necessário para operar a rede Proof of Stake (PoS) da Polygon? {#who-or-what-is-required-to-operate-the-polygon-proof-of-stake-network}

A commit-chain do Polygon PoS depende de um conjunto de validadores para proteção da rede. O papel dos validadores é executar um nó completo, produzir blocos, validar e participar no consenso e alocar checkpoints na mainchain Ethereum. Para se tornar um validador, é necessário fazer stake dos respetivos tokens MATIC com contratos de gestão de staking residentes na mainchain Ethereum.

Para mais detalhes, consulte a [seção Validador](/maintain/validate/getting-started.md).

### - Como se tornam operadores na rede Polygon PoS? Que regras cumprem? {#how-do-they-become-operators-in-the-polygon-pos-network-what-rules-do-they-abide-by}

Para se tornar um validador, é necessário fazer stake dos respetivos tokens MATIC
com contratos de gestão de staking residentes na mainchain Ethereum.

As recompensas são distribuídas a todos os stakers proporcionalmente à sua stake em cada checkpoint, com a exceção do proponente, o qual terá direito a um bónus adicional. O saldo das recompensas dos utilizadores é atualizado no contrato que serve de referência ao
resgate das recompensas.

Os stakes correm o risco de serem cortados se o nó de validador cometer um
ato malicioso, como a dupla assinatura, um tempo de inatividade do validador que também afete os
delegadores vinculados naquele checkpoint.

Para mais detalhes, consulte [Fluxo de ponta a ponta para um validador do Polygon](/maintain/polygon-basics/who-is-validator.md#end-to-end-flow-for-a-polygon-validator) e [responsabilidades de um validador](/maintain/validate/validator-responsibilities.md).


### - Que pressupostos de confiança devem os utilizadores do Polygon PoS estabelecer sobre o operador? {#what-trust-assumptions-must-the-polygon-pos-users-make-about-the-operator}

A commit-chain do Polygon PoS depende de um conjunto de validadores para proteção da rede. O papel dos validadores é executar um nó completo, produzir blocos, validar e participar no consenso e alocar checkpoints na mainchain. Para se tornar um validador, é necessário fazer stake dos respetivos tokens MATIC com contratos de gestão de staking residentes na mainchain.
A chain irá progredir com precisão desde que ⅔ do stake ponderado dos validadores sejam honestos.

### - Pelo que os operadores são responsáveis? Que poder têm? {#what-are-the-operators-responsible-for-what-power-do-they-have}

O papel dos validadores é executar um nó completo, produzir blocos, validar e participar no consenso e alocar checkpoints na mainchain.

Os validadores têm o poder de deter o progresso da chain, reordenar blocos, etc, assumindo que ⅔ dos validadores de stake ponderado não são honestos. Eles não têm o poder de alterar o estado, os saldos dos ativos dos utilizadores, etc.

### - Quais são as motivações para se tornar um operador do Polygon PoS? {#what-are-the-motivations-to-become-an-operator-of-the-polygon-pos}

Os validadores fazem stake dos seus tokens MATIC como garantia para trabalhar para a segurança da rede e, em troca do seu serviço, ganham recompensas.

Consulte [o que é o incentivo](/maintain/validator/rewards.md#what-is-the-incentive) para mais detalhes.

## Como são os dados? {#how-s-the-data}
Por definição, a tecnologia de camada 2 tem de criar checkpoints de dados incrementais numa camada 1 (mainnet Ethereum). A nossa preocupação será então o tempo intersticial entre esses check-ins periódicos da camada 1. Mais especificamente, como são gerados, armazenados e administrados os dados da camada 2 quando estão longe do porto seguro da camada 1? Estamos mais preocupados com esta questão, porque se trata do momento em que o utilizador está mais distante da segurança sem confiança de uma mainnet pública.

### - Quais são as condições de bloqueio para o Polygon PoS? {#what-are-the-lock-up-conditions-for-polygon-pos}

Na maioria dos padrões de design do token, este é minerado na Ethereum e pode ser enviado para o Polygon PoS. Para transferir um tal token da Ethereum para o Polygon PoS, o utilizador tem de bloquear fundos num contrato da Ethereum, e os tokens correspondentes são então minerados no Polygon PoS.

Este mecanismo de retransmissão de bridges é gerido pelos validadores do Polygon PoS, ⅔ dos quais precisam de chegar a acordo quanto ao evento de bloqueio de token na Ethereum para minerarem a quantidade correspondente de tokens no Polygon PoS.

O saque de ativos e sua devolução à Ethereum é um processo de duas etapas, em que os tokens têm de ser primeiro queimados na commit-chain do Polygon PoS e depois a prova desta transação de queima tem de ser apresentada na chain Ethereum.


Para mais detalhes, consulte [Passos para usar a ponte PoS](/develop/ethereum-polygon/pos/getting-started.md#steps-to-use-the-pos-bridge).

### - Quanto tempo demoram estes fundos a estar disponíveis no Polygon PoS? {#how-soon-are-those-funds-available-on-the-polygon-pos}

Cerca de ~22-30 minutos. Isto é feito através de um mecanismo de passagem de mensagem chamado `state sync`. Mais detalhes podem ser encontrados [aqui](/pos/state-sync/state-sync-mechamism.md).

O Polygon PoS oferece suporte aos utilizadores que entram sem bloqueio de L1 (ou seja, no caso de integrarem um utilizador diretamente na Polygon e este depois pretender sair para a mainnet Ethereum)?

Sim, neste caso será utilizado um mecanismo de bridge especial. Quando o utilizador pretende sair para a Ethereum, procede-se à mineração, em vez do método habitual de desbloqueio de tokens de um contrato especial.

Pode ler aqui sobre [eles](/develop/ethereum-polygon/mintable-assets.md).

### - Como é que um utilizador contestaria uma transação Polygon PoS inválida? Como provar que uma transação Polygon PoS é válida? {#how-would-a-user-dispute-an-invalid-polygon-pos-transaction-prove-a-valid-polygon-pos-transaction}

Atualmente, não existe forma de contestar uma transação Polygon PoS inválida na chain. No entanto, os validadores da chain Polygon PoS submetem pontos de verificação periódicos ao Ethereum - podem ver mais detalhes [aqui](/pos/heimdall/modules/checkpoint.md). É possível verificar uma transação na chain Polygon PoS no Ethereum construindo uma prova de árvore Merkle e verificando-a nos pontos de verificação periódicos que ocorrem no Ethereum da transação do Polygon PoS e do recibo das raízes da árvore Merkle.

### - Quando um usuário do Polygon desejar sair, em quanto tempo o fundo da Camada 1 com bloqueio (mais ou menos quaisquer ganhos ou perdas de L2) disponíveis no L1? {#once-a-polygon-user-wishes-to-exit-how-soon-are-the-locked-up-layer-1-fund-plus-or-minus-any-l2-gains-or-losses-available-back-on-l1}

Aproximadamente ~ 1-3 horas, dependendo da frequência dos [pontos](/pos/heimdall/modules/checkpoint.md) de verificação. A frequência é principalmente uma função do custo que os validadores estão dispostos a gastar em taxas de gás do ETH para apresentar checkpoints.

### - Está prevista a existência de fornecedores de liquidez na camada 1 que estejam dispostos a fornecer fundos de L1 imediatamente resgatáveis aos atuais utilizadores do Polygon PoS? {#do-you-anticipate-there-being-liquidity-providers-on-layer-1-willing-to-provide-immediately-redeemable-l1-funds-to-existing-polygon-pos-users}

Já existem alguns jogadores, como [Connext](https://connext.network/) e [Biconomy](https://biconomy.io/) que estão ou estarão fornecendo este serviço. Há uma série de outros intervenientes que também irão para o ar em breve.

## Como está o stack? {#how-s-the-stack}
A comparação do stack é importante para realçar o que uma camada 2 alterou, ou não, a partir da mainnet Ethereum.

### - Quanto é que o stack do Polygon PoS partilha com o stack da mainnet Ethereum? {#how-much-does-the-polygon-pos-stack-share-with-the-ethereum-mainnet-stack}

Se é um programador da Ethereum, já é também programador do Polygon PoS. Todas as ferramentas com que está familiarizado são automaticamente suportadas no Polygon PoS: Truffle, Remix, Web3js, entre muitas outras.

Não há grande alteração da interface EVM para o Polygon PoS em relação à Ethereum.

### -  Em que é que o Polygon PoS difere do stack da mainnet Ethereum e que riscos/recompensas isto representa? {#where-does-the-polygon-pos-differ-from-ethereum-mainnet-stack-and-what-risks-rewards-does-that-introduce}

Não existem grandes alterações.

## Preparar para o pior {#preparing-for-the-worst}
Como é que o sistema Polygon PoS se prepara para:

### -  Uma saída em massa dos utilizadores? {#a-mass-exit-of-users}

Os fundos da chain estão protegidos enquanto ⅔ dos validadores forem honestos. Se este pressuposto não for válido, a chain pode parar ou pode verificar-se uma reordenação. Será necessário consenso social para depois reiniciar a chain a partir de um estado anterior - incluindo snapshots do estado do Polygon PoS que são apresentados através de checkpoints que podem ser usados para o efeito.

### - Participantes da Polygon que tentam jogar com o consenso da Polygon. Por exemplo, formando um cartel? {#polygon-participants-attempting-to-game-the-polygon-consensus-for-example-by-forming-a-cartel}

Será necessário consenso social para então reiniciar a chain a partir de um estado anterior, ao remover esses validadores e a reiniciar com um conjunto novo de validadores - incluindo snapshots do estado do Polygon PoS que são apresentados através de checkpoints que podem ser usados para o efeito.


### - A descoberta de um bug ou exploit numa parte crítica do seu sistema? {#a-bug-or-exploit-discovered-in-a-critical-part-of-its-system}

Tivemos o cuidado de reutilizar componentes testados em situações extremas no desenvolvimento do sistema. No entanto, se houver um bug ou exploit numa parte crítica do sistema, a restauração de um estado precoce da chain por meio de consenso social é o principal caminho a seguir para o resolver.
