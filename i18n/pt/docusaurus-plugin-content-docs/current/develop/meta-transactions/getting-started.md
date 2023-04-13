---
id: meta-transactions
title: Transações Meta
sidebar_label: Overview
description: Saiba mais sobre transações meta e como pode usá-las.
keywords:
  - docs
  - polygon
  - matic
  - transactions
  - meta transactions
  - gasless
image: https://matic.network/banners/matic-network-16x9.png
slug: meta-transactions
---

As chamadas de contratos inteligentes diárias estão no seu ponto máximo, atingindo cerca de 2,5 a 3 milhões por dia.
As DApps começam a aperceber-se da sua utilidade, mas estão a tornar-se vítimas do seu sucesso ou do sucesso
de outros devido a taxas de gás. Para não falar de que os obstáculos de integração dos utilizadores e os desafios das atuais
UX não são uma solução fácil.

## Atender aos Contratos Inteligentes {#servicing-smart-contracts}

Por defeito, os contratos inteligentes são máquinas de estado determinista que executam quando as taxas da transação são
pagas para atender à lógica do contrato, usando os recursos computacionais da rede.
Isto é realizado por um modelo de contador de gás na Ethereum (e Polygon).

## O Estado Atual de Transação {#the-current-state-of-transacting}

Existem limitações a este modelo de transação tradicional na Ethereum (e outras blockchains similares).
Uma limitação comum é o facto de um utilizador não ter os meios para pagar pelo gás. Por defeito, o remetente da
transação atua como o pagante e, uma vez que estes comportamentos são associados, se um utilizador tentar criar e enviar
uma transação, será ele o responsável pelas taxas de gás associadas. Da mesma forma, se um utilizador construir, interagir
com, ou correr uma DApp, o utilizador é obrigado a pagar o gás.

É irrealista esperar que um utilizador comum compre cripto e pague pelo gás para interagir com uma
aplicação. O que pode ser feito para abordar isto é desassociar o remetente de uma transação de atuar
como pagante, permitindo escalar a execução de uma transação e iniciar um processo de transação
contínuo.

Em vez da execução de uma transação direta, existiria um middleware (por meio de uma entidade terceira) para tratar do gás.
É aqui que entram as transações meta.

## O que são as transações meta? {#what-are-meta-transactions}

As transações meta permitem que qualquer pessoa possa interagir com a blockchain. Não exigem que os utilizadores tenham
tokens para pagar pelos serviços da rede através das taxas de transação. Isto é feito através da desassociação do
remetente de uma transação e do pagante do gás.

Uma solução que pode permitir a integração de novos utilizadores e ajudar os atuais.

O executor de uma transação atua como remetente. Em vez de gastar gás, apenas criam uma
solicitação de transação, assinando a sua ação pretendida (os parâmetros da transação) com a sua chave
privada. A transação meta é uma transação regular na Ethereum que inclui parâmetros adicionais para criar
a transação meta.

Os parâmetros da transação assinados são passados para uma rede secundária, que atua como retransmissor.
Embora existam regimes diferentes para tal, os retransmissores geralmente escolheriam as transações que compensaria serem
submetidas, avaliando a transação (por exemplo, ser relevante para a DApp). Após a validação, o retransmissor
irá embrulhar a solicitação (a mensagem assinada) numa transação real (o que significa pagar a taxa do gás)
e transmiti-la à rede onde contrato desembrulha a transação pela validação da assinatura
original e executa-a em nome do utilizador.

:::note As palavras meta e lote podem ser sinónimos para algumas pessoas

Para esclarecer: uma transação meta é diferente de uma transação em lote, uma vez que uma transação em lote é
uma transação que consegue enviar múltiplas transações de uma só vez e depois ser executada por um único remetente
(nonce único especificado) em sequência.

:::

Em suma, as transações meta são um padrão de design onde:

* Um utilizador (remetente) assina uma solicitação com a sua chave privada e envia-a para um retransmissor
* O retransmissor embrulha a solicitação num tx e envia-a para um contrato
* O contrato desembrulha o tx e executa-o

As transações nativas pressupõem que o “remetente” seja também o “pagante”. Ao afastar o “pagante” do
“remetente”, o “remetente” torna-se uma espécie de "pessoa com intenção” - o remetente mostra a intenção da transação
que gostaria de ver executada na blockchain, assinando a mensagem que contém os parâmetros específicos relacionados com
a sua mensagem e não uma transação inteiramente construída.

## Casos de utilização {#use-cases}

Pode-se imaginar a capacidade das transações meta para escalar as DApps e as interações com contratos inteligentes.
Para além de conseguir criar uma transação sem gás, o utilizador consegue fazê-lo muitas vezes e com uma ferramenta de
automação; assim, as transações meta podem influenciar a próxima onda de aplicações para casos de utilização prática. As transações meta
revelam a utilidade real da lógica do contrato inteligente, que é muitas vezes limitada devido às taxas de gás e às interações
exigidas na blockchain.

### Exemplo com votação {#example-with-voting}

O utilizador pretende participar na governação por chain e pretende votar num determinado resultado por meio de um
contrato de votação. O utilizador assinaria uma mensagem que indica a decisão do utilizador com um voto neste contrato
em particular. Tradicionalmente, seria exigido que pagasse a taxa de gás pela interação com o contrato (e saber como
interagir com o contrato), mas, em vez disso, pode assinar uma transação meta (fora do blockchain) com a informação
necessária para o seu voto e passá-la a um retransmissor que executaria a transação em seu nome.

A mensagem assinada é enviada a um retransmissor (os parâmetros tx assinados acerca da informação de votação). O retransmissor
valida que esta transação é um voto prioritário, embrulha a solicitação de voto numa transação real,
paga as taxas de gás e transmite-as ao contrato de votação. Tudo é verificado por parte do contrato de votação
e o voto é executado em nome do utilizador.

## Experimente {#try-them-out}

Assumindo que tem familiaridade com as diferentes abordagens que tem para integrar as transações meta na sua
DApp e dependendo se está a migrar para as transações meta ou a construir uma nova DApp ao usá-la.

Para integrar a sua DApp com as transações meta na Polygon pode escolher um dos seguintes
retransmissores ou optar por uma solução personalizada:

* [Biconomy](https://docs.biconomy.io/products/enable-gasless-transactions)
* [Gas Station Network (GSN)](https://docs.opengsn.org/#ethereum-gas-station-network-gsn)
* [Infura](https://infura.io/product/ethereum/transactions-itx)
* [Gelato](https://docs.gelato.network/developer-products/gelato-relay-sdk)
