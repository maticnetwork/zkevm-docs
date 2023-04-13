---
id: staking
title: Staking on Polygon
description: Staking on Polygon
keywords:
  - docs
  - polygon
  - matic
  - staking
  - unstake
  - restake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Staking on Polygon {#staking-on-polygon}

Para a Rede Polygon, qualquer participante pode ser qualificado para se tornar um validador de rede executando um nó completo. O principal incentivo para executar um nó completo para validadores é ganhar taxas de Recompensa e Transação. Os validadores que participam no consenso para a Polygon são incentivados a participar, pois eles recebem recompensas de bloco e taxas de transação.

Como os slots de validadores são limitados para a rede, o processo para ser selecionado como validador é participar de um leilão on-chain que acontece em intervalos regulares, conforme definido [aqui](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#a55fbd158b7d4aa89648a4e3b68ac716).

## Stake {#stake}

Caso o slot esteja aberto, então o leilão é iniciado para validadores interessados:

- Onde eles irão dar lances superiores à última oferta feita para o slot.
- O Processo de Participação no Leilão está descrito aqui:
    - O leilão é automaticamente iniciado uma vez que o slot for aberto.
    - Para começar a participar no leilão, peça `startAuction()`
    - Isso irá bloquear seus ativos no Stack Manager.
    - Se outro validador potencial ficar mais do que a sua stake, os tokens bloqueados serão devolvidos a si.
    - Mais uma vez, estaca mais para ganhar o leilão.
- No final do período de leilão, o maior licitante ganha e se torna um Validador na rede Polygon.

:::note

Mantenha o seu nó completo em execução se estiver a participar do leilão.

:::

O processo de se tornar um validador depois de o maior licitante ganhar o slot é descrito abaixo:

- Peça a `confirmAuction()` para confirmar a sua participação.
- A ponte no Heimdall ouve este evento e transmite ao Heimdall.
- Após consenso, o validador é adicionado ao Heimdall mas não é ativado.
- O validador começa a validar somente depois (aqui `startEpoch`[definidos)](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#c1c3456813dd4b5caade4ed550f81187).
- Assim que `startEpoch`chegar, o validador é adicionado `validator-set`e começa a participar do mecanismo de consenso.

:::info Recomendado

Para garantir a segurança para o stake dos validadores, nós recomendamos que os validadores forneçam um endereço `signer` diferente, do qual a verificação de `checkPoint` sigs será manuseada. Isto é para manter a assinatura da chave de carteira do validador para que os fundos sejam protegidos no caso de um hacker de nós.

:::

### Unstake {#unstake}

O descarregamento permite que o validador fique fora do pool ativo de validadores. Para garantir **uma Boa Participação**, a sua participação está bloqueada nos próximos 21 dias.

Quando os validadores quiserem sair da rede e parar de validar blocos e submeter pontos de verificação, eles podem `unstake`. Esta ação é imediata a partir de agora. Após esta ação, o validador é considerado a partir do conjunto ativo de validadores.

### Restake {#restake}

Os validadores também podem adicionar mais participação na quantidade de forma a ganhar mais recompensas e ser competitivos no local de validador e manter a posição.
