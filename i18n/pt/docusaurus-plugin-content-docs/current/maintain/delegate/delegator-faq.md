---
id: delegator-faq
title: Perguntas frequentes sobre delegador
sidebar_label: Delegator FAQ
description: Perguntas frequentes sobre a delegação na rede Polygon
keywords:
  - docs
  - polygon
  - how to delegate
  - validator
  - stake
  - faq
  - delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

### Qual é a URL do painel de staking? {#what-is-the-staking-dashboard-url}

A URL do painel de staking é https://staking.polygon.technology/.

### Qual é o valor mínimo de stake? {#what-is-the-minimum-stake-amount}

Não há um valor mínimo de stake para delegar. No entanto, pode sempre começar com 1 token MATIC.

### Quantas recompensas vou receber se delegar? {#how-many-rewards-will-i-get-if-i-delegate}

Utilize a [Calculadora de Recompensas](https://staking.polygon.technology/rewards-calculator) de Staking para determinar as suas estimativas.

### Por que a minha transação demora tanto tempo? {#why-does-my-transaction-take-so-long}

Todas as transações de staking da Polygon ocorrem em Ethereum por razões de segurança.

O tempo necessário para concluir uma transação depende das taxas de gás que autorizou e também do congestionamento da rede mainnet Ethereum naquele momento específico. Pode sempre usar a opção "Acelerar" para aumentar as taxas de gás para que a sua transação possa ser concluída em breve.

### Que carteiras são suportadas atualmente? {#which-wallets-are-currently-supported}

Atualmente, apenas são aceites a extensão da MetaMask no navegador para desktop e a carteira Coinbase. Além disso, pode usar o WalletConnect e o Walletlink de carteiras móveis suportadas para interagir com o painel da Interface do Usuário do Staking no desktop/laptop. Vamos adicionar gradualmente suporte a outras carteiras em breve.

### As carteiras físicas são aceites? {#are-hardware-wallets-supported}

Sim, as carteiras físicas são aceites. Pode usar a opção “Conectar Carteira de Hardware” na MetaMask e conectar a sua carteira de Hardware, e então continuar o processo de delegação.

### Por que não posso fazer stake diretamente na Binance? {#why-can-t-i-stake-directly-from-binance}

O staking através da Binance ainda não é aceito. Anunciaremos se a Binance começar a aceitar staking.

### Conclui a minha delegação, onde posso verificar os detalhes? {#i-have-completed-my-delegation-where-can-i-check-details}

Depois de concluir a sua delegação, aguarde 12 confirmações de blocos no Ethereum (aprox. 3-5 minutos) e, em seguida, no Painel, pode clicar na **Minha Conta**.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### Onde posso verificar as minhas recompensas? {#where-can-i-check-my-rewards}

No Painel de Painel, pode clicar na opção **Minha Conta** no lado esquerdo.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### Preciso de ETH para pagar as taxas de gás? {#do-i-need-eth-to-pay-for-gas-fees}

Sim. É preciso ter uma provisão de ~0,05-0,1 ETH para ter segurança.

### Preciso depositar tokens MATIC na rede mainnet da Polygon para fazer staking? {#do-i-need-to-deposit-matic-tokens-to-the-polygon-mainnet-network-for-staking}

Não. Todos os fundos precisam estar na Rede Ethereum principal.

### Quando tento fazer a transação, o meu botão Confirmar está desativado. Por que isso ocorre? {#when-i-try-to-do-the-transaction-my-confirm-button-is-disabled-why-so}

Verifique se tem ETH suficiente para as taxas de gás.

### Quando a recompensa é distribuída? {#when-does-reward-get-distributed}

As recompensas são distribuídas sempre que um checkpoint é enviado.

Atualmente, os tokens MATIC 20188 são distribuídos proporcionalmente em cada submissão de pontos de verificação bem-sucedidos a cada delegador com base na sua participação em relação ao pool de staking geral de todos os validadores e delegadores. Além disso, a percentagem de recompensa distribuída para cada delegador varia conforme o checkpoint, dependendo do staking relativo do delegador, do validador e do stake geral.

(Observe que há um bónus de proponente de 10% acumulado para o validador que envia o checkpoint. No entanto, ao longo do tempo, o efeito do bónus extra é anulado em múltiplos checkpoints por diferentes validadores.)

O envio do checkpoint é realizado por um dos validadores aproximadamente a cada 34 minutos. Este tempo é aproximado e pode variar com base no consenso do validador na camada Heimdall Polygon. Isto também pode variar conforme a Rede Ethereum. O maior congestionamento na rede pode resultar em checkpoints com atrasos.

Pode rastrear os pontos de verificação do contrato de staking [aqui](https://etherscan.io/address/0x86e4dc95c7fbdbf52e33d563bbdb00823894c287)

### Por que a recompensa diminui a cada checkpoint? {#why-does-reward-keep-getting-decreased-every-checkpoint}

As recompensas reais obtidas dependerão do total real da oferta bloqueada na rede a cada checkpoint. Espera-se que isso varie significativamente à medida que mais tokens MATIC são bloqueados nos contratos de staking.

No início, as recompensas serão mais elevadas e continuarão a diminuir conforme a % da oferta bloqueada sobe. Esta variação na oferta bloqueada é registada em cada checkpoint e as recompensas são calculadas com base nela.

### Como posso reivindicar recompensas? {#how-can-i-claim-my-rewards}

Pode reclamar as suas recompensas instantaneamente clicando no botão Retirar da **Recompensa de** Recolher. Isto irá transferir as recompensas acumuladas para a sua conta delegada na MetaMask.

<div>
  <img src={useBaseUrl("/img/delegator-faq/withdraw-reward.png")} />
</div>

### Qual é o período de desvinculação? {#what-is-the-unbonding-period}

Na Polygon, o período de desvinculação é de aproximadamente 9 dias agora. Antes era de 19 dias. Este período se aplica ao montante originalmente delegado e aos montantes redelegados - não se aplica a quaisquer recompensas que não foram redelegadas.

### Vou continuar a receber recompensas depois de desvincular? {#will-i-keep-receiving-rewards-after-i-unbond}

Não. Depois de desvincular, irá parar de receber recompensas.

### Quantas transações é preciso ter para delegação? {#how-many-transactions-does-the-delegation-require}

A delegação requer duas transações, uma após a outra. Um para **aprovar** a solicitação e outro para **Depósito**.

<div>
  <img src={useBaseUrl("/img/delegator-faq/delegate.png")} />
</div>

### O que significa Redelegar recompensas? {#what-does-redelegate-rewards-mean}

A reseleção das recompensas significa simplesmente que pretende aumentar a sua participação ao redefinir as recompensas que acumulou.

### Posso fazer stake para qualquer validador? {#can-i-stake-to-any-validator}

Sim. Todos os validadores são nós Foundation da Polygon atualmente.

Estamos a fazer uma implantação faseada da mainnet da Polygon. Mais tarde, validadores externos serão incorporados gradualmente. Confira mais detalhes em https://blog.matic.network/mainnet-is-going-live-announcing-the-launch-sequence/.

### Que navegador é compatível com o Painel de Staking? {#which-browser-is-compatible-with-staking-dashboard}

Chrome, Firefox e Brave

### A minha MetaMask está retida na confirmação após o login, o que faço? Ou nada acontece quando tento entrar na minha conta? {#my-metamask-is-stuck-at-confirming-after-login-what-do-i-do-or-nothing-happens-when-i-try-to-login}

Verifique o seguinte:

- Se estiver a usar o Brave, desligue a opção de **Usar Carteiras de Cripto** no painel de configurações.
- Verifique se entrou na sua conta da MetaMask
- Verifique se entrou na MetaMask com o Trezor/Ledger. Precisa de ativar a permissão para fazer call de contratos no seu dispositivo Ledger, se não estiver já ativado.
- Verifique o registro de data e hora do seu sistema. Se o horário do sistema não estiver correto, precisará de o corrigir.

### Como enviar fundos da Binance ou de outras corretoras para a carteira da Polygon? {#how-do-i-send-funds-from-binance-or-other-exchanges-to-polygon-wallet}

Tecnicamente, a interface de pacote/staking da carteira da Polygon é apenas uma aplicação da web. Atualmente ele suporta as seguintes carteiras - Metamask, WalletConnect e WalletLink.

Primeiro, tem de retirar os seus fundos da Binance ou de qualquer outra troca para o endereço do seu Ethereum no Metamask. Se não souber como usar a MetaMask, faça uma breve pesquisa no google. Há muitos vídeos e blogs para ajudar a começar.

### Quando posso me tornar um validador e quantos tokens faço para isso? {#when-can-i-become-a-validator-and-how-many-tokens-do-i-for-that}

Um utilizador pode ganhar uma posição de validador somente se as condições abaixo forem cumpridas:
1. Quando um validador decide desmarcar a rede ou
2. Aguardar o mecanismo de leilão e substituir o validador inativo.

O stake mínimo depende do processo de leilão em que um utilizador faz lances maiores que os demais.

### Se tiver ganhado recompensas durante a delegação e tiver adicionado mais fundos ao mesmo nó validador, o que ocorre? {#if-i-have-earned-rewards-while-delegating-and-if-i-add-additional-funds-to-the-same-validator-node-what-happens}

Se não tiver delegado novamente as suas recompensas antes de delegar os fundos adicionais para o mesmo nó de validador, as suas recompensas serão automaticamente retiradas.

Se não quiser que isso aconteça, delegue novamente as recompensas antes de delegar fundos adicionais.

### Deleguei os meus tokens através da MetaMask no Painel de Staking. Preciso manter o meu sistema ou dispositivo ligado? {#i-have-delegated-my-tokens-via-metamask-on-the-staking-dashboard-do-i-need-to-keep-my-system-or-device-on}

Não. Depois de confirmar as transações de Delegação e ver os tokens refletidos nas seções **Total de Stake** e **Nova Recompensa** e, em seguida, é concluído. Não há necessidade de manter o seu sistema ou dispositivo ligado.

### Tenho desvinculado, quanto tempo levará para Desvinculação? {#i-have-unbonded-how-long-will-it-take-to-unbond}

O período de desvinculação está definido para 82 checkpoints. Isto é aproximadamente 9 dias. Cada checkpoint demora aproximadamente 34 minutos. No entanto, alguns checkpoints podem ser atrasados até ~1 hora devido a congestionamento no Ethereum.

### Eu não tenho vinculado e agora vejo o botão Reclamar de Reclamação, mas está desabilitado, por que é isso? {#i-have-unbonded-and-i-now-see-the-claim-stake-button-but-it-is-disabled-why-is-that}

O botão Reivindicar stake só será ativado quando o período de desvinculação for concluído. O período de desvinculação está definido em 82 checkpoints.

### É possível saber quando o botão Reivindicar stake será ativado? {#do-i-know-when-will-the-claim-stake-button-be-enabled}

Sim, no botão Reivindicar stake, verá uma observação sobre quantos checkpoints ainda estão pendentes antes que o botão Reivindicar stake seja ativado. Cada checkpoint demora aproximadamente 30 minutos. No entanto, alguns checkpoints podem ser atrasados até ~1 hora devido a congestionamento no Ethereum.

<div>
  <img src={useBaseUrl("/img/delegator-faq/unbond.png")} />
</div>

### Como mudo a minha delegação de nós Foundation para nós externos? {#how-do-i-switch-my-delegation-from-foundation-nodes-to-external-nodes}

É possível mudar a sua delegação usando a opção **Mover Stake** na interface de staking. Isso mudará a sua delegação do nó Foundation para qualquer outro nó externo da sua preferência.

<div align="center">
  <img src={useBaseUrl("/img/delegator-faq/move-stake.png")} width="500" />
</div>

Irá ver uma lista de outros validadores:

<div>
  <img src={useBaseUrl("/img/delegator-faq/validators.png")} />
</div>

### Haverá algum período de desvinculação quando mudo a delegação de nós Foundation para nós externos? {#will-there-be-any-ubonding-period-when-i-switch-delegation-from-foundation-nodes-to-external-nodes}

Não haverá período de desvinculação ao mudar a delegação de nós Foundation para nós externos. Será uma troca direta sem esperas. No entanto, se estiver a desvincular de um nó Foundation ou um nó externo, haverá um período de desvinculação para esse efeito.

### Há alguma instrução específica para escolher um nó externo durante a delegação da troca? {#are-they-any-specifics-to-choose-an-external-node-during-switch-delegation}

Não. Pode escolher qualquer nó da sua preferência.

### O que acontece com as minhas recompensas acumuladas se mudar a delegação de nó Foundation para nó externo? {#what-happens-to-my-rewards-that-are-accumalated-if-i-switch-delegation-from-foundation-to-external-node}

Se ainda não reivindicou as suas recompensas antes de mudar a delegação, então após a mudança bem-sucedida da sua delegação de Foundation para Externo, as recompensas que foram acumuladas até então serão transferidas de volta para a sua conta.

### A delegação nos nós externos funcionará da mesma forma que nos nós Foundation? {#will-delegation-on-the-external-nodes-work-the-same-as-foundation-nodes}

Sim, ele irá funcionar da mesma forma que nós da Fundação.

### Ainda receberei recompensas depois de delegar para um nó externo? {#will-i-still-get-rewards-after-delegating-to-an-external-node}

Sim, as recompensas serão distribuídas da mesma forma que nos nós Foundation. Cada envio bem-sucedido de um checkpoint renderá recompensas. As recompensas serão distribuídas e calculadas em cada checkpoint em relação à taxa de stake, conforme implementada atualmente.

### Haverá algum período de desvinculação se eu desvincular de um nó externo? {#will-there-be-any-unbonding-period-if-i-unbond-from-an-external-node}

Sim, o período de desvinculação permanecerá igual ao implementado atualmente. 82 Checkpoints.

### Haverá algum período de bloqueio depois de mudar a minha delegação de Foundation para nó externo? {#will-there-be-any-locking-period-after-i-switch-my-delegation-from-foundation-to-external-node}

Não. Não haverá período de bloqueio depois de mudar a sua delegação.

### Posso mudar parcialmente a minha delegação de nós Foundation para externos? {#can-i-partially-switch-my-delegation-from-foundation-to-external-nodes}

Sim, terá a opção de mover parcialmente o seu stake do nó Foundation para um nó externo. O stake parcial restante permanecerá no nó Foundation. Pode depois movê-lo para outro nó à sua escolha ou para o mesmo nó.

### Posso mudar a delegação de um nó externo para outro nó externo? {#can-i-switch-delegation-from-an-external-node-to-another-external-node}

Não, a opção **Mover stake** está disponível apenas nos nós Foundation. Se quiser mudar a sua delegação de um nó externo para outro nó externo, é preciso desvincular primeiro e depois delegar para outro nó externo.

### Quando o nó Foundations será desativado? {#when-will-the-foundations-node-be-turned-off}

Os nós da fundação serão desativados até o final de janeiro de 2021.

### Haverá algum nó Foundation no futuro? {#will-there-be-any-foundation-nodes-in-the-future}

Não, não haverá nós Foundation no futuro.

### Em quantas transações preciso pagar Gás quando fizer uma movimentação de stake? {#how-many-transactions-do-i-need-to-pay-for-gas-when-i-do-a-move-stake}

Mover Stake é uma transação única. Todas as transações seriam no blockchain Ethereum, portanto, seria preciso gastar alguns ETH ao fazer a transação Mover Stake.
