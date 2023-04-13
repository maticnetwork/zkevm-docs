---
id: the-graph
title: Creación de un proyecto con The Graphs y PoS de Polygon
sidebar_label: The Graph
description: Aprende a configurar un proyecto alojado con The Graph y Polygon
keywords:
  - polygon
  - matic
  - graph
  - the graph
  - index
  - query
  - subgraph
image: https://matic.network/banners/matic-network-16x9.png
slug: graph
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Graph, un protocolo descentralizado para indexar y consultar los datos de la cadena, es compatible con la cadena de MATIC. Los datos definidos mediante subgrafos son fáciles de consultar y explorar. Puedes crear los subgrafos localmente o utilizar un explorador alojado gratuito para la indexación y la visualización de datos.

> Nota: Consulta https://thegraph.com/docs/quick-start para obtener más información, instrucciones de instalación local y mucho más. La documentación incluye un ejemplo para aprender cómo funcionan los subgrafos, y este video ofrece una buena introducción.

## Pasos {#steps}

1. Visita el explorador de The Graph (https://thegraph.com/explorer/) y configura una cuenta. Necesitarás una cuenta de GitHub para la autenticación.

2. Ve a tu panel de control y haz clic en "Add Subgraph" (Añadir subgrafo). Define el nombre, la cuenta y el subtítulo del subgrafo, y actualiza la imagen y cualquier otra información si lo deseas (puedes actualizarla después).

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%"/>


3. Instala Graph CLI en tu máquina (usando NPM o YARN)

```bash
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. El siguiente comando crea un subgrafo que indexa todos los eventos de un contrato existente. Este intenta traer la interfaz binaria de aplicación (ABI) del contrato desde BlockScout y vuelve a solicitar una ruta de archivo local. Si falta alguno de los argumentos opcionales, te dirige a un formulario interactivo.

```bash
graph init \
  --from-contract <CONTRACT_ADDRESS> \
  [--network Matic ] \
  [--abi <FILE>] \
  <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]

--network: choose “Matic” for Matic mainnet and “Mumbai” for Matic Testnet.
--from-contract <CONTRACT_ADDRESS> is the address of your existing contract which you have deployed on the Matic network: Testnet or Mainnet.
--abi <FILE> is a local path to a contract ABI file (optional, If verified in BlockScout, the graph will grab the ABI, otherwise you will need to manually add the ABI. You can save the abi from BlockScout or by running truffle compile or solc on a public project.)
The <GITHUB_USER> is your github user or organization name, <SUBGRAPH_NAME> is the name for your subgraph, and <DIRECTORY> is the optional name of the directory where graph init will put the example subgraph manifest.
```

> Nota: Encuentra más información aquí: https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. Autentícate con el servicio alojado

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
Puedes encontrar el token de acceso accediendo a tu panel de control en el sitio web de The Graph.

6. Ve al directorio que creaste y empieza a definir el subgrafo. Encontrarás información sobre la creación de un subgrafo en los documentos de The Graph, aquí: https://thegraph.com/docs/define-a-subgraph

7. Cuando estés listo, implementa el subgrafo. Puedes someterlo a pruebas y volver a implementarlo siempre que sea necesario.

> Si el subgrafo que habías implementado previamente todavía está en estado de sincronización, se reemplazará de inmediato por la nueva versión implementada. Si el subgrafo implementado previamente ya está totalmente sincronizado, el nodo de The Graph marcará la nueva versión implementada como pendiente, la sincronizará en segundo plano y remplazará la versión anterior por la nueva cuando la sincronización de la nueva versión haya finalizado. Eso garantiza que tienes un subgrafo con el que trabajar mientras se sincroniza la nueva versión.

```bash
yarn deploy
```

Tu subgrafo se implementará y se podrá acceder a él desde tu panel de control.

Encuentra información sobre la consulta del subgrafo aquí: https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

Si quieres que el subgrafo sea público, puedes darle esa característica accediendo a él desde el panel de control y haciendo clic en el botón de edición. Verás el deslizador en la parte inferior de la página de edición.
