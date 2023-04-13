---
id: responsibilities
title: Validador
description: As responsabilidades de ser um validador na Rede Polygon
keywords:
  - docs
  - matic
  - polygon
  - validate
  - validator
  - responsibilities
slug: responsibilities
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Mantenha-se informado

Acompanhe as atualizações mais recentes de nós e validadores da equipe do Polygon e da comunidade assinando os [grupos](https://polygon.technology/notifications/) de notificação do Polygon.

:::

Um validador de blockchain é o responsável por validar transações dentro de uma blockchain. Na Rede Polygon, qualquer participante pode ser qualificado para se tornar validador do Polygon executando um nó de **validador (Sentry + Validador)** para ganhar recompensas e cobrar taxas de transação. Para garantir a boa participação de validadores, bloqueiam pelo menos 1 token MATIC como stake no ecossistema.

:::info

Atualmente, há um limite de 100 validadores ativos de cada vez. Para obter uma descrição detalhada sobre o que é um validador, consulte [Validador](/maintain/validator/architecture).

Além disso, depois de implantar a [<ins>proposta de governança do PIP4</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956) no nível do contrato, o valor mínimo de staking aumentará para 10.000 MATIC.

:::

Qualquer [validador](/maintain/glossary.md#validator) na rede Polygon tem as seguintes responsabilidades:

* Operações de nós técnicos (feitas automaticamente pelos nós)
* Operações
  * Manter um tempo de atividade elevado
  * Verificar todos os serviços e processos relacionados com nós
  * Executar a monitorização do nó
  * Manter o saldo do ETH (entre 0,5 a 1) no endereço do signatário
* Delegação
  * Estar aberto à delegação
  * Comunicar taxas de comissão
* Comunicação
  * Comunicar problemas
  * Fornecer feedback e sugestões
* Ganhe recompensas de staking para validar blocos no blockchain

## Operações de nó técnicas {#technical-node-operations}

As seguintes operações de nós técnicos são **feitas automaticamente pelos nós:**

* Seleção de produtor de blocos:
  * Selecione um subconjunto de validadores para o conjunto de produtores de blocos para cada [span](/docs/maintain/glossary.md#span)
  * Para cada span, selecione novamente o conjunto de produtor de blocos definido em [Heimdall](/maintain/glossary.md#heimdall) e transmita periodicamente as informações selecionadas para [BOR](/maintain/glossary.md#bor).
* Validação de blocos no BOR:
  * Para um conjunto de blocos de sidechain BOR, cada validador lê de forma independente dados de bloco para estes blocos e valida os dados no Heimdall.
* Envio do checkpoint:
  * Um [proponente](/maintain/glossary.md#proposer) é escolhido de entre os validadores para cada bloco Heimdall. O proponente do [checkpoint](/maintain/glossary.md#checkpoint-transaction) cria o checkpoint de dados do bloco BOR, valida e transmite a transação assinada para que outros validadores autorizem.
  * Se mais de 2/3 dos validadores ativos chegarem a um consenso sobre o checkpoint, o checkpoint é enviado para a mainnet Ethereum.
* Alterações de sincronização nos contratos de staking da Polygon em Ethereum:
  * Continuando a partir da etapa de envio de checkpoint, uma vez que esta é uma chamada de rede externa, a transação de checkpoint na Ethereum pode ou não ser confirmada, ou pode ficar pendente devido a problemas de congestionamento na Ethereum.
  * Neste caso, há um processo `ack/no-ack` que é seguido para garantir que o próximo checkpoint contém também um snapshot dos blocos BOR anteriores. Por exemplo, se o checkpoint 1 for para os blocos BOR 1–256 e falhar por algum motivo, o próximo checkpoint 2 será para os blocos BOR 1–512. Ver também [Arquitetura Heimdall: Checkpoint](/pos/heimdall/checkpoint).
* Sincronização de estado da mainnet Ethereum para a sidechain BOR:
  * O estado do contrato pode ser movido entre Ethereum e Polygon, especificamente através de [BOR](/maintain/glossary.md#bor):
  * Um contrato DApp na Ethereum chama uma função num contrato especial da Polygon na Ethereum.
  * O evento correspondente é retransmitido para Heimdall e depois para BOR.
  * Uma transação de sincronização de estado é chamada num contrato inteligente da Polygon e a DApp pode obter valor no BOR através de uma chamada de função no próprio BOR.
  * Está em vigor um mecanismo semelhante para enviar estado da Polygon para a Ethereum. Ver também [Mecanismo de Sincronização de Estado](/docs/pos/state-sync/state-sync).

## Operações {#operations}

### Manter um tempo de atividade elevado {#maintain-high-uptime}

O tempo de atividade do nó na rede da Polygon baseia-se no número de [transações checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) que o nó de validador assinou.

Aproximadamente a cada 34 minutos um proponente envia uma transação checkpoint para a mainnet Ethereum. A transação do ponto de verificação deve ser assinada por cada [validador](/maintain/glossary.md#validator) na Rede Polygon. **A falha na assinatura de um checkpoint de transction resulta na diminuição do desempenho do nó de validador**.

O processo de assinatura das transações de checkpoint é automatizado. Para garantir que seu nó de validador está a assinar todas as transações de checkpoint válidas, deve manter e monitorizar a saúde do seu nó.

### Verificar diariamente os serviços e processos de nó {#check-node-services-and-processes-daily}

Deve verificar diariamente os serviços e processos associados ao [Heimdall](/maintain/glossary.md#heimdall) e ao [Bor](/maintain/glossary.md#bor). Além disso, a podar dos nós deve ser feita regularmente para reduzir o uso do disco.

### Executar a monitorização do nó {#run-node-monitoring}

Deve executar:

* Painéis de Grafana fornecidos pela Polygon. Consulte repositório do GitHub: [Configuração do Matic-Jagar](https://github.com/vitwit/matic-jagar)
* Ou, use as suas próprias ferramentas de monitoramento para os nós [do validador](/maintain/glossary.md#validator) e [do sentinela](/maintain/glossary.md#sentry)
* O endpoint Ethereum usado nos nós deve ser monitorado para garantir que o nó esteja dentro dos limites da solicitação

### Manter um saldo ETH {#keep-an-eth-balance}

Deve manter uma quantidade adequada de ETH (deve estar sempre em torno do valor do limiar ou seja, de 0,5 a 1) no [endereço](/maintain/glossary.md#signer-address) do assinante do seu validador no Ethereum Mainnet.

Precisa de ETH para:

* Assinar as [transações de checkpoint](/maintain/glossary.md#checkpoint-transaction) propostas na mainnet Ethereum.
* Propor e enviar transações de checkpoint na mainnet Ethereum.

Não manter um valor adequado de ETH no endereço de signatário resultará em:

* Atrasos no envio de checkpoint. Observe que os preços de gás da transação na rede Ethereum podem flutuar e disparar.
* Atrasos na finalidade das transações incluídas nos checkpoints.
* Atrasos nas transações de checkpoint subsequentes.

## Delegação {#delegation}

### Estar aberto a delegação {#be-open-for-delegation}

Todos os validadores devem estar abertos para delegação da comunidade. Cada validador tem a escolha de definir a sua própria taxa de comissão. Não há limite superior na taxa de comissão.

### Comunicar taxas de comissão {#communicate-commission-rates}

É dever moral dos validadores comunicar as taxas de comissões e as alterações da taxa de comissão à comunidade. As plataformas preferidas para comunicar as taxas de comissão são:

* [Discord](https://discord.com/invite/0xPolygon)
* [Fórum](https://forum.polygon.technology/)

## Comunicação {#communication}

### Comunicar problemas {#communicate-issues}

A comunicação de problemas o mais cedo possível garante que a comunidade e a equipe do Polygon possam corrigir os problemas o mais rapidamente possível. As plataformas preferidas para comunicar as taxas de comissão são:

* [Discord](https://discord.com/invite/0xPolygon)
* [Fórum](https://forum.polygon.technology/)
* [GitHub](https://github.com/maticnetwork)

### Fornecer feedback e sugestões {#provide-feedback-and-suggestions}

No Polygon, valorizamos o seu feedback e sugestões sobre qualquer aspecto do ecossistema de validadores. [Fórum](https://forum.polygon.technology/) é a plataforma preferida para fornecer feedback e sugestões.
