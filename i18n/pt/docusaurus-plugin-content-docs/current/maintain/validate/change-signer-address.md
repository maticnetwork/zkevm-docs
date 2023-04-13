---
id: change-signer-address
title: Alterar o seu endereço de signatário
description: Alterar o endereço do indicador do seu validador
keywords:
  - docs
  - matic
  - polygon
  - signer address
  - change
  - validator
slug: change-signer-address
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Para informações sobre o que é um [endereço de signatário](/docs/maintain/glossary.md#signer-address), ver [Gestão de chave](/docs/maintain/validator/core-components/key-management).

## Pré-requisitos {#prerequisites}

Certifique-se de que o nó de validador está totalmente sincronizado e está a ser executado com o novo endereço de signatário.

## Alterar o endereço de signatário {#change-the-signer-address}

Este guia refere-se ao seu nó de validador atual como Nó 1 e o seu novo nó de validador como Nó 2.

1. Faça login no [painel de staking](https://staking.polygon.technology/) com o endereço de Nó 1.
2. No seu perfil, clique em **Editar perfil**.
3. No campo **Endereço de signatário**, forneça o endereço do Nó 2.
4. No campo **Chave pública do signatário**, forneça a chave pública do Nó 2.

   Para obter a chave pública, execute o seguinte comando no nó de validador:

   ```sh
   heimdalld show-account
   ```

Clicar em **Salvar** irá salvar os seus novos detalhes para o seu nó. Isso significa essencialmente que o Nó 1 será o seu endereço que controla o stake, para onde as recompensas serão enviadas, etc. e o Nó 2 vai agora realizar atividades como assinar blocos, assinar checkpoints, etc.
