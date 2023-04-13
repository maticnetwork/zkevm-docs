---
id: general-faq
title: Perguntas frequentes gerais
description: Perguntas habituais na rede da Polygon.
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## O que é a rede da Polygon? {#what-is-polygon-network}

A rede da Polygon é uma solução de escalonamento de camada 2 (ou 2ª camada) alavancada pela utilização de sidechains para computação fora da blockchain, ao mesmo tempo que garante a segurança e descentralização dos ativos através de validadores de Proof of Stake (PoS).

Veja também [O que é a Polygon](/docs/home/polygon-basics/what-is-polygon).

## O que é Proof of Stake (PoS)? {#what-is-proof-of-stake-pos}

Proof of Stake é um sistema em que a rede blockchain visa obter consenso distribuído. Qualquer pessoa com uma quantidade suficiente de tokens pode bloquear as suas criptomoedas, e o incentivo económico reside no valor partilhado da rede descentralizada. Os indivíduos que efetuarem o staking das suas criptomoedas validam as transações ao votar no mesmo, enquanto o consenso é alcançado quando uma transação ou conjunto de transações de um bloco ou conjunto de blocos de um checkpoint recebe votos suficientes. O limiar usa o peso em termos de stake que é inerente a cada voto. Por exemplo, na Polygon, é obtido consenso para a alocação de checkpoints de blocos da Polygon à rede Ethereum quando pelo menos ⅔ +1 do poder total de staking votar a favor.

Veja também [O que é Proof of Stake (PoS)](/docs/home/polygon-basics/what-is-proof-of-stake).

## Que papel desempenha o Proof of Stake na arquitetura da Polygon? {#what-role-does-proof-of-stake-play-in-the-polygon-architecture}

A camada de Proof of Stake na arquitetura da Polygon atende aos dois propósitos a seguir:

* Atua como camada de incentivo para manter ativa a chain Plasma, principalmente mitigando o problema espinhoso da indisponibilidade de dados.
* Implementa as garantias de segurança Proof of Stake para transições de estado não cobertas pelo Plasma.

## O que distingue o Polygon PoS de outros sistemas semelhantes? {#how-is-polygon-pos-different-from-other-similar-systems}

É diferente no sentido de que serve a um duplo propósito: fornecer garantias de disponibilidade de dados para a chain Plasma que cobre transições de estado via Plasma Predicates, bem como validação do Proof of Stake para contratos inteligentes genéricos na EVM.

A arquitetura da Polygon também separa o processo de produção e validação de blocos em duas camadas distintas. Enquanto produtores de blocos, os validadores criam blocos, como o nome sugere, na chain da Polygon para confirmações parciais mais rápidas (< 2 s), enquanto a confirmação final é obtida assim que o checkpoint é alocado na mainchain com um certo intervalo; este período pode variar em função de múltiplos fatores, como o congestionamento da Ethereum ou o número de transações da Polygon. Em condições ideais, deve oscilar entre 15 minutos a 1 hora.

Um checkpoint é basicamente a raiz Merkle de todos os blocos produzidos entre intervalos. Os validadores desempenham várias funções, como a criação de blocos na camada produtora de blocos, participação no consenso ao assinar todos os checkpoints e alocação do checkpoint quando atuam como proponentes. A probabilidade de um validador se tornar produtor de blocos ou proponente baseia-se em sua percentagem de stake na pool geral.

## Encorajar o proponente a incluir todas as assinaturas {#encouraging-the-proposer-to-include-all-signatures}

Para aproveitar na totalidade o bónus de proponente, o proponente precisaria de incluir todas as assinaturas no checkpoint. Uma vez que o protocolo pretende um peso de ⅔+1 do stake total, o checkpoint será aceite mesmo com 80% dos votos. No entanto, neste caso, o proponente obtém apenas 80% do bónus calculado.

## Como posso enviar um pedido de suporte ou contribuir para a documentação da Polygon? {#how-can-i-raise-a-support-ticket-or-contribute-to-polygon-documentation}
Se pensa que algo tem de ser corrigido na nossa documentação ou se quer até adicionar nova informação, pode [colocar o problema no repositório da Github](https://github.com/maticnetwork/matic.js/issues). O [ficheiro Readme](https://github.com/maticnetwork/matic-docs/blob/master/README.md) do repositório também dá algumas sugestões sobre como contribuir para a nossa documentação.

Se continua a precisar de ajuda, pode contactar sempre a **nossa equipa de suporte**.
