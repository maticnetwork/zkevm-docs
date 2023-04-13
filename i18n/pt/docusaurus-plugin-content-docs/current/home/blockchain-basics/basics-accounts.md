---
id: accounts
title: O que são Contas?
sidebar_label: Accounts
description: "EOAs e Contas de Contratos."
keywords:
  - docs
  - matic
  - polygon
  - accounts
  - EOAs
  - contract accounts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# O que são Contas? {#what-are-accounts}

O estado global de Ethereum é constituído de contas que interagem uma com as outras através de um framework de transmissão de mensagens. A interação mais básica é o envio de algum valor - como tokens MATIC, token nativo do Polygon ou $ETH, token nativo do blockchain do Ethereum.

Cada conta é identificada por um identificador hex de 20 bytes que é chamado de endereço - gerado a partir da chave pública da conta.

Existem dois tipos de contas: **Conta de Propriedade Externa** e **Contas de Propriedade de Contratos**.

## Contas de Propriedade Externa {#externally-owned-accounts}

EOA são contas controladas por uma chave privada, com a capacidade de enviar tokens e mensagens.

1. Podem enviar transações (transferência de éter ou código do contrato de gatilho
2. são controlados por chaves privadas,
3. e não tenha código associado.

## Contas de Propriedade de Contratos {#contract-owned-accounts}
Conta proprietária de contratos são contas que têm um código de contrato inteligente associado com ele e a chave privada não é de propriedade de ninguém.

1. Têm código associado,
2. a execução do código é desencadeada por transações ou mensagens (chamadas) recebidas de outros contratos,
3. e quando este código é executado - ele executa operações de complexidade arbitrária (Integridade de Turing) - manipula o seu próprio armazenamento persistente e pode chamar outros contratos.

### Recursos {#resources}

- [Leia mais sobre contas](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#externally-owned-accounts-eoas)
