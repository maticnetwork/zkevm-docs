---
id: staking-faq
title: Perguntas frequentes - Staking
sidebar_label: Staking FAQ
description: Construa sua próxima aplicação de blockchain na Polygon.
keywords:
  - docs
  - matic
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Como fazer staking de tokens na Polygon? {#how-to-stake-tokens-on-polygon}

Para o staking, será preciso ter fundos na Mainnet Ethereum (mais informações [aqui](https://etherscan.io/gastracker)). Entrar no MetaMask na rede Ethereum usando o Painel de Staking. https://staking.polygon.technology/

Por favor, assista este vídeo para uma ilustração gráfica de como isso funciona:

<video autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking/staking.mp4"></source>
  <p>Seu navegador não é compatível com o elemento de vídeo.</p>
</video>

### Eu fiz staking com os meus tokens MATIC. Como eu posso fazer mais staking? {#i-ve-staked-my-matic-tokens-how-can-i-stake-more}
Você pode navegar para "Suas Delegações", escolher um dos stakes e clicar em "Fazer Mais Staking".

Por favor, assista este vídeo para uma ilustração gráfica de como isso funciona:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking_faq/staking-more.mov"></source>
  <p>Seu navegador não é compatível com o elemento de vídeo.</p>
</video>

### Por que eu não sou capaz de fazer staking? {#why-am-i-not-able-to-stake}

Verifique se você tem fundos na Rede Principal de Ethereum, para delegar os seus tokens. Todo o staking acontece na Rede Ethereum apenas.

### Não sou capaz de visualizar a aba de Staking. Como eu acesso o Staking? {#i-am-unable-to-view-the-staking-tab-how-do-i-access-staking}

Basta acessar **https://staking.polygon.technology/**, onde verá a seguinte página de destino:

<img src={useBaseUrl("img/staking_faq/staking-lp.png")} height="500px"/>

Alternativamente, uma vez logado no [Polygon Wallet Suite](https://wallet.polygon.technology/), pode clicar em **Mais Aplicativos > Staking**. Os usuários serão desembarcados na página **Visão geral** da Staking. Referência para o guia:

<img src={useBaseUrl("img/staking_faq/staking-app.png")} height="500px"/>

### Como eu sei qual Validador selecionar para recompensas melhores? {#how-do-i-know-which-validator-to-select-for-better-rewards}

Depende do seu entendimento e pesquisa sobre em qual validador gostaria de fazer staking. Pode encontrar a lista de validadores aqui: https://staking.polygon.technology/validators

### Como desvincular? {#how-to-unbond}

Para Desvincular de um Validador, navegue até "Minha Conta", onde encontrará "Suas Delegações".
Lá, irá ver um botão de Desvincular para cada um dos validadores. Clique no botão de Desvincular para qualquer validador do qual deseja se desvincular.

`Step 1` <br/>
<img src={useBaseUrl("img/staking_faq/step1unbond.png")} height="400px"/><br/>

`Step 2` <br/>
<img src={useBaseUrl("img/staking_faq/step2unbond.png")} height="500px"/><br/>

Por favor, assista este vídeo para uma ilustração gráfica de como isso funciona:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking/unbond.mp4"></source>
  <p>Seu navegador não é compatível com o elemento de vídeo.</p>
</video>

### Qual é o período de desvinculação? {#what-is-the-unbonding-period}

O período de desvinculação na Polygon é de 80 checkpoints. Isso são, aproximadamente, 3-4 dias. Cada checkpoint leva, aproximadamente, 3 horas. Entretanto, alguns checkpoints podem ser atrasados devido ao congestionamento em Ethereum.
Este período se aplica à quantidade delegada originalmente e a quantidades redelegadas. Ele não se aplica a quaisquer recompensas que não foram redelegadas.

### Como fazer restaking de recompensas? {#how-to-restake-rewards}

Vá para “Minha Conta” para verificar "Suas Delegações".
Ao clicar em "Restaking de Recompensa", lhe será solicitada confirmação da sua conta Metamask. Ao confirmar a transação, somente então a transação de restaking estará completa.

`Step 1` <br/>
<img src={useBaseUrl("img/staking_faq/restake-rewards1.png")} height="300px"/><br/>

`Step 2` <br/>
<img src={useBaseUrl("img/staking_faq/restake-rewards2.png")} height="415px"/><br/>

Por favor, assista este vídeo para uma ilustração gráfica de como isso funciona:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking/restake.mp4"></source>
  <p>Seu navegador não é compatível com o elemento de vídeo.</p>
</video>

### Eu quero fazer Restaking de Recompensas, mas não o consigo fazer. {#i-want-to-restake-rewards-but-i-am-unable-to}

Precisa de ter um mínimo de **2 MATIC** para fazer restaking de recompensas.

### Como retirar recompensas? {#how-to-withdraw-rewards}

Pode reivindicar suas recompensas clicando em "Minha Conta"; todos os delegadores para um validador serão exibidos Clique no botão de "Retirar Recompensa", e as recompensas serão transferidas para a sua conta delegada na Metamask.

`Step 1` <br/>
<img src={useBaseUrl("img/staking_faq/withdraw1.png")} height="300px"/><br/>

`Step 2` <br/>
<img src={useBaseUrl("img/staking_faq/withdraw2.png")} height="380px"/><br/>

Por favor, assista este vídeo para uma ilustração gráfica de como isso funciona:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking_faq/claim-rewards.mp4"></source>
  <p>Seu navegador não é compatível com o elemento de vídeo.</p>
</video>

### Eu quero Retirar Recompensas, mas não o posso fazer. {#i-want-to-withdraw-rewards-but-i-am-unable-to}

Você precisa de um mínimo de **2 MATIC** para retirar recompensas.

### Como reivindicar um stake? {#how-to-claim-stake}

Uma vez que **o período de desvinculação esteja completo**, o botão de Reivindicação de Stake será habilitado, e então poderá reivindicar seus tokens em staking. Os tokens serão transferidos para a sua conta.

`Step 1` <br/>
<img src={useBaseUrl("img/staking_faq/claim-stake1.png")} height="400px"/><br/>

`Step 2` <br/>
<img src={useBaseUrl("img/staking_faq/claim-stake2.png")} height="300px"/><br/>

`Step 3` <br/>
<img src={useBaseUrl("img/staking_faq/claim-stake3.png")} height="400px"/><br/>

Por favor, assista este vídeo para uma ilustração gráfica de como isso funciona:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking_faq/claiming-stake.mov"></source>
  <p>Seu navegador não é compatível com o elemento de vídeo.</p>
</video>

### As carteiras de hardware são aceitas? {#are-hardware-wallets-supported}

Sim, as carteiras físicas são aceites. Pode usar a opção “Conectar Carteira de Hardware” na MetaMask e conectar a sua carteira de Hardware, e então continuar o processo de delegação.

### Por que não posso fazer stake diretamente na Binance? {#why-can-t-i-stake-directly-from-binance}

O staking através da Binance ainda não é aceito. Anunciaremos caso a Binance comece a aceitar este recurso.

### Preciso depositar tokens MATIC na rede Mainnet da Polygon para fazer staking? {#do-i-need-to-deposit-matic-tokens-to-the-polygon-mainnet-network-for-staking}

Não. Todos os fundos precisam estar na Rede Ethereum principal.

### Quando as recompensas são distribuídas? {#when-do-rewards-get-distributed}

As recompensas são distribuídas sempre que um checkpoint é enviado.

Aproximadamente 20.188 tokens MATIC são distribuídos proporcionalmente em cada envio de checkpoint bem-sucedido, para cada delegador, com base no seu stake em relação ao pool de staking geral de todos os validadores e delegadores. Além disso, a percentagem de recompensa distribuída para cada delegador varia conforme o checkpoint, dependendo do staking relativo do delegador, do validador e do stake geral.

(Observe que há um bónus de proponente de 10% acumulado para o validador que envia o checkpoint. No entanto, ao longo do tempo, o efeito do bónus extra é anulado em múltiplos checkpoints por diferentes validadores.)

O envio do checkpoint é realizado por um dos validadores, aproximadamente a cada 34 minutos. Este tempo pode variar com base no consenso do validador na camada Heimdall da Polygon. Isso também pode variar com base na Rede Ethereum. O maior congestionamento na rede pode resultar em checkpoints com atrasos.

Pode acompanhar os ceckpoints no contrato de staking aqui: https://etherscan.io/address/0x86e4dc95c7fbdbf52e33d563bbdb00823894c287

### Por que as recompensas continuam a diminuir em cada checkpoint? {#why-do-rewards-keep-getting-decreased-at-every-checkpoint}

As recompensas ganhas dependerão do fornecimento total real bloqueado na rede, em cada checkpoint. É esperado que isso varie significativamente, à medida em que mais tokens MATIC são bloqueados nos contratos de staking.
As recompensas serão maiores, para começar, e continuarão a decrescer à medida em que a percentagem de fornecimento bloqueado aumenta. Esta variação no fornecimento bloqueado é registada em cada checkpoint, e as recompensas são calculadas com base nela.

### Vou continuar a receber recompensas depois de desvincular? {#will-i-keep-receiving-rewards-after-i-unbond}

Não. Assim que desvincular, para de receber recompensas.

### Posso transferir o stake para outro validador? {#can-i-move-the-stake-to-another-validator}
Sim, apenas precisa aceder a "Suas Delegações", clicar em "Mover Stake", e, então, escolher seu novo validador.

Por favor, assista este vídeo para uma ilustração gráfica de como isso funciona:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking_faq/moving.mp4"></source>
  <p>Seu navegador não é compatível com o elemento de vídeo.</p>
</video>

### Quais navegadores são compatíveis com o Painel de Staking? {#which-browsers-are-compatible-with-the-staking-dashboard}

Chrome, Firefox e Brave.

### Não acontece nada quando eu tento entrar ou quando a minha MetaMask está travada na confirmação após entrar. O que eu faço? {#nothing-happens-when-i-try-to-log-in-or-my-metamask-is-stuck-at-confirming-after-logging-in-what-do-i-do}

Verifique o seguinte:
- Se estiver usando o Brave, desative a opção “Usar Carteiras de Cripto”, no painel de definições.
- Verifique se entrou na MetaMask.
- Verifique se entrou na MetaMask com o Trezor/Ledger. Precisa de ativar a permissão para fazer call de contratos no seu dispositivo Ledger, se não estiver já ativado.
- Verifique o registro de data e hora do seu sistema. Caso o horário do sistema não esteja correto, o precisará corrigir.