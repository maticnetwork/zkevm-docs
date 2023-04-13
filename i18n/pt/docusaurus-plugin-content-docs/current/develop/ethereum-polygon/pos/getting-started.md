---
id: getting-started
title: PoS Bridge
sidebar_label: Introduction
description: Mais flexibilidade e retiradas mais rápidas com o Polygon PoS.
keywords:
  - docs
  - matic
  - pos bridge
  - deposit
  - withdraw
  - mapping
  - state sync
image: https://matic.network/banners/matic-network-16x9.png
---

Verifique a [documentação Matic.js sobre o PoS](../matic-js/get-started.md) mais recente para iniciar.

Uma bridge é basicamente um conjunto de contratos que ajudam na movimentação de ativos da chain ROOT para a chain filho. Existem principalmente duas bridges para mover ativos entre a Ethereum e a Polygon. A primeira é a ponte do Plasma e a segunda é chamada **Ponte PoS** ou **Ponte da Prova de Stake**. A **Plasma Bridge** fornece garantias de segurança superiores devido ao mecanismo de saída de Plasma.

No entanto, existem certas restrições sobre o token filho e há um período de retirada de 7 dias associado a todas as saídas/retiradas da Polygon para a Ethereum na Plasma Bridge.

Isto é bastante doloroso para os DApps/utilizadores que precisam de alguma **flexibilidade** e **retiradas mais rápidas**, e que estão satisfeitos com o nível de segurança fornecido pela bridge Proof of Stake da Polygon, protegida por um conjunto robusto de validadores externos.

Os ativos baseados em Proof of Stake oferecem segurança PoS e uma saída mais rápida com um intervalo de checkpoint.

## Etapas do uso da PoS Bridge {#steps-to-use-the-pos-bridge}

Antes de entrar nesta seção dos documentos, ele pode ajudar a ter uma compreensão completa de alguns termos, pois irá interagir com eles enquanto tenta usar a ponte: [Mapeamento](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) e Mecanismo de [Sincronização](https://docs.polygon.technology/docs/pos/state-sync/state-sync/) de Estado.

Em seguida, o primeiro passo para usar a bridge PoS é mapear o **token raiz** e o **token infantil**. Significa que o contrato de token na chain raiz e o contrato de token na chain de crianças têm de manter uma conexão (chamada mapeamento) para transferir ativos entre si. Se estiver interessado em enviar uma solicitação de mapeamento, faça isso usando [este guia](/docs/develop/ethereum-polygon/submit-mapping-request/).

Num nível mais baixo e com mais detalhes, é o que acontece:

### depositar {#deposit}

  1. O proprietário do token do ativo **(ERC-20/ERC-721/ERC-1155)** tem de aprovar um contrato específico na PoS Bridge para gastar a quantidade de tokens a serem transferidos. Este contrato específico é denominado **Contrato de Predicado** (implantado na Rede Ethereum), o qual **bloqueia efetivamente a quantidade de tokens a serem depositados**.
  2. Assim que a aprovação for dada, a etapa seguinte é **depositar o ativo**. Deve ser feita uma chamada de função no `RootChainManager`contrato que por sua vez aciona o `ChildChainManager`contrato na chain Polygon.
  3. Isto acontece através de um mecanismo de estado de sincronização que pode ser entendido em pormenor [aqui](/docs/pos/state-sync/state-sync/).
  4. `ChildChainManager`A `deposit`função interna do contrato de token de criança e a quantidade correspondente de tokens de ativos são **minerados na conta** do usuário. É importante notar que apenas `ChildChainManager`o acesso à `deposit`função no contrato de token filho.
  5. Assim que o utilizador receber os tokens, estes podem ser **transferidos quase instantaneamente e com uma taxa insignificante na chain da Polygon**.

### Retiradas {#withdrawals}

  1. Retirar ativos de volta ao Ethereum é um processo de 2 etapas no qual o token de ativos tem de ser **queimado primeiro na chain Polygon** e, em seguida, a **prova desta transação de queimadura tem de ser submetida** na chain Ethereum.
  2. São necessários cerca de 20 minutos a 3 horas para que a transação de burn inclua um checkpoint na chain Ethereum. Isso é feito pelos validadores Proof of Stake.
  3. Assim que a transação for adicionada ao checkpoint, a prova da transação de queimadura pode ser apresentada no `RootChainManager`contrato no Ethereum chamando a `exit`função.
  4. Esta função CALL **verifica a inclusão do checkpoint** e depois aciona o Contrato do Predicado que bloqueou os tokens dos ativos no momento em que os ativos foram inicialmente depositados.
  5. Como etapa final, o **contrato de predicado libera os tokens bloqueados** e os restitui à conta de usuários no Ethereum.

:::tip

Assim que o mapeamento for concluído, pode usar o **SDK matic.js** para interagir com os contratos ou fazer o mesmo sem o SDK. No entanto, o SDK matic.js foi projetado de forma muito acessível para o utilizador, de modo a facilitar a interação do mecanismo de transferência de ativos com qualquer aplicação.

:::