---
id: key-management
title: Gestão da chave
description: Gerenciamento de chaves de assinante e proprietário
keywords:
  - docs
  - polygon
  - matic
  - key
  - key management
  - signer
  - owner
slug: key-management
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Cada validador utiliza duas chaves para gerir as atividades relacionadas com o validador na Polygon:

* Chave do signatário
* Chave do proprietário

## Chave do signatário {#signer-key}

A chave do signatário é o endereço usado para assinar blocos Heimdall, checkpoints e outras atividades relacionadas com a assinatura.

A chave privada do endereço do signatário deve estar localizada na máquina que executa o nó de validador para fins de assinatura.

A chave do signatário não pode gerir staking, recompensas ou delegações.

O validador deve manter ETH no endereço de signatário na mainnet Ethereum para enviar [checkpoints](/docs/maintain/glossary.md#checkpoint-transaction).

## Chave do proprietário {#owner-key}

A chave do proprietário é o endereço usado para fazer stake, restake, mudar a chave do signatário, retirar recompensas e gerir parâmetros relacionados com delegação na mainnet Ethereum. A chave privada deve ser protegida a todo custo pelo proprietário da chave.

Todas as transações através da chave do proprietário são realizadas na mainnet Ethereum.

A chave do signatário é mantida no nó e é geralmente considerada uma carteira **quente**, enquanto se espera que a chave do proprietário seja mantida bem protegida, utilizada raramente, e é geralmente considerada uma carteira **fria**. Os fundos acumulados são controlados pela chave do proprietário.

Esta separação de responsabilidades entre as chaves do signatário e do proprietário é feita para assegurar uma troca eficiente entre segurança e facilidade de utilização.

Ambas as chaves são endereços compatíveis com Ethereum e funcionam exatamente da mesma forma.

## Alteração do signatário {#signer-change}

Ver [Altere o Seu Endereço de Signatário](/docs/maintain/validate/change-signer-address).
