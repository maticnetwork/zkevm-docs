---
id: faq
title: Perguntas frequentes
description: Perguntas frequentes sobre o Polygon
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Perguntas frequentes {#frequently-asked-questions}

## O que é Polygon? {#what-is-polygon}

O Polygon é uma solução de escalonamento para blockchain públicos, especificamente o Ethereum. O Polygon oferece escalabilidade enquanto garante uma experiência de usuário superior de maneira segura e descentralizada. Tem uma implementação de trabalho para o Ethereum no Kovan Testnet. O Polygon pretende apoiar outras blockchains no futuro que nos permitirão fornecer recursos de interoperabilidade ao lado de oferecer escalabilidade para redes de blockchain públicas existentes.

## Em que medida é que a Polygon é diferente de outras implementações do Plasma? {#how-is-polygon-different-from-other-implementations-of-plasma}

A implementação do Plasma da Polygon é construída com sidechains baseados no estado que são executados no EVM, enquanto as outras implementações do Plasma usam principalmente UTXOs que os restringe a ser específicos do pagamento. Ter sidechains baseados no estado permite que o Polygon forneça escalabilidade para contratos inteligentes genéricos também.

Em segundo lugar, o Polygon usa uma camada de verificação pública que publica pontos de verificação após intervalos periódicos (diferentemente de pontos de verificação após cada bloco do Plasma Cash) permitindo que os sidechains operem em altas velocidades enquanto publicam os pontos de verificação dos lotes. Estes pontos de verificação e as provas de fraude garantem que os sidechains do Polygon funcionem de forma segura.

## O vosso projeto oferece escalabilidade para a Ethereum utilizando Plasma chains. Trata-se de um protocolo ou de uma blockchain nativa por si só? {#your-project-provides-scalability-for-ethereum-using-plasma-chains-is-it-a-protocol-or-a-native-blockchain-in-itself}

A rede Polygon é uma solução de **"sidechain"** onde os ativos da cadeia principal do Ethereum, ou seja, todos os dApps/Tokens/Protocolos da cadeia principal podem ser movidos/migrados para sidechain(s) do Polygon e, quando necessário, pode-se retirar os ativos de volta à cadeia principal.

## Quais são as vantagens competitivas do Polygon sobre os seus concorrentes? {#what-are-the-competitive-advantages-of-polygon-over-its-competitors}

### Soluções de dimensionamento de 2ª camada {#l2-scaling-solutions}

A Polygon está empenhada em atingir escala com descentralização. A Polygon usa checkpoints periódicos e proteções contra fraude. Quando os utilizadores querem retirar os seus ativos, eles usam os pontos de verificação para provar os seus ativos na sidechain, enquanto são necessárias provas de fraude para contestar fraudes ou qualquer mau comportamento e stakers de corte.

Outros projetos também estão oferecendo soluções de escalabilidade L2, mas há dois elementos-chave que diferimos em:

1. Em primeiro lugar, o Polygon está concentrado não apenas nas transações financeiras, mas também nos jogos e outros dApps de utilidade. Também temos planos para serviços financeiros completos como dApps de empréstimo/negociação (swaps de token, negociações de margem e muito mais).

2. Em segundo lugar, enquanto o Polygon usa pontos de verificação para tempos de blocos de 1 segundo (com camada de PoS), muitas outras soluções podem ter tempos de blocos superiores aos tempos de blocos Ethereum, pois é necessário enviar todos os blocos do sidechain para a chain principal.

### Soluções de dimensionamento de 1ª camada {#l1-scaling-solutions}

Além disso, entre outros projetos de escalonamento, o Polygon se destaca pela capacidade de alcançar a escala, mantendo um grande grau de descentralização.

Mais importante, estes projetos de escalabilidade têm um problema de "reinventar a roda". Eles estão criando novos blockchains onde a comunidade de desenvolvedores, o ecossistema de produtos, a documentação técnica e as empresas precisam ser construídos a partir do **"arranhão"**. O Polygon, por outro lado, é uma chain habilitada para EVM e tem todos os dApps/ativos construídos na chain principal do Ethereum com escalabilidade disponível no clique de um botão.

### Pagamentos {#payments}

Acreditamos que o Polygon tem uma vantagem em termos de usabilidade porque, em outras soluções, tanto o remetente como o receptor têm de criar seus canais de pagamento. Trata-se de algo muito complicado para os utilizadores. Já com a tecnologia subjacente da Polygon, não existe qualquer requisito de canais de pagamento para os utilizadores e estes só precisam de um endereço Ethereum válido para receber tokens. Isto também está em linha com a nossa visão a longo prazo de melhorar a experiência do utilizador para as aplicações descentralizadas.

### Trading e Finanças {#trading-and-finance}

O Polygon pretende habilitar os pools de DEX (por exemplo, 0x), de Liquidez (por exemplo, a Rede Kyber) e outros tipos de protocolos financeiros, como protocolos de concessão de empréstimos (Protocolo Dharma) na sua plataforma, que permitirão que os utilizadores do Polygon acessem aplicações de serivce financeiros variadas como DEXs, dApps, LPs e muitos outros.

## Como o Polygon se compara com outras soluções de sidechain? {#how-does-polygon-compare-with-other-sidechain-solutions}

No Polygon, todas as transações laterais são garantidas por múltiplos mecanismos da sidechain e da chain principal. No sidechain, todas as transações realizadas pela camada de produtor de blocos são verificadas e verificadas na chain principal por uma camada de verificação altamente descentralizada.

Se alguma transação fraudulenta ocorrer no sidechain, ela pode ser detectada e tratada pela camada de checkpoint. Mesmo em cenário extremo e altamente improvável em que a camada de produtor de blocos e a camada de verificação tanto do agrupamento, mesmo assim a chain principal tem provas de fraude nas quais qualquer pessoa do público pode vir e desafiar qualquer transação que considere fraudulenta na sidechain.

Se o desafio for bem-sucedido, há um enorme desincentivo econômico/punição financeira para as partes de colluding à medida que suas apostas são cortadas. Além disso, o desafiador público é recompensado com as apostas cortadas dos agentes fraudulentos do sidechain.

Isso torna o Polygon uma rede de sidechain economicamente incentivada que tenha um alto grau de descentralização e segurança das transações de sidechain.

Também a capacidade e o TPS de sidechains do Polygon são muito superiores a outras soluções. Especialmente quando o Polygon pode ter milhares de transações enquanto outras são sidechains únicos que têm um limite maior de algumas mil transações.

## Através de quais princípios serão adicionados novos sidechains? Haverá requisitos especiais para sidechains locais de empresas privadas? {#via-what-principles-will-new-sidechains-be-added-will-there-be-any-special-requirements-for-private-companies-local-sidechains}

Relativamente aos canais de estado, o Plasma representa uma alternativa superior aos frameworks de dimensionamento, principalmente devido às garantias de segurança previstas pelo framework - que afirmam, no essencial, que os utilizadores nunca perderão fundos, seja qual for a circunstância. Claro que poderá haver atrasos na devolução do dinheiro, mas um operador do Plasma Byzantine não pode criar dinheiro do nada, nem duplicar uma transação.

A Polygon esforçar-se-á por ser uma infrablockchain totalmente aberta e pública no futuro, em que os incentivos/desincentivos económicos conduzirão principalmente a segurança e estabilidade do sistema. Assim, qualquer pessoa deverá ser capaz de aderir ao sistema e participar no consenso. No estágio de semeadura da rede, inicialmente o Polygon terá de desempenhar um papel maior para permitir sidechains.

Além disso, os sidechains do Polygon seriam principalmente sidechains públicos ou seja, sidechains disponíveis para qualquer pessoa usar tal como outros blockchain públicos. No entanto, as cadeias de Polygon da Empresa pretendem fornecer sidechains dedicados (não habilitados à privacidade) para organizações particulares. A segurança e a descentralização dessas cadeias continuariam a ser mantidos intactos usando a camada de verificação e as provas de fraude na chain principal.

## Será também sincronizado com a chain principal (Ethereum)? {#will-sidechains-also-be-synced-with-the-main-chain-ethereum}

Absolutamente. A camada de verificação pública irá validar todas as transações que ocorrem nos sidechains e publicar as provas na chain principal. Para garantir a segurança infalível das transações de sidechain, o contrato de plasma da chain principal contém vários tipos de comprovações de fraude onde qualquer transação de sidechain pode ser desafiada para qualquer atividade fraudulenta. Se um desafiador for bem-sucedido, as apostas dos atores de sidechain envolvidos na fraude são cortadas e transferidas para o adversário. Isso é equivalente a um bug de alta stake sempre em execução. Um bom diagrama para compreensão é como abaixo:.

![Captura de ecrã](/img/matic/Architecture.png)

## No final do White Paper existe uma lista de "Casos de Utilização Potencial" - tudo isso será implementado? Por que ordem? {#at-the-end-of-the-white-paper-there-is-a-list-of-potential-use-cases-will-all-of-that-be-implemented-in-what-order}

A lógica básica é - se houver um dApp / Protocolo que está funcionando no Ethereum, mas é limitada por baixa taxa de transferência de transações e altas taxas de transação - então poderemos adicionar suporte para estes dApps / Protocolos na rede Polygon.

## Por que será difícil replicar a implementação do Plasma da Polygon? {#why-will-it-be-difficult-to-replicate-polygon-s-plasma-implementation}

Embora se trate mais do efeito da rede em termos de qual rede é capaz de escalar / cultivar o ecossistema melhor do que outros, as soluções de blockchain devem ser de código aberto, pois envolvem os ativos reais que são usados por eles.

É o caso de todos os projetos de código aberto. É aplicável tanto a nós como às outras implementações rivais, pois teremos a nossa licença GPL, que obriga qualquer pessoa que utilize a nossa implementação a manter o código aberto. Mas, novamente, o ponto de ser que a cópia de código é aplicável mesmo ao Bitcoin, Ethereum e outros projetos, é mais sobre o efeito da rede que um projeto pode alcançar.

## O que tem de especial a Implementação do Plasma da Rede da Polygon? {#what-s-special-about-polygon-network-s-plasma-implementation}

O Polygon Plasma usa um sistema de modelos baseado em conta em vez do sistema UTXO. Isso nos fornece uma enorme vantagem de usar um EVM na chain Polygon que nos permite utilizar todo o ecossistema Ethereum, ferramentas de desenvolvedores, bibliotecas de integração, etc. para a rede Polygon.

A rede Polygon pode ser usada pelo dApps sem exigir alterações nos tokens ERC20. Além disso, a nossa camada de verificação nos permite ser ordens de magnitudes mais rápidas do que outras implementações de Plasma, pois lotamos as provas de blocos individuais nos pontos de verificação, enquanto outras implementações de plasma devem enviar cada prova de blocos à chain principal.

## Como vão resolver os problemas com a centralização? {#how-are-you-going-to-solve-the-issues-with-centralization}

Segue-se um diagrama esclarecedor:

![Captura de ecrã](/img/matic/Merkle.png)

Assim, em primeiro lugar, os nós PoA serão Delegados (com Proof of Solvency ou seja, têm de depositar uma grande quantidade de stake) e KYC basicamente selecionados pela camada PoS como um estilo EOS Delegado Proof of Stake (DPoS) ou os nós Delegados da Tolerância de Falhas Bizantina (DBFT).

Em segundo lugar, vamos assumir que todos os Delegados (ou 2/3º deles) transformem atores ruins e produzem blocos defeituosos, então tem stakers de camadas PoS que irão validar todos os blocos e, se forem cometidos fraudes, as apostas dos Delegados são cortadas e o checkpointing é interrompido para as ações de Correção.

Em terceiro lugar, digamos que até mesmo a camada de PoS do Staker (que seria um grande número de nós) também se torna ruim e collude para produzir pontos de verificação defeituosos, ou seja, todos os PoA estão corruptos e PoS estão corrompidos. Mesmo assim, seguindo a filosofia do Plasma, estamos escrevendo uma das coisas cobiçadas da escalonamento de sidechain, **provas** de fraude que estão sendo assistidas por muitos grandes projetos (os observadores podem ser vistos como nossos observadores de repositórios no GitHub). Este mecanismo de prova de fraude permite que qualquer pessoa em público desafie qualquer transação na cadeia principal, Ethereum.

## Por que é necessário o token MATIC? {#why-is-matic-token-required}

As seguintes razões reforçam a necessidade de ter token MATIC:

### O Polygon pretende ser uma solução de escalonamento de propósitos gerais para blockchains públicos {#polygon-intends-to-be-a-general-purpose-scaling-solution-for-public-blockchains}

Estamos começando no Ethereum como nossa primeira base, mas no futuro Polygon pode ser implantado em múltiplas basechains. Em breve serão adicionadas outras basechains, pelo que não faz sentido usar uma moeda (Ether) para pagar taxas nas sidechains. Se houver uma preocupação existencial em relação a qualquer futuro de basechains, ter que a moeda de basechains como ativo nativo do Polygon irá prejudicar a rede de escalões. Por conseguinte, é importante construir o ecossistema de stakers sobre o token da rede da Polygon.

### Modelo de segurança do Appcoin {#appcoin-security-model}

A Polygon pretende habilitar as DApps para o pagamento das taxas da Polygon em Dapp-coins através da eliminação do mecanismo de swap de tokens e da utilização de uma pool de liquidez como a Kyber. O usuário simplesmente usa as moedas dApp para pagar taxas, em segundo plano a dApp-coins é trocada para tokens MATIC. Daí que os programadores de DApps que queiram fornecer uma experiência de utilização sem interrupções irão ajudar a manter a pool de liquidez da Polygon.

### Semeando a rede em estágios nascentes {#seeding-the-network-in-nascent-stages}

De início, é praticamente impossível efetuar o seeding do sistema quando existem poucas ou nenhumas txns na rede, uma vez que não podemos distribuir ETH entre a altamente descentralizada camada de validadores e entre os produtores de blocos. Já com os tokens MATIC, providenciamos uma grande percentagem de tokens a serem distribuídos para seeding dos produtores de blocos, participações de checkpointers e, posteriormente, oferecer recompensas aos blocos. Esta provisão garante que os stakers recebem recompensas mesmo que a rede demore algum tempo a assumir os efeitos de rede. É semelhante ao motivo pelo qual as recompensas de mineração de blocos foram mantidas para o Bitcoin; desta forma, os stakers e produtores de blocos podem ser incentivados a manter a rede protegida.

Se está preocupado com os Devs, um dos pilares da nossa estratégia consiste em manter a barreira de entrada para devs muito baixa. Garantimos que todas as ferramentas dev da Ethereum funcionam perfeitamente na Polygon. Em termos dos tokens necessários para pagar taxas no testnet, não é diferente para um edifício de desenvolvedores no Ethereum. O dev recebe tokens gratuitos para o testnet de uma faucet Polygon, assim como está no Ethereum. Só precisa de tokens MATIC quando quiser implantar no Polygon Mainnet, onde a taxa de gás é muito menor do que o Ethereum, em torno de 1/100 de uma taxa de transação que iria pagar no Ethereum.

## O que impulsiona a utilização e a procura de tokens MATIC? {#what-drives-the-use-and-demand-for-matic-tokens}

O token tem duas utilizações principais:

1. O token é usado para pagar as taxas de transação na rede.
2. O token é usado para staking para participar do mecanismo de consenso da Prova de Stake para verificar camada e bloquear a camada de produção.

### Algumas das razões secundárias para a demanda de tokens {#some-of-the-secondary-reasons-for-token-demand}

* A Rede da Polygon pretende habilitar as Dapps para o pagamento das taxas da Polygon em Dapp-coins através da eliminação do mecanismo de swap de tokens e da utilização de uma pool de liquidez como a Kyber. O usuário simplesmente usa as moedas dApp para pagar taxas, em segundo plano a dApp-coins é trocada para tokens MATIC. Daí que os programadores de DApps que queiram fornecer uma experiência de utilização sem interrupções irão ajudar a manter a pool de liquidez da Polygon.

* Para permitir saídas mais rápidas, estamos implementando um mecanismo de empréstimo usando o Protocolo Dharma no qual um underwriter/credor pode receber o token de saída e desembolsar o valor da saída com uma pequena taxa como interesse. O credor reivindica os tokens ao fim de uma semana através da utilização do token de saída. O utilizador obtém assim saques quase imediatos, enquanto os credores podem receber juros pelo serviço prestado.

### Queima de tokens ao nível do Protocolo {#protocol-level-burning-of-tokens}

Pretendemos queimar uma porcentagem da taxa da transação em cada bloco. Isso torna os tokens deflacionários e fornece um suporte constante em termos de seu valor no nível do protocolo.

### Barreira de entrada reduzida (e, portanto, maiores hipóteses de adoção rápida) {#low-entry-barrier-and-hence-higher-chances-of-quick-adoption}

Apostamos fortemente nas DApps para conseguir a adoção por parte dos utilizadores finais. Um dos principais recursos é que mantemos uma arquitetura que é totalmente compatível com o ecossistema de desenvolvimento do Ethereum, ou seja, todos os contratos inteligentes, carteiras, IDEs, ferramentas de DevOps etc são diretamente compatíveis com o Polygon.

Qualquer DApp da Ethereum pode ser portada para a Polygon quase sem alterações significativas. Assim, as barreiras de entrada para os desenvolvedores do Ethereum existentes para a transição para o Polygon são insignificantes, que podem impulsionar uma adoção do dApp viral. Isto tem o potencial de trazer muita demanda orgânica devido a efeitos da rede que constroem em torno da rede Polygon.

## O token é do tipo ERC-20? {#is-token-type-erc20}

Sim. E o mesmo token será aplicável também à Polygon Chain, ou seja, não há necessidade de se mudar para um token nativo no futuro.

## Quais são as TPS previstas que poderão colocar na rede Ethereum? O que têm a correr atualmente na testnet? {#what-is-the-expected-tps-you-ll-be-able-to-bring-to-the-ethereum-network-what-are-you-running-at-now-on-testnet}

Uma única sidechain tem capacidade de mais de 7.000 transações por segundo. O Polygon tem a capacidade de adicionar vários sidechains, mas atualmente nosso foco seria estabilizar a rede com um sidechain.
