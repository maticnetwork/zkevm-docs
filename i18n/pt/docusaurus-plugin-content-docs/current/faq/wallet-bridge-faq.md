---
id: wallet-bridge-faq
title: FAQ da ponte <>da carteira
description: Construa a sua próxima aplicação blockchain na Polygon.
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - wallet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Onde posso usar a Carteira Polygon Web? {#where-can-i-use-the-polygon-web-wallet}
Aqui está o URL do Polygon Wallet Suite: https://wallet.polygon.technology/ O Polygon Wallet Suite é uma coleção de aplicativos Web3 fornecidos pelo Polygon. Consiste na [Carteira](https://wallet.polygon.technology/polygon/assets) [Polygon](https://wallet.polygon.technology/polygon/bridge/deposit) (uma carteira descentralizada), [na Ponte](https://safe-bridge.polygon.technology/safe) Polygon (uma ponte L1-L2), na [Staking](https://staking.polygon.technology/) do Polygon (um ambiente para staking e delegar tokens MATIC) e na Ponte do Polygon Safe (uma ponte multisig).

<div align= "center">
  <img src={useBaseUrl("img/faq/wallet/wallet-hp.png")} />
</div>

## Que carteiras são suportadas atualmente? {#which-wallets-are-currently-supported}

Metamask, Coinbase, Bitski Wallet, Venly e WalletConnect são as carteiras atualmente suportadas.

<div align="center">
  <img src={useBaseUrl("img/faq/wallet/supported-wallets.png")} width="400" />
</div>

## O que posso fazer com a minha carteira da Polygon? {#what-can-i-do-with-my-polygon-wallet}

- Enviar fundos para qualquer conta na Polygon.
- Depositar fundos da Ethereum para a Polygon (com o uso da bridge).
- Retirar fundos da Polygon de volta para a Ethereum (também com o uso da bridge).

## A minha carteira da MetaMask não está a ligar à carteira da Polygon {#my-metamask-wallet-is-not-connecting-with-polygon-wallet}

Existem muitas razões pelas quais isto pode estar a acontecer. Sugerimos que **tente outra hora**, **use outro navegador** ou, se algum destes não ajudar, **[entre em contato com a nossa equipe de suporte](https://support.polygon.technology/support/home)**.

## Como posso depositar fundos do Ethereum para o Polygon usando o Polygon Wallet Suite. {#how-can-i-deposit-funds-from-ethereum-to-polygon-using-polygon-wallet-suite}
Veja o vídeo abaixo ou siga [este tutorial](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#depositing-funds-from-ethereum-to-polygon).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/deposit/deposit-polygon-wallet.mp4"></source>
  <p>O seu navegador não suporta o elemento de vídeo.</p>
</video>

## Como posso retirar fundos do Polygon para Ethereum via PoS Bridge usando o Polygon Wallet Suite? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-pos-bridge-using-polygon-wallet-suite}
Veja o vídeo abaixo ou siga [este tutorial](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-pos-bridge).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/pos/withdraw-polygon-wallet.mp4"></source>
  <p>O seu navegador não suporta o elemento de vídeo.</p>
</video>

## Como posso retirar fundos do Polygon para Ethereum via Ponte do Plasma usando o Polygon Wallet Suite? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-plasma-bridge-using-polygon-wallet-suite}
Veja o vídeo abaixo ou siga [este tutorial](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-plasma-bridge).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/plasma/withdraw-plasma-v3.mov"></source>
  <p>O seu navegador não suporta o elemento de vídeo.</p>
</video>

## Como adicionar um token novo ou personalizado à lista de token da carteira Polygon? {#how-to-add-a-new-or-custom-token-to-polygon-wallet-token-list}
Siga [este tutorial.](/docs/faq/adding-a-custom-token)

## Como encontro o contrato do token? {#how-do-i-find-the-token-contract}

O endereço do contrato de token será necessário quando estiver a tentar adicionar um token novo ou personalizado. Pode pesquisar o token pelo nome do Coingecko ou CoinMarketCap onde poderá ver o endereço do token na chain Ethereum (para tokens ERC20) e outros blockchains suportados como o Polygon. O endereço de token em outras rede pode não estar atualizado, porém, certamente pode utilizar o endereço raiz para todos os propósitos.

## Depositei meus fundos, mas não vejo isso no Metamask. O que eu faço? {#i-have-deposited-my-funds-but-i-don-t-see-it-on-metamask-what-do-i-do}

É necessário adicionar manualmente o endereço de token personalizado ao Metamask.

Abra a MetaMask e desloque para baixo para clicar em **Importar tokens**.

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/wallet-faq-3.png")} width="400" />
</div>

Em seguida, adicione o endereço do contrato, o símbolo e a precisão decimal relevantes. Os endereços de contratos (PoS-WETH neste caso) podem ser encontrados neste link: [https://docs.polygon.technology/docs/operar/mapped-tokens/](https://docs.polygon.technology/docs/operate/mapped-tokens/). Terá de adicionar o endereço do token filho para visualizar os saldos na mainnet da Polygon. O decimal de precisão é 18 para WETH (para a maioria dos tokens, o decimal de precisão é 18).

## Como posso adicionar o Polygon Mainnet no Metamask? {#how-can-i-add-polygon-mainnet-on-metamask}

Verifique [este tutorial](/docs/develop/metamask/config-polygon-on-metamask).

## O meu token não está visível na lista. Quem devo contactar? {#my-token-is-not-visible-in-the-list-who-should-i-contact}

Contacte a equipa da Polygon no Discord ou Telegram para que o seu token seja listado. Antes disso, certifique-se de que o seu token está mapeado. Se não for mapeado, envie um pedido em [https://mapper.polygon.technology/](https://mapper.polygon.technology/).

## Posso cancelar a minha transação depois de chegar o checkpoint? {#can-i-cancel-my-transaction-after-the-checkpoint-arrived}
Assim que a transação de retirada for iniciada no Polygon Mainnet, não pode ser cancelada ou revertida. Nas transações de retirada, os tokens são queimados do Polygon Mainnet e minerados no Ethereum Mainnet. Portanto, os tokens queimados da chain do Polygon não podem ser revertidos de volta para a carteira.

## A taxa de gás está muito alta, posso cancelar a minha transação? {#the-gas-fee-is-too-high-can-i-cancel-my-transaction}

Infelizmente, não podemos cancelar a transação de retirada uma vez que os tokens são queimados do Polygon Mainnet. Em outras palavras, é impossível cancelar uma transação uma vez iniciado. A taxa de gás não é controlada pelo Polygon. Está totalmente dependente do congestionamento da rede e do número de transações num bloco particular no Mainnet Ethereum Se achar que não pode pagar a taxa de gás atual, pode esperar e tentar prosseguir com a sua transação mais tarde quando a taxa de gás estiver no lado inferior. Também pode monitorar a taxa de gás no Mainnet do Ethereum a partir daqui: https://etherscan.io/gastracker


## Posso enviar os meus tokens da Polygon para qualquer outra carteira/exchange? {#can-i-send-my-tokens-from-polygon-to-any-other-wallet-exchange}

Não é possível enviar diretamente tokens do Polygon UI para trocas/carteiras. Primeiro, tem de os retirar da Polygon para a Ethereum e depois os enviar para o seu endereço da exchange (a menos que a sua exchange/carteira suporte explicitamente a rede).

## Cometi o erro de enviar fundos para uma permuta/carteira diretamente. Podem ajudar-me? {#i-made-the-mistake-of-sending-funds-to-an-exchange-wallet-directly-can-you-help}

Infelizmente, não podemos ajudar nesses casos. Não envie fundos diretamente para as exchanges que suportam apenas a Ethereum; primeiro, deve retirar os fundos da Polygon para a Ethereum e, em seguida, os enviar para o seu endereço da exchange.

## Fiz uma transferência para o endereço errado. Como faço para recuperar os fundos? {#i-made-a-transfer-to-the-wrong-address-how-do-i-retrieve-the-funds}

Infelizmente, nada pode ser feito. Apenas o proprietário das chaves privadas desse endereço particular pode mover esses ativos. É sempre aconselhável confirmar se o endereço que está a enviar tokens é o certo.

## Minha transação está pendente há muito tempo, o que posso fazer? {#my-transaction-has-been-pending-for-too-long-what-can-i-do}
A transação pode ser deixada devido aos seguintes motivos:

1. Configurar um preço de gás baixo enquanto submeter a transação.
2. Aumento súbito do preço do gás devido ao congestionamento no Mainnet Ethereum.
3. A transação é cancelada pela sua carteira ou substituída por uma nova transação.

Pode prosseguir com as transações deixadas de ser efetuadas das seguintes maneiras:

1. Se a transação estiver presa por mais de uma hora, será mostrado um botão **Tente** Agendar. Pode clicar no botão **Tente** Novamente para concluir a mesma transação. Pode consultar este vídeo para mais informações sobre como usar o recurso **Tente** Novamente.
2. Verifique também a carteira do MetaMask porque às vezes as transações podem ser deixadas devido a transações de fila no Metamask. Nesse caso, desmarque as transações de fila ou reinstale o MetaMask no mesmo navegador.
3. Pode instalar o MetaMask num navegador alternativo e tentar concluir a transação usando o Polygon Wallet Suite.
4. Também pode usar este link para concluir a transação de retirada pendente. Cole o hash da transação na opção de pesquisa e clique no botão **Confirmar Saída** para concluir a transação.

## O que faço se o depósito tiver sido confirmado, mas o saldo não estiver atualizado? {#what-do-i-do-if-the-deposit-is-confirmed-but-the-balance-is-not-getting-updated}

Leva 22-30 minutos para que a transação de depósito seja concluída. Por favor, aguarde algum tempo e clique em **Atualizar o equilíbrio**.

## O que devo fazer se o checkpoint não estiver a acontecer? {#what-should-i-do-if-the-checkpoint-is-not-happening}

Os pontos de verificação às vezes levam mais de 45 minutos a 1 hora com base no congestionamento da rede no Ethereum, sugerimos esperar um tempo antes de levantar um bilhete.

## A minha transação está presa. {#my-transaction-is-stuck}

Listamos alguns erros comuns que os usuários podem enfrentar. Pode encontrar a solução abaixo da imagem do erro. Se deparar com um erro diferente, [envie um pedido de suporte](https://support.polygon.technology/support/home) para a nossa equipa para resolver o problema.

  - ### Erros comuns {#common-errors}
a. Saque preso na fase inicializada.

    <img src={useBaseUrl("img/wallet-bridge/plasma-progress-stuck.png")} width="357" height="800"/>

    This normally occurs when the transaction gets replaced and the wallet web application is not able to detect the replaced transaction hash. Please follow the instructions on [https://withdraw.polygon.technology/](https://withdraw.polygon.technology/) and complete your withdrawal.

  b. Erro de RPC

    <img src={useBaseUrl("img/wallet-bridge/checkpoint-rpc-error.png")} width="357" height="600"/>

    The current RPC error you're facing might be due to an RPC overload.

    Please try changing your RPC and proceed with the transaction. You may follow this link [here](https://docs.polygon.technology/docs/operate/network#matic-mainnet) for more information.

  c.

  <img src={useBaseUrl("img/wallet-bridge/checkpoint-stumbled-error.png")} width="357" height="600"/>

  Este costuma ser um erro frequente que é resolvido automaticamente. Se continuar a receber o mesmo erro ao reiniciar a etapa, envie um [pedido de suporte](https://support.polygon.technology/) com todas as informações relevantes para a respetiva resolução.


## Recebi um erro de saldo insuficiente. {#i-m-shown-an-insufficient-balance-error}

Os saques e depósitos na rede da Polygon são baratos. O que é necessário entender é que o erro de saldo insuficiente pode ser eliminado tendo algum saldo ETH na mainnet da Ethereum. Isso geralmente elimina o problema de um equilíbrio insuficiente. Se esta for uma transação no Polygon Mainnet, solicitaremos que tenha uma quantidade suficiente de tokens MATIC

## As minhas transações não estão visíveis no explorador. O que devo fazer? {#my-transactions-are-not-visible-on-the-explorer-what-should-i-do}

Trata-se provavelmente de um problema de indexação com o Polygonscan. Entre em contato com a [Equipe de Suporte](https://support.polygon.technology/support/home) para mais esclarecimentos.

## Iniciei um depósito na Ethereum, mas continua a aparecer como pendente. O que devo fazer? {#i-initiated-a-deposit-on-ethereum-but-it-still-shows-as-pending-what-should-i-do}

O gás que forneceu é provavelmente demasiado baixo. Deve aguardar um pouco e refazer a transação, se não for minerada. Se necessitar de ajuda adicional, contacte a [equipa de suporte](https://support.polygon.technology/support/home) com o endereço da sua carteira, os hashes da transação (se houver) e screenshots relevantes.

## Não estou a receber um hash da transação e os meus depósitos não estão a passar. O que está a acontecer? {#i-m-not-getting-a-transaction-hash-and-my-deposits-aren-t-going-through-what-is-happening}

Provavelmente tem transações pendentes anteriores. Cancele ou as agilize primeiro. Na Ethereum, as transações só podem ocorrer consecutivamente.

## Mostra que a Polygon não cobra qualquer valor por um saque, mas temos de pagar durante a transação. {#it-shows-polygon-does-not-charge-any-amount-for-a-withdrawal-but-we-are-to-pay-during-the-transaction}

Uma transação de saque com a Plasma Bridge é dividida em três etapas, uma que acontece na mainnet da Polygon e duas etapas passos a concluir na mainnet da Ethereum. Na PoS bridge, a transação de saque acontece em duas etapas: queima do token na rede da Polygon e submissão de prova na rede Ethereum. Em todo o caso, a queima de tokens que ocorra na mainnet da Polygon terá um custo muito reduzido. As etapas restantes que ocorrem na mainnet da Ethereum terão de ser pagas em ETH, a depender do preço de gás atual, que pode ser verificado [aqui](https://ethgasstation.info/).

## Estava a tentar fazer um depósito, mas a transação parou na etapa Aprovar. {#i-was-trying-to-make-a-deposit-but-the-transaction-stopped-at-the-approve-step}

Se a transação ainda estiver na etapa **Aprovar**, isso significa que não foi concluída. Para o concluir, terá de pagar a taxa de gás, após o que deverá ficar concluída.

## A carteira da Polygon mostra a mensagem de erro "User denied transaction signature". {#polygon-wallet-shows-user-denied-transaction-signature-error-message}

Isto geralmente acontece porque o utilizador cancelou ou se recusou a assinar uma transação através da MetaMask. Quando for solicitado pela carteira MetaMask, prossiga com a assinatura da transação clicando em **Aprovar** e não em **Cancelar**.

## A transação é bem-sucedida, mas mostra pendente. {#the-transaction-is-successful-but-it-shows-pending}

Se a transação for concluída e tiver recebido os seus fundos, mas ainda assim a transação mostre pendentes na IU , poderá levantar um ticket de suporte enviando detalhes e capturas de tela relevantes.

## Qual é a lista de Intercâmbios Suportados no Polygon? {#what-is-the-list-of-supported-exchanges-on-polygon}

A moeda MATIC pode ser negociada em muitas trocas. No entanto, é sempre importante fazer a sua própria pesquisa quando estiver a escolher uma para negociar. Não é incomum que algumas trocas continuem a fazer alterações nos seus tokens disponíveis atuais e também tenham períodos de manutenção.

Poderá visitar o [Coinmarketcap]([https://coinmarketcap.com/currencies/polygon/markets/](https://coinmarketcap.com/currencies/polygon/markets/)) para uma lista de trocas onde poderá encontrar o MATIC.

## A Polygon suporta carteiras de hardware? {#does-polygon-support-hardware-wallets}

Sim, oferecemos suporte às seguintes carteiras de hardware:
1. Trezor
2. Ledger

Os usuários podem conectar a opção de carteira de hardware no MetaMask e prosseguir com a transação. Aqui está o link para conectar a carteira de hardware no Metamask: https://metamask.zendesk.com/hc/en-us/articles/4408552261275

## Por que o token MATIC não é suportado no PoS? {#why-isn-t-the-matic-token-supported-on-pos}

MATIC é o token nativo da Polygon e tem o endereço de contrato - 0x0000000000000000000000000000000000001010 na chain da Polygon. Também é usado para pagar gás. O mapeamento do token MATIC na PoS Bridge fará com que o MATIC tenha um endereço de contrato adicional na chain da Polygon. Isto irá colidir com o endereço existente do contrato, pois o novo endereço do token não pode ser usado para pagar o gás e terá de se manter como token ERC-20 normal na chain da Polygon. Assim, para evitar esta confusão, decidimos reter o MATIC apenas no Plasma.

## Como faço para mapear tokens? {#how-do-i-map-tokens}

Consulte [este tutorial] (/docs/develop/ethereum-polygon/submit-mapping-request) / (/docs/develop/ethereum-polygon/submit-mapping-request) ou poderá ir diretamente para o [Mapeamento de Tokens](https://mapper.polygon.technology/).

## O que faço se a transação estiver a demorar demasiado tempo ou se o preço de gás estiver demasiado elevado? {#what-do-i-do-if-the-transaction-is-taking-too-long-or-if-the-gas-price-is-too-high}

O tempo de transação e o preço do gás variam com base no congestionamento da rede e é também determinado pela oferta e demanda entre mineradores da rede.

O que você poderia fazer:
- Seja paciente.
- Aumentar a taxa de gás se for muito lenta.
- Verifique as taxas antes de enviar transações. Aqui está um link para o rastreador de gás da Etherscan's https://etherscan.io/gastracker

O que não deve fazer:
- Não defina o limite de gás baixo ou a transação pode falhar.
- Não tente cancelar a transação. Verifique as taxas previamente.


## Posso alterar o limite de gás ou o preço de gás? {#can-i-change-the-gas-limit-or-the-gas-price}

O limite de gás é estimado e definido pela aplicação de acordo com determinados requisitos da função que está a ser chamada no contrato. Este não deve ser editado. Apenas o preço do gás pode ser alterado para aumentar ou diminuir as taxas da transação.

## Como acelerar as transações? {#how-to-speed-up-the-transactions}
Pode fazê-lo aumentando as taxas de gás. Veja um link que explica como fazer isso no Metamask: https://metamask.zendesk.com/hc/en-us/articles/360015489251-How-to-Speed-Up-ou-Cancel-a-Pending-Transaction.

## Quanto token MATIC é suficiente para a taxa de gás? {#how-much-matic-token-is-enough-for-the-gas-fee}
Os utilizadores precisam ter um mínimo de 0,01 MATIC no mainnet Polygon.

## Onde efetuo um pedido de suporte? {#where-do-i-raise-a-support-ticket}
Se precisar de ajuda dos nossos especialistas, envie-nos uma mensagem em https://support.polygon.technology/support/home.

## Como faço a ponte dos ativos entre diferentes chains? {#how-do-i-bridge-assets-across-chains}

O Polygon oferece uma ponte para transferir ativos do Ethereum para o Polygon e vice-versa. Pode saber mais sobre isso na [seção Pontes]([https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started](https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started)) desta wiki.

No entanto, se estiver a usar qualquer serviço externo que não seja propriedade do Polygon, aconselhamos que contacte o serviço ao cliente para solicitar tutoriais e instruções. Também é importante fazer a sua própria pesquisa quando estiver a usar serviços web3.

## Tenho um problema com saque de tokens na OpenSea ou qualquer outra aplicação que usa a Polygon bridge. {#i-have-a-token-withdrawal-issue-with-opensea-or-any-other-application-which-uses-polygon-bridge}

Se tiver um problema com a transação de retirada sendo presa, o Polygon oferece a ponte de retirada com [https://withdraw.polygon.technology](https://withdraw.polygon.technology) para ajudar a tirar do terreno se tiver o hash de queimadura. Com esta ferramenta, será integrado rapidamente e o problema ficará resolvido. Outras perguntas sobre a transação com o OpenSea e outros dApps terão de ser tratadas pela equipe de aplicativos.

## Fui enganado. Como posso recuperar os meus tokens? {#i-have-been-scammed-how-will-i-retrieve-my-tokens}

Infelizmente, não há processo de recuperação de moedas perdidas. Pedimos que antes de efetuar uma transação, vá verificar e verificar novamente antes de iniciar e concluí-la. Observe que a rede Polygon e os nossos alças oficiais não se envolvem em posts de doação ou duplicação de tokens e nunca abordaremos em nome da organização. Ignore todas as tentativas, pois é provável que sejam burlas. Todas as nossas comunicações são através de nossas alças oficiais.

## Existem algumas transações não autorizadas na minha carteira. A minha carteira foi hackeada? {#there-are-some-unauthorized-transactions-in-my-wallet-is-my-wallet-hacked}

Infelizmente, a rede não pode reverter transações indesejadas.
É sempre importante ter cuidado com as suas chaves privadas e **nunca as partilhar com terceiros**.
Se ainda tiver alguns fundos, transfira-os imediatamente para outra carteira.

## O Ethereum tem o Goerli como rede de testes. O Polygon Network também tem uma rede de testes? {#ethereum-has-goerli-as-its-test-network-does-polygon-network-have-a-test-network-too}

Como a Rede Ethereum tem o Goerli como rede de testes, o Polygon Mainnet tem Mumbai. Todas as transações nesta rede de teste serão indexadas no explorador Mumbai.

## Como posso trocar meus tokens por outros tokens? {#how-can-i-swap-my-tokens-for-other-tokens}
Veja o vídeo abaixo ou siga [este tutorial](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#token-swap).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-token.mp4"></source>
  <p>O seu navegador não suporta o elemento de vídeo.</p>
</video>

## O Troque de token é muito lento. {#the-token-swap-is-too-slow}

Se está a tentar trocar tokens e este processo estiver a demorar demasiado tempo, pode tentar efetuar a mesma transação num navegador diferente. Se isso não funcionar e der erro, envie um screenshot para a nossa equipa de suporte.

## Quais tokens são cobrados como taxas de gás para troca de token? {#which-tokens-are-charged-as-the-gas-fees-for-token-swap}
Apenas MATIC.

## Como posso trocar o meu token por gás? {#how-can-i-swap-my-token-for-gas}
Veja o vídeo abaixo ou siga [este tutorial](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#swap-for-gas).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-gas.mp4"></source>
  <p>O seu navegador não suporta o elemento de vídeo.</p>
</video>

## Que tokens podem ser usados para trocar de gás? {#which-tokens-can-be-used-to-swap-for-gas}
Somente estes tokens são suportados para ‘Troca de Gás’: ETH, USDC, USDT, DAI, AAVE, LINK, WBTC, UNI, GHST, TEL, EMON e COMBO.

## Como obter tokens ETH? {#how-to-get-eth-tokens}
Para adquirir tokens ETH, pode trocá-los por outro token ou dinheiro de fiduciários numa troca, comprá-los numa rampa (ou no Metamask) ou até mesmo trocar outros tokens para ETH usando [o recurso de troca de token do Polygon](https://wallet.polygon.technology/polygon/token-swap).

## Como posso usar tokens MATIC para pagar as taxas de gás? {#how-can-i-get-matic-tokens-to-pay-for-gas-fees}

Nós oferecemos um serviço de [Swap de gás](https://wallet.polygon.technology/gas-swap/) que o pode ajudar com esta questão. Escolhe a quantidade de MATIC necessária para concluir a sua transação e pode trocá-la por outros tokens, como o Ether ou USDT. É importante realçar que se trata de uma **transação sem gás**.

## Onde posso obter tokens MATIC diretamente? {#where-can-i-get-matic-tokens-directly}

Assim, os tokens MATIC podem ser comprados a partir de qualquer troca centralizada ([Binance](https://www.binance.com/en), [Coinbase](https://www.coinbase.com/), et.al) ou Descentralizada ([Uniswap](https://uniswap.org/), [QuickSwap](https://quickswap.exchange/#/swap)). Pode também pesquisar e tentar algumas rampas como [Transak](https://transak.com/) e [Rampa](https://ramp.network/). O objetivo da compra de moedas MATIC também deve determinar o local e a rede onde os irá comprar. É aconselhável ter MATIC no mainnet Ethereum se a sua intenção for assentar ou delegação. Se a intenção for uma transação no Polygon Mainnet, deverá manter e realizar transações com o MATIC no Polygon Mainnet.





