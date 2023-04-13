---
id: move-stake
title: Mover stake
description: Movendo a sua participação na rede do polígono
keywords:
  - docs
  - polygon
  - matic
  - stake
  - move stake
  - validator
  - delegator
slug: move-stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Mover stake dos nós Foundation para nós externos {#moving-stake-from-foundation-nodes-to-external-nodes}

<video loop autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/staking/MoveStakeDemo.mp4"></source>
  <source type="video/quicktime" src="/img/staking/MoveStakeDemo.mov"></source>
  <p>O seu navegador não é compatível com o elemento de vídeo.</p>
</video>

Os delegadores têm agora a opção de mover um stake dos nós Foundation para quaisquer nós externos à sua escolha usando a função Mover Stake na interface de Staking.

Mover stake do nó Foundation para um nó externo é considerado uma única transação. Portanto, não há atrasos ou períodos de desvinculação durante este evento.

Observe que Mover stake só é permitido a partir do nó Foundation para os nós externos. Se quiser mover o seu stake de um nó externo para outro, terá que Desvincular primeiro e depois Delegar no novo nó externo.

Além disso, a função Mover stake é uma função temporária desenvolvida pela equipa da Polygon para garantir uma transição sem problemas dos fundos dos nós Foundation para nós externos. E essa função só permanecerá ativa até que os nós Foundation sejam desativados.

## Como mover stake {#how-to-move-stake}

Para mover a stake, primeiro terá de fazer login na [IU](https://wallet.polygon.technology/staking) de staking usando o endereço do Delegador.

**Endereço** do delegador: o endereço que já usou para Staking nos nós da Fundação.

Depois de iniciar sessão, verá uma lista de Validadores.

<img src={useBaseUrl("img/staking/validator-list.png")} />

Agora vá para o perfil do Delegador clicando no botão **Mostrar Detalhes** do Delegador ou na opção **Detalhes do Meu** Delegador à esquerda.

<img src={useBaseUrl("img/staking/show-delegator-details.png")} />

Aqui encontrará um novo botão chamado **Move Stake**.

<img src={useBaseUrl("img/staking/move-stake-button.png")} />

Ao clicar nesse botão navega para uma página com uma lista de validadores para os quais pode delegar. Pode delegar para qualquer validador desta lista.

<img src={useBaseUrl("img/staking/move-stake-validator.png")} />

Agora depois de escolher o validador para o qual deseja delegar, clique no botão **Delegar** Aqui. Clicar nesse botão abrirá uma janela de pop-up.

<img src={useBaseUrl("img/staking/stake-funds.png")} />

Aqui verá um campo **de Quantidade** que se preencheria automaticamente com todo o valor para a Delegação. Também pode usar um valor parcial para delegar a um validador.

Por exemplo, se tiver delegado 100 tokens Matic para o nó Foundation 1 e agora quiser mover o seu stake desse nó foundation para um nó externo, pode delegar um valor parcial para o nó externo da sua escolha, por exemplo, 50 tokens Matic. O restante dos 50 tokens Matic permanecerão no nó Foundation 1. Pode optar por delegar o restante dos 50 tokens para outro ou para o mesmo nó externo.

Depois de inserir o montante pode, em seguida, clicar no botão **Fundos de** Estaca. Isso solicitará uma confirmação no seu MetaMask para assinar o endereço.

Depois de ter assinado a transação, o seu stake será movido com sucesso do nó Foundation para o nó externo. No entanto, terá de aguardar por confirmações de 12 blocos para que a operação seja refletida na interface de Staking. Se os fundos movidos não forem exibidos após confirmações de 12 blocos, tente atualizar a página uma vez para ver stakes atualizados.

Se tiver alguma dúvida ou algum problema, envie um pedido [aqui](https://support.polygon.technology/support/home).
