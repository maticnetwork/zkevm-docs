---
id: connext
title: Transferências Crosschain usando Connext
description: Construa a sua próxima aplicação de blockchain na Polygon.
keywords:
  - docs
  - matic
  - connext
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Connext é uma rede de liquidez crosschain que permite trocas rápidas e totalmente não custodiais entre chains compatíveis com evm e sistemas Ethereum L2.

Ethereum está a tornar-se multichain. Com uma adoção cada vez maior de chains compatíveis com evm e L2s, surge um novo desafio em torno da fragmentação de liquidez no ecossistema. Connext resolve este problema ligando pools discretas de liquidez em cada chain numa rede global, sem introduzir questões de confiança novas e significativas para os utilizadores. Os programadores podem tirar proveito desta liquidez para construir uma nova classe de DApps nativamente chain-agnostic na Connext.

A um nível elevado, Connext permite que os utilizadores façam swap do ativoA na chainA pelo ativoB na chainB, usando transferências condicionais. Isto é possível apenas com uns passos simples:

Alice, uma utilizadora do Connext, envia uma transferência condicional do ativoA ao Bob.
Bob, um prestador de liquidez (aka um router), envia um valor equivalente do ativoB à Alice.
Alice desbloqueia a sua transferência condicional para receber o ativoB que, por sua vez, permite ao Bob fazer o mesmo.
Os routers formam a espinha dorsal da nossa rede, oferecendo liquidez em diferentes chains, e cobrando taxas para o fazerem. Pode saber mais sobre a forma como isto funciona sem confiança no Protocolo Primer.

Para configurar as transferências do Ethereum Goerli Testnet para o Polygon Mumbai Testnet num dApp do navegador, visite este [guia.](https://docs.connext.network/quickstart-polygon-matic-integration)
