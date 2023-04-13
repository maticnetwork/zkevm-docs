---
id: proposer-bonus
title: Bónus de proponente
description: Incentivo adicional de ser validador
keywords:
  - docs
  - polygon
  - matic
  - validate
  - proposer
  - bonus
  - incentive
slug: proposer-bonus
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Bónus de proponente {#proposer-bonus}

Na Polygon, existe um elemento adicional de vincular [checkpoints](/docs/maintain/glossary.md#checkpoint-transaction) periódicos para a mainnet Ethereum. Esta é uma parte importante das responsabilidades do validador e eles são incentivados a realizar esta atividade. Isto constitui um custo para o validador, que é exclusivo a uma solução de Camada 2 como a Polygon. Esforçamo-nos por acomodar este custo no mecanismo de pagamento de recompensa de staking do validador como um bónus a ser pago ao [proponente](/docs/maintain/glossary.md#proposer), que é responsável por vincular o checkpoint. Recompensas menos o bónus devem ser partilhadas entre todos os stakers; proponente e [signatários](/docs/maintain/glossary.md#signer-address), proporcionalmente.

Para beneficiar completamente do bónus, o proponente deve incluir todas as assinaturas no checkpoint. Porque o protocolo deseja ⅔ +1 do peso total da stake, o checkpoint é aceite mesmo com 80% de votos. No entanto, neste caso, o proponente obtém apenas 80% do bónus calculado.
