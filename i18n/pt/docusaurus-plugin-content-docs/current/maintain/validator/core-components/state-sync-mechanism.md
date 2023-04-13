---
id: state-sync-mechanism
title: Mecanismo de Sincronização de Estado
description: Mecanismo de sincronização de estado para ler nativamente os dados do Ethereum
keywords:
  - docs
  - matic
  - polygon
  - state sync
  - mechanism
slug: state-sync-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Os validadores na camada [Heimdall](/docs/maintain/glossary.md#heimdall) captam o evento [StateSynced](https://github.com/maticnetwork/contracts/blob/a4c26d59ca6e842af2b8d2265be1da15189e29a4/contracts/root/stateSyncer/StateSender.sol#L24) e transmitem-no para a camada [BOR](/docs/maintain/glossary.md#bor). Ver também [Arquitetura Polygon](/docs/pos/polygon-architecture).

O **contrato recebedor** herda o [IStateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol) e a lógica personalizada permanece dentro da função [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/05556cfd91a6879a8190a6828428f50e4912ee1a/contracts/IStateReceiver.sol#L5).

A versão mais recente, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), contém alguns aprimoramentos, como:
1. Restrição do tamanho dos dados em txs de sincronização de estado para:
    * **30Kb** quando representado em **bytes**
    * **60Kb** quando representado como **string**.
2. Aumento do **tempo de atraso** entre os eventos de contrato de diferentes validadores, para garantir que o mempool não é preenchido muito rapidamente em caso de uma sucessão de eventos que possam prejudicar o progresso da chain.

O exemplo a seguir mostra como o tamanho dos dados foi restringido:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

## Requisitos para os utilizadores {#requirements-for-the-users}

As condições para dapps/utilizadores operarem com state-sync são:

1. Chamar a função [syncState](https://github.com/maticnetwork/contracts/blob/19163ddecf91db17333859ae72dd73c91bee6191/contracts/root/stateSyncer/StateSender.sol#L33).
2. A `syncState`função emite um evento chamado `StateSynced(uint256 indexed id, address indexed contractAddress, bytes data);`
3. Todos os validadores da chain Heimdall recebem o evento `StateSynced`. Qualquer validador que deseje obter a taxa de transação para o estado sync envia a transação para Heimdall.
4. Assim que a transação `state-sync` na Heimdall for incluída num bloco, será adicionada à lista state-sync pendente.
5. Após cada sprint em BOR, o nó BOR obtém os eventos state-sync pendentes de Heimdall através de uma chamada API.
6. O contrato recebedor herda a interface `IStateReceiver` e a lógica personalizada de descodificação de bytes de dados e execução de qualquer ação permanece dentro da função [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol).
