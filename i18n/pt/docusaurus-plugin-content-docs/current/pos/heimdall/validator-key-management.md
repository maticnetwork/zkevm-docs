---
id: validator-key-management
title: Gestão do validador da chave
description: Gerenciar validadores de chaves do assinante e do Proprietário
keywords:
  - docs
  - matic
  - polygon
  - Validator Key Management
  - signer
  - owner
image: https://matic.network/banners/matic-network-16x9.png
---

# Gestão do validador da chave {#validator-key-management}

Cada validador usa duas chaves para gerenciar atividades relacionadas com validador no Polygon. A chave do signatário é mantida no nó e é geralmente considerada como uma carteira `hot`, enquanto que a chave do proprietário deve ser mantida muito segura, é usada com pouca frequência e é geralmente considerada uma carteira `cold`. Os fundos acumulados são controlados pela chave do proprietário.

Esta separação de responsabilidades foi feita para garantir um comércio eficiente entre segurança e facilidade de uso. Ambas as chaves são endereços compatíveis com Ethereum e funcionam exatamente da mesma maneira. E sim, é possível ter as mesmas chaves de Proprietário e Assinante.

## Chave do signatário {#signer-key}

A chave do signer é um endereço usado para assinar blocos de Heimdall, pontos de verificação e outras atividades relacionadas com a assinatura. A chave privada desta chave estará no nó do validador para fins de assinatura. Não pode gerir stakes, recompensas nem delegações.

O validador deve manter dois tipos de saldos neste endereço:

- Tokens MATIC no Heimdall (através de transações do Topup) para executar responsabilidades do validador no Heimdall
- ETH na chain Ethereum para enviar checkpoints no Ethereum

## Chave do proprietário {#owner-key}

A chave do proprietário é um endereço usado para empalar, re-stake, alterar a chave do assinante, retirar recompensas e gerenciar parâmetros relacionados com a delegação na chain Ethereum. A chave privada para esta chave deve ser protegida a todo o custo.

Todas as transações através desta chave serão realizadas na chain Ethereum.

## Alteração do signatário {#signer-change}

O evento seguinte é gerado no caso de alteração do signatário na chain Ethereum `StakingInfo.sol`: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol)

```go
// Signer change
event SignerChange(
  uint256 indexed validatorId,
  address indexed oldSigner,
  address indexed newSigner,
  bytes signerPubkey
);
```

A bridge Heimdall processa estes eventos e envia transações no Heimdall para alterar o estado com base nos eventos.