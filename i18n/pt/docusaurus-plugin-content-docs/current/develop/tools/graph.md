---
id: graph
title: Configurar um projeto anfitrião com The Graph e Polygon
description: Saiba como configurar um projeto hospedado com The Graph e Polygon.
keywords:
  - graph
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Graph, um protocolo descentralizado para indexação e consulta de dados chain, suporta a chain da Polygon. Os dados definidos através de subgraphs são fáceis de consultar e explorar. Os subgraphs podem ser criados localmente ou usando um explorador hospedado gratuito para indexação e exibição de dados.

> Note: Consulte https://thegraph.com/docs/quick-start para mais detalhes, instalação local e muito mais. Os documentos incluem um exemplo para aprender como os subgraphs funcionam, e este vídeo oferece uma boa introdução.

## Etapas {#steps}

1. Aceda ao Graph Explorer (https://thegraph.com/explorer/) e configure uma conta. Irá precisar de uma conta do GitHub para a autenticação.

2. Aceda ao painel e clique em Add Subgraph (Adicionar Subgraph). Defina o nome, a conta e o subtítulo do Subgraph, e atualize a imagem e outras informações (pode atualizar mais tarde) se desejar.

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%"/>


3. Instalar o Graph CLI no seu dispositivo (usando NPM ou yarn)

```bash
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. O comando a seguir cria um subgraph que indexa todos os eventos de um contrato existente. Este tenta obter o contrato ABI da BlockScout e volta a pedir um caminho de ficheiro local. Se algum dos argumentos opcionais estiver em falta, este leva-o através de um formulário interativo.

```bash
graph init \
  --from-contract <CONTRACT_ADDRESS> \
  [--network Matic ] \
  [--abi <FILE>] \
  <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]

--network: choose “Polygon” for Matic mainnet and “Mumbai” for Polygon Testnet.
--from-contract <CONTRACT_ADDRESS> is the address of your existing contract which you have deployed on Polygon: Testnet or Mainnet.
--abi <FILE> is a local path to a contract ABI file (optional, If verified in BlockScout, the graph will grab the ABI, otherwise you will need to manually add the ABI. You can save the abi from BlockScout or by running truffle compile or solc on a public project.)
The <GITHUB_USER> is your github user or organization name, <SUBGRAPH_NAME> is the name for your subgraph, and <DIRECTORY> is the optional name of the directory where graph init will put the example subgraph manifest.
```

> Note: Pode encontrar mais detalhes aqui: https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. Autenticar com o serviço hospedado

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
Pode encontrar o token de acesso indo ao painel no website de The Graph.

6. cd para o diretório que criou e comece a definir o subgraph. Pode encontrar informações sobre a criação de um subgraph no Graph Docs aqui. https://thegraph.com/docs/define-a-subgraph

7. Quando estiver pronto, implante o seu subgraph. Pode sempre testar e voltar a implantar, conforme necessário.

> Se o subgraph implantado anteriormente ainda estiver no estado de Sincronização, será substituído imediatamente pela versão recém-implantada. Se o subgraph implantado anteriormente já estiver totalmente sincronizado, o Graph Node irá marcar a versão recém-implantada como a versão pendente, sincronizá-la em segundo plano e substituir apenas a versão atualmente implantada pela nova, assim que a sincronização da nova versão estiver concluída. Isto garante que tem um subgraph para trabalhar enquanto a versão nova está a sincronizar.

```bash
yarn deploy
```

O seu subgraph será implantado e pode ser acedido a partir do painel.

Pode aprender como consultar o subgraph aqui: https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

Se quiser tornar o seu subgraph público, pode fazê-lo acedendo ao seu subgraph a partir do painel e clicando no botão Edit (Editar). Irá ver o controlo deslizante na parte inferior da página de edição.
